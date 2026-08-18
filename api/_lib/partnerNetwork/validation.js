// Server-side validation for every Partner Network write. Client-side
// validation is UX only — nothing reaches the database without passing here.
// Every validator returns { valid: true, value } with a WHITELISTED, cleaned
// object (unknown fields dropped, strings trimmed/capped, numerics coerced)
// or { valid: false, code, message }.

import {
  PARTNER_CATEGORY_IDS,
  PARTNER_STATUSES,
  AGREEMENT_STATUSES,
  REFERRAL_STATUSES,
  PAYMENT_STATUSES,
  COMPENSATION_TYPE_IDS,
  CURRENCIES,
  EQUITY_ROLES,
  EQUITY_DOC_STATUSES,
  EQUITY_OWNERSHIP_STATUSES,
  EXCLUSIVITY_OPTIONS,
  REFERRAL_DIRECTIONS,
  APPLICATION_STATUSES,
  LANGUAGES,
} from "./constants.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const SHORT = 300;
const LONG = 5000;

function fail(code, message) {
  return { valid: false, code, message };
}

export function isUuid(value) {
  return typeof value === "string" && UUID_RE.test(value);
}

function str(value, max = SHORT) {
  if (value === null || value === undefined) return "";
  return String(value).slice(0, max).trim();
}

// "" stays null; anything else must parse to a finite number within range.
function num(value, { min = 0, max = Infinity, integer = false } = {}) {
  if (value === null || value === undefined || value === "") return { ok: true, value: null };
  const n = Number(value);
  if (!Number.isFinite(n)) return { ok: false };
  if (integer && !Number.isInteger(n)) return { ok: false };
  if (n < min || n > max) return { ok: false };
  return { ok: true, value: n };
}

function oneOf(value, options, fallback) {
  const v = str(value);
  if (v === "" && fallback !== undefined) return { ok: true, value: fallback };
  if (!options.includes(v)) return { ok: false };
  return { ok: true, value: v };
}

function dateOrEmpty(value) {
  const v = str(value, 40);
  if (v === "") return { ok: true, value: "" };
  if (!DATE_RE.test(v)) return { ok: false };
  return { ok: true, value: v };
}

function isoOrEmpty(value) {
  const v = str(value, 40);
  if (v === "") return { ok: true, value: "" };
  if (Number.isNaN(new Date(v).getTime())) return { ok: false };
  return { ok: true, value: v };
}

// ---------------------------------------------------------------------------
// Commercial terms (Phase 1 DTO shape — see logic/model.js createTerms)

export function validateTerms(input = {}) {
  const compensationType = oneOf(input.compensationType, COMPENSATION_TYPE_IDS, "");
  if (!compensationType.ok) return fail("invalid_terms", "Unknown compensation type.");

  const numbers = {};
  const numberFields = [
    ["ptmReceivesPercent", { min: 0, max: 100 }],
    ["ptmReceivesFixed", { min: 0, max: 100000000 }],
    ["partnerReceivesPercent", { min: 0, max: 100 }],
    ["partnerReceivesFixed", { min: 0, max: 100000000 }],
    ["paymentDueDays", { min: 0, max: 365, integer: true }],
    ["protectionMonths", { min: 0, max: 122 }],
  ];
  for (const [field, range] of numberFields) {
    const parsed = num(input[field], range);
    if (!parsed.ok) return fail("invalid_terms", `Invalid value for ${field}.`);
    numbers[field] = parsed.value;
  }

  const currency = oneOf(input.currency, CURRENCIES, "USD");
  if (!currency.ok) return fail("invalid_terms", "Unknown currency.");
  const exclusivity = oneOf(input.exclusivity, EXCLUSIVITY_OPTIONS, "Non-exclusive");
  if (!exclusivity.ok) return fail("invalid_terms", "Unknown exclusivity option.");

  return {
    valid: true,
    value: {
      compensationType: compensationType.value,
      ...numbers,
      currency: currency.value,
      exclusivity: exclusivity.value,
      specialConditions: str(input.specialConditions, LONG),
      internalNotes: str(input.internalNotes, LONG),
    },
  };
}

// ---------------------------------------------------------------------------
// Partner (Phase 1 DTO shape — createPartner)

