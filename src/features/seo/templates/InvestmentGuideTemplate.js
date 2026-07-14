import GuideTemplate from "./GuideTemplate";

// Real-estate/investment guides often want a comparison table (e.g. cap
// rate by area) alongside pros/cons, but only when the guide record
// actually supplies comparisonTable data — GuideTemplate already no-ops
// the table section when that data is absent.
export default function InvestmentGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showProsAndCons: true, showComparisonTable: true, ...options }}
    />
  );
}
