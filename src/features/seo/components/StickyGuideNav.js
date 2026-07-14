const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * A slim, sticky in-page nav for jumping between guide sections on long
 * pages. Deliberately anchor-only (no scroll-spy JS) — CSS `sticky`
 * positioning plus native hash navigation covers the "sticky navigation"
 * requirement without extra state or observers.
 * @param {{id: string, label: string}[]} items
 */
export default function StickyGuideNav({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="sticky top-0 z-40 overflow-x-auto border-b border-zinc-300 bg-[#f4f0e8]/95 backdrop-blur-sm">
      <ul className="mx-auto flex max-w-4xl gap-6 whitespace-nowrap px-6 py-4 text-xs uppercase tracking-[0.2em] text-zinc-600 md:px-20">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={`rounded-sm transition hover:text-zinc-950 ${FOCUS_RING}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
