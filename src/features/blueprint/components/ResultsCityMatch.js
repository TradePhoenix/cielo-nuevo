import { Link } from "react-router-dom";

// CX-005 — receives only the *secondary* matches now (BlueprintApp.js
// passes topCityMatches.slice(1)); the primary match has its own,
// earlier, dedicated reveal in ResultsDiscovery.js so it doesn't compete
// for attention here. No "Best Match" badge or rank numbering — none of
// the cities shown in this list is "the" match, they're honestly framed
// as other places worth a look.
export default function ResultsCityMatch({ cityMatches }) {
  if (!cityMatches || cityMatches.length === 0) return null;

  return (
    <div className="border-b border-zinc-300 py-14">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        Also Worth A Look
      </p>
      <h3 className="text-center text-2xl font-light tracking-[-0.03em] text-zinc-950 sm:text-4xl">
        Other Places That Could Fit
      </h3>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {cityMatches.map((city) => (
          <div
            key={city.id}
            className="flex flex-col justify-between border border-zinc-300 bg-white p-6 transition duration-300"
          >
            <div>
              <h4 className="text-2xl font-light tracking-[-0.02em] text-zinc-950">
                {city.name}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{city.teaser}</p>

              <p className="mt-5 border-t border-zinc-200 pt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {city.matchReason}
              </p>
            </div>

            <Link
              to={city.guideLink}
              className="mt-6 inline-flex items-center justify-center border border-zinc-950 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              Read The Guide →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
