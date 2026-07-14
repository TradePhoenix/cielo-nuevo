import GuideTemplate from "./GuideTemplate";

// "X vs Y" guides — the comparison table is the whole point, so it's on
// by default here and nowhere else.
export default function ComparisonGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showComparisonTable: true, showProsAndCons: true, showRelatedCities: true, ...options }}
    />
  );
}
