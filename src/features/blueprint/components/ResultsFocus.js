// Blueprint V2 — the results screen's direct reply to what the visitor said
// they were most uncertain about, plus a compact reflection of the answers
// their result was built from. Both blocks come pre-resolved (per language)
// from buildRecommendation(); this component only lays them out.
import { BLUEPRINT_UI } from "../data/uiCopy";

export default function ResultsFocus({ focusAreas, profileHighlights, lang = "en" }) {
  const ui = BLUEPRINT_UI[lang];
  const hasFocus = focusAreas && focusAreas.length > 0;
  const hasHighlights = profileHighlights && profileHighlights.length > 0;
  if (!hasFocus && !hasHighlights) return null;

  return (
    <section className="mt-14">
      {hasFocus && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b8874a]">{ui.focus.eyebrow}</p>
          <h3 className="mt-2 text-xl font-light tracking-[-0.02em] text-zinc-950 sm:text-2xl">{ui.focus.title}</h3>
          <div className="mt-6 flex flex-col gap-5">
            {focusAreas.map((area) => (
              <div key={area.id} className="border-l-2 border-[#d8a15f] bg-white px-6 py-5">
                <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-950">{area.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasHighlights && (
        <div className={hasFocus ? "mt-10" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{ui.focus.builtFromEyebrow}</p>
          <dl className="mt-4 flex flex-col gap-3">
            {profileHighlights.map((row) => (
              <div key={row.id} className="flex flex-col gap-1 border-b border-zinc-200 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 sm:max-w-[45%]">{row.label}</dt>
                <dd className="text-sm text-zinc-800 sm:text-right">{row.values.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
