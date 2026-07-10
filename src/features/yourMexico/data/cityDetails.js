// Your Mexico — per-city content that extends the Blueprint's own
// CITY_PROFILES (src/features/blueprint/data/cityProfiles.js).
//
// Keyed by the same city ids as CITY_PROFILES so cityLookup.js can merge the
// two. Fields are added sprint by sprint, only as each section is actually
// built, rather than stubbed in ahead of time.
//
// heroImage reuses the site's existing hero photo, same as the Blueprint
// intro screen — real per-city photography is a pure data swap later.
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
    heroImage: "/hero.jpg",

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
    heroImage: "/hero.jpg",

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
};
