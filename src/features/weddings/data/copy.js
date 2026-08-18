// Weddings — Maya Weddings & Sacred Unions in the Jungle of Tulum.
// All visible copy for /weddings and /weddings/inquire, EN + ES, following
// the established page-local `{ en, es }` convention (see
// src/utils/language.js).
//
// POSITIONING (V2 — jungle-only model): PTM offers ONE ceremonial
// experience — a private jungle setting in the Tulum area — not a menu of
// destination-wedding venues. Do not reintroduce venue-choice language
// (ballroom / beach / cenote / hacienda / villa); copy.test.js enforces
// this.
//
// Cultural + legal guardrails baked into this copy — do not loosen them
// when editing:
//   * Ceremonies are Maya-led, created with Maya ceremonial practitioners
//     and guided by living tradition — never a historical recreation,
//     never invented tradition, never PTM as the spiritual authority.
//   * Prefer "Maya ceremonial leader / practitioner" over the tourism
//     word "shaman" (also test-enforced).
//   * Ceremony elements are always "may include, depending on the
//     practitioner" — never a guaranteed or historically universal list.
//   * No specific practitioner is promised until confirmed; no names,
//     testimonials, counts, prices, menus, or credentials are invented.
//   * Wellness copy never promises outcomes or implies medical care.
//   * Ceremonies are symbolic/spiritual unless the couple separately
//     completes the civil process; legal requirements are never stated
//     as fixed facts.
//   * The ceremonial setting is private — no precise location, no
//     implication of public access.
//
// NOTE: scripts/prerender-meta.mjs (SEO-engine release) extracts
// `seoTitle:`/`seoDescription:` (and the inquiry* variants) from this file
// via regex — keep the EN block first and keep those four values as plain
// double-quoted literals with no inner double quotes.

