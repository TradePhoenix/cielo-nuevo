// Ask Path knowledge source: FAQ.
//
// Hand-copied from the homepage's FAQ section (src/pages/HomePage.js, both
// the `en` and `es` copy blocks) rather than imported, because that content
// lives as an inline literal inside HomePage.js, not a shared data module —
// extracting it into a shared file would mean editing HomePage.js, which is
// out of this ticket's scope. This is a known, intentional duplication: if
// the homepage FAQ copy changes, this file needs a matching manual update.
// See docs/ask-path/KNOWLEDGE_SOURCES.md.

export const FAQ_RECORDS = [
  {
    id: "faq-what-does-path-to-mexico-help-with",
    q: { en: "What does Path To Mexico actually help with?", es: "¿En qué ayuda realmente Path To Mexico?" },
    a: {
      en: "We help you get from “thinking about Mexico” to a clear, confident plan — matching you to the right region or city, mapping out a realistic 30/60/90-day path, and connecting you with the trusted local professionals (legal, real estate, insurance, and more) you'll actually need along the way. We don't sell real estate, process legal paperwork, or replace licensed advisors ourselves — we coordinate and guide.",
      es: "Te ayudamos a pasar de “estar pensando en México” a tener un plan claro y con confianza: te orientamos hacia la región o ciudad adecuada, trazamos una ruta realista a 30/60/90 días y te conectamos con los profesionales locales de confianza (legales, inmobiliarios, de seguros y más) que realmente necesitarás en el camino. No vendemos bienes raíces ni tramitamos documentos legales nosotros mismos — coordinamos y te acompañamos.",
    },
  },
  {
    id: "faq-how-does-relocation-process-begin",
    q: { en: "How does the relocation process begin?", es: "¿Cómo comienza el proceso de reubicación?" },
    a: {
      en: "Most people start with a Mexico Fit Call ($99 USD, one private conversation about your timeline, goals, and questions) or our free My Mexico Blueprint questionnaire, which can help narrow down where in Mexico might genuinely fit your life. Either way, we build out next steps from what we learn.",
      es: "La mayoría empieza con una Mexico Fit Call ($99 USD, una conversación privada sobre tu cronograma, objetivos y dudas) o con nuestro cuestionario gratuito My Mexico Blueprint, que puede ayudarte a definir en qué parte de México encajaría realmente tu vida. De cualquier forma, construimos los siguientes pasos según lo que descubramos.",
    },
  },
  {
    id: "faq-where-should-i-live",
    q: {
      en: "Can you help me determine where in Mexico I should live?",
      es: "¿Pueden ayudarme a determinar en qué parte de México debería vivir?",
    },
    a: {
      en: "Yes — that's exactly what My Mexico Blueprint is built for. It asks about your priorities (pace of life, budget, climate, community, and more) and matches you against real destinations across the Yucatán Peninsula, with an honest look at trade-offs, not just highlights.",
      es: "Sí — para eso está diseñado My Mexico Blueprint. Te pregunta sobre tus prioridades (ritmo de vida, presupuesto, clima, comunidad y más) y te compara con destinos reales de la Península de Yucatán, con una mirada honesta de los pros y contras, no solo lo atractivo.",
    },
  },
  {
    id: "faq-rent-before-buying",
    q: { en: "Should I rent before buying?", es: "¿Debería rentar antes de comprar?" },
    a: {
      en: "In most cases, yes. Renting for a season or a year gives you a real feel for a place before committing — weather patterns, commute, noise, community — in a way research alone can't. We generally encourage this, though your own timeline and goals may point elsewhere.",
      es: "En la mayoría de los casos, sí. Rentar durante una temporada o un año te permite conocer realmente un lugar antes de comprometerte — el clima, los traslados, el ruido, la comunidad — de una forma que la investigación por sí sola no logra. Por lo general lo recomendamos, aunque tu propio cronograma y objetivos podrían indicar algo distinto.",
    },
  },
  {
    id: "faq-foreigners-buy-property",
    q: {
      en: "Can foreigners legally buy property in Mexico?",
      es: "¿Pueden los extranjeros comprar propiedades legalmente en México?",
    },
    a: {
      en: "Yes, foreigners can own property in Mexico, including within the restricted coastal and border zones, through a bank trust (fideicomiso) or a Mexican corporation, depending on the situation. The exact structure and requirements depend on your circumstances and the property itself, so we connect you with a qualified real estate attorney or notario to confirm what applies to you — we don't handle the transaction ourselves.",
      es: "Sí, los extranjeros pueden ser propietarios en México, incluso dentro de las zonas restringidas costeras y fronterizas, mediante un fideicomiso bancario o una sociedad mexicana, según el caso. La estructura y los requisitos exactos dependen de tu situación y de la propiedad en cuestión, así que te conectamos con un abogado inmobiliario calificado o un notario para confirmar lo que aplica en tu caso — nosotros no gestionamos la transacción directamente.",
    },
  },
  {
    id: "faq-residency-help",
    q: {
      en: "Can you help with temporary or permanent residency?",
      es: "¿Pueden ayudar con la residencia temporal o permanente?",
    },
    a: {
      en: "Yes. We can help you understand the general path — temporary versus permanent residency, income and financial requirements, and what to expect — and connect you with qualified immigration professionals to handle your actual application. Requirements and eligibility can change and vary by consulate, so we always point you to current, qualified guidance rather than guessing.",
      es: "Sí. Podemos ayudarte a entender el camino general — residencia temporal frente a permanente, requisitos de ingresos y financieros, y qué esperar — y conectarte con profesionales de inmigración calificados para gestionar tu solicitud. Los requisitos y la elegibilidad pueden cambiar y variar según el consulado, así que siempre te dirigimos a orientación actual y calificada en lugar de suponer.",
    },
  },
  {
    id: "faq-residency-timeline",
    q: { en: "How long does the residency process usually take?", es: "¿Cuánto suele tardar el proceso de residencia?" },
    a: {
      en: "It varies — by consulate, by residency type, and by your own paperwork readiness. Some people move through it in a few months; others take longer, especially if documents need translation, apostille, or additional review. We help you plan around realistic timelines rather than promise a fixed number.",
      es: "Varía — según el consulado, el tipo de residencia y qué tan listos estén tus documentos. Algunas personas lo resuelven en pocos meses; otras tardan más, especialmente si los documentos requieren traducción, apostilla o revisión adicional. Te ayudamos a planear con cronogramas realistas en lugar de prometer una cifra fija.",
    },
  },
  {
    id: "faq-budget-how-much",
    q: { en: "How much money should I budget for relocating?", es: "¿Cuánto dinero debería presupuestar para mudarme?" },
    a: {
      en: "It depends heavily on where you land and how you live — a quiet interior town and a Caribbean coast city can have very different costs. Beyond day-to-day living, plan for moving costs, initial housing deposits, residency fees, and a comfortable buffer for the unexpected. We can walk through realistic ranges for your specific destinations once we know more about your situation.",
      es: "Depende mucho de dónde te instales y de cómo vivas — un pueblo tranquilo del interior y una ciudad costera del Caribe pueden tener costos muy distintos. Más allá del día a día, considera los costos de la mudanza, los depósitos iniciales de vivienda, los trámites de residencia y un colchón cómodo para lo inesperado. Podemos revisar rangos realistas para tus destinos específicos una vez que conozcamos más sobre tu situación.",
    },
  },
  {
    id: "faq-banking-insurance",
    q: {
      en: "Can you help me open a bank account or obtain insurance?",
      es: "¿Pueden ayudarme a abrir una cuenta bancaria u obtener un seguro?",
    },
    a: {
      en: "Yes — we can point you toward trusted local banks and insurance providers and explain generally what to expect (documentation, residency status requirements, and typical timelines). Actual account opening and policy underwriting are handled directly by those institutions, since requirements and offerings change and vary by provider.",
      es: "Sí — podemos orientarte hacia bancos y aseguradoras locales de confianza y explicarte en términos generales qué esperar (documentación, requisitos según tu estatus migratorio y plazos típicos). La apertura de cuentas y la contratación de pólizas las gestionan directamente esas instituciones, ya que los requisitos y las ofertas cambian y varían según el proveedor.",
    },
  },
  {
    id: "faq-need-spanish",
    q: { en: "Do I need to speak Spanish?", es: "¿Necesito hablar español?" },
    a: {
      en: "Not to get started, and plenty of people build a good life in Mexico with limited Spanish, especially in more international areas. That said, learning even conversational Spanish tends to noticeably deepen the experience and day-to-day ease — we generally encourage it as an ongoing goal, not a prerequisite.",
      es: "No para empezar, y muchas personas construyen una buena vida en México con un español limitado, especialmente en zonas más internacionales. Dicho esto, aprender aunque sea un español conversacional suele profundizar notablemente la experiencia y la facilidad del día a día — generalmente lo recomendamos como una meta continua, no como un requisito previo.",
    },
  },
  {
    id: "faq-is-mexico-safe",
    q: { en: "Is Mexico safe for foreigners?", es: "¿Es México seguro para los extranjeros?" },
    a: {
      en: "Safety varies significantly by region and city, much like anywhere in the world, and conditions can change over time. Many of the areas we focus on have strong track records with foreign residents. We share what we honestly know about each destination, including trade-offs, and always recommend checking current government travel advisories for your own country as part of your research.",
      es: "La seguridad varía significativamente según la región y la ciudad, como en cualquier parte del mundo, y las condiciones pueden cambiar con el tiempo. Muchas de las zonas en las que nos enfocamos tienen un buen historial con residentes extranjeros. Compartimos lo que honestamente sabemos de cada destino, incluyendo sus contras, y siempre recomendamos revisar las advertencias de viaje vigentes de tu propio gobierno como parte de tu investigación.",
    },
  },
  {
    id: "faq-healthcare-insurance",
    q: {
      en: "Can you help with healthcare and private insurance?",
      es: "¿Pueden ayudar con la atención médica y el seguro privado?",
    },
    a: {
      en: "Yes. We can explain the general landscape — public healthcare (IMSS), private hospitals, and private insurance options — and connect you with providers and brokers to review your specific situation. Coverage, cost, and eligibility depend on your age, health, and residency status, so we leave the specifics to licensed providers.",
      es: "Sí. Podemos explicarte el panorama general — el sistema público de salud (IMSS), los hospitales privados y las opciones de seguro privado — y conectarte con proveedores y agentes para revisar tu situación específica. La cobertura, el costo y la elegibilidad dependen de tu edad, tu salud y tu estatus migratorio, así que dejamos los detalles a los proveedores autorizados.",
    },
  },
  {
    id: "faq-bringing-pets",
    q: { en: "Can I bring my pets to Mexico?", es: "¿Puedo llevar a mis mascotas a México?" },
    a: {
      en: "Generally, yes — Mexico's import requirements for pets are more straightforward than many countries, typically a health certificate and up-to-date vaccinations. Requirements can shift, so we recommend confirming current rules with a vet and your airline shortly before travel, and we're happy to point you to that current guidance.",
      es: "Por lo general, sí — los requisitos de México para importar mascotas son más sencillos que en muchos países, normalmente un certificado de salud y vacunas al día. Los requisitos pueden cambiar, así que recomendamos confirmar las reglas vigentes con un veterinario y tu aerolínea poco antes de viajar, y con gusto te orientamos hacia esa información actual.",
    },
  },
  {
    id: "faq-who-do-you-support",
    q: {
      en: "Do you support families, remote workers, retirees, and entrepreneurs?",
      es: "¿Apoyan a familias, trabajadores remotos, jubilados y emprendedores?",
    },
    a: {
      en: "Yes, and beyond that — we work with people from many countries and life stages, not just retirees or one nationality. Whatever brings you to Mexico, our job is to understand your specific situation and point you toward what actually fits it.",
      es: "Sí, y más allá de eso — trabajamos con personas de muchos países y etapas de vida, no solo con jubilados o una nacionalidad en particular. Sea lo que sea lo que te traiga a México, nuestro trabajo es entender tu situación específica y orientarte hacia lo que realmente encaja con ella.",
    },
  },
  {
    id: "faq-what-happens-after-arrival",
    q: { en: "What happens after I arrive?", es: "¿Qué pasa después de que llego?" },
    a: {
      en: "That depends on what you've already set up before landing, but we stay involved — helping with local orientation, connecting you to community, and following up on the practical threads (banking, residency, housing) that are often still in motion after the move itself.",
      es: "Depende de lo que ya hayas resuelto antes de llegar, pero seguimos presentes — ayudándote con la orientación local, conectándote con la comunidad y dando seguimiento a los asuntos prácticos (cuentas bancarias, residencia, vivienda) que muchas veces siguen en proceso después de la mudanza.",
    },
  },
  {
    id: "faq-cost-of-services",
    q: { en: "How much do your services cost?", es: "¿Cuánto cuestan sus servicios?" },
    a: {
      en: "It depends on the level of support you need, from a single $99 USD Mexico Fit Call to a fully guided relocation. We'll walk through pricing clearly during that first call, with no obligation to continue — or start with our free My Mexico Blueprint questionnaire if you're not ready to book a call yet.",
      es: "Depende del nivel de apoyo que necesites, desde una sola Mexico Fit Call de $99 USD hasta una reubicación totalmente acompañada. Te explicaremos los costos con claridad durante esa primera llamada, sin ningún compromiso de continuar — o empieza con nuestro cuestionario gratuito My Mexico Blueprint si aún no estás listo para agendar una llamada.",
    },
  },
  // PTM — Spanish Parity, Spacing & FAQ pass: six new questions, added to
  // both HomePage.js (16 -> 22 questions) and here at the same time, kept
  // in sync deliberately — see docs/ask-path/KNOWLEDGE_SOURCES.md.
  {
    id: "faq-plan-before-residency",
    q: {
      en: "Can I start planning my move before I have residency sorted out?",
      es: "¿Puedo empezar a planear mi mudanza antes de resolver la residencia?",
    },
    a: {
      en: "Yes — most people do. Exploring destinations, understanding budgets, and building a rough timeline don't require residency in hand. My Mexico Blueprint and a Mexico Fit Call are both built for exactly this stage, so residency becomes one part of a plan you're already building rather than the first hurdle you have to clear.",
      es: "Sí — la mayoría de las personas lo hace así. Explorar destinos, entender presupuestos y armar un cronograma aproximado no requiere tener la residencia en mano. My Mexico Blueprint y una Mexico Fit Call están pensados exactamente para esta etapa, para que la residencia sea una parte más de un plan que ya estás construyendo, no el primer obstáculo que debes resolver.",
    },
  },
  {
    id: "faq-vehicle-purchase",
    q: {
      en: "Can I buy, register, and insure a car in Mexico?",
      es: "¿Puedo comprar, registrar y asegurar un auto en México?",
    },
    a: {
      en: "Yes. Foreigners can buy a vehicle in Mexico with valid residency status (rules vary for tourist-visa visitors bringing a foreign-plated car temporarily). Registration and insurance work differently than in many home countries — insurance in particular is essential and not always mandatory by law depending on the state, which makes it easy to skip by mistake. We can point you toward what to expect and trusted local contacts; the actual purchase, registration, and policy are handled directly with dealers, government offices, and insurers.",
      es: "Sí. Los extranjeros pueden comprar un vehículo en México con un estatus migratorio válido (las reglas varían para quienes visitan con visa de turista y traen un auto con placas extranjeras de forma temporal). El registro y el seguro funcionan distinto que en muchos países de origen — el seguro en particular es esencial y no siempre es obligatorio por ley según el estado, lo cual hace fácil pasarlo por alto sin querer. Podemos orientarte sobre qué esperar y conectarte con contactos locales de confianza; la compra, el registro y la póliza en sí se gestionan directamente con agencias, oficinas de gobierno y aseguradoras.",
    },
  },
  {
    id: "faq-taxes",
    q: {
      en: "Do I have to pay taxes in Mexico, and will I be taxed twice?",
      es: "¿Tengo que pagar impuestos en México, y me cobrarán impuestos dos veces?",
    },
    a: {
      en: "It depends on your residency status, income sources, and your home country's own tax rules and any tax treaty with Mexico — this is genuinely one of the areas where a qualified cross-border tax professional matters most, not general guidance. We can explain the general landscape (tax residency and immigration residency are not the same thing) and connect you with a qualified accountant familiar with your specific situation, but we don't provide tax advice ourselves.",
      es: "Depende de tu estatus de residencia, tus fuentes de ingreso y las propias reglas fiscales de tu país de origen, además de cualquier tratado fiscal con México — esta es genuinamente una de las áreas donde más importa un profesional fiscal transfronterizo calificado, no una orientación general. Podemos explicarte el panorama general (la residencia fiscal y la residencia migratoria no son lo mismo) y conectarte con un contador calificado que conozca tu situación específica, pero nosotros no damos asesoría fiscal.",
    },
  },
  {
    id: "faq-transfer-money",
    q: {
      en: "What's the best way to transfer money to Mexico or move funds between accounts?",
      es: "¿Cuál es la mejor forma de transferir dinero a México o mover fondos entre cuentas?",
    },
    a: {
      en: "Most people use a mix of international wire transfers, transfer services designed for cross-border payments, and eventually a Mexican bank account once residency is in place. Fees, exchange rates, and transfer limits vary a lot between banks and services, so it's worth comparing before committing to one for anything ongoing. We can point you toward what's worked for others and trusted local contacts; the transfers themselves go through your own bank or provider.",
      es: "La mayoría combina transferencias bancarias internacionales, servicios de transferencia diseñados para pagos transfronterizos y, eventualmente, una cuenta bancaria mexicana una vez que la residencia está en trámite o resuelta. Las comisiones, tipos de cambio y límites de transferencia varían mucho entre bancos y servicios, así que vale la pena comparar antes de comprometerte con uno para algo recurrente. Podemos orientarte sobre lo que le ha funcionado a otros y conectarte con contactos locales de confianza; las transferencias en sí las gestionas con tu propio banco o proveedor.",
    },
  },
  {
    id: "faq-bringing-belongings",
    q: {
      en: "Can I bring my furniture and personal belongings when I move?",
      es: "¿Puedo traer mis muebles y pertenencias personales cuando me mude?",
    },
    a: {
      en: "Yes — many people bring a container or partial shipment of household goods, while others sell most things and start fresh, furnishing locally instead. A household goods import (menaje de casa) has its own paperwork and, done correctly, can mean reduced or no import duties on personal items — but the rules are specific about timing and documentation. We can point you toward what to expect and trusted moving and customs contacts; the shipment and customs process itself is handled by licensed movers and brokers.",
      es: "Sí — muchas personas traen un contenedor o un envío parcial de menaje de casa, mientras que otras venden la mayoría de sus cosas y empiezan de nuevo, amueblando localmente. El menaje de casa tiene sus propios trámites y, hecho correctamente, puede significar aranceles de importación reducidos o nulos en artículos personales — pero las reglas son específicas sobre tiempos y documentación. Podemos orientarte sobre qué esperar y conectarte con contactos de confianza de mudanzas y aduanas; el envío y el proceso aduanal en sí los gestionan agentes aduanales y empresas de mudanza con licencia.",
    },
  },
  {
    id: "faq-internet-remote-work",
    q: {
      en: "Is the internet reliable enough to work remotely from Mexico?",
      es: "¿Es el internet lo suficientemente confiable para trabajar remotamente desde México?",
    },
    a: {
      en: "In most of the destinations we cover, yes — fiber and reliable mobile data are common, especially in more established towns, and coworking spaces are increasingly available. Reliability varies more in smaller, more remote destinations, where a backup connection (a second provider or a mobile hotspot) is a genuinely good idea rather than overkill. We're happy to point you toward what to expect in your specific destination.",
      es: "En la mayoría de los destinos que cubrimos, sí — la fibra óptica y los datos móviles confiables son comunes, especialmente en pueblos más consolidados, y cada vez hay más espacios de coworking disponibles. La confiabilidad varía más en destinos más pequeños y remotos, donde tener una conexión de respaldo (un segundo proveedor o un hotspot móvil) es genuinamente una buena idea, no una exageración. Con gusto te orientamos sobre qué esperar en tu destino específico.",
    },
  },
];

export function buildFaqRecords() {
  return FAQ_RECORDS.map((item) => ({
    id: item.id,
    title: { en: item.q.en, es: item.q.es },
    category: "faq",
    route: "/#faq",
    lastReviewed: "2026-07-26",
    keywords: [],
    content: { en: item.a.en, es: item.a.es },
  }));
}
