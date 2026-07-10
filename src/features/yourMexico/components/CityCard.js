import { Link } from "react-router-dom";

// Your Top Matches gallery card — always represents one of the visitor's
// own matched cities, never a generic "browse all cities" tile.
export default function CityCard({ city }) {
  return (
    <Link
      to={`/your-mexico/${city.id}`}
      className="group block overflow-hidden border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-light tracking-[-0.02em]">{city.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{city.tagline}</p>
        {city.matchReason && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {city.matchReason}
          </p>
        )}
      </div>
    </Link>
  );
}
