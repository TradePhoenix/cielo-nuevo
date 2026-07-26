import CitySection from "./CitySection";

const TEXT = {
  en: { eyebrow: "The Honest Truth", title: "What people don't always expect" },
  es: { eyebrow: "La Verdad Honesta", title: "Lo que la gente no siempre espera" },
};

// The trust-building beat: real trade-offs, stated plainly, without
// undercutting the picture the sections above just built. Set inside a
// bordered card (matching FitCallBar's treatment) so it reads as a
// deliberate, considered pause rather than a continuation of the narrative.
export default function HonestTruth({ city, lang = "en" }) {
  const honestTruth = city.honestTruth;
  if (!honestTruth) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{honestTruth.intro}</p>
        <ul className="mt-6 space-y-4">
          {honestTruth.points.map((point) => (
            <li key={point} className="flex gap-3 text-base leading-relaxed text-zinc-600">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </CitySection>
  );
}
