from fastapi import FastAPI, Request
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()

app = FastAPI()

SECRET_KEY = os.getenv("SECRET_KEY", "change-me")

MAX_TRADES_PER_DAY = 3
trades_today = 0
bot_enabled = True

@app.get("/")
def home():
    return {"status": "Phoenix Wave Bot is alive"}

@app.post("/webhook")
async def tradingview_webhook(request: Request):
    global trades_today, bot_enabled

    data = await request.json()

    if data.get("secret") != SECRET_KEY:
        return {"status": "rejected", "reason": "bad secret"}

    if not bot_enabled:
        return {"status": "blocked", "reason": "bot disabled"}

    if trades_today >= MAX_TRADES_PER_DAY:
        return {"status": "blocked", "reason": "max trades reached"}

    signal = {
        "time": datetime.now().isoformat(),
        "symbol": data.get("symbol"),
        "side": data.get("side"),
        "lot": data.get("lot"),
        "sl_points": data.get("sl_points"),
        "tp_points": data.get("tp_points"),
        "status": "signal_received_demo_mode"
    }

    trades_today += 1

    print("NEW SIGNAL:", signal)

    return signal
