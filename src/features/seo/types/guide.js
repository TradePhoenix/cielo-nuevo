import { createSeoMetadata } from "./seoMetadata";
import { createAuthor } from "./author";
import { createCategory } from "./category";

/**
 * The 13 guide types this architecture is built to support. Each has a thin
 * template wrapper in templates/ that configures GuideTemplate defaults for
 * that type — see templates/index.js for the type -> template lookup.
 */
export const GUIDE_TYPES = Object.freeze({
  LOCATION: "location",
  NEIGHBORHOOD: "neighborhood",
  COMPARISON: "comparison",
  COST_OF_LIVING: "cost-of-living",
  RESIDENCY: "residency",
  HEALTHCARE: "healthcare",
  RETIREMENT: "retirement",
  REMOTE_WORKER: "remote-worker",
  INVESTMENT: "investment",
  SCHOOL: "school",
  PET: "pet",
  SAFETY: "safety",
  TRANSPORTATION: "transportation",
});

/**
 * @typedef {Object} GuideSection
 * @property {string} id           - used as the heading anchor + TOC target
 * @property {string} heading
 * @property {string|string[]} body   - one paragraph, or several
 */

/**
 * @typedef {Object} ComparisonTableData
 * @property {string[]} columns        - e.g. ["", "Tulum", "Playa del Carmen"]
 * @property {string[][]} rows         - each row's cells align to columns
 */

/**
 * @typedef {Object} GuideRecord
 * @property {string} id
 * @property {string} guideType         - one of GUIDE_TYPES
 * @property {string} slug              - e.g. "cost-of-living-merida"
 * @property {string} title
 * @property {string} description       - dek/subhead, also used as SEO description fallback
 * @property {import('./category').CategoryRecord} category
 * @property {string} [heroImage]
 * @property {Object} [quickFacts]      - label -> value
 * @property {GuideSection[]} [sections]
 * @property {{pros: string[], cons: string[]}} [prosAndCons]
 * @property {ComparisonTableData} [comparisonTable]
 * @property {import('./faq').FaqRecord[]} [faqs]
 * @property {string[]} [galleryImages]
 * @property {{label: string, href: string}[]} [externalResources]
 * @property {string[]} [relatedGuideIds]
 * @property {string[]} [relatedCityIds]
 * @property {string[]} [relatedServiceIds]
 * @property {import('./author').AuthorRecord} [author]
 * @property {string} [publishedAt]     - ISO date
 * @property {string} [updatedAt]       - ISO date
 * @property {import('./seoMetadata').SeoMetadataRecord} [seo]
 */

/**
 * Normalizes a partial guide definition into a complete GuideRecord with
 * safe defaults, so a new guide page can be authored as a small data object
 * instead of hand-wiring every section. This is the single seam a content
 * author (or a future CMS/AI content pipeline) needs to fill in.
 * @param {Partial<GuideRecord>} partial
 * @returns {GuideRecord}
 */
export function createGuide(partial = {}) {
  const path = partial.seo?.path || `/guides/${partial.slug || ""}`;

  return {
    id: partial.id || partial.slug || "",
    guideType: partial.guideType || GUIDE_TYPES.LOCATION,
    slug: partial.slug || "",
    title: partial.title || "",
    description: partial.description || "",
    category: createCategory(partial.category),
    heroImage: partial.heroImage || null,
    quickFacts: partial.quickFacts || {},
    sections: partial.sections || [],
    prosAndCons: partial.prosAndCons || null,
    comparisonTable: partial.comparisonTable || null,
    faqs: partial.faqs || [],
    galleryImages: partial.galleryImages || [],
    externalResources: partial.externalResources || [],
    relatedGuideIds: partial.relatedGuideIds || [],
    relatedCityIds: partial.relatedCityIds || [],
    relatedServiceIds: partial.relatedServiceIds || [],
    author: createAuthor(partial.author),
    publishedAt: partial.publishedAt || null,
    updatedAt: partial.updatedAt || partial.publishedAt || null,
    seo: createSeoMetadata({
      title: partial.title,
      description: partial.description,
      path,
      ...partial.seo,
    }),
  };
}
