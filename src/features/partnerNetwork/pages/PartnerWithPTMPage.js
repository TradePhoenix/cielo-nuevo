import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import CitySection from "../../yourMexico/components/CitySection";
import CinematicReveal from "../../../components/CinematicReveal";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../../utils/language";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";
import { PUBLIC_CATEGORIES } from "../data/constants";

// Public "Partner With PTM" page. Deliberately says nothing about commission
// percentages or commercial terms — those are private, agreed one-on-one.
const content = {
  en: {
    seoTitle: "Partner With PTM",
    seoDescription:
      "Path To Mexico works with carefully selected professionals who help our clients relocate, invest, settle, and build a life in Mexico. Apply to become a PTM partner.",
    eyebrow: "PTM Partner Network",
    title: "Partner With Path To Mexico",
    intro:
      "Path To Mexico works with carefully selected professionals and businesses that help our clients relocate, invest, settle, and build a life in Mexico. We make warm, personal introductions — never lists, never lead-dumps — so every referral arrives ready to be served well.",
    categoriesEyebrow: "Who We Work With",
    categoriesTitle: "The professionals behind every good move",
    howEyebrow: "How It Works",
    howTitle: "A relationship, not a directory listing",
    howSteps: [
      {
        title: "Apply",
        text: "Tell us about your business, your services, and the areas you serve. It takes about ten minutes.",
      },
      {
        title: "Conversation & review",
        text: "We review every application personally and speak with every partner before anything moves forward. Credentials matter to us — our clients trust us with the biggest move of their lives.",
      },
      {
        title: "Partner agreement",
        text: "Approved partners receive our Referral & Strategic Partner Agreement, with terms agreed privately between us.",
      },
      {
        title: "Referrals begin",
        text: "When a client's needs match what you do best, we introduce you personally — and stay involved so the experience stays at PTM's standard.",
      },
    ],
    standardsEyebrow: "Our Standard",
    standardsTitle: "The test every partner passes",
    standardsText:
      "Before we refer a single client, we ask one question about every professional we work with: would we trust this person with our own family? If the answer isn't an immediate yes, we keep looking. That's the network our clients rely on — and the company you'd be keeping.",
    ctaEyebrow: "Ready To Talk?",
    ctaTitle: "Apply to become a PTM Partner",
    ctaText:
      "If you serve people building a life in Mexico and hold yourself to a high standard, we'd like to meet you.",
    ctaButton: "Apply To Become A PTM Partner",
    ctaAside: "Questions first?",
    ctaAsideLink: "See how Path To Mexico works with clients",
  },
  es: {
    seoTitle: "Asóciate Con PTM",
    seoDescription:
      "Path To Mexico trabaja con profesionales cuidadosamente seleccionados que ayudan a nuestros clientes a mudarse, invertir y construir una vida en México. Postúlate para ser socio de PTM.",
    eyebrow: "Red de Socios PTM",
    title: "Asóciate Con Path To Mexico",
    intro:
      "Path To Mexico trabaja con profesionales y negocios cuidadosamente seleccionados que ayudan a nuestros clientes a mudarse, invertir, establecerse y construir una vida en México. Hacemos presentaciones personales y cálidas — nunca listas ni ventas de contactos — para que cada referido llegue listo para ser bien atendido.",
    categoriesEyebrow: "Con Quién Trabajamos",
    categoriesTitle: "Los profesionales detrás de cada buena mudanza",
    howEyebrow: "Cómo Funciona",
    howTitle: "Una relación, no un directorio",
    howSteps: [
      {
        title: "Postúlate",
        text: "Cuéntanos sobre tu negocio, tus servicios y las zonas que atiendes. Toma unos diez minutos.",
      },
      {
        title: "Conversación y revisión",
        text: "Revisamos cada solicitud personalmente y hablamos con cada socio antes de avanzar. Las credenciales nos importan — nuestros clientes nos confían la mudanza más importante de su vida.",
      },
      {
        title: "Acuerdo de socios",
        text: "Los socios aprobados reciben nuestro Acuerdo de Socio Estratégico y de Referidos, con términos acordados en privado entre nosotros.",
      },
      {
        title: "Comienzan los referidos",
        text: "Cuando las necesidades de un cliente coinciden con lo que mejor haces, te presentamos personalmente — y seguimos involucrados para que la experiencia mantenga el estándar de PTM.",
      },
    ],
    standardsEyebrow: "Nuestro Estándar",
    standardsTitle: "La prueba que pasa cada socio",
    standardsText:
      "Antes de referir a un solo cliente, nos hacemos una pregunta sobre cada profesional con quien trabajamos: ¿le confiaríamos a nuestra propia familia? Si la respuesta no es un sí inmediato, seguimos buscando. Esa es la red en la que confían nuestros clientes — y la compañía de la que formarías parte.",
    ctaEyebrow: "¿Listo Para Hablar?",
    ctaTitle: "Postúlate para ser Socio de PTM",
    ctaText:
      "Si atiendes a personas construyendo una vida en México y te exiges un estándar alto, queremos conocerte.",
    ctaButton: "Postularme Como Socio PTM",
    ctaAside: "¿Primero tienes preguntas?",
    ctaAsideLink: "Mira cómo Path To Mexico trabaja con clientes",
  },
};

