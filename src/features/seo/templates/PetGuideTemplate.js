import GuideTemplate from "./GuideTemplate";

export default function PetGuideTemplate({ guide, catalogs, options }) {
  return (
    <GuideTemplate guide={guide} catalogs={catalogs} options={{ showProsAndCons: false, ...options }} />
  );
}
