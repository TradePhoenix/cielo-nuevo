import TaskCard from "./TaskCard";

// Presentational only — every value comes from the `workspace` prop
// (buildResponsibilityWorkspace.js's output shape). A future version
// (e.g. a real assigned-coordinator field) can pass a differently-
// computed `workspace` object here without any change to this
// component's markup, matching the same override-seam pattern used by
// every other My Mexico Plan section. Reuses TaskCard.js directly for
// every task card — same shared taskState as every other task list on
// this page, so completing a task here completes it everywhere.
export default function ResponsibilityWorkspace({ workspace, taskState, onToggleTask }) {
  const { categories, disclaimer } = workspace;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Concierge Responsibility Workspace
      </p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Who handles what, from here.
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
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {category.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      done={Boolean(taskState[task.id])}
                      onToggle={() => onToggleTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
