import { LEAD_STATUSES, PIPELINE_STAGES, LEAD_SOURCES } from "../data/pipelineStages";
import { LEAD_SORT_OPTIONS } from "../logic/filterSortLeads";

const selectClasses =
  "border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]";

export default function SearchFilterBar({ filters, onChange, resultCount }) {
  const update = (key) => (event) => onChange({ ...filters, [key]: event.target.value });

  return (
    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={filters.search}
          onChange={update("search")}
          placeholder="Search name, email, phone, city…"
          aria-label="Search leads"
          className="w-full flex-1 border border-zinc-300 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
        />

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-none">
          <select aria-label="Filter by status" value={filters.status} onChange={update("status")} className={selectClasses}>
            <option value="all">All statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select aria-label="Filter by pipeline stage" value={filters.stage} onChange={update("stage")} className={selectClasses}>
            <option value="all">All stages</option>
            {PIPELINE_STAGES.map((stage) => (
              <option key={stage.id} value={stage.id}>{stage.label}</option>
            ))}
          </select>

          <select aria-label="Filter by lead source" value={filters.source} onChange={update("source")} className={selectClasses}>
            <option value="all">All sources</option>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <select aria-label="Sort leads" value={filters.sortBy} onChange={update("sortBy")} className={selectClasses}>
            {LEAD_SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {typeof resultCount === "number" && (
        <p className="mt-3 text-xs uppercase tracking-[0.15em] text-zinc-400">
          {resultCount} lead{resultCount === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}
