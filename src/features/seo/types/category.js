/**
 * @typedef {Object} CategoryRecord
 * @property {string} id
 * @property {string} label
 * @property {string} [href]   - link to a category index page, if any
 */

/**
 * @param {Partial<CategoryRecord>} partial
 * @returns {CategoryRecord}
 */
export function createCategory(partial = {}) {
  return {
    id: partial.id || "general",
    label: partial.label || "Relocation",
    href: partial.href || null,
  };
}
