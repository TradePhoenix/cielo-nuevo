import {
  validatePartner,
  validateTerms,
  validateReferral,
  validateAgreement,
  validateEquityRecord,
  validatePartnerApplication,
  validateApplicationReview,
  validateBlueprintLead,
  isUuid,
} from "./validation.js";

const UUID = "3f0b8a1e-5c2d-4e7f-8a9b-1c2d3e4f5a6b";

describe("validateTerms", () => {
  test("accepts empty terms with defaults", () => {
    const result = validateTerms({});
    expect(result.valid).toBe(true);
    expect(result.value.currency).toBe("USD");
    expect(result.value.ptmReceivesPercent).toBeNull();
  });

  test("coerces numeric strings and enforces percentage bounds", () => {
    expect(validateTerms({ ptmReceivesPercent: "25" }).value.ptmReceivesPercent).toBe(25);
    expect(validateTerms({ ptmReceivesPercent: "101" }).valid).toBe(false);
    expect(validateTerms({ ptmReceivesPercent: "-1" }).valid).toBe(false);
    expect(validateTerms({ ptmReceivesPercent: "abc" }).valid).toBe(false);
  });

  test("enforces fixed-fee and payment-days bounds", () => {
    expect(validateTerms({ ptmReceivesFixed: "-5" }).valid).toBe(false);
    expect(validateTerms({ ptmReceivesFixed: "1500" }).value.ptmReceivesFixed).toBe(1500);
    expect(validateTerms({ paymentDueDays: "30.5" }).valid).toBe(false);
    expect(validateTerms({ paymentDueDays: "30" }).value.paymentDueDays).toBe(30);
  });

  test("rejects unknown enums", () => {
    expect(validateTerms({ compensationType: "bribe" }).valid).toBe(false);
    expect(validateTerms({ currency: "BTC" }).valid).toBe(false);
    expect(validateTerms({ exclusivity: "Total world exclusivity" }).valid).toBe(false);
  });
});

describe("validatePartner", () => {
  test("accepts a Phase 1-shaped partner and whitelists fields", () => {
    const result = validatePartner({
      id: UUID,
      legalName: "Casas MX",
      email: "casas@example.com",
      status: "Active",
      category: "real-estate",
      terms: { ptmReceivesPercent: "20", protectionMonths: "6" },
      unexpectedField: "dropped",
      vetting: { scores: { trust: "9", professionalism: "" }, overall: "8" },
    });
    expect(result.valid).toBe(true);
    expect(result.value.id).toBe(UUID);
    expect(result.value.unexpectedField).toBeUndefined();
    expect(result.value.vetting.scores).toEqual({ trust: 9 });
    expect(result.value.vetting.overall).toBe(8);
    expect(result.value.terms.protectionMonths).toBe(6);
  });

  test("requires a UUID id when requireId is set", () => {
    expect(validatePartner({ id: "ptr-abc123" }, { requireId: true }).valid).toBe(false);
    expect(validatePartner({ id: UUID }, { requireId: true }).valid).toBe(true);
  });

  test("rejects unknown status and bad email", () => {
    expect(validatePartner({ status: "Super Partner" }).valid).toBe(false);
    expect(validatePartner({ email: "not-an-email" }).valid).toBe(false);
  });

  test("status transitions: every Phase 1 status is accepted", () => {
    for (const status of ["Applicant", "Under Review", "Approved", "Active", "Paused", "Suspended", "Terminated"]) {
      expect(validatePartner({ status }).valid).toBe(true);
    }
  });
});

describe("validateReferral", () => {
  test("accepts a referral with money fields as strings", () => {
    const result = validateReferral({
      id: UUID,
      partnerId: UUID,
      clientName: "A Client",
      sentAt: "2026-08-01",
      dealValue: "250000",
      ptmFee: "5000",
      status: "Converted",
      paymentStatus: "Invoiced",
    });
    expect(result.valid).toBe(true);
    expect(result.value.dealValue).toBe(250000);
    expect(result.value.ptmFee).toBe(5000);
  });

  test("rejects bad statuses, dates and negative amounts", () => {
    expect(validateReferral({ status: "Ghosted" }).valid).toBe(false);
    expect(validateReferral({ paymentStatus: "IOU" }).valid).toBe(false);
    expect(validateReferral({ sentAt: "01/08/2026" }).valid).toBe(false);
    expect(validateReferral({ dealValue: "-5" }).valid).toBe(false);
    expect(validateReferral({ partnerId: "ptr-legacy" }).valid).toBe(false);
  });
});

