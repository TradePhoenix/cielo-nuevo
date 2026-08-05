// My Mexico Blueprint — narrative copy and templates.
//
// Nothing in this file is per-user text. recommendationEngine.js assembles
// the final result by selecting and combining these fixed pieces based on
// the visitor's answers — the personalization comes from *which* pieces get
// picked, not from generated prose.
//
// PTM Spanish-parity pass: every text field here became `{ en, es }`.
// recommendationEngine.js resolves these against its own `lang` parameter
// (default "en") when it assembles a recommendation, so its return shape
// (`archetype.title`, `readinessLabel.label`, `cta.headline`, etc.) stays
// exactly the same fields UI components already read — only the string
// values change per visitor language.

// Keyed directly by the `lifeStage` question's option id (questions.js) —
// the most direct available signal for "who this person is."
export const ARCHETYPES = {
  retiree: {
    id: "retiree",
    title: { en: "The Next Chapter", es: "El Siguiente Capítulo" },
    description: {
      en: "You're not chasing a vacation — you're building a slower, more deliberate life. Healthcare, community, and stability matter more to you than nightlife.",
      es: "No estás buscando unas vacaciones — estás construyendo una vida más lenta y deliberada. La salud, la comunidad y la estabilidad te importan más que la vida nocturna.",
    },
  },
  remote: {
    id: "remote",
    title: { en: "The Remote Builder", es: "El Constructor Remoto" },
    description: {
      en: "Your work already travels with you. What you need is reliable infrastructure, a community of people doing the same thing, and a place that feels like home between trips.",
      es: "Tu trabajo ya viaja contigo. Lo que necesitas es infraestructura confiable, una comunidad de personas haciendo lo mismo y un lugar que se sienta como casa entre viajes.",
    },
  },
  family: {
    id: "family",
    title: { en: "The Family Reset", es: "El Nuevo Comienzo Familiar" },
    description: {
      en: "This move is bigger than you — it's about the life your family gets to live. Stability, schools, and community come first.",
      es: "Esta mudanza es más grande que tú — se trata de la vida que tu familia podrá vivir. La estabilidad, las escuelas y la comunidad son lo primero.",
    },
  },
  entrepreneur: {
    id: "entrepreneur",
    title: { en: "The Founder's Move", es: "La Mudanza Del Fundador" },
    description: {
      en: "You're not just relocating your life, you're relocating your ambition. You need a place that supports both the business and the lifestyle.",
      es: "No solo estás reubicando tu vida, estás reubicando tu ambición. Necesitas un lugar que apoye tanto el negocio como el estilo de vida.",
    },
  },
  freshStart: {
    id: "freshStart",
    title: { en: "The Clean Slate", es: "La Página En Blanco" },
    description: {
      en: "You don't have every detail figured out yet, and that's fine. You're looking for a different rhythm of life more than a specific plan.",
      es: "Todavía no tienes cada detalle resuelto, y está bien. Buscas un ritmo de vida diferente más que un plan específico.",
    },
  },
};

// V2 — archetypes for the three lifeStage options added in Blueprint V2
// (questions.js). Existing archetypes and their ids are untouched.
ARCHETYPES.investor = {
  id: "investor",
  title: { en: "The Deliberate Investor", es: "El Inversionista Deliberado" },
  description: {
    en: "You think in assets and outcomes, but this isn't only a transaction — you're choosing a place your money and your life can both live well.",
    es: "Piensas en activos y resultados, pero esto no es solo una transacción — estás eligiendo un lugar donde tu dinero y tu vida puedan vivir bien.",
  },
};
ARCHETYPES.localJob = {
  id: "localJob",
  title: { en: "The Local Builder", es: "El Constructor Local" },
  description: {
    en: "You're not arriving to observe Mexico from a distance — you plan to work inside it. That takes more paperwork and more language, and it builds the deepest roots.",
    es: "No llegas a observar México desde lejos — planeas trabajar dentro de él. Eso requiere más trámites y más idioma, y construye las raíces más profundas.",
  },
};
ARCHETYPES.sabbatical = {
  id: "sabbatical",
  title: { en: "The Intentional Pause", es: "La Pausa Intencional" },
  description: {
    en: "This chapter is about stepping back on purpose. The right place gives you room to breathe without cutting you off from what's next.",
    es: "Este capítulo se trata de detenerte a propósito. El lugar correcto te da espacio para respirar sin desconectarte de lo que sigue.",
  },
};

export const DEFAULT_ARCHETYPE_ID = "freshStart";

