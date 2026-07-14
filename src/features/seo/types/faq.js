/**
 * @typedef {Object} FaqRecord
 * @property {string} question
 * @property {string} answer   - plain text/sentence(s); rendered as-is and also fed to FAQ schema
 */

/**
 * @param {Partial<FaqRecord>} partial
 * @returns {FaqRecord}
 */
export function createFaq(partial = {}) {
  return {
    question: partial.question || "",
    answer: partial.answer || "",
  };
}
