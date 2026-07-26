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
    labelEs: "Infraestructura Y Conectividad",
    description: "Road access, utilities, and internet reliability for daily life and remote work.",
  },
  {
    key: "healthcare",
    label: "Healthcare Access",
    labelEs: "Acceso A Salud",
    description: "Proximity and quality of medical care, from routine visits to real emergencies.",
  },
  {
    key: "community",
    label: "Community & Integration",
    labelEs: "Comunidad E Integración",
    description: "How readily newcomers can build both local and expat community ties.",
  },
  {
    key: "livability",
    label: "Long-Term Livability",
    labelEs: "Habitabilidad A Largo Plazo",
    description: "Day-to-day sustainability — cost stability, services, and resilience to development pressure.",
  },
  {
    key: "readiness",
    label: "Readiness For Newcomers",
    labelEs: "Preparación Para Recién Llegados",
    description: "How much local support and orientation infrastructure already exists versus how much self-sufficiency the move demands.",
  },
];

const TIERS = [
  { min: 4.5, key: "highlyEstablished", label: "Highly Established", labelEs: "Altamente Establecido" },
  { min: 3.5, key: "wellEstablished", label: "Well-Established", labelEs: "Bien Establecido" },
  { min: 2.5, key: "developingSteadily", label: "Developing Steadily", labelEs: "En Desarrollo Constante" },
  { min: 1.5, key: "earlyStage", label: "Early-Stage", labelEs: "Etapa Temprana" },
  { min: 0, key: "frontier", label: "Frontier", labelEs: "Frontera" },
];

export function computePtmScore(factors) {
  const values = PTM_SCORE_FACTORS.map(({ key }) => factors[key]?.score).filter(
    (n) => typeof n === "number"
  );
  if (values.length === 0) return null;

  const overall = Math.round((values.reduce((sum, n) => sum + n, 0) / values.length) * 10) / 10;
  const matchedTier = TIERS.find((t) => overall >= t.min) || TIERS[TIERS.length - 1];
  return { overall, tier: matchedTier.label, tierEs: matchedTier.labelEs };
}

export const PTM_SCORE_METHODOLOGY_NOTE =
  "The PTM Score is Path To Mexico's own editorial fit assessment, built from five consistent factors we apply to every destination we cover. It reflects our team's research, travel, and relocation-industry experience — not a financial, investment, or real estate rating, and not a guarantee of future conditions. Conditions in any town can change; treat this as a starting point for your own research, not a substitute for it.";

export const PTM_SCORE_METHODOLOGY_NOTE_ES =
  "El PTM Score es la evaluación editorial de idoneidad propia de Path To Mexico, construida a partir de cinco factores consistentes que aplicamos a cada destino que cubrimos. Refleja la investigación de nuestro equipo, nuestros viajes y nuestra experiencia en el sector de reubicación — no es una calificación financiera, de inversión o inmobiliaria, ni una garantía de condiciones futuras. Las condiciones en cualquier pueblo pueden cambiar; considera esto un punto de partida para tu propia investigación, no un sustituto de ella.";
