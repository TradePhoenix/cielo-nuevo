import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";
import { CONNECTOR_CATEGORIES } from "../data/connectorCategories";

// Honest by design: specific connectors aren't fabricated here — real
// introductions happen on a Mexico Fit Call, matched to the client's
// actual city and situation. This shows what's real today: the categories
// of professionals already in the network.
export default function ConnectorRecommendationsModule() {
  return (
    <ModuleCard
      eyebrow="Connector Recommendations"
      title="Your Trusted Local Network"
      action={
        <Link
          to="/mexico-fit-call"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Get Matched
        </Link>
      }
    >
      <p className="text-sm leading-relaxed text-zinc-600">
        Specific introductions happen on a Mexico Fit Call, matched to your city and situation.
        Here's who's already in the network:
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CONNECTOR_CATEGORIES.map((category) => (
          <div key={category.id} className="border border-zinc-200 p-3">
            <p className="text-sm font-medium text-zinc-950">{category.label}</p>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
