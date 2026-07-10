import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

export default function MyCitiesModule({ matches }) {
  return (
    <ModuleCard
      eyebrow="My Cities"
      title="Your Top Matches"
      action={
        <Link
          to="/your-mexico/compare"
          className={`text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
        >
          Compare
        </Link>
      }
    >
      <div className="space-y-3">
        {matches.map((city, index) => (
          <Link
            key={city.id}
            to={`/your-mexico/${city.id}`}
            className={`flex items-center justify-between gap-4 border border-zinc-200 p-4 transition hover:border-zinc-950 ${FOCUS_RING}`}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Match {index + 1}</p>
              <p className="text-lg font-light tracking-[-0.01em]">{city.name}</p>
            </div>
            <span aria-hidden="true" className="text-zinc-400">
              →
            </span>
          </Link>
        ))}
      </div>
    </ModuleCard>
  );
}
