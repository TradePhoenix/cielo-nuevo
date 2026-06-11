from fastapi import FastAPI, Request
from dotenv import load_dotenv
from datetime import datetime
import os
import csv

load_dotenv()

app = FastAPI()

SECRET_KEY = os.getenv("SECRET_KEY", "phoenix-secret-123")
LOG_FILE = "signals.csv"

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

    print("NEW SIGNAL:", signal)

    return signal
