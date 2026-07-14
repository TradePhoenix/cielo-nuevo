import StatCard from "../StatCard";

export default function PerformanceStatsGrid({ performance }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard label="Clients Served" value={performance.clientsServed} />
      <StatCard label="Completion Rate" value={`${Math.round(performance.completionRate * 100)}%`} />
      <StatCard label="Avg Response Time" value={performance.averageResponseTime} />
      <StatCard label="Avg Completion Time" value={performance.averageCompletionTime} />
      <StatCard label="Customer Rating" value={`${performance.customerRating.toFixed(1)} / 5`} />
    </div>
  );
}
