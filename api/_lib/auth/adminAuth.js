// Request-level admin authentication: cookie parsing, session issuance, and
// the requireAdmin gate every private endpoint calls FIRST — before touching
// the database or even parsing the payload.

import { verifySessionToken, createSessionToken, SESSION_TTL_SECONDS } from "./session.js";
import { isAuthConfigured, isAllowedAdminEmail } from "../data/supabaseAdmin.js";

export const SESSION_COOKIE = "ptm_admin_session";

export function parseCookies(req) {
  const header = req.headers?.cookie;
  const out = {};
  if (typeof header !== "string" || header.length === 0) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    if (!name) continue;
    try {
      out[name] = decodeURIComponent(part.slice(idx + 1).trim());
    } catch (error) {
      out[name] = part.slice(idx + 1).trim();
    }
  }
  return out;
}

function cookieAttributes(maxAge) {
  // Secure is dropped only for explicit local development (the dev API server
  // sets NODE_ENV=development); Vercel builds run with NODE_ENV=production.
  const secure = process.env.NODE_ENV === "development" ? "" : " Secure;";
  return `HttpOnly;${secure} SameSite=Strict; Path=/api; Max-Age=${maxAge}`;
}

export function issueSessionCookie(res, email) {
  const token = createSessionToken(email, process.env.ADMIN_SESSION_SECRET);
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes(SESSION_TTL_SECONDS)}`);
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; ${cookieAttributes(0)}`);
}

// Returns { ok: true, email } or { ok: false, status, error, message }.
// A valid signature is not enough: the email must STILL be on the allowlist,
// so removing an address from ADMIN_EMAILS revokes access immediately.
export function requireAdmin(req) {
  if (!isAuthConfigured()) {
    return {
      ok: false,
      status: 503,
      error: "backend_not_configured",
      message: "The PTM backend is not configured in this environment.",
    };
  }
  const token = parseCookies(req)[SESSION_COOKIE];
  const session = token ? verifySessionToken(token, process.env.ADMIN_SESSION_SECRET) : null;
  if (!session || !isAllowedAdminEmail(session.email)) {
    return {
      ok: false,
      status: 401,
      error: "auth_required",
      message: "Sign in to access PTM admin.",
    };
  }
  return { ok: true, email: session.email };
}
