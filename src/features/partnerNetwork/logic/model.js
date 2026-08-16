// Partner Network Phase 1 data model — plain-data factories, no side effects,
// same discipline as blueprint/logic. Every entity is a serializable object
// safe to persist to localStorage and safe to hand to a future backend
// unchanged: when a real API exists, these shapes become the request/response
// contract and only the store swaps out.

let idCounter = 0;

export function makeId(prefix) {
  // Time component keeps ids sortable and unique across sessions; the counter
  // guards against same-millisecond creation within a session.
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function createPartner(overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: makeId("ptr"),
    createdAt: now,
    updatedAt: now,

    // Business information
    legalName: "",
    tradingName: "",
    contactPerson: "",
    email: "",
    phone: "",
    whatsapp: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "Mexico",
    rfcTaxId: "",

    // Classification
    category: "other", // PARTNER_CATEGORIES id
    status: "Applicant", // PARTNER_STATUSES

    // Services
    servicesDescription: "",
    areasServed: "",
    languages: "",
    yearsInBusiness: "",

    // Professional credentials
    credentials: {
      licenseNumber: "",
      licenseType: "",
      issuingAuthority: "",
      realEstateRegistration: "", // e.g. AMPI membership / state registry for realtors
      otherCredentials: "",
      expirationDate: "",
      documents: [], // Phase 1 placeholder: {label, note} — no upload infra exists
    },

    // Compliance flags — ids from COMPLIANCE_FLAGS, stored as a boolean map
    compliance: {},

    // Commercial terms — PRIVATE. Never rendered on any public route.
    terms: createTerms(),

    // Digitized vetting sheet (internal only)
    vetting: {
      scores: {}, // VETTING_DIMENSIONS id -> 1..10
      overall: null,
      trustTest: "", // "Would I trust this person with my own mother?"
      interviewNotes: "",
      reviewedAt: "",
      reviewedBy: "",
    },

    internalNotes: "",
    lastActivityAt: now,

    ...overrides,
  };
}

export function createTerms(overrides = {}) {
  return {
    compensationType: "", // COMPENSATION_TYPES id
    ptmReceivesPercent: "",
    ptmReceivesFixed: "",
    partnerReceivesPercent: "",
    partnerReceivesFixed: "",
    currency: "USD",
    paymentDueDays: "",
    protectionMonths: "", // referral protection period
    specialConditions: "",
    exclusivity: "Non-exclusive",
    internalNotes: "",
    ...overrides,
  };
}

export function createAgreement(partnerId, version, overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: makeId("agr"),
    partnerId,
    createdAt: now,
    updatedAt: now,
    version, // pins agreementTemplate AGREEMENT_VERSION at creation time
    provider: "internal", // future: "docusign" | "dropbox-sign" | "adobe-sign"
    providerRef: "", // external envelope/document id once a provider exists
    status: "Draft", // AGREEMENT_STATUSES

    // Phase 1 acceptance record (typed, not cryptographic)
    acceptance: {
      accepted: false,
      typedLegalName: "",
      typedRepresentativeName: "",
      acceptedAt: "",
      userAgent: "",
      // No server exists, so a true client IP is not observable here. Field
      // kept so a provider/backend can populate it later.
      ipAddress: "",
    },

    ptmApproval: {
      approved: false,
      approvedBy: "",
      approvedAt: "",
    },

    activeFrom: "",
    expiresAt: "",
    terminatedAt: "",
    notes: "",
    ...overrides,
  };
}

export function createReferral(overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: makeId("ref"),
    createdAt: now,
    updatedAt: now,

    clientName: "",
    clientContact: "",
    partnerId: "",
    direction: "PTM → Partner", // or "Partner → PTM"
    sentAt: now.slice(0, 10),
    category: "", // PARTNER_CATEGORIES id
    service: "",
    status: "Introduced", // REFERRAL_STATUSES

    dealValue: "",
    currency: "USD",
    ptmFee: "",
    partnerFee: "",
    paymentStatus: "None", // PAYMENT_STATUSES
    notes: "",
    ...overrides,
  };
}

export function createEquityPartner(overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: makeId("eq"),
    createdAt: now,
    updatedAt: now,
    legalName: "",
    ownershipPercent: "",
    role: "Equity Partner", // EQUITY_ROLES
    ownershipStatus: "Recorded internally", // recordkeeping only — see note below
    shareholderAgreementStatus: "Not Started", // EQUITY_DOC_STATUSES
    corporateDocsStatus: "Not Started", // EQUITY_DOC_STATUSES
    vesting: "",
    notes: "",
    documents: [], // {label, note} placeholders
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Derived helpers — pure functions over the entities above.

export function partnerDisplayName(partner) {
  return partner.tradingName || partner.legalName || partner.contactPerson || "Unnamed partner";
}

export function partnerLocation(partner) {
  return [partner.city, partner.state, partner.country].filter(Boolean).join(", ");
}

// Referral protection window for a referral, from the owning partner's terms.
export function protectionEndsAt(referral, partner) {
  const months = Number(partner?.terms?.protectionMonths);
  if (!months || !referral.sentAt) return null;
  const d = new Date(`${referral.sentAt}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function licenseExpiresSoon(partner, withinDays = 60) {
  const raw = partner?.credentials?.expirationDate;
  if (!raw) return false;
  const expiry = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(expiry.getTime())) return false;
  const horizon = new Date();
  horizon.setDate(horizon.getDate() + withinDays);
  return expiry <= horizon;
}

export function latestAgreementFor(partnerId, agreements) {
  return (
    agreements
      .filter((a) => a.partnerId === partnerId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0] || null
  );
}

export function referralTotalsFor(partnerId, referrals) {
  const mine = referrals.filter((r) => r.partnerId === partnerId);
  const converted = mine.filter((r) => r.status === "Converted");
  const sum = (list, field) =>
    list.reduce((acc, r) => acc + (Number(r[field]) || 0), 0);
  return {
    referred: mine.length,
    conversions: converted.length,
    revenue: sum(converted, "dealValue"),
    outstandingFees: sum(
      mine.filter((r) => ["Pending", "Earned", "Invoiced"].includes(r.paymentStatus)),
      "ptmFee"
    ),
  };
}
