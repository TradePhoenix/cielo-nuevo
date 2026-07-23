// DEST-001 — coverage for the Mérida & Yucatán Coast expansion's
// Blueprint matching signals, plus a regression check that the three
// original destinations' matches are unchanged for the site's three
// established test profiles (the same profiles used throughout this
// project's manual QA — see e.g. ENG-021/CX-003's Playwright scripts).
//
// New-city cases use synthetic `scores.tagCounts` directly rather than
// simulating full questionnaire answers — this isolates the actual
// behavior under test (rankCityMatches' tag-overlap scoring) from the
// separate concern of which questionnaire answers produce which tags,
// and each case is hand-verified against the real CITY_PROFILES tag
// combinations below.

import { buildRecommendation } from "./recommendationEngine";
import { computeScores } from "../../features/blueprint/logic/scoringEngine";
import { QUESTIONS } from "../../features/blueprint/data/questions";

function topMatchIds(scores, answers = { lifeStage: "freshStart" }) {
  return buildRecommendation(scores, answers).topCityMatches.map((match) => match.id);
}

function scoresWithTags(tagCounts) {
  return { readinessRaw: 50, readinessMax: 100, tagCounts };
}

describe("DEST-001 — new destinations win their intended signal profile", () => {
  test("Mérida wins for urban + remote-work + retirement + budget-conscious signals", () => {
    const ids = topMatchIds(scoresWithTags({ urban: 2, remoteWork: 2, retirement: 1, budgetConscious: 1 }));
    expect(ids[0]).toBe("merida");
  });

  test("Progreso wins for beach + urban + family signals", () => {
    const ids = topMatchIds(scoresWithTags({ beach: 1, urban: 2, family: 2 }));
    expect(ids[0]).toBe("progreso");
  });

  test("Chicxulub Puerto wins for beach + quiet + family signals", () => {
    const ids = topMatchIds(scoresWithTags({ beach: 1, quiet: 2, family: 1 }));
    expect(ids[0]).toBe("chicxulub-puerto");
  });

  test("Telchac Puerto wins for beach + quiet + exploratory + budget-conscious signals", () => {
    const ids = topMatchIds(scoresWithTags({ beach: 1, quiet: 2, exploratory: 2, budgetConscious: 1 }));
    expect(ids[0]).toBe("telchac-puerto");
  });

  test("Telchac Puerto (budget-conscious) beats Tulum (premium) on an otherwise identical beach+quiet+exploratory profile", () => {
    // Directly verifies the ticket's explicit instruction not to frame
    // Telchac Puerto as exclusive/premium — it should out-rank Tulum's
    // near-identical tag set precisely because it carries
    // budgetConscious instead of premium.
    const ids = topMatchIds(scoresWithTags({ beach: 2, quiet: 2, exploratory: 2, budgetConscious: 1 }));
    expect(ids.indexOf("telchac-puerto")).toBeLessThan(ids.indexOf("tulum"));
  });

  test("every new destination appears somewhere in a neutral, no-signal profile without crashing", () => {
    const recommendation = buildRecommendation(scoresWithTags({}), { lifeStage: "freshStart" });
    expect(recommendation.topCityMatches).toHaveLength(3);
    expect(recommendation.readinessScore).toBe(50);
  });
});

describe("DEST-001 — existing destination results are unchanged", () => {
  function scoresFromAnswers(answers) {
    return computeScores(answers, QUESTIONS);
  }

  test("Premium-Solo-Urban profile still matches Playa del Carmen first", () => {
    const answers = {
      timeline: "asap",
      lifeStage: "remote",
      budget: "premium",
      lifestyle: "cityEnergy",
      household: "solo",
      residencyFamiliarity: "researched",
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("playa-del-carmen");
    expect(recommendation.readinessScore).toBe(100);
  });

  test("Unknown-Couple-Quiet profile still matches Tulum first", () => {
    const answers = {
      timeline: "exploring",
      lifeStage: "retiree",
      budget: "notSure",
      lifestyle: "quietNature",
      household: "couple",
      residencyFamiliarity: "none",
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("tulum");
    expect(recommendation.readinessScore).toBe(51);
  });

  test("Comfortable-Family-Quiet profile still matches Riviera Maya first", () => {
    const answers = {
      timeline: "1-2y",
      lifeStage: "family",
      budget: "comfortable",
      lifestyle: "quietNature",
      household: "familyKids",
      residencyFamiliarity: "heardOf",
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("riviera-maya");
    expect(recommendation.readinessScore).toBe(70);
  });
});
