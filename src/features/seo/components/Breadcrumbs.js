import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * Visible breadcrumb trail. Structured data for the same trail is emitted
 * separately by schema/breadcrumbSchema.js — this component only renders,
 * it never derives the schema (keeps the two concerns independently
 * testable and lets a page render breadcrumbs without necessarily wanting
 * the JSON-LD, or vice versa).
 * @param {{label: string, path: string}[]} crumbs
 * @param {boolean} [light]
 */
export default function Breadcrumbs({ crumbs = [], light = false }) {
  if (!crumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.25em]">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className={light ? "text-white/70" : "text-zinc-700"}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className={`rounded-sm transition hover:underline ${FOCUS_RING} ${
                    light ? "text-white/40 hover:text-white" : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span className={light ? "text-white/25" : "text-zinc-400"}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
