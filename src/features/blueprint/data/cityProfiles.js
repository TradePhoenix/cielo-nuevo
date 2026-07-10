// My Mexico Blueprint — candidate city/area matches.
//
// Kept intentionally short: every entry here must correspond to a guide that
// already exists on the site, so a match always lands the visitor on real,
// substantial content instead of a dead end. Each city's `tags` describe its
// "personality" and are compared against the visitor's tagCounts in
// recommendationEngine.js — no per-user copy lives here, only evergreen data.

export const CITY_PROFILES = [
  {
    id: "playa-del-carmen",
    name: "Playa del Carmen",
    tags: ["urban", "beach", "remoteWork", "comfortable", "premium"],
    teaser: "Walkable, social, and built for people who want beach life without giving up amenities.",
    guideLink: "/guides/moving-to-playa-del-carmen",
  },
  {
    id: "tulum",
    name: "Tulum",
    tags: ["beach", "quiet", "premium", "exploratory"],
    teaser: "A slower, more boho pace with a wellness-forward community — at a higher cost of living.",
    guideLink: "/guides/moving-to-tulum",
  },
  {
    id: "riviera-maya",
    name: "Riviera Maya",
    tags: ["quiet", "family", "budgetConscious", "retirement"],
    teaser: "The broader region beyond the tourist center — quieter, more affordable, and family-friendly.",
    guideLink: "/guides/moving-to-riviera-maya",
  },
];
