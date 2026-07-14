import { Link } from "react-router-dom";
import SectionCard from "../SectionCard";
import StatCard from "../StatCard";

export default function PerformanceSummaryPanel({ performance }) {
  return (
    <SectionCard
      eyebrow="Performance"
      title="Your Summary"
      action={
        <Link
          to="/partner/performance"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Full Report
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Completion Rate" value={`${Math.round(performance.completionRate * 100)}%`} />
        <StatCard label="Avg Response" value={performance.averageResponseTime} />
        <StatCard label="Avg Completion" value={performance.averageCompletionTime} />
        <StatCard label="Rating" value={`${performance.customerRating.toFixed(1)} / 5`} />
      </div>
    </SectionCard>
  );
}
