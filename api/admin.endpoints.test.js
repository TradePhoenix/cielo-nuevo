// Endpoint tests for /api/admin/[resource] — real handler + validation +
// services against the in-memory fake Supabase. Covers the security matrix:
// unauthenticated blocked, authenticated allowed, public shapes can't leak in.

import adminHandler from "./admin/[resource].js";
import { __setSupabaseForTests } from "./_lib/data/supabaseAdmin.js";
import { createFakeSupabase } from "./_lib/testSupport/fakeSupabase.js";
import { applyTestEnv, adminCookie, makeReq, makeRes } from "./_lib/testSupport/httpMocks.js";

const UUID = "3f0b8a1e-5c2d-4e7f-8a9b-1c2d3e4f5a6b";
const UUID2 = "4a1b9c2d-6e3f-4a8b-9c0d-2e3f4a5b6c7d";

let restoreEnv;
let db;

beforeEach(() => {
  restoreEnv = applyTestEnv();
  db = createFakeSupabase();
  __setSupabaseForTests(db);
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  restoreEnv();
  __setSupabaseForTests(null);
  console.log.mockRestore();
});

async function call({ resource, method = "GET", id, body, authed = true }) {
  const req = makeReq({
    method,
    query: { resource, ...(id ? { id } : {}) },
    body,
    cookie: authed ? adminCookie() : undefined,
  });
  const res = makeRes();
  await adminHandler(req, res);
  return res;
}

describe("authentication gate", () => {
  test("unauthenticated requests are rejected with 401 and no data", async () => {
    for (const resource of ["ledger", "partners", "referrals", "agreements", "equity", "applications", "import"]) {
      const res = await call({ resource, authed: false });
      expect(res.statusCode).toBe(401);
      expect(res.json().error).toBe("auth_required");
    }
  });

  test("a cookie signed for a non-allowlisted email is rejected", async () => {
    const req = makeReq({ query: { resource: "ledger" }, cookie: adminCookie("stranger@evil.com") });
    const res = makeRes();
    await adminHandler(req, res);
    expect(res.statusCode).toBe(401);
  });

  test("503 backend_not_configured when env is missing", async () => {
    restoreEnv();
    restoreEnv = applyTestEnv({ SUPABASE_URL: undefined });
    const res = await call({ resource: "ledger" });
    expect(res.statusCode).toBe(503);
    expect(res.json().error).toBe("backend_not_configured");
  });
});

describe("partners CRUD", () => {
  const partnerBody = {
    id: UUID,
    legalName: "Casas MX",
    email: "casas@example.com",
    category: "real-estate",
    status: "Applicant",
    terms: { compensationType: "percentage", ptmReceivesPercent: "20", protectionMonths: "6" },
  };

  test("create → read → update → status transition → delete", async () => {
    const created = await call({ resource: "partners", method: "POST", body: partnerBody });
    expect(created.statusCode).toBe(200);
    expect(created.json().legalName).toBe("Casas MX");
    expect(created.json().terms.ptmReceivesPercent).toBe("20");
    // protectionMonths survives the days round-trip (6 months -> 180 days -> 6)
    expect(created.json().terms.protectionMonths).toBe("6");

    const ledger = await call({ resource: "ledger" });
    expect(ledger.statusCode).toBe(200);
    expect(ledger.json().partners).toHaveLength(1);

    const updated = await call({
      resource: "partners",
      method: "PUT",
      body: { ...partnerBody, status: "Under Review", legalName: "Casas MX SA de CV" },
    });
    expect(updated.statusCode).toBe(200);
    expect(updated.json().status).toBe("Under Review");
    expect(db.tables.partners[0].status).toBe("Under Review");

    const deleted = await call({ resource: "partners", method: "DELETE", id: UUID });
    expect(deleted.statusCode).toBe(200);
    expect(db.tables.partners).toHaveLength(0);
  });

  test("rejects invalid status, bad percentage, and non-uuid id", async () => {
    expect((await call({ resource: "partners", method: "POST", body: { ...partnerBody, status: "VIP" } })).statusCode).toBe(400);
    expect(
      (
        await call({
          resource: "partners",
          method: "POST",
          body: { ...partnerBody, terms: { ptmReceivesPercent: "250" } },
        })
      ).statusCode
    ).toBe(400);
    expect((await call({ resource: "partners", method: "POST", body: { ...partnerBody, id: "ptr-legacy" } })).statusCode).toBe(400);
    expect((await call({ resource: "partners", method: "DELETE", id: "ptr-legacy" })).statusCode).toBe(400);
  });
});

