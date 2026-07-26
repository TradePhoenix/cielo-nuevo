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
    tagline: { en: "Walkable streets, ocean air, and a life that still feels social.", es: "Calles para caminar, aire de mar y una vida que sigue sintiéndose social." },
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
      safety: { value: "Generally calm, standard precautions", detail: "Like anywhere, use normal travel-safety practices and verify current conditions before moving — this is not a documented crime statistic." },
      transportation: { value: "Walkable, car optional", detail: "Many residents get by on foot, bike, or taxi day-to-day; a car mainly helps for trips outside town." },
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

    realEstate: {
      overview: "A mix of condos, gated developments, and older standalone homes, with both long-term rentals and foreign-owned property well established here — this is the most mature real estate market of any destination on this site.",
      considerations: [
        "Foreign buyers near the coast typically purchase through a bank trust (fideicomiso), not direct deed — confirm current rules with a Mexican notary before assuming otherwise.",
        "Rental demand is strong and consistent, which also means more competition and less room to negotiate than in quieter towns.",
      ],
    },
    investmentOutlook: {
      intro: "Playa del Carmen is the most built-out destination on this site, which brings real infrastructure but also real development pressure and rising costs.",
      considerations: [
        "Continued construction and tourism growth have pushed housing costs up steadily — this is not a hidden or undiscovered market.",
        "Long-term suitability here depends more on whether you want an established, amenity-rich town than on any prediction about future value.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 5, note: "The most developed infrastructure of any destination this site covers." },
        healthcare: { score: 5, note: "Multiple private hospitals and English-speaking clinics in town." },
        community: { score: 5, note: "The largest, most active expat community on this coast." },
        livability: { score: 4, note: "Costs have risen with popularity, but services and stability remain strong." },
        readiness: { score: 5, note: "The most newcomer-ready destination on this site — orientation is easy here." },
      },
    },
    faq: [
      {
        question: "Is Playa del Carmen safe to live in?",
        answer: "It's one of the more established, tourism-oriented towns on this coast. Like anywhere, use normal precautions and check current conditions before moving — this page isn't a substitute for your own research.",
      },
      {
        question: "Do I need to speak Spanish to live here?",
        answer: "No — English is widely used in the tourist-facing parts of town, but learning Spanish will meaningfully deepen your daily life and relationships here, and is genuinely worth doing.",
      },
      {
        question: "Is Playa del Carmen good for remote work?",
        answer: "Yes — it has the most reliable internet and café/coworking culture of any destination on this site.",
      },
      {
        question: "How far is the international airport?",
        answer: "About 45 minutes by highway from Cancún International Airport, with no connecting flights needed.",
      },
    ],
  },

  tulum: {
    tagline: { en: "A slower rhythm on the water, built for people who want room to breathe.", es: "Un ritmo más lento junto al agua, pensado para quienes necesitan espacio para respirar." },
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
      safety: { value: "Generally calm, standard precautions", detail: "Similar to the rest of this coast — use normal travel-safety practices and verify current conditions locally." },
      transportation: { value: "Bike or car recommended", detail: "The town center is walkable, but the beach road is long enough that most people use a bike, scooter, or car." },
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

    realEstate: {
      overview: "A fast-growing mix of boutique condos, jungle-lot homes, and beach-road commercial property — Tulum has seen the most rapid construction of any destination on this site over the past decade.",
      considerations: [
        "Ejido (communal) land status affects parts of the Tulum area — confirm a property's actual title status with a Mexican notary before assuming standard private ownership applies.",
        "Rapid growth has outpaced some infrastructure — verify water, power, and road access for any specific property rather than assuming it matches the town's polished image.",
      ],
    },
    investmentOutlook: {
      intro: "Tulum's growth has been the fastest and most visible on this coast, which cuts both ways: real opportunity alongside real development-pressure and infrastructure strain.",
      considerations: [
        "Continued construction has raised both costs and questions about water, waste, and road capacity — worth researching directly rather than assuming it's kept pace.",
        "This is not a hidden or early-stage market anymore — treat it as an established, competitive one, not a speculative discovery.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: "Improving, but growth has outpaced roads, water, and power in parts of town." },
        healthcare: { score: 3, note: "Basic clinics locally; anything serious means a drive to Playa or Cancún." },
        community: { score: 4, note: "A strong, visible wellness/remote-work community, though it cycles through quickly." },
        livability: { score: 3, note: "The most expensive of your matches, with costs still climbing." },
        readiness: { score: 4, note: "Well set up for newcomers, but infrastructure gaps require more self-sufficiency than Playa." },
      },
    },
    faq: [
      {
        question: "Is Tulum safe to live in?",
        answer: "Broadly similar to the rest of this coast — use normal travel-safety practices and confirm current conditions before moving; this isn't a substitute for your own research.",
      },
      {
        question: "Is Tulum good for remote work?",
        answer: "Generally yes, though internet can be patchier at the beach than in town — test your specific address before committing.",
      },
      {
        question: "Is Tulum walkable?",
        answer: "The town center is walkable; the beach road is long enough that most people use a bike, scooter, or car to get around.",
      },
      {
        question: "How far is the international airport?",
        answer: "About 45–60 minutes from Cancún International Airport, similar to the drive from Playa del Carmen.",
      },
    ],
  },

  "riviera-maya": {
    tagline: { en: "Quieter and more affordable than the postcards suggest — and closer to everyday life.", es: "Más tranquilo y más asequible de lo que sugieren las postales — y más cerca de la vida cotidiana." },
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
      safety: { value: "Generally calm, standard precautions", detail: "A quieter, more residential feel than Playa or Tulum — still, use normal travel-safety practices." },
      transportation: { value: "Car recommended", detail: "Towns here are smaller and more spread out; a car or scooter makes daily life noticeably easier." },
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

    realEstate: {
      overview: "A wider spread of standalone homes and smaller developments across several towns, generally at a lower cost than Playa or Tulum — availability and quality vary noticeably from one town to the next within the region.",
      considerations: [
        "As with the rest of Quintana Roo's coast, foreign ownership near the shoreline typically works through a bank trust (fideicomiso) — confirm current rules before assuming otherwise.",
        "Because this covers several distinct towns, always verify the specific area's own infrastructure and services rather than assuming the region's reputation applies evenly everywhere.",
      ],
    },
    investmentOutlook: {
      intro: "Riviera Maya's appeal is its slower growth relative to Playa and Tulum — a genuine trade-off between lower costs today and less certainty about future infrastructure.",
      considerations: [
        "Growth here has been steadier and less visible than its neighbors, which can mean real value but also less predictable long-term services.",
        "Suitability depends heavily on which specific town within the region you're evaluating — treat this as a starting point, not a single verdict.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: "Solid in established towns, weaker the further you get from them." },
        healthcare: { score: 3, note: "Good for routine care locally; anything serious means a drive to Playa." },
        community: { score: 3, note: "Smaller and more spread out, though relationships tend to run deeper." },
        livability: { score: 4, note: "The most budget-flexible of the Caribbean-coast destinations on this site." },
        readiness: { score: 3, note: "Less turn-key than Playa — expect to lean more on your own research and a car." },
      },
    },
    faq: [
      {
        question: "Is Riviera Maya safe to live in?",
        answer: "Generally a quieter, more residential feel than Playa or Tulum. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "Do I need a car here?",
        answer: "Recommended — towns in this region are smaller and more spread out than Playa or Tulum, and a car makes daily errands much easier.",
      },
      {
        question: "Is Riviera Maya good for families?",
        answer: "Yes — its slower, more residential character is one of its clearest advantages for families and multi-generational households.",
      },
      {
        question: "How far is the international airport?",
        answer: "Roughly 30–60 minutes from Cancún International Airport, depending on which part of the region you're in.",
      },
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
    tagline: { en: "Colonial architecture, healthcare, and city life — with the coast a short trip away, not the whole point.", es: "Arquitectura colonial, salud y vida de ciudad — con la costa a poca distancia, no como el objetivo principal." },
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
      safety: { value: "Widely regarded as calm", detail: "Mérida has a strong general safety reputation regionally — still, use normal precautions and verify current conditions before moving." },
      transportation: { value: "Walkable center, car helps elsewhere", detail: "Centro and Paseo de Montejo reward walking; outer neighborhoods are easier with a car." },
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

    realEstate: {
      overview: "The Peninsula's deepest and most liquid real estate market — restored colonial homes in Centro, leafy houses along Paseo de Montejo, and modern developments in the north, with both a large rental market and an established foreign-buyer presence.",
      considerations: [
        "Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply here the way it does at the beach — confirm current rules for your specific property with a Mexican notary regardless.",
        "Restored colonial homes can carry real renovation costs and permitting requirements — verify a property's actual condition and permit history before assuming a listing photo tells the whole story.",
      ],
    },
    investmentOutlook: {
      intro: "Mérida's growth has been steady and well-documented for over a decade — this is an established, well-understood city, not an emerging or speculative one.",
      considerations: [
        "Popularity with foreign buyers has raised prices in the most sought-after Centro and Paseo de Montejo streets specifically, more than the city as a whole.",
        "Long-term suitability here is driven by its status as the Peninsula's real healthcare and infrastructure hub, not by any prediction about price growth.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 5, note: "The most consistent, city-grade infrastructure of any destination on this site." },
        healthcare: { score: 5, note: "The Yucatán Peninsula's healthcare hub — hospitals and specialists other towns rely on." },
        community: { score: 5, note: "A long-settled, established foreign community alongside Mérida's own rich cultural life." },
        livability: { score: 4, note: "Genuine affordability relative to the coast, though popular Centro streets have gotten pricier." },
        readiness: { score: 5, note: "The most turn-key, newcomer-ready city on this site outside the coast itself." },
      },
    },
    faq: [
      {
        question: "Is Mérida safe to live in?",
        answer: "Mérida has a strong general safety reputation regionally. As anywhere, use normal precautions and verify current conditions before moving.",
      },
      {
        question: "Do I need to speak Spanish in Mérida?",
        answer: "Not strictly, but it's less English-forward day-to-day than the coast's tourist towns — learning Spanish will meaningfully improve daily life here.",
      },
      {
        question: "Is Mérida good for retirees?",
        answer: "Yes — its healthcare access, established community, and year-round city life are exactly why it's a common retirement choice.",
      },
      {
        question: "How far is the beach from Mérida?",
        answer: "Progreso, the closest Gulf-coast beach town, is roughly a 30–40 minute drive.",
      },
    ],
  },

  progreso: {
    tagline: { en: "The Gulf Coast's most established beach town — accessible, social, and close to Mérida.", es: "El pueblo de playa más consolidado de la Costa del Golfo — accesible, social y cerca de Mérida." },
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
      safety: { value: "Generally calm, standard precautions", detail: "A relaxed beach town — still, use normal travel-safety practices as you would anywhere." },
      transportation: { value: "Walkable near the malecón, car helps elsewhere", detail: "The waterfront is walkable; residential streets further back and trips to Mérida are easier with a car." },
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

    realEstate: {
      overview: "Mostly standalone homes and low-rise construction along and near the malecón, with a real, established rental and resale market — the most active real estate scene of any Gulf coast town on this site.",
      considerations: [
        "As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "Malecón-front properties carry a real premium over streets set back just a block or two — location within town matters more here than the town's overall reputation.",
      ],
    },
    investmentOutlook: {
      intro: "Progreso is the most established Gulf coast town, with steady weekend demand from Mérida rather than the rapid speculative growth seen on the Caribbean coast.",
      considerations: [
        "Growth here has been gradual and driven by real regional demand (Mérida residents' weekend homes), not a tourism boom — a different, generally steadier pattern.",
        "Long-term suitability depends more on wanting an accessible, social beach town than on any prediction about price appreciation.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 4, note: "The most developed of the Gulf coast towns, with infrastructure to match." },
        healthcare: { score: 3, note: "Local clinics for everyday needs; hospitals and specialists mean a trip to Mérida." },
        community: { score: 4, note: "The most developed foreign community among the Gulf coast towns." },
        livability: { score: 4, note: "Higher costs than its quieter neighbors, but still well below the Caribbean coast." },
        readiness: { score: 4, note: "A direct highway to Mérida and its airport makes this an easy town to settle into." },
      },
    },
    faq: [
      {
        question: "Is Progreso safe to live in?",
        answer: "A relaxed beach town overall. As anywhere, use normal travel-safety practices and check current conditions before moving.",
      },
      {
        question: "Is Progreso busy or quiet?",
        answer: "Busier on weekends, when residents from Mérida visit; noticeably quieter on weekdays.",
      },
      {
        question: "Do I need a car in Progreso?",
        answer: "The waterfront area is walkable; a car helps for residential streets further back and for trips to Mérida.",
      },
      {
        question: "How far is Progreso from Mérida?",
        answer: "A direct coastal highway connects the two — typically a 30–40 minute drive, including to Mérida's international airport.",
      },
    ],
  },

  "chicxulub-puerto": {
    tagline: { en: "Quieter residential beach living next to Progreso, with easy access to Mérida.", es: "Vida de playa residencial y tranquila junto a Progreso, con fácil acceso a Mérida." },
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
      safety: { value: "Quiet, standard precautions", detail: "A small residential town — use normal travel-safety practices as you would anywhere." },
      transportation: { value: "Car recommended", detail: "The town itself is walkable, but daily life leans on a car for Progreso and Mérida trips." },
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

    realEstate: {
      overview: "Mostly modest standalone homes, with a smaller and less liquid market than Progreso — expect fewer listings and less competition, but also less choice.",
      considerations: [
        "As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "With fewer local services, verify water and internet reliability for a specific property directly rather than assuming Progreso's infrastructure extends here.",
      ],
    },
    investmentOutlook: {
      intro: "Chicxulub Puerto's appeal is quiet, residential living next to Progreso's services — not a growth story of its own.",
      considerations: [
        "Development pressure here is modest and largely follows Progreso's own growth rather than happening independently.",
        "Suitability depends on wanting Progreso's access without its weekend crowds, not on any prediction about future value.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: "More limited than Progreso — worth testing your specific address before relying on it." },
        healthcare: { score: 2, note: "Minimal local services; everyday needs mean a short drive, serious care means Mérida." },
        community: { score: 3, note: "A modest, long-term foreign presence rather than a growing scene." },
        livability: { score: 4, note: "Genuinely quieter than Progreso, with a lower cost of living to match." },
        readiness: { score: 3, note: "Close enough to Progreso and Mérida to lean on both for what this town doesn't have." },
      },
    },
    faq: [
      {
        question: "Is Chicxulub Puerto safe to live in?",
        answer: "A quiet, residential town. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "How far is Chicxulub Puerto from Progreso?",
        answer: "A short drive — close enough that most residents treat it as their local town for groceries and errands.",
      },
      {
        question: "Is the internet reliable here?",
        answer: "Less consistent than Progreso or Mérida — test your specific address before relying on it for remote work.",
      },
      {
        question: "How far is the international airport?",
        answer: "Via Progreso onto the same coastal highway into Mérida — a comfortable, direct drive.",
      },
    ],
  },

  "telchac-puerto": {
    tagline: { en: "A smaller, more secluded Gulf Coast community for people who genuinely want privacy and space.", es: "Una comunidad más pequeña y apartada en la Costa del Golfo, para quienes realmente buscan privacidad y espacio." },
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
      safety: { value: "Quiet, standard precautions", detail: "A secluded, low-traffic town — use normal travel-safety practices as anywhere." },
      transportation: { value: "Car essential", detail: "Little is walkable locally; daily life here genuinely assumes a car." },
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

    realEstate: {
      overview: "A small, thin real estate market of mostly standalone beach homes — fewer listings, less negotiation leverage from competition, and genuinely limited local services to support a sale or renovation.",
      considerations: [
        "As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "This site's own honestTruth section above already flags marketing claims about future property value here — treat any such claim skeptically and verify independently.",
      ],
    },
    investmentOutlook: {
      intro: "Telchac Puerto's identity is seclusion and open space, not growth — treat any marketing framing it as an emerging or high-return opportunity with real skepticism.",
      considerations: [
        "Limited services and the furthest healthcare access of the four Gulf towns are real, current constraints, not temporary gaps waiting to close.",
        "Suitability depends entirely on genuinely wanting seclusion and space — this is not a starter step toward a more developed future.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: "The least developed internet and services of the four Gulf coast towns." },
        healthcare: { score: 2, note: "Furthest of the four from Mérida; local services are minimal to none." },
        community: { score: 2, note: "The smallest foreign presence of the four — genuine solitude, not a curated scene." },
        livability: { score: 3, note: "Lower cost of living, but real planning is required for daily conveniences." },
        readiness: { score: 2, note: "The most self-sufficiency-demanding of the four Gulf coast towns." },
      },
    },
    faq: [
      {
        question: "Is Telchac Puerto safe to live in?",
        answer: "A quiet, low-traffic town. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "Do I need a car in Telchac Puerto?",
        answer: "Yes — very little is walkable locally, and daily life here genuinely assumes a car.",
      },
      {
        question: "Is the internet reliable here?",
        answer: "The least developed of the four Gulf coast towns on this site — test thoroughly before relying on it for remote work.",
      },
      {
        question: "How far is healthcare?",
        answer: "This is the furthest of the four Gulf coast towns from Mérida's hospitals — a real, practical consideration, not just a lifestyle preference.",
      },
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
    tagline: { en: "A mangrove-fringed fishing village built around nature, not tourism.", es: "Un pueblo pesquero bordeado de manglares, construido en torno a la naturaleza, no al turismo." },
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
      safety: { value: "Quiet, standard precautions", detail: "A small fishing village — use normal travel-safety practices as anywhere." },
      transportation: { value: "Car recommended", detail: "The village core is walkable; anything beyond it means a drive." },
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

    realEstate: {
      overview: "A very small market of mostly modest homes near the estuary — limited listings, limited local infrastructure to support a purchase, and no significant new construction.",
      considerations: [
        "As a coastal/estuary property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "Biosphere reserve proximity can carry its own building and land-use restrictions — verify what's actually permitted before assuming standard rules apply.",
      ],
    },
    investmentOutlook: {
      intro: "Celestún's identity is its biosphere reserve, not development — any framing of this town as a growth opportunity should be treated with real skepticism.",
      considerations: [
        "Reserve status limits the kind of development that can happen here, which supports long-term ecological stability rather than speculative growth.",
        "Suitability depends on genuinely wanting a nature-first, low-services life, not on any prediction about future property value.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: "Basic and developing — test your specific address before relying on it." },
        healthcare: { score: 2, note: "Basic care only locally; anything serious means a drive to Mérida." },
        community: { score: 2, note: "A modest, long-settled fishing community rather than a growing expat scene." },
        livability: { score: 3, note: "Lower cost of living, offset by limited local services." },
        readiness: { score: 2, note: "One of the more self-sufficiency-demanding destinations on this site." },
      },
    },
    faq: [
      {
        question: "Is Celestún safe to live in?",
        answer: "A quiet fishing village. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "Will I see flamingos if I live in Celestún?",
        answer: "Flamingos are a real seasonal possibility in the estuary, never a guarantee — don't move here expecting a daily sighting.",
      },
      {
        question: "How far is Celestún from Mérida?",
        answer: "A genuine drive, not a quick errand — factor that into daily life, not just moving day.",
      },
      {
        question: "Is Celestún good for remote work?",
        answer: "Internet coverage exists but is less consistent than Mérida or Progreso — test your specific address before relying on it.",
      },
    ],
  },

  sisal: {
    tagline: { en: "A historic Gulf port and Pueblo Mágico, quiet without being remote.", es: "Un histórico puerto del Golfo y Pueblo Mágico, tranquilo sin ser remoto." },
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
      safety: { value: "Quiet, standard precautions", detail: "A calm Pueblo Mágico town — use normal travel-safety practices as anywhere." },
      transportation: { value: "Walkable center, car helps elsewhere", detail: "The village center and pier are an easy walk; a car helps for Mérida trips." },
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

    realEstate: {
      overview: "A small but genuine market of historic and newer homes, benefiting from real Pueblo Mágico-era investment in the town's streets and pier — more active than the smaller Gulf towns, still far smaller than Progreso's.",
      considerations: [
        "As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "Historic-center properties may carry preservation or permitting requirements tied to Sisal's Pueblo Mágico status — verify before planning any renovation.",
      ],
    },
    investmentOutlook: {
      intro: "Sisal's 2020 Pueblo Mágico designation has brought real, visible investment — genuine growth, but on a small town's scale, not a boom.",
      considerations: [
        "Growth here has been steady and infrastructure-focused (streets, pier, public spaces), a different pattern than the Caribbean coast's rapid tourism-driven construction.",
        "Suitability depends on wanting a quiet historic town with real but modest services, not a fast-growing market.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: "Benefiting from Pueblo Mágico investment, though still worth testing your specific address." },
        healthcare: { score: 2, note: "Local clinics for everyday needs; anything serious means a trip to Mérida." },
        community: { score: 3, note: "A modest local community, with growing outside interest since 2020." },
        livability: { score: 4, note: "Real infrastructure investment relative to its smaller neighbors, at a still-modest cost of living." },
        readiness: { score: 3, note: "More turn-key than the smallest Gulf towns, thanks to its Pueblo Mágico-era investment." },
      },
    },
    faq: [
      {
        question: "Is Sisal safe to live in?",
        answer: "A calm, historic Pueblo Mágico town. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "What does Pueblo Mágico status mean for Sisal?",
        answer: "It's a Mexican government recognition that has brought real investment in Sisal's streets, pier, and public spaces since 2020 — not a resort designation.",
      },
      {
        question: "Do I need a car in Sisal?",
        answer: "The village center and pier are walkable; a car helps for trips to Mérida and anything beyond the town itself.",
      },
      {
        question: "How far is Sisal from Mérida?",
        answer: "A single, manageable road connects Sisal directly to Mérida and its international airport.",
      },
    ],
  },

  "dzilam-de-bravo": {
    tagline: { en: "A working fishing port on a vast mangrove reserve — remote, independent, and real.", es: "Un puerto pesquero activo junto a una vasta reserva de manglares — remoto, independiente y auténtico." },
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
      safety: { value: "Quiet, standard precautions", detail: "A small working fishing town — use normal travel-safety practices as anywhere." },
      transportation: { value: "Car essential", detail: "The town itself is walkable, but reaching anything beyond it means driving." },
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

    realEstate: {
      overview: "A very small, thin market of modest homes near the working port — minimal turnover, minimal local infrastructure to support a purchase or renovation.",
      considerations: [
        "As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.",
        "Mangrove reserve proximity can carry its own land-use restrictions — verify what's actually permitted before assuming standard rules apply.",
      ],
    },
    investmentOutlook: {
      intro: "Dzilam de Bravo is a working fishing town, not a growth market — any framing of it as an emerging opportunity should be treated with real skepticism.",
      considerations: [
        "This town's remoteness and modest services are current, structural realities, not gaps waiting to close.",
        "Suitability depends on genuinely wanting the most independent, self-sufficient version of Gulf coast life on this site.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: "The least developed internet and services among this site's Gulf coast destinations." },
        healthcare: { score: 1, note: "Minimal local services; anything beyond the basics means a real trip to Mérida." },
        community: { score: 2, note: "A real fishing community rather than a curated small-town scene." },
        livability: { score: 3, note: "Low cost of living, offset by real car dependence and limited services." },
        readiness: { score: 1, note: "The most self-sufficiency-demanding destination among this site's Gulf coast towns." },
      },
    },
    faq: [
      {
        question: "Is Dzilam de Bravo safe to live in?",
        answer: "A small working fishing town. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "Do I need a car in Dzilam de Bravo?",
        answer: "Yes — daily life here genuinely assumes you're driving, with limited exceptions inside the town itself.",
      },
      {
        question: "Is Dzilam de Bravo good for remote work?",
        answer: "Internet is the least developed of this site's Gulf coast towns — test your specific address thoroughly before relying on it.",
      },
      {
        question: "How far is healthcare?",
        answer: "Local services are very limited — anything beyond the basics means a real trip to Mérida.",
      },
    ],
  },

  "santa-elena": {
    tagline: { en: "An inland Puuc-region village built around living Maya and Yucatecan culture.", es: "Un pueblo del interior en la región Puuc, construido en torno a la cultura maya y yucateca viva." },
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
      safety: { value: "Quiet, standard precautions", detail: "A small rural village — use normal travel-safety practices as anywhere." },
      transportation: { value: "Car essential", detail: "The village itself is compact and walkable, but anything beyond it means a drive." },
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

    realEstate: {
      overview: "A very small market of traditional Yucatecan homes — minimal turnover, minimal local infrastructure to support a purchase, and no significant new construction.",
      considerations: [
        "Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply — confirm current rules for your specific property with a Mexican notary regardless.",
        "Traditional construction methods and materials are common here — a structural inspection from a qualified professional is worth the cost before any purchase.",
      ],
    },
    investmentOutlook: {
      intro: "Santa Elena's identity is rural, living Maya and Yucatecan culture — not a growth market, and any framing of it as a discovery opportunity should be treated skeptically.",
      considerations: [
        "This village's rural character and limited services are structural, not temporary — they're the actual product, not a gap waiting to close.",
        "Suitability depends on genuinely wanting inland, community-centered village life, not on any prediction about future value.",
      ],
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: "Coverage exists but is inconsistent — test your specific address before relying on it." },
        healthcare: { score: 1, note: "Minimal local care only; the Puuc region relies on Mérida as its healthcare hub." },
        community: { score: 3, note: "A living local community with deep cultural continuity, not a foreign enclave." },
        livability: { score: 3, note: "Among the lowest costs of living on this site, with correspondingly modest services." },
        readiness: { score: 1, note: "The most self-sufficiency-demanding, least newcomer-oriented destination on this site." },
      },
    },
    faq: [
      {
        question: "Is Santa Elena safe to live in?",
        answer: "A small rural village. As anywhere, use normal travel-safety practices and confirm current conditions before moving.",
      },
      {
        question: "Do I need to speak Spanish in Santa Elena?",
        answer: "Yes, meaningfully more than on the coast — this is a living Maya and Yucatecan community, not an English-forward tourist town.",
      },
      {
        question: "Is Santa Elena good for remote work?",
        answer: "Internet coverage exists but is inconsistent — test your specific address thoroughly before relying on it.",
      },
      {
        question: "How far is Santa Elena from healthcare?",
        answer: "Basic local care only — anything beyond that means a drive to Mérida, the Puuc region's healthcare hub.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // DEST-003 — 14 new destinations completing the 25-destination Yucatán
  // Peninsula library. Every entry below carries a `content: { en, es }`
  // wrapper around its deep-content sections — see CityDetailPage.js's
  // resolveActiveContent() for how this coexists with the 11 destinations
  // above (which keep their fields flat/English-only, unchanged). `tagline`
  // and `heroAlt` stay plain top-level strings, matching the original 11,
  // since Atlas cards/Blueprint/Compare/SEO consume those directly and are
  // out of scope for this ticket's bilingual requirement.
  //
  // No dedicated photography exists yet for any of these 14 — none carry a
  // `heroImages` or `heroImage` field, so CityHero.js/CityCard.js fall
  // through to DestinationImageFallback.js automatically (see that
  // component and DEST-003-PHOTOGRAPHY-ASSET-MANIFEST.md for what's needed
  // to replace this once real regional photography is produced).
  //
  // monthlyBudget/realEstate figures below are directional estimates only,
  // grounded in each town's well-established general reputation — not
  // sourced from verified local listings, exactly the same caveat already
  // carried by DEST-001/DEST-002's entries above.
  // ---------------------------------------------------------------------

  "puerto-morelos": {
    heroImage: "/regions/puerto-morelos/puerto-morelos-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A protected-reef fishing town between Cancún and Playa del Carmen — smaller, calmer, and deliberately less built-up than its neighbors.", es: "Un pueblo pesquero de arrecife protegido entre Cancún y Playa del Carmen — más pequeño, más tranquilo y deliberadamente menos construido que sus vecinos." },
    heroAlt: {
      en: "A quiet fishing pier and leaning lighthouse in Puerto Morelos at sunrise",
      es: "Un tranquilo muelle pesquero y el faro inclinado de Puerto Morelos al amanecer",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Puerto Morelos tends to fit people who want Caribbean coast access without Playa or Cancún's scale — a small, protected-reef town with real height restrictions that have kept it low-rise on purpose.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Puerto Morelos's protected reef sits just offshore, close enough to see from the plaza.",
            quiet: "You want quiet over noise, and building-height limits here have kept the town genuinely small-scale, not just marketed that way.",
            family: "You're thinking about this as a family, and Puerto Morelos's slower, more residential character suits that better than a busier tourist strip.",
            comfortable: "You want real amenities without a big-city feel, and Puerto Morelos sits close enough to Cancún's airport and hospitals to have both.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The plaza is quiet enough to hear the ferry horn from the reef tour boats, and coffee at a plaza-side table is most people's actual morning routine here." },
          { time: "Afternoon", vignette: "Lunch is fresh ceviche a block from the water, and errands mean walking the town's small grid rather than driving anywhere." },
          { time: "Evening", vignette: "The leaning lighthouse catches the last light, and dinner is unhurried — this is a small town's rhythm, twenty minutes from Cancún's airport." },
        ],
        honestTruth: {
          intro: "Puerto Morelos's small scale is real, and so is what it doesn't have.",
          points: [
            "It's genuinely smaller than Playa del Carmen — fewer restaurants, fewer services, less nightlife by design.",
            "Reef access is real, but snorkeling/diving conditions vary with weather and season — never a guarantee.",
            "Its proximity to Cancún's airport is a real advantage, but also means more highway traffic passing nearby than a fully secluded town.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Small and unhurried", detail: "Height restrictions have kept this town genuinely low-rise and slow-paced, not just marketed that way." },
          walkability: { value: "Highly walkable", detail: "The town center is compact enough to cover most daily needs on foot." },
          internet: { value: "Generally reliable", detail: "Benefits from proximity to Cancún's infrastructure corridor." },
          healthcare: { value: "Basic locally, Cancún nearby", detail: "Local clinics for routine care; Cancún's hospitals are a short drive." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, residential-feeling town — use normal travel-safety practices as anywhere." },
          transportation: { value: "Walkable, car optional", detail: "The town itself is walkable; a car helps for trips to Cancún or Playa." },
          airportAccess: { value: "20–30 min from Cancún Intl.", detail: "Among the closest destinations on this site to the region's main airport." },
          climate: { value: "Warm & humid year-round", detail: "Same Caribbean coast rainy season as its neighbors, June–October." },
          community: { value: "Small, mixed local and foreign", detail: "A smaller, more settled community than Playa or Cancún, without Tulum's transience." },
        },
        monthlyBudget: {
          housing: "$700–$1,400", groceries: "$280–$420", dining: "$180–$400", transportation: "$50–$130", utilities: "$70–$140", internet: "$50–$110",
          estimatedTotal: "$1,300–$2,500",
          note: "Directional estimate, not verified local data — grounded in Puerto Morelos's position between Cancún and Playa del Carmen, generally below Playa's costs.",
        },
        neighborhoods: [
          { name: "El Centro", description: "The compact plaza-centered core — the lighthouse, the reef-tour docks, and most of the town's restaurants.", bestFor: "People who want to walk to nearly everything.", tradeoff: "The busiest few blocks of an otherwise quiet town." },
          { name: "Colonia Josefa Ortiz", description: "Residential streets a few blocks inland, more local, more affordable.", bestFor: "Budget-conscious movers who still want a short walk to the plaza.", tradeoff: "Fewer amenities directly on-site." },
        ],
        pros: ["Genuinely small-scale, height-restricted town, not just marketed that way", "Close to Cancún's airport and hospitals without feeling like a city", "A real protected reef just offshore"],
        tradeoffs: ["Fewer restaurants and services than Playa del Carmen", "Reef conditions vary with weather and season", "More highway traffic nearby than a fully secluded town"],
        realEstate: {
          overview: "A smaller market of low-rise condos and standalone homes, shaped by the town's own height restrictions — less inventory than Playa del Carmen, generally at a lower price point.",
          considerations: ["Coastal property here typically requires a bank trust (fideicomiso) for foreign buyers — confirm current rules with a Mexican notary.", "Height and density restrictions are part of what keeps this town's character intact — verify what's actually permitted before assuming otherwise."],
        },
        investmentOutlook: {
          intro: "Puerto Morelos's height restrictions have deliberately limited the kind of rapid growth seen in Playa or Tulum — a slower, more contained pattern.",
          considerations: ["Growth here has been steadier and smaller-scale than its neighbors, by policy rather than accident.", "Suitability depends on wanting a small, protected-reef town specifically, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Puerto Morelos safe to live in?", answer: "A small, residential-feeling town. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "How far is Puerto Morelos from Cancún airport?", answer: "About 20–30 minutes — among the closest destinations on this site to the region's main airport." },
          { question: "Is Puerto Morelos good for snorkeling or diving?", answer: "Yes, via its protected reef just offshore, though conditions vary with weather and season — never a guarantee." },
          { question: "Is Puerto Morelos walkable?", answer: "Yes — the town center is compact enough to cover most daily needs on foot." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Puerto Morelos suele encajar con personas que quieren acceso a la costa caribeña sin la escala de Playa o Cancún — un pueblo pequeño de arrecife protegido, con límites de altura reales que lo han mantenido bajo a propósito.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y el arrecife protegido de Puerto Morelos está justo frente a la costa, lo suficientemente cerca como para verse desde la plaza.",
            quiet: "Quieres tranquilidad sobre el ruido, y los límites de altura aquí han mantenido al pueblo genuinamente a pequeña escala, no solo de manera comercial.",
            family: "Estás pensando en esto como familia, y el carácter más lento y residencial de Puerto Morelos se adapta mejor que una franja turística más activa.",
            comfortable: "Quieres comodidades reales sin sentir una gran ciudad, y Puerto Morelos está lo bastante cerca del aeropuerto y los hospitales de Cancún para tener ambos.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "La plaza está lo bastante tranquila para escuchar la bocina del ferry de los tours al arrecife, y el café en una mesa junto a la plaza es la rutina matutina real de la mayoría aquí." },
          { time: "Tarde", vignette: "El almuerzo es ceviche fresco a una cuadra del agua, y los mandados significan caminar la pequeña cuadrícula del pueblo en lugar de manejar a algún lado." },
          { time: "Noche", vignette: "El faro inclinado captura la última luz, y la cena es tranquila — este es el ritmo de un pueblo pequeño, a veinte minutos del aeropuerto de Cancún." },
        ],
        honestTruth: {
          intro: "La escala pequeña de Puerto Morelos es real, y también lo es lo que no tiene.",
          points: [
            "Es genuinamente más pequeño que Playa del Carmen — menos restaurantes, menos servicios, menos vida nocturna por diseño.",
            "El acceso al arrecife es real, pero las condiciones para bucear o esnorquelear varían con el clima y la temporada — nunca es garantía.",
            "Su cercanía al aeropuerto de Cancún es una ventaja real, pero también significa más tráfico de carretera cerca que un pueblo totalmente apartado.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Pequeño y tranquilo", detail: "Los límites de altura han mantenido este pueblo genuinamente bajo y de ritmo lento, no solo de manera comercial." },
          walkability: { value: "Muy caminable", detail: "El centro del pueblo es lo bastante compacto para cubrir la mayoría de las necesidades diarias a pie." },
          internet: { value: "Generalmente confiable", detail: "Se beneficia de la cercanía al corredor de infraestructura de Cancún." },
          healthcare: { value: "Básico localmente, Cancún cerca", detail: "Clínicas locales para atención de rutina; los hospitales de Cancún están a poca distancia." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo pequeño de ambiente residencial — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Caminable, auto opcional", detail: "El pueblo en sí es caminable; un auto ayuda para viajes a Cancún o Playa." },
          airportAccess: { value: "20–30 min del aeropuerto de Cancún", detail: "Uno de los destinos más cercanos de este sitio al aeropuerto principal de la región." },
          climate: { value: "Cálido y húmedo todo el año", detail: "La misma temporada de lluvias de la costa caribeña que sus vecinos, de junio a octubre." },
          community: { value: "Pequeña, mixta local y extranjera", detail: "Una comunidad más pequeña y asentada que Playa o Cancún, sin la transitoriedad de Tulum." },
        },
        monthlyBudget: {
          housing: "$700–$1,400", groceries: "$280–$420", dining: "$180–$400", transportation: "$50–$130", utilities: "$70–$140", internet: "$50–$110",
          estimatedTotal: "$1,300–$2,500",
          note: "Estimación direccional, no son datos locales verificados — basada en la posición de Puerto Morelos entre Cancún y Playa del Carmen, generalmente por debajo de los costos de Playa.",
        },
        neighborhoods: [
          { name: "El Centro", description: "El núcleo compacto alrededor de la plaza — el faro, los muelles de tours al arrecife y la mayoría de los restaurantes del pueblo.", bestFor: "Personas que quieren caminar a casi todo.", tradeoff: "Las cuadras más concurridas de un pueblo por lo demás tranquilo." },
          { name: "Colonia Josefa Ortiz", description: "Calles residenciales a unas cuadras tierra adentro, más locales, más accesibles.", bestFor: "Personas con presupuesto limitado que aún quieren una caminata corta a la plaza.", tradeoff: "Menos comodidades directamente en el lugar." },
        ],
        pros: ["Pueblo genuinamente a pequeña escala y de altura limitada, no solo de manera comercial", "Cerca del aeropuerto y los hospitales de Cancún sin sentir una ciudad", "Un arrecife protegido real justo frente a la costa"],
        tradeoffs: ["Menos restaurantes y servicios que Playa del Carmen", "Las condiciones del arrecife varían con el clima y la temporada", "Más tráfico de carretera cerca que un pueblo totalmente apartado"],
        realEstate: {
          overview: "Un mercado más pequeño de condominios bajos y casas independientes, moldeado por los propios límites de altura del pueblo — menos inventario que Playa del Carmen, generalmente a un precio menor.",
          considerations: ["La propiedad costera aquí típicamente requiere un fideicomiso bancario para compradores extranjeros — confirma las reglas actuales con un notario mexicano.", "Los límites de altura y densidad son parte de lo que mantiene intacto el carácter de este pueblo — verifica qué está realmente permitido antes de asumir lo contrario."],
        },
        investmentOutlook: {
          intro: "Los límites de altura de Puerto Morelos han limitado deliberadamente el tipo de crecimiento rápido visto en Playa o Tulum — un patrón más lento y contenido.",
          considerations: ["El crecimiento aquí ha sido más constante y a menor escala que sus vecinos, por política, no por accidente.", "La idoneidad depende de querer específicamente un pueblo pequeño de arrecife protegido, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Puerto Morelos?", answer: "Un pueblo pequeño de ambiente residencial. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Qué tan lejos está Puerto Morelos del aeropuerto de Cancún?", answer: "Entre 20 y 30 minutos — uno de los destinos más cercanos de este sitio al aeropuerto principal de la región." },
          { question: "¿Es bueno Puerto Morelos para bucear o esnorquelear?", answer: "Sí, gracias a su arrecife protegido frente a la costa, aunque las condiciones varían con el clima y la temporada — nunca es garantía." },
          { question: "¿Es caminable Puerto Morelos?", answer: "Sí — el centro del pueblo es lo bastante compacto para cubrir la mayoría de las necesidades diarias a pie." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 4, note: { en: "Benefits from proximity to Cancún's infrastructure corridor.", es: "Se beneficia de la cercanía al corredor de infraestructura de Cancún." } },
        healthcare: { score: 3, note: { en: "Basic clinics locally; Cancún's hospitals are a short drive.", es: "Clínicas básicas localmente; los hospitales de Cancún están a poca distancia." } },
        community: { score: 3, note: { en: "Smaller and more settled than Playa or Cancún, without Tulum's transience.", es: "Más pequeña y asentada que Playa o Cancún, sin la transitoriedad de Tulum." } },
        livability: { score: 4, note: { en: "Below Playa del Carmen's costs, with genuine small-town scale.", es: "Por debajo de los costos de Playa del Carmen, con una escala de pueblo pequeño genuina." } },
        readiness: { score: 4, note: { en: "Close enough to Cancún's services to be easy to settle into.", es: "Lo bastante cerca de los servicios de Cancún para ser fácil de establecerse." } },
      },
    },
  },

  cozumel: {
    heroImage: "/regions/cozumel/cozumel-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "An island apart — literally — with a slower island rhythm, world-class diving, and a real year-round community distinct from the mainland coast.", es: "Una isla aparte — literalmente — con un ritmo isleño más lento, buceo de talla mundial y una comunidad real todo el año, distinta de la costa continental." },
    heroAlt: {
      en: "A quiet waterfront street on Cozumel island facing the Caribbean Sea",
      es: "Una tranquila calle frente al mar en la isla de Cozumel, mirando al Caribe",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Cozumel tends to fit people who want island life specifically — a genuine separation from the mainland, world-class diving, and a settled, year-round community rather than a mainland beach town's constant flow of new arrivals.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Cozumel's island coastline and reef system are its entire identity.",
            quiet: "You want quiet over noise, and the island's residential side, away from the cruise-ship pier, moves at a genuinely slower pace.",
            retirement: "You're thinking about this as your next long chapter, and Cozumel's settled, long-term foreign community fits that kind of planning.",
            premium: "You want it done well, and Cozumel's diving infrastructure and healthcare are more developed than a typical small island.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The dive boats leave the marina early, and if you're not on one, the malecón is nearly empty for a walk before the day's cruise-ship crowd arrives downtown." },
          { time: "Afternoon", vignette: "Lunch is away from the pier, where prices and pace both reflect the island's real, resident side rather than its tourist one." },
          { time: "Evening", vignette: "The cruise ships leave by late afternoon, and the town genuinely changes character — this is when Cozumel feels like an island people actually live on, not visit." },
        ],
        honestTruth: {
          intro: "Cozumel's island appeal is real, and so is the reality of being surrounded by water.",
          points: [
            "Everything arrives by ferry or plane — goods can cost more and take longer than on the mainland.",
            "Cruise-ship days bring real crowds downtown near the pier — the residential side of the island stays calmer.",
            "You're genuinely dependent on ferry schedules for mainland trips — this isn't a quick drive to Playa del Carmen.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slower, island-paced", detail: "Busier near the cruise pier, genuinely calmer on the residential side of the island." },
          walkability: { value: "Walkable downtown, car elsewhere", detail: "San Miguel's center is walkable; the rest of the island favors a car or golf cart." },
          internet: { value: "Reliable in town", detail: "Solid in San Miguel; less consistent the further out on the island you go." },
          healthcare: { value: "Good for an island", detail: "Cozumel has real hospitals given its size and dive-tourism industry, though Cancún or Mérida cover anything major." },
          safety: { value: "Generally calm, standard precautions", detail: "Like anywhere, use normal travel-safety practices and verify current conditions before moving." },
          transportation: { value: "Golf cart or car common", detail: "Many residents use golf carts for short trips around the island; a car helps for longer distances." },
          airportAccess: { value: "Cozumel has its own international airport", detail: "No ferry required for flights — a genuine advantage over other coastal towns needing a mainland airport." },
          climate: { value: "Warm & humid, steady sea breeze", detail: "Similar rainy season to the mainland coast, with more consistent ocean breeze." },
          community: { value: "Settled, dive-industry and retiree presence", detail: "A long-term foreign community built around diving and retirement, less transient than mainland tourist towns." },
        },
        monthlyBudget: {
          housing: "$700–$1,500", groceries: "$300–$450", dining: "$180–$400", transportation: "$60–$140", utilities: "$80–$150", internet: "$55–$110",
          estimatedTotal: "$1,400–$2,700",
          note: "Directional estimate, not verified local data — island logistics (ferry-shipped goods) can push grocery and imported-goods costs above similarly-sized mainland towns.",
        },
        neighborhoods: [
          { name: "San Miguel (Centro)", description: "The island's only real town — walkable, with most shops, restaurants, and the ferry dock.", bestFor: "People who want to walk to daily errands and stay close to the ferry.", tradeoff: "Busiest and most tourist-facing part of the island, especially near the cruise pier." },
          { name: "Residential San Miguel (inland/south)", description: "Quieter residential streets away from the pier and malecón.", bestFor: "People who want San Miguel's convenience without the cruise-day crowds.", tradeoff: "A short golf cart or car ride from the waterfront itself." },
        ],
        pros: ["A genuine island separation from mainland tourist traffic", "World-class diving and reef access", "Cozumel has its own international airport — no ferry needed for flights"],
        tradeoffs: ["Island logistics can raise the cost of imported goods", "Cruise-ship days bring real crowds near the pier", "Mainland trips depend on ferry schedules, not a quick drive"],
        realEstate: {
          overview: "A real, established market of condos and homes, mostly in and around San Miguel — smaller in scale than the mainland Caribbean coast, with genuine long-term demand from divers and retirees.",
          considerations: ["Coastal island property typically requires a bank trust (fideicomiso) for foreign buyers — confirm current rules with a Mexican notary.", "Verify a property's water and power reliability specifically — island infrastructure can vary more than mainland towns of similar size."],
        },
        investmentOutlook: {
          intro: "Cozumel's growth is tied to diving tourism and a settled retiree community, a steadier pattern than the mainland coast's rapid construction cycles.",
          considerations: ["Being an island naturally limits the scale of new development compared to the mainland coast.", "Suitability depends on wanting genuine island life and its logistics, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Cozumel safe to live in?", answer: "Broadly calm island life. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Do I need a ferry to get to Cozumel?", answer: "For mainland trips, yes — but Cozumel has its own international airport, so flights don't require the ferry at all." },
          { question: "Is Cozumel good for diving?", answer: "Yes — it's one of the world's recognized diving destinations, with a real dive-industry community and infrastructure." },
          { question: "Are cruise ships a daily disruption?", answer: "They affect downtown San Miguel near the pier on port days; the residential side of the island stays calmer, and ships leave by late afternoon." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Cozumel suele encajar con personas que quieren vida isleña específicamente — una separación real del continente, buceo de clase mundial y una comunidad asentada todo el año, en lugar del flujo constante de un pueblo de playa continental.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y la costa isleña de Cozumel junto con su sistema de arrecifes son toda su identidad.",
            quiet: "Quieres tranquilidad sobre el ruido, y el lado residencial de la isla, lejos del muelle de cruceros, se mueve a un ritmo genuinamente más lento.",
            retirement: "Estás pensando en esto como tu próximo capítulo largo, y la comunidad extranjera asentada y de largo plazo de Cozumel encaja con ese tipo de planificación.",
            premium: "Quieres que esté bien hecho, y la infraestructura de buceo y salud de Cozumel están más desarrolladas que una isla pequeña típica.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "Los barcos de buceo salen del muelle temprano, y si no estás en uno, el malecón está casi vacío para caminar antes de que llegue la multitud del crucero del día." },
          { time: "Tarde", vignette: "El almuerzo es lejos del muelle, donde los precios y el ritmo reflejan el lado residencial real de la isla en lugar del turístico." },
          { time: "Noche", vignette: "Los cruceros zarpan a media tarde, y el pueblo cambia genuinamente de carácter — así es como Cozumel se siente como una isla en la que la gente realmente vive, no que visita." },
        ],
        honestTruth: {
          intro: "El atractivo isleño de Cozumel es real, y también lo es la realidad de estar rodeado de agua.",
          points: [
            "Todo llega por ferry o avión — los bienes pueden costar más y tardar más que en el continente.",
            "Los días de crucero traen multitudes reales cerca del muelle — el lado residencial de la isla se mantiene más calmado.",
            "Dependes genuinamente de los horarios del ferry para viajes al continente — esto no es un viaje rápido en auto a Playa del Carmen.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Más lento, ritmo isleño", detail: "Más ocupado cerca del muelle de cruceros, genuinamente más calmado en el lado residencial de la isla." },
          walkability: { value: "Caminable en el centro, auto en otras zonas", detail: "El centro de San Miguel es caminable; el resto de la isla favorece un auto o carrito de golf." },
          internet: { value: "Confiable en el pueblo", detail: "Sólido en San Miguel; menos consistente cuanto más te alejas en la isla." },
          healthcare: { value: "Bueno para una isla", detail: "Cozumel tiene hospitales reales dado su tamaño e industria de buceo, aunque Cancún o Mérida cubren cualquier cosa mayor." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Como en cualquier lugar, usa prácticas normales de seguridad al viajar y verifica las condiciones actuales antes de mudarte." },
          transportation: { value: "Carrito de golf o auto común", detail: "Muchos residentes usan carritos de golf para trayectos cortos por la isla; un auto ayuda para distancias más largas." },
          airportAccess: { value: "Cozumel tiene su propio aeropuerto internacional", detail: "No se necesita ferry para vuelos — una ventaja real sobre otros pueblos costeros que dependen de un aeropuerto continental." },
          climate: { value: "Cálido y húmedo, brisa marina constante", detail: "Temporada de lluvias similar a la costa continental, con una brisa oceánica más constante." },
          community: { value: "Asentada, presencia de buceo y jubilados", detail: "Una comunidad extranjera de largo plazo construida alrededor del buceo y la jubilación, menos transitoria que los pueblos turísticos continentales." },
        },
        monthlyBudget: {
          housing: "$700–$1,500", groceries: "$300–$450", dining: "$180–$400", transportation: "$60–$140", utilities: "$80–$150", internet: "$55–$110",
          estimatedTotal: "$1,400–$2,700",
          note: "Estimación direccional, no son datos locales verificados — la logística isleña (bienes transportados por ferry) puede elevar los costos de alimentos y productos importados por encima de pueblos continentales de tamaño similar.",
        },
        neighborhoods: [
          { name: "San Miguel (Centro)", description: "El único pueblo real de la isla — caminable, con la mayoría de las tiendas, restaurantes y el muelle del ferry.", bestFor: "Personas que quieren caminar a los mandados diarios y estar cerca del ferry.", tradeoff: "La parte más concurrida y orientada al turismo de la isla, especialmente cerca del muelle de cruceros." },
          { name: "San Miguel Residencial (interior/sur)", description: "Calles residenciales más tranquilas, lejos del muelle y el malecón.", bestFor: "Personas que quieren la comodidad de San Miguel sin las multitudes de los días de crucero.", tradeoff: "Un corto viaje en carrito de golf o auto desde el frente marítimo." },
        ],
        pros: ["Una separación isleña real del tráfico turístico continental", "Buceo de clase mundial y acceso a arrecifes", "Cozumel tiene su propio aeropuerto internacional — no se necesita ferry para vuelos"],
        tradeoffs: ["La logística isleña puede elevar el costo de los bienes importados", "Los días de crucero traen multitudes reales cerca del muelle", "Los viajes al continente dependen de los horarios del ferry, no de un viaje rápido en auto"],
        realEstate: {
          overview: "Un mercado real y establecido de condominios y casas, principalmente en y alrededor de San Miguel — más pequeño en escala que la costa caribeña continental, con demanda real y de largo plazo de buzos y jubilados.",
          considerations: ["La propiedad costera isleña típicamente requiere un fideicomiso bancario para compradores extranjeros — confirma las reglas actuales con un notario mexicano.", "Verifica específicamente la confiabilidad del agua y la energía de una propiedad — la infraestructura isleña puede variar más que en pueblos continentales de tamaño similar."],
        },
        investmentOutlook: {
          intro: "El crecimiento de Cozumel está ligado al turismo de buceo y a una comunidad asentada de jubilados, un patrón más estable que los ciclos de construcción rápida de la costa continental.",
          considerations: ["Ser una isla limita naturalmente la escala del nuevo desarrollo en comparación con la costa continental.", "La idoneidad depende de querer la vida isleña genuina y su logística, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Cozumel?", answer: "Vida isleña generalmente tranquila. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Necesito un ferry para llegar a Cozumel?", answer: "Para viajes al continente, sí — pero Cozumel tiene su propio aeropuerto internacional, así que los vuelos no requieren el ferry en absoluto." },
          { question: "¿Es bueno Cozumel para bucear?", answer: "Sí — es uno de los destinos de buceo reconocidos mundialmente, con una comunidad e infraestructura reales de la industria del buceo." },
          { question: "¿Los cruceros son una molestia diaria?", answer: "Afectan el centro de San Miguel cerca del muelle en los días de puerto; el lado residencial de la isla se mantiene más calmado, y los barcos zarpan a media tarde." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 4, note: { en: "Real hospitals and services given the island's size and dive-tourism industry.", es: "Hospitales y servicios reales dado el tamaño de la isla y su industria de turismo de buceo." } },
        healthcare: { score: 3, note: { en: "Good for an island, though anything major means Cancún or Mérida.", es: "Bueno para una isla, aunque cualquier cosa mayor significa Cancún o Mérida." } },
        community: { score: 4, note: { en: "A settled, long-term foreign community built around diving and retirement.", es: "Una comunidad extranjera asentada y de largo plazo construida alrededor del buceo y la jubilación." } },
        livability: { score: 4, note: { en: "Island logistics raise some costs, offset by a genuinely calmer pace.", es: "La logística isleña eleva algunos costos, compensada por un ritmo genuinamente más calmado." } },
        readiness: { score: 4, note: { en: "Cozumel's own international airport and established community make this an easy island to settle into.", es: "El propio aeropuerto internacional de Cozumel y su comunidad establecida hacen de esta una isla fácil para establecerse." } },
      },
    },
  },

  bacalar: {
    heroImage: "/regions/bacalar/bacalar-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "Built entirely around its famous seven-color lagoon — a small, laid-back town for people who want nature first and nightlife never.", es: "Construido enteramente alrededor de su famosa laguna de siete colores — un pueblo pequeño y relajado para quienes quieren naturaleza primero y vida nocturna nunca." },
    heroAlt: {
      en: "The multi-toned blue waters of Bacalar's lagoon at midday",
      es: "Las aguas de tonos azules de la laguna de Bacalar al mediodía",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Bacalar tends to fit people who want their whole daily life organized around a single, remarkable body of water — a small, low-rise town built around its lagoon, not a beach resort with a lake nearby.",
          reasonsByTag: {
            quiet: "You want quiet over noise, and Bacalar has stayed deliberately small and low-key even as its lagoon has become well known.",
            natureFirst: "Nature comes first for you, and the lagoon's ecosystem — including its living stromatolite reefs — is the actual reason this town exists.",
            exploratory: "You're still figuring out what fits, and Bacalar rewards people who want a genuinely different pace from the Caribbean coast, inland on freshwater rather than the sea.",
            budgetConscious: "You're being realistic about budget, and Bacalar generally costs less than the Caribbean coast towns to its east.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The lagoon is glassy before the wind picks up, and a swim or paddle before breakfast is a genuine daily ritual here, not a vacation activity." },
          { time: "Afternoon", vignette: "Lunch is simple, and the heat settles in the way it does away from the coast's sea breeze — the lagoon itself becomes the afternoon's actual air conditioning." },
          { time: "Evening", vignette: "The town is quiet after dark — this isn't a nightlife destination, and nobody who lives here expects it to become one." },
        ],
        honestTruth: {
          intro: "Bacalar's lagoon is genuinely special, and the town around it is genuinely small.",
          points: [
            "Services and healthcare are limited locally — Chetumal, the state capital, is the real backup for anything serious.",
            "It's inland, without the coast's sea breeze — the heat here can feel different, and more still, than the Caribbean coast.",
            "The lagoon's ecosystem is fragile — respecting posted swimming areas and boat regulations matters more here than at a typical beach.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slow and lagoon-centered", detail: "Life here follows the lagoon, not a clock — among the least hurried destinations on this site." },
          walkability: { value: "Small and walkable", detail: "The town center is compact; the lagoon itself is the main organizing feature of daily movement." },
          internet: { value: "Developing, growing with interest", detail: "Coverage has improved with Bacalar's rising profile, but test your specific address before relying on it." },
          healthcare: { value: "Basic locally, Chetumal for anything serious", detail: "Local clinics for routine needs; Chetumal, about 40 minutes away, is the region's real hospital hub." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, quiet town — use normal travel-safety practices as anywhere, and check current conditions given Bacalar's proximity to the Belize border region." },
          transportation: { value: "Walkable center, car for the region", detail: "The town is walkable; a car helps for Chetumal and the wider region." },
          airportAccess: { value: "~2 hours from Chetumal or Cancún", detail: "Chetumal has a smaller regional airport; Cancún International is the larger option, a longer drive." },
          climate: { value: "Warm, less sea breeze than the coast", detail: "Inland freshwater lagoon climate — hot, with the lagoon itself providing some relief." },
          community: { value: "Small, growing steadily", detail: "A modest but visibly growing foreign and domestic-tourism-driven presence." },
        },
        monthlyBudget: {
          housing: "$400–$900", groceries: "$220–$350", dining: "$120–$280", transportation: "$45–$100", utilities: "$55–$120", internet: "$40–$85",
          estimatedTotal: "$800–$1,700",
          note: "Directional estimate, not verified local data — generally below the Caribbean coast towns, reflecting Bacalar's smaller scale and inland location.",
        },
        neighborhoods: [
          { name: "Along The Lagoon (Costera)", description: "The waterfront strip with the most direct lagoon access and the town's visitor-facing businesses.", bestFor: "People who want to be steps from the water.", tradeoff: "The most visited, priciest part of a still genuinely small town." },
          { name: "Bacalar Pueblo (Inland)", description: "The town's actual residential grid, a short walk or drive from the lagoon.", bestFor: "People who want lower costs and a more local, everyday version of Bacalar.", tradeoff: "Not on the water itself." },
        ],
        pros: ["A genuinely unique freshwater lagoon ecosystem, not a manufactured attraction", "Lower cost of living than the Caribbean coast to the east", "A small, low-rise town that has stayed deliberately low-key"],
        tradeoffs: ["Limited local healthcare — Chetumal is the real backup", "Inland heat without the coast's sea breeze", "Growing tourism interest is changing the town's pace faster than in past years"],
        realEstate: {
          overview: "A small but rapidly-discussed market of lagoon-view homes and smaller in-town properties — real recent interest has increased demand, though the town's overall scale remains modest.",
          considerations: ["Ejido (communal) land status affects parts of the Bacalar area — confirm a property's actual title status with a Mexican notary before assuming standard private ownership applies.", "Lagoon-adjacent construction may carry environmental permitting requirements given the ecosystem's protected status — verify before planning any build or renovation."],
        },
        investmentOutlook: {
          intro: "Bacalar has drawn rising outside interest in recent years, which brings real development pressure on a fragile lagoon ecosystem — a genuine long-term community and environmental consideration, not just an opportunity.",
          considerations: ["Growing popularity has visibly increased both demand and construction — worth weighing against the ecosystem's own protected, fragile status.", "This ticket's own guidance applies clearly here: this is not a place to approach as a speculative or 'hot' market — long-term suitability and environmental impact matter more than any growth prediction."],
        },
        faq: [
          { question: "Is Bacalar safe to live in?", answer: "A small, quiet town. As anywhere, use normal travel-safety practices and confirm current conditions before moving — Bacalar sits near the Belize border region, so checking current conditions is worth doing." },
          { question: "How far is Bacalar from the Caribbean coast?", answer: "Bacalar is inland on a freshwater lagoon, roughly 1.5–2 hours south of Tulum by road, not on the Caribbean Sea itself." },
          { question: "Is Bacalar good for remote work?", answer: "Internet has improved with Bacalar's rising profile, but test your specific address before relying on it — it's less consistent than the more established coastal towns." },
          { question: "Can I swim anywhere in the lagoon?", answer: "Respect posted swimming areas and boat regulations — parts of the ecosystem, including its stromatolite reefs, are protected and shouldn't be disturbed." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Bacalar suele encajar con personas que quieren organizar toda su vida diaria alrededor de un único cuerpo de agua notable — un pueblo pequeño y bajo construido alrededor de su laguna, no un resort de playa con un lago cerca.",
          reasonsByTag: {
            quiet: "Quieres tranquilidad sobre el ruido, y Bacalar se ha mantenido deliberadamente pequeño y discreto incluso cuando su laguna se ha vuelto conocida.",
            natureFirst: "La naturaleza es lo primero para ti, y el ecosistema de la laguna — incluidos sus arrecifes de estromatolitos vivos — es la razón real de la existencia de este pueblo.",
            exploratory: "Todavía estás descubriendo qué encaja, y Bacalar recompensa a quienes buscan un ritmo genuinamente diferente al de la costa caribeña, tierra adentro sobre agua dulce en lugar del mar.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y Bacalar generalmente cuesta menos que los pueblos de la costa caribeña al este.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "La laguna está lisa antes de que sople el viento, y una nadada o remo antes del desayuno es un ritual diario genuino aquí, no una actividad vacacional." },
          { time: "Tarde", vignette: "El almuerzo es sencillo, y el calor se asienta como lo hace lejos de la brisa marina de la costa — la laguna misma se convierte en el aire acondicionado real de la tarde." },
          { time: "Noche", vignette: "El pueblo está tranquilo después del anochecer — este no es un destino de vida nocturna, y nadie que vive aquí espera que se convierta en uno." },
        ],
        honestTruth: {
          intro: "La laguna de Bacalar es genuinamente especial, y el pueblo a su alrededor es genuinamente pequeño.",
          points: [
            "Los servicios y la salud son limitados localmente — Chetumal, la capital del estado, es el respaldo real para cualquier cosa seria.",
            "Está tierra adentro, sin la brisa marina de la costa — el calor aquí puede sentirse diferente, y más quieto, que en la costa caribeña.",
            "El ecosistema de la laguna es frágil — respetar las zonas de natación señaladas y las regulaciones de embarcaciones importa más aquí que en una playa típica.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Lento y centrado en la laguna", detail: "La vida aquí sigue a la laguna, no un reloj — entre los destinos menos apresurados de este sitio." },
          walkability: { value: "Pequeño y caminable", detail: "El centro del pueblo es compacto; la laguna misma es la característica principal que organiza el movimiento diario." },
          internet: { value: "En desarrollo, creciendo con el interés", detail: "La cobertura ha mejorado con el creciente perfil de Bacalar, pero prueba tu dirección específica antes de confiar en ella." },
          healthcare: { value: "Básico localmente, Chetumal para algo serio", detail: "Clínicas locales para necesidades de rutina; Chetumal, a unos 40 minutos, es el centro hospitalario real de la región." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo pequeño y tranquilo — usa prácticas normales de seguridad al viajar, como en cualquier lugar, y verifica las condiciones actuales dada la cercanía de Bacalar a la región fronteriza con Belice." },
          transportation: { value: "Centro caminable, auto para la región", detail: "El pueblo es caminable; un auto ayuda para Chetumal y la región más amplia." },
          airportAccess: { value: "~2 horas de Chetumal o Cancún", detail: "Chetumal tiene un aeropuerto regional más pequeño; el Aeropuerto Internacional de Cancún es la opción más grande, un viaje más largo." },
          climate: { value: "Cálido, menos brisa marina que la costa", detail: "Clima de laguna de agua dulce tierra adentro — caluroso, con la laguna misma brindando algo de alivio." },
          community: { value: "Pequeña, creciendo de manera constante", detail: "Una presencia modesta pero visiblemente creciente, impulsada por turismo extranjero y nacional." },
        },
        monthlyBudget: {
          housing: "$400–$900", groceries: "$220–$350", dining: "$120–$280", transportation: "$45–$100", utilities: "$55–$120", internet: "$40–$85",
          estimatedTotal: "$800–$1,700",
          note: "Estimación direccional, no son datos locales verificados — generalmente por debajo de los pueblos de la costa caribeña, reflejando la escala más pequeña y la ubicación tierra adentro de Bacalar.",
        },
        neighborhoods: [
          { name: "La Costera (junto a la laguna)", description: "La franja frente al agua con el acceso más directo a la laguna y los negocios orientados a visitantes del pueblo.", bestFor: "Personas que quieren estar a pasos del agua.", tradeoff: "La parte más visitada y cara de un pueblo aún genuinamente pequeño." },
          { name: "Bacalar Pueblo (Interior)", description: "La cuadrícula residencial real del pueblo, a una caminata o viaje corto de la laguna.", bestFor: "Personas que quieren costos más bajos y una versión más local y cotidiana de Bacalar.", tradeoff: "No está sobre el agua misma." },
        ],
        pros: ["Un ecosistema de laguna de agua dulce genuinamente único, no una atracción fabricada", "Menor costo de vida que la costa caribeña al este", "Un pueblo pequeño y bajo que se ha mantenido deliberadamente discreto"],
        tradeoffs: ["Salud local limitada — Chetumal es el respaldo real", "Calor tierra adentro sin la brisa marina de la costa", "El creciente interés turístico está cambiando el ritmo del pueblo más rápido que en años pasados"],
        realEstate: {
          overview: "Un mercado pequeño pero de creciente interés de casas con vista a la laguna y propiedades más pequeñas dentro del pueblo — el interés real reciente ha aumentado la demanda, aunque la escala general del pueblo sigue siendo modesta.",
          considerations: ["El estatus de tierra ejidal afecta partes del área de Bacalar — confirma el estatus real del título de una propiedad con un notario mexicano antes de asumir que aplica la propiedad privada estándar.", "La construcción junto a la laguna puede tener requisitos de permisos ambientales dado el estatus protegido del ecosistema — verifica antes de planear cualquier construcción o remodelación."],
        },
        investmentOutlook: {
          intro: "Bacalar ha atraído un creciente interés externo en años recientes, lo que trae presión real de desarrollo sobre un ecosistema de laguna frágil — una consideración comunitaria y ambiental real de largo plazo, no solo una oportunidad.",
          considerations: ["La creciente popularidad ha aumentado visiblemente tanto la demanda como la construcción — vale la pena sopesarlo frente al estatus protegido y frágil del propio ecosistema.", "La propia guía de este sitio aplica claramente aquí: este no es un lugar para abordar como un mercado especulativo o de 'moda' — la idoneidad a largo plazo y el impacto ambiental importan más que cualquier predicción de crecimiento."],
        },
        faq: [
          { question: "¿Es seguro vivir en Bacalar?", answer: "Un pueblo pequeño y tranquilo. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte — Bacalar está cerca de la región fronteriza con Belice, así que vale la pena verificar las condiciones actuales." },
          { question: "¿Qué tan lejos está Bacalar de la costa caribeña?", answer: "Bacalar está tierra adentro sobre una laguna de agua dulce, aproximadamente 1.5–2 horas al sur de Tulum por carretera, no sobre el mar Caribe mismo." },
          { question: "¿Es bueno Bacalar para trabajo remoto?", answer: "El internet ha mejorado con el creciente perfil de Bacalar, pero prueba tu dirección específica antes de confiar en él — es menos consistente que los pueblos costeros más establecidos." },
          { question: "¿Puedo nadar en cualquier parte de la laguna?", answer: "Respeta las zonas de natación señaladas y las regulaciones de embarcaciones — partes del ecosistema, incluidos sus arrecifes de estromatolitos, están protegidas y no deben perturbarse." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Developing, growing with interest — test your specific address before relying on it.", es: "En desarrollo, creciendo con el interés — prueba tu dirección específica antes de confiar en ella." } },
        healthcare: { score: 2, note: { en: "Basic locally; Chetumal, about 40 minutes away, is the real hospital hub.", es: "Básico localmente; Chetumal, a unos 40 minutos, es el centro hospitalario real." } },
        community: { score: 3, note: { en: "Modest but visibly growing, driven by rising outside interest in the lagoon.", es: "Modesta pero visiblemente creciente, impulsada por el creciente interés externo en la laguna." } },
        livability: { score: 3, note: { en: "Below the Caribbean coast's costs, though rising interest is changing that.", es: "Por debajo de los costos de la costa caribeña, aunque el creciente interés está cambiando eso." } },
        readiness: { score: 2, note: { en: "A small town still building out services to match its rising profile.", es: "Un pueblo pequeño que aún está construyendo servicios acordes a su creciente perfil." } },
      },
    },
  },

  mahahual: {
    heroImage: "/regions/mahahual/mahahual-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A tiny Costa Maya beach village hours south of the Riviera Maya crowds — genuinely undeveloped, genuinely quiet.", es: "Un pequeño pueblo de playa en Costa Maya, a horas al sur de las multitudes de la Riviera Maya — genuinamente sin desarrollar, genuinamente tranquilo." },
    heroAlt: {
      en: "An empty stretch of Costa Maya beach near Mahahual at dusk",
      es: "Un tramo vacío de playa de Costa Maya cerca de Mahahual al atardecer",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Mahahual tends to fit people who want genuine remoteness on the Caribbean coast — hours south of Playa and Tulum's development, a small village that still empties out completely on non-cruise days.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Mahahual's malecón and reef sit right at the edge of an otherwise undeveloped stretch of coast.",
            quiet: "You want quiet over noise, and outside of cruise-ship days, this is one of the least crowded beach towns on this site.",
            remote: "You want real distance from the main tourist corridor, and Mahahual is genuinely hours from Playa del Carmen and Tulum, not just marketed as far.",
            exploratory: "You're still figuring out what fits, and Mahahual rewards people willing to trade convenience for a real sense of undeveloped coast.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "On a non-cruise day, the malecón is nearly empty, and a walk along it means mostly your own footsteps and the reef break offshore." },
          { time: "Afternoon", vignette: "Lunch is simple and local, and errands beyond the basics mean a real drive — this is a village, not a town with everything close by." },
          { time: "Evening", vignette: "The village is quiet after dark, genuinely so — this isn't a nightlife destination, and the distance from anywhere bigger keeps it that way." },
        ],
        honestTruth: {
          intro: "Mahahual's remoteness is genuine, and it comes with real trade-offs.",
          points: [
            "Cruise-ship days bring a real, temporary crowd near the pier — the rest of the time, the village is genuinely quiet.",
            "Services and healthcare are minimal locally — this is one of the more remote destinations on this site, hours from a major hospital.",
            "Hurricane exposure is real on this stretch of coast — research the season and building standards before committing.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slow and remote", detail: "Among the least developed, least crowded beach towns on this site outside of cruise days." },
          walkability: { value: "Small, walkable village core", detail: "The village itself is compact; anything beyond it means a real drive." },
          internet: { value: "Basic, developing", detail: "Coverage exists but is inconsistent — test your specific address before relying on it." },
          healthcare: { value: "Minimal locally", detail: "Basic care only; anything serious means a significant drive to Chetumal or Cancún." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, remote village — use normal travel-safety practices and verify current conditions before moving." },
          transportation: { value: "Car essential", detail: "The village is walkable, but this is a genuinely remote stretch of coast — a car matters for nearly everything else." },
          airportAccess: { value: "2.5–3 hours from Cancún or Chetumal", detail: "The furthest destination from a major international airport on this site's Caribbean coast." },
          climate: { value: "Warm & humid, real hurricane exposure", detail: "Same Caribbean coast rainy season as its northern neighbors, with a real hurricane risk worth researching seasonally." },
          community: { value: "Very small, tied to cruise/dive tourism", detail: "A small resident base, with activity concentrated around cruise-ship and dive-tourism days." },
        },
        monthlyBudget: {
          housing: "$350–$750", groceries: "$220–$350", dining: "$100–$250", transportation: "$50–$120", utilities: "$60–$130", internet: "$40–$90",
          estimatedTotal: "$700–$1,500",
          note: "Directional estimate, not verified local data — grounded in Mahahual's small scale and distance from the main Riviera Maya corridor, generally below Tulum or Playa's costs.",
        },
        neighborhoods: [
          { name: "El Malecón", description: "The waterfront strip itself — restaurants, dive shops, and the village's main social center on cruise days.", bestFor: "People who want to be steps from the water and reef.", tradeoff: "The busiest stretch on cruise-ship days, empty otherwise." },
          { name: "Inland Mahahual", description: "The residential streets a few blocks back from the water.", bestFor: "People who want lower costs and more distance from the cruise pier.", tradeoff: "Fewer amenities directly on-site." },
        ],
        pros: ["Genuine remoteness and undeveloped coastline, hours from the main tourist corridor", "A real, uncrowded reef right offshore", "Lower cost of living than Tulum or Playa del Carmen"],
        tradeoffs: ["Minimal local healthcare — a significant drive to real hospital care", "Cruise-ship days bring a real, if temporary, crowd", "Real hurricane exposure on this stretch of coast"],
        realEstate: {
          overview: "A very small, thin market of beach homes and smaller lots — limited listings, limited local infrastructure to support a purchase, and genuine distance from any major service center.",
          considerations: ["As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.", "Hurricane exposure on this coast makes construction standards and insurance genuinely important considerations, not formalities — verify both before any purchase."],
        },
        investmentOutlook: {
          intro: "Mahahual's identity is its remoteness and undeveloped coastline — treat any framing of it as an emerging Riviera Maya-style growth market with real skepticism.",
          considerations: ["This village's distance from major infrastructure and its cruise-tourism dependence are structural, current realities, not gaps waiting to close.", "Suitability depends on genuinely wanting remote, undeveloped coastal living, not on any prediction about future value or comparison to the more built-up coast to the north."],
        },
        faq: [
          { question: "Is Mahahual safe to live in?", answer: "A small, remote village. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "How far is Mahahual from Cancún?", answer: "Roughly 2.5–3 hours by road — the furthest Caribbean-coast destination on this site from a major international airport." },
          { question: "Is Mahahual busy or quiet?", answer: "Quiet most days; cruise-ship port days bring a real, temporary crowd near the malecón." },
          { question: "Is Mahahual good for remote work?", answer: "Internet exists but is inconsistent — test your specific address thoroughly before relying on it." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Mahahual suele encajar con personas que quieren un alejamiento genuino en la costa caribeña — horas al sur del desarrollo de Playa y Tulum, un pueblo pequeño que se vacía por completo en los días sin crucero.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y el malecón y el arrecife de Mahahual están justo al borde de un tramo de costa por lo demás sin desarrollar.",
            quiet: "Quieres tranquilidad sobre el ruido, y fuera de los días de crucero, este es uno de los pueblos de playa menos concurridos de este sitio.",
            remote: "Quieres distancia real del corredor turístico principal, y Mahahual está genuinamente a horas de Playa del Carmen y Tulum, no solo comercializado como lejano.",
            exploratory: "Todavía estás descubriendo qué encaja, y Mahahual recompensa a quienes están dispuestos a cambiar comodidad por una sensación real de costa sin desarrollar.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "En un día sin crucero, el malecón está casi vacío, y caminar por él significa principalmente tus propios pasos y el rompiente del arrecife frente a la costa." },
          { time: "Tarde", vignette: "El almuerzo es sencillo y local, y los mandados más allá de lo básico significan un viaje real — este es un pueblo, no una ciudad con todo cerca." },
          { time: "Noche", vignette: "El pueblo está tranquilo después del anochecer, genuinamente así — este no es un destino de vida nocturna, y la distancia de cualquier lugar más grande lo mantiene así." },
        ],
        honestTruth: {
          intro: "El alejamiento de Mahahual es genuino, y viene con compensaciones reales.",
          points: [
            "Los días de crucero traen una multitud real y temporal cerca del muelle — el resto del tiempo, el pueblo es genuinamente tranquilo.",
            "Los servicios y la salud son mínimos localmente — este es uno de los destinos más remotos de este sitio, a horas de un hospital importante.",
            "La exposición a huracanes es real en este tramo de costa — investiga la temporada y los estándares de construcción antes de decidirte.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Lento y remoto", detail: "Entre los pueblos de playa menos desarrollados y menos concurridos de este sitio fuera de los días de crucero." },
          walkability: { value: "Núcleo de pueblo pequeño y caminable", detail: "El pueblo en sí es compacto; cualquier cosa más allá significa un viaje real." },
          internet: { value: "Básico, en desarrollo", detail: "La cobertura existe pero es inconsistente — prueba tu dirección específica antes de confiar en ella." },
          healthcare: { value: "Mínimo localmente", detail: "Solo atención básica; cualquier cosa seria significa un viaje considerable a Chetumal o Cancún." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo pequeño y remoto — usa prácticas normales de seguridad al viajar y verifica las condiciones actuales antes de mudarte." },
          transportation: { value: "Auto esencial", detail: "El pueblo es caminable, pero este es un tramo de costa genuinamente remoto — un auto importa para casi todo lo demás." },
          airportAccess: { value: "2.5–3 horas de Cancún o Chetumal", detail: "El destino más alejado de un aeropuerto internacional importante en la costa caribeña de este sitio." },
          climate: { value: "Cálido y húmedo, exposición real a huracanes", detail: "La misma temporada de lluvias de la costa caribeña que sus vecinos del norte, con un riesgo real de huracanes que vale la pena investigar por temporada." },
          community: { value: "Muy pequeña, ligada al turismo de cruceros y buceo", detail: "Una base de residentes pequeña, con actividad concentrada en los días de crucero y turismo de buceo." },
        },
        monthlyBudget: {
          housing: "$350–$750", groceries: "$220–$350", dining: "$100–$250", transportation: "$50–$120", utilities: "$60–$130", internet: "$40–$90",
          estimatedTotal: "$700–$1,500",
          note: "Estimación direccional, no son datos locales verificados — basada en la pequeña escala de Mahahual y su distancia del corredor principal de la Riviera Maya, generalmente por debajo de los costos de Tulum o Playa.",
        },
        neighborhoods: [
          { name: "El Malecón", description: "La franja frente al mar — restaurantes, tiendas de buceo y el centro social principal del pueblo en días de crucero.", bestFor: "Personas que quieren estar a pasos del agua y el arrecife.", tradeoff: "El tramo más concurrido en días de crucero, vacío en otros momentos." },
          { name: "Mahahual Interior", description: "Las calles residenciales a unas cuadras del agua.", bestFor: "Personas que quieren costos más bajos y más distancia del muelle de cruceros.", tradeoff: "Menos comodidades directamente en el lugar." },
        ],
        pros: ["Alejamiento genuino y costa sin desarrollar, a horas del corredor turístico principal", "Un arrecife real y poco concurrido justo frente a la costa", "Menor costo de vida que Tulum o Playa del Carmen"],
        tradeoffs: ["Salud local mínima — un viaje considerable para atención hospitalaria real", "Los días de crucero traen una multitud real, aunque temporal", "Exposición real a huracanes en este tramo de costa"],
        realEstate: {
          overview: "Un mercado muy pequeño y limitado de casas de playa y lotes más pequeños — listados limitados, infraestructura local limitada para respaldar una compra, y distancia genuina de cualquier centro de servicios importante.",
          considerations: ["Como propiedad costera, la propiedad extranjera típicamente funciona a través de un fideicomiso bancario — confirma los requisitos actuales con un notario mexicano.", "La exposición a huracanes en esta costa hace que los estándares de construcción y el seguro sean consideraciones genuinamente importantes, no formalidades — verifica ambos antes de cualquier compra."],
        },
        investmentOutlook: {
          intro: "La identidad de Mahahual es su alejamiento y costa sin desarrollar — trata con verdadero escepticismo cualquier presentación de este lugar como un mercado emergente al estilo de la Riviera Maya.",
          considerations: ["La distancia de este pueblo de la infraestructura principal y su dependencia del turismo de cruceros son realidades estructurales y actuales, no brechas por cerrarse.", "La idoneidad depende de querer genuinamente una vida costera remota y sin desarrollar, no de ninguna predicción sobre el valor futuro o comparación con la costa más desarrollada al norte."],
        },
        faq: [
          { question: "¿Es seguro vivir en Mahahual?", answer: "Un pueblo pequeño y remoto. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Qué tan lejos está Mahahual de Cancún?", answer: "Aproximadamente 2.5–3 horas por carretera — el destino de la costa caribeña más alejado de un aeropuerto internacional importante en este sitio." },
          { question: "¿Mahahual es concurrido o tranquilo?", answer: "Tranquilo la mayoría de los días; los días de puerto de cruceros traen una multitud real y temporal cerca del malecón." },
          { question: "¿Es bueno Mahahual para trabajo remoto?", answer: "El internet existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en él." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Basic and developing — test your specific address before relying on it.", es: "Básico y en desarrollo — prueba tu dirección específica antes de confiar en ella." } },
        healthcare: { score: 1, note: { en: "Minimal locally; anything serious means a significant drive to Chetumal or Cancún.", es: "Mínimo localmente; cualquier cosa seria significa un viaje considerable a Chetumal o Cancún." } },
        community: { score: 2, note: { en: "A small resident base, with activity concentrated around cruise and dive-tourism days.", es: "Una base de residentes pequeña, con actividad concentrada en los días de crucero y turismo de buceo." } },
        livability: { score: 3, note: { en: "Below Tulum or Playa's costs, offset by genuine remoteness.", es: "Por debajo de los costos de Tulum o Playa, compensado por un alejamiento genuino." } },
        readiness: { score: 1, note: { en: "One of the more self-sufficiency-demanding destinations on this site.", es: "Uno de los destinos que más exige autosuficiencia en este sitio." } },
      },
    },
  },

  akumal: {
    heroImage: "/regions/akumal/akumal-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A small, protected bay between Playa del Carmen and Tulum, known for its sea turtles and a noticeably calmer pace than either neighbor.", es: "Una pequeña bahía protegida entre Playa del Carmen y Tulum, conocida por sus tortugas marinas y un ritmo notablemente más tranquilo que el de sus vecinos." },
    heroAlt: {
      en: "The calm, shallow waters of Akumal Bay with sea turtles visible near shore",
      es: "Las aguas tranquilas y poco profundas de la bahía de Akumal con tortugas marinas visibles cerca de la orilla",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Akumal tends to fit people who want a small, protected bay rather than a full town — genuinely calmer than Playa or Tulum, built around its bay and sea turtles rather than a main street or malecón.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Akumal's calm, reef-protected bay is its entire reason for being.",
            quiet: "You want quiet over noise, and Akumal has stayed noticeably smaller and calmer than its neighbors to the north and south.",
            family: "You're thinking about this as a family, and Akumal's calm, shallow bay and turtle-watching culture were practically built for that.",
            premium: "You want it done well, and Akumal's smaller scale means more of a curated, lower-density feel than Playa's bigger amenities base.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "A swim in the bay before breakfast often means sharing the water with a sea turtle or two — a genuine daily possibility here, not a special outing." },
          { time: "Afternoon", vignette: "Errands beyond the basics mean a short drive to Playa or Tulum — Akumal itself is small, and everyone here has made peace with that." },
          { time: "Evening", vignette: "The bay goes quiet and still after the day-trippers leave, and dinner is unhurried — this is a small community first, a destination second." },
        ],
        honestTruth: {
          intro: "Akumal's calm is real, and so is its small scale.",
          points: [
            "Local services are limited — Akumal itself is small, and bigger errands mean a drive to Playa or Tulum.",
            "Turtle sightings are a real, common occurrence here but never a guarantee — respect posted swimming and snorkeling guidelines around them.",
            "Day-trip tourism brings real crowds to the bay itself during peak hours, even though the town stays small.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Small and calm", detail: "Noticeably quieter and smaller-scale than either Playa del Carmen or Tulum." },
          walkability: { value: "Small, walkable core", detail: "The immediate bay area is walkable; anything beyond it means a drive." },
          internet: { value: "Generally reliable", detail: "Benefits from being on the main coastal highway between Playa and Tulum." },
          healthcare: { value: "Basic locally, Playa or Tulum nearby", detail: "Local clinics for routine needs; bigger hospitals are a short drive either direction." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, low-key community — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car recommended", detail: "The bay area is walkable, but a car helps significantly for errands and the wider region." },
          airportAccess: { value: "45–60 min from Cancún Intl.", detail: "Similar drive time to Playa or Tulum, along the same coastal highway." },
          climate: { value: "Warm & humid year-round", detail: "Same Caribbean coast rainy season as its neighbors, June–October." },
          community: { value: "Small, low-key, conservation-minded", detail: "A modest community with a visible focus on turtle and reef conservation." },
        },
        monthlyBudget: {
          housing: "$800–$1,600", groceries: "$300–$450", dining: "$180–$400", transportation: "$55–$140", utilities: "$75–$150", internet: "$55–$110",
          estimatedTotal: "$1,400–$2,700",
          note: "Directional estimate, not verified local data — generally comparable to or slightly below Playa del Carmen, reflecting Akumal's smaller scale but similar coastal-corridor position.",
        },
        neighborhoods: [
          { name: "Akumal Bay (Centro)", description: "The core bay area — beach access, dive shops, and most of the town's small commercial strip.", bestFor: "People who want to be steps from the bay and its turtles.", tradeoff: "The busiest part of a still genuinely small town, especially during day-trip hours." },
          { name: "Half Moon Bay / Yal-Ku (nearby)", description: "Quieter coves just north of the main bay, more residential and low-key.", bestFor: "People who want Akumal's calm with even less day-trip traffic.", tradeoff: "Fewer amenities directly on-site than the main bay area." },
        ],
        pros: ["A genuinely calmer, smaller-scale alternative to Playa or Tulum", "Real, regular sea turtle sightings in a protected bay", "Conveniently positioned between Playa del Carmen and Tulum"],
        tradeoffs: ["Limited local services — real dependence on Playa or Tulum for bigger errands", "Day-trip tourism brings real crowds to the bay during peak hours", "Turtle sightings are common but never guaranteed"],
        realEstate: {
          overview: "A small market of condos and homes near the bay, generally at a lower density and smaller scale than Playa del Carmen — real demand from people specifically seeking Akumal's calmer character.",
          considerations: ["Coastal property here typically requires a bank trust (fideicomiso) for foreign buyers — confirm current rules with a Mexican notary.", "Proximity to the protected bay and reef may carry environmental building restrictions — verify what's actually permitted before planning any construction."],
        },
        investmentOutlook: {
          intro: "Akumal has deliberately stayed smaller and lower-density than its neighbors, tied closely to its conservation-minded bay and turtle population.",
          considerations: ["Growth here has been more contained than Playa or Tulum, partly due to the bay's protected, conservation-focused status.", "Suitability depends on wanting Akumal's specific calm, small-scale character, not on any prediction about matching its neighbors' growth."],
        },
        faq: [
          { question: "Is Akumal safe to live in?", answer: "A small, low-key community. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Will I really see sea turtles in Akumal?", answer: "Sightings are common in the bay, but never guaranteed — respect posted swimming and snorkeling guidelines around them." },
          { question: "Is Akumal quieter than Playa del Carmen or Tulum?", answer: "Yes — it's noticeably smaller and calmer than either, though day-trip tourism does bring crowds to the bay during peak hours." },
          { question: "Do I need a car in Akumal?", answer: "Recommended — the bay area itself is walkable, but errands beyond it mean a drive to Playa or Tulum." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Akumal suele encajar con personas que quieren una bahía pequeña y protegida en lugar de un pueblo completo — genuinamente más tranquila que Playa o Tulum, construida alrededor de su bahía y sus tortugas marinas en lugar de una calle principal o malecón.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y la bahía tranquila y protegida por arrecife de Akumal es toda su razón de ser.",
            quiet: "Quieres tranquilidad sobre el ruido, y Akumal se ha mantenido notablemente más pequeño y tranquilo que sus vecinos al norte y al sur.",
            family: "Estás pensando en esto como familia, y la bahía tranquila y poco profunda de Akumal junto con su cultura de observación de tortugas fueron prácticamente hechas para eso.",
            premium: "Quieres que esté bien hecho, y la escala más pequeña de Akumal significa una sensación más curada y de menor densidad que la base de comodidades más grande de Playa.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "Una nadada en la bahía antes del desayuno a menudo significa compartir el agua con una o dos tortugas marinas — una posibilidad diaria genuina aquí, no una salida especial." },
          { time: "Tarde", vignette: "Los mandados más allá de lo básico significan un viaje corto a Playa o Tulum — Akumal en sí es pequeño, y todos aquí han hecho las paces con eso." },
          { time: "Noche", vignette: "La bahía se queda tranquila y quieta después de que se van los visitantes del día, y la cena es sin prisas — esta es una comunidad pequeña primero, un destino segundo." },
        ],
        honestTruth: {
          intro: "La tranquilidad de Akumal es real, y también lo es su pequeña escala.",
          points: [
            "Los servicios locales son limitados — Akumal en sí es pequeño, y los mandados más grandes significan un viaje a Playa o Tulum.",
            "Los avistamientos de tortugas son un suceso real y común aquí, pero nunca una garantía — respeta las pautas señaladas de natación y esnórquel a su alrededor.",
            "El turismo de un día trae multitudes reales a la bahía misma durante las horas pico, aunque el pueblo se mantenga pequeño.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Pequeño y tranquilo", detail: "Notablemente más tranquilo y de menor escala que Playa del Carmen o Tulum." },
          walkability: { value: "Núcleo pequeño y caminable", detail: "El área inmediata de la bahía es caminable; cualquier cosa más allá significa un viaje." },
          internet: { value: "Generalmente confiable", detail: "Se beneficia de estar en la carretera costera principal entre Playa y Tulum." },
          healthcare: { value: "Básico localmente, Playa o Tulum cerca", detail: "Clínicas locales para necesidades de rutina; los hospitales más grandes están a un viaje corto en cualquier dirección." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Una comunidad pequeña y discreta — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto recomendado", detail: "El área de la bahía es caminable, pero un auto ayuda significativamente para mandados y la región más amplia." },
          airportAccess: { value: "45–60 min del aeropuerto de Cancún", detail: "Tiempo de viaje similar a Playa o Tulum, por la misma carretera costera." },
          climate: { value: "Cálido y húmedo todo el año", detail: "La misma temporada de lluvias de la costa caribeña que sus vecinos, de junio a octubre." },
          community: { value: "Pequeña, discreta, orientada a la conservación", detail: "Una comunidad modesta con un enfoque visible en la conservación de tortugas y arrecifes." },
        },
        monthlyBudget: {
          housing: "$800–$1,600", groceries: "$300–$450", dining: "$180–$400", transportation: "$55–$140", utilities: "$75–$150", internet: "$55–$110",
          estimatedTotal: "$1,400–$2,700",
          note: "Estimación direccional, no son datos locales verificados — generalmente comparable o ligeramente por debajo de Playa del Carmen, reflejando la escala más pequeña de Akumal pero una posición similar en el corredor costero.",
        },
        neighborhoods: [
          { name: "Bahía de Akumal (Centro)", description: "El área central de la bahía — acceso a la playa, tiendas de buceo y la mayoría de la pequeña franja comercial del pueblo.", bestFor: "Personas que quieren estar a pasos de la bahía y sus tortugas.", tradeoff: "La parte más concurrida de un pueblo aún genuinamente pequeño, especialmente durante las horas de visitantes del día." },
          { name: "Half Moon Bay / Yal-Ku (cerca)", description: "Calas más tranquilas justo al norte de la bahía principal, más residenciales y discretas.", bestFor: "Personas que quieren la tranquilidad de Akumal con aún menos tráfico de visitantes del día.", tradeoff: "Menos comodidades directamente en el lugar que el área de la bahía principal." },
        ],
        pros: ["Una alternativa genuinamente más tranquila y de menor escala a Playa o Tulum", "Avistamientos reales y regulares de tortugas marinas en una bahía protegida", "Convenientemente posicionado entre Playa del Carmen y Tulum"],
        tradeoffs: ["Servicios locales limitados — dependencia real de Playa o Tulum para mandados más grandes", "El turismo de un día trae multitudes reales a la bahía durante las horas pico", "Los avistamientos de tortugas son comunes pero nunca garantizados"],
        realEstate: {
          overview: "Un mercado pequeño de condominios y casas cerca de la bahía, generalmente de menor densidad y escala que Playa del Carmen — demanda real de personas que buscan específicamente el carácter más tranquilo de Akumal.",
          considerations: ["La propiedad costera aquí típicamente requiere un fideicomiso bancario para compradores extranjeros — confirma las reglas actuales con un notario mexicano.", "La cercanía a la bahía y el arrecife protegidos puede tener restricciones ambientales de construcción — verifica qué está realmente permitido antes de planear cualquier construcción."],
        },
        investmentOutlook: {
          intro: "Akumal se ha mantenido deliberadamente más pequeño y de menor densidad que sus vecinos, ligado estrechamente a su bahía orientada a la conservación y su población de tortugas.",
          considerations: ["El crecimiento aquí ha sido más contenido que en Playa o Tulum, en parte debido al estatus protegido y enfocado en la conservación de la bahía.", "La idoneidad depende de querer el carácter específico, tranquilo y de pequeña escala de Akumal, no de ninguna predicción sobre igualar el crecimiento de sus vecinos."],
        },
        faq: [
          { question: "¿Es seguro vivir en Akumal?", answer: "Una comunidad pequeña y discreta. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿De verdad veré tortugas marinas en Akumal?", answer: "Los avistamientos son comunes en la bahía, pero nunca están garantizados — respeta las pautas señaladas de natación y esnórquel a su alrededor." },
          { question: "¿Es Akumal más tranquilo que Playa del Carmen o Tulum?", answer: "Sí — es notablemente más pequeño y tranquilo que cualquiera de los dos, aunque el turismo de un día trae multitudes a la bahía durante las horas pico." },
          { question: "¿Necesito un auto en Akumal?", answer: "Recomendado — el área de la bahía en sí es caminable, pero los mandados más allá significan un viaje a Playa o Tulum." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 4, note: { en: "Benefits from being on the main coastal highway between Playa and Tulum.", es: "Se beneficia de estar en la carretera costera principal entre Playa y Tulum." } },
        healthcare: { score: 3, note: { en: "Basic locally; bigger hospitals are a short drive either direction.", es: "Básico localmente; los hospitales más grandes están a un viaje corto en cualquier dirección." } },
        community: { score: 3, note: { en: "Small and low-key, with a visible focus on turtle and reef conservation.", es: "Pequeña y discreta, con un enfoque visible en la conservación de tortugas y arrecifes." } },
        livability: { score: 4, note: { en: "Comparable to or below Playa's costs, with a genuinely calmer pace.", es: "Comparable o por debajo de los costos de Playa, con un ritmo genuinamente más tranquilo." } },
        readiness: { score: 4, note: { en: "Close enough to Playa and Tulum's services to be easy to settle into.", es: "Lo bastante cerca de los servicios de Playa y Tulum para ser fácil de establecerse." } },
      },
    },
  },

  cancun: {
    heroImage: "/regions/cancun/cancun-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "The region's real infrastructure hub — separate from the tourist Hotel Zone, El Centro is where residents actually live, work, and rely on the peninsula's biggest airport.", es: "El verdadero centro de infraestructura de la región — separado de la Zona Hotelera turística, El Centro es donde los residentes realmente viven, trabajan y dependen del aeropuerto más grande de la península." },
    heroAlt: {
      en: "A residential street in downtown Cancún, away from the hotel zone",
      es: "Una calle residencial en el centro de Cancún, lejos de la zona hotelera",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Cancún tends to fit people who want a real, affordable, well-connected city — El Centro, not the Hotel Zone, is where residents actually live, and it functions as the region's genuine infrastructure and transportation hub.",
          reasonsByTag: {
            urban: "You wanted real city energy and amenities, and Cancún's El Centro is an actual working city, not a resort strip.",
            comfortable: "You want a comfortable, well-supported lifestyle, and Cancún has the region's deepest healthcare and shopping infrastructure by a clear margin.",
            family: "You're thinking about this as a family, and Cancún's schools, services, and affordability relative to the coast to its south suit that.",
            budgetConscious: "You're being realistic about budget, and El Centro is genuinely more affordable than Playa del Carmen or Tulum, contrary to Cancún's resort reputation.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "Traffic in El Centro is real city traffic, not a beach town's occasional slowdown — this is an actual city with an actual commute, distinct from the Hotel Zone's resort bubble entirely." },
          { time: "Afternoon", vignette: "Lunch and errands happen in ordinary shopping centers and markets that have nothing to do with tourism — most residents rarely set foot in the Hotel Zone at all." },
          { time: "Evening", vignette: "Evening life is real city life — local restaurants, family outings, ordinary neighborhoods — not a beach sunset. The Hotel Zone exists a world away, a bridge crossing from daily life." },
        ],
        honestTruth: {
          intro: "Cancún's infrastructure is real, and so is the gap between the city and its famous tourist strip.",
          points: [
            "El Centro and the Hotel Zone are genuinely different places — don't confuse Cancún-the-city with Cancún-the-resort-strip when researching.",
            "It's a real, busy city — traffic, noise, and city-scale crowding are part of daily life here in a way the coast's smaller towns don't have.",
            "Its resort reputation means some assume it's expensive — El Centro living is generally more affordable than Playa del Carmen or Tulum.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Real city pace", detail: "Genuine urban energy and traffic — the busiest, most city-scale destination on this site." },
          walkability: { value: "Walkable in parts, car helps overall", detail: "Some central neighborhoods are walkable; the city's scale generally favors a car or reliable taxi/rideshare." },
          internet: { value: "Most reliable on this site", detail: "As the region's biggest city, infrastructure here is the most consistent of any destination this site covers." },
          healthcare: { value: "Region's deepest healthcare access", detail: "Multiple major hospitals and specialists — the region's real healthcare hub alongside Mérida." },
          safety: { value: "Standard big-city precautions", detail: "As with any real city, use normal urban safety practices and verify current conditions by neighborhood before moving." },
          transportation: { value: "Car or rideshare recommended", detail: "A genuine city's scale — public buses exist, but most residents rely on a car or rideshare for daily life." },
          airportAccess: { value: "Cancún International Airport is in the city", detail: "The Yucatán Peninsula's largest airport, with the most direct international flight options of any destination on this site." },
          climate: { value: "Warm & humid year-round", detail: "Same Caribbean coast rainy season as the rest of the region, June–October." },
          community: { value: "Large, diverse, mostly Mexican", detail: "A genuine Mexican city population, with a smaller foreign-resident presence than the coast's more tourist-oriented towns." },
        },
        monthlyBudget: {
          housing: "$450–$950", groceries: "$250–$380", dining: "$130–$300", transportation: "$50–$120", utilities: "$70–$150", internet: "$40–$90",
          estimatedTotal: "$800–$1,700",
          note: "Directional estimate, not verified local data — El Centro living is generally below Playa del Carmen or Tulum's costs, contrary to Cancún's resort-driven reputation.",
        },
        neighborhoods: [
          { name: "El Centro", description: "Downtown Cancún — the real commercial and residential heart of the city, entirely distinct from the Hotel Zone.", bestFor: "People who want an affordable, functional city base with the region's best infrastructure.", tradeoff: "Genuine city traffic and noise, without beach access on your doorstep." },
          { name: "Región 100 / Supermanzanas", description: "Established residential grid neighborhoods (organized in numbered 'regions'/superblocks) with local shops and schools.", bestFor: "Families wanting an ordinary, affordable residential neighborhood.", tradeoff: "A drive or rideshare to reach the beach or airport." },
        ],
        pros: ["The region's deepest healthcare, shopping, and transportation infrastructure", "Genuinely more affordable than Playa del Carmen or Tulum", "Cancún International Airport offers the most direct flight options on this site"],
        tradeoffs: ["Real city traffic, noise, and scale — not a small-town pace", "No beach access on your doorstep in El Centro itself", "Smaller foreign-resident community than the more tourist-oriented coastal towns"],
        realEstate: {
          overview: "The region's largest and most liquid real estate market by far — a genuine mix of apartments, houses, and new developments across many neighborhoods, at costs generally below the coast to the south.",
          considerations: ["El Centro is inland from the beach, so the coastal fideicomiso (bank trust) requirement does not automatically apply the way it does at beachfront property — confirm current rules for your specific property with a Mexican notary regardless.", "As a large city, neighborhood matters enormously here — research a specific area's services, safety, and flood history rather than assuming 'Cancún' describes one uniform experience."],
        },
        investmentOutlook: {
          intro: "Cancún is a large, established city with growth tied to the broader region's tourism economy and its role as the peninsula's transportation hub, not a single beach-town growth story.",
          considerations: ["As Mexico's most visited tourism gateway, the city's economy is closely tied to broader travel trends — a different risk profile than a small coastal town.", "Long-term suitability here is driven by wanting real city infrastructure and affordability, not by any prediction about the Hotel Zone's own tourism-driven real estate."],
        },
        faq: [
          { question: "Is Cancún the same as the Hotel Zone?", answer: "No — El Centro (downtown Cancún, where residents actually live) and the Hotel Zone (the tourist resort strip) are genuinely different areas of the same city, and this page is about the former." },
          { question: "Is living in Cancún expensive?", answer: "El Centro living is generally more affordable than Playa del Carmen or Tulum — the resort reputation applies mainly to the Hotel Zone, not the city itself." },
          { question: "Is Cancún good for families?", answer: "Yes — it has the region's deepest infrastructure (schools, healthcare, shopping) at a more affordable cost than the coast to its south." },
          { question: "How far is the airport?", answer: "Cancún International Airport is in the city itself — the Yucatán Peninsula's largest, with the most direct international flight options of any destination on this site." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Cancún suele encajar con personas que quieren una ciudad real, accesible y bien conectada — El Centro, no la Zona Hotelera, es donde los residentes realmente viven, y funciona como el centro genuino de infraestructura y transporte de la región.",
          reasonsByTag: {
            urban: "Querías energía y comodidades reales de ciudad, y El Centro de Cancún es una ciudad real que funciona, no una franja de resorts.",
            comfortable: "Quieres un estilo de vida cómodo y bien respaldado, y Cancún tiene la infraestructura de salud y compras más profunda de la región por un margen claro.",
            family: "Estás pensando en esto como familia, y las escuelas, servicios y asequibilidad de Cancún en relación con la costa al sur se adaptan a eso.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y El Centro es genuinamente más asequible que Playa del Carmen o Tulum, contrario a la reputación de resort de Cancún.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "El tráfico en El Centro es tráfico real de ciudad, no la ocasional lentitud de un pueblo de playa — esta es una ciudad real con un traslado real, completamente distinta de la burbuja de resort de la Zona Hotelera." },
          { time: "Tarde", vignette: "El almuerzo y los mandados ocurren en centros comerciales y mercados ordinarios que no tienen nada que ver con el turismo — la mayoría de los residentes rara vez pisan la Zona Hotelera." },
          { time: "Noche", vignette: "La vida nocturna es vida real de ciudad — restaurantes locales, salidas familiares, vecindarios ordinarios — no un atardecer de playa. La Zona Hotelera existe en otro mundo, un puente que cruza desde la vida diaria." },
        ],
        honestTruth: {
          intro: "La infraestructura de Cancún es real, y también lo es la brecha entre la ciudad y su famosa franja turística.",
          points: [
            "El Centro y la Zona Hotelera son lugares genuinamente diferentes — no confundas el Cancún-ciudad con el Cancún-franja-turística al investigar.",
            "Es una ciudad real y ocupada — el tráfico, el ruido y la escala urbana son parte de la vida diaria aquí de una manera que los pueblos más pequeños de la costa no tienen.",
            "Su reputación de resort hace que algunos asuman que es caro — vivir en El Centro es generalmente más asequible que Playa del Carmen o Tulum.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Ritmo real de ciudad", detail: "Energía urbana y tráfico genuinos — el destino más ocupado y a escala de ciudad de este sitio." },
          walkability: { value: "Caminable en partes, auto ayuda en general", detail: "Algunos vecindarios centrales son caminables; la escala de la ciudad generalmente favorece un auto o taxi/viaje compartido confiable." },
          internet: { value: "El más confiable de este sitio", detail: "Como la ciudad más grande de la región, la infraestructura aquí es la más consistente de cualquier destino que cubre este sitio." },
          healthcare: { value: "El acceso a salud más profundo de la región", detail: "Múltiples hospitales importantes y especialistas — el centro de salud real de la región junto con Mérida." },
          safety: { value: "Precauciones estándar de gran ciudad", detail: "Como en cualquier ciudad real, usa prácticas normales de seguridad urbana y verifica las condiciones actuales por vecindario antes de mudarte." },
          transportation: { value: "Auto o viaje compartido recomendado", detail: "Una escala genuina de ciudad — existen autobuses públicos, pero la mayoría de los residentes dependen de un auto o viaje compartido para la vida diaria." },
          airportAccess: { value: "El Aeropuerto Internacional de Cancún está en la ciudad", detail: "El aeropuerto más grande de la Península de Yucatán, con las opciones de vuelos internacionales directos más amplias de cualquier destino en este sitio." },
          climate: { value: "Cálido y húmedo todo el año", detail: "La misma temporada de lluvias de la costa caribeña que el resto de la región, de junio a octubre." },
          community: { value: "Grande, diversa, mayoritariamente mexicana", detail: "Una población genuina de ciudad mexicana, con una presencia de residentes extranjeros menor que los pueblos costeros más orientados al turismo." },
        },
        monthlyBudget: {
          housing: "$450–$950", groceries: "$250–$380", dining: "$130–$300", transportation: "$50–$120", utilities: "$70–$150", internet: "$40–$90",
          estimatedTotal: "$800–$1,700",
          note: "Estimación direccional, no son datos locales verificados — vivir en El Centro generalmente está por debajo de los costos de Playa del Carmen o Tulum, contrario a la reputación de resort de Cancún.",
        },
        neighborhoods: [
          { name: "El Centro", description: "El centro de Cancún — el verdadero corazón comercial y residencial de la ciudad, completamente distinto de la Zona Hotelera.", bestFor: "Personas que quieren una base de ciudad accesible y funcional con la mejor infraestructura de la región.", tradeoff: "Tráfico y ruido reales de ciudad, sin acceso a la playa en la puerta de tu casa." },
          { name: "Región 100 / Supermanzanas", description: "Vecindarios residenciales establecidos en cuadrícula (organizados en 'regiones'/supermanzanas numeradas) con tiendas y escuelas locales.", bestFor: "Familias que quieren un vecindario residencial ordinario y accesible.", tradeoff: "Un viaje en auto o viaje compartido para llegar a la playa o al aeropuerto." },
        ],
        pros: ["La infraestructura de salud, compras y transporte más profunda de la región", "Genuinamente más asequible que Playa del Carmen o Tulum", "El Aeropuerto Internacional de Cancún ofrece las opciones de vuelo más directas de este sitio"],
        tradeoffs: ["Tráfico, ruido y escala reales de ciudad — no un ritmo de pueblo pequeño", "Sin acceso a la playa en la puerta de tu casa en El Centro mismo", "Comunidad de residentes extranjeros más pequeña que los pueblos costeros más orientados al turismo"],
        realEstate: {
          overview: "El mercado inmobiliario más grande y líquido de la región por mucho — una mezcla genuina de departamentos, casas y nuevos desarrollos en muchos vecindarios, a costos generalmente por debajo de la costa al sur.",
          considerations: ["El Centro está tierra adentro desde la playa, por lo que el requisito costero de fideicomiso bancario no aplica automáticamente como en una propiedad frente a la playa — confirma las reglas actuales para tu propiedad específica con un notario mexicano de todos modos.", "Como una gran ciudad, el vecindario importa enormemente aquí — investiga los servicios, la seguridad y el historial de inundaciones de un área específica en lugar de asumir que 'Cancún' describe una experiencia uniforme."],
        },
        investmentOutlook: {
          intro: "Cancún es una ciudad grande y establecida con un crecimiento ligado a la economía turística más amplia de la región y su papel como centro de transporte de la península, no la historia de crecimiento de un solo pueblo de playa.",
          considerations: ["Como la puerta de entrada turística más visitada de México, la economía de la ciudad está estrechamente ligada a las tendencias de viaje más amplias — un perfil de riesgo diferente al de un pequeño pueblo costero.", "La idoneidad a largo plazo aquí está impulsada por querer infraestructura y asequibilidad reales de ciudad, no por ninguna predicción sobre el mercado inmobiliario impulsado por el turismo de la Zona Hotelera."],
        },
        faq: [
          { question: "¿Cancún es lo mismo que la Zona Hotelera?", answer: "No — El Centro (el Cancún real, donde los residentes realmente viven) y la Zona Hotelera (la franja turística de resorts) son áreas genuinamente diferentes de la misma ciudad, y esta página trata sobre la primera." },
          { question: "¿Es caro vivir en Cancún?", answer: "Vivir en El Centro es generalmente más asequible que Playa del Carmen o Tulum — la reputación de resort aplica principalmente a la Zona Hotelera, no a la ciudad misma." },
          { question: "¿Es bueno Cancún para familias?", answer: "Sí — tiene la infraestructura más profunda de la región (escuelas, salud, compras) a un costo más asequible que la costa al sur." },
          { question: "¿Qué tan lejos está el aeropuerto?", answer: "El Aeropuerto Internacional de Cancún está en la ciudad misma — el más grande de la Península de Yucatán, con las opciones de vuelo internacional más directas de cualquier destino en este sitio." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 5, note: { en: "The most consistent, city-grade infrastructure of any destination on this site.", es: "La infraestructura más consistente y a nivel de ciudad de cualquier destino en este sitio." } },
        healthcare: { score: 5, note: { en: "Multiple major hospitals and specialists — the region's real healthcare hub alongside Mérida.", es: "Múltiples hospitales importantes y especialistas — el centro de salud real de la región junto con Mérida." } },
        community: { score: 3, note: { en: "A large, mostly Mexican city population, with a smaller foreign-resident presence than the coast.", es: "Una gran población mayoritariamente mexicana, con una presencia de residentes extranjeros menor que la costa." } },
        livability: { score: 4, note: { en: "Genuinely more affordable than Playa del Carmen or Tulum, at real city scale.", es: "Genuinamente más asequible que Playa del Carmen o Tulum, a escala real de ciudad." } },
        readiness: { score: 5, note: { en: "The region's biggest airport and deepest infrastructure make this the most turn-key destination on this site.", es: "El aeropuerto más grande y la infraestructura más profunda de la región hacen de este el destino más listo para usar en este sitio." } },
      },
    },
  },

  valladolid: {
    heroImage: "/regions/valladolid/valladolid-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A colonial Pueblo Mágico squarely between Mérida and the Caribbean coast — increasingly popular with remote workers who want culture and connectivity together.", es: "Un Pueblo Mágico colonial justo entre Mérida y la costa caribeña — cada vez más popular entre trabajadores remotos que buscan cultura y conectividad juntas." },
    heroAlt: {
      en: "Valladolid's colorful colonial street with a colonial church in the background",
      es: "Una colorida calle colonial de Valladolid con una iglesia colonial de fondo",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Valladolid tends to fit people who want colonial city culture without Mérida's full scale — a genuine Pueblo Mágico squarely between the coast and Mérida, increasingly popular with remote workers for exactly that reason.",
          reasonsByTag: {
            urban: "You wanted city energy and amenities on a smaller scale, and Valladolid's restored colonial center delivers real culture without Mérida's size.",
            heritage: "Heritage and culture matter to you, and Valladolid's colonial architecture and nearby cenotes and Maya sites are the real thing, not a themed version.",
            budgetConscious: "You're being realistic about budget, and Valladolid is generally more affordable than the Caribbean coast, while still offering real city infrastructure.",
            remoteWork: "You're building a life around remote work, and Valladolid's central position and growing coworking scene make it an increasingly practical base.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "Coffee near the main plaza means colonial architecture on every side, and the city is already busy with real daily commerce, not tourist shopping." },
          { time: "Afternoon", vignette: "A cenote swim is a genuine lunch-break option here — several are a short drive or even walk from the center, a real perk unique to this town." },
          { time: "Evening", vignette: "The plaza fills with families and locals as the heat breaks, and dinner is unhurried — Valladolid feels like a real, lived-in Yucatecan town, not a resort." },
        ],
        honestTruth: {
          intro: "Valladolid's culture and connectivity are real, and so is its inland, non-beach reality.",
          points: [
            "It's inland — no beach access without a real drive to the coast, roughly 1.5–2 hours depending on destination.",
            "It's smaller than Mérida, with correspondingly less healthcare and shopping infrastructure — Mérida remains the region's real hub.",
            "Growing popularity with remote workers and tourists has visibly increased both prices and foot traffic near the center in recent years.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Unhurried but real city energy", detail: "Busier than a small village, calmer than Mérida — a genuine middle pace." },
          walkability: { value: "Walkable center", detail: "The colonial core is compact and walkable; outer neighborhoods favor a car or bike." },
          internet: { value: "Improving, growing coworking presence", detail: "Benefiting from rising remote-work interest, though still less consistent than Mérida's infrastructure." },
          healthcare: { value: "Basic to moderate locally, Mérida for anything major", detail: "Decent local clinics; serious care means the roughly 2-hour drive to Mérida." },
          safety: { value: "Generally calm, standard precautions", detail: "A well-regarded colonial town — still, use normal travel-safety practices and verify current conditions." },
          transportation: { value: "Walkable center, car for cenotes/region", detail: "The town center is walkable; a car helps for nearby cenotes and archaeological sites." },
          airportAccess: { value: "~2 hours from Mérida or Cancún Intl.", detail: "Roughly centered between the peninsula's two major airports." },
          climate: { value: "Hot, drier inland heat", detail: "Similar to Mérida's inland climate — less sea breeze than the coast." },
          community: { value: "Growing remote-work and tourism presence", detail: "A real, longstanding Yucatecan town with a visibly growing foreign remote-work community in recent years." },
        },
        monthlyBudget: {
          housing: "$350–$750", groceries: "$200–$320", dining: "$120–$260", transportation: "$40–$100", utilities: "$55–$120", internet: "$40–$85",
          estimatedTotal: "$650–$1,400",
          note: "Directional estimate, not verified local data — generally below the Caribbean coast, comparable to or slightly above the more remote Gulf coast towns, reflecting Valladolid's growing popularity.",
        },
        neighborhoods: [
          { name: "Centro Histórico", description: "The restored colonial core around the main plaza and cathedral — walkable, with most restaurants and services.", bestFor: "People who want to be in the middle of the culture and architecture, on foot.", tradeoff: "The busiest and priciest part of a still genuinely affordable town." },
          { name: "Outer Residential Streets", description: "Quieter, more local neighborhoods a short walk or drive from the center.", bestFor: "People who want lower costs and a more everyday version of Valladolid.", tradeoff: "Less immediately walkable to the plaza and its restaurants." },
        ],
        pros: ["Real colonial culture and architecture at a smaller, more affordable scale than Mérida", "Genuinely close to cenotes and major Maya archaeological sites", "A central position between the coast and Mérida, increasingly practical for remote work"],
        tradeoffs: ["Inland — a real 1.5–2 hour drive to any beach", "Smaller healthcare and shopping infrastructure than Mérida", "Rising popularity has visibly increased prices and foot traffic near the center"],
        realEstate: {
          overview: "A small but growing market of colonial homes in the center and newer construction further out — real recent interest from remote workers and retirees has increased demand relative to a few years ago.",
          considerations: ["Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply — confirm current rules for your specific property with a Mexican notary regardless.", "Restored colonial homes can carry real renovation costs and permitting requirements — verify a property's actual condition before assuming a listing photo tells the whole story."],
        },
        investmentOutlook: {
          intro: "Valladolid's popularity has grown visibly in recent years, driven by remote-work interest and its central, well-connected position — genuine growth, worth weighing against real cost increases already underway.",
          considerations: ["Rising demand has increased prices near the historic center specifically, more than the town as a whole.", "Suitability depends on wanting Valladolid's specific mix of culture and connectivity, not on any prediction about further price appreciation."],
        },
        faq: [
          { question: "Is Valladolid safe to live in?", answer: "A well-regarded colonial town. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "How far is the beach from Valladolid?", answer: "Roughly 1.5–2 hours by road, depending on which coastal destination — this is an inland town, not a beach base." },
          { question: "Is Valladolid good for remote work?", answer: "Increasingly, yes — it has a growing coworking scene and a central position between Mérida and the coast, though infrastructure is still less consistent than Mérida's." },
          { question: "Are cenotes really nearby?", answer: "Yes — several well-known cenotes are a short drive or even walk from the town center, a genuine daily-life perk here." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Valladolid suele encajar con personas que quieren cultura de ciudad colonial sin la escala completa de Mérida — un Pueblo Mágico genuino justo entre la costa y Mérida, cada vez más popular entre trabajadores remotos precisamente por esa razón.",
          reasonsByTag: {
            urban: "Querías energía y comodidades de ciudad a menor escala, y el centro colonial restaurado de Valladolid ofrece cultura real sin el tamaño de Mérida.",
            heritage: "El patrimonio y la cultura te importan, y la arquitectura colonial de Valladolid junto con sus cenotes y sitios mayas cercanos son la cosa real, no una versión temática.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y Valladolid es generalmente más accesible que la costa caribeña, mientras ofrece infraestructura real de ciudad.",
            remoteWork: "Estás construyendo una vida alrededor del trabajo remoto, y la posición central de Valladolid junto con su creciente escena de coworking la hacen una base cada vez más práctica.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "El café cerca de la plaza principal significa arquitectura colonial por todos lados, y la ciudad ya está ocupada con comercio real diario, no compras turísticas." },
          { time: "Tarde", vignette: "Nadar en un cenote es una opción genuina de hora de almuerzo aquí — varios están a un corto viaje o incluso caminata del centro, una ventaja real única de este pueblo." },
          { time: "Noche", vignette: "La plaza se llena de familias y locales cuando el calor cede, y la cena es sin prisas — Valladolid se siente como un pueblo yucateco real y habitado, no un resort." },
        ],
        honestTruth: {
          intro: "La cultura y conectividad de Valladolid son reales, y también lo es su realidad tierra adentro, sin playa.",
          points: [
            "Está tierra adentro — sin acceso a la playa sin un viaje real a la costa, aproximadamente 1.5–2 horas según el destino.",
            "Es más pequeño que Mérida, con una infraestructura de salud y compras correspondientemente menor — Mérida sigue siendo el centro real de la región.",
            "La creciente popularidad entre trabajadores remotos y turistas ha aumentado visiblemente tanto los precios como el tráfico peatonal cerca del centro en años recientes.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Tranquilo pero con energía real de ciudad", detail: "Más ocupado que un pueblo pequeño, más calmado que Mérida — un ritmo intermedio genuino." },
          walkability: { value: "Centro caminable", detail: "El núcleo colonial es compacto y caminable; los vecindarios exteriores favorecen un auto o bicicleta." },
          internet: { value: "Mejorando, creciente presencia de coworking", detail: "Beneficiándose del creciente interés en trabajo remoto, aunque aún menos consistente que la infraestructura de Mérida." },
          healthcare: { value: "Básico a moderado localmente, Mérida para algo mayor", detail: "Clínicas locales decentes; la atención seria significa el viaje de aproximadamente 2 horas a Mérida." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo colonial bien valorado — aun así, usa prácticas normales de seguridad al viajar y verifica las condiciones actuales." },
          transportation: { value: "Centro caminable, auto para cenotes/región", detail: "El centro del pueblo es caminable; un auto ayuda para cenotes cercanos y sitios arqueológicos." },
          airportAccess: { value: "~2 horas de Mérida o del aeropuerto de Cancún", detail: "Aproximadamente centrado entre los dos aeropuertos principales de la península." },
          climate: { value: "Caluroso, calor seco tierra adentro", detail: "Similar al clima interior de Mérida — menos brisa marina que la costa." },
          community: { value: "Creciente presencia de trabajo remoto y turismo", detail: "Un pueblo yucateco real y de larga data con una comunidad extranjera de trabajo remoto visiblemente creciente en años recientes." },
        },
        monthlyBudget: {
          housing: "$350–$750", groceries: "$200–$320", dining: "$120–$260", transportation: "$40–$100", utilities: "$55–$120", internet: "$40–$85",
          estimatedTotal: "$650–$1,400",
          note: "Estimación direccional, no son datos locales verificados — generalmente por debajo de la costa caribeña, comparable o ligeramente por encima de los pueblos más remotos de la costa del Golfo, reflejando la creciente popularidad de Valladolid.",
        },
        neighborhoods: [
          { name: "Centro Histórico", description: "El núcleo colonial restaurado alrededor de la plaza principal y la catedral — caminable, con la mayoría de los restaurantes y servicios.", bestFor: "Personas que quieren estar en medio de la cultura y la arquitectura, a pie.", tradeoff: "La parte más concurrida y cara de un pueblo aún genuinamente accesible." },
          { name: "Calles Residenciales Exteriores", description: "Vecindarios más tranquilos y locales a una corta caminata o viaje del centro.", bestFor: "Personas que quieren costos más bajos y una versión más cotidiana de Valladolid.", tradeoff: "Menos caminable de inmediato a la plaza y sus restaurantes." },
        ],
        pros: ["Cultura y arquitectura colonial reales a una escala más pequeña y accesible que Mérida", "Genuinamente cerca de cenotes y sitios arqueológicos mayas importantes", "Una posición central entre la costa y Mérida, cada vez más práctica para trabajo remoto"],
        tradeoffs: ["Tierra adentro — un viaje real de 1.5–2 horas a cualquier playa", "Infraestructura de salud y compras más pequeña que Mérida", "La creciente popularidad ha aumentado visiblemente los precios y el tráfico peatonal cerca del centro"],
        realEstate: {
          overview: "Un mercado pequeño pero creciente de casas coloniales en el centro y nueva construcción más alejada — el interés real reciente de trabajadores remotos y jubilados ha aumentado la demanda en comparación con hace unos años.",
          considerations: ["Tierra adentro, por lo que el requisito costero de fideicomiso bancario no aplica automáticamente — confirma las reglas actuales para tu propiedad específica con un notario mexicano de todos modos.", "Las casas coloniales restauradas pueden tener costos de renovación y requisitos de permisos reales — verifica la condición real de una propiedad antes de asumir que una foto del listado cuenta toda la historia."],
        },
        investmentOutlook: {
          intro: "La popularidad de Valladolid ha crecido visiblemente en años recientes, impulsada por el interés en trabajo remoto y su posición central y bien conectada — crecimiento genuino, que vale la pena sopesar frente a los aumentos de costos reales ya en marcha.",
          considerations: ["La creciente demanda ha aumentado los precios cerca del centro histórico específicamente, más que el pueblo en su conjunto.", "La idoneidad depende de querer la mezcla específica de cultura y conectividad de Valladolid, no de ninguna predicción sobre una mayor apreciación de precios."],
        },
        faq: [
          { question: "¿Es seguro vivir en Valladolid?", answer: "Un pueblo colonial bien valorado. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Qué tan lejos está la playa de Valladolid?", answer: "Aproximadamente 1.5–2 horas por carretera, según el destino costero — este es un pueblo tierra adentro, no una base de playa." },
          { question: "¿Es bueno Valladolid para trabajo remoto?", answer: "Cada vez más, sí — tiene una creciente escena de coworking y una posición central entre Mérida y la costa, aunque la infraestructura sigue siendo menos consistente que la de Mérida." },
          { question: "¿De verdad hay cenotes cerca?", answer: "Sí — varios cenotes conocidos están a un corto viaje o incluso caminata del centro del pueblo, una ventaja genuina de la vida diaria aquí." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: { en: "Improving, with a growing coworking presence, though still less consistent than Mérida's.", es: "Mejorando, con una creciente presencia de coworking, aunque aún menos consistente que la de Mérida." } },
        healthcare: { score: 2, note: { en: "Decent local clinics; serious care means the roughly 2-hour drive to Mérida.", es: "Clínicas locales decentes; la atención seria significa el viaje de aproximadamente 2 horas a Mérida." } },
        community: { score: 4, note: { en: "A real Yucatecan town with a visibly growing foreign remote-work community.", es: "Un pueblo yucateco real con una comunidad extranjera de trabajo remoto visiblemente creciente." } },
        livability: { score: 4, note: { en: "Below the Caribbean coast's costs, though rising interest has increased prices near the center.", es: "Por debajo de los costos de la costa caribeña, aunque el creciente interés ha aumentado los precios cerca del centro." } },
        readiness: { score: 4, note: { en: "A central position and growing coworking scene make this an increasingly easy town to settle into.", es: "Una posición central y una creciente escena de coworking hacen de este un pueblo cada vez más fácil para establecerse." } },
      },
    },
  },

  izamal: {
    heroImage: "/regions/izamal/izamal-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "The \"Yellow City\" — a small, deeply Maya and colonial Pueblo Mágico built for people who want culture and quiet over beach or bustle.", es: "La \"Ciudad Amarilla\" — un pequeño Pueblo Mágico profundamente maya y colonial, pensado para quienes prefieren cultura y tranquilidad antes que playa o bullicio." },
    heroAlt: {
      en: "Izamal's yellow colonial buildings and a Franciscan convent under a bright sky",
      es: "Los edificios coloniales amarillos de Izamal y un convento franciscano bajo un cielo brillante",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Izamal tends to fit people who want deep Maya and colonial culture in a genuinely small, quiet town — famous for its yellow buildings, but built around real daily life, not a photo backdrop.",
          reasonsByTag: {
            quiet: "You want quiet over noise, and Izamal is one of the calmest, least developed Pueblos Mágicos on this site.",
            heritage: "Heritage and culture matter to you, and Izamal sits directly on top of an active Maya archaeological site, alongside a major colonial convent.",
            exploratory: "You're still figuring out what fits, and Izamal rewards people genuinely curious about layered Maya and colonial history, not a resort with a cultural theme.",
            budgetConscious: "You're being realistic about budget, and Izamal's small scale keeps costs low relative to Mérida or the coast.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The yellow-painted streets are quiet enough for a horse-drawn calesa to be a genuine local transportation option, not just a tourist ride." },
          { time: "Afternoon", vignette: "Lunch is simple and local, and the Kinich Kakmó pyramid rising directly out of a residential block is just a normal part of the neighborhood here." },
          { time: "Evening", vignette: "The convent and plaza light up gently after dark, and the town stays genuinely quiet — Izamal was never built for nightlife." },
        ],
        honestTruth: {
          intro: "Izamal's culture and calm are real, and so is its small-town reality.",
          points: [
            "Services and healthcare are limited locally — Mérida, about 50 minutes away, is the real backup for anything serious.",
            "It's inland with no beach access — day trips to the coast are a real drive, not a quick outing.",
            "This is a small, quiet town by design — if you want nightlife or a bigger social scene, this isn't quite that.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slow and rooted", detail: "One of the calmest, least developed Pueblos Mágicos this site covers." },
          walkability: { value: "Small and walkable", detail: "The whole town is compact enough to walk nearly everywhere, including its main archaeological site." },
          internet: { value: "Basic, developing", detail: "Coverage exists but is less consistent than Mérida — test your specific address before relying on it." },
          healthcare: { value: "Minimal locally, Mérida for anything serious", detail: "Basic clinics only; Mérida is the region's real healthcare hub, about 50 minutes away." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, quiet Pueblo Mágico — use normal travel-safety practices as anywhere." },
          transportation: { value: "Walkable, car for the region", detail: "The town itself is fully walkable; a car helps for Mérida and the wider region." },
          airportAccess: { value: "~50 min from Mérida International", detail: "A straightforward, direct drive to the region's healthcare and airport hub." },
          climate: { value: "Hot, dry inland heat", detail: "Similar inland climate to Mérida and Valladolid — no sea breeze." },
          community: { value: "Small, rooted, Maya and Yucatecan", detail: "A living local community with deep cultural continuity, similar in character to Santa Elena." },
        },
        monthlyBudget: {
          housing: "$300–$650", groceries: "$180–$300", dining: "$100–$220", transportation: "$40–$90", utilities: "$50–$110", internet: "$35–$80",
          estimatedTotal: "$550–$1,150",
          note: "Directional estimate, not verified local data — grounded in Izamal's small scale, generally comparable to or below Valladolid's costs.",
        },
        neighborhoods: [
          { name: "Centro (Around The Convent)", description: "The town's yellow-painted heart, around the plaza and the Franciscan convent.", bestFor: "People who want to be in the middle of Izamal's history and architecture.", tradeoff: "The most visited part of a still genuinely small town." },
          { name: "Outer Residential Streets", description: "Quieter streets a short walk from the center, more local and affordable.", bestFor: "People who want lower costs and a more everyday version of Izamal.", tradeoff: "Still a small town — amenities are limited everywhere, not just here." },
        ],
        pros: ["Deep, layered Maya and colonial culture in a genuinely small, calm town", "Lower cost of living than Valladolid or Mérida", "A real Pueblo Mágico built around daily life, not a resort or theme"],
        tradeoffs: ["Minimal local healthcare — Mérida is a real, if manageable, drive away", "Inland — no beach access without a real drive", "Very limited nightlife or social scene by design"],
        realEstate: {
          overview: "A very small market of traditional yellow-painted colonial homes — minimal turnover, minimal new construction, and genuine historic character.",
          considerations: ["Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply — confirm current rules for your specific property with a Mexican notary regardless.", "As a recognized Pueblo Mágico with historic architecture (including the town's uniform yellow paint scheme), renovations may carry preservation requirements — verify before planning any work."],
        },
        investmentOutlook: {
          intro: "Izamal's identity is its Maya and colonial heritage — a small, culturally protected town, not a growth market.",
          considerations: ["This town's small scale and limited services are structural and intentional, tied to its historic character, not gaps waiting to close.", "Suitability depends on genuinely wanting deep cultural immersion in a quiet town, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Izamal safe to live in?", answer: "A small, quiet Pueblo Mágico. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Why is Izamal called the Yellow City?", answer: "Much of the town's colonial architecture, including its central convent, is painted a distinctive yellow — a well-known, deliberate part of its historic identity." },
          { question: "How far is Izamal from Mérida?", answer: "About 50 minutes by direct road — the region's real healthcare and airport hub." },
          { question: "Is Izamal good for remote work?", answer: "Coverage exists but is less consistent than Mérida's — test your specific address before relying on it." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Izamal suele encajar con personas que quieren cultura maya y colonial profunda en un pueblo genuinamente pequeño y tranquilo — famoso por sus edificios amarillos, pero construido alrededor de la vida real diaria, no un telón de fondo fotográfico.",
          reasonsByTag: {
            quiet: "Quieres tranquilidad sobre el ruido, e Izamal es uno de los Pueblos Mágicos más calmados y menos desarrollados de este sitio.",
            heritage: "El patrimonio y la cultura te importan, e Izamal se asienta directamente sobre un sitio arqueológico maya activo, junto a un convento colonial importante.",
            exploratory: "Todavía estás descubriendo qué encaja, e Izamal recompensa a quienes sienten curiosidad genuina por la historia maya y colonial en capas, no un resort con tema cultural.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y la pequeña escala de Izamal mantiene los costos bajos en relación con Mérida o la costa.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "Las calles pintadas de amarillo están lo bastante tranquilas para que una calesa tirada por caballos sea una opción de transporte local genuina, no solo un paseo turístico." },
          { time: "Tarde", vignette: "El almuerzo es sencillo y local, y la pirámide de Kinich Kakmó, que se eleva directamente de una cuadra residencial, es solo una parte normal del vecindario aquí." },
          { time: "Noche", vignette: "El convento y la plaza se iluminan suavemente después del anochecer, y el pueblo permanece genuinamente tranquilo — Izamal nunca fue construido para la vida nocturna." },
        ],
        honestTruth: {
          intro: "La cultura y la calma de Izamal son reales, y también lo es su realidad de pueblo pequeño.",
          points: [
            "Los servicios y la salud son limitados localmente — Mérida, a unos 50 minutos, es el respaldo real para cualquier cosa seria.",
            "Está tierra adentro sin acceso a la playa — los viajes de un día a la costa son un viaje real, no una salida rápida.",
            "Este es un pueblo pequeño y tranquilo por diseño — si quieres vida nocturna o una escena social más grande, esto no es exactamente eso.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Lento y arraigado", detail: "Uno de los Pueblos Mágicos más calmados y menos desarrollados que cubre este sitio." },
          walkability: { value: "Pequeño y caminable", detail: "Todo el pueblo es lo bastante compacto para caminar casi a todas partes, incluido su sitio arqueológico principal." },
          internet: { value: "Básico, en desarrollo", detail: "La cobertura existe pero es menos consistente que Mérida — prueba tu dirección específica antes de confiar en ella." },
          healthcare: { value: "Mínimo localmente, Mérida para algo serio", detail: "Solo clínicas básicas; Mérida es el centro de salud real de la región, a unos 50 minutos." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un Pueblo Mágico pequeño y tranquilo — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Caminable, auto para la región", detail: "El pueblo en sí es completamente caminable; un auto ayuda para Mérida y la región más amplia." },
          airportAccess: { value: "~50 min de Mérida", detail: "Un viaje directo y sencillo al centro de salud y aeropuerto de la región." },
          climate: { value: "Caluroso, calor seco tierra adentro", detail: "Clima interior similar a Mérida y Valladolid — sin brisa marina." },
          community: { value: "Pequeña, arraigada, maya y yucateca", detail: "Una comunidad local viva con profunda continuidad cultural, de carácter similar a Santa Elena." },
        },
        monthlyBudget: {
          housing: "$300–$650", groceries: "$180–$300", dining: "$100–$220", transportation: "$40–$90", utilities: "$50–$110", internet: "$35–$80",
          estimatedTotal: "$550–$1,150",
          note: "Estimación direccional, no son datos locales verificados — basada en la pequeña escala de Izamal, generalmente comparable o por debajo de los costos de Valladolid.",
        },
        neighborhoods: [
          { name: "Centro (Alrededor Del Convento)", description: "El corazón amarillo del pueblo, alrededor de la plaza y el convento franciscano.", bestFor: "Personas que quieren estar en medio de la historia y arquitectura de Izamal.", tradeoff: "La parte más visitada de un pueblo aún genuinamente pequeño." },
          { name: "Calles Residenciales Exteriores", description: "Calles más tranquilas a una corta caminata del centro, más locales y accesibles.", bestFor: "Personas que quieren costos más bajos y una versión más cotidiana de Izamal.", tradeoff: "Sigue siendo un pueblo pequeño — las comodidades son limitadas en todas partes, no solo aquí." },
        ],
        pros: ["Cultura maya y colonial profunda y en capas en un pueblo genuinamente pequeño y calmado", "Menor costo de vida que Valladolid o Mérida", "Un Pueblo Mágico real construido alrededor de la vida diaria, no un resort o tema"],
        tradeoffs: ["Salud local mínima — Mérida es un viaje real, aunque manejable", "Tierra adentro — sin acceso a la playa sin un viaje real", "Vida nocturna o escena social muy limitada por diseño"],
        realEstate: {
          overview: "Un mercado muy pequeño de casas coloniales tradicionales pintadas de amarillo — rotación mínima, construcción nueva mínima y carácter histórico genuino.",
          considerations: ["Tierra adentro, por lo que el requisito costero de fideicomiso bancario no aplica automáticamente — confirma las reglas actuales para tu propiedad específica con un notario mexicano de todos modos.", "Como Pueblo Mágico reconocido con arquitectura histórica (incluido el esquema uniforme de pintura amarilla del pueblo), las renovaciones pueden tener requisitos de preservación — verifica antes de planear cualquier trabajo."],
        },
        investmentOutlook: {
          intro: "La identidad de Izamal es su patrimonio maya y colonial — un pueblo pequeño y culturalmente protegido, no un mercado de crecimiento.",
          considerations: ["La pequeña escala y los servicios limitados de este pueblo son estructurales e intencionales, ligados a su carácter histórico, no brechas por cerrarse.", "La idoneidad depende de querer genuinamente inmersión cultural profunda en un pueblo tranquilo, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Izamal?", answer: "Un Pueblo Mágico pequeño y tranquilo. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Por qué se llama Izamal la Ciudad Amarilla?", answer: "Gran parte de la arquitectura colonial del pueblo, incluido su convento central, está pintada de un amarillo distintivo — una parte bien conocida y deliberada de su identidad histórica." },
          { question: "¿Qué tan lejos está Izamal de Mérida?", answer: "Aproximadamente 50 minutos por carretera directa — el centro real de salud y aeropuerto de la región." },
          { question: "¿Es bueno Izamal para trabajo remoto?", answer: "La cobertura existe pero es menos consistente que la de Mérida — prueba tu dirección específica antes de confiar en ella." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Basic and developing — test your specific address before relying on it.", es: "Básico y en desarrollo — prueba tu dirección específica antes de confiar en ella." } },
        healthcare: { score: 2, note: { en: "Basic clinics only; Mérida is the region's real healthcare hub, about 50 minutes away.", es: "Solo clínicas básicas; Mérida es el centro de salud real de la región, a unos 50 minutos." } },
        community: { score: 3, note: { en: "A living local community with deep cultural continuity, similar in character to Santa Elena.", es: "Una comunidad local viva con profunda continuidad cultural, similar a Santa Elena." } },
        livability: { score: 4, note: { en: "Comparable to or below Valladolid's costs, reflecting Izamal's small scale.", es: "Comparable o por debajo de los costos de Valladolid, reflejando la pequeña escala de Izamal." } },
        readiness: { score: 2, note: { en: "A small, quiet town — less turn-key than Valladolid or Mérida.", es: "Un pueblo pequeño y tranquilo — menos listo para usar que Valladolid o Mérida." } },
      },
    },
  },

  tekax: {
    heroImage: "/regions/tekax/tekax-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A working agricultural town in the Puuc region's south — genuinely local, genuinely quiet, and not built with visitors in mind.", es: "Un pueblo agrícola activo en el sur de la región Puuc — genuinamente local, genuinamente tranquilo, y no construido pensando en visitantes." },
    heroAlt: {
      en: "A quiet residential street in Tekax with traditional Yucatecan homes",
      es: "Una tranquila calle residencial en Tekax con casas tradicionales yucatecas",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Tekax tends to fit people who want the most genuinely local, least tourism-oriented version of the Puuc region — a real working agricultural town, not a destination built with outside visitors in mind.",
          reasonsByTag: {
            quiet: "You want quiet over noise, and Tekax has essentially no tourism infrastructure to disrupt its own daily rhythm.",
            budgetConscious: "You're being realistic about budget, and Tekax's working-town character keeps costs low relative to Mérida or Valladolid.",
            exploratory: "You're still figuring out what fits, and Tekax rewards people genuinely curious about ordinary Yucatecan life, not a curated cultural experience.",
            remote: "You want real distance from the tourist map, and Tekax is about as far from that map as this site's destinations get while still being an actual town, not a village.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The town wakes up around its market and church, and daily life here follows agricultural rhythms more than any tourist clock." },
          { time: "Afternoon", vignette: "Errands mean the local market and a handful of shops — anything beyond that means a drive to a bigger town." },
          { time: "Evening", vignette: "The town settles early and genuinely quietly — there's no boardwalk scene or plaza nightlife built for outsiders here." },
        ],
        honestTruth: {
          intro: "Tekax's authenticity is real, and so is its lack of any tourism infrastructure at all.",
          points: [
            "This town was not built with foreign residents in mind — expect to rely heavily on Spanish and genuine self-sufficiency.",
            "Services and healthcare are limited locally — Mérida, roughly 1.5–2 hours away, is the real backup for anything serious.",
            "There is essentially no expat or remote-work community here — this is a genuinely local town, not an emerging destination.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Rural and agricultural", detail: "Among the most ordinary, least tourism-shaped paces of any destination on this site." },
          walkability: { value: "Small, walkable center", detail: "The town center is walkable; anything beyond it means a drive." },
          internet: { value: "Basic, limited", detail: "Coverage exists but is inconsistent — test your specific address thoroughly before relying on it." },
          healthcare: { value: "Minimal locally", detail: "Basic clinics only; anything serious means a significant drive to Mérida." },
          safety: { value: "Generally calm, standard precautions", detail: "A quiet working town — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car essential", detail: "The town center is walkable, but daily life genuinely assumes a car for anything beyond it." },
          airportAccess: { value: "~1.5–2 hours from Mérida International", detail: "A genuine drive along inland roads — not a short hop." },
          climate: { value: "Hot, dry inland heat", detail: "Puuc-region inland climate — no sea breeze, similar to Santa Elena's." },
          community: { value: "Local, agricultural, minimal foreign presence", detail: "A genuinely local working town — this is not a destination with an existing expat community." },
        },
        monthlyBudget: {
          housing: "$200–$450", groceries: "$140–$240", dining: "$60–$140", transportation: "$40–$90", utilities: "$45–$95", internet: "$30–$70",
          estimatedTotal: "$350–$800",
          note: "Directional estimate, not verified local data — among the lowest cost-of-living estimates on this site, reflecting Tekax's minimal tourism infrastructure and working-town character.",
        },
        neighborhoods: [
          { name: "Town Center", description: "The streets around Tekax's market and main church — the most walkable, most community-facing part of town.", bestFor: "People who want to be inside the town's actual daily life.", tradeoff: "Very few amenities beyond what a small working town genuinely offers." },
          { name: "Outskirts / Agricultural Edge", description: "The edges of town where the agricultural land begins.", bestFor: "People who want more space and don't mind distance from the town center.", tradeoff: "Even less immediate access to what local services exist." },
        ],
        pros: ["The most genuinely local, least tourism-shaped town this site covers", "Very low cost of living relative to Mérida or the coast", "Real, ordinary Yucatecan agricultural-town life, not a curated version of it"],
        tradeoffs: ["Essentially no expat community or English-language support", "Minimal local healthcare — a real drive to Mérida for anything serious", "Very limited internet reliability — test thoroughly before relying on it"],
        realEstate: {
          overview: "A very small, thin market of traditional homes — minimal turnover, minimal local infrastructure to support a purchase, and essentially no foreign-buyer activity to date.",
          considerations: ["Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply — confirm current rules for your specific property with a Mexican notary regardless.", "With essentially no existing foreign-buyer market here, expect to rely heavily on local professionals and your own Spanish-language research."],
        },
        investmentOutlook: {
          intro: "Tekax is a working agricultural town with no tourism or foreign-buyer market to speak of — treat any framing of it as an investment opportunity with significant skepticism.",
          considerations: ["This town's minimal services and lack of foreign infrastructure are current, structural realities, not an early-stage opportunity.", "Suitability depends entirely on genuinely wanting the most local, self-sufficient version of Puuc-region life on this site."],
        },
        faq: [
          { question: "Is Tekax safe to live in?", answer: "A quiet working town. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Is there an expat community in Tekax?", answer: "Essentially none — this is a genuinely local town, not an emerging expat destination, and Spanish is genuinely necessary here." },
          { question: "How far is Tekax from healthcare?", answer: "Basic clinics only locally — anything serious means a roughly 1.5–2 hour drive to Mérida." },
          { question: "Is Tekax good for remote work?", answer: "Internet is basic and inconsistent — test your specific address thoroughly before relying on it; this is not a town built around remote-work infrastructure." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Tekax suele encajar con personas que quieren la versión más genuinamente local y menos orientada al turismo de la región Puuc — un pueblo agrícola de trabajo real, no un destino construido pensando en visitantes externos.",
          reasonsByTag: {
            quiet: "Quieres tranquilidad sobre el ruido, y Tekax esencialmente no tiene infraestructura turística que perturbe su propio ritmo diario.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y el carácter de pueblo de trabajo de Tekax mantiene los costos bajos en relación con Mérida o Valladolid.",
            exploratory: "Todavía estás descubriendo qué encaja, y Tekax recompensa a quienes sienten curiosidad genuina por la vida yucateca ordinaria, no una experiencia cultural curada.",
            remote: "Quieres distancia real del mapa turístico, y Tekax está tan lejos de ese mapa como los destinos de este sitio pueden estar siendo aún un pueblo real, no una aldea.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "El pueblo despierta alrededor de su mercado e iglesia, y la vida diaria aquí sigue ritmos agrícolas más que cualquier reloj turístico." },
          { time: "Tarde", vignette: "Los mandados significan el mercado local y un puñado de tiendas — cualquier cosa más allá significa un viaje a un pueblo más grande." },
          { time: "Noche", vignette: "El pueblo se asienta temprano y genuinamente tranquilo — no hay escena de malecón ni vida nocturna de plaza construida para foráneos aquí." },
        ],
        honestTruth: {
          intro: "La autenticidad de Tekax es real, y también lo es su falta total de infraestructura turística.",
          points: [
            "Este pueblo no fue construido pensando en residentes extranjeros — espera depender fuertemente del español y de una autosuficiencia genuina.",
            "Los servicios y la salud son limitados localmente — Mérida, a aproximadamente 1.5–2 horas, es el respaldo real para cualquier cosa seria.",
            "Esencialmente no hay comunidad de extranjeros ni de trabajo remoto aquí — este es un pueblo genuinamente local, no un destino emergente.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Rural y agrícola", detail: "Entre los ritmos más ordinarios y menos moldeados por el turismo de cualquier destino en este sitio." },
          walkability: { value: "Centro pequeño y caminable", detail: "El centro del pueblo es caminable; cualquier cosa más allá significa un viaje." },
          internet: { value: "Básico, limitado", detail: "La cobertura existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en ella." },
          healthcare: { value: "Mínimo localmente", detail: "Solo clínicas básicas; cualquier cosa seria significa un viaje considerable a Mérida." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo de trabajo tranquilo — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto esencial", detail: "El centro del pueblo es caminable, pero la vida diaria genuinamente asume un auto para cualquier cosa más allá." },
          airportAccess: { value: "~1.5–2 horas de Mérida", detail: "Un viaje real por carreteras del interior — no un salto corto." },
          climate: { value: "Caluroso, calor seco tierra adentro", detail: "Clima interior de la región Puuc — sin brisa marina, similar al de Santa Elena." },
          community: { value: "Local, agrícola, presencia extranjera mínima", detail: "Un pueblo de trabajo genuinamente local — este no es un destino con una comunidad de extranjeros existente." },
        },
        monthlyBudget: {
          housing: "$200–$450", groceries: "$140–$240", dining: "$60–$140", transportation: "$40–$90", utilities: "$45–$95", internet: "$30–$70",
          estimatedTotal: "$350–$800",
          note: "Estimación direccional, no son datos locales verificados — entre las estimaciones de costo de vida más bajas de este sitio, reflejando la infraestructura turística mínima y el carácter de pueblo de trabajo de Tekax.",
        },
        neighborhoods: [
          { name: "Centro Del Pueblo", description: "Las calles alrededor del mercado y la iglesia principal de Tekax — la parte más caminable y comunitaria del pueblo.", bestFor: "Personas que quieren estar dentro de la vida diaria real del pueblo.", tradeoff: "Muy pocas comodidades más allá de lo que un pequeño pueblo de trabajo genuinamente ofrece." },
          { name: "Periferia / Borde Agrícola", description: "Los bordes del pueblo donde comienza la tierra agrícola.", bestFor: "Personas que quieren más espacio y no les importa la distancia del centro del pueblo.", tradeoff: "Aún menos acceso inmediato a los servicios locales que existen." },
        ],
        pros: ["El pueblo más genuinamente local y menos moldeado por el turismo que cubre este sitio", "Costo de vida muy bajo en relación con Mérida o la costa", "Vida agrícola yucateca real y ordinaria, no una versión curada de ella"],
        tradeoffs: ["Esencialmente sin comunidad de extranjeros ni apoyo en inglés", "Salud local mínima — un viaje real a Mérida para cualquier cosa seria", "Confiabilidad de internet muy limitada — prueba a fondo antes de confiar en ella"],
        realEstate: {
          overview: "Un mercado muy pequeño y limitado de casas tradicionales — rotación mínima, infraestructura local mínima para respaldar una compra, y esencialmente ninguna actividad de compradores extranjeros hasta la fecha.",
          considerations: ["Tierra adentro, por lo que el requisito costero de fideicomiso bancario no aplica automáticamente — confirma las reglas actuales para tu propiedad específica con un notario mexicano de todos modos.", "Con esencialmente ningún mercado de compradores extranjeros existente aquí, espera depender fuertemente de profesionales locales y tu propia investigación en español."],
        },
        investmentOutlook: {
          intro: "Tekax es un pueblo agrícola de trabajo sin mercado turístico ni de compradores extranjeros del que hablar — trata con escepticismo significativo cualquier presentación de este lugar como una oportunidad de inversión.",
          considerations: ["Los servicios mínimos y la falta de infraestructura extranjera de este pueblo son realidades estructurales y actuales, no una oportunidad en etapa temprana.", "La idoneidad depende enteramente de querer genuinamente la versión más local y autosuficiente de la vida de la región Puuc en este sitio."],
        },
        faq: [
          { question: "¿Es seguro vivir en Tekax?", answer: "Un pueblo de trabajo tranquilo. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Hay una comunidad de extranjeros en Tekax?", answer: "Esencialmente ninguna — este es un pueblo genuinamente local, no un destino emergente para extranjeros, y el español es genuinamente necesario aquí." },
          { question: "¿Qué tan lejos está Tekax de la atención médica?", answer: "Solo clínicas básicas localmente — cualquier cosa seria significa un viaje de aproximadamente 1.5–2 horas a Mérida." },
          { question: "¿Es bueno Tekax para trabajo remoto?", answer: "El internet es básico e inconsistente — prueba tu dirección específica a fondo antes de confiar en él; este no es un pueblo construido alrededor de infraestructura de trabajo remoto." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 1, note: { en: "Basic and limited — test your specific address thoroughly before relying on it.", es: "Básico y limitado — prueba tu dirección específica a fondo antes de confiar en ella." } },
        healthcare: { score: 1, note: { en: "Basic clinics only; anything serious means a significant drive to Mérida.", es: "Solo clínicas básicas; cualquier cosa seria significa un viaje considerable a Mérida." } },
        community: { score: 1, note: { en: "Essentially no foreign or remote-work community — a genuinely local town.", es: "Esencialmente sin comunidad extranjera o de trabajo remoto — un pueblo genuinamente local." } },
        livability: { score: 4, note: { en: "Among the lowest costs of living on this site, with correspondingly minimal services.", es: "Entre los costos de vida más bajos de este sitio, con servicios correspondientemente mínimos." } },
        readiness: { score: 1, note: { en: "The least newcomer-oriented destination on this site — genuine self-sufficiency is required.", es: "El destino menos orientado a recién llegados de este sitio — se requiere autosuficiencia genuina." } },
      },
    },
  },

  tizimin: {
    heroImage: "/regions/tizimin/tizimin-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A working cattle-ranching hub in the state's north — practical rather than picturesque, and the real supply town for the coast nearby.", es: "Un centro ganadero activo en el norte del estado — práctico más que pintoresco, y el verdadero pueblo de abastecimiento para la costa cercana." },
    heroAlt: {
      en: "A quiet street in Tizimín with its colonial church and ranching-town character",
      es: "Una tranquila calle en Tizimín con su iglesia colonial y carácter de pueblo ganadero",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Tizimín tends to fit people who want a genuinely practical, working regional hub rather than a picturesque destination — the state's cattle-ranching center, and the real supply town for El Cuyo and Río Lagartos nearby.",
          reasonsByTag: {
            quiet: "You want quiet over noise, and Tizimín's working-town character means real daily life, not a curated small-town experience.",
            budgetConscious: "You're being realistic about budget, and Tizimín's practical, non-tourist character keeps costs genuinely low.",
            family: "You're thinking about this as a family, and Tizimín has more real regional infrastructure (schools, markets, services) than the smaller coastal towns it supplies.",
            remote: "You want real distance from the tourist map, and Tizimín is a practical regional hub, not a destination — genuinely off the map most visitors ever see.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The town's market and ranching-supply businesses are already busy — this is a working hub, and its energy is commercial, not touristic." },
          { time: "Afternoon", vignette: "Errands here cover more ground than in the smaller coastal towns nearby — Tizimín is where people from El Cuyo and Río Lagartos actually come for bigger shopping trips." },
          { time: "Evening", vignette: "The town settles into an ordinary regional-hub evening — family life, local restaurants, nothing built for outside visitors." },
        ],
        honestTruth: {
          intro: "Tizimín's practicality is real, and so is its lack of any scenic or tourism identity.",
          points: [
            "This is a working regional hub, not a picturesque destination — don't come expecting colonial charm on the level of Valladolid or Izamal.",
            "There is essentially no expat or remote-work community here — daily life assumes Spanish and genuine local integration.",
            "Anything beyond routine care means a real drive to Mérida, roughly 2 hours away.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Practical, working-town pace", detail: "A real regional commercial hub, not a leisurely small-town rhythm." },
          walkability: { value: "Walkable center, car for the region", detail: "The town center is walkable; a car is genuinely necessary for the wider region it serves." },
          internet: { value: "Moderate, more developed than the smaller coastal towns", detail: "As a regional hub, infrastructure here is generally better than El Cuyo or Río Lagartos, though still less than Mérida's." },
          healthcare: { value: "Regional hub for the area, Mérida for anything major", detail: "The area's own healthcare hub for El Cuyo and Río Lagartos, though serious care still means Mérida." },
          safety: { value: "Generally calm, standard precautions", detail: "A practical working town — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car essential", detail: "As a regional supply hub, daily life here genuinely assumes a car." },
          airportAccess: { value: "~2 hours from Mérida International", detail: "A genuine inland drive — this is not a coastal or quick-access location." },
          climate: { value: "Hot, dry inland heat", detail: "Northern Yucatán inland climate — less humid than the Gulf coast, no sea breeze." },
          community: { value: "Local, ranching and agricultural", detail: "A genuinely local working community — no meaningful foreign-resident presence." },
        },
        monthlyBudget: {
          housing: "$220–$480", groceries: "$150–$260", dining: "$70–$160", transportation: "$45–$100", utilities: "$50–$100", internet: "$35–$75",
          estimatedTotal: "$400–$900",
          note: "Directional estimate, not verified local data — among the lower cost-of-living estimates on this site, reflecting Tizimín's practical, non-tourist character.",
        },
        neighborhoods: [
          { name: "Centro", description: "The town center around its colonial church and main market — the commercial and civic heart of the region.", bestFor: "People who want to be close to the town's real services and market.", tradeoff: "A working town center, not a curated tourist plaza." },
          { name: "Outer Residential Streets", description: "Ordinary residential neighborhoods a short distance from the center.", bestFor: "Families wanting a genuine, affordable residential base.", tradeoff: "A drive to reach the town's own center and services." },
        ],
        pros: ["Real regional infrastructure (schools, markets, healthcare) serving a wider area", "Very low cost of living relative to Mérida or the coast", "A genuinely practical, working town — no tourism pretense"],
        tradeoffs: ["No scenic or colonial-tourism identity — a working hub, not a destination", "Essentially no expat or remote-work community", "Anything beyond routine healthcare means the drive to Mérida"],
        realEstate: {
          overview: "A small, practical market of ordinary homes serving the local ranching and regional-hub population — minimal foreign-buyer activity, minimal tourism-driven pricing.",
          considerations: ["Inland, so the coastal fideicomiso (bank trust) requirement does not automatically apply — confirm current rules for your specific property with a Mexican notary regardless.", "With no established foreign-buyer market, expect to rely on local professionals and your own Spanish-language research for any purchase."],
        },
        investmentOutlook: {
          intro: "Tizimín is a practical regional hub tied to ranching and agriculture, not a tourism or growth market — treat any investment framing here with real skepticism.",
          considerations: ["This town's role as a working supply hub for the smaller coastal towns nearby is its actual, structural identity, not an early-stage opportunity.", "Suitability depends on wanting a practical, affordable regional base, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Tizimín safe to live in?", answer: "A practical working town. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Is Tizimín a tourist destination?", answer: "No — it's a working regional hub for ranching and agriculture, and the real supply town for El Cuyo and Río Lagartos nearby, not a scenic destination itself." },
          { question: "Is there an expat community in Tizimín?", answer: "Essentially none — daily life here assumes Spanish and genuine local integration." },
          { question: "How far is Tizimín from Mérida?", answer: "Roughly 2 hours by road — a genuine inland drive, not a quick trip." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Tizimín suele encajar con personas que quieren un centro regional genuinamente práctico en lugar de un destino pintoresco — el centro ganadero del estado, y el pueblo de abastecimiento real para El Cuyo y Río Lagartos cercanos.",
          reasonsByTag: {
            quiet: "Quieres tranquilidad sobre el ruido, y el carácter de pueblo de trabajo de Tizimín significa vida diaria real, no una experiencia curada de pueblo pequeño.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y el carácter práctico y no turístico de Tizimín mantiene los costos genuinamente bajos.",
            family: "Estás pensando en esto como familia, y Tizimín tiene más infraestructura regional real (escuelas, mercados, servicios) que los pueblos costeros más pequeños a los que abastece.",
            remote: "Quieres distancia real del mapa turístico, y Tizimín es un centro regional práctico, no un destino — genuinamente fuera del mapa que la mayoría de los visitantes ven.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "El mercado del pueblo y los negocios de suministros ganaderos ya están ocupados — este es un centro de trabajo, y su energía es comercial, no turística." },
          { time: "Tarde", vignette: "Los mandados aquí cubren más terreno que en los pueblos costeros más pequeños cercanos — Tizimín es donde la gente de El Cuyo y Río Lagartos realmente viene para compras más grandes." },
          { time: "Noche", vignette: "El pueblo se asienta en una noche ordinaria de centro regional — vida familiar, restaurantes locales, nada construido para visitantes externos." },
        ],
        honestTruth: {
          intro: "La practicidad de Tizimín es real, y también lo es su falta de identidad pintoresca o turística.",
          points: [
            "Este es un centro regional de trabajo, no un destino pintoresco — no vengas esperando el encanto colonial al nivel de Valladolid o Izamal.",
            "Esencialmente no hay comunidad de extranjeros ni de trabajo remoto aquí — la vida diaria asume español e integración local genuina.",
            "Cualquier cosa más allá de la atención de rutina significa un viaje real a Mérida, a aproximadamente 2 horas.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Ritmo práctico de pueblo de trabajo", detail: "Un centro comercial regional real, no un ritmo pausado de pueblo pequeño." },
          walkability: { value: "Centro caminable, auto para la región", detail: "El centro del pueblo es caminable; un auto es genuinamente necesario para la región más amplia a la que sirve." },
          internet: { value: "Moderado, más desarrollado que los pueblos costeros más pequeños", detail: "Como centro regional, la infraestructura aquí es generalmente mejor que en El Cuyo o Río Lagartos, aunque aún menor que la de Mérida." },
          healthcare: { value: "Centro regional para el área, Mérida para algo mayor", detail: "El centro de salud propio del área para El Cuyo y Río Lagartos, aunque la atención seria sigue significando Mérida." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo práctico de trabajo — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto esencial", detail: "Como centro regional de abastecimiento, la vida diaria aquí genuinamente asume un auto." },
          airportAccess: { value: "~2 horas de Mérida", detail: "Un viaje real tierra adentro — esta no es una ubicación costera o de acceso rápido." },
          climate: { value: "Caluroso, calor seco tierra adentro", detail: "Clima interior del norte de Yucatán — menos húmedo que la costa del Golfo, sin brisa marina." },
          community: { value: "Local, ganadera y agrícola", detail: "Una comunidad de trabajo genuinamente local — sin presencia significativa de residentes extranjeros." },
        },
        monthlyBudget: {
          housing: "$220–$480", groceries: "$150–$260", dining: "$70–$160", transportation: "$45–$100", utilities: "$50–$100", internet: "$35–$75",
          estimatedTotal: "$400–$900",
          note: "Estimación direccional, no son datos locales verificados — entre las estimaciones de costo de vida más bajas de este sitio, reflejando el carácter práctico y no turístico de Tizimín.",
        },
        neighborhoods: [
          { name: "Centro", description: "El centro del pueblo alrededor de su iglesia colonial y mercado principal — el corazón comercial y cívico de la región.", bestFor: "Personas que quieren estar cerca de los servicios y el mercado real del pueblo.", tradeoff: "Un centro de pueblo de trabajo, no una plaza turística curada." },
          { name: "Calles Residenciales Exteriores", description: "Vecindarios residenciales ordinarios a poca distancia del centro.", bestFor: "Familias que quieren una base residencial genuina y accesible.", tradeoff: "Un viaje para llegar al centro y los servicios del propio pueblo." },
        ],
        pros: ["Infraestructura regional real (escuelas, mercados, salud) que sirve a un área más amplia", "Costo de vida muy bajo en relación con Mérida o la costa", "Un pueblo genuinamente práctico y de trabajo — sin pretensión turística"],
        tradeoffs: ["Sin identidad pintoresca o de turismo colonial — un centro de trabajo, no un destino", "Esencialmente sin comunidad de extranjeros o de trabajo remoto", "Cualquier cosa más allá de la atención médica de rutina significa el viaje a Mérida"],
        realEstate: {
          overview: "Un mercado pequeño y práctico de casas ordinarias que sirve a la población ganadera y de centro regional local — actividad mínima de compradores extranjeros, precios mínimos impulsados por el turismo.",
          considerations: ["Tierra adentro, por lo que el requisito costero de fideicomiso bancario no aplica automáticamente — confirma las reglas actuales para tu propiedad específica con un notario mexicano de todos modos.", "Sin un mercado establecido de compradores extranjeros, espera depender de profesionales locales y tu propia investigación en español para cualquier compra."],
        },
        investmentOutlook: {
          intro: "Tizimín es un centro regional práctico ligado a la ganadería y la agricultura, no un mercado turístico o de crecimiento — trata con verdadero escepticismo cualquier presentación de inversión aquí.",
          considerations: ["El papel de este pueblo como centro de abastecimiento de trabajo para los pueblos costeros más pequeños cercanos es su identidad real y estructural, no una oportunidad en etapa temprana.", "La idoneidad depende de querer una base regional práctica y accesible, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Tizimín?", answer: "Un pueblo práctico de trabajo. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Es Tizimín un destino turístico?", answer: "No — es un centro regional de trabajo para la ganadería y la agricultura, y el pueblo de abastecimiento real para El Cuyo y Río Lagartos cercanos, no un destino pintoresco en sí mismo." },
          { question: "¿Hay una comunidad de extranjeros en Tizimín?", answer: "Esencialmente ninguna — la vida diaria aquí asume español e integración local genuina." },
          { question: "¿Qué tan lejos está Tizimín de Mérida?", answer: "Aproximadamente 2 horas por carretera — un viaje real tierra adentro, no una salida rápida." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "More developed than El Cuyo or Río Lagartos as a regional hub, though still less than Mérida's.", es: "Más desarrollado que El Cuyo o Río Lagartos como centro regional, aunque aún menor que el de Mérida." } },
        healthcare: { score: 2, note: { en: "The area's own healthcare hub for El Cuyo and Río Lagartos, though serious care still means Mérida.", es: "El centro de salud propio del área para El Cuyo y Río Lagartos, aunque la atención seria sigue significando Mérida." } },
        community: { score: 1, note: { en: "A genuinely local working community — no meaningful foreign-resident presence.", es: "Una comunidad de trabajo genuinamente local — sin presencia significativa de residentes extranjeros." } },
        livability: { score: 4, note: { en: "Among the lower costs of living on this site, reflecting its practical, non-tourist character.", es: "Entre los costos de vida más bajos de este sitio, reflejando su carácter práctico y no turístico." } },
        readiness: { score: 2, note: { en: "A practical regional hub, but not built around newcomer orientation.", es: "Un centro regional práctico, pero no construido alrededor de la orientación a recién llegados." } },
      },
    },
  },

  chelem: {
    heroImage: "/regions/chelem/chelem-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A small, quiet beach community just west of Progreso — a slower, more residential alternative on the same stretch of Gulf coast.", es: "Una pequeña y tranquila comunidad de playa justo al oeste de Progreso — una alternativa más lenta y residencial en el mismo tramo de costa del Golfo." },
    heroAlt: {
      en: "A quiet residential beach street in Chelem on the Yucatán Gulf coast",
      es: "Una tranquila calle residencial de playa en Chelem, en la costa del Golfo de Yucatán",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Chelem tends to fit people who want Progreso's Gulf coast access with a genuinely quieter, more residential character — a small beach community just west of Progreso, not its own separate destination identity.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Chelem sits on the same open Gulf coastline as Progreso, with far less of its weekend crowd.",
            quiet: "You want quiet over noise, and Chelem's small, residential character is a genuine step down in pace from Progreso itself.",
            budgetConscious: "You're being realistic about budget, and Chelem generally costs less than Progreso while staying close to its services.",
            family: "You're thinking about this as a family, and Chelem's calm, residential beach setting suits everyday family life.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The beach here is quieter than Progreso's malecón, and a morning walk feels genuinely residential — this is where people live, not where visitors gather." },
          { time: "Afternoon", vignette: "A short drive into Progreso covers groceries and most other errands — close enough that it barely registers as a trip." },
          { time: "Evening", vignette: "Dinner is simple, with the Gulf breeze coming through the windows — the loudest thing most nights is the surf." },
        ],
        honestTruth: {
          intro: "Chelem's quiet is genuine, and it comes with a genuinely small town's limitations.",
          points: [
            "Local services are limited — expect to rely on Progreso for most day-to-day needs.",
            "Internet infrastructure is less consistent than Progreso's — test your specific address before relying on it.",
            "This is quiet by design, not by accident — if you want Progreso's social scene, Chelem is a deliberate step away from that.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Quiet and residential", detail: "A calmer, more everyday version of Gulf coast beach living than Progreso." },
          walkability: { value: "Small and walkable", detail: "The town itself is small enough to walk most places, though options are limited." },
          internet: { value: "More limited than Progreso", detail: "Worth testing your specific address before committing to remote work here." },
          healthcare: { value: "Relies on Progreso and Mérida", detail: "Minimal local services; everyday needs mean a short drive, serious care means Mérida." },
          safety: { value: "Generally calm, standard precautions", detail: "A small residential beach community — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car recommended", detail: "The town itself is walkable, but daily life leans on a car for Progreso and Mérida trips." },
          airportAccess: { value: "Via Progreso to Mérida", detail: "The coastal road connects through Progreso onto the same highway into Mérida." },
          climate: { value: "Open Gulf breeze", detail: "The same coastal climate as Progreso, with a quieter, more residential shoreline." },
          community: { value: "Small and settled", detail: "A modest, low-key residential presence rather than a growing scene." },
        },
        monthlyBudget: {
          housing: "$280–$600", groceries: "$180–$300", dining: "$90–$200", transportation: "$40–$90", utilities: "$55–$120", internet: "$35–$75",
          estimatedTotal: "$480–$1,050",
          note: "Directional estimate, not verified local data — generally comparable to or slightly below Chicxulub Puerto's costs, reflecting Chelem's similar small-scale, Progreso-adjacent position.",
        },
        neighborhoods: [
          { name: "Coastal Chelem", description: "The residential streets closest to the beach — modest homes and everyday Gulf coast life.", bestFor: "People who want to be steps from the water without Progreso's pace.", tradeoff: "Very few amenities on-site — plan around trips into Progreso." },
          { name: "Inland Chelem", description: "A few streets back from the coast, slightly more affordable, still a short walk to the beach.", bestFor: "Budget-conscious movers who still want easy beach access.", tradeoff: "Marginally less of the direct coastal feel." },
        ],
        pros: ["Genuinely quieter than Progreso, without losing easy access to it", "Residential, everyday beach living rather than a tourist scene", "Still close enough to Mérida for hospitals and city services"],
        tradeoffs: ["Limited local services — real dependence on Progreso and Mérida", "Less consistent internet than Progreso itself", "A small, low-key community, not a large or fast-growing one"],
        realEstate: {
          overview: "A small market of mostly standalone beach homes, similar in scale to Chicxulub Puerto — fewer listings and less competition than Progreso, but also less choice.",
          considerations: ["As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.", "With fewer local services, verify water and internet reliability for a specific property directly rather than assuming Progreso's infrastructure extends here."],
        },
        investmentOutlook: {
          intro: "Chelem's appeal is quiet, residential living next to Progreso's services — not a growth story of its own.",
          considerations: ["Development pressure here is modest and largely follows Progreso's own growth rather than happening independently.", "Suitability depends on wanting Progreso's access without its weekend crowds, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Chelem safe to live in?", answer: "A quiet, residential beach community. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "How far is Chelem from Progreso?", answer: "A short drive — close enough that most residents treat Progreso as their local town for groceries and errands." },
          { question: "Is the internet reliable in Chelem?", answer: "Less consistent than Progreso — test your specific address before relying on it for remote work." },
          { question: "How far is the international airport?", answer: "Via Progreso onto the same coastal highway into Mérida — a comfortable, direct drive." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Chelem suele encajar con personas que quieren el acceso a la costa del Golfo de Progreso con un carácter genuinamente más tranquilo y residencial — una pequeña comunidad de playa justo al oeste de Progreso, no una identidad de destino separada propia.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y Chelem está en la misma costa abierta del Golfo que Progreso, con mucho menos de su multitud de fin de semana.",
            quiet: "Quieres tranquilidad sobre el ruido, y el carácter pequeño y residencial de Chelem es un paso genuino hacia un ritmo más calmado que el propio Progreso.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y Chelem generalmente cuesta menos que Progreso mientras se mantiene cerca de sus servicios.",
            family: "Estás pensando en esto como familia, y el entorno de playa calmado y residencial de Chelem se adapta a la vida familiar cotidiana.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "La playa aquí es más tranquila que el malecón de Progreso, y una caminata matutina se siente genuinamente residencial — aquí es donde vive la gente, no donde se reúnen los visitantes." },
          { time: "Tarde", vignette: "Un corto viaje a Progreso cubre las compras y la mayoría de los demás mandados — lo bastante cerca como para apenas registrarse como un viaje." },
          { time: "Noche", vignette: "La cena es sencilla, con la brisa del Golfo entrando por las ventanas — lo más ruidoso la mayoría de las noches es el oleaje." },
        ],
        honestTruth: {
          intro: "La tranquilidad de Chelem es genuina, y viene con las limitaciones de un pueblo genuinamente pequeño.",
          points: [
            "Los servicios locales son limitados — espera depender de Progreso para la mayoría de las necesidades cotidianas.",
            "La infraestructura de internet es menos consistente que la de Progreso — prueba tu dirección específica antes de confiar en ella.",
            "Esto es tranquilo por diseño, no por accidente — si quieres la escena social de Progreso, Chelem es un paso deliberado alejado de eso.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Tranquilo y residencial", detail: "Una versión más calmada y cotidiana de la vida de playa en la costa del Golfo que Progreso." },
          walkability: { value: "Pequeño y caminable", detail: "El pueblo en sí es lo bastante pequeño para caminar a la mayoría de los lugares, aunque las opciones son limitadas." },
          internet: { value: "Más limitado que Progreso", detail: "Vale la pena probar tu dirección específica antes de comprometerte con trabajo remoto aquí." },
          healthcare: { value: "Depende de Progreso y Mérida", detail: "Servicios locales mínimos; las necesidades cotidianas significan un corto viaje, la atención seria significa Mérida." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Una pequeña comunidad residencial de playa — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto recomendado", detail: "El pueblo en sí es caminable, pero la vida diaria depende de un auto para viajes a Progreso y Mérida." },
          airportAccess: { value: "Vía Progreso a Mérida", detail: "El camino costero conecta a través de Progreso con la misma carretera hacia Mérida." },
          climate: { value: "Brisa abierta del Golfo", detail: "El mismo clima costero que Progreso, con una costa más tranquila y residencial." },
          community: { value: "Pequeña y asentada", detail: "Una presencia residencial modesta y discreta en lugar de una escena creciente." },
        },
        monthlyBudget: {
          housing: "$280–$600", groceries: "$180–$300", dining: "$90–$200", transportation: "$40–$90", utilities: "$55–$120", internet: "$35–$75",
          estimatedTotal: "$480–$1,050",
          note: "Estimación direccional, no son datos locales verificados — generalmente comparable o ligeramente por debajo de los costos de Chicxulub Puerto, reflejando la posición similar de pequeña escala de Chelem cerca de Progreso.",
        },
        neighborhoods: [
          { name: "Chelem Costero", description: "Las calles residenciales más cercanas a la playa — casas modestas y vida cotidiana en la costa del Golfo.", bestFor: "Personas que quieren estar a pasos del agua sin el ritmo de Progreso.", tradeoff: "Muy pocas comodidades en el lugar — planea en torno a viajes a Progreso." },
          { name: "Chelem Interior", description: "Unas cuadras tierra adentro desde la costa, ligeramente más accesible, aún a una corta caminata de la playa.", bestFor: "Personas con presupuesto limitado que aún quieren fácil acceso a la playa.", tradeoff: "Marginalmente menos de la sensación costera directa." },
        ],
        pros: ["Genuinamente más tranquilo que Progreso, sin perder el fácil acceso a él", "Vida de playa residencial y cotidiana en lugar de una escena turística", "Aún lo bastante cerca de Mérida para hospitales y servicios de ciudad"],
        tradeoffs: ["Servicios locales limitados — dependencia real de Progreso y Mérida", "Internet menos consistente que el propio Progreso", "Una comunidad pequeña y discreta, no una grande o de rápido crecimiento"],
        realEstate: {
          overview: "Un mercado pequeño de casas de playa mayormente independientes, similar en escala a Chicxulub Puerto — menos listados y competencia que Progreso, pero también menos opciones.",
          considerations: ["Como propiedad costera, la propiedad extranjera típicamente funciona a través de un fideicomiso bancario — confirma los requisitos actuales con un notario mexicano.", "Con menos servicios locales, verifica la confiabilidad del agua e internet de una propiedad específica directamente en lugar de asumir que la infraestructura de Progreso se extiende aquí."],
        },
        investmentOutlook: {
          intro: "El atractivo de Chelem es la vida residencial y tranquila junto a los servicios de Progreso — no una historia de crecimiento propia.",
          considerations: ["La presión de desarrollo aquí es modesta y en gran medida sigue el propio crecimiento de Progreso en lugar de ocurrir de forma independiente.", "La idoneidad depende de querer el acceso de Progreso sin sus multitudes de fin de semana, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Chelem?", answer: "Una comunidad de playa tranquila y residencial. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Qué tan lejos está Chelem de Progreso?", answer: "Un corto viaje — lo bastante cerca como para que la mayoría de los residentes traten a Progreso como su pueblo local para compras y mandados." },
          { question: "¿Es confiable el internet en Chelem?", answer: "Menos consistente que Progreso — prueba tu dirección específica antes de confiar en él para trabajo remoto." },
          { question: "¿Qué tan lejos está el aeropuerto internacional?", answer: "Vía Progreso hacia la misma carretera costera a Mérida — un viaje cómodo y directo." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 3, note: { en: "Worth testing your specific address before committing to remote work here.", es: "Vale la pena probar tu dirección específica antes de comprometerte con trabajo remoto aquí." } },
        healthcare: { score: 2, note: { en: "Minimal local services; everyday needs mean a short drive, serious care means Mérida.", es: "Servicios locales mínimos; las necesidades cotidianas significan un corto viaje, la atención seria significa Mérida." } },
        community: { score: 3, note: { en: "A modest, low-key residential presence rather than a growing scene.", es: "Una presencia residencial modesta y discreta en lugar de una escena creciente." } },
        livability: { score: 4, note: { en: "Genuinely quieter than Progreso, with a lower cost of living to match.", es: "Genuinamente más tranquilo que Progreso, con un menor costo de vida acorde." } },
        readiness: { score: 3, note: { en: "Close enough to Progreso and Mérida to lean on both for what this town doesn't have.", es: "Lo bastante cerca de Progreso y Mérida para depender de ambos por lo que este pueblo no tiene." } },
      },
    },
  },

  "chuburna-puerto": {
    heroImage: "/regions/chuburna-puerto/chuburna-puerto-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A quiet Gulf beach town further west of Progreso, with fewer services and a genuinely slower, more local pace.", es: "Un tranquilo pueblo de playa del Golfo más al oeste de Progreso, con menos servicios y un ritmo genuinamente más lento y local." },
    heroAlt: {
      en: "A quiet Gulf coast beach at Chuburná Puerto with fishing boats offshore",
      es: "Una tranquila playa de la costa del Golfo en Chuburná Puerto con barcos pesqueros mar adentro",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Chuburná Puerto tends to fit people who want a genuinely quieter, more local step beyond Chelem and Progreso — a small Gulf coast fishing town with fewer services but real, everyday character.",
          reasonsByTag: {
            beach: "Beach life matters to you, and Chuburná Puerto's open Gulf coastline is a genuinely quieter version of the same coast Progreso sits on.",
            quiet: "You want quiet over noise, and this town sits further from Progreso's weekend crowds than Chelem does.",
            remote: "You want real distance from a busier town without leaving the Gulf coast corridor entirely, and Chuburná Puerto delivers that while staying within reach of Progreso and Mérida.",
            budgetConscious: "You're being realistic about budget, and this town's smaller scale generally keeps costs low relative to Progreso.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The fishing fleet is often the only real activity on the water this early, and a beach walk here feels genuinely local, not touristic." },
          { time: "Afternoon", vignette: "Errands mean a real drive to Progreso or further to Mérida — this town's own services cover only the basics." },
          { time: "Evening", vignette: "The Gulf breeze and the quiet are the evening's whole entertainment — this is a genuinely small fishing town, not a resort in miniature." },
        ],
        honestTruth: {
          intro: "Chuburná Puerto's quiet is real, and its limited services are real too.",
          points: [
            "Local services are more limited than Chelem's — expect a real drive to Progreso for most things beyond the basics.",
            "Internet infrastructure is less consistent here than closer to Progreso — test your specific address before relying on it.",
            "This is a genuine fishing town, not a curated small-town experience — infrastructure reflects that.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Quiet and local", detail: "A genuinely slower pace than Chelem, further removed from Progreso's weekend crowds." },
          walkability: { value: "Small, car-recommended", detail: "The town itself is walkable, but reaching anything beyond it means driving." },
          internet: { value: "Limited, less developed than Chelem", detail: "Reliability varies by address — test thoroughly before relying on it for remote work." },
          healthcare: { value: "Relies on Progreso and Mérida", detail: "Minimal local services; everyday needs mean a real drive, serious care means Mérida." },
          safety: { value: "Generally calm, standard precautions", detail: "A small fishing town — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car essential", detail: "The town itself is walkable, but daily life genuinely assumes a car for Progreso and Mérida trips." },
          airportAccess: { value: "Via Progreso to Mérida", detail: "A longer coastal drive than Chelem's, connecting through Progreso onto the highway into Mérida." },
          climate: { value: "Open Gulf breeze", detail: "The same coastal climate as the rest of this stretch of Gulf coast." },
          community: { value: "Small and local", detail: "A genuine fishing-town community, smaller and more local than Chelem or Progreso." },
        },
        monthlyBudget: {
          housing: "$250–$550", groceries: "$170–$290", dining: "$80–$180", transportation: "$40–$95", utilities: "$50–$110", internet: "$35–$75",
          estimatedTotal: "$450–$1,000",
          note: "Directional estimate, not verified local data — generally comparable to or slightly below Chelem and Telchac Puerto's costs, reflecting this town's smaller, more remote position on the same coast.",
        },
        neighborhoods: [
          { name: "Along The Waterfront", description: "The streets closest to the working port — modest homes, the fishing fleet, the town's real center of gravity.", bestFor: "People who want to live inside the town's actual working identity.", tradeoff: "Very few amenities on-site — plan around trips into Progreso." },
          { name: "Inland Chuburná Puerto", description: "A few streets back from the water, slightly more affordable.", bestFor: "Budget-conscious movers who still want to be close to the coast.", tradeoff: "Marginally less of the direct waterfront feel." },
        ],
        pros: ["Genuinely quieter and more local than Chelem or Progreso", "A real, working fishing-town character, not a tourism construction", "Low cost of living relative to the more developed Gulf towns"],
        tradeoffs: ["More limited local services than Chelem — real dependence on Progreso", "Less consistent internet than towns closer to Progreso", "A small foreign community, essentially none beyond the occasional resident"],
        realEstate: {
          overview: "A very small market of modest homes near the working port — limited listings, limited local infrastructure, and no significant new construction.",
          considerations: ["As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.", "With minimal local services, verify water and internet reliability for a specific property directly rather than assuming nearby towns' infrastructure extends here."],
        },
        investmentOutlook: {
          intro: "Chuburná Puerto is a small working fishing town, not a growth market — treat any framing of it as an emerging opportunity with real skepticism.",
          considerations: ["This town's remoteness relative to Progreso and its modest services are current, structural realities, not gaps waiting to close.", "Suitability depends on genuinely wanting the quietest, most local version of this stretch of Gulf coast, not on any prediction about future value."],
        },
        faq: [
          { question: "Is Chuburná Puerto safe to live in?", answer: "A small fishing town. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "How far is Chuburná Puerto from Progreso?", answer: "Further than Chelem — a real drive, though still within reach for regular errands." },
          { question: "Is Chuburná Puerto good for remote work?", answer: "Internet is less developed than Chelem's — test your specific address thoroughly before relying on it." },
          { question: "Is there an expat community here?", answer: "Very minimal — this is a genuinely local fishing-town community, smaller and more local than Chelem or Progreso." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Chuburná Puerto suele encajar con personas que quieren un paso genuinamente más tranquilo y local más allá de Chelem y Progreso — un pequeño pueblo pesquero de la costa del Golfo con menos servicios pero carácter real y cotidiano.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y la costa abierta del Golfo en Chuburná Puerto es una versión genuinamente más tranquila de la misma costa donde está Progreso.",
            quiet: "Quieres tranquilidad sobre el ruido, y este pueblo está más alejado de las multitudes de fin de semana de Progreso que Chelem.",
            remote: "Quieres distancia real de un pueblo más ocupado sin dejar por completo el corredor de la costa del Golfo, y Chuburná Puerto ofrece eso mientras se mantiene al alcance de Progreso y Mérida.",
            budgetConscious: "Estás siendo realista sobre el presupuesto, y la escala más pequeña de este pueblo generalmente mantiene los costos bajos en relación con Progreso.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "La flota pesquera suele ser la única actividad real en el agua a esta hora, y una caminata por la playa aquí se siente genuinamente local, no turística." },
          { time: "Tarde", vignette: "Los mandados significan un viaje real a Progreso o más lejos a Mérida — los servicios propios de este pueblo cubren solo lo básico." },
          { time: "Noche", vignette: "La brisa del Golfo y la tranquilidad son todo el entretenimiento de la noche — este es un pueblo pesquero genuinamente pequeño, no un resort en miniatura." },
        ],
        honestTruth: {
          intro: "La tranquilidad de Chuburná Puerto es real, y sus servicios limitados también lo son.",
          points: [
            "Los servicios locales son más limitados que los de Chelem — espera un viaje real a Progreso para la mayoría de las cosas más allá de lo básico.",
            "La infraestructura de internet es menos consistente aquí que más cerca de Progreso — prueba tu dirección específica antes de confiar en ella.",
            "Este es un pueblo pesquero genuino, no una experiencia curada de pueblo pequeño — la infraestructura refleja eso.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Tranquilo y local", detail: "Un ritmo genuinamente más lento que Chelem, más alejado de las multitudes de fin de semana de Progreso." },
          walkability: { value: "Pequeño, auto recomendado", detail: "El pueblo en sí es caminable, pero llegar a cualquier cosa más allá significa manejar." },
          internet: { value: "Limitado, menos desarrollado que Chelem", detail: "La confiabilidad varía según la dirección — prueba a fondo antes de confiar en él para trabajo remoto." },
          healthcare: { value: "Depende de Progreso y Mérida", detail: "Servicios locales mínimos; las necesidades cotidianas significan un viaje real, la atención seria significa Mérida." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pequeño pueblo pesquero — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto esencial", detail: "El pueblo en sí es caminable, pero la vida diaria genuinamente asume un auto para viajes a Progreso y Mérida." },
          airportAccess: { value: "Vía Progreso a Mérida", detail: "Un viaje costero más largo que el de Chelem, conectando a través de Progreso con la carretera hacia Mérida." },
          climate: { value: "Brisa abierta del Golfo", detail: "El mismo clima costero que el resto de este tramo de costa del Golfo." },
          community: { value: "Pequeña y local", detail: "Una comunidad genuina de pueblo pesquero, más pequeña y local que Chelem o Progreso." },
        },
        monthlyBudget: {
          housing: "$250–$550", groceries: "$170–$290", dining: "$80–$180", transportation: "$40–$95", utilities: "$50–$110", internet: "$35–$75",
          estimatedTotal: "$450–$1,000",
          note: "Estimación direccional, no son datos locales verificados — generalmente comparable o ligeramente por debajo de los costos de Chelem y Telchac Puerto, reflejando la posición más pequeña y remota de este pueblo en la misma costa.",
        },
        neighborhoods: [
          { name: "Junto Al Muelle", description: "Las calles más cercanas al puerto de trabajo — casas modestas, la flota pesquera, el verdadero centro de gravedad del pueblo.", bestFor: "Personas que quieren vivir dentro de la identidad de trabajo real del pueblo.", tradeoff: "Muy pocas comodidades en el lugar — planea en torno a viajes a Progreso." },
          { name: "Chuburná Puerto Interior", description: "Unas cuadras tierra adentro desde el agua, ligeramente más accesible.", bestFor: "Personas con presupuesto limitado que aún quieren estar cerca de la costa.", tradeoff: "Marginalmente menos de la sensación costera directa." },
        ],
        pros: ["Genuinamente más tranquilo y local que Chelem o Progreso", "Un carácter real de pueblo pesquero de trabajo, no una construcción turística", "Bajo costo de vida en relación con los pueblos del Golfo más desarrollados"],
        tradeoffs: ["Servicios locales más limitados que Chelem — dependencia real de Progreso", "Internet menos consistente que los pueblos más cercanos a Progreso", "Una comunidad extranjera pequeña, esencialmente ninguna más allá del residente ocasional"],
        realEstate: {
          overview: "Un mercado muy pequeño de casas modestas cerca del puerto de trabajo — listados limitados, infraestructura local limitada y sin construcción nueva significativa.",
          considerations: ["Como propiedad costera, la propiedad extranjera típicamente funciona a través de un fideicomiso bancario — confirma los requisitos actuales con un notario mexicano.", "Con servicios locales mínimos, verifica la confiabilidad del agua e internet de una propiedad específica directamente en lugar de asumir que la infraestructura de los pueblos cercanos se extiende aquí."],
        },
        investmentOutlook: {
          intro: "Chuburná Puerto es un pequeño pueblo pesquero de trabajo, no un mercado de crecimiento — trata con verdadero escepticismo cualquier presentación de este lugar como una oportunidad emergente.",
          considerations: ["El alejamiento de este pueblo respecto a Progreso y sus servicios modestos son realidades estructurales y actuales, no brechas por cerrarse.", "La idoneidad depende de querer genuinamente la versión más tranquila y local de este tramo de la costa del Golfo, no de ninguna predicción sobre el valor futuro."],
        },
        faq: [
          { question: "¿Es seguro vivir en Chuburná Puerto?", answer: "Un pequeño pueblo pesquero. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Qué tan lejos está Chuburná Puerto de Progreso?", answer: "Más lejos que Chelem — un viaje real, aunque aún al alcance para mandados regulares." },
          { question: "¿Es bueno Chuburná Puerto para trabajo remoto?", answer: "El internet está menos desarrollado que el de Chelem — prueba tu dirección específica a fondo antes de confiar en él." },
          { question: "¿Hay una comunidad de extranjeros aquí?", answer: "Muy mínima — esta es una comunidad de pueblo pesquero genuinamente local, más pequeña y local que Chelem o Progreso." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Less developed than Chelem — test your specific address thoroughly before relying on it.", es: "Menos desarrollado que Chelem — prueba tu dirección específica a fondo antes de confiar en ella." } },
        healthcare: { score: 2, note: { en: "Minimal local services; everyday needs mean a real drive, serious care means Mérida.", es: "Servicios locales mínimos; las necesidades cotidianas significan un viaje real, la atención seria significa Mérida." } },
        community: { score: 2, note: { en: "A genuine fishing-town community, smaller and more local than Chelem or Progreso.", es: "Una comunidad genuina de pueblo pesquero, más pequeña y local que Chelem o Progreso." } },
        livability: { score: 4, note: { en: "Comparable to or below Chelem and Telchac Puerto's costs, with real quiet to match.", es: "Comparable o por debajo de los costos de Chelem y Telchac Puerto, con tranquilidad real acorde." } },
        readiness: { score: 2, note: { en: "More self-sufficiency-demanding than Chelem, given more limited local services.", es: "Exige más autosuficiencia que Chelem, dados sus servicios locales más limitados." } },
      },
    },
  },

  "el-cuyo": {
    heroImage: "/regions/el-cuyo/el-cuyo-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A remote fishing village on the state's northern tip, drawing a small but growing wave of people who want unspoiled coast over convenience.", es: "Un remoto pueblo pesquero en la punta norte del estado, que atrae a una ola pequeña pero creciente de personas que prefieren una costa virgen antes que la conveniencia." },
    heroAlt: {
      en: "A quiet, undeveloped beach at El Cuyo on Yucatán's northern coast",
      es: "Una tranquila playa sin desarrollar en El Cuyo, en la costa norte de Yucatán",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "El Cuyo tends to fit people who want genuinely unspoiled northern coastline and are willing to trade convenience for it — a small fishing village that has drawn a growing, if still small, wave of outside interest without losing its working-village character.",
          reasonsByTag: {
            beach: "Beach life matters to you, and El Cuyo's long, undeveloped beach and kitesurfing conditions are the real draw here.",
            quiet: "You want quiet over noise, and this remains one of the least developed coastal destinations on this site, growing interest notwithstanding.",
            natureFirst: "Nature comes first for you, and El Cuyo sits at the edge of the Ría Lagartos biosphere reserve area, alongside genuine wildlife and open coastline.",
            exploratory: "You're still figuring out what fits, and El Cuyo rewards people willing to trade convenience for a real sense of discovery on an underdeveloped stretch of coast.",
            remote: "You want real distance from the main tourist corridor, and El Cuyo sits on the state's northern tip, hours from the Caribbean coast.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The beach is often empty except for kitesurfers taking advantage of the wind, and a walk along it means genuine solitude, not a curated quiet." },
          { time: "Afternoon", vignette: "Errands beyond the basics mean a real drive — this is a small, growing village, not a town with everything close by." },
          { time: "Evening", vignette: "The village is quiet after dark, genuinely so — El Cuyo's small, growing community hasn't brought nightlife with it, and most people here don't want it to." },
        ],
        honestTruth: {
          intro: "El Cuyo's unspoiled coastline is real, and it comes with real limitations.",
          points: [
            "Services and healthcare are minimal locally — this is one of the more remote destinations on this site, hours from a major hospital.",
            "Growing outside interest has visibly changed the village in recent years — treat it as an evolving, not a static, place.",
            "Internet and infrastructure are genuinely limited — test thoroughly before assuming remote work here will be seamless.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slow and remote, growing quietly", detail: "Among the least developed coastal destinations on this site, with a small but visible wave of new interest." },
          walkability: { value: "Small, walkable village core", detail: "The village itself is compact; anything beyond it means a real drive." },
          internet: { value: "Basic, developing", detail: "Coverage exists but is inconsistent — test your specific address thoroughly before relying on it." },
          healthcare: { value: "Minimal locally", detail: "Basic care only; anything serious means a significant drive to Mérida or Cancún." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, remote village — use normal travel-safety practices and verify current conditions before moving." },
          transportation: { value: "Car essential", detail: "The village is walkable, but this is a genuinely remote stretch of coast — a car matters for nearly everything else." },
          airportAccess: { value: "2.5–3 hours from Mérida or Cancún", detail: "Among the furthest destinations on this site from a major international airport." },
          climate: { value: "Warm & humid, strong coastal wind", detail: "Consistent wind conditions that draw kitesurfers, alongside the same Gulf-adjacent rainy season pattern." },
          community: { value: "Very small, growing steadily", detail: "A small fishing-village community with a modest but visibly growing wave of new residents in recent years." },
        },
        monthlyBudget: {
          housing: "$300–$650", groceries: "$180–$300", dining: "$90–$200", transportation: "$45–$100", utilities: "$50–$110", internet: "$35–$80",
          estimatedTotal: "$550–$1,150",
          note: "Directional estimate, not verified local data — reflects El Cuyo's small scale and remoteness, similar order of magnitude to El Cuyo's Hidden Gems neighbors on this site.",
        },
        neighborhoods: [
          { name: "El Malecón / Beachfront", description: "The streets closest to the beach and the village's small commercial strip.", bestFor: "People who want to be steps from the water and the kitesurfing conditions.", tradeoff: "The most visited part of a still genuinely small village." },
          { name: "Inland El Cuyo", description: "The residential streets a few blocks back from the water.", bestFor: "People who want lower costs and more distance from the growing visitor interest.", tradeoff: "Fewer amenities directly on-site." },
        ],
        pros: ["Genuinely unspoiled, undeveloped coastline on the state's northern tip", "Real kitesurfing conditions and proximity to the Ría Lagartos biosphere area", "A small, growing community without having lost its working-village character"],
        tradeoffs: ["Minimal local healthcare — a significant drive to real hospital care", "Limited, inconsistent internet — test thoroughly before relying on it", "A genuinely remote location, hours from a major airport"],
        realEstate: {
          overview: "A small but growing market of beach homes and smaller lots — real recent interest has increased demand from a very low base, though the village's overall scale remains modest.",
          considerations: ["As a coastal property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.", "Proximity to the Ría Lagartos biosphere reserve area may carry environmental building restrictions — verify what's actually permitted before planning any construction."],
        },
        investmentOutlook: {
          intro: "El Cuyo has drawn rising outside interest in recent years, tied to its wind conditions and unspoiled coastline — real, if still early, growth that brings real questions about community impact and infrastructure pace.",
          considerations: ["Growing popularity has visibly increased both demand and construction from a very low starting point — worth weighing against the village's own limited infrastructure and the biosphere area's ecological sensitivity.", "This ticket's own guidance applies clearly here: this is not a place to approach as a speculative or 'hot' market — long-term suitability and community impact matter more than any growth prediction."],
        },
        faq: [
          { question: "Is El Cuyo safe to live in?", answer: "A small, remote village. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Is El Cuyo good for kitesurfing?", answer: "Yes — consistent coastal wind conditions are one of the main reasons outside interest in this village has grown in recent years." },
          { question: "How far is El Cuyo from a major airport?", answer: "Roughly 2.5–3 hours from Mérida or Cancún — among the more remote destinations on this site." },
          { question: "Is El Cuyo good for remote work?", answer: "Internet exists but is inconsistent — test your specific address thoroughly before relying on it." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "El Cuyo suele encajar con personas que quieren costa norteña genuinamente sin desarrollar y están dispuestas a cambiar comodidad por ella — un pequeño pueblo pesquero que ha atraído una ola creciente, aunque aún pequeña, de interés externo sin perder su carácter de pueblo de trabajo.",
          reasonsByTag: {
            beach: "La vida de playa te importa, y la larga playa sin desarrollar de El Cuyo junto con sus condiciones para kitesurf son el atractivo real aquí.",
            quiet: "Quieres tranquilidad sobre el ruido, y este sigue siendo uno de los destinos costeros menos desarrollados de este sitio, a pesar del creciente interés.",
            natureFirst: "La naturaleza es lo primero para ti, y El Cuyo está al borde del área de la reserva de biosfera Ría Lagartos, junto a vida silvestre genuina y costa abierta.",
            exploratory: "Todavía estás descubriendo qué encaja, y El Cuyo recompensa a quienes están dispuestos a cambiar comodidad por una sensación real de descubrimiento en un tramo de costa poco desarrollado.",
            remote: "Quieres distancia real del corredor turístico principal, y El Cuyo está en la punta norte del estado, a horas de la costa caribeña.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "La playa suele estar vacía excepto por los kitesurfistas aprovechando el viento, y caminar por ella significa soledad genuina, no una tranquilidad curada." },
          { time: "Tarde", vignette: "Los mandados más allá de lo básico significan un viaje real — este es un pueblo pequeño y creciente, no una ciudad con todo cerca." },
          { time: "Noche", vignette: "El pueblo está tranquilo después del anochecer, genuinamente así — la pequeña y creciente comunidad de El Cuyo no ha traído vida nocturna consigo, y la mayoría de la gente aquí no quiere que la traiga." },
        ],
        honestTruth: {
          intro: "La costa sin desarrollar de El Cuyo es real, y viene con limitaciones reales.",
          points: [
            "Los servicios y la salud son mínimos localmente — este es uno de los destinos más remotos de este sitio, a horas de un hospital importante.",
            "El creciente interés externo ha cambiado visiblemente el pueblo en años recientes — trátalo como un lugar en evolución, no estático.",
            "El internet y la infraestructura son genuinamente limitados — prueba a fondo antes de asumir que el trabajo remoto aquí será fluido.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Lento y remoto, creciendo discretamente", detail: "Entre los destinos costeros menos desarrollados de este sitio, con una ola pequeña pero visible de nuevo interés." },
          walkability: { value: "Núcleo de pueblo pequeño y caminable", detail: "El pueblo en sí es compacto; cualquier cosa más allá significa un viaje real." },
          internet: { value: "Básico, en desarrollo", detail: "La cobertura existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en ella." },
          healthcare: { value: "Mínimo localmente", detail: "Solo atención básica; cualquier cosa seria significa un viaje considerable a Mérida o Cancún." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pueblo pequeño y remoto — usa prácticas normales de seguridad al viajar y verifica las condiciones actuales antes de mudarte." },
          transportation: { value: "Auto esencial", detail: "El pueblo es caminable, pero este es un tramo de costa genuinamente remoto — un auto importa para casi todo lo demás." },
          airportAccess: { value: "2.5–3 horas de Mérida o Cancún", detail: "Entre los destinos más alejados de un aeropuerto internacional importante en este sitio." },
          climate: { value: "Cálido y húmedo, viento costero fuerte", detail: "Condiciones de viento constantes que atraen a kitesurfistas, junto con el mismo patrón de temporada de lluvias cercano al Golfo." },
          community: { value: "Muy pequeña, creciendo de manera constante", detail: "Una pequeña comunidad de pueblo pesquero con una ola modesta pero visiblemente creciente de nuevos residentes en años recientes." },
        },
        monthlyBudget: {
          housing: "$300–$650", groceries: "$180–$300", dining: "$90–$200", transportation: "$45–$100", utilities: "$50–$110", internet: "$35–$80",
          estimatedTotal: "$550–$1,150",
          note: "Estimación direccional, no son datos locales verificados — refleja la pequeña escala y el alejamiento de El Cuyo, de un orden de magnitud similar a sus vecinos de Joyas Escondidas en este sitio.",
        },
        neighborhoods: [
          { name: "El Malecón / Frente A La Playa", description: "Las calles más cercanas a la playa y la pequeña franja comercial del pueblo.", bestFor: "Personas que quieren estar a pasos del agua y las condiciones de kitesurf.", tradeoff: "La parte más visitada de un pueblo aún genuinamente pequeño." },
          { name: "El Cuyo Interior", description: "Las calles residenciales a unas cuadras del agua.", bestFor: "Personas que quieren costos más bajos y más distancia del creciente interés de visitantes.", tradeoff: "Menos comodidades directamente en el lugar." },
        ],
        pros: ["Costa genuinamente sin desarrollar en la punta norte del estado", "Condiciones reales de kitesurf y cercanía al área de la biosfera Ría Lagartos", "Una comunidad pequeña y creciente sin haber perdido su carácter de pueblo de trabajo"],
        tradeoffs: ["Salud local mínima — un viaje considerable para atención hospitalaria real", "Internet limitado e inconsistente — prueba a fondo antes de confiar en él", "Una ubicación genuinamente remota, a horas de un aeropuerto importante"],
        realEstate: {
          overview: "Un mercado pequeño pero creciente de casas de playa y lotes más pequeños — el interés real reciente ha aumentado la demanda desde una base muy baja, aunque la escala general del pueblo sigue siendo modesta.",
          considerations: ["Como propiedad costera, la propiedad extranjera típicamente funciona a través de un fideicomiso bancario — confirma los requisitos actuales con un notario mexicano.", "La cercanía al área de la reserva de biosfera Ría Lagartos puede tener restricciones ambientales de construcción — verifica qué está realmente permitido antes de planear cualquier construcción."],
        },
        investmentOutlook: {
          intro: "El Cuyo ha atraído un creciente interés externo en años recientes, ligado a sus condiciones de viento y su costa sin desarrollar — un crecimiento real, aunque todavía temprano, que trae preguntas reales sobre el impacto comunitario y el ritmo de la infraestructura.",
          considerations: ["La creciente popularidad ha aumentado visiblemente tanto la demanda como la construcción desde un punto de partida muy bajo — vale la pena sopesarlo frente a la infraestructura limitada del propio pueblo y la sensibilidad ecológica del área de biosfera.", "La propia guía de este sitio aplica claramente aquí: este no es un lugar para abordar como un mercado especulativo o de 'moda' — la idoneidad a largo plazo y el impacto comunitario importan más que cualquier predicción de crecimiento."],
        },
        faq: [
          { question: "¿Es seguro vivir en El Cuyo?", answer: "Un pueblo pequeño y remoto. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿Es bueno El Cuyo para kitesurf?", answer: "Sí — las condiciones de viento costero constantes son una de las principales razones por las que el interés externo en este pueblo ha crecido en años recientes." },
          { question: "¿Qué tan lejos está El Cuyo de un aeropuerto importante?", answer: "Aproximadamente 2.5–3 horas de Mérida o Cancún — entre los destinos más remotos de este sitio." },
          { question: "¿Es bueno El Cuyo para trabajo remoto?", answer: "El internet existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en él." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Basic and developing — test your specific address thoroughly before relying on it.", es: "Básico y en desarrollo — prueba tu dirección específica a fondo antes de confiar en ella." } },
        healthcare: { score: 1, note: { en: "Minimal locally; anything serious means a significant drive to Mérida or Cancún.", es: "Mínimo localmente; cualquier cosa seria significa un viaje considerable a Mérida o Cancún." } },
        community: { score: 2, note: { en: "A small fishing-village community with a modest but visibly growing wave of new residents.", es: "Una pequeña comunidad de pueblo pesquero con una ola modesta pero visiblemente creciente de nuevos residentes." } },
        livability: { score: 3, note: { en: "Modest costs, offset by minimal services and real remoteness.", es: "Costos modestos, compensados por servicios mínimos y un alejamiento real." } },
        readiness: { score: 1, note: { en: "One of the more self-sufficiency-demanding destinations on this site.", es: "Uno de los destinos que más exige autosuficiencia en este sitio." } },
      },
    },
  },

  "rio-lagartos": {
    heroImage: "/regions/rio-lagartos/rio-lagartos-hero.webp",
    imageStatus: "illustrative",
    tagline: { en: "A small fishing village on the edge of a vast flamingo-filled biosphere reserve — built around nature and little else.", es: "Un pequeño pueblo pesquero al borde de una vasta reserva de biosfera llena de flamencos — construido en torno a la naturaleza y poco más." },
    heroAlt: {
      en: "Flamingos in the shallow waters of the Ría Lagartos biosphere reserve",
      es: "Flamencos en las aguas poco profundas de la reserva de biosfera Ría Lagartos",
    },
    content: {
      en: {
        whyThisFeelsLikeYou: {
          intro: "Río Lagartos tends to fit people who want their daily life built directly around a major nature reserve — a small, working fishing village at the edge of one of the region's most significant flamingo habitats, not a beach town with wildlife as a side attraction.",
          reasonsByTag: {
            quiet: "You want quiet over noise, and Río Lagartos is built around a biosphere reserve, about as unhurried as this site's northern coast gets.",
            natureFirst: "Nature comes first for you, and the Ría Lagartos reserve's flamingos and other wildlife are the actual reason this village exists as a destination at all.",
            remote: "You want real distance from the tourist map, and Río Lagartos sits on the state's remote northern coast, hours from the Caribbean side.",
            exploratory: "You're still figuring out what fits, and Río Lagartos rewards people genuinely curious about a working fishing village built around conservation, not a resort with a nature theme.",
          },
        },
        tuesdayInYourLife: [
          { time: "Morning", vignette: "The estuary is often perfectly still before the wind picks up, and flamingos are a real, if never guaranteed, possibility on an early walk or boat trip." },
          { time: "Afternoon", vignette: "Lunch is fresh, simple, and usually whatever came off a boat that morning — this remains a genuine fishing village first." },
          { time: "Evening", vignette: "The light over the reserve turns dramatic most evenings, and there's rarely a crowd to share it with — this is a small, quiet place, not a tourist stop." },
        ],
        honestTruth: {
          intro: "Río Lagartos's nature is genuinely special, and its trade-offs are genuinely real.",
          points: [
            "Services and healthcare are very limited locally — this is one of the more remote destinations on this site, hours from a major hospital.",
            "Flamingos and other wildlife are seasonal and never guaranteed — don't move here expecting a daily sighting.",
            "This is a working fishing village, not a resort — infrastructure is genuinely modest, and daily life assumes real self-sufficiency.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Slow and nature-centered", detail: "Life here follows the reserve and the fishing fleet, among the least hurried paces on this site's northern coast." },
          walkability: { value: "Small and walkable", detail: "The village core is compact; most everyday needs are a short walk." },
          internet: { value: "Basic, developing", detail: "Coverage exists but is inconsistent — test your specific address thoroughly before relying on it." },
          healthcare: { value: "Minimal locally", detail: "Basic care only; anything serious means a significant drive to Mérida or Tizimín." },
          safety: { value: "Generally calm, standard precautions", detail: "A small, quiet fishing village — use normal travel-safety practices as anywhere." },
          transportation: { value: "Car essential", detail: "The village is walkable, but this is a genuinely remote stretch of coast — a car matters for nearly everything else." },
          airportAccess: { value: "~2.5–3 hours from Mérida International", detail: "A genuine drive along inland and coastal roads — one of the more remote destinations on this site." },
          climate: { value: "Warm, coastal estuary humidity", detail: "Estuary and reserve humidity alongside the same northern Gulf-adjacent climate pattern." },
          community: { value: "Small and close-knit", detail: "A modest, long-settled fishing community, similar in character to Celestún." },
        },
        monthlyBudget: {
          housing: "$250–$550", groceries: "$160–$280", dining: "$70–$170", transportation: "$40–$95", utilities: "$50–$105", internet: "$35–$75",
          estimatedTotal: "$450–$1,000",
          note: "Directional estimate, not verified local data — grounded in Río Lagartos's small scale and remoteness, a similar order of magnitude to Celestún's estimates.",
        },
        neighborhoods: [
          { name: "Coastal Río Lagartos", description: "The streets closest to the estuary and the working fishing fleet — the village's real daily life.", bestFor: "People who came for the nature and the water and want to live inside both.", tradeoff: "The furthest from what little town center exists." },
          { name: "Town Center", description: "The small cluster of streets with Río Lagartos's shops, market, and church.", bestFor: "People who want to be as close as possible to local services, modest as they are.", tradeoff: "Still minimal by any larger town's standard." },
        ],
        pros: ["A major flamingo and wildlife reserve at your doorstep, not a manufactured nature experience", "Genuine quiet and a slow, working-village pace", "Lower cost of living than the more developed coastal towns"],
        tradeoffs: ["Very limited urban services and healthcare — real planning required", "A genuine, hours-long drive from Mérida", "Wildlife sightings are seasonal and never guaranteed"],
        realEstate: {
          overview: "A very small market of modest homes near the estuary — minimal turnover, minimal local infrastructure to support a purchase, and no significant new construction.",
          considerations: ["As a coastal/estuary property, foreign ownership typically works through a bank trust (fideicomiso) — confirm current requirements with a Mexican notary.", "Biosphere reserve proximity carries real building and land-use restrictions — verify what's actually permitted before assuming standard rules apply."],
        },
        investmentOutlook: {
          intro: "Río Lagartos's identity is its biosphere reserve, not development — any framing of this village as a growth opportunity should be treated with real skepticism.",
          considerations: ["Reserve status limits the kind of development that can happen here, supporting long-term ecological stability rather than speculative growth.", "Suitability depends on genuinely wanting a nature-first, low-services life, not on any prediction about future property value."],
        },
        faq: [
          { question: "Is Río Lagartos safe to live in?", answer: "A small, quiet fishing village. As anywhere, use normal travel-safety practices and confirm current conditions before moving." },
          { question: "Will I really see flamingos in Río Lagartos?", answer: "Flamingos and other wildlife are a real seasonal possibility in the reserve, never a guarantee — don't move here expecting a daily sighting." },
          { question: "How far is Río Lagartos from Mérida?", answer: "Roughly 2.5–3 hours by road — one of the more remote destinations on this site." },
          { question: "Is Río Lagartos good for remote work?", answer: "Internet coverage exists but is inconsistent — test your specific address thoroughly before relying on it." },
        ],
      },
      es: {
        whyThisFeelsLikeYou: {
          intro: "Río Lagartos suele encajar con personas que quieren construir su vida diaria directamente alrededor de una reserva natural importante — un pequeño pueblo pesquero de trabajo al borde de uno de los hábitats de flamencos más significativos de la región, no un pueblo de playa con vida silvestre como atracción secundaria.",
          reasonsByTag: {
            quiet: "Quieres tranquilidad sobre el ruido, y Río Lagartos está construido alrededor de una reserva de biosfera, tan tranquilo como puede estar la costa norte de este sitio.",
            natureFirst: "La naturaleza es lo primero para ti, y los flamencos y otra vida silvestre de la reserva Ría Lagartos son la razón real por la que este pueblo existe como destino.",
            remote: "Quieres distancia real del mapa turístico, y Río Lagartos está en la remota costa norte del estado, a horas del lado caribeño.",
            exploratory: "Todavía estás descubriendo qué encaja, y Río Lagartos recompensa a quienes sienten curiosidad genuina por un pueblo pesquero de trabajo construido alrededor de la conservación, no un resort con tema de naturaleza.",
          },
        },
        tuesdayInYourLife: [
          { time: "Mañana", vignette: "El estuario suele estar perfectamente quieto antes de que sople el viento, y los flamencos son una posibilidad real, aunque nunca garantizada, en una caminata o paseo en bote temprano." },
          { time: "Tarde", vignette: "El almuerzo es fresco, sencillo y usualmente lo que sea que llegó de un bote esa mañana — esto sigue siendo un pueblo pesquero genuino, ante todo." },
          { time: "Noche", vignette: "La luz sobre la reserva se vuelve dramática la mayoría de las noches, y rara vez hay una multitud para compartirla — este es un lugar pequeño y tranquilo, no una parada turística." },
        ],
        honestTruth: {
          intro: "La naturaleza de Río Lagartos es genuinamente especial, y sus compensaciones son genuinamente reales.",
          points: [
            "Los servicios y la salud son muy limitados localmente — este es uno de los destinos más remotos de este sitio, a horas de un hospital importante.",
            "Los flamencos y otra vida silvestre son estacionales y nunca están garantizados — no te mudes aquí esperando un avistamiento diario.",
            "Este es un pueblo pesquero de trabajo, no un resort — la infraestructura es genuinamente modesta, y la vida diaria asume una autosuficiencia real.",
          ],
        },
        lifestyleSnapshot: {
          pace: { value: "Lento y centrado en la naturaleza", detail: "La vida aquí sigue a la reserva y la flota pesquera, entre los ritmos menos apresurados de la costa norte de este sitio." },
          walkability: { value: "Pequeño y caminable", detail: "El núcleo del pueblo es compacto; la mayoría de las necesidades cotidianas están a una corta caminata." },
          internet: { value: "Básico, en desarrollo", detail: "La cobertura existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en ella." },
          healthcare: { value: "Mínimo localmente", detail: "Solo atención básica; cualquier cosa seria significa un viaje considerable a Mérida o Tizimín." },
          safety: { value: "Generalmente tranquilo, precauciones estándar", detail: "Un pequeño y tranquilo pueblo pesquero — usa prácticas normales de seguridad al viajar, como en cualquier lugar." },
          transportation: { value: "Auto esencial", detail: "El pueblo es caminable, pero este es un tramo de costa genuinamente remoto — un auto importa para casi todo lo demás." },
          airportAccess: { value: "~2.5–3 horas de Mérida", detail: "Un viaje real por carreteras del interior y costeras — uno de los destinos más remotos de este sitio." },
          climate: { value: "Cálido, humedad de estuario costero", detail: "Humedad de estuario y reserva junto con el mismo patrón climático del norte cercano al Golfo." },
          community: { value: "Pequeña y unida", detail: "Una comunidad pesquera modesta y de larga data, de carácter similar a Celestún." },
        },
        monthlyBudget: {
          housing: "$250–$550", groceries: "$160–$280", dining: "$70–$170", transportation: "$40–$95", utilities: "$50–$105", internet: "$35–$75",
          estimatedTotal: "$450–$1,000",
          note: "Estimación direccional, no son datos locales verificados — basada en la pequeña escala y el alejamiento de Río Lagartos, un orden de magnitud similar a las estimaciones de Celestún.",
        },
        neighborhoods: [
          { name: "Río Lagartos Costero", description: "Las calles más cercanas al estuario y la flota pesquera de trabajo — la vida diaria real del pueblo.", bestFor: "Personas que vinieron por la naturaleza y el agua y quieren vivir dentro de ambas.", tradeoff: "Lo más alejado del poco centro de pueblo que existe." },
          { name: "Centro Del Pueblo", description: "El pequeño grupo de calles con las tiendas, el mercado y la iglesia de Río Lagartos.", bestFor: "Personas que quieren estar lo más cerca posible de los servicios locales, modestos como son.", tradeoff: "Aún mínimo según el estándar de cualquier pueblo más grande." },
        ],
        pros: ["Una importante reserva de flamencos y vida silvestre en la puerta de tu casa, no una experiencia de naturaleza fabricada", "Tranquilidad genuina y un ritmo lento de pueblo de trabajo", "Menor costo de vida que los pueblos costeros más desarrollados"],
        tradeoffs: ["Servicios urbanos y de salud muy limitados — se requiere planificación real", "Un viaje real de horas desde Mérida", "Los avistamientos de vida silvestre son estacionales y nunca están garantizados"],
        realEstate: {
          overview: "Un mercado muy pequeño de casas modestas cerca del estuario — rotación mínima, infraestructura local mínima para respaldar una compra, y sin construcción nueva significativa.",
          considerations: ["Como propiedad costera/de estuario, la propiedad extranjera típicamente funciona a través de un fideicomiso bancario — confirma los requisitos actuales con un notario mexicano.", "La cercanía a la reserva de biosfera conlleva restricciones reales de construcción y uso de suelo — verifica qué está realmente permitido antes de asumir que aplican las reglas estándar."],
        },
        investmentOutlook: {
          intro: "La identidad de Río Lagartos es su reserva de biosfera, no el desarrollo — cualquier presentación de este pueblo como una oportunidad de crecimiento debe tratarse con verdadero escepticismo.",
          considerations: ["El estatus de reserva limita el tipo de desarrollo que puede ocurrir aquí, apoyando la estabilidad ecológica a largo plazo en lugar del crecimiento especulativo.", "La idoneidad depende de querer genuinamente una vida centrada en la naturaleza y con pocos servicios, no de ninguna predicción sobre el valor futuro de la propiedad."],
        },
        faq: [
          { question: "¿Es seguro vivir en Río Lagartos?", answer: "Un pequeño y tranquilo pueblo pesquero. Como en cualquier lugar, usa prácticas normales de seguridad al viajar y confirma las condiciones actuales antes de mudarte." },
          { question: "¿De verdad veré flamencos en Río Lagartos?", answer: "Los flamencos y otra vida silvestre son una posibilidad estacional real en la reserva, nunca una garantía — no te mudes aquí esperando un avistamiento diario." },
          { question: "¿Qué tan lejos está Río Lagartos de Mérida?", answer: "Aproximadamente 2.5–3 horas por carretera — uno de los destinos más remotos de este sitio." },
          { question: "¿Es bueno Río Lagartos para trabajo remoto?", answer: "La cobertura de internet existe pero es inconsistente — prueba tu dirección específica a fondo antes de confiar en ella." },
        ],
      },
    },
    ptmScore: {
      factors: {
        infrastructure: { score: 2, note: { en: "Basic and developing — test your specific address thoroughly before relying on it.", es: "Básico y en desarrollo — prueba tu dirección específica a fondo antes de confiar en ella." } },
        healthcare: { score: 1, note: { en: "Minimal locally; anything serious means a significant drive to Mérida or Tizimín.", es: "Mínimo localmente; cualquier cosa seria significa un viaje considerable a Mérida o Tizimín." } },
        community: { score: 2, note: { en: "A modest, long-settled fishing community, similar in character to Celestún.", es: "Una comunidad pesquera modesta y de larga data, de carácter similar a Celestún." } },
        livability: { score: 3, note: { en: "Lower cost of living, offset by limited local services.", es: "Menor costo de vida, compensado por servicios locales limitados." } },
        readiness: { score: 1, note: { en: "One of the more self-sufficiency-demanding destinations on this site.", es: "Uno de los destinos que más exige autosuficiencia en este sitio." } },
      },
    },
  },
};
