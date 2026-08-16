import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 5 — the locations, as an editorial collage: a wide Caribbean
// lead, alternating tile widths, four honest photographs, and two
// deliberately designed tonal plates for the categories that have no
// truthful photography yet. The plates carry the same typographic
// treatment as the photo tiles so the composition reads finished, not
// pending. The permissions caveat is quiet but always present.
//
// Photo tiles (all real, existing PTM region assets):
//   caribbean → riviera-maya aerial coastline, golden hour
//   jungle    → playa-del-carmen canopy lane opening to the sea
//   hacienda  → merida carved stone doorway, lantern light
//   unexpected→ celestun flamingo lagoon at dawn
// Designed plates awaiting photography:
//   cenote → image slot: cenoteCeremonyWide (wide cenote ceremony,
//            natural light shaft, water reflection)
//   villa  → image slot: privateVillaWedding (private villa at dusk,
//            candlelit long table, warm interior/exterior)
const VENUE_MEDIA = {
  caribbean: { image: "/regions/riviera-maya/riviera-maya", span: "md:col-span-7", height: "h-72 md:h-[480px]" },
  jungle: { image: "/regions/playa-del-carmen/playa-del-carmen", span: "md:col-span-5", height: "h-72 md:h-[480px]" },
  cenote: {
    plate: "bg-gradient-to-b from-[#13292d] via-[#0d1c1f] to-[#0b0e0e]",
    glow: "bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(120,180,182,0.16),transparent)]",
    span: "md:col-span-4",
    height: "h-60 md:h-[400px]",
  },
  hacienda: { image: "/regions/merida/merida", span: "md:col-span-8", height: "h-72 md:h-[400px]" },
  villa: {
    plate: "bg-gradient-to-b from-[#282218] via-[#181410] to-[#0e0c0a]",
    glow: "bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(216,161,95,0.16),transparent)]",
    span: "md:col-span-5",
    height: "h-60 md:h-[420px]",
  },
  unexpected: { image: "/regions/celestun/celestun", span: "md:col-span-7", height: "h-72 md:h-[420px]" },
};

function TileText({ venue }) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
      <h3 className="ptm-editorial text-3xl leading-none tracking-[-0.02em] text-white md:text-4xl">{venue.name}</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{venue.text}</p>
    </div>
  );
}

export default function WeddingLocations({ t }) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <section className="bg-[#0b0b0a] px-6 py-20 text-white md:px-12 md:py-32">
      <CinematicReveal className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.label}</p>
        <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.title}</h2>
      </CinematicReveal>

      <CinematicReveal stagger className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12">
        {t.venues.map((venue) => {
          const media = VENUE_MEDIA[venue.id] || {};
          return (
            <motion.div
              key={venue.id}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className={`group relative overflow-hidden ${media.span || ""} ${media.height || "h-72"}`}
            >
              {media.image ? (
                <>
                  <picture>
                    <source type="image/webp" srcSet={`${media.image}-hero-desktop.webp`} />
                    <img
                      src={`${media.image}-hero-desktop.jpg`}
                      alt={venue.imageAlt || ""}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </picture>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0a]/85 via-[#0b0b0a]/15 to-transparent"
                  />
                </>
              ) : (
                <>
                  <div aria-hidden="true" className={`absolute inset-0 ${media.plate} ring-1 ring-inset ring-white/10`} />
                  {media.glow && <div aria-hidden="true" className={`absolute inset-0 ${media.glow}`} />}
                </>
              )}
              <TileText venue={venue} />
            </motion.div>
          );
        })}
      </CinematicReveal>

      <CinematicReveal className="mx-auto mt-12 max-w-7xl">
        <p className="max-w-3xl border-l border-[#e36f4f]/40 pl-5 text-sm leading-relaxed text-white/50">
          {t.caveat}
        </p>
      </CinematicReveal>
    </section>
  );
}
