import { Link } from "react-router-dom";

const PHASES = [
  { range: "Days 1–30", label: "Get Clear" },
  { range: "Days 31–60", label: "Get Moving" },
  { range: "Days 61–90", label: "Make It Real" },
];

// Distributes roadmapSteps (4 items normally, 5 when the urgent "book-now"
// step is prepended by recommendationEngine.js) across the three 30-day
// phases as evenly as possible, earliest phases absorbing any remainder.
function chunkIntoThree(items) {
  const bucketCount = 3;
  const base = Math.floor(items.length / bucketCount);
  const remainder = items.length % bucketCount;

  const buckets = [];
  let cursor = 0;
  for (let i = 0; i < bucketCount; i += 1) {
    const size = base + (i < remainder ? 1 : 0);
    buckets.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return buckets;
}

export default function ResultsRoadmap({ roadmapSteps }) {
  const nextStep = roadmapSteps[0];
  // Excludes nextStep from the day-by-day breakdown below so it isn't
  // repeated verbatim right under its own highlighted callout.
  const remainingSteps = roadmapSteps.slice(1);
  const buckets = chunkIntoThree(remainingSteps);

  return (
    <div className="border-b border-zinc-300 py-14">
      <Link
        to="/mexico-fit-call"
        className="group mx-auto block max-w-xl border border-zinc-950 bg-zinc-950 p-8 text-center text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">
          Your Recommended Next Step
        </p>
        <h3 className="text-2xl font-light tracking-[-0.03em] sm:text-3xl">
          {nextStep.title}
        </h3>
        <p className="mt-4 leading-relaxed text-white/70">{nextStep.description}</p>

        <span className="mt-7 inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 group-hover:bg-white group-hover:text-zinc-950">
          Book The Call
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>

      <p className="mb-3 mt-14 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        Your Plan
      </p>
      <h3 className="text-center text-2xl font-light tracking-[-0.03em] text-zinc-950 sm:text-4xl">
        Your 90-Day Roadmap
      </h3>

      <div className="mt-10 grid gap-px bg-zinc-300 sm:grid-cols-3">
        {buckets.map((steps, index) => (
          <div key={PHASES[index].range} className="bg-white p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {PHASES[index].range}
            </p>
            <h4 className="mt-2 text-xl font-light tracking-[-0.02em] text-zinc-950">
              {PHASES[index].label}
            </h4>

            <ul className="mt-5 space-y-3">
              {steps.map((step) => (
                <li key={step.id} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
                  <p className="text-sm leading-relaxed text-zinc-600">
                    <span className="font-semibold text-zinc-900">{step.title}.</span>{" "}
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
