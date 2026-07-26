// DEST-003 — one data file backing all 4 regional pages, rendered through a
// single reusable RegionPage.js component (see that file) rather than 4
// hand-built page implementations, matching this ticket's explicit
// engineering rule. Keyed by the same region ids atlasGroups.js already
// defines in REGION_GROUPS — this file only supplies the deeper narrative
// content a region listing page needs beyond what REGION_GROUPS' own
// label/description already carries.
//
// "Interactive destination links" and "regional comparison" reuse existing
// components (CityCard grid, CompareYourMatches) fed by this region's own
// cityIds — no new data duplicated here for either.
//
// "Accessible travel-map treatment": a real cartographic map would require
// a new mapping package (Mapbox/Google Maps), explicitly out of scope
// ("do not install packages"). A plain, accessible travel-time table
// serves the same "how do I get around this region" need without a new
// dependency or the accessibility problems interactive JS maps often carry.
export const REGION_PAGE_CONTENT = {
  "riviera-maya-caribbean": {
    en: {
      overview: "The Caribbean coast of Quintana Roo — the state most people picture first when they think of moving to Mexico's coast. Nine destinations here, from Cancún's real infrastructure hub to Playa del Carmen's polish, Tulum's wellness-forward pace, Cozumel's island separation, and Bacalar's inland lagoon.",
      lifestyle: "The most built-up, most amenity-rich region on this site — walkable town centers, established healthcare, and the largest expat and remote-work communities anywhere Path To Mexico covers. Life here ranges from a genuine city (Cancún's El Centro) to small protected bays (Akumal, Puerto Morelos) and a still-developing frontier further south (Mahahual).",
      climate: "Warm and humid year-round, with a real rainy season from June through October and genuine hurricane exposure — research the season and building standards for any specific town before committing.",
      costPositioning: "Generally the most expensive region on this site, especially in Playa del Carmen and Tulum. Puerto Morelos, Akumal, and Cancún's El Centro run more affordable; Bacalar and Mahahual sit lower still, reflecting their smaller scale.",
      idealClientProfiles: [
        "Remote workers who want the coast's best internet and café/coworking culture",
        "Retirees who want the region's strongest healthcare access",
        "Families wanting established schools and infrastructure",
        "People specifically seeking island life (Cozumel) or a lagoon town (Bacalar) distinct from the beach towns",
      ],
      whyChooseRegion: "Choose this region if you want the most developed infrastructure, the largest community of other newcomers, and the widest range of paces — from a real city to a small protected bay — all within a few hours of each other.",
      responsibleRelocation: "This is the most tourism-developed region on this site, which makes responsible choices here matter more, not less: learn Spanish rather than relying on English-forward tourist areas, support locally-owned businesses over international chains, and research a town's own development pressures — especially in fast-growing Tulum and Bacalar — before buying.",
      travelNotes: [
        { from: "Cancún Intl. Airport", to: "Playa del Carmen", time: "~45 min" },
        { from: "Cancún Intl. Airport", to: "Tulum", time: "~1 hour" },
        { from: "Cancún Intl. Airport", to: "Puerto Morelos", time: "~20–30 min" },
        { from: "Playa del Carmen", to: "Cozumel (via ferry)", time: "~45 min ferry" },
        { from: "Tulum", to: "Bacalar", time: "~1.5–2 hours" },
        { from: "Tulum", to: "Mahahual", time: "~2.5–3 hours" },
      ],
    },
    es: {
      overview: "La costa caribeña de Quintana Roo — el estado que la mayoría imagina primero al pensar en mudarse a la costa de México. Nueve destinos aquí, desde el centro de infraestructura real de Cancún hasta el pulido de Playa del Carmen, el ritmo orientado al bienestar de Tulum, la separación isleña de Cozumel y la laguna interior de Bacalar.",
      lifestyle: "La región más desarrollada y rica en comodidades de este sitio — centros de pueblo caminables, salud establecida, y las comunidades más grandes de extranjeros y trabajo remoto de cualquier lugar que cubre Path To Mexico. La vida aquí va desde una ciudad real (El Centro de Cancún) hasta pequeñas bahías protegidas (Akumal, Puerto Morelos) y una frontera aún en desarrollo más al sur (Mahahual).",
      climate: "Cálido y húmedo todo el año, con una temporada de lluvias real de junio a octubre y exposición genuina a huracanes — investiga la temporada y los estándares de construcción de cualquier pueblo específico antes de decidirte.",
      costPositioning: "Generalmente la región más cara de este sitio, especialmente en Playa del Carmen y Tulum. Puerto Morelos, Akumal y El Centro de Cancún son más accesibles; Bacalar y Mahahual están aún más bajos, reflejando su menor escala.",
      idealClientProfiles: [
        "Trabajadores remotos que quieren el mejor internet y cultura de café/coworking de la costa",
        "Jubilados que quieren el acceso a salud más fuerte de la región",
        "Familias que quieren escuelas e infraestructura establecidas",
        "Personas que buscan específicamente vida isleña (Cozumel) o un pueblo de laguna (Bacalar) distinto de los pueblos de playa",
      ],
      whyChooseRegion: "Elige esta región si quieres la infraestructura más desarrollada, la comunidad más grande de otros recién llegados, y la gama más amplia de ritmos — desde una ciudad real hasta una pequeña bahía protegida — todo a pocas horas de distancia.",
      responsibleRelocation: "Esta es la región más desarrollada turísticamente de este sitio, lo que hace que las decisiones responsables aquí importen más, no menos: aprende español en lugar de depender de áreas turísticas orientadas al inglés, apoya negocios de propiedad local sobre cadenas internacionales, e investiga las propias presiones de desarrollo de un pueblo — especialmente en Tulum y Bacalar, de rápido crecimiento — antes de comprar.",
      travelNotes: [
        { from: "Aeropuerto Internacional de Cancún", to: "Playa del Carmen", time: "~45 min" },
        { from: "Aeropuerto Internacional de Cancún", to: "Tulum", time: "~1 hora" },
        { from: "Aeropuerto Internacional de Cancún", to: "Puerto Morelos", time: "~20–30 min" },
        { from: "Playa del Carmen", to: "Cozumel (vía ferry)", time: "~45 min en ferry" },
        { from: "Tulum", to: "Bacalar", time: "~1.5–2 horas" },
        { from: "Tulum", to: "Mahahual", time: "~2.5–3 horas" },
      ],
    },
  },
  "yucatan-interior": {
    en: {
      overview: "Inland Yucatán state — colonial cities and villages built around culture, not beaches. Six destinations here, from Mérida's real city infrastructure to Valladolid's growing remote-work scene, Izamal's Yellow City character, Santa Elena's Puuc-region culture, and the genuinely local working towns of Tekax and Tizimín.",
      lifestyle: "The most culturally immersive region on this site — restored colonial architecture, living Maya and Yucatecan traditions, and (in Mérida and Valladolid specifically) real, growing infrastructure. Tekax and Tizimín, by contrast, are genuinely local working towns with essentially no tourism or foreign-resident infrastructure at all.",
      climate: "Hot, dry inland heat without the coast's sea breeze — the dry season here can feel more intense than any Caribbean or Gulf coast town on this site.",
      costPositioning: "Generally the most affordable region on this site alongside the Gulf Coast, with a wide range: Mérida offers real city infrastructure at below-coastal prices, while Tekax and Tizimín are among the lowest-cost destinations covered anywhere.",
      idealClientProfiles: [
        "Retirees and remote workers wanting real city infrastructure without coastal prices (Mérida)",
        "Remote workers wanting a smaller, culturally rich base with growing connectivity (Valladolid)",
        "People genuinely seeking deep Maya and colonial culture over beach or resort life (Izamal, Santa Elena)",
        "Only those wanting the most self-sufficient, least newcomer-oriented version of Yucatán life (Tekax, Tizimín)",
      ],
      whyChooseRegion: "Choose this region if beach access isn't your priority and you want real, living Yucatecan culture — from Mérida's established city life to small colonial Pueblos Mágicos and, for a genuinely local experience, working agricultural and ranching towns most visitors never see.",
      responsibleRelocation: "This region's culture is real and lived-in, not staged for visitors — treat it that way. Learning Spanish matters more here than on the coast, since English is far less common outside Mérida and Valladolid's tourist-facing streets. Support local markets and businesses, and in the smaller towns especially (Tekax, Tizimín, Izamal, Santa Elena), understand that you are moving into an existing community's daily life, not a destination built for newcomers.",
      travelNotes: [
        { from: "Mérida International Airport", to: "Mérida Centro", time: "In the city" },
        { from: "Mérida", to: "Valladolid", time: "~1.5–2 hours" },
        { from: "Mérida", to: "Izamal", time: "~50 min" },
        { from: "Mérida", to: "Santa Elena", time: "~1.5 hours" },
        { from: "Mérida", to: "Tekax", time: "~1.5–2 hours" },
        { from: "Mérida", to: "Tizimín", time: "~2 hours" },
        { from: "Valladolid", to: "Cancún Intl. Airport", time: "~2 hours" },
      ],
    },
    es: {
      overview: "El interior del estado de Yucatán — ciudades y pueblos coloniales construidos alrededor de la cultura, no de las playas. Seis destinos aquí, desde la infraestructura de ciudad real de Mérida hasta la creciente escena de trabajo remoto de Valladolid, el carácter de Ciudad Amarilla de Izamal, la cultura de la región Puuc de Santa Elena, y los pueblos de trabajo genuinamente locales de Tekax y Tizimín.",
      lifestyle: "La región más culturalmente inmersiva de este sitio — arquitectura colonial restaurada, tradiciones mayas y yucatecas vivas, y (en Mérida y Valladolid específicamente) infraestructura real y creciente. Tekax y Tizimín, en cambio, son pueblos de trabajo genuinamente locales sin esencialmente ninguna infraestructura turística o de residentes extranjeros.",
      climate: "Calor seco e intenso tierra adentro sin la brisa marina de la costa — la temporada seca aquí puede sentirse más intensa que en cualquier pueblo de la costa caribeña o del Golfo en este sitio.",
      costPositioning: "Generalmente la región más accesible de este sitio junto con la Costa del Golfo, con un rango amplio: Mérida ofrece infraestructura de ciudad real a precios por debajo de los costeros, mientras que Tekax y Tizimín están entre los destinos de menor costo cubiertos en cualquier lugar.",
      idealClientProfiles: [
        "Jubilados y trabajadores remotos que quieren infraestructura de ciudad real sin precios costeros (Mérida)",
        "Trabajadores remotos que quieren una base más pequeña y culturalmente rica con conectividad creciente (Valladolid)",
        "Personas que buscan genuinamente cultura maya y colonial profunda sobre vida de playa o resort (Izamal, Santa Elena)",
        "Solo quienes quieren la versión más autosuficiente y menos orientada a recién llegados de la vida yucateca (Tekax, Tizimín)",
      ],
      whyChooseRegion: "Elige esta región si el acceso a la playa no es tu prioridad y quieres cultura yucateca real y viva — desde la vida de ciudad establecida de Mérida hasta pequeños Pueblos Mágicos coloniales y, para una experiencia genuinamente local, pueblos agrícolas y ganaderos de trabajo que la mayoría de los visitantes nunca ven.",
      responsibleRelocation: "La cultura de esta región es real y vivida, no puesta en escena para visitantes — trátala así. Aprender español importa más aquí que en la costa, ya que el inglés es mucho menos común fuera de las calles turísticas de Mérida y Valladolid. Apoya mercados y negocios locales, y en los pueblos más pequeños especialmente (Tekax, Tizimín, Izamal, Santa Elena), entiende que te estás mudando a la vida diaria de una comunidad existente, no a un destino construido para recién llegados.",
      travelNotes: [
        { from: "Aeropuerto Internacional de Mérida", to: "Centro de Mérida", time: "En la ciudad" },
        { from: "Mérida", to: "Valladolid", time: "~1.5–2 horas" },
        { from: "Mérida", to: "Izamal", time: "~50 min" },
        { from: "Mérida", to: "Santa Elena", time: "~1.5 horas" },
        { from: "Mérida", to: "Tekax", time: "~1.5–2 horas" },
        { from: "Mérida", to: "Tizimín", time: "~2 horas" },
        { from: "Valladolid", to: "Aeropuerto Internacional de Cancún", time: "~2 horas" },
      ],
    },
  },
  "gulf-coast": {
    en: {
      overview: "The established Yucatán Gulf coast near Mérida — six destinations from Progreso's real beach-town infrastructure to the quieter Chelem, Chicxulub Puerto, Chuburná Puerto, and Telchac Puerto, plus historic Sisal.",
      lifestyle: "A genuinely calmer, more residential version of coastal life than the Caribbean coast — no resort strip, no tourist crowds beyond weekend visitors from Mérida, and a direct, uncomplicated connection to the Peninsula's real healthcare and infrastructure hub.",
      climate: "Open Gulf breeze with the same general rainy season pattern as the Caribbean coast, generally with less hurricane exposure given its position on the Gulf rather than the open Caribbean.",
      costPositioning: "Among the most affordable coastal living on this site — even Progreso, the most developed of these towns, runs well below Playa del Carmen or Tulum's costs. Telchac Puerto and Chuburná Puerto sit lowest.",
      idealClientProfiles: [
        "People who want real Gulf coast beach access with Mérida's hospitals and airport close by",
        "Retirees and families wanting an established, accessible beach town (Progreso, Sisal)",
        "People wanting a genuinely quieter residential alternative just steps away (Chelem, Chicxulub Puerto)",
        "Those wanting real seclusion without leaving the coast entirely (Telchac Puerto, Chuburná Puerto)",
      ],
      whyChooseRegion: "Choose this region if you want real Gulf coast beach living at meaningfully lower cost than the Caribbean side, with Mérida's hospitals, airport, and city services always within a single, direct coastal highway drive.",
      responsibleRelocation: "This region's towns are genuine, working Gulf coast communities, not resort towns — support the local businesses and fishing economy that predate any tourism interest, and be mindful that towns like Telchac Puerto have historically been marketed with unrealistic property-value promises; approach any purchase with independent research, not a sales pitch.",
      travelNotes: [
        { from: "Mérida International Airport", to: "Progreso", time: "~30–40 min" },
        { from: "Mérida", to: "Chicxulub Puerto", time: "~35–45 min" },
        { from: "Mérida", to: "Chelem", time: "~40–50 min" },
        { from: "Mérida", to: "Sisal", time: "~1 hour" },
        { from: "Mérida", to: "Telchac Puerto", time: "~1 hour" },
        { from: "Mérida", to: "Chuburná Puerto", time: "~45–55 min" },
      ],
    },
    es: {
      overview: "La establecida costa del Golfo de Yucatán cerca de Mérida — seis destinos desde la infraestructura real de pueblo de playa de Progreso hasta los más tranquilos Chelem, Chicxulub Puerto, Chuburná Puerto y Telchac Puerto, además del histórico Sisal.",
      lifestyle: "Una versión genuinamente más tranquila y residencial de la vida costera que la costa caribeña — sin franja de resorts, sin multitudes turísticas más allá de visitantes de fin de semana desde Mérida, y una conexión directa y sencilla con el centro real de salud e infraestructura de la península.",
      climate: "Brisa abierta del Golfo con el mismo patrón general de temporada de lluvias que la costa caribeña, generalmente con menos exposición a huracanes dada su posición en el Golfo en lugar del Caribe abierto.",
      costPositioning: "Entre las vidas costeras más accesibles de este sitio — incluso Progreso, el más desarrollado de estos pueblos, está bien por debajo de los costos de Playa del Carmen o Tulum. Telchac Puerto y Chuburná Puerto están en el nivel más bajo.",
      idealClientProfiles: [
        "Personas que quieren acceso real a la playa de la costa del Golfo con los hospitales y el aeropuerto de Mérida cerca",
        "Jubilados y familias que quieren un pueblo de playa establecido y accesible (Progreso, Sisal)",
        "Personas que quieren una alternativa residencial genuinamente más tranquila a pocos pasos (Chelem, Chicxulub Puerto)",
        "Quienes quieren un alejamiento real sin dejar la costa por completo (Telchac Puerto, Chuburná Puerto)",
      ],
      whyChooseRegion: "Elige esta región si quieres vida real de playa en la costa del Golfo a un costo significativamente menor que el lado caribeño, con los hospitales, el aeropuerto y los servicios de ciudad de Mérida siempre a un solo viaje directo por la carretera costera.",
      responsibleRelocation: "Los pueblos de esta región son comunidades genuinas y de trabajo de la costa del Golfo, no pueblos de resort — apoya los negocios locales y la economía pesquera que preceden a cualquier interés turístico, y ten en cuenta que pueblos como Telchac Puerto históricamente han sido comercializados con promesas poco realistas de valor de propiedad; aborda cualquier compra con investigación independiente, no con un discurso de ventas.",
      travelNotes: [
        { from: "Aeropuerto Internacional de Mérida", to: "Progreso", time: "~30–40 min" },
        { from: "Mérida", to: "Chicxulub Puerto", time: "~35–45 min" },
        { from: "Mérida", to: "Chelem", time: "~40–50 min" },
        { from: "Mérida", to: "Sisal", time: "~1 hora" },
        { from: "Mérida", to: "Telchac Puerto", time: "~1 hora" },
        { from: "Mérida", to: "Chuburná Puerto", time: "~45–55 min" },
      ],
    },
  },
  "hidden-gems": {
    en: {
      overview: "The most remote, nature-first destinations this site covers — Celestún and Dzilam de Bravo's mangrove-fringed fishing villages, and El Cuyo and Río Lagartos on the state's northern tip, at the edge of major biosphere reserves.",
      lifestyle: "Built around nature and self-sufficiency, not tourism or convenience — these are genuine working fishing villages, several right at the edge of biosphere reserves, with minimal services and the least newcomer-oriented infrastructure this site covers.",
      climate: "Coastal Gulf/estuary climate with real humidity near the mangroves and estuaries — similar seasonal pattern to the rest of the Gulf coast, with generally less hurricane exposure than the Caribbean side.",
      costPositioning: "Among the lowest costs of living this site covers — modest housing and grocery costs, offset by genuinely limited local services to spend on.",
      idealClientProfiles: [
        "People who want a real biosphere reserve and its wildlife as their actual daily backdrop, not a manufactured experience",
        "Those who genuinely prioritize seclusion and nature over convenience or community",
        "Remote workers willing to trade infrastructure reliability for real quiet (with realistic expectations about internet)",
        "Not a fit for anyone wanting turn-key services, an established expat community, or nearby major healthcare",
      ],
      whyChooseRegion: "Choose this region only if you genuinely want the least developed, most nature-centered version of Yucatán coastal life on this site — real biosphere reserves, working fishing villages, and minimal services, not a hidden version of the Caribbean coast's amenities.",
      responsibleRelocation: "These towns' ecosystems are ecologically significant and genuinely fragile — respect reserve boundaries, seasonal wildlife (flamingos and other species are never guaranteed and shouldn't be disturbed), and existing fishing livelihoods that predate any outside interest. Growing attention to towns like El Cuyo and Bacalar brings real responsibility: this ticket's own guidance applies directly here — approach these places for their long-term community and ecological suitability, never as a speculative or 'undiscovered' investment opportunity.",
      travelNotes: [
        { from: "Mérida International Airport", to: "Celestún", time: "~1.5 hours" },
        { from: "Mérida", to: "Dzilam de Bravo", time: "~1.5–2 hours" },
        { from: "Mérida or Cancún Intl.", to: "El Cuyo", time: "~2.5–3 hours" },
        { from: "Mérida or Cancún Intl.", to: "Río Lagartos", time: "~2.5–3 hours" },
        { from: "Tizimín", to: "El Cuyo / Río Lagartos", time: "~45 min–1 hour (regional supply town)" },
      ],
    },
    es: {
      overview: "Los destinos más remotos y centrados en la naturaleza que cubre este sitio — los pueblos pesqueros bordeados de manglares de Celestún y Dzilam de Bravo, y El Cuyo y Río Lagartos en la punta norte del estado, al borde de importantes reservas de biosfera.",
      lifestyle: "Construidos alrededor de la naturaleza y la autosuficiencia, no del turismo o la conveniencia — estos son pueblos pesqueros de trabajo genuinos, varios justo al borde de reservas de biosfera, con servicios mínimos y la infraestructura menos orientada a recién llegados que cubre este sitio.",
      climate: "Clima costero de Golfo/estuario con humedad real cerca de los manglares y estuarios — patrón estacional similar al resto de la costa del Golfo, con generalmente menos exposición a huracanes que el lado caribeño.",
      costPositioning: "Entre los costos de vida más bajos que cubre este sitio — costos modestos de vivienda y alimentos, compensados por servicios locales genuinamente limitados en los que gastar.",
      idealClientProfiles: [
        "Personas que quieren una reserva de biosfera real y su vida silvestre como su telón de fondo diario real, no una experiencia fabricada",
        "Quienes priorizan genuinamente el aislamiento y la naturaleza sobre la conveniencia o la comunidad",
        "Trabajadores remotos dispuestos a cambiar confiabilidad de infraestructura por tranquilidad real (con expectativas realistas sobre el internet)",
        "No es adecuado para quienes quieren servicios listos para usar, una comunidad de extranjeros establecida, o salud importante cercana",
      ],
      whyChooseRegion: "Elige esta región solo si genuinamente quieres la versión menos desarrollada y más centrada en la naturaleza de la vida costera yucateca en este sitio — reservas de biosfera reales, pueblos pesqueros de trabajo y servicios mínimos, no una versión escondida de las comodidades de la costa caribeña.",
      responsibleRelocation: "Los ecosistemas de estos pueblos son ecológicamente significativos y genuinamente frágiles — respeta los límites de las reservas, la vida silvestre estacional (los flamencos y otras especies nunca están garantizados y no deben perturbarse), y los medios de vida pesqueros existentes que preceden a cualquier interés externo. La creciente atención a pueblos como El Cuyo y Bacalar trae responsabilidad real: la propia guía de este sitio aplica directamente aquí — aborda estos lugares por su idoneidad comunitaria y ecológica a largo plazo, nunca como una oportunidad de inversión especulativa o 'sin descubrir'.",
      travelNotes: [
        { from: "Aeropuerto Internacional de Mérida", to: "Celestún", time: "~1.5 horas" },
        { from: "Mérida", to: "Dzilam de Bravo", time: "~1.5–2 horas" },
        { from: "Mérida o Cancún", to: "El Cuyo", time: "~2.5–3 horas" },
        { from: "Mérida o Cancún", to: "Río Lagartos", time: "~2.5–3 horas" },
        { from: "Tizimín", to: "El Cuyo / Río Lagartos", time: "~45 min–1 hora (pueblo de abastecimiento regional)" },
      ],
    },
  },
};