describe("referrals", () => {
  test("create computes the protection window from the partner's terms", async () => {
    await call({
      resource: "partners",
      method: "POST",
      body: { id: UUID, legalName: "P", terms: { protectionMonths: "6" } },
    });
    const res = await call({
      resource: "referrals",
      method: "POST",
      body: { id: UUID2, partnerId: UUID, clientName: "A Client", sentAt: "2026-08-01", ptmFee: "5000" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().protectionExpiresAt).toBe("2027-01-28"); // +180 days
    expect(res.json().ptmFee).toBe("5000");
  });

  test("payment status transitions persist", async () => {
    await call({ resource: "partners", method: "POST", body: { id: UUID, legalName: "P" } });
    await call({ resource: "referrals", method: "POST", body: { id: UUID2, partnerId: UUID } });
    const res = await call({
      resource: "referrals",
      method: "PUT",
      body: { id: UUID2, partnerId: UUID, status: "Converted", paymentStatus: "Paid", dealValue: "100000" },
    });
    expect(res.statusCode).toBe(200);
    expect(db.tables.referrals[0].payment_status).toBe("Paid");
    expect(db.tables.referrals[0].deal_value).toBe(100000);
  });
});

describe("applications review", () => {
  function seedApplication() {
    db.tables.partner_applications = [
      {
        id: UUID,
        legal_name: "Casas MX",
        trading_name: "",
        contact_person: "Ana",
        email: "ana@example.com",
        phone: "+52 999",
        whatsapp: "",
        website: "",
        address: "",
        city: "Mérida",
        state: "",
        country: "Mexico",
        rfc_tax_id: "",
        category: "real-estate",
        category_other: "",
        services_description: "Real estate",
        areas_served: "Yucatán",
        languages: "ES/EN",
        years_in_business: "10",
        license_number: "",
        real_estate_registration: "",
        other_credentials: "",
        credential_expiration: "",
        language: "en",
        consent: true,
        status: "New",
        internal_notes: "",
        reviewed_at: null,
        converted_partner_id: null,
        submitted_at: "2026-08-16T10:00:00.000Z",
        created_at: "2026-08-16T10:00:00.000Z",
        updated_at: "2026-08-16T10:00:00.000Z",
      },
    ];
  }

  test("review patch updates status + notes and stamps reviewed_at", async () => {
    seedApplication();
    const res = await call({
      resource: "applications",
      method: "PUT",
      id: UUID,
      body: { status: "In Review", internalNotes: "Call scheduled" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().status).toBe("In Review");
    expect(db.tables.partner_applications[0].reviewed_at).toBeTruthy();
  });

  test("convert creates a partner with status Applicant and empty terms", async () => {
    seedApplication();
    const res = await call({ resource: "applications", method: "POST", body: { action: "convert", id: UUID } });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.partner.status).toBe("Applicant");
    expect(body.partner.terms.ptmReceivesPercent).toBe("");
    expect(body.application.status).toBe("Converted");
    expect(db.tables.partners).toHaveLength(1);
    expect(db.tables.partners[0].source_application_id).toBe(UUID);
  });

  test("rejects an unknown review status", async () => {
    seedApplication();
    const res = await call({ resource: "applications", method: "PUT", id: UUID, body: { status: "Fast-tracked" } });
    expect(res.statusCode).toBe(400);
  });
});

describe("legacy import", () => {
  const legacyExport = {
    version: 1,
    partners: [
      {
        id: "ptr-legacy-1",
        legalName: "Old Partner",
        email: "old@example.com",
        category: "legal",
        status: "Active",
        terms: { compensationType: "fixed", ptmReceivesFixed: "1000", protectionMonths: "3" },
        createdAt: "2026-07-01T00:00:00.000Z",
      },
    ],
    referrals: [
      { id: "ref-legacy-1", partnerId: "ptr-legacy-1", clientName: "C", sentAt: "2026-07-10", status: "Introduced" },
    ],
    agreements: [
      {
        id: "agr-legacy-1",
        partnerId: "ptr-legacy-1",
        version: "1.0",
        status: "Accepted",
        acceptance: { accepted: true, typedLegalName: "Old Partner", typedRepresentativeName: "O", acceptedAt: "2026-07-05T00:00:00.000Z" },
      },
    ],
    equityPartners: [{ id: "eq-legacy-1", legalName: "Founder", ownershipPercent: "80" }],
  };

  test("dry run previews without writing", async () => {
    const res = await call({ resource: "import", method: "POST", body: { payload: legacyExport, dryRun: true } });
    expect(res.statusCode).toBe(200);
    expect(res.json().summary.partners.imported).toBe(1);
    expect(res.json().summary.referrals.imported).toBe(1);
    expect(db.tables.partners || []).toHaveLength(0);
  });

  test("commit imports and remaps partner ids; re-import skips duplicates", async () => {
    const res = await call({ resource: "import", method: "POST", body: { payload: legacyExport, dryRun: false } });
    expect(res.statusCode).toBe(200);
    expect(res.json().summary.partners.imported).toBe(1);
    expect(db.tables.partners).toHaveLength(1);
    expect(db.tables.partners[0].legacy_id).toBe("ptr-legacy-1");
    expect(db.tables.referrals[0].partner_id).toBe(db.tables.partners[0].id);
    expect(db.tables.partner_agreements[0].partner_id).toBe(db.tables.partners[0].id);
    // 3 months -> 90 days protection from 2026-07-10
    expect(db.tables.referrals[0].protection_expires_at).toBe("2026-10-08");

    const again = await call({ resource: "import", method: "POST", body: { payload: legacyExport, dryRun: false } });
    expect(again.json().summary.partners.duplicates).toBe(1);
    expect(again.json().summary.partners.imported).toBe(0);
    expect(db.tables.partners).toHaveLength(1);
    expect(db.tables.referrals).toHaveLength(1);
  });

  test("rejects a payload that isn't a ledger export", async () => {
    const res = await call({ resource: "import", method: "POST", body: { payload: { nope: true } } });
    expect(res.statusCode).toBe(400);
  });
});

describe("misc", () => {
  test("unknown resource 404s; wrong method 405s", async () => {
    expect((await call({ resource: "secrets" })).statusCode).toBe(404);
    expect((await call({ resource: "ledger", method: "POST", body: {} })).statusCode).toBe(405);
  });
});
