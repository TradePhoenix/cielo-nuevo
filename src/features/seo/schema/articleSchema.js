import { SITE_URL, DEFAULT_OG_IMAGE } from "./schemaConstants";

/**
 * @param {import('../types/guide').GuideRecord} guide
 * @returns {Object} schema.org Article JSON-LD node
 */
export function buildArticleSchema(guide) {
  const path = guide.seo?.path || `/guides/${guide.slug}`;

  return {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: guide.title,
    description: guide.description,
    image: guide.heroImage ? `${SITE_URL}${guide.heroImage}` : DEFAULT_OG_IMAGE,
    datePublished: guide.publishedAt || undefined,
    dateModified: guide.updatedAt || guide.publishedAt || undefined,
    author: {
      "@type": "Organization",
      name: guide.author?.name,
    },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };
}
