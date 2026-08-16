import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "@formspree/react";
import SEO from "../../../components/SEO";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../../utils/language";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";
import { PARTNER_CATEGORIES } from "../data/constants";

// Partner application — four quiet steps instead of one massive form, per the
// progressive-disclosure requirement. Submits through the same verified
// Formspree form ("xdabqdyq") every live PTM form uses, tagged with
// source: "partner-application" (the documented convention — see
// HandoffForm.js). Draft answers persist to localStorage so a professional
// interrupted mid-application never loses their work.
const DRAFT_KEY = "pathToMexico.partnerApplication.v1";
const DRAFT_VERSION = 1;

const EMPTY_FIELDS = {
  legalName: "",
  tradingName: "",
  contactPerson: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "Mexico",
  rfcTaxId: "",
  category: "",
  categoryOther: "",
  servicesDescription: "",
  areasServed: "",
  languages: "",
  yearsInBusiness: "",
  licenseNumber: "",
  realEstateRegistration: "",
  otherCredentials: "",
  credentialExpiration: "",
};

const content = {
  en: {
    seoTitle: "Apply To Become A PTM Partner",
    seoDescription:
      "Apply to join the Path To Mexico Partner Network — carefully selected professionals serving people relocating to Mexico.",
    eyebrow: "PTM Partner Network",
    title: "Partner Application",
    intro:
      "Four short steps, about ten minutes. We review every application personally and reply to each one.",
    steps: ["Your Business", "Your Services", "Credentials", "Review & Submit"],
    back: "Back",
    next: "Continue",
    optional: "Optional",
    business: {
      legalName: "Legal business name",
      tradingName: "Business / trading name (if different)",
      contactPerson: "Contact person",
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp (if different)",
      website: "Website",
      address: "Street address",
      city: "City",
      state: "State",
      country: "Country",
      rfcTaxId: "RFC / tax ID (where applicable)",
    },
    services: {
      category: "Which best describes your business?",
      categoryOther: "Tell us what you do",
      servicesDescription: "Describe your services",
      servicesPlaceholder: "What do you do, and what do you do best?",
      areasServed: "Geographic areas served",
      areasPlaceholder: "e.g. Mérida, Progreso, the Yucatán coast",
      languages: "Languages",
      languagesPlaceholder: "e.g. Spanish, English",
      yearsInBusiness: "Years in business",
    },
    credentials: {
      intro:
        "Where your profession is licensed or regulated, credential details help us review your application faster. Everything here stays private.",
      licenseNumber: "Professional license number",
      realEstateRegistration: "Real estate registration / accreditation (e.g. AMPI, state registry)",
      otherCredentials: "Other professional credentials",
      credentialExpiration: "Credential expiration date",
      documentsNote:
        "No need to upload documents now — if your application moves forward, we'll ask for copies of relevant credentials during the review conversation.",
    },
    review: {
      intro: "A quick look before you send it.",
      editHint: "Use Back to change anything.",
      consent:
        "I agree that Path To Mexico may contact me about this application and store the information I've provided for that purpose.",
      submit: "Submit Application",
      submitting: "Sending…",
      notProvided: "Not provided",
    },
    success: {
      eyebrow: "Application Received",
      title: "Thank you — we'll be in touch personally.",
      text:
        "Every application is reviewed by a person, not a system. If your services fit what our clients need, we'll reach out to set up a conversation.",
      backHome: "Back To Partner With PTM",
    },
    errors: {
      required: "Please fill in the highlighted fields to continue.",
    },
  },
  es: {
    seoTitle: "Postúlate Como Socio PTM",
    seoDescription:
      "Postúlate para unirte a la Red de Socios de Path To Mexico — profesionales cuidadosamente seleccionados que atienden a personas mudándose a México.",
    eyebrow: "Red de Socios PTM",
    title: "Solicitud de Socio",
    intro:
      "Cuatro pasos cortos, unos diez minutos. Revisamos cada solicitud personalmente y respondemos a todas.",
    steps: ["Tu Negocio", "Tus Servicios", "Credenciales", "Revisar y Enviar"],
    back: "Atrás",
    next: "Continuar",
    optional: "Opcional",
    business: {
      legalName: "Razón social",
      tradingName: "Nombre comercial (si es diferente)",
      contactPerson: "Persona de contacto",
      email: "Correo electrónico",
      phone: "Teléfono",
      whatsapp: "WhatsApp (si es diferente)",
      website: "Sitio web",
      address: "Dirección",
      city: "Ciudad",
      state: "Estado",
      country: "País",
      rfcTaxId: "RFC / identificación fiscal (si aplica)",
    },
    services: {
      category: "¿Qué describe mejor tu negocio?",
      categoryOther: "Cuéntanos a qué te dedicas",
      servicesDescription: "Describe tus servicios",
      servicesPlaceholder: "¿Qué haces, y qué haces mejor?",
      areasServed: "Zonas geográficas que atiendes",
      areasPlaceholder: "p. ej. Mérida, Progreso, la costa de Yucatán",
      languages: "Idiomas",
      languagesPlaceholder: "p. ej. español, inglés",
      yearsInBusiness: "Años en el negocio",
    },
    credentials: {
      intro:
        "Si tu profesión requiere licencia o está regulada, los datos de tus credenciales nos ayudan a revisar tu solicitud más rápido. Todo aquí es privado.",
      licenseNumber: "Número de licencia profesional",
      realEstateRegistration: "Registro / acreditación inmobiliaria (p. ej. AMPI, registro estatal)",
      otherCredentials: "Otras credenciales profesionales",
      credentialExpiration: "Fecha de vencimiento de la credencial",
      documentsNote:
        "No necesitas subir documentos ahora — si tu solicitud avanza, te pediremos copias de las credenciales relevantes durante la conversación de revisión.",
    },
    review: {
      intro: "Un vistazo rápido antes de enviar.",
      editHint: "Usa Atrás para cambiar cualquier dato.",
      consent:
        "Acepto que Path To Mexico me contacte sobre esta solicitud y guarde la información proporcionada para ese fin.",
      submit: "Enviar Solicitud",
      submitting: "Enviando…",
      notProvided: "No proporcionado",
    },
    success: {
      eyebrow: "Solicitud Recibida",
      title: "Gracias — te contactaremos personalmente.",
      text:
        "Cada solicitud la revisa una persona, no un sistema. Si tus servicios encajan con lo que nuestros clientes necesitan, te escribiremos para agendar una conversación.",
      backHome: "Volver a Asóciate Con PTM",
    },
    errors: {
      required: "Completa los campos marcados para continuar.",
    },
  },
};

