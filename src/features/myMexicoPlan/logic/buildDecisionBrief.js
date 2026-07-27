// My Mexico Plan — Your Decision Brief. Same discipline as
// dashboard/logic/buildDashboardSummary.js: a pure function, fixed input,
// fixed output shape, no side effects, no AI. This computes nothing that
// doesn't already exist elsewhere — it only selects and reshapes:
//
//   - readiness / topMatch come straight from
//     decisionEngine/logic/recommendationEngine.js's buildRecommendation()
//     output, unchanged.
//   - priorities are the visitor's own top-weighted Blueprint tags, reusing
//     blueprint/data/copy.js's existing TAG_LABELS (the same labels
//     recommendationEngine.js already uses to build city match reasons).
//   - considerations are picked from a small fixed set of honest,
//     answer-triggered notes below — never generated text, and never a
//     legal/financial/medical/residency/real-estate claim, only a
//     reflection of what the visitor's own answer already left open.
//   - nextActions are the plan's own next incomplete tasks in the current
//     chapter (same source buildDashboardSummary.js already reads from).
//
// This is the seam a future AI layer could enrich or replace: same
// { priorities, readiness, topMatch, considerations, nextActions } output
// shape, different implementation, no component changes required.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en").

import { TAG_LABELS } from "../../blueprint/data/copy";

function resolve(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

const MAX_PRIORITIES = 3;
const MAX_NEXT_ACTIONS = 3;
const MAX_CONSIDERATIONS = 2;

// Each rule reads only a real, already-collected Blueprint answer value
// (see blueprint/data/questions.js option ids) — never invents a fact,
// only flags that the visitor's own answer leaves something still open.
const CONSIDERATION_RULES = [
  {
    when: (answers) => answers.budget === "notSure",
    text: {
      en: "Your monthly budget isn't locked in yet — get a clearer number before committing to a city or timeline.",
      es: "Tu presupuesto mensual aún no está definido — consigue un número más claro antes de comprometerte con una ciudad o cronograma.",
    },
  },
  {
    when: (answers) => answers.residencyFamiliarity === "none",
    text: {
      en: "You haven't looked into Mexico's residency process yet — worth researching early, since it can shape your timeline.",
      es: "Aún no has investigado el proceso de residencia de México — vale la pena hacerlo pronto, ya que puede moldear tu cronograma.",
    },
  },
  {
    when: (answers) => answers.residencyFamiliarity === "heardOf",
    text: {
      en: "You know residency is a factor but haven't gone deep on the details yet — a Fit Call can walk through what actually applies to you.",
      es: "Sabes que la residencia es un factor, pero aún no has profundizado en los detalles — una Fit Call puede repasar lo que realmente aplica a tu caso.",
    },
  },
  {
    when: (answers) => answers.lifestyle === "notSure",
    text: {
      en: "You're still open on what kind of setting fits best — worth exploring more than one match before deciding.",
      es: "Aún estás abierto sobre qué tipo de entorno te queda mejor — vale la pena explorar más de una coincidencia antes de decidir.",
    },
  },
  {
    when: (answers) => answers.timeline === "exploring",
    text: {
      en: "Your timeline isn't fixed yet, so treat the dates in this plan as a flexible guide rather than a fixed schedule.",
      es: "Tu cronograma aún no está fijo, así que trata las fechas de este plan como una guía flexible y no como un horario fijo.",
    },
  },
];

const NO_OPEN_CONSIDERATIONS = {
  en: "Nothing major is unresolved based on your answers — what's ahead is mostly execution, not decision-making.",
  es: "Nada importante queda sin resolver según tus respuestas — lo que sigue es principalmente ejecución, no toma de decisiones.",
};

// recommendation: decisionEngine buildRecommendation() output
// answers/scores: from decisionEngine useBlueprintAnswers()
// city/plan/currentChapterIndex/taskState: from myMexicoPlan usePlanState()
export function buildDecisionBrief({ recommendation, answers, scores, city, plan, currentChapterIndex, taskState }, lang = "en") {
  const tagCounts = (scores && scores.tagCounts) || {};

  const priorities = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => resolve(TAG_LABELS[tag], lang))
    .filter(Boolean)
    .filter((label, index, all) => all.indexOf(label) === index)
    .slice(0, MAX_PRIORITIES);

  const topMatch =
    recommendation.topCityMatches.find((match) => match.id === city.id) ||
    recommendation.topCityMatches[0] ||
    null;

  const considerations = CONSIDERATION_RULES.filter((rule) => rule.when(answers))
    .map((rule) => resolve(rule.text, lang))
    .slice(0, MAX_CONSIDERATIONS);

  const nowChapter = plan.chapters[currentChapterIndex];
  const nextActions = nowChapter.tasks
    .filter((task) => !taskState[task.id])
    .slice(0, MAX_NEXT_ACTIONS)
    .map((task) => ({ title: resolve(task.title, lang), guideLink: task.guideLink }));

  return {
    priorities,
    readiness: {
      score: recommendation.readinessScore,
      label: recommendation.readinessLabel.label,
      blurb: recommendation.readinessLabel.blurb,
    },
    topMatch: topMatch
      ? { name: topMatch.name, matchReason: topMatch.matchReason, teaser: topMatch.teaser }
      : null,
    considerations: considerations.length > 0 ? considerations : [resolve(NO_OPEN_CONSIDERATIONS, lang)],
    nextActions,
  };
}
