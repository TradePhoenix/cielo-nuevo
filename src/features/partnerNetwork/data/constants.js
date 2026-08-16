// Partner Network Phase 1 — shared vocabulary. Pure data, no logic, mirroring
// the blueprint feature's data/ convention. Every status list here is the
// single source of truth for both the admin UI and the model factories.

export const PARTNER_CATEGORIES = [
  { id: "real-estate", label: "Real Estate" },
  { id: "property-management", label: "Property Management" },
  { id: "legal", label: "Legal" },
  { id: "immigration", label: "Immigration" },
  { id: "accounting", label: "Accounting" },
  { id: "healthcare", label: "Healthcare" },
  { id: "vehicle-transportation", label: "Vehicle / Transportation" },
  { id: "insurance", label: "Insurance" },
  { id: "construction", label: "Construction" },
  { id: "hospitality", label: "Hospitality" },
  { id: "wedding-events", label: "Wedding / Events" },
  { id: "lifestyle-wellness", label: "Lifestyle / Wellness" },
  { id: "strategic", label: "Strategic Partner" },
  { id: "other", label: "Other" },
];

// Public-facing category names for the Partner With PTM page. Deliberately a
// separate list: the marketing groupings ("Legal & Immigration") don't have to
// match the internal record categories one-to-one.
export const PUBLIC_CATEGORIES = [
  { label: "Real Estate", detail: "Agents, brokers, and developers who know their market deeply." },
  { label: "Legal & Immigration", detail: "Attorneys and facilitators who guide residency, contracts, and closings." },
  { label: "Accounting", detail: "Cross-border tax guidance and RFC, invoicing, and compliance support." },
  { label: "Healthcare", detail: "Doctors, dentists, and clinics trusted with our clients' wellbeing." },
  { label: "Property Management", detail: "Caretakers of homes, rentals, and peace of mind." },
  { label: "Transportation & Vehicles", detail: "Vehicle importing, purchasing, and getting settled on the road." },
  { label: "Home Services", detail: "Builders, renovators, and the trades that make a house a home." },
  { label: "Insurance", detail: "Health, home, and auto coverage that actually works in Mexico." },
  { label: "Hospitality", detail: "Hotels and stays for scouting trips and soft landings." },
  { label: "Weddings & Events", detail: "Planners and venues for life's biggest moments." },
  { label: "Lifestyle & Wellness", detail: "Fitness, spas, education, and everyday quality of life." },
  { label: "Strategic Partnerships", detail: "Aligned businesses growing alongside Path To Mexico." },
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

export const PAYMENT_STATUSES = [
  "None",
  "Pending",
  "Earned",
  "Invoiced",
  "Paid",
  "Refunded",
];

export const COMPENSATION_TYPES = [
  { id: "percentage", label: "Percentage referral fee" },
  { id: "fixed", label: "Fixed referral fee" },
  { id: "reciprocal", label: "Reciprocal referral fee" },
  { id: "tiered", label: "Tiered fee" },
  { id: "strategic", label: "No-fee strategic relationship" },
];

export const COMPLIANCE_FLAGS = [
  { id: "licenseRequired", label: "License Required" },
  { id: "licenseVerified", label: "License Verified" },
  { id: "licenseExpiring", label: "License Expiring" },
  { id: "insuranceVerified", label: "Insurance Verified" },
  { id: "agreementMissing", label: "Agreement Missing" },
  { id: "agreementExpiring", label: "Agreement Expiring" },
  { id: "complianceReview", label: "Compliance Review Required" },
];

export const CURRENCIES = ["USD", "MXN", "CAD", "EUR"];

// Distinct classification for Ozono-style relationships — never shown
// publicly, never mixed into the referral-partner pipeline.
export const EQUITY_ROLES = [
  "Founder",
  "Equity Partner",
  "Strategic Equity Partner",
  "Advisor",
];

export const EQUITY_DOC_STATUSES = [
  "Not Started",
  "Drafting",
  "Under Review",
  "Signed",
  "Notarized / Filed",
];

// Kalen's manual vetting sheet (Partner Network Directory), digitized. These
// live on the internal partner record only.
export const VETTING_DIMENSIONS = [
  { id: "professionalism", label: "Professionalism" },
  { id: "responsiveness", label: "Responsiveness" },
  { id: "english", label: "English Communication" },
  { id: "knowledge", label: "Knowledge" },
  { id: "trust", label: "Trust Level" },
];

export const TRUST_TEST_OPTIONS = ["Yes", "Maybe", "No"];
