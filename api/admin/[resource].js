// /api/admin/:resource — the authenticated Partner Network API.
//
// One Vercel function (dynamic segment) so the deployment stays within
// function limits; the actual work is delegated to coherent domain services
// in api/_lib/partnerNetwork/services.js — this file is routing, auth, and
// validation only. EVERY branch calls requireAdmin() before touching data.
//
//   GET    /api/admin/ledger                     full ledger bootstrap
//   POST   /api/admin/partners                   create   (body: partner DTO with client uuid)
//   PUT    /api/admin/partners                   update   (body: partner DTO)
//   DELETE /api/admin/partners?id=…              delete (cascades terms/agreements/referrals)
//   POST/PUT/DELETE /api/admin/referrals         same shape
//   POST/PUT/DELETE /api/admin/agreements        same shape
//   POST/PUT/DELETE /api/admin/equity            same shape
//   PUT    /api/admin/applications?id=…          review patch {status?, internalNotes?}
//   POST   /api/admin/applications               {action:"convert", id} -> creates Partner
//   POST   /api/admin/import                     {payload, dryRun} legacy localStorage migration

import { sendJson, sendError, sendServerError, readJsonBody, methodNotAllowed } from "../_lib/http.js";
import { requireAdmin } from "../_lib/auth/adminAuth.js";
import { isDatabaseConfigured } from "../_lib/data/supabaseAdmin.js";
import {
  validatePartner,
  validateReferral,
  validateAgreement,
  validateEquityRecord,
  validateApplicationReview,
  isUuid,
} from "../_lib/partnerNetwork/validation.js";
import * as services from "../_lib/partnerNetwork/services.js";

const MAX_BODY_BYTES = 100000;
const MAX_IMPORT_BODY_BYTES = 2000000;

const CRUD = {
  partners: {
    validate: validatePartner,
    save: services.savePartner,
    remove: services.deletePartner,
  },
  referrals: {
    validate: validateReferral,
    save: services.saveReferral,
    remove: services.deleteReferral,
  },
  agreements: {
    validate: validateAgreement,
    save: services.saveAgreement,
    remove: services.deleteAgreement,
  },
  equity: {
    validate: validateEquityRecord,
    save: services.saveEquityRecord,
    remove: services.deleteEquityRecord,
  },
};

export default async function handler(req, res) {
  const resource = String(req.query?.resource || "");
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return sendError(res, auth.status, auth.error, auth.message);
    if (!isDatabaseConfigured()) {
      return sendError(res, 503, "backend_not_configured", "The PTM database is not configured in this environment.");
    }

    const contentLength = Number(req.headers["content-length"] || 0);
    const byteLimit = resource === "import" ? MAX_IMPORT_BODY_BYTES : MAX_BODY_BYTES;
    if (contentLength > byteLimit) {
      return sendError(res, 413, "payload_too_large", "Request payload exceeds the allowed size.");
    }

    // --- ledger -------------------------------------------------------------
    if (resource === "ledger") {
      if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
      return sendJson(res, 200, await services.fetchLedger());
    }

    // --- applications review ------------------------------------------------
    if (resource === "applications") {
      if (req.method === "PUT") {
        const id = String(req.query?.id || "");
        if (!isUuid(id)) return sendError(res, 400, "invalid_id", "Application id must be a UUID.");
        const parsed = readJsonBody(req);
        if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");
        const check = validateApplicationReview(parsed.body);
        if (!check.valid) return sendError(res, 400, check.code, check.message);
        return sendJson(res, 200, await services.updateApplication(id, check.value));
      }
      if (req.method === "POST") {
        const parsed = readJsonBody(req);
        if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");
        if (parsed.body.action !== "convert" || !isUuid(parsed.body.id)) {
          return sendError(res, 400, "invalid_action", 'POST /applications expects {action:"convert", id}.');
        }
        return sendJson(res, 200, await services.convertApplication(parsed.body.id));
      }
      return methodNotAllowed(res, ["POST", "PUT"]);
    }

    // --- legacy import ------------------------------------------------------
    if (resource === "import") {
      if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
      const parsed = readJsonBody(req);
      if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");
      const { payload, dryRun } = parsed.body;
      if (!payload || typeof payload !== "object" || !Array.isArray(payload.partners)) {
        return sendError(res, 400, "invalid_payload", "That doesn't look like a Partner Network export.");
      }
      return sendJson(res, 200, await services.importLegacyLedger(payload, { dryRun: dryRun !== false }));
    }

    // --- entity CRUD --------------------------------------------------------
    const crud = CRUD[resource];
    if (!crud) return sendError(res, 404, "unknown_resource", "Unknown admin resource.");

    if (req.method === "DELETE") {
      const id = String(req.query?.id || "");
      if (!isUuid(id)) return sendError(res, 400, "invalid_id", "id must be a UUID.");
      await crud.remove(id);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "POST" || req.method === "PUT") {
      const parsed = readJsonBody(req);
      if (!parsed.ok) return sendError(res, 400, "invalid_json", "Request body must be a JSON object.");
      const check = crud.validate(parsed.body, { requireId: true });
      if (!check.valid) return sendError(res, 400, check.code, check.message);
      const saved = await crud.save(check.value, { isNew: req.method === "POST" });
      return sendJson(res, 200, saved);
    }

    return methodNotAllowed(res, ["POST", "PUT", "DELETE"]);
  } catch (error) {
    return sendServerError(res, `admin_${resource}`, error);
  }
}
