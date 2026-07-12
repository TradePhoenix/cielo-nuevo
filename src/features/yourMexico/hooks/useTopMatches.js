// Your Mexico — derives the visitor's matched cities from the Blueprint's
// already-saved answers (read-only). If no Blueprint has been completed
// yet, returns an empty result rather than throwing or guessing, so the
// page can show a graceful "take the Blueprint first" fallback.

import { useMemo } from "react";
import { useBlueprintAnswers } from "../../../decisionEngine/hooks/useBlueprintAnswers";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";
import { getMatchesWithDetails } from "../logic/cityLookup";

const EMPTY_RESULT = { hasCompletedBlueprint: false, recommendation: null, matches: [], tagCounts: {} };

export function useTopMatches() {
  const { hasCompletedBlueprint, answers, scores } = useBlueprintAnswers();

  return useMemo(() => {
    if (!hasCompletedBlueprint) return EMPTY_RESULT;

    const recommendation = buildRecommendation(scores, answers);

    return {
      hasCompletedBlueprint: true,
      recommendation,
      matches: getMatchesWithDetails(recommendation.topCityMatches),
      tagCounts: scores.tagCounts || {},
    };
  }, [hasCompletedBlueprint, answers, scores]);
}
