import React from "react";
import { Link } from "react-router-dom";

export default function MexicoFitCallPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#1f1a17]">
      <section className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#9b6f4e]">
          Mexico Fit Call
        </p>

        <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
          Begin with clarity before making the move.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#4b4038] md:text-xl">
          A private relocation clarity call for people considering life in Mexico.
          We’ll talk through your goals, timeline, budget, preferred areas, lifestyle,
          and the questions that are difficult to answer through online research alone.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://calendly.com/YOUR-CALENDLY-LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1f1a17] px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#3a3028]"
          >
            Book Your Mexico Fit Call
          </a>

          <Link
            to="/work-with-path-to-mexico"
            className="rounded-full border border-[#cdbba7] px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#1f1a17] transition hover:bg-white"
          >
            View Ways To Work Together
          </Link>
        </div>
      </section>

      <section className="border-y border-[#e2d3c2] bg-white/50 px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#9b6f4e]">
              Clarity
            </p>
            <h2 className="mb-4 font-serif text-2xl">Understand your options.</h2>
            <p className="leading-relaxed text-[#4b4038]">
              Get grounded on lifestyle, costs, areas, timing, and what your first steps
              could realistically look like.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#9b6f4e]">
              Direction
            </p>
            <h2 className="mb-4 font-serif text-2xl">Avoid blind decisions.</h2>
            <p className="leading-relaxed text-[#4b4038]">
              Moving countries can feel overwhelming. A focused conversation helps separate
              what matters now from what can wait.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#9b6f4e]">
              Trust
            </p>
            <h2 className="mb-4 font-serif text-2xl">Know who to talk to next.</h2>
            <p className="leading-relaxed text-[#4b4038]">
              If there is a fit, Path To Mexico can help point you toward trusted local
              professionals and clearer next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#9b6f4e]">
            What We’ll Cover
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            A calm first step before a major life decision.
          </h2>
        </div>

        <div className="grid gap-4 text-[#4b4038]">
          {[
            "Your reason for considering Mexico",
            "Playa del Carmen, Tulum, Cancún, or another area",
            "Budget, rent, lifestyle, and monthly costs",
            "Residency, healthcare, banking, and first steps",
            "Renting versus buying considerations",
            "Whether Path To Mexico is the right support for your move",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-[#e2d3c2] bg-white/60 p-5">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1f1a17] px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#d8a15f]">
            Private Relocation Guidance
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            You do not need every answer today. You need the right next step.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            This call is not about pressure. It is about clarity, direction, and helping you
            understand whether Mexico truly fits the life you are trying to build.
          </p>

          <a
            href="https://calendly.com/YOUR-CALENDLY-LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-[#d8a15f] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#1f1a17] transition hover:bg-[#e4b77c]"
          >
            Book Your Mexico Fit Call
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <Link to="/" className="text-[#9b6f4e] hover:underline">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
