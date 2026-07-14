import { useClientDashboardTheme } from "./ThemeContext";

export default function PageHeader({ eyebrow, title, description, headingRef, action }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{eyebrow}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className={`mt-4 max-w-2xl text-3xl font-light leading-tight tracking-[-0.03em] outline-none sm:text-4xl ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className={`mt-3 max-w-xl text-base leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