export function validatePartner(input = {}, { requireId = false } = {}) {
  if (requireId && !isUuid(input.id)) return fail("invalid_id", "Partner id must be a UUID.");

  const status = oneOf(input.status, PARTNER_STATUSES, "Applicant");
  if (!status.ok) return fail("invalid_status", "Unknown partner status.");
  const category = oneOf(input.category, PARTNER_CATEGORY_IDS, "other");
  if (!category.ok) return fail("invalid_category", "Unknown partner category.");

  const email = str(input.email);
  if (email && !EMAIL_RE.test(email)) return fail("invalid_email", "Partner email is not a valid address.");

  const terms = validateTerms(input.terms || {});
  if (!terms.valid) return terms;

  const credentialsIn = input.credentials && typeof input.credentials === "object" ? input.credentials : {};
  const expiration = dateOrEmpty(credentialsIn.expirationDate);
  if (!expiration.ok) return fail("invalid_date", "Credential expiration must be YYYY-MM-DD.");

  const vettingIn = input.vetting && typeof input.vetting === "object" ? input.vetting : {};
  const scoresIn = vettingIn.scores && typeof vettingIn.scores === "object" ? vettingIn.scores : {};
  const scores = {};
  for (const [key, value] of Object.entries(scoresIn)) {
    if (value === "" || value === null || value === undefined) continue;
    const parsed = num(value, { min: 0, max: 10 });
    if (!parsed.ok) return fail("invalid_vetting", "Vetting scores must be numbers from 0 to 10.");
    scores[str(key, 60)] = parsed.value;
  }
  const overall = num(vettingIn.overall, { min: 0, max: 10 });
  if (!overall.ok) return fail("invalid_vetting", "Overall vetting score must be 0–10.");

  const complianceIn = input.compliance && typeof input.compliance === "object" ? input.compliance : {};
  const compliance = {};
  for (const [key, value] of Object.entries(complianceIn)) {
    compliance[str(key, 60)] = Boolean(value);
  }

  return {
    valid: true,
    value: {
      id: isUuid(input.id) ? input.id : undefined,
      legalName: str(input.legalName),
      tradingName: str(input.tradingName),
      contactPerson: str(input.contactPerson),
      email,
      phone: str(input.phone, 60),
      whatsapp: str(input.whatsapp, 60),
      website: str(input.website, 500),
      address: str(input.address, 500),
      city: str(input.city),
      state: str(input.state),
      country: str(input.country) || "Mexico",
      rfcTaxId: str(input.rfcTaxId, 60),
      category: category.value,
      status: status.value,
      servicesDescription: str(input.servicesDescription, LONG),
      areasServed: str(input.areasServed, LONG),
      languages: str(input.languages),
      yearsInBusiness: str(input.yearsInBusiness, 60),
      credentials: {
        licenseNumber: str(credentialsIn.licenseNumber),
        licenseType: str(credentialsIn.licenseType),
        issuingAuthority: str(credentialsIn.issuingAuthority),
        realEstateRegistration: str(credentialsIn.realEstateRegistration),
        otherCredentials: str(credentialsIn.otherCredentials, LONG),
        expirationDate: expiration.value,
        documents: [],
      },
      compliance,
      vetting: {
        scores,
        overall: overall.value,
        trustTest: oneOf(vettingIn.trustTest, ["Yes", "Maybe", "No"], "").ok
          ? oneOf(vettingIn.trustTest, ["Yes", "Maybe", "No"], "").value
          : "",
        interviewNotes: str(vettingIn.interviewNotes, LONG),
        reviewedAt: str(vettingIn.reviewedAt, 40),
        reviewedBy: str(vettingIn.reviewedBy),
      },
      internalNotes: str(input.internalNotes, LONG),
      terms: terms.value,
    },
  };
}

// ---------------------------------------------------------------------------
// Referral (Phase 1 DTO shape — createReferral)

export function validateReferral(input = {}, { requireId = false } = {}) {
  if (requireId && !isUuid(input.id)) return fail("invalid_id", "Referral id must be a UUID.");
  if (input.partnerId && !isUuid(input.partnerId)) {
    return fail("invalid_partner_id", "partnerId must be a UUID.");
  }

  const status = oneOf(input.status, REFERRAL_STATUSES, "Introduced");
  if (!status.ok) return fail("invalid_status", "Unknown referral status.");
  const paymentStatus = oneOf(input.paymentStatus, PAYMENT_STATUSES, "None");
  if (!paymentStatus.ok) return fail("invalid_status", "Unknown payment status.");
  const direction = oneOf(input.direction, REFERRAL_DIRECTIONS, "PTM → Partner");
  if (!direction.ok) return fail("invalid_direction", "Unknown referral direction.");
  const category = oneOf(input.category, PARTNER_CATEGORY_IDS, "");
  if (!category.ok) return fail("invalid_category", "Unknown referral category.");
  const currency = oneOf(input.currency, CURRENCIES, "USD");
  if (!currency.ok) return fail("invalid_currency", "Unknown currency.");
  const sentAt = dateOrEmpty(input.sentAt);
  if (!sentAt.ok) return fail("invalid_date", "Date sent must be YYYY-MM-DD.");

  const money = {};
  for (const field of ["dealValue", "ptmFee", "partnerFee"]) {
    const parsed = num(input[field], { min: 0, max: 1000000000 });
    if (!parsed.ok) return fail("invalid_amount", `Invalid value for ${field}.`);
    money[field] = parsed.value;
  }

  return {
    valid: true,
    value: {
      id: isUuid(input.id) ? input.id : undefined,
      partnerId: isUuid(input.partnerId) ? input.partnerId : null,
      clientName: str(input.clientName),
      clientContact: str(input.clientContact, 500),
      direction: direction.value,
      sentAt: sentAt.value,
      category: category.value,
      service: str(input.service, 500),
      status: status.value,
      currency: currency.value,
      paymentStatus: paymentStatus.value,
      notes: str(input.notes, LONG),
      ...money,
    },
  };
}

