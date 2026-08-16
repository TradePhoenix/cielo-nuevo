import {
  PARTNER_CATEGORIES,
  PARTNER_STATUSES,
  COMPENSATION_TYPES,
  COMPLIANCE_FLAGS,
  CURRENCIES,
  VETTING_DIMENSIONS,
  TRUST_TEST_OPTIONS,
} from "../../data/constants";
import { licenseExpiresSoon, referralTotalsFor } from "../../logic/model";
import AgreementPanel from "./AgreementPanel";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSection,
  AdminSelect,
  AdminTextarea,
  PrivateBadge,
  StatusPill,
  PARTNER_STATUS_TONES,
  formatMoney,
} from "./fields";

// Full editable record for one partner. Every input writes straight to the
// store (browser-local) — a working ledger, not a submit-and-confirm form.
export default function PartnerDetailPanel({
  partner,
  agreements,
  referrals,
  updatePartner,
  deletePartner,
  addAgreement,
  updateAgreement,
  onClose,
}) {
  const patch = (name) => (value) => updatePartner(partner.id, { [name]: value });
  const patchNested = (group, name) => (value) =>
    updatePartner(partner.id, { [group]: { ...partner[group], [name]: value } });

  const totals = referralTotalsFor(partner.id, referrals);
  const expiringSoon = licenseExpiresSoon(partner);

  const compensationSummary = (() => {
    const type = COMPENSATION_TYPES.find((c) => c.id === partner.terms.compensationType);
    if (!type) return "No terms set";
    const bits = [type.label];
    if (partner.terms.ptmReceivesPercent) bits.push(`PTM ${partner.terms.ptmReceivesPercent}%`);
    if (partner.terms.ptmReceivesFixed)
      bits.push(`PTM ${formatMoney(partner.terms.ptmReceivesFixed, partner.terms.currency)}`);
    return bits.join(" · ");
  })();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-light tracking-[-0.02em]">
            {partner.tradingName || partner.legalName || "New partner"}
          </h2>
          <StatusPill value={partner.status} toneMap={PARTNER_STATUS_TONES} />
        </div>
        <div className="flex gap-2">
          <AdminButton
            tone="danger"
            onClick={() => {
              // Deleting removes the partner plus its agreements and referrals.
              if (window.confirm("Delete this partner and all of their agreements and referrals? This cannot be undone.")) {
                deletePartner(partner.id);
                onClose();
              }
            }}
          >
            Delete
          </AdminButton>
          <AdminButton tone="quiet" onClick={onClose}>
            Close
          </AdminButton>
        </div>
      </div>

      <AdminSection title="Business Information">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminField label="Legal name">
            <AdminInput value={partner.legalName} onChange={patch("legalName")} />
          </AdminField>
          <AdminField label="Trading name">
            <AdminInput value={partner.tradingName} onChange={patch("tradingName")} />
          </AdminField>
          <AdminField label="Contact person">
            <AdminInput value={partner.contactPerson} onChange={patch("contactPerson")} />
          </AdminField>
          <AdminField label="Email">
            <AdminInput value={partner.email} onChange={patch("email")} />
          </AdminField>
          <AdminField label="Phone">
            <AdminInput value={partner.phone} onChange={patch("phone")} />
          </AdminField>
          <AdminField label="WhatsApp">
            <AdminInput value={partner.whatsapp} onChange={patch("whatsapp")} />
          </AdminField>
          <AdminField label="Website">
            <AdminInput value={partner.website} onChange={patch("website")} />
          </AdminField>
          <AdminField label="Address">
            <AdminInput value={partner.address} onChange={patch("address")} />
          </AdminField>
          <AdminField label="City">
            <AdminInput value={partner.city} onChange={patch("city")} />
          </AdminField>
          <AdminField label="State">
            <AdminInput value={partner.state} onChange={patch("state")} />
          </AdminField>
          <AdminField label="Country">
            <AdminInput value={partner.country} onChange={patch("country")} />
          </AdminField>
          <AdminField label="RFC / Tax ID">
            <AdminInput value={partner.rfcTaxId} onChange={patch("rfcTaxId")} />
          </AdminField>
          <AdminField label="Category">
            <AdminSelect
              value={partner.category}
              onChange={patch("category")}
              options={PARTNER_CATEGORIES.map((c) => [c.id, c.label])}
            />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect value={partner.status} onChange={patch("status")} options={PARTNER_STATUSES} />
          </AdminField>
        </div>
      </AdminSection>

      <AdminSection title="Services">
        <div className="grid gap-4">
          <AdminField label="Description of services">
            <AdminTextarea value={partner.servicesDescription} onChange={patch("servicesDescription")} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Areas served">
              <AdminInput value={partner.areasServed} onChange={patch("areasServed")} />
            </AdminField>
            <AdminField label="Languages">
              <AdminInput value={partner.languages} onChange={patch("languages")} />
            </AdminField>
            <AdminField label="Years in business">
              <AdminInput value={partner.yearsInBusiness} onChange={patch("yearsInBusiness")} />
            </AdminField>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Credentials & Compliance"
        badge={expiringSoon ? <StatusPill value="License expiring ≤60 days" toneMap={{ "License expiring ≤60 days": "warn" }} /> : null}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminField label="License number">
            <AdminInput value={partner.credentials.licenseNumber} onChange={patchNested("credentials", "licenseNumber")} />
          </AdminField>
          <AdminField label="License type">
            <AdminInput value={partner.credentials.licenseType} onChange={patchNested("credentials", "licenseType")} />
          </AdminField>
          <AdminField label="Issuing authority">
            <AdminInput
              value={partner.credentials.issuingAuthority}
              onChange={patchNested("credentials", "issuingAuthority")}
            />
          </AdminField>
          <AdminField label="Real estate registration / accreditation" hint="e.g. AMPI membership, state registry — for real estate partners">
            <AdminInput
              value={partner.credentials.realEstateRegistration}
              onChange={patchNested("credentials", "realEstateRegistration")}
            />
          </AdminField>
          <AdminField label="Other credentials">
            <AdminInput
              value={partner.credentials.otherCredentials}
              onChange={patchNested("credentials", "otherCredentials")}
            />
          </AdminField>
          <AdminField label="Expiration date">
            <AdminInput
              type="date"
              value={partner.credentials.expirationDate}
              onChange={patchNested("credentials", "expirationDate")}
            />
          </AdminField>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLIANCE_FLAGS.map((flag) => (
            <label key={flag.id} className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={Boolean(partner.compliance[flag.id])}
                onChange={(e) =>
                  updatePartner(partner.id, {
                    compliance: { ...partner.compliance, [flag.id]: e.target.checked },
                  })
                }
              />
              {flag.label}
            </label>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Vetting" badge={<PrivateBadge />}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {VETTING_DIMENSIONS.map((dim) => (
            <AdminField key={dim.id} label={`${dim.label} /10`}>
              <AdminInput
                type="number"
                min="1"
                max="10"
                value={partner.vetting.scores[dim.id] ?? ""}
                onChange={(value) =>
                  updatePartner(partner.id, {
                    vetting: {
                      ...partner.vetting,
                      scores: { ...partner.vetting.scores, [dim.id]: value === "" ? "" : Number(value) },
                    },
                  })
                }
              />
            </AdminField>
          ))}
          <AdminField label="Overall /10">
            <AdminInput
              type="number"
              min="1"
              max="10"
              value={partner.vetting.overall ?? ""}
              onChange={(value) =>
                updatePartner(partner.id, {
                  vetting: { ...partner.vetting, overall: value === "" ? null : Number(value) },
                })
              }
            />
          </AdminField>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <AdminField label="Would I trust this person with my own mother?">
            <AdminSelect
              value={partner.vetting.trustTest}
              onChange={(value) => updatePartner(partner.id, { vetting: { ...partner.vetting, trustTest: value } })}
              options={TRUST_TEST_OPTIONS}
              allowEmpty
            />
          </AdminField>
          <AdminField label="Reviewed by">
            <AdminInput
              value={partner.vetting.reviewedBy}
              onChange={(value) => updatePartner(partner.id, { vetting: { ...partner.vetting, reviewedBy: value } })}
              placeholder="Kalen Enns"
            />
          </AdminField>
        </div>
        <div className="mt-4">
          <AdminField label="Interview notes">
            <AdminTextarea
              value={partner.vetting.interviewNotes}
              onChange={(value) => updatePartner(partner.id, { vetting: { ...partner.vetting, interviewNotes: value } })}
            />
          </AdminField>
        </div>
      </AdminSection>

      <AdminSection title="Referral Commercial Terms" badge={<PrivateBadge />}>
        <p className="-mt-1 mb-4 text-xs text-zinc-500">{compensationSummary}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminField label="Compensation type">
            <AdminSelect
              value={partner.terms.compensationType}
              onChange={patchNested("terms", "compensationType")}
              options={COMPENSATION_TYPES.map((c) => [c.id, c.label])}
              allowEmpty
            />
          </AdminField>
          <AdminField label="PTM receives %">
            <AdminInput type="number" value={partner.terms.ptmReceivesPercent} onChange={patchNested("terms", "ptmReceivesPercent")} />
          </AdminField>
          <AdminField label="PTM receives fixed">
            <AdminInput type="number" value={partner.terms.ptmReceivesFixed} onChange={patchNested("terms", "ptmReceivesFixed")} />
          </AdminField>
          <AdminField label="Partner receives %">
            <AdminInput
              type="number"
              value={partner.terms.partnerReceivesPercent}
              onChange={patchNested("terms", "partnerReceivesPercent")}
            />
          </AdminField>
          <AdminField label="Partner receives fixed">
            <AdminInput
              type="number"
              value={partner.terms.partnerReceivesFixed}
              onChange={patchNested("terms", "partnerReceivesFixed")}
            />
          </AdminField>
          <AdminField label="Currency">
            <AdminSelect value={partner.terms.currency} onChange={patchNested("terms", "currency")} options={CURRENCIES} />
          </AdminField>
          <AdminField label="Payment due (days)">
            <AdminInput type="number" value={partner.terms.paymentDueDays} onChange={patchNested("terms", "paymentDueDays")} />
          </AdminField>
          <AdminField label="Referral protection (months)">
            <AdminInput type="number" value={partner.terms.protectionMonths} onChange={patchNested("terms", "protectionMonths")} />
          </AdminField>
          <AdminField label="Exclusivity">
            <AdminSelect
              value={partner.terms.exclusivity}
              onChange={patchNested("terms", "exclusivity")}
              options={["Non-exclusive", "Exclusive in category", "Exclusive in region", "Exclusive in category + region"]}
            />
          </AdminField>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <AdminField label="Special conditions">
            <AdminTextarea value={partner.terms.specialConditions} onChange={patchNested("terms", "specialConditions")} />
          </AdminField>
          <AdminField label="Internal notes on terms">
            <AdminTextarea value={partner.terms.internalNotes} onChange={patchNested("terms", "internalNotes")} />
          </AdminField>
        </div>
      </AdminSection>

      <AgreementPanel partner={partner} agreements={agreements} addAgreement={addAgreement} updateAgreement={updateAgreement} />

      <AdminSection title="Referral Performance">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Clients referred", totals.referred],
            ["Conversions", totals.conversions],
            ["Revenue (converted)", formatMoney(totals.revenue, partner.terms.currency)],
            ["Outstanding fees", formatMoney(totals.outstandingFees, partner.terms.currency)],
          ].map(([label, value]) => (
            <div key={label} className="border border-zinc-200 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-light">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-400">
          Log and update individual referrals in the Referrals tab — they roll up here automatically.
        </p>
      </AdminSection>

      <AdminSection title="Internal Notes" badge={<PrivateBadge />}>
        <AdminTextarea rows={4} value={partner.internalNotes} onChange={patch("internalNotes")} />
      </AdminSection>
    </div>
  );
}
