import { useState } from "react";
import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { getCalendlyUrl } from "../config/booking";

// GRID-002 guide 1 of 2 — bilingual via the same local content={en,es} +
// toggle pattern ResponsibleRelocationGuidePage.js established around the
// unmodified shared template. Facts below were verified against the primary
// sources listed in the in-page "Official Sources" section (CRA, canada.ca
// treaty text, Ley/CFF Art. 9) in August 2026 — when editing substantive
// claims, re-verify against those sources and update the Last-reviewed line.
const content = {
  en: {
    title: "Canadian Taxes When Moving to Mexico",
    description:
      "Residency ties, departure tax, CPP, OAS, RRSPs, TFSAs, and the Canada–Mexico treaty rules every Canadian should understand before leaving Canada for Mexico.",
    category: "Canada",
    toggle: "ES",
    sections: [
      {
        heading: "Tax Residency Is Its Own Decision",
        paragraphs: [
          "Immigration status and tax status are two different systems, and mixing them up is where most expensive surprises start. Mexican temporary residency, permanent residency, and even citizenship are immigration questions. Whether Canada still considers you a tax resident — and whether Mexico has started considering you one — are separate questions with their own rules.",
          "You can hold a Mexican residency card and still be a Canadian tax resident. You can also become a Mexican tax resident without feeling like you \"officially\" moved. This guide walks through both sides so you know which questions to bring to a professional before you leave.",
        ],
      },
      {
        heading: "Residential Ties: What The CRA Actually Looks At",
        paragraphs: [
          "The Canada Revenue Agency decides whether you've left Canada for tax purposes based on your residential ties, not your plane ticket. The significant ties are a home in Canada, a spouse or common-law partner in Canada, and dependants in Canada. Secondary ties — bank accounts, driver's licences, health coverage, memberships, personal property — matter as a pattern.",
          "The half-in, half-out setup is the classic trap: house kept \"just in case,\" provincial health card active, spouse still in Canada most of the year. If your ties say you never really left, the CRA can treat you as a factual resident who owes Canadian tax on worldwide income, no matter how many months you spent in the sun.",
        ],
      },
      {
        heading: "The Year You Leave: Your Final Return",
        paragraphs: [
          "For the year you emigrate, you file a Canadian return with a departure date on it. Up to that date you're taxed as a resident on worldwide income; after it, generally only on certain Canadian-source income. Some credits and deductions get prorated for the part of the year you were resident.",
          "Your departure date matters more than most people expect — it drives the departure tax calculation, your withholding treatment afterward, and how cleanly the two countries' tax years line up. Pick it deliberately and document it.",
        ],
      },
      {
        heading: "Departure Tax: The Deemed Disposition",
        paragraphs: [
          "When you cease Canadian tax residency, the CRA treats you as if you sold certain property at fair market value the moment you left — even though you sold nothing. That deemed disposition can trigger capital gains tax, commonly called departure tax. It typically catches things like non-registered investments and shares.",
          "Important exceptions exist: Canadian real property and registered accounts like RRSPs are generally not deemed sold on departure. If everything you owned on leaving was worth more than $25,000, you file Form T1161 listing your property; deemed gains are reported on Form T1243. You can also elect to defer paying the departure tax, though above a federal-tax threshold (currently $16,500) the CRA requires security. These numbers and forms change — verify them against the CRA emigrants pages before you rely on them.",
        ],
      },
      {
        heading: "RRSPs, TFSAs, And Investment Accounts After You Leave",
        paragraphs: [
          "RRSPs generally survive the move well: they're not deemed sold, they stay tax-deferred in Canada, and withdrawals as a non-resident face Canadian withholding tax — a default 25% under Part XIII, which a tax treaty can reduce for periodic payments.",
          "TFSAs are a different story. As a non-resident you accrue no new room, and any contribution you make while non-resident is taxed at 1% per month for as long as it stays in the account. The account keeps its Canadian tax-free status, but other countries don't have to respect it. Many Canadians conclude a TFSA stops earning its keep abroad — a decision to make with an advisor, not by default.",
          "Non-registered investment accounts are exactly what the departure tax targets, and many Canadian brokerages restrict accounts for non-resident clients — ask yours what happens to your account before you leave, not after.",
        ],
      },
      {
        heading: "CPP And OAS In Mexico",
        paragraphs: [
          "CPP is payable wherever you live. OAS has a residence test: to keep receiving it outside Canada you generally need at least 20 years of Canadian residence after age 18. If you're short, the Canada–Mexico social security agreement — in force since May 1, 1996 — can let credited periods under Mexico's pension program count toward that eligibility.",
          "Once you're a Mexican tax resident, your CPP, OAS, and other periodic pension payments are subject to Canadian withholding — capped at 15% for periodic pension payments under the Canada–Mexico tax treaty rather than the default 25%. Getting the correct treaty rate applied usually means telling your payers you've become a non-resident of Canada, in writing.",
        ],
      },
      {
        heading: "The Canada–Mexico Tax Treaty, In Plain Language",
        paragraphs: [
          "Canada and Mexico have a full tax treaty, in force since 2007. Its job is to prevent the same income being fully taxed twice: it caps withholding rates (like the 15% on periodic pensions), sets out which country may tax which kinds of income, and includes tie-breaker rules for people who technically qualify as residents of both countries at once.",
          "The treaty doesn't apply itself. Payers withhold at treaty rates only when they know your status, and both tax agencies expect consistent facts. How the treaty applies to your pension mix, investment income, or property is precisely the question for a cross-border professional — outcomes differ by situation, and nothing here guarantees yours.",
        ],
      },
      {
        heading: "Becoming A Mexican Tax Resident",
        paragraphs: [
          "Mexico's federal tax code (Código Fiscal de la Federación, Article 9) considers you a Mexican tax resident when your home (casa habitación) is in Mexico. If you keep homes in both countries, the test becomes your center of vital interests — broadly, Mexico is it when more than half your income in the calendar year comes from Mexican sources, or when Mexico is the main base of your professional activities.",
          "Mexican tax residents are taxed on worldwide income and register with SAT (Mexico's tax authority) for an RFC tax ID. A Mexican residency card alone doesn't automatically make you a SAT taxpayer — and conversely, living there without \"registering\" doesn't stop tax residency from arising under the law. As of August 2026 these are the standing rules; confirm current thresholds with a Mexican accountant.",
        ],
      },
      {
        heading: "Common Expensive Mistakes",
        paragraphs: [
          "The patterns that generate the worst bills are consistent: leaving \"informally\" while keeping major Canadian ties; never telling banks, brokerages, and pension payers about non-residency so the wrong withholding applies for years; contributing to a TFSA after leaving; renting out a kept Canadian home without handling non-resident rental withholding; and assuming that because the treaty exists, everything sorts itself out automatically.",
          "Almost all of these are cheap to prevent and expensive to unwind. The prevention is the same in every case: decide your residency position deliberately, document it, and tell the institutions that pay you.",
        ],
      },
      {
        heading: "Build Your Team Before You Book The Movers",
        paragraphs: [
          "A move like this deserves two professionals: a Canadian cross-border accountant for the departure year, and a Mexican accountant once you're establishing tax residency there. One conversation with each, before you leave, routinely pays for itself many times over.",
          "Path To Mexico is not a tax, legal, or financial advisor and this guide is general information, not advice for your situation. What we do is help you build the plan around the move itself — and connect you with trusted, qualified professionals on the ground when you need them.",
        ],
      },
      {
        heading: "Official Sources & Disclaimer",
        paragraphs: [
          "This guide summarizes rules that change. Verify anything you'll act on against the primary sources below, and treat every figure here as a pointer to check — not a promise. Nothing on this page is personalized tax, legal, or financial advice.",
        ],
        sources: true,
      },
    ],
    sourcesLinks: [
      ["CRA — Leaving Canada (emigrants)", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/leaving-canada-emigrants.html"],
      ["CRA — Dispositions of property for emigrants (departure tax, T1161/T1243)", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/dispositions-property.html"],
      ["CRA — Income Tax Folio S5-F1-C1: Determining an Individual's Residence Status", "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/income-tax/income-tax-folios-index/series-5-international-residency/folio-1-residency/income-tax-folio-s5-f1-c1-determining-individual-s-residence-status.html"],
      ["Canada–Mexico Tax Convention (official treaty text)", "https://www.treaty-accord.gc.ca/text-texte.aspx?lang=eng&id=102208"],
      ["CRA — Rates for Part XIII non-resident withholding tax", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/payments-non-residents/nr4-part-xiii-tax/part-xiii-withholding-tax/rates-part-xiii-tax.html"],
      ["CRA — Tax on non-resident TFSA contributions", "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/owing-tax/non-resident.html"],
      ["Canada.ca — Old Age Security: Do you qualify (20-year rule)", "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/eligibility.html"],
      ["Canada.ca — Canada–Mexico social security agreement", "https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-international/mexico.html"],
    ],
    sourcesNote: "Mexican tax residency: Código Fiscal de la Federación, Article 9 (casa habitación and center-of-vital-interests tests). Last reviewed: August 2026.",
    ctaTitle: "Taxes Are One Thread Of A Bigger Plan",
    ctaText:
      "Start with the free My Mexico Blueprint to see what your whole move could look like — or bring your timeline and questions straight to a private Mexico Fit Call ($99 USD).",
    ctaBlueprint: "Build My Mexico Blueprint",
    ctaFitCall: "Book Your $99 Mexico Fit Call",
  },
  es: {
    title: "Impuestos Canadienses al Mudarte a México",
    description:
      "Lazos de residencia, impuesto de salida, CPP, OAS, RRSPs, TFSAs y las reglas del tratado Canadá–México que todo canadiense debe entender antes de dejar Canadá por México.",
    category: "Canadá",
    toggle: "EN",
    sections: [
      {
        heading: "La Residencia Fiscal Es Una Decisión Aparte",
        paragraphs: [
          "El estatus migratorio y el estatus fiscal son dos sistemas distintos, y confundirlos es donde empiezan las sorpresas más caras. La residencia temporal mexicana, la residencia permanente e incluso la ciudadanía son temas migratorios. Si Canadá todavía te considera residente fiscal — y si México ya empezó a considerarte residente fiscal — son preguntas separadas con sus propias reglas.",
          "Puedes tener una tarjeta de residencia mexicana y seguir siendo residente fiscal canadiense. También puedes volverte residente fiscal mexicano sin sentir que te mudaste \"oficialmente\". Esta guía recorre ambos lados para que sepas qué preguntas llevarle a un profesional antes de partir.",
        ],
      },
      {
        heading: "Lazos De Residencia: Lo Que La CRA Realmente Evalúa",
        paragraphs: [
          "La Canada Revenue Agency decide si dejaste Canadá para fines fiscales según tus lazos de residencia, no según tu boleto de avión. Los lazos significativos son una vivienda en Canadá, un cónyuge o pareja en Canadá y dependientes en Canadá. Los lazos secundarios — cuentas bancarias, licencias de conducir, cobertura de salud, membresías, bienes personales — cuentan como patrón.",
          "El esquema de \"un pie en cada país\" es la trampa clásica: la casa que se conserva \"por si acaso\", la tarjeta provincial de salud activa, el cónyuge que pasa la mayor parte del año en Canadá. Si tus lazos dicen que nunca te fuiste realmente, la CRA puede tratarte como residente de hecho que debe impuestos canadienses sobre ingresos mundiales, sin importar cuántos meses pasaste bajo el sol.",
        ],
      },
      {
        heading: "El Año En Que Te Vas: Tu Última Declaración",
        paragraphs: [
          "Para el año en que emigras, presentas una declaración canadiense con fecha de salida. Hasta esa fecha tributas como residente sobre ingresos mundiales; después, en general solo sobre ciertos ingresos de fuente canadiense. Algunos créditos y deducciones se prorratean por la parte del año en que fuiste residente.",
          "Tu fecha de salida importa más de lo que la mayoría espera — determina el cálculo del impuesto de salida, el tratamiento de retenciones posteriores y qué tan limpio queda el empalme entre los años fiscales de ambos países. Elígela deliberadamente y documéntala.",
        ],
      },
      {
        heading: "Impuesto De Salida: La Disposición Presunta",
        paragraphs: [
          "Cuando dejas de ser residente fiscal canadiense, la CRA te trata como si hubieras vendido ciertos bienes a valor de mercado en el momento de salir — aunque no vendiste nada. Esa disposición presunta puede generar impuesto sobre ganancias de capital, comúnmente llamado impuesto de salida. Suele alcanzar inversiones no registradas y acciones.",
          "Existen excepciones importantes: los bienes inmuebles canadienses y las cuentas registradas como los RRSP en general no se consideran vendidos al salir. Si todo lo que poseías al salir valía más de $25,000, presentas el Formulario T1161 con la lista de tus bienes; las ganancias presuntas se declaran en el Formulario T1243. También puedes optar por diferir el pago del impuesto de salida, aunque por encima de un umbral de impuesto federal (actualmente $16,500) la CRA exige garantía. Estas cifras y formularios cambian — verifícalos en las páginas de emigrantes de la CRA antes de basarte en ellos.",
        ],
      },
      {
        heading: "RRSPs, TFSAs Y Cuentas De Inversión Después De Salir",
        paragraphs: [
          "Los RRSP suelen sobrevivir bien la mudanza: no se consideran vendidos, siguen con diferimiento fiscal en Canadá, y los retiros como no residente enfrentan retención canadiense — 25% por defecto bajo la Parte XIII, que un tratado fiscal puede reducir para pagos periódicos.",
          "Los TFSA son otra historia. Como no residente no acumulas nuevo espacio, y cualquier aportación que hagas siendo no residente se grava al 1% mensual mientras permanezca en la cuenta. La cuenta conserva su estatus libre de impuestos en Canadá, pero otros países no están obligados a respetarlo. Muchos canadienses concluyen que un TFSA deja de valer la pena en el extranjero — una decisión para tomar con un asesor, no por omisión.",
          "Las cuentas de inversión no registradas son exactamente el objetivo del impuesto de salida, y muchas casas de bolsa canadienses restringen cuentas de clientes no residentes — pregunta a la tuya qué pasará con tu cuenta antes de irte, no después.",
        ],
      },
      {
        heading: "CPP Y OAS En México",
        paragraphs: [
          "El CPP se paga vivas donde vivas. El OAS tiene una prueba de residencia: para seguir recibiéndolo fuera de Canadá en general necesitas al menos 20 años de residencia canadiense después de los 18. Si te faltan años, el convenio de seguridad social Canadá–México — en vigor desde el 1 de mayo de 1996 — puede permitir que periodos acreditados en el sistema de pensiones de México cuenten para esa elegibilidad.",
          "Una vez que eres residente fiscal mexicano, tus pagos periódicos de CPP, OAS y otras pensiones están sujetos a retención canadiense — con tope del 15% para pagos periódicos de pensión bajo el tratado fiscal Canadá–México, en lugar del 25% por defecto. Lograr que se aplique la tasa correcta del tratado normalmente implica avisar por escrito a tus pagadores que te volviste no residente de Canadá.",
        ],
      },
      {
        heading: "El Tratado Fiscal Canadá–México, En Lenguaje Claro",
        paragraphs: [
          "Canadá y México tienen un tratado fiscal completo, en vigor desde 2007. Su función es evitar que el mismo ingreso se grave dos veces por completo: limita tasas de retención (como el 15% sobre pensiones periódicas), define qué país puede gravar qué tipos de ingreso, e incluye reglas de desempate para quienes técnicamente califican como residentes de ambos países a la vez.",
          "El tratado no se aplica solo. Los pagadores retienen a tasas del tratado únicamente cuando conocen tu estatus, y ambas autoridades fiscales esperan hechos consistentes. Cómo aplica el tratado a tu combinación de pensiones, ingresos de inversión o propiedades es precisamente la pregunta para un profesional transfronterizo — los resultados varían según la situación, y nada aquí garantiza el tuyo.",
        ],
      },
      {
        heading: "Volverte Residente Fiscal Mexicano",
        paragraphs: [
          "El Código Fiscal de la Federación (Artículo 9) te considera residente fiscal mexicano cuando tu casa habitación está en México. Si conservas vivienda en ambos países, la prueba pasa a ser tu centro de intereses vitales — en términos generales, está en México cuando más de la mitad de tus ingresos del año calendario provienen de fuente mexicana, o cuando México es la base principal de tus actividades profesionales.",
          "Los residentes fiscales mexicanos tributan sobre ingresos mundiales y se registran ante el SAT para obtener su RFC. Una tarjeta de residencia mexicana por sí sola no te convierte automáticamente en contribuyente del SAT — y a la inversa, vivir ahí sin \"registrarte\" no impide que la residencia fiscal surja conforme a la ley. A agosto de 2026 estas son las reglas vigentes; confirma los umbrales actuales con un contador mexicano.",
        ],
      },
      {
        heading: "Errores Caros Y Comunes",
        paragraphs: [
          "Los patrones que generan las peores cuentas son consistentes: irse \"informalmente\" conservando lazos canadienses importantes; nunca avisar a bancos, casas de bolsa y pagadores de pensiones sobre la no residencia, de modo que se aplica la retención equivocada durante años; aportar a un TFSA después de salir; rentar una casa canadiense conservada sin gestionar la retención para no residentes; y asumir que, como el tratado existe, todo se resuelve solo.",
          "Casi todos son baratos de prevenir y caros de deshacer. La prevención es la misma en todos los casos: decide tu posición de residencia deliberadamente, documéntala y avísale a las instituciones que te pagan.",
        ],
      },
      {
        heading: "Arma Tu Equipo Antes De Contratar La Mudanza",
        paragraphs: [
          "Una mudanza así merece dos profesionales: un contador canadiense transfronterizo para el año de salida, y un contador mexicano cuando establezcas la residencia fiscal allá. Una conversación con cada uno, antes de irte, suele pagarse sola muchas veces.",
          "Path To Mexico no es asesor fiscal, legal ni financiero, y esta guía es información general, no asesoría para tu situación. Lo que sí hacemos es ayudarte a construir el plan alrededor de la mudanza — y conectarte con profesionales calificados y de confianza en el terreno cuando los necesites.",
        ],
      },
      {
        heading: "Fuentes Oficiales Y Aviso",
        paragraphs: [
          "Esta guía resume reglas que cambian. Verifica todo lo que vayas a usar contra las fuentes primarias siguientes, y toma cada cifra como un punto de partida para confirmar — no como una promesa. Nada en esta página es asesoría fiscal, legal o financiera personalizada.",
        ],
        sources: true,
      },
    ],
    sourcesLinks: [
      ["CRA — Leaving Canada (emigrants)", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/leaving-canada-emigrants.html"],
      ["CRA — Dispositions of property for emigrants (impuesto de salida, T1161/T1243)", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/dispositions-property.html"],
      ["CRA — Income Tax Folio S5-F1-C1: estatus de residencia", "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/income-tax/income-tax-folios-index/series-5-international-residency/folio-1-residency/income-tax-folio-s5-f1-c1-determining-individual-s-residence-status.html"],
      ["Convenio Fiscal Canadá–México (texto oficial del tratado)", "https://www.treaty-accord.gc.ca/text-texte.aspx?lang=eng&id=102208"],
      ["CRA — Tasas de retención Parte XIII para no residentes", "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/payments-non-residents/nr4-part-xiii-tax/part-xiii-withholding-tax/rates-part-xiii-tax.html"],
      ["CRA — Impuesto sobre aportaciones a TFSA de no residentes", "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/owing-tax/non-resident.html"],
      ["Canada.ca — Old Age Security: elegibilidad (regla de 20 años)", "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/eligibility.html"],
      ["Canada.ca — Convenio de seguridad social Canadá–México", "https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-international/mexico.html"],
    ],
    sourcesNote: "Residencia fiscal mexicana: Código Fiscal de la Federación, Artículo 9 (casa habitación y centro de intereses vitales). Última revisión: agosto de 2026.",
    ctaTitle: "Los Impuestos Son Un Hilo De Un Plan Más Grande",
    ctaText:
      "Empieza con el My Mexico Blueprint gratuito para ver cómo podría verse toda tu mudanza — o trae tu cronograma y tus preguntas directamente a una Mexico Fit Call privada ($99 USD).",
    ctaBlueprint: "Construir Mi Mexico Blueprint",
    ctaFitCall: "Reservar Tu Mexico Fit Call de $99",
  },
};

export default function CanadianTaxesMovingToMexicoPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  return (
    <>
      <button
        type="button"
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className="fixed right-4 top-4 z-[60] border border-white/30 bg-black/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 md:right-10"
      >
        {t.toggle}
      </button>

      <ArticleLayout title={t.title} description={t.description} category={t.category} lang={lang}>
        {t.sections.map((section, index) => (
          <Section key={index} title={section.heading}>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}

            {section.sources && (
              <>
                <ul className="list-disc space-y-2 pl-6">
                  {t.sourcesLinks.map(([label, url]) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 transition hover:text-zinc-950"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-zinc-500">{t.sourcesNote}</p>
              </>
            )}
          </Section>
        ))}

        <Section title={t.ctaTitle}>
          <p>{t.ctaText}</p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <a
              href="/my-mexico-blueprint"
              className="inline-block bg-zinc-950 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#d8a15f]"
            >
              {t.ctaBlueprint}
            </a>
            <a
              href={getCalendlyUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-zinc-950 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
            >
              {t.ctaFitCall}
            </a>
          </div>
        </Section>
      </ArticleLayout>
    </>
  );
}
