// My Mexico Plan — Trusted Partner & Connector category catalog. Static
// project content, the same discipline as taskBank.js: every field here
// is either a plain fact about the category or an honest description of
// how Path To Mexico relates to it today. Nothing here names a partner
// company, an endorsement, a certification, or a piece of legal/financial
// advice — see buildTrustedPartnerWorkspace.js for the truth-constraint
// notes on why.
//
// Shape:
//   id             unique, stable
//   label          the category name shown to the visitor
//   whyItMatters   a short, honest, general-planning-only explanation —
//                  never a specific legal, tax, or medical claim
//   whenNeeded     reuses the exact period vocabulary already established
//                  by buildRelocationTimeline.js (ENG-020), so a visitor
//                  sees one consistent timing language across the whole
//                  plan instead of a second, competing one
//   ownership      "self" | "pathToMexico" | "professional" — the exact
//                  taxonomy already used by taskBank.js and rendered
//                  identically by ConciergeWorkspace.js's category
//                  labels/descriptions; reused here, not reinvented
//   guideLink      an existing /guides page when one is genuinely
//                  relevant; null otherwise — never a placeholder link
//   relevance      "universal" (appropriate for every visitor relocating
//                  to Mexico, regardless of answers) or a function of
//                  scores.tagCounts / plan.cityId — see
//                  buildTrustedPartnerWorkspace.js's RELEVANCE_RULES
//   partnerRecords always [] today. Path To Mexico has no verified
//                  partner directory yet — this is the structural seam a
//                  future real partner list would populate (item 7 of
//                  ENG-021's scope), not a current claim of any kind.
//
// PTM Spanish-parity pass: `label`, `whyItMatters`, `whenNeeded` became
// `{ en, es }`.

