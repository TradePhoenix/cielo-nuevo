import React from "react";
import { Link } from "react-router-dom";
import { FOUNDER, TESTIMONIALS, FIT_CALL_PRICE } from "../data/trustContent";
import SEO from "../components/SEO";

export default function MexicoFitCallPage() {
  const whatsapp =
    "https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20like%20to%20book%20a%20Mexico%20Fit%20Call.";

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO
        title="Mexico Fit Call"
        description="Get clear before you move to Mexico — a private one-on-one call to answer your questions and help you understand what moving could realistically look like for you."
        path="/mexico-fit-call"
      />
      <section className="relative overflow-hidden bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Mexico Fit Call
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            Get clear before you move to Mexico.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            A private one-on-one relocation call for people considering life in Mexico.
            We’ll talk through your goals, timeline, budget, preferred areas, residency
            questions, lifestyle needs, and the smartest next step.
          </p>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50">
            {FIT_CALL_PRICE} &middot; One Private, One-On-One Call
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              Book The Call
            </a>

            <Link
              to="/"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-6 md:px-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm leading-relaxed text-zinc-600">
            Already built your <span className="font-semibold text-zinc-950">My Mexico Plan</span>? Bring it to the
            call — we'll refine your city choice, residency path, budget, and next actions together.
          </p>
          <Link
            to="/my-mexico-plan"
            className="flex-shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Open My Mexico Plan
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            What Happens Next
          </p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            From your first message to your next step.
          </h2>

          <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01 · Reach Out", "Message Path To Mexico on WhatsApp using the button above. It's a real conversation, not an automated booking system — Kalen replies personally to arrange a time."],
              ["02 · Before The Call", "There is nothing you need to prepare. It helps to have a general sense of your timeline and budget, but showing up without every answer figured out is completely normal."],
              ["03 · During The Call", "One focused, one-on-one conversation about your specific situation and questions — see exactly what's covered below."],
              ["04 · After The Call", "You leave with a clearer next step, not a sales pitch. There is no obligation to book anything further — some people continue with the Relocation Roadmap or Guided Landing, many simply move forward with more clarity."]
            ].map(([title, text]) => (
              <div key={title} className="bg-[#f6f1e8] p-8 transition hover:bg-white">
                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {title}
                </p>
                <p className="text-lg leading-relaxed text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              What We’ll Cover
            </p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              One focused call can save months of confusion.
            </h2>
          </div>

          <div className="grid gap-4 text-zinc-700">
            {[
              "Your reason for considering Mexico",
              "Playa del Carmen, Tulum, Cancún, or another area",
              "Budget, rent, lifestyle, and monthly cost expectations",
              "Residency, healthcare, banking, and local setup questions",
              "Renting versus buying considerations",
              "Whether Path To Mexico is the right support for your move"
            ].map((item) => (
              <div key={item} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#f6f1e8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Best For
          </p>

          <h2 className="mb-12 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            This is for people who want honest guidance before making expensive decisions.
          </h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-2">
            {[
              "You are thinking seriously about moving to Mexico.",
              "You feel overwhelmed by conflicting online information.",
              "You want to understand real costs and lifestyle tradeoffs.",
              "You need help deciding your smartest first step."
            ].map((item) => (
              <div key={item} className="bg-[#efe7d8] p-7 text-lg text-zinc-700 transition hover:bg-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Who You're Talking To
          </p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            Not a sales team. One person who has already done this.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-zinc-200 bg-[#f6f1e8] p-8">
              <img
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover"
              />
              <p className="mt-5 text-lg leading-relaxed text-zinc-700">"{FOUNDER.quote}"</p>
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {FOUNDER.name} &middot; {FOUNDER.role}
              </p>
            </div>

            <div className="border border-zinc-200 bg-[#f6f1e8] p-8">
              <p className="text-lg leading-relaxed text-zinc-700">"{TESTIMONIALS[0].quote}"</p>
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {TESTIMONIALS[0].name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Private Relocation Guidance
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            You do not need every answer today. You need the right next step.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            This call is not about pressure. It is about clarity, direction, and helping
            you understand whether Mexico fits the life you are trying to build.
          </p>

          <p className="mx-auto mt-6 text-xs uppercase tracking-[0.25em] text-white/40">
            {FIT_CALL_PRICE} &middot; One Private Call
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
          >
            Book Your Mexico Fit Call
          </a>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/40">
            Want more than a single call? The Relocation Roadmap and Guided Landing options go
            further —{" "}
            <a href="/#work" className="underline underline-offset-4 hover:text-white">
              see what's available
            </a>
            .
          </p>

          <p className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-white/30">
            Path To Mexico provides relocation guidance, local insight, and trusted
            introductions. We are not a law firm, immigration agency, tax advisor, financial
            advisor, or real estate brokerage.
          </p>
        </div>
      </section>
    </main>
  );
}