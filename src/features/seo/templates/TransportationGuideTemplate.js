import GuideTemplate from "./GuideTemplate";

export default function TransportationGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate guide={guide} catalogs={catalogs} options={{ showProsAndCons: false, ...options }} />
  );
}
