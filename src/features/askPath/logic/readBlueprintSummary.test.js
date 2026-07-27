import { readBlueprintSummary } from "./readBlueprintSummary";
import { STORAGE_KEY } from "../../blueprint/state/useBlueprintState";

function saveBlueprintState(overrides = {}) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 2,
      screen: "results",
      questionIndex: 0,
      answers: { timeline: "asap", lifeStage: "remote", budget: "comfortable" },
      ...overrides,
    })
  );
}

describe("readBlueprintSummary", () => {
  afterEach(() => window.localStorage.clear());

  test("returns null when nothing is saved", () => {
    expect(readBlueprintSummary()).toBeNull();
  });

  test("returns null when the visitor hasn't reached results yet", () => {
    saveBlueprintState({ screen: "question", answers: {} });
    expect(readBlueprintSummary()).toBeNull();
  });

  test("returns null for a mismatched storage version", () => {
    saveBlueprintState({ version: 1 });
    expect(readBlueprintSummary()).toBeNull();
  });

  test("returns only the safe derived summary — never raw answers", () => {
    saveBlueprintState();
    const summary = readBlueprintSummary();
    expect(summary).not.toBeNull();
    expect(summary).toEqual(
      expect.objectContaining({
        archetypeTitle: expect.any(String),
        readinessLabel: expect.any(String),
        budgetTier: "comfortable",
        topCityNames: expect.any(Array),
      })
    );
    expect(summary.topCityNames.length).toBeGreaterThan(0);
    expect(JSON.stringify(summary)).not.toMatch(/timeline|lifeStage/);
  });

  test("returns null on malformed JSON rather than throwing", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    expect(() => readBlueprintSummary()).not.toThrow();
    expect(readBlueprintSummary()).toBeNull();
  });
});
