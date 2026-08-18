import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { ROADMAP_PRICE } from "../data/trustContent";

// Launch fix #4 — dedicated Personalized Roadmap product page. Until a
// verified $499 payment mechanism exists (external dependency: Kalen's
// provider decision), the launch-safe flow is qualification-first: the CTA
// routes to the Mexico Fit Call, where the Roadmap is scoped and
// confirmed. Nothing on this page implies a payment has occurred.
//
// Same established page pattern as WorkWithPathToMexicoPage.js: bilingual
// local content object, stored-language toggle, SEO component — not a new
// i18n system.
const content = {
  en: {
    seoTitle: "Personalized Relocation Roadmap",
    seoDescription:
      "A personalized Mexico relocation plan built around your situation, priorities, destinations, and timing — not a generic guide.",
    toggle: "ES",
    eyebrow: "Personalized Relocation Roadmap",
    heroTitle: "A relocation plan built around your life, not a template.",
    heroText:
      "The Roadmap turns everything specific about your move — your situation, your priorities, your destinations, your timing — into one clear, personalized plan for getting to Mexico with confidence.",
    heroPrice: ROADMAP_PRICE,
    heroCtaPrimary: "Start Your Roadmap",
    heroCtaSecondary: "Compare All Services",
    whatLabel: "What It Is",
    whatTitle: "Personal research and structured direction, on paper.",
    whatParagraphs: [
      "The Roadmap is not a PDF template or a repackaged guide. It is a personalized relocation plan prepared around your actual circumstances — built after Path To Mexico has understood your goals, constraints, and questions.",
      "It exists for one reason: so that instead of a hundred open browser tabs, you have one document that tells you what matters for your move, in what order, and what to do next.",
    ],
    whoLabel: "Who It's For",
    whoTitle: "For people who are serious about the move.",
    whoText:
      "The Roadmap fits people who know Mexico is likely and want structured direction before committing to full concierge support — individuals, couples, families, retirees, remote workers, and entrepreneurs who would rather plan once, properly.",
    coverLabel: "What It Can Cover",
    coverTitle: "Shaped by your situation — not a fixed table of contents.",
    coverItems: [
      "Destination fit and comparison",
      "A realistic relocation timeline",
      "Residency and logistics considerations",
      "Housing approach — where and how to start",
      "Healthcare considerations",
      "Banking and money logistics",
      "Transportation and getting around",
      "Moving logistics and what to bring",
      "Provider and connection recommendations where appropriate",
      "Arrival priorities for your first weeks",
      "Risk and uncertainty areas to watch",
      "Personalized next steps",
    ],
    flowLabel: "How It Works",
    flowTitle: "From decision to delivered plan.",
    flowSteps: [
      ["01 · Start", "Begin with a Mexico Fit Call — it confirms the Roadmap fits your situation and captures what your plan needs to cover. If you've already had your call, you can move straight ahead."],
      ["02 · Intake", "You share the details that shape the plan: household, timeline, budget realities, destination interests, and the questions keeping you up at night."],
      ["03 · Research & Preparation", "Path To Mexico reviews your situation and prepares your plan around it — personalized research, not boilerplate."],
      ["04 · Delivery", "You receive your Roadmap: your destinations, your sequence, your next steps."],
      ["05 · Next Steps", "A follow-up conversation on where to go from here — on your own with a clear plan, or with Guided Landing support where it genuinely helps."],
    ],
    boundariesLabel: "Honest Boundaries",
    boundariesText:
      "The Roadmap is practical relocation guidance, not professional advice. Path To Mexico is not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage — where your move needs qualified professionals, the Roadmap says so and points you toward them.",
    closingLabel: "Ready To Plan",
    closingTitle: "Plan the move once, properly.",
    closingText:
      "Start with a Mexico Fit Call — it's where every Roadmap begins, and where we confirm this is the right level of support for your move.",
    closingCtaPrimary: "Start Your Roadmap",
    closingCtaSecondary: "Back To All Services",
  },
  es: {
    seoTitle: "Roadmap Personalizado De Reubicación",
    seoDescription:
      "Un plan personalizado de reubicación a México construido alrededor de tu situación, prioridades, destinos y tiempos — no una guía genérica.",
    toggle: "EN",
    eyebrow: "Roadmap Personalizado De Reubicación",
    heroTitle: "Un plan de reubicación construido alrededor de tu vida, no una plantilla.",
    heroText:
      "El Roadmap convierte todo lo específico de tu mudanza — tu situación, tus prioridades, tus destinos, tus tiempos — en un solo plan claro y personalizado para llegar a México con confianza.",
    heroPrice: ROADMAP_PRICE,
    heroCtaPrimary: "Empieza Tu Roadmap",
    heroCtaSecondary: "Comparar Todos Los Servicios",
    whatLabel: "Qué Es",
    whatTitle: "Investigación personal y dirección estructurada, por escrito.",
    whatParagraphs: [
      "El Roadmap no es una plantilla en PDF ni una guía reempaquetada. Es un plan personalizado de reubicación preparado alrededor de tus circunstancias reales — construido después de que Path To Mexico entiende tus metas, tus límites y tus preguntas.",
      "Existe por una razón: que en lugar de cien pestañas abiertas en el navegador, tengas un documento que te dice qué importa para tu mudanza, en qué orden, y qué hacer después.",
    ],
    whoLabel: "Para Quién Es",
    whoTitle: "Para personas que van en serio con la mudanza.",
    whoText:
      "El Roadmap es para quienes saben que México es probable y quieren dirección estructurada antes de comprometerse con el apoyo concierge completo — individuos, parejas, familias, jubilados, trabajadores remotos y emprendedores que prefieren planear una sola vez, bien.",
    coverLabel: "Qué Puede Cubrir",
    coverTitle: "Moldeado por tu situación — no un índice fijo.",
    coverItems: [
      "Ajuste y comparación de destinos",
      "Un cronograma realista de reubicación",
      "Consideraciones de residencia y logística",
      "Estrategia de vivienda — dónde y cómo empezar",
      "Consideraciones de salud",
      "Banca y logística de dinero",
      "Transporte y movilidad",
      "Logística de mudanza y qué llevar",
      "Recomendaciones de proveedores y conexiones donde corresponda",
      "Prioridades de llegada para tus primeras semanas",
      "Áreas de riesgo e incertidumbre a vigilar",
      "Próximos pasos personalizados",
    ],
    flowLabel: "Cómo Funciona",
    flowTitle: "De la decisión al plan entregado.",
    flowSteps: [
      ["01 · Empieza", "Comienza con una Mexico Fit Call — confirma que el Roadmap encaja con tu situación y captura lo que tu plan necesita cubrir. Si ya tuviste tu llamada, puedes avanzar directamente."],
      ["02 · Intake", "Compartes los detalles que dan forma al plan: hogar, cronograma, realidades de presupuesto, destinos de interés y las preguntas que te quitan el sueño."],
      ["03 · Investigación Y Preparación", "Path To Mexico revisa tu situación y prepara tu plan alrededor de ella — investigación personalizada, no texto genérico."],
      ["04 · Entrega", "Recibes tu Roadmap: tus destinos, tu secuencia, tus próximos pasos."],
      ["05 · Próximos Pasos", "Una conversación de seguimiento sobre cómo continuar — por tu cuenta con un plan claro, o con el apoyo de Llegada Guiada donde realmente ayude."],
    ],
    boundariesLabel: "Límites Honestos",
    boundariesText:
      "El Roadmap es orientación práctica de reubicación, no asesoría profesional. Path To Mexico no es un despacho legal, agencia de inmigración, asesor fiscal, asesor financiero ni corredor de bienes raíces — donde tu mudanza necesite profesionales calificados, el Roadmap lo dice y te dirige hacia ellos.",
    closingLabel: "Listo Para Planear",
    closingTitle: "Planea la mudanza una sola vez, bien.",
    closingText:
      "Empieza con una Mexico Fit Call — ahí comienza cada Roadmap, y ahí confirmamos que este es el nivel de apoyo adecuado para tu mudanza.",
    closingCtaPrimary: "Empieza Tu Roadmap",
    closingCtaSecondary: "Volver A Todos Los Servicios",
  },
};

