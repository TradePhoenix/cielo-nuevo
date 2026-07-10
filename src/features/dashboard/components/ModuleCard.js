// The one reusable primitive every dashboard module is built from: a
// consistent eyebrow/title/header-action/content shape. Modules stay
// ignorant of their own layout position (full-width, half-width, etc.) —
// that's DashboardPage's grid decision, not the module's — so the same
// module can be dropped anywhere in the grid without change.
export default function ModuleCard({ eyebrow, title, action, children }) {
  return (
    <section className="border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p>}
          <h2 className="mt-1 text-xl font-light tracking-[-0.01em] sm:text-2xl">{title}</h2>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
