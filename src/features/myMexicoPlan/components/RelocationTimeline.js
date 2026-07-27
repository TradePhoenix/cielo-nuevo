import TaskCard from "./TaskCard";
import { PLAN_UI } from "../data/uiCopy";

// Presentational only — every value comes from the `timeline` prop
// (buildRelocationTimeline.js's output shape). A future AI layer can pass
// a differently-computed `timeline` object (e.g. a richer per-period
// `rationale`, or real move-date-aware sequencing) without any change to
// this component's markup, matching the same override-seam pattern used
// by every other My Mexico Plan section. TaskCard.js is reused
// unmodified — the only addition here is the period's own rationale line
// and a "date-dependent" tag, since TaskCard has no slot for either.
export default function RelocationTimeline({ timeline, taskState, onToggleTask, lang = "en" }) {
  const { cityName, timelineAnswerLabel, disclaimer, currentPeriodId, periods } = timeline;
  const ui = (PLAN_UI[lang] || PLAN_UI.en).relocationTimeline;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">{ui.label}</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">{ui.title(cityName)}</h2>
      <p className="mb-2 max-w-2xl text-sm leading-relaxed text-zinc-600">{disclaimer}</p>
      {timelineAnswerLabel && (
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">{ui.blueprintSays(timelineAnswerLabel)}</p>
      )}

      <div className="space-y-10">
        {periods.map((period) => (
          <div key={period.id} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {period.label} &middot; {period.totalCount}
                {period.id === currentPeriodId && (
                  <span className="ml-2 text-[#d8a15f]">&middot; {ui.currentFocus}</span>
                )}
              </p>
              {period.dateDependent && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{ui.dependsOnDate}</p>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">{period.rationale}</p>
            {period.readinessNote && (
              <p className="mt-1 max-w-2xl text-sm italic leading-relaxed text-zinc-500">{period.readinessNote}</p>
            )}

            {period.tasks.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {period.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} done={Boolean(taskState[task.id])} onToggle={() => onToggleTask(task.id)} lang={lang} />
                ))}
              </div>
            ) : (
              <p className="mt-4 border border-dashed border-zinc-200 p-4 text-sm text-zinc-500">{ui.nothingYet}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
