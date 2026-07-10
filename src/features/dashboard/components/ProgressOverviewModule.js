import ModuleCard from "./ModuleCard";

export default function ProgressOverviewModule({ summary, documentsChecked, documentsTotal }) {
  const stats = [
    { label: "Readiness Score", value: `${summary.readiness.score}/100` },
    { label: "Cities Explored", value: summary.citiesExplored },
    { label: "Plan Chapter", value: summary.planProgress ? summary.planProgress.nowChapterTitle : "Not Started" },
    { label: "Documents Ready", value: `${documentsChecked}/${documentsTotal}` },
  ];

  return (
    <ModuleCard eyebrow="At A Glance" title="Your Progress">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-light tracking-[-0.01em]">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
