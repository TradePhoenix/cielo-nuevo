/**
 * @param {import('../types/faq').FaqRecord[]} faqs
 * @returns {Object|null} schema.org FAQPage JSON-LD node, or null when there are no FAQs
 */
export function buildFaqSchema(faqs = []) {
  if (!faqs.length) return null;

  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
