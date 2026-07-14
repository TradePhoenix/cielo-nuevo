import { useClientDashboardTheme } from "./ThemeContext";

export default function StatCard({ label, value }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <div>
      <p className={`text-2xl font-light tracking-[-0.01em] ${isDark ? "text-white" : "text-zinc-950"}`}>{value}</p>
      <p className={`mt-1 text-xs uppercase tracking-[0.15em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{label}</p>
    </div>
  );
}
