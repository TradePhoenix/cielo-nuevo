import { useEffect, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import EmergencyContactCard from "../components/EmergencyContactCard";
import { EMERGENCY_NUMBERS, HOSPITAL, POLICE, EMBASSY, INSURANCE_EMERGENCY, CONCIERGE_CONTACT } from "../mock/mockEmergencyContacts";
import SEO from "../../../components/SEO";

function EmergencyContactsContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <SEO
        title="Emergency Contacts"
        description="Emergency numbers, hospital, police, embassy, insurance, and your concierge — all in one place."
        path="/client-dashboard/emergency-contacts"
      />
      <PageHeader
        eyebrow="Emergency Contacts"
        title="Help, one tap away."
        description="Keep these close — emergency numbers, your nearest hospital, embassy, insurance line, and your concierge."
        headingRef={headingRef}
      />

      <div className="mt-10 border border-rose-200 bg-rose-50 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Emergency Numbers</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {EMERGENCY_NUMBERS.map((entry) => (
            <div key={entry.id}>
              <p className="text-xs uppercase tracking-[0.15em] text-rose-700">{entry.label}</p>
              <p className="mt-1 text-lg font-medium text-zinc-950">{entry.name}</p>
              <a href={`tel:${entry.phone}`} className="mt-1 inline-block text-2xl font-light tracking-[-0.01em] text-zinc-950">
                {entry.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EmergencyContactCard contact={HOSPITAL} />
        <EmergencyContactCard contact={POLICE} />
        <EmergencyContactCard contact={EMBASSY} />
        <EmergencyContactCard contact={INSURANCE_EMERGENCY} />
        <EmergencyContactCard contact={CONCIERGE_CONTACT} />
      </div>
    </div>
  );
}

// Routed /client-dashboard/emergency-contacts
export default function EmergencyContactsPage() {
  return (
    <ClientDashboardLayout>
      <EmergencyContactsContent />
    </ClientDashboardLayout>
  );
}