const CATEGORY_LABELS_ES = {
  "real-estate": "Bienes Raíces",
  "property-management": "Administración de Propiedades",
  legal: "Legal",
  immigration: "Migración",
  accounting: "Contabilidad",
  healthcare: "Salud",
  "vehicle-transportation": "Vehículos / Transporte",
  insurance: "Seguros",
  construction: "Construcción",
  hospitality: "Hospitalidad",
  "wedding-events": "Bodas / Eventos",
  "lifestyle-wellness": "Estilo de Vida / Bienestar",
  strategic: "Socio Estratégico",
  other: "Otro",
};

const REQUIRED_BY_STEP = {
  0: ["legalName", "contactPerson", "email", "phone", "city", "country"],
  1: ["category", "servicesDescription", "areasServed", "languages"],
  2: [],
};

function loadDraft() {
  if (typeof window === "undefined") return EMPTY_FIELDS;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DRAFT_KEY));
    if (!parsed || parsed.version !== DRAFT_VERSION) return EMPTY_FIELDS;
    return { ...EMPTY_FIELDS, ...parsed.fields };
  } catch (error) {
    return EMPTY_FIELDS;
  }
}

const inputClass =
  "w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus-visible:ring-2 focus-visible:ring-[#d8a15f]";
const invalidClass = "border-[#b3543f]";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500";

