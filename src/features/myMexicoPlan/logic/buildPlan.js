// My Mexico Plan — the engine. Same discipline as
// blueprint/logic/recommendationEngine.js: a pure function, fixed input,
// fixed output shape, no side effects. This is the seam where a future
// AI-generated plan could replace the deterministic selection below
// without any component needing to change.

import { CHAPTERS } from "../data/chapters";
import { TASK_BANK } from "../data/taskBank";

// scores: the object returned by blueprint/logic/scoringEngine.computeScores()
// city: a merged city record from yourMexico/logic/cityLookup.getCityById()
export function buildPlan(answers, scores, city) {
  const tagCounts = (scores && scores.tagCounts) || {};
  const isUrgent = Boolean(tagCounts.urgent);

  const relevantTasks = TASK_BANK.filter((task) => {
    if (task.cityIds && !task.cityIds.includes(city.id)) return false;
    if (task.tags.length === 0) return true;
    return task.tags.some((tag) => tagCounts[tag]);
  });

  const chapters = CHAPTERS.map((chapter) => ({
    ...chapter,
    tasks: relevantTasks.filter((task) => task.chapterId === chapter.id),
  }));

  return {
    cityId: city.id,
    cityName: city.name,
    isUrgent,
    chapters,
  };
}

// Given how many days have passed since the plan's anchor date, which
// chapter index is "Now." Clamps to the last chapter once past day 365
// rather than returning an out-of-range index.
export function getCurrentChapterIndex(chapters, daysSinceAnchor) {
  for (let i = chapters.length - 1; i >= 0; i -= 1) {
    if (daysSinceAnchor >= chapters[i].days.start) {
      return i;
    }
  }
  return 0;
}
