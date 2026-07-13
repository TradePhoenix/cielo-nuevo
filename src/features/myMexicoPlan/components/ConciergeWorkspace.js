import TaskCard from "./TaskCard";

// Presentational only — every value comes from the `workspace` prop
// (buildConciergeWorkspace.js's output shape). A future AI concierge can
// pass a differently-computed `workspace` object here (e.g. richer
// per-task reasoning) without any change to this component's markup,
// matching the same override-seam pattern used by every other My Mexico
// Plan section. TaskCard.js is reused unmodified — the only addition here
// is a short "why this appears" line above each card, since TaskCard
// itself has no slot for that; the card's own ownership label, reality
// note, and guide link all render exactly as they do everywhere else on
// this page, off the same shared taskState.
export default function ConciergeWorkspace({ workspace, taskState, onToggleTask }) {
  const { categories, disclaimer } = workspace;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Concierge Workspace</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Your relocation, divided honestly.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">{disclaimer}</p>

      <div className="space-y-10">
        {categories.map(
          (category) =>
            category.tasks.length > 0 && (
              <div key={category.id} className="break-inside-avoid">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {category.label} &middot; {category.tasks.length}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                  {category.description}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {category.tasks.map((task) => (
                    <div key={task.id} className="break-inside-avoid">
                      <p className="mb-2 text-xs italic leading-relaxed text-zinc-500">
                        {task.conciergeReason}
                      </p>
                      <TaskCard
                        task={task}
                        done={Boolean(taskState[task.id])}
                        onToggle={() => onToggleTask(task.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
