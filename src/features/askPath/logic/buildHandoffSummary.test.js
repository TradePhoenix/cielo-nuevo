import { buildHandoffSummary } from "./buildHandoffSummary";

describe("buildHandoffSummary", () => {
  test("returns an empty string for no messages", () => {
    expect(buildHandoffSummary([])).toBe("");
  });

  test("joins only the user's turns, not the assistant's", () => {
    const summary = buildHandoffSummary([
      { role: "user", content: "I want to move to Tulum" },
      { role: "assistant", content: "Tulum is a great fit for..." },
      { role: "user", content: "My budget is $2000/month" },
    ]);
    expect(summary).toBe("I want to move to Tulum • My budget is $2000/month");
    expect(summary).not.toMatch(/great fit/);
  });

  test("truncates a very long conversation rather than growing unbounded", () => {
    const longMessages = Array.from({ length: 20 }, (_, i) => ({
      role: "user",
      content: `This is a fairly long user message number ${i} with some real detail in it.`,
    }));
    const summary = buildHandoffSummary(longMessages);
    expect(summary.length).toBeLessThanOrEqual(600);
    expect(summary.endsWith("…")).toBe(true);
  });
});
