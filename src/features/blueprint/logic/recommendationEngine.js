// My Mexico Blueprint — recommendation engine.
//
// This is the seam where a real AI-generated blueprint can replace this
// deterministic one later. `buildRecommendation(scores, answers)` is a pure
// function with a fixed output shape (readinessScore, readinessLabel,
// archetype, topCityMatches, roadmapSteps, ctaVariant, cta). A future version
// could replace this function's body with a call to a backend/Claude
// endpoint that returns the same shape, and neither scoringEngine.js nor any
// UI component would need to change.

import { CITY_PROFILES } from "../data/cityProfiles";
import {
  ARCHETYPES,
  DEFAULT_ARCHETYPE_ID,
  READINESS_LABELS,
  ROADMAP_TEMPLATES,
  CTA_COPY,
  TAG_LABELS,
} from "../data/copy";

// scores: the object returned by scoringEngine.computeScores()
// answers: { [questionId]: selectedOptionId } — used here only to read
// lifeStage directly, since that's the most reliable archetype signal
export function buildRecommendation(scores, answers) {
  const readinessScore =
    scores.readinessMax > 0
      ? Math.round((scores.readinessRaw / scores.readinessMax) * 100)
      : 0;

  const readinessLabel = getReadinessLabel(readinessScore);
  const archetype = getArchetype(answers && answers.lifeStage);
  const topCityMatches = rankCityMatches(scores.tagCounts || {});
  const isUrgent = Boolean(scores.tagCounts && scores.tagCounts.urgent);
  const ctaVariant = isUrgent ? "urgent" : "exploratory";
  const roadmapSteps = buildRoadmap(ctaVariant);

  return {
    readinessScore,
    readinessLabel,
    archetype,
    topCityMatches,
    roadmapSteps,
    ctaVariant,
    cta: CTA_COPY[ctaVariant],
  };
}

function getReadinessLabel(score) {
  const match = READINESS_LABELS.find((range) => score >= range.min && score <= range.max);
  return match || READINESS_LABELS[READINESS_LABELS.length - 1];
}

function getArchetype(lifeStageAnswerId) {
  return ARCHETYPES[lifeStageAnswerId] || ARCHETYPES[DEFAULT_ARCHETYPE_ID];
}

function rankCityMatches(tagCounts) {
  return CITY_PROFILES.map((city) => {
    const overlapTags = city.tags.filter((tag) => tagCounts[tag]);
    const matchScore = overlapTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);

    return {
      id: city.id,
      name: city.name,
      teaser: city.teaser,
      guideLink: city.guideLink,
      matchScore,
      matchReason: buildMatchReason(overlapTags),
    };
  })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

function buildMatchReason(overlapTags) {
  if (overlapTags.length === 0) {
    return "A well-rounded option worth exploring.";
  }
  const phrases = overlapTags.slice(0, 2).map((tag) => TAG_LABELS[tag] || tag);
  return `Matches your ${phrases.join(" and ")}.`;
}

function buildRoadmap(ctaVariant) {
  const steps = [...ROADMAP_TEMPLATES.base];
  if (ctaVariant === "urgent") {
    steps.unshift(ROADMAP_TEMPLATES.urgentBoost);
  }
  return steps;
}
