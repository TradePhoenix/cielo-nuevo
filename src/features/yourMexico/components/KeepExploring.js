import CitySection from "./CitySection";
import CityCard from "./CityCard";

const TEXT = {
  en: { eyebrow: "Keep Exploring", personalized: "Your other matches", general: "Other cities worth a look" },
  es: { eyebrow: "Sigue Explorando", personalized: "Tus otras coincidencias", general: "Otras ciudades que vale la pena ver" },
};

// Always offers somewhere to go next — the visitor's other matches in their
// existing personalized order, or (for a direct visit with no completed
// Blueprint) the other two cities unranked. Reuses CityCard as-is.
export default function KeepExploring({ cities, personalized, lang = "en" }) {
  if (!cities || cities.length === 0) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection
      eyebrow={t.eyebrow}
      title={personalized ? t.personalized : t.general}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {cities.map((city, index) => (
          <CityCard key={city.id} city={city} index={index} lang={lang} />
        ))}
      </div>
    </CitySection>
  );
}
