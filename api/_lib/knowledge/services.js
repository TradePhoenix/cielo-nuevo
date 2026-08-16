// Ask Path knowledge source: services and Mexico Fit Call.
//
// Hand-copied from src/pages/HomePage.js (services list, work offers/pricing)
// and src/pages/MexicoFitCallPage.js (the Fit Call itself). These live as
// inline literals in page components, not shared data modules, so this is a
// deliberate, documented duplication rather than an import — see
// docs/ask-path/KNOWLEDGE_SOURCES.md. Mexico Fit Call copy on the live page
// is English-only; no verified Spanish version exists, so its `es` field is
// left null (see the general translation policy in the same doc).

export function buildServiceRecords() {
  return [
    {
      id: "service-relocation-support",
      title: { en: "Relocation Support", es: "Apoyo De Reubicación" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["services", "relocation", "planning"],
      content: {
        en: "Personalized planning based on your goals, budget, timeline, and lifestyle — not a generic checklist.",
        es: "Planeación personalizada basada en tus metas, presupuesto, tiempos y estilo de vida — no una lista genérica.",
      },
    },
    {
      id: "service-residency-guidance",
      title: { en: "Residency Guidance", es: "Orientación De Residencia" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["residency", "visa", "immigration"],
      content: {
        en: "General education on the residency process, plus connections to qualified professionals when needed.",
        es: "Educación sobre el proceso general de residencia, más conexiones con profesionales calificados cuando sea necesario.",
      },
    },
    {
      id: "service-housing-connections",
      title: { en: "Housing Connections", es: "Conexiones De Vivienda" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["housing", "rent", "real estate"],
      content: {
        en: "Help understanding neighborhoods and rentals, with introductions to local real estate contacts where available.",
        es: "Apoyo para entender colonias y rentas, con conexiones a contactos inmobiliarios locales cuando estén disponibles.",
      },
    },
    {
      id: "service-lifestyle-planning",
      title: { en: "Lifestyle Planning", es: "Planeación De Estilo De Vida" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["cost of living", "healthcare", "banking", "transportation", "pets"],
      content: {
        en: "Clear insight into cost of living, healthcare, banking, transportation, pets, and daily life.",
        es: "Claridad sobre costo de vida, salud, bancos, transporte, mascotas y vida diaria.",
      },
    },
    {
      id: "service-trusted-local-network",
      title: { en: "Trusted Local Network", es: "Red Local Confiable" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["legal", "accounting", "insurance", "professionals", "network"],
      content: {
        en: "Coordination and introductions to local professionals — legal, accounting, insurance, healthcare, and more — where there's a genuine connection to offer.",
        es: "Coordinación y conexiones con profesionales locales — legal, contable, seguros, salud y más — donde tengamos una conexión genuina que ofrecer.",
      },
    },
    {
      id: "service-guided-landing",
      title: { en: "Guided Landing", es: "Llegada Guiada" },
      category: "services",
      route: "/work-with-path-to-mexico",
      lastReviewed: "2026-07-26",
      keywords: ["arrival", "settling in", "concierge"],
      content: {
        en: "Practical preparation, arrival planning, and settling-in support — before, during, and after the move. Priced with a custom quote.",
        es: "Preparación práctica, planeación de llegada y apoyo para instalarte — antes, durante y después de la mudanza. Con cotización personalizada.",
      },
    },
    {
      id: "service-tier-fit-call",
      title: { en: "Mexico Fit Call — $99 USD", es: "Mexico Fit Call — $99 USD" },
      category: "services",
      route: "/mexico-fit-call",
      lastReviewed: "2026-07-26",
      keywords: ["fit call", "price", "pricing", "book a call"],
      content: {
        en: "A private one-on-one conversation designed to answer questions, provide honest insight, and help someone understand what moving to Mexico could realistically look like for them. Best for people still exploring costs, residency options, neighborhoods, lifestyle questions, and next steps.",
        es: "Una conversación privada uno a uno diseñada para responder preguntas, dar una perspectiva honesta y ayudar a entender cómo podría verse realmente una mudanza a México. Ideal para quienes aún exploran costos, opciones de residencia, colonias, estilo de vida y próximos pasos.",
      },
    },
    {
      id: "service-tier-roadmap",
      title: { en: "Relocation Roadmap — starting at $499 USD", es: "Roadmap De Reubicación — desde $499 USD" },
      category: "services",
      route: "/mexico-fit-call",
      lastReviewed: "2026-07-26",
      keywords: ["roadmap", "price", "pricing"],
      content: {
        en: "A personalized relocation strategy built around goals, timeline, budget, lifestyle preferences, and long-term vision for life in Mexico. Ideal for individuals, couples, families, retirees, entrepreneurs, and remote workers who want a clear roadmap before major decisions.",
        es: "Una estrategia personalizada de reubicación construida alrededor de metas, tiempos, presupuesto, preferencias de vida y visión a largo plazo en México. Ideal para individuos, parejas, familias, jubilados, emprendedores y trabajadores remotos que quieren un plan claro antes de decisiones importantes.",
      },
    },
    {
      id: "service-tier-guided-landing-pricing",
      title: { en: "Guided Landing — custom quote", es: "Llegada Guiada — cotización personalizada" },
      category: "services",
      route: "/mexico-fit-call",
      lastReviewed: "2026-07-26",
      keywords: ["guided landing", "concierge", "price", "pricing"],
      content: {
        en: "Private concierge-style relocation support for people who want hands-on guidance, trusted introductions, and ongoing assistance throughout the process. Best for families, professionals, investors, business owners, and anyone seeking a highly personalized relocation experience. Priced with a custom quote.",
        es: "Apoyo privado estilo concierge para quienes quieren guía práctica, conexiones confiables y acompañamiento durante el proceso. Ideal para familias, profesionales, inversionistas, dueños de negocios y personas que buscan una experiencia personalizada. Con cotización personalizada.",
      },
    },
    {
      id: "fit-call-what-it-is",
      title: { en: "What a Mexico Fit Call actually is", es: null },
      category: "fitcall",
      route: "/mexico-fit-call",
      lastReviewed: "2026-08-16",
      keywords: ["fit call", "booking", "calendly", "whatsapp", "schedule"],
      content: {
        en: "Booking a Mexico Fit Call happens through the booking button on the /mexico-fit-call page, which opens Path To Mexico's Calendly scheduling page — pick a time and the confirmation arrives automatically. Anyone who prefers to talk to a person first can message Path To Mexico's founder, Kalen, on WhatsApp from the same page, and he replies personally. Either way, the call itself is a real, private, one-on-one conversation with Kalen.",
        es: null,
      },
    },
  ];
}
