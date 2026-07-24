import { Link } from "react-router-dom";
import { TAG_LABELS } from "../data/copy";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// CX-005 — the primary destination is the emotional center of the results
// screen: revealed first, on its own, before the readiness score or any
// alternative city gets a chance to compete for attention ("the primary
// recommendation should remain the emotional focus"). Built entirely from
// fields recommendationEngine.js already computes and exposes —
// `matchReason` and `decisionTrace` (added by ENG-016, previously
// unrendered anywhere) — so nothing here changes any scoring, ranking, or
// matching logic, only what's displayed and in what order.
export default function ResultsDiscovery({ topMatch }) {
  const fitFactors = (topMatch.decisionTrace || [])
    .map((trace) => TAG_LABELS[trace.signal] || trace.signal)
    .slice(0, 4);

  return (
    <div className="border-b border-zinc-300 pb-14 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-zinc-500">
        A Strong Place To Begin
      </p>

      <h2 className="text-4xl font-light tracking-[-0.03em] text-zinc-950 sm:text-6xl">
        {topMatch.name}
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
        {topMatch.matchReason}
      </p>

      {fitFactors.length > 0 && (
        <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {fitFactors.map((factor) => (
            <span
              key={factor}
              className="border border-zinc-300 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-zinc-600"
            >
              {factor}
            </span>
          ))}
        </div>
      )}

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link
          to={`/my-mexico-plan/${topMatch.id}`}
          className={`bg-zinc-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#d8a15f] ${FOCUS_RING}`}
        >
          See Your Plan For {topMatch.name}
        </Link>
        <Link
          to={topMatch.guideLink}
          className={`border border-zinc-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white ${FOCUS_RING}`}
        >
          Read The Guide
        </Link>
      </div>
    </div>
  );
}