// ---------------------------------------------------------------------------
// Agreement (Phase 1 DTO shape — createAgreement)

export function validateAgreement(input = {}, { requireId = false } = {}) {
  if (requireId && !isUuid(input.id)) return fail("invalid_id", "Agreement id must be a UUID.");
  if (!isUuid(input.partnerId)) return fail("invalid_partner_id", "partnerId must be a UUID.");

  const status = oneOf(input.status, AGREEMENT_STATUSES, "Draft");
  if (!status.ok) return fail("invalid_status", "Unknown agreement status.");
  const expiresAt = dateOrEmpty(input.expiresAt);
  if (!expiresAt.ok) return fail("invalid_date", "Expiry must be YYYY-MM-DD.");

  const acceptanceIn = input.acceptance && typeof input.acceptance === "object" ? input.acceptance : {};
  const acceptedAt = isoOrEmpty(acceptanceIn.acceptedAt);
  if (!acceptedAt.ok) return fail("invalid_date", "acceptedAt must be a valid timestamp.");
  const approvalIn = input.ptmApproval && typeof input.ptmApproval === "object" ? input.ptmApproval : {};
  const approvedAt = isoOrEmpty(approvalIn.approvedAt);
  if (!approvedAt.ok) return fail("invalid_date", "approvedAt must be a valid timestamp.");
  const activeFrom = isoOrEmpty(input.activeFrom);
  if (!activeFrom.ok) return fail("invalid_date", "activeFrom must be a valid timestamp.");
  const terminatedAt = isoOrEmpty(input.terminatedAt);
  if (!terminatedAt.ok) return fail("invalid_date", "terminatedAt must be a valid timestamp.");

  return {
    valid: true,
    value: {
      id: isUuid(input.id) ? input.id : undefined,
      partnerId: input.partnerId,
      version: str(input.version, 20) || "1.0",
      provider: str(input.provider, 60) || "internal",
      providerRef: str(input.providerRef),
      status: status.value,
      acceptance: {
        accepted: Boolean(acceptanceIn.accepted),
        typedLegalName: str(acceptanceIn.typedLegalName),
        typedRepresentativeName: str(acceptanceIn.typedRepresentativeName),
        acceptedAt: acceptedAt.value,
        userAgent: str(acceptanceIn.userAgent, 500),
        ipAddress: str(acceptanceIn.ipAddress, 60),
      },
      ptmApproval: {
        approved: Boolean(approvalIn.approved),
        approvedBy: str(approvalIn.approvedBy),
        approvedAt: approvedAt.value,
      },
      activeFrom: activeFrom.value,
      expiresAt: expiresAt.value,
      terminatedAt: terminatedAt.value,
      notes: str(input.notes, LONG),
    },
  };
}

// ---------------------------------------------------------------------------
// Equity record (Phase 1 DTO shape — createEquityPartner)

export function validateEquityRecord(input = {}, { requireId = false } = {}) {
  if (requireId && !isUuid(input.id)) return fail("invalid_id", "Equity record id must be a UUID.");

  const ownership = num(input.ownershipPercent, { min: 0, max: 100 });
  if (!ownership.ok) return fail("invalid_percentage", "Ownership must be between 0 and 100.");
  const role = oneOf(input.role, EQUITY_ROLES, "Equity Partner");
  if (!role.ok) return fail("invalid_role", "Unknown equity role.");
  const ownershipStatus = oneOf(input.ownershipStatus, EQUITY_OWNERSHIP_STATUSES, "Recorded internally");
  if (!ownershipStatus.ok) return fail("invalid_status", "Unknown ownership status.");
  const shareholder = oneOf(input.shareholderAgreementStatus, EQUITY_DOC_STATUSES, "Not Started");
  if (!shareholder.ok) return fail("invalid_status", "Unknown shareholder agreement status.");
  const corporate = oneOf(input.corporateDocsStatus, EQUITY_DOC_STATUSES, "Not Started");
  if (!corporate.ok) return fail("invalid_status", "Unknown corporate documents status.");

  return {
    valid: true,
    value: {
      id: isUuid(input.id) ? input.id : undefined,
      legalName: str(input.legalName),
      ownershipPercent: ownership.value,
      role: role.value,
      ownershipStatus: ownershipStatus.value,
      shareholderAgreementStatus: shareholder.value,
      corporateDocsStatus: corporate.value,
      vesting: str(input.vesting, LONG),
      notes: str(input.notes, LONG),
    },
  };
}