export const WEDDINGS_CONTENT = {
  en: {
    seoTitle: "Maya Weddings in Tulum | Jungle Ceremonies | Path To Mexico",
    seoDescription:
      "Create an intimate Maya-led wedding or sacred union in a private jungle setting in Tulum, coordinated with trusted ceremonial practitioners and local partners.",
    inquirySeoTitle: "Begin Your Maya Ceremony in Tulum",
    inquirySeoDescription:
      "Tell us what you want the ceremony to mean and how you want it to feel — and Path To Mexico will help shape a private Maya-led jungle ceremony in Tulum around it.",
    toggle: "ES",
    backToSite: "Path To Mexico",

    hero: {
      eyebrow: "Weddings · Tulum, Quintana Roo",
      title: "Maya Weddings & Sacred Unions",
      subtitle: "In the Jungle of Tulum",
      paragraphs: [
        "There are places that need no stage. Deep within the jungle of Tulum, Path To Mexico creates intimate Maya ceremonial weddings shaped around the land, the people who carry the traditions, and the meaning of the union itself.",
        "This is not a resort wedding moved into the jungle. The jungle is the experience.",
      ],
      ctaPrimary: "Begin Your Ceremony",
      ctaSecondary: "Explore The Experience",
      caption: "Tulum · Quintana Roo",
      imageAlt: "A quiet jungle-shaded street of limestone and stucco in Tulum, morning light coming through the trees",
    },

    philosophy: {
      label: "One Place. One Ceremony.",
      titleLead: "We are not building another destination-wedding company.",
      titleAccent: "We are creating one ceremony, with the people who carry it.",
      paragraphs: [
        "There is no menu of settings here, and no list of packages. The ceremony takes place in one private jungle setting in the Tulum area — a place being prepared specifically for this experience. Maya ceremonial leaders determine and lead the ceremonial practices; Path To Mexico's role is to coordinate everything around them.",
        "Narrower on purpose. Because one place, held properly, goes deeper than a hundred options.",
      ],
      pull: "A ceremony that belongs to the place.",
    },

    jungle: {
      label: "The Setting",
      title: "The jungle is the experience.",
      paragraphs: [
        "The ceremony takes place within a private jungle setting in the Tulum area. No rotating list of commercial venues — one place, prepared specifically for this experience.",
        "The landscape becomes part of the ceremony: trees, earth, fire, copal smoke, food, sound, darkness, and candlelight, with the jungle holding the gathering in a way no built room can.",
        "We are developing this setting intentionally — enough comfort for hospitality, food, ceremony, and gathering, and no more. The goal was never to build a wedding venue in the jungle. It is to keep the character of the place intact, because that character is the reason to be here.",
      ],
      note: "The setting is private. Its location is shared with couples and their guests as part of planning — it is not published, and it is not open to the public.",
    },

    ceremony: {
      label: "The Ceremony",
      title: "Led by Maya practitioners. Shaped around the two of you.",
      paragraphs: [
        "The ceremonial practices are determined and led by Maya ceremonial leaders and practitioners, guided by living tradition and their own knowledge. Path To Mexico's role is to produce and coordinate — to bring the right people, place, and moment together — never to stand in as the spiritual authority.",
        "Ceremonial leadership is arranged in advance through Path To Mexico's trusted practitioner network — Maya ceremonial leaders primarily connected to Yucatán, with scheduling and travel coordinated as part of the experience. No specific practitioner is promised until confirmed.",
        "No two ceremonies follow the same script, and none of this is presented as a fixed or historically universal Maya wedding ritual. What takes place is decided by the practitioner leading it and the two of you.",
      ],
      elementsLead: "Depending on the practitioner and the ceremony itself, elements may include:",
      elements: [
        "Ceremonial preparation",
        "Ceremonial cleansing",
        "Copal",
        "Fire",
        "Flowers",
        "Natural materials",
        "A ceremonial altar",
        "Acknowledgement of the directions",
        "The sound of the conch",
        "Cacao",
        "Maize",
        "Blessings",
        "Spoken intentions",
        "Vows",
        "Music",
        "Food",
        "The gathering around the couple",
        "Symbolic union elements determined by the ceremonial leader",
      ],
    },

    culture: {
      label: "Respect For The Culture",
      title: "Maya culture is living culture.",
      quote: "Our intention is never to turn it into decoration.",
      paragraphs: [
        "The Yucatán Peninsula is Maya land — home to a people, a language, and traditions that are very much alive today. We do not recreate an imagined ancient wedding, and we do not invent ritual for atmosphere.",
        "The experience intentionally takes the ceremony away from the commercial resort environment and places it within the Maya jungle landscape of Tulum. Its strength comes from what is created now, with Maya practitioners — from the people, the place, the preparation, and the relationships — not from claims about the past. What the practitioners choose to share, and how, is theirs to decide.",
        "This is the same commitment that shapes everything Path To Mexico does — celebration, like relocation, should leave the place and its people better than it found them.",
      ],
      cta: "Our Impact Commitment",
    },

    network: {
      label: "The People Behind The Ceremony",
      title: "The experience is built around people, not packages.",
      text: "Path To Mexico's strength is its relationships — Maya ceremonial leaders and practitioners primarily connected to Yucatán, and the local people who prepare, cook, play, and host. Each ceremony is assembled from that network around what the couple actually wants. No one participates by default, and no ceremony uses everyone.",
      groups: [
        {
          title: "Ceremony",
          roles: ["Maya ceremonial leaders", "Supporting practitioners"],
        },
        {
          title: "Food",
          roles: ["Regional & Maya cooks", "Ceremonial meals, where arranged"],
        },
        {
          title: "Music",
          roles: ["Local & traditional musicians"],
        },
        {
          title: "Preparation",
          roles: ["Natural decoration & altar", "Flowers", "Fire & lighting", "Seating & the ceremonial environment"],
        },
        {
          title: "Hospitality",
          roles: ["Path To Mexico coordination", "Guest arrival & transportation", "Food service", "Practical support"],
        },
      ],
      note: "Licensed health professionals in our wider network provide their services independently and separately from wellness experiences — coordination never replaces professional care.",
    },

    food: {
      label: "The Food",
      title: "Food as part of the ceremony, not a service behind it.",
      paragraphs: [
        "Where arranged through the participating Maya and local network, the gathering can include regional and Maya food prepared by people connected to the ceremony — cooked at the setting, shared around the couple, part of the evening itself.",
        "The food offering is being built with the people who will prepare it, not invented in advance. Menus take shape for each celebration, with the cooks, rather than being printed in a brochure.",
      ],
    },

    wellness: {
      label: "Ceremony + Wellness",
      title: "Arrive settled. Leave restored.",
      text: "A ceremony is more than one day of standing still. Around it, optional experiences can be arranged with qualified local practitioners — before, between, or after.",
      itemsLead: "Where provided by qualified local practitioners, optional experiences may include:",
      items: [
        "Temazcal",
        "Massage",
        "Bodywork",
        "Breathwork",
        "Meditation",
        "Sound experiences",
        "Cacao ceremony",
        "Herbal traditions",
        "Pre-ceremony grounding sessions",
        "Couples wellness sessions",
        "A post-ceremony restoration day",
      ],
      note: "These are wellness experiences, not medical treatment. Nothing here is offered as healthcare, and no outcome is promised. Anything involving licensed healthcare remains separate and is arranged directly with the appropriate professionals.",
    },

    types: {
      label: "Kinds Of Union",
      title: "One ceremonial model. Every kind of union.",
      cards: [
        ["Weddings", "An intimate ceremony and gathering, held in the jungle."],
        ["Elopements", "Just the two of you, the practitioners, and the place."],
        ["Commitment Ceremonies", "Personal unions outside a conventional wedding structure."],
        ["Vow Renewals", "Return to one another somewhere unrepeatable."],
        ["LGBTQ+ Unions", "Inclusive, personal ceremonies — never forced into a template."],
        ["Anniversary Ceremonies", "A recommitment built around a milestone worth honoring."],
      ],
    },

    complete: {
      label: "The Complete Experience",
      title: "The ceremony is the center. Everything around it can be carried too.",
      text: "From practitioner travel to guest transportation and the preparation of the ceremonial setting, Path To Mexico coordinates the moving pieces behind the experience — so the ceremony itself can remain intimate and focused.",
      stages: [
        {
          number: "01",
          title: "The Ceremony",
          items: [
            "Practitioner coordination & travel",
            "Ceremonial preparation",
            "Natural decoration & altar",
            "Fire & lighting",
            "Hair & makeup",
          ],
        },
        {
          number: "02",
          title: "The Table",
          items: [
            "Regional & Maya food, where arranged",
            "Ceremonial meals",
            "Welcome gatherings",
            "Post-ceremony brunch",
          ],
        },
        {
          number: "03",
          title: "The Story",
          items: ["Photography", "Film"],
        },
        {
          number: "04",
          title: "The Stay",
          items: ["Accommodations in and around Tulum", "Guest transportation", "Airport transfers"],
        },
        {
          number: "05",
          title: "Beyond",
          items: ["Excursions & wellness additions", "Honeymoon support", "Mexico travel concierge"],
        },
      ],
      note: "Accommodation is coordinated separately, in and around Tulum — the jungle setting is held for the ceremony itself.",
    },

    journey: {
      label: "The Experience",
      title: "Four days, as one example.",
      intro: "This is a rhythm, not a package. Every experience is shaped from scratch around the couple and the ceremony.",
      days: [
        {
          number: "01",
          name: "Arrival",
          lines: ["Guests arrive in Tulum and settle into their accommodations.", "A welcome dinner, if the couple wants one."],
        },
        {
          number: "02",
          name: "Preparation",
          lines: ["An open day — a gathering, a wellness session, a shared meal, or simply time together before the ceremony."],
        },
        {
          number: "03",
          name: "The Ceremony",
          lines: [
            "Transportation to the private jungle setting.",
            "The ceremony, led by Maya ceremonial practitioners.",
            "Food. Music. The gathering, into the night.",
          ],
        },
        {
          number: "04",
          name: "After",
          lines: ["A slow morning. Brunch.", "Rest, excursions, the honeymoon — or the road home."],
        },
      ],
    },

    legal: {
      label: "Symbolic & Legal Marriage",
      title: "One ceremony for the heart. One process for the paperwork.",
      paragraphs: [
        "The Maya ceremonial weddings and sacred unions offered through this experience are generally symbolic or spiritual ceremonies. On their own, they do not create a legally recognized marriage.",
        "Couples who want a legally recognized Mexican civil marriage can ask us to help coordinate with appropriate local legal and civil professionals. Requirements may vary based on nationality, municipality, documentation, and individual circumstances — so we will not quote fixed requirements here, and nothing on this page is legal advice or a guarantee.",
        "Many couples handle the legal step at home and hold the ceremony that matters here. Both paths are normal, and we will be clear with you about which is which.",
      ],
    },

    responsible: {
      title: "Celebrate Mexico. Respect Mexico.",
      paragraphs: [
        "A ceremony brings money, attention, and guests into a place. We want all of that to land well — for the practitioners who lead, the communities they come from, the land that holds the ceremony, the local businesses, and the nature that makes any of it possible.",
        "In practice that means prioritizing local people and responsible sourcing wherever we can, treating cultural elements as something shared with us rather than extracted from the place, and leaving the jungle the way a good guest would.",
      ],
      ctaImpact: "Read Our Impact Commitment",
      ctaGuide: "The Responsible Relocation Guide",
    },

    closing: {
      label: "Begin",
      title: "Your wedding should not feel like anyone else's.",
      paragraphs: [
        "Tell us the feeling. The people. Even the parts you cannot quite describe yet.",
        "We'll help build the ceremony from there.",
      ],
      qualification: "Every ceremony begins differently. Tell us what you are imagining, and we'll determine what can be created around it.",
      ctaPrimary: "Begin Your Ceremony",
      ctaSecondary: "Start A Conversation",
    },

    inquiry: {
      eyebrow: "Weddings · Inquiry",
      title: "Start with the feeling.",
      lead: "Every ceremony begins differently. Tell us what you are imagining — even loosely — and we'll determine what can be created around it. Nothing is confirmed until the ceremonial leadership and dates are, so think of this as the first conversation, not a booking form.",
      assurances: [
        "Read personally — never by a system.",
        "We reply by email or WhatsApp.",
        "Nothing is promised until practitioners and dates are confirmed.",
      ],
      groupYou: "You",
      groupDay: "The Ceremony",
      groupFeeling: "The Feeling",
      labels: {
        coupleNames: "Your names",
        email: "Email",
        phone: "WhatsApp or phone",
        country: "Country",
        weddingDate: "Preferred date",
        flexibleDates: "Are your dates flexible?",
        guestCount: "Estimated guest count",
        ceremonyType: "Type of union",
        scope: "Ceremony only, or a broader Tulum experience?",
        accommodation: "Would guests need accommodation coordination?",
        transportation: "Would guests need transportation coordination?",
        foodInterest: "Interested in the ceremonial meal & food experience?",
        wellnessInterest: "Interested in wellness experiences?",
        legalAssistance: "Legal marriage assistance needed?",
        budgetRange: "Approximate overall budget",
        feeling: "What do you want this ceremony to mean, or feel like?",
        anythingElse: "Anything else we should know?",
      },
      placeholders: {
        coupleNames: "Both of you",
        email: "you@example.com",
        phone: "+1 …",
        country: "Where you live now",
        weddingDate: "A month, a season, a year — however precise it is",
        feeling: "Quiet. Barefoot. Firelight under the trees. Thirty people around you. However it comes to you.",
        anythingElse: "Guests, family, worries, half-formed ideas — anything.",
      },
      options: {
        select: "Select…",
        flexibleDates: ["Yes, flexible", "No, the date is set"],
        guestCount: ["Just us", "Up to 10", "10–30", "30–60", "More than 60"],
        ceremonyType: [
          "Wedding",
          "Elopement",
          "Commitment ceremony",
          "Vow renewal",
          "Anniversary ceremony",
          "Not sure yet",
        ],
        scope: ["Ceremony only", "A broader Tulum experience", "Not sure yet"],
        yesNoUnsure: ["Yes", "No", "Not sure"],
        budgetRange: [
          "Under $10,000 USD",
          "$10,000–$25,000 USD",
          "$25,000–$50,000 USD",
          "More than $50,000 USD",
          "We'd rather discuss it",
        ],
      },
      optionalTag: "Optional",
      submitting: "Sending…",
      submit: "Send Inquiry",
      successTitle: "It has begun.",
      successText: "Your inquiry is with us, and it will be read personally — not by a system. We'll reply by email or WhatsApp. If what you're imagining is something we can hold well with our practitioners and our setting, we'll start shaping it together.",
      successBack: "Return To Weddings",
      successExplore: "Explore The Yucatán",
    },
  },

  es: {
    seoTitle: "Bodas Mayas en Tulum | Ceremonias en la Selva | Path To Mexico",
    seoDescription:
      "Crea una boda maya íntima o una unión sagrada en un entorno privado de selva en Tulum, coordinada con practicantes ceremoniales de confianza y socios locales.",
    inquirySeoTitle: "Comienza Tu Ceremonia Maya en Tulum",
    inquirySeoDescription:
      "Cuéntanos qué quieres que la ceremonia signifique y cómo quieres que se sienta — y Path To Mexico te ayudará a dar forma a una ceremonia maya privada en la selva de Tulum alrededor de ello.",
    toggle: "EN",
    backToSite: "Path To Mexico",

    hero: {
      eyebrow: "Bodas · Tulum, Quintana Roo",
      title: "Bodas Mayas y Uniones Sagradas",
      subtitle: "En la Selva de Tulum",
      paragraphs: [
        "Hay lugares que no necesitan escenario. En lo profundo de la selva de Tulum, Path To Mexico crea bodas ceremoniales mayas íntimas, formadas alrededor de la tierra, de las personas que portan las tradiciones y del significado de la unión misma.",
        "Esto no es una boda de resort trasladada a la selva. La selva es la experiencia.",
      ],
      ctaPrimary: "Comienza Tu Ceremonia",
      ctaSecondary: "Explora La Experiencia",
      caption: "Tulum · Quintana Roo",
      imageAlt: "Una calle tranquila de piedra caliza y estuco bajo la sombra de la selva en Tulum, con luz de mañana entre los árboles",
    },

    philosophy: {
      label: "Un Lugar. Una Ceremonia.",
      titleLead: "No estamos construyendo otra empresa de bodas de destino.",
      titleAccent: "Estamos creando una ceremonia, con las personas que la portan.",
      paragraphs: [
        "Aquí no hay un menú de escenarios ni una lista de paquetes. La ceremonia se celebra en un solo entorno privado de selva en la zona de Tulum — un lugar que se prepara específicamente para esta experiencia. Los líderes ceremoniales mayas determinan y guían las prácticas ceremoniales; el papel de Path To Mexico es coordinar todo lo demás alrededor de ellos.",
        "Más estrecho a propósito. Porque un solo lugar, sostenido como se debe, llega más profundo que cien opciones.",
      ],
      pull: "Una ceremonia que pertenece al lugar.",
    },

    jungle: {
      label: "El Entorno",
      title: "La selva es la experiencia.",
      paragraphs: [
        "La ceremonia se celebra en un entorno privado de selva en la zona de Tulum. Sin lista rotativa de recintos comerciales — un solo lugar, preparado específicamente para esta experiencia.",
        "El paisaje se vuelve parte de la ceremonia: árboles, tierra, fuego, humo de copal, comida, sonido, oscuridad y luz de velas, con la selva sosteniendo la reunión como ningún espacio construido puede hacerlo.",
        "Estamos desarrollando este entorno de manera intencional — la comodidad suficiente para la hospitalidad, la comida, la ceremonia y la reunión, y nada más. La meta nunca fue construir un recinto de bodas en la selva. Es mantener intacto el carácter del lugar, porque ese carácter es la razón de estar aquí.",
      ],
      note: "El entorno es privado. Su ubicación se comparte con las parejas y sus invitados como parte de la planeación — no se publica, y no está abierto al público.",
    },

    ceremony: {
      label: "La Ceremonia",
      title: "Guiada por practicantes mayas. Formada alrededor de ustedes dos.",
      paragraphs: [
        "Las prácticas ceremoniales las determinan y guían líderes y practicantes ceremoniales mayas, orientados por la tradición viva y su propio conocimiento. El papel de Path To Mexico es producir y coordinar — reunir a las personas, el lugar y el momento correctos — nunca asumir el lugar de la autoridad espiritual.",
        "El liderazgo ceremonial se organiza con anticipación a través de la red de practicantes de confianza de Path To Mexico — líderes ceremoniales mayas principalmente vinculados a Yucatán, con la agenda y el traslado coordinados como parte de la experiencia. Ningún practicante específico se promete hasta estar confirmado.",
        "No hay dos ceremonias que sigan el mismo guion, y nada de esto se presenta como un ritual maya fijo o históricamente universal. Lo que sucede lo deciden el practicante que la guía y ustedes dos.",
      ],
      elementsLead: "Dependiendo del practicante y de la ceremonia misma, los elementos pueden incluir:",
      elements: [
        "Preparación ceremonial",
        "Limpia ceremonial",
        "Copal",
        "Fuego",
        "Flores",
        "Materiales naturales",
        "Un altar ceremonial",
        "Reconocimiento de los rumbos",
        "El sonido del caracol",
        "Cacao",
        "Maíz",
        "Bendiciones",
        "Intenciones habladas",
        "Votos",
        "Música",
        "Comida",
        "La reunión alrededor de la pareja",
        "Elementos simbólicos de unión determinados por quien guía la ceremonia",
      ],
    },

    culture: {
      label: "Respeto Por La Cultura",
      title: "La cultura maya es cultura viva.",
      quote: "Nuestra intención nunca es convertirla en decoración.",
      paragraphs: [
        "La Península de Yucatán es tierra maya — hogar de un pueblo, un idioma y tradiciones que siguen plenamente vivas hoy. No recreamos una boda antigua imaginada, ni inventamos rituales para crear ambiente.",
        "La experiencia aleja intencionalmente la ceremonia del entorno comercial de resort y la coloca dentro del paisaje de selva maya de Tulum. Su fuerza viene de lo que se crea ahora, con practicantes mayas — de las personas, el lugar, la preparación y las relaciones — no de afirmaciones sobre el pasado. Qué eligen compartir los practicantes, y cómo, es decisión suya.",
        "Este es el mismo compromiso que da forma a todo lo que hace Path To Mexico — una celebración, como una reubicación, debería dejar al lugar y a su gente mejor de como los encontró.",
      ],
      cta: "Nuestro Compromiso De Impacto",
    },

    network: {
      label: "Las Personas Detrás De La Ceremonia",
      title: "La experiencia se construye alrededor de personas, no de paquetes.",
      text: "La fuerza de Path To Mexico son sus relaciones — líderes y practicantes ceremoniales mayas principalmente vinculados a Yucatán, y las personas locales que preparan, cocinan, tocan y reciben. Cada ceremonia se arma desde esa red alrededor de lo que la pareja realmente quiere. Nadie participa por defecto, y ninguna ceremonia los usa a todos.",
      groups: [
        {
          title: "Ceremonia",
          roles: ["Líderes ceremoniales mayas", "Practicantes de apoyo"],
        },
        {
          title: "Comida",
          roles: ["Cocineras y cocineros regionales y mayas", "Comidas ceremoniales, cuando se organizan"],
        },
        {
          title: "Música",
          roles: ["Músicos locales y tradicionales"],
        },
        {
          title: "Preparación",
          roles: ["Decoración natural y altar", "Flores", "Fuego e iluminación", "Asientos y el entorno ceremonial"],
        },
        {
          title: "Hospitalidad",
          roles: ["Coordinación de Path To Mexico", "Llegada y transporte de invitados", "Servicio de comida", "Apoyo práctico"],
        },
      ],
      note: "Los profesionales de la salud con licencia dentro de nuestra red más amplia brindan sus servicios de manera independiente y separada de las experiencias de bienestar — la coordinación nunca sustituye la atención profesional.",
    },

    food: {
      label: "La Comida",
      title: "La comida como parte de la ceremonia, no un servicio detrás de ella.",
      paragraphs: [
        "Cuando se organiza a través de la red maya y local participante, la reunión puede incluir comida regional y maya preparada por personas conectadas con la ceremonia — cocinada en el lugar, compartida alrededor de la pareja, parte de la noche misma.",
        "La propuesta de comida se construye con las personas que la prepararán, no se inventa por adelantado. Los menús toman forma para cada celebración, con quienes cocinan, en lugar de imprimirse en un folleto.",
      ],
    },

    wellness: {
      label: "Ceremonia + Bienestar",
      title: "Llegar en calma. Irse restaurado.",
      text: "Una ceremonia es más que un solo día. Alrededor de ella, se pueden organizar experiencias opcionales con practicantes locales calificados — antes, entre o después.",
      itemsLead: "Cuando las ofrecen practicantes locales calificados, las experiencias opcionales pueden incluir:",
      items: [
        "Temazcal",
        "Masaje",
        "Trabajo corporal",
        "Respiración guiada",
        "Meditación",
        "Experiencias de sonido",
        "Ceremonia de cacao",
        "Tradiciones herbales",
        "Sesiones de arraigo antes de la ceremonia",
        "Sesiones de bienestar en pareja",
        "Un día de restauración después de la ceremonia",
      ],
      note: "Estas son experiencias de bienestar, no tratamiento médico. Nada de esto se ofrece como atención de salud, y no se promete ningún resultado. Todo lo que involucre atención médica con licencia permanece separado y se organiza directamente con los profesionales correspondientes.",
    },

    types: {
      label: "Tipos De Unión",
      title: "Un solo modelo ceremonial. Todo tipo de unión.",
      cards: [
        ["Bodas", "Una ceremonia y una reunión íntimas, celebradas en la selva."],
        ["Fugas Románticas", "Solo ustedes dos, los practicantes y el lugar."],
        ["Ceremonias De Compromiso", "Uniones personales fuera de la estructura convencional de una boda."],
        ["Renovación De Votos", "Volver el uno al otro en un lugar irrepetible."],
        ["Uniones LGBTQ+", "Ceremonias inclusivas y personales — nunca forzadas a una plantilla."],
        ["Ceremonias De Aniversario", "Un recompromiso construido alrededor de un hito que vale la pena honrar."],
      ],
    },

    complete: {
      label: "La Experiencia Completa",
      title: "La ceremonia es el centro. Todo lo demás también puede estar en buenas manos.",
      text: "Desde el traslado de los practicantes hasta el transporte de los invitados y la preparación del entorno ceremonial, Path To Mexico coordina las piezas en movimiento detrás de la experiencia — para que la ceremonia misma permanezca íntima y enfocada.",
      stages: [
        {
          number: "01",
          title: "La Ceremonia",
          items: [
            "Coordinación y traslado de practicantes",
            "Preparación ceremonial",
            "Decoración natural y altar",
            "Fuego e iluminación",
            "Peinado y maquillaje",
          ],
        },
        {
          number: "02",
          title: "La Mesa",
          items: [
            "Comida regional y maya, cuando se organiza",
            "Comidas ceremoniales",
            "Reuniones de bienvenida",
            "Brunch después de la ceremonia",
          ],
        },
        {
          number: "03",
          title: "La Historia",
          items: ["Fotografía", "Película"],
        },
        {
          number: "04",
          title: "La Estancia",
          items: ["Hospedaje en Tulum y sus alrededores", "Transporte de invitados", "Traslados al aeropuerto"],
        },
        {
          number: "05",
          title: "Más Allá",
          items: ["Excursiones y experiencias de bienestar", "Apoyo con la luna de miel", "Concierge de viaje en México"],
        },
      ],
      note: "El hospedaje se coordina por separado, en Tulum y sus alrededores — el entorno de selva se reserva para la ceremonia misma.",
    },

    journey: {
      label: "La Experiencia",
      title: "Cuatro días, como un ejemplo.",
      intro: "Esto es un ritmo, no un paquete. Cada experiencia se crea desde cero alrededor de la pareja y de la ceremonia.",
      days: [
        {
          number: "01",
          name: "Llegada",
          lines: ["Los invitados llegan a Tulum y se instalan en su hospedaje.", "Una cena de bienvenida, si la pareja la desea."],
        },
        {
          number: "02",
          name: "Preparación",
          lines: ["Un día abierto — una reunión, una sesión de bienestar, una comida compartida o simplemente tiempo juntos antes de la ceremonia."],
        },
        {
          number: "03",
          name: "La Ceremonia",
          lines: [
            "Traslado al entorno privado de selva.",
            "La ceremonia, guiada por practicantes ceremoniales mayas.",
            "Comida. Música. La reunión, hasta entrada la noche.",
          ],
        },
        {
          number: "04",
          name: "Después",
          lines: ["Una mañana lenta. Brunch.", "Descanso, excursiones, la luna de miel — o el camino a casa."],
        },
      ],
    },

    legal: {
      label: "Matrimonio Simbólico y Legal",
      title: "Una ceremonia para el corazón. Un trámite para los papeles.",
      paragraphs: [
        "Las bodas ceremoniales mayas y uniones sagradas que se ofrecen a través de esta experiencia son, en general, ceremonias simbólicas o espirituales. Por sí solas, no crean un matrimonio legalmente reconocido.",
        "Las parejas que deseen un matrimonio civil mexicano legalmente reconocido pueden pedirnos ayuda para coordinar con los profesionales legales y civiles locales apropiados. Los requisitos pueden variar según la nacionalidad, el municipio, la documentación y las circunstancias individuales — por eso no citamos requisitos fijos aquí, y nada en esta página es asesoría legal ni una garantía.",
        "Muchas parejas resuelven el trámite legal en su país y celebran aquí la ceremonia que de verdad importa. Ambos caminos son normales, y seremos claros contigo sobre cuál es cuál.",
      ],
    },

    responsible: {
      title: "Celebra México. Respeta México.",
      paragraphs: [
        "Una ceremonia trae dinero, atención e invitados a un lugar. Queremos que todo eso caiga bien — para los practicantes que guían, las comunidades de donde vienen, la tierra que sostiene la ceremonia, los negocios locales y la naturaleza que hace posible todo lo demás.",
        "En la práctica, eso significa priorizar a las personas locales y el abastecimiento responsable siempre que podamos, tratar los elementos culturales como algo que se comparte con nosotros y no como algo que se extrae del lugar, y dejar la selva como lo haría un buen invitado.",
      ],
      ctaImpact: "Lee Nuestro Compromiso De Impacto",
      ctaGuide: "La Guía De Reubicación Responsable",
    },

    closing: {
      label: "Comienza",
      title: "Tu boda no debería sentirse como la de nadie más.",
      paragraphs: [
        "Cuéntanos la sensación. Las personas. Incluso las partes que todavía no puedes describir.",
        "Nosotros ayudamos a construir la ceremonia desde ahí.",
      ],
      qualification: "Cada ceremonia comienza de forma diferente. Cuéntanos qué imaginas, y determinaremos qué se puede crear alrededor de ello.",
      ctaPrimary: "Comienza Tu Ceremonia",
      ctaSecondary: "Iniciar Una Conversación",
    },

    inquiry: {
      eyebrow: "Bodas · Consulta",
      title: "Empieza por la sensación.",
      lead: "Cada ceremonia comienza de forma diferente. Cuéntanos qué imaginas — aunque sea vagamente — y determinaremos qué se puede crear alrededor de ello. Nada se confirma hasta que el liderazgo ceremonial y las fechas lo estén, así que piensa en esto como la primera conversación, no como un formulario de reserva.",
      assurances: [
        "Leída personalmente — nunca por un sistema.",
        "Respondemos por correo o WhatsApp.",
        "Nada se promete hasta confirmar a los practicantes y las fechas.",
      ],
      groupYou: "Ustedes",
      groupDay: "La Ceremonia",
      groupFeeling: "La Sensación",
      labels: {
        coupleNames: "Sus nombres",
        email: "Correo electrónico",
        phone: "WhatsApp o teléfono",
        country: "País",
        weddingDate: "Fecha preferida",
        flexibleDates: "¿Sus fechas son flexibles?",
        guestCount: "Número estimado de invitados",
        ceremonyType: "Tipo de unión",
        scope: "¿Solo la ceremonia, o una experiencia más amplia en Tulum?",
        accommodation: "¿Sus invitados necesitarían coordinación de hospedaje?",
        transportation: "¿Sus invitados necesitarían coordinación de transporte?",
        foodInterest: "¿Les interesa la comida ceremonial y la experiencia gastronómica?",
        wellnessInterest: "¿Les interesan las experiencias de bienestar?",
        legalAssistance: "¿Necesitan ayuda con el matrimonio legal?",
        budgetRange: "Presupuesto general aproximado",
        feeling: "¿Qué quieren que esta ceremonia signifique, o cómo quieren que se sienta?",
        anythingElse: "¿Algo más que debamos saber?",
      },
      placeholders: {
        coupleNames: "Ustedes dos",
        email: "tu@correo.com",
        phone: "+52 …",
        country: "Donde viven ahora",
        weddingDate: "Un mes, una temporada, un año — con la precisión que tengan",
        feeling: "Silencio. Descalzos. Luz de fuego bajo los árboles. Treinta personas alrededor. Como les llegue.",
        anythingElse: "Invitados, familia, dudas, ideas a medio formar — lo que sea.",
      },
      options: {
        select: "Selecciona…",
        flexibleDates: ["Sí, flexibles", "No, la fecha está fija"],
        guestCount: ["Solo nosotros", "Hasta 10", "10–30", "30–60", "Más de 60"],
        ceremonyType: [
          "Boda",
          "Fuga romántica",
          "Ceremonia de compromiso",
          "Renovación de votos",
          "Ceremonia de aniversario",
          "Aún no lo sabemos",
        ],
        scope: ["Solo la ceremonia", "Una experiencia más amplia en Tulum", "Aún no lo sabemos"],
        yesNoUnsure: ["Sí", "No", "No estamos seguros"],
        budgetRange: [
          "Menos de $10,000 USD",
          "$10,000–$25,000 USD",
          "$25,000–$50,000 USD",
          "Más de $50,000 USD",
          "Preferimos platicarlo",
        ],
      },
      optionalTag: "Opcional",
      submitting: "Enviando…",
      submit: "Enviar Consulta",
      successTitle: "Ha comenzado.",
      successText: "Tu consulta está con nosotros y será leída personalmente — no por un sistema. Te responderemos por correo o WhatsApp. Si lo que imaginas es algo que podemos sostener bien con nuestros practicantes y nuestro entorno, empezaremos a darle forma juntos.",
      successBack: "Volver A Bodas",
      successExplore: "Explora Yucatán",
    },
  },
};

// Internal product architecture only — deliberately NOT rendered anywhere.
// The public site stays inquiry-led at launch; these levels exist so a
// future pricing/packaging decision has a stable structure to attach to.
// All levels live under the single jungle ceremonial model — they scale
// the experience, never the setting.
export const WEDDING_EXPERIENCE_LEVELS = [
  { id: "union", name: "The Union", scope: "Couples / elopement ceremony" },
  { id: "gathering", name: "The Gathering", scope: "Small intimate ceremony and gathering" },
  { id: "journey", name: "The Journey", scope: "Multi-day Tulum experience around the ceremony" },
  { id: "pathWedding", name: "The Path Wedding", scope: "Fully bespoke experience" },
];
