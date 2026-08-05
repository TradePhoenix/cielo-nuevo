import { renderHook, act } from "@testing-library/react";
import { useBlueprintState, STORAGE_KEY, pruneHiddenAnswers } from "./useBlueprintState";
import { QUESTIONS } from "../data/questions";

beforeEach(() => {
  window.localStorage.clear();
});

// A complete, valid V2 core answer set (no conditional triggers): the 12
// always-visible questions, multi-select answers stored as arrays exactly
// as selectAnswer produces them.
const CORE_ANSWERS = {
  motivation: ["remoteWork"],
  timeline: "asap",
  household: "solo",
  origin: "canada",
  lifestyle: ["cityEnergy"],
  placeCharacter: "establishedCoastal",
  priorities: ["walkability", "internet"],
  budget: "premium",
  housing: "rentFirst",
  lifeStage: "remote",
  practicalNeeds: ["internet"],
  concerns: ["rightPlace"],
};

const CORE_QUESTION_COUNT = QUESTIONS.filter((q) => !q.showIf).length;

function answerAll(result, answers = CORE_ANSWERS) {
  act(() => {
    Object.entries(answers).forEach(([questionId, value]) => {
      const ids = Array.isArray(value) ? value : [value];
      ids.forEach((optionId) => result.current.selectAnswer(questionId, optionId));
    });
  });
}

test("a fresh visitor starts on intro and does not skip the results reveal", () => {
  const { result } = renderHook(() => useBlueprintState());

  expect(result.current.screen).toBe("intro");
  expect(result.current.skipResultsReveal).toBe(false);
  expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT);
});

test("a returning visitor loaded directly into saved results skips the reveal", () => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 3, screen: "results", questionIndex: 11, answers: CORE_ANSWERS })
  );

  const { result } = renderHook(() => useBlueprintState());

  expect(result.current.screen).toBe("results");
  expect(result.current.skipResultsReveal).toBe(true);
  expect(result.current.recommendation.topCityMatches.length).toBeGreaterThan(0);
});

test("completing the questionnaire live always reveals the results (never skipped)", () => {
  const { result } = renderHook(() => useBlueprintState());

  act(() => result.current.startQuestionnaire());
  expect(result.current.screen).toBe("question");

  answerAll(result);

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
    JSON.stringify({ version: 3, screen: "results", questionIndex: 11, answers: CORE_ANSWERS })
  );

  const { result } = renderHook(() => useBlueprintState());
  expect(result.current.skipResultsReveal).toBe(true);

  act(() => result.current.restart());
  expect(result.current.screen).toBe("intro");

  act(() => result.current.startQuestionnaire());
  answerAll(result);
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
    JSON.stringify({ version: 3, screen: "question", questionIndex: 2, answers: { timeline: "asap" } })
  );

  const { result } = renderHook(() => useBlueprintState());
  expect(result.current.screen).toBe("question");
  expect(result.current.skipResultsReveal).toBe(false);
});

