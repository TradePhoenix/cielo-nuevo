// Minimal Vercel-style req/res fakes + environment helpers for endpoint
// tests. Not a test file itself — imported by *.test.js.

import { createSessionToken } from "../auth/session.js";
import { SESSION_COOKIE } from "../auth/adminAuth.js";

export const TEST_ENV = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-test-key",
  ADMIN_SESSION_SECRET: "test-session-secret",
  ADMIN_EMAILS: "kalen@pathtomexico.com",
};

export function applyTestEnv(overrides = {}) {
  const saved = {};
  const env = { ...TEST_ENV, ...overrides };
  for (const [key, value] of Object.entries(env)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return () => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

export function adminCookie(email = "kalen@pathtomexico.com") {
  return `${SESSION_COOKIE}=${encodeURIComponent(createSessionToken(email, TEST_ENV.ADMIN_SESSION_SECRET))}`;
}

export function makeReq({ method = "GET", query = {}, body, headers = {}, cookie } = {}) {
  const serialized = body === undefined ? "" : JSON.stringify(body);
  return {
    method,
    query,
    headers: {
      "content-length": String(Buffer.byteLength(serialized)),
      ...(cookie ? { cookie } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.parse(serialized),
    socket: { remoteAddress: "127.0.0.1" },
  };
}

export function makeRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: "",
    ended: false,
    status(code) {
      res.statusCode = code;
      return res;
    },
    setHeader(name, value) {
      res.headers[name.toLowerCase()] = value;
      return res;
    },
    end(chunk) {
      if (chunk) res.body += chunk;
      res.ended = true;
      return res;
    },
    write(chunk) {
      res.body += chunk;
      return true;
    },
    json() {
      return JSON.parse(res.body);
    },
  };
  return res;
}
