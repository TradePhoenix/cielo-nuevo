// Single-hue horizontal bar chart — magnitude/count comparisons (pipeline
// funnel, lead source breakdown). One series, so no legend is needed (the
// section heading above it names it); values are always direct-labeled
// rather than left to bar length alone, and the fill is the site's own
// near-black token, not a new chart-only color.
export default function BarChart({ data, formatValue = (value) => value }) {
  const maxValue = Math.max(...data.map((entry) => entry.count), 1);

  if (data.length === 0) {
    return <p className="text-sm text-zinc-400">Not enough data yet.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((entry) => {
        const widthPercent = Math.max((entry.count / maxValue) * 100, entry.count > 0 ? 4 : 0);
        return (
          <div key={entry.label} className="flex items-center gap-3">
            <span className="w-40 shrink-0 truncate text-xs text-zinc-500">{entry.label}</span>
            <div className="h-6 flex-1 bg-zinc-100" title={`${entry.label}: ${formatValue(entry.count)}`}>
              <div className="h-full rounded-r bg-zinc-950" style={{ width: `${widthPercent}%` }} />
            </div>
            <span className="w-14 shrink-0 text-right text-xs font-medium text-zinc-700">{formatValue(entry.count)}</span>
          </div>
        );
      })}
    </div>
  );
}
