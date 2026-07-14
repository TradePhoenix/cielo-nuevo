import StatusPill from "./StatusPill";
import { useClientDashboardTheme } from "./ThemeContext";
import { formatDate } from "../utils/formatters";

const DOT_STYLES = {
  completed: "bg-emerald-500 border-emerald-500",
  current: "bg-[#d8a15f] border-[#d8a15f]",
  upcoming: "border-zinc-400 bg-transparent",
};

export default function TimelineStageRow({ stage, isLast }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${DOT_STYLES[stage.status]}`} aria-hidden="true" />
        {!isLast && <span className={`w-px flex-1 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} aria-hidden="true" />}
      </div>
      <div className={`pb-10 ${isLast ? "" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>{stage.title}</h3>
          <StatusPill status={stage.status} />
        </div>
        {stage.date && (
          <p className={`mt-1 text-xs uppercase tracking-[0.15em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
            {formatDate(stage.date)}
          </p>
        )}
        <p className={`mt-2 max-w-xl text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{stage.description}</p>
      </div>
    </div>
  );
}
