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
    tags: ["beach", "urban", "family", "comfortable"],
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
    tags: ["beach", "quiet", "exploratory", "budgetConscious", "remote"],
    teaser: "A smaller, more secluded Gulf Coast community for people who genuinely want privacy and space.",
    guideLink: "/guides/moving-to-telchac-puerto",
  },
  // Celestún, Sisal, Dzilam de Bravo & Santa Elena (DEST-002) — four more
  // Yucatán destinations distinct from both the Caribbean coast and the
  // DEST-001 Gulf towns above: three smaller, more remote/nature-first Gulf
  // coast communities plus one inland Puuc-region cultural village.
  //
  // BP-001 (docs/decision-engine/BLUEPRINT_11_DESTINATION_SEPARABILITY_AUDIT.md)
  // exhaustively enumerated all 3,840 real questionnaire answer combinations
  // and found Sisal specifically could win 0 of them — its original 3-tag
  // set's ceiling was always matched or beaten by an earlier-array city,
  // no matter the profile. BP-002 added the placeCharacter question
  // (questions.js) and three new tags (heritage, natureFirst, remote) to
  // give the destinations that genuinely have that identity — but no
  // others — an honest, previously-inexpressible way to be matched on.
  // See recommendationEngine.test.js's DEST-002/BP-002 cases for the
  // real-questionnaire-answer profile each city can win.
  {
    id: "celestun",
    name: "Celestún",
    tags: ["beach", "quiet", "retirement", "budgetConscious", "natureFirst"],
    teaser: "A mangrove-fringed fishing village on the western Gulf, built around nature, quiet, and a genuinely unhurried pace.",
    guideLink: "/guides/moving-to-celestun",
  },
  {
    id: "sisal",
    name: "Sisal",
    tags: ["beach", "quiet", "comfortable", "heritage"],
    teaser: "A historic Gulf port turned Pueblo Mágico — quiet and walkable, with real infrastructure and an easy trip to Mérida.",
    guideLink: "/guides/moving-to-sisal",
  },
  {
    id: "dzilam-de-bravo",
    name: "Dzilam de Bravo",
    tags: ["exploratory", "family", "budgetConscious", "natureFirst", "remote"],
    teaser: "A working fishing port on the edge of a vast mangrove reserve — remote, independent, and unmistakably real.",
    guideLink: "/guides/moving-to-dzilam-de-bravo",
  },
  {
    id: "santa-elena",
    name: "Santa Elena",
    tags: ["quiet", "exploratory", "family", "heritage"],
    teaser: "An inland Puuc-region village built around living Maya and Yucatecan culture — not a beach destination, and proud of it.",
    guideLink: "/guides/moving-to-santa-elena",
  },
  // DEST-003 — 14 new destinations completing the Yucatán Peninsula library
  // (25 total). guideLink points to each city's own City Detail page
  // (/your-mexico/<id>) rather than a separate /guides/moving-to-<id>
  // article: that per-destination article pattern requires one hand-built
  // page component + manual route per guide (see App.js's 27 individual
  // /guides/* routes) with no dynamic route, and this file's own header
  // comment requires guideLink to resolve to "real, substantial content"
  // rather than a dead end. The City Detail page already IS the full
  // destination guide (see cityDetails.js's DEST-003 entries) — pointing
  // guideLink at a second, thinner article would either duplicate that
  // content or under-deliver on the "real, substantial content" promise.
  // Tags reuse the exact existing vocabulary only, no new tags added.
  //
  // Region assignment (see atlasGroups.js REGION_GROUPS) follows the same
  // methodology already established there: each city's own regional
  // identity as stated in its cityDetails.js content, not an invented
  // classification. Sisal/Telchac Puerto stay in Gulf Coast (accessible,
  // established) while Celestún/Dzilam de Bravo move to Hidden Gems
  // alongside El Cuyo/Río Lagartos (remote, nature-first, off the main
  // Progreso corridor) — a reclassification of existing cities' *region*
  // only, not their Blueprint tags/matching behavior, which are unchanged.
  {
    id: "puerto-morelos",
    name: "Puerto Morelos",
    tags: ["beach", "quiet", "comfortable", "budgetConscious", "remoteWork"],
    teaser: "A protected-reef fishing town between Cancún and Playa del Carmen — smaller, calmer, and deliberately less built-up than its neighbors.",
    guideLink: "/your-mexico/puerto-morelos",
  },
  {
    id: "cozumel",
    name: "Cozumel",
    tags: ["beach", "premium", "retirement", "exploratory", "comfortable"],
    teaser: "An island apart — literally — with a slower island rhythm, world-class diving, and a real year-round community distinct from the mainland coast.",
    guideLink: "/your-mexico/cozumel",
  },
  {
    id: "bacalar",
    name: "Bacalar",
    tags: ["quiet", "natureFirst", "exploratory", "budgetConscious", "remote"],
    teaser: "Built entirely around its famous seven-color lagoon — a small, laid-back town for people who want nature first and nightlife never.",
    guideLink: "/your-mexico/bacalar",
  },
  {
    id: "mahahual",
    name: "Mahahual",
    tags: ["beach", "remote", "exploratory", "natureFirst", "frontier"],
    teaser: "A tiny Costa Maya beach village hours south of the Riviera Maya crowds — genuinely undeveloped, genuinely quiet.",
    guideLink: "/your-mexico/mahahual",
  },
  {
    id: "akumal",
    name: "Akumal",
    tags: ["beach", "quiet", "premium", "natureFirst"],
    teaser: "A small, protected bay between Playa del Carmen and Tulum, known for its sea turtles and a noticeably calmer pace than either neighbor.",
    guideLink: "/your-mexico/akumal",
  },
  {
    id: "cancun",
    name: "Cancún",
    tags: ["urban", "budgetConscious", "family"],
    teaser: "The region's real infrastructure hub — separate from the tourist Hotel Zone, El Centro is where residents actually live, work, and rely on the peninsula's biggest airport.",
    guideLink: "/your-mexico/cancun",
  },
  {
    id: "valladolid",
    name: "Valladolid",
    tags: ["heritage", "budgetConscious", "remoteWork", "exploratory", "comfortable"],
    teaser: "A colonial Pueblo Mágico squarely between Mérida and the Caribbean coast — increasingly popular with remote workers who want culture and connectivity together.",
    guideLink: "/your-mexico/valladolid",
  },
  {
    id: "izamal",
    name: "Izamal",
    tags: ["quiet", "heritage", "exploratory", "budgetConscious"],
    teaser: "The \"Yellow City\" — a small, deeply Maya and colonial Pueblo Mágico built for people who want culture and quiet over beach or bustle.",
    guideLink: "/your-mexico/izamal",
  },
  {
    id: "tekax",
    name: "Tekax",
    tags: ["exploratory", "remote", "budgetConscious", "frontier"],
    teaser: "A working agricultural town in the Puuc region's south — genuinely local, genuinely quiet, and not built with visitors in mind.",
    guideLink: "/your-mexico/tekax",
  },
  {
    id: "tizimin",
    name: "Tizimín",
    tags: ["quiet", "budgetConscious", "family", "remote", "frontier"],
    teaser: "A working cattle-ranching hub in the state's north — practical rather than picturesque, and the real supply town for the coast nearby.",
    guideLink: "/your-mexico/tizimin",
  },
  {
    id: "chelem",
    name: "Chelem",
    tags: ["beach", "quiet", "budgetConscious", "comfortable", "exploratory"],
    teaser: "A small, quiet beach community just west of Progreso — a slower, more residential alternative on the same stretch of Gulf coast.",
    guideLink: "/your-mexico/chelem",
  },
  {
    id: "chuburna-puerto",
    name: "Chuburná Puerto",
    tags: ["beach", "remote", "frontier", "quiet"],
    teaser: "A quiet Gulf beach town further west of Progreso, with fewer services and a genuinely slower, more local pace.",
    guideLink: "/your-mexico/chuburna-puerto",
  },
  {
    id: "el-cuyo",
    name: "El Cuyo",
    tags: ["beach", "quiet", "natureFirst", "exploratory", "remote"],
    teaser: "A remote fishing village on the state's northern tip, drawing a small but growing wave of people who want unspoiled coast over convenience.",
    guideLink: "/your-mexico/el-cuyo",
  },
  {
    id: "rio-lagartos",
    name: "Río Lagartos",
    tags: ["natureFirst", "remote", "exploratory", "frontier", "quiet"],
    teaser: "A small fishing village on the edge of a vast flamingo-filled biosphere reserve — built around nature and little else.",
    guideLink: "/your-mexico/rio-lagartos",
  },
];
