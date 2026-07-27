// Best-effort, in-memory per-IP rate limiting.
//
// IMPORTANT — this is explicitly NOT durable or distributed. It lives in
// module-scope memory inside a single serverless function instance, which
// Vercel may cold-start fresh (resetting all counters) or run as multiple
// concurrent instances behind the same route (each with its own counters)
// at any time. It is one layer of defense-in-depth, not a real ceiling on
// total abuse. Durable, cross-instance rate limiting requires an external
// store (e.g. Upstash Redis) — an approved-but-not-built Phase 2 item, see
// docs/ask-path/PHASE_2.md. Do not treat this module as sufficient
// production abuse protection on its own.

const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_PER_WINDOW = 20;
const BURST_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_BURST_WINDOW = 6;

const hits = new Map(); // ip -> array of request timestamps (ms)

function prune(timestamps, now) {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

export function checkRateLimit(ip) {
  const key = ip || "unknown";
  const now = Date.now();
  const existing = prune(hits.get(key) || [], now);

  const burstCount = existing.filter((t) => now - t < BURST_WINDOW_MS).length;
  if (burstCount >= MAX_PER_BURST_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil(BURST_WINDOW_MS / 1000) };
  }
  if (existing.length >= MAX_PER_WINDOW) {
    const oldest = existing[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.push(now);
  hits.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

// Test-only reset so rate-limiter tests don't leak state into each other.
export function _resetForTests() {
  hits.clear();
}
