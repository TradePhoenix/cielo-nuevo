from fastapi import FastAPI, Request
from dotenv import load_dotenv
from datetime import datetime
import os
import csv

load_dotenv()

app = FastAPI()

SECRET_KEY = os.getenv("SECRET_KEY", "phoenix-secret-123")
LOG_FILE = "signals.csv"
TRADE_DB_FILE = "trade_database.csv"

def log_signal(signal):
    file_exists = os.path.isfile(LOG_FILE)

    with open(LOG_FILE, mode="a", newline="") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "time",
                "symbol",
                "side",
                "price",
                "status"
            ]
        )

        if not file_exists:
            writer.writeheader()

        writer.writerow(signal)


def log_trade_database(data, signal):
    file_exists = os.path.isfile(TRADE_DB_FILE)

    fieldnames = [
        "date","time","market","direction","setup_type","poi_type","fvg_timeframe",
        "session_window","entry_price","stop_loss","take_profit","risk_reward",
        "outcome","rr_achieved","grade","liquidity_sweep","displacement",
        "arrow_confirmation","premium_discount","screenshot_path","notes"
    ]

    now = datetime.now()

    trade = {
        "date": now.date().isoformat(),
        "time": now.strftime("%H:%M:%S"),
        "market": data.get("symbol", ""),
        "direction": data.get("side", ""),
        "setup_type": data.get("setup_type", ""),
        "poi_type": data.get("poi_type", ""),
        "fvg_timeframe": data.get("fvg_timeframe", ""),
        "session_window": data.get("session_window", ""),
        "entry_price": data.get("price", ""),
        "stop_loss": data.get("stop_loss", ""),
        "take_profit": data.get("take_profit", ""),
        "risk_reward": data.get("risk_reward", ""),
        "outcome": data.get("outcome", "Open"),
        "rr_achieved": data.get("rr_achieved", ""),
        "grade": data.get("grade", ""),
        "liquidity_sweep": data.get("liquidity_sweep", ""),
        "displacement": data.get("displacement", ""),
        "arrow_confirmation": data.get("arrow_confirmation", ""),
        "premium_discount": data.get("premium_discount", ""),
        "screenshot_path": data.get("screenshot_path", ""),
        "notes": data.get("notes", signal.get("status", ""))
    }

    with open(TRADE_DB_FILE, mode="a", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        if not file_exists:
            writer.writeheader()

        writer.writerow(trade)

@app.get("/")
def home():
    return {"status": "Phoenix Wave Bot Alive"}

@app.post("/webhook")
async def webhook(request: Request):

    data = await request.json()

    if data.get("secret") != SECRET_KEY:
        return {
            "status": "rejected",
            "reason": "bad secret"
        }

    signal = {
        "time": datetime.now().isoformat(),
        "symbol": data.get("symbol"),
        "side": data.get("side"),
        "price": data.get("price"),
        "status": "signal_received"
    }

    log_signal(signal)
    log_trade_database(data, signal)

    print("NEW SIGNAL:", signal)

    return signal


@app.get("/stats")
def stats():
    if not os.path.isfile(TRADE_DB_FILE):
        return {
            "status": "no_database",
            "message": "No trade database found yet."
        }

    with open(TRADE_DB_FILE, mode="r", newline="") as file:
        reader = csv.DictReader(file)
        trades = list(reader)

    total = len(trades)
    wins = [t for t in trades if t.get("outcome", "").lower() == "win"]
    losses = [t for t in trades if t.get("outcome", "").lower() == "loss"]
    open_trades = [t for t in trades if t.get("outcome", "").lower() == "open"]

    rr_values = []
    for trade in trades:
        try:
            rr_values.append(float(trade.get("rr_achieved", "")))
        except:
            pass

    win_rate = round((len(wins) / total) * 100, 2) if total else 0
    average_rr = round(sum(rr_values) / len(rr_values), 2) if rr_values else 0

    poi_counts = {}
    session_counts = {}
    setup_counts = {}

    for trade in trades:
        poi = trade.get("poi_type", "") or "Unknown"
        session = trade.get("session_window", "") or "Unknown"
        setup = trade.get("setup_type", "") or "Unknown"

        poi_counts[poi] = poi_counts.get(poi, 0) + 1
        session_counts[session] = session_counts.get(session, 0) + 1
        setup_counts[setup] = setup_counts.get(setup, 0) + 1

    return {
        "status": "ok",
        "total_trades": total,
        "wins": len(wins),
        "losses": len(losses),
        "open_trades": len(open_trades),
        "win_rate": win_rate,
        "average_rr": average_rr,
        "poi_counts": poi_counts,
        "session_counts": session_counts,
        "setup_counts": setup_counts
    }
