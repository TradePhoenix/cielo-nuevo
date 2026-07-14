import { serviceLabel } from "../../mock/partnerServiceTypes";

export default function ProfileHeader({ partner }) {
  return (
    <div className="flex flex-col items-start gap-6 border-b border-zinc-200 pb-8 sm:flex-row sm:items-center">
      <img
        src={partner.photoUrl}
        alt={partner.name}
        className="h-20 w-20 shrink-0 rounded-full object-cover"
      />
      <div>
        <h1 className="text-3xl font-light tracking-[-0.02em] sm:text-4xl">{partner.name}</h1>
        <p className="mt-1 text-lg text-zinc-600">{partner.company}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {partner.services.map((service) => (
            <span key={service} className="border border-zinc-300 px-2.5 py-1 text-xs uppercase tracking-[0.1em] text-zinc-600">
              {serviceLabel(service)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
