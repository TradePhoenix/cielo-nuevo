// Ask Path knowledge source: planning tools (My Mexico Blueprint, Your
// Mexico, Compare, My Mexico Plan, Dashboard/Document Vault).
//
// Hand-authored, verified directly against each feature's own routing and
// behavior (src/App.js, src/features/*/pages/*.js) rather than copied from
// any single page's copy — these tools don't have one canonical marketing
// description to reuse. Kept intentionally factual about what each tool
// does and does not do (e.g. no auth on the dashboard) rather than
// aspirational.

export function buildPlanningToolRecords() {
  return [
    {
      id: "tool-blueprint",
      title: { en: "My Mexico Blueprint", es: "My Mexico Blueprint" },
      category: "planning-tool",
      route: "/my-mexico-blueprint",
      lastReviewed: "2026-07-26",
      keywords: ["blueprint", "quiz", "questionnaire", "readiness", "city match"],
      content: {
        en: "A free, roughly 6-question relocation questionnaire. It produces a 0–100 readiness score, ranked destination matches across the Yucatán Peninsula with honest trade-offs (not just highlights), and a 30/60/90-day roadmap. It runs entirely in the browser — answers are saved to the browser's local storage, not sent anywhere, and the questionnaire can be retaken at any time.",
        es: "Un cuestionario de reubicación gratuito, de aproximadamente 6 preguntas. Genera un puntaje de preparación de 0 a 100, coincidencias de destino en la Península de Yucatán con pros y contras honestos, y una hoja de ruta de 30/60/90 días. Funciona completamente en el navegador — las respuestas se guardan localmente, no se envían a ningún servidor, y el cuestionario puede repetirse en cualquier momento.",
      },
    },
    {
      id: "tool-your-mexico",
      title: { en: "Your Mexico — Living Destination Atlas", es: "Your Mexico — Atlas de Destinos" },
      category: "planning-tool",
      route: "/your-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["destinations", "atlas", "explore", "compare cities"],
      content: {
        en: "A browsable atlas of every destination Path To Mexico covers across the Yucatán Peninsula, groupable by region, with a detail page per city (lifestyle snapshot, monthly budget, neighborhoods, honest trade-offs) and a side-by-side comparison tool.",
        es: "Un atlas navegable de todos los destinos que cubre Path To Mexico en la Península de Yucatán, agrupables por región, con una página de detalle por ciudad (resumen de estilo de vida, presupuesto mensual, colonias, pros y contras honestos) y una herramienta de comparación lado a lado.",
      },
    },
    {
      id: "tool-my-mexico-plan",
      title: { en: "My Mexico Plan", es: "My Mexico Plan" },
      category: "planning-tool",
      route: "/my-mexico-plan",
      lastReviewed: "2026-07-26",
      keywords: ["plan", "checklist", "moving plan", "tasks"],
      content: {
        en: "A personalized, checklist-style move plan for a specific city, reachable only after completing My Mexico Blueprint. Breaks the move into concrete chapters/tasks rather than a generic timeline.",
        es: "Un plan de mudanza personalizado, tipo lista de verificación, para una ciudad específica, disponible solo después de completar My Mexico Blueprint. Divide la mudanza en capítulos y tareas concretas en lugar de un cronograma genérico.",
      },
    },
    {
      id: "tool-dashboard",
      title: { en: "Client Dashboard & Document Vault", es: "Panel De Cliente Y Bóveda De Documentos" },
      category: "planning-tool",
      route: "/dashboard",
      lastReviewed: "2026-07-26",
      keywords: ["dashboard", "documents", "vault"],
      content: {
        en: "A browser-local dashboard summarizing Blueprint, destination, and plan progress, plus a Document Vault for keeping track of passports, residency paperwork, and insurance. There is no account or login system yet — this reads only the same local data already saved on that browser, and isn't currently promoted from any marketing page.",
        es: null,
      },
    },
  ];
}
