import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

// An honest, complete "not yet connected" state — no calendar/booking API
// exists yet (a documented future integration point), so this never
// pretends to show a fabricated appointment. The one real action available
// today is offered plainly instead.
export default function UpcomingAppointmentsModule() {
  return (
    <ModuleCard eyebrow="Upcoming Appointments" title="Nothing scheduled yet">
      <p className="text-sm leading-relaxed text-zinc-600">
        Once you book a Mexico Fit Call, it will appear here automatically.
      </p>
      <Link
        to="/mexico-fit-call"
        className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Book A Mexico Fit Call
      </Link>
    </ModuleCard>
  );
}
