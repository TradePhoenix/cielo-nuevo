import ModuleCard from "./ModuleCard";

const STAGE_ORDER = ["notStarted", "researching", "inProgress", "finalized"];

// Honestly derived, not fabricated: the stage reflects which
// residency-related tasks are actually checked off in the visitor's own
// plan (see buildDashboardSummary.js) — never a guessed or invented status.
export default function ResidencyProgressModule({ residencyStage, hasPlan }) {
  if (!hasPlan) {
    return (
      <ModuleCard eyebrow="Residency Progress" title="No plan yet">
        <p className="text-sm leading-relaxed text-zinc-600">
          Build your Mexico Plan to start tracking residency progress.
        </p>
      </ModuleCard>
    );
  }

  const currentIndex = STAGE_ORDER.indexOf(residencyStage.id);

  return (
    <ModuleCard eyebrow="Residency Progress" title={residencyStage.label}>
      <div className="flex gap-2">
        {STAGE_ORDER.map((stageId, index) => (
          <span
            key={stageId}
            aria-hidden="true"
            className={`h-1.5 flex-1 ${index <= currentIndex ? "bg-zinc-950" : "bg-zinc-200"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        Based on the residency-related tasks you've completed in your plan.
      </p>
    </ModuleCard>
  );
}
