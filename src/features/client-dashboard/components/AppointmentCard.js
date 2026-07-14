import SectionCard from "./SectionCard";
import StatusPill from "./StatusPill";
import { useClientDashboardTheme } from "./ThemeContext";
import { formatDate } from "../utils/formatters";

export default function AppointmentCard({ appointment }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <SectionCard
      eyebrow={`${appointment.withRole} · ${appointment.method}`}
      title={appointment.title}
      action={<StatusPill status={appointment.status === "upcoming" ? "current" : "completed"} />}
    >
      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>
        {formatDate(appointment.date)} &middot; {appointment.time} {appointment.timezone}
      </p>
      <p className={`mt-1 text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>With {appointment.withName}</p>
      {appointment.notes && (
        <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{appointment.notes}</p>
      )}
    </SectionCard>
  );
}
