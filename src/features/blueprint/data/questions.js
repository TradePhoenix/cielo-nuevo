// My Mexico Blueprint — questionnaire schema.
//
// Each question is single-select. Each option carries two independent signals:
//   - scores.readiness: points toward the overall 0-100 readiness score
//   - tags: qualitative signals used for archetype/city matching (recommendationEngine.js)
// Some options (budget question only) also carry a budgetTier used for roadmap branching.
//
// Adding, removing, or reweighting a question only requires editing this file —
// scoringEngine.js derives max-possible-points directly from whatever is here.
//
// PTM Spanish-parity pass: `question`, `helper`, and each option's `label`
// became `{ en, es }` objects — nothing scoring-related (`id`, `scores`,
// `tags`, `budgetTier`) changed shape, since scoringEngine.js and
// recommendationEngine.js never read the text fields, only these. Callers
// resolve display text via `resolveText(field, lang)` (below) or by reading
// `.en`/`.es` directly.

export function resolveText(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

export const QUESTIONS = [
  {
    id: "timeline",
    question: { en: "When are you hoping to move to Mexico?", es: "¿Cuándo esperas mudarte a México?" },
    helper: { en: "There's no wrong answer — this just shapes your roadmap.", es: "No hay una respuesta incorrecta — esto solo da forma a tu hoja de ruta." },
    type: "single-select",
    options: [
      { id: "asap", label: { en: "Within 6 months", es: "Dentro de 6 meses" }, scores: { readiness: 25 }, tags: ["urgent"] },
      { id: "6-12mo", label: { en: "6–12 months", es: "6–12 meses" }, scores: { readiness: 18 }, tags: ["urgent"] },
      { id: "1-2y", label: { en: "1–2 years", es: "1–2 años" }, scores: { readiness: 10 }, tags: [] },
      { id: "exploring", label: { en: "Just exploring for now", es: "Por ahora solo estoy explorando" }, scores: { readiness: 3 }, tags: ["exploratory"] },
    ],
  },
  {
    id: "lifeStage",
    question: { en: "What best describes your situation?", es: "¿Qué describe mejor tu situación?" },
    helper: { en: "Pick the one that fits closest.", es: "Elige la que más se ajuste." },
    type: "single-select",
    options: [
      { id: "retiree", label: { en: "Retiring or semi-retiring", es: "Jubilándome o semi-jubilándome" }, scores: { readiness: 15 }, tags: ["retirement", "quiet"] },
      { id: "remote", label: { en: "Working remotely or freelancing", es: "Trabajando remotamente o de forma independiente" }, scores: { readiness: 15 }, tags: ["remoteWork", "urban"] },
      { id: "family", label: { en: "Relocating with family or kids", es: "Reubicándome con familia o hijos" }, scores: { readiness: 12 }, tags: ["family", "quiet"] },
      { id: "entrepreneur", label: { en: "Starting or running a business", es: "Iniciando o dirigiendo un negocio" }, scores: { readiness: 15 }, tags: ["urban", "premium"] },
      { id: "freshStart", label: { en: "Wanting a fresh start", es: "Buscando un nuevo comienzo" }, scores: { readiness: 8 }, tags: ["exploratory"] },
    ],
  },
  {
    id: "budget",
    question: { en: "What's your realistic monthly budget for life in Mexico?", es: "¿Cuál es tu presupuesto mensual realista para vivir en México?" },
    helper: { en: "An honest estimate is more useful than an ideal one.", es: "Una estimación honesta es más útil que una ideal." },
    type: "single-select",
    options: [
      { id: "lean", label: { en: "Under $1,500 USD", es: "Menos de $1,500 USD" }, scores: { readiness: 8 }, tags: ["budgetConscious"], budgetTier: "lean" },
      { id: "comfortable", label: { en: "$1,500–$3,000 USD", es: "$1,500–$3,000 USD" }, scores: { readiness: 15 }, tags: ["comfortable"], budgetTier: "comfortable" },
      { id: "premium", label: { en: "$3,000+ USD", es: "$3,000+ USD" }, scores: { readiness: 15 }, tags: ["premium", "beach"], budgetTier: "premium" },
      { id: "notSure", label: { en: "I'm not sure yet", es: "Todavía no estoy seguro" }, scores: { readiness: 5 }, tags: ["exploratory"], budgetTier: "unknown" },
    ],
  },
  {
    id: "lifestyle",
    question: { en: "What kind of setting appeals to you most?", es: "¿Qué tipo de entorno te atrae más?" },
    helper: { en: "", es: "" },
    type: "single-select",
    options: [
      { id: "beachTown", label: { en: "A laid-back beach town", es: "Un pueblo de playa relajado" }, scores: { readiness: 10 }, tags: ["beach", "quiet"] },
      { id: "cityEnergy", label: { en: "A walkable city with energy and amenities", es: "Una ciudad caminable con energía y comodidades" }, scores: { readiness: 10 }, tags: ["urban"] },
      { id: "quietNature", label: { en: "Quiet, and surrounded by nature", es: "Tranquilo, y rodeado de naturaleza" }, scores: { readiness: 10 }, tags: ["quiet"] },
      { id: "notSure", label: { en: "Not sure yet — open to guidance", es: "Todavía no estoy seguro — abierto a sugerencias" }, scores: { readiness: 5 }, tags: ["exploratory"] },
    ],
  },
  // BP-002 — added per docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md's
  // recommended solution: the audit's exhaustive enumeration of the prior
  // 6-question space found several destinations (Sisal most severely —
  // 0 of 3,840 real combinations) structurally unreachable as the #1
  // match, because the existing tag vocabulary has no way to express
  // heritage/culture, nature-first orientation, or genuine remoteness as
  // positive pulls.
  //
  // readiness: 0 on every option, deliberately — this question exists
  // purely to carry place-fit tags, not to measure moving-readiness. Any
  // nonzero value here would raise readinessMax for every visitor,
  // including ones who never see this question (a returning visitor's
  // saved 6-answer session), which would silently shift the readinessScore
  // BP-001's own established Playa/Tulum/Riviera Maya regression profiles
  // assert exact values for. Keeping this question's readiness weight at
  // zero keeps readinessMax = 90 exactly as it was before BP-002, so those
  // three profiles — and every returning visitor's already-computed
  // readiness — are provably unaffected by this question's addition.
  {
    id: "placeCharacter",
    question: { en: "Beyond the basics, what pulls you most toward a specific place?", es: "Más allá de lo básico, ¿qué es lo que más te atrae de un lugar específico?" },
    helper: { en: "This helps us understand what actually makes somewhere feel right to you.", es: "Esto nos ayuda a entender qué es lo que realmente hace que un lugar se sienta adecuado para ti." },
    type: "single-select",
    options: [
      { id: "cultureHeritage", label: { en: "Immersing in local culture, history, and tradition", es: "Sumergirme en la cultura, historia y tradición local" }, scores: { readiness: 0 }, tags: ["heritage"] },
      { id: "natureWildlife", label: { en: "Access to nature, wildlife, and conservation areas", es: "Acceso a la naturaleza, vida silvestre y áreas de conservación" }, scores: { readiness: 0 }, tags: ["natureFirst"] },
      { id: "establishedCoastal", label: { en: "A well-known, well-connected coastal town", es: "Un pueblo costero conocido y bien conectado" }, scores: { readiness: 0 }, tags: ["comfortable"] },
      // DEST-003: "frontier" rides alongside "remote" on this same option
      // (never its own visible choice) — see BLUEPRINT_11_DESTINATION_
      // SEPARABILITY_AUDIT.md's precedent for why: adding 14 destinations
      // to the existing 11-city tag vocabulary saturated "remote" enough
      // that several genuinely off-the-grid new towns (Mahahual, Tekax,
      // Chuburná Puerto, Río Lagartos) could never win outright against
      // earlier-positioned cities sharing the same tag combination, even
      // though none of them are literal subsets of a competitor (verified
      // by exhaustive brute-force search over all 15,360 real answer
      // combinations). A second, always-co-selected tag lets those towns'
      // own profiles score higher on this exact answer without changing
      // the questionnaire UI or any other city's matching behavior.
      { id: "trueRemote", label: { en: "True remoteness, away from almost everything", es: "Verdadero aislamiento, lejos de casi todo" }, scores: { readiness: 0 }, tags: ["remote", "frontier"] },
    ],
  },
  {
    id: "household",
    question: { en: "Who's making this move?", es: "¿Quién hace esta mudanza?" },
    helper: { en: "", es: "" },
    type: "single-select",
    options: [
      { id: "solo", label: { en: "Just me", es: "Solo yo" }, scores: { readiness: 10 }, tags: [] },
      { id: "couple", label: { en: "Me and a partner", es: "Mi pareja y yo" }, scores: { readiness: 10 }, tags: [] },
      { id: "familyKids", label: { en: "Family with kids", es: "Familia con hijos" }, scores: { readiness: 8 }, tags: ["family"] },
      { id: "extended", label: { en: "Multi-generational or extended family", es: "Familia multigeneracional o extendida" }, scores: { readiness: 6 }, tags: ["family"] },
    ],
  },
  {
    id: "residencyFamiliarity",
    question: { en: "How familiar are you with Mexico's residency process?", es: "¿Qué tan familiarizado estás con el proceso de residencia de México?" },
    helper: { en: "", es: "" },
    type: "single-select",
    options: [
      { id: "researched", label: { en: "I've already done some research", es: "Ya he investigado un poco" }, scores: { readiness: 15 }, tags: ["urgent"] },
      { id: "heardOf", label: { en: "I've heard of it but don't know the details", es: "He escuchado sobre esto pero no conozco los detalles" }, scores: { readiness: 8 }, tags: [] },
      { id: "none", label: { en: "Not familiar at all", es: "Nada familiarizado" }, scores: { readiness: 3 }, tags: ["exploratory"] },
    ],
  },
];
