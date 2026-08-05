// My Mexico Blueprint — recommendation engine.
//
// This is the seam where a real AI-generated blueprint can replace this
// deterministic one later. `buildRecommendation(scores, answers, lang)` is a
// pure function with a fixed output shape (readinessScore, readinessLabel,
// archetype, topCityMatches, roadmapSteps, ctaVariant, cta). A future version
// could replace this function's body with a call to a backend/Claude
// endpoint that returns the same shape, and neither scoringEngine.js nor any
// UI component would need to change.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en", so
// every existing caller that doesn't pass it — and every existing test —
// keeps getting exactly the same English strings as before). `copy.js`'s
// data fields are now `{ en, es }`; this file is the one place that
// resolves them down to plain strings, so the return shape UI components
// already read (`archetype.title`, `readinessLabel.label`, etc.) never
// changes — only the string values do.

import { CITY_PROFILES } from "../data/cityProfiles";
import {
  ARCHETYPES,
  DEFAULT_ARCHETYPE_ID,
  READINESS_LABELS,
  ROADMAP_TEMPLATES,
  CTA_COPY,
  TAG_LABELS,
  MATCH_REASON_TEMPLATES,
  CONCERN_RESPONSES,
} from "../../features/blueprint/data/copy";
import { QUESTIONS, resolveText, normalizeAnswer } from "../../features/blueprint/data/questions";
import { buildReadinessTrace, buildCityMatchTrace } from "./buildDecisionTrace";

function resolve(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

function resolveArchetype(archetype, lang) {
  return { id: archetype.id, title: resolve(archetype.title, lang), description: resolve(archetype.description, lang) };
}

function resolveReadinessLabel(range, lang) {
  return { min: range.min, max: range.max, label: resolve(range.label, lang), blurb: resolve(range.blurb, lang) };
}

function resolveRoadmapStep(step, lang) {
  return { id: step.id, title: resolve(step.title, lang), description: resolve(step.description, lang) };
}

function resolveCta(cta, lang) {
  return { headline: resolve(cta.headline, lang), subtext: resolve(cta.subtext, lang), buttonLabel: resolve(cta.buttonLabel, lang) };
}

// scores: the object returned by scoringEngine.computeScores()
// answers: { [questionId]: selectedOptionId } — used here only to read
// lifeStage directly, since that's the most reliable archetype signal
export function buildRecommendation(scores, answers, lang = "en") {
  const readinessScore =
    scores.readinessMax > 0
      ? Math.round((scores.readinessRaw / scores.readinessMax) * 100)
      : 0;

  const readinessLabel = getReadinessLabel(readinessScore, lang);
  const archetype = getArchetype(answers && answers.lifeStage, lang);
  const topCityMatches = rankCityMatches(scores.tagCounts || {}, lang);
  const isUrgent = Boolean(scores.tagCounts && scores.tagCounts.urgent);
  const ctaVariant = isUrgent ? "urgent" : "exploratory";
  const roadmapSteps = buildRoadmap(ctaVariant, lang);

  return {
    readinessScore,
    readinessLabel,
    archetype,
    topCityMatches,
    roadmapSteps,
    ctaVariant,
    cta: resolveCta(CTA_COPY[ctaVariant], lang),
    // Blueprint V2 — two additive result-intelligence fields. Both are
    // derived entirely from the visitor's own answers plus fixed copy, so
    // the result stays explainable: nothing is generated, only selected.
    focusAreas: buildFocusAreas(answers, lang),
    profileHighlights: buildProfileHighlights(answers, lang),
    // ENG-016 — Decision Intelligence Matrix: a purely additive reasoning
    // trace (see buildDecisionTrace.js). Internal only, not rendered
    // anywhere today; every field above this comment is computed exactly
    // as before and unaffected by its presence.
    readinessTrace: buildReadinessTrace(answers, lang),
  };
}

// Blueprint V2 — the results screen's direct reply to what the visitor said
// they were most uncertain about (the `concerns` question). One fixed,
// honest response per selected concern, in selection order.
function buildFocusAreas(answers, lang) {
  return normalizeAnswer(answers && answers.concerns)
    .map((id) => CONCERN_RESPONSES[id])
    .filter(Boolean)
    .map((entry, index) => ({
      id: normalizeAnswer(answers.concerns)[index],
      title: resolve(entry.title, lang),
      body: resolve(entry.body, lang),
    }));
}

// Blueprint V2 — a compact "what you told us" reflection, built by resolving
// the visitor's selected option labels straight from the question schema.
// Display copy lives only in questions.js, so EN/ES can never drift apart
// from what the visitor actually tapped.
const HIGHLIGHT_QUESTION_IDS = ["motivation", "placeCharacter", "priorities", "budget", "housing", "practicalNeeds"];

function buildProfileHighlights(answers, lang) {
  return HIGHLIGHT_QUESTION_IDS.map((questionId) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) return null;
    const selected = normalizeAnswer(answers && answers[questionId])
      .map((id) => (question.options || []).find((option) => option.id === id))
      .filter(Boolean)
      .map((option) => resolveText(option.label, lang));
    if (selected.length === 0) return null;
    return {
      id: questionId,
      label: resolveText(question.question, lang),
      values: selected,
    };
  }).filter(Boolean);
}

function getReadinessLabel(score, lang) {
  const match = READINESS_LABELS.find((range) => score >= range.min && score <= range.max);
  return resolveReadinessLabel(match || READINESS_LABELS[READINESS_LABELS.length - 1], lang);
}

function getArchetype(lifeStageAnswerId, lang) {
  return resolveArchetype(ARCHETYPES[lifeStageAnswerId] || ARCHETYPES[DEFAULT_ARCHETYPE_ID], lang);
}

function rankCityMatches(tagCounts, lang) {
  return CITY_PROFILES.map((city) => {
    const overlapTags = city.tags.filter((tag) => tagCounts[tag]);
    const matchScore = overlapTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);

    return {
      id: city.id,
      name: city.name,
      teaser: resolve(city.teaser, lang),
      guideLink: city.guideLink,
      matchScore,
      matchReason: buildMatchReason(overlapTags, lang),
      // ENG-016 — Decision Intelligence Matrix: see buildDecisionTrace.js.
      // Built from the same overlapTags/tagCounts already used for
      // matchScore above, so it can never drift from the real score.
      decisionTrace: buildCityMatchTrace(overlapTags, tagCounts, TAG_LABELS, city.name, lang),
    };
  })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

function buildMatchReason(overlapTags, lang) {
  if (overlapTags.length === 0) {
    return resolve(MATCH_REASON_TEMPLATES.default, lang);
  }
  const phrases = overlapTags.slice(0, 2).map((tag) => resolve(TAG_LABELS[tag], lang) || tag);
  const template = MATCH_REASON_TEMPLATES.withTags[lang] || MATCH_REASON_TEMPLATES.withTags.en;
  return template(phrases);
}

function buildRoadmap(ctaVariant, lang) {
  const steps = [...ROADMAP_TEMPLATES.base];
  if (ctaVariant === "urgent") {
    steps.unshift(ROADMAP_TEMPLATES.urgentBoost);
  }
  return steps.map((step) => resolveRoadmapStep(step, lang));
}
