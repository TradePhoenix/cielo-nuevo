// Shared trust content — reused verbatim from the homepage (src/pages/HomePage.js)
// across Your Mexico and the Mexico Fit Call page, so the real trust signals a
// visitor already saw don't go silent right before the moment they matter most.
// No new claims are invented here; everything is copied from content already
// live on the site.

// `quoteEs`/`nameEs`/`roleEs` are additive — the plain English fields stay
// exactly as they were so MexicoFitCallPage.js (which reads them directly,
// with no lang-awareness of its own) keeps rendering byte-for-byte as
// before. Only TrustMoment.js (used on the already-bilingual Your Mexico
// pages) resolves the *Es variant when lang is Spanish.
export const FOUNDER = {
  name: "Kalen Enns",
  role: "Founder, Path To Mexico",
  roleEs: "Fundador, Path To Mexico",
  photo: "/kalen.jpg",
  quote:
    "Some people come to Mexico for a vacation. Others come here looking for a life that feels more like their own.",
  quoteEs:
    "Algunas personas vienen a México de vacaciones. Otras vienen buscando una vida que se sienta más propia.",
};

// TRUST-001 — replaces two unverified placeholder client testimonials that
// had no consent record and, on the homepage, didn't even match between
// languages (different, unrelated placeholder text in EN vs ES). This is a
// verified professional endorsement instead: Devon O'Tool worked with Kalen
// professionally (Airbnb property management in British Columbia) before
// Path To Mexico existed. It speaks to Kalen's character and work ethic —
// it is not a Path To Mexico client story, and must never be presented or
// labeled as one. `quoteParagraphs`/`quoteParagraphsEs` hold the complete,
// unedited endorsement as separate paragraphs; consumers with room for the
// full text (HomePage.js) render all of them, and compact placements
// (TrustMoment.js, MexicoFitCallPage.js) use only paragraph [0] — itself a
// complete, unaltered sentence — as an attributed pull-quote back to the
// same source, not a separate or edited quote.
export const ENDORSEMENT = {
  name: "Devon O'Tool",
  role: "Airbnb Property Owner, British Columbia",
  roleEs: "Propietario De Airbnb, Columbia Británica",
  quoteParagraphs: [
    "I had the pleasure of working with Kalen while he managed my Airbnb property in British Columbia, and I can recommend him without hesitation.",
    "Kalen managed multiple Airbnb properties with professionalism, exceptional attention to detail and genuine care. He consistently went above and beyond to ensure every guest felt welcomed and at home, creating outstanding experiences for both guests and property owners.",
    "Through Ennspropertymgmt, operating as Poshclean & Stay, Kalen built a successful business grounded in reliability, quality and exceptional customer service. Whether coordinating property management, overseeing cleanings or handling unexpected challenges, he approached every situation with integrity and a commitment to excellence.",
    "Based on my experience working with him, anyone considering Path To Mexico can do so with confidence. Kalen is hardworking, trustworthy and genuinely invested in helping people succeed.",
  ],
  quoteParagraphsEs: [
    "Tuve el placer de trabajar con Kalen mientras administraba mi propiedad de Airbnb en Columbia Británica, y puedo recomendarlo sin dudarlo.",
    "Kalen administró múltiples propiedades de Airbnb con profesionalismo, una atención excepcional al detalle y un cuidado genuino. Siempre hizo mucho más de lo esperado para asegurarse de que cada huésped se sintiera bienvenido y como en casa, creando experiencias excepcionales tanto para los huéspedes como para los propietarios.",
    "A través de Ennspropertymgmt, operando como Poshclean & Stay, Kalen construyó un negocio exitoso basado en la confiabilidad, la calidad y un servicio al cliente excepcional. Ya fuera coordinando la administración de propiedades, supervisando limpiezas o resolviendo imprevistos, abordó cada situación con integridad y un compromiso con la excelencia.",
    "Con base en mi experiencia trabajando con él, cualquier persona que esté considerando Path To Mexico puede hacerlo con confianza. Kalen es trabajador, confiable y está genuinamente comprometido con ayudar a las personas a tener éxito.",
  ],
};

