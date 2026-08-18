// Partner Network domain services — every database touch for the feature
// lives here, behind small purpose-named functions, so the HTTP handlers stay
// thin routers and the same operations are callable from tests (and from any
// future non-HTTP context, mirroring the Ask Path _lib discipline).
//
// All functions assume the caller has ALREADY authenticated/authorized the
// request (api/_lib/auth/adminAuth.js) except submitApplication and
// insertBlueprintLead, which are the two public write paths.

import { getSupabase } from "../data/supabaseAdmin.js";
import {
  partnerToRow,
  termsToRow,
  rowToPartner,
  referralToRow,
  rowToReferral,
  agreementToRow,
  rowToAgreement,
  equityToRow,
  rowToEquity,
  applicationToRow,
  rowToApplication,
  applicationToPartnerDto,
  blueprintLeadToRow,
} from "./mappers.js";
import { validatePartner, validateReferral, validateAgreement, validateEquityRecord } from "./validation.js";

const DAYS_PER_MONTH = 30;

class DbError extends Error {
  constructor(operation, cause) {
    super(`database operation failed: ${operation}`);
    this.name = "DbError";
    this.cause = cause;
  }
}

function unwrap(operation, { data, error }) {
  if (error) throw new DbError(operation, error);
  return data;
}

// Referral protection: date_introduced + the owning partner's protection
// window (stored in days). Returns YYYY-MM-DD or null.
export function computeProtectionExpiry(dateIntroduced, protectionDays) {
  if (!dateIntroduced || !protectionDays) return null;
  const d = new Date(`${dateIntroduced}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  d.setUTCDate(d.getUTCDate() + Number(protectionDays));
  return d.toISOString().slice(0, 10);
}

async function protectionDaysForPartner(partnerId) {
  if (!partnerId) return null;
  const db = getSupabase();
  const data = unwrap(
    "terms.lookup",
    await db.from("partner_commercial_terms").select("referral_protection_days").eq("partner_id", partnerId).maybeSingle()
  );
  return data?.referral_protection_days ?? null;
}

// ---------------------------------------------------------------------------
// Ledger (bootstrap read for the admin UI)

export async function fetchLedger() {
  const db = getSupabase();
  const [partners, terms, referrals, agreements, equity, applications] = await Promise.all([
    db.from("partners").select("*").order("created_at", { ascending: false }),
    db.from("partner_commercial_terms").select("*"),
    db.from("referrals").select("*").order("created_at", { ascending: false }),
    db.from("partner_agreements").select("*").order("created_at", { ascending: false }),
    db.from("equity_partner_records").select("*").order("created_at", { ascending: true }),
    db.from("partner_applications").select("*").order("submitted_at", { ascending: false }),
  ]);
  const termsByPartner = new Map(
    unwrap("terms.list", terms).map((row) => [row.partner_id, row])
  );
  return {
    partners: unwrap("partners.list", partners).map((row) => rowToPartner(row, termsByPartner.get(row.id))),
    referrals: unwrap("referrals.list", referrals).map(rowToReferral),
    agreements: unwrap("agreements.list", agreements).map(rowToAgreement),
    equityPartners: unwrap("equity.list", equity).map(rowToEquity),
    applications: unwrap("applications.list", applications).map(rowToApplication),
  };
}

// ---------------------------------------------------------------------------
// Partners (+ embedded commercial terms)

export async function savePartner(dto, { isNew = false } = {}) {
  const db = getSupabase();
  const row = partnerToRow(dto);
  const saved = isNew
    ? unwrap("partners.insert", await db.from("partners").insert(row).select("*").single())
    : unwrap(
        "partners.update",
        await db.from("partners").update(row).eq("id", dto.id).select("*").single()
      );
  const termsRow = termsToRow(saved.id, dto.terms);
  const savedTerms = unwrap(
    "terms.upsert",
    await db.from("partner_commercial_terms").upsert(termsRow, { onConflict: "partner_id" }).select("*").single()
  );
  // Terms drive referral protection — keep this partner's referral windows in sync.
  const referrals = unwrap(
    "referrals.listForPartner",
    await db.from("referrals").select("id, date_introduced").eq("partner_id", saved.id)
  );
  for (const referral of referrals) {
    const expiry = computeProtectionExpiry(referral.date_introduced, savedTerms.referral_protection_days);
    unwrap(
      "referrals.syncProtection",
      await db.from("referrals").update({ protection_expires_at: expiry }).eq("id", referral.id).select("id")
    );
  }
  return rowToPartner(saved, savedTerms);
}

export async function deletePartner(id) {
  const db = getSupabase();
  unwrap("partners.delete", await db.from("partners").delete().eq("id", id).select("id"));
}

// ---------------------------------------------------------------------------
// Referrals

export async function saveReferral(dto, { isNew = false } = {}) {
  const db = getSupabase();
  const row = referralToRow(dto);
  row.protection_expires_at = computeProtectionExpiry(
    row.date_introduced,
    await protectionDaysForPartner(row.partner_id)
  );
  const saved = isNew
    ? unwrap("referrals.insert", await db.from("referrals").insert(row).select("*").single())
    : unwrap(
        "referrals.update",
        await db.from("referrals").update(row).eq("id", dto.id).select("*").single()
      );
  return rowToReferral(saved);
}

export async function deleteReferral(id) {
  const db = getSupabase();
  unwrap("referrals.delete", await db.from("referrals").delete().eq("id", id).select("id"));
}

// ---------------------------------------------------------------------------
// Agreements

export async function saveAgreement(dto, { isNew = false } = {}) {
  const db = getSupabase();
  const row = agreementToRow(dto);
  const saved = isNew
    ? unwrap("agreements.insert", await db.from("partner_agreements").insert(row).select("*").single())
    : unwrap(
        "agreements.update",
        await db.from("partner_agreements").update(row).eq("id", dto.id).select("*").single()
      );
  return rowToAgreement(saved);
}

export async function deleteAgreement(id) {
  const db = getSupabase();
  unwrap("agreements.delete", await db.from("partner_agreements").delete().eq("id", id).select("id"));
}

// ---------------------------------------------------------------------------
// Equity records

export async function saveEquityRecord(dto, { isNew = false } = {}) {
  const db = getSupabase();
  const row = equityToRow(dto);
  const saved = isNew
    ? unwrap("equity.insert", await db.from("equity_partner_records").insert(row).select("*").single())
    : unwrap(
        "equity.update",
        await db.from("equity_partner_records").update(row).eq("id", dto.id).select("*").single()
      );
  return rowToEquity(saved);
}

export async function deleteEquityRecord(id) {
  const db = getSupabase();
  unwrap("equity.delete", await db.from("equity_partner_records").delete().eq("id", id).select("id"));
}

// ---------------------------------------------------------------------------
// Public partner applications

export async function submitApplication(dto) {
  const db = getSupabase();
  const saved = unwrap(
    "applications.insert",
    await db.from("partner_applications").insert(applicationToRow(dto)).select("id, submitted_at").single()
  );
  return { id: saved.id, submittedAt: saved.submitted_at };
}

export async function updateApplication(id, patch) {
  const db = getSupabase();
  const row = {};
  if (patch.status !== undefined) {
    row.status = patch.status;
    row.reviewed_at = new Date().toISOString();
  }
  if (patch.internalNotes !== undefined) row.internal_notes = patch.internalNotes;
  const saved = unwrap(
    "applications.update",
    await db.from("partner_applications").update(row).eq("id", id).select("*").single()
  );
  return rowToApplication(saved);
}

// Approve an application: create a Partner from applicant fields only, then
// mark the application Converted with a link to the new partner.
export async function convertApplication(id) {
  const db = getSupabase();
  const appRow = unwrap(
    "applications.get",
    await db.from("partner_applications").select("*").eq("id", id).single()
  );
  const app = rowToApplication(appRow);
  if (app.status === "Converted" && app.convertedPartnerId) {
    return { application: app, partnerId: app.convertedPartnerId, alreadyConverted: true };
  }
  const partnerCheck = validatePartner(applicationToPartnerDto(app));
  if (!partnerCheck.valid) throw new DbError(`applications.convert.validate:${partnerCheck.code}`);
  const partnerRow = { ...partnerToRow(partnerCheck.value), source_application_id: app.id };
  const partner = unwrap(
    "applications.convert.partner",
    await db.from("partners").insert(partnerRow).select("*").single()
  );
  const terms = unwrap(
    "applications.convert.terms",
    await db
      .from("partner_commercial_terms")
      .upsert(termsToRow(partner.id, partnerCheck.value.terms), { onConflict: "partner_id" })
      .select("*")
      .single()
  );
  const updatedApp = unwrap(
    "applications.convert.app",
    await db
      .from("partner_applications")
      .update({ status: "Converted", converted_partner_id: partner.id, reviewed_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single()
  );
  return {
    application: rowToApplication(updatedApp),
    partner: rowToPartner(partner, terms),
  };
}

// ---------------------------------------------------------------------------
// Blueprint leads

export async function insertBlueprintLead(dto) {
  const db = getSupabase();
  const saved = unwrap(
    "blueprintLeads.insert",
    await db.from("blueprint_leads").insert(blueprintLeadToRow(dto)).select("id").single()
  );
  return { id: saved.id };
}

// ---------------------------------------------------------------------------
// Legacy localStorage import (Phase 1 → database migration)
//
// payload is the Phase 1 export shape: { version: 1, partners, referrals,
// agreements, equityPartners }. Never destructive: existing DB rows are kept,
// records already imported (matching legacy_id) are skipped, invalid records
// are reported rather than silently dropped. dryRun previews without writing.

export async function importLegacyLedger(payload, { dryRun = true } = {}) {
  const db = getSupabase();
  const source = {
    partners: Array.isArray(payload?.partners) ? payload.partners : [],
    referrals: Array.isArray(payload?.referrals) ? payload.referrals : [],
    agreements: Array.isArray(payload?.agreements) ? payload.agreements : [],
    equityPartners: Array.isArray(payload?.equityPartners) ? payload.equityPartners : [],
  };

  const existing = {
    partners: unwrap("import.partners.existing", await db.from("partners").select("id, legacy_id, email, legal_name")),
    referrals: unwrap("import.referrals.existing", await db.from("referrals").select("legacy_id")),
    agreements: unwrap("import.agreements.existing", await db.from("partner_agreements").select("legacy_id")),
    equity: unwrap("import.equity.existing", await db.from("equity_partner_records").select("legacy_id")),
  };
  const seen = {
    partnerLegacyIds: new Set(existing.partners.map((r) => r.legacy_id).filter(Boolean)),
    partnerIdentities: new Set(
      existing.partners.map((r) => `${(r.legal_name || "").toLowerCase()}|${(r.email || "").toLowerCase()}`)
    ),
    referralLegacyIds: new Set(existing.referrals.map((r) => r.legacy_id).filter(Boolean)),
    agreementLegacyIds: new Set(existing.agreements.map((r) => r.legacy_id).filter(Boolean)),
    equityLegacyIds: new Set(existing.equity.map((r) => r.legacy_id).filter(Boolean)),
  };

  const summary = {
    partners: { imported: 0, duplicates: 0, invalid: 0 },
    referrals: { imported: 0, duplicates: 0, invalid: 0, unmatchedPartner: 0 },
    agreements: { imported: 0, duplicates: 0, invalid: 0, unmatchedPartner: 0 },
    equityPartners: { imported: 0, duplicates: 0, invalid: 0 },
    issues: [],
  };
  const note = (msg) => {
    if (summary.issues.length < 50) summary.issues.push(msg);
  };

  // --- partners
  const partnerPlans = [];
  for (const legacy of source.partners) {
    const legacyId = typeof legacy?.id === "string" ? legacy.id : null;
    if (legacyId && seen.partnerLegacyIds.has(legacyId)) {
      summary.partners.duplicates += 1;
      continue;
    }
    const identity = `${(legacy?.legalName || "").toLowerCase()}|${(legacy?.email || "").toLowerCase()}`;
    if ((legacy?.legalName || legacy?.email) && seen.partnerIdentities.has(identity)) {
      summary.partners.duplicates += 1;
      note(`Partner "${legacy?.legalName || legacy?.email}" already exists — skipped.`);
      continue;
    }
    const check = validatePartner({ ...legacy, id: undefined });
    if (!check.valid) {
      summary.partners.invalid += 1;
      note(`Partner "${legacy?.legalName || legacyId || "unknown"}": ${check.message}`);
      continue;
    }
    partnerPlans.push({ legacyId, dto: check.value, legacy });
    if (legacyId) seen.partnerLegacyIds.add(legacyId);
    seen.partnerIdentities.add(identity);
    summary.partners.imported += 1;
  }

  // legacy "ptr-…" id -> database uuid. Pre-seeded with partners already
  // imported in an earlier run, so a re-import can still attach their
  // agreements/referrals.
  const partnerIdMap = new Map(
    existing.partners.filter((r) => r.legacy_id).map((r) => [r.legacy_id, r.id])
  );

  if (!dryRun) {
    for (const plan of partnerPlans) {
      const row = {
        ...partnerToRow(plan.dto),
        legacy_id: plan.legacyId,
        ...(plan.legacy?.createdAt ? { created_at: plan.legacy.createdAt } : {}),
      };
      const saved = unwrap("import.partners.insert", await db.from("partners").insert(row).select("id").single());
      if (plan.legacyId) partnerIdMap.set(plan.legacyId, saved.id);
      unwrap(
        "import.terms.insert",
        await db
          .from("partner_commercial_terms")
          .upsert(termsToRow(saved.id, plan.dto.terms), { onConflict: "partner_id" })
          .select("partner_id")
      );
    }
  }

  // In a dry run new partners have no uuid yet — validate agreement/referral
  // shapes against a placeholder so preview counts match what commit will do.
  const DRY_RUN_PARTNER_ID = "00000000-0000-4000-8000-000000000000";
  const resolvePartnerId = (legacyPartnerId) =>
    partnerIdMap.get(legacyPartnerId) || (dryRun ? DRY_RUN_PARTNER_ID : null);
  const partnerWillExist = (legacyPartnerId) =>
    partnerIdMap.has(legacyPartnerId) || partnerPlans.some((p) => p.legacyId === legacyPartnerId);

  // --- agreements
  for (const legacy of source.agreements) {
    const legacyId = typeof legacy?.id === "string" ? legacy.id : null;
    if (legacyId && seen.agreementLegacyIds.has(legacyId)) {
      summary.agreements.duplicates += 1;
      continue;
    }
    if (!legacy?.partnerId || !partnerWillExist(legacy.partnerId)) {
      summary.agreements.unmatchedPartner += 1;
      note(`Agreement ${legacyId || "unknown"} skipped — its partner wasn't part of this import.`);
      continue;
    }
    const check = validateAgreement({ ...legacy, id: undefined, partnerId: resolvePartnerId(legacy.partnerId) });
    if (!check.valid) {
      summary.agreements.invalid += 1;
      note(`Agreement ${legacyId || "unknown"}: ${check.message}`);
      continue;
    }
    if (!dryRun) {
      const row = {
        ...agreementToRow(check.value),
        legacy_id: legacyId,
        ...(legacy?.createdAt ? { created_at: legacy.createdAt } : {}),
      };
      unwrap("import.agreements.insert", await db.from("partner_agreements").insert(row).select("id"));
    }
    summary.agreements.imported += 1;
  }

  // --- referrals
  for (const legacy of source.referrals) {
    const legacyId = typeof legacy?.id === "string" ? legacy.id : null;
    if (legacyId && seen.referralLegacyIds.has(legacyId)) {
      summary.referrals.duplicates += 1;
      continue;
    }
    const hasPartner = legacy?.partnerId && partnerWillExist(legacy.partnerId);
    if (legacy?.partnerId && !hasPartner) summary.referrals.unmatchedPartner += 1;
    const check = validateReferral({
      ...legacy,
      id: undefined,
      partnerId: hasPartner ? resolvePartnerId(legacy.partnerId) : "",
    });
    if (!check.valid) {
      summary.referrals.invalid += 1;
      note(`Referral ${legacyId || "unknown"}: ${check.message}`);
      continue;
    }
    if (!dryRun) {
      const row = {
        ...referralToRow(check.value),
        legacy_id: legacyId,
        ...(legacy?.createdAt ? { created_at: legacy.createdAt } : {}),
      };
      row.protection_expires_at = computeProtectionExpiry(
        row.date_introduced,
        await protectionDaysForPartner(row.partner_id)
      );
      unwrap("import.referrals.insert", await db.from("referrals").insert(row).select("id"));
    }
    summary.referrals.imported += 1;
  }

  // --- equity
  for (const legacy of source.equityPartners) {
    const legacyId = typeof legacy?.id === "string" ? legacy.id : null;
    if (legacyId && seen.equityLegacyIds.has(legacyId)) {
      summary.equityPartners.duplicates += 1;
      continue;
    }
    const check = validateEquityRecord({ ...legacy, id: undefined });
    if (!check.valid) {
      summary.equityPartners.invalid += 1;
      note(`Equity record ${legacy?.legalName || legacyId || "unknown"}: ${check.message}`);
      continue;
    }
    if (!dryRun) {
      const row = {
        ...equityToRow(check.value),
        legacy_id: legacyId,
        ...(legacy?.createdAt ? { created_at: legacy.createdAt } : {}),
      };
      unwrap("import.equity.insert", await db.from("equity_partner_records").insert(row).select("id"));
    }
    summary.equityPartners.imported += 1;
  }

  return { dryRun, summary };
}
