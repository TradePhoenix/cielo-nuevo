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
export default function CityCard({ city, index = 0 }) {
  const prefersReducedMotion = useCinematicMotion();
  const staggerDelay = `${index * HEARTBEAT.stagger}s`;

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
            <img
              src={city.heroImage}
              alt={city.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
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
          <h3 className="text-2xl font-light tracking-[-0.02em]">{city.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{city.tagline}</p>
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
