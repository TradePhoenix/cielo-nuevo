// Client Dashboard — composes the Blueprint's answers, Your Mexico's
// matches, My Mexico Plan's saved progress, and the Document Vault's saved
// documents (all read-only) into one summary, and owns the dashboard's own
// remaining local state: notes. Persistence mirrors the same
// versioned-localStorage pattern used everywhere else in the product.

import { useState, useEffect, useCallback, useMemo } from "react";
import { useBlueprintAnswers } from "../../../decisionEngine/hooks/useBlueprintAnswers";
import { useTopMatches } from "../../yourMexico/hooks/useTopMatches";
import { getCityById } from "../../yourMexico/logic/cityLookup";
import { buildPlan, getCurrentChapterIndex } from "../../myMexicoPlan/logic/buildPlan";
import { STORAGE_KEY as PLAN_STORAGE_KEY } from "../../myMexicoPlan/state/usePlanState";
import { STORAGE_KEY as VAULT_STORAGE_KEY } from "../../documentVault/state/useDocumentVaultState";
import { computeVaultSummary } from "../../documentVault/logic/documentFilters";
import { buildDashboardSummary } from "../logic/buildDashboardSummary";

const DASHBOARD_STORAGE_KEY = "pathToMexico.dashboard.v1";
const DASHBOARD_STORAGE_VERSION = 1;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function readSavedPlan() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.cityId || !parsed.anchorDate) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function readSavedDocuments() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.documents || [];
  } catch (error) {
    return [];
  }
}

function loadDashboardState() {
  const defaults = { notes: [] };
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    if (parsed.version !== DASHBOARD_STORAGE_VERSION) return defaults;
    return { notes: parsed.notes || [] };
  } catch (error) {
    return defaults;
  }
}

export function useDashboardState() {
  const { hasCompletedBlueprint, answers, scores } = useBlueprintAnswers();
  const { matches, recommendation } = useTopMatches();

  const [{ notes }, setLocalState] = useState(loadDashboardState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify({ version: DASHBOARD_STORAGE_VERSION, notes }));
  }, [notes]);

  const savedPlan = useMemo(() => readSavedPlan(), []);
  const savedDocuments = useMemo(() => readSavedDocuments(), []);
  const documentVaultSummary = useMemo(() => computeVaultSummary(savedDocuments), [savedDocuments]);

  // The full city record (budget, lifestyle, neighborhoods) — buildPlan's
  // own output only carries what task-selection needed (id/name/tags), so
  // modules like Budget Tracker read the full record directly instead.
  const planCity = useMemo(() => (savedPlan ? getCityById(savedPlan.cityId) : null), [savedPlan]);

  const plan = useMemo(() => {
    if (!savedPlan || !planCity) return null;
    return buildPlan(answers, scores, planCity);
  }, [savedPlan, planCity, answers, scores]);

  const daysSinceAnchor = savedPlan
    ? Math.floor((Date.now() - new Date(savedPlan.anchorDate).getTime()) / MS_PER_DAY)
    : 0;
  const currentChapterIndex = plan ? getCurrentChapterIndex(plan.chapters, daysSinceAnchor) : 0;

  const summary = useMemo(() => {
    if (!hasCompletedBlueprint) return null;
    return buildDashboardSummary({
      recommendation,
      matches,
      plan,
      currentChapterIndex,
      planTaskState: savedPlan ? savedPlan.taskState || {} : {},
    });
  }, [hasCompletedBlueprint, recommendation, matches, plan, currentChapterIndex, savedPlan]);

  const addNote = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setLocalState((prev) => ({
      ...prev,
      notes: [{ id: `note-${Date.now()}`, text: trimmed, createdAt: new Date().toISOString() }, ...prev.notes],
    }));
  }, []);

  const deleteNote = useCallback((noteId) => {
    setLocalState((prev) => ({ ...prev, notes: prev.notes.filter((note) => note.id !== noteId) }));
  }, []);

  return {
    hasCompletedBlueprint,
    matches,
    plan,
    planCity,
    currentChapterIndex,
    summary,
    documentVaultSummary,
    notes,
    addNote,
    deleteNote,
  };
}
