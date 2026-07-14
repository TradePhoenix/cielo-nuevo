import SectionCard from "../SectionCard";

// A plain CSS bar chart — no charting library. Bar height is a percentage
// of the series max, computed inline rather than via a dependency, which
// is all six months of mock data need.
export default function MonthlyReferralsWidget({ monthlyReferrals }) {
  const max = Math.max(...monthlyReferrals.map((entry) => entry.count), 1);

  return (
    <SectionCard eyebrow="Trend" title="Monthly Referrals">
      <div className="flex h-40 items-end gap-4">
        {monthlyReferrals.map((entry) => (
          <div key={entry.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <div
                className="w-full bg-zinc-950 transition-all"
                style={{ height: `${Math.round((entry.count / max) * 100)}%` }}
                aria-hidden="true"
              />
            </div>
            <p className="text-xs text-zinc-500">{entry.month}</p>
            <p className="text-xs font-semibold text-zinc-950">{entry.count}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
