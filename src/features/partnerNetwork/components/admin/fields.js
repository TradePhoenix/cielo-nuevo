// Small shared form primitives for the internal Partner Network admin.
// Internal-tool styling: same token vocabulary as the public site (cream,
// zinc, square corners) but denser, since this screen is a working ledger
// for Kalen — not a marketing surface.

export const adminInputClass =
  "w-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus-visible:ring-2 focus-visible:ring-[#d8a15f]";

export function AdminField({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-zinc-400">{hint}</p>}
    </label>
  );
}

export function AdminInput({ value, onChange, type = "text", ...rest }) {
  return (
    <input
      type={type}
      className={adminInputClass}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function AdminTextarea({ value, onChange, rows = 3, ...rest }) {
  return (
    <textarea
      rows={rows}
      className={adminInputClass}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function AdminSelect({ value, onChange, options, allowEmpty = false, ...rest }) {
  return (
    <select className={adminInputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest}>
      {allowEmpty && <option value="">—</option>}
      {options.map((opt) => {
        const [val, label] = Array.isArray(opt) ? opt : [opt, opt];
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export function AdminSection({ title, badge, children }) {
  return (
    <section className="border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-950">{title}</h3>
        {badge}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function PrivateBadge() {
  return (
    <span className="border border-zinc-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
      Private — never public
    </span>
  );
}

export function AdminButton({ onClick, children, tone = "dark", type = "button", disabled }) {
  const tones = {
    dark: "bg-zinc-950 text-white hover:bg-[#d8a15f]",
    quiet: "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950",
    danger: "border border-zinc-300 bg-white text-[#b3543f] hover:border-[#b3543f]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function StatusPill({ value, toneMap }) {
  const tone = (toneMap && toneMap[value]) || "neutral";
  const tones = {
    good: "bg-[#eef3ec] text-[#2f5d3a] border-[#c9d8c6]",
    warn: "bg-[#f9f1e3] text-[#8a6220] border-[#e6d3ae]",
    bad: "bg-[#f8ecea] text-[#8a3b2c] border-[#e4c4bc]",
    neutral: "bg-zinc-100 text-zinc-600 border-zinc-200",
  };
  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {value || "—"}
    </span>
  );
}

export const PARTNER_STATUS_TONES = {
  Applicant: "neutral",
  "Under Review": "warn",
  Approved: "good",
  Active: "good",
  Paused: "warn",
  Suspended: "bad",
  Terminated: "bad",
};

export const AGREEMENT_STATUS_TONES = {
  Draft: "neutral",
  Sent: "warn",
  Viewed: "warn",
  Accepted: "good",
  "PTM Approved": "good",
  Active: "good",
  Expired: "bad",
  Terminated: "bad",
};

export const REFERRAL_STATUS_TONES = {
  Introduced: "neutral",
  Contacted: "warn",
  Consultation: "warn",
  "In Progress": "warn",
  Converted: "good",
  Lost: "bad",
  Cancelled: "bad",
};

export const PAYMENT_STATUS_TONES = {
  None: "neutral",
  Pending: "warn",
  Earned: "warn",
  Invoiced: "warn",
  Paid: "good",
  Refunded: "bad",
};

export function formatMoney(value, currency) {
  const num = Number(value);
  if (!value || Number.isNaN(num)) return "—";
  return `${num.toLocaleString("en-US", { maximumFractionDigits: 0 })} ${currency || ""}`.trim();
}

export function formatDate(iso) {
  if (!iso) return "—";
  // Date-only strings would otherwise parse as UTC midnight and display one
  // day early in Mexican timezones.
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
