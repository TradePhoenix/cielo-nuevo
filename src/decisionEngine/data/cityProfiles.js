// My Mexico Blueprint — candidate city/area matches.
//
// Kept intentionally short: every entry here must correspond to a guide that
// already exists on the site, so a match always lands the visitor on real,
// substantial content instead of a dead end. Each city's `tags` describe its
// "personality" and are compared against the visitor's tagCounts in
// recommendationEngine.js — no per-user copy lives here, only evergreen data.
//
// PTM Spanish-parity pass: `teaser` became `{ en, es }` (name/guideLink/tags
// stay as before — recommendationEngine.js resolves `teaser` against its own
// `lang` parameter). This is the one piece of destination narrative content
// translated in that pass, since these one-line teasers surface directly in
// Blueprint results and Compare, not because it reopens the standing,
// separate decision to leave full destination/guide bodies English-only.

export const CITY_PROFILES = [
  {
    id: "playa-del-carmen",
    name: "Playa del Carmen",
    tags: ["urban", "beach", "remoteWork", "comfortable", "premium"],
    teaser: {
      en: "Walkable, social, and built for people who want beach life without giving up amenities.",
      es: "Caminable, social y pensado para quienes quieren vida de playa sin renunciar a las comodidades.",
    },
    guideLink: "/guides/moving-to-playa-del-carmen",
  },
  {
    id: "tulum",
    name: "Tulum",
    tags: ["beach", "quiet", "premium", "exploratory"],
    teaser: {
      en: "A slower, more boho pace with a wellness-forward community — at a higher cost of living.",
      es: "Un ritmo más lento y bohemio con una comunidad enfocada en el bienestar — con un costo de vida más alto.",
    },
    guideLink: "/guides/moving-to-tulum",
  },
  {
    id: "riviera-maya",
    name: "Riviera Maya",
    tags: ["quiet", "family", "budgetConscious", "retirement"],
    teaser: {
      en: "The broader region beyond the tourist center — quieter, more affordable, and family-friendly.",
      es: "La región más amplia más allá del centro turístico — más tranquila, más asequible y familiar.",
    },
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
    teaser: {
      en: "Colonial architecture, healthcare, and city life — with the coast a short trip away, not the whole point.",
      es: "Arquitectura colonial, salud y vida de ciudad — con la costa a poca distancia, no como el objetivo principal.",
    },
    guideLink: "/guides/moving-to-merida",
  },
  {
    id: "progreso",
    name: "Progreso",
    tags: ["beach", "urban", "family", "comfortable"],
    teaser: {
      en: "The Gulf Coast's most established beach town — accessible, social, and close to Mérida.",
      es: "El pueblo de playa más consolidado de la Costa del Golfo — accesible, social y cerca de Mérida.",
    },
    guideLink: "/guides/moving-to-progreso",
  },
  {
    id: "chicxulub-puerto",
    name: "Chicxulub Puerto",
    tags: ["beach", "quiet", "family"],
    teaser: {
      en: "Quieter residential beach living next to Progreso, with easy access to Mérida.",
      es: "Vida de playa residencial y tranquila junto a Progreso, con fácil acceso a Mérida.",
    },
    guideLink: "/guides/moving-to-chicxulub-puerto",
  },
  {
    id: "telchac-puerto",
    name: "Telchac Puerto",
    tags: ["beach", "quiet", "exploratory", "budgetConscious", "remote"],
    teaser: {
      en: "A smaller, more secluded Gulf Coast community for people who genuinely want privacy and space.",
      es: "Una comunidad más pequeña y apartada en la Costa del Golfo, para quienes realmente buscan privacidad y espacio.",
    },
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
    teaser: {
      en: "A mangrove-fringed fishing village on the western Gulf, built around nature, quiet, and a genuinely unhurried pace.",
      es: "Un pueblo pesquero bordeado de manglares en el Golfo occidental, construido en torno a la naturaleza, la tranquilidad y un ritmo genuinamente sin prisas.",
    },
    guideLink: "/guides/moving-to-celestun",
  },
  {
    id: "sisal",
    name: "Sisal",
    tags: ["beach", "quiet", "comfortable", "heritage"],
    teaser: {
      en: "A historic Gulf port turned Pueblo Mágico — quiet and walkable, with real infrastructure and an easy trip to Mérida.",
      es: "Un histórico puerto del Golfo convertido en Pueblo Mágico — tranquilo y caminable, con infraestructura real y un viaje sencillo a Mérida.",
    },
    guideLink: "/guides/moving-to-sisal",
  },
  {
    id: "dzilam-de-bravo",
    name: "Dzilam de Bravo",
    tags: ["exploratory", "family", "budgetConscious", "natureFirst", "remote"],
    teaser: {
      en: "A working fishing port on the edge of a vast mangrove reserve — remote, independent, and unmistakably real.",
      es: "Un puerto pesquero activo al borde de una vasta reserva de manglares — remoto, independiente e inconfundiblemente auténtico.",
    },
    guideLink: "/guides/moving-to-dzilam-de-bravo",
  },
  {
    id: "santa-elena",
    name: "Santa Elena",
    tags: ["quiet", "exploratory", "family", "heritage"],
    teaser: {
      en: "An inland Puuc-region village built around living Maya and Yucatecan culture — not a beach destination, and proud of it.",
      es: "Un pueblo del interior en la región Puuc, construido en torno a la cultura maya y yucateca viva — no es un destino de playa, y lo asume con orgullo.",
    },
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
    teaser: {
      en: "A protected-reef fishing town between Cancún and Playa del Carmen — smaller, calmer, and deliberately less built-up than its neighbors.",
      es: "Un pueblo pesquero de arrecife protegido entre Cancún y Playa del Carmen — más pequeño, más tranquilo y deliberadamente menos construido que sus vecinos.",
    },
    guideLink: "/your-mexico/puerto-morelos",
  },
  {
    id: "cozumel",
    name: "Cozumel",
    tags: ["beach", "premium", "retirement", "exploratory", "comfortable"],
    teaser: {
      en: "An island apart — literally — with a slower island rhythm, world-class diving, and a real year-round community distinct from the mainland coast.",
      es: "Una isla aparte — literalmente — con un ritmo isleño más lento, buceo de talla mundial y una comunidad real todo el año, distinta de la costa continental.",
    },
    guideLink: "/your-mexico/cozumel",
  },
  {
    id: "bacalar",
    name: "Bacalar",
    tags: ["quiet", "natureFirst", "exploratory", "budgetConscious", "remote"],
    teaser: {
      en: "Built entirely around its famous seven-color lagoon — a small, laid-back town for people who want nature first and nightlife never.",
      es: "Construido enteramente alrededor de su famosa laguna de siete colores — un pueblo pequeño y relajado para quienes quieren naturaleza primero y vida nocturna nunca.",
    },
    guideLink: "/your-mexico/bacalar",
  },
  {
    id: "mahahual",
    name: "Mahahual",
    tags: ["beach", "remote", "exploratory", "natureFirst", "frontier"],
    teaser: {
      en: "A tiny Costa Maya beach village hours south of the Riviera Maya crowds — genuinely undeveloped, genuinely quiet.",
      es: "Un pequeño pueblo de playa en Costa Maya, a horas al sur de las multitudes de la Riviera Maya — genuinamente sin desarrollar, genuinamente tranquilo.",
    },
    guideLink: "/your-mexico/mahahual",
  },
  {
    id: "akumal",
    name: "Akumal",
    tags: ["beach", "quiet", "premium", "natureFirst"],
    teaser: {
      en: "A small, protected bay between Playa del Carmen and Tulum, known for its sea turtles and a noticeably calmer pace than either neighbor.",
      es: "Una pequeña bahía protegida entre Playa del Carmen y Tulum, conocida por sus tortugas marinas y un ritmo notablemente más tranquilo que el de sus vecinos.",
    },
    guideLink: "/your-mexico/akumal",
  },
  {
    id: "cancun",
    name: "Cancún",
    tags: ["urban", "budgetConscious", "family"],
    teaser: {
      en: "The region's real infrastructure hub — separate from the tourist Hotel Zone, El Centro is where residents actually live, work, and rely on the peninsula's biggest airport.",
      es: "El verdadero centro de infraestructura de la región — separado de la Zona Hotelera turística, El Centro es donde los residentes realmente viven, trabajan y dependen del aeropuerto más grande de la península.",
    },
    guideLink: "/your-mexico/cancun",
  },
  {
    id: "valladolid",
    name: "Valladolid",
    tags: ["heritage", "budgetConscious", "remoteWork", "exploratory", "comfortable"],
    teaser: {
      en: "A colonial Pueblo Mágico squarely between Mérida and the Caribbean coast — increasingly popular with remote workers who want culture and connectivity together.",
      es: "Un Pueblo Mágico colonial justo entre Mérida y la costa caribeña — cada vez más popular entre trabajadores remotos que buscan cultura y conectividad juntas.",
    },
    guideLink: "/your-mexico/valladolid",
  },
  {
    id: "izamal",
    name: "Izamal",
    tags: ["quiet", "heritage", "exploratory", "budgetConscious"],
    teaser: {
      en: "The \"Yellow City\" — a small, deeply Maya and colonial Pueblo Mágico built for people who want culture and quiet over beach or bustle.",
      es: "La \"Ciudad Amarilla\" — un pequeño Pueblo Mágico profundamente maya y colonial, pensado para quienes prefieren cultura y tranquilidad antes que playa o bullicio.",
    },
    guideLink: "/your-mexico/izamal",
  },
  {
    id: "tekax",
    name: "Tekax",
    tags: ["exploratory", "remote", "budgetConscious", "frontier"],
    teaser: {
      en: "A working agricultural town in the Puuc region's south — genuinely local, genuinely quiet, and not built with visitors in mind.",
      es: "Un pueblo agrícola activo en el sur de la región Puuc — genuinamente local, genuinamente tranquilo, y no construido pensando en visitantes.",
    },
    guideLink: "/your-mexico/tekax",
  },
  {
    id: "tizimin",
    name: "Tizimín",
    tags: ["quiet", "budgetConscious", "family", "remote", "frontier"],
    teaser: {
      en: "A working cattle-ranching hub in the state's north — practical rather than picturesque, and the real supply town for the coast nearby.",
      es: "Un centro ganadero activo en el norte del estado — práctico más que pintoresco, y el verdadero pueblo de abastecimiento para la costa cercana.",
    },
    guideLink: "/your-mexico/tizimin",
  },
  {
    id: "chelem",
    name: "Chelem",
    tags: ["beach", "quiet", "budgetConscious", "comfortable", "exploratory"],
    teaser: {
      en: "A small, quiet beach community just west of Progreso — a slower, more residential alternative on the same stretch of Gulf coast.",
      es: "Una pequeña y tranquila comunidad de playa justo al oeste de Progreso — una alternativa más lenta y residencial en el mismo tramo de costa del Golfo.",
    },
    guideLink: "/your-mexico/chelem",
  },
  {
    id: "chuburna-puerto",
    name: "Chuburná Puerto",
    tags: ["beach", "remote", "frontier", "quiet"],
    teaser: {
      en: "A quiet Gulf beach town further west of Progreso, with fewer services and a genuinely slower, more local pace.",
      es: "Un tranquilo pueblo de playa del Golfo más al oeste de Progreso, con menos servicios y un ritmo genuinamente más lento y local.",
    },
    guideLink: "/your-mexico/chuburna-puerto",
  },
  {
    id: "el-cuyo",
    name: "El Cuyo",
    tags: ["beach", "quiet", "natureFirst", "exploratory", "remote"],
    teaser: {
      en: "A remote fishing village on the state's northern tip, drawing a small but growing wave of people who want unspoiled coast over convenience.",
      es: "Un remoto pueblo pesquero en la punta norte del estado, que atrae a una ola pequeña pero creciente de personas que prefieren una costa virgen antes que la conveniencia.",
    },
    guideLink: "/your-mexico/el-cuyo",
  },
  {
    id: "rio-lagartos",
    name: "Río Lagartos",
    tags: ["natureFirst", "remote", "exploratory", "frontier", "quiet"],
    teaser: {
      en: "A small fishing village on the edge of a vast flamingo-filled biosphere reserve — built around nature and little else.",
      es: "Un pequeño pueblo pesquero al borde de una vasta reserva de biosfera llena de flamencos — construido en torno a la naturaleza y poco más.",
    },
    guideLink: "/your-mexico/rio-lagartos",
  },
];
