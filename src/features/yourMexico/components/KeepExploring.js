import CitySection from "./CitySection";
import CityCard from "./CityCard";

// Always offers somewhere to go next — the visitor's other matches in their
// existing personalized order, or (for a direct visit with no completed
// Blueprint) the other two cities unranked. Reuses CityCard as-is.
export default function KeepExploring({ cities, personalized }) {
  if (!cities || cities.length === 0) return null;

  return (
    <CitySection
      eyebrow="Keep Exploring"
      title={personalized ? "Your other matches" : "Other cities worth a look"}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </CitySection>
  );
}
