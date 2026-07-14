import { stageLabel } from "../data/pipelineStages";

// Deliberately a single neutral treatment across all 11 stages (unlike
// StatusBadge's semantic colors) — with eleven stages, per-stage color
// coding would turn into noise rather than signal. The dot plus label is
// enough to scan a table or card quickly.
export default function StageBadge({ stageId }) {
  const isClosedWon = stageId === "completed" || stageId === "moved";
  const isLost = stageId === "lost";

  return (
    <span className="inline-flex items-center gap-1.5 border border-zinc-300 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-700">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isLost ? "bg-rose-400" : isClosedWon ? "bg-emerald-500" : "bg-zinc-400"
        }`}
      />
      {stageLabel(stageId)}
    </span>
  );
}