export default function RelocationRoadmapPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PRICING_VIEWED, { source: "relocation_roadmap_page" });
  }, []);

  const trackStart = (source) => () =>
    trackEvent(ANALYTICS_EVENTS.SERVICE_TIER_CTA_CLICKED, { tier: "Relocation Roadmap", source });

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/relocation-roadmap" />

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

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[#d8a15f]">{t.heroPrice}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/mexico-fit-call"
              onClick={trackStart("roadmap_hero")}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.heroCtaPrimary}
            </Link>
            <Link
              to="/work-with-path-to-mexico"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whatLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.whatTitle}</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
            {t.whatParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whoLabel}</p>
          <h2 className="mb-8 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.whoTitle}
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-700 md:text-xl">{t.whoText}</p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.coverLabel}</p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.coverTitle}
          </h2>
          <div className="grid gap-4 text-zinc-700 sm:grid-cols-2 lg:grid-cols-3">
            {t.coverItems.map((item, index) => (
              <div key={index} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#efe7d8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.flowLabel}</p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.flowTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-5">
            {t.flowSteps.map(([label, text], index) => (
              <div key={index} className="border border-zinc-300 bg-white p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</p>
                <p className="leading-relaxed text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-zinc-500">
            <span className="uppercase tracking-[0.2em]">{t.boundariesLabel}</span> — {t.boundariesText}
          </p>
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
              onClick={trackStart("roadmap_closing")}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.closingCtaPrimary}
            </Link>
            <Link
              to="/work-with-path-to-mexico"
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
