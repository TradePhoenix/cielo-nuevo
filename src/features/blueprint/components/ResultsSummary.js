export default function ResultsSummary({ recommendation }) {
  const { readinessScore, readinessLabel, archetype } = recommendation;

  return (
    <div className="border-b border-zinc-300 pb-14 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">
        Your Blueprint
      </p>

      <p className="text-7xl font-light leading-none tracking-[-0.04em] text-zinc-950 sm:text-8xl">
        {readinessScore}
        <span className="ml-1 text-2xl font-light text-zinc-400 sm:text-3xl">/100</span>
      </p>

      <div
        className="mx-auto mt-5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-zinc-200"
        role="img"
        aria-label={`Readiness score: ${readinessScore} out of 100`}
      >
        <div
          className="h-full rounded-full bg-zinc-950"
          style={{ width: `${readinessScore}%` }}
        />
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Readiness Score
      </p>

      <h2 className="mt-8 text-3xl font-medium tracking-[-0.03em] text-zinc-950 sm:text-5xl">
        {readinessLabel.label}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
        {readinessLabel.blurb}
      </p>

      <div className="mx-auto mt-10 max-w-xl border-t border-zinc-200 pt-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
          Your Archetype
        </p>
        <h3 className="text-2xl font-light tracking-[-0.03em] text-zinc-950 sm:text-3xl">
          {archetype.title}
        </h3>
        <p className="mt-4 leading-relaxed text-zinc-600">{archetype.description}</p>
      </div>
    </div>
  );
}
