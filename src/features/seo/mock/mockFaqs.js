import { createFaq } from "../types/faq";

export const MOCK_FAQS = [
  createFaq({
    question: "Is it affordable to live in the Riviera Maya on a modest budget?",
    answer:
      "Yes, for people willing to live like locals rather than tourists — modest apartments away from the beach, local markets, and limited air conditioning use keep monthly costs well below what most newcomers first assume.",
  }),
  createFaq({
    question: "Do I need residency before I can rent long-term?",
    answer:
      "No. Tourist-status visitors can sign long-term rental leases; residency mainly matters for banking, importing a vehicle, and staying beyond 180 days.",
  }),
];
