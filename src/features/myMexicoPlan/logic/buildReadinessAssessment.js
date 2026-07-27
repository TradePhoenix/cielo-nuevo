// My Mexico Plan — Move Readiness Assessment engine. Same discipline as
// buildDecisionBrief.js, buildCostPlanner.js, and buildAdaptiveChecklist.js:
// a pure function, fixed input, fixed output shape, no side effects, no
// AI. Does not touch blueprint/logic/scoringEngine.js or
// recommendationEngine.js — it reads the same blueprint/data/questions.js
// schema those files already use and recomputes a per-question view of
// the same points, entirely independently and read-only.
//
// This is deliberately a different lens than DecisionBrief.js (which
// shows the readiness score at a glance) and AdaptiveChecklist.js (which
// ranks all plan tasks by overall relevance): this file explains *why*
// the score is what it is — which of the visitor's own 6 answers are
// pulling it up (strengths) versus down (gaps) — and, only where a real
// existing task or guide already addresses that specific gap, points to
// it as a "highest-impact" action. It never invents a task or a fact
// about what would change the score; the mapping in OPPORTUNITY_ACTIONS
// below only ever points at task ids/guides that already exist.
//
// This is the seam a future AI layer could enrich (e.g. a richer written
// narrative per dimension) without changing this file's output shape or
// any component that renders it.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en") to
// buildReadinessAssessment(); every text field became `{ en, es }`,
// resolved before returning.

import { QUESTIONS, resolveText } from "../../blueprint/data/questions";

const DIMENSION_INFO = {
  timeline: {
    label: { en: "Timeline Clarity", es: "Claridad De Cronograma" },
    whyItMatters: { en: "Knowing roughly when you're moving shapes every other decision below.", es: "Saber aproximadamente cuándo te mudas moldea cualquier otra decisión de abajo." },
  },
  lifeStage: {
    label: { en: "Life-Stage Fit", es: "Ajuste De Etapa De Vida" },
    whyItMatters: { en: "This shapes which archetype and roadmap fits your situation.", es: "Esto define qué arquetipo y hoja de ruta se ajusta a tu situación." },
  },
  budget: {
    label: { en: "Budget Clarity", es: "Claridad De Presupuesto" },
    whyItMatters: { en: "A real number is one of the fastest ways to turn \"maybe\" into \"when.\"", es: "Un número real es una de las formas más rápidas de convertir el \"tal vez\" en \"cuándo\"." },
  },
  lifestyle: {
    label: { en: "Lifestyle Clarity", es: "Claridad De Estilo De Vida" },
    whyItMatters: { en: "Knowing what setting you want narrows your city search fast.", es: "Saber qué entorno quieres acota rápidamente tu búsqueda de ciudad." },
  },
  household: {
    label: { en: "Household Clarity", es: "Claridad Familiar" },
    whyItMatters: { en: "Who's coming with you shapes housing size and school research.", es: "Quién te acompaña define el tamaño de la vivienda y la investigación escolar." },
  },
  residencyFamiliarity: {
    label: { en: "Residency Knowledge", es: "Conocimiento De Residencia" },
    whyItMatters: { en: "Understanding the residency process early avoids timeline surprises later.", es: "Entender el proceso de residencia desde temprano evita sorpresas de cronograma después." },
  },
};

const GAP_THRESHOLD = 0.6;
const STRENGTH_THRESHOLD = 0.85;
const MAX_HIGHEST_IMPACT_ACTIONS = 3;

// Only dimensions with a genuine, already-existing task or guide to point
// to. lifeStage and household describe who the visitor is, not something
// to "fix," so they're scored below but never surfaced as an opportunity.
const OPPORTUNITY_ACTIONS = {
  budget: {
    suggestion: {
      en: "Get a real number instead of a range you're unsure about — this is one of the fastest ways to raise this score.",
      es: "Consigue un número real en lugar de un rango del que no estás seguro — esta es una de las formas más rápidas de subir este puntaje.",
    },
    taskIds: ["get-honest-about-budget", "bare-minimum-budget"],
    guideLink: "/guides/how-much-money-do-you-need-to-move-to-mexico",
  },
  residencyFamiliarity: {
    suggestion: {
      en: "Spend an hour on the residency basics — most of the uncertainty here disappears once you understand the general path.",
      es: "Dedica una hora a lo básico de la residencia — la mayor parte de la incertidumbre aquí desaparece una vez que entiendes el camino general.",
    },
    taskIds: ["research-residency-track", "start-residency-paperwork-urgent"],
    guideLink: "/guides/temporary-residency-mexico",
  },
  timeline: {
    suggestion: {
      en: "A rough window — even just a season — makes the rest of this plan far more concrete.",
      es: "Una ventana aproximada — aunque sea solo una temporada — hace que el resto de este plan sea mucho más concreto.",
    },
    taskIds: [],
    guideLink: null,
  },
  lifestyle: {
    suggestion: {
      en: "Compare more than one city match in Your Mexico before deciding what setting fits you.",
      es: "Compara más de una ciudad coincidente en Your Mexico antes de decidir qué entorno te queda bien.",
    },
    taskIds: [],
    guideLink: null,
  },
};

