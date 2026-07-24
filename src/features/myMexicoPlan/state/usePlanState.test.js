// ENG-023 — regression coverage for the My Mexico Plan direct-link crash.
// usePlanState (and everything it calls: useBlueprintAnswers, getCityById,
// buildPlan) has no react-router-dom dependency, so it's fully renderable
// here — unlike MyMexicoPlanPage.js/PlanRecovery.js, which pull in
// YourMexicoShell's <Link> and can't be rendered in this project's current
// Jest environment (a pre-existing react-router-dom module-resolution gap,
// unrelated to this ticket — see CX-005/CX-007's own test files, which
// avoid the same import for the same reason).
//
// `plan` being null is exactly the signal MyMexicoPlanPage.js's ENG-023
// recovery branching depends on — these tests prove it's null (never a
// thrown exception) across every bad-data shape a direct link could hit.

import { renderHook, act } from "@testing-library/react";
import { usePlanState } from "./usePlanState";
import { STORAGE_KEY as BLUEPRINT_STORAGE_KEY } from "../../blueprint/state/useBlueprintState";
import { STORAGE_KEY as PLAN_STORAGE_KEY } from "./usePlanState";

const COMPLETED_ANSWERS = {
  timeline: "asap",
  lifeStage: "remote",
  budget: "premium",
  lifestyle: "cityEnergy",
  household: "solo",
  residencyFamiliarity: "researched",
};

function setBlueprintStorage(value) {
  window.localStorage.setItem(BLUEPRINT_STORAGE_KEY, value);
}

beforeEach(() => {
  window.localStorage.clear();
});

test("valid city + completed Blueprint: builds a real plan", () => {
  setBlueprintStorage(
    JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: COMPLETED_ANSWERS })
  );

  const { result } = renderHook(() => usePlanState("playa-del-carmen"));

  expect(result.current.hasCompletedBlueprint).toBe(true);
  expect(result.current.city).not.toBeNull();
  expect(result.current.city.id).toBe("playa-del-carmen");
  expect(result.current.plan).not.toBeNull();
  expect(result.current.plan.chapters.length).toBeGreaterThan(0);
});

test("valid city, no Blueprint data at all: plan is null, city still resolves, no throw", () => {
  const { result } = renderHook(() => usePlanState("playa-del-carmen"));

  expect(result.current.hasCompletedBlueprint).toBe(false);
  expect(result.current.city).not.toBeNull();
  expect(result.current.plan).toBeNull();
});

test("malformed Blueprint data (invalid JSON): plan is null, no throw", () => {
  setBlueprintStorage("{not valid json at all");

  expect(() => renderHook(() => usePlanState("playa-del-carmen"))).not.toThrow();

  const { result } = renderHook(() => usePlanState("playa-del-carmen"));
  expect(result.current.hasCompletedBlueprint).toBe(false);
  expect(result.current.plan).toBeNull();
});

test("incomplete Blueprint data (empty answers, screen never reached results): plan is null", () => {
  setBlueprintStorage(JSON.stringify({ version: 2, screen: "question", questionIndex: 2, answers: {} }));

  const { result } = renderHook(() => usePlanState("playa-del-carmen"));
  expect(result.current.hasCompletedBlueprint).toBe(false);
  expect(result.current.plan).toBeNull();
});

test("outdated/unexpected shape (answers not an object): plan is null, no throw", () => {
  setBlueprintStorage(JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: null }));

  expect(() => renderHook(() => usePlanState("playa-del-carmen"))).not.toThrow();

  const { result } = renderHook(() => usePlanState("playa-del-carmen"));
  expect(result.current.hasCompletedBlueprint).toBe(false);
  expect(result.current.plan).toBeNull();
});

test("invalid city id: city and plan are both null regardless of Blueprint state, no throw", () => {
  setBlueprintStorage(
    JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: COMPLETED_ANSWERS })
  );

  const { result } = renderHook(() => usePlanState("not-a-real-city"));

  expect(result.current.city).toBeNull();
  expect(result.current.plan).toBeNull();
  // hasCompletedBlueprint is independent of city validity — the Blueprint
  // itself really was completed, it's the city id that's wrong. This is
  // exactly the distinction MyMexicoPlanPage.js's two PlanRecovery variants
  // ("invalid-city" checked first, "no-blueprint" second) rely on.
  expect(result.current.hasCompletedBlueprint).toBe(true);
});

test("invalid city id with no Blueprint data either: still no throw, both null/false", () => {
  const { result } = renderHook(() => usePlanState("not-a-real-city"));

  expect(result.current.city).toBeNull();
  expect(result.current.plan).toBeNull();
  expect(result.current.hasCompletedBlueprint).toBe(false);
});

test("task completion persistence is unaffected by this fix: toggling a task persists under the plan's own storage key", () => {
  setBlueprintStorage(
    JSON.stringify({ version: 2, screen: "results", questionIndex: 5, answers: COMPLETED_ANSWERS })
  );

  const { result } = renderHook(() => usePlanState("playa-del-carmen"));
  const firstTaskId = result.current.plan.chapters[0].tasks[0].id;

  act(() => result.current.toggleTask(firstTaskId));

  expect(result.current.taskState[firstTaskId]).toBe(true);

  const saved = JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY));
  expect(saved.taskState[firstTaskId]).toBe(true);
});
