// My Mexico Blueprint — questionnaire schema (V2: 12 core questions +
// conditional follow-ups).
//
// Each question carries independent signals:
//   - scores.readiness: points toward the overall 0-100 readiness score
//   - tags: qualitative signals used for archetype/city matching (recommendationEngine.js)
// Some options (budget question only) also carry a budgetTier used for roadmap branching.
//
// V2 schema additions (all backward-compatible with the engines' shapes):
//   - type: "multi-select" — the stored answer is an ARRAY of option ids
//     instead of a single id. scoringEngine.js normalizes both shapes, so
//     every consumer keeps working whether an answer is a string or array.
//   - maxSelections: soft cap for multi-select questions (enforced by
//     useBlueprintState.js, displayed by QuestionCard.js).
//   - showIf: { questionId, anyOf: [...] } — declarative visibility rule for
//     conditional follow-ups. A question with showIf only appears when the
//     referenced answer includes one of the listed option ids (works for
//     both single- and multi-select sources). Kept as plain data (no
//     functions) so this file stays pure data per the feature's architecture.
//
// Readiness weighting rule (extends the BP-002 precedent): every
// multi-select question and every conditional question carries readiness: 0
// on all options. Readiness comes only from always-visible single-select
// questions (timeline, household, budget, housing, lifeStage), so
// readinessMax is a constant 77 for every visitor regardless of which
// conditionals their answers reveal — no one's percentage shifts because a
// follow-up appeared or didn't.
//
// Kept question/option ids (timeline, lifeStage, budget, lifestyle,
// placeCharacter, household and all their original option ids) are stable on
// purpose: the 25-destination reachability suite and the separability-audit
// precedent (BP-001/BP-002/DEST-003 — see
// docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md) are
// expressed in these ids, and saved profiles map into the future Master
// Client Profile by id, never by display copy.

