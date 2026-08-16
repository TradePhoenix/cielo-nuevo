import { AGREEMENT_SECTIONS, AGREEMENT_TITLE } from "../../data/agreementTemplate";
import { formatDate } from "./fields";

// On-screen and printable representation of the Referral & Strategic Partner
// Agreement, filled from a partner + agreement record. The <style> block
// hides everything but this document during printing — "Print / Save as PDF"
// is the Phase 1 download story (no PDF library exists in this project, by
// design; a real e-sign provider can supply generated PDFs later).
export default function AgreementDocument({ partner, agreement }) {
  const fill = (text) =>
    text
      .replace(/{partnerLegalName}/g, partner.legalName || "________________")
      .replace(/{partnerTradingName}/g, partner.tradingName || partner.legalName || "________________")
      .replace(/{representativeName}/g, agreement.acceptance.typedRepresentativeName || partner.contactPerson || "________________");

  return (
    <div className="ptm-agreement-doc border border-zinc-200 bg-white p-8 sm:p-12">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .ptm-agreement-doc, .ptm-agreement-doc * { visibility: visible; }
          .ptm-agreement-doc { position: absolute; inset: 0; border: none; }
        }
      `}</style>

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Path To Mexico</p>
      <h2 className="mt-3 text-3xl font-light leading-tight tracking-[-0.02em]">{AGREEMENT_TITLE}</h2>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-400">
        Version {agreement.version} · Created {formatDate(agreement.createdAt)}
      </p>

      <div className="mt-8 space-y-6">
        {AGREEMENT_SECTIONS.map((section) => (
          <div key={section.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">{section.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{fill(section.body)}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-700">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Acceptance Record</h3>
        {agreement.acceptance.accepted ? (
          <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Partner legal name (typed)</dt>
              <dd>{agreement.acceptance.typedLegalName}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Representative (typed)</dt>
              <dd>{agreement.acceptance.typedRepresentativeName}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Accepted</dt>
              <dd>{formatDate(agreement.acceptance.acceptedAt)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">PTM approval</dt>
              <dd>
                {agreement.ptmApproval.approved
                  ? `${agreement.ptmApproval.approvedBy || "PTM"} · ${formatDate(agreement.ptmApproval.approvedAt)}`
                  : "Pending"}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-zinc-500">Not yet accepted.</p>
        )}
      </div>
    </div>
  );
}
