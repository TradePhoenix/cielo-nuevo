import { Link, NavLink } from "react-router-dom";

// Internal CRM's own shell — a persistent top bar (wordmark + back to the
// developer dashboard) plus a tab row across the CRM's five pages. Unlike
// DashboardShell (single page of modules, no tabs needed), the CRM is a
// small multi-page app, so a tab row earns its keep here without needing a
// full collapsing sidebar.
const TABS = [
  { to: "/developer/crm", label: "Dashboard", end: true },
  { to: "/developer/crm/leads", label: "Leads" },
  { to: "/developer/crm/pipeline", label: "Pipeline" },
  { to: "/developer/crm/tasks", label: "Tasks" },
  { to: "/developer/crm/analytics", label: "Analytics" },
];

export default function CrmShell({ children }) {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/developer-dashboard"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              Path To Mexico
            </Link>
            <Link
              to="/developer-dashboard"
              className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              <span className="hidden sm:inline">Back To Developer Dashboard</span>
              <span className="sm:hidden">← Back</span>
            </Link>
          </div>
          <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-zinc-400">Internal CRM</span>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6" aria-label="CRM sections">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
                  isActive
                    ? "border-zinc-950 text-zinc-950"
                    : "border-transparent text-zinc-500 hover:text-zinc-950"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">{children}</div>
    </main>
  );
}
