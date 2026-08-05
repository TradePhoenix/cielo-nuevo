import { buildLeadPayload } from "./buildLeadPayload";
import { QUESTIONS } from "../data/questions";
import { computeScores } from "./scoringEngine";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";

// Same complete V2 core answer set used by useBlueprintState.test.js.
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

function realRecommendation(answers, lang = "en") {
  return buildRecommendation(computeScores(answers, QUESTIONS), answers, lang);
}

test("summarizes every answered question with English option labels", () => {
  const payload = buildLeadPayload(CORE_ANSWERS, realRecommendation(CORE_ANSWERS));

  const lines = payload.answersSummary.split("\n");
  expect(lines).toHaveLength(Object.keys(CORE_ANSWERS).length);
  expect(payload.answersSummary).toContain("timeline: ");
  expect(payload.answersSummary).toContain("motivation: Remote work freedom");
  expect(payload.answersSummary).toContain("priorities: ");
  // Multi-select answers list every selected label.
  expect(lines.find((l) => l.startsWith("priorities:"))).toContain(" | ");
});

test("English labels are used even when the recommendation is Spanish", () => {
  const payload = buildLeadPayload(CORE_ANSWERS, realRecommendation(CORE_ANSWERS, "es"));
  expect(payload.answersSummary).toContain("motivation: Remote work freedom");
  // The archetype title itself stays in the visitor's language — that is
  // captured data, not summary formatting.
  expect(payload.archetype.length).toBeGreaterThan(0);
});

test("carries the calculated result: destinations, readiness score, archetype", () => {
  const recommendation = realRecommendation(CORE_ANSWERS);
  const payload = buildLeadPayload(CORE_ANSWERS, recommendation);

  expect(payload.topDestinations.split(", ").length).toBe(recommendation.topCityMatches.length);
  expect(payload.topDestinations).toContain(recommendation.topCityMatches[0].name);
  expect(payload.readinessScore).toBe(String(recommendation.readinessScore));
  expect(payload.archetype).toBe(recommendation.archetype.title);
});

test("answersRaw round-trips the exact stored answer shapes (arrays stay arrays)", () => {
  const payload = buildLeadPayload(CORE_ANSWERS, realRecommendation(CORE_ANSWERS));
  expect(JSON.parse(payload.answersRaw)).toEqual(CORE_ANSWERS);
});

test("never throws on missing or malformed inputs", () => {
  expect(() => buildLeadPayload(null, null)).not.toThrow();
  const payload = buildLeadPayload(null, null);
  expect(payload.answersSummary).toBe("");
  expect(payload.answersRaw).toBe("{}");
  expect(payload.topDestinations).toBe("");
  expect(payload.readinessScore).toBe("");
  expect(payload.archetype).toBe("");
});
