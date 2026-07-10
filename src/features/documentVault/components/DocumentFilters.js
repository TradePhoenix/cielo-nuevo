import { DOCUMENT_CATEGORIES } from "../data/categories";
import { DOCUMENT_STATUSES } from "../data/statuses";

const FIELD_CLASS =
  "mt-1.5 w-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none transition focus:border-zinc-950";
const LABEL_CLASS = "text-xs uppercase tracking-[0.15em] text-zinc-500";

// A fully controlled, reusable toolbar — owns no state itself, just
// reflects whatever the caller passes in. Native <select>/<input> elements
// throughout: fully keyboard-operable and accessible with zero extra ARIA
// work needed.
export default function DocumentFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortByExpiry,
  onToggleSort,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 border border-zinc-200 bg-white p-5">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="vault-search" className={LABEL_CLASS}>
          Search
        </label>
        <input
          id="vault-search"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or notes..."
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="vault-category-filter" className={LABEL_CLASS}>
          Category
        </label>
        <select
          id="vault-category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={FIELD_CLASS}
        >
          <option value="all">All Categories</option>
          {DOCUMENT_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="vault-status-filter" className={LABEL_CLASS}>
          Status
        </label>
        <select
          id="vault-status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={FIELD_CLASS}
        >
          <option value="all">All Statuses</option>
          {DOCUMENT_STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onToggleSort}
        aria-pressed={sortByExpiry}
        className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
          sortByExpiry
            ? "bg-zinc-950 text-white"
            : "border border-zinc-300 text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
        }`}
      >
        Sort By Expiry
      </button>
    </div>
  );
}
