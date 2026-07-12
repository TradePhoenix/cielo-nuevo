// My Mexico Plan — Your Decision Brief. Same discipline as
// dashboard/logic/buildDashboardSummary.js: a pure function, fixed input,
// fixed output shape, no side effects, no AI. This computes nothing that
// doesn't already exist elsewhere — it only selects and reshapes:
//
//   - readiness / topMatch come straight from
//     decisionEngine/logic/recommendationEngine.js's buildRecommendation()
//     output, unchanged.
//   - priorities are the visitor's own top-weighted Blueprint tags, reusing
//     blueprint/data/copy.js's existing TAG_LABELS (the same labels
//     recommendationEngine.js already uses to build city match reasons).
//   - considerations are picked from a small fixed set of honest,
//     answer-triggered notes below — never generated text, and never a
//     legal/financial/medical/residency/real-estate claim, only a
//     reflection of what the visitor's own answer already left open.
//   - nextActions are the plan's own next incomplete tasks in the current
//     chapter (same source buildDashboardSummary.js already reads from).
//
// This is the seam a future AI layer could enrich or replace: same
// { priorities, readiness, topMatch, considerations, nextActions } output
// shape, different implementation, no component changes required.

import { TAG_LABELS } from "../../blueprint/data/copy";

const MAX_PRIORITIES = 3;
const MAX_NEXT_ACTIONS = 3;
const MAX_CONSIDERATIONS = 2;

// Each rule reads only a real, already-collected Blueprint answer value
// (see blueprint/data/questions.js option ids) — never invents a fact,
// only flags that the visitor's own answer leaves something still open.
const CONSIDERATION_RULES = [
  {
    when: (answers) => answers.budget === "notSure",
    text: "Your monthly budget isn't locked in yet — get a clearer number before committing to a city or timeline.",
  },
  {
    when: (answers) => answers.residencyFamiliarity === "none",
    text: "You haven't looked into Mexico's residency process yet — worth researching early, since it can shape your timeline.",
  },
  {
    when: (answers) => answers.residencyFamiliarity === "heardOf",
    text: "You know residency is a factor but haven't gone deep on the details yet — a Fit Call can walk through what actually applies to you.",
  },
  {
    when: (answers) => answers.lifestyle === "notSure",
    text: "You're still open on what kind of setting fits best — worth exploring more than one match before deciding.",
  },
  {
    when: (answers) => answers.timeline === "exploring",
    text: "Your timeline isn't fixed yet, so treat the dates in this plan as a flexible guide rather than a fixed schedule.",
  },
];

const NO_OPEN_CONSIDERATIONS =
  "Nothing major is unresolved based on your answers — what's ahead is mostly execution, not decision-making.";

// recommendation: decisionEngine buildRecommendation() output
// answers/scores: from decisionEngine useBlueprintAnswers()
// city/plan/currentChapterIndex/taskState: from myMexicoPlan usePlanState()
export function buildDecisionBrief({ recommendation, answers, scores, city, plan, currentChapterIndex, taskState }) {
  const tagCounts = (scores && scores.tagCounts) || {};

  const priorities = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => TAG_LABELS[tag])
    .filter(Boolean)
    .filter((label, index, all) => all.indexOf(label) === index)
    .slice(0, MAX_PRIORITIES);

  const topMatch =
    recommendation.topCityMatches.find((match) => match.id === city.id) ||
    recommendation.topCityMatches[0] ||
    null;

  const considerations = CONSIDERATION_RULES.filter((rule) => rule.when(answers))
    .map((rule) => rule.text)
    .slice(0, MAX_CONSIDERATIONS);

  const nowChapter = plan.chapters[currentChapterIndex];
  const nextActions = nowChapter.tasks
    .filter((task) => !taskState[task.id])
    .slice(0, MAX_NEXT_ACTIONS)
    .map((task) => ({ title: task.title, guideLink: task.guideLink }));

  return {
    priorities,
    readiness: {
      score: recommendation.readinessScore,
      label: recommendation.readinessLabel.label,
      blurb: recommendation.readinessLabel.blurb,
    },
    topMatch: topMatch
      ? { name: topMatch.name, matchReason: topMatch.matchReason, teaser: topMatch.teaser }
      : null,
    considerations: considerations.length > 0 ? considerations : [NO_OPEN_CONSIDERATIONS],
    nextActions,
  };
}
