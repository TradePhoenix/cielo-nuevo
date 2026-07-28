import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import CinematicReveal from "../components/CinematicReveal";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// V3.2 IMPACT-001 — Impact is the site's fifth permanent brand pillar,
// alongside Blueprint, Your Mexico, Guides, and Services. Follows the same
// local `content = { en, es }` + `useState` + toggle-button convention as
// every other bilingual page (HomePage.js, WorkWithPathToMexicoPage.js) —
// not a new i18n system. Visual template matches the site's other modern
// standalone pages (WorkWithPathToMexicoPage.js, MexicoFitCallPage.js):
// dark full-bleed hero -> alternating content sections -> dark closing CTA.
const content = {
  en: {
    seoTitle: "Impact — Responsible Relocation",
    seoDescription: "Impact is Path To Mexico's permanent commitment to responsible relocation — respecting Mexican culture, Maya heritage, local businesses, and the environment.",
    toggle: "ES",

    eyebrow: "The Fifth Pillar",
    heroTitle: "Moving to Mexico is more than changing your address.",
    heroText: "It's becoming part of a community. Impact is our permanent commitment to helping every client build a life here that respects the people, culture, and land that make it possible.",
    heroCtaPrimary: "Read The Responsible Relocation Guide",
    heroCtaSecondary: "Start My Mexico Blueprint",

    ideaLabel: "The Idea",
    ideaTitle: "More than a change of address.",
    ideaParagraphs: [
      "Mexico gives newcomers something extraordinary — warmth, rhythm, natural beauty, and a culture with centuries of depth. That's not something to take for granted.",
      "Impact is how we help every client contribute something back. Not because Mexico needs saving — it doesn't — but because belonging is a two-way commitment, and a good relocation should leave the place at least as good as it found it.",
    ],

    askLabel: "What We Ask Of Every Client",
    askTitle: "Arrive as a neighbor, not just a newcomer.",
    askText: "These are the commitments we encourage in every conversation we have — before, during, and after a move.",
    askItems: [
      { title: "Respect Mexican Culture", text: "Learn the customs, pace, and everyday courtesies that shape daily life here, and let them shape how you show up." },
      { title: "Support Local Businesses", text: "Choose Mexican-owned shops, restaurants, and services first whenever you can. Where your money goes matters." },
      { title: "Appreciate Maya Heritage", text: "The Yucatán Peninsula is Maya land long before it was a destination. Learn its history and treat it with the respect it's due." },
      { title: "Protect The Natural Environment", text: "Cenotes, reefs, and jungle are not backdrops. Move through them the way you'd want a guest to move through your own home." },
      { title: "Build Real Relationships", text: "Get to know your neighbors, not just other newcomers. The friendships that matter most are usually the ones that take the longest to build." },
      { title: "Become A Valued Community Member", text: "Show up for the place you live, not just the version of it you found online." },
      { title: "Leave A Positive Impact", text: "However long you stay, leave the place a little better than you found it." },
    ],

    workLabel: "Not Just Words",
    workTitle: "How this shapes the way we actually work.",
    workItems: [
      { title: "Local-First Introductions", text: "When we connect clients to professionals — realtors, lawyers, contractors, and more — we prioritize trusted, Mexican-owned businesses whenever quality and fit allow it." },
      { title: "Honest Guidance, Not A Sales Pitch", text: "We tell you what a place is really like, trade-offs included, rather than only what sells a listing or a service." },
      { title: "A Standard We're Building Toward", text: "Impact is a young commitment. We're actively building formal community-benefit standards for our trusted professional network, and we'll share what we learn as that work matures." },
    ],

    mayaLabel: "Maya Heritage",
    mayaTitle: "This is Maya land.",
    mayaParagraphs: [
      "Long before it was a relocation destination, the Yucatán Peninsula was — and remains — home to the Maya people. Many of the town names you'll come to know, Tulum, Mérida's older neighborhoods, Chichén Itzá, carry that history in their language.",
      "We encourage every client to learn that history, visit Maya sites with genuine curiosity and respect, and support Maya-owned guides, artisans, and businesses directly rather than only through intermediaries.",
    ],

    resourcesLabel: "Resources",
    resourcesTitle: "Turning intention into practice.",
    resourcesText: "Philosophy matters less than what it changes about how you actually move. Start here.",
    resourceCardLabel: "Guide",
    resourceCardTitle: "The Responsible Relocation Guide",
    resourceCardText: "A practical, bilingual guide to language, local customs, Maya heritage, the environment, and building real relationships — written to be used, not just read.",
    resourceCardCta: "Read The Guide",

    closingLabel: "Bring This Into Your Plan",
    closingTitle: "Impact isn't a page. It's part of every plan we build.",
    closingText: "Whether you're just exploring or ready to move, Impact shapes the guidance, introductions, and roadmap you'll get from here.",
    closingCtaPrimary: "Start My Mexico Blueprint",
    closingCtaSecondary: "Back To Home",
  },
  es: {
    seoTitle: "Impacto — Reubicación Responsable",
    seoDescription: "Impacto es el compromiso permanente de Path To Mexico con la reubicación responsable — respetando la cultura mexicana, la herencia maya, los negocios locales y el medio ambiente.",
    toggle: "EN",

    eyebrow: "El Quinto Pilar",
    heroTitle: "Mudarte a México es más que cambiar de dirección.",
    heroText: "Es convertirte en parte de una comunidad. Impacto es nuestro compromiso permanente de ayudar a cada cliente a construir una vida aquí que respete a las personas, la cultura y la tierra que lo hacen posible.",
    heroCtaPrimary: "Leer La Guía De Reubicación Responsable",
    heroCtaSecondary: "Comenzar Mi Mexico Blueprint",

    ideaLabel: "La Idea",
    ideaTitle: "Más que un cambio de dirección.",
    ideaParagraphs: [
      "México le da a quienes llegan algo extraordinario: calidez, ritmo, belleza natural y una cultura con siglos de profundidad. Eso no es algo que se deba dar por sentado.",
      "Impacto es cómo ayudamos a cada cliente a contribuir algo a cambio. No porque México necesite ser salvado — no lo necesita — sino porque pertenecer es un compromiso de dos vías, y una buena reubicación debería dejar el lugar al menos tan bien como lo encontró.",
    ],

    askLabel: "Lo Que Pedimos A Cada Cliente",
    askTitle: "Llega como vecino, no solo como recién llegado.",
    askText: "Estos son los compromisos que fomentamos en cada conversación que tenemos, antes, durante y después de una mudanza.",
    askItems: [
      { title: "Respetar La Cultura Mexicana", text: "Aprende las costumbres, el ritmo y las cortesías cotidianas que dan forma a la vida diaria aquí, y deja que moldeen cómo te presentas." },
      { title: "Apoyar Negocios Locales", text: "Elige tiendas, restaurantes y servicios de dueños mexicanos siempre que puedas. A dónde va tu dinero importa." },
      { title: "Apreciar La Herencia Maya", text: "La Península de Yucatán es tierra maya desde mucho antes de ser un destino. Aprende su historia y trátala con el respeto que merece." },
      { title: "Proteger El Entorno Natural", text: "Los cenotes, los arrecifes y la selva no son un telón de fondo. Muévete por ellos como quisieras que un invitado se moviera por tu propia casa." },
      { title: "Construir Relaciones Reales", text: "Conoce a tus vecinos, no solo a otros recién llegados. Las amistades que más importan suelen ser las que más tiempo toman en construirse." },
      { title: "Convertirte En Un Miembro Valioso De La Comunidad", text: "Involúcrate con el lugar donde vives, no solo con la versión que encontraste en línea." },
      { title: "Dejar Un Impacto Positivo", text: "Sin importar cuánto tiempo te quedes, deja el lugar un poco mejor de como lo encontraste." },
    ],

    workLabel: "No Solo Palabras",
    workTitle: "Cómo esto define la forma en que realmente trabajamos.",
    workItems: [
      { title: "Conexiones Locales Primero", text: "Cuando conectamos clientes con profesionales — agentes inmobiliarios, abogados, contratistas y más — priorizamos negocios mexicanos de confianza siempre que la calidad y el ajuste lo permitan." },
      { title: "Orientación Honesta, No Un Discurso De Ventas", text: "Te decimos cómo es realmente un lugar, con sus contras incluidos, en lugar de solo lo que vende una propiedad o un servicio." },
      { title: "Un Estándar Que Seguimos Construyendo", text: "Impacto es un compromiso joven. Estamos construyendo activamente estándares formales de beneficio comunitario para nuestra red de profesionales de confianza, y compartiremos lo que aprendamos conforme ese trabajo madure." },
    ],

    mayaLabel: "Herencia Maya",
    mayaTitle: "Esta es tierra maya.",
    mayaParagraphs: [
      "Mucho antes de ser un destino de reubicación, la Península de Yucatán fue — y sigue siendo — hogar del pueblo maya. Muchos de los nombres de pueblos que llegarás a conocer, Tulum, los barrios más antiguos de Mérida, Chichén Itzá, llevan esa historia en su idioma.",
      "Animamos a cada cliente a aprender esa historia, visitar sitios mayas con curiosidad y respeto genuinos, y apoyar directamente a guías, artesanos y negocios mayas en lugar de hacerlo solo a través de intermediarios.",
    ],

    resourcesLabel: "Recursos",
    resourcesTitle: "Convertir la intención en práctica.",
    resourcesText: "La filosofía importa menos que lo que cambia en la forma en que realmente te mudas. Empieza aquí.",
    resourceCardLabel: "Guía",
    resourceCardTitle: "La Guía De Reubicación Responsable",
    resourceCardText: "Una guía práctica y bilingüe sobre idioma, costumbres locales, herencia maya, medio ambiente y cómo construir relaciones reales, escrita para usarse, no solo para leerse.",
    resourceCardCta: "Leer La Guía",

    closingLabel: "Llévalo A Tu Plan",
    closingTitle: "Impacto no es una página. Es parte de cada plan que construimos.",
    closingText: "Ya sea que estés explorando o listo para mudarte, Impacto da forma a la orientación, las conexiones y la hoja de ruta que recibirás de aquí en adelante.",
    closingCtaPrimary: "Comenzar Mi Mexico Blueprint",
    closingCtaSecondary: "Volver Al Inicio",
  },
};

