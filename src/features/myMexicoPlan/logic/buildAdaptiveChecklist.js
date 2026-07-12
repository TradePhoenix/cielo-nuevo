// My Mexico Plan — Adaptive Relocation Checklist engine. Same discipline
// as buildDecisionBrief.js and buildCostPlanner.js: a pure function,
// fixed input, fixed output shape, no side effects, no AI, no new tasks.
//
// This is deliberately a different lens than NowNextLater.js, not a
// duplicate of it: NowNextLater groups the plan's tasks by calendar
// chapter (which chapter is "Now" based on days since the visitor
// started). This file ignores the calendar entirely and re-ranks every
// available task (already filtered to this visitor/city by
// buildPlan.js) by how relevant it is to the visitor's own answers,
// using the same tag-overlap approach recommendationEngine.js already
// uses to rank cities. A task can land in "Do Now" here even if its
// chapter is nominally weeks away, if it's highly relevant to this
// visitor specifically.
//
// Score = tag relevance (sum of the visitor's own tag counts for each
// tag the task carries) + a small foundational boost for earlier
// chapters and city-specific tasks + a modest readiness-based nudge.
// Nothing here invents a task, a deadline, or a professional
// requirement — every task keeps its own existing `ownership` field
// (self / pathToMexico / professional) exactly as already defined in
// taskBank.js, so the distinction between general planning guidance and
// something that needs a qualified professional is preserved unchanged.
//
// This is the seam a future AI layer could enrich (e.g. reordering
// within a bucket using richer signals) without changing the bucket
// shape or any component that renders it.

const CHAPTER_BASE_SCORE = {
  "getting-ready": 3,
  "making-it-real": 2,
  "the-countdown": 1,
  "the-move": 0,
  "becoming-local": 0,
};

const DO_NOW_COUNT = 5;
const DO_NEXT_COUNT = 10;
const NEXT_HIGHEST_PRIORITY_COUNT = 3;

function scoreTask(task, { tagCounts, readinessScore }) {
  const tagRelevance = task.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);
  const universalBase = task.tags.length === 0 ? 2 : 0;
  const chapterBase = CHAPTER_BASE_SCORE[task.chapterId] || 0;
  const citySpecificBonus = task.cityIds ? 2 : 0;

  let readinessAdjustment = 0;
  if (readinessScore >= 55 && task.tags.includes("urgent")) {
    readinessAdjustment = 2;
  } else if (readinessScore < 30 && task.chapterId === "getting-ready") {
    readinessAdjustment = 1;
  }

  return tagRelevance + universalBase + chapterBase + citySpecificBonus + readinessAdjustment;
}

// plan: buildPlan.js's output (already filtered to this visitor/city)
// recommendation: decisionEngine buildRecommendation() output
// scores: decisionEngine useBlueprintAnswers() scores
export function buildAdaptiveChecklist({ plan, recommendation, scores, taskState }) {
  const tagCounts = (scores && scores.tagCounts) || {};
  const readinessScore = recommendation.readinessScore;

  const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);
  const incompleteTasks = allTasks.filter((task) => !taskState[task.id]);

  const ranked = incompleteTasks
    .map((task) => ({ task, score: scoreTask(task, { tagCounts, readinessScore }) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.task);

  const doNow = ranked.slice(0, DO_NOW_COUNT);
  const doNext = ranked.slice(DO_NOW_COUNT, DO_NOW_COUNT + DO_NEXT_COUNT);
  const later = ranked.slice(DO_NOW_COUNT + DO_NEXT_COUNT);

  return {
    nextHighestPriority: doNow.slice(0, NEXT_HIGHEST_PRIORITY_COUNT),
    doNow,
    doNext,
    later,
    totalOpenTasks: incompleteTasks.length,
  };
}
