import GuideTemplate from "./GuideTemplate";

export default function RemoteWorkerGuideTemplate({ guide, catalogs, options }) {
  return <GuideTemplate guide={guide} catalogs={catalogs} options={{ showProsAndCons: true, ...options }} />;
}
