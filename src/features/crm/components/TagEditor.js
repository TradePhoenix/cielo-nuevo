import { useState } from "react";
import { LEAD_TAGS } from "../data/pipelineStages";

// Toggle-chip tag editor rather than a free-text input — keeps the CRM's
// tag vocabulary consistent across leads (LEAD_TAGS) while still rendering
// any legacy/custom tag already on a lead even if it's outside that list.
export default function TagEditor({ tags, onChange }) {
  const [pendingCustomTag, setPendingCustomTag] = useState("");
  const allOptions = Array.from(new Set([...LEAD_TAGS, ...tags]));

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      onChange(tags.filter((existing) => existing !== tag));
    } else {
      onChange([...tags, tag]);
    }
  };

  const addCustomTag = (event) => {
    event.preventDefault();
    const trimmed = pendingCustomTag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setPendingCustomTag("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {allOptions.map((tag) => {
          const active = tags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={active}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
                active
                  ? "bg-zinc-950 text-white"
                  : "border border-zinc-300 text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <form onSubmit={addCustomTag} className="mt-3 flex gap-2">
        <input
          type="text"
          value={pendingCustomTag}
          onChange={(event) => setPendingCustomTag(event.target.value)}
          placeholder="Add a custom tag…"
          aria-label="Add a custom tag"
          className="flex-1 border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
        />
        <button
          type="submit"
          className="border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
        >
          Add
        </button>
      </form>
    </div>
  );
}
