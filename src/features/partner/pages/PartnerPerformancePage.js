import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import PerformanceStatsGrid from "../components/performance/PerformanceStatsGrid";
import ReferralHistoryList from "../components/performance/ReferralHistoryList";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

export default function PartnerPerformancePage() {
  const { partner, performance, referralHistory, unreadNotificationCount } = usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO title="Performance" description="Your service record with Path To Mexico clients." path="/partner/performance" />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Performance</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Your track record.
      </h1>

      <div className="mt-8">
        <PerformanceStatsGrid performance={performance} />
      </div>

      <div className="mt-6">
        <ReferralHistoryList history={referralHistory} />
      </div>
    </PartnerPortalShell>
  );
}
