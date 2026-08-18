// Weddings — Maya Weddings & Sacred Unions. All visible copy for
// /weddings and /weddings/inquire, EN + ES, following the established
// page-local `{ en, es }` convention (see src/utils/language.js).
//
// Cultural + legal guardrails baked into this copy — do not loosen them
// when editing:
//   * Ceremonies are "Maya-led or Maya-inspired, developed with local
//     practitioners" — never a historical recreation, never invented
//     tradition, never PTM as the spiritual authority.
//   * Ceremony elements are always "may include, depending on the
//     practitioner" — never a guaranteed or historically universal list.
//   * Wellness copy never promises outcomes or implies medical care;
//     licensed health professionals stay distinct from wellness services.
//   * Ceremonies are symbolic/spiritual unless the couple separately
//     completes the civil process; legal requirements are never stated
//     as fixed facts.
//   * Venue copy never promises access — permits, environmental
//     protections, and owner authorization are acknowledged.
//   * No practitioner names, testimonials, counts, prices, or credentials
//     are invented anywhere.
//
// NOTE: scripts/prerender-meta.mjs extracts `seoTitle:`/`seoDescription:`
// (and the inquiry* variants) from this file via regex — keep the EN block
// first and keep those four values as plain double-quoted literals with no
// inner double quotes.

