const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from a guide's section bodies.
 * @param {import('../types/guide').GuideSection[]} sections
 * @returns {number} whole minutes, minimum 1
 */
export function estimateReadingTime(sections = []) {
  const text = sections
    .flatMap((section) => (Array.isArray(section.body) ? section.body : [section.body]))
    .join(" ");

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
