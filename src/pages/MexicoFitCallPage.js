import React from "react";
import { Link } from "react-router-dom";

export default function MexicoFitCallPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#1f1a17] px-6 py-24">
      <section className="max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-sm text-[#9b6f4e] mb-4">
          Path To Mexico
        </p>

        <h1 className="text-4xl md:text-6xl font-serif mb-6">
          Mexico Fit Call
        </h1>

        <p className="text-xl md:text-2xl text-[#4b4038] leading-relaxed mb-8">
          A private 30-minute relocation clarity call to see if Mexico is the right move for your lifestyle, budget, timeline, and long-term goals.
        </p>

        <div className="bg-white/70 border border-[#e2d3c2] rounded-2xl p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-serif mb-4">What we’ll talk through</h2>

          <ul className="space-y-3 text-[#4b4038] leading-relaxed">
            <li>• Your reason for wanting Mexico</li>
            <li>• Playa del Carmen, Tulum, Cancún, or another area</li>
            <li>• Budget, rent, lifestyle, and monthly costs</li>
            <li>• Residency, healthcare, banking, and first steps</li>
            <li>• Whether Path To Mexico is the right support for your move</li>
          </ul>
        </div>

        <div className="bg-[#1f1a17] text-white rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-serif mb-4">Book your call</h2>

          <p className="text-white/80 mb-6 leading-relaxed">
            This is a calm first step before making a major life move. No pressure. Just clarity, direction, and grounded guidance.
          </p>

          <a
            href="https://calendly.com/YOUR-CALENDLY-LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d8a15f] text-[#1f1a17] px-6 py-3 rounded-full font-medium hover:bg-[#e4b77c] transition"
          >
            Book Your Mexico Fit Call
          </a>
        </div>

        <Link to="/" className="text-[#9b6f4e] hover:underline">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