const CATEGORY_COPY_ES = {
  "Real Estate": ["Bienes Raíces", "Agentes, brokers y desarrolladores que conocen su mercado a fondo."],
  "Legal & Immigration": ["Legal y Migración", "Abogados y facilitadores que guían residencia, contratos y cierres."],
  Accounting: ["Contabilidad", "Asesoría fiscal transfronteriza y apoyo con RFC, facturación y cumplimiento."],
  Healthcare: ["Salud", "Médicos, dentistas y clínicas de confianza para el bienestar de nuestros clientes."],
  "Property Management": ["Administración de Propiedades", "Cuidadores de hogares, rentas y tranquilidad."],
  "Transportation & Vehicles": ["Transporte y Vehículos", "Importación y compra de vehículos, y llegar bien al camino."],
  "Home Services": ["Servicios del Hogar", "Constructores, remodeladores y los oficios que convierten una casa en hogar."],
  Insurance: ["Seguros", "Cobertura de salud, hogar y auto que realmente funciona en México."],
  Hospitality: ["Hospitalidad", "Hoteles y estancias para viajes de exploración y aterrizajes suaves."],
  "Weddings & Events": ["Bodas y Eventos", "Planificadores y venues para los momentos más grandes de la vida."],
  "Lifestyle & Wellness": ["Estilo de Vida y Bienestar", "Fitness, spas, educación y calidad de vida diaria."],
  "Strategic Partnerships": ["Alianzas Estratégicas", "Negocios alineados creciendo junto a Path To Mexico."],
};

export default function PartnerWithPTMPage() {
  const [lang, setLang] = useState(getStoredLanguage);
  useHtmlLang(lang);
  const t = content[lang] || content.en;

  const toggleLang = () => {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
    setStoredLanguage(next);
  };

  return (
    <YourMexicoShell background="cream" backTo="/" backLabel={lang === "es" ? "Volver Al Inicio" : "Back To Home"}>
      <SEO title={t.seoTitle} description={t.seoDescription} path="/partner-with-ptm" />

      <CinematicReveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow}</p>
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {lang === "en" ? "Español" : "English"}
          </button>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-6xl">
          {t.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600">{t.intro}</p>
      </CinematicReveal>

      <CitySection eyebrow={t.categoriesEyebrow} title={t.categoriesTitle}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLIC_CATEGORIES.map((cat) => {
            const es = CATEGORY_COPY_ES[cat.label];
            const label = lang === "es" && es ? es[0] : cat.label;
            const detail = lang === "es" && es ? es[1] : cat.detail;
            return (
              <div key={cat.label} className="border border-zinc-200 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em]">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{detail}</p>
              </div>
            );
          })}
        </div>
      </CitySection>

      <CitySection eyebrow={t.howEyebrow} title={t.howTitle}>
        <ol className="grid gap-4 sm:grid-cols-2">
          {t.howSteps.map((step, i) => (
            <li key={step.title} className="border border-zinc-200 bg-white p-6">
              <p className="font-serif text-3xl font-light text-zinc-300">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-base font-medium">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </CitySection>

      <CitySection eyebrow={t.standardsEyebrow} title={t.standardsTitle}>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">{t.standardsText}</p>
      </CitySection>

      <CinematicReveal>
        <div className="mt-16 border border-zinc-200 bg-white p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.ctaEyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-lg text-2xl font-light leading-snug tracking-[-0.02em] sm:text-3xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-600">{t.ctaText}</p>
          <Link
            to="/partner-with-ptm/apply"
            onClick={() => trackEvent(ANALYTICS_EVENTS.PARTNER_APPLY_CTA_CLICKED, { source: "partner_page" })}
            className="group mt-8 inline-flex items-center gap-2 whitespace-nowrap bg-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 sm:px-9 sm:tracking-[0.22em]"
          >
            {t.ctaButton}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <p className="mt-5 text-xs text-zinc-500">
            {t.ctaAside}{" "}
            <Link
              to="/work-with-path-to-mexico"
              className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              {t.ctaAsideLink}
            </Link>
          </p>
        </div>
      </CinematicReveal>
    </YourMexicoShell>
  );
}
