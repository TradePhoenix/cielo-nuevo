// Same eyebrow/title/action/content primitive as the client Dashboard's
// ModuleCard — reused under a portal-scoped name rather than importing
// across feature folders, so partner/ stays self-contained per the
// ticket's ARCHITECTURE requirement.
export default function SectionCard({ eyebrow, title, action, children, className = "" }) {
  return (
    <section className={`border border-zinc-200 bg-white p-6 sm:p-8 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p>}
          {title && <h2 className="mt-1 text-xl font-light tracking-[-0.01em] sm:text-2xl">{title}</h2>}
        </div>
        {action}
      </div>
      <div className={title || eyebrow ? "mt-5" : ""}>{children}</div>
    </section>
  );
}
