// My Mexico Plan — owns the plan's own local state (anchor date, task
// completion, timeline reshuffles, "does this still feel right" responses)
// and combines it with the Blueprint's read-only answers to build the
// plan itself. Persistence mirrors Blueprint's own useBlueprintState.js
// pattern exactly: a single versioned localStorage key, discarded rather
// than migrated if the shape ever changes.

import { useState, useEffect, useCallback, useMemo } from "react";
import { useBlueprintAnswers } from "../../../decisionEngine/hooks/useBlueprintAnswers";
import { getCityById } from "../../yourMexico/logic/cityLookup";
import { buildPlan, getCurrentChapterIndex } from "../logic/buildPlan";
import { ANCHOR_PHRASES, DEFAULT_ANCHOR_PHRASE } from "../data/anchorPhrases";

// Exported so other features (e.g. the Client Dashboard) can read the same
// saved plan read-only, without duplicating this literal or its shape.
export const STORAGE_KEY = "pathToMexico.myMexicoPlan.v1";
const STORAGE_VERSION = 1;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function loadInitialState(cityId) {
  const defaults = { cityId, anchorDate: null, taskState: {}, timelineShifts: [], checkInResponses: {} };

  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION || parsed.cityId !== cityId) return defaults;

    return {
      cityId: parsed.cityId,
      anchorDate: parsed.anchorDate || null,
      taskState: parsed.taskState || {},
      timelineShifts: parsed.timelineShifts || [],
      checkInResponses: parsed.checkInResponses || {},
    };
  } catch (error) {
    return defaults;
  }
}

export function usePlanState(cityId) {
  const { hasCompletedBlueprint, answers, scores } = useBlueprintAnswers();
  const city = useMemo(() => getCityById(cityId), [cityId]);

  const [{ anchorDate, taskState, timelineShifts, checkInResponses }, setState] = useState(() =>
    loadInitialState(cityId)
  );

  // First visit to this specific city's plan: set the anchor date now.
  useEffect(() => {
    if (!anchorDate) {
      setState((prev) => ({ ...prev, anchorDate: new Date().toISOString() }));
    }
  }, [anchorDate]);

  useEffect(() => {
    if (typeof window === "undefined" || !anchorDate) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, cityId, anchorDate, taskState, timelineShifts, checkInResponses })
    );
  }, [cityId, anchorDate, taskState, timelineShifts, checkInResponses]);

  const plan = useMemo(() => {
    if (!hasCompletedBlueprint || !city) return null;
    return buildPlan(answers, scores, city);
  }, [hasCompletedBlueprint, answers, scores, city]);

  const daysSinceAnchor = anchorDate ? Math.floor((Date.now() - new Date(anchorDate).getTime()) / MS_PER_DAY) : 0;

  const currentChapterIndex = plan ? getCurrentChapterIndex(plan.chapters, daysSinceAnchor) : 0;

  const anchorPhrase = ANCHOR_PHRASES[answers.lifeStage] || DEFAULT_ANCHOR_PHRASE;

  const toggleTask = useCallback((taskId) => {
    setState((prev) => ({
      ...prev,
      taskState: { ...prev.taskState, [taskId]: !prev.taskState[taskId] },
    }));
  }, []);

  // "Life happened" — resets the clock to today rather than pretending
  // nothing changed. The shift is logged, visibly, rather than hidden.
  const reshuffleTimeline = useCallback(() => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      anchorDate: now,
      timelineShifts: [...prev.timelineShifts, now],
    }));
  }, []);

  const respondToCheckIn = useCallback((chapterId, response) => {
    setState((prev) => ({
      ...prev,
      checkInResponses: { ...prev.checkInResponses, [chapterId]: response },
    }));
  }, []);

  return {
    hasCompletedBlueprint,
    city,
    plan,
    taskState,
    toggleTask,
    daysSinceAnchor,
    currentChapterIndex,
    anchorPhrase,
    timelineShifts,
    reshuffleTimeline,
    checkInResponses,
    respondToCheckIn,
  };
}
