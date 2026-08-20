import { CONSENT_COPY, CONSENT_NOTICE_VERSION, stampConsentTimestamp } from "./consent";

describe("consent metadata", () => {
  it("has structurally identical EN and ES copy", () => {
    expect(Object.keys(CONSENT_COPY.es).sort()).toEqual(Object.keys(CONSENT_COPY.en).sort());
    for (const value of [...Object.values(CONSENT_COPY.en), ...Object.values(CONSENT_COPY.es)]) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it("pins a dated notice version", () => {
    expect(CONSENT_NOTICE_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("stamps the hidden consent_at field at submit time", () => {
    const form = document.createElement("form");
    const field = document.createElement("input");
    field.name = "consent_at";
    form.appendChild(field);
    const iso = stampConsentTimestamp(form, new Date("2026-08-20T12:00:00Z"));
    expect(iso).toBe("2026-08-20T12:00:00.000Z");
    expect(field.value).toBe("2026-08-20T12:00:00.000Z");
  });

  it("is a safe no-op without a form or field", () => {
    expect(stampConsentTimestamp(null)).toBeNull();
    expect(stampConsentTimestamp(document.createElement("form"))).toBeNull();
  });
});
