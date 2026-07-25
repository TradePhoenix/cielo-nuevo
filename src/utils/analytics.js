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
};
