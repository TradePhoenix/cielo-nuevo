import { checkRateLimit, getClientIp, _resetForTests } from "./rateLimiter.js";

describe("checkRateLimit", () => {
  beforeEach(() => _resetForTests());

  test("allows requests under the burst limit", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4").allowed).toBe(true);
    }
  });

  test("blocks once the burst limit is exceeded", () => {
    for (let i = 0; i < 6; i++) checkRateLimit("5.6.7.8");
    const result = checkRateLimit("5.6.7.8");
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  test("tracks different IPs independently", () => {
    for (let i = 0; i < 6; i++) checkRateLimit("9.9.9.9");
    expect(checkRateLimit("9.9.9.9").allowed).toBe(false);
    expect(checkRateLimit("1.1.1.1").allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  test("prefers x-forwarded-for", () => {
    const req = { headers: { "x-forwarded-for": "203.0.113.5, 10.0.0.1" }, socket: {} };
    expect(getClientIp(req)).toBe("203.0.113.5");
  });

  test("falls back to socket remoteAddress", () => {
    const req = { headers: {}, socket: { remoteAddress: "127.0.0.1" } };
    expect(getClientIp(req)).toBe("127.0.0.1");
  });
});