function Field({ label, optionalLabel, required, invalid, children }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {!required && optionalLabel ? (
          <span className="ml-2 font-normal normal-case tracking-normal text-zinc-400">{optionalLabel}</span>
        ) : null}
      </span>
      <div className={`mt-2 ${invalid ? "[&>*]:border-[#b3543f]" : ""}`}>{children}</div>
    </label>
  );
}

export default function PartnerApplyPage() {
  const [lang, setLang] = useState(getStoredLanguage);
  useHtmlLang(lang);
  const t = content[lang] || content.en;

  const [fields, setFields] = useState(loadDraft);
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formState, handleSubmit] = useForm("xdabqdyq");
  const headingRef = useRef(null);

  // Persist the draft on every change; clear it once the submission succeeds.
  useEffect(() => {
    try {
      if (formState.succeeded) {
        window.localStorage.removeItem(DRAFT_KEY);
      } else {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: DRAFT_VERSION, fields }));
      }
    } catch (error) {
      // Draft persistence is a convenience only.
    }
  }, [fields, formState.succeeded]);

  useEffect(() => {
    if (formState.succeeded) {
      trackEvent(ANALYTICS_EVENTS.PARTNER_APPLICATION_SUBMITTED, {
        category: fields.category || null,
        language: lang,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.succeeded]);

  // Same route-entry focus pattern as the Blueprint results / Dashboard.
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const set = (name) => (e) => setFields((prev) => ({ ...prev, [name]: e.target.value }));

  const missing = useMemo(() => {
    const required = [...(REQUIRED_BY_STEP[step] || [])];
    if (step === 1 && fields.category === "other") required.push("categoryOther");
    return required.filter((name) => !String(fields[name] || "").trim());
  }, [step, fields]);

  const goNext = () => {
    if (missing.length > 0) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const categoryLabel = (id) => {
    if (!id) return t.review.notProvided;
    const en = PARTNER_CATEGORIES.find((c) => c.id === id)?.label || id;
    return lang === "es" ? CATEGORY_LABELS_ES[id] || en : en;
  };

  const toggleLang = () => {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
    setStoredLanguage(next);
  };

  const shellProps = {
    background: "cream",
    backTo: "/partner-with-ptm",
    backLabel: lang === "es" ? "Volver a Asóciate Con PTM" : "Back To Partner With PTM",
  };

  if (formState.succeeded) {
    return (
      <YourMexicoShell {...shellProps}>
        <SEO title={t.seoTitle} description={t.seoDescription} path="/partner-with-ptm/apply" />
        <div className="mx-auto max-w-xl py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.success.eyebrow}</p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 text-3xl font-light leading-tight tracking-[-0.02em] outline-none sm:text-4xl"
          >
            {t.success.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600">{t.success.text}</p>
          <Link
            to="/partner-with-ptm"
            className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">←</span> {t.success.backHome}
          </Link>
        </div>
      </YourMexicoShell>
    );
  }

  const reviewRows = [
    [t.business.legalName, fields.legalName],
    [t.business.tradingName, fields.tradingName],
    [t.business.contactPerson, fields.contactPerson],
    [t.business.email, fields.email],
    [t.business.phone, fields.phone],
    [t.business.whatsapp, fields.whatsapp],
    [t.business.website, fields.website],
    [t.business.address, fields.address],
    [t.business.city, fields.city],
    [t.business.state, fields.state],
    [t.business.country, fields.country],
    [t.business.rfcTaxId, fields.rfcTaxId],
    [t.services.category, categoryLabel(fields.category)],
    ...(fields.category === "other" ? [[t.services.categoryOther, fields.categoryOther]] : []),
    [t.services.servicesDescription, fields.servicesDescription],
    [t.services.areasServed, fields.areasServed],
    [t.services.languages, fields.languages],
    [t.services.yearsInBusiness, fields.yearsInBusiness],
    [t.credentials.licenseNumber, fields.licenseNumber],
    [t.credentials.realEstateRegistration, fields.realEstateRegistration],
    [t.credentials.otherCredentials, fields.otherCredentials],
    [t.credentials.credentialExpiration, fields.credentialExpiration],
  ];

  return (
    <YourMexicoShell {...shellProps}>
      <SEO title={t.seoTitle} description={t.seoDescription} path="/partner-with-ptm/apply" />

      <div className="mx-auto max-w-2xl">
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
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-3xl font-light leading-tight tracking-[-0.02em] outline-none sm:text-5xl"
        >
          {t.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">{t.intro}</p>

        {/* Step indicator */}
        <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-2" aria-label={t.title}>
          {t.steps.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={`text-xs uppercase tracking-[0.16em] ${
                i === step ? "font-semibold text-zinc-950" : i < step ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              {String(i + 1).padStart(2, "0")} {label}
            </li>
          ))}
        </ol>

        <div className="mt-8 border border-zinc-200 bg-white p-6 sm:p-10">
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label={t.business.legalName} required invalid={showErrors && missing.includes("legalName")}>
                  <input className={inputClass} value={fields.legalName} onChange={set("legalName")} autoComplete="organization" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t.business.tradingName} optionalLabel={t.optional}>
                  <input className={inputClass} value={fields.tradingName} onChange={set("tradingName")} />
                </Field>
              </div>
              <Field label={t.business.contactPerson} required invalid={showErrors && missing.includes("contactPerson")}>
                <input className={inputClass} value={fields.contactPerson} onChange={set("contactPerson")} autoComplete="name" />
              </Field>
              <Field label={t.business.email} required invalid={showErrors && missing.includes("email")}>
                <input type="email" className={inputClass} value={fields.email} onChange={set("email")} autoComplete="email" />
              </Field>
              <Field label={t.business.phone} required invalid={showErrors && missing.includes("phone")}>
                <input className={inputClass} value={fields.phone} onChange={set("phone")} autoComplete="tel" />
              </Field>
              <Field label={t.business.whatsapp} optionalLabel={t.optional}>
                <input className={inputClass} value={fields.whatsapp} onChange={set("whatsapp")} />
              </Field>
              <div className="sm:col-span-2">
                <Field label={t.business.website} optionalLabel={t.optional}>
                  <input className={inputClass} value={fields.website} onChange={set("website")} autoComplete="url" inputMode="url" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t.business.address} optionalLabel={t.optional}>
                  <input className={inputClass} value={fields.address} onChange={set("address")} autoComplete="street-address" />
                </Field>
              </div>
              <Field label={t.business.city} required invalid={showErrors && missing.includes("city")}>
                <input className={inputClass} value={fields.city} onChange={set("city")} />
              </Field>
              <Field label={t.business.state} optionalLabel={t.optional}>
                <input className={inputClass} value={fields.state} onChange={set("state")} />
              </Field>
              <Field label={t.business.country} required invalid={showErrors && missing.includes("country")}>
                <input className={inputClass} value={fields.country} onChange={set("country")} />
              </Field>
              <Field label={t.business.rfcTaxId} optionalLabel={t.optional}>
                <input className={inputClass} value={fields.rfcTaxId} onChange={set("rfcTaxId")} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5">
              <Field label={t.services.category} required invalid={showErrors && missing.includes("category")}>
                <select
                  className={`${inputClass} ${showErrors && missing.includes("category") ? invalidClass : ""}`}
                  value={fields.category}
                  onChange={set("category")}
                >
                  <option value="">—</option>
                  {PARTNER_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === "es" ? CATEGORY_LABELS_ES[c.id] || c.label : c.label}
                    </option>
                  ))}
                </select>
              </Field>
              {fields.category === "other" && (
                <Field label={t.services.categoryOther} required invalid={showErrors && missing.includes("categoryOther")}>
                  <input className={inputClass} value={fields.categoryOther} onChange={set("categoryOther")} />
                </Field>
              )}
              <Field label={t.services.servicesDescription} required invalid={showErrors && missing.includes("servicesDescription")}>
                <textarea
                  rows={4}
                  className={inputClass}
                  placeholder={t.services.servicesPlaceholder}
                  value={fields.servicesDescription}
                  onChange={set("servicesDescription")}
                />
              </Field>
              <Field label={t.services.areasServed} required invalid={showErrors && missing.includes("areasServed")}>
                <input className={inputClass} placeholder={t.services.areasPlaceholder} value={fields.areasServed} onChange={set("areasServed")} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.services.languages} required invalid={showErrors && missing.includes("languages")}>
                  <input className={inputClass} placeholder={t.services.languagesPlaceholder} value={fields.languages} onChange={set("languages")} />
                </Field>
                <Field label={t.services.yearsInBusiness} optionalLabel={t.optional}>
                  <input className={inputClass} inputMode="numeric" value={fields.yearsInBusiness} onChange={set("yearsInBusiness")} />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5">
              <p className="text-sm leading-relaxed text-zinc-600">{t.credentials.intro}</p>
              <Field label={t.credentials.licenseNumber} optionalLabel={t.optional}>
                <input className={inputClass} value={fields.licenseNumber} onChange={set("licenseNumber")} />
              </Field>
              {(fields.category === "real-estate" || fields.category === "property-management") && (
                <Field label={t.credentials.realEstateRegistration} optionalLabel={t.optional}>
                  <input className={inputClass} value={fields.realEstateRegistration} onChange={set("realEstateRegistration")} />
                </Field>
              )}
              <Field label={t.credentials.otherCredentials} optionalLabel={t.optional}>
                <textarea rows={3} className={inputClass} value={fields.otherCredentials} onChange={set("otherCredentials")} />
              </Field>
              <Field label={t.credentials.credentialExpiration} optionalLabel={t.optional}>
                <input type="date" className={inputClass} value={fields.credentialExpiration} onChange={set("credentialExpiration")} />
              </Field>
              <p className="border-l-2 border-zinc-200 pl-4 text-xs leading-relaxed text-zinc-500">
                {t.credentials.documentsNote}
              </p>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <p className="text-sm leading-relaxed text-zinc-600">
                {t.review.intro} <span className="text-zinc-400">{t.review.editHint}</span>
              </p>

              {/* The full application travels as named fields so it reads
                  cleanly in the Formspree email. */}
              <input type="hidden" name="source" value="partner-application" />
              <input type="hidden" name="_subject" value={`PTM Partner Application — ${fields.legalName || fields.contactPerson}`} />
              <input type="hidden" name="language" value={lang} />
              {Object.entries(fields).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
              ))}
              <input type="hidden" name="email" value={fields.email} />

              <dl className="mt-6 divide-y divide-zinc-100 border-y border-zinc-200">
                {reviewRows.map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[240px_1fr] sm:gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</dt>
                    <dd className={`text-sm ${String(value || "").trim() ? "text-zinc-950" : "text-zinc-400"}`}>
                      {String(value || "").trim() || t.review.notProvided}
                    </dd>
                  </div>
                ))}
              </dl>

              <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                {t.review.consent}
              </label>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
                >
                  ← {t.back}
                </button>
                <button
                  type="submit"
                  disabled={formState.submitting || !consent}
                  className="group inline-flex items-center gap-2 bg-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {formState.submitting ? t.review.submitting : t.review.submit}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          )}

          {step < 3 && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
                >
                  ← {t.back}
                </button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-4">
                {showErrors && missing.length > 0 && (
                  <p role="alert" className="text-xs font-medium text-[#b3543f]">
                    {t.errors.required}
                  </p>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  className="group inline-flex items-center gap-2 bg-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
                >
                  {t.next}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </YourMexicoShell>
  );
}
