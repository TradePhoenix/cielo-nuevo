// Launch fix #1 — graceful degradation of the lead-capture gate. A
// Formspree/network failure must never block or destroy completed
// Blueprint results, and the failure path must never count as a captured
// lead. See useBlueprintState.js (continueAfterCaptureFailure /
// retryLeadCapture).
import { renderHook, act } from "@testing-library/react";
import { useBlueprintState } from "./useBlueprintState";

beforeEach(() => {
  window.localStorage.clear();
});

// Same complete core answer set used by useBlueprintState.test.js.
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

function reachLeadCapture(result) {
  act(() => {
    result.current.startQuestionnaire();
    Object.entries(CORE_ANSWERS).forEach(([questionId, value]) => {
      const ids = Array.isArray(value) ? value : [value];
      ids.forEach((optionId) => result.current.selectAnswer(questionId, optionId));
    });
  });
  act(() => {
    for (let i = 0; i < result.current.totalQuestions; i += 1) result.current.goNext();
  });
  act(() => {
    result.current.completeLoading();
  });
  expect(result.current.screen).toBe("leadCapture");
}

test("after a submission failure, results open without ever marking the lead captured", () => {
  const { result } = renderHook(() => useBlueprintState());
  reachLeadCapture(result);

  act(() => result.current.continueAfterCaptureFailure());

  expect(result.current.screen).toBe("results");
  expect(result.current.leadCaptured).toBe(false);
  expect(result.current.recommendation).toBeTruthy();
});

test("answers and results survive the failure path intact", () => {
  const { result } = renderHook(() => useBlueprintState());
  reachLeadCapture(result);
  const answersBefore = result.current.answers;

  act(() => result.current.continueAfterCaptureFailure());

  expect(result.current.answers).toEqual(answersBefore);
});

test("the results banner can return to lead capture, and a successful retry captures normally", () => {
  const { result } = renderHook(() => useBlueprintState());
  reachLeadCapture(result);

  act(() => result.current.continueAfterCaptureFailure());
  act(() => result.current.retryLeadCapture());
  expect(result.current.screen).toBe("leadCapture");

  act(() => result.current.completeLeadCapture());
  expect(result.current.screen).toBe("results");
  expect(result.current.leadCaptured).toBe(true);
});

test("retryLeadCapture is a no-op once the lead is actually captured", () => {
  const { result } = renderHook(() => useBlueprintState());
  reachLeadCapture(result);

  act(() => result.current.completeLeadCapture());
  expect(result.current.leadCaptured).toBe(true);

  act(() => result.current.retryLeadCapture());
  expect(result.current.screen).toBe("results");
});

test("continueAfterCaptureFailure is a no-op outside the leadCapture screen", () => {
  const { result } = renderHook(() => useBlueprintState());
  expect(result.current.screen).toBe("intro");

  act(() => result.current.continueAfterCaptureFailure());
  expect(result.current.screen).toBe("intro");
});

test("the uncaptured state persists across a reload so the retry banner returns", () => {
  const first = renderHook(() => useBlueprintState());
  reachLeadCapture(first.result);
  act(() => first.result.current.continueAfterCaptureFailure());
  first.unmount();

  const second = renderHook(() => useBlueprintState());
  expect(second.result.current.screen).toBe("results");
  expect(second.result.current.leadCaptured).toBe(false);
});
