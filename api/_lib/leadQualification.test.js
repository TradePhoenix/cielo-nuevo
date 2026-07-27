import { scoreLeadQualification } from "./leadQualification.js";

describe("scoreLeadQualification", () => {
  test("scores a single vague question as low", () => {
    const result = scoreLeadQualification([{ role: "user", content: "What is Mexico like?" }]);
    expect(result.level).toBe("low");
  });

  test("scores a message with budget and destination as at least medium", () => {
    const result = scoreLeadQualification([
      { role: "user", content: "My budget is $2000/month and I'm looking at Tulum." },
    ]);
    expect(["medium", "high"]).toContain(result.level);
    expect(result.signals).toEqual(expect.arrayContaining(["mentioned_budget", "named_destination"]));
  });

  test("scores a highly-engaged, ready-to-move conversation as high", () => {
    const messages = [
      { role: "user", content: "I want to move to Merida within 6 months." },
      { role: "assistant", content: "..." },
      { role: "user", content: "My budget is around $2000 a month." },
      { role: "assistant", content: "..." },
      { role: "user", content: "I've decided, I'm ready and committed to this move." },
      { role: "assistant", content: "..." },
      { role: "user", content: "What's the next step?" },
    ];
    const result = scoreLeadQualification(messages);
    expect(result.level).toBe("high");
    expect(result.turnCount).toBe(4);
  });

  test("handles an empty conversation", () => {
    const result = scoreLeadQualification([]);
    expect(result.level).toBe("low");
    expect(result.signals).toEqual([]);
  });
});
