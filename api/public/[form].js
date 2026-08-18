// /api/public/:form — the two public write paths. No authentication (they
// are public forms) but strict whitelist validation, honeypot handling, IP
// rate limiting, and a hard cap on payload size. These endpoints can INSERT
// one specific shape each and can read nothing: there is deliberately no
// public GET anywhere in the API surface.
//
//   POST /api/public/partner-application   -> partner_applications row
//   POST /api/public/blueprint-lead        -> blueprint_leads row

import { sendJson, sendError, sendServerError, readJsonBody, methodNotAllowed, getClientIp } from "../_lib/http.js";
import { isDatabaseConfigured } from "../_lib/data/supabaseAdmin.js";
import { validatePartnerApplication, validateBlueprintLead } from "../_lib/partnerNetwork/validation.js";
import { submitApplication, insertBlueprintLead } from "../_lib/partnerNetwork/services.js";
import { createWindowLimiter } from "../_lib/windowRateLimiter.js";

const MAX_BODY_BYTES = 60000;

// 10 submissions per 10 minutes per IP — far above any legitimate use.
const submitLimiter = createWindowLimiter({ windowMs: 10 * 60 * 1000, max: 10 });

export default async function handler(req, res) {
  const form = String(req.query?.form || "");
  try {
    if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

    if (!isDatabaseConfigured()) {
      // Explicit, machine-readable "not configured" — the client falls back
      // to the Formspree email path and says so, rather than failing silently.
      return sendError(res, 503, "backend_not_configured", "Submissions are temporarily handled by email only.");
    }

    const contentLength = Number(req.headers["content-length"] || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return sendError(res, 413, "payload_too_large", "Request payload exceeds the allowed size.");
    }

    const limit = submitLimiter(getClientIp(req));
    if (!limit.allowed) {
      res.setHeader("Retry-After", String(limit.retryAfterSeconds));
      return sendError(res, 429, "rate_limited", "Too many submissions — please wait a moment and try again.");
    }

    const parsed = readJsonBody(req);
    if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");

    // Honeypot: bots that fill the invisible field get a success response and
    // nothing stored (same behavior Formspree applies to _gotcha).
    if (typeof parsed.body._gotcha === "string" && parsed.body._gotcha.trim() !== "") {
      return sendJson(res, 200, { ok: true });
    }

    if (form === "partner-application") {
      const check = validatePartnerApplication(parsed.body);
      if (!check.valid) return sendError(res, 400, check.code, check.message);
      const saved = await submitApplication(check.value);
      return sendJson(res, 200, { ok: true, id: saved.id });
    }

    if (form === "blueprint-lead") {
      const check = validateBlueprintLead(parsed.body);
      if (!check.valid) return sendError(res, 400, check.code, check.message);
      const saved = await insertBlueprintLead(check.value);
      return sendJson(res, 200, { ok: true, id: saved.id });
    }

    return sendError(res, 404, "unknown_form", "Unknown form.");
  } catch (error) {
    return sendServerError(res, `public_${form}`, error);
  }
}
