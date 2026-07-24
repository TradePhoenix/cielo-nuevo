import { FIT_CALL_PRICE } from "./trustContent";

// Deliberate integration seam (see CLAUDE.md — no live backend/Stripe yet):
// swap these placeholder Payment Link URLs for real ones from the Stripe
// Dashboard, and the placeholder Formspree ID for a real form, without
// touching any component that imports from this file.
export const STRIPE_PAYMENT_LINKS = {
  fitCall: "https://buy.stripe.com/REPLACE_WITH_FIT_CALL_PAYMENT_LINK",
  roadmap: "https://buy.stripe.com/REPLACE_WITH_ROADMAP_PAYMENT_LINK",
};

export const REVENUE_LEADS_FORMSPREE_ID = "REPLACE_WITH_FORMSPREE_ID";

export const PRICING_TIERS = [
  {
    id: "fit-call",
    title: "Mexico Fit Call",
    price: FIT_CALL_PRICE,
    priceNote: "One private, one-on-one call",
    text:
      "A private one-on-one call to answer your questions, clarify your options, and help you understand what moving to Mexico could realistically look like.",
    bestFor: ["Early research", "Lifestyle questions", "Budget clarity", "Residency direction", "Choosing your next step"],
    ctaLabel: "Book & Pay Now",
    checkoutType: "stripe",
    stripeLinkKey: "fitCall",
  },
  {
    id: "roadmap",
    title: "Relocation Roadmap",
    price: "Starting at $499 USD",
    priceNote: "Personalized relocation strategy",
    text:
      "A personalized relocation strategy built around your timeline, budget, lifestyle preferences, housing needs, and long-term vision for life in Mexico.",
    bestFor: ["People ready to plan", "Couples and families", "Remote workers", "Retirees", "Entrepreneurs"],
    ctaLabel: "Reserve Your Roadmap",
    checkoutType: "stripe",
    stripeLinkKey: "roadmap",
  },
  {
    id: "guided-landing",
    title: "Guided Landing",
    price: "Custom Quote",
    priceNote: "Hands-on relocation support",
    text:
      "Private relocation support for people who want hands-on guidance, trusted introductions, and help navigating the practical details before and after arrival.",
    bestFor: ["Hands-on support", "Trusted local network", "Housing connections", "Professional introductions", "Ongoing guidance"],
    ctaLabel: "Request Your Quote",
    checkoutType: "quote",
  },
];
