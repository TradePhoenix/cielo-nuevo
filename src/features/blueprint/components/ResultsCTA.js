import { Link } from "react-router-dom";

export default function ResultsCTA({ cta, readinessScore, archetypeTitle }) {
  return (
    <div className="bg-[#0b0b0a] p-10 text-center text-white sm:p-16">
      <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
        Start Here
      </p>
      <h3 className="mx-auto max-w-2xl text-3xl font-light leading-tight tracking-[-0.04em] sm:text-5xl">
        {cta.headline}
      </h3>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
        {cta.subtext}
      </p>

      {typeof readinessScore === "number" && archetypeTitle && (
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-[0.2em] text-white/40">
          {readinessScore}/100 Readiness &middot; {archetypeTitle}
        </p>
      )}

      <Link
        to="/mexico-fit-call"
        className="group mt-10 inline-flex items-center gap-2 bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        {cta.buttonLabel}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Link
        to="/your-mexico"
        className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        See What Your Next Chapter Could Look Like
      </Link>
    </div>
  );
}