export const WEDDINGS_CONTENT = {
  en: {
    seoTitle: "Maya Weddings & Sacred Unions in Mexico",
    seoDescription:
      "Create an intimate Maya-inspired wedding, sacred union, elopement, or multi-day celebration in the Yucatán Peninsula — with trusted local practitioners and Path To Mexico coordination.",
    inquirySeoTitle: "Plan Your Wedding in Mexico",
    inquirySeoDescription:
      "Tell us what you are imagining — the place, the feeling, the people — and Path To Mexico will help determine what can be created around it in the Yucatán Peninsula.",
    toggle: "ES",
    backToSite: "Path To Mexico",

    hero: {
      eyebrow: "Weddings · Yucatán Peninsula",
      title: "Maya Weddings & Sacred Unions",
      subtitle: "A ceremony that belongs to the place.",
      paragraphs: [
        "Some weddings are built around a ballroom. Others begin beneath jungle canopy, beside Caribbean water, within a private hacienda, near a cenote, or somewhere that feels completely removed from the ordinary.",
        "Path To Mexico helps couples create intimate ceremonies and celebrations that feel connected to Mexico — not simply staged in it.",
      ],
      ctaPrimary: "Begin Your Wedding",
      ctaSecondary: "Explore The Experience",
      caption: "Tulum · Quintana Roo",
      imageAlt: "A quiet jungle-shaded street of limestone and stucco in Tulum, morning light coming through the trees",
    },

    philosophy: {
      label: "More Than A Destination Wedding",
      titleLead: "Mexico does not have to be the backdrop to your wedding.",
      titleAccent: "It can become part of the story.",
      paragraphs: [
        "Most destination weddings start from a package: a resort, a set menu, a coordinator you meet twice. We are not tied to any of that. Path To Mexico works from its own relationships on the peninsula, which means the experience can be designed around you — the setting, the atmosphere, the number of people, and the meaning you want the day to carry.",
        "That difference sounds small. It changes everything about how the day feels.",
      ],
      pull: "Some weddings are planned around a venue. We start with the feeling.",
    },

    ceremony: {
      label: "The Ceremony",
      title: "Led by local practitioners. Shaped around the two of you.",
      paragraphs: [
        "Ceremonial and cultural elements are led by local Maya ceremonial leaders and practitioners, each within their own area of knowledge. Path To Mexico's role is to produce and coordinate — to bring the right people, place, and moment together — never to stand in as the spiritual authority.",
        "No two ceremonies follow the same script, and none of this is presented as a fixed or historically universal Maya wedding ritual. What takes place is decided by the practitioner leading it, the setting, and the two of you.",
      ],
      elementsLead: "Depending on the practitioner, the setting, and the ceremony itself, elements may include:",
      elements: [
        "Ceremonial cleansing",
        "Copal",
        "Acknowledgement of the directions",
        "Natural elements",
        "A ceremonial altar",
        "The sound of the conch",
        "Flowers",
        "Cacao",
        "Maize",
        "Fire",
        "Water",
        "Spoken intentions",
        "Vows",
        "Blessings",
        "Music",
        "Symbolic union rituals",
      ],
    },

    culture: {
      label: "Respect For The Culture",
      title: "Maya culture is living culture.",
      quote: "Our intention is never to turn it into decoration.",
      paragraphs: [
        "The Yucatán Peninsula is Maya land — home to a people, a language, and traditions that are very much alive today. We do not recreate an imagined ancient wedding, and we do not invent ritual for atmosphere.",
        "Where ceremonial elements are part of a celebration, they are incorporated respectfully and, where appropriate, guided by local Maya practitioners who understand the traditions and their significance. What they choose to share, and how, is theirs to decide.",
        "This is the same commitment that shapes everything Path To Mexico does — celebration, like relocation, should leave the place and its people better than it found them.",
      ],
      cta: "Our Impact Commitment",
    },

    network: {
      label: "Our Local Network",
      title: "The experience is built around people, not packages.",
      text: "Path To Mexico's strength is its relationships — a curated network of practitioners, creatives, and local operators across the Yucatán and Riviera Maya, built by living and working here. Each celebration is assembled from that network around what the couple actually wants. No one participates by default, and no wedding uses everyone.",
      groups: [
        {
          title: "Ceremony",
          roles: ["Maya ceremonial leaders", "Musicians", "Cultural practitioners"],
        },
        {
          title: "Wellness",
          roles: [
            "Wellness practitioners",
            "Traditional & local healers",
            "Massage & bodywork",
            "Breathwork facilitators",
            "Sound practitioners",
            "Health & wellness professionals",
          ],
        },
        {
          title: "Celebration",
          roles: ["Chefs", "Florists", "Photographers", "Videographers & filmmakers", "Stylists"],
        },
        {
          title: "Place & Movement",
          roles: ["Venue owners", "Hospitality partners", "Transportation partners", "Local coordinators"],
        },
      ],
      note: "Licensed health professionals in our wider network provide their services independently and separately from wellness experiences — coordination never replaces professional care.",
    },

    places: {
      label: "Choose Your Place",
      title: "The setting does half the storytelling.",
      venues: [
        {
          id: "caribbean",
          name: "Caribbean",
          text: "Sand underfoot, sea air, an open horizon, and the long light of sunset.",
          imageAlt: "The Caribbean coastline of the Riviera Maya at golden hour, jungle meeting turquoise water",
        },
        {
          id: "jungle",
          name: "Jungle",
          text: "Private tropical surroundings, natural textures, candlelight, and real seclusion under the canopy.",
          imageAlt: "A tree-shaded lane under tropical canopy opening toward turquoise sea, Playa del Carmen",
        },
        {
          id: "cenote",
          name: "Cenote",
          text: "Extraordinary natural surroundings — where access and ceremony permissions allow.",
        },
        {
          id: "hacienda",
          name: "Hacienda",
          text: "Historic architecture, gardens, courtyards, and old-world Yucatán atmosphere.",
          imageAlt: "A carved stone doorway and lantern-lit facades on an old colonial street in Mérida",
        },
        {
          id: "villa",
          name: "Private Villa",
          text: "Ceremony, dinner, accommodation, and celebration held in one private place.",
        },
        {
          id: "unexpected",
          name: "Somewhere Unexpected",
          text: "Through our local network, we can help identify less conventional private settings most visitors never find.",
          imageAlt: "Flamingos wading through a still mangrove lagoon at dawn, Celestún",
        },
      ],
      caveat:
        "No setting is ever assumed. Venue availability, permits, access rules, environmental protections, and owner authorization all shape what is possible — cenotes and natural areas especially. We confirm what a place genuinely allows before anything is promised.",
    },

    wellness: {
      label: "Ceremony + Wellness",
      title: "Arrive settled. Leave restored.",
      text: "A wedding is more than one day of standing still. Around the ceremony, optional experiences can be arranged with qualified local practitioners — before, between, or after.",
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
        "Pre-wedding grounding sessions",
        "Couples wellness sessions",
        "A post-wedding restoration day",
      ],
      note: "These are wellness experiences, not medical treatment. Nothing here is offered as healthcare, and no outcome is promised. Anything involving licensed healthcare remains separate and is arranged directly with the appropriate professionals.",
    },

    types: {
      label: "Types Of Experiences",
      title: "However you want to mark it, it can be built.",
      cards: [
        ["Elopements", "Just the two of you, the ceremony, and the place."],
        ["Intimate Weddings", "A carefully chosen circle of family and friends."],
        ["Destination Weddings", "A larger experience built across several days."],
        ["Vow Renewals", "Return to one another somewhere meaningful."],
        ["Commitment Ceremonies", "Personal unions outside a conventional wedding structure."],
        ["LGBTQ+ Weddings", "Inclusive, personal ceremonies — never forced into a traditional template."],
        ["Anniversary Journeys", "Private ceremonial experiences built around a milestone worth honoring."],
      ],
    },

    complete: {
      label: "The Complete Experience",
      title: "The ceremony is the center. Everything around it can be carried too.",
      text: "Through coordination and trusted local partners, Path To Mexico can hold far more than the ceremony itself — so the days around it feel as considered as the day.",
      stages: [
        {
          number: "01",
          title: "The Ceremony",
          items: [
            "Venue sourcing",
            "Ceremonial practitioner coordination",
            "Wedding planning",
            "Floral design & natural installations",
            "Hair & makeup",
          ],
        },
        {
          number: "02",
          title: "The Table",
          items: [
            "Private chef & dinner",
            "Cocktails & beverage service",
            "Musicians",
            "Welcome gatherings",
            "Post-wedding brunch",
          ],
        },
        {
          number: "03",
          title: "The Story",
          items: ["Photography", "Videography & cinematic film"],
        },
        {
          number: "04",
          title: "The Stay",
          items: ["Guest accommodations", "Airport transfers & transportation", "Local logistics"],
        },
        {
          number: "05",
          title: "Beyond",
          items: [
            "Excursions & sailing",
            "Cenote experiences, where permitted",
            "Honeymoon planning",
            "Mexico travel concierge",
          ],
        },
      ],
      note: "Each service is delivered by the people who do it best — our role is producing and coordinating the whole, through partners we genuinely trust.",
    },

    journey: {
      label: "A Wedding Journey",
      title: "Four days, as one example.",
      intro: "This is a rhythm, not a package. Every journey is shaped from scratch around the couple and the place.",
      days: [
        {
          number: "01",
          name: "Arrival",
          lines: ["Private transfers.", "Guests settle in.", "Welcome cocktails or dinner as the light goes down."],
        },
        {
          number: "02",
          name: "Mexico",
          lines: ["A private excursion, a cenote, sailing, a beach, wellness, a cultural experience — or nothing at all."],
        },
        {
          number: "03",
          name: "The Ceremony",
          lines: ["Preparation, unhurried.", "The ceremony.", "Sunset. Dinner. Music. Celebration."],
        },
        {
          number: "04",
          name: "The Morning After",
          lines: ["Slow breakfast. Swimming. Brunch.", "Departure — or the beginning of the honeymoon."],
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
        "A wedding brings money, attention, and many guests into a place. We want all of that to land well — for the practitioners who lead, the communities that host, the venues, the businesses, and the nature that makes any of it possible.",
        "In practice that means prioritizing local professionals and responsible sourcing wherever we can, treating cultural elements as something shared with us rather than extracted from the place, and leaving every setting the way a good guest would.",
      ],
      ctaImpact: "Read Our Impact Commitment",
      ctaGuide: "The Responsible Relocation Guide",
    },

    closing: {
      label: "Begin",
      title: "Your wedding should not feel like anyone else's.",
      paragraphs: [
        "Tell us the place. The feeling. The people. Even the parts you cannot quite describe yet.",
        "We'll help build the experience from there.",
      ],
      qualification: "Every celebration begins differently. Tell us what you are imagining, and we'll determine what can be created around it.",
      ctaPrimary: "Plan My Wedding",
      ctaSecondary: "Start A Conversation",
    },

    inquiry: {
      eyebrow: "Weddings · Inquiry",
      title: "Start with the feeling.",
      lead: "Every celebration begins differently. Tell us what you are imagining — even loosely — and we'll determine what can be created around it. Nothing is confirmed until the right venue and practitioners are, so think of this as the first conversation, not a booking form.",
      assurances: [
        "Read personally — never by a system.",
        "We reply by email or WhatsApp.",
        "Nothing is promised until venue and practitioners are confirmed.",
      ],
      groupYou: "You",
      groupDay: "The Day",
      groupFeeling: "The Feeling",
      labels: {
        coupleNames: "Your names",
        email: "Email",
        phone: "WhatsApp or phone",
        country: "Country",
        weddingDate: "Approximate wedding date",
        flexibleDates: "Are your dates flexible?",
        guestCount: "Estimated guest count",
        ceremonyType: "Type of ceremony",
        setting: "Preferred setting",
        scope: "Ceremony only, or more?",
        legalAssistance: "Legal marriage assistance needed?",
        budgetRange: "Approximate budget",
        feeling: "What do you want the experience to feel like?",
        anythingElse: "Anything else we should know?",
      },
      placeholders: {
        coupleNames: "Both of you",
        email: "you@example.com",
        phone: "+1 …",
        country: "Where you live now",
        weddingDate: "A month, a season, a year — however precise it is",
        feeling: "Quiet. Barefoot. Candlelit. Sixty people dancing under the trees. However it comes to you.",
        anythingElse: "Guests, family, worries, half-formed ideas — anything.",
      },
      options: {
        select: "Select…",
        flexibleDates: ["Yes, flexible", "No, the date is set"],
        guestCount: ["Just us", "Up to 10", "10–30", "30–60", "More than 60"],
        ceremonyType: [
          "Elopement",
          "Intimate wedding",
          "Destination wedding",
          "Vow renewal",
          "Commitment ceremony",
          "Not sure yet",
        ],
        setting: ["Jungle", "Beach", "Cenote", "Hacienda", "Private villa", "Not sure yet"],
        scope: ["Ceremony only", "A multi-day experience", "Not sure yet"],
        legalAssistance: ["Yes", "No", "Not sure"],
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
      successText: "Your inquiry is with us, and it will be read personally — not by a system. We'll reply by email or WhatsApp. If what you're imagining is something we can build well with our venues and practitioners, we'll start shaping it together.",
      successBack: "Return To Weddings",
      successExplore: "Explore The Yucatán",
    },
  },

  es: {
    seoTitle: "Bodas Mayas y Uniones Sagradas en México",
    seoDescription:
      "Crea una boda íntima de inspiración maya, una unión sagrada, una fuga romántica o una celebración de varios días en la Península de Yucatán — con practicantes locales de confianza y la coordinación de Path To Mexico.",
    inquirySeoTitle: "Planea Tu Boda en México",
    inquirySeoDescription:
      "Cuéntanos qué imaginas — el lugar, la sensación, las personas — y Path To Mexico te ayudará a determinar qué se puede crear alrededor de ello en la Península de Yucatán.",
    toggle: "EN",
    backToSite: "Path To Mexico",

    hero: {
      eyebrow: "Bodas · Península de Yucatán",
      title: "Bodas Mayas y Uniones Sagradas",
      subtitle: "Una ceremonia que pertenece al lugar.",
      paragraphs: [
        "Algunas bodas se construyen alrededor de un salón. Otras comienzan bajo el dosel de la selva, junto al mar Caribe, dentro de una hacienda privada, cerca de un cenote, o en algún lugar que se siente completamente fuera de lo ordinario.",
        "Path To Mexico ayuda a las parejas a crear ceremonias y celebraciones íntimas que se sienten conectadas con México — no simplemente montadas en México.",
      ],
      ctaPrimary: "Comienza Tu Boda",
      ctaSecondary: "Explora La Experiencia",
      caption: "Tulum · Quintana Roo",
      imageAlt: "Una calle tranquila de piedra caliza y estuco bajo la sombra de la selva en Tulum, con luz de mañana entre los árboles",
    },

    philosophy: {
      label: "Más Que Una Boda De Destino",
      titleLead: "México no tiene que ser el telón de fondo de tu boda.",
      titleAccent: "Puede volverse parte de la historia.",
      paragraphs: [
        "La mayoría de las bodas de destino parte de un paquete: un resort, un menú fijo, un coordinador que ves dos veces. Nosotros no estamos atados a nada de eso. Path To Mexico trabaja desde sus propias relaciones en la península, lo que significa que la experiencia puede diseñarse alrededor de ustedes — el lugar, la atmósfera, el número de personas y el significado que quieren que el día tenga.",
        "Esa diferencia suena pequeña. Cambia por completo cómo se siente el día.",
      ],
      pull: "Algunas bodas se planean alrededor de un lugar. Nosotros empezamos por la sensación.",
    },

    ceremony: {
      label: "La Ceremonia",
      title: "Guiada por practicantes locales. Formada alrededor de ustedes dos.",
      paragraphs: [
        "Los elementos ceremoniales y culturales son guiados por líderes ceremoniales y practicantes mayas locales, cada uno dentro de su propia área de conocimiento. El papel de Path To Mexico es producir y coordinar — reunir a las personas, el lugar y el momento correctos — nunca asumir el lugar de la autoridad espiritual.",
        "No hay dos ceremonias que sigan el mismo guion, y nada de esto se presenta como un ritual maya fijo o históricamente universal. Lo que sucede lo deciden el practicante que la guía, el lugar y ustedes dos.",
      ],
      elementsLead: "Dependiendo del practicante, del lugar y de la ceremonia misma, los elementos pueden incluir:",
      elements: [
        "Limpia ceremonial",
        "Copal",
        "Reconocimiento de los rumbos",
        "Elementos naturales",
        "Un altar ceremonial",
        "El sonido del caracol",
        "Flores",
        "Cacao",
        "Maíz",
        "Fuego",
        "Agua",
        "Intenciones habladas",
        "Votos",
        "Bendiciones",
        "Música",
        "Rituales simbólicos de unión",
      ],
    },

    culture: {
      label: "Respeto Por La Cultura",
      title: "La cultura maya es cultura viva.",
      quote: "Nuestra intención nunca es convertirla en decoración.",
      paragraphs: [
        "La Península de Yucatán es tierra maya — hogar de un pueblo, un idioma y tradiciones que siguen plenamente vivas hoy. No recreamos una boda antigua imaginada, ni inventamos rituales para crear ambiente.",
        "Cuando los elementos ceremoniales forman parte de una celebración, se incorporan con respeto y, cuando corresponde, guiados por practicantes mayas locales que comprenden las tradiciones y su significado. Qué eligen compartir, y cómo, es decisión suya.",
        "Este es el mismo compromiso que da forma a todo lo que hace Path To Mexico — una celebración, como una reubicación, debería dejar al lugar y a su gente mejor de como los encontró.",
      ],
      cta: "Nuestro Compromiso De Impacto",
    },

    network: {
      label: "Nuestra Red Local",
      title: "La experiencia se construye alrededor de personas, no de paquetes.",
      text: "La fuerza de Path To Mexico son sus relaciones — una red curada de practicantes, creativos y operadores locales en Yucatán y la Riviera Maya, construida viviendo y trabajando aquí. Cada celebración se arma desde esa red alrededor de lo que la pareja realmente quiere. Nadie participa por defecto, y ninguna boda los usa a todos.",
      groups: [
        {
          title: "Ceremonia",
          roles: ["Líderes ceremoniales mayas", "Músicos", "Practicantes culturales"],
        },
        {
          title: "Bienestar",
          roles: [
            "Practicantes de bienestar",
            "Sanadores tradicionales y locales",
            "Masaje y trabajo corporal",
            "Facilitadores de respiración",
            "Practicantes de sonido",
            "Profesionales de salud y bienestar",
          ],
        },
        {
          title: "Celebración",
          roles: ["Chefs", "Floristas", "Fotógrafos", "Videógrafos y cineastas", "Estilistas"],
        },
        {
          title: "Lugar y Movimiento",
          roles: ["Dueños de recintos", "Socios de hospitalidad", "Transporte", "Coordinadores locales"],
        },
      ],
      note: "Los profesionales de la salud con licencia dentro de nuestra red más amplia brindan sus servicios de manera independiente y separada de las experiencias de bienestar — la coordinación nunca sustituye la atención profesional.",
    },

    places: {
      label: "Elige Tu Lugar",
      title: "El lugar cuenta la mitad de la historia.",
      venues: [
        {
          id: "caribbean",
          name: "Caribe",
          text: "Arena bajo los pies, aire de mar, un horizonte abierto y la luz larga del atardecer.",
          imageAlt: "La costa caribeña de la Riviera Maya en la hora dorada, la selva encontrándose con el agua turquesa",
        },
        {
          id: "jungle",
          name: "Selva",
          text: "Entorno tropical privado, texturas naturales, luz de velas y verdadera privacidad bajo el dosel.",
          imageAlt: "Un camino sombreado bajo el dosel tropical que se abre hacia el mar turquesa, Playa del Carmen",
        },
        {
          id: "cenote",
          name: "Cenote",
          text: "Entornos naturales extraordinarios — donde el acceso y los permisos de ceremonia lo permiten.",
        },
        {
          id: "hacienda",
          name: "Hacienda",
          text: "Arquitectura histórica, jardines, patios y la atmósfera del Yucatán de otro tiempo.",
          imageAlt: "Un portal de piedra tallada y fachadas iluminadas por faroles en una calle colonial antigua de Mérida",
        },
        {
          id: "villa",
          name: "Villa Privada",
          text: "Ceremonia, cena, hospedaje y celebración en un solo lugar privado.",
        },
        {
          id: "unexpected",
          name: "Un Lugar Inesperado",
          text: "A través de nuestra red local, podemos ayudar a encontrar escenarios privados poco convencionales que la mayoría de los visitantes nunca conoce.",
          imageAlt: "Flamencos vadeando una laguna de manglar en calma al amanecer, Celestún",
        },
      ],
      caveat:
        "Ningún escenario se da por hecho. La disponibilidad, los permisos, las reglas de acceso, las protecciones ambientales y la autorización de los propietarios definen lo que es posible — especialmente en cenotes y áreas naturales. Confirmamos lo que un lugar genuinamente permite antes de prometer nada.",
    },

    wellness: {
      label: "Ceremonia + Bienestar",
      title: "Llegar en calma. Irse restaurado.",
      text: "Una boda es más que un solo día. Alrededor de la ceremonia, se pueden organizar experiencias opcionales con practicantes locales calificados — antes, entre o después.",
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
        "Sesiones de arraigo antes de la boda",
        "Sesiones de bienestar en pareja",
        "Un día de restauración después de la boda",
      ],
      note: "Estas son experiencias de bienestar, no tratamiento médico. Nada de esto se ofrece como atención de salud, y no se promete ningún resultado. Todo lo que involucre atención médica con licencia permanece separado y se organiza directamente con los profesionales correspondientes.",
    },

    types: {
      label: "Tipos De Experiencias",
      title: "Como quieran celebrarlo, se puede construir.",
      cards: [
        ["Fugas Románticas", "Solo ustedes dos, la ceremonia y el lugar."],
        ["Bodas Íntimas", "Un círculo cuidadosamente elegido de familia y amigos."],
        ["Bodas De Destino", "Una experiencia más grande construida a lo largo de varios días."],
        ["Renovación De Votos", "Volver el uno al otro en un lugar con significado."],
        ["Ceremonias De Compromiso", "Uniones personales fuera de la estructura convencional de una boda."],
        ["Bodas LGBTQ+", "Ceremonias inclusivas y personales — nunca forzadas a una plantilla tradicional."],
        ["Viajes De Aniversario", "Experiencias ceremoniales privadas construidas alrededor de un hito que vale la pena honrar."],
      ],
    },

    complete: {
      label: "La Experiencia Completa",
      title: "La ceremonia es el centro. Todo lo demás también puede estar en buenas manos.",
      text: "A través de coordinación y socios locales de confianza, Path To Mexico puede encargarse de mucho más que la ceremonia — para que los días alrededor se sientan tan cuidados como el día mismo.",
      stages: [
        {
          number: "01",
          title: "La Ceremonia",
          items: [
            "Búsqueda del lugar",
            "Coordinación de practicantes ceremoniales",
            "Planeación de la boda",
            "Diseño floral e instalaciones naturales",
            "Peinado y maquillaje",
          ],
        },
        {
          number: "02",
          title: "La Mesa",
          items: [
            "Chef privado y cena",
            "Cócteles y servicio de bebidas",
            "Músicos",
            "Reuniones de bienvenida",
            "Brunch después de la boda",
          ],
        },
        {
          number: "03",
          title: "La Historia",
          items: ["Fotografía", "Video y película cinematográfica"],
        },
        {
          number: "04",
          title: "La Estancia",
          items: ["Hospedaje para invitados", "Traslados al aeropuerto y transporte", "Logística local"],
        },
        {
          number: "05",
          title: "Más Allá",
          items: [
            "Excursiones y velero",
            "Experiencias en cenotes, donde está permitido",
            "Planeación de la luna de miel",
            "Concierge de viaje en México",
          ],
        },
      ],
      note: "Cada servicio lo entrega la gente que mejor lo hace — nuestro papel es producir y coordinar el conjunto, a través de socios en los que genuinamente confiamos.",
    },

    journey: {
      label: "Un Viaje De Boda",
      title: "Cuatro días, como un ejemplo.",
      intro: "Esto es un ritmo, no un paquete. Cada viaje se crea desde cero alrededor de la pareja y del lugar.",
      days: [
        {
          number: "01",
          name: "Llegada",
          lines: ["Traslados privados.", "Los invitados se instalan.", "Cócteles o cena de bienvenida mientras cae la luz."],
        },
        {
          number: "02",
          name: "México",
          lines: ["Una excursión privada, un cenote, un velero, una playa, bienestar, una experiencia cultural — o nada en absoluto."],
        },
        {
          number: "03",
          name: "La Ceremonia",
          lines: ["Preparación, sin prisa.", "La ceremonia.", "Atardecer. Cena. Música. Celebración."],
        },
        {
          number: "04",
          name: "La Mañana Siguiente",
          lines: ["Desayuno lento. Nadar. Brunch.", "La partida — o el comienzo de la luna de miel."],
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
        "Una boda trae dinero, atención y muchos invitados a un lugar. Queremos que todo eso caiga bien — para los practicantes que guían, las comunidades que reciben, los recintos, los negocios y la naturaleza que hace posible todo lo demás.",
        "En la práctica, eso significa priorizar a los profesionales locales y el abastecimiento responsable siempre que podamos, tratar los elementos culturales como algo que se comparte con nosotros y no como algo que se extrae del lugar, y dejar cada escenario como lo haría un buen invitado.",
      ],
      ctaImpact: "Lee Nuestro Compromiso De Impacto",
      ctaGuide: "La Guía De Reubicación Responsable",
    },

    closing: {
      label: "Comienza",
      title: "Tu boda no debería sentirse como la de nadie más.",
      paragraphs: [
        "Cuéntanos el lugar. La sensación. Las personas. Incluso las partes que todavía no puedes describir.",
        "Nosotros ayudamos a construir la experiencia desde ahí.",
      ],
      qualification: "Cada celebración comienza de forma diferente. Cuéntanos qué imaginas, y determinaremos qué se puede crear alrededor de ello.",
      ctaPrimary: "Planear Mi Boda",
      ctaSecondary: "Iniciar Una Conversación",
    },

    inquiry: {
      eyebrow: "Bodas · Consulta",
      title: "Empieza por la sensación.",
      lead: "Cada celebración comienza de forma diferente. Cuéntanos qué imaginas — aunque sea vagamente — y determinaremos qué se puede crear alrededor de ello. Nada se confirma hasta que el lugar y los practicantes correctos lo estén, así que piensa en esto como la primera conversación, no como un formulario de reserva.",
      assurances: [
        "Leída personalmente — nunca por un sistema.",
        "Respondemos por correo o WhatsApp.",
        "Nada se promete hasta confirmar el lugar y a los practicantes.",
      ],
      groupYou: "Ustedes",
      groupDay: "El Día",
      groupFeeling: "La Sensación",
      labels: {
        coupleNames: "Sus nombres",
        email: "Correo electrónico",
        phone: "WhatsApp o teléfono",
        country: "País",
        weddingDate: "Fecha aproximada de la boda",
        flexibleDates: "¿Sus fechas son flexibles?",
        guestCount: "Número estimado de invitados",
        ceremonyType: "Tipo de ceremonia",
        setting: "Escenario preferido",
        scope: "¿Solo la ceremonia, o más?",
        legalAssistance: "¿Necesitan ayuda con el matrimonio legal?",
        budgetRange: "Presupuesto aproximado",
        feeling: "¿Cómo quieren que se sienta la experiencia?",
        anythingElse: "¿Algo más que debamos saber?",
      },
      placeholders: {
        coupleNames: "Ustedes dos",
        email: "tu@correo.com",
        phone: "+52 …",
        country: "Donde viven ahora",
        weddingDate: "Un mes, una temporada, un año — con la precisión que tengan",
        feeling: "Silencio. Descalzos. Luz de velas. Sesenta personas bailando bajo los árboles. Como les llegue.",
        anythingElse: "Invitados, familia, dudas, ideas a medio formar — lo que sea.",
      },
      options: {
        select: "Selecciona…",
        flexibleDates: ["Sí, flexibles", "No, la fecha está fija"],
        guestCount: ["Solo nosotros", "Hasta 10", "10–30", "30–60", "Más de 60"],
        ceremonyType: [
          "Fuga romántica",
          "Boda íntima",
          "Boda de destino",
          "Renovación de votos",
          "Ceremonia de compromiso",
          "Aún no lo sabemos",
        ],
        setting: ["Selva", "Playa", "Cenote", "Hacienda", "Villa privada", "Aún no lo sabemos"],
        scope: ["Solo la ceremonia", "Una experiencia de varios días", "Aún no lo sabemos"],
        legalAssistance: ["Sí", "No", "No estamos seguros"],
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
      successText: "Tu consulta está con nosotros y será leída personalmente — no por un sistema. Te responderemos por correo o WhatsApp. Si lo que imaginas es algo que podemos construir bien con nuestros lugares y practicantes, empezaremos a darle forma juntos.",
      successBack: "Volver A Bodas",
      successExplore: "Explora Yucatán",
    },
  },
};

// Internal product architecture only — deliberately NOT rendered anywhere.
// The public site stays inquiry-led at launch; these four levels exist so a
// future pricing/packaging decision has a stable structure to attach to
// (and so the inquiry data collected today maps onto it cleanly).
export const WEDDING_EXPERIENCE_LEVELS = [
  { id: "union", name: "The Union", scope: "Couples / elopement experience" },
  { id: "gathering", name: "The Gathering", scope: "Small intimate wedding" },
  { id: "journey", name: "The Journey", scope: "Multi-day destination wedding" },
  { id: "pathWedding", name: "The Path Wedding", scope: "Fully bespoke experience" },
];
