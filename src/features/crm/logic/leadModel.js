// PTM launch CRM — lead record shape and mutations. Pure functions
// (plain data in, plain data out) so the store and tests share one
// definition of what a valid lead is.
import { CRM_STAGE_MAP, defaultValueForService } from "../data/crmConstants";

// YYYY-MM-DD in the operator's local time — the CRM is an internal tool
// used from Kalen's own machine, so "today" means his today.
export function localDateISO(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function makeLeadId(now = new Date()) {
  return `crm-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// A lead is creatable with just a name, one contact method, and a source —
// everything else can be completed later.
export function validateNewLead(input) {
  const errors = [];
  if (!input || !String(input.name || "").trim()) errors.push("Name is required.");
  if (!String(input?.email || "").trim() && !String(input?.phone || "").trim()) {
    errors.push("At least one contact method (email or phone/WhatsApp) is required.");
  }
  if (!String(input?.source || "").trim()) errors.push("Lead source is required.");
  return errors;
}

export function createLead(input, now = new Date()) {
  const createdAt = now.toISOString();
  const serviceInterest = input.serviceInterest || "undecided";
  const estimatedValue =
    typeof input.estimatedValue === "number" && input.estimatedValue >= 0
      ? input.estimatedValue
      : defaultValueForService(serviceInterest);

  return {
    id: makeLeadId(now),
    name: String(input.name || "").trim(),
    email: String(input.email || "").trim(),
    phone: String(input.phone || "").trim(),
    source: input.source || "manual",
    destination: String(input.destination || "").trim(),
    timeline: String(input.timeline || "").trim(),
    serviceInterest,
    // null means "no value entered/derived" — never invented revenue.
    estimatedValue,
    stage: CRM_STAGE_MAP[input.stage] ? input.stage : "new-lead",
    lastContact: input.lastContact || "",
    nextAction: String(input.nextAction || "").trim(),
    nextActionDate: input.nextActionDate || "",
    notes: String(input.notes || ""),
    language: input.language || "en",
    // Blueprint qualification (optional, surfaced fields only — never the
    // raw payload blob).
    blueprintCompleted: input.blueprintCompleted === true,
    readinessScore: input.readinessScore ?? null,
    fitCallDate: input.fitCallDate || "",
    createdAt,
    updatedAt: createdAt,
  };
}

// Merge a partial edit into a lead. Unknown stage ids are rejected rather
// than stored; picking a service with a default value fills an empty
// estimate but never overwrites one the operator typed.
export function applyLeadUpdate(lead, patch, now = new Date()) {
  const next = { ...lead, ...patch };
  if (patch.stage && !CRM_STAGE_MAP[patch.stage]) next.stage = lead.stage;
  if (
    patch.serviceInterest &&
    patch.serviceInterest !== lead.serviceInterest &&
    (lead.estimatedValue === null || lead.estimatedValue === undefined) &&
    patch.estimatedValue === undefined
  ) {
    next.estimatedValue = defaultValueForService(patch.serviceInterest);
  }
  next.updatedAt = now.toISOString();
  return next;
}

// True when the parsed object is a plausible CRM export we can import.
export function isValidLeadArray(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (lead) =>
        lead &&
        typeof lead === "object" &&
        typeof lead.id === "string" &&
        typeof lead.name === "string" &&
        typeof lead.stage === "string"
    )
  );
}
