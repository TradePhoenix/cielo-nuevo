import React from "react";
import { Link } from "react-router-dom";

export default function WorkWithPathToMexicoPage() {
  const services = [
    {
      title: "Mexico Fit Call",
      price: "$99 USD",
      text:
        "A private one-on-one call to answer your questions, clarify your options, and help you understand what moving to Mexico could realistically look like.",
      bestFor: [
        "Early research",
        "Lifestyle questions",
        "Budget clarity",
        "Residency direction",
        "Choosing your next step"
      ],
      cta: "Book The Call",
      href: "/mexico-fit-call"
    },
    {
      title: "Relocation Roadmap",
      price: "Starting at $499 USD",
      text:
        "A personalized relocation strategy built around your timeline, budget, lifestyle preferences, housing needs, and long-term vision for life in Mexico.",
      bestFor: [
        "People ready to plan",
        "Couples and families",
        "Remote workers",
        "Retirees",
        "Entrepreneurs"
      ],
      cta: "Apply For Roadmap",
      href: "/mexico-fit-call"
    },
    {
      title: "Guided Landing",
      price: "Custom Quote",
      text:
        "Private relocation support for people who want hands-on guidance, trusted introductions, and help navigating the practical details before and after arrival.",
      bestFor: [
        "Hands-on support",
        "Trusted local network",
        "Housing connections",
        "Professional introductions",
        "Ongoing guidance"
      ],
      cta: "Schedule A Conversation",
      href: "/mexico-fit-call"
    }
  ];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <section className="bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Work With Path To Mexico
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            Choose the level of support that fits your move.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            Whether you are just exploring Mexico or already planning your relocation,
            Path To Mexico offers practical guidance, trusted introductions, and a clearer
            path into life in Mexico.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/mexico-fit-call"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              Start With A Fit Call
            </Link>

            <Link
              to="/free-guide"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              Get The Free Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex min-h-[560px] flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white">
              <div>
                <h2 className="mb-4 text-4xl font-light tracking-[-0.05em]">
                  {service.title}
                </h2>

                <p className="mb-7 text-sm uppercase tracking-[0.25em] text-zinc-500">
                  {service.price}
                </p>

                <p className="mb-8 leading-relaxed text-zinc-600">
                  {service.text}
                </p>

                <div className="border-t border-zinc-300 pt-6">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Best For
                  </p>

                  <ul className="space-y-3 text-zinc-700">
                    {service.bestFor.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={service.href}
                className="mt-10 inline-block border border-zinc-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Which One Is Right?
            </p>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              Start smaller if you need clarity. Go deeper when you are ready to move.
            </h2>
          </div>

          <div className="grid gap-4 text-zinc-700">
            {[
              ["If you are still exploring", "Start with the Mexico Fit Call."],
              ["If you know Mexico is likely", "Choose the Relocation Roadmap."],
              ["If you want hands-on help", "Ask about Guided Landing support."],
              ["If you are unsure", "Start with one conversation. That is usually enough to reveal the next step."]
            ].map(([label, text]) => (
              <div key={label} className="border border-zinc-200 bg-white p-6 transition hover:bg-[#f6f1e8]">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {label}
                </p>
                <p className="text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Why Path To Mexico
            </p>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              The internet gives information. Relationships create confidence.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
            <p>
              Moving countries is not only about finding information. It is about knowing
              which information matters, what decisions come first, and who you can trust
              when the process becomes practical.
            </p>

            <p>
              Path To Mexico is intentionally built around clarity, lived experience, and
              carefully selected local connections rather than overwhelming directories or
              endless opinions.
            </p>

            <p className="text-zinc-950">
              Better questions. Better introductions. A smoother landing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Start Here
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            One clear conversation can change the whole direction of your move.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            If you are considering Mexico and want honest guidance before making expensive
            decisions, start with a Mexico Fit Call.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/mexico-fit-call"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              Book A Mexico Fit Call
            </Link>

            <Link
              to="/"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}