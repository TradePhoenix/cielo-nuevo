import { Link } from "react-router-dom";
import { StatusBadge, PriorityBadge } from "../Badges";
import { serviceLabel } from "../../mock/partnerServiceTypes";
import { formatDate } from "../../utils/formatters";

export default function ClientCard({ client }) {
  return (
    <article className="flex flex-col border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-zinc-950">{client.name}</h3>
          <p className="mt-0.5 text-sm text-zinc-500">
            {client.country} &rarr; {client.destination}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusBadge status={client.status} />
          <PriorityBadge priority={client.priority} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-zinc-500">Current Stage</dt>
          <dd className="mt-0.5 text-zinc-950">{client.currentStage}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-zinc-500">Move Date</dt>
          <dd className="mt-0.5 text-zinc-950">{formatDate(client.moveDate)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs uppercase tracking-[0.15em] text-zinc-500">Assigned Services</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {client.assignedServices.map((service) => (
              <span key={service} className="border border-zinc-300 px-2 py-1 text-xs text-zinc-600">
                {serviceLabel(service)}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3 border-t border-zinc-200 pt-4">
        <Link
          to="/partner/messages"
          className="flex-1 border border-zinc-950 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Message
        </Link>
        <Link
          to="/partner/referrals"
          className="flex-1 border border-zinc-300 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          View Referrals
        </Link>
      </div>
    </article>
  );
}
