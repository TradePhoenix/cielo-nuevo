import { isPast, isToday } from "./dateHelpers";

// Groups tasks into the four buckets the Tasks Overview renders as columns.
// A task can only land in one bucket: completed status wins first, then
// overdue/today/upcoming based on due date relative to "now".
export function buildTaskBuckets(tasks) {
  const buckets = { overdue: [], dueToday: [], upcoming: [], completed: [] };

  tasks.forEach((task) => {
    if (task.status === "done") {
      buckets.completed.push(task);
      return;
    }
    if (isPast(task.dueDate)) {
      buckets.overdue.push(task);
    } else if (isToday(task.dueDate)) {
      buckets.dueToday.push(task);
    } else {
      buckets.upcoming.push(task);
    }
  });

  buckets.overdue.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  buckets.dueToday.sort((a, b) => a.title.localeCompare(b.title));
  buckets.upcoming.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  buckets.completed.sort((a, b) => (b.completedDate || "").localeCompare(a.completedDate || ""));

  return buckets;
}

const PRIORITY_WEIGHT = { High: 0, Medium: 1, Low: 2 };

export function sortByPriority(tasks) {
  return [...tasks].sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]);
}
