// My Mexico Plan — Trusted Partner & Connector Workspace engine. Same
// discipline as buildAdaptiveChecklist.js, buildReadinessAssessment.js,
// buildConciergeWorkspace.js, and buildRelocationTimeline.js: a pure
// function, fixed input, fixed output shape, no side effects.
//
// Truth constraints (ENG-021): this file never names a partner company,
// never invents an endorsement or certification, and never states legal,
// tax, or medical advice as fact. It also never implies Path To Mexico
// currently has a partner network — every category's `ownership` field
// is the same "self" / "pathToMexico" / "professional" taxonomy already
// established by taskBank.js and rendered by ConciergeWorkspace.js, and
// "pathToMexico" here means exactly what it means there: Path To Mexico
// can guide, coordinate, or make an introduction — not a guarantee of
// outcome, never a substitute for a licensed professional. The
// `partnerRecords` array on every category (see partnerCategories.js) is
// always empty today; it exists purely as the structural seam a future,
// real, verified partner list would populate without any UI redesign.
//
// Relevance is computed only from signals that already exist elsewhere
// in the codebase — scores.tagCounts (the same tag-overlap signal
// recommendationEngine.js and buildAdaptiveChecklist.js already use) and
// plan.cityId (the same city-specific gating taskBank.js already uses
// for tasks like riviera-car-reality). No new questionnaire field, no
// invented signal.
//
// This is the seam a future AI layer could enrich (e.g. a richer,
// model-generated `whyItMatters` per visitor, or real verified
// `partnerRecords`) without changing this file's output shape or the
// component that renders it.

import { PARTNER_CATEGORIES } from "../data/partnerCategories";

const OWNERSHIP_SECTIONS = [
  {
    id: "self",
    label: "General Planning Guidance",
    description: "Research and decisions you handle yourself — Path To Mexico is not involved in these.",
  },
  {
    id: "pathToMexico",
    label: "Path To Mexico Can Help Introduce",
    description:
      "Path To Mexico can guide you, coordinate on your behalf, or make a trusted introduction here — not a guarantee of outcome, and never a substitute for a licensed professional where one is required.",
  },
  {
    id: "professional",
    label: "Requires A Licensed Professional",
    description:
      "Legal, tax, medical, immigration, or real-estate matters that call for a qualified, licensed professional. Path To Mexico can help connect you with trusted options, but does not perform these services itself.",
  },
];

// Only categories marked "conditional" in partnerCategories.js are
// evaluated here; "universal" categories are relevant to every visitor
// relocating to Mexico by definition (residency status, housing,
// banking, and so on) and always included.
// DEST-001: the Yucatán Gulf coast towns (Progreso, Chicxulub Puerto,
// Telchac Puerto) are as spread-out and car-dependent as Riviera Maya —
// Mérida itself is deliberately excluded, since it's a real city with
// taxis and rideshare, not a driving-only town like its coastal
// neighbors.
//
// DEST-002: all four new destinations are car-dependent too, each for its
// own honest reason (see VEHICLE_TRANSPORTATION_REASONS below) — three
// smaller, more remote Gulf towns than any DEST-001 town, plus Santa
// Elena, an inland rural village with no rideshare/taxi infrastructure of
// its own. None of the four get Mérida's "real city" exception.
// DEST-003: of the 14 new destinations, Cancún (real city, rideshare
// available, same exception as Mérida), Puerto Morelos and Cozumel
// (walkable cores with real local infrastructure) and Valladolid (a real
// small city with growing infrastructure, same exception as Mérida) are
// deliberately excluded — everything else genuinely assumes driving, each
// for its own reason documented in VEHICLE_TRANSPORTATION_REASONS below.
const CAR_DEPENDENT_CITY_IDS = new Set([
  "riviera-maya",
  "progreso",
  "chicxulub-puerto",
  "telchac-puerto",
  "celestun",
  "sisal",
  "dzilam-de-bravo",
  "santa-elena",
  "bacalar",
  "mahahual",
  "akumal",
  "izamal",
  "tekax",
  "tizimin",
  "chelem",
  "chuburna-puerto",
  "el-cuyo",
  "rio-lagartos",
]);