// V2 — one honest response per possible "concerns" answer (questions.js).
// These are the results screen's direct reply to what the visitor said they
// were most uncertain about. Deliberately honest: where something depends on
// individual circumstances or licensed professionals, the copy says so —
// nothing here claims or implies eligibility for anything.
export const CONCERN_RESPONSES = {
  residency: {
    title: { en: "Residency and paperwork", es: "Residencia y trámites" },
    body: {
      en: "Residency runs on rules that depend on your specific circumstances — income, savings, family ties. That's licensed-professional territory, and pointing you to the right one at the right moment is part of what PTM is for. What we can tell you now: the process is well-trodden, and starting it informed beats starting it fast.",
      es: "La residencia funciona con reglas que dependen de tus circunstancias específicas — ingresos, ahorros, lazos familiares. Ese es territorio de profesionales acreditados, y orientarte hacia el indicado en el momento indicado es parte de lo que PTM hace. Lo que sí podemos decirte ahora: el proceso está bien recorrido, y empezarlo informado vale más que empezarlo rápido.",
    },
  },
  rightPlace: {
    title: { en: "Choosing the right place", es: "Elegir el lugar correcto" },
    body: {
      en: "This is exactly what your matches below are for — and they're built from what you actually said matters, not from what photographs best. The honest next step is time on the ground in your top match, in the hottest month you can manage.",
      es: "Para esto existen exactamente tus coincidencias de abajo — construidas con lo que dijiste que te importa, no con lo que mejor se fotografía. El siguiente paso honesto es pasar tiempo en tu mejor coincidencia, en el mes más caluroso que puedas.",
    },
  },
  money: {
    title: { en: "Cost and budget", es: "Costo y presupuesto" },
    body: {
      en: "Location changes the math more than lifestyle does — the same budget lives very differently across the Peninsula. Your matches already account for the budget band you gave us.",
      es: "La ubicación cambia las cuentas más que el estilo de vida — el mismo presupuesto vive muy diferente según el lugar de la Península. Tus coincidencias ya consideran el rango de presupuesto que nos diste.",
    },
  },
  healthcare: {
    title: { en: "Healthcare", es: "Atención médica" },
    body: {
      en: "Private healthcare in the Peninsula's cities is genuinely good, and distance to it is a real factor between destinations. Coverage and personal needs deserve early, honest answers — that conversation is part of a Fit Call.",
      es: "La atención médica privada en las ciudades de la Península es genuinamente buena, y la distancia hacia ella es un factor real entre destinos. La cobertura y las necesidades personales merecen respuestas tempranas y honestas — esa conversación es parte de una Fit Call.",
    },
  },
  housing: {
    title: { en: "Finding housing", es: "Encontrar vivienda" },
    body: {
      en: "Renting first is how most people get this right — it turns the biggest decision into a reversible one. The rental market works differently here, and knowing the local norms protects you.",
      es: "Rentar primero es como la mayoría acierta — convierte la decisión más grande en una reversible. El mercado de rentas funciona diferente aquí, y conocer las normas locales te protege.",
    },
  },
  logistics: {
    title: { en: "Moving your belongings", es: "Mudar tus pertenencias" },
    body: {
      en: "The honest math surprises most people: shipping less and buying locally often wins. It's a decision to run with real numbers, not assumptions — and it comes later than you'd think.",
      es: "Las cuentas honestas sorprenden a la mayoría: enviar menos y comprar localmente suele ganar. Es una decisión para tomar con números reales, no con suposiciones — y llega más tarde de lo que crees.",
    },
  },
  buying: {
    title: { en: "Buying property safely", es: "Comprar propiedad con seguridad" },
    body: {
      en: "Buying safely in Mexico is absolutely doable — with the right professionals, in the right order, and almost never as your first move. Our standing advice is rent first; the market will still be there in a year.",
      es: "Comprar con seguridad en México es totalmente posible — con los profesionales correctos, en el orden correcto, y casi nunca como tu primer paso. Nuestro consejo permanente es rentar primero; el mercado seguirá ahí en un año.",
    },
  },
  safety: {
    title: { en: "Safety", es: "Seguridad" },
    body: {
      en: "It's a fair question, and the Peninsula has a genuinely different reality than the headlines suggest — Yucatán state consistently ranks among Mexico's safest. Like anywhere, the honest answer is specific to each place, and we'll always give it to you that way.",
      es: "Es una pregunta justa, y la Península tiene una realidad genuinamente distinta a la de los titulares — el estado de Yucatán se ubica consistentemente entre los más seguros de México. Como en todas partes, la respuesta honesta es específica de cada lugar, y siempre te la daremos así.",
    },
  },
  language: {
    title: { en: "Language", es: "El idioma" },
    body: {
      en: "You can land with little Spanish in the more established destinations — but the life you're imagining opens up with the language. We treat learning it as part of arriving well, not an optional extra.",
      es: "Puedes llegar con poco español a los destinos más establecidos — pero la vida que imaginas se abre con el idioma. Tratamos aprenderlo como parte de llegar bien, no como un extra opcional.",
    },
  },
  adapting: {
    title: { en: "Adapting to life in Mexico", es: "Adaptarte a la vida en México" },
    body: {
      en: "The people who thrive here arrive as neighbours, not visitors — curious, patient, and willing to let Mexico be Mexico. That mindset matters more than any checklist, and it's the one thing no one can arrange for you.",
      es: "Quienes prosperan aquí llegan como vecinos, no como visitantes — curiosos, pacientes y dispuestos a dejar que México sea México. Esa mentalidad importa más que cualquier lista, y es lo único que nadie puede arreglar por ti.",
    },
  },
  trustedHelp: {
    title: { en: "Finding trustworthy professionals", es: "Encontrar profesionales confiables" },
    body: {
      en: "This is the fear we take most seriously — it's why PTM only points people toward professionals we've actually vetted, and why we tell you plainly when something is outside our lane.",
      es: "Este es el temor que más en serio tomamos — por eso PTM solo orienta hacia profesionales que realmente hemos verificado, y por eso te decimos con claridad cuando algo está fuera de nuestro terreno.",
    },
  },
  somethingElse: {
    title: { en: "The question you didn't see listed", es: "La pregunta que no viste en la lista" },
    body: {
      en: "Whatever it is, it deserves a real answer instead of a category. Bring it to a Fit Call — the odd questions are usually the important ones.",
      es: "Sea lo que sea, merece una respuesta real y no una categoría. Llévala a una Fit Call — las preguntas raras suelen ser las importantes.",
    },
  },
};

