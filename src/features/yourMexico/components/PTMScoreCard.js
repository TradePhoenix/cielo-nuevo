import CitySection from "./CitySection";
import {
  PTM_SCORE_FACTORS,
  computePtmScore,
  PTM_SCORE_METHODOLOGY_NOTE,
  PTM_SCORE_METHODOLOGY_NOTE_ES,
} from "../data/ptmScoreMethodology";

function resolveNote(note, lang) {
  if (!note) return "";
  return typeof note === "string" ? note : note[lang] || note.en;
}

// DEST-003 — PTM Score. `overall`/`tier` are always computed from `factors`
// here, never read off a stored field, so 25 hand-entered factor sets can
// never drift out of arithmetic sync with the number actually shown.
export default function PTMScoreCard({ city, lang = "en" }) {
  const ptmScore = city.ptmScore;
  if (!ptmScore) return null;

  const computed = computePtmScore(ptmScore.factors);
  if (!computed) return null;

  const methodologyNote = lang === "es" ? PTM_SCORE_METHODOLOGY_NOTE_ES : PTM_SCORE_METHODOLOGY_NOTE;

  return (
    <CitySection eyebrow="PTM Score" title={`${city.name}'s editorial fit assessment`}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <div className="flex flex-wrap items-baseline gap-4">
          <p className="text-5xl font-light tracking-[-0.02em]">
            {computed.overall}
            <span className="text-xl text-zinc-400">/5</span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{computed.tier}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PTM_SCORE_FACTORS.map(({ key, label }) => {
            const factor = ptmScore.factors[key];
            if (!factor) return null;
            return (
              <div key={key} className="border border-zinc-200 p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                  <p className="text-sm font-semibold text-zinc-700">{factor.score}/5</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{resolveNote(factor.note, lang)}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 border-t border-zinc-200 pt-6 text-xs leading-relaxed text-zinc-400">
          {methodologyNote}
        </p>
      </div>
    </CitySection>
  );
}
