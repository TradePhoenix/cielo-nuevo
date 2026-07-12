import { Link } from "react-router-dom";
import { RELOCATION_ROADMAP_STAGES } from "../data/relocationRoadmap";

// The site's established focus-visible treatment (dashboard, documentVault,
// yourMexico all use this exact string) — standardized onto this
// component's links so keyboard focus matches the rest of the product.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Reusable, evergreen stage-based view of the relocation journey. Pure
// presentation over the `stages` prop — no Blueprint/Decision Engine reads,
// no AI, no localStorage, no query params. State is entirely caller-supplied
// via props, so this component stays the shared contract that a future
// personalized caller (Mexico Plan, Decision Engine) can drive without any
// markup changes here.
//
// activeStageId: the visitor's current stage (id) — shows a "You're Here"
// label and a quiet accent ring. completedStageIds: an array of stage ids
// already behind the visitor — shows a small "Completed" indicator,
// deliberately text-based (not color-only) and deliberately understated,
// matching the same philosophy already established in My Mexico Plan's
// ChapterTracker.js ("never a badge count... reward through a sentence").
// nextActionLabel optionally relabels the active stage's own action link
// (e.g. a more specific CTA) without altering the underlying data file;
// unset, it falls back to the stage's own action.label exactly as today.
//
// Every prop defaults to a no-op value, so a caller that passes nothing
// (both current usages, Work With Path To Mexico's default instance and
// Guides) renders identically to before this ticket.
export default function RelocationRoadmap({
  stages = RELOCATION_ROADMAP_STAGES,
  eyebrow = "The Relocation Journey",
  title = "Every move follows the same shape.",
  activeStageId = null,
  completedStageIds = [],
  nextActionLabel = null,
}) {
  return (
    <section className="px-6 py-20 md:px-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{eyebrow}</p>
        <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
          {title}
        </h2>

        <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => {
            const isActive = stage.id === activeStageId;
            const isCompleted = completedStageIds.includes(stage.id);

            return (
              <div
                key={stage.id}
                className={`flex flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white ${
                  isActive ? "ring-2 ring-inset ring-[#d8a15f]" : ""
                }`}
              >
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {stage.number} &middot; {stage.title}
                  </p>

                  {isActive && (
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8a15f]">
                      You're Here
                    </p>
                  )}

                  {isCompleted && !isActive && (
                    <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      Completed
                    </p>
                  )}

                  <p className="text-base leading-relaxed text-zinc-700">{stage.description}</p>
                </div>

                <div className="mt-6 space-y-2 border-t border-zinc-300 pt-5">
                  <Link
                    to={stage.action.href}
                    className={`block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 ${FOCUS_RING}`}
                  >
                    {isActive && nextActionLabel ? nextActionLabel : stage.action.label}
                  </Link>
                  {(stage.links || []).map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
