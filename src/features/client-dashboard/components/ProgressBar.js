import { useClientDashboardTheme } from "./ThemeContext";

export default function ProgressBar({ percent, label }) {
  const { isDark } = useClientDashboardTheme();
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{label}</p>
          <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{clamped}%</p>
        </div>
      )}
      <div className={`h-1.5 w-full overflow-hidden ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}>
        <div
          className="h-full bg-[#d8a15f] transition-all duration-500"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
