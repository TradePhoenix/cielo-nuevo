// /api/admin/auth — admin sign-in, sign-out, and session introspection.
//
// GET               -> { authenticated, email? , reason? }   (always 200)
// POST {action:"login", email, password}
// POST {action:"logout"}
//
// Credentials are verified against Supabase Auth (GoTrue) server-side; on
// success + ADMIN_EMAILS allowlist match, an HMAC-signed session token is set
// as an httpOnly cookie (see api/_lib/auth/session.js). The password never
// touches this codebase beyond forwarding to Supabase over TLS.

import { sendJson, sendError, sendServerError, readJsonBody, methodNotAllowed, getClientIp } from "../_lib/http.js";
import { isAuthConfigured, isAllowedAdminEmail } from "../_lib/data/supabaseAdmin.js";
import { requireAdmin, issueSessionCookie, clearSessionCookie } from "../_lib/auth/adminAuth.js";
import { createWindowLimiter } from "../_lib/windowRateLimiter.js";

// 8 login attempts per 15 minutes per IP.
const loginLimiter = createWindowLimiter({ windowMs: 15 * 60 * 1000, max: 8 });

async function verifyPassword(email, password) {
  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ email, password }),
  });
  return response.ok;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const auth = requireAdmin(req);
      if (auth.ok) return sendJson(res, 200, { authenticated: true, email: auth.email });
      return sendJson(res, 200, { authenticated: false, reason: auth.error });
    }

    if (req.method !== "POST") return methodNotAllowed(res, ["GET", "POST"]);

    const parsed = readJsonBody(req);
    if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");
    const { action } = parsed.body;

    if (action === "logout") {
      clearSessionCookie(res);
      return sendJson(res, 200, { ok: true });
    }

    if (action !== "login") return sendError(res, 400, "invalid_action", 'action must be "login" or "logout".');

    if (!isAuthConfigured()) {
      return sendError(res, 503, "backend_not_configured", "The PTM backend is not configured in this environment.");
    }

    const limit = loginLimiter(getClientIp(req));
    if (!limit.allowed) {
      res.setHeader("Retry-After", String(limit.retryAfterSeconds));
      return sendError(res, 429, "rate_limited", "Too many sign-in attempts — please wait and try again.");
    }

    const email = String(parsed.body.email || "").trim().toLowerCase();
    const password = String(parsed.body.password || "");
    // One deliberately vague failure message for every rejection path — no
    // oracle for which emails exist or are admins.
    const rejected = () => sendError(res, 401, "invalid_credentials", "That email and password combination wasn't accepted.");

    if (!email || !password || password.length > 200) return rejected();
    if (!isAllowedAdminEmail(email)) return rejected();
    const verified = await verifyPassword(email, password);
    if (!verified) return rejected();

    issueSessionCookie(res, email);
    return sendJson(res, 200, { ok: true, email });
  } catch (error) {
    return sendServerError(res, "admin_auth", error);
  }
}
