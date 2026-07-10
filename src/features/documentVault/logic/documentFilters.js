// Document Vault — pure functions only, same discipline as
// recommendationEngine.js and buildPlan.js: no side effects, fixed
// input/output shapes.

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const EXPIRING_SOON_WINDOW_DAYS = 60;

// Whole-day difference between today and a document's expiry date.
// Negative means already expired. Null means no expiry date is set.
export function getDaysUntilExpiry(expiryDate) {
  if (!expiryDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${expiryDate}T00:00:00`);
  return Math.round((expiry.getTime() - today.getTime()) / MS_PER_DAY);
}

export function isExpired(document) {
  const days = getDaysUntilExpiry(document.expiryDate);
  return days !== null && days < 0;
}

export function isExpiringSoon(document) {
  const days = getDaysUntilExpiry(document.expiryDate);
  return days !== null && days >= 0 && days <= EXPIRING_SOON_WINDOW_DAYS;
}

export function computeVaultSummary(documents) {
  return {
    total: documents.length,
    complete: documents.filter((doc) => doc.status === "complete").length,
    remaining: documents.filter((doc) => doc.status !== "complete").length,
    expiringSoon: documents.filter((doc) => isExpiringSoon(doc)).length,
  };
}

// filters: { category, status, search } — any omitted/"all" is a no-op.
export function filterDocuments(documents, filters = {}) {
  const { category, status, search } = filters;
  return documents.filter((doc) => {
    if (category && category !== "all" && doc.category !== category) return false;
    if (status && status !== "all" && doc.status !== status) return false;
    if (search && search.trim()) {
      const query = search.trim().toLowerCase();
      const haystack = `${doc.name} ${doc.notes || ""}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

// Documents without an expiry date sort last, not first — an unknown
// expiry shouldn't visually outrank ones that are actually approaching.
export function sortDocumentsByExpiry(documents) {
  return [...documents].sort((a, b) => {
    if (!a.expiryDate && !b.expiryDate) return 0;
    if (!a.expiryDate) return 1;
    if (!b.expiryDate) return -1;
    return new Date(a.expiryDate) - new Date(b.expiryDate);
  });
}
