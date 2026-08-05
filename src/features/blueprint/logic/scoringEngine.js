// My Mexico Blueprint — scoring engine.
//
// Pure function, no side effects: given the visitor's answers and the
// question schema, produce raw numeric/tag scores. Nothing here touches
// localStorage, React state, or rendering — that separation is what makes
// this function easy to unit-test and safe to reuse if the recommendation
// step is ever swapped for a real backend/AI call later.
//
// V2: answers may now be a single option id (single-select) OR an array of
// option ids (multi-select) — both shapes are normalized here, so every
// caller (including older saved sessions whose answers are all strings)
// keeps working unchanged.
//
// Readiness for a multi-select question is the MAX readiness among the
// selected options — never the sum — so selecting more answers can never
// inflate a readiness score. (In the current schema every multi-select
// option carries readiness 0 anyway; this rule keeps the engine honest if
// that ever changes.) readinessMax per question remains the single highest
// option value, exactly as before.

import { normalizeAnswer } from "../data/questions";

// answers: { [questionId]: optionId | optionId[] }
// questions: the QUESTIONS array from data/questions.js (passed in, not
// imported, so this function has no hidden dependency on where the schema lives)
export function computeScores(answers, questions) {
  let readinessRaw = 0;
  let readinessMax = 0;
  const tagCounts = {};
  let budgetTier = null;

  questions.forEach((question) => {
    const options = question.options || [];

    const maxForQuestion = options.reduce((max, option) => {
      const points = (option.scores && option.scores.readiness) || 0;
      return Math.max(max, points);
    }, 0);
    readinessMax += maxForQuestion;

    const selectedIds = normalizeAnswer(answers && answers[question.id]);
    if (selectedIds.length === 0) return;

    const selectedOptions = selectedIds
      .map((id) => options.find((option) => option.id === id))
      .filter(Boolean);
    if (selectedOptions.length === 0) return;

    readinessRaw += selectedOptions.reduce(
      (max, option) => Math.max(max, (option.scores && option.scores.readiness) || 0),
      0
    );

    selectedOptions.forEach((option) => {
      (option.tags || []).forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      if (option.budgetTier) {
        budgetTier = option.budgetTier;
      }
    });
  });

  return { readinessRaw, readinessMax, tagCounts, budgetTier };
}
