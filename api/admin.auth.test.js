// Endpoint tests for /api/admin/auth — login, logout, session introspection.
// Supabase Auth (GoTrue) is mocked at the fetch layer; everything else runs
// for real, including allowlist checks and cookie issuance.

import authHandler from "./admin/auth.js";
import { applyTestEnv, adminCookie, makeReq, makeRes } from "./_lib/testSupport/httpMocks.js";

let restoreEnv;
const realFetch = global.fetch;

beforeEach(() => {
  restoreEnv = applyTestEnv();
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  restoreEnv();
  global.fetch = realFetch;
  console.log.mockRestore();
});

async function call({ method = "POST", body, cookie, ip = "10.1.1.1" } = {}) {
  const req = makeReq({ method, body, cookie });
  req.headers["x-forwarded-for"] = ip;
  const res = makeRes();
  await authHandler(req, res);
  return res;
}

describe("GET session", () => {
  test("reports unauthenticated without a cookie", async () => {
    const res = await call({ method: "GET" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ authenticated: false, reason: "auth_required" });
  });

  test("reports authenticated with a valid cookie", async () => {
    const res = await call({ method: "GET", cookie: adminCookie() });
    expect(res.json()).toEqual({ authenticated: true, email: "kalen@pathtomexico.com" });
  });

  test("reports backend_not_configured when env is missing", async () => {
    restoreEnv();
    restoreEnv = applyTestEnv({ ADMIN_SESSION_SECRET: undefined });
    const res = await call({ method: "GET" });
    expect(res.json()).toEqual({ authenticated: false, reason: "backend_not_configured" });
  });
});

describe("login", () => {
  test("verifies the password with Supabase and sets an httpOnly session cookie", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    const res = await call({ body: { action: "login", email: "Kalen@PathToMexico.com", password: "correct-horse" } });
    expect(res.statusCode).toBe(200);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/auth/v1/token?grant_type=password",
      expect.objectContaining({ method: "POST" })
    );
    const cookie = res.headers["set-cookie"];
    expect(cookie).toContain("ptm_admin_session=");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Strict");
    expect(cookie).toContain("Path=/api");
  });

  test("rejects a wrong password with a vague 401", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400 });
    const res = await call({ body: { action: "login", email: "kalen@pathtomexico.com", password: "wrong" } });
    expect(res.statusCode).toBe(401);
    expect(res.json().error).toBe("invalid_credentials");
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  test("rejects a non-allowlisted email WITHOUT calling Supabase (no oracle)", async () => {
    global.fetch = jest.fn();
    const res = await call({ body: { action: "login", email: "stranger@evil.com", password: "whatever" } });
    expect(res.statusCode).toBe(401);
    expect(res.json().error).toBe("invalid_credentials");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("rate limits repeated attempts from one IP", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400 });
    let limited = null;
    for (let i = 0; i < 10; i += 1) {
      const res = await call({ body: { action: "login", email: "kalen@pathtomexico.com", password: "x" }, ip: "10.7.7.7" });
      if (res.statusCode === 429) {
        limited = res;
        break;
      }
    }
    expect(limited).not.toBeNull();
  });

  test("503 when auth env is not configured", async () => {
    restoreEnv();
    restoreEnv = applyTestEnv({ ADMIN_EMAILS: undefined });
    const res = await call({ body: { action: "login", email: "kalen@pathtomexico.com", password: "x" } });
    expect(res.statusCode).toBe(503);
  });
});

describe("logout", () => {
  test("clears the session cookie", async () => {
    const res = await call({ body: { action: "logout" }, cookie: adminCookie() });
    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toContain("ptm_admin_session=;");
    expect(res.headers["set-cookie"]).toContain("Max-Age=0");
  });
});
