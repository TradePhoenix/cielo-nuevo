// Your Mexico — per-city content that extends the decision engine's own
// CITY_PROFILES (src/decisionEngine/data/cityProfiles.js).
//
// Keyed by the same city ids as CITY_PROFILES so cityLookup.js can merge the
// two. Fields are added sprint by sprint, only as each section is actually
// built, rather than stubbed in ahead of time.
//
// heroImages carries each city's own dedicated regional photography (the
// CX-007 {desktop,mobile}{webp,jpg} shape) plus heroAlt EN/ES text — every
// one of the 11 destinations now has this (MEDIA-002 completed the last
// three: Playa del Carmen, Tulum, Riviera Maya, which previously shared
// hero.jpg/lifestyle.jpg/sanctuary.jpg as placeholders). Those three shared
// files are still used elsewhere (BlueprintIntro.js, HomePage.js's own
// hero section) and were intentionally left in place, not deleted.
//
// whyThisFeelsLikeYou.reasonsByTag is keyed by this city's own `tags` (see
// cityProfiles.js) — CityDetailPage picks whichever entries overlap with the
// visitor's actual Blueprint answers, so the section reads as personal
// rather than a fixed description. `intro` is the fallback for visitors who
// arrive without a completed Blueprint.
//
// tuesdayInYourLife is deliberately an ordinary weekday, not a highlight
// reel — three short, sensory beats, not a tourism itinerary.
//
// honestTruth pairs an intro with a short list of real trade-offs, written
// to build trust rather than list downsides for their own sake.

