import SectionCard from "../SectionCard";
import { serviceLabel } from "../../mock/partnerServiceTypes";

export default function ServiceMixWidget({ serviceMix }) {
  const total = serviceMix.reduce((sum, entry) => sum + entry.count, 0) || 1;

  return (
    <SectionCard eyebrow="Breakdown" title="Service Mix">
      <div className="flex flex-col gap-3">
        {serviceMix.map((entry) => {
          const percent = Math.round((entry.count / total) * 100);
          return (
            <div key={entry.service}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-950">{serviceLabel(entry.service)}</span>
                <span className="text-zinc-500">{percent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full bg-zinc-100">
                <div className="h-1.5 bg-[#d8a15f]" style={{ width: `${percent}%` }} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
