// Reads the visitor's own already-completed Blueprint results from
// localStorage and reduces them to the small, safe summary Ask Path is
// allowed to use — never raw questionnaire answers. Reuses the same
// STORAGE_KEY and scoring/recommendation functions the Blueprint feature
// itself uses (useBlueprintState.js, scoringEngine.js, recommendationEngine.js)
// rather than re-deriving that logic, so this can never drift from what the
// Blueprint itself would show.
//
// Only ever called from an explicit user action (clicking "Use my Blueprint
// results") — never on mount, per the opt-in requirement.

import { STORAGE_KEY } from "../../blueprint/state/useBlueprintState";
import { QUESTIONS } from "../../blueprint/data/questions";
import { computeScores } from "../../blueprint/logic/scoringEngine";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";

const STORAGE_VERSION = 2; // must match useBlueprintState.js's own version

export function readBlueprintSummary() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return null;
    if (parsed.screen !== "results" || !parsed.answers || Object.keys(parsed.answers).length === 0) return null;

    const scores = computeScores(parsed.answers, QUESTIONS);
    const recommendation = buildRecommendation(scores, parsed.answers);

    return {
      archetypeTitle: recommendation.archetype?.title || null,
      readinessLabel: recommendation.readinessLabel?.label || null,
      budgetTier: scores.budgetTier || null,
      topCityNames: (recommendation.topCityMatches || []).map((city) => city.name),
    };
  } catch (error) {
    return null;
  }
}
