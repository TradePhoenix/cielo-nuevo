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
//
// `lang` (default "en"): found during the Cozumel image-audit follow-up —
// this panel's copy was hardcoded English with no Spanish variant, so every
// new destination's ES-toggled view still showed an English fallback. Same
// optional-prop pattern already established by FitCallBar.js/CityCard.js.
const REGION_TONE = {
  "riviera-maya-caribbean": "from-[#0b3b3f] via-[#0b0b0a] to-[#0b0b0a]",
  "yucatan-interior": "from-[#3f2f14] via-[#0b0b0a] to-[#0b0b0a]",
  "gulf-coast": "from-[#0b2a3f] via-[#0b0b0a] to-[#0b0b0a]",
  "hidden-gems": "from-[#1f2f1a] via-[#0b0b0a] to-[#0b0b0a]",
};

const TEXT = {
  en: { brand: "Path To Mexico", note: "Photography Coming Soon" },
  es: { brand: "Path To Mexico", note: "Fotografía Próximamente" },
};

export default function DestinationImageFallback({ name, regionId, className = "", lang = "en" }) {
  const tone = REGION_TONE[regionId] || "from-zinc-800 via-[#0b0b0a] to-[#0b0b0a]";
  const t = TEXT[lang] || TEXT.en;
  const ariaLabel =
    lang === "es" ? `${name} — fotografía próximamente` : `${name} — photography coming soon`;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tone} ${className}`}
    >
      <div className="px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{t.brand}</p>
        <p className="mt-3 text-2xl font-light tracking-[-0.02em] text-white/85 sm:text-3xl">{name}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/30">{t.note}</p>
      </div>
    </div>
  );
}
