// My Mexico Plan — Personalized Relocation Timeline engine. Same
// discipline as buildAdaptiveChecklist.js, buildReadinessAssessment.js,
// and buildConciergeWorkspace.js: a pure function, fixed input, fixed
// output shape, no side effects, no invented tasks, deadlines, or
// processing times. Every task shown here is a task already in the
// visitor's own plan (buildPlan.js's output); this file only re-sorts
// those tasks into a move-relative sequence instead of the elapsed-time
// chapters ChapterTracker/NowNextLater already show.
//
// Chapter framing already written in data/chapters.js is the source of
// truth for what each of the five existing chapters represents in the
// visitor's journey:
//   - "Getting Ready": explicitly "research, not action... nothing here
//     is urgent" — maps directly to "Start Now."
//   - "Making It Real": "logistics... 'maybe' quietly becomes 'when'" —
//     mid-range planning, maps to "3-6 Months Before Moving."
//   - "The Countdown": "booking flights and finalizing a lease" — maps
//     directly to "Final Month."
//   - "The Move": arrival and the adjustment period — split into
//     "Arrival Week" (immediate on-the-ground setup) and "First 30 Days"
//     (settling beyond that) using each task's own already-written
//     estimate/realityNote content (ARRIVAL_WEEK_TASK_IDS below), not an
//     invented rule.
//   - "Becoming Local": "community, routine, and residency... settle
//     in" — maps to "First 90 Days."
//
// The one cross-cutting signal reused verbatim from elsewhere in the
// codebase is the "urgent" tag (already used identically by
// recommendationEngine.js, buildPlan.js's isUrgent, and
// buildAdaptiveChecklist.js's readinessAdjustment) to split
// time-sensitive tasks out of "Getting Ready"/"Making It Real" into
// "Next 30 Days." Because buildPlan.js only includes urgent-tagged tasks
// for visitors whose own answers earned the "urgent" tag, "Next 30 Days"
// is naturally empty for exploratory, far-out visitors — real profile
// adaptation, not a fabricated one.
//
// This is the seam a future AI layer could enrich (e.g. a richer,
// model-generated `rationale` per period, or real move-date-aware
// scheduling once a visitor has an actual date) without changing this
// file's output shape or the component that renders it.

import { QUESTIONS } from "../../blueprint/data/questions";

const TIMELINE_QUESTION = QUESTIONS.find((question) => question.id === "timeline");

const ARRIVAL_WEEK_TASK_IDS = new Set(["setup-phone-internet", "open-local-bank-account", "test-real-internet-reliability"]);

const PERIOD_DEFINITIONS = [
  {
    id: "start-now",
    label: "Start Now",
    dateDependent: false,
    rationale:
      "Research and groundwork you can begin today, regardless of when you actually move — getting your bearings before you commit money or dates.",
  },
  {
    id: "next-30-days",
    label: "Next 30 Days",
    dateDependent: false,
    rationale:
      "Time-sensitive actions your own answers flagged as worth starting soon — not tied to a specific move date, just worth not putting off.",
  },
  {
    id: "3-6-months-before",
    label: "3–6 Months Before Moving",
    dateDependent: true,
    rationale:
      "The logistics that turn \"maybe\" into \"when\" — banking, a housing shortlist, a real budget — best tackled once your move has real shape, even without an exact date yet.",
  },
  {
    id: "final-month",
    label: "Final Month",
    dateDependent: true,
    rationale: "The tasks that make a move official — booking flights, finalizing a lease — best done once your departure date is actually set.",
  },
  {
    id: "arrival-week",
    label: "Arrival Week",
    dateDependent: true,
    rationale: "The practical setup of your first days on the ground.",
  },
  {
    id: "first-30-days",
    label: "First 30 Days",
    dateDependent: true,
    rationale: "Settling in beyond the initial logistics — the adjustment period itself.",
  },
  {
    id: "first-90-days",
    label: "First 90 Days",
    dateDependent: true,
    rationale: "Community, routine, and residency follow-through, as this starts to feel like home rather than a trip.",
  },
];

const TIMELINE_DISCLAIMER =
  "This is a practical sequence built from your plan's own tasks — not a fixed calendar or an official timeline. Exact timing shifts with your real move date, and anything requiring a professional should be confirmed directly with them.";

function classifyTask(task) {
  if (task.chapterId === "getting-ready") {
    return task.tags.includes("urgent") ? "next-30-days" : "start-now";
  }
  if (task.chapterId === "making-it-real") {
    return task.tags.includes("urgent") ? "next-30-days" : "3-6-months-before";
  }
  if (task.chapterId === "the-countdown") {
    return "final-month";
  }
  if (task.chapterId === "the-move") {
    return ARRIVAL_WEEK_TASK_IDS.has(task.id) ? "arrival-week" : "first-30-days";
  }
  return "first-90-days";
}

// plan: buildPlan.js's output (already filtered to this visitor/city).
// recommendation: decisionEngine's buildRecommendation() output, computed
// once on the page and passed in here — not recalculated.
// answers: decisionEngine's useBlueprintAnswers() answers, same.
// taskState: the shared completion map from usePlanState.js — read only,
// never written here.
export function buildRelocationTimeline({ plan, recommendation, answers, taskState }) {
  const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);
  const buckets = new Map(PERIOD_DEFINITIONS.map((definition) => [definition.id, []]));

  for (const task of allTasks) {
    buckets.get(classifyTask(task)).push(task);
  }

  const readinessScore = recommendation.readinessScore;

  const periods = PERIOD_DEFINITIONS.map((definition) => {
    const tasks = buckets.get(definition.id);
    const openCount = tasks.filter((task) => !taskState[task.id]).length;

    let readinessNote = null;
    if (definition.id === "start-now" && readinessScore < 30 && tasks.length > 0) {
      readinessNote = "Your readiness score suggests these foundational steps are worth prioritizing before anything else.";
    } else if (definition.id === "next-30-days" && readinessScore >= 55 && tasks.length > 0) {
      readinessNote = "Your readiness score and timeline both point to these being worth acting on soon.";
    }

    return { ...definition, tasks, totalCount: tasks.length, openCount, readinessNote };
  });

  const currentPeriod = periods.find((period) => period.openCount > 0) || null;
  const timelineOption = TIMELINE_QUESTION.options.find((option) => option.id === answers.timeline);

  return {
    cityName: plan.cityName,
    timelineAnswerLabel: timelineOption ? timelineOption.label : null,
    disclaimer: TIMELINE_DISCLAIMER,
    currentPeriodId: currentPeriod ? currentPeriod.id : null,
    periods,
  };
}
