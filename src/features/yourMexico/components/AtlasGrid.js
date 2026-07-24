import CityCard from "./CityCard";
import { getRegionGroup, getRegionIdForCity, LIFESTYLE_FILTERS } from "../data/atlasGroups";

// CX-008 — renders the Atlas's filtered result set through the existing
// CityCard (never a second/competing card component). The empty state is
// mandatory, not optional: requirement 4 explicitly forbids silently
// hiding every result without explaining why, so a 0-result filter
// combination always renders an explanation plus a one-click way out.
export default function AtlasGrid({ cities, matchedIds, lang, t, onReset }) {
  if (cities.length === 0) {
    return (
      <div className="mt-16 border border-zinc-200 bg-white px-8 py-16 text-center">
        <p className="text-lg text-zinc-600">{t.noResults}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 bg-zinc-950 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.resetFilters}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city, index) => {
        const region = getRegionGroup(getRegionIdForCity(city.id));
        const signals = (city.tags || [])
          .map((tag) => LIFESTYLE_FILTERS.find((filter) => filter.tag === tag))
          .filter(Boolean)
          .slice(0, 3);

        return (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            lang={lang}
            region={region ? (lang === "es" ? region.labelEs : region.labelEn) : null}
            signals={signals.map((signal) => (lang === "es" ? signal.labelEs : signal.labelEn))}
            isRecommended={matchedIds.includes(city.id)}
            recommendedLabel={t.recommendedBadge}
          />
        );
      })}
    </div>
  );
}
