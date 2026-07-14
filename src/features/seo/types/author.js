/**
 * @typedef {Object} AuthorRecord
 * @property {string} id
 * @property {string} name
 * @property {string} title            - e.g. "Founder, Path To Mexico"
 * @property {string} [bio]
 * @property {string} [avatar]         - path under /public
 * @property {string} [href]           - link to an author/about page, if any
 */

/**
 * Fills in safe defaults so every guide can render an AuthorSection even
 * when a guide record only specifies a partial author.
 * @param {Partial<AuthorRecord>} partial
 * @returns {AuthorRecord}
 */
export function createAuthor(partial = {}) {
  return {
    id: partial.id || "path-to-mexico-team",
    name: partial.name || "Path To Mexico Team",
    title: partial.title || "Local Relocation Guidance",
    bio: partial.bio || "",
    avatar: partial.avatar || null,
    href: partial.href || null,
  };
}
