import { Link } from "react-router-dom";
import PriorityBadge from "./PriorityBadge";
import { formatRelativeDate } from "../logic/dateHelpers";

// Single task row — used by the Tasks Overview's four buckets and by the
// Lead Detail view's follow-up task list. `showLead` controls whether the
// associated lead name renders as a link (Tasks Overview needs it; Lead
// Detail already has that context, so it hides it).
export default function TaskRow({ task, ownerName, leadName, showLead = true, onComplete, onReopen }) {
  const isDone = task.status === "done";

  return (
    <div className="flex items-start gap-3 border border-zinc-200 bg-white p-4">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => (isDone ? onReopen(task.id) : onComplete(task.id))}
        aria-label={isDone ? `Mark "${task.title}" incomplete` : `Mark "${task.title}" complete`}
        className="mt-1 h-4 w-4 shrink-0 accent-zinc-950"
      />

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${isDone ? "text-zinc-400 line-through" : "text-zinc-950"}`}>{task.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
          {showLead && leadName && (
            <Link to={`/developer/crm/leads/${task.leadId}`} className="font-medium text-zinc-700 hover:text-[#d8a15f]">
              {leadName}
            </Link>
          )}
          <span>{ownerName}</span>
          <span>{isDone ? `Completed ${formatRelativeDate(task.completedDate)}` : formatRelativeDate(task.dueDate)}</span>
        </div>
      </div>

      <PriorityBadge priority={task.priority} />
    </div>
  );
}
