// My Mexico Blueprint — questionnaire state + localStorage persistence.
//
// Owns the wizard's step machine (intro -> question -> loading ->
// leadCapture -> results) and the visitor's answers. Every change is
// written to localStorage so a reload resumes exactly where the visitor
// left off. The one network interaction in the flow is the lead-capture
// submission itself (LeadCaptureCard -> Formspree); everything else stays
// in the browser.
//
// V2: the questionnaire now contains multi-select questions and conditional
// follow-ups (see data/questions.js). This hook derives the *visible*
// question list from the current answers, navigates over that list, and
// prunes any saved answer whose question is no longer visible — so changing
// "family with kids" back to "just me" also forgets the schooling answer
// rather than letting it silently keep influencing the result.

import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { QUESTIONS, getVisibleQuestions, normalizeAnswer } from "../data/questions";
import { computeScores } from "../logic/scoringEngine";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";

// Exported so other features (e.g. Your Mexico) can read the same saved
// answers read-only, without duplicating this literal or its shape.
export const STORAGE_KEY = "pathToMexico.blueprint.v1";
// Bumped from 2 -> 3 for Blueprint V2: answers may now be arrays
// (multi-select) and the question roster changed shape. Old saved sessions
// are discarded rather than migrated — the established policy for this key.
const STORAGE_VERSION = 3;