export function resolveText(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

// Answers may be a single option id (single-select) or an array of ids
// (multi-select). Every consumer that needs "the selected ids" should use
// this instead of reading the raw value.
export function normalizeAnswer(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

// Evaluates a question's showIf rule against the current answers.
// No rule = always visible.
export function isQuestionVisible(question, answers) {
  if (!question.showIf) return true;
  const source = normalizeAnswer(answers && answers[question.showIf.questionId]);
  return question.showIf.anyOf.some((id) => source.includes(id));
}

export function getVisibleQuestions(questions, answers) {
  return questions.filter((question) => isQuestionVisible(question, answers));
}

export const QUESTIONS = [
  // ——— 1. Motivation ———
  {
    id: "motivation",
    question: { en: "What's pulling you toward Mexico?", es: "¿Qué te atrae hacia México?" },
    helper: { en: "Choose up to three — whatever rings truest.", es: "Elige hasta tres — lo que más resuene contigo." },
    type: "multi-select",
    maxSelections: 3,
    options: [
      { id: "freshStart", label: { en: "A fresh start", es: "Un nuevo comienzo" }, scores: { readiness: 0 }, tags: ["exploratory"] },
      { id: "retirement", label: { en: "Retirement", es: "Jubilación" }, scores: { readiness: 0 }, tags: ["retirement"] },
      { id: "lifestyle", label: { en: "A better everyday lifestyle", es: "Un mejor estilo de vida diario" }, scores: { readiness: 0 }, tags: [] },
      { id: "cost", label: { en: "Lower cost of living", es: "Menor costo de vida" }, scores: { readiness: 0 }, tags: ["budgetConscious"] },
      { id: "investment", label: { en: "Investment opportunity", es: "Oportunidad de inversión" }, scores: { readiness: 0 }, tags: ["premium"] },
      { id: "remoteWork", label: { en: "Remote work freedom", es: "Libertad de trabajo remoto" }, scores: { readiness: 0 }, tags: ["remoteWork"] },
      { id: "business", label: { en: "Starting or building a business", es: "Iniciar o construir un negocio" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "family", label: { en: "Family or personal reasons", es: "Razones familiares o personales" }, scores: { readiness: 0 }, tags: ["family"] },
      { id: "adventure", label: { en: "Adventure and change", es: "Aventura y cambio" }, scores: { readiness: 0 }, tags: ["exploratory"] },
      { id: "exploring", label: { en: "Still exploring the idea", es: "Todavía explorando la idea" }, scores: { readiness: 0 }, tags: ["exploratory"] },
    ],
  },

  // ——— 2. Timeline ———
  // Original four option ids preserved; "now" added for the truly-imminent
  // mover. Max readiness for the question stays 25.
  {
    id: "timeline",
    question: { en: "When are you hoping to move?", es: "¿Cuándo esperas mudarte?" },
    helper: { en: "There's no wrong answer — this just shapes your roadmap.", es: "No hay una respuesta incorrecta — esto solo da forma a tu hoja de ruta." },
    type: "single-select",
    options: [
      { id: "now", label: { en: "As soon as possible", es: "Lo antes posible" }, scores: { readiness: 25 }, tags: ["urgent"] },
      { id: "asap", label: { en: "Within 6 months", es: "Dentro de 6 meses" }, scores: { readiness: 25 }, tags: ["urgent"] },
      { id: "6-12mo", label: { en: "6–12 months", es: "6–12 meses" }, scores: { readiness: 18 }, tags: ["urgent"] },
      { id: "1-2y", label: { en: "1–2 years", es: "1–2 años" }, scores: { readiness: 10 }, tags: [] },
      { id: "exploring", label: { en: "Just exploring for now", es: "Por ahora solo estoy explorando" }, scores: { readiness: 3 }, tags: ["exploratory"] },
    ],
  },

  // ——— 3. Household ———
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

  // ——— 3a. CONDITIONAL — schooling (family with kids) ———
  {
    id: "schooling",
    showIf: { questionId: "household", anyOf: ["familyKids"] },
    question: { en: "What matters most for your kids' education?", es: "¿Qué es lo más importante para la educación de tus hijos?" },
    helper: { en: "This shapes which destinations we weigh for you.", es: "Esto influye en qué destinos consideramos para ti." },
    type: "single-select",
    options: [
      { id: "bilingualSchools", label: { en: "Access to strong bilingual or international schools", es: "Acceso a buenas escuelas bilingües o internacionales" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "localSchools", label: { en: "Local schools and real cultural immersion", es: "Escuelas locales e inmersión cultural real" }, scores: { readiness: 0 }, tags: ["heritage"] },
      { id: "homeschool", label: { en: "We homeschool / school online", es: "Educamos en casa / escuela en línea" }, scores: { readiness: 0 }, tags: [] },
      { id: "stillDeciding", label: { en: "Still figuring this out", es: "Todavía lo estamos decidiendo" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 4. Origin ———
  // High-level context only — deliberately no documents, numbers, or
  // anything sensitive. Used for result framing (e.g., "your residency
  // process starts at a consulate in your home country"), never for
  // eligibility claims.
  {
    id: "origin",
    question: { en: "Where are you moving from?", es: "¿Desde dónde te mudas?" },
    helper: { en: "Just the big picture — it shapes the practical side of your plan.", es: "Solo el panorama general — da forma al lado práctico de tu plan." },
    type: "single-select",
    options: [
      { id: "canada", label: { en: "Canada", es: "Canadá" }, scores: { readiness: 0 }, tags: [] },
      { id: "usa", label: { en: "United States", es: "Estados Unidos" }, scores: { readiness: 0 }, tags: [] },
      { id: "europe", label: { en: "Europe", es: "Europa" }, scores: { readiness: 0 }, tags: [] },
      { id: "latam", label: { en: "Latin America", es: "América Latina" }, scores: { readiness: 0 }, tags: [] },
      { id: "elsewhere", label: { en: "Somewhere else", es: "Otro lugar" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 5. Life vision ———
  // V1's "lifestyle" question, evolved: same id, original option ids kept
  // (beachTown, cityEnergy, quietNature, notSure), new textures added, and
  // promoted to multi-select. Readiness moved to 0 per the V2 weighting rule
  // (V1 gave it 10; that weight now lives in the new housing question).
  {
    id: "lifestyle",
    question: { en: "What kind of life are you looking for?", es: "¿Qué tipo de vida estás buscando?" },
    helper: { en: "Choose up to two.", es: "Elige hasta dos." },
    type: "multi-select",
    maxSelections: 2,
    options: [
      { id: "beachTown", label: { en: "Relaxed coastal living", es: "Vida costera relajada" }, scores: { readiness: 0 }, tags: ["beach", "quiet"] },
      { id: "cityEnergy", label: { en: "Culture and city energy", es: "Cultura y energía de ciudad" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "quietNature", label: { en: "Quiet, surrounded by nature", es: "Tranquilidad, rodeado de naturaleza" }, scores: { readiness: 0 }, tags: ["quiet", "natureFirst"] },
      { id: "familyLife", label: { en: "Family-oriented community life", es: "Vida comunitaria orientada a la familia" }, scores: { readiness: 0 }, tags: ["family"] },
      { id: "socialActive", label: { en: "Social and active", es: "Social y activa" }, scores: { readiness: 0 }, tags: ["urban", "comfortable"] },
      { id: "upscale", label: { en: "Upscale and polished", es: "Exclusiva y refinada" }, scores: { readiness: 0 }, tags: ["premium", "comfortable"] },
      { id: "notSure", label: { en: "A balanced mix — still forming", es: "Una mezcla equilibrada — aún tomando forma" }, scores: { readiness: 0 }, tags: ["exploratory"] },
    ],
  },

  // ——— 6. Environment ———
  // V1's "placeCharacter" question (BP-002/DEST-003), evolved: same id, all
  // four original option ids and their exact tag sets preserved (the
  // separability audit's reachability guarantees live in these), plus a
  // quiet-coast option and an honest "not sure".
  {
    id: "placeCharacter",
    question: { en: "What kind of environment feels most like you?", es: "¿Qué tipo de entorno se siente más como tú?" },
    helper: { en: "This helps us understand what actually makes somewhere feel right.", es: "Esto nos ayuda a entender qué hace que un lugar realmente se sienta adecuado." },
    type: "single-select",
    options: [
      { id: "establishedCoastal", label: { en: "A well-known, well-connected coastal town", es: "Un pueblo costero conocido y bien conectado" }, scores: { readiness: 0 }, tags: ["comfortable"] },
      { id: "cultureHeritage", label: { en: "A city or town rich in culture, history, and tradition", es: "Una ciudad o pueblo rico en cultura, historia y tradición" }, scores: { readiness: 0 }, tags: ["heritage"] },
      { id: "quietCoast", label: { en: "A quieter coast, away from the crowds", es: "Una costa más tranquila, lejos de las multitudes" }, scores: { readiness: 0 }, tags: ["beach", "quiet"] },
      { id: "natureWildlife", label: { en: "Close to nature, wildlife, and conservation areas", es: "Cerca de la naturaleza, vida silvestre y áreas de conservación" }, scores: { readiness: 0 }, tags: ["natureFirst"] },
      // DEST-003: "frontier" rides alongside "remote" on this same option —
      // see BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md for why it is
      // never its own visible choice.
      { id: "trueRemote", label: { en: "True remoteness, away from almost everything", es: "Verdadero aislamiento, lejos de casi todo" }, scores: { readiness: 0 }, tags: ["remote", "frontier"] },
      { id: "notSure", label: { en: "I'm not sure yet", es: "Todavía no estoy seguro" }, scores: { readiness: 0 }, tags: ["exploratory"] },
    ],
  },

  // ——— 7. Priorities ———
  // Each option carries at most ONE matching tag (or none), so a visitor's
  // three priorities can nudge — never swamp — the destination ranking.
  {
    id: "priorities",
    question: { en: "What matters most when choosing where to live?", es: "¿Qué es lo más importante al elegir dónde vivir?" },
    helper: { en: "Pick your top three.", es: "Elige tus tres principales." },
    type: "multi-select",
    maxSelections: 3,
    options: [
      { id: "affordability", label: { en: "Affordability", es: "Costo accesible" }, scores: { readiness: 0 }, tags: ["budgetConscious"] },
      { id: "safety", label: { en: "Safety", es: "Seguridad" }, scores: { readiness: 0 }, tags: [] },
      { id: "healthcare", label: { en: "Quality healthcare nearby", es: "Buena atención médica cercana" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "walkability", label: { en: "Walkability", es: "Poder moverte a pie" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "beachAccess", label: { en: "Beach access", es: "Acceso a la playa" }, scores: { readiness: 0 }, tags: ["beach"] },
      { id: "culture", label: { en: "Culture and tradition", es: "Cultura y tradición" }, scores: { readiness: 0 }, tags: ["heritage"] },
      { id: "airport", label: { en: "Easy airport access", es: "Fácil acceso al aeropuerto" }, scores: { readiness: 0 }, tags: ["comfortable"] },
      { id: "community", label: { en: "Community and belonging", es: "Comunidad y pertenencia" }, scores: { readiness: 0 }, tags: [] },
      { id: "dining", label: { en: "Restaurants and social life", es: "Restaurantes y vida social" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "nature", label: { en: "Nature all around", es: "Naturaleza por todas partes" }, scores: { readiness: 0 }, tags: ["natureFirst"] },
      { id: "internet", label: { en: "Reliable fast internet", es: "Internet rápido y confiable" }, scores: { readiness: 0 }, tags: ["remoteWork"] },
      { id: "localFeel", label: { en: "A local, less-touristy atmosphere", es: "Un ambiente local, menos turístico" }, scores: { readiness: 0 }, tags: ["heritage"] },
    ],
  },

  // ——— 8. Budget ———
  {
    id: "budget",
    question: { en: "What monthly budget feels comfortable?", es: "¿Qué presupuesto mensual se siente cómodo?" },
    helper: { en: "In USD, for your whole household. An honest estimate beats an ideal one.", es: "En USD, para todo tu hogar. Una estimación honesta vale más que una ideal." },
    type: "single-select",
    options: [
      { id: "lean", label: { en: "Under $1,500 USD / month", es: "Menos de $1,500 USD / mes" }, scores: { readiness: 8 }, tags: ["budgetConscious"], budgetTier: "lean" },
      { id: "comfortable", label: { en: "$1,500–$3,000 USD / month", es: "$1,500–$3,000 USD / mes" }, scores: { readiness: 15 }, tags: ["comfortable"], budgetTier: "comfortable" },
      { id: "premium", label: { en: "$3,000–$6,000 USD / month", es: "$3,000–$6,000 USD / mes" }, scores: { readiness: 15 }, tags: ["premium", "beach"], budgetTier: "premium" },
      { id: "premiumPlus", label: { en: "$6,000+ USD / month", es: "$6,000+ USD / mes" }, scores: { readiness: 15 }, tags: ["premium", "comfortable"], budgetTier: "premium" },
      { id: "notSure", label: { en: "I'm not sure yet", es: "Todavía no estoy seguro" }, scores: { readiness: 5 }, tags: ["exploratory"], budgetTier: "unknown" },
    ],
  },

  // ——— 9. Housing ———
  {
    id: "housing",
    question: { en: "What are you thinking about housing?", es: "¿Qué estás pensando sobre la vivienda?" },
    helper: { en: "There's no wrong door in — renting first is how most people start.", es: "No hay una puerta incorrecta — rentar primero es como empieza la mayoría." },
    type: "single-select",
    options: [
      { id: "rentFirst", label: { en: "Rent first, decide later", es: "Rentar primero, decidir después" }, scores: { readiness: 12 }, tags: [] },
      { id: "rent", label: { en: "Rent long-term", es: "Rentar a largo plazo" }, scores: { readiness: 12 }, tags: [] },
      { id: "buy", label: { en: "Buy a home", es: "Comprar una casa" }, scores: { readiness: 10 }, tags: [] },
      { id: "invest", label: { en: "Buy as an investment", es: "Comprar como inversión" }, scores: { readiness: 10 }, tags: ["premium"] },
      { id: "unsure", label: { en: "Not sure yet", es: "Aún no lo sé" }, scores: { readiness: 4 }, tags: ["exploratory"] },
    ],
  },

  // ——— 9a. CONDITIONAL — property intent (buy/invest) ———
  {
    id: "propertyIntent",
    showIf: { questionId: "housing", anyOf: ["buy", "invest"] },
    question: { en: "How are you thinking about that purchase?", es: "¿Cómo estás pensando esa compra?" },
    helper: { en: "General intention only — the details come later, with professionals.", es: "Solo la intención general — los detalles vienen después, con profesionales." },
    type: "single-select",
    options: [
      { id: "afterRenting", label: { en: "Buy after renting and getting to know the area", es: "Comprar después de rentar y conocer la zona" }, scores: { readiness: 0 }, tags: [] },
      { id: "soonAsPossible", label: { en: "Buy as soon as I find the right place", es: "Comprar en cuanto encuentre el lugar indicado" }, scores: { readiness: 0 }, tags: [] },
      { id: "incomeProperty", label: { en: "An income property or rental investment", es: "Una propiedad de ingresos o inversión en rentas" }, scores: { readiness: 0 }, tags: ["premium"] },
      { id: "justExploring", label: { en: "Just exploring what's possible", es: "Solo explorando lo que es posible" }, scores: { readiness: 0 }, tags: ["exploratory"] },
    ],
  },

  // ——— 10. Work / life in Mexico ———
  // V1's "lifeStage" question, evolved: same id, all five original option
  // ids preserved (archetypes in copy.js key off these), three added.
  {
    id: "lifeStage",
    question: { en: "What will your life or work look like in Mexico?", es: "¿Cómo será tu vida o trabajo en México?" },
    helper: { en: "Pick the one that fits closest.", es: "Elige la que más se ajuste." },
    type: "single-select",
    options: [
      { id: "retiree", label: { en: "Retired or semi-retired", es: "Jubilado o semi-jubilado" }, scores: { readiness: 15 }, tags: ["retirement", "quiet"] },
      { id: "remote", label: { en: "Working remotely or freelancing", es: "Trabajando remotamente o de forma independiente" }, scores: { readiness: 15 }, tags: ["remoteWork", "urban"] },
      { id: "entrepreneur", label: { en: "Starting or running a business", es: "Iniciando o dirigiendo un negocio" }, scores: { readiness: 15 }, tags: ["urban", "premium"] },
      { id: "investor", label: { en: "Managing investments or property", es: "Administrando inversiones o propiedades" }, scores: { readiness: 15 }, tags: ["premium"] },
      { id: "localJob", label: { en: "Working locally in Mexico", es: "Trabajando localmente en México" }, scores: { readiness: 12 }, tags: ["urban"] },
      { id: "family", label: { en: "Focused on family life", es: "Enfocado en la vida familiar" }, scores: { readiness: 12 }, tags: ["family", "quiet"] },
      { id: "sabbatical", label: { en: "A sabbatical or lifestyle change", es: "Un año sabático o cambio de vida" }, scores: { readiness: 8 }, tags: ["exploratory"] },
      { id: "freshStart", label: { en: "Still an open question", es: "Todavía es una pregunta abierta" }, scores: { readiness: 8 }, tags: ["exploratory"] },
    ],
  },

  // ——— 10a. CONDITIONAL — business intent ———
  {
    id: "businessIntent",
    showIf: { questionId: "lifeStage", anyOf: ["entrepreneur", "investor"] },
    question: { en: "What does the business side look like?", es: "¿Cómo se ve el lado del negocio?" },
    helper: { en: "", es: "" },
    type: "single-select",
    options: [
      { id: "existingBusiness", label: { en: "Operating my existing business from Mexico", es: "Operar mi negocio actual desde México" }, scores: { readiness: 0 }, tags: ["remoteWork"] },
      { id: "newBusiness", label: { en: "Starting something new in Mexico", es: "Iniciar algo nuevo en México" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "investing", label: { en: "Investing, not operating", es: "Invertir, no operar" }, scores: { readiness: 0 }, tags: ["premium"] },
      { id: "exploringBiz", label: { en: "Still exploring the options", es: "Todavía explorando las opciones" }, scores: { readiness: 0 }, tags: ["exploratory"] },
    ],
  },

  // ——— 11. Practical needs ———
  {
    id: "practicalNeeds",
    question: { en: "Which practical needs matter most?", es: "¿Qué necesidades prácticas importan más?" },
    helper: { en: "Choose everything that applies to your household.", es: "Elige todo lo que aplique a tu hogar." },
    type: "multi-select",
    options: [
      { id: "healthcare", label: { en: "Healthcare access", es: "Acceso a atención médica" }, scores: { readiness: 0 }, tags: [] },
      { id: "accessibility", label: { en: "Mobility / accessibility", es: "Movilidad / accesibilidad" }, scores: { readiness: 0 }, tags: [] },
      { id: "schools", label: { en: "Schools", es: "Escuelas" }, scores: { readiness: 0 }, tags: ["family"] },
      { id: "pets", label: { en: "Moving with pets", es: "Mudarme con mascotas" }, scores: { readiness: 0 }, tags: [] },
      { id: "vehicle", label: { en: "A vehicle", es: "Un vehículo" }, scores: { readiness: 0 }, tags: [] },
      { id: "internet", label: { en: "Reliable internet", es: "Internet confiable" }, scores: { readiness: 0 }, tags: ["remoteWork"] },
      { id: "airport", label: { en: "Being near an airport", es: "Estar cerca de un aeropuerto" }, scores: { readiness: 0 }, tags: [] },
      { id: "familyNeeds", label: { en: "Needs of family members", es: "Necesidades de familiares" }, scores: { readiness: 0 }, tags: ["family"] },
      { id: "none", label: { en: "Nothing major", es: "Nada importante" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 11a. CONDITIONAL — pets ———
  {
    id: "petDetails",
    showIf: { questionId: "practicalNeeds", anyOf: ["pets"] },
    question: { en: "Who's coming with you?", es: "¿Quién viene contigo?" },
    helper: { en: "Pets change flights, housing, and paperwork — worth knowing early.", es: "Las mascotas cambian vuelos, vivienda y trámites — vale la pena saberlo temprano." },
    type: "single-select",
    options: [
      { id: "smallPet", label: { en: "A small dog or cat (cabin-sized)", es: "Un perro pequeño o gato (tamaño cabina)" }, scores: { readiness: 0 }, tags: [] },
      { id: "largeDog", label: { en: "A larger dog", es: "Un perro más grande" }, scores: { readiness: 0 }, tags: [] },
      { id: "multiplePets", label: { en: "Multiple pets", es: "Varias mascotas" }, scores: { readiness: 0 }, tags: [] },
      { id: "otherPet", label: { en: "Something less common", es: "Algo menos común" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 11b. CONDITIONAL — vehicle ———
  {
    id: "vehiclePlan",
    showIf: { questionId: "practicalNeeds", anyOf: ["vehicle"] },
    question: { en: "What's your thinking on the vehicle?", es: "¿Qué piensas sobre el vehículo?" },
    helper: { en: "", es: "" },
    type: "single-select",
    options: [
      { id: "bringVehicle", label: { en: "Bring my current vehicle", es: "Traer mi vehículo actual" }, scores: { readiness: 0 }, tags: [] },
      { id: "buyInMexico", label: { en: "Buy one in Mexico", es: "Comprar uno en México" }, scores: { readiness: 0 }, tags: [] },
      { id: "carFree", label: { en: "Try living without one", es: "Intentar vivir sin uno" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "vehicleUndecided", label: { en: "Undecided", es: "Indeciso" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 11c. CONDITIONAL — healthcare access ———
  // Deliberately general: access needs only, never conditions or diagnoses.
  {
    id: "healthcareAccess",
    showIf: { questionId: "practicalNeeds", anyOf: ["healthcare", "accessibility"] },
    question: { en: "How close does good healthcare need to be?", es: "¿Qué tan cerca necesita estar una buena atención médica?" },
    helper: { en: "Just access — we'll never ask for medical details.", es: "Solo acceso — nunca te pediremos detalles médicos." },
    type: "single-select",
    options: [
      { id: "hospitalClose", label: { en: "Major hospitals close by, non-negotiable", es: "Hospitales importantes cerca, no negociable" }, scores: { readiness: 0 }, tags: ["urban"] },
      { id: "clinicNearby", label: { en: "Good clinics nearby, hospital within reach", es: "Buenas clínicas cerca, hospital a distancia razonable" }, scores: { readiness: 0 }, tags: ["comfortable"] },
      { id: "generalWellness", label: { en: "General wellness — flexible on distance", es: "Bienestar general — flexible con la distancia" }, scores: { readiness: 0 }, tags: [] },
    ],
  },

  // ——— 12. Concerns ———
  // Pure profile signal: no tags, no readiness. This is the question that
  // tells PTM which uncertainty the visitor is actually trying to resolve —
  // the results screen answers it directly (see ResultsFocus.js).
  {
    id: "concerns",
    question: { en: "What are you most uncertain about?", es: "¿Qué es lo que más incertidumbre te genera?" },
    helper: { en: "Choose up to two. This is what your results will speak to first.", es: "Elige hasta dos. Tus resultados hablarán de esto primero." },
    type: "multi-select",
    maxSelections: 2,
    options: [
      { id: "residency", label: { en: "Residency and paperwork", es: "Residencia y trámites" }, scores: { readiness: 0 }, tags: [] },
      { id: "rightPlace", label: { en: "Choosing the right place", es: "Elegir el lugar correcto" }, scores: { readiness: 0 }, tags: [] },
      { id: "money", label: { en: "Cost and budget", es: "Costo y presupuesto" }, scores: { readiness: 0 }, tags: [] },
      { id: "healthcare", label: { en: "Healthcare", es: "Atención médica" }, scores: { readiness: 0 }, tags: [] },
      { id: "housing", label: { en: "Finding housing", es: "Encontrar vivienda" }, scores: { readiness: 0 }, tags: [] },
      { id: "logistics", label: { en: "Moving my belongings", es: "Mudar mis pertenencias" }, scores: { readiness: 0 }, tags: [] },
      { id: "buying", label: { en: "Buying property safely", es: "Comprar propiedad con seguridad" }, scores: { readiness: 0 }, tags: [] },
      { id: "safety", label: { en: "Safety", es: "Seguridad" }, scores: { readiness: 0 }, tags: [] },
      { id: "language", label: { en: "Language", es: "El idioma" }, scores: { readiness: 0 }, tags: [] },
      { id: "adapting", label: { en: "Adapting to life in Mexico", es: "Adaptarme a la vida en México" }, scores: { readiness: 0 }, tags: [] },
      { id: "trustedHelp", label: { en: "Finding trustworthy professionals", es: "Encontrar profesionales confiables" }, scores: { readiness: 0 }, tags: [] },
      { id: "somethingElse", label: { en: "Something else", es: "Otra cosa" }, scores: { readiness: 0 }, tags: [] },
    ],
  },
];
