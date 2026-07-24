import { REGION_GROUPS, LIFESTYLE_FILTERS } from "../data/atlasGroups";

const CHIP_BASE =
  "border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";
const CHIP_ACTIVE = "border-zinc-950 bg-zinc-950 text-white";
const CHIP_INACTIVE = "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950";

// CX-008 — region switcher + lifestyle filter chips + reset, all driven by
// atlasGroups.js's fixed lists (never a hardcoded duplicate of destination
// data). Both filter clusters are real <button aria-pressed> toggles
// (native keyboard/focus support for free, same pattern already proven by
// Checkbox.js/QuestionCard.js elsewhere in this codebase) inside a labeled
// role="group", and the result count lives in an aria-live region so
// screen-reader users hear the effect of every filter change without
// needing to re-explore the grid.
export default function AtlasFilters({
  t,
  lang,
  regionId,
  onRegionChange,
  lifestyleIds,
  onToggleLifestyle,
  onReset,
  resultCount,
  totalCount,
}) {
  const hasActiveFilters = (regionId && regionId !== "all") || lifestyleIds.length > 0;

  return (
    <div className="mt-12">
      <div role="group" aria-label={t.regionGroupLabel} className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={!regionId || regionId === "all"}
          onClick={() => onRegionChange("all")}
          className={`${CHIP_BASE} ${!regionId || regionId === "all" ? CHIP_ACTIVE : CHIP_INACTIVE}`}
        >
          {t.allDestinations}
        </button>
        {REGION_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={regionId === group.id}
            onClick={() => onRegionChange(group.id)}
            className={`${CHIP_BASE} ${regionId === group.id ? CHIP_ACTIVE : CHIP_INACTIVE}`}
          >
            {lang === "es" ? group.labelEs : group.labelEn}
          </button>
        ))}
      </div>

      <div role="group" aria-label={t.lifestyleGroupLabel} className="mt-4 flex flex-wrap gap-2">
        {LIFESTYLE_FILTERS.map((filter) => {
          const active = lifestyleIds.includes(filter.id);
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggleLifestyle(filter.id)}
              className={`${CHIP_BASE} ${active ? CHIP_ACTIVE : CHIP_INACTIVE}`}
            >
              {lang === "es" ? filter.labelEs : filter.labelEn}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.resetFilters}
          </button>
        )}
      </div>

      <p aria-live="polite" className="mt-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
        {t.resultCount(resultCount, totalCount)}
      </p>
    </div>
  );
}
