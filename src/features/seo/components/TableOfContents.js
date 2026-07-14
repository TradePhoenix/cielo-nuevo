const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * @param {{id: string, label: string}[]} items
 */
export default function TableOfContents({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="border border-zinc-300 bg-white/55 p-6 md:p-8">
      <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">On This Page</p>
      <ol className="space-y-3">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex gap-3 rounded-sm text-zinc-700 transition hover:text-zinc-950 ${FOCUS_RING}`}
            >
              <span className="text-zinc-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="leading-snug">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
