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

export const TESTIMONIALS = [
  {
    quote:
      "I was not looking for someone to sell me anything. I just wanted honest answers from someone who had actually lived the experience. Path To Mexico provided clarity and helped me slow down and make better decisions. It felt more like talking to a trusted friend than dealing with a company.",
    name: "Client from Calgary, Alberta",
    quoteEs:
      "No estaba buscando que alguien me vendiera nada. Solo quería respuestas honestas de alguien que realmente hubiera vivido la experiencia. Path To Mexico me dio claridad y me ayudó a tomar decisiones con más calma. Se sintió más como hablar con un amigo de confianza que con una empresa.",
    nameEs: "Cliente de Calgary, Alberta",
  },
  {
    quote:
      "We had been talking about moving to Mexico for years, but the amount of information online felt overwhelming. Path To Mexico helped us think through things we had not even considered, from neighborhoods and healthcare to what day-to-day life might actually feel like. More than anything, it gave us confidence and a clearer sense of direction.",
    name: "Sarah & Michael — Vancouver, Canada",
    quoteEs:
      "Llevábamos años hablando de mudarnos a México, pero la cantidad de información en línea se sentía abrumadora. Path To Mexico nos ayudó a pensar en cosas que ni siquiera habíamos considerado, desde los vecindarios y la salud hasta cómo podría sentirse realmente el día a día. Sobre todo, nos dio confianza y un rumbo más claro.",
    nameEs: "Sarah & Michael — Vancouver, Canadá",
  },
];

export const FIT_CALL_PRICE = "$99 USD";