export const PARTNER_CATEGORIES = [
  {
    id: "immigration-residency",
    label: { en: "Immigration / Residency", es: "Inmigración / Residencia" },
    whyItMatters: {
      en: "Every visitor relocating to Mexico needs some form of legal residency status — this is the one category nobody skips.",
      es: "Toda persona que se reubica en México necesita algún tipo de estatus legal de residencia — esta es la única categoría que nadie se salta.",
    },
    whenNeeded: { en: "3–6 Months Before Moving, finalized in your First 90 Days", es: "3–6 Meses Antes De Mudarte, finalizado en tus Primeros 90 Días" },
    ownership: "professional",
    guideLink: "/guides/mexico-residency-support",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "real-estate",
    label: { en: "Real Estate", es: "Bienes Raíces" },
    whyItMatters: {
      en: "Finding honest, realistic housing — whether renting or buying — shapes nearly every other decision in your move.",
      es: "Encontrar vivienda honesta y realista — ya sea rentando o comprando — moldea casi todas las demás decisiones de tu mudanza.",
    },
    whenNeeded: { en: "3–6 Months Before Moving through your Final Month", es: "3–6 Meses Antes De Mudarte hasta tu Último Mes" },
    ownership: "pathToMexico",
    guideLink: "/guides/renting-vs-buying-in-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "healthcare",
    label: { en: "Healthcare", es: "Salud" },
    whyItMatters: {
      en: "Finding a doctor and dentist before you need one beats doing it for the first time during an actual problem.",
      es: "Encontrar un médico y un dentista antes de necesitarlos es mejor que hacerlo por primera vez durante un problema real.",
    },
    whenNeeded: { en: "Arrival Week, ongoing", es: "Semana De Llegada, de forma continua" },
    ownership: "pathToMexico",
    guideLink: "/guides/healthcare-in-mexico-for-canadians",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "insurance",
    label: { en: "Insurance", es: "Seguros" },
    whyItMatters: {
      en: "Private health insurance coverage and cost vary a lot by provider — worth comparing before you need it, not during an emergency.",
      es: "La cobertura y el costo del seguro médico privado varían mucho según el proveedor — vale la pena comparar antes de necesitarlo, no durante una emergencia.",
    },
    whenNeeded: { en: "3–6 Months Before Moving", es: "3–6 Meses Antes De Mudarte" },
    ownership: "professional",
    guideLink: "/guides/healthcare-in-mexico-for-canadians",
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "banking",
    label: { en: "Banking", es: "Banca" },
    whyItMatters: {
      en: "International transfer fees, daily limits, and opening a local account all catch people off guard if left until the last minute.",
      es: "Las comisiones de transferencia internacional, los límites diarios y la apertura de una cuenta local sorprenden a la gente si se dejan para el último momento.",
    },
    whenNeeded: { en: "3–6 Months Before Moving, set up locally in your Arrival Week", es: "3–6 Meses Antes De Mudarte, configurado localmente en tu Semana De Llegada" },
    ownership: "self",
    guideLink: "/guides/banking-in-mexico-as-a-foreigner",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "accounting-tax",
    label: { en: "Accounting / Tax", es: "Contabilidad / Impuestos" },
    whyItMatters: {
      en: "Pension and Social Security income often stretches further here, but confirming how it continues and how it's taxed is worth doing in writing, not assuming.",
      es: "El ingreso de pensión o Seguro Social a menudo rinde más aquí, pero vale la pena confirmar por escrito cómo continúa y cómo se grava, en lugar de asumirlo.",
    },
    whenNeeded: { en: "Start Now, confirmed before your Final Month", es: "Empieza Ahora, confirmado antes de tu Último Mes" },
    ownership: "professional",
    guideLink: "/guides/retiring-in-mexico",
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "legal-services",
    label: { en: "Legal Services", es: "Servicios Legales" },
    whyItMatters: {
      en: "Lease agreements, property contracts, and residency paperwork often benefit from a licensed legal review — Path To Mexico is not a law firm and does not provide legal advice.",
      es: "Los contratos de renta, los contratos de propiedad y los trámites de residencia a menudo se benefician de una revisión legal certificada — Path To Mexico no es un despacho legal ni ofrece asesoría legal.",
    },
    whenNeeded: { en: "3–6 Months Before Moving through your Final Month", es: "3–6 Meses Antes De Mudarte hasta tu Último Mes" },
    ownership: "professional",
    guideLink: null,
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "vehicle-transportation",
    label: { en: "Vehicle / Transportation", es: "Vehículo / Transporte" },
    whyItMatters: {
      en: "This region's day-to-day life mostly assumes you're driving — worth planning for before you're relying on it.",
      es: "La vida diaria de esta región generalmente asume que conduces — vale la pena planearlo antes de depender de ello.",
    },
    whenNeeded: { en: "3–6 Months Before Moving", es: "3–6 Meses Antes De Mudarte" },
    ownership: "self",
    guideLink: null,
    relevance: "conditional",
    partnerRecords: [],
  },
  {
    id: "internet-utilities",
    label: { en: "Internet & Utilities", es: "Internet Y Servicios" },
    whyItMatters: {
      en: "Setting up phone, internet, and basic utilities early — starting with a prepaid option — avoids being locked into a plan before you know your neighborhood's actual coverage.",
      es: "Configurar teléfono, internet y servicios básicos desde temprano — empezando con una opción prepago — evita quedar atado a un plan antes de conocer la cobertura real de tu colonia.",
    },
    whenNeeded: { en: "Arrival Week", es: "Semana De Llegada" },
    ownership: "self",
    guideLink: "/guides/internet-and-remote-work-in-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "pet-relocation",
    label: { en: "Pet Relocation", es: "Reubicación De Mascotas" },
    whyItMatters: {
      en: "If you're bringing pets, import requirements and logistics are worth researching well ahead of your move rather than the final week.",
      es: "Si traes mascotas, vale la pena investigar los requisitos de importación y la logística mucho antes de tu mudanza, no en la última semana.",
    },
    whenNeeded: { en: "3–6 Months Before Moving", es: "3–6 Meses Antes De Mudarte" },
    ownership: "self",
    guideLink: "/guides/bringing-pets-to-mexico",
    relevance: "universal",
    partnerRecords: [],
  },
  {
    id: "moving-shipping",
    label: { en: "Moving & Shipping", es: "Mudanza Y Envíos" },
    whyItMatters: {
      en: "Deciding what to ship, sell, or replace is one of the most practical, concrete parts of making a move real.",
      es: "Decidir qué enviar, vender o reemplazar es una de las partes más prácticas y concretas de hacer realidad una mudanza.",
    },
    whenNeeded: { en: "Final Month", es: "Último Mes" },
    ownership: "self",
    guideLink: "/guides/mexico-relocation-checklist",
    relevance: "universal",
    partnerRecords: [],
  },
];
