import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FOUNDER, ENDORSEMENT, CLIENT_TESTIMONIAL, FIT_CALL_PRICE } from "../data/trustContent";
import { getCalendlyUrl } from "../config/booking";
import SEO from "../components/SEO";
import { buildFitCallContext } from "./mexicoFitCallContext";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// CONV-001 — Fit Call continuity: a visitor arriving from a specific
// destination (FitCallBar/ResultsCTA now link here as
// /mexico-fit-call?city=<id>) sees that context reflected in both the
// headline and the WhatsApp message, instead of landing on an identical
// generic page regardless of where they came from. Arriving with no
// `city` param (e.g. from the homepage or footer) is unaffected — every
// string below falls back to the exact original generic copy.
//
// PTM Spanish-parity pass — bilingual content object, same local pattern
// as HomePage.js/YourMexicoPage.js.
//
// TRUST-001 — the second trust card was a client testimonial; it's now a
// verified professional endorsement (ENDORSEMENT, see trustContent.js).
// Shows only its first paragraph — a complete, unaltered sentence — since
// this compact card was sized for a short pull-quote, not the full
// multi-paragraph reference letter (that lives in full on the homepage).
const content = {
  en: {
    seoTitle: "Mexico Fit Call",
    seoDescription: "Get clear before you move to Mexico — a private one-on-one call to answer your questions and help you understand what moving could realistically look like for you.",
    toggle: "ES",
    eyebrow: "Mexico Fit Call",
    heroTitleGeneric: "Get clear before you move to Mexico.",
    heroTitleCity: (cityName) => `Get clear about ${cityName} before you move.`,
    heroTextGeneric: "A private one-on-one relocation call for people considering life in Mexico. We'll talk through your goals, timeline, budget, preferred areas, residency questions, lifestyle needs, and the smartest next step.",
    heroTextCity: (cityName) => `A private one-on-one relocation call, starting with ${cityName}. We'll talk through your goals, timeline, budget, residency questions, lifestyle needs, and the smartest next step.`,
    priceLine: "One Private, One-On-One Call",
    bookTheCall: "Book The Call",
    whatsappSecondary: "Prefer WhatsApp? Message Kalen Directly",
    backToHome: "Back To Home",
    planBannerText: (
      <>
        Already built your <span className="font-semibold text-zinc-950">My Mexico Plan</span>? Bring it to the
        call — we'll refine your city choice, residency path, budget, and next actions together.
      </>
    ),
    planBannerCta: "Open My Mexico Plan",
    nextLabel: "What Happens Next",
    nextTitle: "From booking your call to your next step.",
    nextSteps: [
      ["01 · Book Your Call", "Pick a time that works for you with the booking button above — it takes about a minute. Prefer to talk to a person first? Message Path To Mexico on WhatsApp and Kalen replies personally."],
      ["02 · Before The Call", "There is nothing you need to prepare. It helps to have a general sense of your timeline and budget, but showing up without every answer figured out is completely normal."],
      ["03 · During The Call", "One focused, one-on-one conversation about your specific situation and questions — see exactly what's covered below."],
      ["04 · After The Call", "You leave with a clearer next step, not a sales pitch. There is no obligation to book anything further — some people continue with the Relocation Roadmap or Guided Landing, many simply move forward with more clarity."],
    ],
    coverLabel: "What We’ll Cover",
    coverTitle: "One focused call can save months of confusion.",
    coverItems: [
      "Your reason for considering Mexico",
      "Playa del Carmen, Tulum, Cancún, or another area",
      "Budget, rent, lifestyle, and monthly cost expectations",
      "Residency, healthcare, banking, and local setup questions",
      "Renting versus buying considerations",
      "Whether Path To Mexico is the right support for your move",
    ],
    bestForLabel: "Best For",
    bestForTitle: "This is for people who want honest guidance before making expensive decisions.",
    bestForItems: [
      "You are thinking seriously about moving to Mexico.",
      "You feel overwhelmed by conflicting online information.",
      "You want to understand real costs and lifestyle tradeoffs.",
      "You need help deciding your smartest first step.",
    ],
    whoLabel: "Who You're Talking To",
    clientStoryLabel: "A Client Story",
    starsAria: "Rated 5 out of 5 stars",
    whoTitle: "Not a sales team. One person who has already done this.",
    aboutLink: "Read why Kalen built Path To Mexico",
    closingLabel: "Private Relocation Guidance",
    closingTitle: "You do not need every answer today. You need the right next step.",
    closingText: "This call is not about pressure. It is about clarity, direction, and helping you understand whether Mexico fits the life you are trying to build.",
    closingPriceLine: "One Private Call",
    closingCta: "Book Your Mexico Fit Call",
    moreOptionsText: "Want more than a single call? The Relocation Roadmap and Guided Landing options go further —",
    moreOptionsLink: "see what's available",
    disclaimer: "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage.",
  },
  es: {
    seoTitle: "Mexico Fit Call",
    seoDescription: "Ten claridad antes de mudarte a México — una llamada privada uno a uno para responder tus preguntas y ayudarte a entender cómo podría verse realmente tu mudanza.",
    toggle: "EN",
    eyebrow: "Mexico Fit Call",
    heroTitleGeneric: "Ten claridad antes de mudarte a México.",
    heroTitleCity: (cityName) => `Ten claridad sobre ${cityName} antes de mudarte.`,
    heroTextGeneric: "Una llamada privada uno a uno de reubicación para personas que consideran vivir en México. Hablaremos de tus metas, cronograma, presupuesto, zonas preferidas, preguntas de residencia, necesidades de estilo de vida y el paso más inteligente a seguir.",
    heroTextCity: (cityName) => `Una llamada privada uno a uno de reubicación, empezando con ${cityName}. Hablaremos de tus metas, cronograma, presupuesto, preguntas de residencia, necesidades de estilo de vida y el paso más inteligente a seguir.`,
    priceLine: "Una Llamada Privada, Uno A Uno",
    bookTheCall: "Reservar La Llamada",
    whatsappSecondary: "¿Prefieres WhatsApp? Escríbele Directamente a Kalen",
    backToHome: "Volver Al Inicio",
    planBannerText: (
      <>
        ¿Ya construiste tu <span className="font-semibold text-zinc-950">My Mexico Plan</span>? Tráelo a la
        llamada — juntos refinaremos tu elección de ciudad, ruta de residencia, presupuesto y próximas acciones.
      </>
    ),
    planBannerCta: "Abrir My Mexico Plan",
    nextLabel: "Qué Sigue",
    nextTitle: "De reservar tu llamada a tu próximo paso.",
    nextSteps: [
      ["01 · Reserva Tu Llamada", "Elige un horario que te funcione con el botón de reserva de arriba — toma alrededor de un minuto. ¿Prefieres hablar primero con una persona? Escribe a Path To Mexico por WhatsApp y Kalen responde personalmente."],
      ["02 · Antes De La Llamada", "No necesitas preparar nada. Ayuda tener una idea general de tu cronograma y presupuesto, pero llegar sin tener todas las respuestas resueltas es completamente normal."],
      ["03 · Durante La Llamada", "Una conversación enfocada, uno a uno, sobre tu situación y preguntas específicas — mira exactamente lo que se cubre abajo."],
      ["04 · Después De La Llamada", "Sales con un próximo paso más claro, no con un discurso de venta. No hay obligación de reservar nada más — algunas personas continúan con el Roadmap De Reubicación o Llegada Guiada, muchas simplemente avanzan con más claridad."],
    ],
    coverLabel: "Qué Cubriremos",
    coverTitle: "Una llamada enfocada puede ahorrarte meses de confusión.",
    coverItems: [
      "Tu razón para considerar México",
      "Playa del Carmen, Tulum, Cancún, u otra zona",
      "Presupuesto, renta, estilo de vida y expectativas de costo mensual",
      "Residencia, salud, banca y preguntas de organización local",
      "Consideraciones sobre rentar versus comprar",
      "Si Path To Mexico es el apoyo adecuado para tu mudanza",
    ],
    bestForLabel: "Ideal Para",
    bestForTitle: "Esto es para personas que quieren orientación honesta antes de tomar decisiones costosas.",
    bestForItems: [
      "Estás pensando seriamente en mudarte a México.",
      "Te sientes abrumado por información contradictoria en internet.",
      "Quieres entender los costos reales y los pros y contras del estilo de vida.",
      "Necesitas ayuda para decidir tu paso inicial más inteligente.",
    ],
    whoLabel: "Con Quién Estás Hablando",
    clientStoryLabel: "Una Historia De Cliente",
    starsAria: "Calificación: 5 de 5 estrellas",
    whoTitle: "No es un equipo de ventas. Una persona que ya ha vivido esto.",
    aboutLink: "Lee por qué Kalen creó Path To Mexico",
    closingLabel: "Orientación Privada De Reubicación",
    closingTitle: "No necesitas tener todas las respuestas hoy. Necesitas el próximo paso correcto.",
    closingText: "Esta llamada no se trata de presión. Se trata de claridad, dirección y ayudarte a entender si México encaja con la vida que estás intentando construir.",
    closingPriceLine: "Una Llamada Privada",
    closingCta: "Reservar Tu Mexico Fit Call",
    moreOptionsText: "¿Quieres más que una sola llamada? Las opciones de Roadmap De Reubicación y Llegada Guiada van más allá —",
    moreOptionsLink: "ver qué está disponible",
    disclaimer: "Path To Mexico ofrece orientación de reubicación, conocimiento local y conexiones de confianza. No somos un despacho legal, una agencia de inmigración, un asesor fiscal, un asesor financiero ni una correduría inmobiliaria.",
  },
};

