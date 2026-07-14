export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="border border-dashed border-zinc-300 bg-white px-8 py-16 text-center">
      <h3 className="text-2xl font-light tracking-[-0.02em] text-zinc-950">{title}</h3>
      {description && <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center bg-zinc-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#d8a15f] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
