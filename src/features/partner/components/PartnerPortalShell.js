import { Link, NavLink } from "react-router-dom";
import { initials } from "../utils/formatters";

// The Partner Portal's own shell — same "slim persistent top bar" idea as
// the client Dashboard's DashboardShell, extended with a second row of
// section nav since this portal has eight sections rather than one long
// scroll of modules. Deliberately not a boxy admin sidebar: the nav is a
// single horizontal row of the site's own eyebrow-label treatment, which
// scrolls on narrow viewports instead of collapsing into a hamburger menu
// — keeps the chrome editorial rather than "generic SaaS dashboard."
const NAV_ITEMS = [
  { to: "/partner/dashboard", label: "Dashboard" },
  { to: "/partner/clients", label: "Clients" },
  { to: "/partner/referrals", label: "Referrals" },
  { to: "/partner/messages", label: "Messages" },
  { to: "/partner/notifications", label: "Notifications" },
  { to: "/partner/performance", label: "Performance" },
  { to: "/partner/analytics", label: "Analytics" },
  { to: "/partner/profile", label: "Profile" },
];

export default function PartnerPortalShell({ children, partner, unreadNotificationCount = 0 }) {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Path To Mexico <span className="text-zinc-400">/ Partners</span>
          </Link>

          <div className="flex items-center gap-4">
            <NavLink
              to="/partner/notifications"
              aria-label={`Notifications${unreadNotificationCount > 0 ? `, ${unreadNotificationCount} unread` : ""}`}
              className="relative text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              Alerts
              {unreadNotificationCount > 0 && (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d8a15f] px-1 text-[10px] font-bold text-zinc-950">
                  {unreadNotificationCount}
                </span>
              )}
            </NavLink>

            <Link
              to="/partner/profile"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-semibold text-white">
                {initials(partner.name)}
              </span>
              <span className="hidden text-xs font-medium text-zinc-700 sm:inline">{partner.name}</span>
            </Link>
          </div>
        </div>

        <nav
          aria-label="Partner portal sections"
          className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 pb-1 text-xs font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[#d8a15f] text-zinc-950"
                    : "border-transparent text-zinc-500 hover:text-zinc-950"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">{children}</div>
    </main>
  );
}
