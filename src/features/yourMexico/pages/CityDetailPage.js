import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import YourMexicoShell from "../components/YourMexicoShell";
import CityHero from "../components/CityHero";
import WhyThisFeelsLikeYou from "../components/WhyThisFeelsLikeYou";
import TuesdayInYourLife from "../components/TuesdayInYourLife";
import HonestTruth from "../components/HonestTruth";
import LifestyleSnapshot from "../components/LifestyleSnapshot";
import WhatLifeCosts from "../components/WhatLifeCosts";
import WhereYoudLive from "../components/WhereYoudLive";
import ProsAndTradeoffs from "../components/ProsAndTradeoffs";
import RealEstateContext from "../components/RealEstateContext";
import InvestmentOutlook from "../components/InvestmentOutlook";
import PTMScoreCard from "../components/PTMScoreCard";
import DestinationFAQ from "../components/DestinationFAQ";
import PlanEntryCTA from "../components/PlanEntryCTA";
import MidPageCTA from "../components/MidPageCTA";
import KeepExploring from "../components/KeepExploring";
import CitySection from "../components/CitySection";
import CompareYourMatches from "../components/CompareYourMatches";
import TrustMoment from "../components/TrustMoment";
import FitCallBar from "../components/FitCallBar";
import SEO from "../../../components/SEO";
import { getCityById, getAllCities, getOtherCities } from "../logic/cityLookup";
import { getRegionIdForCity } from "../data/atlasGroups";
import { useTopMatches } from "../hooks/useTopMatches";

// DEST-003 — `city.content` is a { en: {...}, es: {...} } wrapper that only
// exists on the 14 new destinations (see cityDetails.js) — every one of the
// original 11 keeps its deep-content fields at the top level, exactly as
// before. Resolving to `city` itself when `content` is absent means every
// subcomponent below (WhyThisFeelsLikeYou, HonestTruth, LifestyleSnapshot,
// etc.) needs zero changes and zero bilingual awareness of its own — they
// just render whichever flat shape they're handed, same as pre-DEST-003.
// The EN/ES toggle only ever renders for cities that actually have
// `content`, so an existing-11 page can never end up half-translated.
function resolveActiveContent(city, lang) {
  if (!city.content) return city;
  return city.content[lang] || city.content.en;
}

// City Detail — emotional-first order: cinematic hero, the emotional arc
// (Why This Feels Like You, A Tuesday In Your New Life, The Honest Truth),
// the practical decision layer (Lifestyle Snapshot, What Life Costs, Where
// You'd Probably Live, Pros And Trade-offs, Real Estate & Housing,
// Investment Outlook, PTM Score, FAQ), then Keep Exploring, a comparison
// against the visitor's other matches, and finally the standing,
// now-strengthened CTA into a Mexico Fit Call.
export default function CityDetailPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId);
  const { hasCompletedBlueprint, tagCounts, matches } = useTopMatches();
  const [lang, setLang] = useState("en");

  if (!city) {
    return <Navigate to="/your-mexico" replace />;
  }

  const isBilingual = Boolean(city.content);
  const activeContent = resolveActiveContent(city, lang);
  // Merge so downstream components keep reading city.X exactly as before —
  // activeContent's fields win where both exist (existing-11 cities have no
  // overlap since they have no `content`, so this is a no-op for them).
  const displayCity = { ...city, ...activeContent };

  const overlapTags = hasCompletedBlueprint ? city.tags.filter((tag) => tagCounts[tag]) : [];
  const allCities = hasCompletedBlueprint ? matches : getAllCities();
  const regionId = getRegionIdForCity(cityId);
  const sameRegionFirst = getOtherCities(allCities, cityId).sort((a, b) => {
    const aSameRegion = getRegionIdForCity(a.id) === regionId ? 0 : 1;
    const bSameRegion = getRegionIdForCity(b.id) === regionId ? 0 : 1;
    return aSameRegion - bSameRegion;
  });

  return (
    <YourMexicoShell
      hero={<CityHero city={displayCity} backTo="/your-mexico" backLabel="Back To Your Top Matches" />}
    >
      <SEO
        title={`${city.name} — Your Mexico`}
        description={city.tagline}
        path={`/your-mexico/${cityId}`}
      />

      {isBilingual && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
            className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      )}

      <WhyThisFeelsLikeYou city={displayCity} overlapTags={overlapTags} />
      <TuesdayInYourLife city={displayCity} />
      <HonestTruth city={displayCity} />
      <LifestyleSnapshot city={displayCity} />
      <WhatLifeCosts city={displayCity} />
      <WhereYoudLive city={displayCity} />
      <ProsAndTradeoffs city={displayCity} />
      <RealEstateContext city={displayCity} />
      <InvestmentOutlook city={displayCity} />
      <PTMScoreCard city={city} lang={lang} />
      <DestinationFAQ city={displayCity} />
      {hasCompletedBlueprint && <PlanEntryCTA city={city} />}
      <MidPageCTA cityName={city.name} cityId={city.id} />
      <KeepExploring cities={sameRegionFirst} personalized={hasCompletedBlueprint} />

      <CitySection eyebrow="Compare Your Matches" title="How your matches stack up">
        <CompareYourMatches cities={allCities} />
        <Link
          to="/your-mexico/compare"
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          See The Full Comparison
        </Link>
      </CitySection>

      <TrustMoment />

      <FitCallBar cityName={city.name} cityId={city.id} source="city_detail" />
    </YourMexicoShell>
  );
}
