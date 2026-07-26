// DEST-003 — Photography fallback, tier 3.
//
// CityHero.js/CityCard.js already had a two-tier fallback (city.heroImages ->
// city.heroImage), but city.heroImage is itself a specific real photograph
// of one particular place (hero.jpg/lifestyle.jpg/sanctuary.jpg — all
// recognizable resort/aerial photography, not neutral stock). Reusing any of
// those under an unrelated new destination would risk exactly what this
// ticket prohibits: implying a generic image depicts a specific town. A
// solid, honest, non-photographic panel carries no such risk, never 404s,
// and never layout-shifts since it fills the same aspect-ratio box a real
// photo would. It is the fallback for any destination with neither
// city.heroImages nor city.heroImage — every one of DEST-003's 14 new
// destinations, until real regional photography is produced (see
// DEST-003-PHOTOGRAPHY-ASSET-MANIFEST.md).
const REGION_TONE = {
  "riviera-maya-caribbean": "from-[#0b3b3f] via-[#0b0b0a] to-[#0b0b0a]",
  "yucatan-interior": "from-[#3f2f14] via-[#0b0b0a] to-[#0b0b0a]",
  "gulf-coast": "from-[#0b2a3f] via-[#0b0b0a] to-[#0b0b0a]",
  "hidden-gems": "from-[#1f2f1a] via-[#0b0b0a] to-[#0b0b0a]",
};

export default function DestinationImageFallback({ name, regionId, className = "" }) {
  const tone = REGION_TONE[regionId] || "from-zinc-800 via-[#0b0b0a] to-[#0b0b0a]";

  return (
    <div
      role="img"
      aria-label={`${name} — photography coming soon`}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tone} ${className}`}
    >
      <div className="px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Path To Mexico</p>
        <p className="mt-3 text-2xl font-light tracking-[-0.02em] text-white/85 sm:text-3xl">{name}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/30">Photography Coming Soon</p>
      </div>
    </div>
  );
}
