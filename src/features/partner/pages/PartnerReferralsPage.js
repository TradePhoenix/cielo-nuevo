import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import ReferralBoard from "../components/referrals/ReferralBoard";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

export default function PartnerReferralsPage() {
  const { partner, referrals, updateReferralProgressStatus, unreadNotificationCount } = usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO
        title="Referrals"
        description="Manage incoming referrals from first contact through completion."
        path="/partner/referrals"
      />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Referrals</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Your referral pipeline.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        Scroll to see every stage, from incoming to completed. Update a referral's status directly from its card.
      </p>

      <ReferralBoard referrals={referrals} onUpdateProgressStatus={updateReferralProgressStatus} />
    </PartnerPortalShell>
  );
}
