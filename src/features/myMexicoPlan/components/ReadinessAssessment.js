import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Presentational only — every value comes from the `assessment` prop
// (buildReadinessAssessment.js's output shape). A future AI-enriched
// version can pass a differently-computed `assessment` object here
// without any change to this component's markup, matching the same
// override-seam pattern used by DecisionBrief.js and CostPlanner.js.
export default function ReadinessAssessment({ assessment, taskState, onToggleTask }) {
  const {
    readinessScore,
    readinessLabel,
    readinessBlurb,
    archetypeTitle,
    dimensions,
    strengths,
    gaps,
    opportunities,
    confidenceFactors,
    validatePersonally,
    highestImpactActions,
  } = assessment;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Move Readiness Assessment</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Exactly where you stand, and why.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">
        A deterministic breakdown of your readiness score — no AI, no guessing. Everything below
        comes directly from your own 6 Blueprint answers.
      </p>

      <div className="break-inside-avoid border border-zinc-200 bg-[#f4f0e8] p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Overall Readiness</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.02em]">
          {readinessScore}/100 &middot; {readinessLabel}
        </p>
        <p className="mt-1 text-xs text-zinc-500">Archetype: {archetypeTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{readinessBlurb}</p>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">Your Readiness Breakdown</p>
        <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="break-inside-avoid bg-white p-5">
              <p className="text-sm font-medium text-zinc-950">{dimension.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                {dimension.earnedPoints}/{dimension.maxPoints} points
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{dimension.whyItMatters}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Primary Strengths</p>
          {strengths.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
              {strengths.map((dimension) => (
                <li key={dimension.id}>{dimension.label} — clear and decisive.</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-500">
              No single answer stands out yet — that's normal early on.
            </p>
          )}
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Biggest Readiness Gaps</p>
          {gaps.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
              {gaps.map((dimension) => (
                <li key={dimension.id}>
                  {dimension.label} ({dimension.earnedPoints}/{dimension.maxPoints})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-500">
              Nothing stands out as a gap — your answers are consistently clear.
            </p>
          )}
        </div>
      </div>

      {opportunities.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">Top Opportunities To Improve</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {opportunities.map((opportunity) => (
              <div key={opportunity.dimension} className="break-inside-avoid border border-zinc-200 bg-[#f4f0e8] p-5">
                <p className="text-sm font-medium text-zinc-950">{opportunity.dimension}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{opportunity.suggestion}</p>
                {opportunity.guideLink && (
                  <Link
                    to={opportunity.guideLink}
                    className={`mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
                  >
                    Read The Guide
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Confidence Factors</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {confidenceFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Validate Personally</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {validatePersonally.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {highestImpactActions.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Next Actions With The Greatest Impact
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {highestImpactActions.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                done={Boolean(taskState[task.id])}
                onToggle={() => onToggleTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