describe("validateAgreement", () => {
  test("requires a partner UUID", () => {
    expect(validateAgreement({ partnerId: "nope" }).valid).toBe(false);
    const result = validateAgreement({ partnerId: UUID, status: "Accepted", acceptance: { accepted: true, typedLegalName: "X", acceptedAt: "2026-08-16T12:00:00.000Z" } });
    expect(result.valid).toBe(true);
    expect(result.value.acceptance.accepted).toBe(true);
  });
});

describe("validateEquityRecord", () => {
  test("bounds ownership percentage", () => {
    expect(validateEquityRecord({ ownershipPercent: "150" }).valid).toBe(false);
    expect(validateEquityRecord({ ownershipPercent: "40" }).value.ownershipPercent).toBe(40);
  });
});

describe("validatePartnerApplication (public form)", () => {
  const base = {
    legalName: "Casas MX",
    contactPerson: "Ana",
    email: "ana@example.com",
    phone: "+52 999 123 4567",
    city: "Mérida",
    country: "Mexico",
    category: "real-estate",
    servicesDescription: "Real estate services",
    areasServed: "Yucatán",
    languages: "Spanish, English",
    consent: true,
  };

  test("accepts a valid application", () => {
    const result = validatePartnerApplication(base);
    expect(result.valid).toBe(true);
    expect(result.value.email).toBe("ana@example.com");
  });

  test("rejects missing required fields, bad email, missing consent", () => {
    expect(validatePartnerApplication({ ...base, email: "" }).valid).toBe(false);
    expect(validatePartnerApplication({ ...base, email: "nope" }).valid).toBe(false);
    expect(validatePartnerApplication({ ...base, consent: false }).valid).toBe(false);
    expect(validatePartnerApplication({ ...base, category: "not-a-category" }).valid).toBe(false);
    expect(validatePartnerApplication({ ...base, category: "other" }).valid).toBe(false); // categoryOther required
  });

  test("cannot inject commercial terms, status, or internal notes", () => {
    const result = validatePartnerApplication({
      ...base,
      terms: { ptmReceivesPercent: 0 },
      status: "Active",
      internalNotes: "I approve myself",
      compensationType: "percentage",
    });
    expect(result.valid).toBe(true);
    expect(result.value.terms).toBeUndefined();
    expect(result.value.status).toBeUndefined();
    expect(result.value.internalNotes).toBeUndefined();
    expect(result.value.compensationType).toBeUndefined();
  });
});

describe("validateApplicationReview", () => {
  test("accepts status and notes, rejects unknown status", () => {
    expect(validateApplicationReview({ status: "In Review" }).value).toEqual({ status: "In Review" });
    expect(validateApplicationReview({ status: "Approved-ish" }).valid).toBe(false);
    expect(validateApplicationReview({}).valid).toBe(false);
  });
});

describe("validateBlueprintLead", () => {
  test("accepts a lead with stringified answers", () => {
    const result = validateBlueprintLead({
      firstName: "Sam",
      email: "sam@example.com",
      readinessScore: "72",
      answers: JSON.stringify({ timeline: "6-12m" }),
    });
    expect(result.valid).toBe(true);
    expect(result.value.readinessScore).toBe(72);
    expect(result.value.answers).toEqual({ timeline: "6-12m" });
  });

  test("rejects missing name/email and out-of-range scores", () => {
    expect(validateBlueprintLead({ email: "sam@example.com" }).valid).toBe(false);
    expect(validateBlueprintLead({ firstName: "Sam", email: "bad" }).valid).toBe(false);
    expect(validateBlueprintLead({ firstName: "Sam", email: "sam@example.com", readinessScore: "150" }).valid).toBe(false);
  });
});

describe("isUuid", () => {
  test("accepts UUIDs, rejects legacy ids", () => {
    expect(isUuid(UUID)).toBe(true);
    expect(isUuid("ptr-mf2abc-1xyz")).toBe(false);
  });
});
