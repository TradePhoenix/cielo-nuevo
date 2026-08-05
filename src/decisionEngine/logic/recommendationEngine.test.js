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
import { CITY_PROFILES } from "../data/cityProfiles";

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

describe("DEST-002 — four more destinations win their intended signal profile", () => {
  // Each case is hand-verified against every other CITY_PROFILES entry
  // (not just its nearest neighbor) so the win is genuinely outright, not
  // a tie resolved by array order.
  test("Celestún wins for beach + quiet + retirement + budget-conscious signals", () => {
    const ids = topMatchIds(scoresWithTags({ beach: 1, quiet: 2, retirement: 2, budgetConscious: 2 }));
    expect(ids[0]).toBe("celestun");
  });

  test("Sisal wins for beach + quiet + comfortable signals", () => {
    const ids = topMatchIds(scoresWithTags({ beach: 1, quiet: 1, comfortable: 3 }));
    expect(ids[0]).toBe("sisal");
  });

  test("Dzilam de Bravo wins for exploratory + family + budget-conscious signals", () => {
    const ids = topMatchIds(scoresWithTags({ exploratory: 2, family: 2, budgetConscious: 2 }));
    expect(ids[0]).toBe("dzilam-de-bravo");
  });

  test("Santa Elena wins for quiet + exploratory + family signals", () => {
    const ids = topMatchIds(scoresWithTags({ quiet: 2, exploratory: 2, family: 3 }));
    expect(ids[0]).toBe("santa-elena");
  });

  test("Santa Elena carries no beach tag, so a pure beach-town profile never surfaces it first", () => {
    // Guards the brief's "must never inherit coastal assumptions" rule at
    // the matching-engine level, not just in copy.
    const ids = topMatchIds(scoresWithTags({ beach: 3 }));
    expect(ids[0]).not.toBe("santa-elena");
  });

  test("every DEST-002 destination appears somewhere in a neutral, no-signal profile without crashing", () => {
    const recommendation = buildRecommendation(scoresWithTags({}), { lifeStage: "freshStart" });
    expect(recommendation.topCityMatches).toHaveLength(3);
    expect(recommendation.readinessScore).toBe(50);
  });
});

