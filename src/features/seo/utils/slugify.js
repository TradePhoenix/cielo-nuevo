// Combining diacritical marks (U+0300-U+036F) — stripped after NFKD
// normalization splits accented characters into base + mark, e.g. "e" + mark.
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Converts arbitrary text into a URL-safe, lowercase, hyphen-delimited slug.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
