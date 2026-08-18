// Row ↔ DTO mapping. The DTO side is the Phase 1 entity shape
// (src/features/partnerNetwork/logic/model.js) so the admin UI is unchanged;
// the row side is the snake_case schema in supabase/migrations/. Numeric DTO
// fields travel as strings (they come from DOM inputs) and store as numerics.
//
// Protection window: the DB stores referral_protection_days (per the schema
// contract); the UI edits months. 1 month == 30 days for this conversion.

const DAYS_PER_MONTH = 30;

function numToStr(value) {
  return value === null || value === undefined ? "" : String(value);
}

function tsToStr(value) {
  return value === null || value === undefined ? "" : String(value);
}

function orNull(value) {
  return value === "" || value === undefined ? null : value;
}

// --- partners + partner_commercial_terms -----------------------------------

export function partnerToRow(dto) {
  return {
    ...(dto.id ? { id: dto.id } : {}),
    legal_name: dto.legalName,
    trading_name: dto.tradingName,
    contact_person: dto.contactPerson,
    email: dto.email,
    phone: dto.phone,
    whatsapp: dto.whatsapp,
    website: dto.website,
    address: dto.address,
    city: dto.city,
    state: dto.state,
    country: dto.country,
    rfc_tax_id: dto.rfcTaxId,
    category: dto.category,
    status: dto.status,
    services_description: dto.servicesDescription,
    areas_served: dto.areasServed,
    languages: dto.languages,
    years_in_business: dto.yearsInBusiness,
    credentials: dto.credentials,
    compliance: dto.compliance,
    vetting: dto.vetting,
    internal_notes: dto.internalNotes,
    last_activity_at: new Date().toISOString(),
  };
}

export function termsToRow(partnerId, terms) {
  return {
    partner_id: partnerId,
    compensation_type: terms.compensationType,
    ptm_percentage: terms.ptmReceivesPercent,
    ptm_fixed_amount: terms.ptmReceivesFixed,
    partner_percentage: terms.partnerReceivesPercent,
    partner_fixed_amount: terms.partnerReceivesFixed,
    currency: terms.currency,
    payment_due_days: terms.paymentDueDays,
    referral_protection_days:
      terms.protectionMonths === null ? null : Math.round(terms.protectionMonths * DAYS_PER_MONTH),
    exclusivity: terms.exclusivity,
    special_conditions: terms.specialConditions,
    internal_notes: terms.internalNotes,
  };
}

export function rowToPartner(row, termsRow) {
  const terms = termsRow || {};
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    legalName: row.legal_name,
    tradingName: row.trading_name,
    contactPerson: row.contact_person,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    website: row.website,
    address: row.address,
    city: row.city,
    state: row.state,
    country: row.country,
    rfcTaxId: row.rfc_tax_id,
    category: row.category,
    status: row.status,
    servicesDescription: row.services_description,
    areasServed: row.areas_served,
    languages: row.languages,
    yearsInBusiness: row.years_in_business,
    credentials: {
      licenseNumber: "",
      licenseType: "",
      issuingAuthority: "",
      realEstateRegistration: "",
      otherCredentials: "",
      expirationDate: "",
      documents: [],
      ...(row.credentials || {}),
    },
    compliance: row.compliance || {},
    vetting: {
      scores: {},
      overall: null,
      trustTest: "",
      interviewNotes: "",
      reviewedAt: "",
      reviewedBy: "",
      ...(row.vetting || {}),
    },
    internalNotes: row.internal_notes,
    lastActivityAt: row.last_activity_at,
    terms: {
      compensationType: terms.compensation_type ?? "",
      ptmReceivesPercent: numToStr(terms.ptm_percentage),
      ptmReceivesFixed: numToStr(terms.ptm_fixed_amount),
      partnerReceivesPercent: numToStr(terms.partner_percentage),
      partnerReceivesFixed: numToStr(terms.partner_fixed_amount),
      currency: terms.currency ?? "USD",
      paymentDueDays: numToStr(terms.payment_due_days),
      protectionMonths:
        terms.referral_protection_days === null || terms.referral_protection_days === undefined
          ? ""
          : String(terms.referral_protection_days / DAYS_PER_MONTH),
      specialConditions: terms.special_conditions ?? "",
      exclusivity: terms.exclusivity ?? "Non-exclusive",
      internalNotes: terms.internal_notes ?? "",
    },
  };
}

