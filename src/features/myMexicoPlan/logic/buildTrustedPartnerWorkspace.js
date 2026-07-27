// My Mexico Plan — Trusted Partner & Connector Workspace engine. Same
// discipline as buildAdaptiveChecklist.js, buildReadinessAssessment.js,
// buildConciergeWorkspace.js, and buildRelocationTimeline.js: a pure
// function, fixed input, fixed output shape, no side effects.
//
// Truth constraints (ENG-021): this file never names a partner company,
// never invents an endorsement or certification, and never states legal,
// tax, or medical advice as fact. It also never implies Path To Mexico
// currently has a partner network — every category's `ownership` field
// is the same "self" / "pathToMexico" / "professional" taxonomy already
// established by taskBank.js and rendered by ConciergeWorkspace.js, and
// "pathToMexico" here means exactly what it means there: Path To Mexico
// can guide, coordinate, or make an introduction — not a guarantee of
// outcome, never a substitute for a licensed professional. The
// `partnerRecords` array on every category (see partnerCategories.js) is
// always empty today; it exists purely as the structural seam a future,
// real, verified partner list would populate without any UI redesign.
//
// Relevance is computed only from signals that already exist elsewhere
// in the codebase — scores.tagCounts (the same tag-overlap signal
// recommendationEngine.js and buildAdaptiveChecklist.js already use) and
// plan.cityId (the same city-specific gating taskBank.js already uses
// for tasks like riviera-car-reality). No new questionnaire field, no
// invented signal.
//
// This is the seam a future AI layer could enrich (e.g. a richer,
// model-generated `whyItMatters` per visitor, or real verified
// `partnerRecords`) without changing this file's output shape or the
// component that renders it.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en").

import { PARTNER_CATEGORIES } from "../data/partnerCategories";