// Ranges are inclusive on both ends; checked in order, first match wins.
export const READINESS_LABELS = [
  {
    min: 80,
    max: 100,
    label: { en: "Ready To Move", es: "Listo Para Mudarte" },
    blurb: {
      en: "You've thought this through. The next step is putting real dates and numbers behind it — that's exactly what a Fit Call is for.",
      es: "Ya lo has pensado bien. El siguiente paso es ponerle fechas y números reales — para eso sirve exactamente una Fit Call.",
    },
  },
  {
    min: 55,
    max: 79,
    label: { en: "Getting Close", es: "Cada Vez Más Cerca" },
    blurb: {
      en: "You have real momentum. A short conversation now can close the gap between where you are and an actual plan.",
      es: "Tienes un impulso real. Una conversación breve ahora puede cerrar la brecha entre dónde estás y un plan concreto.",
    },
  },
  {
    min: 30,
    max: 54,
    label: { en: "Early Planning", es: "Planeación Temprana" },
    blurb: {
      en: "You're in the research phase — which is exactly where the best decisions get made. Talking it through early can save you months.",
      es: "Estás en la fase de investigación — que es exactamente donde se toman las mejores decisiones. Hablarlo desde temprano puede ahorrarte meses.",
    },
  },
  {
    min: 0,
    max: 29,
    label: { en: "Just Getting Started", es: "Apenas Empezando" },
    blurb: {
      en: "You're at the very beginning, and that's a perfectly good place to be. Even one honest conversation now can make the next year clearer.",
      es: "Estás apenas comenzando, y es un buen lugar para estar. Incluso una conversación honesta ahora puede hacer que el próximo año se vea más claro.",
    },
  },
];

