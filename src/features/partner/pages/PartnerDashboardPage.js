import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import StatCard from "../components/StatCard";
import WelcomePanel from "../components/dashboard/WelcomePanel";
import UpcomingAppointmentsPanel from "../components/dashboard/UpcomingAppointmentsPanel";
import MessagesPreviewPanel from "../components/dashboard/MessagesPreviewPanel";
import NotificationsPreviewPanel from "../components/dashboard/NotificationsPreviewPanel";
import PerformanceSummaryPanel from "../components/dashboard/PerformanceSummaryPanel";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

// Routed /partner/dashboard — the portal's landing screen. No auth: this
// always renders as the one mock partner (see usePartnerPortalStore),
// matching the same no-auth pattern the client Dashboard uses.
export default function PartnerDashboardPage() {
  const {
    partner,
    clients,
    newReferrals,
    pendingReferrals,
    completedReferrals,
    appointments,
    conversations,
    notifications,
    performance,
    unreadNotificationCount,
  } = usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO
        title="Partner Dashboard"
        description="Manage referrals, clients, and messages as a Path To Mexico partner."
        path="/partner/dashboard"
      />

      <WelcomePanel partner={partner} />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Assigned Clients" value={clients.length} />
        <StatCard label="New Referrals" value={newReferrals.length} />
        <StatCard label="Pending Actions" value={pendingReferrals.length} />
        <StatCard label="Completed Referrals" value={completedReferrals.length} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        <PerformanceSummaryPanel performance={performance} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UpcomingAppointmentsPanel appointments={appointments} />
          <NotificationsPreviewPanel notifications={notifications} />
        </div>

        <MessagesPreviewPanel conversations={conversations} />
      </div>
    </PartnerPortalShell>
  );
}
