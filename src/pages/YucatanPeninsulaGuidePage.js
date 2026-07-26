import { useState } from "react";
import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";

// DEST-003 — "The Complete Guide to Living in the Yucatán Peninsula." Every
// other guide page on this site is English-only (no lang mechanism exists
// in ArticleLayout.js/ArticleSection.js) — this is the first bilingual
// guide, using the same local content = { en, es } + useState("en") pattern
// already established elsewhere (GuidesPage.js, YourMexicoPage.js) rather
// than modifying the shared ArticleLayout/Section components themselves.
const content = {
  en: {
    toggle: "ES",
    title: "The Complete Guide to Living in the Yucatán Peninsula",
    description: "A practical, honest overview of all four Yucatán Peninsula regions Path To Mexico covers — how to choose between them, and what responsible relocation here actually looks like.",
    sections: [
      {
        title: "A Peninsula, Not One Destination",
        paragraphs: [
          "The Yucatán Peninsula is not one place to move to — it's four genuinely different regions, each with its own pace, cost, and character. Path To Mexico now covers 25 destinations across these four regions: Riviera Maya & Caribbean, Yucatán Interior, Gulf Coast, and Hidden Gems.",
          "This guide is a starting map, not a substitute for visiting. Every region and destination here has its own dedicated page with far more detail than fits in one overview.",
        ],
      },
      {
        title: "Choosing The Right Destination",
        paragraphs: [
          "Start with what you actually want daily life to feel like, not with a name you've already heard of. Want beach life and the region's best infrastructure? Riviera Maya & Caribbean. Want real colonial city culture without the coast? Yucatán Interior. Want an affordable, established Gulf coast beach town close to Mérida's hospitals? Gulf Coast. Want the least developed, most nature-first version of this coast? Hidden Gems.",
          "Our My Mexico Blueprint questionnaire can help narrow this down based on your own priorities, not just a region's general reputation.",
        ],
      },
      {
        title: "Lifestyle Differences Across The Peninsula",
        paragraphs: [
          "Riviera Maya & Caribbean is the most developed and social, with the largest community of other newcomers. Yucatán Interior is the most culturally immersive, ranging from Mérida's real city life to genuinely local working towns. Gulf Coast is calmer and more residential, built around weekend visitors from Mérida rather than international tourism. Hidden Gems is built around nature and self-sufficiency, not convenience.",
        ],
      },
      {
        title: "Climate Across The Regions",
        paragraphs: [
          "The coastal regions (Riviera Maya & Caribbean, Gulf Coast, Hidden Gems) share a warm, humid climate with a real rainy season from June through October and genuine hurricane exposure, worse on the Caribbean side than the Gulf. Yucatán Interior is hotter and drier, without any sea breeze — the dry-season heat inland can feel more intense than any coastal town.",
        ],
      },
      {
        title: "Healthcare Across The Regions",
        paragraphs: [
          "Mérida and Cancún are the Peninsula's two real healthcare hubs, with multiple hospitals and specialists. Playa del Carmen also has strong private healthcare. Smaller towns across all four regions generally offer only basic local clinics, with anything serious meaning a drive to one of these two cities — factor that drive time into any decision, not just the destination's own charm.",
        ],
      },
      {
        title: "Internet And Remote Work",
        paragraphs: [
          "Reliability generally tracks a destination's overall development: Cancún, Mérida, and Playa del Carmen offer the most consistent infrastructure; Valladolid's coworking scene is genuinely growing; the smaller and more remote destinations in every region, especially Hidden Gems and the Yucatán Interior's working towns, require testing your specific address before assuming remote work will be seamless.",
        ],
      },
      {
        title: "Getting Around",
        paragraphs: [
          "A car is genuinely useful almost everywhere outside the walkable centers of Playa del Carmen, Mérida, Cancún's El Centro, and a handful of small Pueblos Mágicos. The Peninsula's two international airports — Cancún and Mérida — anchor the Caribbean and Gulf/interior sides respectively; each destination's own page states realistic drive times to whichever is closer.",
        ],
      },
      {
        title: "Safety",
        paragraphs: [
          "Every destination this guide covers carries the same standing advice: use normal travel-safety practices, and verify current conditions for your specific destination before moving, rather than relying on this guide's general tone alone. Conditions can vary by neighborhood and change over time in any location, including within Mexico's most established cities.",
        ],
      },
      {
        title: "Cost Comparisons",
        paragraphs: [
          "Riviera Maya & Caribbean is generally the most expensive region, especially Playa del Carmen and Tulum. Yucatán Interior and Gulf Coast are generally the most affordable, with Mérida offering real city infrastructure at below-coastal prices. Hidden Gems destinations have low costs but correspondingly minimal services to spend on. Every specific figure across this site is a directional estimate, not verified local data — confirm against real local listings before treating any number as more than a starting point.",
        ],
      },
      {
        title: "Residency",
        paragraphs: [
          "Mexico's residency process is the same regardless of which Yucatán Peninsula destination you choose — see our dedicated Temporary Residency guide for the practical steps. Where you live doesn't change the legal process itself, only how close you are to the consulate or immigration office handling your application.",
        ],
      },
      {
        title: "Buying Versus Renting",
        paragraphs: [
          "Rent before you buy, in any of these 25 destinations, without exception. A few months of actually living somewhere reveals far more than any amount of research from a distance — heat, noise, commute, and neighborhood character all read differently in person than on a listing. Coastal properties typically require a bank trust (fideicomiso) for foreign buyers; inland properties do not, though other rules still apply. See our dedicated Renting Versus Buying guide for the fuller picture, and always confirm current rules with a Mexican notary before any purchase.",
        ],
      },
      {
        title: "Responsible Relocation",
        paragraphs: [
          "Every one of these 25 destinations is a real, existing community, not a blank canvas for newcomers. Learning Spanish — even basic conversational Spanish — meaningfully changes daily life and relationships everywhere on this list, and matters more the further you get from the Caribbean coast's tourist-facing towns. Support locally-owned businesses over international chains where you can. Understand a specific town's own development pressures before buying, especially in fast-growing places like Tulum, Valladolid, Bacalar, and El Cuyo — and treat any 'hot investment' or 'undiscovered opportunity' framing, wherever you encounter it, with real skepticism.",
        ],
      },
      {
        title: "Supporting Local Communities",
        paragraphs: [
          "The smaller and more remote a destination — especially in the Hidden Gems region and the Yucatán Interior's working towns like Tekax and Tizimín — the more directly your daily choices affect an existing local economy that predates any outside interest. Buying from local markets and businesses, respecting fishing and agricultural livelihoods, and approaching biosphere reserve areas (Celestún, Dzilam de Bravo, El Cuyo, Río Lagartos) with real respect for their ecological fragility are not optional extras — they're the actual difference between moving somewhere well and moving somewhere carelessly.",
        ],
      },
    ],
  },
  es: {
    toggle: "EN",
    title: "La Guía Completa Para Vivir En La Península De Yucatán",
    description: "Un panorama práctico y honesto de las cuatro regiones de la Península de Yucatán que cubre Path To Mexico — cómo elegir entre ellas, y qué significa realmente una reubicación responsable aquí.",
    sections: [
      {
        title: "Una Península, No Un Solo Destino",
        paragraphs: [
          "La Península de Yucatán no es un solo lugar al que mudarse — son cuatro regiones genuinamente diferentes, cada una con su propio ritmo, costo y carácter. Path To Mexico ahora cubre 25 destinos en estas cuatro regiones: Riviera Maya y Caribe, Interior de Yucatán, Costa del Golfo, y Joyas Escondidas.",
          "Esta guía es un mapa inicial, no un sustituto de visitar. Cada región y destino aquí tiene su propia página dedicada con mucho más detalle del que cabe en un panorama general.",
        ],
      },
      {
        title: "Elegir El Destino Correcto",
        paragraphs: [
          "Comienza con cómo quieres que se sienta realmente tu vida diaria, no con un nombre que ya has escuchado. ¿Quieres vida de playa y la mejor infraestructura de la región? Riviera Maya y Caribe. ¿Quieres cultura de ciudad colonial real sin la costa? Interior de Yucatán. ¿Quieres un pueblo de playa accesible y establecido en la costa del Golfo cerca de los hospitales de Mérida? Costa del Golfo. ¿Quieres la versión menos desarrollada y más centrada en la naturaleza de esta costa? Joyas Escondidas.",
          "Nuestro cuestionario My Mexico Blueprint puede ayudarte a definir esto según tus propias prioridades, no solo la reputación general de una región.",
        ],
      },
      {
        title: "Diferencias De Estilo De Vida En La Península",
        paragraphs: [
          "Riviera Maya y Caribe es la región más desarrollada y social, con la comunidad más grande de otros recién llegados. Interior de Yucatán es la más culturalmente inmersiva, desde la vida real de ciudad de Mérida hasta pueblos de trabajo genuinamente locales. Costa del Golfo es más tranquila y residencial, construida alrededor de visitantes de fin de semana desde Mérida en lugar del turismo internacional. Joyas Escondidas está construida alrededor de la naturaleza y la autosuficiencia, no de la conveniencia.",
        ],
      },
      {
        title: "Clima En Las Regiones",
        paragraphs: [
          "Las regiones costeras (Riviera Maya y Caribe, Costa del Golfo, Joyas Escondidas) comparten un clima cálido y húmedo con una temporada de lluvias real de junio a octubre y exposición genuina a huracanes, peor en el lado caribeño que en el del Golfo. El Interior de Yucatán es más caluroso y seco, sin brisa marina — el calor de temporada seca tierra adentro puede sentirse más intenso que en cualquier pueblo costero.",
        ],
      },
      {
        title: "Salud En Las Regiones",
        paragraphs: [
          "Mérida y Cancún son los dos centros de salud reales de la península, con múltiples hospitales y especialistas. Playa del Carmen también tiene salud privada fuerte. Los pueblos más pequeños en las cuatro regiones generalmente ofrecen solo clínicas locales básicas, con cualquier cosa seria significando un viaje a una de estas dos ciudades — considera ese tiempo de viaje en cualquier decisión, no solo el encanto propio del destino.",
        ],
      },
      {
        title: "Internet Y Trabajo Remoto",
        paragraphs: [
          "La confiabilidad generalmente sigue el desarrollo general de un destino: Cancún, Mérida y Playa del Carmen ofrecen la infraestructura más consistente; la escena de coworking de Valladolid está creciendo genuinamente; los destinos más pequeños y remotos en cada región, especialmente Joyas Escondidas y los pueblos de trabajo del Interior de Yucatán, requieren probar tu dirección específica antes de asumir que el trabajo remoto será fluido.",
        ],
      },
      {
        title: "Cómo Moverse",
        paragraphs: [
          "Un auto es genuinamente útil en casi todas partes fuera de los centros caminables de Playa del Carmen, Mérida, El Centro de Cancún, y un puñado de pequeños Pueblos Mágicos. Los dos aeropuertos internacionales de la península — Cancún y Mérida — anclan los lados caribeño y del Golfo/interior respectivamente; la página propia de cada destino indica tiempos de viaje realistas al que esté más cerca.",
        ],
      },
      {
        title: "Seguridad",
        paragraphs: [
          "Cada destino que cubre esta guía lleva el mismo consejo permanente: usa prácticas normales de seguridad al viajar, y verifica las condiciones actuales de tu destino específico antes de mudarte, en lugar de depender solo del tono general de esta guía. Las condiciones pueden variar por vecindario y cambiar con el tiempo en cualquier lugar, incluso dentro de las ciudades más establecidas de México.",
        ],
      },
      {
        title: "Comparaciones De Costo",
        paragraphs: [
          "Riviera Maya y Caribe es generalmente la región más cara, especialmente Playa del Carmen y Tulum. Interior de Yucatán y Costa del Golfo son generalmente los más accesibles, con Mérida ofreciendo infraestructura de ciudad real a precios por debajo de los costeros. Los destinos de Joyas Escondidas tienen costos bajos pero servicios correspondientemente mínimos en los que gastar. Cada cifra específica en este sitio es una estimación direccional, no datos locales verificados — confirma contra listados locales reales antes de tratar cualquier número como más que un punto de partida.",
        ],
      },
      {
        title: "Residencia",
        paragraphs: [
          "El proceso de residencia de México es el mismo sin importar qué destino de la Península de Yucatán elijas — consulta nuestra guía dedicada de Residencia Temporal para los pasos prácticos. Dónde vivas no cambia el proceso legal en sí, solo qué tan cerca estás del consulado u oficina de migración que maneja tu solicitud.",
        ],
      },
      {
        title: "Comprar Versus Rentar",
        paragraphs: [
          "Renta antes de comprar, en cualquiera de estos 25 destinos, sin excepción. Unos meses viviendo realmente en un lugar revelan mucho más que cualquier cantidad de investigación a distancia — el calor, el ruido, el traslado y el carácter del vecindario se sienten diferentes en persona que en un listado. Las propiedades costeras típicamente requieren un fideicomiso bancario para compradores extranjeros; las propiedades del interior no, aunque otras reglas siguen aplicando. Consulta nuestra guía dedicada de Rentar Versus Comprar para el panorama completo, y siempre confirma las reglas actuales con un notario mexicano antes de cualquier compra.",
        ],
      },
      {
        title: "Reubicación Responsable",
        paragraphs: [
          "Cada uno de estos 25 destinos es una comunidad real y existente, no un lienzo en blanco para recién llegados. Aprender español — incluso español conversacional básico — cambia significativamente la vida diaria y las relaciones en todos los lugares de esta lista, e importa más mientras más te alejas de los pueblos orientados al turismo de la costa caribeña. Apoya negocios de propiedad local sobre cadenas internacionales cuando puedas. Entiende las propias presiones de desarrollo de un pueblo específico antes de comprar, especialmente en lugares de rápido crecimiento como Tulum, Valladolid, Bacalar y El Cuyo — y trata cualquier presentación de 'inversión de moda' u 'oportunidad sin descubrir', dondequiera que la encuentres, con verdadero escepticismo.",
        ],
      },
      {
        title: "Apoyar A Las Comunidades Locales",
        paragraphs: [
          "Mientras más pequeño y remoto sea un destino — especialmente en la región de Joyas Escondidas y los pueblos de trabajo del Interior de Yucatán como Tekax y Tizimín — más directamente afectan tus decisiones diarias a una economía local existente que precede a cualquier interés externo. Comprar en mercados y negocios locales, respetar los medios de vida pesqueros y agrícolas, y abordar las áreas de reserva de biosfera (Celestún, Dzilam de Bravo, El Cuyo, Río Lagartos) con verdadero respeto por su fragilidad ecológica no son extras opcionales — son la diferencia real entre mudarse bien a un lugar y mudarse ahí con descuido.",
        ],
      },
    ],
  },
};

export default function YucatanPeninsulaGuidePage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <ArticleLayout title={t.title} description={t.description} category="2026 Guide">
      <div className="mb-10 flex justify-end">
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
          className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.toggle}
        </button>
      </div>

      {t.sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Section>
      ))}
    </ArticleLayout>
  );
}
