import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import NotificationList from "../components/notifications/NotificationList";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

export default function PartnerNotificationsPage() {
  const { partner, notifications, markNotificationRead, markAllNotificationsRead, unreadNotificationCount } =
    usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO
        title="Notifications"
        description="New referrals, appointments, and reminders in one place."
        path="/partner/notifications"
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Notifications</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
            Stay on top of every update.
          </h1>
        </div>
        {unreadNotificationCount > 0 && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="whitespace-nowrap border border-zinc-950 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Mark All As Read
          </button>
        )}
      </div>

      <div className="mt-8">
        <NotificationList notifications={notifications} onMarkRead={markNotificationRead} />
      </div>
    </PartnerPortalShell>
  );
}
