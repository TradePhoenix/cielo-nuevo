import { createService } from "../types/service";

export const MOCK_SERVICES = [
  createService({
    id: "mexico-fit-call",
    title: "Mexico Fit Call",
    description: "A one-on-one call to sanity-check whether Mexico actually fits your situation.",
    href: "/mexico-fit-call",
  }),
  createService({
    id: "my-mexico-blueprint",
    title: "My Mexico Blueprint",
    description: "A guided readiness score, city matches, and a 30/60/90-day roadmap.",
    href: "/my-mexico-blueprint",
  }),
];
