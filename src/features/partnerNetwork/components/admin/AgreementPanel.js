import { useState } from "react";
import { AGREEMENT_STATUSES } from "../../data/constants";
import AgreementDocument from "./AgreementDocument";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSection,
  AdminSelect,
  StatusPill,
  AGREEMENT_STATUS_TONES,
  formatDate,
} from "./fields";

// Phase 1 digital-agreement record for one partner: status lifecycle, typed
// acceptance, PTM approval, printable document. Deliberately NOT a custom
// e-signature product — records carry a `provider` field so DocuSign /
// Dropbox Sign / Adobe Sign can take over the acceptance step later without
// a data migration.
export default function AgreementPanel({ partner, agreements, addAgreement, updateAgreement }) {
  const mine = agreements.filter((a) => a.partnerId === partner.id);
  const [openDocId, setOpenDocId] = useState(null);
  const [acceptDraft, setAcceptDraft] = useState({ legalName: "", representativeName: "", confirmed: false });

  const recordAcceptance = (agreement) => {
    if (!acceptDraft.confirmed || !acceptDraft.legalName.trim() || !acceptDraft.representativeName.trim()) return;
    updateAgreement(agreement.id, {
      status: "Accepted",
      acceptance: {
        ...agreement.acceptance,
        accepted: true,
        typedLegalName: acceptDraft.legalName.trim(),
        typedRepresentativeName: acceptDraft.representativeName.trim(),
        acceptedAt: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
    });
    setAcceptDraft({ legalName: "", representativeName: "", confirmed: false });
  };

  const recordApproval = (agreement) => {
    updateAgreement(agreement.id, {
      status: "PTM Approved",
      ptmApproval: { approved: true, approvedBy: "Kalen Enns", approvedAt: new Date().toISOString() },
    });
  };

  const activate = (agreement) => {
    updateAgreement(agreement.id, { status: "Active", activeFrom: new Date().toISOString() });
  };

  return (
    <AdminSection
      title="Partner Agreement"
      badge={
        <AdminButton tone="quiet" onClick={() => addAgreement(partner.id)}>
          + New Agreement
        </AdminButton>
      }
    >
      {mine.length === 0 && (
        <p className="text-sm text-zinc-500">
          No agreement on record — this partner shows an "Agreement Missing" state until one is created and accepted.
        </p>
      )}

      <div className="space-y-6">
        {mine.map((agreement) => (
          <div key={agreement.id} className="border border-zinc-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill value={agreement.status} toneMap={AGREEMENT_STATUS_TONES} />
                <span className="text-xs text-zinc-500">
                  v{agreement.version} · created {formatDate(agreement.createdAt)}
                  {agreement.activeFrom ? ` · active since ${formatDate(agreement.activeFrom)}` : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <AdminButton tone="quiet" onClick={() => setOpenDocId(openDocId === agreement.id ? null : agreement.id)}>
                  {openDocId === agreement.id ? "Hide Document" : "View Document"}
                </AdminButton>
                {openDocId === agreement.id && (
                  <AdminButton tone="quiet" onClick={() => window.print()}>
                    Print / Save PDF
                  </AdminButton>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AdminField label="Status">
                <AdminSelect
                  value={agreement.status}
                  onChange={(status) => updateAgreement(agreement.id, { status })}
                  options={AGREEMENT_STATUSES}
                />
              </AdminField>
              <AdminField label="Expires">
                <AdminInput
                  type="date"
                  value={agreement.expiresAt}
                  onChange={(expiresAt) => updateAgreement(agreement.id, { expiresAt })}
                />
              </AdminField>
              <AdminField label="Notes">
                <AdminInput value={agreement.notes} onChange={(notes) => updateAgreement(agreement.id, { notes })} />
              </AdminField>
            </div>

            {/* Acceptance */}
            <div className="mt-4 border-t border-zinc-100 pt-4">
              {agreement.acceptance.accepted ? (
                <p className="text-sm text-zinc-700">
                  Accepted by <span className="font-medium">{agreement.acceptance.typedRepresentativeName}</span> for{" "}
                  <span className="font-medium">{agreement.acceptance.typedLegalName}</span> on{" "}
                  {formatDate(agreement.acceptance.acceptedAt)}.
                  {!agreement.ptmApproval.approved && (
                    <span className="ml-3 inline-block">
                      <AdminButton onClick={() => recordApproval(agreement)}>Record PTM Approval</AdminButton>
                    </span>
                  )}
                  {agreement.ptmApproval.approved && agreement.status !== "Active" && (
                    <span className="ml-3 inline-block">
                      <AdminButton onClick={() => activate(agreement)}>Mark Active</AdminButton>
                    </span>
                  )}
                  {agreement.ptmApproval.approved && (
                    <span className="ml-3 text-xs text-zinc-500">
                      PTM approved {formatDate(agreement.ptmApproval.approvedAt)}
                    </span>
                  )}
                </p>
              ) : (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Record partner acceptance
                  </p>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <AdminField label="Typed legal name">
                      <AdminInput
                        value={acceptDraft.legalName}
                        onChange={(legalName) => setAcceptDraft((d) => ({ ...d, legalName }))}
                        placeholder={partner.legalName}
                      />
                    </AdminField>
                    <AdminField label="Typed representative name">
                      <AdminInput
                        value={acceptDraft.representativeName}
                        onChange={(representativeName) => setAcceptDraft((d) => ({ ...d, representativeName }))}
                        placeholder={partner.contactPerson}
                      />
                    </AdminField>
                  </div>
                  <label className="mt-3 flex items-start gap-2 text-sm text-zinc-600">
                    <input
                      type="checkbox"
                      checked={acceptDraft.confirmed}
                      onChange={(e) => setAcceptDraft((d) => ({ ...d, confirmed: e.target.checked }))}
                      className="mt-0.5"
                    />
                    The partner's representative has read the agreement and confirmed acceptance of its terms.
                  </label>
                  <div className="mt-3">
                    <AdminButton
                      onClick={() => recordAcceptance(agreement)}
                      disabled={!acceptDraft.confirmed || !acceptDraft.legalName.trim() || !acceptDraft.representativeName.trim()}
                    >
                      Record Acceptance
                    </AdminButton>
                  </div>
                </div>
              )}
            </div>

            {openDocId === agreement.id && (
              <div className="mt-4">
                <AgreementDocument partner={partner} agreement={agreement} />
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminSection>
  );
}
