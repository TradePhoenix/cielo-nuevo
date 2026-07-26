// Deterministic translation-coverage check — added after an audit found the
// EN/ES toggle silently leaving English text visible in several places (a
// missing `es` field, not a rendering bug). This test checks STRUCTURE
// (every bilingual field actually has both a non-empty `en` and `es` value)
// rather than comparing `en !== es`, since several genuinely-correct
// translations share the same text as their English counterpart (proper
// nouns, city names, "Tulum vs Playa del Carmen") — an equality check would
// flag those as false failures. Presence/non-emptiness is the failure mode
// that actually happened here (a field silently missing its `es` half), so
// that's what this guards against.
//
// Deliberately data-only (no component rendering) so it never touches
// react-router-dom, sidestepping this project's standing, unrelated Jest/
// react-router-dom resolver gap (see App.test.js / TaskCard.test.js).

import { CITY_DETAILS } from "../features/yourMexico/data/cityDetails";
import { CITY_PROFILES } from "../decisionEngine/data/cityProfiles";
import { GUIDES } from "./guides";
import { RELOCATION_ROADMAP_STAGES } from "./relocationRoadmap";
import { PTM_SCORE_FACTORS } from "../features/yourMexico/data/ptmScoreMethodology";
import { FOUNDER, TESTIMONIALS } from "./trustContent";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

describe("Destination card tagline: bilingual coverage", () => {
  CITY_PROFILES.forEach(({ id, name }) => {
    test(`${name} (${id}) has both EN and ES tagline text`, () => {
      const tagline = CITY_DETAILS[id]?.tagline;
      expect(tagline).toBeDefined();
      expect(isNonEmptyString(tagline.en)).toBe(true);
      expect(isNonEmptyString(tagline.es)).toBe(true);
    });
  });
});

describe("Guides index: bilingual coverage", () => {
  GUIDES.forEach((guide) => {
    test(`${guide.title.en} has EN/ES title, description, and category`, () => {
      expect(isNonEmptyString(guide.title.en)).toBe(true);
      expect(isNonEmptyString(guide.title.es)).toBe(true);
      expect(isNonEmptyString(guide.description.en)).toBe(true);
      expect(isNonEmptyString(guide.description.es)).toBe(true);
      expect(isNonEmptyString(guide.category.en)).toBe(true);
      expect(isNonEmptyString(guide.category.es)).toBe(true);
    });
  });

  test("no two guides share the same href", () => {
    const hrefs = GUIDES.map((guide) => guide.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("Relocation Roadmap: bilingual coverage", () => {
  RELOCATION_ROADMAP_STAGES.forEach((stage) => {
    test(`"${stage.id}" stage has EN/ES title, description, and action label`, () => {
      expect(isNonEmptyString(stage.title.en)).toBe(true);
      expect(isNonEmptyString(stage.title.es)).toBe(true);
      expect(isNonEmptyString(stage.description.en)).toBe(true);
      expect(isNonEmptyString(stage.description.es)).toBe(true);
      expect(isNonEmptyString(stage.action.label.en)).toBe(true);
      expect(isNonEmptyString(stage.action.label.es)).toBe(true);
    });
  });
});

describe("PTM Score factors: bilingual coverage", () => {
  PTM_SCORE_FACTORS.forEach(({ key, label, labelEs }) => {
    test(`"${key}" factor has an EN and ES label`, () => {
      expect(isNonEmptyString(label)).toBe(true);
      expect(isNonEmptyString(labelEs)).toBe(true);
    });
  });
});

describe("Trust content: bilingual coverage", () => {
  test("founder quote and role have EN/ES text", () => {
    expect(isNonEmptyString(FOUNDER.quote)).toBe(true);
    expect(isNonEmptyString(FOUNDER.quoteEs)).toBe(true);
    expect(isNonEmptyString(FOUNDER.role)).toBe(true);
    expect(isNonEmptyString(FOUNDER.roleEs)).toBe(true);
  });

  TESTIMONIALS.forEach((testimonial, index) => {
    test(`testimonial ${index + 1} has EN/ES quote and name`, () => {
      expect(isNonEmptyString(testimonial.quote)).toBe(true);
      expect(isNonEmptyString(testimonial.quoteEs)).toBe(true);
      expect(isNonEmptyString(testimonial.name)).toBe(true);
      expect(isNonEmptyString(testimonial.nameEs)).toBe(true);
    });
  });
});
