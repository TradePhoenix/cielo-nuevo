// Decision Engine — Decision Intelligence Matrix (ENG-016).
//
// A read-only, purely additive reasoning layer over the exact same
// computation scoringEngine.js and recommendationEngine.js already
// perform. Nothing here changes any existing score, ranking, match
// reason, readiness score, or archetype — it only re-describes, in a
// uniform { signal, weight, contribution, explanation } shape, why each
// of those numbers is what it is.
//
// Internal only: nothing here is rendered anywhere today. It exists so
// a future "Why this city?" UI can read this trace directly instead of
// re-deriving reasoning from scratch, and so today's outputs can be
// audited signal-by-signal without changing behavior.

import { QUESTIONS } from "../../features/blueprint/data/questions";

// One entry per Blueprint question, describing how much of the
// visitor's readiness score came from that specific answer.
// weight = the maximum points that question could have contributed;
// contribution = the points the visitor's actual answer earned. This is
// a read-only recomputation of the same per-option `scores.readiness`
// values scoringEngine.js already sums — it does not call or alter
// scoringEngine.js in any way.
export function buildReadinessTrace(answers) {
  return QUESTIONS.map((question) => {
    const options = question.options || [];
    const weight = options.reduce(
      (max, option) => Math.max(max, (option.scores && option.scores.readiness) || 0),
      0
    );
    const selectedOption = options.find((option) => option.id === (answers && answers[question.id]));
    const contribution = selectedOption ? (selectedOption.scores && selectedOption.scores.readiness) || 0 : 0;

    return {
      signal: question.id,
      weight,
      contribution,
      explanation: selectedOption
        ? `"${question.question}" -> "${selectedOption.label}" contributed ${contribution} of ${weight} possible readiness points.`
        : `"${question.question}" was not answered — contributed 0 of ${weight} possible readiness points.`,
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
export function buildCityMatchTrace(overlapTags, tagCounts, tagLabels, cityName) {
  return overlapTags.map((tag) => ({
    signal: tag,
    weight: tagCounts[tag] || 0,
    contribution: tagCounts[tag] || 0,
    explanation: `Your answers signaled "${tagLabels[tag] || tag}" ${tagCounts[tag] || 0} time(s), matching ${cityName}'s profile.`,
  }));
}
