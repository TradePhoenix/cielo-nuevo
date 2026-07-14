import { Link } from "react-router-dom";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

/**
 * @param {import('../types/city').CityRecord[]} cities
 */
export default function RelatedCities({ cities = [] }) {
  if (!cities.length) return null;

  return (
    <div>
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">Explore These Cities</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.id}
            to={city.href || "/your-mexico"}
            className={`block border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl ${FOCUS_RING}`}
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">{city.region}</p>
            <h3 className="mb-3 text-2xl font-light tracking-[-0.03em] text-zinc-950">{city.name}</h3>
            <p className="leading-relaxed text-zinc-600">{city.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
