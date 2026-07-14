import { createGuide, GUIDE_TYPES } from "../types/guide";
import { MOCK_AUTHORS } from "./mockAuthors";
import { MOCK_CATEGORIES } from "./mockCategories";
import { MOCK_FAQS } from "./mockFaqs";

// One fully-populated sample per template family is enough to prove the
// architecture end-to-end without generating the hundreds of real guide
// pages that are explicitly out of scope for this ticket.
export const MOCK_GUIDES = [
  createGuide({
    slug: "cost-of-living-merida",
    guideType: GUIDE_TYPES.COST_OF_LIVING,
    title: "Cost Of Living In Mérida",
    description:
      "A grounded look at housing, groceries, utilities, healthcare, and monthly budgets for life in Mérida.",
    category: MOCK_CATEGORIES.costOfLiving,
    heroImage: "/sanctuary.jpg",
    quickFacts: {
      "Budget lifestyle": "18,000-25,000 MXN/mo",
      "Comfortable lifestyle": "28,000-45,000 MXN/mo",
      Climate: "Hot, dry inland climate",
    },
    sections: [
      {
        id: "housing-and-rent",
        heading: "Housing and rent",
        body: [
          "Mérida's colonial centro commands a premium; newer developments to the north are often better value for the same square footage.",
        ],
      },
      {
        id: "groceries",
        heading: "Groceries",
        body: ["Local markets and mid-size chains keep weekly grocery costs modest for anyone cooking at home."],
      },
    ],
    prosAndCons: {
      pros: ["Very low crime relative to the rest of Mexico", "Strong colonial-era housing stock"],
      cons: ["Extreme heat much of the year", "Not beach-adjacent"],
    },
    faqs: MOCK_FAQS,
    relatedGuideIds: ["safety-in-mexico"],
    relatedCityIds: ["playa-del-carmen"],
    relatedServiceIds: ["mexico-fit-call"],
    author: MOCK_AUTHORS.pathToMexicoTeam,
    publishedAt: "2026-01-12",
    updatedAt: "2026-06-30",
  }),
];
