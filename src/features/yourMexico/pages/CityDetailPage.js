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
import PlanEntryCTA from "../components/PlanEntryCTA";
import MidPageCTA from "../components/MidPageCTA";
import KeepExploring from "../components/KeepExploring";
import CitySection from "../components/CitySection";
import CompareYourMatches from "../components/CompareYourMatches";
import TrustMoment from "../components/TrustMoment";
import FitCallBar from "../components/FitCallBar";
import { getCityById, getAllCities, getOtherCities } from "../logic/cityLookup";
import { useTopMatches } from "../hooks/useTopMatches";

// City Detail — emotional-first order: cinematic hero, the emotional arc
// (Why This Feels Like You, A Tuesday In Your New Life, The Honest Truth),
// the practical decision layer (Lifestyle Snapshot, What Life Costs, Where
// You'd Probably Live, Pros And Trade-offs), then Keep Exploring, a
// comparison against the visitor's other matches, and finally the standing,
// now-strengthened CTA into a Mexico Fit Call.
export default function CityDetailPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId);
  const { hasCompletedBlueprint, tagCounts, matches } = useTopMatches();

  if (!city) {
    return <Navigate to="/your-mexico" replace />;
  }

  const overlapTags = hasCompletedBlueprint ? city.tags.filter((tag) => tagCounts[tag]) : [];
  const allCities = hasCompletedBlueprint ? matches : getAllCities();
  const otherCities = getOtherCities(allCities, cityId);

  return (
    <YourMexicoShell
      hero={<CityHero city={city} backTo="/your-mexico" backLabel="Back To Your Top Matches" />}
    >
      <WhyThisFeelsLikeYou city={city} overlapTags={overlapTags} />
      <TuesdayInYourLife city={city} />
      <HonestTruth city={city} />
      <LifestyleSnapshot city={city} />
      <WhatLifeCosts city={city} />
      <WhereYoudLive city={city} />
      <ProsAndTradeoffs city={city} />
      {hasCompletedBlueprint && <PlanEntryCTA city={city} />}
      <MidPageCTA cityName={city.name} />
      <KeepExploring cities={otherCities} personalized={hasCompletedBlueprint} />

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

      <FitCallBar cityName={city.name} />
    </YourMexicoShell>
  );
}
