const TEXT = {
  en: "Illustrative image",
  es: "Imagen ilustrativa",
};

// Discreet disclosure for the temporary AI-created concept imagery installed
// for DEST-003's 14 new destinations (see DEST-003-PHOTOGRAPHY-ASSET-MANIFEST.md).
// Renders only when a city's own `imageStatus` field is "illustrative" — that
// single field is the switch: once a destination's real photography lands,
// removing (or changing) `imageStatus` on that city's cityDetails.js entry
// makes this badge disappear everywhere it's used, with no other code touched.
export default function IllustrativeImageBadge({ lang = "en" }) {
  const label = TEXT[lang] || TEXT.en;

  return (
    <span className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-sm bg-black/55 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm sm:bottom-3 sm:right-3">
      {label}
    </span>
  );
}
