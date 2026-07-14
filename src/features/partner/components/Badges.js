import { clientStatusConfig, priorityConfig, referralProgressConfig } from "../utils/statusConfig";

// One small fixed palette for every badge in the portal — no stoplight
// red/green, consistent with the site's restrained gold-accent-only
// design language. "urgent" is the sole exception that reads as a warning
// (deep zinc-950-on-cream border, not red) so priority/attention states
// stay legible without breaking the palette rule.
const TONE_CLASSES = {
  neutral: "border-zinc-300 text-zinc-600",
  gold: "border-[#d8a15f] text-[#a97638]",
  dark: "border-zinc-950 text-zinc-950",
  urgent: "border-zinc-950 bg-zinc-950 text-white",
};

function Badge({ label, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const config = clientStatusConfig(status);
  return <Badge label={config.label} tone={config.tone} />;
}

export function ReferralProgressBadge({ status }) {
  const config = referralProgressConfig(status);
  return <Badge label={config.label} tone={config.tone} />;
}

export function PriorityBadge({ priority }) {
  const config = priorityConfig(priority);
  return <Badge label={config.label} tone={config.tone} />;
}

export default Badge;
