import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

export default function PlanProgressModule({ planProgress }) {
  if (!planProgress) {
    return (
      <ModuleCard eyebrow="My Mexico Plan" title="You haven't built a plan yet">
        <p className="text-sm leading-relaxed text-zinc-600">
          Your Mexico Plan turns your Blueprint into a real, dated sequence of next steps.
        </p>
        <Link
          to="/my-mexico-plan"
          className={`mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 ${FOCUS_RING}`}
        >
          Build My Plan
        </Link>
      </ModuleCard>
    );
  }

  const percentDone =
    planProgress.nowTasksTotal > 0 ? Math.round((planProgress.nowTasksDone / planProgress.nowTasksTotal) * 100) : 0;

  return (
    <ModuleCard
      eyebrow={`My Mexico Plan · ${planProgress.cityName}`}
      title={planProgress.nowChapterTitle}
      action={
        <Link
          to={`/my-mexico-plan/${planProgress.cityId}`}
          className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
        >
          View Full Plan
        </Link>
      }
    >
      <p className="text-sm text-zinc-600">
        {planProgress.nowTasksDone} of {planProgress.nowTasksTotal} tasks done in this chapter.
      </p>
      <div
        className="mt-3 h-1.5 w-full bg-zinc-100"
        role="progressbar"
        aria-valuenow={percentDone}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${planProgress.nowTasksDone} of ${planProgress.nowTasksTotal} tasks done in this chapter`}
      >
        <div className="h-1.5 bg-zinc-950 transition-all" style={{ width: `${percentDone}%` }} />
      </div>
    </ModuleCard>
  );
}
