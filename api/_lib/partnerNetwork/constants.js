// Server-side copy of the Partner Network vocabulary. Deliberately duplicated
// from src/features/partnerNetwork/data/constants.js (same values, keep in
// sync) so api/ stays self-contained — the same isolation rule the Ask Path
// knowledge files follow. These lists are also enforced as CHECK constraints
// in supabase/migrations/, so a drift here fails loudly at write time rather
// than corrupting data.

export const PARTNER_CATEGORY_IDS = [
  "real-estate",
  "property-management",
  "legal",
  "immigration",
  "accounting",
  "healthcare",
  "vehicle-transportation",
  "insurance",
  "construction",
  "hospitality",
  "wedding-events",
  "lifestyle-wellness",
  "strategic",
  "other",
];

export const PARTNER_STATUSES = [
  "Applicant",
  "Under Review",
  "Approved",
  "Active",
  "Paused",
  "Suspended",
  "Terminated",
];

export const AGREEMENT_STATUSES = [
  "Draft",
  "Sent",
  "Viewed",
  "Accepted",
  "PTM Approved",
  "Active",
  "Expired",
  "Terminated",
];

export const REFERRAL_STATUSES = [
  "Introduced",
  "Contacted",
  "Consultation",
  "In Progress",
  "Converted",
  "Lost",
  "Cancelled",
];

export const PAYMENT_STATUSES = ["None", "Pending", "Earned", "Invoiced", "Paid", "Refunded"];

export const COMPENSATION_TYPE_IDS = ["percentage", "fixed", "reciprocal", "tiered", "strategic"];

export const CURRENCIES = ["USD", "MXN", "CAD", "EUR"];

export const EQUITY_ROLES = ["Founder", "Equity Partner", "Strategic Equity Partner", "Advisor"];

export const EQUITY_DOC_STATUSES = ["Not Started", "Drafting", "Under Review", "Signed", "Notarized / Filed"];

export const EQUITY_OWNERSHIP_STATUSES = [
  "Recorded internally",
  "Pending corporate documents",
  "Formalized (notarized)",
];

export const EXCLUSIVITY_OPTIONS = [
  "Non-exclusive",
  "Exclusive in category",
  "Exclusive in region",
  "Exclusive in category + region",
];

export const REFERRAL_DIRECTIONS = ["PTM → Partner", "Partner → PTM"];

export const APPLICATION_STATUSES = ["New", "In Review", "Converted", "Rejected"];

export const LANGUAGES = ["en", "es"];
