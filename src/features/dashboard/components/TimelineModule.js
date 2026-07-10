import ModuleCard from "./ModuleCard";

export default function TimelineModule({ plan, currentChapterIndex }) {
  if (!plan) {
    return (
      <ModuleCard eyebrow="Timeline" title="No plan yet">
        <p className="text-sm leading-relaxed text-zinc-600">
          Once you build a plan, your full 365-day timeline appears here.
        </p>
      </ModuleCard>
    );
  }

  return (
    <ModuleCard eyebrow="Timeline" title={`Your ${plan.cityName} Timeline`}>
      <div className="divide-y divide-zinc-200 border-t border-zinc-200">
        {plan.chapters.map((chapter, index) => {
          const label = plan.isUrgent ? chapter.title : chapter.phaseLabel;
          const status = index < currentChapterIndex ? "Done" : index === currentChapterIndex ? "Now" : "Later";
          return (
            <div key={chapter.id} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "Now" ? "bg-zinc-950" : status === "Done" ? "bg-zinc-400" : "bg-zinc-200"
                  }`}
                />
                <p className={`text-sm ${status === "Now" ? "font-semibold text-zinc-950" : "text-zinc-600"}`}>
                  {label}
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{status}</p>
            </div>
          );
        })}
      </div>
    </ModuleCard>
  );
}
