import { Link } from "react-router-dom";

export default function ResultsCityMatch({ cityMatches }) {
  return (
    <div className="border-b border-zinc-300 py-14">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        Where You'd Thrive
      </p>
      <h3 className="text-center text-2xl font-light tracking-[-0.03em] text-zinc-950 sm:text-4xl">
        Your Top City Matches
      </h3>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cityMatches.map((city, index) => {
          const isBestMatch = index === 0;

          return (
            <div
              key={city.id}
              className={`flex flex-col justify-between border bg-white p-6 transition duration-300 ${
                isBestMatch ? "border-zinc-950 shadow-sm" : "border-zinc-300"
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {isBestMatch && (
                    <span className="bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                      Best Match
                    </span>
                  )}
                </div>

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
          );
        })}
      </div>
    </div>
  );
}
