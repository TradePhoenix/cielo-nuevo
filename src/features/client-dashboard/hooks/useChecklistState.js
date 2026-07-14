import { useCallback, useMemo, useState } from "react";
import { CHECKLIST_CATEGORIES } from "../mock/mockChecklist";
import { readState, writeState } from "../utils/storage";

const STORAGE_KEY = "pathToMexico.clientDashboard.checklist.v1";
const STORAGE_VERSION = 1;

// Overrides are stored separately from the mock data itself (taskId ->
// "complete" | "incomplete") so toggling a task never has to mutate the
// mock module — the same pattern the Blueprint/Plan features use to keep
// their seed data pure.
export function useChecklistState() {
  const [overrides, setOverrides] = useState(() => readState(STORAGE_KEY, STORAGE_VERSION, {}));

  const persist = useCallback((next) => {
    setOverrides(next);
    writeState(STORAGE_KEY, STORAGE_VERSION, next);
  }, []);

  const toggleTask = useCallback(
    (taskId, currentStatus) => {
      const isComplete = currentStatus === "complete";
      persist({ ...overrides, [taskId]: isComplete ? "incomplete" : "complete" });
    },
    [overrides, persist]
  );

  const categories = useMemo(
    () =>
      CHECKLIST_CATEGORIES.map((category) => ({
        ...category,
        tasks: category.tasks.map((task) => ({
          ...task,
          status: overrides[task.id] || task.status,
        })),
      })),
    [overrides]
  );

  const { totalTasks, completedTasks } = useMemo(() => {
    const all = categories.flatMap((category) => category.tasks);
    return { totalTasks: all.length, completedTasks: all.filter((task) => task.status === "complete").length };
  }, [categories]);

  return {
    categories,
    toggleTask,
    totalTasks,
    completedTasks,
    percentComplete: totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
  };
}
