/**
 * @typedef {Object} CityRecord
 * @property {string} id
 * @property {string} name
 * @property {string} region              - e.g. "Riviera Maya"
 * @property {string} summary
 * @property {string} [image]              - path under /public
 * @property {string} [href]               - link into /your-mexico/:cityId
 * @property {Object} [quickFacts]         - label -> value, rendered by QuickFacts
 */

/**
 * @param {Partial<CityRecord>} partial
 * @returns {CityRecord}
 */
export function createCity(partial = {}) {
  return {
    id: partial.id || "",
    name: partial.name || "",
    region: partial.region || "",
    summary: partial.summary || "",
    image: partial.image || null,
    href: partial.href || null,
    quickFacts: partial.quickFacts || {},
  };
}
