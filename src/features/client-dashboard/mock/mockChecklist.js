export const CHECKLIST_CATEGORIES = [
  {
    id: "documents",
    name: "Documents",
    tasks: [
      { id: "doc-passport", title: "Renew passport if expiring within 12 months", status: "complete" },
      { id: "doc-apostille", title: "Apostille birth certificate", status: "due-soon", dueDate: "2026-07-25" },
      { id: "doc-financials", title: "Gather 6 months of bank statements", status: "complete" },
      { id: "doc-fmm", title: "Print FMM tourist card for entry", status: "incomplete" },
    ],
  },
  {
    id: "travel",
    name: "Travel",
    tasks: [
      { id: "travel-flights", title: "Book one-way flight to Cancun", status: "priority", dueDate: "2026-08-15" },
      { id: "travel-insurance", title: "Confirm travel insurance covers moving window", status: "incomplete" },
      { id: "travel-shipping", title: "Get quotes for international shipping", status: "complete" },
    ],
  },
  {
    id: "housing",
    name: "Housing",
    tasks: [
      { id: "housing-shortlist", title: "Review realtor's neighborhood shortlist", status: "complete" },
      { id: "housing-viewings", title: "Schedule virtual viewings", status: "due-soon", dueDate: "2026-07-28" },
      { id: "housing-lease", title: "Review lease terms with lawyer", status: "incomplete" },
    ],
  },
  {
    id: "banking",
    name: "Banking",
    tasks: [
      { id: "bank-notify", title: "Notify home bank of relocation", status: "complete" },
      { id: "bank-mx-account", title: "Open Mexican bank account (in-person, after arrival)", status: "incomplete" },
      { id: "bank-wire", title: "Set up international wire transfer", status: "incomplete" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tasks: [
      { id: "health-records", title: "Request medical records transfer", status: "complete" },
      { id: "health-insurance", title: "Enroll in international health insurance", status: "priority", dueDate: "2026-08-01" },
      { id: "health-prescriptions", title: "Get a 90-day prescription supply", status: "incomplete" },
    ],
  },
  {
    id: "transportation",
    name: "Transportation",
    tasks: [
      { id: "transport-license", title: "Check driver's license validity period", status: "complete" },
      { id: "transport-plan", title: "Decide: bring car, buy local, or rely on transit", status: "incomplete" },
    ],
  },
  {
    id: "utilities",
    name: "Utilities",
    tasks: [
      { id: "utilities-cancel", title: "Schedule cancellation of home utilities", status: "incomplete" },
      { id: "utilities-mx-setup", title: "Ask property manager about CFE/water setup", status: "incomplete" },
    ],
  },
  {
    id: "sim-card",
    name: "SIM Card",
    tasks: [
      { id: "sim-esim", title: "Set up eSIM for arrival week", status: "complete" },
      { id: "sim-local", title: "Compare local carrier plans (Telcel vs AT&T Mexico)", status: "incomplete" },
    ],
  },
  {
    id: "packing",
    name: "Packing",
    tasks: [
      { id: "pack-inventory", title: "Build shipping inventory list", status: "due-soon", dueDate: "2026-08-05" },
      { id: "pack-essentials", title: "Pack a 2-week essentials bag separately", status: "incomplete" },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    tasks: [
      { id: "pets-vet", title: "Get pet health certificate (within 10 days of travel)", status: "incomplete" },
      { id: "pets-crate", title: "Book airline-approved travel crate", status: "complete" },
    ],
  },
];
