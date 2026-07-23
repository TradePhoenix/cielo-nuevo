// Your Mexico — per-city content that extends the decision engine's own
// CITY_PROFILES (src/decisionEngine/data/cityProfiles.js).
//
// Keyed by the same city ids as CITY_PROFILES so cityLookup.js can merge the
// two. Fields are added sprint by sprint, only as each section is actually
// built, rather than stubbed in ahead of time.
//
// heroImage assigns each city one of the project's existing coastal photos
// by visual fit (Playa's built-up beach town, Tulum's jungle-to-beach path,
// Riviera Maya's quieter jungle/resort feel) — real per-city photography is
// a pure data swap later.
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
    heroImage: "/hero.jpg",

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
    heroImage: "/lifestyle.jpg",

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
    heroImage: "/sanctuary.jpg",

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
  // Caribbean coast above. Two content notes for whoever picks this up
  // next:
  //
  // 1. heroImage: none of the three existing stock photos (hero.jpg =
  //    aerial Caribbean coastline, lifestyle.jpg = jungle-to-beach path,
  //    sanctuary.jpg = covered terrace/pool) is a genuine match for
  //    inland, colonial Mérida — there is no colonial-architecture asset
  //    in this project yet. sanctuary.jpg was chosen for Mérida as the
  //    least-wrong option (the most "architectural/interior" of the
  //    three) rather than using a beach photo for an inland city, which
  //    would misrepresent the destination. Treat this as a placeholder
  //    pending real Mérida photography, not a finished choice. The three
  //    Gulf coast towns reuse hero.jpg/lifestyle.jpg — genuinely
  //    coastal, so the mismatch risk is lower, but they're still shared
  //    with existing Caribbean-coast cities rather than unique images.
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
    heroImage: "/sanctuary.jpg",

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
    heroImage: "/hero.jpg",

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
    heroImage: "/lifestyle.jpg",

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
    heroImage: "/hero.jpg",

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
};
