// Conversion measurement.
//
// Provider: Vercel Web Analytics, loaded production-only by
// utils/vercelAnalytics.js (no npm dependency — the project already has Web
// Analytics enabled, so the collector is served from /_vercel/insights/).
// Every commercial-intent UI call site calls trackEvent() with a name from
// ANALYTICS_EVENTS and a small structured payload; this file is the only
// place that knows how events leave the browser.
//
// Privacy contract (enforced here, not trusted to call sites): payloads are
// reduced to short primitive values, and any key that looks like personal
// data — names, emails, phones, messages, free-text answers — is dropped
// before dispatch. Analytics receives *that* a lead form was submitted,
// never *what* was in it.
//
// In development, events log to the console so they're visible during QA.

const SENSITIVE_KEY = /(^|_)(e-?mail|name|first|last|phone|whatsapp|tel|message|answer|note|address|rfc|tax|summary|text|comment|feeling|password)/i;
const MAX_VALUE_LENGTH = 80;

export function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object") return {};
  const clean = {};
  for (const [key, value] of Object.entries(payload)) {
    if (SENSITIVE_KEY.test(key)) continue;
    if (typeof value === "string") {
      if (value.includes("@")) continue; // never let an email through under any key
      clean[key] = value.length > MAX_VALUE_LENGTH ? value.slice(0, MAX_VALUE_LENGTH) : value;
    } else if (typeof value === "number" || typeof value === "boolean") {
      clean[key] = value;
    }
    // objects / arrays / null / undefined are dropped: custom-event data must be flat
  }
  return clean;
}

export function trackEvent(name, payload = {}) {
  const data = sanitizePayload(payload);
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, data);
  }
  if (typeof window !== "undefined" && typeof window.va === "function") {
    try {
      window.va("event", { name, data });
    } catch (error) {
      // Analytics must never break a conversion path.
    }
  }
}

// Named, stable event constants — every call site should use one of these
// rather than a free-text string, so the analytics dashboard can rely on a
// fixed, known event vocabulary instead of grepping for typos.
export const ANALYTICS_EVENTS = {
  PRICING_VIEWED: "pricing_viewed",
  FIT_CALL_CTA_CLICKED: "fit_call_cta_clicked",
  SERVICES_CTA_CLICKED: "services_cta_clicked",
  SERVICE_TIER_CTA_CLICKED: "service_tier_cta_clicked",

  // ASK PATH-001 — additive only, no existing event above was touched.
  // Payloads are deliberately small structured signals (ids, categories,
  // booleans), never raw conversation text — see the privacy requirements
  // in the Ask Path spec.
  ASK_PATH_OPENED: "ask_path_opened",
  ASK_PATH_CONVERSATION_STARTED: "ask_path_conversation_started",
  ASK_PATH_PROMPT_SELECTED: "ask_path_prompt_selected",
  ASK_PATH_SOURCE_CLICKED: "ask_path_source_clicked",
  ASK_PATH_BLUEPRINT_OFFERED: "ask_path_blueprint_offered",
  ASK_PATH_BLUEPRINT_ACCEPTED: "ask_path_blueprint_accepted",
  ASK_PATH_BLUEPRINT_DECLINED: "ask_path_blueprint_declined",
  ASK_PATH_HUMAN_HANDOFF_REQUESTED: "ask_path_human_handoff_requested",
  ASK_PATH_FIT_CALL_SELECTED: "ask_path_fit_call_selected",
  ASK_PATH_QUALIFIED_INTENT_REACHED: "ask_path_qualified_intent_reached",
  ASK_PATH_ERROR: "ask_path_error",

  // Partner Network Phase 1 — additive only.
  PARTNER_APPLY_CTA_CLICKED: "partner_apply_cta_clicked",
  PARTNER_APPLICATION_SUBMITTED: "partner_application_submitted",

  // WEDDINGS-001 — additive only. CTA clicks carry a `source`/`cta`
  // payload (weddings_hero, weddings_closing) rather than separate events.
  WEDDINGS_PAGE_VIEWED: "weddings_page_viewed",
  WEDDINGS_CTA_CLICKED: "weddings_cta_clicked",
  WEDDINGS_INQUIRY_VIEWED: "weddings_inquiry_viewed",
  WEDDINGS_INQUIRY_SUBMITTED: "weddings_inquiry_submitted",

  // LAUNCH-W1 — the funnel events that were dark until now. Payloads carry
  // the form name / language / step counts only.
  BLUEPRINT_STARTED: "blueprint_started",
  BLUEPRINT_COMPLETED: "blueprint_completed",
  LEAD_FORM_SUBMITTED: "lead_form_submitted",
  FREE_GUIDE_REQUESTED: "free_guide_requested",
  ASK_PATH_HANDOFF_SUBMITTED: "ask_path_handoff_submitted",
};
