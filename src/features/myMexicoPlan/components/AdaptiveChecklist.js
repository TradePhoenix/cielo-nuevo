import TaskCard from "./TaskCard";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

function TaskGroup({ label, tasks, taskState, onToggleTask }) {
  if (tasks.length === 0) return null;
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
        {label} &middot; {tasks.length}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} done={Boolean(taskState[task.id])} onToggle={() => onToggleTask(task.id)} />
        ))}
      </div>
    </div>
  );
}

// Presentational only — every task comes from the `checklist` prop
// (buildAdaptiveChecklist.js's output shape). Re-ranks and re-groups the
// same plan tasks NowNextLater.js already renders by chapter — this is a
// different lens (personalized priority, not calendar chapter), not a
// second copy of task content: every task card here is the same
// TaskCard.js component, reading the same taskState, so completing a
// task here completes it everywhere on the page.
export default function AdaptiveChecklist({ checklist, taskState, onToggleTask }) {
  const { nextHighestPriority, doNow, doNext, later } = checklist;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Adaptive Relocation Checklist</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Ranked for your situation, not just the calendar.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">
        This re-orders your plan's own tasks by relevance to your specific answers — timeline,
        household, budget clarity, residency familiarity, and readiness. It's general planning
        guidance, not legal, tax, financial, or medical advice. Tasks marked{" "}
        <span className="font-semibold text-zinc-950">"Needs a professional"</span> should be
        confirmed with a qualified professional before you act.
      </p>

      {nextHighestPriority.length > 0 && (
        <div className="break-inside-avoid mb-8 border border-zinc-200 bg-[#f4f0e8] p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Your Next {nextHighestPriority.length} Highest-Priority Actions
          </p>
          <ol className="space-y-2">
            {nextHighestPriority.map((task, index) => (
              <li key={task.id} className="flex items-start gap-3 text-zinc-800">
                <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{task.title}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="space-y-8">
        <TaskGroup label="Do Now" tasks={doNow} taskState={taskState} onToggleTask={onToggleTask} />
        <TaskGroup label="Do Next" tasks={doNext} taskState={taskState} onToggleTask={onToggleTask} />
        {later.length > 0 && (
          <details className="group">
            <summary
              className={`cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
            >
              Later &middot; {later.length} more tasks
            </summary>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {later.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  done={Boolean(taskState[task.id])}
                  onToggle={() => onToggleTask(task.id)}
                />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