export default function MexicoFitCallPage() {
  const [searchParams] = useSearchParams();
  const { cityName, whatsappUrl: whatsapp } = buildFitCallContext(searchParams.get("city"));
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];
  const endorsementQuote = ENDORSEMENT.quoteParagraphs[0];
  const endorsementQuoteEs = ENDORSEMENT.quoteParagraphsEs[0];

  function handleBookClick(source) {
    trackEvent(ANALYTICS_EVENTS.FIT_CALL_CTA_CLICKED, { source, cityName: cityName || null });
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/mexico-fit-call" />
      <section className="relative overflow-hidden bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-end">
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
            {cityName ? t.heroTitleCity(cityName) : t.heroTitleGeneric}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            {cityName ? t.heroTextCity(cityName) : t.heroTextGeneric}
          </p>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50">
            {FIT_CALL_PRICE} &middot; {t.priceLine}
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a
              href={getCalendlyUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBookClick("hero")}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.bookTheCall}
            </a>

            <Link
              to="/"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.backToHome}
            </Link>
          </div>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleBookClick("hero_whatsapp")}
            className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 transition hover:text-white"
          >
            {t.whatsappSecondary}
          </a>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-6 md:px-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm leading-relaxed text-zinc-600">{t.planBannerText}</p>
          <Link
            to="/my-mexico-plan"
            className="flex-shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.planBannerCta}
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.nextLabel}</p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.nextTitle}
          </h2>

          <div className="grid gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
            {t.nextSteps.map(([title, text], index) => (
              <div key={index} className="bg-[#f6f1e8] p-8 transition hover:bg-white">
                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">{title}</p>
                <p className="text-lg leading-relaxed text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.coverLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.coverTitle}</h2>
          </div>

          <div className="grid gap-4 text-zinc-700">
            {t.coverItems.map((item, index) => (
              <div key={index} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#f6f1e8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.bestForLabel}</p>

          <h2 className="mb-12 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.bestForTitle}
          </h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-2">
            {t.bestForItems.map((item, index) => (
              <div key={index} className="bg-[#efe7d8] p-7 text-lg text-zinc-700 transition hover:bg-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whoLabel}</p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            {t.whoTitle}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-zinc-200 bg-[#f6f1e8] p-8">
              <img
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover"
              />
              <p className="mt-5 text-lg leading-relaxed text-zinc-700">
                "{lang === "es" ? FOUNDER.quoteEs || FOUNDER.quote : FOUNDER.quote}"
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {FOUNDER.name} &middot; {lang === "es" ? FOUNDER.roleEs || FOUNDER.role : FOUNDER.role}
              </p>
            </div>

            <div className="border border-zinc-200 bg-[#f6f1e8] p-8">
              <p className="text-lg leading-relaxed text-zinc-700">
                "{lang === "es" ? endorsementQuoteEs : endorsementQuote}"
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {ENDORSEMENT.name} &middot; {lang === "es" ? ENDORSEMENT.roleEs : ENDORSEMENT.role}
              </p>
            </div>
          </div>

          <div className="mt-6 border border-zinc-200 bg-[#f6f1e8] p-8 sm:p-10">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              {t.clientStoryLabel}
            </p>
            <p role="img" aria-label={t.starsAria} className="mb-6 text-base tracking-[0.35em] text-zinc-950">
              <span aria-hidden="true">{"★".repeat(CLIENT_TESTIMONIAL.rating)}</span>
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-zinc-700">
              {(lang === "es" ? CLIENT_TESTIMONIAL.quoteParagraphsEs : CLIENT_TESTIMONIAL.quoteParagraphs).map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">
              {CLIENT_TESTIMONIAL.name} &middot;{" "}
              {lang === "es" ? CLIENT_TESTIMONIAL.roleEs : CLIENT_TESTIMONIAL.role}
            </p>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            <a
              href="/#about"
              className="underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950"
            >
              {t.aboutLink}
            </a>
          </p>
        </div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.closingLabel}</p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.closingTitle}</h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">{t.closingText}</p>

          <p className="mx-auto mt-6 text-xs uppercase tracking-[0.25em] text-white/40">
            {FIT_CALL_PRICE} &middot; {t.closingPriceLine}
          </p>

          <a
            href={getCalendlyUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleBookClick("closing")}
            className="mt-8 inline-block bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
          >
            {t.closingCta}
          </a>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleBookClick("closing_whatsapp")}
            className="mx-auto mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 transition hover:text-white"
          >
            {t.whatsappSecondary}
          </a>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/40">
            {t.moreOptionsText}{" "}
            <Link
              to="/work-with-path-to-mexico"
              onClick={() => trackEvent(ANALYTICS_EVENTS.SERVICES_CTA_CLICKED, { source: "mexico_fit_call_page" })}
              className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
            >
              {t.moreOptionsLink}
            </Link>
            .
          </p>

          <p className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-white/30">{t.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}
