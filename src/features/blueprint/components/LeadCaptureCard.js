import { useEffect, useMemo, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { BLUEPRINT_UI } from "../data/uiCopy";
import { buildLeadPayload } from "../logic/buildLeadPayload";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// CONV/P0-1 — Blueprint lead capture. Shown between the loading sequence
// and the results reveal (see useBlueprintState.js). Reuses the site's one
// verified lead-delivery pathway — the same Formspree form ("xdabqdyq")
// already live on HomePage.js, FreeGuidePage.js, and Ask Path's
// HandoffForm.js — with `source: blueprint-v2` so these leads read
// distinctly in the same inbox. The visitor's answers live in
// localStorage/state, so a failed submission loses nothing: the form stays
// on screen with an error line and can simply be retried.
//
// The Privacy Policy link is a plain <a> opening a new tab on purpose: a
// router <Link> would navigate this tab away mid-flow, and this component
// staying router-free follows the established Jest constraint (see
// mexicoFitCallContext.js) that react-router-dom can't be imported,
// even transitively, in testable Blueprint modules.
export default function LeadCaptureCard({
  answers,
  recommendation,
  sessionId,
  lang = "en",
  onSuccess,
  onBack,
  onContinueAnyway,
}) {
  const ui = BLUEPRINT_UI[lang].leadCapture;
  const [state, handleSubmit] = useForm("xdabqdyq");
  const payload = useMemo(() => buildLeadPayload(answers, recommendation), [answers, recommendation]);

  // Set at the moment of submission (not render) so the captured timestamp
  // is the real submission time.
  const submittedAtRef = useRef(null);
  // Reveal exactly once per successful submission, even if this effect
  // re-runs.
  const revealedRef = useRef(false);
  // Contact fields captured at submit time (the inputs are uncontrolled) so
  // the database copy below can include them after Formspree succeeds.
  const contactRef = useRef({ firstName: "", email: "" });

  useEffect(() => {
    if (state.succeeded && !revealedRef.current) {
      revealedRef.current = true;
      // DATA-001: best-effort durable copy of this lead in the PTM database
      // (POST /api/public/blueprint-lead). Formspree remains the delivery
      // channel that gates the UX above; this call is fire-and-forget and can
      // never affect the visitor's flow — any failure is simply ignored.
      try {
        if (typeof fetch === "function") {
          fetch("/api/public/blueprint-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: contactRef.current.firstName,
              email: contactRef.current.email,
              language: lang,
              sessionId: sessionId || "",
              readinessScore: payload.readinessScore,
              archetype: payload.archetype,
              topDestinations: payload.topDestinations,
              answers: payload.answersRaw,
              source: "blueprint-v2",
              consent: true,
            }),
          }).catch(() => {});
        }
      } catch (error) {
        // Never let persistence problems touch the visitor experience.
      }
      onSuccess();
    }
  }, [state.succeeded, onSuccess, lang, sessionId, payload]);

  const onSubmit = (event) => {
    // Duplicate-click guard: a submission already in flight (or already
    // succeeded) must never fire a second POST.
    if (state.submitting || state.succeeded) {
      event.preventDefault();
      return;
    }
    if (submittedAtRef.current) {
      submittedAtRef.current.value = new Date().toISOString();
    }
    try {
      const form = event.target;
      contactRef.current = {
        firstName: form.elements.firstName?.value || "",
        email: form.elements.email?.value || "",
      };
    } catch (error) {
      // Best-effort capture only.
    }
    handleSubmit(event);
  };

  const showError = !state.submitting && !state.succeeded && state.errors != null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{ui.eyebrow}</p>
        <h2 className="mt-5 text-3xl font-light leading-tight tracking-[-0.04em] text-zinc-950 sm:text-4xl">
          {ui.title}
        </h2>
        <p className="mt-5 leading-relaxed text-zinc-600">{ui.text}</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate={false}>
          <input type="hidden" name="_subject" value="New Blueprint Lead — blueprint-v2" />
          <input type="hidden" name="source" value="blueprint-v2" />
          <input type="hidden" name="form_name" value="blueprint_lead" />
          <input type="hidden" name="page" value="/my-mexico-blueprint" />
          <input type="hidden" name="language" value={lang} />
          {/* Formspree honeypot: hidden from real users (display:none keeps
              it out of the tab order and accessibility tree); bots that fill
              it are silently dropped by Formspree. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <input type="hidden" name="sessionId" value={sessionId || ""} />
          <input type="hidden" name="submittedAt" ref={submittedAtRef} defaultValue="" />
          <input type="hidden" name="readinessScore" value={payload.readinessScore} />
          <input type="hidden" name="archetype" value={payload.archetype} />
          <input type="hidden" name="topDestinations" value={payload.topDestinations} />
          <input type="hidden" name="answers" value={payload.answersSummary} />
          <input type="hidden" name="answersRaw" value={payload.answersRaw} />

          <div>
            <label htmlFor="blueprint-first-name" className="sr-only">
              {ui.firstName}
            </label>
            <input
              id="blueprint-first-name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder={ui.firstName}
              required
              className={`w-full border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950 ${FOCUS_RING}`}
            />
            <ValidationError field="firstName" errors={state.errors} />
          </div>

          <div>
            <label htmlFor="blueprint-email" className="sr-only">
              {ui.email}
            </label>
            <input
              id="blueprint-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={ui.email}
              required
              className={`w-full border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950 ${FOCUS_RING}`}
            />
            <ValidationError field="email" errors={state.errors} />
          </div>

          <label className="flex items-start gap-3 text-xs leading-relaxed text-zinc-500">
            <input type="checkbox" name="consent" required className={`mt-0.5 ${FOCUS_RING}`} />
            <span>
              {ui.consentPrefix}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
              >
                {ui.consentLinkLabel}
              </a>
              {ui.consentSuffix}
            </span>
          </label>

          {showError && (
            <p role="alert" className="text-sm leading-relaxed text-[#E36F4F]">
              {ui.error}
            </p>
          )}

          {/* Graceful degradation: only after a real failed attempt may the
              visitor view their completed Blueprint without the submission
              landing — leadCaptured stays false and the results screen keeps
              offering a retry (see useBlueprintState.js). */}
          {showError && onContinueAnyway && (
            <button
              type="button"
              onClick={onContinueAnyway}
              className={`justify-self-start text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
            >
              {ui.continueAfterError}
            </button>
          )}

          <button
            type="submit"
            disabled={state.submitting || state.succeeded}
            className={`mt-2 bg-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#d8a15f] disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS_RING}`}
          >
            {state.submitting ? ui.submitting : ui.submit}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onBack}
          className={`text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
        >
          {ui.back}
        </button>
      </div>
    </div>
  );
}
