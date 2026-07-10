// My Mexico Blueprint — narrative copy and templates.
//
// Nothing in this file is per-user text. recommendationEngine.js assembles
// the final result by selecting and combining these fixed pieces based on
// the visitor's answers — the personalization comes from *which* pieces get
// picked, not from generated prose.

// Keyed directly by the `lifeStage` question's option id (questions.js) —
// the most direct available signal for "who this person is."
export const ARCHETYPES = {
  retiree: {
    id: "retiree",
    title: "The Next Chapter",
    description:
      "You're not chasing a vacation — you're building a slower, more deliberate life. Healthcare, community, and stability matter more to you than nightlife.",
  },
  remote: {
    id: "remote",
    title: "The Remote Builder",
    description:
      "Your work already travels with you. What you need is reliable infrastructure, a community of people doing the same thing, and a place that feels like home between trips.",
  },
  family: {
    id: "family",
    title: "The Family Reset",
    description:
      "This move is bigger than you — it's about the life your family gets to live. Stability, schools, and community come first.",
  },
  entrepreneur: {
    id: "entrepreneur",
    title: "The Founder's Move",
    description:
      "You're not just relocating your life, you're relocating your ambition. You need a place that supports both the business and the lifestyle.",
  },
  freshStart: {
    id: "freshStart",
    title: "The Clean Slate",
    description:
      "You don't have every detail figured out yet, and that's fine. You're looking for a different rhythm of life more than a specific plan.",
  },
};

export const DEFAULT_ARCHETYPE_ID = "freshStart";

// Ranges are inclusive on both ends; checked in order, first match wins.
export const READINESS_LABELS = [
  {
    min: 80,
    max: 100,
    label: "Ready To Move",
    blurb:
      "You've thought this through. The next step is putting real dates and numbers behind it — that's exactly what a Fit Call is for.",
  },
  {
    min: 55,
    max: 79,
    label: "Getting Close",
    blurb:
      "You have real momentum. A short conversation now can close the gap between where you are and an actual plan.",
  },
  {
    min: 30,
    max: 54,
    label: "Early Planning",
    blurb:
      "You're in the research phase — which is exactly where the best decisions get made. Talking it through early can save you months.",
  },
  {
    min: 0,
    max: 29,
    label: "Just Getting Started",
    blurb:
      "You're at the very beginning, and that's a perfectly good place to be. Even one honest conversation now can make the next year clearer.",
  },
];

// Base roadmap mirrors the "Talk / Plan / Connect / Settle" framing already
// used on the homepage, so the Blueprint feels like part of the same brand
// rather than a bolted-on tool. `urgentBoost` is prepended when the visitor's
// answers signal urgency (see recommendationEngine.js).
export const ROADMAP_TEMPLATES = {
  urgentBoost: {
    id: "book-now",
    title: "Book Your Fit Call",
    description: "With your timeline, the highest-leverage next step is a real conversation, not more research.",
  },
  base: [
    {
      id: "talk",
      title: "Talk",
      description: "Start with your goals, budget, timeline, and what kind of life you want in Mexico.",
    },
    {
      id: "plan",
      title: "Plan",
      description: "Map your best relocation path, including neighborhoods, rentals, residency, and priorities.",
    },
    {
      id: "connect",
      title: "Connect",
      description: "Get pointed toward trusted local professionals, agents, and service providers when needed.",
    },
    {
      id: "settle",
      title: "Settle",
      description: "Move forward with more clarity, fewer surprises, and people already on the ground.",
    },
  ],
};

// buttonLabel is fixed on purpose — it matches the site's single, established
// primary-CTA copy ("Book A Mexico Fit Call"). Only the framing around it varies.
export const CTA_COPY = {
  urgent: {
    headline: "You're ready. Let's make it real.",
    subtext: "A Mexico Fit Call turns your blueprint into an actual plan — dates, budget, and next steps.",
    buttonLabel: "Book A Mexico Fit Call",
  },
  exploratory: {
    headline: "You don't need every answer today.",
    subtext: "A Mexico Fit Call is a low-pressure way to talk through what you're exploring, with someone who's done it.",
    buttonLabel: "Book A Mexico Fit Call",
  },
};

// Human-readable phrases used to build "why this city matches" sentences
// from a visitor's overlapping tags. See recommendationEngine.js.
export const TAG_LABELS = {
  beach: "love of beach life",
  quiet: "preference for a slower pace",
  urban: "pull toward walkable city energy",
  family: "family-first priorities",
  remoteWork: "need for remote-work flexibility",
  premium: "comfortable budget",
  budgetConscious: "budget-conscious approach",
  comfortable: "comfortable budget",
  retirement: "retirement lifestyle",
  urgent: "readiness to move soon",
  exploratory: "still-exploring mindset",
};
