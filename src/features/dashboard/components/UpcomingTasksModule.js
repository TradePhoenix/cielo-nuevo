import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

export default function UpcomingTasksModule({ upcomingTasks, planProgress }) {
  if (!planProgress) {
    return (
      <ModuleCard eyebrow="Upcoming Tasks" title="No plan yet">
        <p className="text-sm leading-relaxed text-zinc-600">Build your Mexico Plan to see what's next.</p>
      </ModuleCard>
    );
  }

  if (upcomingTasks.length === 0) {
    return (
      <ModuleCard eyebrow="Upcoming Tasks" title="You're caught up">
        <p className="text-sm leading-relaxed text-zinc-600">Every task in this chapter is done. Nice work.</p>
      </ModuleCard>
    );
  }

  return (
    <ModuleCard
      eyebrow="Upcoming Tasks"
      title={`Next In ${planProgress.nowChapterTitle}`}
      action={
        <Link
          to={`/my-mexico-plan/${planProgress.cityId}`}
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          View Plan
        </Link>
      }
    >
      <ul className="space-y-3">
        {upcomingTasks.map((task) => (
          <li key={task.id} className="text-sm leading-relaxed text-zinc-700">
            {task.title}
          </li>
        ))}
      </ul>
    </ModuleCard>
  );
}
