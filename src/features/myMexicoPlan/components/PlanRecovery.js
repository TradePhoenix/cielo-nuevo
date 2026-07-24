import { Link } from "react-router-dom";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import SEO from "../../../components/SEO";

// ENG-023 — the calm, in-place recovery screen /my-mexico-plan/:cityId
// renders instead of crashing (missing/malformed/outdated Blueprint data)
// or silently redirecting away (invalid city id). Same shell, same button
// language as YourMexicoPage's own "Complete your Blueprint" empty state,
// so a visitor who lands here mid-link never sees a jarring tone shift.
//
// variant:
//   "no-blueprint"  — city id is real, but no completed Blueprint session
//                      exists (missing, malformed, or from an old storage
//                      version — useBlueprintAnswers() already collapses
//                      all of those to the same safe "not completed" state).
//   "invalid-city"  — the city id in the URL doesn't match any known
//                      destination, regardless of Blueprint state.
export default function PlanRecovery({ variant, cityId }) {
  const isInvalidCity = variant === "invalid-city";

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel="Back To Your Mexico">
      <SEO
        title="My Mexico Plan"
        description="Your personalized 365-day relocation roadmap, built from your Blueprint answers."
        path={cityId ? `/my-mexico-plan/${cityId}` : "/my-mexico-plan"}
      />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">My Mexico Plan</p>

      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        {isInvalidCity ? "We couldn't find that destination." : "This plan needs your Blueprint first."}
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        {isInvalidCity
          ? "That link doesn't match a destination we currently cover. Your Mexico Plan is personalized to a specific place, built from your own Blueprint answers — start there and we'll take it from here."
          : "My Mexico Plan is a personalized 365-day roadmap, built entirely from your own Blueprint answers. Complete your Blueprint — it takes a few minutes — and we'll build your plan from what you tell us."}
      </p>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Link
          to="/my-mexico-blueprint"
          className="inline-flex items-center gap-2 bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Start My Mexico Blueprint
        </Link>
        <Link
          to="/your-mexico"
          className="inline-flex items-center gap-2 border border-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Return To Your Mexico
        </Link>
      </div>
    </YourMexicoShell>
  );
}
