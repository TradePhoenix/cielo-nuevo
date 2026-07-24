import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { entryReveal, entryRevealReduced, useCinematicMotion, HEARTBEAT } from "../../../components/cinematicMotion";

// Your Top Matches gallery card — always represents one of the visitor's
// own matched cities, never a generic "browse all cities" tile.
//
// CX-001 prototype: proves the Path Cinematic Motion System (see
// cinematicMotion.js) on a real, already-shipped card rather than
// inventing a new homepage section for it — see CX-001's review package
// for why. Three effects layer without fighting each other, since each
// lives on a different element: the outer motion.div handles the
// whileInView entry reveal; the drift wrapper (a plain div, not the
// image) breathes continuously via CSS; the <img> itself keeps its own
// independent hover scale, so ambient and interactive motion never
// contend for the same element's `transform`. The light-movement overlay
// sits only over the photo, never the text below, so readability is
// never at risk. `index` staggers the ambient rhythm across a row of
// cards so they breathe together, not in mechanical unison.
//
// CX-007: cities with dedicated regional photography (`city.heroImages`)
// render the same <picture> breakpoint pattern as CityHero.js (mobile crop
// ≤767px, desktop crop above, WebP-preferred/JPEG-fallback). Cities still on
// the shared single-image stock photo (`city.heroImage`) keep the plain
// <img> path unchanged.
//
// CX-008 — four new optional props for the Living Destination Atlas, every
// one defaulted so every existing caller (KeepExploring.js, the old
// top-matches grid) renders byte-for-byte as before: `lang` selects the ES
// hero alt text when present; `region`/`signals` render a small metadata
// line already derived from this same city's own canonical tags/region
// (atlasGroups.js) — this component never invents or duplicates that data,
// only displays what's passed in; `isRecommended` adds a quiet badge for a
// visitor's own Blueprint matches, reusing the existing `matchReason` line
// below it rather than adding a second explanation.
export default function CityCard({ city, index = 0, lang = "en", region, signals, isRecommended, recommendedLabel }) {
  const prefersReducedMotion = useCinematicMotion();
  const staggerDelay = `${index * HEARTBEAT.stagger}s`;
  const heroAlt = (lang === "es" ? city.heroAlt?.es : city.heroAlt?.en) || city.heroAlt?.en || city.name;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={prefersReducedMotion ? entryRevealReduced : entryReveal}
    >
      <Link
        to={`/your-mexico/${city.id}`}
        className="group block overflow-hidden border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <div
            className="relative h-full w-full motion-safe:md:animate-[cinematic-drift_10s_ease-in-out_infinite]"
            style={{ animationDelay: staggerDelay }}
          >
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
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </picture>
            ) : (
              <img
                src={city.heroImage}
                alt={heroAlt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 motion-safe:md:animate-[cinematic-light_10s_ease-in-out_infinite]"
              style={{
                animationDelay: staggerDelay,
                backgroundImage: "radial-gradient(circle, rgba(216,161,95,0.22), transparent 60%)",
              }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            {isRecommended && (
              <span className="border border-[#d8a15f] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a97a3f]">
                {recommendedLabel}
              </span>
            )}
            {region && <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{region}</span>}
          </div>
          <h3 className="mt-2 text-2xl font-light tracking-[-0.02em]">{city.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{city.tagline}</p>
          {signals && signals.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
              {signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          )}
          {city.matchReason && (
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {city.matchReason}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
