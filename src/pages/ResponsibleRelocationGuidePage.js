import { useState } from "react";
import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";

// V3.2 IMPACT-001 — the Impact page's launch resource (src/pages/ImpactPage.js
// links here). Reuses the existing guide template (ArticleLayout + Section)
// exactly as all 30 other guide pages do. None of those pages are bilingual
// today (ArticleLayout supports a `lang` prop, but no existing guide passes
// changing state through it) — this page adds its own local
// `content = { en, es }` + `useState` + toggle button, the same pattern
// used by every other bilingual page on the site, layered around the
// unmodified shared template rather than changing ArticleLayout.js itself.
const content = {
  en: {
    title: "Responsible Relocation in Mexico",
    description: "A practical, bilingual guide to language, local customs, Maya heritage, the environment, and building real relationships as you build a life in Mexico.",
    category: "Impact",
    toggle: "ES",
    sections: [
      {
        heading: "Why This Guide Exists",
        paragraphs: [
          "Most relocation guides focus on logistics: visas, housing, banking. This one is different. It's about the part that determines whether your move actually feels good a year in — how you show up in the community you're joining.",
          "None of this is about perfection. It's a starting point for the kind of relocation that leaves both you and your new community better off.",
        ],
      },
      {
        heading: "Learn The Language — Even The Basics",
        paragraphs: [
          "You don't need fluency to get started, and plenty of people build a good life in Mexico with limited Spanish. But even conversational Spanish changes how doors open for you — with neighbors, shopkeepers, and local officials alike.",
          "Start before you arrive if you can. Local language exchanges, community classes, and everyday practice with people (not just apps) tend to stick the fastest.",
        ],
      },
      {
        heading: "Respect Local Customs And The Pace Of Life",
        paragraphs: [
          "Mexico runs on a different rhythm than a lot of newcomers are used to — different working hours, different ideas about punctuality and hospitality, different ways of greeting people. Resisting that rhythm is a common source of frustration; leaning into it is usually where people start to feel at home.",
          "Small courtesies go a long way: greeting people before making a request, dressing appropriately for the setting, and taking time for conversation rather than rushing straight to business.",
        ],
      },
      {
        heading: "Support Mexican-Owned Businesses",
        paragraphs: [
          "It's easy to default to familiar international chains and expat-run services, especially early on. Making a habit of choosing Mexican-owned shops, restaurants, and service providers instead — even when it takes a little more effort to find them — keeps more of your spending inside the local economy.",
          "This is also usually where the best food, the most useful local knowledge, and the most genuine connections come from.",
        ],
      },
      {
        heading: "Understand And Appreciate Maya Heritage",
        paragraphs: [
          "The Yucatán Peninsula — Tulum, Playa del Carmen, Mérida, and the smaller towns around them — is Maya land long before it was a relocation destination. Many town and street names carry Maya origins, and Maya communities and traditions are very much alive today, not only in ruins and museums.",
          "Visit archaeological sites with genuine curiosity rather than as a checklist item. Where you can, support Maya-owned guides, artisans, and businesses directly, and take time to learn the region's history beyond the postcard version.",
        ],
      },
      {
        heading: "Protect The Natural Environment",
        paragraphs: [
          "Cenotes, reefs, mangroves, and jungle are fragile, living ecosystems, not backdrops. Simple habits make a real difference: using reef-safe sunscreen, never touching or removing coral or cave formations, packing out your own trash, and following posted guidance at natural sites, even when it's inconvenient.",
          "If you're settling in long-term, consider how your household's water use, waste, and energy habits fit into a region where fresh water in particular is a genuinely limited resource.",
        ],
      },
      {
        heading: "Build Real Relationships In Your Community",
        paragraphs: [
          "It's easy to build a social life entirely within an expat community — comfortable, familiar, and easy to fall into. It's worth deliberately building relationships beyond it too: neighbors, local business owners, people you see regularly who aren't from where you're from.",
          "Those relationships tend to be the ones that make a place feel like home, and they're usually the first ones to help when something actually goes wrong.",
        ],
      },
      {
        heading: "A Note On Legal And Official Requirements",
        paragraphs: [
          "This guide is cultural and practical, not legal or immigration advice. Residency status, work authorization, property ownership, and tax obligations all have real legal requirements that vary by your situation and change over time — see our Temporary Residency and Mexico Residency Support guides, and consult a qualified immigration or tax professional for anything that affects your legal status.",
        ],
      },
      {
        heading: "Final Thoughts",
        paragraphs: [
          "None of this is a checklist to complete once and forget. It's an ongoing way of paying attention — to the people, culture, and land that make life in Mexico what it is.",
          "This guide is part of Impact, Path To Mexico's permanent commitment to responsible relocation. You can read more about that commitment on our Impact page.",
        ],
      },
    ],
  },
  es: {
    title: "Reubicación Responsable en México",
    description: "Una guía práctica y bilingüe sobre idioma, costumbres locales, herencia maya, medio ambiente y cómo construir relaciones reales mientras construyes una vida en México.",
    category: "Impacto",
    toggle: "EN",
    sections: [
      {
        heading: "Por Qué Existe Esta Guía",
        paragraphs: [
          "La mayoría de las guías de reubicación se enfocan en logística: visas, vivienda, bancos. Esta es diferente. Se trata de la parte que determina si tu mudanza realmente se siente bien un año después: cómo te presentas en la comunidad a la que te unes.",
          "Nada de esto se trata de perfección. Es un punto de partida para el tipo de reubicación que deja tanto a ti como a tu nueva comunidad mejor de lo que estaban.",
        ],
      },
      {
        heading: "Aprende El Idioma — Incluso Lo Básico",
        paragraphs: [
          "No necesitas fluidez para empezar, y muchas personas construyen una buena vida en México con español limitado. Pero incluso un español conversacional cambia cómo se abren las puertas para ti, con vecinos, comerciantes y autoridades locales por igual.",
          "Empieza antes de llegar si puedes. Los intercambios de idiomas locales, las clases comunitarias y la práctica cotidiana con personas (no solo con aplicaciones) suelen quedarse mejor.",
        ],
      },
      {
        heading: "Respeta Las Costumbres Locales Y El Ritmo De Vida",
        paragraphs: [
          "México funciona con un ritmo distinto al que muchos recién llegados están acostumbrados — horarios de trabajo diferentes, ideas distintas sobre la puntualidad y la hospitalidad, formas diferentes de saludar. Resistir ese ritmo es una fuente común de frustración; adaptarse a él suele ser el punto donde la gente empieza a sentirse en casa.",
          "Las pequeñas cortesías hacen una gran diferencia: saludar antes de hacer una petición, vestirte apropiadamente para el contexto y tomarte tiempo para conversar en lugar de ir directo al grano.",
        ],
      },
      {
        heading: "Apoya Negocios De Dueños Mexicanos",
        paragraphs: [
          "Es fácil optar por defecto por cadenas internacionales conocidas y servicios manejados por extranjeros, especialmente al principio. Hacer un hábito de elegir tiendas, restaurantes y proveedores de servicios de dueños mexicanos en su lugar — incluso cuando toma un poco más de esfuerzo encontrarlos — mantiene más de tu gasto dentro de la economía local.",
          "Aquí también suele estar la mejor comida, el conocimiento local más útil y las conexiones más genuinas.",
        ],
      },
      {
        heading: "Comprende Y Aprecia La Herencia Maya",
        paragraphs: [
          "La Península de Yucatán — Tulum, Playa del Carmen, Mérida y los pueblos más pequeños a su alrededor — es tierra maya desde mucho antes de ser un destino de reubicación. Muchos nombres de pueblos y calles tienen origen maya, y las comunidades y tradiciones mayas están muy vivas hoy, no solo en ruinas y museos.",
          "Visita los sitios arqueológicos con curiosidad genuina, no como un punto más en una lista. Cuando puedas, apoya directamente a guías, artesanos y negocios mayas, y tómate el tiempo para aprender la historia de la región más allá de la versión de postal.",
        ],
      },
      {
        heading: "Protege El Entorno Natural",
        paragraphs: [
          "Los cenotes, arrecifes, manglares y la selva son ecosistemas frágiles y vivos, no un telón de fondo. Hábitos simples hacen una diferencia real: usar bloqueador solar seguro para los arrecifes, nunca tocar ni remover coral o formaciones en cuevas, llevarte tu propia basura y seguir las indicaciones en los sitios naturales, incluso cuando sea incómodo.",
          "Si te estás estableciendo a largo plazo, considera cómo el uso de agua, los desechos y los hábitos energéticos de tu hogar encajan en una región donde el agua dulce en particular es un recurso genuinamente limitado.",
        ],
      },
      {
        heading: "Construye Relaciones Reales En Tu Comunidad",
        paragraphs: [
          "Es fácil construir una vida social completamente dentro de una comunidad de extranjeros: cómodo, familiar y fácil de adoptar. Vale la pena construir relaciones deliberadamente más allá de ella también: vecinos, dueños de negocios locales, personas que ves regularmente que no son de donde tú eres.",
          "Esas relaciones suelen ser las que hacen que un lugar se sienta como hogar, y usualmente son las primeras en ayudar cuando algo realmente sale mal.",
        ],
      },
      {
        heading: "Una Nota Sobre Requisitos Legales Y Oficiales",
        paragraphs: [
          "Esta guía es cultural y práctica, no asesoría legal o migratoria. El estatus de residencia, la autorización de trabajo, la propiedad y las obligaciones fiscales tienen requisitos legales reales que varían según tu situación y cambian con el tiempo — consulta nuestras guías de Residencia Temporal y Apoyo de Residencia en México, y consulta a un profesional calificado de inmigración o impuestos para todo lo que afecte tu estatus legal.",
        ],
      },
      {
        heading: "Reflexión Final",
        paragraphs: [
          "Nada de esto es una lista para completar una vez y olvidar. Es una forma continua de prestar atención — a las personas, la cultura y la tierra que hacen que la vida en México sea lo que es.",
          "Esta guía es parte de Impacto, el compromiso permanente de Path To Mexico con la reubicación responsable. Puedes leer más sobre ese compromiso en nuestra página de Impacto.",
        ],
      },
    ],
  },
};

export default function ResponsibleRelocationGuidePage() {
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
          </Section>
        ))}
      </ArticleLayout>
    </>
  );
}
