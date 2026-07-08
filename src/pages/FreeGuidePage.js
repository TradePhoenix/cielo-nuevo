import React from "react";
import { Link } from "react-router-dom";

export default function FreeGuidePage() {
  const guideLink = "/downloads/10-things-to-know-before-moving-to-playa-del-carmen.html";

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <section className="bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Free Relocation Guide
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            10 things to know before moving to Playa del Carmen.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            A practical starter guide for people exploring life in Mexico. Learn what
            to consider before making big decisions around cost of living, renting,
            healthcare, residency, neighborhoods, and trusted local support.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={guideLink}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              Get The Free Guide
            </a>

            <Link
              to="/mexico-fit-call"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              Book A Mexico Fit Call
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              What’s Inside
            </p>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              Avoid the common mistakes people make before relocating.
            </h2>
          </div>

          <div className="grid gap-4 text-zinc-700 sm:grid-cols-2">
            {[
              "Cost of living",
              "Renting before buying",
              "Healthcare realities",
              "Neighborhood differences",
              "Residency questions",
              "Banking and money",
              "Transportation",
              "Bringing pets",
              "Trusted local contacts",
              "The emotional side of relocation"
            ].map((item) => (
              <div key={item} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#efe7d8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Who It’s For
          </p>

          <h2 className="mb-12 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            Built for people who want clarity before they make the leap.
          </h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-3">
            {[
              "You are considering moving to Mexico.",
              "You are researching Playa del Carmen or the Riviera Maya.",
              "You are a remote worker, entrepreneur, retiree, or investor.",
              "You want a slower, warmer, more flexible lifestyle.",
              "You are trying to understand costs before committing.",
              "You want fewer surprises and better first decisions."
            ].map((item) => (
              <div key={item} className="bg-white p-7 text-lg text-zinc-700 transition hover:bg-[#f6f1e8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Why I Created It
            </p>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              Most people ask the same questions before moving.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
            <p>
              After moving to Mexico myself, I realized how much of the relocation process
              is learned through experience. Online research helps, but it can also create
              more confusion.
            </p>

            <p>
              This guide brings together the practical things people usually wish they had
              understood earlier — before renting, buying, applying for residency, choosing
              an area, or trusting the wrong people.
            </p>

            <p className="pt-4 text-zinc-500">
              — Kalen Enns
              <br />
              Founder, Path To Mexico
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Still Have Questions?
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            One conversation can save months of uncertainty.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            The guide is a strong first step. If you want personal guidance around your
            situation, timeline, budget, and next move, start with a Mexico Fit Call.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={guideLink}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              Get The Free Guide
            </a>

            <Link
              to="/mexico-fit-call"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              Book The Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}