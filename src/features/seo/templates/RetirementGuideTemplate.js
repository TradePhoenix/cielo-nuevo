import GuideTemplate from "./GuideTemplate";

export default function RetirementGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showProsAndCons: true, showRelatedCities: true, ...options }}
    />
  );
}
