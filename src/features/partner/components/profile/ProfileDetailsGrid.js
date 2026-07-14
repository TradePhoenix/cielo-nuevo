import SectionCard from "../SectionCard";

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</p>
      <p className="mt-1 text-sm text-zinc-950">{value}</p>
    </div>
  );
}

export default function ProfileDetailsGrid({ partner }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <SectionCard eyebrow="Coverage" title="Where You Work">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Coverage Area" value={partner.coverageArea} />
          <DetailField label="Languages" value={partner.languages.join(", ")} />
          <DetailField label="Business Hours" value={partner.businessHours} />
          <DetailField label="Emergency Availability" value={partner.emergencyAvailability ? "Available" : "Not Available"} />
        </div>
      </SectionCard>

      <SectionCard eyebrow="Contact" title="How Clients Reach You">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Email" value={partner.contact.email} />
          <DetailField label="Phone" value={partner.contact.phone} />
          <DetailField
            label="Website"
            value={
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition hover:text-[#a97638] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              >
                {partner.website.replace(/^https?:\/\//, "")}
              </a>
            }
          />
        </div>
      </SectionCard>
    </div>
  );
}