// --- referrals --------------------------------------------------------------

export function referralToRow(dto) {
  return {
    ...(dto.id ? { id: dto.id } : {}),
    partner_id: dto.partnerId,
    client_name: dto.clientName,
    client_contact: dto.clientContact,
    direction: dto.direction,
    date_introduced: orNull(dto.sentAt),
    service_category: dto.category,
    service: dto.service,
    status: dto.status,
    deal_value: dto.dealValue,
    currency: dto.currency,
    ptm_referral_fee: dto.ptmFee,
    partner_referral_fee: dto.partnerFee,
    payment_status: dto.paymentStatus,
    notes: dto.notes,
  };
}

export function rowToReferral(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    clientName: row.client_name,
    clientContact: row.client_contact,
    partnerId: row.partner_id || "",
    direction: row.direction,
    sentAt: row.date_introduced || "",
    category: row.service_category,
    service: row.service,
    status: row.status,
    protectionExpiresAt: row.protection_expires_at || "",
    dealValue: numToStr(row.deal_value),
    currency: row.currency,
    ptmFee: numToStr(row.ptm_referral_fee),
    partnerFee: numToStr(row.partner_referral_fee),
    paymentStatus: row.payment_status,
    notes: row.notes,
  };
}

// --- agreements -------------------------------------------------------------

export function agreementToRow(dto) {
  return {
    ...(dto.id ? { id: dto.id } : {}),
    partner_id: dto.partnerId,
    agreement_version: dto.version,
    provider: dto.provider,
    provider_ref: dto.providerRef,
    status: dto.status,
    accepted: dto.acceptance.accepted,
    accepted_legal_name: dto.acceptance.typedLegalName,
    representative_name: dto.acceptance.typedRepresentativeName,
    accepted_at: orNull(dto.acceptance.acceptedAt),
    acceptance_user_agent: dto.acceptance.userAgent,
    acceptance_ip: dto.acceptance.ipAddress,
    ptm_approved: dto.ptmApproval.approved,
    ptm_approved_by: dto.ptmApproval.approvedBy,
    ptm_approved_at: orNull(dto.ptmApproval.approvedAt),
    active_from: orNull(dto.activeFrom),
    expires_at: orNull(dto.expiresAt),
    terminated_at: orNull(dto.terminatedAt),
    notes: dto.notes,
  };
}

export function rowToAgreement(row) {
  return {
    id: row.id,
    partnerId: row.partner_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    version: row.agreement_version,
    provider: row.provider,
    providerRef: row.provider_ref,
    status: row.status,
    acceptance: {
      accepted: row.accepted,
      typedLegalName: row.accepted_legal_name,
      typedRepresentativeName: row.representative_name,
      acceptedAt: tsToStr(row.accepted_at),
      userAgent: row.acceptance_user_agent,
      ipAddress: row.acceptance_ip,
    },
    ptmApproval: {
      approved: row.ptm_approved,
      approvedBy: row.ptm_approved_by,
      approvedAt: tsToStr(row.ptm_approved_at),
    },
    activeFrom: tsToStr(row.active_from),
    expiresAt: row.expires_at || "",
    terminatedAt: tsToStr(row.terminated_at),
    notes: row.notes,
  };
}

// --- equity -----------------------------------------------------------------

export function equityToRow(dto) {
  return {
    ...(dto.id ? { id: dto.id } : {}),
    legal_name: dto.legalName,
    ownership_percentage: dto.ownershipPercent,
    role: dto.role,
    ownership_status: dto.ownershipStatus,
    shareholder_agreement_status: dto.shareholderAgreementStatus,
    corporate_docs_status: dto.corporateDocsStatus,
    vesting_summary: dto.vesting,
    notes: dto.notes,
  };
}

