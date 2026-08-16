import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import SEO from "../components/SEO";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// PTM Spanish-parity pass — bilingual content object, same local pattern
// as HomePage.js. Gates the guide download behind a first-name + email
// capture, same Formspree form as before — see original header comment
// (still true): no dedicated form ID exists yet, guide reveal is
// immediate on state.succeeded with no real email delivery today.
const content = {
  en: {
    seoTitle: "Free Relocation Guide",
    seoDescription: "10 things to know before moving to Playa del Carmen — a practical starter guide for people exploring life in Mexico.",
    toggle: "ES",
    heroEyebrow: "Free Relocation Guide",
    heroTitle: "10 things to know before moving to Playa del Carmen.",
    heroText: "A practical starter guide for people exploring life in Mexico. Learn what to consider before making big decisions around cost of living, renting, healthcare, residency, neighborhoods, and trusted local support.",
    heroCtaPrimary: "Get The Free Guide",
    heroCtaSecondary: "Book A Mexico Fit Call",
    insideLabel: "What’s Inside",
    insideTitle: "Avoid the common mistakes people make before relocating.",
    insideItems: ["Cost of living", "Renting before buying", "Healthcare realities", "Neighborhood differences", "Residency questions", "Banking and money", "Transportation", "Bringing pets", "Trusted local contacts", "The emotional side of relocation"],
    whoLabel: "Who It’s For",
    whoTitle: "Built for people who want clarity before they make the leap.",
    whoItems: ["You are considering moving to Mexico.", "You are researching Playa del Carmen or the Riviera Maya.", "You are a remote worker, entrepreneur, retiree, or investor.", "You want a slower, warmer, more flexible lifestyle.", "You are trying to understand costs before committing.", "You want fewer surprises and better first decisions."],
    whyLabel: "Why I Created It",
    whyTitle: "Most people ask the same questions before moving.",
    whyParagraphs: [
      "After moving to Mexico myself, I realized how much of the relocation process is learned through experience. Online research helps, but it can also create more confusion.",
      "This guide brings together the practical things people usually wish they had understood earlier — before renting, buying, applying for residency, choosing an area, or trusting the wrong people.",
    ],
    whySignature: "— Kalen Enns",
    whyRole: "Founder, Path To Mexico",
    getGuideLabel: "Get Your Free Guide",
    formTitle: "Enter your name and email to unlock the guide.",
    formText: "We'll never share your information. The guide is a strong first step — when you want personal guidance, a Mexico Fit Call goes further.",
    firstNamePlaceholder: "First Name",
    emailPlaceholder: "Email Address",
    submitting: "Sending...",
    submit: "Send Me The Guide",
    formError:
      "Something went wrong sending your request. Your details are still here — please try again.",
    successTitle: "Your guide is ready.",
    successText: "The button below opens it right away.",
    downloadCta: "Download Guide",
    nextLabel: "What's Next",
    nextText: "The guide is a strong first step. These are the two best places to go from here.",
    nextCtaPrimary: "Build My Mexico Blueprint",
    nextCtaSecondary: "Book A Mexico Fit Call",
  },
  es: {
    seoTitle: "Guía Gratis De Reubicación",
    seoDescription: "10 cosas que debes saber antes de mudarte a Playa del Carmen — una guía práctica para quienes exploran la vida en México.",
    toggle: "EN",
    heroEyebrow: "Guía Gratis De Reubicación",
    heroTitle: "10 cosas que debes saber antes de mudarte a Playa del Carmen.",
    heroText: "Una guía práctica para quienes exploran la vida en México. Aprende qué considerar antes de tomar grandes decisiones sobre costo de vida, rentas, salud, residencia, colonias y apoyo local de confianza.",
    heroCtaPrimary: "Obtener La Guía Gratis",
    heroCtaSecondary: "Reservar Una Mexico Fit Call",
    insideLabel: "Qué Incluye",
    insideTitle: "Evita los errores comunes que la gente comete antes de mudarse.",
    insideItems: ["Costo de vida", "Rentar antes de comprar", "Realidades de salud", "Diferencias entre colonias", "Preguntas de residencia", "Banca y dinero", "Transporte", "Llevar mascotas", "Contactos locales de confianza", "El lado emocional de la reubicación"],
    whoLabel: "Para Quién Es",
    whoTitle: "Hecha para personas que quieren claridad antes de dar el salto.",
    whoItems: ["Estás considerando mudarte a México.", "Estás investigando Playa del Carmen o la Riviera Maya.", "Eres trabajador remoto, emprendedor, jubilado o inversionista.", "Quieres un estilo de vida más lento, cálido y flexible.", "Estás tratando de entender los costos antes de comprometerte.", "Quieres menos sorpresas y mejores primeras decisiones."],
    whyLabel: "Por Qué La Creé",
    whyTitle: "La mayoría de las personas hace las mismas preguntas antes de mudarse.",
    whyParagraphs: [
      "Después de mudarme yo mismo a México, me di cuenta de cuánto del proceso de reubicación se aprende a través de la experiencia. La investigación en línea ayuda, pero también puede generar más confusión.",
      "Esta guía reúne las cosas prácticas que la gente normalmente desearía haber entendido antes — antes de rentar, comprar, solicitar residencia, elegir una zona o confiar en las personas equivocadas.",
    ],
    whySignature: "— Kalen Enns",
    whyRole: "Fundador, Path To Mexico",
    getGuideLabel: "Obtén Tu Guía Gratis",
    formTitle: "Ingresa tu nombre y correo para desbloquear la guía.",
    formText: "Nunca compartiremos tu información. La guía es un buen primer paso — cuando quieras orientación personal, una Mexico Fit Call va más allá.",
    firstNamePlaceholder: "Nombre",
    emailPlaceholder: "Correo Electrónico",
    submitting: "Enviando...",
    submit: "Enviarme La Guía",
    formError:
      "Algo salió mal al enviar tu solicitud. Tus datos siguen aquí — inténtalo de nuevo.",
    successTitle: "Tu guía está lista.",
    successText: "El botón de abajo la abre de inmediato.",
    downloadCta: "Descargar Guía",
    nextLabel: "Qué Sigue",
    nextText: "La guía es un buen primer paso. Estos son los dos mejores lugares a dónde ir desde aquí.",
    nextCtaPrimary: "Construir Mi Mexico Blueprint",
    nextCtaSecondary: "Reservar Una Mexico Fit Call",
  },
};

