import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import SEO from "../components/SEO";
import CTASection from "../components/CTASection";
import { PRICING_TIERS, STRIPE_PAYMENT_LINKS, REVENUE_LEADS_FORMSPREE_ID } from "../data/revenueConfig";
import { trackEvent } from "../utils/trackEvent";

function PricingCard({ tier }) {
  const isStripe = tier.checkoutType === "stripe";
  const href = isStripe ? STRIPE_PAYMENT_LINKS[tier.stripeLinkKey] : "#request-quote";

  const handleClick = () => {
    trackEvent("pricing_cta_clicked", { tier: tier.id, checkoutType: tier.checkoutType });
  };

  return (
    <div className="flex min-h-[560px] flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white">
      <div>
        <h2 className="mb-2 text-4xl font-light tracking-[-0.05em]">{tier.title}</h2>
        <p className="mb-1 text-sm uppercase tracking-[0.25em] text-zinc-500">{tier.price}</p>
        <p className="mb-7 text-xs uppercase tracking-[0.2em] text-zinc-400">{tier.priceNote}</p>

        <p className="mb-8 leading-relaxed text-zinc-600">{tier.text}</p>

        <div className="border-t border-zinc-300 pt-6">
          <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">Best For</p>
          <ul className="space-y-3 text-zinc-700">
            {tier.bestFor.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={href}
        onClick={handleClick}
        className="mt-10 inline-block bg-zinc-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#d8a15f] hover:text-zinc-950"
      >
        {tier.ctaLabel}
      </a>
    </div>
  );
}

function QuoteRequestForm() {
  const [state, handleSubmit] = useForm(REVENUE_LEADS_FORMSPREE_ID);

  useEffect(() => {
    if (state.succeeded) {
      trackEvent("guided_landing_quote_requested");
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <p className="mx-auto max-w-md text-center text-lg leading-relaxed text-white/70">
        Thank you — we've received your request. Someone from Path To Mexico will follow up
        personally with a custom quote.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-md gap-4 text-left">
      <input type="hidden" name="_subject" value="Guided Landing Quote Request" />
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-white"
        />
        <ValidationError field="firstName" errors={state.errors} />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-white"
        />
        <ValidationError field="email" errors={state.errors} />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Tell us a bit about what you're looking for"
          rows={4}
          className="w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-white"
        />
        <ValidationError field="message" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] disabled:opacity-60"
      >
        {state.submitting ? "Sending..." : "Request My Quote"}
      </button>
    </form>
  );
}

export default function PricingPage() {
  useEffect(() => {
    trackEvent("pricing_page_viewed");
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for your move to Mexico — from a single clarifying call to fully guided relocation support."
        path="/pricing"
      />

      <section className="bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">Pricing</p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            Simple, transparent pricing for your move to Mexico.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            Choose the level of support that fits where you are — from one clarifying
            conversation to fully guided relocation support. No hidden fees, no pressure.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section id="request-quote" className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">Guided Landing</p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            Tell us what you need. We'll send a custom quote.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            Guided Landing is hands-on and personalized, so pricing depends on scope. A few
            details are all we need to follow up with the right quote.
          </p>

          <div className="mt-10">
            <QuoteRequestForm />
          </div>
        </div>
      </section>

      <CTASection
        label="Still Deciding?"
        title="One clear conversation can change the whole direction of your move."
        text="If you're not sure which option fits, start with a Mexico Fit Call — it's built to help you figure out the smartest next step."
        primaryText="Book A Mexico Fit Call"
        primaryTo="/mexico-fit-call"
        secondaryText="Back To Home"
        secondaryTo="/"
      />
    </main>
  );
}
