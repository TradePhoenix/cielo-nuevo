import ModuleCard from "./ModuleCard";

export default function WelcomeModule({ readiness }) {
  return (
    <ModuleCard eyebrow="Welcome Back" title={readiness.archetype.title}>
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{readiness.archetype.description}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
        {readiness.score}/100 Readiness &middot; {readiness.label.label}
      </p>
    </ModuleCard>
  );
}
