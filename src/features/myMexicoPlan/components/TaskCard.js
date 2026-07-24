import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Checkbox from "../../../components/Checkbox";
import { DURATION, EASE, useCinematicMotion } from "../../../components/cinematicMotion";

const OWNERSHIP_LABELS = {
  self: "You handle this",
  pathToMexico: "Path To Mexico can help",
  professional: "Needs a professional",
};

// A single task — never just a checkbox and a title. The reality note is
// the point: an honest line on what this actually takes, extending the
// Honest Truth pattern down to individual tasks.
//
// CX-004: a one-shot "confirmation wash" plays only on a genuine
// incomplete->complete transition (never on mount, even when `done` starts
// true from a saved plan) and never on un-completing. `previousDoneRef`
// captures the prop's value at first render, so the mount-time comparison
// in the effect below always reads "no change" for an already-completed
// task. `pulseKey` increments on each qualifying transition and is used as
// the overlay's React key, so rapid toggling always remounts a fresh
// animation instead of fighting a stuck/half-finished one.
export default function TaskCard({ task, done, onToggle }) {
  const prefersReducedMotion = useCinematicMotion();
  const previousDoneRef = useRef(done);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (!previousDoneRef.current && done) {
      setPulseKey((key) => key + 1);
    }
    previousDoneRef.current = done;
  }, [done]);

  const pulseDuration = prefersReducedMotion ? DURATION.instant : DURATION.quick;

  return (
    <div
      className={`relative overflow-hidden break-inside-avoid border border-zinc-200 bg-white p-5 transition-opacity duration-300 ${
        done ? "opacity-60" : ""
      }`}
    >
      {pulseKey > 0 && (
        <motion.span
          key={pulseKey}
          aria-hidden="true"
          data-testid="task-completion-pulse"
          className="pointer-events-none absolute inset-0 bg-zinc-950/[0.05]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: pulseDuration, ease: EASE.standard }}
        />
      )}
      <div className="relative flex items-start gap-3">
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
