const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * @param {{label: string, href: string}[]} resources
 */
export default function ExternalResources({ resources = [] }) {
  if (!resources.length) return null;

  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">External Resources</p>
      <ul className="space-y-2">
        {resources.map((resource) => (
          <li key={resource.href}>
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-sm text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 ${FOCUS_RING}`}
            >
              {resource.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
