// My Mexico Plan — Concierge Responsibility Workspace engine. Same
// discipline as buildAdaptiveChecklist.js and buildDecisionBrief.js: a
// pure function, fixed input, fixed output shape, no side effects, no
// invented data. Groups the plan's own tasks by their existing
// `ownership` field (taskBank.js — "self" | "pathToMexico" |
// "professional") — a field that already exists and is already rendered
// per-task by TaskCard.js's OWNERSHIP_LABELS. Nothing here reassigns or
// alters that field; this file only selects and reshapes it.
//
// Deliberately a different lens than buildAdaptiveChecklist.js (which
// ranks tasks by relevance into Do Now/Do Next/Later, filtered to
// incomplete tasks only): this shows ALL of the plan's available tasks
// — done or not — grouped by who is responsible, since its purpose is
// to explain the responsibility structure itself, not to prioritize
// action. A task can only ever have one `ownership` value, so it can
// only ever appear in exactly one category here — duplication across
// categories is structurally impossible.
//
// This is the seam a future feature (e.g. a real assigned-to-a-specific-
// coordinator field) could extend without redesigning this workspace —
// each category's `tasks` array keeps the exact same task shape
// TaskCard.js already renders.

const CATEGORIES = [
  {
    id: "self",
    label: "You Handle This",
    description:
      "Personal decisions, research, and paperwork that only you can complete — no one else can make these calls for you.",
  },
  {
    id: "pathToMexico",
    label: "Path To Mexico Can Help",
    description:
      "Path To Mexico can guide you, coordinate on your behalf, or make a trusted introduction here — not a guarantee of outcome, and never a substitute for a licensed professional where one is required.",
  },
  {
    id: "professional",
    label: "Requires A Licensed Professional",
    description:
      "Legal, tax, medical, immigration, or real-estate matters that require a qualified, licensed professional. Path To Mexico can help you find trusted options, but does not perform these services itself.",
  },
];

const DISCLAIMER =
  "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.";

// plan: buildPlan.js's output (already filtered to this visitor/city).
export function buildResponsibilityWorkspace({ plan }) {
  const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);

  const categories = CATEGORIES.map((category) => ({
    ...category,
    tasks: allTasks.filter((task) => task.ownership === category.id),
  }));

  return { categories, disclaimer: DISCLAIMER };
}
