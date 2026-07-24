import { renderHook, act } from "@testing-library/react";
import { useBlueprintState, STORAGE_KEY } from "./useBlueprintState";

beforeEach(() => {
  window.localStorage.clear();
});

test("a fresh visitor starts on intro and does not skip the results reveal", () => {
  const { result } = renderHook(() => useBlueprintState());

  expect(result.current.screen).toBe("intro");
  expect(result.current.skipResultsReveal).toBe(false);
});

test("a returning visitor loaded directly into saved results skips the reveal", () => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 2,
      screen: "results",
      questionIndex: 5,
      answers: { timeline: "asap", lifeStage: "remote", budget: "premium", lifestyle: "cityEnergy" },
    })
  );

  const { result } = renderHook(() => useBlueprintState());

  expect(result.current.screen).toBe("results");
  expect(result.current.skipResultsReveal).toBe(true);
  // Recommendation ranking still derives normally from the restored
  // answers — this is not a regression test of the engine itself
  // (recommendationEngine.test.js already covers that unmodified), just
  // confirmation that CX-005 didn't disconnect the wiring.
  expect(result.current.recommendation.topCityMatches.length).toBeGreaterThan(0);
});

test("completing the questionnaire live always reveals the results (never skipped)", () => {
  const { result } = renderHook(() => useBlueprintState());

  act(() => result.current.startQuestionnaire());
  expect(result.current.screen).toBe("question");

  act(() => {
    result.current.selectAnswer("timeline", "asap");
    result.current.selectAnswer("lifeStage", "remote");
    result.current.selectAnswer("budget", "premium");
    result.current.selectAnswer("lifestyle", "cityEnergy");
    result.current.selectAnswer("household", "solo");
    result.current.selectAnswer("residencyFamiliarity", "researched");
  });

  // Advance through every question (count is derived from the live
  // QUESTIONS array, not hard-coded, so this survives BP-002 growing it
  // from 6 to 7) to reach "loading".
  act(() => {
    for (let i = 0; i < result.current.totalQuestions; i += 1) result.current.goNext();
  });
  expect(result.current.screen).toBe("loading");
  expect(result.current.skipResultsReveal).toBe(false);

  act(() => result.current.completeLoading());
  expect(result.current.screen).toBe("results");
  expect(result.current.skipResultsReveal).toBe(false);
});

test("retaking after a returning (skip-reveal) visit reveals results again on the next live completion", () => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: { timeline: "asap" } })
  );

  const { result } = renderHook(() => useBlueprintState());
  expect(result.current.skipResultsReveal).toBe(true);

  act(() => result.current.restart());
  expect(result.current.screen).toBe("intro");

  act(() => result.current.startQuestionnaire());
  act(() => {
    result.current.selectAnswer("timeline", "asap");
    result.current.selectAnswer("lifeStage", "remote");
    result.current.selectAnswer("budget", "premium");
    result.current.selectAnswer("lifestyle", "cityEnergy");
    result.current.selectAnswer("household", "solo");
    result.current.selectAnswer("residencyFamiliarity", "researched");
  });
  act(() => {
    for (let i = 0; i < result.current.totalQuestions; i += 1) result.current.goNext();
  });
  expect(result.current.screen).toBe("loading");

  act(() => result.current.completeLoading());
  expect(result.current.screen).toBe("results");
  expect(result.current.skipResultsReveal).toBe(false);
});

test("a browser refresh mid-questionnaire (no saved results) still does not skip a future reveal", () => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 2, screen: "question", questionIndex: 2, answers: { timeline: "asap" } })
  );

  const { result } = renderHook(() => useBlueprintState());
  expect(result.current.screen).toBe("question");
  expect(result.current.skipResultsReveal).toBe(false);
});

// BP-002 — saved-state compatibility for the new 7th question (placeCharacter).
// See docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md.
describe("BP-002 — a pre-existing 6-answer saved session (no placeCharacter answer) stays safe", () => {
  const SIX_QUESTION_ANSWERS = {
    timeline: "asap",
    lifeStage: "remote",
    budget: "premium",
    lifestyle: "cityEnergy",
    household: "solo",
    residencyFamiliarity: "researched",
  };

  test("loads saved results without crashing and without fabricating a 7th answer", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: SIX_QUESTION_ANSWERS })
    );

    const { result } = renderHook(() => useBlueprintState());

    expect(result.current.screen).toBe("results");
    expect(result.current.answers.placeCharacter).toBeUndefined();
    expect(result.current.recommendation.topCityMatches.length).toBeGreaterThan(0);
    // The old top match (Playa del Carmen, per this exact profile in
    // recommendationEngine.test.js) is unchanged: the new question's tags
    // (heritage/natureFirst/comfortable/remote) only ever add to a city's
    // score when the visitor actually answered it — an unanswered question
    // contributes nothing, so a returning visitor's recommendation cannot
    // silently shift just because the questionnaire grew by one question.
    expect(result.current.recommendation.topCityMatches[0].id).toBe("playa-del-carmen");
  });

  test("retaking after a 6-answer saved session presents the full current (7-question) flow", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: SIX_QUESTION_ANSWERS })
    );

    const { result } = renderHook(() => useBlueprintState());
    expect(result.current.totalQuestions).toBe(7);

    act(() => result.current.restart());
    act(() => result.current.startQuestionnaire());

    expect(result.current.screen).toBe("question");
    expect(result.current.questionIndex).toBe(0);
    expect(result.current.totalQuestions).toBe(7);
  });

  test("malformed saved answers (not an object) never crash, never fabricate a placeCharacter answer", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: null })
    );

    expect(() => renderHook(() => useBlueprintState())).not.toThrow();
    const { result } = renderHook(() => useBlueprintState());
    expect(result.current.answers).toEqual({});
    expect(result.current.recommendation.topCityMatches.length).toBeGreaterThan(0);
  });

  test("incomplete saved answers (partial, mid-questionnaire) never crash", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 2, screen: "question", questionIndex: 3, answers: { timeline: "asap", lifeStage: "family" } })
    );

    expect(() => renderHook(() => useBlueprintState())).not.toThrow();
    const { result } = renderHook(() => useBlueprintState());
    expect(result.current.screen).toBe("question");
    expect(result.current.currentQuestion).not.toBeNull();
  });
});