// ---------------------------------------------------------------------------
// Public partner application — the ONLY shape the public endpoint accepts.
// Note there is deliberately no path from here to terms, statuses, or
// internal notes: those fields simply do not exist on this validator.

export function validatePartnerApplication(input = {}) {
  const required = {
    legalName: str(input.legalName),
    contactPerson: str(input.contactPerson),
    email: str(input.email),
    phone: str(input.phone, 60),
    city: str(input.city),
    country: str(input.country),
    servicesDescription: str(input.servicesDescription, LONG),
    areasServed: str(input.areasServed, LONG),
    languages: str(input.languages),
  };
  for (const [field, value] of Object.entries(required)) {
    if (!value) return fail("missing_field", `Missing required field: ${field}.`);
  }
  if (!EMAIL_RE.test(required.email)) return fail("invalid_email", "Please provide a valid email address.");

  const category = oneOf(input.category, PARTNER_CATEGORY_IDS);
  if (!category.ok) return fail("invalid_category", "Please choose a business category.");
  const categoryOther = str(input.categoryOther, 500);
  if (category.value === "other" && !categoryOther) {
    return fail("missing_field", "Please describe what your business does.");
  }

  const language = oneOf(input.language, LANGUAGES, "en");
  if (!language.ok) return fail("invalid_language", 'language must be "en" or "es".');
  if (input.consent !== true && input.consent !== "true") {
    return fail("consent_required", "Consent is required to submit an application.");
  }
  const credentialExpiration = dateOrEmpty(input.credentialExpiration);
  if (!credentialExpiration.ok) return fail("invalid_date", "Credential expiration must be YYYY-MM-DD.");

  return {
    valid: true,
    value: {
      ...required,
      tradingName: str(input.tradingName),
      whatsapp: str(input.whatsapp, 60),
      website: str(input.website, 500),
      address: str(input.address, 500),
      state: str(input.state),
      rfcTaxId: str(input.rfcTaxId, 60),
      category: category.value,
      categoryOther,
      yearsInBusiness: str(input.yearsInBusiness, 60),
      licenseNumber: str(input.licenseNumber),
      realEstateRegistration: str(input.realEstateRegistration),
      otherCredentials: str(input.otherCredentials, LONG),
      credentialExpiration: credentialExpiration.value,
      language: language.value,
      consent: true,
    },
  };
}

export function validateApplicationReview(input = {}) {
  const status = oneOf(input.status, APPLICATION_STATUSES);
  const out = {};
  if (input.status !== undefined) {
    if (!status.ok) return fail("invalid_status", "Unknown application status.");
    out.status = status.value;
  }
  if (input.internalNotes !== undefined) out.internalNotes = str(input.internalNotes, LONG);
  if (Object.keys(out).length === 0) return fail("empty_patch", "Nothing to update.");
  return { valid: true, value: out };
}

// ---------------------------------------------------------------------------
// Blueprint lead (server-side persistence of the existing lead capture)

export function validateBlueprintLead(input = {}) {
  const firstName = str(input.firstName);
  const email = str(input.email);
  if (!firstName) return fail("missing_field", "Missing required field: firstName.");
  if (!email || !EMAIL_RE.test(email)) return fail("invalid_email", "Please provide a valid email address.");
  const language = oneOf(input.language, LANGUAGES, "en");
  if (!language.ok) return fail("invalid_language", 'language must be "en" or "es".');
  const readinessScore = num(input.readinessScore, { min: 0, max: 100 });
  if (!readinessScore.ok) return fail("invalid_score", "readinessScore must be 0–100.");

  let answers = {};
  if (input.answers && typeof input.answers === "object" && !Array.isArray(input.answers)) {
    answers = input.answers;
  } else if (typeof input.answers === "string" && input.answers.length <= 20000) {
    try {
      const parsed = JSON.parse(input.answers);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) answers = parsed;
    } catch (error) {
      answers = {};
    }
  }

  return {
    valid: true,
    value: {
      firstName,
      email,
      language: language.value,
      sessionId: str(input.sessionId, 100),
      readinessScore: readinessScore.value,
      archetype: str(input.archetype),
      topDestinations: str(input.topDestinations, 500),
      answers,
      source: str(input.source, 60) || "blueprint-v2",
      consent: input.consent === true || input.consent === "true",
    },
  };
}
