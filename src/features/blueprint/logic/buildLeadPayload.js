// Blueprint lead capture — builds the qualification payload submitted with
// a lead. Pure function (plain data in, plain data out, no side effects),
// matching the feature's logic/ layer rules, and router-free so it stays
// directly testable in this project's Jest environment.
//
// Field values are strings because they travel as hidden form inputs
// through the existing Formspree pathway. The answer summary resolves
// English option labels regardless of the visitor's UI language so every
// lead reads consistently in the same inbox; the visitor's language is
// captured separately alongside this payload.
import { QUESTIONS, getVisibleQuestions, normalizeAnswer, resolveText } from "../data/questions";

export function buildLeadPayload(answers, recommendation) {
  const safeAnswers = answers && typeof answers === "object" && !Array.isArray(answers) ? answers : {};

  const summaryLines = getVisibleQuestions(QUESTIONS, safeAnswers)
    .map((question) => {
      const selectedIds = normalizeAnswer(safeAnswers[question.id]);
      if (selectedIds.length === 0) return null;
      const labels = selectedIds.map((optionId) => {
        const option = question.options.find((candidate) => candidate.id === optionId);
        return option ? resolveText(option.label, "en") : optionId;
      });
      return `${question.id}: ${labels.join(" | ")}`;
    })
    .filter(Boolean);

  const topCityMatches = (recommendation && recommendation.topCityMatches) || [];

  return {
    answersSummary: summaryLines.join("\n"),
    answersRaw: JSON.stringify(safeAnswers),
    topDestinations: topCityMatches.map((city) => city.name).join(", "),
    readinessScore:
      recommendation && typeof recommendation.readinessScore === "number"
        ? String(recommendation.readinessScore)
        : "",
    archetype:
      (recommendation && recommendation.archetype && recommendation.archetype.title) || "",
  };
}