const CARD_COLORS = ["#E36F4F", "#007C83", "#F3BE54", "#103D33", "#A8BBA6", "#BFDDE0"];

export default function ImpactPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/impact" />

      <section className="bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-end">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="border border-white/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              {t.toggle}
            </button>
          </div>

          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.eyebrow}</p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            {t.heroTitle}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">{t.heroText}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/guides/responsible-relocation-in-mexico"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.heroCtaPrimary}
            </Link>

            <Link
              to="/my-mexico-blueprint"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.ideaLabel}</p>
          <h2 className="mb-8 text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.ideaTitle}</h2>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-600 sm:text-xl">
            {t.ideaParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CinematicReveal>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.askLabel}</p>
          <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.askTitle}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.askText}</p>
        </CinematicReveal>

        <CinematicReveal stagger className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.askItems.map((item, index) => (
            <div
              key={index}
              className="ptm-card border-t-4 bg-white p-7 shadow-[0_18px_50px_rgba(20,33,28,0.06)] transition hover:shadow-[0_24px_70px_rgba(20,33,28,0.11)]"
              style={{ borderTopColor: CARD_COLORS[index % CARD_COLORS.length] }}
            >
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#14211C]/35">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-4 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{item.text}</p>
            </div>
          ))}
        </CinematicReveal>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.workLabel}</p>
          <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.workTitle}</h2>
        </CinematicReveal>

        <CinematicReveal stagger className="mx-auto mt-12 grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.workItems.map((item, index) => (
            <div key={index} className="flex flex-col bg-[#f6f1e8] p-8 transition hover:bg-white">
              <h3 className="mb-4 text-2xl font-light tracking-[-0.03em]">{item.title}</h3>
              <p className="leading-relaxed text-zinc-600">{item.text}</p>
            </div>
          ))}
        </CinematicReveal>
      </section>

      <section className="bg-[#103D33] px-6 py-20 text-white md:px-20 md:py-28">
        <CinematicReveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/45">{t.mayaLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.mayaTitle}</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/75 md:text-xl">
            {t.mayaParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CinematicReveal>
      </section>

      <section className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.resourcesLabel}</p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.resourcesTitle}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.resourcesText}</p>

          <div className="ptm-card mt-10 max-w-2xl border border-zinc-200 bg-white p-8 shadow-[0_18px_50px_rgba(20,33,28,0.06)] sm:p-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#007C83]">{t.resourceCardLabel}</p>
            <h3 className="mb-4 text-2xl font-light tracking-[-0.03em] sm:text-3xl">{t.resourceCardTitle}</h3>
            <p className="mb-8 leading-relaxed text-zinc-600">{t.resourceCardText}</p>
            <Link
              to="/guides/responsible-relocation-in-mexico"
              className="inline-block rounded-[4px] bg-[#103D33] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#007C83]"
            >
              {t.resourceCardCta}
            </Link>
          </div>
        </CinematicReveal>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.closingLabel}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.closingTitle}</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">{t.closingText}</p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/my-mexico-blueprint"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.closingCtaPrimary}
            </Link>

            <Link
              to="/"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.closingCtaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
