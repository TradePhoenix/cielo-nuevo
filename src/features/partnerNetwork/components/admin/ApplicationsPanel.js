import { useState } from "react";
import { PARTNER_CATEGORIES } from "../../data/constants";
import {
  AdminButton,
  AdminField,
  AdminSelect,
  AdminTextarea,
  StatusPill,
  PrivateBadge,
  formatDate,
} from "./fields";

// Review queue for public partner applications (/partner-with-ptm/apply →
// database). Approving creates a Partner record (status "Applicant") with
// the applicant's own fields only — commercial terms always start empty and
// are configured on the partner record afterwards.

const APPLICATION_STATUSES = ["New", "In Review", "Rejected"];

const APPLICATION_STATUS_TONES = {
  New: "warn",
  "In Review": "neutral",
  Converted: "good",
  Rejected: "bad",
};

const categoryLabel = (id) => PARTNER_CATEGORIES.find((c) => c.id === id)?.label || id || "—";

const FIELD_ROWS = [
  ["Legal name", "legalName"],
  ["Trading name", "tradingName"],
  ["Contact person", "contactPerson"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["WhatsApp", "whatsapp"],
  ["Website", "website"],
  ["Address", "address"],
  ["City", "city"],
  ["State", "state"],
  ["Country", "country"],
  ["RFC / Tax ID", "rfcTaxId"],
  ["Services", "servicesDescription"],
  ["Areas served", "areasServed"],
  ["Languages", "languages"],
  ["Years in business", "yearsInBusiness"],
  ["License number", "licenseNumber"],
  ["Real estate registration", "realEstateRegistration"],
  ["Other credentials", "otherCredentials"],
  ["Credential expiration", "credentialExpiration"],
];

export default function ApplicationsPanel({ store }) {
  const { applications, updateApplication, convertApplication } = store;
  const [statusFilter, setStatusFilter] = useState("");
  const [openId, setOpenId] = useState(null);
  const [convertingId, setConvertingId] = useState(null);
  const [convertError, setConvertError] = useState("");

  const rows = applications.filter((a) => !statusFilter || a.status === statusFilter);

  const approve = async (application) => {
    if (
      !window.confirm(
        `Approve this application and create a partner record for "${application.legalName}"? Commercial terms start empty and are set on the partner record.`
      )
    ) {
      return;
    }
    setConvertingId(application.id);
    setConvertError("");
    const result = await convertApplication(application.id);
    setConvertingId(null);
    if (!result.ok) setConvertError(result.message || "Couldn't approve this application. Please try again.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="w-full max-w-[220px]">
          <AdminField label="Status">
            <AdminSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={["New", "In Review", "Converted", "Rejected"]}
              allowEmpty
            />
          </AdminField>
        </div>
        <p className="text-xs text-zinc-500">
          Applications arrive here directly from <span className="font-mono">/partner-with-ptm/apply</span>.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 border border-zinc-200 bg-white p-10 text-center">
          <p className="text-sm text-zinc-500">
            {applications.length === 0
              ? "No partner applications yet. New submissions will appear here automatically."
              : "No applications match this filter."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((application) => {
            const isOpen = openId === application.id;
            return (
              <div key={application.id} className="border border-zinc-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : application.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[#f6f1e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-950">
                      {application.legalName || application.contactPerson || "Unnamed applicant"}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {categoryLabel(application.category)} · {application.city || "—"} · received{" "}
                      {formatDate(application.submittedAt)} · {application.language === "es" ? "ES" : "EN"}
                    </p>
                  </div>
                  <StatusPill value={application.status} toneMap={APPLICATION_STATUS_TONES} />
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 p-4">
                    <dl className="divide-y divide-zinc-100 border-y border-zinc-200">
                      {FIELD_ROWS.map(([label, field]) => (
                        <div key={field} className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr] sm:gap-4">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                            {label}
                          </dt>
                          <dd
                            className={`whitespace-pre-wrap text-sm ${
                              String(application[field] || "").trim() ? "text-zinc-950" : "text-zinc-400"
                            }`}
                          >
                            {field === "category"
                              ? categoryLabel(application[field])
                              : String(application[field] || "").trim() || "Not provided"}
                          </dd>
                        </div>
                      ))}
                      {application.category === "other" && (
                        <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr] sm:gap-4">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                            Category (other)
                          </dt>
                          <dd className="text-sm text-zinc-950">{application.categoryOther}</dd>
                        </div>
                      )}
                    </dl>

                    {application.status === "Converted" ? (
                      <p className="mt-4 text-sm text-zinc-600">
                        Approved and converted to a partner record — continue in the Partners tab (vetting, credentials,
                        commercial terms, agreement).
                      </p>
                    ) : (
                      <>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <AdminField label="Review status">
                            <AdminSelect
                              value={application.status}
                              onChange={(status) => updateApplication(application.id, { status })}
                              options={APPLICATION_STATUSES}
                            />
                          </AdminField>
                        </div>
                        <div className="mt-4">
                          <AdminField label="Internal review notes">
                            <AdminTextarea
                              value={application.internalNotes}
                              onChange={(internalNotes) => updateApplication(application.id, { internalNotes })}
                            />
                          </AdminField>
                          <div className="mt-1.5">
                            <PrivateBadge />
                          </div>
                        </div>
                        {convertError && convertingId === null && (
                          <p role="alert" className="mt-3 text-sm text-[#b3543f]">
                            {convertError}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap justify-end gap-2">
                          <AdminButton
                            tone="quiet"
                            onClick={() => updateApplication(application.id, { status: "Rejected" })}
                            disabled={application.status === "Rejected"}
                          >
                            Reject
                          </AdminButton>
                          <AdminButton onClick={() => approve(application)} disabled={convertingId === application.id}>
                            {convertingId === application.id ? "Approving…" : "Approve & Create Partner"}
                          </AdminButton>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
