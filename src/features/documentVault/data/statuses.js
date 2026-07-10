// Document Vault — the three states a document can be in. STATUS_PROGRESS
// maps each to a visual completion percentage for the progress indicator
// on each card — derived presentation, not a separately stored field.
export const DOCUMENT_STATUSES = [
  { id: "needed", label: "Needed" },
  { id: "inProgress", label: "In Progress" },
  { id: "complete", label: "Complete" },
];

export const STATUS_PROGRESS = { needed: 0, inProgress: 50, complete: 100 };
