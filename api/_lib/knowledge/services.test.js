// Launch fix #2 — the Fit Call booking flow is Calendly-first (with
// WhatsApp as the human alternative). Ask Path must describe that flow,
// never the retired WhatsApp-only story that told visitors the booking
// button they can see doesn't exist.
import { buildServiceRecords } from "./services.js";
import { buildSystemPrompt } from "../guardrails.js";

describe("Fit Call booking knowledge matches the live Calendly flow", () => {
  test("the booking record describes Calendly scheduling with WhatsApp as the personal alternative", () => {
    const record = buildServiceRecords().find((r) => r.id === "fit-call-what-it-is");
    expect(record).toBeDefined();
    expect(record.content.en).toMatch(/Calendly/);
    expect(record.content.en).toMatch(/WhatsApp/);
  });

  test("no service record repeats the stale 'not an automated booking system' claim", () => {
    const all = JSON.stringify(buildServiceRecords());
    expect(all).not.toMatch(/not an automated booking system/i);
    expect(all).not.toMatch(/no self-serve calendar/i);
  });

  test("the system prompt no longer claims booking is WhatsApp-only, in either language", () => {
    for (const language of ["en", "es"]) {
      const prompt = buildSystemPrompt({ language });
      expect(prompt).not.toMatch(/not an automated booking system/i);
      expect(prompt).toMatch(/scheduling button/);
    }
  });
});

describe("service-tier pricing knowledge (launch fix #4)", () => {
  const records = buildServiceRecords();
  const byId = (id) => records.find((r) => r.id === id);

  test("Fit Call is $99 and the Roadmap is exactly $499 in both languages", () => {
    const fitCall = byId("service-tier-fit-call");
    expect(fitCall.title.en).toContain("$99");
    const roadmap = byId("service-tier-roadmap");
    for (const lang of ["en", "es"]) {
      expect(roadmap.title[lang]).toContain("$499");
      expect(roadmap.content[lang]).toContain("$499");
      expect(roadmap.content[lang]).not.toMatch(/starting at|desde \$/i);
    }
  });

  test("Guided Landing never carries a dollar amount and forbids inventing one", () => {
    const guided = byId("service-tier-guided-landing-pricing");
    for (const lang of ["en", "es"]) {
      expect(guided.title[lang]).not.toMatch(/\$\s?\d/);
      expect(guided.content[lang]).not.toMatch(/\$\s?\d/);
    }
    expect(guided.content.en).toMatch(/NO fixed price/);
    expect(guided.content.es).toMatch(/NO hay precio fijo/);
  });

  test("tier records route to the dedicated offer pages", () => {
    expect(byId("service-tier-roadmap").route).toBe("/relocation-roadmap");
    expect(byId("service-tier-guided-landing-pricing").route).toBe("/guided-landing");
  });

  test("no service record invents a fixed Guided Landing price anywhere", () => {
    const all = JSON.stringify(records);
    expect(all).not.toMatch(/3,?500/);
    expect(all).not.toMatch(/Guided Landing[^"]*\$\s?\d/);
  });
});
