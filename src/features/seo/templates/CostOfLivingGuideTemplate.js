import GuideTemplate from "./GuideTemplate";

// Budget-driven guides read better as numbers (QuickFacts) than as a
// pros/cons framing.
export default function CostOfLivingGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate
      guide={guide}
      catalogs={catalogs}
      options={{ showQuickFacts: true, showProsAndCons: false, ...options }}
    />
  );
}
