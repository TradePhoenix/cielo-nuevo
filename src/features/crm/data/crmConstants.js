// PTM launch CRM — canonical vocabulary. Every stage/source/service value
// in the CRM resolves through this file; nothing else re-declares these
// lists. (Deliberately NOT the 11-stage vocabulary from the unmerged
// feature/crm-dashboard branch — the October 1 launch pipeline is these
// nine stages, exactly.)

export const CRM_STAGES = [
  { id: "new-lead", label: "New Lead", kind: "active" },
  { id: "contacted", label: "Contacted", kind: "active" },
  { id: "fit-call-booked", label: "Fit Call Booked", kind: "active" },
  { id: "fit-call-completed", label: "Fit Call Completed", kind: "active" },
  { id: "roadmap-offered", label: "Roadmap Offered", kind: "active" },
  { id: "roadmap-purchased", label: "Roadmap Purchased", kind: "active" },
  { id: "active-client", label: "Guided Landing / Active Client", kind: "active" },
  { id: "follow-up", label: "Follow-Up / Nurture", kind: "active" },
  { id: "closed", label: "Closed / Not Now", kind: "closed" },
];

export const CRM_STAGE_MAP = Object.fromEntries(CRM_STAGES.map((s) => [s.id, s]));

export function stageLabel(id) {
  return CRM_STAGE_MAP[id] ? CRM_STAGE_MAP[id].label : id;
}

// Acquisition sources. Flexible by design: a lead keeps whatever source id
// it was created with even if this list evolves (future UTM attribution
// can add ids without migrating existing records).
export const CRM_SOURCES = [
  { id: "blueprint", label: "My Mexico Blueprint" },
  { id: "homepage", label: "Homepage" },
  { id: "free-guide", label: "Free Guide" },
  { id: "ask-path", label: "Ask Path" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "referral", label: "Referral" },
  { id: "organic-search", label: "Organic Search" },
  { id: "google-ads", label: "Google Ads" },
  { id: "social", label: "Social" },
  { id: "partner", label: "Partner" },
  { id: "manual", label: "Manual" },
];

export const CRM_SOURCE_MAP = Object.fromEntries(CRM_SOURCES.map((s) => [s.id, s]));

export function sourceLabel(id) {
  return CRM_SOURCE_MAP[id] ? CRM_SOURCE_MAP[id].label : id;
}

// Service interest. defaultValue is a USD estimate used ONLY when the
// operator picks that service and hasn't typed a value; Guided Landing is
// custom-quoted (no verified price exists), so it never auto-fills a value.
export const CRM_SERVICES = [
  { id: "undecided", label: "Undecided", defaultValue: null },
  { id: "fit-call", label: "Mexico Fit Call ($99)", defaultValue: 99 },
  { id: "roadmap", label: "Relocation Roadmap (from $499)", defaultValue: 499 },
  { id: "guided-landing", label: "Guided Landing (custom quote)", defaultValue: null },
];

export const CRM_SERVICE_MAP = Object.fromEntries(CRM_SERVICES.map((s) => [s.id, s]));

export function defaultValueForService(serviceId) {
  const service = CRM_SERVICE_MAP[serviceId];
  return service && typeof service.defaultValue === "number" ? service.defaultValue : null;
}
