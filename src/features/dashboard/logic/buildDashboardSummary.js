// Client Dashboard — the engine. Same discipline as
// blueprint/logic/recommendationEngine.js and myMexicoPlan/logic/buildPlan.js:
// a pure function, fixed input, fixed output shape, no side effects. Combines
// data already produced by Blueprint, Your Mexico, and My Mexico Plan into
// one summary — it computes nothing new, only reshapes what already exists.

export const RESIDENCY_STAGES = {
  notStarted: { id: "notStarted", label: "Not Started" },
  researching: { id: "researching", label: "Researching" },
  inProgress: { id: "inProgress", label: "Application In Progress" },
  finalized: { id: "finalized", label: "Approved & Finalized" },
};

// recommendation: blueprint/logic/recommendationEngine.js buildRecommendation() output
// matches: yourMexico's ranked city matches
// plan: myMexicoPlan/logic/buildPlan.js buildPlan() output, or null if no plan exists yet
// planTaskState: the plan's saved { [taskId]: boolean } completion map
export function buildDashboardSummary({ recommendation, matches, plan, currentChapterIndex, planTaskState }) {
  const readiness = {
    score: recommendation.readinessScore,
    label: recommendation.readinessLabel,
    archetype: recommendation.archetype,
  };

  const citiesExplored = matches.length;

  let planProgress = null;
  let upcomingTasks = [];
  let recommendedGuides = [];
  let residencyStage = RESIDENCY_STAGES.notStarted;

  if (plan) {
    const nowChapter = plan.chapters[currentChapterIndex];
    const nextChapter = plan.chapters[currentChapterIndex + 1] || null;
    const nowTasksDone = nowChapter.tasks.filter((task) => planTaskState[task.id]).length;

    planProgress = {
      cityId: plan.cityId,
      cityName: plan.cityName,
      isUrgent: plan.isUrgent,
      currentChapterIndex,
      totalChapters: plan.chapters.length,
      nowChapterTitle: plan.isUrgent ? nowChapter.title : nowChapter.phaseLabel,
      nowTasksTotal: nowChapter.tasks.length,
      nowTasksDone,
    };

    upcomingTasks = nowChapter.tasks.filter((task) => !planTaskState[task.id]).slice(0, 4);

    const guideSource = [...nowChapter.tasks, ...(nextChapter ? nextChapter.tasks : [])];
    const seenGuideLinks = new Set();
    recommendedGuides = guideSource
      .filter((task) => task.guideLink && !seenGuideLinks.has(task.guideLink) && seenGuideLinks.add(task.guideLink))
      .slice(0, 5)
      .map((task) => ({ title: task.title, guideLink: task.guideLink }));

    const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);
    const findTaskDone = (taskId) => {
      const task = allTasks.find((t) => t.id === taskId);
      return Boolean(task && planTaskState[task.id]);
    };

    if (findTaskDone("finalize-residency-status")) {
      residencyStage = RESIDENCY_STAGES.finalized;
    } else if (findTaskDone("start-residency-paperwork-urgent")) {
      residencyStage = RESIDENCY_STAGES.inProgress;
    } else if (findTaskDone("research-residency-track")) {
      residencyStage = RESIDENCY_STAGES.researching;
    }
  }

  return {
    readiness,
    citiesExplored,
    planProgress,
    upcomingTasks,
    recommendedGuides,
    residencyStage,
  };
}
