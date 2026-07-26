// DEST-003 — PTM Score: Path To Mexico's editorial fit assessment.
//
// This is explicitly NOT a financial rating, investment grade, or predictor
// of returns — see WorkWithPathToMexicoPage.js's existing disclaimer ("We are
// not a law firm, immigration agency, tax advisor, financial advisor, or real
// estate brokerage"). It is a transparent, consistent editorial framework for
// comparing how ready and livable a destination is *today*, using the same
// five factors for every one of the 25 destinations so a comparison across
// any two of them is meaningful rather than arbitrary.
//
// `overall`/`tier` are always computed from `factors`, never hand-typed on a
// city record — this is the single source of truth so 25 entries can never
// drift out of arithmetic sync with their own inputs.

export const PTM_SCORE_FACTORS = [
  {
    key: "infrastructure",
    label: "Infrastructure & Connectivity",
    description: "Road access, utilities, and internet reliability for daily life and remote work.",
  },
  {
    key: "healthcare",
    label: "Healthcare Access",
    description: "Proximity and quality of medical care, from routine visits to real emergencies.",
  },
  {
    key: "community",
    label: "Community & Integration",
    description: "How readily newcomers can build both local and expat community ties.",
  },
  {
    key: "livability",
    label: "Long-Term Livability",
    description: "Day-to-day sustainability — cost stability, services, and resilience to development pressure.",
  },
  {
    key: "readiness",
    label: "Readiness For Newcomers",
    description: "How much local support and orientation infrastructure already exists versus how much self-sufficiency the move demands.",
  },
];

const TIERS = [
  { min: 4.5, label: "Highly Established" },
  { min: 3.5, label: "Well-Established" },
  { min: 2.5, label: "Developing Steadily" },
  { min: 1.5, label: "Early-Stage" },
  { min: 0, label: "Frontier" },
];

export function computePtmScore(factors) {
  const values = PTM_SCORE_FACTORS.map(({ key }) => factors[key]?.score).filter(
    (n) => typeof n === "number"
  );
  if (values.length === 0) return null;

  const overall = Math.round((values.reduce((sum, n) => sum + n, 0) / values.length) * 10) / 10;
  const tier = TIERS.find((t) => overall >= t.min)?.label || "Frontier";
  return { overall, tier };
}

export const PTM_SCORE_METHODOLOGY_NOTE =
  "The PTM Score is Path To Mexico's own editorial fit assessment, built from five consistent factors we apply to every destination we cover. It reflects our team's research, travel, and relocation-industry experience — not a financial, investment, or real estate rating, and not a guarantee of future conditions. Conditions in any town can change; treat this as a starting point for your own research, not a substitute for it.";

export const PTM_SCORE_METHODOLOGY_NOTE_ES =
  "El PTM Score es la evaluación editorial de idoneidad propia de Path To Mexico, construida a partir de cinco factores consistentes que aplicamos a cada destino que cubrimos. Refleja la investigación de nuestro equipo, nuestros viajes y nuestra experiencia en el sector de reubicación — no es una calificación financiera, de inversión o inmobiliaria, ni una garantía de condiciones futuras. Las condiciones en cualquier pueblo pueden cambiar; considera esto un punto de partida para tu propia investigación, no un sustituto de ella.";