export const CITY_DETAILS = {
  "playa-del-carmen": {
    tagline: "Walkable streets, ocean air, and a life that still feels social.",
    heroImages: {
      desktop: {
        webp: "/regions/playa-del-carmen/playa-del-carmen-hero-desktop.webp",
        jpg: "/regions/playa-del-carmen/playa-del-carmen-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/playa-del-carmen/playa-del-carmen-hero-mobile.webp",
        jpg: "/regions/playa-del-carmen/playa-del-carmen-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Leafy Playa del Carmen street leading toward the Caribbean Sea at sunrise",
      es: "Calle arbolada de Playa del Carmen que conduce al mar Caribe al amanecer",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Playa del Carmen tends to fit people who want beach life without stepping away from convenience — walkable streets, fast internet, and a steady social scene.",
      reasonsByTag: {
        urban:
          "You wanted energy and walkability without giving up amenities — Playa's town center delivers exactly that mix.",
        beach:
          "Beach life matters to you, and here it isn't a weekend escape — it's just Tuesday.",
        remoteWork:
          "You're building a life around remote work, and Playa's café culture and fast internet were practically made for that.",
        comfortable:
          "You're looking for a comfortable, well-supported lifestyle, and Playa has more infrastructure for that than almost anywhere else on this coast.",
        premium:
          "You're not looking to rough it, and Playa's polish and amenities reflect that.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "You wake to the low hum of the ocean two blocks over and walk to the corner café before the heat sets in — the barista already knows your order. By 8:30 you're at your desk, laptop open, fan on, the day already warmer than any Tuesday back home.",
      },
      {
        time: "Afternoon",
        vignette:
          "Lunch is fish tacos from the stand you've started calling 'yours,' eaten standing up because sitting feels like wasting good sun. The afternoon slows the way it always does here — not lazy, just unhurried.",
      },
      {
        time: "Evening",
        vignette:
          "You close your laptop while it's still light out and walk to 5th Avenue, not for the tourists, just for the walk. Dinner is late, the air is warm, and nobody's rushing you out of your seat.",
      },
    ],

    honestTruth: {
      intro: "Playa isn't a secret — and that's part of the deal.",
      points: [
        "It's the most built-up, most touristy of your matches. If you wanted total escape, this isn't quite that.",
        "Fifth Avenue crowds can wear on you faster than you'd expect, especially your first few months.",
        "Cost of living has climbed — “affordable Mexico” isn't really Playa's pitch anymore.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Energetic but easy", detail: "Busier than your other matches, but nowhere near a big-city pace." },
      walkability: { value: "Highly walkable", detail: "5th Avenue and the surrounding grid mean many errands don't need a car." },
      internet: { value: "Fast and reliable", detail: "Fiber is common in newer buildings — a strong choice for remote work." },
      healthcare: { value: "Strong private care", detail: "Several private hospitals and English-speaking clinics in town." },
      airportAccess: { value: "45 min from Cancún Intl.", detail: "A straightforward highway drive, no connecting flights needed." },
      climate: { value: "Warm & humid year-round", detail: "Rainy season runs June–October; hurricanes are a real, if infrequent, risk." },
      community: { value: "Large, active expat scene", detail: "Easy to meet people fast — arguably the easiest of your three matches." },
    },

    monthlyBudget: {
      housing: "$900–$1,600",
      groceries: "$300–$450",
      dining: "$200–$450",
      transportation: "$60–$150",
      utilities: "$80–$150",
      internet: "$60–$120",
      estimatedTotal: "$1,600–$2,900",
      note: "Housing is the biggest lever here — a block from the beach costs meaningfully more than ten minutes inland.",
    },

    neighborhoods: [
      {
        name: "Playacar",
        description: "Gated, resort-adjacent, and built around a golf course — the most polished and secure of Playa's areas.",
        bestFor: "Retirees and families who want security and amenities more than nightlife.",
        tradeoff: "Highest cost of the three, and can feel a little insulated from everyday Playa.",
      },
      {
        name: "Centro (near 5th Ave)",
        description: "The walkable heart of town — restaurants, cafés, and a steady social scene at your doorstep.",
        bestFor: "Remote workers and solo movers who want energy and don't want to rely on a car.",
        tradeoff: "Noise and tourist crowds, especially the closer you are to the main avenue.",
      },
      {
        name: "Zazil-Ha / Colosio",
        description: "A more local, more affordable, more residential stretch north of the tourist core, still close to the beach.",
        bestFor: "Budget-conscious movers who want a genuine neighborhood feel.",
        tradeoff: "Fewer walkable amenities — expect to lean on taxis or a scooter more often.",
      },
    ],

    pros: [
      "Best infrastructure and amenities of your three matches",
      "Easiest place to make friends quickly",
      "Most walkable — many days don't require a car",
      "Strong healthcare access without a long drive",
    ],
    tradeoffs: [
      "Most tourist traffic and noise of the three",
      "Highest housing costs near the beach or 5th Avenue",
      "Less of a hidden-gem feeling than Tulum or Riviera Maya",
    ],
  },

  tulum: {
    tagline: "A slower rhythm on the water, built for people who want room to breathe.",
    heroImages: {
      desktop: {
        webp: "/regions/tulum/tulum-hero-desktop.webp",
        jpg: "/regions/tulum/tulum-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/tulum/tulum-hero-mobile.webp",
        jpg: "/regions/tulum/tulum-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Quiet Tulum residential street with limestone homes and tropical jungle at sunrise",
      es: "Tranquila calle residencial de Tulum con casas de piedra caliza y selva tropical al amanecer",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Tulum tends to fit people looking for a slower, more intentional pace on the water — less about doing everything, more about doing less, well.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Tulum's coastline is its entire identity, not an afterthought.",
        quiet:
          "You're craving a slower pace, and Tulum trades city noise for that on purpose.",
        premium:
          "You're not chasing the cheapest option — you want it done well, and Tulum's wellness-forward, higher-end feel reflects that.",
        exploratory:
          "You're still figuring out exactly what you want, and Tulum rewards that kind of open-ended exploring more than most places.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "You wake before your alarm because the light does that here. Coffee on the terrace, sand still on the floor from yesterday, and no real plan for the next hour — which used to bother you, and now doesn't.",
      },
      {
        time: "Afternoon",
        vignette:
          "The internet cuts out for twenty minutes around 1pm, and instead of panicking you just... wait. A bike ride into town for groceries takes the place of a lunch break.",
      },
      {
        time: "Evening",
        vignette:
          "Dinner is simple — something from the market, cooked slowly, eaten outside. The quiet isn't empty, it's just quiet, and by 9pm you're already thinking about sleep instead of scrolling.",
      },
    ],

    honestTruth: {
      intro: "Tulum's beauty is real. So is its learning curve.",
      points: [
        "The heat and humidity take real adjustment, especially your first summer.",
        "Infrastructure — roads, water, internet — can be inconsistent outside the main strip.",
        "It's not the budget option on this coast, and pretending otherwise sets you up to be surprised.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Slow and intentional", detail: "Plans shift often — punctuality is looser here than you might expect." },
      walkability: { value: "Walkable center, spread-out beach", detail: "The town is walkable; the beach road really wants a bike or car." },
      internet: { value: "Good in town, patchier at the beach", detail: "Fiber is expanding, but outages happen more than in Playa." },
      healthcare: { value: "Growing but limited", detail: "Basic clinics locally; anything serious means a drive to Playa or Cancún." },
      airportAccess: { value: "45–60 min from Cancún Intl.", detail: "A similar drive to Playa's, sometimes with more traffic through town." },
      climate: { value: "Warm & humid, breezier on the coast", detail: "Same rainy season as the rest of the Riviera Maya coastline." },
      community: { value: "Wellness-forward, transient", detail: "A strong community, but people cycle through faster than your other matches." },
    },

    monthlyBudget: {
      housing: "$1,100–$2,200",
      groceries: "$350–$500",
      dining: "$250–$550",
      transportation: "$70–$180",
      utilities: "$90–$170",
      internet: "$80–$150",
      estimatedTotal: "$1,900–$3,700",
      note: "Tulum's premium reputation is earned — imported goods and beach-adjacent housing both carry a real markup.",
    },

    neighborhoods: [
      {
        name: "Tulum Pueblo",
        description: "The actual town — everyday errands, local prices, and less polish than the beach road.",
        bestFor: "People who want real daily life here, not a resort experience.",
        tradeoff: "A drive or bike ride from the beach — this isn't the postcard version of Tulum.",
      },
      {
        name: "Aldea Zama",
        description: "Newer, gated, and more built-out, with a growing set of walkable amenities.",
        bestFor: "Families and professionals who want new construction and more security.",
        tradeoff: "Parts still feel like a construction zone, and it can feel disconnected from older Tulum.",
      },
      {
        name: "Zona Hotelera (Beach Road)",
        description: "The iconic strip of boutique hotels and beach clubs along the coast.",
        bestFor: "People who want beach access above everything else.",
        tradeoff: "The most expensive area, with some businesses scaling back in the off-season.",
      },
    ],

    pros: [
      "Most striking natural setting of your three matches",
      "Strong wellness and remote-work community",
      "A genuinely slower, more intentional daily pace",
      "Still growing, with new amenities arriving regularly",
    ],
    tradeoffs: [
      "Most expensive of your three matches",
      "Least consistent infrastructure — internet and roads included",
      "Farther from major hospitals than Playa del Carmen",
    ],
  },

  "riviera-maya": {
    tagline: "Quieter and more affordable than the postcards suggest — and closer to everyday life.",
    heroImages: {
      desktop: {
        webp: "/regions/riviera-maya/riviera-maya-hero-desktop.webp",
        jpg: "/regions/riviera-maya/riviera-maya-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/riviera-maya/riviera-maya-hero-mobile.webp",
        jpg: "/regions/riviera-maya/riviera-maya-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Caribbean coastline and coastal jungle across the Riviera Maya in morning light",
      es: "Costa caribeña y selva litoral de la Riviera Maya bajo la luz de la mañana",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Riviera Maya tends to fit people who want the coast without the crowd — quieter, more affordable, and closer to how people actually live day to day.",
      reasonsByTag: {
        quiet:
          "You want quiet over noise, and Riviera Maya sits back from the tourist center on purpose.",
        family:
          "You're thinking about this as a family, and Riviera Maya's slower, more residential feel was built with that in mind.",
        budgetConscious:
          "You're being realistic about budget, and Riviera Maya stretches further than the more built-up parts of this coast.",
        retirement:
          "You're thinking about this as your next long chapter, not a short stay, and Riviera Maya's pace fits that.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "Your street is mostly other families and retirees, and the morning starts slow — coffee, the dog, a walk before it gets hot. Nobody's in a hurry, including you.",
      },
      {
        time: "Afternoon",
        vignette:
          "You run errands in a town where the pharmacist knows your name by the third visit. Lunch is at home, at your own table, the way it used to be before your calendar got complicated.",
      },
      {
        time: "Evening",
        vignette:
          "The evening winds down early — dinner's unhurried, the street is dark by 7:30, and the loudest thing all night is the cicadas.",
      },
    ],

    honestTruth: {
      intro: "The quiet you're looking for here comes with real trade-offs too.",
      points: [
        "Fewer amenities close by — a bigger grocery run or a doctor's visit may mean a drive.",
        "Less nightlife, less buzz — if you're craving energy, this isn't where you'll find it.",
        "Being spread out over a bigger region means community can take a little longer to find.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Slow and residential", detail: "The most low-key pace of your three matches, by a clear margin." },
      walkability: { value: "Car-recommended", detail: "Towns here are smaller and more spread out; a car or scooter helps a lot." },
      internet: { value: "Reliable in town centers", detail: "Solid in established towns, weaker the further you get from them." },
      healthcare: { value: "Basic locally, Playa nearby", detail: "Good for routine care; bigger hospitals are a 20–40 minute drive." },
      airportAccess: { value: "30–60 min from Cancún Intl.", detail: "Varies a fair amount depending on which part of the region you're in." },
      climate: { value: "Warm & humid, slightly cooler inland", detail: "Same seasonal pattern as the rest of the coast." },
      community: { value: "Small, close-knit, mixed ages", detail: "Fewer people overall, but relationships tend to run deeper, faster." },
    },

    monthlyBudget: {
      housing: "$500–$1,000",
      groceries: "$220–$350",
      dining: "$100–$250",
      transportation: "$50–$120",
      utilities: "$60–$120",
      internet: "$40–$90",
      estimatedTotal: "$1,000–$1,900",
      note: "The most budget-flexible of your matches — the further you are from the main strip, the more this number drops.",
    },

    neighborhoods: [
      {
        name: "Akumal",
        description: "Laid-back and low-key, known for its turtles and snorkeling as much as its small expat community.",
        bestFor: "Retirees and nature-focused movers who want real, quiet distance from tourist crowds.",
        tradeoff: "Very few amenities on-site — a real grocery store or hospital means a meaningful drive.",
      },
      {
        name: "Puerto Aventuras",
        description: "A gated marina community built around a golf course and a private beach club.",
        bestFor: "Families who want structure, security, and other families nearby.",
        tradeoff: "Can feel insular, and HOA-style community costs run higher than elsewhere in the region.",
      },
      {
        name: "Puerto Morelos",
        description: "A small, still-developing fishing-town feel, closer to Playa's amenities than Akumal.",
        bestFor: "People who want genuine quiet without a long drive to a bigger town.",
        tradeoff: "Still growing — expect unpaved roads and patchier infrastructure in some pockets.",
      },
    ],

    pros: [
      "Most budget-flexible of your three matches",
      "Quietest, most residential pace of the three",
      "Best fit for families and multi-generational households",
      "Closest thing to everyday, unhurried life on this coast",
    ],
    tradeoffs: [
      "Fewest walkable amenities — a car matters most here",
      "Smallest, most spread-out community",
      "Furthest from major hospitals and nightlife",
    ],
  },

  // ---------------------------------------------------------------------
  // Mérida & the Yucatán Coast (DEST-001) — a distinct corridor from the
  // Caribbean coast above. One content note for whoever picks this up
  // next:
  //
  // 1. heroImages: CX-007 replaced the DEST-001 placeholder stock photos
  //    (shared Caribbean-coast hero.jpg/lifestyle.jpg/sanctuary.jpg) with
  //    dedicated regional photography for all four destinations, stored
  //    under public/regions/<city-id>/ per the CX-006 manifest's naming
  //    convention. These four cities use the richer `heroImages` shape
  //    (desktop + mobile crop, WebP + JPEG) instead of the single
  //    `heroImage` string the three Caribbean cities above still use —
  //    see CityHero.js/CityCard.js for how each shape is rendered.
  //
  // 2. monthlyBudget: these figures are directional estimates only,
  //    grounded in the well-established general reputation of Mérida and
  //    the Yucatán Gulf coast as more affordable than Quintana Roo's
  //    Caribbean coast (Playa/Tulum/Riviera Maya) — not sourced from any
  //    verified local data. They should be confirmed against real local
  //    listings before being treated as more than a starting estimate.
  //    The app's own WhatLifeCosts.js already labels every city's
  //    figures "Estimates only" — these four carry that caveat with less
  //    underlying confidence than the original three and should be the
  //    first ones re-verified.
  // ---------------------------------------------------------------------

  merida: {
    tagline: "Colonial architecture, healthcare, and city life — with the coast a short trip away, not the whole point.",
    heroImages: {
      desktop: {
        webp: "/regions/merida/merida-hero-desktop.webp",
        jpg: "/regions/merida/merida-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/merida/merida-hero-mobile.webp",
        jpg: "/regions/merida/merida-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "A quiet colonial street in Mérida with limestone façades and tropical greenery",
      es: "Una tranquila calle colonial de Mérida con fachadas de piedra caliza y vegetación tropical",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Mérida tends to fit people who want a real, year-round city — culture, healthcare, and an established community — with the beach close by as an option, not a requirement.",
      reasonsByTag: {
        urban:
          "You wanted city energy and amenities, and Mérida's restored colonial center, restaurants, and services deliver that without the coast's tourist crowds.",
        remoteWork:
          "You're building a life around remote work, and Mérida's coworking spaces and steadier infrastructure make that easier than the smaller coastal towns.",
        retirement:
          "You're thinking about this as your next long chapter, and Mérida's hospitals, safety reputation, and established international community fit that kind of long-term planning.",
        budgetConscious:
          "You're being realistic about budget, and Mérida has a genuine reputation for stretching further than Mexico's Caribbean coast.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "You walk to the corner panadería past pastel facades and wrought-iron windows, coffee in hand before the heat builds. The city is already awake, but unhurried — market carts, church bells, someone sweeping their stretch of sidewalk.",
      },
      {
        time: "Afternoon",
        vignette:
          "Lunch is the day's biggest meal, eaten slowly in a shaded courtyard restaurant, because Mérida still respects a real midday pause. Errands happen on foot or by short taxi ride — a pharmacy, a bank, a hardware store, all closer than you expected.",
      },
      {
        time: "Evening",
        vignette:
          "As it cools off, Paseo de Montejo fills with walkers, cyclists, and families out for the evening. Dinner is late, unrushed, and — some weekends — followed by the drive out to Progreso just to put your feet in the water.",
      },
    ],

    honestTruth: {
      intro: "Mérida's city life is real, and so is the trade-off that comes with it.",
      points: [
        "Being inland means less sea breeze — the dry-season heat here can feel more intense than on the coast.",
        "It's a real city, not a resort town — the pace and priorities are different from what Riviera Maya visitors often expect.",
        "You give up beachfront living day-to-day, even though the coast is genuinely close by.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Unhurried but urban", detail: "A real city's rhythm — busier than the coast, still far calmer than a major metropolis." },
      walkability: { value: "Walkable in Centro", detail: "The historic core and Paseo de Montejo area reward walking; outer neighborhoods lean more car-dependent." },
      internet: { value: "Solid, city-grade", detail: "As an established city, infrastructure is generally more consistent than the smaller coastal towns." },
      healthcare: { value: "Regional hub", detail: "Widely regarded as the Yucatán Peninsula's healthcare center, with hospitals and specialists coastal towns rely on." },
      airportAccess: { value: "Mérida International Airport is in the city", detail: "No coastal drive required — a genuine advantage over every other destination on this site." },
      climate: { value: "Hot, drier heat inland", detail: "Less sea breeze than the coast; the dry-season heat is worth experiencing before committing." },
      community: { value: "Established, international", detail: "A long-settled foreign community alongside Mérida's own rich cultural life — not a transient scene." },
    },

    monthlyBudget: {
      housing: "$400–$900",
      groceries: "$200–$350",
      dining: "$150–$350",
      transportation: "$40–$100",
      utilities: "$60–$140",
      internet: "$40–$90",
      estimatedTotal: "$700–$1,500",
      note: "Directional estimate, not verified local data — see this file's DEST-001 note above. Housing varies enormously between Centro and the outer neighborhoods.",
    },

    neighborhoods: [
      {
        name: "Centro Histórico",
        description: "The restored colonial core — cathedrals, markets, and mansions, walkable but busier and more tourist-facing.",
        bestFor: "People who want to be in the middle of the culture and architecture, on foot.",
        tradeoff: "Noise and tourist traffic near the main plazas; some streets are narrow and parking is scarce.",
      },
      {
        name: "Paseo de Montejo / Itzimná",
        description: "Leafy, residential, and still colonial in character, popular with longer-term foreign residents.",
        bestFor: "People who want Mérida's atmosphere with a quieter, more residential daily life.",
        tradeoff: "Less immediately walkable to everyday errands than Centro itself.",
      },
      {
        name: "North Mérida",
        description: "Newer developments, shopping centers, and more modern housing stock, further from the colonial core.",
        bestFor: "People who prioritize modern housing and convenience over historic character.",
        tradeoff: "Less of the architecture and atmosphere that draws most people to Mérida in the first place.",
      },
    ],

    pros: [
      "Strongest healthcare access of any destination on this site",
      "Real, year-round city life — not a seasonal tourist town",
      "Genuine reputation for affordability relative to the Caribbean coast",
      "The coast is a short trip away, not a separate commitment",
    ],
    tradeoffs: [
      "Inland — no daily beach access without a drive",
      "Hotter, more intense dry-season heat than the coast",
      "A city's pace and priorities, not a resort town's",
    ],
  },

  progreso: {
    tagline: "The Gulf Coast's most established beach town — accessible, social, and close to Mérida.",
    heroImages: {
      desktop: {
        webp: "/regions/progreso/progreso-hero-desktop.webp",
        jpg: "/regions/progreso/progreso-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/progreso/progreso-hero-mobile.webp",
        jpg: "/regions/progreso/progreso-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Progreso's Gulf waterfront, wide beach, and long pier in soft morning light",
      es: "La costa del Golfo en Progreso, su amplia playa y largo muelle bajo la suave luz de la mañana",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Progreso tends to fit people who want real, accessible coastal living — a social beach town that still keeps a real city's services close by.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Progreso's long malecón and open Gulf coastline are its everyday identity.",
        urban:
          "You wanted some energy and convenience, and Progreso's more active beach-town atmosphere delivers that on a smaller scale than a big city.",
        family:
          "You're thinking about this as a family, and Progreso's established, accessible character suits that better than a more remote coastal town.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The Gulf breeze is already moving through the house before you're fully awake. Coffee on the malecón, watching the fishing boats, before the day's heat sets in.",
      },
      {
        time: "Afternoon",
        vignette:
          "Lunch is fresh fish from a place a few blocks off the water, cheaper and better than anything with an ocean view. A short errand run covers most of what you need without leaving town.",
      },
      {
        time: "Evening",
        vignette:
          "Weekend evenings bring a real crowd down from Mérida, and the malecón fills up — but on an ordinary Tuesday, it's just you, the breeze, and a slower version of the same view.",
      },
    ],

    honestTruth: {
      intro: "Progreso's convenience is real, and so is its trade-off with the coast's smaller towns.",
      points: [
        "Weekends bring real crowds down from Mérida — this isn't a secluded escape.",
        "It's the most developed of the Gulf coast towns, which also means the least quiet of the four.",
        "Cost of living runs a bit higher here than in Chicxulub Puerto or Telchac Puerto.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Active, social beach town", detail: "Busier on weekends with visitors from Mérida, quieter on weekdays." },
      walkability: { value: "Walkable near the malecón", detail: "The waterfront area is walkable; residential streets further back favor a car or bike." },
      internet: { value: "Generally reliable", detail: "The most developed of the Gulf coast towns, with infrastructure to match." },
      healthcare: { value: "Basic locally, Mérida nearby", detail: "Local clinics for everyday needs; hospitals and specialists mean a trip to Mérida." },
      airportAccess: { value: "Comfortable drive from Mérida Airport", detail: "A single coastal highway connects Progreso directly to Mérida and its airport." },
      climate: { value: "Open Gulf breeze", detail: "A steadier sea breeze than the smaller towns further down the coast, with a real seasonal rhythm." },
      community: { value: "Established, growing foreign presence", detail: "The most developed foreign community of the three Gulf coast towns." },
    },

    monthlyBudget: {
      housing: "$350–$750",
      groceries: "$200–$320",
      dining: "$120–$280",
      transportation: "$40–$90",
      utilities: "$60–$130",
      internet: "$40–$80",
      estimatedTotal: "$600–$1,300",
      note: "Directional estimate, not verified local data — see this file's DEST-001 note above.",
    },

    neighborhoods: [
      {
        name: "The Malecón",
        description: "The waterfront strip itself — restaurants, beach clubs, and the town's social center.",
        bestFor: "People who want to be in the middle of Progreso's beach-town energy.",
        tradeoff: "The busiest, priciest part of town, especially on weekends.",
      },
      {
        name: "Residential Progreso",
        description: "The ordinary grid of streets a few blocks back from the water — quieter, more local, still an easy walk to the beach.",
        bestFor: "People who want the beach nearby without living in the middle of the weekend crowd.",
        tradeoff: "Less immediate beach-club access than a malecón-front property.",
      },
      {
        name: "Chelem / Yucalpetén (nearby)",
        description: "Smaller communities just west of Progreso, quieter still, with a marina and a more residential feel.",
        bestFor: "People who want Progreso's access with a step down in pace.",
        tradeoff: "Fewer amenities on-site — expect to rely on Progreso itself for most errands.",
      },
    ],

    pros: [
      "Most established and accessible of the Gulf coast towns",
      "Direct, straightforward connection to Mérida and its airport",
      "A genuine social, active beach-town atmosphere",
      "More foreign community and infrastructure than its quieter neighbors",
    ],
    tradeoffs: [
      "Busiest of the four Yucatán Coast destinations on weekends",
      "Higher cost of living than Chicxulub Puerto or Telchac Puerto",
      "Less seclusion than the smaller towns further down the coast",
    ],
  },

  "chicxulub-puerto": {
    tagline: "Quieter residential beach living next to Progreso, with easy access to Mérida.",
    heroImages: {
      desktop: {
        webp: "/regions/chicxulub-puerto/chicxulub-puerto-hero-desktop.webp",
        jpg: "/regions/chicxulub-puerto/chicxulub-puerto-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/chicxulub-puerto/chicxulub-puerto-hero-mobile.webp",
        jpg: "/regions/chicxulub-puerto/chicxulub-puerto-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "A peaceful residential lane beside the Gulf in Chicxulub Puerto",
      es: "Una tranquila calle residencial junto al Golfo en Chicxulub Puerto",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Chicxulub Puerto tends to fit people who want relaxed, residential coastal living — Progreso's access and Mérida's safety net, without Progreso's weekend crowds.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Chicxulub Puerto's coastline belongs to residents' ordinary mornings, not a tourist scene.",
        quiet:
          "You want quiet over noise, and this is a genuinely calmer, more residential stretch of the same coast Progreso sits on.",
        family:
          "You're thinking about this as a family, and Chicxulub Puerto's settled, low-key character suits everyday life more than a busier beach town.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The beach is quiet enough that a morning walk feels like it's yours alone, save for a few fishermen already out on the water. Nobody's in a hurry.",
      },
      {
        time: "Afternoon",
        vignette:
          "A short drive into Progreso covers groceries and anything else you need — close enough that it barely registers as a trip.",
      },
      {
        time: "Evening",
        vignette:
          "Dinner is simple, eaten with the windows open to the Gulf breeze. The loudest thing on the street is the surf.",
      },
    ],

    honestTruth: {
      intro: "The quiet here is genuine, and it comes with a genuinely smaller town.",
      points: [
        "Local services are limited — expect to rely on Progreso and Mérida for most of daily life.",
        "Internet infrastructure is less consistent than in Progreso or Mérida — test your specific address.",
        "It's quiet by design, not by accident — if you want a social scene, this isn't quite that.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Quiet and residential", detail: "A calmer, more everyday version of Gulf coast beach living than Progreso." },
      walkability: { value: "Small and walkable", detail: "The town itself is small enough to walk most places, though options are limited." },
      internet: { value: "More limited than Progreso", detail: "Worth testing your specific address before committing to remote work here." },
      healthcare: { value: "Relies on Progreso and Mérida", detail: "Minimal local services; everyday needs mean a short drive, serious care means Mérida." },
      airportAccess: { value: "Via Progreso to Mérida", detail: "The coastal road connects through Progreso onto the same highway into Mérida." },
      climate: { value: "Open Gulf breeze", detail: "The same coastal climate as Progreso, with a quieter, more residential shoreline." },
      community: { value: "Small and settled", detail: "A modest, long-term foreign presence rather than a growing scene." },
    },

    monthlyBudget: {
      housing: "$300–$650",
      groceries: "$180–$300",
      dining: "$100–$220",
      transportation: "$40–$90",
      utilities: "$55–$120",
      internet: "$35–$75",
      estimatedTotal: "$500–$1,100",
      note: "Directional estimate, not verified local data — see this file's DEST-001 note above.",
    },

    neighborhoods: [
      {
        name: "Coastal Chicxulub Puerto",
        description: "The residential streets closest to the beach — modest homes, a working fishing fleet, everyday life.",
        bestFor: "People who want to be steps from the water without Progreso's pace.",
        tradeoff: "Very few amenities on-site — plan around trips into Progreso.",
      },
      {
        name: "Inland Chicxulub Puerto",
        description: "A few streets back from the coast, slightly more affordable, still a short walk to the beach.",
        bestFor: "Budget-conscious movers who still want easy beach access.",
        tradeoff: "Marginally less of the direct coastal feel.",
      },
    ],

    pros: [
      "Genuinely quieter than Progreso, without losing access to it",
      "Residential, everyday beach living rather than a tourist scene",
      "Still close enough to Mérida for hospitals and city services",
    ],
    tradeoffs: [
      "Limited local services — real dependence on Progreso and Mérida",
      "Less consistent internet than the bigger towns nearby",
      "A small foreign community, not a large or fast-growing one",
    ],
  },

  "telchac-puerto": {
    tagline: "A smaller, more secluded Gulf Coast community for people who genuinely want privacy and space.",
    heroImages: {
      desktop: {
        webp: "/regions/telchac-puerto/telchac-puerto-hero-desktop.webp",
        jpg: "/regions/telchac-puerto/telchac-puerto-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/telchac-puerto/telchac-puerto-hero-mobile.webp",
        jpg: "/regions/telchac-puerto/telchac-puerto-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Small fishing boats resting on calm Gulf water at dawn in Telchac Puerto",
      es: "Pequeñas embarcaciones pesqueras sobre las tranquilas aguas del Golfo al amanecer en Telchac Puerto",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Telchac Puerto tends to fit people who want genuine seclusion and space — open coastline, few crowds, and real distance from urban bustle, not a marketing description of it.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Telchac Puerto's long, largely undeveloped shoreline is about as uncrowded as this coast gets.",
        quiet:
          "You're craving genuine quiet, and this is the most secluded of your Yucatán Coast options by a real margin.",
        exploratory:
          "You're still figuring out exactly what fits, and Telchac Puerto rewards people willing to slow down and find out rather than needing everything decided in advance.",
        budgetConscious:
          "You're being realistic about budget, and Telchac Puerto's smaller scale generally means a lower cost of living than its neighbors.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The beach in front of the house is empty except for you and the tide line. There's no rush, because there's genuinely nowhere to rush to.",
      },
      {
        time: "Afternoon",
        vignette:
          "Errands mean a real drive, so you've learned to plan them together rather than one at a time — a habit this place teaches everyone eventually.",
      },
      {
        time: "Evening",
        vignette:
          "The sky does something dramatic over the water most evenings, and there's rarely anyone else around to see it with you. Some people find that lonely. You don't, or you wouldn't be here.",
      },
    ],

    honestTruth: {
      intro: "Telchac Puerto's seclusion is genuine, and it's worth being honest about what that costs.",
      points: [
        "Local services are minimal — daily conveniences other towns take for granted require real planning here.",
        "It's the furthest of the four from Mérida's hospitals — a real consideration, not just a lifestyle preference.",
        "You may see this town marketed as 'exclusive' with promises about future property value — treat those claims skeptically; nobody can guarantee real estate outcomes, and isolation is the more honest word for what's actually being sold.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Slow and secluded", detail: "The quietest, most spacious of the four Yucatán Coast destinations by a clear margin." },
      walkability: { value: "Small, few amenities", detail: "Little to walk to locally — daily life here isn't built around errands on foot." },
      internet: { value: "Least developed of the four", detail: "Reliability varies by exact address — test thoroughly before relying on it for work." },
      healthcare: { value: "Distant — plan around it", detail: "Furthest of the four from Mérida; local services are minimal to none." },
      airportAccess: { value: "Furthest coastal drive to Mérida Airport", detail: "Still a manageable, direct drive along the same coastal highway, just the longest of the four." },
      climate: { value: "Open Gulf coastline", detail: "The same coastal climate as Progreso and Chicxulub Puerto, with even fewer buildings between you and it." },
      community: { value: "Small and low-key", detail: "The smallest foreign presence of the four — genuine solitude, not a curated small-town scene." },
    },

    monthlyBudget: {
      housing: "$250–$550",
      groceries: "$160–$280",
      dining: "$80–$180",
      transportation: "$40–$90",
      utilities: "$50–$110",
      internet: "$35–$75",
      estimatedTotal: "$450–$950",
      note: "Directional estimate, not verified local data — see this file's DEST-001 note above. Fewer local services also means fewer places to spend money day to day.",
    },

    neighborhoods: [
      {
        name: "Beachfront Telchac Puerto",
        description: "The quiet homes closest to the open coastline — the most direct version of this town's appeal.",
        bestFor: "People who came for the seclusion and want to live squarely inside it.",
        tradeoff: "The furthest from what little town center exists.",
      },
      {
        name: "Town Center",
        description: "The small cluster of streets with what local services Telchac Puerto has.",
        bestFor: "People who want to be as close as possible to whatever conveniences exist here.",
        tradeoff: "Still minimal by any other town's standard — this is a relative convenience, not a real one.",
      },
    ],

    pros: [
      "The most genuine seclusion and open space of any destination on this site",
      "Lower cost of living than the more developed Gulf coast towns",
      "Long, largely undeveloped beach and real quiet",
    ],
    tradeoffs: [
      "Minimal local services — real planning required for daily life",
      "Furthest of the four from Mérida's hospitals and city services",
      "Least developed internet infrastructure — verify before relying on it",
    ],
  },

  // ---------------------------------------------------------------------
  // Celestún, Sisal, Dzilam de Bravo & Santa Elena (DEST-002) — four more
  // Yucatán destinations, distinct from both the Caribbean coast and the
  // DEST-001 towns above. Three are smaller, more remote, more nature-first
  // Gulf coast communities than any DEST-001 town; Santa Elena is the
  // site's first genuinely inland, non-beach destination.
  //
  // heroImages: real regional photography from launch (public/regions/),
  // using the same {desktop,mobile}{webp,jpg} shape CX-007 established —
  // these four never carry a placeholder heroImage string.
  //
  // monthlyBudget: directional estimates only, grounded in these towns'
  // well-established general reputation (smaller/more remote than Progreso,
  // Chicxulub Puerto and Telchac Puerto) — not sourced from verified local
  // listings. Same caveat as the DEST-001 note above, carried forward with
  // the same "confirm before treating as more than a starting estimate"
  // limitation. Celestún, Sisal and Dzilam de Bravo's figures sit near or
  // below Telchac Puerto's (the smallest DEST-001 town); Santa Elena's are
  // estimated independently since it's inland, not on this coast at all.
  //
  // Wildlife (Celestún's flamingos, Dzilam de Bravo's mangrove birdlife) is
  // real but seasonal and never guaranteed — honestTruth sections below say
  // so explicitly, per DEST-002-BRIEF.md's guardrail.
  // ---------------------------------------------------------------------

  celestun: {
    tagline: "A mangrove-fringed fishing village built around nature, not tourism.",
    heroImages: {
      desktop: {
        webp: "/regions/celestun/celestun-hero-desktop.webp",
        jpg: "/regions/celestun/celestun-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/celestun/celestun-hero-mobile.webp",
        jpg: "/regions/celestun/celestun-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Flamingos feeding in the calm mangrove estuary at Celestún",
      es: "Flamencos alimentándose en el tranquilo estuario de manglares de Celestún",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Celestún tends to fit people who want their daily life built around nature first — a real fishing village on the edge of a biosphere reserve, not a beach town with wildlife as a side attraction.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Celestún's coastline sits right alongside the Ría Celestún estuary — quieter and wilder than a typical beach town.",
        quiet:
          "You want quiet over noise, and Celestún is built around a biosphere reserve, not a tourist strip — this is about as unhurried as the Gulf coast gets.",
        retirement:
          "You're thinking about this as your next long chapter, and Celestún's slow, nature-centered pace suits people who've stopped needing everything to be convenient.",
        budgetConscious:
          "You're being realistic about budget, and Celestún's small scale and modest infrastructure generally keep costs lower than the more developed Gulf towns.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The estuary is glassy and still before the wind picks up, and a walk along the water means passing fishing boats heading out for the day. Flamingos are a real possibility here in season — never a guarantee, and locals will tell you the same.",
      },
      {
        time: "Afternoon",
        vignette:
          "Lunch is fresh, simple, and usually whatever came off a boat that morning. Errands beyond the basics mean a drive — Celestún's own services are modest, and everyone here has made peace with that trade.",
      },
      {
        time: "Evening",
        vignette:
          "The light over the mangroves turns everything gold for a few minutes most evenings, and there's rarely a crowd to share it with. The quiet isn't a marketing line — it's just what the town actually is.",
      },
    ],

    honestTruth: {
      intro: "Celestún's nature is genuinely special, and its trade-offs are genuinely real.",
      points: [
        "Urban services and healthcare are limited locally — plan around trips to Mérida for anything beyond the basics.",
        "It's a real drive from Mérida, not a quick errand — factor that into daily life, not just moving day.",
        "Flamingos and other wildlife are seasonal and never guaranteed — don't move here expecting a daily sighting.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Slow and nature-centered", detail: "Life here follows the estuary and the fishing fleet more than a clock." },
      walkability: { value: "Small and walkable", detail: "The village core is compact; most everyday needs are a short walk." },
      internet: { value: "Basic, developing", detail: "Coverage exists but is less consistent than Mérida or Progreso — test your specific address." },
      healthcare: { value: "Minimal locally", detail: "Basic care only; anything serious means a drive to Mérida." },
      airportAccess: { value: "Drive to Mérida International", detail: "A genuine drive along the coast and inland — not a short hop." },
      climate: { value: "Coastal Gulf breeze", detail: "Estuary and mangrove humidity alongside the usual Yucatán coast heat pattern." },
      community: { value: "Small and close-knit", detail: "A modest, long-settled fishing community rather than a growing expat scene." },
    },

    monthlyBudget: {
      housing: "$250–$550",
      groceries: "$160–$280",
      dining: "$80–$180",
      transportation: "$40–$90",
      utilities: "$50–$110",
      internet: "$35–$75",
      estimatedTotal: "$450–$950",
      note: "Directional estimate, not verified local data — see this file's DEST-002 note above.",
    },

    neighborhoods: [
      {
        name: "Coastal Celestún",
        description: "The streets closest to the estuary and beach — fishing boats, modest homes, the town's real daily life.",
        bestFor: "People who came for the nature and the water and want to live inside both.",
        tradeoff: "The furthest from what little town center exists.",
      },
      {
        name: "Town Center",
        description: "The small cluster of streets with Celestún's shops, market, and church.",
        bestFor: "People who want to be as close as possible to local services, modest as they are.",
        tradeoff: "Still minimal by any larger town's standard.",
      },
    ],

    pros: [
      "A real biosphere reserve at your doorstep, not a manufactured nature experience",
      "Genuine quiet and a slower pace than any DEST-001 Gulf town",
      "Lower cost of living than the more developed coastal towns",
    ],
    tradeoffs: [
      "Limited urban services and healthcare — real planning required",
      "A genuine drive from Mérida, not a quick trip",
      "Wildlife sightings are seasonal and never guaranteed",
    ],
  },

  sisal: {
    tagline: "A historic Gulf port and Pueblo Mágico, quiet without being remote.",
    heroImages: {
      desktop: {
        webp: "/regions/sisal/sisal-hero-desktop.webp",
        jpg: "/regions/sisal/sisal-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/sisal/sisal-hero-mobile.webp",
        jpg: "/regions/sisal/sisal-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Sisal's quiet Gulf beach and historic pier in soft morning light",
      es: "La tranquila playa del Golfo y el histórico muelle de Sisal bajo la suave luz de la mañana",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Sisal tends to fit people who want a quiet coastal village with real history and real infrastructure — not the deepest seclusion on this coast, but a genuinely peaceful place that still feels connected to Mérida.",
      reasonsByTag: {
        beach:
          "Beach life matters to you, and Sisal's calm Gulf beach and historic pier are the heart of daily life here.",
        quiet:
          "You want quiet over noise, and Sisal — a small Pueblo Mágico, not a resort town — delivers that without feeling cut off.",
        comfortable:
          "You're looking for a comfortable, well-supported lifestyle, and Sisal's Pueblo Mágico status has brought real investment in its streets, pier, and services relative to its smaller neighbors.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The old pier catches the first light before anyone's really out, and a walk to the end of it is most people's version of a morning coffee ritual. The town wakes up slowly, not all at once.",
      },
      {
        time: "Afternoon",
        vignette:
          "Lunch is something simple near the water, and an afternoon errand run covers most of what Sisal itself offers — anything bigger means the drive to Mérida, close enough to not feel like a project.",
      },
      {
        time: "Evening",
        vignette:
          "The restored streets near the pier light up gently after dark, and the pace stays unhurried — Sisal was never built to be loud, and its Pueblo Mágico recognition hasn't changed that.",
      },
    ],

    honestTruth: {
      intro: "Sisal's history and quiet are real, and so are the limits of a small town.",
      points: [
        "Services, employment, and healthcare are meaningfully more limited here than in Mérida — plan around that, not against it.",
        "This is a quiet historic port, not the Riviera Maya — don't come expecting resort-scale amenities or nightlife.",
        "Transport planning matters — Sisal rewards people who've already made peace with needing a car.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Quiet and unhurried", detail: "A genuinely calm coastal pace, helped rather than disrupted by its Pueblo Mágico status." },
      walkability: { value: "Small and walkable", detail: "The village center and pier are an easy walk; outer streets favor a car or bike." },
      internet: { value: "Developing, more consistent than the smallest towns", detail: "Benefiting from Pueblo Mágico investment, but still worth testing your specific address." },
      healthcare: { value: "Basic locally, Mérida nearby", detail: "Local clinics for everyday needs; anything serious means a trip to Mérida." },
      airportAccess: { value: "Manageable drive to Mérida International", detail: "A single road connects Sisal to Mérida and its airport." },
      climate: { value: "Open Gulf breeze", detail: "The same coastal climate pattern as the rest of the Yucatán Gulf coast." },
      community: { value: "Small and settled", detail: "A modest local community, with growing outside interest since its 2020 Pueblo Mágico designation." },
    },

    monthlyBudget: {
      housing: "$300–$650",
      groceries: "$180–$300",
      dining: "$100–$220",
      transportation: "$40–$90",
      utilities: "$55–$120",
      internet: "$35–$80",
      estimatedTotal: "$500–$1,100",
      note: "Directional estimate, not verified local data — see this file's DEST-002 note above.",
    },

    neighborhoods: [
      {
        name: "Around The Pier",
        description: "The restored heart of Sisal — the historic pier, the malecón, and the streets that see the most local life.",
        bestFor: "People who want to be in the middle of Sisal's history and its daily rhythm.",
        tradeoff: "The most visited part of a still genuinely small town.",
      },
      {
        name: "Village Center",
        description: "The residential streets a few blocks back from the water — quieter, more local, an easy walk to the pier.",
        bestFor: "People who want Sisal's pace without being in its busiest few blocks.",
        tradeoff: "Fewer amenities directly on-site than right at the waterfront.",
      },
    ],

    pros: [
      "Real Pueblo Mágico investment in streets, pier, and public spaces",
      "Quiet coastal living without feeling as remote as the smaller Gulf towns",
      "A manageable, direct connection to Mérida",
    ],
    tradeoffs: [
      "Services, employment, and healthcare remain meaningfully limited compared with Mérida",
      "Not a resort town — no Riviera Maya-style amenities or nightlife",
      "Transport planning matters — daily life mostly assumes a car",
    ],
  },

  "dzilam-de-bravo": {
    tagline: "A working fishing port on a vast mangrove reserve — remote, independent, and real.",
    heroImages: {
      desktop: {
        webp: "/regions/dzilam-de-bravo/dzilam-de-bravo-hero-desktop.webp",
        jpg: "/regions/dzilam-de-bravo/dzilam-de-bravo-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/dzilam-de-bravo/dzilam-de-bravo-hero-mobile.webp",
        jpg: "/regions/dzilam-de-bravo/dzilam-de-bravo-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "Working fishing boats beside mangroves in Dzilam de Bravo",
      es: "Embarcaciones pesqueras junto a los manglares de Dzilam de Bravo",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Dzilam de Bravo tends to fit people who want the most remote, most self-sufficient version of Gulf coast life on this site — a genuine working fishing port, not a destination built for visitors.",
      reasonsByTag: {
        exploratory:
          "You're still figuring out exactly what fits, and Dzilam de Bravo rewards people willing to explore a place that isn't packaged for tourism at all.",
        family:
          "You're thinking about this as a family, and Dzilam de Bravo's tight-knit, unhurried community can suit a family that values simplicity over amenities.",
        budgetConscious:
          "You're being realistic about budget, and Dzilam de Bravo's modest scale and working-town character generally keep costs low.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The working fleet heads out early, and the mangrove-lined water past the edge of town stays still until the boats stir it. This is a fishing port first — everything else fits around that rhythm.",
      },
      {
        time: "Afternoon",
        vignette:
          "Errands mean a real drive, and most residents have learned to batch them rather than make separate trips. What Dzilam de Bravo has locally is genuine, if modest — what it doesn't have means planning ahead.",
      },
      {
        time: "Evening",
        vignette:
          "The estuary and the open Gulf beyond it turn quiet and still, and the loudest thing most nights is the wind through the mangroves. There's no boardwalk scene here, and nobody who lives here is looking for one.",
      },
    ],

    honestTruth: {
      intro: "Dzilam de Bravo's remoteness and independence are genuine, and so is what that costs day to day.",
      points: [
        "Car dependence is real — daily life here assumes you're driving, with limited exceptions.",
        "Services and healthcare are very limited locally — this is one of the most remote destinations on this site.",
        "It's a working fishing town, not a luxury marina — don't come expecting polished tourism infrastructure.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Remote and self-directed", detail: "Among the most independent, least tourism-oriented paces of any destination on this site." },
      walkability: { value: "Small, car-recommended", detail: "The town itself is walkable, but reaching anything beyond it means driving." },
      internet: { value: "Limited, least developed of the four DEST-002 towns", detail: "Reliability varies significantly by address — test thoroughly before relying on it." },
      healthcare: { value: "Very limited locally", detail: "Minimal local services; anything beyond the basics means a real trip to Mérida." },
      airportAccess: { value: "Longer drive to Mérida International", detail: "Manageable but genuinely further than the more established Gulf towns." },
      climate: { value: "Open Gulf coastline and mangrove estuary", detail: "The same coastal heat pattern, with more humidity near the mangroves." },
      community: { value: "Small, working, self-sufficient", detail: "A real fishing community rather than a curated small-town scene." },
    },

    monthlyBudget: {
      housing: "$250–$550",
      groceries: "$160–$280",
      dining: "$80–$180",
      transportation: "$45–$100",
      utilities: "$50–$110",
      internet: "$35–$75",
      estimatedTotal: "$450–$950",
      note: "Directional estimate, not verified local data — see this file's DEST-002 note above.",
    },

    neighborhoods: [
      {
        name: "Along The Waterfront",
        description: "The streets closest to the working port and estuary — modest homes, the fishing fleet, the town's real center of gravity.",
        bestFor: "People who want to live inside the town's actual working identity.",
        tradeoff: "Very few amenities on-site — plan around trips elsewhere for most needs.",
      },
      {
        name: "Inland Dzilam de Bravo",
        description: "A few streets back from the water, slightly more affordable, still a short distance from the port.",
        bestFor: "Budget-conscious movers who still want to be close to town.",
        tradeoff: "Marginally less of the direct waterfront feel.",
      },
    ],

    pros: [
      "The most remote, most independent Gulf coast destination on this site",
      "A genuine working fishing community, not a tourism construction",
      "Low cost of living relative to the more developed Gulf towns",
    ],
    tradeoffs: [
      "Real car dependence — daily life assumes you're driving",
      "Very limited local services and healthcare",
      "Not a polished tourism destination — infrastructure is genuinely modest",
    ],
  },

  "santa-elena": {
    tagline: "An inland Puuc-region village built around living Maya and Yucatecan culture.",
    heroImages: {
      desktop: {
        webp: "/regions/santa-elena/santa-elena-hero-desktop.webp",
        jpg: "/regions/santa-elena/santa-elena-hero-desktop.jpg",
      },
      mobile: {
        webp: "/regions/santa-elena/santa-elena-hero-mobile.webp",
        jpg: "/regions/santa-elena/santa-elena-hero-mobile.jpg",
      },
    },
    heroAlt: {
      en: "A quiet village street and traditional Yucatecan home in Santa Elena",
      es: "Una tranquila calle de pueblo y una casa tradicional yucateca en Santa Elena",
    },

    whyThisFeelsLikeYou: {
      intro:
        "Santa Elena tends to fit people who want inland, rural, living Maya and Yucatecan culture — not a beach, not a resort, and not a museum piece, but an actual community in the Puuc region's cultural landscape.",
      reasonsByTag: {
        quiet:
          "You want quiet over noise, and Santa Elena's rural, inland pace is about as calm and low-nightlife as this site's destinations get.",
        exploratory:
          "You're still figuring out exactly what fits, and Santa Elena rewards people genuinely curious about Maya and Yucatecan culture, not just a resort with a cultural theme.",
        family:
          "You're thinking about this as a family, and Santa Elena's small, community-centered village life offers a different, more rooted kind of daily rhythm.",
      },
    },

    tuesdayInYourLife: [
      {
        time: "Morning",
        vignette:
          "The village is quiet and inland — no ocean, no sea breeze, just low Yucatecan homes, gardens, and the sound of the town waking up slowly under a still-cool sky.",
      },
      {
        time: "Afternoon",
        vignette:
          "The heat builds the way it does across inland Yucatán, and the day slows with it — errands and outdoor tasks happen early or late, not through the middle of the day.",
      },
      {
        time: "Evening",
        vignette:
          "The village settles early, and the loudest thing most nights is genuinely just the neighborhood. This is rural, community-centered life, not a curated cultural experience — and that's the actual appeal.",
      },
    ],

    honestTruth: {
      intro: "Santa Elena's culture and calm are genuine, and so is its fundamentally rural reality.",
      points: [
        "Healthcare and services are limited locally — plan around trips to Mérida for anything beyond the basics.",
        "Inland heat is real and can feel more intense than the coast's — worth experiencing before committing.",
        "This is a rural, transport-dependent lifestyle, not a curated cultural attraction — daily life here is genuinely ordinary, not staged for visitors.",
      ],
    },

    lifestyleSnapshot: {
      pace: { value: "Rural and unhurried", detail: "A genuinely slow, community-centered pace — among the lowest-nightlife destinations on this site." },
      walkability: { value: "Small and walkable", detail: "The village itself is compact and easy to walk; anything beyond it means a drive." },
      internet: { value: "Basic, developing", detail: "Coverage exists but is inconsistent — test your specific address before relying on it." },
      healthcare: { value: "Minimal locally, Mérida for anything serious", detail: "Basic local care only; the Puuc region relies on Mérida as its healthcare hub." },
      airportAccess: { value: "Drive to Mérida International", detail: "A genuine inland drive along Highway 261 — not a coastal route." },
      climate: { value: "Hot, dry inland heat", detail: "No sea breeze here — the dry-season heat is more intense than on the coast." },
      community: { value: "Small, rooted, Maya and Yucatecan", detail: "A living local community with deep cultural continuity, not a foreign enclave." },
    },

    monthlyBudget: {
      housing: "$250–$500",
      groceries: "$150–$260",
      dining: "$70–$160",
      transportation: "$45–$100",
      utilities: "$50–$100",
      internet: "$35–$75",
      estimatedTotal: "$400–$900",
      note: "Directional estimate, not verified local data — see this file's DEST-002 note above.",
    },

    neighborhoods: [
      {
        name: "Village Center",
        description: "The streets around Santa Elena's church and main square — the most walkable, most community-facing part of town.",
        bestFor: "People who want to be inside the village's actual daily life.",
        tradeoff: "Very few amenities beyond what a small rural village genuinely offers.",
      },
      {
        name: "Outskirts Toward The Puuc Route",
        description: "The quieter edges of town, closer to the highway that connects Santa Elena to Uxmal, Kabáh, and the rest of the Puuc region — real archaeological sites nearby, not inside the village itself.",
        bestFor: "People who want a little more space and don't mind a short drive to the village center.",
        tradeoff: "Less immediate access to what local services exist.",
      },
    ],

    pros: [
      "Genuine, living Maya and Yucatecan culture, not a staged version of it",
      "The lowest-nightlife, most rural pace of any destination on this site",
      "Real proximity to the Puuc region's cultural landscape without being inside a tourist zone",
    ],
    tradeoffs: [
      "Minimal local healthcare and services — real planning required",
      "Inland dry-season heat, without any coastal relief",
      "A genuinely rural, transport-dependent lifestyle — not for anyone expecting beach or resort amenities",
    ],
  },
};
