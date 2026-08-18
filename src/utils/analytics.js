// CONV-001 — Conversion measurement. No analytics provider exists anywhere
// in this codebase today (confirmed: no gtag/dataLayer/analytics SDK
// import, no new package installed here). This is deliberately just a
// clean internal event interface: every commercial-intent UI call site
// (FitCallBar, ResultsCTA, the Mexico Fit Call and Work With Us pages)
// calls trackEvent() the same way a real provider call would be made, so
// wiring up an actual analytics tool later is a one-line change inside
// this file — never a change to any component that calls it.
//
// In development, events log to the console so they're visible during
// QA/manual testing. In production, this is currently a deliberate no-op
// (see the flagged business decision in CONV-001's final report: which
// analytics provider, if any, is out of this ticket's scope to decide).
export function trackEvent(name, payload = {}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, payload);
  }
  // Future real provider call goes here, e.g.:
  //   window.dataLayer?.push({ event: name, ...payload });
  // Intentionally absent until a provider is chosen.
}

// Named, stable event constants — every call site should use one of these
// rather than a free-text string, so a future analytics dashboard can rely
// on a fixed, known event vocabulary instead of grepping for typos.
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
};
