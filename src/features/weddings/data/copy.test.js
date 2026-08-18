import { WEDDINGS_CONTENT, WEDDING_EXPERIENCE_LEVELS } from "./copy";

// Deliberately data-only (no component rendering) so it never touches
// react-router-dom, sidestepping this project's standing, unrelated Jest/
// react-router-dom resolver gap (see App.test.js / translationCoverage.test.js).
//
// Unlike the shared-data modules covered by translationCoverage.test.js
// (per-field {en, es} leaves), the weddings copy is language-at-the-top —
// so parity here means: both language trees have the identical structure
// (same keys, same array lengths, same shapes) and every string is
// non-empty. Presence-based on purpose: proper nouns ("Copal", "Temazcal")
// legitimately match across languages.

function walkParity(en, es, path) {
  if (typeof en === "string") {
    expect(typeof es).toBe("string");
    expect(en.trim().length).toBeGreaterThan(0);
    expect(es.trim().length).toBeGreaterThan(0);
    return;
  }
  if (Array.isArray(en)) {
    expect(Array.isArray(es)).toBe(true);
    expect(es).toHaveLength(en.length);
    en.forEach((item, index) => walkParity(item, es[index], `${path}[${index}]`));
    return;
  }
  expect(typeof en).toBe("object");
  expect(typeof es).toBe("object");
  expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  for (const key of Object.keys(en)) {
    walkParity(en[key], es[key], `${path}.${key}`);
  }
}

describe("WEDDINGS_CONTENT", () => {
  it("has structurally identical, fully non-empty EN and ES trees", () => {
    walkParity(WEDDINGS_CONTENT.en, WEDDINGS_CONTENT.es, "content");
  });

  it("keeps the EN/ES language toggles pointing at each other", () => {
    expect(WEDDINGS_CONTENT.en.toggle).toBe("ES");
    expect(WEDDINGS_CONTENT.es.toggle).toBe("EN");
  });

  it("keeps the SEO fields prerender-extractable (plain strings, no double quotes)", () => {
    // scripts/prerender-meta.mjs (SEO-engine release) pulls these four
    // fields out of the source with a regex that requires double-quoted
    // literals containing no inner double quotes — see the extractField()
    // contract there.
    for (const field of ["seoTitle", "seoDescription", "inquirySeoTitle", "inquirySeoDescription"]) {
      for (const lang of ["en", "es"]) {
        const value = WEDDINGS_CONTENT[lang][field];
        expect(typeof value).toBe("string");
        expect(value).not.toContain('"');
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps ceremony elements framed as possibilities, not guarantees", () => {
    // The lead-in line is a cultural guardrail; both languages must keep
    // the conditional framing ("may include" / "pueden incluir").
    expect(WEDDINGS_CONTENT.en.ceremony.elementsLead.toLowerCase()).toContain("may include");
    expect(WEDDINGS_CONTENT.es.ceremony.elementsLead.toLowerCase()).toContain("pueden incluir");
  });
});

// V2 (jungle-only model) positioning guardrails — the page must never
// regress into the earlier multi-venue destination-wedding model, and
// must keep the Tulum-jungle Maya-ceremonial identity explicit.
describe("WEDDINGS_CONTENT — jungle-only positioning guardrails", () => {
  const enBlob = JSON.stringify(WEDDINGS_CONTENT.en).toLowerCase();
  const esBlob = JSON.stringify(WEDDINGS_CONTENT.es).toLowerCase();

  it("never advertises the retired venue categories (EN)", () => {
    // Whole-word matches so future legitimate prose (e.g. "villager")
    // can't false-positive; "beach"/"ballroom" have no valid use in this
    // copy at all.
    for (const banned of [/\bballroom(s)?\b/, /\bbeach(es)?\b/, /\bcenote(s)?\b/, /\bhacienda(s)?\b/, /\bvilla(s)?\b/]) {
      expect(enBlob).not.toMatch(banned);
    }
  });

  it("never advertises the retired venue categories (ES)", () => {
    for (const banned of [/sal[oó]n de baile/, /\bplaya(s)?\b/, /\bcenote(s)?\b/, /\bhacienda(s)?\b/, /\bvilla(s)?\b/]) {
      expect(esBlob).not.toMatch(banned);
    }
  });

  it("avoids the tourism word for Maya practitioners", () => {
    expect(enBlob).not.toMatch(/shaman/);
    expect(esBlob).not.toMatch(/cham[aá]n/);
  });

  it("keeps the Tulum-jungle identity explicit in both languages", () => {
    expect(WEDDINGS_CONTENT.en.hero.subtitle).toBe("In the Jungle of Tulum");
    expect(WEDDINGS_CONTENT.es.hero.subtitle).toBe("En la Selva de Tulum");
    for (const required of ["tulum", "jungle", "maya ceremonial"]) {
      expect(enBlob).toContain(required);
    }
    for (const required of ["tulum", "selva", "ceremoniales mayas"]) {
      expect(esBlob).toContain(required);
    }
  });

  it("keeps the private-setting language without exposing a location", () => {
    expect(WEDDINGS_CONTENT.en.jungle.note.toLowerCase()).toContain("private");
    expect(WEDDINGS_CONTENT.es.jungle.note.toLowerCase()).toContain("privado");
    // No address/coordinate-style location details anywhere. ("calle" and
    // "carretera" alone are legitimate descriptive Spanish — only a road
    // reference followed by a number/kilometer reads as an address.)
    const addressPattern = /\bkm\s?\d|\bcalle\s+\d|\bcarretera\s+\w+\s?\d|\d{1,3}\.\d{4,}/;
    expect(enBlob).not.toMatch(addressPattern);
    expect(esBlob).not.toMatch(addressPattern);
  });

  it("avoids unverifiable ancient-recreation claims", () => {
    for (const blob of [enBlob, esBlob]) {
      expect(blob).not.toMatch(/exactly how the ancient|unchanged for thousands|always married|original ancient/);
      expect(blob).not.toMatch(/exactamente como los antiguos|sin cambios por miles|siempre se casaron/);
    }
  });

  it("keeps the inquiry flow free of venue selection", () => {
    expect(WEDDINGS_CONTENT.en.inquiry.labels.setting).toBeUndefined();
    expect(WEDDINGS_CONTENT.en.inquiry.options.setting).toBeUndefined();
    expect(WEDDINGS_CONTENT.es.inquiry.labels.setting).toBeUndefined();
    expect(WEDDINGS_CONTENT.es.inquiry.options.setting).toBeUndefined();
  });
});

describe("WEDDING_EXPERIENCE_LEVELS", () => {
  it("defines the four internal product levels with stable ids", () => {
    expect(WEDDING_EXPERIENCE_LEVELS.map((level) => level.id)).toEqual([
      "union",
      "gathering",
      "journey",
      "pathWedding",
    ]);
    for (const level of WEDDING_EXPERIENCE_LEVELS) {
      expect(level.name.trim().length).toBeGreaterThan(0);
      expect(level.scope.trim().length).toBeGreaterThan(0);
    }
  });
});