function GuideCaptureForm({ guideLink, t, lang }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  // Duplicate-click guard (same pattern as the Blueprint's LeadCaptureCard).
  const onSubmit = (event) => {
    if (state.submitting || state.succeeded) {
      event.preventDefault();
      return;
    }
    handleSubmit(event);
  };

  // Launch fix #1: a network/Formspree failure must never look successful or
  // vanish silently — inputs stay filled and this message invites a retry.
  const showError = !state.submitting && !state.succeeded && state.errors != null;

  if (state.succeeded) {
    return (
      <div>
        <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.successTitle}</h2>

        <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-white/65">{t.successText}</p>

        <a
          href={guideLink}
          className="mt-8 inline-block bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
        >
          {t.downloadCta}
        </a>

        <div className="mx-auto mt-14 max-w-xl border-t border-white/15 pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">{t.nextLabel}</p>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-white/70">{t.nextText}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/my-mexico-blueprint"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.nextCtaPrimary}
            </Link>
            <Link
              to="/mexico-fit-call"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.nextCtaSecondary}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.formTitle}</h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">{t.formText}</p>

      <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-md gap-4 text-left">
        <input type="hidden" name="_subject" value="Free Guide Request" />
        <input type="hidden" name="source" value="free-guide" />
        <input type="hidden" name="form_name" value="free_guide_lead" />
        <input type="hidden" name="page" value="/free-guide" />
        <input type="hidden" name="language" value={lang} />
        {/* Formspree honeypot: display:none keeps it out of the tab order and
            accessibility tree; bots that fill it are silently dropped. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div>
          <input
            type="text"
            name="firstName"
            placeholder={t.firstNamePlaceholder}
            required
            className="w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-white"
          />
          <ValidationError field="firstName" errors={state.errors} />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            required
            className="w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-white"
          />
          <ValidationError field="email" errors={state.errors} />
        </div>
        {showError && (
          <p role="alert" className="text-sm leading-relaxed text-[#E36F4F]">
            {t.formError}
          </p>
        )}
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] disabled:opacity-60"
        >
          {state.submitting ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  );
}

export default function FreeGuidePage() {
  const guideLink = "/downloads/10-things-to-know-before-moving-to-playa-del-carmen.html";
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/free-guide" />
      <section className="bg-[#0b0b0a] px-6 py-28 text-white md:px-20 md:py-36">
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

          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.heroEyebrow}</p>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-8xl">
            {t.heroTitle}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">{t.heroText}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#get-guide"
              className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.heroCtaPrimary}
            </a>

            <Link
              to="/mexico-fit-call"
              className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.insideLabel}</p>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.insideTitle}</h2>
          </div>

          <div className="grid gap-4 text-zinc-700 sm:grid-cols-2">
            {t.insideItems.map((item, index) => (
              <div key={index} className="border border-zinc-200 bg-white p-5 transition hover:bg-[#efe7d8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.whoLabel}</p>

          <h2 className="mb-12 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.whoTitle}
          </h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-3">
            {t.whoItems.map((item, index) => (
              <div key={index} className="bg-white p-7 text-lg text-zinc-700 transition hover:bg-[#f6f1e8]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

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

            <p className="pt-4 text-zinc-500">
              {t.whySignature}
              <br />
              {t.whyRole}
            </p>
          </div>
        </div>
      </section>

      <section id="get-guide" className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.getGuideLabel}</p>

          <GuideCaptureForm guideLink={guideLink} t={t} lang={lang} />
        </div>
      </section>
    </main>
  );
}