// TRUST-002 — Roni Bridger's real, approved five-star client testimonial
// (EN and ES text supplied and approved verbatim by Kalen, August 2026).
// Unlike ENDORSEMENT above, this IS a Path To Mexico client story and is
// labeled as such wherever it renders. Placement rule: the complete
// `quoteParagraphs` render in exactly one place (MexicoFitCallPage.js);
// compact placements (HomePage.js) use only `excerpt`/`excerptEs` — an
// approved standalone excerpt, not an edit of the long version. No photo,
// occupation, age, or date exists for this testimonial — don't invent one.
export const CLIENT_TESTIMONIAL = {
  name: "Roni Bridger",
  role: "Relocated to Playa del Carmen, Mexico",
  roleEs: "Se mudó a Playa del Carmen, México",
  rating: 5,
  quoteParagraphs: [
    "Relocating to Mexico can feel overwhelming when you don't know where to start or who you can trust. Kalen and Path To Mexico made the entire experience feel much easier and gave me confidence in the decisions I was making.",
    "Kalen provided me with helpful, honest advice about living in Playa del Carmen and took the time to understand what I needed as I got settled. What I appreciated most was having someone I could turn to who could connect me with trustworthy people rather than having to figure everything out on my own.",
    "Through Path To Mexico, I was connected with excellent doctors, a safe and reliable place to purchase a vehicle, and a great property manager and real estate agent. Those connections made a real difference and removed a lot of the uncertainty that comes with establishing a new life in another country.",
    "Kalen has been genuinely helpful, responsive, and invested in making sure I've had a positive experience here. His knowledge, advice, and local connections have helped make my transition to Mexico much smoother.",
    "I'm very happy with my decision to relocate and grateful for the support I've received along the way. I would absolutely recommend Kalen and Path To Mexico to anyone considering making the move to Mexico.",
  ],
  quoteParagraphsEs: [
    "Mudarse a México puede resultar abrumador cuando no sabes por dónde empezar ni en quién confiar. Kalen y Path To Mexico hicieron que toda la experiencia fuera mucho más sencilla y me dieron confianza en las decisiones que estaba tomando.",
    "Kalen me brindó consejos útiles y honestos sobre la vida en Playa del Carmen y se tomó el tiempo de comprender lo que necesitaba mientras me instalaba. Lo que más valoré fue tener a alguien a quien acudir, capaz de conectarme con personas de confianza, en lugar de tener que resolverlo todo por mi cuenta.",
    "A través de Path To Mexico, me pusieron en contacto con excelentes médicos, un lugar seguro y confiable para comprar un vehículo, y una excelente administradora de propiedades y agente inmobiliaria. Esas conexiones marcaron una verdadera diferencia y eliminaron gran parte de la incertidumbre que implica establecer una nueva vida en otro país.",
    "Kalen ha sido genuinamente servicial, atento y comprometido con asegurar que yo tuviera una experiencia positiva aquí. Su conocimiento, sus consejos y sus conexiones locales han hecho que mi transición a México sea mucho más fluida.",
    "Estoy muy feliz con mi decisión de mudarme y agradecida por el apoyo que he recibido durante el proceso. Recomendaría sin dudar a Kalen y Path To Mexico a cualquiera que esté considerando mudarse a México.",
  ],
  excerpt:
    "Kalen and Path To Mexico connected me with excellent doctors, a safe place to purchase a vehicle, and a great property manager and real estate agent. Those trusted connections made my move to Playa del Carmen much smoother and removed so much uncertainty.",
  excerptEs:
    "Kalen y Path To Mexico me conectaron con excelentes médicos, un lugar seguro para comprar un vehículo, y una excelente administradora de propiedades y agente inmobiliaria. Esas conexiones de confianza hicieron que mi mudanza a Playa del Carmen fuera mucho más sencilla y eliminaron gran parte de la incertidumbre.",
};

export const FIT_CALL_PRICE = "$99 USD";

// Launch fix #4 — canonical service pricing. Every surface that shows a
// tier price imports from here; no page re-declares these literals.
// Guided Landing is deliberately NOT a number: it is quoted per client
// after a Fit Call, and publishing a fixed price would be invented.
export const ROADMAP_PRICE = "$499 USD";
export const GUIDED_LANDING_PRICING = {
  en: "Custom Quote",
  es: "Cotización Personalizada",
};