function resolve(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

const OWNERSHIP_SECTIONS = [
  {
    id: "self",
    label: { en: "General Planning Guidance", es: "Orientación General De Planeación" },
    description: {
      en: "Research and decisions you handle yourself — Path To Mexico is not involved in these.",
      es: "Investigación y decisiones que manejas tú mismo — Path To Mexico no participa en estas.",
    },
  },
  {
    id: "pathToMexico",
    label: { en: "Path To Mexico Can Help Introduce", es: "Path To Mexico Puede Ayudar A Conectarte" },
    description: {
      en: "Path To Mexico can guide you, coordinate on your behalf, or make a trusted introduction here — not a guarantee of outcome, and never a substitute for a licensed professional where one is required.",
      es: "Path To Mexico puede guiarte, coordinar en tu nombre o hacer una presentación de confianza aquí — no es una garantía de resultado, y nunca un sustituto de un profesional certificado donde se requiera uno.",
    },
  },
  {
    id: "professional",
    label: { en: "Requires A Licensed Professional", es: "Requiere Un Profesional Certificado" },
    description: {
      en: "Legal, tax, medical, immigration, or real-estate matters that call for a qualified, licensed professional. Path To Mexico can help connect you with trusted options, but does not perform these services itself.",
      es: "Asuntos legales, fiscales, médicos, de inmigración o bienes raíces que requieren un profesional calificado y certificado. Path To Mexico puede ayudarte a conectar con opciones de confianza, pero no realiza estos servicios directamente.",
    },
  },
];

// Only categories marked "conditional" in partnerCategories.js are
// evaluated here; "universal" categories are relevant to every visitor
// relocating to Mexico by definition (residency status, housing,
// banking, and so on) and always included.
// DEST-001: the Yucatán Gulf coast towns (Progreso, Chicxulub Puerto,
// Telchac Puerto) are as spread-out and car-dependent as Riviera Maya —
// Mérida itself is deliberately excluded, since it's a real city with
// taxis and rideshare, not a driving-only town like its coastal
// neighbors.
//
// DEST-002: all four new destinations are car-dependent too, each for its
// own honest reason (see VEHICLE_TRANSPORTATION_REASONS below) — three
// smaller, more remote Gulf towns than any DEST-001 town, plus Santa
// Elena, an inland rural village with no rideshare/taxi infrastructure of
// its own. None of the four get Mérida's "real city" exception.
// DEST-003: of the 14 new destinations, Cancún (real city, rideshare
// available, same exception as Mérida), Puerto Morelos and Cozumel
// (walkable cores with real local infrastructure) and Valladolid (a real
// small city with growing infrastructure, same exception as Mérida) are
// deliberately excluded — everything else genuinely assumes driving, each
// for its own reason documented in VEHICLE_TRANSPORTATION_REASONS below.
const CAR_DEPENDENT_CITY_IDS = new Set([
  "riviera-maya",
  "progreso",
  "chicxulub-puerto",
  "telchac-puerto",
  "celestun",
  "sisal",
  "dzilam-de-bravo",
  "santa-elena",
  "bacalar",
  "mahahual",
  "akumal",
  "izamal",
  "tekax",
  "tizimin",
  "chelem",
  "chuburna-puerto",
  "el-cuyo",
  "rio-lagartos",
]);

const RELEVANCE_RULES = {
  insurance: ({ tagCounts }) => Boolean(tagCounts.comfortable || tagCounts.premium || tagCounts.retirement),
  "accounting-tax": ({ tagCounts }) => Boolean(tagCounts.retirement),
  "vehicle-transportation": ({ plan }) => CAR_DEPENDENT_CITY_IDS.has(plan.cityId),
};

const VEHICLE_TRANSPORTATION_REASONS = {
  "riviera-maya": {
    en: "Riviera Maya's day-to-day life mostly assumes you're driving.",
    es: "La vida diaria en Riviera Maya generalmente asume que conduces.",
  },
  progreso: {
    en: "Progreso is spread out enough that day-to-day life mostly assumes you're driving.",
    es: "Progreso está lo suficientemente disperso como para que la vida diaria generalmente asuma que conduces.",
  },
  "chicxulub-puerto": {
    en: "Chicxulub Puerto's small, spread-out layout mostly assumes you're driving.",
    es: "El trazado pequeño y disperso de Chicxulub Puerto generalmente asume que conduces.",
  },
  "telchac-puerto": {
    en: "Telchac Puerto's seclusion means day-to-day life mostly assumes you're driving.",
    es: "El aislamiento de Telchac Puerto significa que la vida diaria generalmente asume que conduces.",
  },
  celestun: {
    en: "Celestún's small scale and distance from Mérida mean day-to-day life mostly assumes you're driving.",
    es: "La escala pequeña de Celestún y su distancia de Mérida hacen que la vida diaria generalmente asuma que conduces.",
  },
  sisal: {
    en: "Sisal's connection to Mérida and everyday errands beyond the village mostly assume you're driving.",
    es: "La conexión de Sisal con Mérida y los mandados diarios fuera del pueblo generalmente asumen que conduces.",
  },
  "dzilam-de-bravo": {
    en: "Dzilam de Bravo's remoteness means day-to-day life mostly assumes you're driving.",
    es: "El aislamiento de Dzilam de Bravo hace que la vida diaria generalmente asuma que conduces.",
  },
  "santa-elena": {
    en: "Santa Elena is an inland rural village with no local rideshare or taxi infrastructure — day-to-day life mostly assumes you're driving.",
    es: "Santa Elena es un pueblo rural del interior sin infraestructura local de taxis o transporte compartido — la vida diaria generalmente asume que conduces.",
  },
  bacalar: {
    en: "Bacalar's lagoon-centered town means errands beyond the basics mostly assume you're driving.",
    es: "El pueblo de Bacalar, centrado en la laguna, hace que los mandados más allá de lo básico generalmente asuman que conduces.",
  },
  mahahual: {
    en: "Mahahual's remote Costa Maya location mostly assumes you're driving for anything beyond the village itself.",
    es: "La ubicación remota de Mahahual en Costa Maya generalmente asume que conduces para cualquier cosa fuera del propio pueblo.",
  },
  akumal: {
    en: "Akumal's small scale means errands beyond the immediate bay area mostly assume you're driving.",
    es: "La escala pequeña de Akumal hace que los mandados fuera del área inmediata de la bahía generalmente asuman que conduces.",
  },
  izamal: {
    en: "Izamal is a small Pueblo Mágico with no local rideshare or taxi infrastructure — day-to-day life mostly assumes you're driving.",
    es: "Izamal es un pequeño Pueblo Mágico sin infraestructura local de taxis o transporte compartido — la vida diaria generalmente asume que conduces.",
  },
  tekax: {
    en: "Tekax's working agricultural-town layout mostly assumes you're driving.",
    es: "El trazado de pueblo agrícola activo de Tekax generalmente asume que conduces.",
  },
  tizimin: {
    en: "Tizimín's role as a spread-out regional hub mostly assumes you're driving.",
    es: "El papel de Tizimín como centro regional disperso generalmente asume que conduces.",
  },
  chelem: {
    en: "Chelem's small, spread-out layout mostly assumes you're driving.",
    es: "El trazado pequeño y disperso de Chelem generalmente asume que conduces.",
  },
  "chuburna-puerto": {
    en: "Chuburná Puerto's remoteness from Progreso mostly assumes you're driving.",
    es: "El aislamiento de Chuburná Puerto respecto a Progreso generalmente asume que conduces.",
  },
  "el-cuyo": {
    en: "El Cuyo's remote northern-coast location mostly assumes you're driving.",
    es: "La ubicación remota de El Cuyo en la costa norte generalmente asume que conduces.",
  },
  "rio-lagartos": {
    en: "Río Lagartos's remoteness means day-to-day life mostly assumes you're driving.",
    es: "El aislamiento de Río Lagartos hace que la vida diaria generalmente asuma que conduces.",
  },
};

const RELEVANCE_REASONS = {
  insurance: {
    en: "Your budget and situation suggest private coverage is worth comparing.",
    es: "Tu presupuesto y situación sugieren que vale la pena comparar una cobertura privada.",
  },
  "accounting-tax": {
    en: "Retirement and pension income usually means this is worth confirming with a professional.",
    es: "El ingreso de jubilación o pensión generalmente significa que vale la pena confirmar esto con un profesional.",
  },
};

const UNIVERSAL_REASON = {
  en: "Common for nearly every relocation to Mexico, regardless of your specific answers.",
  es: "Común en casi toda reubicación a México, sin importar tus respuestas específicas.",
};

const FALLBACK_REASON = {
  en: "Relevant based on your own Blueprint answers.",
  es: "Relevante según tus propias respuestas del Blueprint.",
};

const DISCLAIMER = {
  en: "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate. This workspace is planning guidance, not a directory of vetted partners — Path To Mexico does not yet have a verified partner network in every category shown below.",
  es: "Path To Mexico ofrece orientación de reubicación, conocimiento local y conexiones de confianza. No somos un despacho legal, una agencia de inmigración, un asesor fiscal, un asesor financiero ni una correduría inmobiliaria. Los servicios legales, de inmigración, fiscales, financieros e inmobiliarios los brindan profesionales calificados e independientes cuando corresponde. Este espacio es orientación de planeación, no un directorio de socios verificados — Path To Mexico aún no cuenta con una red de socios verificada en todas las categorías mostradas abajo.",
};

function isRelevant(category, context) {
  if (category.relevance === "universal") return true;
  const rule = RELEVANCE_RULES[category.id];
  return rule ? rule(context) : false;
}

function relevanceReason(category, context, lang) {
  if (category.relevance === "universal") return resolve(UNIVERSAL_REASON, lang);
  if (category.id === "vehicle-transportation") {
    return resolve(VEHICLE_TRANSPORTATION_REASONS[context.plan.cityId], lang) || resolve(FALLBACK_REASON, lang);
  }
  return resolve(RELEVANCE_REASONS[category.id], lang) || resolve(FALLBACK_REASON, lang);
}

// plan: buildPlan.js's output (already filtered to this visitor/city).
// scores: decisionEngine's useBlueprintAnswers() scores — read only for
// tagCounts, the same signal already used elsewhere.
export function buildTrustedPartnerWorkspace({ plan, scores }, lang = "en") {
  const tagCounts = (scores && scores.tagCounts) || {};
  const context = { tagCounts, plan };

  const relevantCategories = PARTNER_CATEGORIES.filter((category) => isRelevant(category, context)).map(
    (category) => ({
      id: category.id,
      label: resolve(category.label, lang),
      whyItMatters: resolve(category.whyItMatters, lang),
      whenNeeded: resolve(category.whenNeeded, lang),
      ownership: category.ownership,
      guideLink: category.guideLink,
      relevance: category.relevance,
      partnerRecords: category.partnerRecords,
      relevanceReason: relevanceReason(category, context, lang),
      canIntroduce: category.ownership !== "self",
    })
  );

  const sections = OWNERSHIP_SECTIONS.map((section) => ({
    id: section.id,
    label: resolve(section.label, lang),
    description: resolve(section.description, lang),
    categories: relevantCategories.filter((category) => category.ownership === section.id),
  }));

  return {
    cityName: plan.cityName,
    disclaimer: resolve(DISCLAIMER, lang),
    totalCategoryCount: relevantCategories.length,
    sections,
  };
}
