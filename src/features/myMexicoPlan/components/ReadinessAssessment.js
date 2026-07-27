import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import { PLAN_UI } from "../data/uiCopy";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Presentational only — every value comes from the `assessment` prop
// (buildReadinessAssessment.js's output shape). A future AI-enriched
// version can pass a differently-computed `assessment` object here
// without any change to this component's markup, matching the same
// override-seam pattern used by DecisionBrief.js and CostPlanner.js.
export default function ReadinessAssessment({ assessment, taskState, onToggleTask, lang = "en" }) {
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
  const ui = (PLAN_UI[lang] || PLAN_UI.en).readinessAssessment;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">{ui.label}</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">{ui.title}</h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">{ui.description}</p>

      <div className="break-inside-avoid border border-zinc-200 bg-[#f4f0e8] p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.overallReadiness}</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.02em]">
          {readinessScore}/100 &middot; {readinessLabel}
        </p>
        <p className="mt-1 text-xs text-zinc-500">{ui.archetype}: {archetypeTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{readinessBlurb}</p>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.breakdown}</p>
        <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="break-inside-avoid bg-white p-5">
              <p className="text-sm font-medium text-zinc-950">{dimension.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                {dimension.earnedPoints}/{dimension.maxPoints} {ui.points}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{dimension.whyItMatters}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.primaryStrengths}</p>
          {strengths.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
              {strengths.map((dimension) => (
                <li key={dimension.id}>{dimension.label} {ui.strengthSuffix}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-500">{ui.noStrengths}</p>
          )}
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.biggestGaps}</p>
          {gaps.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
              {gaps.map((dimension) => (
                <li key={dimension.id}>
                  {dimension.label} ({dimension.earnedPoints}/{dimension.maxPoints})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-500">{ui.noGaps}</p>
          )}
        </div>
      </div>

      {opportunities.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.opportunities}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="break-inside-avoid border border-zinc-200 bg-[#f4f0e8] p-5">
                <p className="text-sm font-medium text-zinc-950">{opportunity.dimension}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{opportunity.suggestion}</p>
                {opportunity.guideLink && (
                  <Link
                    to={opportunity.guideLink}
                    className={`mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
                  >
                    {ui.readGuide}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.confidenceFactors}</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {confidenceFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.validatePersonally}</p>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
            {validatePersonally.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {highestImpactActions.length > 0 && (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">{ui.highestImpact}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {highestImpactActions.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                done={Boolean(taskState[task.id])}
                onToggle={() => onToggleTask(task.id)}
                lang={lang}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
