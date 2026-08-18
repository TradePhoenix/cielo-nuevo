import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { GUIDED_LANDING_PRICING } from "../data/trustContent";

// Launch fix #4 — dedicated Guided Landing / concierge page. Deliberately
// custom-quote: pricing is scoped per client after a Mexico Fit Call, and
// no fixed dollar amount is published anywhere. The CTA language is
// explicitly "discuss", never "buy". Scope language sticks to
// coordination / connection / guidance — no invented partner network, no
// services PTM cannot professionally deliver.
const content = {
  en: {
    seoTitle: "Guided Landing",
    seoDescription:
      "Hands-on, concierge-style relocation support for people who want Path To Mexico coordinating more of the move — scoped and quoted around your situation.",
    toggle: "ES",
    eyebrow: "Guided Landing · Concierge Support",
    heroTitle: "Hands-on support for the move itself.",
    heroText:
      "Guided Landing is for people who don't just want a plan — they want Path To Mexico alongside them, coordinating the practical details before and after arrival.",
    heroPricing: GUIDED_LANDING_PRICING.en,
    heroPricingNote: "Scoped and quoted around your situation after a Mexico Fit Call.",
    heroCtaPrimary: "Discuss Guided Landing",
    heroCtaSecondary: "Compare All Services",
    scopeLabel: "What It Can Include",
    scopeTitle: "Built around what your move actually needs.",
    scopeText:
      "No two engagements are identical. Depending on your situation, Guided Landing support can include:",
    scopeItems: [
      "Relocation planning and sequencing",
      "Introductions to trusted local connections",
      "Property and rental coordination",
      "Healthcare connections",
      "Coordination with residency and legal professionals",
      "Banking and money logistics",
      "Vehicle-purchase connections",
      "Arrival preparation",
      "Local orientation when you land",
      "Partner and provider coordination",
      "Practical settling-in support",
    ],
    howLabel: "How It Works",
    howTitle: "Custom scope. Custom quote. No surprises.",
    howSteps: [
      ["01 · Fit Call", "Every Guided Landing engagement starts with a Mexico Fit Call — it's where we understand your move and confirm this level of support genuinely fits."],
      ["02 · Needs Clarified", "Together we map what your move actually requires: where you're going, what you need coordinated, and where you want hands-on help versus direction."],
      ["03 · Custom Scope", "Path To Mexico proposes a scope built around those needs — what's included, what's coordinated, and where qualified professionals come in."],
      ["04 · Custom Quote", "You receive a quote for that scope. No fixed packages, no paying for support you don't need."],
    ],
    boundariesLabel: "Honest Boundaries",
    boundariesText:
      "Guided Landing is coordination, connection, and guidance — not professional advice. Path To Mexico is not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage; where your move requires licensed professionals, we coordinate with them rather than substitute for them.",
    closingLabel: "Talk It Through",
    closingTitle: "Start with one conversation about your move.",
    closingText:
      "A Mexico Fit Call is where every Guided Landing engagement begins — bring your situation, and leave knowing exactly what support would look like.",
    closingCtaPrimary: "Discuss Guided Landing",
    closingCtaSecondary: "See The Roadmap Instead",
  },
  es: {
    seoTitle: "Llegada Guiada",
    seoDescription:
      "Apoyo práctico estilo concierge para quienes quieren que Path To Mexico coordine más de la mudanza — con alcance y cotización según tu situación.",
    toggle: "EN",
    eyebrow: "Llegada Guiada · Apoyo Concierge",
    heroTitle: "Apoyo práctico para la mudanza misma.",
    heroText:
      "Llegada Guiada es para quienes no solo quieren un plan — quieren a Path To Mexico a su lado, coordinando los detalles prácticos antes y después de llegar.",
    heroPricing: GUIDED_LANDING_PRICING.es,
    heroPricingNote: "Con alcance y cotización según tu situación, después de una Mexico Fit Call.",
    heroCtaPrimary: "Hablar Sobre Llegada Guiada",
    heroCtaSecondary: "Comparar Todos Los Servicios",
    scopeLabel: "Qué Puede Incluir",
    scopeTitle: "Construido alrededor de lo que tu mudanza realmente necesita.",
    scopeText:
      "No hay dos acompañamientos idénticos. Según tu situación, el apoyo de Llegada Guiada puede incluir:",
    scopeItems: [
      "Planeación y secuencia de la reubicación",
      "Presentaciones con conexiones locales de confianza",
      "Coordinación de propiedades y rentas",
      "Conexiones de salud",
      "Coordinación con profesionales de residencia y legales",
      "Banca y logística de dinero",
      "Conexiones para compra de vehículo",
      "Preparación de llegada",
      "Orientación local cuando aterrizas",
      "Coordinación con socios y proveedores",
      "Apoyo práctico para instalarte",
    ],
    howLabel: "Cómo Funciona",
    howTitle: "Alcance a medida. Cotización a medida. Sin sorpresas.",
    howSteps: [
      ["01 · Fit Call", "Todo acompañamiento de Llegada Guiada empieza con una Mexico Fit Call — ahí entendemos tu mudanza y confirmamos que este nivel de apoyo realmente encaja."],
      ["02 · Necesidades Claras", "Juntos mapeamos lo que tu mudanza realmente requiere: a dónde vas, qué necesitas coordinar y dónde quieres ayuda práctica versus dirección."],
      ["03 · Alcance A Medida", "Path To Mexico propone un alcance construido alrededor de esas necesidades — qué se incluye, qué se coordina y dónde entran los profesionales calificados."],
      ["04 · Cotización A Medida", "Recibes una cotización para ese alcance. Sin paquetes fijos, sin pagar por apoyo que no necesitas."],
    ],
    boundariesLabel: "Límites Honestos",
    boundariesText:
      "Llegada Guiada es coordinación, conexión y orientación — no asesoría profesional. Path To Mexico no es un despacho legal, agencia de inmigración, asesor fiscal, asesor financiero ni corredor de bienes raíces; donde tu mudanza requiera profesionales con licencia, coordinamos con ellos en lugar de sustituirlos.",
    closingLabel: "Hablemos",
    closingTitle: "Empieza con una conversación sobre tu mudanza.",
    closingText:
      "Una Mexico Fit Call es donde empieza todo acompañamiento de Llegada Guiada — trae tu situación y sal sabiendo exactamente cómo se vería el apoyo.",
    closingCtaPrimary: "Hablar Sobre Llegada Guiada",
    closingCtaSecondary: "Ver El Roadmap",
  },
};

export default function GuidedLandingPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PRICING_VIEWED, { source: "guided_landing_page" });
  }, []);

  const trackDiscuss = (source) => () =>
    trackEvent(ANALYTICS_EVENTS.SERVICE_TIER_CTA_CLICKED, { tier: "Guided Landing", source });

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/guided-landing" />

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

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[#d8a15f]">{t.heroPricing}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">{t.heroPricingNote}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/mexico-fit-call"
              onClick={trackDiscuss("guided_landing_hero")}
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
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.scopeLabel}</p>
          <h2 className="mb-8 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.scopeTitle}
          </h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-700 md:text-xl">{t.scopeText}</p>
          <div className="grid gap-4 text-zinc-700 sm:grid-cols-2 lg:grid-cols-3">
            {t.scopeItems.map((item, index) => (
              <div key={index} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#efe7d8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.howLabel}</p>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.howTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {t.howSteps.map(([label, text], index) => (
              <div key={index} className="border border-zinc-200 bg-[#f6f1e8] p-6">
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
              onClick={trackDiscuss("guided_landing_closing")}
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.closingCtaPrimary}
            </Link>
            <Link
              to="/relocation-roadmap"
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
