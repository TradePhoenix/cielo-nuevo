import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Presentational only — every value comes from the `brief` prop
// (buildDecisionBrief.js's output shape). A future AI-enriched version can
// pass a differently-computed `brief` object here without any change to
// this component's markup, matching the same override-seam pattern already
// used by RelocationRoadmap.js and ContinueYourJourney.js.
export default function DecisionBrief({ brief }) {
  const { priorities, readiness, topMatch, considerations, nextActions } = brief;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Your Mexico Decision Brief
      </p>
      <h2 className="mb-8 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Where things stand, at a glance.
      </h2>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="break-inside-avoid">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Readiness</p>
          <p className="text-2xl font-light tracking-[-0.02em]">
            {readiness.score}/100 &middot; {readiness.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{readiness.blurb}</p>
        </div>

        {topMatch && (
          <div className="break-inside-avoid">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Leading City Match</p>
            <p className="text-2xl font-light tracking-[-0.02em]">{topMatch.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{topMatch.matchReason}</p>
          </div>
        )}

        {priorities.length > 0 && (
          <div className="break-inside-avoid">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Your Strongest Priorities</p>
            <ul className="space-y-1 text-sm leading-relaxed text-zinc-700">
              {priorities.map((priority) => (
                <li key={priority}>&bull; {priority}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="break-inside-avoid">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Worth A Closer Look</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {considerations.map((consideration) => (
              <li key={consideration}>{consideration}</li>
            ))}
          </ul>
        </div>
      </div>

      {nextActions.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Your Next {nextActions.length} Highest-Priority Actions
          </p>
          <ol className="space-y-3">
            {nextActions.map((action, index) => (
              <li key={action.title} className="flex items-start gap-3 text-zinc-800">
                <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  {action.guideLink ? (
                    <Link
                      to={action.guideLink}
                      className={`underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 ${FOCUS_RING}`}
                    >
                      {action.title}
                    </Link>
                  ) : (
                    action.title
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
