import { useEffect, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import PartnerCard from "../components/PartnerCard";
import { PARTNERS } from "../mock/mockPartners";
import SEO from "../../../components/SEO";

function PartnerDirectoryContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <SEO
        title="Partner Directory"
        description="The vetted local professionals assigned to your move — lawyer, realtor, insurance, and more."
        path="/client-dashboard/partners"
      />
      <PageHeader
        eyebrow="Partner Directory"
        title="Your team on the ground."
        description="Every partner assigned to your move — vetted, local, and one message or call away."
        headingRef={headingRef}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {PARTNERS.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}

// Routed /client-dashboard/partners
export default function PartnerDirectoryPage() {
  return (
    <ClientDashboardLayout>
      <PartnerDirectoryContent />
    </ClientDashboardLayout>
  );
}
