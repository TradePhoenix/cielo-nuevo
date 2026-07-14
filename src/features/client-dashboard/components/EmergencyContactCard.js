import SectionCard from "./SectionCard";
import { useClientDashboardTheme } from "./ThemeContext";

function whatsappHref(number) {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
}

export default function EmergencyContactCard({ contact }) {
  const { isDark } = useClientDashboardTheme();
  const mutedText = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <SectionCard eyebrow={contact.label} title={contact.name}>
      <p className={`text-lg font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>{contact.phone}</p>
      {contact.address && <p className={`mt-2 text-sm ${mutedText}`}>{contact.address}</p>}
      {contact.availability && <p className={`mt-2 text-sm ${mutedText}`}>{contact.availability}</p>}

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
          className="bg-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Call Now
        </a>
        {contact.whatsapp && (
          <a
            href={whatsappHref(contact.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
              isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
            }`}
          >
            WhatsApp
          </a>
        )}
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
              isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
            }`}
          >
            Email
          </a>
        )}
      </div>
    </SectionCard>
  );
}