// Base roadmap mirrors the "Talk / Plan / Connect / Settle" framing already
// used on the homepage, so the Blueprint feels like part of the same brand
// rather than a bolted-on tool. `urgentBoost` is prepended when the visitor's
// answers signal urgency (see recommendationEngine.js).
export const ROADMAP_TEMPLATES = {
  urgentBoost: {
    id: "book-now",
    title: { en: "Book Your Fit Call", es: "Reserva Tu Fit Call" },
    description: {
      en: "With your timeline, the highest-leverage next step is a real conversation, not more research.",
      es: "Con tu cronograma, el siguiente paso de mayor impacto es una conversación real, no más investigación.",
    },
  },
  base: [
    {
      id: "talk",
      title: { en: "Talk", es: "Hablar" },
      description: {
        en: "Start with your goals, budget, timeline, and what kind of life you want in Mexico.",
        es: "Empieza con tus metas, presupuesto, cronograma y el tipo de vida que quieres en México.",
      },
    },
    {
      id: "plan",
      title: { en: "Plan", es: "Planear" },
      description: {
        en: "Map your best relocation path, including neighborhoods, rentals, residency, and priorities.",
        es: "Traza tu mejor ruta de reubicación, incluyendo colonias, rentas, residencia y prioridades.",
      },
    },
    {
      id: "connect",
      title: { en: "Connect", es: "Conectar" },
      description: {
        en: "Get pointed toward trusted local professionals, agents, and service providers when needed.",
        es: "Te orientamos hacia profesionales locales de confianza, agentes y proveedores de servicios cuando sea necesario.",
      },
    },
    {
      id: "settle",
      title: { en: "Settle", es: "Establecerte" },
      description: {
        en: "Move forward with more clarity, fewer surprises, and people already on the ground.",
        es: "Avanza con más claridad, menos sorpresas y personas ya presentes en el terreno.",
      },
    },
  ],
};

// buttonLabel is fixed on purpose — it matches the site's single, established
// primary-CTA copy ("Book A Mexico Fit Call"). Only the framing around it varies.
export const CTA_COPY = {
  urgent: {
    headline: { en: "You're ready. Let's make it real.", es: "Estás listo. Hagámoslo realidad." },
    subtext: {
      en: "A Mexico Fit Call turns your blueprint into an actual plan — dates, budget, and next steps.",
      es: "Una Mexico Fit Call convierte tu blueprint en un plan real — fechas, presupuesto y próximos pasos.",
    },
    buttonLabel: { en: "Book A Mexico Fit Call", es: "Reservar Una Mexico Fit Call" },
  },
  exploratory: {
    headline: { en: "You don't need every answer today.", es: "No necesitas todas las respuestas hoy." },
    subtext: {
      en: "A Mexico Fit Call is a low-pressure way to talk through what you're exploring, with someone who's done it.",
      es: "Una Mexico Fit Call es una forma sin presión de hablar sobre lo que estás explorando, con alguien que ya lo ha vivido.",
    },
    buttonLabel: { en: "Book A Mexico Fit Call", es: "Reservar Una Mexico Fit Call" },
  },
};

// Human-readable phrases used to build "why this city matches" sentences
// from a visitor's overlapping tags. See recommendationEngine.js.
export const TAG_LABELS = {
  beach: { en: "love of beach life", es: "amor por la vida de playa" },
  quiet: { en: "preference for a slower pace", es: "preferencia por un ritmo más tranquilo" },
  urban: { en: "pull toward walkable city energy", es: "atracción hacia la energía caminable de ciudad" },
  family: { en: "family-first priorities", es: "prioridades centradas en la familia" },
  remoteWork: { en: "need for remote-work flexibility", es: "necesidad de flexibilidad para trabajo remoto" },
  premium: { en: "comfortable budget", es: "presupuesto cómodo" },
  budgetConscious: { en: "budget-conscious approach", es: "enfoque consciente del presupuesto" },
  comfortable: { en: "comfortable budget", es: "presupuesto cómodo" },
  retirement: { en: "retirement lifestyle", es: "estilo de vida de jubilación" },
  urgent: { en: "readiness to move soon", es: "disposición para mudarte pronto" },
  exploratory: { en: "still-exploring mindset", es: "mentalidad de aún estar explorando" },
  // BP-002 — added alongside the placeCharacter question (questions.js);
  // see docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md.
  heritage: { en: "interest in local culture and history", es: "interés en la cultura e historia local" },
  natureFirst: { en: "pull toward nature and wildlife", es: "atracción hacia la naturaleza y la vida silvestre" },
  remote: { en: "desire for true remoteness", es: "deseo de verdadero aislamiento" },
  // DEST-003 — always co-selected with "remote" on the same placeCharacter
  // option (questions.js); see that file's comment for why. Never its own
  // visible questionnaire choice.
  frontier: { en: "pull toward genuinely off-the-grid places", es: "atracción hacia lugares genuinamente aislados" },
};

// "Matches your X and Y." template — used by recommendationEngine.js's
// buildMatchReason(), which otherwise had no localizable place to build
// this sentence from (it only ever combined TAG_LABELS values before).
export const MATCH_REASON_TEMPLATES = {
  default: { en: "A well-rounded option worth exploring.", es: "Una opción equilibrada que vale la pena explorar." },
  withTags: {
    en: (phrases) => `Matches your ${phrases.join(" and ")}.`,
    es: (phrases) => `Coincide con tu ${phrases.join(" y tu ")}.`,
  },
};
