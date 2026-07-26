import CitySection from "./CitySection";

// DEST-003 — plain <details>/<summary> disclosure: no JS state needed, fully
// keyboard-operable and screen-reader-friendly by default, matching the
// print-friendly <details> pattern already established in MyMexicoPlanPage.js.
export default function DestinationFAQ({ city }) {
  const faq = city.faq;
  if (!faq || faq.length === 0) return null;

  return (
    <CitySection eyebrow="Frequently Asked" title={`Questions people ask about ${city.name}`}>
      <div className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
        {faq.map(({ question, answer }) => (
          <details key={question} className="group p-6">
            <summary className="cursor-pointer list-none text-lg font-light tracking-[-0.01em] text-zinc-950 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2">
              <span className="flex items-center justify-between gap-4">
                {question}
                <span aria-hidden="true" className="text-zinc-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">{answer}</p>
          </details>
        ))}
      </div>
    </CitySection>
  );
}
