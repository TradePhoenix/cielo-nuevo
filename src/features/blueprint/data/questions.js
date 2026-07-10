// My Mexico Blueprint — questionnaire schema.
//
// Each question is single-select. Each option carries two independent signals:
//   - scores.readiness: points toward the overall 0-100 readiness score
//   - tags: qualitative signals used for archetype/city matching (recommendationEngine.js)
// Some options (budget question only) also carry a budgetTier used for roadmap branching.
//
// Adding, removing, or reweighting a question only requires editing this file —
// scoringEngine.js derives max-possible-points directly from whatever is here.

export const QUESTIONS = [
  {
    id: "timeline",
    question: "When are you hoping to move to Mexico?",
    helper: "There's no wrong answer — this just shapes your roadmap.",
    type: "single-select",
    options: [
      { id: "asap", label: "Within 6 months", scores: { readiness: 25 }, tags: ["urgent"] },
      { id: "6-12mo", label: "6–12 months", scores: { readiness: 18 }, tags: ["urgent"] },
      { id: "1-2y", label: "1–2 years", scores: { readiness: 10 }, tags: [] },
      { id: "exploring", label: "Just exploring for now", scores: { readiness: 3 }, tags: ["exploratory"] },
    ],
  },
  {
    id: "lifeStage",
    question: "What best describes your situation?",
    helper: "Pick the one that fits closest.",
    type: "single-select",
    options: [
      { id: "retiree", label: "Retiring or semi-retiring", scores: { readiness: 15 }, tags: ["retirement", "quiet"] },
      { id: "remote", label: "Working remotely or freelancing", scores: { readiness: 15 }, tags: ["remoteWork", "urban"] },
      { id: "family", label: "Relocating with family or kids", scores: { readiness: 12 }, tags: ["family", "quiet"] },
      { id: "entrepreneur", label: "Starting or running a business", scores: { readiness: 15 }, tags: ["urban", "premium"] },
      { id: "freshStart", label: "Wanting a fresh start", scores: { readiness: 8 }, tags: ["exploratory"] },
    ],
  },
  {
    id: "budget",
    question: "What's your realistic monthly budget for life in Mexico?",
    helper: "An honest estimate is more useful than an ideal one.",
    type: "single-select",
    options: [
      { id: "lean", label: "Under $1,500 USD", scores: { readiness: 8 }, tags: ["budgetConscious"], budgetTier: "lean" },
      { id: "comfortable", label: "$1,500–$3,000 USD", scores: { readiness: 15 }, tags: ["comfortable"], budgetTier: "comfortable" },
      { id: "premium", label: "$3,000+ USD", scores: { readiness: 15 }, tags: ["premium", "beach"], budgetTier: "premium" },
      { id: "notSure", label: "I'm not sure yet", scores: { readiness: 5 }, tags: ["exploratory"], budgetTier: "unknown" },
    ],
  },
  {
    id: "lifestyle",
    question: "What kind of setting appeals to you most?",
    helper: "",
    type: "single-select",
    options: [
      { id: "beachTown", label: "A laid-back beach town", scores: { readiness: 10 }, tags: ["beach", "quiet"] },
      { id: "cityEnergy", label: "A walkable city with energy and amenities", scores: { readiness: 10 }, tags: ["urban"] },
      { id: "quietNature", label: "Quiet, and surrounded by nature", scores: { readiness: 10 }, tags: ["quiet"] },
      { id: "notSure", label: "Not sure yet — open to guidance", scores: { readiness: 5 }, tags: ["exploratory"] },
    ],
  },
  {
    id: "household",
    question: "Who's making this move?",
    helper: "",
    type: "single-select",
    options: [
      { id: "solo", label: "Just me", scores: { readiness: 10 }, tags: [] },
      { id: "couple", label: "Me and a partner", scores: { readiness: 10 }, tags: [] },
      { id: "familyKids", label: "Family with kids", scores: { readiness: 8 }, tags: ["family"] },
      { id: "extended", label: "Multi-generational or extended family", scores: { readiness: 6 }, tags: ["family"] },
    ],
  },
  {
    id: "residencyFamiliarity",
    question: "How familiar are you with Mexico's residency process?",
    helper: "",
    type: "single-select",
    options: [
      { id: "researched", label: "I've already done some research", scores: { readiness: 15 }, tags: ["urgent"] },
      { id: "heardOf", label: "I've heard of it but don't know the details", scores: { readiness: 8 }, tags: [] },
      { id: "none", label: "Not familiar at all", scores: { readiness: 3 }, tags: ["exploratory"] },
    ],
  },
];
