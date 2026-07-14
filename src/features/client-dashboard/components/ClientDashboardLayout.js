import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavIcon from "./NavIcon";
import { ClientDashboardThemeProvider } from "./ThemeContext";
import { MessagesStateProvider, useMessagesStateContext } from "./MessagesStateContext";
import { useProfileState } from "../hooks/useProfileState";
import { useSettingsState } from "../hooks/useSettingsState";
import { initials } from "../utils/formatters";

export const NAV_ITEMS = [
  { to: "/client-dashboard", label: "Home", icon: "home", end: true },
  { to: "/client-dashboard/timeline", label: "Timeline", icon: "timeline" },
  { to: "/client-dashboard/checklist", label: "Checklist", icon: "checklist" },
  { to: "/client-dashboard/documents", label: "Documents", icon: "documents" },
  { to: "/client-dashboard/appointments", label: "Appointments", icon: "appointments" },
  { to: "/client-dashboard/partners", label: "Partners", icon: "partners" },
  { to: "/client-dashboard/messages", label: "Messages", icon: "messages" },
  { to: "/client-dashboard/payments", label: "Payments", icon: "payments" },
  { to: "/client-dashboard/emergency-contacts", label: "Emergency", icon: "emergency" },
  { to: "/client-dashboard/profile", label: "Profile", icon: "profile" },
  { to: "/client-dashboard/settings", label: "Settings", icon: "settings" },
];

function NavList({ unreadCount, onNavigate, isDark }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center justify-between gap-3 px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
              isActive
                ? "bg-white/10 text-white"
                : isDark
                ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <span className="flex items-center gap-3">
            <NavIcon name={item.icon} className="h-4 w-4" />
            {item.label}
          </span>
          {item.label === "Messages" && unreadCount > 0 && (
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center bg-[#d8a15f] px-1 text-[10px] font-semibold text-zinc-950">
              {unreadCount}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

// The Client Dashboard V2's own shell: a persistent dark sidebar (desktop)
// / slide-in drawer (mobile) with 11 sections, plus a slim top bar. Kept
// entirely separate from the existing /dashboard's DashboardShell — that
// shell is built for a single page of modules; this one is a multi-page
// account portal and needs real cross-page navigation.
//
// MessagesStateProvider wraps the whole shell (not just the sidebar) so
// the sidebar's unread badge and the Messages page itself share one
// useMessagesState instance — marking a conversation read on the page
// updates the badge immediately instead of only after a remount.
export default function ClientDashboardLayout({ children }) {
  return (
    <MessagesStateProvider>
      <ClientDashboardShell>{children}</ClientDashboardShell>
    </MessagesStateProvider>
  );
}

function ClientDashboardShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { profile } = useProfileState();
  const { conversations } = useMessagesStateContext();
  const { settings } = useSettingsState();
  const isDark = settings.theme === "dark";
  const unreadCount = conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <ClientDashboardThemeProvider isDark={isDark}>
      <div className={`min-h-screen ${isDark ? "bg-zinc-950 text-white" : "bg-[#f6f1e8] text-zinc-950"}`}>
        <div
          className={`sticky top-0 z-30 flex items-center justify-between border-b px-4 py-4 sm:px-8 ${
            isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-1 text-current lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              aria-label="Open dashboard menu"
            >
              <NavIcon name="menu" className="h-5 w-5" />
            </button>
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.3em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2">
              Path To Mexico
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`hidden text-xs font-semibold uppercase tracking-[0.2em] transition hover:text-[#d8a15f] sm:inline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Back To Site
            </Link>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8a15f] text-xs font-semibold text-zinc-950">
              {initials(profile.fullName)}
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1400px]">
          <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-zinc-800 bg-zinc-950 py-6 text-white lg:flex">
            <NavList unreadCount={unreadCount} isDark />
            <div className="border-t border-zinc-800 px-4 pt-4">
              <p className="text-xs font-semibold text-white">{profile.fullName}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{profile.destinationCity}</p>
            </div>
          </aside>

          {drawerOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Dashboard navigation"
                className="absolute left-0 top-0 flex h-full w-72 flex-col justify-between bg-zinc-950 py-6 text-white"
              >
                <div>
                  <div className="flex items-center justify-between px-4 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em]">Menu</span>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                      aria-label="Close dashboard menu"
                    >
                      <NavIcon name="close" className="h-5 w-5" />
                    </button>
                  </div>
                  <NavList unreadCount={unreadCount} onNavigate={() => setDrawerOpen(false)} isDark />
                </div>
                <div className="border-t border-zinc-800 px-4 pt-4">
                  <p className="text-xs font-semibold text-white">{profile.fullName}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{profile.destinationCity}</p>
                </div>
              </div>
            </div>
          )}

          <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 sm:py-14">{children}</main>
        </div>
      </div>
    </ClientDashboardThemeProvider>
  );
}
