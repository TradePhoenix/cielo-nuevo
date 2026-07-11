import YourMexicoShell from "../components/YourMexicoShell";
import CitySection from "../components/CitySection";
import CompareYourMatches from "../components/CompareYourMatches";
import FitCallBar from "../components/FitCallBar";
import SEO from "../../../components/SEO";
import { getAllCities } from "../logic/cityLookup";
import { useTopMatches } from "../hooks/useTopMatches";

// Routed /your-mexico/compare — a focused comparison of the visitor's
// matches, reachable from Your Top Matches and from the embedded
// comparison section on every City Detail page.
export default function ComparePage() {
  const { hasCompletedBlueprint, matches } = useTopMatches();
  const cities = hasCompletedBlueprint ? matches : getAllCities();

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel="Back To Your Top Matches">
      <SEO
        title="Compare Your Matches"
        description="Compare cost, pace, and the practical details of your matched Mexico cities side by side."
        path="/your-mexico/compare"
      />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Compare Your Matches</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        How your matches stack up.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        The same picture, side by side — cost, pace, and the practical details that make each
        one a different kind of life.
      </p>

      <CitySection eyebrow="At A Glance" title="Cost and lifestyle, side by side">
        <CompareYourMatches cities={cities} />
      </CitySection>

      <FitCallBar />
    </YourMexicoShell>
  );
}