// Lead capture (CONV/P0-1): an anonymous, client-side-only id that ties a
// submitted lead back to this browser session's Blueprint. Not a user id,
// not tracking — it exists so a lead in the inbox can be matched to a
// retake/duplicate from the same device.
function makeSessionId() {
  return `bp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadInitialState() {
  const defaults = {
    screen: "intro",
    questionIndex: 0,
    answers: {},
    sessionId: makeSessionId(),
    leadCaptured: false,
  };

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
      answers:
        parsed.answers && typeof parsed.answers === "object" && !Array.isArray(parsed.answers)
          ? parsed.answers
          : {},
      // Additive fields (no STORAGE_VERSION bump): older version-3 saves
      // simply lack them, so they fall back without discarding the session.
      sessionId: typeof parsed.sessionId === "string" && parsed.sessionId ? parsed.sessionId : makeSessionId(),
      leadCaptured: parsed.leadCaptured === true,
    };
  } catch (error) {
    return defaults;
  }
}

// Removes answers belonging to questions that are not visible under the
// given answer set. Runs to a fixed point so a chain (A reveals B, B reveals
// C) collapses fully when A changes. Returns the same object reference when
// nothing needed pruning, so callers can cheaply detect "no change".
export function pruneHiddenAnswers(answers) {
  let current = answers;
  for (let pass = 0; pass < QUESTIONS.length; pass += 1) {
    const visibleIds = new Set(getVisibleQuestions(QUESTIONS, current).map((q) => q.id));
    const staleIds = Object.keys(current).filter((id) => !visibleIds.has(id));
    if (staleIds.length === 0) return current;
    const next = { ...current };
    staleIds.forEach((id) => delete next[id]);
    current = next;
  }
  return current;
}

export function useBlueprintState(lang = "en") {
  const [{ screen, questionIndex, answers, sessionId, leadCaptured }, setState] = useState(loadInitialState);

  // CX-005 — Blueprint Discovery Experience: true only when this mount
  // loaded straight into "results" from a previous session (a refresh or
  // a return visit) rather than arriving there live in this session.
  // completeLoading() flips it back to false the moment a real, live
  // loading->results transition happens. See BlueprintApp.js / CinematicReveal.js.
  const skipResultsRevealRef = useRef(screen === "results");

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, screen, questionIndex, answers, sessionId, leadCaptured })
    );
  }, [screen, questionIndex, answers, sessionId, leadCaptured]);

  // The questions this visitor actually sees, given their answers so far.
  // Conditional follow-ups appear in place (directly after their trigger,
  // by schema order) the moment their trigger answer is selected.
  const visibleQuestions = useMemo(() => getVisibleQuestions(QUESTIONS, answers), [answers]);
  const totalQuestions = visibleQuestions.length;

  const startQuestionnaire = useCallback(() => {
    trackEvent(ANALYTICS_EVENTS.BLUEPRINT_STARTED, { version: "v2" });
    setState((prev) => ({ ...prev, screen: "question", questionIndex: 0 }));
  }, []);

  // Single-select: stores the option id. Multi-select: toggles the option
  // in/out of the stored array, respecting maxSelections (extra taps beyond
  // the cap are ignored — QuestionCard surfaces the cap in the helper text).
  // Either way, answers that belong to now-hidden conditionals are pruned,
  // and the current index is re-anchored to the same question afterward so
  // the visitor never sees the screen jump.
  const selectAnswer = useCallback((questionId, optionId) => {
    setState((prev) => {
      const question = QUESTIONS.find((q) => q.id === questionId);
      if (!question) return prev;

      let nextValue;
      if (question.type === "multi-select") {
        const current = normalizeAnswer(prev.answers[questionId]);
        if (current.includes(optionId)) {
          nextValue = current.filter((id) => id !== optionId);
        } else if (question.maxSelections && current.length >= question.maxSelections) {
          return prev;
        } else {
          nextValue = [...current, optionId];
        }
      } else {
        nextValue = optionId;
      }

      const updated = { ...prev.answers, [questionId]: nextValue };
      const pruned = pruneHiddenAnswers(updated);

      // Keep the visitor anchored on the question they just answered even
      // if the visible list grew/shrank before it.
      const nextVisible = getVisibleQuestions(QUESTIONS, pruned);
      const anchoredIndex = nextVisible.findIndex((q) => q.id === questionId);

      return {
        ...prev,
        answers: pruned,
        questionIndex: anchoredIndex >= 0 ? anchoredIndex : Math.min(prev.questionIndex, nextVisible.length - 1),
      };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      if (prev.screen === "intro") {
        return { ...prev, screen: "question", questionIndex: 0 };
      }
      if (prev.screen === "question") {
        const visibleNow = getVisibleQuestions(QUESTIONS, prev.answers);
        if (prev.questionIndex < visibleNow.length - 1) {
          return { ...prev, questionIndex: prev.questionIndex + 1 };
        }
        return { ...prev, screen: "loading" };
      }
      return prev;
    });
  }, []);

  const goPrevious = useCallback(() => {
    setState((prev) => {
      if (prev.screen === "question") {
        if (prev.questionIndex > 0) {
          return { ...prev, questionIndex: prev.questionIndex - 1 };
        }
        return { ...prev, screen: "intro" };
      }
      if (prev.screen === "results" || prev.screen === "loading" || prev.screen === "leadCapture") {
        const visibleNow = getVisibleQuestions(QUESTIONS, prev.answers);
        return { ...prev, screen: "question", questionIndex: visibleNow.length - 1 };
      }
      return prev;
    });
  }, []);

  // BlueprintLoading calls this once its staged sequence finishes. Lead
  // capture (CONV/P0-1) sits between loading and results: a visitor who has
  // not yet left their contact details sees the capture step first; one who
  // already submitted (this session or a previous one on this device) goes
  // straight to results and is never re-asked.
  const completeLoading = useCallback(() => {
    skipResultsRevealRef.current = false;
    setState((prev) => {
      if (prev.screen !== "loading") return prev;
      // Completed = every visible question answered and results computed.
      // Payload is a count only — never the answers themselves.
      trackEvent(ANALYTICS_EVENTS.BLUEPRINT_COMPLETED, {
        version: "v2",
        questionsAnswered: getVisibleQuestions(QUESTIONS, prev.answers).length,
      });
      return { ...prev, screen: prev.leadCaptured ? "results" : "leadCapture" };
    });
  }, []);

  // LeadCaptureCard calls this only after Formspree confirms the submission
  // succeeded — it is the only transition that sets leadCaptured, so a
  // failed submission can never silently count as a captured lead.
  const completeLeadCapture = useCallback(() => {
    setState((prev) =>
      prev.screen === "leadCapture" ? { ...prev, screen: "results", leadCaptured: true } : prev
    );
  }, []);

  // Graceful degradation (launch fix #1): LeadCaptureCard offers this only
  // AFTER a real submission failure, so a Formspree/network outage can't
  // hold the visitor's completed Blueprint hostage. leadCaptured stays
  // false — the results screen shows a persistent retry banner, and any
  // future loading -> results transition re-asks for capture.
  const continueAfterCaptureFailure = useCallback(() => {
    setState((prev) => (prev.screen === "leadCapture" ? { ...prev, screen: "results" } : prev));
  }, []);

  // The results banner's retry path back to the capture card. Only
  // meaningful while the lead is still uncaptured; answers and results are
  // untouched either way.
  const retryLeadCapture = useCallback(() => {
    setState((prev) =>
      prev.screen === "results" && !prev.leadCaptured ? { ...prev, screen: "leadCapture" } : prev
    );
  }, []);

  const restart = useCallback(() => {
    // A retake keeps leadCaptured (the person is already a captured lead —
    // asking again would feel broken) and starts a fresh sessionId so a
    // second submission from a future flow would be distinguishable.
    setState((prev) => ({
      screen: "intro",
      questionIndex: 0,
      answers: {},
      sessionId: makeSessionId(),
      leadCaptured: prev.leadCaptured,
    }));
  }, []);

  const boundedIndex = Math.min(questionIndex, Math.max(totalQuestions - 1, 0));
  const currentQuestion = screen === "question" ? visibleQuestions[boundedIndex] : null;
  const isCurrentAnswered = currentQuestion
    ? normalizeAnswer(answers[currentQuestion.id]).length > 0
    : false;

  // Derived from `answers` (already persisted) rather than stored separately,
  // so it always reflects the current scoring/recommendation logic and never
  // goes stale relative to it. This is also the seam a real AI call would
  // replace later — same inputs, same output shape, different implementation.
  const recommendation = useMemo(
    () => buildRecommendation(computeScores(answers, QUESTIONS), answers, lang),
    [answers, lang]
  );

  return {
    screen,
    questionIndex: boundedIndex,
    answers,
    sessionId,
    leadCaptured,
    totalQuestions,
    currentQuestion,
    isCurrentAnswered,
    recommendation,
    startQuestionnaire,
    selectAnswer,
    goNext,
    goPrevious,
    completeLoading,
    completeLeadCapture,
    continueAfterCaptureFailure,
    retryLeadCapture,
    restart,
    skipResultsReveal: skipResultsRevealRef.current,
  };
}
