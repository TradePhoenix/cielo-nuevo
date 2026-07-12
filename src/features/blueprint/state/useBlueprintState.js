// My Mexico Blueprint — questionnaire state + localStorage persistence.
//
// Owns the wizard's step machine (intro -> question -> done) and the
// visitor's answers. Every change is written to localStorage so a reload
// resumes exactly where the visitor left off. No backend, no auth — the
// entire session lives in the browser.

import { useState, useEffect, useCallback, useMemo } from "react";
import { QUESTIONS } from "../data/questions";
import { computeScores } from "../logic/scoringEngine";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";

// Exported so other features (e.g. Your Mexico) can read the same saved
// answers read-only, without duplicating this literal or its shape.
export const STORAGE_KEY = "pathToMexico.blueprint.v1";
// Bumped from 1 -> 2: Phase 2's "done" screen no longer exists (replaced by
// "loading" / "results"), so any saved state from that shape is discarded
// rather than risk landing on a screen this version can't render.
const STORAGE_VERSION = 2;

function loadInitialState() {
  const defaults = { screen: "intro", questionIndex: 0, answers: {} };

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return defaults;

    return {
      screen: parsed.screen || defaults.screen,
      questionIndex: typeof parsed.questionIndex === "number" ? parsed.questionIndex : 0,
      answers: parsed.answers || {},
    };
  } catch (error) {
    return defaults;
  }
}

export function useBlueprintState() {
  const totalQuestions = QUESTIONS.length;
  const [{ screen, questionIndex, answers }, setState] = useState(loadInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, screen, questionIndex, answers })
    );
  }, [screen, questionIndex, answers]);

  const startQuestionnaire = useCallback(() => {
    setState((prev) => ({ ...prev, screen: "question", questionIndex: 0 }));
  }, []);

  const selectAnswer = useCallback((questionId, optionId) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionId },
    }));
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      if (prev.screen === "intro") {
        return { ...prev, screen: "question", questionIndex: 0 };
      }
      if (prev.screen === "question") {
        if (prev.questionIndex < totalQuestions - 1) {
          return { ...prev, questionIndex: prev.questionIndex + 1 };
        }
        return { ...prev, screen: "loading" };
      }
      return prev;
    });
  }, [totalQuestions]);

  const goPrevious = useCallback(() => {
    setState((prev) => {
      if (prev.screen === "question") {
        if (prev.questionIndex > 0) {
          return { ...prev, questionIndex: prev.questionIndex - 1 };
        }
        return { ...prev, screen: "intro" };
      }
      if (prev.screen === "results" || prev.screen === "loading") {
        return { ...prev, screen: "question", questionIndex: totalQuestions - 1 };
      }
      return prev;
    });
  }, [totalQuestions]);

  // BlueprintLoading calls this once its staged sequence finishes — this is
  // the only way "loading" transitions to "results".
  const completeLoading = useCallback(() => {
    setState((prev) => (prev.screen === "loading" ? { ...prev, screen: "results" } : prev));
  }, []);

  const restart = useCallback(() => {
    setState({ screen: "intro", questionIndex: 0, answers: {} });
  }, []);

  const currentQuestion = screen === "question" ? QUESTIONS[questionIndex] : null;
  const isCurrentAnswered = currentQuestion ? Boolean(answers[currentQuestion.id]) : false;

  // Derived from `answers` (already persisted) rather than stored separately,
  // so it always reflects the current scoring/recommendation logic and never
  // goes stale relative to it. This is also the seam a real AI call would
  // replace later — same inputs, same output shape, different implementation.
  const recommendation = useMemo(
    () => buildRecommendation(computeScores(answers, QUESTIONS), answers),
    [answers]
  );

  return {
    screen,
    questionIndex,
    answers,
    totalQuestions,
    currentQuestion,
    isCurrentAnswered,
    recommendation,
    startQuestionnaire,
    selectAnswer,
    goNext,
    goPrevious,
    completeLoading,
    restart,
  };
}
