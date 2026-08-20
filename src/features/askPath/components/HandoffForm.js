import { useEffect, useRef, useState } from "react";
import { useForm } from "@formspree/react";
import { buildHandoffSummary } from "../logic/buildHandoffSummary";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

// Reuses the exact same Formspree form ("xdabqdyq") already live in
// production on HomePage.js and FreeGuidePage.js — the one verified,
// working lead-delivery pathway in this codebase — rather than inventing a
// second, unverified one. `source: "ask-path"` tags every submission so it
// reads distinctly from the homepage contact form in Kalen's inbox.
export default function HandoffForm({ t, messages, language }) {
  const [state, handleSubmit] = useForm("xdabqdyq");
  const [consent, setConsent] = useState(false);
  const trackedRef = useRef(false);

  // LAUNCH-W1: the request was tracked upstream; this records the completed
  // submission (no contents, just the language).
  useEffect(() => {
    if (state.succeeded && !trackedRef.current) {
      trackedRef.current = true;
      trackEvent(ANALYTICS_EVENTS.ASK_PATH_HANDOFF_SUBMITTED, { language });
    }
  }, [state.succeeded, language]);

  if (state.succeeded) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
        <p className="font-medium text-zinc-900">{t.handoffSuccessTitle}</p>
        <p className="mt-1 text-zinc-600">{t.handoffSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
      <p className="font-medium text-zinc-900">{t.handoffIntro}</p>

      <input type="hidden" name="_subject" value="New Ask Path Handoff — ask-path" />
      <input type="hidden" name="source" value="ask-path" />
      <input type="hidden" name="form_name" value="ask_path_handoff" />
      <input
        type="hidden"
        name="page"
        value={typeof window !== "undefined" ? window.location.pathname : ""}
      />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="conversationSummary" value={buildHandoffSummary(messages)} />
      {/* Formspree honeypot: display:none keeps it out of the tab order and
          accessibility tree; bots that fill it are silently dropped. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-3 grid gap-2">
        <input
          required
          name="name"
          placeholder={t.handoffName}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-950"
        />
        <input
          required
          type="email"
          name="email"
          placeholder={t.handoffEmail}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-950"
        />
        <input
          name="whatsapp"
          placeholder={t.handoffWhatsapp}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-950"
        />
        <input
          name="timeframe"
          placeholder={t.handoffTimeframe}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-950"
        />
        <input
          name="destinations"
          placeholder={t.handoffDestinations}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-950"
        />
      </div>

      <label className="mt-3 flex items-start gap-2 text-xs text-zinc-600">
        <input
          required
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        {t.handoffConsent}
      </label>

      <button
        type="submit"
        disabled={state.submitting || !consent}
        className="mt-3 w-full rounded-full bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#d8a15f] disabled:opacity-50"
      >
        {state.submitting ? t.handoffSubmitting : t.handoffSubmit}
      </button>
    </form>
  );
}
