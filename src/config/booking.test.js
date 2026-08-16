// REV-001 / Launch fix #2 — the two approved public Calendly events are
// load-bearing for every revenue CTA on the site. These tests pin the exact
// URLs and the language mapping so a slug change can never slip in silently.
import { CALENDLY_EVENTS, getCalendlyUrl } from "./booking";

test("the approved English and Spanish Calendly events are exact", () => {
  expect(CALENDLY_EVENTS.en).toBe("https://calendly.com/pathwaytomexico/mexico-fit-call");
  expect(CALENDLY_EVENTS.es).toBe("https://calendly.com/pathwaytomexico/llamada-mexico-fit");
});

test("getCalendlyUrl maps Spanish to the Spanish event and everything else to English", () => {
  expect(getCalendlyUrl("es")).toBe(CALENDLY_EVENTS.es);
  expect(getCalendlyUrl("en")).toBe(CALENDLY_EVENTS.en);
  expect(getCalendlyUrl(undefined)).toBe(CALENDLY_EVENTS.en);
  expect(getCalendlyUrl("fr")).toBe(CALENDLY_EVENTS.en);
});
