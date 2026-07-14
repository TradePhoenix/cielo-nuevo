import GuideTemplate from "./GuideTemplate";

export default function NeighborhoodGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showGallery: true, showRelatedCities: true, showQuickFacts: true, ...options }}
    />
  );
}
