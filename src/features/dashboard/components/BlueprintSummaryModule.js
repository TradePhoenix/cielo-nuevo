import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

export default function BlueprintSummaryModule({ readiness }) {
  return (
    <ModuleCard
      eyebrow="My Blueprint"
      title={`${readiness.score}/100 · ${readiness.label.label}`}
      action={
        <Link
          to="/my-mexico-blueprint"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          View Results
        </Link>
      }
    >
      <p className="text-sm leading-relaxed text-zinc-600">{readiness.label.blurb}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{readiness.archetype.title}</p>
    </ModuleCard>
  );
}
