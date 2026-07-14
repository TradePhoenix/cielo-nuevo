import GuideTemplate from "./GuideTemplate";

export default function ResidencyGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate guide={guide} catalogs={catalogs} options={{ showProsAndCons: false, ...options }} />
  );
}
