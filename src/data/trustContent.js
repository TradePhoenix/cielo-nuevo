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

export const FIT_CALL_PRICE = "$99 USD";
