/**
 * @typedef {Object} SeoMetadataRecord
 * @property {string} title
 * @property {string} description
 * @property {string} path              - route path, e.g. "/guides/foo" (no origin)
 * @property {string} [ogTitle]
 * @property {string} [ogDescription]
 * @property {string} [ogImage]          - absolute URL
 * @property {string} [publishedAt]      - ISO date string
 * @property {string} [updatedAt]        - ISO date string
 * @property {string[]} [keywords]
 */

/**
 * @param {Partial<SeoMetadataRecord>} partial
 * @returns {SeoMetadataRecord}
 */
export function createSeoMetadata(partial = {}) {
  return {
    title: partial.title || "",
    description: partial.description || "",
    path: partial.path || "/",
    ogTitle: partial.ogTitle || null,
    ogDescription: partial.ogDescription || null,
    ogImage: partial.ogImage || null,
    publishedAt: partial.publishedAt || null,
    updatedAt: partial.updatedAt || null,
    keywords: partial.keywords || [],
  };
}
