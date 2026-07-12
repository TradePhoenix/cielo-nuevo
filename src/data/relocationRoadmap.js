// The Relocation Roadmap — a generic, evergreen view of the relocation
// journey for visitors who haven't decided yet. Deliberately distinct from
// My Mexico Plan's CHAPTERS (src/features/myMexicoPlan/data/chapters.js):
// that plan is personalized, day-dated, and only reachable after a
// completed Blueprint — its own prologue states the decision has already
// been made. This roadmap is for the stage before that: no personalization,
// no dates, just "here's the shape of the journey and what to do next."
//
// Every link below points to a route that already exists on the site
// (guides confirmed against src/pages/GuidesPage.js and src/App.js). No
// immigration or legal process is described beyond what the linked guides
// themselves already cover.

export const RELOCATION_ROADMAP_STAGES = [
  {
    id: "explore",
    number: "01",
    title: "Explore",
    description:
      "Get a realistic picture of what moving to Mexico could look like — cost, timeline, and whether it's actually a fit for your life.",
    action: { label: "Take The Mexico Blueprint", href: "/my-mexico-blueprint" },
    links: [
      { label: "How Much Money Do You Need to Move to Mexico?", href: "/guides/how-much-money-do-you-need-to-move-to-mexico" },
      { label: "Tulum vs Playa del Carmen", href: "/guides/tulum-vs-playa-del-carmen" },
    ],
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    description:
      "Narrow down where you'd actually live, what it costs month to month, and the residency path that fits your timeline.",
    action: { label: "See Your City Matches", href: "/your-mexico" },
    links: [
      { label: "Mexico Relocation Checklist", href: "/guides/mexico-relocation-checklist" },
      { label: "Best Areas To Live In Playa Del Carmen", href: "/guides/best-areas-to-live-in-playa-del-carmen" },
    ],
  },
  {
    id: "prepare",
    number: "03",
    title: "Prepare",
    description:
      "Handle the practical groundwork before you go — residency paperwork, banking, healthcare, and a housing decision.",
    action: { label: "Book A Mexico Fit Call", href: "/mexico-fit-call" },
    links: [
      { label: "Temporary Residency in Mexico Explained", href: "/guides/temporary-residency-mexico" },
      { label: "Banking in Mexico as a Foreigner", href: "/guides/banking-in-mexico-as-a-foreigner" },
      { label: "Healthcare in Mexico for Canadians", href: "/guides/healthcare-in-mexico-for-canadians" },
    ],
  },
  {
    id: "arrive",
    number: "04",
    title: "Arrive",
    description:
      "Get through the first weeks — temporary housing, staying connected, and finding your bearings in a new country.",
    action: { label: "Read Safety In Mexico", href: "/guides/safety-in-mexico" },
    links: [
      { label: "Internet and Remote Work in Mexico", href: "/guides/internet-and-remote-work-in-mexico" },
      { label: "Grocery Costs in Mexico", href: "/guides/grocery-costs-in-mexico" },
    ],
  },
  {
    id: "settle",
    number: "05",
    title: "Settle",
    description:
      "Build real routine — community, day-to-day life, and, if that's part of your plan, finalizing residency.",
    action: { label: "Build Your Mexico Plan", href: "/my-mexico-plan" },
    links: [
      { label: "Mexico Residency Support", href: "/guides/mexico-residency-support" },
      { label: "Renting vs Buying Property in Mexico", href: "/guides/renting-vs-buying-in-mexico" },
    ],
  },
];
