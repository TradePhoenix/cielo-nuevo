import { Link } from "react-router-dom";
import Checkbox from "../../../components/Checkbox";

const OWNERSHIP_LABELS = {
  self: "You handle this",
  pathToMexico: "Path To Mexico can help",
  professional: "Needs a professional",
};

// A single task — never just a checkbox and a title. The reality note is
// the point: an honest line on what this actually takes, extending the
// Honest Truth pattern down to individual tasks.
export default function TaskCard({ task, done, onToggle }) {
  return (
    <div className={`break-inside-avoid border border-zinc-200 bg-white p-5 transition ${done ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={done}
          onToggle={onToggle}
          label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        />

        <div className="flex-1">
          <p className={`text-base font-medium text-zinc-950 ${done ? "line-through" : ""}`}>{task.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{task.realityNote}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
            <span>{OWNERSHIP_LABELS[task.ownership]}</span>
            {task.estimate.time && <span>{task.estimate.time}</span>}
            {task.estimate.cost && <span>{task.estimate.cost}</span>}
          </div>

          {task.guideLink && (
            <Link
              to={task.guideLink}
              className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              Read The Guide
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
