// LAUNCH-W1 — shared consent metadata for every Formspree-backed form that
// collects personal details. Each submission carries:
//   consent                 how consent was given ("notice" = the visitor
//                           submitted beneath the consent notice; the forms
//                           with an explicit checkbox send "checkbox")
//   consent_notice_version  which wording they saw (bump when the text changes)
//   consent_source          the form_name, so the record is self-describing
//   consent_at              ISO timestamp stamped at the moment of submit
//   language                already sent by every form
// Keep this file free of React so it stays trivially unit-testable.

export const CONSENT_NOTICE_VERSION = "2026-08-20";

export const CONSENT_COPY = {
  en: {
    prefix: "By submitting, you agree that Path To Mexico may use these details to respond to you, as described in our ",
    privacy: "Privacy Policy",
    joiner: " and ",
    terms: "Terms of Service",
    suffix: ". We never sell your information.",
  },
  es: {
    prefix: "Al enviar, aceptas que Path To Mexico use estos datos para responderte, como se describe en nuestra ",
    privacy: "Política de Privacidad",
    joiner: " y nuestros ",
    terms: "Términos de Servicio",
    suffix: ". Nunca vendemos tu información.",
  },
};

// Called from a form's onSubmit *before* handing the event to Formspree's
// handleSubmit, which serializes the live DOM. Writing the value straight
// onto the hidden input is the only way to guarantee the timestamp reflects
// the actual submit moment rather than the last React render.
export function stampConsentTimestamp(formElement, now = new Date()) {
  if (!formElement || typeof formElement.querySelector !== "function") return null;
  const field = formElement.querySelector('input[name="consent_at"]');
  if (!field) return null;
  const iso = now.toISOString();
  field.value = iso;
  return iso;
}
