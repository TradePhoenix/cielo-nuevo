import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Presentational only — every value comes from the `workspace` prop
// (buildTrustedPartnerWorkspace.js's output shape). A future AI layer, or
// a future real verified partner list, can pass a differently-computed
// `workspace` object here without any change to this component's markup,
// matching the override-seam pattern used by every other My Mexico Plan
// section. No task checkboxes here — categories aren't taskBank.js
// entries, so this intentionally doesn't reuse TaskCard.js.
export default function TrustedPartnerWorkspace({ workspace }) {
  const { cityName, disclaimer, sections } = workspace;

  return (
    <div className="mt-10 border border-zinc-300 bg-white p-8 print:mt-6">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Trusted Partner &amp; Connector Workspace</p>
      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        Who you'll likely need for {cityName}.
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600">{disclaimer}</p>

      <div className="space-y-10">
        {sections.map(
          (section) =>
            section.categories.length > 0 && (
              <div key={section.id} className="break-inside-avoid">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {section.label} &middot; {section.categories.length}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">{section.description}</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {section.categories.map((category) => (
                    <div key={category.id} className="break-inside-avoid border border-zinc-200 bg-white p-5">
                      <p className="text-base font-medium text-zinc-950">{category.label}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{category.whyItMatters}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                        <span>{category.whenNeeded}</span>
                        <span>{category.canIntroduce ? "Path To Mexico Can Help Introduce" : "You Handle This Directly"}</span>
                      </div>

                      <p className="mt-3 text-xs italic leading-relaxed text-zinc-500">{category.relevanceReason}</p>

                      {category.guideLink && (
                        <Link
                          to={category.guideLink}
                          className={`mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
                        >
                          Read The Guide
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
