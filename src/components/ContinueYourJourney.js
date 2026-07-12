import { Link } from "react-router-dom";
import { getGuideJourney } from "../data/guideJourney";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Reusable "Continue Your Journey" block shown at the end of a guide.
// Shows the guide's stage in the Relocation Roadmap and 2-3 recommended
// next guides, both derived by default from the data-driven lookup in
// guideJourney.js. `stage`/`recommendations` can be passed directly to
// override that lookup entirely — the seam for a future, AI-personalized
// caller (e.g. ranking recommendations from a visitor's actual Blueprint
// answers) to swap in different guides without any change to this
// component's markup.
export default function ContinueYourJourney({
  currentHref,
  stage: stageOverride,
  recommendations: recommendationsOverride,
}) {
  const computed = currentHref ? getGuideJourney(currentHref) : { stage: null, recommendations: [] };
  const stage = stageOverride || computed.stage;
  const recommendations = recommendationsOverride || computed.recommendations;

  if (!stage || recommendations.length === 0) return null;

  return (
    <div className="mt-14 border border-zinc-300 bg-white p-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Continue Your Journey
      </p>

      <h2 className="mb-3 text-3xl font-light tracking-[-0.04em] md:text-5xl">
        You're in the {stage.title} stage.
      </h2>

      <p className="mb-8 max-w-2xl leading-relaxed text-zinc-600">{stage.description}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {recommendations.map((guide) => (
          <Link
            key={guide.href}
            to={guide.href}
            className={`block border border-zinc-200 bg-[#f4f0e8] p-5 transition hover:bg-white ${FOCUS_RING}`}
          >
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              {guide.category}
            </p>
            <p className="text-lg font-light leading-tight tracking-[-0.02em] text-zinc-950">
              {guide.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
