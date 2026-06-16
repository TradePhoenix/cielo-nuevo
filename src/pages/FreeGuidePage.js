import React from "react";

export default function FreeGuidePage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#1f1a17]">
      <section className="max-w-5xl mx-auto px-6 py-28">

        <p className="uppercase tracking-[0.3em] text-sm text-[#9b6f4e] mb-5">
          Free Guide
        </p>

        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
          10 Things To Know Before Moving To Playa Del Carmen
        </h1>

        <p className="text-xl text-[#4b4038] leading-relaxed max-w-3xl mb-16">
          A calmer, more practical introduction to life in Mexico.
          Built for people who want clarity, fewer surprises, and a better understanding
          of what life here actually looks like.
        </p>

        <div className="bg-white rounded-3xl p-10 shadow-sm max-w-3xl">

          <h2 className="font-serif text-3xl mb-8">
            Inside You'll Discover
          </h2>

          <div className="space-y-5 text-[#4b4038] text-lg leading-relaxed">

            <p>✓ The real cost of living.</p>

            <p>✓ Why renting before buying matters.</p>

            <p>✓ Healthcare realities.</p>

            <p>✓ Neighborhood differences.</p>

            <p>✓ Common mistakes people make.</p>

            <p>✓ The emotional side of relocation.</p>

            <p>✓ Why trusted relationships matter.</p>

            <p>✓ What most people wish they knew sooner.</p>

          </div>

          <a
            href="/downloads/10-things-to-know-before-moving-to-playa-del-carmen.html"
            className="inline-block mt-12 bg-black text-white px-8 py-4 rounded-full uppercase tracking-[0.2em] text-sm"
          >
            Receive The Guide
          </a>

        </div>

      </section>
    </main>
  );
}
