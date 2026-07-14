import { useEffect, useMemo, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import AppointmentCard from "../components/AppointmentCard";
import EmptyState from "../components/EmptyState";
import { APPOINTMENTS } from "../mock/mockAppointments";
import SEO from "../../../components/SEO";

function AppointmentsContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const upcoming = useMemo(() => APPOINTMENTS.filter((appointment) => appointment.status === "upcoming"), []);
  const completed = useMemo(() => APPOINTMENTS.filter((appointment) => appointment.status === "completed"), []);

  return (
    <div className="mx-auto max-w-4xl">
      <SEO
        title="Appointments"
        description="Every call with your team, past and upcoming, with all the details you need."
        path="/client-dashboard/appointments"
      />
      <PageHeader
        eyebrow="Appointments"
        title="Every call with your team, in one place."
        description="Upcoming and completed calls with your concierge and partners — details, timezones, and notes included."
        headingRef={headingRef}
      />

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Upcoming</p>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {upcoming.length > 0 ? (
            upcoming.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)
          ) : (
            <SectionCard className="sm:col-span-2">
              <EmptyState title="No upcoming appointments" description="Your concierge will schedule the next one soon." />
            </SectionCard>
          )}
        </div>
      </div>

      <div className="mt-12">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Completed</p>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {completed.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Routed /client-dashboard/appointments
export default function AppointmentsPage() {
  return (
    <ClientDashboardLayout>
      <AppointmentsContent />
    </ClientDashboardLayout>
  );
}