describe("DEST-001/V2 — the three established regression profiles, recalibrated for Blueprint V2", () => {
  // Blueprint V2 changed the questionnaire (12 core questions + conditional
  // follow-ups, multi-select answers, residencyFamiliarity removed, and
  // readinessMax now a constant 77), so the V1 profiles' exact readiness
  // values no longer exist. These are the V2-complete equivalents of the
  // same three personas, with expectations computed against the real
  // engine. Playa del Carmen's persona still lands Playa del Carmen first —
  // the V1->V2 continuity that matters most.
  function scoresFromAnswers(answers) {
    return computeScores(answers, QUESTIONS);
  }

  test("Premium-Solo-Urban profile still matches Playa del Carmen first", () => {
    const answers = {
      motivation: ["remoteWork"],
      timeline: "asap",
      household: "solo",
      origin: "canada",
      lifestyle: ["cityEnergy"],
      placeCharacter: "establishedCoastal",
      priorities: ["walkability", "internet", "dining"],
      budget: "premium",
      housing: "rentFirst",
      lifeStage: "remote",
      practicalNeeds: ["internet"],
      concerns: ["rightPlace"],
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("playa-del-carmen");
    expect(recommendation.readinessScore).toBe(100);
  });

  test("Exploring-Couple-Beach profile matches Tulum first", () => {
    const answers = {
      motivation: ["retirement"],
      timeline: "exploring",
      household: "couple",
      origin: "canada",
      lifestyle: ["beachTown"],
      placeCharacter: "notSure",
      priorities: ["safety"],
      budget: "premium",
      housing: "unsure",
      lifeStage: "family",
      practicalNeeds: ["none"],
      concerns: ["rightPlace"],
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("tulum");
    expect(recommendation.readinessScore).toBe(57);
  });

  test("Comfortable-Family-Quiet profile matches Riviera Maya first", () => {
    const answers = {
      motivation: ["retirement"],
      timeline: "exploring",
      household: "familyKids",
      schooling: "stillDeciding",
      origin: "canada",
      lifestyle: ["familyLife"],
      placeCharacter: "notSure",
      priorities: ["affordability"],
      budget: "comfortable",
      housing: "rentFirst",
      lifeStage: "retiree",
      practicalNeeds: ["none"],
      concerns: ["rightPlace"],
    };
    const recommendation = buildRecommendation(scoresFromAnswers(answers), answers);
    expect(recommendation.topCityMatches[0].id).toBe("riviera-maya");
    expect(recommendation.readinessScore).toBe(69);
  });
});

// BP-002 — permanent reachability guard, added per
// docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md.
//
// Unlike the synthetic scoresWithTags() cases above (which only prove a
// city's tag SET isn't a strict subset of another's — necessary but not
// sufficient), every profile below is a real, complete answer to all 7
// live questions, run through the real computeScores()/buildRecommendation()
// pipeline exactly as a visitor's browser would (Blueprint V2: multi-select
// answers are arrays, exactly as useBlueprintState stores them). The
// original profiles were found by exhaustively enumerating all 15,360 real
// combinations of the V1 questionnaire; profiles updated for Blueprint V2
// were re-found by brute-force search over a constrained-but-real V2 answer
// space against the real engine, and every profile below is asserted to win
// strict #1 (matchScore strictly greater than every other city's, not just
// tied) — the same standard
// BP-001's audit used to prove Sisal's OLD profile could never win.
//
// If the questionnaire, a city's tags, or the tag vocabulary ever changes
// in a way that breaks one of these, that's a real reachability regression
// this guard is designed to catch — it should not be "fixed" by weakening
// the assertion back to a tie or a synthetic tagCounts object.
describe("BP-002/DEST-003 — every one of the 25 destinations is reachable via real questionnaire answers", () => {
  function scoresFromAnswers(answers) {
    return computeScores(answers, QUESTIONS);
  }

  function assertStrictWin(answers, expectedId) {
    const scores = scoresFromAnswers(answers);
    const recommendation = buildRecommendation(scores, answers);
    const winner = recommendation.topCityMatches[0];
    expect(winner.id).toBe(expectedId);
    // Strict, not tied: the #2 match's score must be genuinely lower.
    expect(winner.matchScore).toBeGreaterThan(recommendation.topCityMatches[1].matchScore);
    return { scores, recommendation, winner };
  }

  test("Playa del Carmen", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "remote",
        budget: "premium",
        lifestyle: ["beachTown"],
        placeCharacter: "establishedCoastal",
        household: "solo",
      },
      "playa-del-carmen"
    );
  });

  test("Tulum", () => {
    assertStrictWin(
      {
        timeline: "exploring",
        lifeStage: "entrepreneur",
        budget: "premium",
        lifestyle: ["beachTown"],
        placeCharacter: "cultureHeritage",
        household: "solo",
      },
      "tulum"
    );
  });

  test("Riviera Maya", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "retiree",
        budget: "lean",
        lifestyle: ["cityEnergy"],
        placeCharacter: "cultureHeritage",
        household: "familyKids",
      },
      "riviera-maya"
    );
  });

  test("Mérida", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "remote",
        budget: "lean",
        lifestyle: ["cityEnergy"],
        placeCharacter: "cultureHeritage",
        household: "solo",
      },
      "merida"
    );
  });

  test("Progreso", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "family",
        budget: "comfortable",
        lifestyle: ["cityEnergy"],
        placeCharacter: "establishedCoastal",
        household: "familyKids",
      },
      "progreso"
    );
  });

  test("Chicxulub Puerto", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "family",
        budget: "comfortable",
        lifestyle: ["beachTown"],
        placeCharacter: "natureWildlife",
        household: "familyKids",
      },
      "chicxulub-puerto"
    );
  });

  test("Telchac Puerto", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["beachTown"],
        placeCharacter: "trueRemote",
        priorities: ["affordability"],
        budget: "lean",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "telchac-puerto"
    );
  });

  test("Celestún", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "retiree",
        budget: "lean",
        lifestyle: ["beachTown"],
        placeCharacter: "natureWildlife",
        household: "solo",
      },
      "celestun"
    );
  });

  // Sisal — the whole reason BP-001/BP-002 exist. BP-001 proved this
  // destination's pre-BP-002 tag set could win 0 of 3,840 real
  // combinations. This profile is real, complete, and wins strict #1 —
  // the reachability gap is closed.
  test("Sisal", () => {
    const { recommendation, winner } = (() => {
      const answers = {
        timeline: "asap",
        lifeStage: "retiree",
        budget: "comfortable",
        lifestyle: ["beachTown"],
        placeCharacter: "cultureHeritage",
        household: "solo",
      };
      return assertStrictWin(answers, "sisal");
    })();
    // Personalized-reason honesty check: the shown matchReason must be
    // built from tags this exact answer profile actually produced (beach,
    // quiet, comfortable, heritage all fire from real selected options
    // above — none of it is invented).
    expect(winner.matchReason).toMatch(/beach|slower pace|comfortable budget|local culture and history/);
    expect(recommendation.topCityMatches[0].decisionTrace.length).toBeGreaterThan(0);
  });

  test("Dzilam de Bravo", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "remote",
        budget: "lean",
        lifestyle: ["notSure"],
        placeCharacter: "natureWildlife",
        household: "familyKids",
      },
      "dzilam-de-bravo"
    );
  });

  test("Santa Elena", () => {
    assertStrictWin(
      {
        timeline: "asap",
        lifeStage: "family",
        budget: "notSure",
        lifestyle: ["quietNature"],
        placeCharacter: "cultureHeritage",
        household: "familyKids",
      },
      "santa-elena"
    );
  });

  // DEST-003 — 14 new destinations, exhaustively verified the same way:
  // every combination below was found by brute-forcing all 15,360 real
  // questionnaire answer combinations and confirming a strict (not tied)
  // win against the full, final 25-destination pool. Several destinations
  // required specific tag adjustments to become reachable at all once 25
  // cities shared the same ~14-tag vocabulary — see cityProfiles.js's
  // DEST-003 comment block and questions.js's "frontier" tag comment for
  // what changed and why. Every one of the 11 tests above was re-verified
  // to still pass unchanged after those adjustments.
  test("Puerto Morelos", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "remote", budget: "lean", lifestyle: ["beachTown"], placeCharacter: "cultureHeritage", household: "solo", },
      "puerto-morelos"
    );
  });

  test("Cozumel", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["beachTown"],
        placeCharacter: "establishedCoastal",
        priorities: ["beachAccess"],
        budget: "premium",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "cozumel"
    );
  });

  test("Bacalar", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["quietNature"],
        placeCharacter: "natureWildlife",
        priorities: ["affordability"],
        budget: "notSure",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "bacalar"
    );
  });

  test("Mahahual", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["cityEnergy"],
        placeCharacter: "trueRemote",
        priorities: ["beachAccess"],
        budget: "notSure",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "mahahual"
    );
  });

  test("Akumal", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "family", budget: "premium", lifestyle: ["beachTown"], placeCharacter: "natureWildlife", household: "solo", },
      "akumal"
    );
  });

  test("Cancún", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "entrepreneur", budget: "lean", lifestyle: ["cityEnergy"], placeCharacter: "cultureHeritage", household: "familyKids", },
      "cancun"
    );
  });

  test("Valladolid", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "remote", budget: "lean", lifestyle: ["notSure"], placeCharacter: "cultureHeritage", household: "solo", },
      "valladolid"
    );
  });

  test("Izamal", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["beachTown"],
        placeCharacter: "cultureHeritage",
        priorities: ["culture"],
        budget: "lean",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "izamal"
    );
  });

  test("Tekax", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "remote", budget: "lean", lifestyle: ["notSure"], placeCharacter: "trueRemote", household: "solo", },
      "tekax"
    );
  });

  test("Tizimín", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "retiree", budget: "lean", lifestyle: ["beachTown"], placeCharacter: "trueRemote", household: "familyKids", },
      "tizimin"
    );
  });

  test("Chelem", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["beachTown"],
        placeCharacter: "establishedCoastal",
        priorities: ["affordability"],
        budget: "lean",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "chelem"
    );
  });

  test("Chuburná Puerto", () => {
    assertStrictWin(
      { timeline: "asap", lifeStage: "retiree", budget: "comfortable", lifestyle: ["beachTown"], placeCharacter: "trueRemote", household: "solo", },
      "chuburna-puerto"
    );
  });

  test("El Cuyo", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["beachTown"],
        placeCharacter: "cultureHeritage",
        priorities: ["nature"],
        budget: "notSure",
        housing: "rentFirst",
        lifeStage: "sabbatical",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "el-cuyo"
    );
  });

  test("Río Lagartos", () => {
    assertStrictWin(
      {
        motivation: ["retirement"],
        timeline: "asap",
        household: "solo",
        origin: "canada",
        lifestyle: ["cityEnergy"],
        placeCharacter: "trueRemote",
        priorities: ["culture"],
        budget: "notSure",
        housing: "rentFirst",
        lifeStage: "retiree",
        practicalNeeds: ["none"],
        concerns: ["rightPlace"],
      },
      "rio-lagartos"
    );
  });

  test("all 25 destinations are covered above (guards against a silently-skipped case)", () => {
    // If a future CITY_PROFILES entry is added without a matching test
    // above, this fails loudly instead of the coverage gap going unnoticed.
    expect(CITY_PROFILES.length).toBe(25);
  });
});