// Blueprint V2 — conditional follow-ups, answer pruning, and multi-select.
describe("V2 — conditional questions appear only when relevant and forget their answers when hidden", () => {
  test("choosing 'family with kids' reveals the schooling follow-up; switching back hides and prunes it", () => {
    const { result } = renderHook(() => useBlueprintState());
    act(() => result.current.startQuestionnaire());

    expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT);

    act(() => result.current.selectAnswer("household", "familyKids"));
    expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT + 1);

    act(() => result.current.selectAnswer("schooling", "bilingualSchools"));
    expect(result.current.answers.schooling).toBe("bilingualSchools");

    // Changing the trigger answer removes the now-irrelevant conditional
    // answer entirely — it must not silently keep influencing the result.
    act(() => result.current.selectAnswer("household", "solo"));
    expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT);
    expect(result.current.answers.schooling).toBeUndefined();
  });

  test("practicalNeeds selections reveal pet/vehicle/healthcare follow-ups independently", () => {
    const { result } = renderHook(() => useBlueprintState());
    act(() => result.current.startQuestionnaire());

    act(() => result.current.selectAnswer("practicalNeeds", "pets"));
    act(() => result.current.selectAnswer("practicalNeeds", "vehicle"));
    expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT + 2);

    act(() => result.current.selectAnswer("petDetails", "smallPet"));
    // Deselecting pets prunes the pet answer but keeps the vehicle follow-up.
    act(() => result.current.selectAnswer("practicalNeeds", "pets"));
    expect(result.current.answers.petDetails).toBeUndefined();
    expect(result.current.totalQuestions).toBe(CORE_QUESTION_COUNT + 1);
  });

  test("multi-select respects maxSelections (extra taps are ignored) and toggles off", () => {
    const { result } = renderHook(() => useBlueprintState());
    act(() => result.current.startQuestionnaire());

    act(() => {
      result.current.selectAnswer("concerns", "residency");
      result.current.selectAnswer("concerns", "money");
    });
    expect(result.current.answers.concerns).toEqual(["residency", "money"]);

    // concerns has maxSelections: 2 — a third selection is ignored.
    act(() => result.current.selectAnswer("concerns", "housing"));
    expect(result.current.answers.concerns).toEqual(["residency", "money"]);

    // Tapping a selected option toggles it off, freeing a slot.
    act(() => result.current.selectAnswer("concerns", "money"));
    expect(result.current.answers.concerns).toEqual(["residency"]);
  });

  test("pruneHiddenAnswers collapses chained conditionals to a fixed point", () => {
    const withHidden = { ...CORE_ANSWERS, schooling: "bilingualSchools", petDetails: "smallPet" };
    const pruned = pruneHiddenAnswers(withHidden);
    expect(pruned.schooling).toBeUndefined();
    expect(pruned.petDetails).toBeUndefined();
    // Untouched objects come back by reference when nothing needed pruning.
    expect(pruneHiddenAnswers(CORE_ANSWERS)).toBe(CORE_ANSWERS);
  });
});

// Storage-version policy: pre-V2 saved sessions (version 2) are discarded
// rather than migrated — the established behavior for this key whenever the
// saved shape changes incompatibly.
describe("V2 — pre-V2 saved sessions are discarded safely", () => {
  test("a version-2 results session starts fresh on intro without crashing", () => {
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
    expect(result.current.screen).toBe("intro");
    expect(result.current.answers).toEqual({});
    expect(result.current.skipResultsReveal).toBe(false);
  });

  test("malformed saved answers (not an object) never crash", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 3, screen: "results", questionIndex: 5, answers: null })
    );

    expect(() => renderHook(() => useBlueprintState())).not.toThrow();
    const { result } = renderHook(() => useBlueprintState());
    expect(result.current.answers).toEqual({});
    expect(result.current.recommendation.topCityMatches.length).toBeGreaterThan(0);
  });

  test("incomplete saved answers (partial, mid-questionnaire) never crash", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 3, screen: "question", questionIndex: 3, answers: { timeline: "asap", household: "familyKids" } })
    );

    expect(() => renderHook(() => useBlueprintState())).not.toThrow();
    const { result } = renderHook(() => useBlueprintState());
    expect(result.current.screen).toBe("question");
    expect(result.current.currentQuestion).not.toBeNull();
  });
});

// V2 result intelligence — the recommendation now carries focusAreas (the
// direct reply to the visitor's stated concerns) and profileHighlights.
describe("V2 — result intelligence fields", () => {
  test("focusAreas mirror the visitor's selected concerns, in order", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 3,
        screen: "results",
        questionIndex: 11,
        answers: { ...CORE_ANSWERS, concerns: ["residency", "trustedHelp"] },
      })
    );

    const { result } = renderHook(() => useBlueprintState());
    const { focusAreas } = result.current.recommendation;
    expect(focusAreas.map((f) => f.id)).toEqual(["residency", "trustedHelp"]);
    expect(focusAreas[0].title.length).toBeGreaterThan(0);
    expect(focusAreas[0].body.length).toBeGreaterThan(0);
  });

  test("profileHighlights resolve selected option labels in the active language", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 3, screen: "results", questionIndex: 11, answers: CORE_ANSWERS })
    );

    const { result: en } = renderHook(() => useBlueprintState("en"));
    const budgetRowEn = en.current.recommendation.profileHighlights.find((r) => r.id === "budget");
    expect(budgetRowEn.values[0]).toContain("$3,000–$6,000");

    const { result: es } = renderHook(() => useBlueprintState("es"));
    const budgetRowEs = es.current.recommendation.profileHighlights.find((r) => r.id === "budget");
    expect(budgetRowEs.values[0]).toContain("mes");
  });
});
