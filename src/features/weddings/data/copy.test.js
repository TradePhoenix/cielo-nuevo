import { WEDDINGS_CONTENT, WEDDING_EXPERIENCE_LEVELS } from "./copy";

// Deliberately data-only (no component rendering) so it never touches
// react-router-dom, sidestepping this project's standing, unrelated Jest/
// react-router-dom resolver gap (see App.test.js / translationCoverage.test.js).
//
// Unlike the shared-data modules covered by translationCoverage.test.js
// (per-field {en, es} leaves), the weddings copy is language-at-the-top —
// so parity here means: both language trees have the identical structure
// (same keys, same array lengths, same shapes) and every string is
// non-empty. Presence-based on purpose: proper nouns ("Copal", "Temazcal",
// "Cenote") legitimately match across languages.

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
    // scripts/prerender-meta.mjs pulls these four fields out of the source
    // with a regex that requires double-quoted literals containing no
    // inner double quotes — see the extractField() contract there.
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
