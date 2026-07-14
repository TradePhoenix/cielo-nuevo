import Checkbox from "../../../components/Checkbox";
import SectionCard from "./SectionCard";
import StatusPill from "./StatusPill";
import { useClientDashboardTheme } from "./ThemeContext";
import { formatDate } from "../utils/formatters";

export default function ChecklistCategoryCard({ category, onToggleTask }) {
  const { isDark } = useClientDashboardTheme();
  const completeCount = category.tasks.filter((task) => task.status === "complete").length;

  return (
    <SectionCard
      eyebrow={`${completeCount} / ${category.tasks.length} Complete`}
      title={category.name}
    >
      <ul className={`divide-y ${isDark ? "divide-zinc-800" : "divide-zinc-200"}`}>
        {category.tasks.map((task) => {
          const isComplete = task.status === "complete";
          return (
            <li key={task.id} className="flex items-start gap-3 py-3">
              <Checkbox checked={isComplete} onToggle={() => onToggleTask(task.id, task.status)} label={task.title} />
              <div className="flex-1">
                <p className={`text-sm ${isComplete ? (isDark ? "text-zinc-500 line-through" : "text-zinc-400 line-through") : isDark ? "text-zinc-200" : "text-zinc-800"}`}>
                  {task.title}
                </p>
                {task.dueDate && !isComplete && (
                  <p className={`mt-1 text-xs ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Due {formatDate(task.dueDate)}</p>
                )}
              </div>
              {!isComplete && (task.status === "due-soon" || task.status === "priority") && <StatusPill status={task.status} />}
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
