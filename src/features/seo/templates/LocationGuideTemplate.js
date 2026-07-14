import GuideTemplate from "./GuideTemplate";

// "Moving to X" / "Best areas to live in X" style guides — galleries and
// nearby-city cross-links pull their weight here in a way they don't for
// e.g. a tax or pet guide.
export default function LocationGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showGallery: true, showRelatedCities: true, ...options }}
    />
  );
}
