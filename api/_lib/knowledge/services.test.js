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
