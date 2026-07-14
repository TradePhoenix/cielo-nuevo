import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import StatCard from "../components/StatCard";
import MonthlyReferralsWidget from "../components/analytics/MonthlyReferralsWidget";
import ServiceMixWidget from "../components/analytics/ServiceMixWidget";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

export default function PartnerAnalyticsPage() {
  const { partner, analytics, unreadNotificationCount } = usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO title="Analytics" description="Referral volume, turnaround, and service mix at a glance." path="/partner/analytics" />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Analytics</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Your activity at a glance.
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Completed Services" value={analytics.completedServices} />
        <StatCard label="Pending Work" value={analytics.pendingWork} />
        <StatCard label="Avg Turnaround" value={analytics.averageTurnaround} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlyReferralsWidget monthlyReferrals={analytics.monthlyReferrals} />
        <ServiceMixWidget serviceMix={analytics.serviceMix} />
      </div>
    </PartnerPortalShell>
  );
}