export function rowToEquity(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    legalName: row.legal_name,
    ownershipPercent: numToStr(row.ownership_percentage),
    role: row.role,
    ownershipStatus: row.ownership_status,
    shareholderAgreementStatus: row.shareholder_agreement_status,
    corporateDocsStatus: row.corporate_docs_status,
    vesting: row.vesting_summary,
    notes: row.notes,
    documents: [],
  };
}

// --- applications -----------------------------------------------------------

export function applicationToRow(dto) {
  return {
    legal_name: dto.legalName,
    trading_name: dto.tradingName,
    contact_person: dto.contactPerson,
    email: dto.email,
    phone: dto.phone,
    whatsapp: dto.whatsapp,
    website: dto.website,
    address: dto.address,
    city: dto.city,
    state: dto.state,
    country: dto.country,
    rfc_tax_id: dto.rfcTaxId,
    category: dto.category,
    category_other: dto.categoryOther,
    services_description: dto.servicesDescription,
    areas_served: dto.areasServed,
    languages: dto.languages,
    years_in_business: dto.yearsInBusiness,
    license_number: dto.licenseNumber,
    real_estate_registration: dto.realEstateRegistration,
    other_credentials: dto.otherCredentials,
    credential_expiration: dto.credentialExpiration,
    language: dto.language,
    consent: dto.consent,
  };
}

export function rowToApplication(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    submittedAt: row.submitted_at,
    legalName: row.legal_name,
    tradingName: row.trading_name,
    contactPerson: row.contact_person,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    website: row.website,
    address: row.address,
    city: row.city,
    state: row.state,
    country: row.country,
    rfcTaxId: row.rfc_tax_id,
    category: row.category,
    categoryOther: row.category_other,
    servicesDescription: row.services_description,
    areasServed: row.areas_served,
    languages: row.languages,
    yearsInBusiness: row.years_in_business,
    licenseNumber: row.license_number,
    realEstateRegistration: row.real_estate_registration,
    otherCredentials: row.other_credentials,
    credentialExpiration: row.credential_expiration,
    language: row.language,
    consent: row.consent,
    status: row.status,
    internalNotes: row.internal_notes,
    reviewedAt: tsToStr(row.reviewed_at),
    convertedPartnerId: row.converted_partner_id || "",
  };
}

// Converting an approved application into a Partner record: applicant fields
// only — status starts at "Applicant" and commercial terms start empty, so
// nothing from the public form can pre-set private terms.
export function applicationToPartnerDto(app) {
  return {
    legalName: app.legalName,
    tradingName: app.tradingName,
    contactPerson: app.contactPerson,
    email: app.email,
    phone: app.phone,
    whatsapp: app.whatsapp,
    website: app.website,
    address: app.address,
    city: app.city,
    state: app.state,
    country: app.country,
    rfcTaxId: app.rfcTaxId,
    category: app.category,
    status: "Applicant",
    servicesDescription:
      app.category === "other" && app.categoryOther
        ? `${app.categoryOther}\n\n${app.servicesDescription}`
        : app.servicesDescription,
    areasServed: app.areasServed,
    languages: app.languages,
    yearsInBusiness: app.yearsInBusiness,
    credentials: {
      licenseNumber: app.licenseNumber,
      licenseType: "",
      issuingAuthority: "",
      realEstateRegistration: app.realEstateRegistration,
      otherCredentials: app.otherCredentials,
      expirationDate: app.credentialExpiration,
      documents: [],
    },
  };
}

// --- blueprint leads --------------------------------------------------------

export function blueprintLeadToRow(dto) {
  return {
    first_name: dto.firstName,
    email: dto.email,
    language: dto.language,
    session_id: dto.sessionId,
    readiness_score: dto.readinessScore,
    archetype: dto.archetype,
    top_destinations: dto.topDestinations,
    answers: dto.answers,
    source: dto.source,
    consent: dto.consent,
  };
}
