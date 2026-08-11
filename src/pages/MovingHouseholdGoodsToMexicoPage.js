import { useState } from "react";
import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { getCalendlyUrl } from "../config/booking";

// GRID-002 guide 2 of 2 — same bilingual local-content pattern as
// CanadianTaxesMovingToMexicoPage.js. Menaje de casa rules were verified
// against the SRE/consular and ANAM sources listed in the in-page
// "Official Sources" section in August 2026. Consular requirements vary by
// consulate and change — no fee amounts or shipping prices are stated by
// design; keep it that way and update the Last-reviewed line when editing.
const content = {
  en: {
    title: "Moving Household Goods to Mexico from Canada",
    description:
      "Menaje de casa, shipping options, customs rules, and an honest look at what's worth bringing — and what's better bought from local hands in Mexico.",
    category: "Logistics",
    toggle: "ES",
    sections: [
      {
        heading: "Start With The Honest Question: Ship, Sell, Or Store?",
        paragraphs: [
          "Before quotes and customs forms, sit with the real question: how much of your Canadian household actually belongs in your Mexican life? International moving is priced by volume and hassle, and the emotional math matters as much as the financial math. Some things are irreplaceable. Most things are furniture.",
          "A useful exercise: walk your home and sort everything into three piles — would buy again in Mexico, genuinely irreplaceable, and everything else. Most people who've done the move will tell you the third pile was bigger than they expected, and that they wish they'd trusted it.",
        ],
      },
      {
        heading: "Menaje De Casa, Explained",
        paragraphs: [
          "Menaje de casa is Mexico's household-goods import mechanism: a certificate issued by a Mexican consulate that authorizes bringing in your used household belongings — furniture, clothing, books, appliances — without paying import duties, provided they're for ordinary family use and not commercial purposes.",
          "The critical detail is sequencing: the certificate is processed at the Mexican consulate serving the area where you live before your goods travel. It is tied to your Mexican residency status, so residency comes first, then menaje, then shipping.",
        ],
      },
      {
        heading: "Who Qualifies, And How Your Status Changes The Rules",
        paragraphs: [
          "Your immigration status shapes what kind of import you get — and note these are immigration categories, distinct from tax residency (which has its own rules and its own guide). As published by Mexican consulates: holders of permanent resident status can generally import their menaje definitively, free of duties. Holders of temporary resident status (including temporary resident students) generally receive a temporary import tied to the duration of their status.",
          "Mexican citizens returning after living abroad six months or more have their own version of the process. Tourists don't qualify — there is no menaje de casa on a tourist entry. Requirements and interpretations vary between consulates, so treat your own consulate's current checklist as the authority.",
        ],
      },
      {
        heading: "What Counts — And What Doesn't",
        paragraphs: [
          "The menaje covers used household goods: consular guidance describes belongings acquired at least six months before the import that serve the ordinary use of a family. New items still in boxes, goods in commercial quantities, and anything destined for business or industrial use don't belong on the list.",
          "Vehicles are explicitly excluded — a menaje de casa certificate never covers importing your car, which is a separate (and for most people, discouraging) process. Plan your vehicle question independently of your furniture question.",
        ],
      },
      {
        heading: "The Paperwork",
        paragraphs: [
          "Expect the core package to include: your passport, your Mexican residency card or approved visa, a detailed inventory of your belongings written in Spanish (numbered, itemized, no vague \"misc. boxes\"), and proof you've been living in the consulate's jurisdiction — several consulates ask for recent utility bills in your name. A consular fee applies; amounts and payment methods vary by consulate.",
          "Precision on the inventory is not bureaucratic theater — it's what the customs broker and ANAM (Mexico's customs agency) will check the shipment against. Mismatches between the list and the boxes are the classic source of delays and charges.",
        ],
      },
      {
        heading: "Prohibited And Regulated Items",
        paragraphs: [
          "Some things must never go in the container: firearms and ammunition (regulated by Mexico's defense ministry — practically speaking, don't), narcotics, and — a rule that surprises people — electronic cigarettes and vaping devices, whose import Mexico prohibits. Plants, seeds, soil, and many foods face agricultural restrictions.",
          "When in doubt about an item, ask your mover or customs broker before it's packed, not at the port. ANAM publishes current prohibited-goods guidance — it's linked in the sources below.",
        ],
      },
      {
        heading: "Shipping Realities: What Actually Drives The Cost",
        paragraphs: [
          "Your main options are a dedicated container, shared/consolidated container space, palletized freight for smaller loads, or driving belongings down yourself. We deliberately don't quote prices here: costs swing widely with volume, route, insurance level, door-to-door versus port service, fuel, and season, and any number printed today misleads someone next year.",
          "Instead: get at least three written quotes from international movers with demonstrated menaje de casa experience into Mexico, itemized enough to compare. Ask each one who handles customs clearance, whether a customs broker (agente aduanal) is included, what insurance covers, and what happens if the inventory is questioned.",
        ],
      },
      {
        heading: "Arriving In The Yucatán",
        paragraphs: [
          "For the peninsula, shipments commonly arrive by sea via Progreso — the port half an hour from Mérida — or travel overland from the northern border with a bonded carrier. Coastal Quintana Roo destinations like Playa del Carmen and Tulum are usually served by road from either entry point.",
          "Build slack into the timeline: port handling, customs review, and inland delivery each add days, and holiday seasons add more. Your goods will keep; your first weeks shouldn't depend on them.",
        ],
      },
      {
        heading: "The Case For Arriving Light",
        paragraphs: [
          "Here's the honest, less-obvious advice: many people ship too much. Canadian furniture built for dry winters can struggle in Yucatán humidity, big soft furnishings mold faster than you'd think, and winter gear becomes closet ballast. Meanwhile, the peninsula is full of skilled carpenters, weavers, and makers producing beautiful furniture suited to the climate — often for less than shipping its Canadian equivalent.",
          "Furnishing locally isn't just practical; it's the responsible-relocation move. Money spent with Yucatecan makers and Mexican-owned stores stays in the community you're joining. And donating well — giving usable things time to find new homes in Canada instead of a dumpster deadline — is a better ending for the pile you leave behind.",
        ],
      },
      {
        heading: "Your First 30 Days Without Your Things",
        paragraphs: [
          "Plan to live comfortably before the shipment lands: a furnished rental for the first month or two, one suitcase of true essentials per person, documents and medications in your carry-on, and a short list of what you'll buy locally in week one.",
          "This bridge period is also quietly useful — a month in a furnished place teaches you what you actually need in a Mexican home, which is rarely what you'd have guessed from Canada.",
        ],
      },
      {
        heading: "Official Sources & Disclaimer",
        paragraphs: [
          "Menaje de casa requirements are set by Mexican authorities and applied by individual consulates, and they change. Confirm the current checklist with the Mexican consulate serving your area before booking anything. This guide is general information, not customs, legal, or financial advice, and it doesn't guarantee duty-free treatment, eligibility, costs, or timelines for any specific case.",
        ],
        sources: true,
      },
    ],
    sourcesLinks: [
      ["SRE — Consulate of Mexico in New York: Menaje de Casa", "https://consulmex.sre.gob.mx/nuevayork/index.php/espanol/registro-civil-y-poderes-notariales/menaje-casa"],
      ["SRE — Embassy of Mexico in Spain: Menaje de casa certificate for foreign residents", "https://embamex.sre.gob.mx/espana/index.php/documentacion-a-mexicanos/573-certificado-de-menaje-de-casa-a-extranjeros"],
      ["SRE — Consulate of Mexico in Atlanta: Certificado de menaje de casa", "https://consulmex.sre.gob.mx/atlanta/index.php/registro-civil-y-poderes-notariales/menaje-de-casa"],
      ["ANAM — Goods you cannot bring into Mexico", "https://www.anam.gob.mx/mercancia-que-no-puedes-ingresar-a-mexico/"],
      ["ANAM — Goods regulated by the Ministry of National Defense", "https://www.anam.gob.mx/mercancia-regulada-por-parte-de-la-secretaria-de-la-defensa-nacional/"],
    ],
    sourcesNote: "Consular requirements vary by consulate — your consulate's published checklist governs. Last reviewed: August 2026.",
    ctaTitle: "Moving Logistics Are Where Plans Get Real",
    ctaText:
      "Not sure yet where in Mexico your things should land? Start with the free My Mexico Blueprint — or bring your inventory questions to a private Mexico Fit Call ($99 USD).",
    ctaBlueprint: "Build My Mexico Blueprint",
    ctaFitCall: "Book Your $99 Mexico Fit Call",
  },
  es: {
    title: "Mudar Tu Menaje de Casa de Canadá a México",
    description:
      "Menaje de casa, opciones de envío, reglas aduanales y una mirada honesta a qué vale la pena traer — y qué es mejor comprar de manos locales en México.",
    category: "Logística",
    toggle: "EN",
    sections: [
      {
        heading: "Empieza Con La Pregunta Honesta: ¿Enviar, Vender O Guardar?",
        paragraphs: [
          "Antes de cotizaciones y formularios aduanales, siéntate con la pregunta real: ¿cuánto de tu hogar canadiense pertenece de verdad a tu vida mexicana? La mudanza internacional se cobra por volumen y complicación, y la matemática emocional importa tanto como la financiera. Algunas cosas son irremplazables. La mayoría son muebles.",
          "Un ejercicio útil: recorre tu casa y separa todo en tres montones — lo que volverías a comprar en México, lo genuinamente irremplazable, y todo lo demás. La mayoría de quienes ya hicieron la mudanza te dirán que el tercer montón era más grande de lo que esperaban, y que ojalá le hubieran hecho caso.",
        ],
      },
      {
        heading: "El Menaje De Casa, Explicado",
        paragraphs: [
          "El menaje de casa es el mecanismo mexicano para importar bienes del hogar: un certificado que expide un consulado mexicano y que autoriza ingresar tus pertenencias usadas — muebles, ropa, libros, electrodomésticos — sin pagar impuestos de importación, siempre que sean para el uso ordinario de una familia y no para fines comerciales.",
          "El detalle crítico es el orden: el certificado se tramita en el consulado mexicano que atiende la zona donde vives, antes de que tus bienes viajen. Está ligado a tu condición migratoria mexicana, así que primero va la residencia, luego el menaje, luego el envío.",
        ],
      },
      {
        heading: "Quién Califica, Y Cómo Tu Estatus Cambia Las Reglas",
        paragraphs: [
          "Tu estatus migratorio define qué tipo de importación te corresponde — y ojo: estas son categorías migratorias, distintas de la residencia fiscal (que tiene sus propias reglas y su propia guía). Según publican los consulados mexicanos: quienes tienen residencia permanente en general pueden importar su menaje de forma definitiva y libre de impuestos. Quienes tienen residencia temporal (incluyendo residentes temporales estudiantes) en general reciben una importación temporal ligada a la duración de su estatus.",
          "Los mexicanos que regresan tras vivir en el extranjero seis meses o más tienen su propia versión del trámite. Los turistas no califican — no existe menaje de casa con entrada de turista. Los requisitos y criterios varían entre consulados, así que trata la lista vigente de tu consulado como la autoridad.",
        ],
      },
      {
        heading: "Qué Entra — Y Qué No",
        paragraphs: [
          "El menaje cubre bienes usados del hogar: la guía consular describe pertenencias adquiridas al menos seis meses antes de la importación que sirven al uso ordinario de una familia. Artículos nuevos en caja, mercancía en cantidades comerciales y cualquier cosa destinada a uso empresarial o industrial no pertenecen a la lista.",
          "Los vehículos están explícitamente excluidos — un certificado de menaje de casa nunca cubre la importación de tu auto, que es un proceso aparte (y para la mayoría, poco alentador). Resuelve la pregunta del vehículo por separado de la de los muebles.",
        ],
      },
      {
        heading: "El Papeleo",
        paragraphs: [
          "El paquete básico suele incluir: tu pasaporte, tu tarjeta de residencia mexicana o visa aprobada, un inventario detallado de tus pertenencias escrito en español (numerado, artículo por artículo, sin \"cajas varias\"), y comprobantes de que vives en la circunscripción del consulado — varios consulados piden recibos recientes de servicios a tu nombre. Aplica una tarifa consular; los montos y formas de pago varían según el consulado.",
          "La precisión del inventario no es teatro burocrático — es contra lo que el agente aduanal y la ANAM (la agencia de aduanas de México) cotejarán el embarque. Las diferencias entre la lista y las cajas son la fuente clásica de demoras y cargos.",
        ],
      },
      {
        heading: "Artículos Prohibidos Y Regulados",
        paragraphs: [
          "Hay cosas que nunca deben ir en el contenedor: armas de fuego y municiones (reguladas por la defensa nacional — en la práctica: no), narcóticos, y — una regla que sorprende — cigarros electrónicos y vaporizadores, cuya importación México prohíbe. Plantas, semillas, tierra y muchos alimentos enfrentan restricciones agrícolas.",
          "Ante la duda sobre un artículo, pregunta a tu empresa de mudanzas o a tu agente aduanal antes de empacarlo, no en el puerto. La ANAM publica la guía vigente de mercancías prohibidas — está enlazada en las fuentes de abajo.",
        ],
      },
      {
        heading: "Realidades Del Envío: Qué Determina El Costo",
        paragraphs: [
          "Tus opciones principales son contenedor dedicado, espacio en contenedor compartido/consolidado, carga en tarimas para volúmenes menores, o llevar tus cosas por carretera tú mismo. Deliberadamente no publicamos precios: los costos varían muchísimo según volumen, ruta, nivel de seguro, servicio puerta a puerta o a puerto, combustible y temporada, y cualquier cifra impresa hoy engaña a alguien el próximo año.",
          "En su lugar: consigue al menos tres cotizaciones por escrito de mudanzas internacionales con experiencia demostrada en menaje de casa hacia México, desglosadas para poder comparar. Pregunta a cada una quién gestiona el despacho aduanal, si incluye agente aduanal, qué cubre el seguro y qué pasa si cuestionan el inventario.",
        ],
      },
      {
        heading: "Llegar A Yucatán",
        paragraphs: [
          "Para la península, los embarques suelen llegar por mar vía Progreso — el puerto a media hora de Mérida — o por tierra desde la frontera norte con un transportista autorizado. Los destinos costeros de Quintana Roo como Playa del Carmen y Tulum normalmente se atienden por carretera desde cualquiera de los dos puntos de entrada.",
          "Deja holgura en el calendario: el manejo portuario, la revisión aduanal y la entrega al interior suman días cada uno, y las temporadas altas suman más. Tus cosas pueden esperar; tus primeras semanas no deberían depender de ellas.",
        ],
      },
      {
        heading: "El Argumento Para Llegar Ligero",
        paragraphs: [
          "Este es el consejo honesto y menos obvio: mucha gente envía demasiado. Los muebles canadienses hechos para inviernos secos pueden sufrir con la humedad yucateca, los tapizados grandes crían moho más rápido de lo que imaginas, y el equipo de invierno se vuelve lastre de clóset. Mientras tanto, la península está llena de carpinteros, tejedores y artesanos que producen muebles hermosos y adecuados al clima — muchas veces por menos de lo que cuesta enviar su equivalente canadiense.",
          "Amueblar localmente no es solo práctico; es la decisión de reubicación responsable. El dinero gastado con artesanos yucatecos y comercios mexicanos se queda en la comunidad a la que llegas. Y donar bien — dando tiempo a que tus cosas útiles encuentren nuevos hogares en Canadá en lugar de un contenedor de basura — es un mejor final para el montón que dejas atrás.",
        ],
      },
      {
        heading: "Tus Primeros 30 Días Sin Tus Cosas",
        paragraphs: [
          "Planea vivir cómodamente antes de que llegue el embarque: una renta amueblada para el primer mes o dos, una maleta de esenciales verdaderos por persona, documentos y medicamentos en tu equipaje de mano, y una lista corta de lo que comprarás localmente la primera semana.",
          "Este periodo puente además es útil en silencio — un mes en un lugar amueblado te enseña qué necesitas realmente en un hogar mexicano, que rara vez es lo que habrías adivinado desde Canadá.",
        ],
      },
      {
        heading: "Fuentes Oficiales Y Aviso",
        paragraphs: [
          "Los requisitos del menaje de casa los fijan las autoridades mexicanas y los aplica cada consulado, y cambian. Confirma la lista vigente con el consulado mexicano que atiende tu zona antes de reservar nada. Esta guía es información general, no asesoría aduanal, legal ni financiera, y no garantiza trato libre de impuestos, elegibilidad, costos ni tiempos para ningún caso específico.",
        ],
        sources: true,
      },
    ],
    sourcesLinks: [
      ["SRE — Consulado de México en Nueva York: Menaje de Casa", "https://consulmex.sre.gob.mx/nuevayork/index.php/espanol/registro-civil-y-poderes-notariales/menaje-casa"],
      ["SRE — Embajada de México en España: Certificado de menaje de casa a personas extranjeras", "https://embamex.sre.gob.mx/espana/index.php/documentacion-a-mexicanos/573-certificado-de-menaje-de-casa-a-extranjeros"],
      ["SRE — Consulado de México en Atlanta: Certificado de menaje de casa", "https://consulmex.sre.gob.mx/atlanta/index.php/registro-civil-y-poderes-notariales/menaje-de-casa"],
      ["ANAM — Mercancía que no puedes ingresar a México", "https://www.anam.gob.mx/mercancia-que-no-puedes-ingresar-a-mexico/"],
      ["ANAM — Mercancía regulada por la Secretaría de la Defensa Nacional", "https://www.anam.gob.mx/mercancia-regulada-por-parte-de-la-secretaria-de-la-defensa-nacional/"],
    ],
    sourcesNote: "Los requisitos consulares varían según el consulado — la lista publicada por tu consulado es la que rige. Última revisión: agosto de 2026.",
    ctaTitle: "La Logística Es Donde Los Planes Se Vuelven Reales",
    ctaText:
      "¿Aún no sabes en qué parte de México deberían aterrizar tus cosas? Empieza con el My Mexico Blueprint gratuito — o trae tus preguntas de inventario a una Mexico Fit Call privada ($99 USD).",
    ctaBlueprint: "Construir Mi Mexico Blueprint",
    ctaFitCall: "Reservar Tu Mexico Fit Call de $99",
  },
};

export default function MovingHouseholdGoodsToMexicoPage() {
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
