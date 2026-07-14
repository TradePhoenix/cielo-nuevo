import { useClientDashboardTheme } from "./ThemeContext";

// The one reusable primitive every Client Dashboard V2 section is built
// from — mirrors the existing dashboard's ModuleCard shape (eyebrow/title/
// action/content) so the two dashboards read as the same product, but
// lives in its own feature folder and is theme-aware for the Settings
// dark/light toggle.
export default function SectionCard({ eyebrow, title, description, action, children, className = "" }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <section
      className={`border p-6 sm:p-8 ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"} ${className}`}
    >
      {(eyebrow || title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{eyebrow}</p>
            )}
            {title && (
              <h2 className={`mt-1 text-xl font-light tracking-[-0.01em] sm:text-2xl ${isDark ? "text-white" : "text-zinc-950"}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-2 max-w-xl text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={eyebrow || title || action ? "mt-5" : ""}>{children}</div>
    </section>
  );
}
