import { Link } from "react-router-dom";
import YourMexicoShell from "../components/YourMexicoShell";
import CityCard from "../components/CityCard";
import TrustMoment from "../components/TrustMoment";
import FitCallBar from "../components/FitCallBar";
import SEO from "../../../components/SEO";
import { useTopMatches } from "../hooks/useTopMatches";

const YOUR_MEXICO_SEO = (
  <SEO
    title="Your Mexico — City Matches"
    description="See where your next chapter could begin, based on your Blueprint answers."
    path="/your-mexico"
  />
);

// Welcome to Your Mexico + Your Top Matches — the threshold screen reached
// from Blueprint Results. Foundation only: later sprints deepen each city's
// own detail page, not this overview.
export default function YourMexicoPage() {
  const { hasCompletedBlueprint, matches } = useTopMatches();

  if (!hasCompletedBlueprint || matches.length === 0) {
    return (
      <YourMexicoShell>
        {YOUR_MEXICO_SEO}
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Your Mexico</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
          Complete your Blueprint to see your matches.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
          Your Mexico is built from your Blueprint answers. Take a few minutes to answer six
          questions, and we'll show you where your next chapter could begin.
        </p>
        <Link
          to="/my-mexico-blueprint"
          className="mt-8 inline-flex items-center gap-2 bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Start Your Blueprint
        </Link>
      </YourMexicoShell>
    );
  }

  return (
    <YourMexicoShell>
      {YOUR_MEXICO_SEO}
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Welcome To Your Mexico</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Based on your Blueprint, here's where your next chapter could begin.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        These are your top matches. Take your time and explore what life could actually look
        like in each one.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      <Link
        to="/your-mexico/compare"
        className="mt-8 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Compare Your Matches
      </Link>

      <TrustMoment />

      <FitCallBar />
    </YourMexicoShell>
  );
}
