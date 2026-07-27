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

export const DEFAULT_ARCHETYPE_ID = "freshStart";

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
