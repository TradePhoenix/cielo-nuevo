import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * Inline contextual link list — distinct from RelatedGuides' card grid.
 * Meant for a short "keep reading" list embedded mid-article rather than
 * a full end-of-page related-content section.
 * @param {{label: string, href: string}[]} links
 */
export default function InternalLinks({ links = [], heading = "Keep Reading" }) {
  if (!links.length) return null;

  return (
    <div className="border-l-2 border-zinc-950 pl-6">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">{heading}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`rounded-sm text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 ${FOCUS_RING}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