function computeDimensionScores(answers, lang) {
  return QUESTIONS.map((question) => {
    const options = question.options || [];
    const maxPoints = options.reduce(
      (max, option) => Math.max(max, (option.scores && option.scores.readiness) || 0),
      0
    );
    const selectedOption = options.find((option) => option.id === answers[question.id]);
    const earnedPoints = selectedOption ? (selectedOption.scores && selectedOption.scores.readiness) || 0 : 0;
    const percentOfMax = maxPoints > 0 ? earnedPoints / maxPoints : 0;
    const info = DIMENSION_INFO[question.id] || { label: question.question, whyItMatters: { en: "", es: "" } };

    return {
      id: question.id,
      label: resolveText(info.label, lang),
      whyItMatters: resolveText(info.whyItMatters, lang),
      earnedPoints,
      maxPoints,
      percentOfMax,
    };
  });
}

// answers/recommendation: decisionEngine's existing outputs, unchanged.
// plan/taskState: myMexicoPlan's existing outputs, unchanged.
export function buildReadinessAssessment({ answers, recommendation, plan, taskState }, lang = "en") {
  const dimensions = computeDimensionScores(answers, lang);

  const strengths = dimensions
    .filter((dimension) => dimension.percentOfMax >= STRENGTH_THRESHOLD)
    .sort((a, b) => b.percentOfMax - a.percentOfMax)
    .slice(0, 3);

  const gaps = dimensions
    .filter((dimension) => dimension.percentOfMax < GAP_THRESHOLD)
    .sort((a, b) => a.percentOfMax - b.percentOfMax);

  const opportunities = gaps
    .filter((dimension) => OPPORTUNITY_ACTIONS[dimension.id])
    .map((dimension) => ({
      dimension: dimension.label,
      suggestion: resolveText(OPPORTUNITY_ACTIONS[dimension.id].suggestion, lang),
      guideLink: OPPORTUNITY_ACTIONS[dimension.id].guideLink,
      taskIds: OPPORTUNITY_ACTIONS[dimension.id].taskIds,
    }));

  const strongDimensionCount = dimensions.filter((dimension) => dimension.percentOfMax >= STRENGTH_THRESHOLD).length;

  const confidenceFactors = [
    lang === "es"
      ? "Construido a partir de tus propias 6 respuestas del Blueprint — los mismos datos usados para ordenar tus coincidencias de ciudad y construir el plan de abajo."
      : "Built from your own 6 Blueprint answers — the same inputs used to rank your city matches and build the plan below.",
    lang === "es"
      ? "Se recalcula al instante si vuelves a hacer el Blueprint — nada aquí está fijo."
      : "Recalculated instantly if you retake the Blueprint — nothing here is locked in.",
    lang === "es"
      ? `Diste una respuesta clara y decidida en ${strongDimensionCount} de 6 preguntas.`
      : `You gave a clear, decisive answer on ${strongDimensionCount} of 6 questions.`,
  ];

  const validatePersonally = [
    lang === "es"
      ? "Este puntaje refleja la claridad en tus respuestas, no una garantía de cómo se sentirá realmente la mudanza."
      : "This score reflects the clarity in your answers, not a guarantee of how the move will actually feel.",
    lang === "es"
      ? "Una Mexico Fit Call es la forma más rápida de poner a prueba esto contra tu situación específica con una persona real."
      : "A Mexico Fit Call is the fastest way to pressure-test this against your specific situation with a real person.",
  ];
  if (answers.timeline === "exploring") {
    validatePersonally.push(
      lang === "es"
        ? "Tu cronograma aún no está fijo — vuelve a esto cuando tengas una ventana real en mente."
        : "Your timeline isn't fixed yet — revisit this once you have a real window in mind."
    );
  }

  const allTasks = plan ? plan.chapters.flatMap((chapter) => chapter.tasks) : [];
  const seenTaskIds = new Set();
  const highestImpactActions = [];
  outer: for (const opportunity of opportunities) {
    for (const taskId of opportunity.taskIds) {
      if (seenTaskIds.has(taskId) || taskState[taskId]) continue;
      const task = allTasks.find((candidate) => candidate.id === taskId);
      if (task) {
        seenTaskIds.add(taskId);
        highestImpactActions.push(task);
      }
      if (highestImpactActions.length >= MAX_HIGHEST_IMPACT_ACTIONS) break outer;
    }
  }

  return {
    readinessScore: recommendation.readinessScore,
    readinessLabel: recommendation.readinessLabel.label,
    readinessBlurb: recommendation.readinessLabel.blurb,
    archetypeTitle: recommendation.archetype.title,
    dimensions,
    strengths,
    gaps,
    opportunities,
    confidenceFactors,
    validatePersonally,
    highestImpactActions,
  };
}
