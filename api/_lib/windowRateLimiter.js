// Small reusable fixed-window rate limiter, same best-effort/in-memory
// caveats as api/_lib/rateLimiter.js (per-instance, resets on cold start —
// a speed bump against casual abuse, not a durable quota system).

export function createWindowLimiter({ windowMs, max }) {
  const hits = new Map(); // key -> { count, windowStart }

  return function check(key, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || now - entry.windowStart >= windowMs) {
      hits.set(key, { count: 1, windowStart: now });
      return { allowed: true };
    }
    entry.count += 1;
    if (entry.count > max) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((entry.windowStart + windowMs - now) / 1000)),
      };
    }
    return { allowed: true };
  };
}
