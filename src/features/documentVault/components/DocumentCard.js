import { useState } from "react";
import StatusBadge from "./StatusBadge";
import DocumentForm from "./DocumentForm";
import { DOCUMENT_CATEGORIES } from "../data/categories";
import { STATUS_PROGRESS } from "../data/statuses";
import { getDaysUntilExpiry, isExpired, isExpiringSoon } from "../logic/documentFilters";

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_ARIA_LABEL = { needed: "needed", inProgress: "in progress", complete: "complete" };

const ACTION_BUTTON_CLASS =
  "text-xs font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// A single document's full display — the calm, organized single source of
// truth for one piece of paperwork. Swaps into its own DocumentForm in
// place when editing, rather than opening a modal — consistent with the
// rest of this product's no-modal convention.
export default function DocumentCard({ document, onUpdate, onDelete, onMarkComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (isEditing) {
    return (
      <DocumentForm
        initialValues={document}
        submitLabel="Save Changes"
        autoFocusFirstField
        onCancel={() => setIsEditing(false)}
        onSubmit={(updates) => {
          onUpdate(document.id, updates);
          setIsEditing(false);
        }}
      />
    );
  }

  const categoryLabel = DOCUMENT_CATEGORIES.find((cat) => cat.id === document.category)?.label || "Other";
  const progress = STATUS_PROGRESS[document.status] ?? 0;
  const expired = isExpired(document);
  const expiringSoon = !expired && isExpiringSoon(document);
  const daysLeft = getDaysUntilExpiry(document.expiryDate);

  return (
    <div className="border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{categoryLabel}</p>
          <h3 className="mt-1 text-lg font-medium text-zinc-950">{document.name}</h3>
        </div>
        <StatusBadge status={document.status} />
      </div>

      {document.notes && <p className="mt-3 text-sm leading-relaxed text-zinc-600">{document.notes}</p>}

      {(document.issueDate || document.expiryDate || document.reminderDate) && (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {document.issueDate && (
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-zinc-400">Issued</dt>
              <dd className="mt-0.5 text-sm text-zinc-700">{formatDate(document.issueDate)}</dd>
            </div>
          )}
          {document.expiryDate && (
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-zinc-400">Expires</dt>
              <dd className={`mt-0.5 text-sm ${expired || expiringSoon ? "font-semibold text-zinc-950" : "text-zinc-700"}`}>
                {formatDate(document.expiryDate)}
                {expired && " · Expired"}
                {expiringSoon && ` · ${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`}
              </dd>
            </div>
          )}
          {document.reminderDate && (
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-zinc-400">Reminder</dt>
              <dd className="mt-0.5 text-sm text-zinc-700">{formatDate(document.reminderDate)}</dd>
            </div>
          )}
        </dl>
      )}

      <div
        className="mt-4 h-1.5 w-full bg-zinc-100"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${document.name} is ${STATUS_ARIA_LABEL[document.status] || document.status}`}
      >
        <div className="h-1.5 bg-zinc-950 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-100 pt-4">
        {document.status !== "complete" && (
          <button
            type="button"
            onClick={() => onMarkComplete(document.id)}
            className={`${ACTION_BUTTON_CLASS} text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950`}
          >
            Mark Complete
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className={`${ACTION_BUTTON_CLASS} text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 hover:decoration-zinc-950`}
        >
          Edit
        </button>

        {confirmingDelete ? (
          <span className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">Delete this document?</span>
            <button
              type="button"
              onClick={() => onDelete(document.id)}
              className={`${ACTION_BUTTON_CLASS} text-zinc-950 underline underline-offset-4 hover:text-zinc-600`}
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className={`${ACTION_BUTTON_CLASS} text-zinc-400 hover:text-zinc-600`}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className={`${ACTION_BUTTON_CLASS} text-zinc-400 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 hover:decoration-zinc-950`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
