/**
 * @typedef {Object} NeighborhoodRecord
 * @property {string} id
 * @property {string} name
 * @property {string} cityId          - id of the parent CityRecord
 * @property {string} summary
 * @property {string} [vibe]          - one-line character description
 * @property {string[]} [bestFor]
 * @property {string} [href]
 */

/**
 * @param {Partial<NeighborhoodRecord>} partial
 * @returns {NeighborhoodRecord}
 */
export function createNeighborhood(partial = {}) {
  return {
    id: partial.id || "",
    name: partial.name || "",
    cityId: partial.cityId || "",
    summary: partial.summary || "",
    vibe: partial.vibe || "",
    bestFor: partial.bestFor || [],
    href: partial.href || null,
  };
}
