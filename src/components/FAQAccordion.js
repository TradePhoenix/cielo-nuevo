import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { useCinematicMotion } from "./cinematicMotion";

// Single-open accordion (activating a question closes whichever was open) —
// kept as its own component since an accordion is a generic, reusable
// pattern, not something specific to the page that happens to use it first.
//
// Each panel stays mounted at all times and is expanded/collapsed via a CSS
// grid-template-rows 0fr/1fr transition (not display:none / height:auto),
// which animates smoothly without JS measuring actual content height. The
// full answer text is always present in the DOM regardless of open state.
// `aria-expanded` on the trigger button communicates state; `aria-hidden` on
// the collapsed panel keeps it out of the accessibility tree (it can't use
// `hidden`/`display:none`, since that would also kill the grid-rows
// transition — that's why `aria-hidden`, not `hidden`, does this job here).
// `role="region"` plus `aria-labelledby` name the expanded panel by its own
// question for assistive tech.
export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();
  const prefersReducedMotion = useCinematicMotion();

  return (
    <div className="mx-auto mt-14 max-w-4xl divide-y divide-zinc-200 border-y border-zinc-200">
      {items.map(([question, answer, link], index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <div key={index}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition hover:text-[#a97a3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              >
                <span className="text-lg font-medium tracking-[-0.01em] text-zinc-950 sm:text-xl">{question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-2xl font-light text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className="grid"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: prefersReducedMotion ? "none" : "grid-template-rows 300ms ease-in-out",
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 leading-relaxed text-zinc-600">
                  {answer}
                  {link && (
                    <>
                      {" "}
                      <Link
                        to={link.to}
                        className="font-semibold text-[#007C83] underline decoration-1 underline-offset-4 transition hover:text-[#103D33]"
                      >
                        {link.label}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
