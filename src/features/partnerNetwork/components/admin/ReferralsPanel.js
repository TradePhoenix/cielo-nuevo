import { useMemo, useState } from "react";
import { PARTNER_CATEGORIES, PAYMENT_STATUSES, REFERRAL_STATUSES, CURRENCIES } from "../../data/constants";
import { partnerDisplayName, protectionEndsAt } from "../../logic/model";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSection,
  AdminSelect,
  AdminTextarea,
  StatusPill,
  REFERRAL_STATUS_TONES,
  PAYMENT_STATUS_TONES,
  formatDate,
  formatMoney,
} from "./fields";

const categoryLabel = (id) => PARTNER_CATEGORIES.find((c) => c.id === id)?.label || id || "—";

// Referral ledger — the non-circumvention backbone. Every row records who was
// introduced, to which partner, when, and where the money stands, so a
// partner relationship never depends on WhatsApp memory.
export default function ReferralsPanel({ store }) {
  const { partners, referrals, addReferral, updateReferral, deleteReferral } = store;
  const [filters, setFilters] = useState({ partnerId: "", status: "", paymentStatus: "" });
  const [openId, setOpenId] = useState(null);

  const partnerById = useMemo(() => {
    const map = new Map();
    partners.forEach((p) => map.set(p.id, p));
    return map;
  }, [partners]);

  const rows = referrals.filter((r) => {
    if (filters.partnerId && r.partnerId !== filters.partnerId) return false;
    if (filters.status && r.status !== filters.status) return false;
    if (filters.paymentStatus && r.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });

  const startReferral = () => {
    const referral = addReferral({ partnerId: filters.partnerId || partners[0]?.id || "" });
    setOpenId(referral.id);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <AdminField label="Partner">
            <AdminSelect
              value={filters.partnerId}
              onChange={(partnerId) => setFilters((f) => ({ ...f, partnerId }))}
              options={partners.map((p) => [p.id, partnerDisplayName(p)])}
              allowEmpty
            />
          </AdminField>
          <AdminField label="Referral status">
            <AdminSelect
              value={filters.status}
              onChange={(status) => setFilters((f) => ({ ...f, status }))}
              options={REFERRAL_STATUSES}
              allowEmpty
            />
          </AdminField>
          <AdminField label="Payment status">
            <AdminSelect
              value={filters.paymentStatus}
              onChange={(paymentStatus) => setFilters((f) => ({ ...f, paymentStatus }))}
              options={PAYMENT_STATUSES}
              allowEmpty
            />
          </AdminField>
        </div>
        <AdminButton onClick={startReferral} disabled={partners.length === 0}>
          + Log Referral
        </AdminButton>
      </div>

      {partners.length === 0 && (
        <p className="mt-4 text-xs text-zinc-500">Add a partner first — every referral is logged against a partner.</p>
      )}

      {rows.length === 0 ? (
        <div className="mt-6 border border-zinc-200 bg-white p-10 text-center">
          <p className="text-sm text-zinc-500">
            {referrals.length === 0 ? "No referrals logged yet." : "No referrals match these filters."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((referral) => {
            const partner = partnerById.get(referral.partnerId);
            const protectedUntil = partner ? protectionEndsAt(referral, partner) : null;
            const isOpen = openId === referral.id;
            return (
              <div key={referral.id} className="border border-zinc-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : referral.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[#f6f1e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-950">
                      {referral.clientName || "Unnamed client"}
                      <span className="mx-2 text-zinc-300">→</span>
                      {partner ? partnerDisplayName(partner) : "Unassigned"}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {referral.id.toUpperCase()} · {categoryLabel(referral.category)} · sent {formatDate(referral.sentAt)}
                      {protectedUntil ? ` · protected until ${formatDate(protectedUntil)}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill value={referral.status} toneMap={REFERRAL_STATUS_TONES} />
                    <StatusPill value={referral.paymentStatus} toneMap={PAYMENT_STATUS_TONES} />
                    <span className="text-xs text-zinc-500">{formatMoney(referral.ptmFee, referral.currency)}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 p-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <AdminField label="Referred client">
                        <AdminInput value={referral.clientName} onChange={(v) => updateReferral(referral.id, { clientName: v })} />
                      </AdminField>
                      <AdminField label="Client contact">
                        <AdminInput value={referral.clientContact} onChange={(v) => updateReferral(referral.id, { clientContact: v })} />
                      </AdminField>
                      <AdminField label="Partner">
                        <AdminSelect
                          value={referral.partnerId}
                          onChange={(v) => updateReferral(referral.id, { partnerId: v })}
                          options={partners.map((p) => [p.id, partnerDisplayName(p)])}
                          allowEmpty
                        />
                      </AdminField>
                      <AdminField label="Direction">
                        <AdminSelect
                          value={referral.direction}
                          onChange={(v) => updateReferral(referral.id, { direction: v })}
                          options={["PTM → Partner", "Partner → PTM"]}
                        />
                      </AdminField>
                      <AdminField label="Date sent">
                        <AdminInput type="date" value={referral.sentAt} onChange={(v) => updateReferral(referral.id, { sentAt: v })} />
                      </AdminField>
                      <AdminField label="Category">
                        <AdminSelect
                          value={referral.category}
                          onChange={(v) => updateReferral(referral.id, { category: v })}
                          options={PARTNER_CATEGORIES.map((c) => [c.id, c.label])}
                          allowEmpty
                        />
                      </AdminField>
                      <AdminField label="Service">
                        <AdminInput value={referral.service} onChange={(v) => updateReferral(referral.id, { service: v })} />
                      </AdminField>
                      <AdminField label="Referral status">
                        <AdminSelect
                          value={referral.status}
                          onChange={(v) => updateReferral(referral.id, { status: v })}
                          options={REFERRAL_STATUSES}
                        />
                      </AdminField>
                      <AdminField label="Deal value">
                        <AdminInput type="number" value={referral.dealValue} onChange={(v) => updateReferral(referral.id, { dealValue: v })} />
                      </AdminField>
                      <AdminField label="Currency">
                        <AdminSelect value={referral.currency} onChange={(v) => updateReferral(referral.id, { currency: v })} options={CURRENCIES} />
                      </AdminField>
                      <AdminField label="PTM referral fee">
                        <AdminInput type="number" value={referral.ptmFee} onChange={(v) => updateReferral(referral.id, { ptmFee: v })} />
                      </AdminField>
                      <AdminField label="Partner fee (if applicable)">
                        <AdminInput type="number" value={referral.partnerFee} onChange={(v) => updateReferral(referral.id, { partnerFee: v })} />
                      </AdminField>
                      <AdminField label="Payment status">
                        <AdminSelect
                          value={referral.paymentStatus}
                          onChange={(v) => updateReferral(referral.id, { paymentStatus: v })}
                          options={PAYMENT_STATUSES}
                        />
                      </AdminField>
                    </div>
                    <div className="mt-4">
                      <AdminField label="Notes">
                        <AdminTextarea value={referral.notes} onChange={(v) => updateReferral(referral.id, { notes: v })} />
                      </AdminField>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <AdminButton
                        tone="danger"
                        onClick={() => {
                          if (window.confirm("Delete this referral record? This cannot be undone.")) {
                            deleteReferral(referral.id);
                          }
                        }}
                      >
                        Delete Referral
                      </AdminButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AdminSection title="Why this ledger matters">
        <p className="text-sm leading-relaxed text-zinc-600">
          Each record documents who introduced the client, when the introduction occurred, which partner received it,
          the protection window from that partner's terms, and where the transaction and fee stand — the evidence base
          for client ownership and non-circumvention conversations.
        </p>
      </AdminSection>
    </div>
  );
}
