import SectionCard from "../SectionCard";
import EmptyState from "../EmptyState";
import { formatDateTime } from "../../utils/formatters";

const FORMAT_LABELS = { video: "Video Call", phone: "Phone Call", in_person: "In Person" };

export default function UpcomingAppointmentsPanel({ appointments }) {
  return (
    <SectionCard eyebrow="Upcoming" title="Appointments">
      {appointments.length === 0 ? (
        <EmptyState title="No appointments scheduled" description="New bookings will appear here." />
      ) : (
        <ul className="divide-y divide-zinc-200">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-zinc-950">{appointment.clientName}</p>
                <p className="text-sm text-zinc-500">{appointment.purpose}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-950">{formatDateTime(appointment.startsAt)}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                  {FORMAT_LABELS[appointment.format]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
