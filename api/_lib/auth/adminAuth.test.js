import { parseCookies, requireAdmin, SESSION_COOKIE } from "./adminAuth.js";
import { createSessionToken } from "./session.js";

const ENV_KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "ADMIN_SESSION_SECRET", "ADMIN_EMAILS"];
const saved = {};

beforeEach(() => {
  for (const key of ENV_KEYS) saved[key] = process.env[key];
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";
  process.env.ADMIN_SESSION_SECRET = "secret";
  process.env.ADMIN_EMAILS = "kalen@pathtomexico.com, second@pathtomexico.com";
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

const reqWithCookie = (cookie) => ({ headers: cookie ? { cookie } : {} });
const cookieFor = (email, secret = "secret") =>
  `${SESSION_COOKIE}=${encodeURIComponent(createSessionToken(email, secret))}`;

describe("parseCookies", () => {
  test("parses multiple cookies", () => {
    expect(parseCookies({ headers: { cookie: "a=1; b=two; c=%20x" } })).toEqual({ a: "1", b: "two", c: " x" });
  });
  test("handles missing header", () => {
    expect(parseCookies({ headers: {} })).toEqual({});
  });
});

describe("requireAdmin", () => {
  test("503 when backend env is missing", () => {
    delete process.env.ADMIN_SESSION_SECRET;
    const result = requireAdmin(reqWithCookie(cookieFor("kalen@pathtomexico.com")));
    expect(result.ok).toBe(false);
    expect(result.status).toBe(503);
    expect(result.error).toBe("backend_not_configured");
  });

  test("401 with no cookie", () => {
    const result = requireAdmin(reqWithCookie(null));
    expect(result).toMatchObject({ ok: false, status: 401, error: "auth_required" });
  });

  test("401 with a token for an email not on the allowlist", () => {
    const result = requireAdmin(reqWithCookie(cookieFor("intruder@evil.com")));
    expect(result).toMatchObject({ ok: false, status: 401 });
  });

  test("removing an email from ADMIN_EMAILS revokes an otherwise-valid session", () => {
    const cookie = cookieFor("second@pathtomexico.com");
    expect(requireAdmin(reqWithCookie(cookie)).ok).toBe(true);
    process.env.ADMIN_EMAILS = "kalen@pathtomexico.com";
    expect(requireAdmin(reqWithCookie(cookie)).ok).toBe(false);
  });

  test("accepts a valid allowlisted session", () => {
    const result = requireAdmin(reqWithCookie(cookieFor("kalen@pathtomexico.com")));
    expect(result).toEqual({ ok: true, email: "kalen@pathtomexico.com" });
  });
});
