import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// P0-1 follow-up — discloses what Blueprint lead capture actually collects
// and that Formspree processes form submissions. Every statement below is
// verifiable from this codebase: the listed Blueprint fields match
// LeadCaptureCard.js's submission exactly; Formspree is the only form
// processor in the project; guidance emails are consent-based (the capture
// step's required checkbox) with opt-out by contacting PTM (no automated
// email system exists, so no unsubscribe-link mechanism is promised); and
// "no analytics or tracking tools" remains true (utils/analytics.js is a
// production no-op). No retention periods or legal-framework claims are
// made because none are established anywhere in the project.
//
// PTM Spanish-parity pass (extended here): bilingual content object + local
// toggle, the same established pattern as MexicoFitCallPage.js — the ES
// Blueprint consent checkbox links to this page, so it must read in Spanish.
const content = {
  en: {
    seoTitle: "Privacy Policy",
    seoDescription: "Path To Mexico's privacy policy — how your information is collected, used, and protected.",
    toggle: "ES",
    backLink: "← Back To Path To Mexico",
    title: "Privacy Policy",
    updated: "Last updated: August 5, 2026",
    paragraphs: [
      "Path To Mexico respects your privacy. Information submitted through this website may be used to respond to inquiries, provide relocation guidance, share requested resources, and improve our services.",
      "We may collect your name, email address, phone number, current location, relocation timeline, and details you choose to share through forms or direct communication.",
      "If you choose to save your My Mexico Blueprint, we also receive your first name, email address, your questionnaire answers, your calculated results (such as suggested destinations and your readiness score), your language preference, the time you submitted, and a random submission identifier that lets us connect your saved Blueprint to any follow-up conversation. Until you choose to save it, your Blueprint answers stay in your own browser and are not sent to us.",
      "We use this information to save and provide your personalized Blueprint and — only with your consent — to email you relevant relocation guidance. We only send guidance emails if you have asked for them, for example by checking the consent box when saving your Blueprint. You can tell us to stop at any time, or ask us to remove the details you have shared, by contacting Path To Mexico directly.",
      "Form submissions on this website — including saved Blueprints, contact requests, and guide downloads — are delivered and stored through Formspree, an independent form-processing service that handles them on our behalf under its own privacy policy.",
      "We do not sell personal information. Information may be shared only when necessary with trusted independent professionals if you request introductions or support.",
      "This website does not currently use analytics or tracking tools. If that changes in the future, this policy will be updated to reflect it.",
      "By using this website, you agree to this privacy policy. For questions, contact Path To Mexico directly.",
    ],
  },
  es: {
    seoTitle: "Política De Privacidad",
    seoDescription: "La política de privacidad de Path To Mexico — cómo se recopila, usa y protege tu información.",
    toggle: "EN",
    backLink: "← Volver A Path To Mexico",
    title: "Política De Privacidad",
    updated: "Última actualización: 5 de agosto de 2026",
    paragraphs: [
      "Path To Mexico respeta tu privacidad. La información enviada a través de este sitio web puede usarse para responder consultas, ofrecer orientación de reubicación, compartir recursos solicitados y mejorar nuestros servicios.",
      "Podemos recopilar tu nombre, correo electrónico, número de teléfono, ubicación actual, cronograma de reubicación y los detalles que decidas compartir a través de formularios o comunicación directa.",
      "Si decides guardar tu My Mexico Blueprint, también recibimos tu nombre, tu correo electrónico, tus respuestas al cuestionario, tus resultados calculados (como destinos sugeridos y tu puntaje de preparación), tu preferencia de idioma, la hora de envío y un identificador de envío aleatorio que nos permite conectar tu Blueprint guardado con cualquier conversación posterior. Hasta que decidas guardarlo, tus respuestas del Blueprint permanecen en tu propio navegador y no se nos envían.",
      "Usamos esta información para guardar y entregarte tu Blueprint personalizado y — solo con tu consentimiento — para enviarte por correo orientación relevante de reubicación. Solo enviamos correos de orientación si los has pedido, por ejemplo al marcar la casilla de consentimiento al guardar tu Blueprint. Puedes pedirnos que dejemos de enviarlos en cualquier momento, o solicitar que eliminemos los datos que compartiste, contactando directamente a Path To Mexico.",
      "Los envíos de formularios en este sitio web — incluidos los Blueprints guardados, las solicitudes de contacto y las descargas de guías — se entregan y almacenan a través de Formspree, un servicio independiente de procesamiento de formularios que los gestiona en nuestro nombre bajo su propia política de privacidad.",
      "No vendemos información personal. La información puede compartirse únicamente cuando sea necesario con profesionales independientes de confianza si solicitas presentaciones o apoyo.",
      "Este sitio web no utiliza actualmente herramientas de analítica ni de rastreo. Si eso cambia en el futuro, esta política se actualizará para reflejarlo.",
      "Al usar este sitio web, aceptas esta política de privacidad. Para preguntas, contacta directamente a Path To Mexico.",
    ],
  },
};

function PrivacyPolicyPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-6 py-24 text-zinc-950 md:px-20">
      <SEO title={t.seoTitle} description={t.seoDescription} path="/privacy-policy" />
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            {t.backLink}
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.toggle}
          </button>
        </div>

        <h1 className="mt-12 text-5xl font-light tracking-[-0.05em] md:text-7xl">
          {t.title}
        </h1>

        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
          {t.updated}
        </p>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-600">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
