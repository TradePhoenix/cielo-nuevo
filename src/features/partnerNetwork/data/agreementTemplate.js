// Referral & Strategic Partner Agreement — displayable Phase 1 representation.
// Versioned so an agreement record always pins the exact text a partner
// accepted. This renders on screen and in the print view; it is NOT a custom
// e-signature system. A professional provider (DocuSign, Dropbox Sign, Adobe
// Sign) can replace the acceptance step later — agreement records store a
// `provider` field ("internal" today) precisely so that swap doesn't require
// a data migration.

export const AGREEMENT_VERSION = "1.0";

export const AGREEMENT_TITLE = "Referral & Strategic Partner Agreement";

// Placeholders in braces are filled from the partner record at render time.
export const AGREEMENT_SECTIONS = [
  {
    heading: "Parties",
    body: `This Referral & Strategic Partner Agreement ("Agreement") is entered into between Path To Mexico ("PTM") and {partnerLegalName}, operating as {partnerTradingName} ("Partner"), represented by {representativeName}.`,
  },
  {
    heading: "Purpose",
    body: `PTM connects individuals and families relocating to, investing in, or building a life in Mexico with carefully selected professionals. This Agreement establishes the terms under which PTM refers clients to Partner, and where applicable, Partner refers clients to PTM.`,
  },
  {
    heading: "Referrals",
    body: `A "Referral" is a client introduction made by PTM to Partner (or by Partner to PTM), recorded with the date of introduction and the service category involved. Each Referral is tracked under a unique referral identifier maintained by PTM.`,
  },
  {
    heading: "Referral Fees",
    body: `Compensation terms for Referrals are set out in a separate commercial terms schedule agreed between PTM and Partner. Those terms are confidential between the parties and are not published on any public PTM property.`,
  },
  {
    heading: "Client Ownership & Non-Circumvention",
    body: `During the referral protection period agreed in the commercial terms schedule, Partner agrees not to circumvent PTM with respect to clients introduced by PTM, including transacting with a referred client through affiliated persons or entities in order to avoid a referral fee. The introduction record maintained by PTM (who was introduced, to whom, and when) is the reference record for determining whether a client was introduced under this Agreement.`,
  },
  {
    heading: "Professional Standards",
    body: `Partner represents that it holds, and will maintain, all licenses, registrations, and accreditations required to lawfully provide its services in the jurisdictions where it operates, and will notify PTM promptly if any such credential lapses, expires, or is revoked. Partner agrees to treat referred clients with the professionalism, honesty, and care consistent with PTM's standards.`,
  },
  {
    heading: "Independent Parties",
    body: `Partner is an independent business. Nothing in this Agreement creates an employment, agency, joint venture, or brokerage relationship between the parties. PTM provides relocation guidance, introductions, and concierge coordination; PTM does not itself provide the professional services Partner provides.`,
  },
  {
    heading: "Confidentiality",
    body: `Each party agrees to keep the other party's commercial terms, client information, and non-public business information confidential, and to use client information only for the purpose of serving the referred client.`,
  },
  {
    heading: "Term & Termination",
    body: `This Agreement begins on the date of acceptance and continues until terminated by either party with written notice. Referral fees earned on Referrals made before termination, and referral protection periods already running, survive termination.`,
  },
  {
    heading: "Acceptance",
    body: `By checking the acceptance box and typing the legal names below, Partner's representative confirms they have read this Agreement, are authorized to bind Partner, and agree to its terms as of the date recorded.`,
  },
];
