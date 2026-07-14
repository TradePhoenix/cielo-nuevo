import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * @param {import('../types/service').ServiceRecord[]} services
 */
export default function RelatedServices({ services = [] }) {
  if (!services.length) return null;

  return (
    <div>
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">Ways We Can Help</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.id}
            to={service.href}
            className={`flex items-center justify-between gap-6 border border-zinc-950 p-6 text-zinc-950 transition hover:bg-zinc-950 hover:text-white ${FOCUS_RING}`}
          >
            <span>
              <span className="mb-1 block text-lg font-light tracking-[-0.02em]">{service.title}</span>
              <span className="block text-sm leading-relaxed opacity-70">{service.description}</span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
