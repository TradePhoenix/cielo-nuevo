import { EQUITY_DOC_STATUSES, EQUITY_ROLES } from "../../data/constants";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSection,
  AdminSelect,
  AdminTextarea,
  PrivateBadge,
} from "./fields";

// Equity / strategic ownership records (e.g. Ozono) — a completely separate
// classification from referral partners, per scope. Recordkeeping only:
// nothing here establishes ownership legally, and nothing here is rendered on
// any public page. The records are intentionally NOT pre-filled in code —
// values entered here exist only in this browser's local storage, never in
// the shipped site bundle where anyone could read them.
export default function EquityPanel({ store }) {
  const { equityPartners, addEquityPartner, updateEquityPartner, deleteEquityPartner } = store;

  const totalPercent = equityPartners.reduce((acc, e) => acc + (Number(e.ownershipPercent) || 0), 0);

  return (
    <div className="space-y-4">
      <div className="border-l-2 border-zinc-300 bg-white p-4 text-sm leading-relaxed text-zinc-600">
        <p className="font-medium text-zinc-950">Recordkeeping only.</p>
        <p className="mt-1">
          These records track equity and strategic-ownership relationships for internal reference. Formal ownership of
          the company remains subject to Mexican corporate and notarial documents — nothing recorded here creates or
          changes legal ownership.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
          {equityPartners.length} record{equityPartners.length === 1 ? "" : "s"}
          {equityPartners.length > 0 && (
            <span className={totalPercent === 100 ? " text-[#2f5d3a]" : " text-[#8a6220]"}>
              {" "}
              · {totalPercent}% recorded
            </span>
          )}
        </p>
        <AdminButton onClick={() => addEquityPartner()}>+ Add Equity Record</AdminButton>
      </div>

      {equityPartners.length === 0 && (
        <div className="border border-zinc-200 bg-white p-10 text-center">
          <p className="text-sm text-zinc-500">
            No equity records yet. Add one record per shareholder — e.g. the founder and each equity or strategic
            partner, with ownership percentage, agreement status, and vesting details.
          </p>
        </div>
      )}

      {equityPartners.map((record) => (
        <AdminSection key={record.id} title={record.legalName || "New equity record"} badge={<PrivateBadge />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminField label="Legal name">
              <AdminInput value={record.legalName} onChange={(v) => updateEquityPartner(record.id, { legalName: v })} />
            </AdminField>
            <AdminField label="Ownership %">
              <AdminInput
                type="number"
                min="0"
                max="100"
                value={record.ownershipPercent}
                onChange={(v) => updateEquityPartner(record.id, { ownershipPercent: v })}
              />
            </AdminField>
            <AdminField label="Role">
              <AdminSelect value={record.role} onChange={(v) => updateEquityPartner(record.id, { role: v })} options={EQUITY_ROLES} />
            </AdminField>
            <AdminField label="Ownership status">
              <AdminSelect
                value={record.ownershipStatus}
                onChange={(v) => updateEquityPartner(record.id, { ownershipStatus: v })}
                options={["Recorded internally", "Pending corporate documents", "Formalized (notarized)"]}
              />
            </AdminField>
            <AdminField label="Shareholder agreement">
              <AdminSelect
                value={record.shareholderAgreementStatus}
                onChange={(v) => updateEquityPartner(record.id, { shareholderAgreementStatus: v })}
                options={EQUITY_DOC_STATUSES}
              />
            </AdminField>
            <AdminField label="Corporate documents">
              <AdminSelect
                value={record.corporateDocsStatus}
                onChange={(v) => updateEquityPartner(record.id, { corporateDocsStatus: v })}
                options={EQUITY_DOC_STATUSES}
              />
            </AdminField>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <AdminField label="Vesting information">
              <AdminTextarea value={record.vesting} onChange={(v) => updateEquityPartner(record.id, { vesting: v })} />
            </AdminField>
            <AdminField label="Notes / related documents" hint="Reference where the physical or digital documents live (notary, drive folder, etc.)">
              <AdminTextarea value={record.notes} onChange={(v) => updateEquityPartner(record.id, { notes: v })} />
            </AdminField>
          </div>
          <div className="mt-4 flex justify-end">
            <AdminButton
              tone="danger"
              onClick={() => {
                if (window.confirm("Delete this equity record? This cannot be undone.")) {
                  deleteEquityPartner(record.id);
                }
              }}
            >
              Delete Record
            </AdminButton>
          </div>
        </AdminSection>
      ))}
    </div>
  );
}
