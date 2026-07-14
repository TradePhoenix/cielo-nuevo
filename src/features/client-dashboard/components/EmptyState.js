import { useClientDashboardTheme } from "./ThemeContext";

export default function EmptyState({ title, description }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <div className={`border border-dashed p-8 text-center ${isDark ? "border-zinc-700" : "border-zinc-300"}`}>
      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{title}</p>
      {description && <p className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{description}</p>}
    </div>
  );
}
