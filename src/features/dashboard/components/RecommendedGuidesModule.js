import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

export default function RecommendedGuidesModule({ recommendedGuides }) {
  if (!recommendedGuides || recommendedGuides.length === 0) {
    return (
      <ModuleCard eyebrow="Recommended Guides" title="Nothing queued up yet">
        <p className="text-sm leading-relaxed text-zinc-600">
          Build your Mexico Plan and relevant guides will show up here automatically.
        </p>
      </ModuleCard>
    );
  }

  return (
    <ModuleCard eyebrow="Recommended Guides" title="Worth Reading Next">
      <ul className="space-y-3">
        {recommendedGuides.map((guide) => (
          <li key={guide.guideLink}>
            <Link
              to={guide.guideLink}
              className="text-sm font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </ModuleCard>
  );
}
