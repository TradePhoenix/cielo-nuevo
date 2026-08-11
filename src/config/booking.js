// REV-001 — Paid Mexico Fit Call booking links.
//
// Single source of truth for the two approved public Calendly events.
// English UI must always route to the English event and Spanish UI to the
// Spanish one — resolve via getCalendlyUrl(lang), never hardcode these
// URLs inside a page.
//
// Never link the private Calendly management URL or the generic /30min
// event anywhere on the site.
export const CALENDLY_EVENTS = {
  en: "https://calendly.com/pathwaytomexico/mexico-fit-call",
  es: "https://calendly.com/pathwaytomexico/llamada-mexico-fit",
};

export function getCalendlyUrl(lang) {
  return CALENDLY_EVENTS[lang === "es" ? "es" : "en"];
}
