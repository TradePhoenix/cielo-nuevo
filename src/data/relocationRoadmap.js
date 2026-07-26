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
//
// `title`/`description`/`action.label` are `{en, es}` objects —
// RelocationRoadmap.js and ContinueYourJourney.js both resolve them against
// their own `lang` prop (defaulting to "en", so every existing caller that
// doesn't pass `lang` keeps rendering identically to before). Guide
// `links[].label` stay plain English strings deliberately: the guide
// article pages they point to are not translated (see guides.js's own
// note), so a Spanish label pointing at an English-only article would be
// misleading rather than helpful.

export const RELOCATION_ROADMAP_STAGES = [
  {
    id: "explore",
    number: "01",
    title: { en: "Explore", es: "Explorar" },
    description: {
      en: "Get a realistic picture of what moving to Mexico could look like — cost, timeline, and whether it's actually a fit for your life.",
      es: "Obtén una imagen realista de cómo podría verse mudarte a México — costo, cronograma y si realmente encaja con tu vida.",
    },
    action: {
      label: { en: "Take The Mexico Blueprint", es: "Haz El Mexico Blueprint" },
      href: "/my-mexico-blueprint",
    },
    links: [
      { label: "How Much Money Do You Need to Move to Mexico?", href: "/guides/how-much-money-do-you-need-to-move-to-mexico" },
      { label: "Tulum vs Playa del Carmen", href: "/guides/tulum-vs-playa-del-carmen" },
    ],
  },
  {
    id: "plan",
    number: "02",
    title: { en: "Plan", es: "Planear" },
    description: {
      en: "Narrow down where you'd actually live, what it costs month to month, and the residency path that fits your timeline.",
      es: "Define dónde realmente vivirías, cuánto cuesta mes a mes y la ruta de residencia que se ajusta a tu cronograma.",
    },
    action: {
      label: { en: "See Your City Matches", es: "Ver Tus Coincidencias De Ciudad" },
      href: "/your-mexico",
    },
    links: [
      { label: "Mexico Relocation Checklist", href: "/guides/mexico-relocation-checklist" },
      { label: "Best Areas To Live In Playa Del Carmen", href: "/guides/best-areas-to-live-in-playa-del-carmen" },
    ],
  },
  {
    id: "prepare",
    number: "03",
    title: { en: "Prepare", es: "Preparar" },
    description: {
      en: "Handle the practical groundwork before you go — residency paperwork, banking, healthcare, and a housing decision.",
      es: "Resuelve el trabajo práctico antes de irte — trámites de residencia, banca, salud y una decisión de vivienda.",
    },
    action: {
      label: { en: "Book A Mexico Fit Call", es: "Agenda Una Llamada De Compatibilidad" },
      href: "/mexico-fit-call",
    },
    links: [
      { label: "Temporary Residency in Mexico Explained", href: "/guides/temporary-residency-mexico" },
      { label: "Banking in Mexico as a Foreigner", href: "/guides/banking-in-mexico-as-a-foreigner" },
      { label: "Healthcare in Mexico for Canadians", href: "/guides/healthcare-in-mexico-for-canadians" },
    ],
  },
  {
    id: "arrive",
    number: "04",
    title: { en: "Arrive", es: "Llegar" },
    description: {
      en: "Get through the first weeks — temporary housing, staying connected, and finding your bearings in a new country.",
      es: "Supera las primeras semanas — vivienda temporal, mantenerte conectado y orientarte en un país nuevo.",
    },
    action: {
      label: { en: "Read Safety In Mexico", es: "Leer Seguridad En México" },
      href: "/guides/safety-in-mexico",
    },
    links: [
      { label: "Internet and Remote Work in Mexico", href: "/guides/internet-and-remote-work-in-mexico" },
      { label: "Grocery Costs in Mexico", href: "/guides/grocery-costs-in-mexico" },
    ],
  },
  {
    id: "settle",
    number: "05",
    title: { en: "Settle", es: "Establecerse" },
    description: {
      en: "Build real routine — community, day-to-day life, and, if that's part of your plan, finalizing residency.",
      es: "Construye una rutina real — comunidad, vida cotidiana y, si forma parte de tu plan, finalizar la residencia.",
    },
    action: {
      label: { en: "Build Your Mexico Plan", es: "Construir Tu Plan México" },
      href: "/my-mexico-plan",
    },
    links: [
      { label: "Mexico Residency Support", href: "/guides/mexico-residency-support" },
      { label: "Renting vs Buying Property in Mexico", href: "/guides/renting-vs-buying-in-mexico" },
    ],
  },
];
