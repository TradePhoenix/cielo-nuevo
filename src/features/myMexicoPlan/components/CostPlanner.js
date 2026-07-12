import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

function formatMXN(amount) {
  return `${amount.toLocaleString("en-US")} MXN`;
}

function formatRange(range) {
  if (!range) return null;
  if (range.high === null) return `${formatMXN(range.low)}+`;
  return `${formatMXN(range.low)}–${formatMXN(range.high)}`;
}

// Presentational only — every figure comes from the `planner` prop
// (buildCostPlanner.js's output shape). A future AI-enriched version can
// pass a differently-computed `planner` object here without any change to
// this component's markup, matching the same override-seam pattern used
// by DecisionBrief.js, RelocationRoadmap.js, and ContinueYourJourney.js.
export default function CostPlanner({ planner }) {
  const { cityName, totalRange, categories, majorCostDrivers, assumptions, verifyPersonally, guideLinks } = planner;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Cost Planner</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        A planning range for life in {cityName}.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">
        These are planning ranges, not exact prices or guarantees. Actual costs vary by exact
        location, season, exchange rates, household, and lifestyle — use this as a starting point
        to plan around, not a quote.
      </p>

      <div className="break-inside-avoid border border-zinc-200 bg-[#f4f0e8] p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Estimated Monthly Total</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.02em]">{formatRange(totalRange)}</p>
        <p className="mt-1 text-xs text-zinc-500">{totalRange.sourceLabel}</p>
      </div>

      <div className="mt-8 grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="break-inside-avoid bg-white p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">{category.label}</p>
            <p className="text-lg font-light tracking-[-0.01em]">
              {formatRange(category.range) || "Needs personal verification"}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{category.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-3">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Major Cost Drivers</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
            {majorCostDrivers.map((driver) => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Assumptions Used</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Verify Personally</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {verifyPersonally.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Go Deeper</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {guideLinks.map((guide) => (
            <Link
              key={guide.href}
              to={guide.href}
              className={`text-sm text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
            >
              {guide.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
