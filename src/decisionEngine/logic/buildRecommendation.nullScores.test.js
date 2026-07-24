// ENG-023 — documents the exact production crash and proves the fix.
//
// MyMexicoPlanPage.js used to call buildRecommendation(scores, answers)
// unconditionally, where `scores` comes from useBlueprintAnswers() and is
// `null` whenever no completed Blueprint session exists (missing,
// malformed, or outdated localStorage all collapse to this same value —
// see useBlueprintAnswers.js and usePlanState.test.js). buildRecommendation
// dereferences scores.readinessMax immediately, so a direct link to
// /my-mexico-plan/:cityId with no Blueprint data threw before the page's
// own recovery check ever ran.
//
// The fix (MyMexicoPlanPage.js) guards the call site rather than changing
// buildRecommendation itself, since that function is documented as the
// fixed-input "seam" a future AI backend could replace — every other
// caller already only invokes it with real scores. This file can't import
// MyMexicoPlanPage.js directly (it pulls in react-router-dom via
// YourMexicoShell, which this project's Jest environment can't currently
// resolve — a pre-existing, unrelated gap), so it instead proves the exact
// guard expression used there, against the real function.

import { buildRecommendation } from "./recommendationEngine";

const SAMPLE_ANSWERS = { lifeStage: "freshStart" };

test("calling buildRecommendation with null scores throws (the original bug, preserved as a regression trip-wire)", () => {
  expect(() => buildRecommendation(null, SAMPLE_ANSWERS)).toThrow();
});

test("the MyMexicoPlanPage.js guard (`scores ? buildRecommendation(scores, answers) : null`) never throws for null scores", () => {
  const scores = null;
  expect(() => (scores ? buildRecommendation(scores, SAMPLE_ANSWERS) : null)).not.toThrow();
  expect(scores ? buildRecommendation(scores, SAMPLE_ANSWERS) : null).toBeNull();
});

test("the same guard still returns a real recommendation when scores are present", () => {
  const scores = { readinessRaw: 50, readinessMax: 100, tagCounts: {} };
  const result = scores ? buildRecommendation(scores, SAMPLE_ANSWERS) : null;
  expect(result).not.toBeNull();
  expect(result.readinessScore).toBe(50);
  expect(result.topCityMatches.length).toBeGreaterThan(0);
});
