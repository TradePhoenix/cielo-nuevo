// My Mexico Blueprint — scoring engine.
//
// Pure function, no side effects: given the visitor's answers and the
// question schema, produce raw numeric/tag scores. Nothing here touches
// localStorage, React state, or rendering — that separation is what makes
// this function easy to unit-test and safe to reuse if the recommendation
// step is ever swapped for a real backend/AI call later.

// answers: { [questionId]: selectedOptionId }
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

    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;

    const selectedOption = options.find((option) => option.id === selectedOptionId);
    if (!selectedOption) return;

    readinessRaw += (selectedOption.scores && selectedOption.scores.readiness) || 0;

    (selectedOption.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    if (selectedOption.budgetTier) {
      budgetTier = selectedOption.budgetTier;
    }
  });

  return { readinessRaw, readinessMax, tagCounts, budgetTier };
}
