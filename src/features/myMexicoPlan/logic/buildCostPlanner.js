// My Mexico Plan — Cost Planner engine. Same discipline as
// buildDecisionBrief.js and buildDashboardSummary.js: a pure function,
// fixed input, fixed output shape, no side effects, no AI, no live
// pricing lookups. Every category range is either copied directly from
// costOfLivingBaseline.js (itself sourced from real, already-published
// guides) or derived from that data using an assumption that is returned
// alongside the number, never hidden inside it.
//
// This is the seam a future AI layer could enrich (e.g. richer per-city
// commentary) without changing the underlying deterministic ranges or
// this file's output shape.

import {
  OVERALL_BUDGET_RANGES,
  HOUSING_BY_UNIT,
  UTILITIES_RANGE,
  GROCERIES_BY_HOUSEHOLD,
  TAXI_RIDE_RANGE,
  ASSUMED_RIDES_PER_MONTH,
  DOCTOR_VISIT_RANGE,
  ASSUMED_MONTHLY_HEALTHCARE_BUFFER,
  LIFESTYLE_DISCRETIONARY_BY_TIER,
  GUIDE_LINKS,
  CITY_COST_DIRECTION,
} from "../data/costOfLivingBaseline";

const FAMILY_HOUSEHOLDS = ["familyKids", "extended"];

function pickHousingUnit(budgetTier, household) {
  const isFamily = FAMILY_HOUSEHOLDS.includes(household);
  if (budgetTier === "lean") return isFamily ? "oneBedroom" : "studio";
  if (budgetTier === "premium") return isFamily ? "luxury" : "twoBedroom";
  // "comfortable" and "unknown" both default to the same mid-range pick.
  return isFamily ? "twoBedroom" : "oneBedroom";
}

function buildHousing(budgetTier, household) {
  const unitId = pickHousingUnit(budgetTier, household);
  const unit = HOUSING_BY_UNIT[unitId];
  return {
    id: "housing",
    label: "Housing",
    range: { low: unit.low, high: unit.high },
    note: `Based on the published ${unit.label.toLowerCase()} range for Playa del Carmen.`,
    guideLink: GUIDE_LINKS.rentingVsBuying,
  };
}

function buildUtilities() {
  return {
    id: "utilities",
    label: "Utilities",
    range: { ...UTILITIES_RANGE },
    note: "Electricity, internet, and gas combined. Air-conditioning use is the single biggest swing factor.",
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

function buildGroceries(household) {
  if (household === "solo") {
    return { id: "groceries", label: "Groceries", range: { ...GROCERIES_BY_HOUSEHOLD.solo }, note: "Based on the published solo grocery range.", guideLink: GUIDE_LINKS.groceryCosts };
  }
  if (household === "couple") {
    return { id: "groceries", label: "Groceries", range: { ...GROCERIES_BY_HOUSEHOLD.couple }, note: "Based on the published couple grocery range.", guideLink: GUIDE_LINKS.groceryCosts };
  }
  // No published figure exists for a family/extended household's grocery
  // spending — an honest gap, not a guess.
  return {
    id: "groceries",
    label: "Groceries",
    range: null,
    note: "Needs personal verification — published grocery figures only cover solo and couple households.",
    guideLink: GUIDE_LINKS.groceryCosts,
  };
}

function buildTransportation(budgetTier) {
  const rides = ASSUMED_RIDES_PER_MONTH[budgetTier] || ASSUMED_RIDES_PER_MONTH.comfortable;
  return {
    id: "transportation",
    label: "Transportation",
    range: { low: rides * TAXI_RIDE_RANGE.low, high: rides * TAXI_RIDE_RANGE.high },
    note: `Assumes about ${rides} taxi/colectivo rides a month at the published per-ride rate. Car rental or ownership isn't included.`,
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

function buildHealthcare() {
  return {
    id: "healthcare",
    label: "Healthcare",
    range: { ...ASSUMED_MONTHLY_HEALTHCARE_BUFFER },
    note: `Assumes only occasional routine care (a general visit runs ${DOCTOR_VISIT_RANGE.low}–${DOCTOR_VISIT_RANGE.high} MXN) — not ongoing specialist treatment, insurance premiums, or a procedure.`,
    guideLink: GUIDE_LINKS.healthcare,
  };
}

function buildLifestyle(budgetTier) {
  const range = LIFESTYLE_DISCRETIONARY_BY_TIER[budgetTier] || LIFESTYLE_DISCRETIONARY_BY_TIER.unknown;
  return {
    id: "lifestyle",
    label: "Lifestyle / Discretionary",
    range: { ...range },
    note: "Dining out, entertainment, and daily extras — the category most within your control.",
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

export function buildCostPlanner({ answers, scores, city }) {
  const budgetTier = (scores && scores.budgetTier) || "unknown";
  const household = answers.household;
  const cityDirection = CITY_COST_DIRECTION[city.id] || null;

  const categories = [
    buildHousing(budgetTier, household),
    buildUtilities(),
    buildGroceries(household),
    buildTransportation(budgetTier),
    buildHealthcare(),
    buildLifestyle(budgetTier),
  ];

  const totalRange = OVERALL_BUDGET_RANGES[budgetTier] || OVERALL_BUDGET_RANGES.unknown;

  const majorCostDrivers = ["Housing is typically your single largest monthly expense."];
  if (budgetTier === "premium") {
    majorCostDrivers.push("Dining out, beach clubs, and lifestyle spending expand quickly at this budget level.");
  }
  if (cityDirection) {
    majorCostDrivers.push(cityDirection);
  }

  const assumptions = [
    "All figures are sourced from Path To Mexico's own published guides, not a live pricing feed.",
    `Transportation assumes ${ASSUMED_RIDES_PER_MONTH[budgetTier] || ASSUMED_RIDES_PER_MONTH.comfortable} taxi/colectivo rides a month, not car ownership.`,
    "Healthcare assumes occasional routine care only, not ongoing treatment or insurance premiums.",
  ];
  if (budgetTier === "unknown") {
    assumptions.push("Your budget answer was \"not sure yet,\" so this range spans both a lean and a comfortable lifestyle.");
  }
  if (cityDirection) {
    assumptions.push(
      `A dedicated cost breakdown for ${city.name} isn't published yet, so these figures are anchored to Path To Mexico's Playa del Carmen guide.`
    );
  }

  const verifyPersonally = [
    "Actual housing listings and availability at the time you search.",
    "The exchange rate between MXN and your home currency at the time you transfer money.",
  ];
  if (FAMILY_HOUSEHOLDS.includes(household)) {
    verifyPersonally.push("Grocery and daily costs for your specific household size — no published figure covers this yet.");
  }
  if (cityDirection) {
    verifyPersonally.push(`${city.name}-specific costs — this estimate is a Playa del Carmen-anchored reference, not a ${city.name} quote.`);
  }
  verifyPersonally.push("Healthcare or insurance costs specific to your age, health conditions, and coverage choice.");

  return {
    cityName: city.name,
    totalRange: { ...totalRange, sourceLabel: "Published Playa del Carmen guide totals" },
    categories,
    majorCostDrivers,
    assumptions,
    verifyPersonally,
    guideLinks: [
      { label: "Cost of Living in Playa del Carmen", href: GUIDE_LINKS.costOfLiving },
      { label: "How Much Money Do You Need to Move to Mexico?", href: GUIDE_LINKS.howMuchMoney },
      { label: "Grocery Costs in Mexico", href: GUIDE_LINKS.groceryCosts },
    ],
  };
}
