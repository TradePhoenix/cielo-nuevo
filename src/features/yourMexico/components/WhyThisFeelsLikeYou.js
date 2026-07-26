import CitySection from "./CitySection";

const TEXT = {
  en: { eyebrow: "Why This Feels Like You", title: (name) => `Why ${name} made your list` },
  es: { eyebrow: "Por Qué Esto Encaja Contigo", title: (name) => `Por qué ${name} está en tu lista` },
};

// Personalizes using the Blueprint tags that actually overlapped with this
// visitor's answers (see CityDetailPage). If the visitor arrived without a
// completed Blueprint, falls back to the city's own warm, general framing
// rather than showing an empty or algorithmic-feeling section.
export default function WhyThisFeelsLikeYou({ city, overlapTags = [], lang = "en" }) {
  const copy = city.whyThisFeelsLikeYou;
  if (!copy) return null;
  const t = TEXT[lang] || TEXT.en;

  const reasons = overlapTags
    .map((tag) => copy.reasonsByTag && copy.reasonsByTag[tag])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      {reasons.length > 0 ? (
        <ul className="space-y-4">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-3 text-lg leading-relaxed text-zinc-700">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
              {reason}
            </li>
          ))}
        </ul>
      ) : (
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{copy.intro}</p>
      )}
    </CitySection>
  );
}
