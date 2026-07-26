import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import YourMexicoShell from "../components/YourMexicoShell";
import AtlasIntro from "../components/AtlasIntro";
import AtlasFilters from "../components/AtlasFilters";
import AtlasGrid from "../components/AtlasGrid";
import TrustMoment from "../components/TrustMoment";
import FitCallBar from "../components/FitCallBar";
import SEO from "../../../components/SEO";
import { useTopMatches } from "../hooks/useTopMatches";
import { getAllCities } from "../logic/cityLookup";
import { filterAtlasCities, prioritizeAtlasCities } from "../data/atlasGroups";
import { searchDestinations } from "../data/destinationSearch";

// CX-008 — Living Destination Atlas. Local EN/ES content object + toggle,
// matching the exact established pattern GuidesPage.js already uses (no
// shared i18n library exists in this codebase — see CLAUDE.md). Only this
// page's own interface copy is translated; individual destinations' own
// names/taglines/content stay English-only (translating those would mean
// inventing Spanish destination copy that doesn't exist in the canonical
// data source, which is explicitly out of scope).
const content = {
  en: {
    toggle: "ES",
    eyebrow: "Your Mexico",
    title: "Twenty-five places to actually build a life.",
    intro:
      "Every destination Path To Mexico covers, in one place — coastal towns, colonial cities, and quiet corners of the Yucatán Peninsula. Search by name, or filter by region or lifestyle.",
    searchLabel: "Search destinations",
    searchPlaceholder: "Search by name, region, or lifestyle…",
    regionGroupLabel: "Filter by region",
    lifestyleGroupLabel: "Filter by lifestyle",
    allDestinations: "All Destinations",
    resetFilters: "Reset Filters",
    resultCount: (count, total) => `Showing ${count} of ${total} destinations`,
    noResults: "No destinations match this combination of filters yet — try removing one.",
    recommendedBadge: "Matches Your Blueprint",
    blueprintDoneBanner: "Based on your Blueprint, your top matches are highlighted below.",
    blueprintCta: "Want matches built around your own answers?",
    blueprintCtaButton: "Start Your Blueprint",
    compareText: "Ready to compare a few side by side?",
    compareButton: "Compare Destinations",
  },
  es: {
    toggle: "EN",
    eyebrow: "Tu México",
    title: "Veinticinco lugares para construir una vida real.",
    intro:
      "Cada destino que cubre Path To Mexico, en un solo lugar — pueblos costeros, ciudades coloniales y rincones tranquilos de la Península de Yucatán. Busca por nombre, o filtra por región o estilo de vida.",
    searchLabel: "Buscar destinos",
    searchPlaceholder: "Busca por nombre, región o estilo de vida…",
    regionGroupLabel: "Filtrar por región",
    lifestyleGroupLabel: "Filtrar por estilo de vida",
    allDestinations: "Todos Los Destinos",
    resetFilters: "Restablecer Filtros",
    resultCount: (count, total) => `Mostrando ${count} de ${total} destinos`,
    noResults: "Ningún destino coincide con esta combinación de filtros — intenta quitar uno.",
    recommendedBadge: "Coincide Con Tu Blueprint",
    blueprintDoneBanner: "Según tu Blueprint, tus mejores coincidencias están resaltadas abajo.",
    blueprintCta: "¿Quieres coincidencias basadas en tus propias respuestas?",
    blueprintCtaButton: "Comienza Tu Blueprint",
    compareText: "¿Listo para comparar algunos lado a lado?",
    compareButton: "Comparar Destinos",
  },
};

export default function YourMexicoPage() {
  const [lang, setLang] = useState("en");
  const [regionId, setRegionId] = useState("all");
  const [lifestyleIds, setLifestyleIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const t = content[lang];

  const { hasCompletedBlueprint, matches } = useTopMatches();
  const allCities = useMemo(() => getAllCities(), []);
  const matchedIds = useMemo(() => (hasCompletedBlueprint ? matches.map((match) => match.id) : []), [
    hasCompletedBlueprint,
    matches,
  ]);

  const orderedCities = useMemo(
    () => prioritizeAtlasCities(allCities, matchedIds),
    [allCities, matchedIds]
  );
  const filteredCities = useMemo(
    () => searchDestinations(filterAtlasCities(orderedCities, { regionId, lifestyleIds }), searchQuery),
    [orderedCities, regionId, lifestyleIds, searchQuery]
  );

  function toggleLifestyle(filterId) {
    setLifestyleIds((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  }

  function resetFilters() {
    setRegionId("all");
    setLifestyleIds([]);
    setSearchQuery("");
  }

  return (
    <YourMexicoShell>
      <SEO
        title="Your Mexico — Living Destination Atlas"
        description="Explore all 25 Path To Mexico destinations across the Yucatán Peninsula — coastal towns, colonial cities, and quiet corners — searchable and filterable by region or lifestyle."
        path="/your-mexico"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
          className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.toggle}
        </button>
      </div>

      <AtlasIntro eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      {hasCompletedBlueprint ? (
        <p className="mt-6 max-w-xl border-l-2 border-[#d8a15f] pl-4 text-sm leading-relaxed text-zinc-600">
          {t.blueprintDoneBanner}
        </p>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-4 border-l-2 border-zinc-300 pl-4">
          <p className="max-w-md text-sm leading-relaxed text-zinc-600">{t.blueprintCta}</p>
          <Link
            to="/my-mexico-blueprint"
            className="inline-flex items-center gap-2 bg-zinc-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.blueprintCtaButton}
          </Link>
        </div>
      )}

      <div className="mt-8 max-w-md">
        <label htmlFor="destination-search" className="sr-only">
          {t.searchLabel}
        </label>
        <input
          id="destination-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        />
      </div>

      <AtlasFilters
        t={t}
        lang={lang}
        regionId={regionId}
        onRegionChange={setRegionId}
        lifestyleIds={lifestyleIds}
        onToggleLifestyle={toggleLifestyle}
        onReset={resetFilters}
        resultCount={filteredCities.length}
        totalCount={allCities.length}
        hasSearchQuery={Boolean(searchQuery.trim())}
      />

      <AtlasGrid
        cities={filteredCities}
        matchedIds={matchedIds}
        lang={lang}
        t={t}
        onReset={resetFilters}
      />

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <p className="text-sm text-zinc-600">{t.compareText}</p>
        <Link
          to="/your-mexico/compare"
          className="inline-flex items-center gap-2 border border-zinc-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.compareButton}
        </Link>
      </div>

      <TrustMoment />

      <FitCallBar source="atlas" lang={lang} />
    </YourMexicoShell>
  );
}
