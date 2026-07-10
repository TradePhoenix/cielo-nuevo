import { Link } from "react-router-dom";

// City Detail's cinematic arrival moment — full-bleed (rendered via
// YourMexicoShell's `hero` slot, outside the padded content column) using
// the same existing hero photo as everywhere else in Your Mexico. Carries
// its own back-link overlay since it sits outside the shell's own.
export default function CityHero({ city, backTo, backLabel }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:h-[60vh] sm:min-h-[420px]">
      <img src={city.heroImage} alt={city.name} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />

      {backTo && (
        <Link
          to={backTo}
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a] sm:left-10 sm:top-10"
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
      )}

      <Link
        to="/"
        className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a] sm:right-10 sm:top-10"
      >
        Path To Mexico
      </Link>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your Mexico</p>
        <h1 className="mt-3 text-4xl font-light leading-tight tracking-[-0.03em] text-white sm:text-6xl">
          {city.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{city.tagline}</p>
      </div>
    </div>
  );
}
