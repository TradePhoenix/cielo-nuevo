import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileDetailsGrid from "../components/profile/ProfileDetailsGrid";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

export default function PartnerProfilePage() {
  const { partner, unreadNotificationCount } = usePartnerPortalStore();

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO title="Partner Profile" description="Your public partner profile with Path To Mexico." path="/partner/profile" />

      <ProfileHeader partner={partner} />
      <ProfileDetailsGrid partner={partner} />
    </PartnerPortalShell>
  );
}
