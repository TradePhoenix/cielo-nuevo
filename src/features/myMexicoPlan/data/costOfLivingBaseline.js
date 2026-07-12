// My Mexico Plan — Cost Planner baseline data.
//
// Every number below is copied verbatim from a real, already-published
// guide on this site — nothing here is invented or pulled from an
// external source. Two guides currently contain actual figures anywhere
// in the project (confirmed by search): CostOfLivingPage.js
// (/guides/cost-of-living-playa-del-carmen) and
// HealthcareInMexicoForCanadiansPage.js
// (/guides/healthcare-in-mexico-for-canadians). No other guide has a
// dedicated cost breakdown, so Tulum and Riviera Maya reuse this same
// Playa del Carmen baseline with an honest disclosure rather than
// fabricated city-specific numbers — see buildCostPlanner.js.
//
// Where a monthly figure required combining a guide's own per-visit or
// per-ride price with a usage assumption (e.g. "how many taxi rides a
// month"), that assumption is named explicitly below so it can be shown
// to the visitor rather than hidden inside arithmetic.

// Source: CostOfLivingPage.js "Realistic monthly budgets" section —
// copied exactly, not recomputed from the category figures below.
export const OVERALL_BUDGET_RANGES = {
  lean: { low: 15000, high: 25000 },
  comfortable: { low: 25000, high: 45000 },
  premium: { low: 50000, high: 100000 },
  // Visitor answered "I'm not sure yet" on budget — span both named
  // tiers rather than guessing which one applies.
  unknown: { low: 15000, high: 45000 },
};

// Source: CostOfLivingPage.js "Housing and rent" section, unchanged.
export const HOUSING_BY_UNIT = {
  studio: { low: 12000, high: 18000, label: "Studio apartment" },
  oneBedroom: { low: 15000, high: 25000, label: "One-bedroom condo" },
  twoBedroom: { low: 20000, high: 35000, label: "Two-bedroom condo" },
  luxury: { low: 35000, high: null, label: "Luxury condo or house" },
};

// Source: CostOfLivingPage.js "Utilities" section — electricity + internet
// + gas ranges summed directly (500-3,500 + 400-800 + 200-600).
export const UTILITIES_RANGE = { low: 1100, high: 4900 };

// Source: CostOfLivingPage.js "Groceries" section, unchanged. No
// published figure exists for a family/extended household's grocery
// spending — that gap is shown as "needs personal verification" rather
// than a scaled-up guess (see buildCostPlanner.js).
export const GROCERIES_BY_HOUSEHOLD = {
  solo: { low: 4000, high: 8000 },
  couple: { low: 7000, high: 14000 },
};

// Source: CostOfLivingPage.js "Transportation" section — taxi rides
// 80-200 MXN each. No monthly ride count is published anywhere, so the
// frequency below is a disclosed assumption, not a guide figure — shown
// in buildCostPlanner.js's assumptions list.
export const TAXI_RIDE_RANGE = { low: 80, high: 200 };
export const ASSUMED_RIDES_PER_MONTH = { lean: 10, comfortable: 18, premium: 28 };

// Source: HealthcareInMexicoForCanadiansPage.js + CostOfLivingPage.js
// "Healthcare" section (the two guides publish matching figures): a
// general doctor visit 600-1,500 MXN, a specialist visit 1,000-2,500 MXN.
// Neither guide states a monthly healthcare budget — routine care isn't
// naturally a fixed monthly cost. The monthly range below assumes only
// occasional routine care (no ongoing specialist treatment, insurance
// premiums, or procedures), disclosed explicitly rather than implied.
export const DOCTOR_VISIT_RANGE = { low: 600, high: 1500 };
export const SPECIALIST_VISIT_RANGE = { low: 1000, high: 2500 };
export const ASSUMED_MONTHLY_HEALTHCARE_BUFFER = { low: 500, high: 1200 };

// Source: CostOfLivingPage.js "Restaurants and dining out" and
// "Lifestyle and entertainment" sections — no monthly total is published,
// so the ranges below are a disclosed assumption anchored to that guide's
// per-meal figures and its own budget/comfortable/premium framing.
export const LIFESTYLE_DISCRETIONARY_BY_TIER = {
  lean: { low: 1500, high: 3000 },
  comfortable: { low: 3000, high: 6000 },
  premium: { low: 6000, high: 15000 },
  unknown: { low: 1500, high: 6000 },
};

export const GUIDE_LINKS = {
  costOfLiving: "/guides/cost-of-living-playa-del-carmen",
  howMuchMoney: "/guides/how-much-money-do-you-need-to-move-to-mexico",
  groceryCosts: "/guides/grocery-costs-in-mexico",
  healthcare: "/guides/healthcare-in-mexico-for-canadians",
  bankingForeigner: "/guides/banking-in-mexico-as-a-foreigner",
  rentingVsBuying: "/guides/renting-vs-buying-in-mexico",
};

// Source: src/decisionEngine/data/cityProfiles.js teasers, already
// published and approved — used only to disclose a qualitative direction
// for cities without their own cost guide, never to compute a number.
export const CITY_COST_DIRECTION = {
  "playa-del-carmen": null,
  tulum: "Tulum's own city profile describes it as having a higher cost of living than Playa del Carmen.",
  "riviera-maya": "Riviera Maya's own city profile describes it as quieter and more affordable than Playa del Carmen.",
};
