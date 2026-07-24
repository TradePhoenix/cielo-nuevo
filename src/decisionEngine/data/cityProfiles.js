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
  // Mérida & the Yucatán Coast (DEST-001) — a distinct corridor from the
  // Caribbean coast above: an inland colonial city plus three Gulf coast
  // towns of decreasing size/services, in order from most to least urban.
  // Tag combinations reuse the exact shared vocabulary the three Caribbean
  // cities already use (no new tags added) — each city differentiates by
  // combination, not by inventing a one-off tag, matching this file's
  // existing pattern exactly. See cityDetails.js for the full profiles.
  {
    id: "merida",
    name: "Mérida",
    tags: ["urban", "remoteWork", "retirement", "budgetConscious"],
    teaser: "Colonial architecture, healthcare, and city life — with the coast a short trip away, not the whole point.",
    guideLink: "/guides/moving-to-merida",
  },
  {
    id: "progreso",
    name: "Progreso",
    tags: ["beach", "urban", "family"],
    teaser: "The Gulf Coast's most established beach town — accessible, social, and close to Mérida.",
    guideLink: "/guides/moving-to-progreso",
  },
  {
    id: "chicxulub-puerto",
    name: "Chicxulub Puerto",
    tags: ["beach", "quiet", "family"],
    teaser: "Quieter residential beach living next to Progreso, with easy access to Mérida.",
    guideLink: "/guides/moving-to-chicxulub-puerto",
  },
  {
    id: "telchac-puerto",
    name: "Telchac Puerto",
    tags: ["beach", "quiet", "exploratory", "budgetConscious"],
    teaser: "A smaller, more secluded Gulf Coast community for people who genuinely want privacy and space.",
    guideLink: "/guides/moving-to-telchac-puerto",
  },
  // Celestún, Sisal, Dzilam de Bravo & Santa Elena (DEST-002) — four more
  // Yucatán destinations distinct from both the Caribbean coast and the
  // DEST-001 Gulf towns above: three smaller, more remote/nature-first Gulf
  // coast communities plus one inland Puuc-region cultural village. Tag
  // combinations again reuse the exact shared vocabulary (no new tags
  // added) but each was deliberately chosen so its tag set is never a
  // strict subset of any other city's — see recommendationEngine.test.js's
  // DEST-002 cases for the hand-verified profile each city can win.
  {
    id: "celestun",
    name: "Celestún",
    tags: ["beach", "quiet", "retirement", "budgetConscious"],
    teaser: "A mangrove-fringed fishing village on the western Gulf, built around nature, quiet, and a genuinely unhurried pace.",
    guideLink: "/guides/moving-to-celestun",
  },
  {
    id: "sisal",
    name: "Sisal",
    tags: ["beach", "quiet", "comfortable"],
    teaser: "A historic Gulf port turned Pueblo Mágico — quiet and walkable, with real infrastructure and an easy trip to Mérida.",
    guideLink: "/guides/moving-to-sisal",
  },
  {
    id: "dzilam-de-bravo",
    name: "Dzilam de Bravo",
    tags: ["exploratory", "family", "budgetConscious"],
    teaser: "A working fishing port on the edge of a vast mangrove reserve — remote, independent, and unmistakably real.",
    guideLink: "/guides/moving-to-dzilam-de-bravo",
  },
  {
    id: "santa-elena",
    name: "Santa Elena",
    tags: ["quiet", "exploratory", "family"],
    teaser: "An inland Puuc-region village built around living Maya and Yucatecan culture — not a beach destination, and proud of it.",
    guideLink: "/guides/moving-to-santa-elena",
  },
];
