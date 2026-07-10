import TaskCard from "./TaskCard";

// Renders one chapter in one of three weights, depending on where it sits
// relative to "Now": full detail for the current chapter, a collapsed
// disclosure for the one right after it, and a quiet single line for
// everything further out. The same chapter data drives all three — only
// the presentation changes.
export default function ChapterSection({ chapter, variant, taskState, onToggleTask, isUrgent }) {
  const label = isUrgent ? chapter.title : chapter.phaseLabel;
  const dayRange =
    isUrgent && chapter.days.start !== chapter.days.end ? `Days ${chapter.days.start}-${chapter.days.end}` : null;

  if (variant === "later") {
    return (
      <div className="break-inside-avoid flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-base font-light tracking-[-0.01em]">{label}</p>
          {dayRange && <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-400">{dayRange}</p>}
        </div>
        <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">
          {chapter.tasks.length} {chapter.tasks.length === 1 ? "Task" : "Tasks"}
        </p>
      </div>
    );
  }

  if (variant === "upcoming") {
    return (
      <details className="mt-4 border border-zinc-200 bg-white">
        <summary className="cursor-pointer list-none p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-light tracking-[-0.01em]">{label}</p>
              {dayRange && <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-400">{dayRange}</p>}
            </div>
            <span className="print:hidden text-xs uppercase tracking-[0.15em] text-zinc-400">View Ahead</span>
          </div>
        </summary>
        <div className="border-t border-zinc-200 p-5">
          <p className="text-sm leading-relaxed text-zinc-600">{chapter.framing}</p>
          {chapter.tasks.length > 0 && (
            <div className="mt-5 space-y-3">
              {chapter.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  done={Boolean(taskState[task.id])}
                  onToggle={() => onToggleTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>
      </details>
    );
  }

  // variant === "now"
  return (
    <div className="mt-4">
      <h2 className="break-after-avoid text-3xl font-light tracking-[-0.02em] sm:text-4xl">{label}</h2>
      {dayRange && <p className="mt-2 text-xs uppercase tracking-[0.15em] text-zinc-400">{dayRange}</p>}
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-700">{chapter.framing}</p>

      {chapter.tasks.length > 0 ? (
        <div className="mt-8 space-y-4">
          {chapter.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              done={Boolean(taskState[task.id])}
              onToggle={() => onToggleTask(task.id)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-zinc-500">
          No specific tasks here for your situation — this chapter is more about the shift itself than a checklist.
        </p>
      )}
    </div>
  );
}
