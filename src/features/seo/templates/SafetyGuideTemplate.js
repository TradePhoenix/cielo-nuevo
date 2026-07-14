import GuideTemplate from "./GuideTemplate";

export default function SafetyGuideTemplate({ guide, catalogs, options }) {
  return <GuideTemplate guide={guide} catalogs={catalogs} options={{ showProsAndCons: true, ...options }} />;
}
