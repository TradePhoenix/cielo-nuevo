import { useState, useRef, useEffect } from "react";
import { DOCUMENT_CATEGORIES } from "../data/categories";
import { DOCUMENT_STATUSES } from "../data/statuses";

const EMPTY_DRAFT = {
  name: "",
  category: DOCUMENT_CATEGORIES[0].id,
  status: "needed",
  notes: "",
  issueDate: "",
  expiryDate: "",
  reminderDate: "",
};

const FIELD_CLASS =
  "mt-1.5 w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950";
const LABEL_CLASS = "text-xs uppercase tracking-[0.15em] text-zinc-500";

// The single form used for both adding and editing a document — every
// field has a real, associated <label>, not a placeholder standing in for
// one. Shared by Add (DocumentVaultPage) and Edit (DocumentCard).
//
// `autoFocusFirstField` is opt-in and defaults to false: DocumentCard's
// edit mode passes it explicitly (a keyboard/screen-reader user just
// triggered a mode switch and should land in the form), while the Add flow
// on DocumentVaultPage does not — that page already manages focus on the
// heading when the vault is empty, and this form can auto-render as part
// of that same initial mount, so forcing focus here too would fight it.
export default function DocumentForm({ initialValues, onSubmit, onCancel, submitLabel, autoFocusFirstField = false }) {
  const [draft, setDraft] = useState(initialValues || EMPTY_DRAFT);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (autoFocusFirstField && nameInputRef.current) {
      nameInputRef.current.focus();
    }
    // Intentionally runs once on mount only — edit mode always mounts a
    // fresh DocumentForm instance (see DocumentCard), so "on mount" and
    // "on entering edit mode" are the same moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (event) => {
    setDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.name.trim()) return;
    onSubmit({ ...draft, name: draft.name.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 border border-zinc-200 bg-white p-6">
      <div>
        <label htmlFor="doc-name" className={LABEL_CLASS}>
          Document Name
        </label>
        <input
          id="doc-name"
          ref={nameInputRef}
          type="text"
          required
          value={draft.name}
          onChange={handleChange("name")}
          placeholder="e.g. Passport"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="doc-category" className={LABEL_CLASS}>
            Category
          </label>
          <select id="doc-category" value={draft.category} onChange={handleChange("category")} className={FIELD_CLASS}>
            {DOCUMENT_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="doc-status" className={LABEL_CLASS}>
            Status
          </label>
          <select id="doc-status" value={draft.status} onChange={handleChange("status")} className={FIELD_CLASS}>
            {DOCUMENT_STATUSES.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="doc-issue-date" className={LABEL_CLASS}>
            Issue Date
          </label>
          <input id="doc-issue-date" type="date" value={draft.issueDate} onChange={handleChange("issueDate")} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="doc-expiry-date" className={LABEL_CLASS}>
            Expiry Date
          </label>
          <input id="doc-expiry-date" type="date" value={draft.expiryDate} onChange={handleChange("expiryDate")} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="doc-reminder-date" className={LABEL_CLASS}>
            Reminder
          </label>
          <input id="doc-reminder-date" type="date" value={draft.reminderDate} onChange={handleChange("reminderDate")} className={FIELD_CLASS} />
        </div>
      </div>
      <p className="-mt-2 text-xs leading-relaxed text-zinc-400">
        Reminders are saved here for reference — automatic alerts arrive once accounts are enabled.
      </p>

      <div>
        <label htmlFor="doc-notes" className={LABEL_CLASS}>
          Notes
        </label>
        <textarea
          id="doc-notes"
          value={draft.notes}
          onChange={handleChange("notes")}
          rows={3}
          placeholder="Anything worth remembering about this document"
          className={FIELD_CLASS}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="bg-zinc-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-zinc-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
