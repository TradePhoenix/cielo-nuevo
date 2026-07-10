import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

// Every action here is a real, working link — never a disabled or
// not-yet-wired button.
const ACTIONS = [
  { label: "Continue My Plan", to: ({ planCityId }) => (planCityId ? `/my-mexico-plan/${planCityId}` : "/my-mexico-plan") },
  { label: "Explore Your Mexico", to: () => "/your-mexico" },
  { label: "Book A Mexico Fit Call", to: () => "/mexico-fit-call" },
  { label: "Retake My Blueprint", to: () => "/my-mexico-blueprint" },
];

export default function QuickActionsModule({ planCityId }) {
  return (
    <ModuleCard eyebrow="Quick Actions" title="Jump Back In">
      <div className="grid gap-3">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.to({ planCityId })}
            className="border border-zinc-200 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </ModuleCard>
  );
}
