import { useState } from "react";
import { readBlueprintSummary } from "../logic/readBlueprintSummary";

// Explicit opt-in only — never reads localStorage until this button is
// clicked. Per the ticket: explain what will be shared, allow declining,
// never silently personalize.
export default function BlueprintOptIn({ t, onAccept, onDecline, trackEvent, ANALYTICS_EVENTS }) {
  const [notFound, setNotFound] = useState(false);

  function handleAccept() {
    const summary = readBlueprintSummary();
    if (!summary) {
      setNotFound(true);
      trackEvent?.(ANALYTICS_EVENTS.ASK_PATH_BLUEPRINT_DECLINED, { reason: "not_found" });
      return;
    }
    trackEvent?.(ANALYTICS_EVENTS.ASK_PATH_BLUEPRINT_ACCEPTED);
    onAccept(summary);
  }

  function handleDecline() {
    trackEvent?.(ANALYTICS_EVENTS.ASK_PATH_BLUEPRINT_DECLINED, { reason: "user_declined" });
    onDecline();
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-[#f6f1e8] p-4 text-sm text-zinc-700">
      <p className="font-medium text-zinc-900">{t.blueprintOptInPrompt}</p>
      <p className="mt-1 text-xs text-zinc-500">{t.blueprintOptInExplain}</p>
      {notFound ? (
        <p className="mt-2 text-xs text-zinc-500">{t.blueprintNotFound}</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.blueprintOptInAccept}
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.blueprintOptInDecline}
          </button>
        </div>
      )}
    </div>
  );
}
