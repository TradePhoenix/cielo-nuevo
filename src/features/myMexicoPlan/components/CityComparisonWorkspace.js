import { Link } from "react-router-dom";
import CompareYourMatches from "../../yourMexico/components/CompareYourMatches";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Presentational only — every value comes from the `comparison` prop
// (buildCityComparison.js's output shape) and the `matches` prop passed
// straight through to the existing CompareYourMatches component (reused
// unmodified — no second lifestyle/cost comparison table is built here).
// A future AI-enriched version can pass a differently-computed
// `comparison` object without any change to this component's markup,
// matching the same override-seam pattern used by every other My Mexico
// Plan section.
export default function CityComparisonWorkspace({ comparison, matches }) {
  const { cities, verifyPersonally } = comparison;

  if (cities.length === 0) return null;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">City Comparison Workspace</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Why each match, side by side.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">
        Your top {cities.length} city match{cities.length > 1 ? "es" : ""}, ranked by your own
        Blueprint answers — not a guarantee, just where your answers point today.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <div
            key={city.id}
            className={`break-inside-avoid border bg-[#f4f0e8] p-6 ${city.isTopMatch ? "border-2 border-[#d8a15f]" : "border-zinc-200"}`}
          >
            {city.isTopMatch && (
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8a15f]">
                Current Top Match
              </p>
            )}
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Match {city.rank}</p>
            <Link
              to={city.cityPageLink}
              className={`mt-1 block text-2xl font-light tracking-[-0.02em] text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 ${FOCUS_RING}`}
            >
              {city.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{city.matchReason}</p>

            {city.strongestPriorities.length > 0 && (
              <div className="mt-4 border-t border-zinc-300 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Strongest Match Signals</p>
                <ul className="space-y-1 text-xs leading-relaxed text-zinc-600">
                  {city.strongestPriorities.map((priority) => (
                    <li key={priority}>{priority}</li>
                  ))}
                </ul>
              </div>
            )}

            {city.pros.length > 0 && (
              <div className="mt-4 border-t border-zinc-300 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Strengths</p>
                <ul className="space-y-1 text-xs leading-relaxed text-zinc-700">
                  {city.pros.slice(0, 2).map((pro) => (
                    <li key={pro}>+ {pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {city.tradeoffs.length > 0 && (
              <div className="mt-4 border-t border-zinc-300 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Trade-offs</p>
                <ul className="space-y-1 text-xs leading-relaxed text-zinc-700">
                  {city.tradeoffs.slice(0, 2).map((tradeoff) => (
                    <li key={tradeoff}>− {tradeoff}</li>
                  ))}
                </ul>
              </div>
            )}

            {city.guideLink && (
              <Link
                to={city.guideLink}
                className={`mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
              >
                Read The Guide
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">Cost, Pace &amp; Practical Details</p>
        <CompareYourMatches cities={matches} />
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Verify Personally</p>
        <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
          {verifyPersonally.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
