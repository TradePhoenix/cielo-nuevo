// My Mexico Plan — Cost Planner engine. Same discipline as
// buildDecisionBrief.js and buildDashboardSummary.js: a pure function,
// fixed input, fixed output shape, no side effects, no AI, no live
// pricing lookups. Every category range is either copied directly from
// costOfLivingBaseline.js (itself sourced from real, already-published
// guides) or derived from that data using an assumption that is returned
// alongside the number, never hidden inside it.
//
// This is the seam a future AI layer could enrich (e.g. richer per-city
// commentary) without changing the underlying deterministic ranges or
// this file's output shape.
//
// PTM Spanish-parity pass: added the `lang` parameter (default "en") to
// buildCostPlanner(); every text field became `{ en, es }` or a
// language-branched template, resolved before returning.

import {
  OVERALL_BUDGET_RANGES,
  HOUSING_BY_UNIT,
  UTILITIES_RANGE,
  GROCERIES_BY_HOUSEHOLD,
  TAXI_RIDE_RANGE,
  ASSUMED_RIDES_PER_MONTH,
  DOCTOR_VISIT_RANGE,
  ASSUMED_MONTHLY_HEALTHCARE_BUFFER,
  LIFESTYLE_DISCRETIONARY_BY_TIER,
  GUIDE_LINKS,
  CITY_COST_DIRECTION,
} from "../data/costOfLivingBaseline";

const FAMILY_HOUSEHOLDS = ["familyKids", "extended"];

function resolve(field, lang) {
  if (!field) return "";
  return typeof field === "string" ? field : field[lang] || field.en || "";
}

const LABELS = {
  housing: { en: "Housing", es: "Vivienda" },
  utilities: { en: "Utilities", es: "Servicios" },
  groceries: { en: "Groceries", es: "Supermercado" },
  transportation: { en: "Transportation", es: "Transporte" },
  healthcare: { en: "Healthcare", es: "Salud" },
  lifestyle: { en: "Lifestyle / Discretionary", es: "Estilo De Vida / Discrecional" },
};

function pickHousingUnit(budgetTier, household) {
  const isFamily = FAMILY_HOUSEHOLDS.includes(household);
  if (budgetTier === "lean") return isFamily ? "oneBedroom" : "studio";
  if (budgetTier === "premium") return isFamily ? "luxury" : "twoBedroom";
  // "comfortable" and "unknown" both default to the same mid-range pick.
  return isFamily ? "twoBedroom" : "oneBedroom";
}

function buildHousing(budgetTier, household, lang) {
  const unitId = pickHousingUnit(budgetTier, household);
  const unit = HOUSING_BY_UNIT[unitId];
  const unitLabel = resolve(unit.label, lang);
  const note =
    lang === "es"
      ? `Basado en el rango publicado de ${unitLabel.toLowerCase()} para Playa del Carmen.`
      : `Based on the published ${unitLabel.toLowerCase()} range for Playa del Carmen.`;
  return { id: "housing", label: resolve(LABELS.housing, lang), range: { low: unit.low, high: unit.high }, note, guideLink: GUIDE_LINKS.rentingVsBuying };
}

