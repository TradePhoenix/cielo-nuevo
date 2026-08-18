// Admin session tokens — HMAC-SHA256-signed, stateless, short-lived.
//
// Design: Supabase Auth is the credential store (email + password, with
// Supabase's own lockouts and reset flows). Once the password verifies AND
// the email is on the ADMIN_EMAILS allowlist, the API issues its OWN signed
// session token in an httpOnly cookie. Per-request verification is a local
// HMAC check (no network round-trip), and revocation is rotation of
// ADMIN_SESSION_SECRET. This is deliberately not a hand-rolled password
// scheme — passwords are never stored, compared, or hashed in this codebase.

import crypto from "crypto";

export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

function hmac(payloadB64, secret) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function createSessionToken(email, secret, now = Date.now()) {
  if (!secret) throw new Error("session secret missing");
  const payload = {
    email: String(email).trim().toLowerCase(),
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${hmac(payloadB64, secret)}`;
}

export function verifySessionToken(token, secret, now = Date.now()) {
  if (!token || !secret || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, signature] = parts;
  const expected = hmac(payloadB64, secret);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch (error) {
    return null;
  }
  if (!payload || typeof payload.email !== "string" || typeof payload.exp !== "number") return null;
  if (payload.exp * 1000 <= now) return null;
  return { email: payload.email };
}
