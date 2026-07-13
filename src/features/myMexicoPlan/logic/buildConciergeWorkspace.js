// My Mexico Plan — Personalized Concierge Workspace engine. Same
// discipline as buildDecisionBrief.js, buildAdaptiveChecklist.js, and
// buildReadinessAssessment.js: a pure function, fixed input, fixed
// output shape, no side effects, no invented services or advice.
//
// This does not recompute prioritization or gap analysis — it reuses
// two outputs that are already computed elsewhere on this same page:
//
//   - buildAdaptiveChecklist.js's `doNow` list is already the personalized,
//     priority-ranked subset of the plan's tasks (see that file for the
//     scoring itself). Reused directly here, not recalculated.
//   - buildReadinessAssessment.js's `opportunities` already links specific
//     task ids to the specific readiness gap they address. Reused
//     directly here to explain *why* a task appears, not recalculated.
//
// Grouping by `ownership` (taskBank.js — "self" | "pathToMexico" |
// "professional") reuses the exact field TaskCard.js already renders via
// its own OWNERSHIP_LABELS; nothing here reassigns that field. If a
// category would otherwise have no personalized items (a small
// prioritized/gap-driven pool won't always touch all three ownership
// types), it falls back to a few more of the plan's own relevant tasks
// for that category rather than showing an empty section — still scoped
// to this visitor's actual plan, never invented.
//
// This is the seam a future AI concierge could enrich — swap in a
// richer, model-generated `conciergeReason` per task, or a different
// selection of which tasks surface — without changing this file's output
// shape or the component that renders it.

const CATEGORIES = [
  {
    id: "self",
    label: "You Can Do Yourself",
    description:
      "Personal decisions and research that only you can make — no one else can decide these for you.",
  },
  {
    id: "pathToMexico",
    label: "Path To Mexico Can Help",
    description:
      "Path To Mexico can guide you, coordinate on your behalf, or make a trusted introduction here — not a guarantee of outcome, and never a substitute for a licensed professional where one is required.",
  },
  {
    id: "professional",
    label: "Professional Support Recommended",
    description:
      "Legal, tax, medical, immigration, or real-estate matters that call for a qualified, licensed professional. Path To Mexico can help connect you with trusted options, but does not perform these services itself.",
  },
];

const DISCLAIMER =
  "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.";

const FALLBACK_LIMIT_PER_CATEGORY = 3;

// plan: buildPlan.js's output (already filtered to this visitor/city).
// adaptiveChecklist: buildAdaptiveChecklist.js's output, computed once on
// the page and passed in here — not recalculated.
// readinessAssessment: buildReadinessAssessment.js's output, same.
export function buildConciergeWorkspace({ plan, adaptiveChecklist, readinessAssessment }) {
  const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);
  const entries = new Map();

  for (const task of (adaptiveChecklist && adaptiveChecklist.doNow) || []) {
    if (!entries.has(task.id)) {
      entries.set(task.id, {
        ...task,
        conciergeReason: "Ranked as one of your top priorities based on your own answers.",
      });
    }
  }

  for (const opportunity of (readinessAssessment && readinessAssessment.opportunities) || []) {
    for (const taskId of opportunity.taskIds || []) {
      if (entries.has(taskId)) continue;
      const task = allTasks.find((candidate) => candidate.id === taskId);
      if (task) {
        entries.set(task.id, {
          ...task,
          conciergeReason: `Addresses your ${opportunity.dimension} gap — one of the fastest ways to raise your readiness.`,
        });
      }
    }
  }

  const categories = CATEGORIES.map((category) => {
    const personalized = Array.from(entries.values()).filter((task) => task.ownership === category.id);
    if (personalized.length > 0) {
      return { ...category, tasks: personalized };
    }

    // Fallback so a category is never empty in the overview: still scoped
    // to this visitor's own plan, just not from the prioritized/gap pool.
    const fallback = allTasks
      .filter((task) => task.ownership === category.id && !entries.has(task.id))
      .slice(0, FALLBACK_LIMIT_PER_CATEGORY)
      .map((task) => ({
        ...task,
        conciergeReason: `Part of your personalized plan for ${plan.cityName}.`,
      }));
    return { ...category, tasks: fallback };
  });

  return { categories, disclaimer: DISCLAIMER };
}
