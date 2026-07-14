import SectionCard from "./SectionCard";
import { useClientDashboardTheme } from "./ThemeContext";

function whatsappHref(number) {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
}

export default function PartnerCard({ partner }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <SectionCard eyebrow={partner.role} title={partner.name}>
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: partner.accentColor }}
          aria-hidden="true"
        >
          {partner.initials}
        </span>
        <div>
          <p className={`text-sm font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>{partner.company}</p>
          <p className={`mt-1 text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{partner.bio}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={`tel:${partner.phone.replace(/[^0-9+]/g, "")}`}
          className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
            isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
          }`}
        >
          Call
        </a>
        <a
          href={whatsappHref(partner.whatsapp)}
          target="_blank"
          rel="noreferrer"
          className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
            isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
          }`}
        >
          WhatsApp
        </a>
        <a
          href={`mailto:${partner.email}`}
          className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
            isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
          }`}
        >
          Email
        </a>
      </div>
    </SectionCard>
  );
}
