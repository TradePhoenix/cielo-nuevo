import CitySection from "./CitySection";

const TEXT = {
  en: {
    eyebrow: "Where You'd Probably Live",
    title: (name) => `A few areas worth knowing in ${name}`,
    bestFor: "Best Suited For",
    tradeoff: "Honest Trade-off",
  },
  es: {
    eyebrow: "Dónde Probablemente Vivirías",
    title: (name) => `Algunas zonas que vale la pena conocer en ${name}`,
    bestFor: "Ideal Para",
    tradeoff: "Contra Honesto",
  },
};

export default function WhereYoudLive({ city, lang = "en" }) {
  const neighborhoods = city.neighborhoods;
  if (!neighborhoods || neighborhoods.length === 0) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      <div className="grid gap-6 sm:grid-cols-3">
        {neighborhoods.map((area) => (
          <div key={area.name} className="border border-zinc-200 bg-white p-6">
            <h3 className="text-xl font-light tracking-[-0.01em]">{area.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{area.description}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t.bestFor}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700">{area.bestFor}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t.tradeoff}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700">{area.tradeoff}</p>
          </div>
        ))}
      </div>
    </CitySection>
  );
}
