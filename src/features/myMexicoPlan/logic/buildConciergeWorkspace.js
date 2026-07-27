// My Mexico Plan — Personalized Concierge Workspace engine. Same
// discipline as buildDecisionBrief.js, buildAdaptiveChecklist.js, and
// buildReadinessAssessment.js: a pure function, fixed input, fixed
// output shape, no side effects, no invented services or advice.
//
// This does not recompute prioritization or gap analysis — it reuses
// two outputs that are already computed elsewhere on this same page:
//
//   - buildAdaptiveChecklist.js's `doNow` list is already the personalized,
//     priority-ranked subset of the plan's tasks (see that file for the
//     scoring itself). Reused directly here, not recalculated.
//   - buildReadinessAssessment.js's `opportunities` already links specific
//     task ids to the specific readiness gap they address. Reused
//     directly here to explain *why* a task appears, not recalculated.
//
// Grouping by `ownership` (taskBank.js — "self" | "pathToMexico" |
// "professional") reuses the exact field TaskCard.js already renders via
// its own OWNERSHIP_LABELS; nothing here reassigns that field. If a
// category would otherwise have no personalized items (a small
// prioritized/gap-driven pool won't always touch all three ownership
// types), it falls back to a few more of the plan's own relevant tasks
// for that category rather than showing an empty section — still scoped
// to this visitor's actual plan, never invented.
//
// This is the seam a future AI concierge could enrich — swap in a
// richer, model-generated `conciergeReason` per task, or a different
// selection of which tasks surface — without changing this file's output
// shape or the component that renders it.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en").

const CATEGORIES = [
  {
    id: "self",
    label: { en: "You Can Do Yourself", es: "Puedes Hacerlo Tú Mismo" },
    description: {
      en: "Personal decisions and research that only you can make — no one else can decide these for you.",
      es: "Decisiones personales e investigación que solo tú puedes hacer — nadie más puede decidir esto por ti.",
    },
  },
  {
    id: "pathToMexico",
    label: { en: "Path To Mexico Can Help", es: "Path To Mexico Puede Ayudar" },
    description: {
      en: "Path To Mexico can guide you, coordinate on your behalf, or make a trusted introduction here — not a guarantee of outcome, and never a substitute for a licensed professional where one is required.",
      es: "Path To Mexico puede guiarte, coordinar en tu nombre o hacer una presentación de confianza aquí — no es una garantía de resultado, y nunca un sustituto de un profesional certificado donde se requiera uno.",
    },
  },
  {
    id: "professional",
    label: { en: "Professional Support Recommended", es: "Se Recomienda Apoyo Profesional" },
    description: {
      en: "Legal, tax, medical, immigration, or real-estate matters that call for a qualified, licensed professional. Path To Mexico can help connect you with trusted options, but does not perform these services itself.",
      es: "Asuntos legales, fiscales, médicos, de inmigración o bienes raíces que requieren un profesional calificado y certificado. Path To Mexico puede ayudarte a conectar con opciones de confianza, pero no realiza estos servicios directamente.",
    },
  },
];

const DISCLAIMER = {
  en: "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.",
  es: "Path To Mexico ofrece orientación de reubicación, conocimiento local y conexiones de confianza. No somos un despacho legal, una agencia de inmigración, un asesor fiscal, un asesor financiero ni una correduría inmobiliaria. Los servicios legales, de inmigración, fiscales, financieros e inmobiliarios los brindan profesionales calificados e independientes cuando corresponde.",
};

const FALLBACK_LIMIT_PER_CATEGORY = 3;

function resolve(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

const RANKED_REASON = {
  en: "Ranked as one of your top priorities based on your own answers.",
  es: "Clasificada como una de tus principales prioridades según tus propias respuestas.",
};

function gapReason(dimension, lang) {
  return lang === "es" ? `Aborda tu brecha de ${dimension} — una de las formas más rápidas de subir tu preparación.` : `Addresses your ${dimension} gap — one of the fastest ways to raise your readiness.`;
}

function fallbackReason(cityName, lang) {
  return lang === "es" ? `Parte de tu plan personalizado para ${cityName}.` : `Part of your personalized plan for ${cityName}.`;
}

// plan: buildPlan.js's output (already filtered to this visitor/city).
// adaptiveChecklist: buildAdaptiveChecklist.js's output, computed once on
// the page and passed in here — not recalculated.
// readinessAssessment: buildReadinessAssessment.js's output, same.
export function buildConciergeWorkspace({ plan, adaptiveChecklist, readinessAssessment }, lang = "en") {
  const allTasks = plan.chapters.flatMap((chapter) => chapter.tasks);
  const entries = new Map();

  for (const task of (adaptiveChecklist && adaptiveChecklist.doNow) || []) {
    if (!entries.has(task.id)) {
      entries.set(task.id, { ...task, conciergeReason: resolve(RANKED_REASON, lang) });
    }
  }

  for (const opportunity of (readinessAssessment && readinessAssessment.opportunities) || []) {
    for (const taskId of opportunity.taskIds || []) {
      if (entries.has(taskId)) continue;
      const task = allTasks.find((candidate) => candidate.id === taskId);
      if (task) {
        entries.set(task.id, { ...task, conciergeReason: gapReason(opportunity.dimension, lang) });
      }
    }
  }

  const categories = CATEGORIES.map((category) => {
    const personalized = Array.from(entries.values()).filter((task) => task.ownership === category.id);
    const label = resolve(category.label, lang);
    const description = resolve(category.description, lang);
    if (personalized.length > 0) {
      return { id: category.id, label, description, tasks: personalized };
    }

    // Fallback so a category is never empty in the overview: still scoped
    // to this visitor's own plan, just not from the prioritized/gap pool.
    const fallback = allTasks
      .filter((task) => task.ownership === category.id && !entries.has(task.id))
      .slice(0, FALLBACK_LIMIT_PER_CATEGORY)
      .map((task) => ({ ...task, conciergeReason: fallbackReason(plan.cityName, lang) }));
    return { id: category.id, label, description, tasks: fallback };
  });

  return { categories, disclaimer: resolve(DISCLAIMER, lang) };
}
