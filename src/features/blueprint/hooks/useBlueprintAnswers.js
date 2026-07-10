// My Mexico Blueprint — the single, read-only source of truth for "has this
// visitor completed a Blueprint, and what did they answer/score." Extracted
// so every downstream feature (Your Mexico, My Mexico Plan) reads Blueprint
// state the same way instead of each re-implementing the same localStorage
// read + scoring call.

import { useMemo } from "react";
import { QUESTIONS } from "../data/questions";
import { computeScores } from "../logic/scoringEngine";
import { STORAGE_KEY } from "../state/useBlueprintState";

const EMPTY = { hasCompletedBlueprint: false, answers: {}, scores: null };

export function useBlueprintAnswers() {
  return useMemo(() => {
    if (typeof window === "undefined") return EMPTY;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return EMPTY;

      const parsed = JSON.parse(raw);
      const answers = parsed.answers || {};
      if (Object.keys(answers).length === 0 || parsed.screen !== "results") {
        return EMPTY;
      }

      return {
        hasCompletedBlueprint: true,
        answers,
        scores: computeScores(answers, QUESTIONS),
      };
    } catch (error) {
      return EMPTY;
    }
  }, []);
}
