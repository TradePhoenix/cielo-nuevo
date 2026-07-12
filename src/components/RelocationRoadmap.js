import { Link } from "react-router-dom";
import { RELOCATION_ROADMAP_STAGES } from "../data/relocationRoadmap";

// Reusable, evergreen stage-based view of the relocation journey. Pure
// presentation over the `stages` prop — no Blueprint/Decision Engine
// reads, no AI. `activeStageId` is accepted now so a future,
// personalized version (e.g. highlighting the visitor's stage from a
// completed Blueprint) can be added by passing a value here, without
// changing this component's markup or callers that don't pass it.
export default function RelocationRoadmap({
  stages = RELOCATION_ROADMAP_STAGES,
  eyebrow = "The Relocation Journey",
  title = "Every move follows the same shape.",
  activeStageId = null,
}) {
  return (
    <section className="px-6 py-20 md:px-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{eyebrow}</p>
        <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
          {title}
        </h2>

        <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`flex flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white ${
                stage.id === activeStageId ? "ring-2 ring-inset ring-[#d8a15f]" : ""
              }`}
            >
              <div>
                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {stage.number} &middot; {stage.title}
                </p>
                <p className="text-base leading-relaxed text-zinc-700">{stage.description}</p>
              </div>

              <div className="mt-6 space-y-2 border-t border-zinc-300 pt-5">
                <Link
                  to={stage.action.href}
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950"
                >
                  {stage.action.label}
                </Link>
                {(stage.links || []).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
