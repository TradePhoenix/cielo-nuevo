import { createCity } from "../types/city";

export const MOCK_CITIES = [
  createCity({
    id: "playa-del-carmen",
    name: "Playa del Carmen",
    region: "Riviera Maya",
    summary: "Walkable, international, and beach-close — the Riviera Maya's most established expat hub.",
    href: "/your-mexico/playa-del-carmen",
    quickFacts: { "Typical rent": "15,000-25,000 MXN", Airport: "Cancún (45 min)" },
  }),
  createCity({
    id: "tulum",
    name: "Tulum",
    region: "Riviera Maya",
    summary: "Slower-paced and wellness-oriented, with a smaller but growing long-term community.",
    href: "/your-mexico/tulum",
    quickFacts: { "Typical rent": "18,000-30,000 MXN", Airport: "Tulum (20 min)" },
  }),
];
