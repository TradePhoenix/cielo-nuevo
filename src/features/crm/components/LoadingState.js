// Simple skeleton block set — used while CRM data "loads" (a brief
// simulated delay in CRM Foundation V1, matching the pattern a real
// paginated backend fetch would eventually need anyway).
export default function LoadingState({ rows = 4 }) {
  return (
    <div className="space-y-3" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading CRM data…</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse border border-zinc-200 bg-white" />
      ))}
    </div>
  );
}
