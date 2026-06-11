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
        "date", "time", "market", "direction", "setup_type", "poi_type", "fvg_timeframe",
        "session_window", "entry_price", "stop_loss", "take_profit", "risk_reward",
        "outcome", "rr_achieved", "grade", "liquidity_sweep", "displacement",
        "arrow_confirmation", "premium_discount", "screenshot_path", "notes"
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


def load_trades():
    if not os.path.isfile(TRADE_DB_FILE):
        return []

    with open(TRADE_DB_FILE, mode="r", newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)


def safe_float(value):
    try:
        if value in ("", None):
            return None
        return float(value)
    except:
        return None


def category_performance(trades, field_name):
    groups = {}

    for trade in trades:
        key = trade.get(field_name, "") or "Unknown"

        if key not in groups:
            groups[key] = {
                "name": key,
                "total_trades": 0,
                "wins": 0,
                "losses": 0,
                "open_trades": 0,
                "win_rate": 0,
                "average_rr": 0,
                "total_rr": 0
            }

        outcome = trade.get("outcome", "").lower()
        rr = safe_float(trade.get("rr_achieved", ""))

        groups[key]["total_trades"] += 1

        if outcome == "win":
            groups[key]["wins"] += 1
        elif outcome == "loss":
            groups[key]["losses"] += 1
        elif outcome == "open":
            groups[key]["open_trades"] += 1

        if rr is not None:
            groups[key]["total_rr"] += rr

    for key, data in groups.items():
        closed_trades = data["wins"] + data["losses"]

        data["win_rate"] = round((data["wins"] / closed_trades) * 100, 2) if closed_trades else 0
        data["average_rr"] = round(data["total_rr"] / data["wins"], 2) if data["wins"] else 0
        data["total_rr"] = round(data["total_rr"], 2)

    return list(groups.values())


def best_group(groups):
    if not groups:
        return None

    return sorted(
        groups,
        key=lambda x: (
            x["win_rate"],
            x["total_rr"],
            x["average_rr"],
            x["total_trades"]
        ),
        reverse=True
    )[0]


def worst_group(groups):
    closed_groups = [g for g in groups if (g["wins"] + g["losses"]) > 0]

    if not closed_groups:
        return None

    return sorted(
        closed_groups,
        key=lambda x: (
            x["win_rate"],
            x["total_rr"],
            x["average_rr"]
        )
    )[0]


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
    trades = load_trades()

    if not trades:
        return {
            "status": "no_database",
            "message": "No trade database found yet."
        }

    total = len(trades)
    wins = [t for t in trades if t.get("outcome", "").lower() == "win"]
    losses = [t for t in trades if t.get("outcome", "").lower() == "loss"]
    open_trades = [t for t in trades if t.get("outcome", "").lower() == "open"]

    rr_values = []
    for trade in trades:
        rr = safe_float(trade.get("rr_achieved", ""))
        if rr is not None:
            rr_values.append(rr)

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


@app.get("/recent-trades")
def recent_trades(limit: int = 10):
    trades = load_trades()

    return {
        "status": "ok",
        "count": min(limit, len(trades)),
        "trades": trades[-limit:]
    }


@app.get("/leaderboard")
def leaderboard():
    trades = load_trades()

    if not trades:
        return {
            "status": "no_database",
            "message": "No trade database found yet."
        }

    setup_groups = category_performance(trades, "setup_type")
    poi_groups = category_performance(trades, "poi_type")
    session_groups = category_performance(trades, "session_window")
    grade_groups = category_performance(trades, "grade")

    rr_trades = []

    for trade in trades:
        rr = safe_float(trade.get("rr_achieved", ""))

        if rr is not None:
            rr_trades.append({
                "date": trade.get("date", ""),
                "time": trade.get("time", ""),
                "market": trade.get("market", ""),
                "direction": trade.get("direction", ""),
                "setup_type": trade.get("setup_type", "") or "Unknown",
                "poi_type": trade.get("poi_type", "") or "Unknown",
                "session_window": trade.get("session_window", "") or "Unknown",
                "grade": trade.get("grade", "") or "Unknown",
                "outcome": trade.get("outcome", ""),
                "rr_achieved": rr,
                "notes": trade.get("notes", "")
            })

    highest_rr_trade = sorted(
        rr_trades,
        key=lambda x: x["rr_achieved"],
        reverse=True
    )[0] if rr_trades else None

    return {
        "status": "ok",
        "leaderboard": {
            "best_setup": best_group(setup_groups),
            "best_poi": best_group(poi_groups),
            "best_session": best_group(session_groups),
            "best_grade": best_group(grade_groups),
            "highest_rr_trade": highest_rr_trade,
            "worst_setup": worst_group(setup_groups),
            "worst_poi": worst_group(poi_groups),
            "worst_session": worst_group(session_groups),
            "worst_grade": worst_group(grade_groups)
        },
        "details": {
            "setup_performance": setup_groups,
            "poi_performance": poi_groups,
            "session_performance": session_groups,
            "grade_performance": grade_groups
        }
    }
