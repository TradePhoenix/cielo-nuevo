import { Link } from "react-router-dom";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import { useTopMatches } from "../../yourMexico/hooks/useTopMatches";

// Routed /my-mexico-plan — confirms which city the plan is for. Defaults
// to the visitor's top match with one click; the rest of their matches
// stay one click away rather than being hidden.
export default function MyMexicoPlanSetupPage() {
  const { hasCompletedBlueprint, matches } = useTopMatches();

  if (!hasCompletedBlueprint || matches.length === 0) {
    return (
      <YourMexicoShell backTo="/your-mexico" backLabel="Back To Your Mexico">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">My Mexico Plan</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
          Complete your Blueprint to build your plan.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
          Your Mexico Plan is built from your Blueprint answers and the city you've explored in
          Your Mexico. Start there, and this will be waiting for you.
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

  const [topMatch, ...otherMatches] = matches;

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel="Back To Your Mexico">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">My Mexico Plan</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Which city is this plan for?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        Your plan turns your Blueprint answers into a real, dated sequence of next steps —
        specific to one city at a time.
      </p>

      <Link
        to={`/my-mexico-plan/${topMatch.id}`}
        className="mt-8 block border border-zinc-950 bg-zinc-950 p-6 text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Your Best Match</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.01em]">Build My Plan For {topMatch.name}</p>
      </Link>

      {otherMatches.length > 0 && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Or choose a different match</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {otherMatches.map((city) => (
              <Link
                key={city.id}
                to={`/my-mexico-plan/${city.id}`}
                className="border border-zinc-300 px-5 py-3 text-sm text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </YourMexicoShell>
  );
}
