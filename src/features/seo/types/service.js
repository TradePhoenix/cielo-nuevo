/**
 * @typedef {Object} ServiceRecord
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} href     - internal route, e.g. "/mexico-fit-call"
 */

/**
 * @param {Partial<ServiceRecord>} partial
 * @returns {ServiceRecord}
 */
export function createService(partial = {}) {
  return {
    id: partial.id || "",
    title: partial.title || "",
    description: partial.description || "",
    href: partial.href || "/mexico-fit-call",
  };
}