function buildUtilities(lang) {
  return {
    id: "utilities",
    label: resolve(LABELS.utilities, lang),
    range: { ...UTILITIES_RANGE },
    note:
      lang === "es"
        ? "Electricidad, internet y gas combinados. El uso del aire acondicionado es el factor de mayor variación."
        : "Electricity, internet, and gas combined. Air-conditioning use is the single biggest swing factor.",
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

function buildGroceries(household, lang) {
  if (household === "solo") {
    return {
      id: "groceries",
      label: resolve(LABELS.groceries, lang),
      range: { ...GROCERIES_BY_HOUSEHOLD.solo },
      note: lang === "es" ? "Basado en el rango publicado de supermercado para una persona." : "Based on the published solo grocery range.",
      guideLink: GUIDE_LINKS.groceryCosts,
    };
  }
  if (household === "couple") {
    return {
      id: "groceries",
      label: resolve(LABELS.groceries, lang),
      range: { ...GROCERIES_BY_HOUSEHOLD.couple },
      note: lang === "es" ? "Basado en el rango publicado de supermercado para una pareja." : "Based on the published couple grocery range.",
      guideLink: GUIDE_LINKS.groceryCosts,
    };
  }
  // No published figure exists for a family/extended household's grocery
  // spending — an honest gap, not a guess.
  return {
    id: "groceries",
    label: resolve(LABELS.groceries, lang),
    range: null,
    note:
      lang === "es"
        ? "Requiere verificación personal — las cifras publicadas de supermercado solo cubren hogares de una persona y parejas."
        : "Needs personal verification — published grocery figures only cover solo and couple households.",
    guideLink: GUIDE_LINKS.groceryCosts,
  };
}

function buildTransportation(budgetTier, lang) {
  const rides = ASSUMED_RIDES_PER_MONTH[budgetTier] || ASSUMED_RIDES_PER_MONTH.comfortable;
  const note =
    lang === "es"
      ? `Asume alrededor de ${rides} viajes en taxi/colectivo al mes a la tarifa publicada por viaje. No incluye renta o posesión de auto.`
      : `Assumes about ${rides} taxi/colectivo rides a month at the published per-ride rate. Car rental or ownership isn't included.`;
  return {
    id: "transportation",
    label: resolve(LABELS.transportation, lang),
    range: { low: rides * TAXI_RIDE_RANGE.low, high: rides * TAXI_RIDE_RANGE.high },
    note,
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

function buildHealthcare(lang) {
  const note =
    lang === "es"
      ? `Asume solo cuidado rutinario ocasional (una consulta general cuesta ${DOCTOR_VISIT_RANGE.low}–${DOCTOR_VISIT_RANGE.high} MXN) — no tratamiento continuo con especialista, primas de seguro ni un procedimiento.`
      : `Assumes only occasional routine care (a general visit runs ${DOCTOR_VISIT_RANGE.low}–${DOCTOR_VISIT_RANGE.high} MXN) — not ongoing specialist treatment, insurance premiums, or a procedure.`;
  return { id: "healthcare", label: resolve(LABELS.healthcare, lang), range: { ...ASSUMED_MONTHLY_HEALTHCARE_BUFFER }, note, guideLink: GUIDE_LINKS.healthcare };
}

function buildLifestyle(budgetTier, lang) {
  const range = LIFESTYLE_DISCRETIONARY_BY_TIER[budgetTier] || LIFESTYLE_DISCRETIONARY_BY_TIER.unknown;
  return {
    id: "lifestyle",
    label: resolve(LABELS.lifestyle, lang),
    range: { ...range },
    note:
      lang === "es"
        ? "Comer fuera, entretenimiento y gastos diarios extra — la categoría más dentro de tu control."
        : "Dining out, entertainment, and daily extras — the category most within your control.",
    guideLink: GUIDE_LINKS.costOfLiving,
  };
}

export function buildCostPlanner({ answers, scores, city }, lang = "en") {
  const budgetTier = (scores && scores.budgetTier) || "unknown";
  const household = answers.household;
  const cityDirection = resolve(CITY_COST_DIRECTION[city.id], lang) || null;

  const categories = [
    buildHousing(budgetTier, household, lang),
    buildUtilities(lang),
    buildGroceries(household, lang),
    buildTransportation(budgetTier, lang),
    buildHealthcare(lang),
    buildLifestyle(budgetTier, lang),
  ];

  const totalRange = OVERALL_BUDGET_RANGES[budgetTier] || OVERALL_BUDGET_RANGES.unknown;

  const majorCostDrivers = [
    lang === "es" ? "La vivienda suele ser tu mayor gasto mensual individual." : "Housing is typically your single largest monthly expense.",
  ];
  if (budgetTier === "premium") {
    majorCostDrivers.push(
      lang === "es"
        ? "Comer fuera, beach clubs y gastos de estilo de vida crecen rápido en este nivel de presupuesto."
        : "Dining out, beach clubs, and lifestyle spending expand quickly at this budget level."
    );
  }
  if (cityDirection) {
    majorCostDrivers.push(cityDirection);
  }

  const assumptions = [
    lang === "es"
      ? "Todas las cifras provienen de las propias guías publicadas de Path To Mexico, no de un feed de precios en vivo."
      : "All figures are sourced from Path To Mexico's own published guides, not a live pricing feed.",
    lang === "es"
      ? `El transporte asume ${ASSUMED_RIDES_PER_MONTH[budgetTier] || ASSUMED_RIDES_PER_MONTH.comfortable} viajes en taxi/colectivo al mes, no posesión de auto.`
      : `Transportation assumes ${ASSUMED_RIDES_PER_MONTH[budgetTier] || ASSUMED_RIDES_PER_MONTH.comfortable} taxi/colectivo rides a month, not car ownership.`,
    lang === "es"
      ? "La salud asume solo cuidado rutinario ocasional, no tratamiento continuo ni primas de seguro."
      : "Healthcare assumes occasional routine care only, not ongoing treatment or insurance premiums.",
  ];
  if (budgetTier === "unknown") {
    assumptions.push(
      lang === "es"
        ? "Tu respuesta de presupuesto fue \"aún no estoy seguro\", así que este rango abarca tanto un estilo de vida austero como uno cómodo."
        : "Your budget answer was \"not sure yet,\" so this range spans both a lean and a comfortable lifestyle."
    );
  }
  if (cityDirection) {
    assumptions.push(
      lang === "es"
        ? `Todavía no hay un desglose de costos dedicado para ${city.name}, así que estas cifras están ancladas a la guía de Path To Mexico para Playa del Carmen.`
        : `A dedicated cost breakdown for ${city.name} isn't published yet, so these figures are anchored to Path To Mexico's Playa del Carmen guide.`
    );
  }

  const verifyPersonally = [
    lang === "es"
      ? "Los anuncios de vivienda reales y su disponibilidad en el momento en que busques."
      : "Actual housing listings and availability at the time you search.",
    lang === "es"
      ? "El tipo de cambio entre MXN y tu moneda de origen al momento en que transfieras dinero."
      : "The exchange rate between MXN and your home currency at the time you transfer money.",
  ];
  if (FAMILY_HOUSEHOLDS.includes(household)) {
    verifyPersonally.push(
      lang === "es"
        ? "Los costos de supermercado y diarios para el tamaño específico de tu hogar — aún no hay una cifra publicada que cubra esto."
        : "Grocery and daily costs for your specific household size — no published figure covers this yet."
    );
  }
  if (cityDirection) {
    verifyPersonally.push(
      lang === "es"
        ? `Costos específicos de ${city.name} — esta estimación es una referencia anclada a Playa del Carmen, no una cotización de ${city.name}.`
        : `${city.name}-specific costs — this estimate is a Playa del Carmen-anchored reference, not a ${city.name} quote.`
    );
  }
  verifyPersonally.push(
    lang === "es"
      ? "Los costos de salud o seguro específicos para tu edad, condiciones de salud y elección de cobertura."
      : "Healthcare or insurance costs specific to your age, health conditions, and coverage choice."
  );

  return {
    cityName: city.name,
    totalRange: { ...totalRange, sourceLabel: lang === "es" ? "Totales publicados de la guía de Playa del Carmen" : "Published Playa del Carmen guide totals" },
    categories,
    majorCostDrivers,
    assumptions,
    verifyPersonally,
    guideLinks: [
      { label: lang === "es" ? "Costo de Vida en Playa del Carmen" : "Cost of Living in Playa del Carmen", href: GUIDE_LINKS.costOfLiving },
      { label: lang === "es" ? "¿Cuánto Dinero Necesitas Para Mudarte a México?" : "How Much Money Do You Need to Move to Mexico?", href: GUIDE_LINKS.howMuchMoney },
      { label: lang === "es" ? "Costos de Supermercado en México" : "Grocery Costs in Mexico", href: GUIDE_LINKS.groceryCosts },
    ],
  };
}
