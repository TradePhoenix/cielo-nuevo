import { Link } from "react-router-dom";
import DestinationImageFallback from "./DestinationImageFallback";
import IllustrativeImageBadge from "./IllustrativeImageBadge";
import { getRegionIdForCity } from "../data/atlasGroups";

// City Detail's cinematic arrival moment — full-bleed (rendered via
// YourMexicoShell's `hero` slot, outside the padded content column) using
// the same existing hero photo as everywhere else in Your Mexico. Carries
// its own back-link overlay since it sits outside the shell's own.
//
// CX-003: reuses the exact ambient-drift + light-movement treatment already
// proven on the Homepage hero and CityCard.js — same keyframes, same
// motion-safe:/md: gating, so it's inert on mobile and under
// prefers-reduced-motion with zero JS check needed here. Drift lives on a
// wrapper around the <img>, never the image itself, matching the same
// no-transform-conflict rule used everywhere else in the system.
//
// CX-007: cities with dedicated regional photography (`city.heroImages`)
// render a <picture> with a CSS-media-query breakpoint (767px) choosing the
// mobile vs. desktop crop, and WebP-preferred/JPEG-fallback per crop — no JS
// viewport check. Cities still on the older single-image shared stock photo
// (`city.heroImage`) keep the plain <img> path unchanged.
//
// ENG-023: the back link and the "Path To Mexico" wordmark used to be two
// independently absolute-positioned elements sharing the same top-6 row —
// at narrow widths the longer back-link label had nothing keeping it clear
// of the wordmark, so they visually overlapped. Both now live in one flex
// container: stacked (flex-col) below sm:, so there's no shared row to
// collide on; back to the original side-by-side single row at sm: and up,
// with inset-x-10 + justify-between reproducing the exact prior left-10/
// right-10 corner positions pixel-for-pixel.
export default function CityHero({ city, backTo, backLabel, lang = "en" }) {
  const heroAlt = (lang === "es" ? city.heroAlt?.es : city.heroAlt?.en) || city.heroAlt?.en || city.name;
  const tagline = (lang === "es" ? city.tagline?.es : city.tagline?.en) || city.tagline?.en || city.tagline;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:h-[60vh] sm:min-h-[420px]">
      <div className="h-full w-full motion-safe:md:animate-[cinematic-drift_10s_ease-in-out_infinite]">
        {city.heroImages ? (
          <picture className="contents">
            <source
              media="(max-width: 767px)"
              srcSet={city.heroImages.mobile.webp}
              type="image/webp"
            />
            <source
              media="(max-width: 767px)"
              srcSet={city.heroImages.mobile.jpg}
              type="image/jpeg"
            />
            <source srcSet={city.heroImages.desktop.webp} type="image/webp" />
            <img
              src={city.heroImages.desktop.jpg}
              alt={heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        ) : city.heroImage ? (
          <img src={city.heroImage} alt={city.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <DestinationImageFallback name={city.name} regionId={getRegionIdForCity(city.id)} lang={lang} />
        )}
      </div>
      {city.imageStatus === "illustrative" && <IllustrativeImageBadge lang={lang} />}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motion-safe:md:animate-[cinematic-light_10s_ease-in-out_infinite]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(216,161,95,0.18), transparent 60%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />

      <div className="absolute inset-x-6 top-6 flex flex-col items-start gap-3 sm:inset-x-10 sm:top-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        {backTo && (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
        )}

        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
        >
          Path To Mexico
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{lang === "es" ? "Tu México" : "Your Mexico"}</p>
        <h1 className="mt-3 text-4xl font-light leading-tight tracking-[-0.03em] text-white sm:text-6xl">
          {city.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{tagline}</p>
      </div>
    </div>
  );
}
