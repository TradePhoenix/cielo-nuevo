import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import RelocationRoadmap from "../components/RelocationRoadmap";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// CONV-001 — this page is the site's existing, canonical services/pricing
// surface (already had real tiers/prices/CTAs; nothing here was rebuilt).
// It was previously only reachable from the footer and an internal dev
// dashboard — completely disconnected from the personalized Blueprint /
// Living Destination Atlas / My Mexico Plan journey. FitCallBar and the
// Mexico Fit Call page now both link here; this file's only changes are
// the pricing_viewed/service_tier_cta_clicked analytics calls below.
//
// PTM Spanish-parity pass — bilingual content object added, matching the
// established local `content = { en, es }` + `useState` + toggle-button
// pattern (HomePage.js, YourMexicoPage.js), not a new i18n system.
const content = {
  en: {
    seoTitle: "Work With Path To Mexico",
    seoDescription: "Clear guidance, trusted introductions, and real-world insight for people exploring or preparing to move to Mexico.",
    toggle: "ES",
    eyebrow: "Work With Path To Mexico",
    heroTitle: "Choose the level of support that fits your move.",
    heroText: "Whether you are just exploring Mexico or already planning your relocation, Path To Mexico offers practical guidance, trusted introductions, and a clearer path into life in Mexico.",
    heroCtaPrimary: "Start With A Fit Call",
    heroCtaSecondary: "Get The Free Guide",
    bestForLabel: "Best For",
    services: [
      {
        title: "Mexico Fit Call",
        price: "$99 USD",
        text: "A private one-on-one call to answer your questions, clarify your options, and help you understand what moving to Mexico could realistically look like.",
        bestFor: ["Early research", "Lifestyle questions", "Budget clarity", "Residency direction", "Choosing your next step"],
        cta: "Book The Call",
        href: "/mexico-fit-call",
      },
      {
        title: "Relocation Roadmap",
        price: "Starting at $499 USD",
        text: "A personalized relocation strategy built around your timeline, budget, lifestyle preferences, housing needs, and long-term vision for life in Mexico.",
        bestFor: ["People ready to plan", "Couples and families", "Remote workers", "Retirees", "Entrepreneurs"],
        cta: "Discuss The Roadmap",
        href: "/mexico-fit-call",
      },
      {
        title: "Guided Landing",
        price: "Custom Quote",
        text: "Private relocation support for people who want hands-on guidance, trusted introductions, and help navigating the practical details before and after arrival.",
        bestFor: ["Hands-on support", "Trusted local network", "Housing connections", "Professional introductions", "Ongoing guidance"],
        cta: "Discuss Guided Landing",
        href: "/mexico-fit-call",
      },
    ],
    whichOneLabel: "Which One Is Right?",
    whichOneTitle: "Start smaller if you need clarity. Go deeper when you are ready to move.",
    whichOneItems: [
      ["If you are still exploring", "Start with the Mexico Fit Call."],
      ["If you know Mexico is likely", "Choose the Relocation Roadmap."],
      ["If you want hands-on help", "Ask about Guided Landing support."],
      ["If you are unsure", "Start with one conversation. That is usually enough to reveal the next step."],
    ],
    whyLabel: "Why Path To Mexico",
    whyTitle: "The internet gives information. Relationships create confidence.",
    whyParagraphs: [
      "Moving countries is not only about finding information. It is about knowing which information matters, what decisions come first, and who you can trust when the process becomes practical.",
      "Path To Mexico is intentionally built around clarity, lived experience, and carefully selected local connections rather than overwhelming directories or endless opinions.",
    ],
    whyClosing: "Better questions. Better introductions. A smoother landing.",
    closingLabel: "Start Here",
    closingTitle: "One clear conversation can change the whole direction of your move.",
    closingText: "If you are considering Mexico and want honest guidance before making expensive decisions, start with a Mexico Fit Call.",
    closingCtaPrimary: "Book A Mexico Fit Call",
    closingCtaSecondary: "Back To Home",
  },
  es: {
    seoTitle: "Trabaja Con Path To Mexico",
    seoDescription: "Orientación clara, conexiones de confianza y perspectiva real para quienes exploran o se preparan para mudarse a México.",
    toggle: "EN",
    eyebrow: "Trabaja Con Path To Mexico",
    heroTitle: "Elige el nivel de apoyo que se ajusta a tu mudanza.",
    heroText: "Ya sea que estés explorando México o ya estés planeando tu reubicación, Path To Mexico ofrece guía práctica, conexiones de confianza y un camino más claro hacia la vida en México.",
    heroCtaPrimary: "Empezar Con Una Fit Call",
    heroCtaSecondary: "Obtener La Guía Gratis",
    bestForLabel: "Ideal Para",
    services: [
      {
        title: "Mexico Fit Call",
        price: "$99 USD",
        text: "Una llamada privada uno a uno para responder tus preguntas, aclarar tus opciones y ayudarte a entender cómo podría verse realmente una mudanza a México.",
        bestFor: ["Investigación inicial", "Preguntas de estilo de vida", "Claridad de presupuesto", "Dirección de residencia", "Elegir tu próximo paso"],
        cta: "Reservar La Llamada",
        href: "/mexico-fit-call",
      },
      {
        title: "Roadmap De Reubicación",
        price: "Desde $499 USD",
        text: "Una estrategia personalizada de reubicación construida alrededor de tu cronograma, presupuesto, preferencias de estilo de vida, necesidades de vivienda y visión a largo plazo en México.",
        bestFor: ["Personas listas para planear", "Parejas y familias", "Trabajadores remotos", "Jubilados", "Emprendedores"],
        cta: "Hablar Sobre El Roadmap",
        href: "/mexico-fit-call",
      },
      {
        title: "Llegada Guiada",
        price: "Cotización Personalizada",
        text: "Apoyo privado de reubicación para quienes quieren guía práctica, conexiones de confianza y ayuda para resolver los detalles prácticos antes y después de llegar.",
        bestFor: ["Apoyo práctico", "Red local de confianza", "Conexiones de vivienda", "Presentaciones profesionales", "Acompañamiento continuo"],
        cta: "Hablar Sobre Llegada Guiada",
        href: "/mexico-fit-call",
      },
    ],
    whichOneLabel: "¿Cuál Es La Indicada Para Ti?",
    whichOneTitle: "Empieza más pequeño si necesitas claridad. Ve más a fondo cuando estés listo para mudarte.",
    whichOneItems: [
      ["Si todavía estás explorando", "Empieza con la Mexico Fit Call."],
      ["Si sabes que México es probable", "Elige el Roadmap De Reubicación."],
      ["Si quieres ayuda práctica", "Pregunta sobre el apoyo de Llegada Guiada."],
      ["Si no estás seguro", "Empieza con una conversación. Normalmente eso basta para revelar el siguiente paso."],
    ],
    whyLabel: "Por Qué Path To Mexico",
    whyTitle: "Internet te da información. Las relaciones crean confianza.",
    whyParagraphs: [
      "Mudarse de país no se trata solo de encontrar información. Se trata de saber qué información importa, qué decisiones vienen primero y en quién puedes confiar cuando el proceso se vuelve práctico.",
      "Path To Mexico está construido deliberadamente en torno a la claridad, la experiencia vivida y conexiones locales cuidadosamente seleccionadas, en lugar de directorios abrumadores u opiniones interminables.",
    ],
    whyClosing: "Mejores preguntas. Mejores conexiones. Una llegada más fácil.",
    closingLabel: "Empieza Aquí",
    closingTitle: "Una conversación clara puede cambiar toda la dirección de tu mudanza.",
    closingText: "Si estás considerando México y quieres orientación honesta antes de tomar decisiones costosas, empieza con una Mexico Fit Call.",
    closingCtaPrimary: "Reservar Una Mexico Fit Call",
    closingCtaSecondary: "Volver Al Inicio",
  },
};

export default function WorkWithPathToMexicoPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PRICING_VIEWED, { source: "work_with_path_to_mexico" });
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/work-with-path-to-mexico" />

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
              to="/mexico-fit-call"
              onClick={() => trackEvent(ANALYTICS_EVENTS.FIT_CALL_CTA_CLICKED, { source: "work_with_us_hero", cityId: null })}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.heroCtaPrimary}
            </Link>

            <Link
              to="/free-guide"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.services.map((service, index) => (
            <div key={index} className="flex min-h-[560px] flex-col justify-between bg-[#f6f1e8] p-8 transition hover:bg-white">
              <div>
                <h2 className="mb-4 text-4xl font-light tracking-[-0.05em]">{service.title}</h2>
                <p className="mb-7 text-sm uppercase tracking-[0.25em] text-zinc-500">{service.price}</p>
                <p className="mb-8 leading-relaxed text-zinc-600">{service.text}</p>

                <div className="border-t border-zinc-300 pt-6">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">{t.bestForLabel}</p>
                  <ul className="space-y-3 text-zinc-700">
                    {service.bestFor.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={service.href}
                onClick={() => trackEvent(ANALYTICS_EVENTS.SERVICE_TIER_CTA_CLICKED, { tier: service.title })}
                className="mt-10 inline-block border border-zinc-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whichOneLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.whichOneTitle}</h2>
          </div>

          <div className="grid gap-4 text-zinc-700">
            {t.whichOneItems.map(([label, text], index) => (
              <div key={index} className="border border-zinc-200 bg-white p-6 transition hover:bg-[#f6f1e8]">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</p>
                <p className="text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelocationRoadmap lang={lang} />

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whyLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.whyTitle}</h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
            {t.whyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="text-zinc-950">{t.whyClosing}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.closingLabel}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.closingTitle}</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">{t.closingText}</p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/mexico-fit-call"
              onClick={() => trackEvent(ANALYTICS_EVENTS.FIT_CALL_CTA_CLICKED, { source: "work_with_us_closing", cityId: null })}
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
