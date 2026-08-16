import { useMemo, useState } from "react";
import { AGREEMENT_STATUSES, PARTNER_CATEGORIES, PARTNER_STATUSES } from "../../data/constants";
import {
  latestAgreementFor,
  licenseExpiresSoon,
  partnerDisplayName,
  partnerLocation,
  referralTotalsFor,
} from "../../logic/model";
import PartnerDetailPanel from "./PartnerDetailPanel";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  StatusPill,
  PARTNER_STATUS_TONES,
  AGREEMENT_STATUS_TONES,
  formatDate,
  formatMoney,
} from "./fields";

const categoryLabel = (id) => PARTNER_CATEGORIES.find((c) => c.id === id)?.label || id || "—";

// Partner roster: filterable table + full detail editor for the selected
// partner. The table scrolls horizontally on small screens rather than
// dropping columns.
export default function PartnersPanel({ store }) {
  const { partners, agreements, referrals, addPartner, updatePartner, deletePartner, addAgreement, updateAgreement } =
    store;

  const [filters, setFilters] = useState({ category: "", city: "", status: "", agreementStatus: "" });
  const [selectedId, setSelectedId] = useState(null);

  const rows = useMemo(() => {
    return partners
      .map((partner) => {
        const agreement = latestAgreementFor(partner.id, agreements);
        return {
          partner,
          agreement,
          agreementStatus: agreement ? agreement.status : "None",
          totals: referralTotalsFor(partner.id, referrals),
        };
      })
      .filter(({ partner, agreementStatus }) => {
        if (filters.category && partner.category !== filters.category) return false;
        if (filters.status && partner.status !== filters.status) return false;
        if (filters.agreementStatus && agreementStatus !== filters.agreementStatus) return false;
        if (filters.city && !partner.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        return true;
      });
  }, [partners, agreements, referrals, filters]);

  const selected = partners.find((p) => p.id === selectedId);

  if (selected) {
    return (
      <PartnerDetailPanel
        partner={selected}
        agreements={agreements}
        referrals={referrals}
        updatePartner={updatePartner}
        deletePartner={deletePartner}
        addAgreement={addAgreement}
        updateAgreement={updateAgreement}
        onClose={() => setSelectedId(null)}
      />
    );
  }

  const credentialState = (partner) => {
    if (licenseExpiresSoon(partner)) return ["Expiring", "warn"];
    if (partner.compliance.licenseVerified) return ["Verified", "good"];
    if (partner.compliance.licenseRequired) return ["Required", "warn"];
    return ["—", "neutral"];
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <AdminField label="Category">
            <AdminSelect
              value={filters.category}
              onChange={(category) => setFilters((f) => ({ ...f, category }))}
              options={PARTNER_CATEGORIES.map((c) => [c.id, c.label])}
              allowEmpty
            />
          </AdminField>
          <AdminField label="City">
            <AdminInput value={filters.city} onChange={(city) => setFilters((f) => ({ ...f, city }))} placeholder="Any" />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect
              value={filters.status}
              onChange={(status) => setFilters((f) => ({ ...f, status }))}
              options={PARTNER_STATUSES}
              allowEmpty
            />
          </AdminField>
          <AdminField label="Agreement">
            <AdminSelect
              value={filters.agreementStatus}
              onChange={(agreementStatus) => setFilters((f) => ({ ...f, agreementStatus }))}
              options={["None", ...AGREEMENT_STATUSES]}
              allowEmpty
            />
          </AdminField>
        </div>
        <AdminButton
          onClick={() => {
            const partner = addPartner();
            setSelectedId(partner.id);
          }}
        >
          + Add Partner
        </AdminButton>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 border border-zinc-200 bg-white p-10 text-center">
          <p className="text-sm text-zinc-500">
            {partners.length === 0
              ? "No partners on record yet. Add your first partner, or enter one from a Partner Application email."
              : "No partners match these filters."}
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto border border-zinc-200 bg-white">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                {["Partner", "Category", "Location", "Status", "Agreement", "License", "Referred", "Converted", "Revenue", "Outstanding", "Last activity"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ partner, agreementStatus, totals }) => {
                const [credLabel, credTone] = credentialState(partner);
                return (
                  <tr
                    key={partner.id}
                    onClick={() => setSelectedId(partner.id)}
                    className="cursor-pointer border-b border-zinc-100 transition hover:bg-[#f6f1e8]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-950">{partnerDisplayName(partner)}</p>
                      <p className="text-xs text-zinc-500">{partner.contactPerson}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{categoryLabel(partner.category)}</td>
                    <td className="px-4 py-3 text-zinc-600">{partnerLocation(partner) || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusPill value={partner.status} toneMap={PARTNER_STATUS_TONES} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill value={agreementStatus} toneMap={{ ...AGREEMENT_STATUS_TONES, None: "bad" }} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill value={credLabel} toneMap={{ [credLabel]: credTone }} />
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{totals.referred}</td>
                    <td className="px-4 py-3 text-zinc-600">{totals.conversions}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatMoney(totals.revenue, partner.terms.currency)}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatMoney(totals.outstandingFees, partner.terms.currency)}</td>
                    <td className="px-4 py-3 text-zinc-500">{formatDate(partner.lastActivityAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
