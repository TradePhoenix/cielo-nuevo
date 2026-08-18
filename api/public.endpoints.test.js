// Endpoint tests for /api/public/[form] — the two public write paths.
// Security focus: whitelist-only inserts, honeypot, no read access, and the
// explicit backend-not-configured fallback signal.

import publicHandler from "./public/[form].js";
import { __setSupabaseForTests } from "./_lib/data/supabaseAdmin.js";
import { createFakeSupabase } from "./_lib/testSupport/fakeSupabase.js";
import { applyTestEnv, makeReq, makeRes } from "./_lib/testSupport/httpMocks.js";

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

async function submit(form, body, { method = "POST", ip = "10.0.0.1" } = {}) {
  const req = makeReq({ method, query: { form }, body });
  req.headers["x-forwarded-for"] = ip;
  const res = makeRes();
  await publicHandler(req, res);
  return res;
}

const validApplication = {
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
  language: "en",
  consent: true,
};

describe("partner application", () => {
  test("valid submission creates an Applicant record with a timestamp", async () => {
    const res = await submit("partner-application", validApplication);
    expect(res.statusCode).toBe(200);
    expect(res.json().ok).toBe(true);
    expect(db.tables.partner_applications).toHaveLength(1);
    const row = db.tables.partner_applications[0];
    expect(row.status).toBe("New");
    expect(row.submitted_at).toBeTruthy();
    expect(row.consent).toBe(true);
  });

  test("invalid submissions are rejected and store nothing", async () => {
    expect((await submit("partner-application", { ...validApplication, email: "nope" })).statusCode).toBe(400);
    expect((await submit("partner-application", { ...validApplication, consent: false })).statusCode).toBe(400);
    const { legalName, ...missingName } = validApplication;
    expect((await submit("partner-application", missingName)).statusCode).toBe(400);
    expect(db.tables.partner_applications || []).toHaveLength(0);
  });

  test("commercial terms / status / notes cannot be injected from the public form", async () => {
    const res = await submit("partner-application", {
      ...validApplication,
      status: "Active",
      internalNotes: "self-approved",
      terms: { ptmReceivesPercent: 0 },
      compensationType: "percentage",
      converted_partner_id: "3f0b8a1e-5c2d-4e7f-8a9b-1c2d3e4f5a6b",
    });
    expect(res.statusCode).toBe(200);
    const row = db.tables.partner_applications[0];
    expect(row.status).toBe("New");
    expect(row.internal_notes).toBe("");
    expect(row.converted_partner_id).toBeNull();
    expect(row.terms).toBeUndefined();
    expect(row.compensation_type).toBeUndefined();
  });

  test("honeypot submissions report success but store nothing", async () => {
    const res = await submit("partner-application", { ...validApplication, _gotcha: "http://spam.example" });
    expect(res.statusCode).toBe(200);
    expect(res.json().ok).toBe(true);
    expect(db.tables.partner_applications || []).toHaveLength(0);
  });
});

describe("blueprint lead", () => {
  test("valid lead is stored", async () => {
    const res = await submit("blueprint-lead", {
      firstName: "Sam",
      email: "sam@example.com",
      language: "en",
      readinessScore: "72",
      archetype: "The Planner",
      topDestinations: "Mérida, Puerto Vallarta",
      answers: JSON.stringify({ timeline: "6-12m" }),
      consent: true,
    });
    expect(res.statusCode).toBe(200);
    expect(db.tables.blueprint_leads).toHaveLength(1);
    expect(db.tables.blueprint_leads[0].readiness_score).toBe(72);
    expect(db.tables.blueprint_leads[0].answers).toEqual({ timeline: "6-12m" });
  });

  test("invalid lead is rejected", async () => {
    expect((await submit("blueprint-lead", { email: "sam@example.com" })).statusCode).toBe(400);
  });
});

describe("surface hardening", () => {
  test("no GET anywhere — the public API cannot read data", async () => {
    for (const form of ["partner-application", "blueprint-lead", "partners", "ledger"]) {
      const res = await submit(form, undefined, { method: "GET" });
      expect(res.statusCode).toBe(405);
    }
  });

  test("unknown form 404s", async () => {
    expect((await submit("equity", validApplication)).statusCode).toBe(404);
  });

  test("503 with explicit code when backend is not configured", async () => {
    restoreEnv();
    restoreEnv = applyTestEnv({ SUPABASE_URL: undefined });
    const res = await submit("partner-application", validApplication);
    expect(res.statusCode).toBe(503);
    expect(res.json().error).toBe("backend_not_configured");
  });

  test("rate limiter kicks in per IP", async () => {
    let limited = null;
    for (let i = 0; i < 12; i += 1) {
      const res = await submit("blueprint-lead", { firstName: "S", email: "s@example.com" }, { ip: "10.9.9.9" });
      if (res.statusCode === 429) {
        limited = res;
        break;
      }
    }
    expect(limited).not.toBeNull();
    expect(limited.json().error).toBe("rate_limited");
  });
});
