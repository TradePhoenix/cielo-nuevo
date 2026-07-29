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
import { FOUNDER, ENDORSEMENT } from "./trustContent";

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

// I18N-002 — lifestyleSnapshot/monthlyBudget quick facts (pace, walkability,
// internet, healthcare, safety, transportation, airportAccess, climate,
// community, cost) now carry a Spanish translation for every destination,
// not just DEST-003's newer 14. DEST-003 cities nest this data inside
// content.en/content.es; the original 11 keep it at the top level for
// English and rely solely on content.es for Spanish (see cityDetails.js's
// own comments and cityLookup.js's mergeCityRecord). This test resolves
// both shapes the same way the real consumers do (CompareYourMatches.js's
// localize(), CityDetailPage.js's resolveActiveContent()), so a city that's
// missing its Spanish quick-facts fails here exactly like it would fail a
// visual QA pass.
const LIFESTYLE_KEYS = [
  "pace",
  "walkability",
  "internet",
  "healthcare",
  "safety",
  "transportation",
  "airportAccess",
  "climate",
  "community",
];

function resolveLifestyleSnapshot(details, lang) {
  if (lang === "es") return details?.content?.es?.lifestyleSnapshot;
  return details?.content?.en?.lifestyleSnapshot || details?.lifestyleSnapshot;
}

function resolveMonthlyBudget(details, lang) {
  if (lang === "es") return details?.content?.es?.monthlyBudget;
  return details?.content?.en?.monthlyBudget || details?.monthlyBudget;
}

describe("Lifestyle snapshot & monthly budget: bilingual coverage", () => {
  CITY_PROFILES.forEach(({ id, name }) => {
    const details = CITY_DETAILS[id];

    test(`${name} (${id}) has EN and ES lifestyleSnapshot for every category`, () => {
      const en = resolveLifestyleSnapshot(details, "en");
      const es = resolveLifestyleSnapshot(details, "es");
      expect(en).toBeDefined();
      expect(es).toBeDefined();

      LIFESTYLE_KEYS.forEach((key) => {
        expect(isNonEmptyString(en[key]?.value)).toBe(true);
        expect(isNonEmptyString(en[key]?.detail)).toBe(true);
        expect(isNonEmptyString(es[key]?.value)).toBe(true);
        expect(isNonEmptyString(es[key]?.detail)).toBe(true);
      });
    });

    test(`${name} (${id}) has an EN and ES monthlyBudget note`, () => {
      const en = resolveMonthlyBudget(details, "en");
      const es = resolveMonthlyBudget(details, "es");
      expect(isNonEmptyString(en?.note)).toBe(true);
      expect(isNonEmptyString(es?.note)).toBe(true);
      expect(isNonEmptyString(en?.estimatedTotal)).toBe(true);
      expect(isNonEmptyString(es?.estimatedTotal)).toBe(true);
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

  test("endorsement has a name and EN/ES role", () => {
    expect(isNonEmptyString(ENDORSEMENT.name)).toBe(true);
    expect(isNonEmptyString(ENDORSEMENT.role)).toBe(true);
    expect(isNonEmptyString(ENDORSEMENT.roleEs)).toBe(true);
  });

  test("endorsement has the same number of EN and ES paragraphs, all non-empty", () => {
    expect(ENDORSEMENT.quoteParagraphs.length).toBeGreaterThan(0);
    expect(ENDORSEMENT.quoteParagraphs.length).toBe(ENDORSEMENT.quoteParagraphsEs.length);
    ENDORSEMENT.quoteParagraphs.forEach((paragraph) => expect(isNonEmptyString(paragraph)).toBe(true));
    ENDORSEMENT.quoteParagraphsEs.forEach((paragraph) => expect(isNonEmptyString(paragraph)).toBe(true));
  });
});
