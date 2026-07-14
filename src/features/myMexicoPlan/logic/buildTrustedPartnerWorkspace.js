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
const RELEVANCE_RULES = {
  insurance: ({ tagCounts }) => Boolean(tagCounts.comfortable || tagCounts.premium || tagCounts.retirement),
  "accounting-tax": ({ tagCounts }) => Boolean(tagCounts.retirement),
  "vehicle-transportation": ({ plan }) => plan.cityId === "riviera-maya",
};

const RELEVANCE_REASONS = {
  insurance: "Your budget and situation suggest private coverage is worth comparing.",
  "accounting-tax": "Retirement and pension income usually means this is worth confirming with a professional.",
  "vehicle-transportation": "Riviera Maya's day-to-day life mostly assumes you're driving.",
};

const UNIVERSAL_REASON = "Common for nearly every relocation to Mexico, regardless of your specific answers.";

function isRelevant(category, context) {
  if (category.relevance === "universal") return true;
  const rule = RELEVANCE_RULES[category.id];
  return rule ? rule(context) : false;
}

function relevanceReason(category) {
  if (category.relevance === "universal") return UNIVERSAL_REASON;
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
      relevanceReason: relevanceReason(category),
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
