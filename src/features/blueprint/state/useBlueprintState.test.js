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

  // Advance through all 6 questions to reach "loading".
  act(() => {
    for (let i = 0; i < 6; i += 1) result.current.goNext();
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
    for (let i = 0; i < 6; i += 1) result.current.goNext();
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
