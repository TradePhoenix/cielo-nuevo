// My Mexico Plan — Trusted Partner & Connector category catalog. Static
// project content, the same discipline as taskBank.js: every field here
// is either a plain fact about the category or an honest description of
// how Path To Mexico relates to it today. Nothing here names a partner
// company, an endorsement, a certification, or a piece of legal/financial
// advice — see buildTrustedPartnerWorkspace.js for the truth-constraint
// notes on why.
//
// Shape:
//   id             unique, stable
//   label          the category name shown to the visitor
//   whyItMatters   a short, honest, general-planning-only explanation —
//                  never a specific legal, tax, or medical claim
//   whenNeeded     reuses the exact period vocabulary already established
//                  by buildRelocationTimeline.js (ENG-020), so a visitor
//                  sees one consistent timing language across the whole
//                  plan instead of a second, competing one
//   ownership      "self" | "pathToMexico" | "professional" — the exact
//                  taxonomy already used by taskBank.js and rendered
//                  identically by ConciergeWorkspace.js's category
//                  labels/descriptions; reused here, not reinvented
//   guideLink      an existing /guides page when one is genuinely
//                  relevant; null otherwise — never a placeholder link
//   relevance      "universal" (appropriate for every visitor relocating
//                  to Mexico, regardless of answers) or a function of
//                  scores.tagCounts / plan.cityId — see
//                  buildTrustedPartnerWorkspace.js's RELEVANCE_RULES
//   partnerRecords always [] today. Path To Mexico has no verified
//                  partner directory yet — this is the structural seam a
//                  future real partner list would populate (item 7 of
//                  ENG-021's scope), not a current claim of any kind.

export const PARTNER_CATEGORIES = [
  {
    id: "immigration-residency",
    label: "Immigration / Residency",
    whyItMatters: "Every visitor relocating to Mexico needs some form of legal residency status — this is the one category nobody skips.",
    whenNeeded: "3–6 Months Before Moving, finalized in your First 90 Days",
    ownership: "professional",
    guideLink: "/guides/mexico-residency-support",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    whyItMatters: "Finding honest, realistic housing — whether renting or buying — shapes nearly every other decision in your move.",
    whenNeeded: "3–6 Months Before Moving through your Final Month",
    ownership: "pathToMexico",
    guideLink: "/guides/renting-vs-buying-in-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    whyItMatters: "Finding a doctor and dentist before you need one beats doing it for the first time during an actual problem.",
    whenNeeded: "Arrival Week, ongoing",
    ownership: "pathToMexico",
    guideLink: "/guides/healthcare-in-mexico-for-canadians",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "insurance",
    label: "Insurance",
    whyItMatters: "Private health insurance coverage and cost vary a lot by provider — worth comparing before you need it, not during an emergency.",
    whenNeeded: "3–6 Months Before Moving",
    ownership: "professional",
    guideLink: "/guides/healthcare-in-mexico-for-canadians",
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "banking",
    label: "Banking",
    whyItMatters: "International transfer fees, daily limits, and opening a local account all catch people off guard if left until the last minute.",
    whenNeeded: "3–6 Months Before Moving, set up locally in your Arrival Week",
    ownership: "self",
    guideLink: "/guides/banking-in-mexico-as-a-foreigner",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "accounting-tax",
    label: "Accounting / Tax",
    whyItMatters: "Pension and Social Security income often stretches further here, but confirming how it continues and how it's taxed is worth doing in writing, not assuming.",
    whenNeeded: "Start Now, confirmed before your Final Month",
    ownership: "professional",
    guideLink: "/guides/retiring-in-mexico",
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "legal-services",
    label: "Legal Services",
    whyItMatters: "Lease agreements, property contracts, and residency paperwork often benefit from a licensed legal review — Path To Mexico is not a law firm and does not provide legal advice.",
    whenNeeded: "3–6 Months Before Moving through your Final Month",
    ownership: "professional",
    guideLink: null,
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "vehicle-transportation",
    label: "Vehicle / Transportation",
    whyItMatters: "This region's day-to-day life mostly assumes you're driving — worth planning for before you're relying on it.",
    whenNeeded: "3–6 Months Before Moving",
    ownership: "self",
    guideLink: null,
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "internet-utilities",
    label: "Internet & Utilities",
    whyItMatters: "Setting up phone, internet, and basic utilities early — starting with a prepaid option — avoids being locked into a plan before you know your neighborhood's actual coverage.",
    whenNeeded: "Arrival Week",
    ownership: "self",
    guideLink: "/guides/internet-and-remote-work-in-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "pet-relocation",
    label: "Pet Relocation",
    whyItMatters: "If you're bringing pets, import requirements and logistics are worth researching well ahead of your move rather than the final week.",
    whenNeeded: "3–6 Months Before Moving",
    ownership: "self",
    guideLink: "/guides/bringing-pets-to-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "moving-shipping",
    label: "Moving & Shipping",
    whyItMatters: "Deciding what to ship, sell, or replace is one of the most practical, concrete parts of making a move real.",
    whenNeeded: "Final Month",
    ownership: "self",
    guideLink: "/guides/mexico-relocation-checklist",
    relevance: "universal",
    partnerRecords: [],
  },
];
