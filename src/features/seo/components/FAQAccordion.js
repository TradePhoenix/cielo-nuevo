/**
 * Native <details>/<summary> accordion — accessible and keyboard-operable
 * with no JS state, and matches "avoid unnecessary animations".
 * @param {import('../types/faq').FaqRecord[]} faqs
 */
export default function FAQAccordion({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <div className="divide-y divide-zinc-300 border-y border-zinc-300">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-light tracking-[-0.02em] text-zinc-950 marker:content-none">
            {faq.question}
            <span className="text-zinc-400 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 leading-relaxed text-zinc-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
