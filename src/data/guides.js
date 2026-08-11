// The single source of truth for every guide's title, description,
// category, and route. Extracted from GuidesPage.js (which now imports
// this instead of defining its own copy) so guide metadata is never
// duplicated between the guides library and the Smart Guide Journey
// system (src/data/guideJourney.js).
//
// `title`/`description`/`category` are `{en, es}` objects — the guide
// INDEX card is bilingual, matching GuidesPage.js's own EN/ES toggle. The
// full article body behind each `href` is a separate, much larger
// translation project and is out of scope here; only the index card text
// is bilingual today.

export const GUIDES = [
  {
    title: { en: "Cost of Living in Playa del Carmen", es: "Costo de Vida en Playa del Carmen" },
    description: {
      en: "Housing, groceries, utilities, healthcare, restaurants, transportation, and monthly lifestyle costs.",
      es: "Vivienda, supermercado, servicios, salud, restaurantes, transporte y costos mensuales de vida.",
    },
    href: "/guides/cost-of-living-playa-del-carmen",
    category: { en: "Living Costs", es: "Costo De Vida" },
  },
  {
    title: { en: "Temporary Residency in Mexico Explained", es: "Residencia Temporal en México Explicada" },
    description: {
      en: "Financial requirements, consulates, documents, and the process of building a longer-term life in Mexico.",
      es: "Requisitos financieros, consulados, documentos y el proceso de construir una vida a más largo plazo en México.",
    },
    href: "/guides/temporary-residency-mexico",
    category: { en: "Residency", es: "Residencia" },
  },
  {
    title: { en: "Healthcare in Mexico for Canadians", es: "Atención Médica en México para Canadienses" },
    description: {
      en: "Doctors, hospitals, specialists, insurance, prescriptions, dental care, and healthcare costs.",
      es: "Médicos, hospitales, especialistas, seguros, recetas, cuidado dental y costos de salud.",
    },
    href: "/guides/healthcare-in-mexico-for-canadians",
    category: { en: "Healthcare", es: "Salud" },
  },
  {
    title: { en: "Best Areas To Live In Playa Del Carmen", es: "Las Mejores Zonas Para Vivir En Playa Del Carmen" },
    description: {
      en: "Centro, Playacar, Zazil-Ha, Colosio, walkability, atmosphere, and lifestyle differences.",
      es: "Centro, Playacar, Zazil-Ha, Colosio, caminabilidad, ambiente y diferencias de estilo de vida.",
    },
    href: "/guides/best-areas-to-live-in-playa-del-carmen",
    category: { en: "Where To Live", es: "Dónde Vivir" },
  },
  {
    title: { en: "Renting vs Buying Property in Mexico", es: "Rentar vs Comprar Propiedad en México" },
    description: {
      en: "Renting, buying, deposits, contracts, ownership questions, and how to think clearly before committing.",
      es: "Rentar, comprar, depósitos, contratos, preguntas sobre propiedad y cómo pensar con claridad antes de comprometerte.",
    },
    href: "/guides/renting-vs-buying-in-mexico",
    category: { en: "Housing", es: "Vivienda" },
  },
  {
    title: { en: "Bringing Pets to Mexico", es: "Llevar Mascotas a México" },
    description: {
      en: "Travel documents, airline planning, vet care, rentals, and settling into Mexico with dogs or cats.",
      es: "Documentos de viaje, planificación con la aerolínea, cuidado veterinario, rentas y adaptarte a México con perros o gatos.",
    },
    href: "/guides/bringing-pets-to-mexico",
    category: { en: "Pets", es: "Mascotas" },
  },
  {
    title: { en: "Banking in Mexico as a Foreigner", es: "Banca en México Como Extranjero" },
    description: {
      en: "Opening accounts, handling money, cards, transfers, fees, and financial setup as a foreigner.",
      es: "Abrir cuentas, manejar dinero, tarjetas, transferencias, comisiones y organización financiera como extranjero.",
    },
    href: "/guides/banking-in-mexico-as-a-foreigner",
    category: { en: "Money", es: "Dinero" },
  },
  {
    title: { en: "Internet and Remote Work in Mexico", es: "Internet y Trabajo Remoto en México" },
    description: {
      en: "Internet reliability, mobile data, coworking spaces, backup options, and working online from Mexico.",
      es: "Confiabilidad de internet, datos móviles, espacios de coworking, opciones de respaldo y trabajar en línea desde México.",
    },
    href: "/guides/internet-and-remote-work-in-mexico",
    category: { en: "Remote Work", es: "Trabajo Remoto" },
  },
  {
    title: { en: "Tulum vs Playa del Carmen", es: "Tulum vs Playa del Carmen" },
    description: {
      en: "A practical comparison of cost, lifestyle, transportation, community, infrastructure, and long-term living.",
      es: "Una comparación práctica de costo, estilo de vida, transporte, comunidad, infraestructura y vida a largo plazo.",
    },
    href: "/guides/tulum-vs-playa-del-carmen",
    category: { en: "Location", es: "Ubicación" },
  },
  {
    title: { en: "How Much Money Do You Need to Move to Mexico?", es: "¿Cuánto Dinero Necesitas Para Mudarte a México?" },
    description: {
      en: "Startup costs, monthly budgets, rent, deposits, emergency funds, healthcare, and planning your move.",
      es: "Costos iniciales, presupuestos mensuales, renta, depósitos, fondos de emergencia, salud y planificación de tu mudanza.",
    },
    href: "/guides/how-much-money-do-you-need-to-move-to-mexico",
    category: { en: "Planning", es: "Planificación" },
  },
  {
    title: { en: "Safety in Mexico", es: "Seguridad en México" },
    description: {
      en: "Neighborhoods, common-sense habits, transportation, scams, nightlife, and feeling grounded as a newcomer.",
      es: "Vecindarios, hábitos de sentido común, transporte, estafas, vida nocturna y sentirte con los pies en la tierra como recién llegado.",
    },
    href: "/guides/safety-in-mexico",
    category: { en: "Safety", es: "Seguridad" },
  },
  {
    title: { en: "Grocery Costs in Mexico", es: "Costos de Supermercado en México" },
    description: {
      en: "Supermarkets, local markets, imported foods, weekly budgets, and how daily food costs compare.",
      es: "Supermercados, mercados locales, alimentos importados, presupuestos semanales y cómo se comparan los costos diarios de comida.",
    },
    href: "/guides/grocery-costs-in-mexico",
    category: { en: "Living Costs", es: "Costo De Vida" },
  },
  {
    title: { en: "Moving to Playa del Carmen", es: "Mudarse a Playa del Carmen" },
    description: {
      en: "Neighborhoods, cost of living, rentals, residency, healthcare, lifestyle, and trusted local support.",
      es: "Vecindarios, costo de vida, rentas, residencia, salud, estilo de vida y apoyo local de confianza.",
    },
    href: "/guides/moving-to-playa-del-carmen",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Tulum", es: "Mudarse a Tulum" },
    description: {
      en: "Lifestyle, cost of living, transportation, rentals, wellness culture, and what to expect before settling.",
      es: "Estilo de vida, costo de vida, transporte, rentas, cultura de bienestar y qué esperar antes de instalarte.",
    },
    href: "/guides/moving-to-tulum",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Riviera Maya", es: "Mudarse a la Riviera Maya" },
    description: {
      en: "Playa del Carmen, Tulum, Cancún, Puerto Morelos, healthcare, lifestyle differences, and local support.",
      es: "Playa del Carmen, Tulum, Cancún, Puerto Morelos, salud, diferencias de estilo de vida y apoyo local.",
    },
    href: "/guides/moving-to-riviera-maya",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Mérida", es: "Mudarse a Mérida" },
    description: {
      en: "Colonial architecture, healthcare, cost of living, remote work, climate, and coastal access to Progreso.",
      es: "Arquitectura colonial, salud, costo de vida, trabajo remoto, clima y acceso a la costa en Progreso.",
    },
    href: "/guides/moving-to-merida",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Progreso", es: "Mudarse a Progreso" },
    description: {
      en: "The Gulf Coast's most established beach town, its proximity to Mérida, cost of living, and daily life.",
      es: "El pueblo de playa más consolidado de la Costa del Golfo, su cercanía a Mérida, el costo de vida y la vida diaria.",
    },
    href: "/guides/moving-to-progreso",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Chicxulub Puerto", es: "Mudarse a Chicxulub Puerto" },
    description: {
      en: "Quieter residential beach living next to Progreso, with easy access to Mérida.",
      es: "Vida de playa residencial y tranquila junto a Progreso, con fácil acceso a Mérida.",
    },
    href: "/guides/moving-to-chicxulub-puerto",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Telchac Puerto", es: "Mudarse a Telchac Puerto" },
    description: {
      en: "A small, secluded Gulf Coast community suited to privacy, nature, and a genuinely slower pace of life.",
      es: "Una pequeña y apartada comunidad de la Costa del Golfo, ideal para la privacidad, la naturaleza y un ritmo de vida genuinamente más lento.",
    },
    href: "/guides/moving-to-telchac-puerto",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Celestún", es: "Mudarse a Celestún" },
    description: {
      en: "A mangrove-fringed fishing village on the Ría Celestún Biosphere Reserve, built around nature, quiet, and seasonal flamingo habitat.",
      es: "Un pueblo pesquero bordeado de manglares en la Reserva de la Biosfera Ría Celestún, construido en torno a la naturaleza, la tranquilidad y el hábitat estacional de flamencos.",
    },
    href: "/guides/moving-to-celestun",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Sisal", es: "Mudarse a Sisal" },
    description: {
      en: "A historic Gulf port and Pueblo Mágico — a quiet beach, a restored pier, and real maritime heritage without resort intensity.",
      es: "Un histórico puerto del Golfo y Pueblo Mágico — una playa tranquila, un muelle restaurado y un auténtico patrimonio marítimo sin la intensidad de un resort.",
    },
    href: "/guides/moving-to-sisal",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Dzilam de Bravo", es: "Mudarse a Dzilam de Bravo" },
    description: {
      en: "A working fishing port on the edge of a vast mangrove reserve — the most remote and independent Gulf coast destination on this site.",
      es: "Un puerto pesquero activo al borde de una vasta reserva de manglares — el destino más remoto e independiente de la costa del Golfo en este sitio.",
    },
    href: "/guides/moving-to-dzilam-de-bravo",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Moving to Santa Elena", es: "Mudarse a Santa Elena" },
    description: {
      en: "An inland Puuc-region village built around living Maya and Yucatecan culture — not a beach destination.",
      es: "Un pueblo del interior en la región Puuc, construido en torno a la cultura maya y yucateca viva — no es un destino de playa.",
    },
    href: "/guides/moving-to-santa-elena",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "The Complete Guide to Living in the Yucatán Peninsula", es: "La Guía Completa para Vivir en la Península de Yucatán" },
    description: {
      en: "How to choose between all four Yucatán Peninsula regions Path To Mexico covers, and what responsible relocation here actually looks like.",
      es: "Cómo elegir entre las cuatro regiones de la Península de Yucatán que cubre Path To Mexico, y cómo se ve realmente una reubicación responsable aquí.",
    },
    href: "/guides/living-in-the-yucatan-peninsula",
    category: { en: "Relocation", es: "Reubicación" },
  },
  {
    title: { en: "Canada to Mexico Relocation", es: "Reubicación de Canadá a México" },
    description: {
      en: "Residency, healthcare, banking, taxes, lifestyle, and what Canadians should know before moving.",
      es: "Residencia, salud, banca, impuestos, estilo de vida y lo que los canadienses deben saber antes de mudarse.",
    },
    href: "/guides/canada-to-mexico-relocation",
    category: { en: "Canada", es: "Canadá" },
  },
  {
    title: { en: "US to Mexico Relocation", es: "Reubicación de Estados Unidos a México" },
    description: {
      en: "Healthcare, residency, taxes, banking, lifestyle, and building a new life abroad as an American.",
      es: "Salud, residencia, impuestos, banca, estilo de vida y construir una nueva vida en el extranjero como estadounidense.",
    },
    href: "/guides/us-to-mexico-relocation",
    category: { en: "United States", es: "Estados Unidos" },
  },
  {
    title: { en: "Mexico Residency Support", es: "Apoyo Para La Residencia en México" },
    description: {
      en: "Temporary residency, permanent residency, financial requirements, and legally living in Mexico.",
      es: "Residencia temporal, residencia permanente, requisitos financieros y vivir legalmente en México.",
    },
    href: "/guides/mexico-residency-support",
    category: { en: "Residency", es: "Residencia" },
  },
  {
    title: { en: "Retiring in Mexico", es: "Jubilarse en México" },
    description: {
      en: "Healthcare, costs, lifestyle, residency, and choosing the right location for retirement in Mexico.",
      es: "Salud, costos, estilo de vida, residencia y cómo elegir el lugar adecuado para jubilarte en México.",
    },
    href: "/guides/retiring-in-mexico",
    category: { en: "Retirement", es: "Jubilación" },
  },
  {
    title: { en: "Remote Workers Moving to Mexico", es: "Trabajadores Remotos Que Se Mudan a México" },
    description: {
      en: "Internet, lifestyle, coworking, visas, location choices, and daily life as a remote worker.",
      es: "Internet, estilo de vida, coworking, visas, opciones de ubicación y la vida diaria como trabajador remoto.",
    },
    href: "/guides/remote-workers-moving-to-mexico",
    category: { en: "Remote Work", es: "Trabajo Remoto" },
  },
  {
    title: { en: "Mexico Relocation Checklist", es: "Lista de Verificación Para Mudarte a México" },
    description: {
      en: "Documents, residency, housing, banking, healthcare, insurance, pets, transportation, and first-month setup.",
      es: "Documentos, residencia, vivienda, banca, salud, seguros, mascotas, transporte y la organización del primer mes.",
    },
    href: "/guides/mexico-relocation-checklist",
    category: { en: "Checklist", es: "Lista De Verificación" },
  },
  {
    title: { en: "Responsible Relocation in Mexico", es: "Reubicación Responsable en México" },
    description: {
      en: "Language, local customs, Maya heritage, the environment, and building real relationships as you build a life in Mexico.",
      es: "Idioma, costumbres locales, herencia maya, medio ambiente y cómo construir relaciones reales al construir una vida en México.",
    },
    href: "/guides/responsible-relocation-in-mexico",
    category: { en: "Impact", es: "Impacto" },
  },
  {
    title: { en: "Canadian Taxes When Moving to Mexico", es: "Impuestos Canadienses al Mudarte a México" },
    description: {
      en: "Residency ties, departure tax, CPP, OAS, RRSPs, and the treaty rules every Canadian should understand before leaving Canada for Mexico.",
      es: "Lazos de residencia, impuesto de salida, CPP, OAS, RRSPs y las reglas del tratado que todo canadiense debe entender antes de dejar Canadá por México.",
    },
    href: "/guides/canadian-taxes-moving-to-mexico",
    category: { en: "Canada", es: "Canadá" },
  },
  {
    title: { en: "Moving Household Goods to Mexico from Canada", es: "Mudar Tu Menaje de Casa de Canadá a México" },
    description: {
      en: "Menaje de casa, shipping options, customs rules, and an honest look at what's worth bringing — and what's better bought from local hands in Mexico.",
      es: "Menaje de casa, opciones de envío, reglas aduanales y una mirada honesta a qué vale la pena traer — y qué es mejor comprar de manos locales en México.",
    },
    href: "/guides/moving-household-goods-to-mexico",
    category: { en: "Logistics", es: "Logística" },
  },
];
