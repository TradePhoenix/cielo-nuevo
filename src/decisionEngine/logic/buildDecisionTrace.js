// Decision Engine — Decision Intelligence Matrix (ENG-016).
//
// A read-only, purely additive reasoning layer over the exact same
// computation scoringEngine.js and recommendationEngine.js already
// perform. Nothing here changes any existing score, ranking, match
// reason, readiness score, or archetype — it only re-describes, in a
// uniform { signal, weight, contribution, explanation } shape, why each
// of those numbers is what it is.
//
// buildReadinessTrace()'s output is internal only — nothing renders it
// today. buildCityMatchTrace()'s output IS rendered (My Mexico Plan's
// CityComparisonWorkspace, via buildCityComparison.js's
// strongestPriorities) — so both now accept a `lang` parameter (default
// "en") and resolve their `explanation` text in that language, since
// questions.js's `question`/`label` and copy.js's `TAG_LABELS` became
// `{ en, es }` in the PTM Spanish-parity pass.

import { QUESTIONS, resolveText, normalizeAnswer } from "../../features/blueprint/data/questions";

// One entry per Blueprint question, describing how much of the
// visitor's readiness score came from that specific answer.
// weight = the maximum points that question could have contributed;
// contribution = the points the visitor's actual answer earned. This is
// a read-only recomputation of the same per-option `scores.readiness`
// values scoringEngine.js already sums — it does not call or alter
// scoringEngine.js in any way.
export function buildReadinessTrace(answers, lang = "en") {
  return QUESTIONS.map((question) => {
    const options = question.options || [];
    const weight = options.reduce(
      (max, option) => Math.max(max, (option.scores && option.scores.readiness) || 0),
      0
    );
    // V2: answers may be arrays (multi-select). Readiness contribution
    // mirrors scoringEngine.js exactly — the MAX among selected options,
    // never a sum.
    const selectedOptions = normalizeAnswer(answers && answers[question.id])
      .map((id) => options.find((option) => option.id === id))
      .filter(Boolean);
    const contribution = selectedOptions.reduce(
      (max, option) => Math.max(max, (option.scores && option.scores.readiness) || 0),
      0
    );
    const questionText = resolveText(question.question, lang);
    const selectedLabels = selectedOptions.map((option) => resolveText(option.label, lang)).join(", ");

    return {
      signal: question.id,
      weight,
      contribution,
      explanation: selectedOptions.length > 0
        ? `"${questionText}" -> "${selectedLabels}" contributed ${contribution} of ${weight} possible readiness points.`
        : `"${questionText}" was not answered — contributed 0 of ${weight} possible readiness points.`,
    };
  });
}

// One entry per tag a city shares with the visitor's own tagCounts — the
// exact same overlap rankCityMatches() in recommendationEngine.js already
// sums into matchScore, passed in here rather than recomputed, so the
// trace can never drift from the real score. weight and contribution are
// equal because the current engine gives every overlapping tag the same,
// undifferentiated weight (its raw tagCount) — this trace states that
// plainly rather than inventing a distinct weighting scheme that doesn't
// exist in the current engine.
export function buildCityMatchTrace(overlapTags, tagCounts, tagLabels, cityName, lang = "en") {
  return overlapTags.map((tag) => {
    const label = resolveText(tagLabels[tag], lang) || tag;
    const count = tagCounts[tag] || 0;
    const explanation =
      lang === "es"
        ? `Tus respuestas señalaron "${label}" ${count} vez/veces, coincidiendo con el perfil de ${cityName}.`
        : `Your answers signaled "${label}" ${count} time(s), matching ${cityName}'s profile.`;
    return { signal: tag, weight: count, contribution: count, explanation };
  });
}
