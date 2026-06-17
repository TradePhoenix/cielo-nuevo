import React from "react";
import { Link } from "react-router-dom";

export default function WorkWithPathToMexicoPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#1f1a17]">
      <section className="mx-auto max-w-5xl px-6 py-28">
        <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#9b6f4e]">
          Work With Path To Mexico
        </p>

        <h1 className="mb-8 font-serif text-5xl leading-tight md:text-7xl">
          Private relocation guidance for people seeking a different rhythm of life.
        </h1>

        <p className="max-w-3xl text-xl leading-relaxed text-[#4b4038]">
          Moving countries is about far more than paperwork. Housing, healthcare,
          banking, timing, lifestyle, and trusted relationships all matter.
          Path To Mexico helps simplify the process through thoughtful guidance
          and carefully selected local connections.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h2 className="mb-4 font-serif text-4xl">Mexico Fit Call</h2>

          <p className="mb-6 leading-relaxed text-[#4b4038]">
            Begin with clarity. A private one-on-one conversation designed to answer questions,
            provide perspective, and help you understand what life in Mexico could realistically
            look like.
          </p>

          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#9b6f4e]">
            Best For
          </p>

          <ul className="mb-8 space-y-2 text-[#4b4038]">
            <li>• Couples</li>
            <li>• Remote Professionals</li>
            <li>• Retirees</li>
            <li>• Entrepreneurs</li>
          </ul>

          <Link
            to="/mexico-fit-call"
            className="inline-block rounded-full bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
          >
            Book A Mexico Fit Call
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h2 className="mb-4 font-serif text-4xl">Relocation Roadmap</h2>

          <p className="mb-6 leading-relaxed text-[#4b4038]">
            Build your plan. A personalized strategy built around your timeline,
            budget, goals, and lifestyle priorities.
          </p>

          <ul className="mb-8 space-y-2 text-[#4b4038]">
            <li>• Neighborhoods</li>
            <li>• Housing</li>
            <li>• Cost of Living</li>
            <li>• Healthcare</li>
            <li>• Residency Considerations</li>
            <li>• Banking</li>
            <li>• First-Month Setup</li>
          </ul>

          <a
            href="/#contact"
            className="inline-block rounded-full bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
          >
            Apply For A Roadmap
          </a>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h2 className="mb-4 font-serif text-4xl">Guided Landing</h2>

          <p className="mb-6 leading-relaxed text-[#4b4038]">
            Ongoing support and trusted introductions for people wanting a smoother
            transition and more confidence throughout the process.
          </p>

          <ul className="mb-8 space-y-2 text-[#4b4038]">
            <li>• Realtors</li>
            <li>• Property Managers</li>
            <li>• Lawyers</li>
            <li>• Insurance Brokers</li>
            <li>• Accountants</li>
            <li>• Doctors</li>
            <li>• Movers</li>
          </ul>

          <a
            href="/#contact"
            className="inline-block rounded-full bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
          >
            Schedule A Conversation
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32">
        <h2 className="mb-8 font-serif text-5xl">Why Path To Mexico</h2>

        <div className="space-y-8 text-lg leading-relaxed text-[#4b4038]">
          <p>The internet provides information. Relationships provide confidence.</p>

          <p>
            Path To Mexico is intentionally built around trust, clarity, and carefully
            selected connections rather than overwhelming directories or endless opinions.
          </p>

          <p>Better introductions. Better decisions. A smoother landing.</p>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-[#9b6f4e] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