const RELEVANCE_RULES = {
  insurance: ({ tagCounts }) => Boolean(tagCounts.comfortable || tagCounts.premium || tagCounts.retirement),
  "accounting-tax": ({ tagCounts }) => Boolean(tagCounts.retirement),
  "vehicle-transportation": ({ plan }) => CAR_DEPENDENT_CITY_IDS.has(plan.cityId),
};

const VEHICLE_TRANSPORTATION_REASONS = {
  "riviera-maya": "Riviera Maya's day-to-day life mostly assumes you're driving.",
  progreso: "Progreso is spread out enough that day-to-day life mostly assumes you're driving.",
  "chicxulub-puerto": "Chicxulub Puerto's small, spread-out layout mostly assumes you're driving.",
  "telchac-puerto": "Telchac Puerto's seclusion means day-to-day life mostly assumes you're driving.",
  celestun: "Celestún's small scale and distance from Mérida mean day-to-day life mostly assumes you're driving.",
  sisal: "Sisal's connection to Mérida and everyday errands beyond the village mostly assume you're driving.",
  "dzilam-de-bravo": "Dzilam de Bravo's remoteness means day-to-day life mostly assumes you're driving.",
  "santa-elena": "Santa Elena is an inland rural village with no local rideshare or taxi infrastructure — day-to-day life mostly assumes you're driving.",
  bacalar: "Bacalar's lagoon-centered town means errands beyond the basics mostly assume you're driving.",
  mahahual: "Mahahual's remote Costa Maya location mostly assumes you're driving for anything beyond the village itself.",
  akumal: "Akumal's small scale means errands beyond the immediate bay area mostly assume you're driving.",
  izamal: "Izamal is a small Pueblo Mágico with no local rideshare or taxi infrastructure — day-to-day life mostly assumes you're driving.",
  tekax: "Tekax's working agricultural-town layout mostly assumes you're driving.",
  tizimin: "Tizimín's role as a spread-out regional hub mostly assumes you're driving.",
  chelem: "Chelem's small, spread-out layout mostly assumes you're driving.",
  "chuburna-puerto": "Chuburná Puerto's remoteness from Progreso mostly assumes you're driving.",
  "el-cuyo": "El Cuyo's remote northern-coast location mostly assumes you're driving.",
  "rio-lagartos": "Río Lagartos's remoteness means day-to-day life mostly assumes you're driving.",
};

const RELEVANCE_REASONS = {
  insurance: "Your budget and situation suggest private coverage is worth comparing.",
  "accounting-tax": "Retirement and pension income usually means this is worth confirming with a professional.",
};

const UNIVERSAL_REASON = "Common for nearly every relocation to Mexico, regardless of your specific answers.";

function isRelevant(category, context) {
  if (category.relevance === "universal") return true;
  const rule = RELEVANCE_RULES[category.id];
  return rule ? rule(context) : false;
}

function relevanceReason(category, context) {
  if (category.relevance === "universal") return UNIVERSAL_REASON;
  if (category.id === "vehicle-transportation") {
    return VEHICLE_TRANSPORTATION_REASONS[context.plan.cityId] || "Relevant based on your own Blueprint answers.";
  }
  return RELEVANCE_REASONS[category.id] || "Relevant based on your own Blueprint answers.";
}

// plan: buildPlan.js's output (already filtered to this visitor/city).
// scores: decisionEngine's useBlueprintAnswers() scores — read only for
// tagCounts, the same signal already used elsewhere.
export function buildTrustedPartnerWorkspace({ plan, scores }) {
  const tagCounts = (scores && scores.tagCounts) || {};
  const context = { tagCounts, plan };

  const relevantCategories = PARTNER_CATEGORIES.filter((category) => isRelevant(category, context)).map(
    (category) => ({
      ...category,
      relevanceReason: relevanceReason(category, context),
      canIntroduce: category.ownership !== "self",
    })
  );

  const sections = OWNERSHIP_SECTIONS.map((section) => ({
    ...section,
    categories: relevantCategories.filter((category) => category.ownership === section.id),
  }));

  return {
    cityName: plan.cityName,
    disclaimer:
      "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate. This workspace is planning guidance, not a directory of vetted partners — Path To Mexico does not yet have a verified partner network in every category shown below.",
    totalCategoryCount: relevantCategories.length,
    sections,
  };
}
