const VARIANT_STYLES = {
  info: "border-zinc-300 bg-white/55",
  tip: "border-[#d8a15f]/50 bg-[#d8a15f]/10",
  warning: "border-zinc-950 bg-[#f4f0e8]",
};

/**
 * Matches the "Quick Answer" callout pattern already used in existing
 * guide pages (e.g. CostOfLivingPage.js), formalized as a reusable
 * component instead of hand-rolled per page.
 * @param {'info'|'tip'|'warning'} [variant]
 */
export default function CalloutBox({ label, variant = "info", children }) {
  return (
    <div className={`border p-6 text-zinc-700 ${VARIANT_STYLES[variant] || VARIANT_STYLES.info}`}>
      {label && <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</p>}
      <div className="text-lg leading-relaxed">{children}</div>
    </div>
  );
}
