import { GATES, getOverallReadiness } from "./launchScorecard";

describe("launch scorecard", () => {
  it("has 10 gates with weights summing to 100", () => {
    expect(GATES).toHaveLength(10);
    expect(GATES.reduce((sum, g) => sum + g.weight, 0)).toBe(100);
  });

  it("keeps every score and threshold in 0–100", () => {
    GATES.forEach((g) => {
      expect(g.score).toBeGreaterThanOrEqual(0);
      expect(g.score).toBeLessThanOrEqual(100);
      expect(g.required).toBeGreaterThanOrEqual(0);
      expect(g.required).toBeLessThanOrEqual(100);
    });
  });

  it("only marks a gate BLOCKED when it has P0 blockers, and vice versa", () => {
    GATES.forEach((g) => {
      expect(g.status === "BLOCKED").toBe(g.blockers > 0);
    });
  });

  it("computes the weighted overall readiness", () => {
    expect(
      getOverallReadiness([
        { score: 100, weight: 50 },
        { score: 0, weight: 50 },
      ])
    ).toBe(50);
    expect(getOverallReadiness([])).toBe(0);
  });

  it("current overall readiness matches the audited weighted score", () => {
    expect(getOverallReadiness()).toBe(52);
  });
});
