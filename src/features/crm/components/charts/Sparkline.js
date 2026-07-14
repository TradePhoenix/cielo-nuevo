// Single-series trend line (leads created per month). 2px line, 8px
// (r=4) point markers with native <title> tooltips, rounded line joins.
// One series — no legend needed, only direct labels on axis ticks.
export default function Sparkline({ data }) {
  if (data.length === 0) {
    return <p className="text-sm text-zinc-400">Not enough data yet.</p>;
  }

  const width = 640;
  const height = 160;
  const paddingX = 24;
  const paddingY = 20;
  const maxValue = Math.max(...data.map((point) => point.count), 1);
  const stepX = data.length > 1 ? (width - paddingX * 2) / (data.length - 1) : 0;

  const coordsFor = (index, value) => {
    const x = paddingX + stepX * index;
    const y = height - paddingY - (value / maxValue) * (height - paddingY * 2);
    return [x, y];
  };

  const linePoints = data.map((point, index) => coordsFor(index, point.count).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Leads created per month">
      <polyline points={linePoints} fill="none" stroke="#09090b" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

      {data.map((point, index) => {
        const [x, y] = coordsFor(index, point.count);
        return (
          <g key={point.label}>
            <circle cx={x} cy={y} r="4" fill="#09090b">
              <title>{`${point.label}: ${point.count} lead${point.count === 1 ? "" : "s"}`}</title>
            </circle>
            <text x={x} y={height - 4} textAnchor="middle" className="fill-zinc-400" fontSize="11">
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
