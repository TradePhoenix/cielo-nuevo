import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const content = {
  en: {
    nav: ["Home", "Story", "Signal", "Relocation", "Work", "Guides", "Process", "Trust", "FAQ", "Contact"],
    heroLocation: "Riviera Maya • Mexico",
    heroTitle: "PATH TO MEXICO",
    heroSignal: "[ CIELO NUEVO ]",
    heroHook1: "Not everyone is meant to stay",
    heroHook2: "where they started.",
    heroSubtext:
      "A different rhythm of life awaits in Mexico. Path To Mexico helps people explore relocation, lifestyle, trusted local connections, and the deeper possibility of beginning again.",
    explore: "Explore Further",
    start: "Start The Conversation",

    founderLabel: "Founder Story",
    founderTitle: "Meet Kalen — Founder of Path To Mexico",
    founderIntro:
      "Path To Mexico was not created from theory. It was built from lived experience.",
    founderParagraphs: [
      "I never planned on building a relocation business. I simply made a decision that changed my own life.",
      "After spending most of my life in Canada, I reached a point where I felt something was missing. On paper, things looked fine, but deep down I knew I wanted a different experience of life.",
      "More freedom. More sunshine. More connection. More time spent living, and less time spent waiting for life to begin.",
      "So I packed up what I could, left British Columbia behind, and moved to Mexico.",
      "Like most major life decisions, it was not as simple or as glamorous as social media makes it look. There were questions about residency, banking, healthcare, housing, legal paperwork, and figuring out who could actually be trusted.",
      "Some things were easier than I expected. Others were much harder. But somewhere along the way, something shifted.",
      "Life slowed down. I started walking more. Spending more time outdoors. Meeting people from all over the world. Enjoying simple things again.",
      "Fresh food. Ocean air. Conversations that were not rushed. Days that felt less scheduled and more lived.",
      "Mexico did not solve all my problems. No place can do that. But it gave me something I did not realize I was looking for: perspective.",
      "It reminded me that there is not only one way to live.",
      "Since moving here, friends, family members, and complete strangers have reached out asking the same questions:"
    ],
    founderQuestions: ["How did you do it?", "Where should I live?", "What is the real cost?", "Who can I trust?"],
    founderClosing:
      "That is what eventually led to Path To Mexico. Not as a corporate relocation company, but as a trusted guide built from real experience.",
    founderClosing2:
      "Today, I help connect people with reliable local professionals, share what I have learned, and help others explore whether life in Mexico might be right for them.",
    founderQuote:
      "Some people come here for a vacation. Others come here looking for something they have not quite found yet.",
    founderFinal:
      "If you are considering a move to Mexico, I would be happy to help you explore what is possible.",
    founderSignature: "— Kalen Enns",
    founderRole: "Founder, Path To Mexico",

    testimonialsLabel: "Testimonials",
    testimonialsTitle1: "Trusted guidance.",
    testimonialsTitle2: "Real conversations.",
    testimonials: [
      [
        "Kalen gave us more clarity in one conversation than weeks of online research. We finally understood what our options actually were.",
        "Future Relocation Client"
      ],
      [
        "What stood out was the honesty. There was no pressure, no sales pitch, just practical advice from someone who had already been through it.",
        "Prospective Client"
      ],
      [
        "Moving countries felt overwhelming until we had someone on the ground who could point us in the right direction and connect us with trusted people.",
        "Playa Relocation Inquiry"
      ]
    ],

    manifestoLabel: "Before People Ask How",
    manifestoTitle: "A different country is rarely just about geography.",
    manifestoText:
      "People arrive searching for better weather, more space, lower costs, or a fresh start. What they often discover is something quieter: time, possibility, and the feeling that life can still change.",

    signalLabel: "The Inner Shift",
    signalTitle: "The Arrival Is Not The Beginning. It Is The Threshold.",
    signalText:
      "Path To Mexico is for the ones who can feel the old rhythm losing its grip. Underneath the paperwork, flights, rentals, and decisions, something deeper is happening: a private departure from the life that no longer fits.",
    signalPoints: ["Less noise.", "More space.", "A softer rhythm.", "A life that feels chosen."],

    atmosphereLabel: "The World Beneath The Logistics",
    atmosphereTitle: "Hidden sanctuary. Quiet architecture. A life with more oxygen.",
    atmosphereText:
      "The strongest moves do not always announce themselves. Sometimes they begin with a room full of warm light, a street you do not know yet, a morning without the old pressure, and the strange calm of realizing you are allowed to begin again.",

    servicesLabel: "The Practical Layer",
    servicesTitle: "Relocation Without The Noise",
    servicesText:
      "Once the inner decision is made, the practical path matters. Path To Mexico helps people step into life in Mexico through trusted local connections, real estate guidance, residency support, and grounded on-the-ground clarity.",
    services: [
      ["Relocation Guidance", "Step-by-step support for settling into Playa del Carmen with confidence."],
      ["Real Estate Connections", "Trusted introductions for rentals, condos, investment properties, and local opportunities."],
      ["Residency Support", "Guidance toward the right professionals for residency, paperwork, and local setup."]
    ],

    workLabel: "Work With Me",
    workTitle1: "Moving countries is a big decision.",
    workTitle2: "You don't have to figure it out alone.",
    workText:
      "Whether you're simply exploring the possibility or preparing to make the move, Path To Mexico provides clear guidance, trusted introductions, and real-world insight from someone who has already walked the path.",
    workOffers: [
      [
        "Mexico Fit Call",
        "$99 USD",
        "A private one-on-one conversation designed to answer your questions, provide honest insight, and help you understand what moving to Mexico could realistically look like for you.",
        "Perfect for people still exploring the idea, researching costs, residency options, neighborhoods, lifestyle questions, and next steps.",
        "Book Mexico Fit Call"
      ],
      [
        "Relocation Roadmap",
        "Starting at $499 USD",
        "A personalized relocation strategy built around your goals, timeline, budget, lifestyle preferences, and long-term vision for life in Mexico.",
        "Ideal for individuals, couples, families, retirees, entrepreneurs, and remote workers who want a clear roadmap before making major decisions.",
        "Apply For Roadmap"
      ],
      [
        "Guided Landing",
        "Custom Quote",
        "Private concierge-style relocation support designed for people who want hands-on guidance, trusted introductions, and ongoing assistance throughout the relocation process.",
        "Best for families, professionals, investors, business owners, and anyone seeking a highly personalized experience.",
        "Schedule A Conversation"
      ]
    ],
    bestFor: "Best For",

    lifestyleLabel: "Riviera Maya Living",
    lifestyleTitle: "A Softer Landing Into A Bigger Life",
    lifestyleText:
      "Relocating is more than finding a place to stay. It is understanding neighborhoods, lifestyle, timing, paperwork, people, and the quiet details that make a new country feel like home.",
    lifestyleLine: "A different rhythm of life.",

    processLabel: "How It Works",
    processTitle: "From First Conversation To Feeling Settled",
    process: [
      ["01", "Talk", "We start with your goals, budget, timeline, and what kind of life you want in Mexico."],
      ["02", "Plan", "We map out your best relocation path, including neighborhoods, rentals, residency, and priorities."],
      ["03", "Connect", "We introduce you to trusted local professionals, agents, and service providers."],
      ["04", "Settle", "You arrive with more clarity, fewer surprises, and people already on the ground."]
    ],

    trustLabel: "Trust & Clarity",
    trustTitle: "Not everyone is meant to stay where they started.",
    trust1:
      "Path To Mexico acts as a trusted connector and relocation guide, helping you find the right people, places, and next steps in Playa del Carmen.",
    trust2:
      "For legal, immigration, tax, and real estate transactions, we connect clients with qualified local professionals so each step is handled properly.",
    trust3: "Simple promise: clearer options, better introductions, and a smoother landing in Mexico.",

    stats: [
      ["100+", "Conversations"],
      ["Playa", "Local Focus"],
      ["24/7", "Guidance"],
      ["Real", "Connections"]
    ],

    whoTitle: "Built For People Ready For A Different Life",
    whoText:
      "Whether you are coming from Canada, the United States, or somewhere else, Path To Mexico helps you understand your options and connect with the right people on the ground.",
    tags: ["Canadians", "Americans", "Digital Nomads", "Retirees", "Investors", "Families", "Remote Workers", "Freedom Seekers"],

    faqLabel: "Common Questions",
    faqTitle: "Before You Make The Move",
    faqs: [
      ["Do you only help Canadians?", "No. We mainly support Canadians and Americans, but we can help people from anywhere explore relocation to Playa del Carmen."],
      ["Do you sell real estate directly?", "We connect people with trusted local professionals. For legal contracts and real estate transactions, clients work with qualified experts."],
      ["Can you help with residency?", "Yes. We can help you understand the general path and connect you with the right professionals for immigration and paperwork."],
      ["Is this only for retirees?", "No. We support retirees, investors, remote workers, digital nomads, families, and people looking for a different lifestyle."]
    ],

    contactTitle: "Tell Us What You’re Looking For",
    contactText:
      "Send a few details and we’ll help you understand the best path toward relocation, lifestyle, real estate, and opportunity in Playa del Carmen.",
    formSuccess: "Thanks — your inquiry was sent. We’ll be in touch soon.",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Riviera Maya • Mexico"
  },

  es: {
    nav: ["Inicio", "Historia", "Señal", "Reubicación", "Trabajar", "Guías", "Proceso", "Confianza", "FAQ", "Contacto"],
    heroLocation: "Riviera Maya • México",
    heroTitle: "PATH TO MEXICO",
    heroSignal: "[ CIELO NUEVO ]",
    heroHook1: "No todos están destinados",
    heroHook2: "a quedarse donde empezaron.",
    heroSubtext:
      "Un ritmo de vida diferente te espera en México. Path To Mexico ayuda a explorar reubicación, estilo de vida, conexiones locales confiables y la posibilidad más profunda de empezar otra vez.",
    explore: "Entrar A La Señal",
    start: "Iniciar Conversación",

    founderLabel: "Historia Del Fundador",
    founderTitle: "Conoce A Kalen",
    founderIntro:
      "Path To Mexico no nació de una teoría. Nació de una experiencia real.",
    founderParagraphs: [
      "Nunca planeé construir un negocio de reubicación. Simplemente tomé una decisión que cambió mi propia vida.",
      "Después de pasar la mayor parte de mi vida en Canadá, llegué a un punto en el que sentía que algo faltaba. En papel, todo parecía estar bien, pero en el fondo sabía que quería una experiencia de vida diferente.",
      "Más libertad. Más sol. Más conexión. Más tiempo viviendo, y menos tiempo esperando que la vida comenzara.",
      "Así que empaqué lo que pude, dejé British Columbia atrás y me mudé a México.",
      "Como muchas decisiones importantes, no fue tan simple ni tan glamuroso como parece en redes sociales. Había preguntas sobre residencia, bancos, salud, vivienda, documentos legales y cómo encontrar personas en quienes realmente pudiera confiar.",
      "Algunas cosas fueron más fáciles de lo que esperaba. Otras fueron mucho más difíciles. Pero en algún punto, algo cambió.",
      "La vida bajó de velocidad. Empecé a caminar más. Pasar más tiempo afuera. Conocer personas de todo el mundo. Disfrutar otra vez de las cosas simples.",
      "Comida fresca. Aire del mar. Conversaciones sin prisa. Días que se sentían menos programados y más vividos.",
      "México no resolvió todos mis problemas. Ningún lugar puede hacer eso. Pero me dio algo que no sabía que estaba buscando: perspectiva.",
      "Me recordó que no existe una sola forma de vivir.",
      "Desde que me mudé aquí, amigos, familiares y personas que no conocía empezaron a hacerme las mismas preguntas:"
    ],
    founderQuestions: ["¿Cómo lo hiciste?", "¿Dónde debería vivir?", "¿Cuál es el costo real?", "¿En quién puedo confiar?"],
    founderClosing:
      "Eso fue lo que eventualmente llevó a Path To Mexico. No como una empresa corporativa de reubicación, sino como una guía confiable construida desde la experiencia real.",
    founderClosing2:
      "Hoy ayudo a conectar personas con profesionales locales confiables, comparto lo que he aprendido y ayudo a otros a explorar si la vida en México puede ser adecuada para ellos.",
    founderQuote:
      "Algunas personas vienen de vacaciones. Otras vienen buscando algo que todavía no han encontrado.",
    founderFinal:
      "Si estás considerando mudarte a México, me encantaría ayudarte a explorar lo que es posible.",
    founderSignature: "— Kalen Enns",
    founderRole: "Fundador, Path To Mexico",

    testimonialsLabel: "Testimonios",
    testimonialsTitle1: "Guía confiable.",
    testimonialsTitle2: "Conversaciones reales.",
    testimonials: [
      [
        "Kalen nos dio más claridad en una conversación que semanas de investigación en internet. Por fin entendimos cuáles eran nuestras opciones reales.",
        "Futuro Cliente De Reubicación"
      ],
      [
        "Lo que más destacó fue la honestidad. No hubo presión ni venta agresiva, solo consejos prácticos de alguien que ya había pasado por el proceso.",
        "Cliente Potencial"
      ],
      [
        "Mudarse de país se sentía abrumador hasta que tuvimos a alguien en el terreno que nos orientó y nos conectó con personas confiables.",
        "Consulta De Reubicación En Playa"
      ]
    ],

    manifestoLabel: "Antes De Preguntar Cómo",
    manifestoTitle: "Un país diferente casi nunca se trata solo de geografía.",
    manifestoText:
      "Las personas llegan buscando mejor clima, más espacio, menores costos o un nuevo comienzo. Lo que muchas veces descubren es algo más silencioso: tiempo, posibilidad y la sensación de que la vida todavía puede cambiar.",

    signalLabel: "Señal 001",
    signalTitle: "La llegada no es el comienzo. Es el umbral.",
    signalText:
      "Path To Mexico es para quienes sienten que el ritmo anterior ya no les pertenece. Debajo de los documentos, vuelos, rentas y decisiones, ocurre algo más profundo: una salida privada de una vida que ya no encaja.",
    signalPoints: ["Menos ruido.", "Más espacio.", "Un ritmo más suave.", "Una vida elegida."],

    atmosphereLabel: "El Mundo Debajo De La Logística",
    atmosphereTitle: "Santuario oculto. Arquitectura tranquila. Una vida con más oxígeno.",
    atmosphereText:
      "Los movimientos más importantes no siempre se anuncian. A veces empiezan con una habitación llena de luz cálida, una calle que todavía no conoces, una mañana sin la presión antigua y la calma extraña de darte cuenta de que puedes empezar otra vez.",

    servicesLabel: "La Capa Práctica",
    servicesTitle: "Reubicación Sin Ruido",
    servicesText:
      "Una vez tomada la decisión interna, el camino práctico importa. Path To Mexico ayuda con conexiones locales confiables, guía inmobiliaria, apoyo de residencia y claridad real en el terreno.",
    services: [
      ["Guía De Reubicación", "Apoyo paso a paso para establecerte en Playa del Carmen con confianza."],
      ["Conexiones Inmobiliarias", "Introducciones confiables para rentas, condominios, propiedades de inversión y oportunidades locales."],
      ["Apoyo De Residencia", "Orientación hacia profesionales adecuados para residencia, documentos y trámites locales."]
    ],

    workLabel: "Trabaja Conmigo",
    workTitle1: "Mudarse de país es una gran decisión.",
    workTitle2: "No tienes que resolverlo todo solo.",
    workText:
      "Ya sea que estés explorando la posibilidad o preparándote para mudarte, Path To Mexico ofrece guía clara, conexiones confiables y perspectiva real de alguien que ya ha recorrido ese camino.",
    workOffers: [
      [
        "Llamada De Descubrimiento",
        "$99 USD",
        "Una conversación privada uno a uno para responder tus preguntas, darte perspectiva honesta y ayudarte a entender cómo podría verse realmente una mudanza a México para ti.",
        "Perfecto para personas que están explorando la idea, investigando costos, opciones de residencia, zonas, estilo de vida y próximos pasos.",
        "Reservar Llamada"
      ],
      [
        "Blueprint De Reubicación",
        "Desde $499 USD",
        "Una estrategia personalizada de reubicación construida alrededor de tus metas, tiempos, presupuesto, preferencias de vida y visión a largo plazo en México.",
        "Ideal para individuos, parejas, familias, jubilados, emprendedores y trabajadores remotos que quieren un plan claro antes de tomar grandes decisiones.",
        "Aplicar Al Blueprint"
      ],
      [
        "Reubicación White Glove",
        "Cotización Personalizada",
        "Apoyo privado estilo concierge para personas que quieren guía práctica, conexiones confiables y acompañamiento durante el proceso de reubicación.",
        "Ideal para familias, profesionales, inversionistas, dueños de negocios y personas que buscan una experiencia altamente personalizada.",
        "Agendar Conversación"
      ]
    ],
    bestFor: "Ideal Para",

    lifestyleLabel: "Vida En La Riviera Maya",
    lifestyleTitle: "Una Llegada Más Suave A Una Vida Más Grande",
    lifestyleText:
      "Mudarse es más que encontrar un lugar para vivir. Es entender zonas, estilo de vida, tiempos, documentos, personas y los detalles que hacen que un nuevo país se sienta como hogar.",
    lifestyleLine: "Un ritmo de vida diferente.",

    processLabel: "Cómo Funciona",
    processTitle: "De La Primera Conversación A Sentirte Establecido",
    process: [
      ["01", "Hablar", "Empezamos con tus metas, presupuesto, tiempo y el tipo de vida que quieres en México."],
      ["02", "Planear", "Diseñamos tu mejor camino de reubicación: zonas, rentas, residencia y prioridades."],
      ["03", "Conectar", "Te presentamos profesionales locales, agentes y proveedores de confianza."],
      ["04", "Establecerte", "Llegas con más claridad, menos sorpresas y personas listas para ayudarte."]
    ],

    trustLabel: "Confianza & Claridad",
    trustTitle: "No todos están destinados a quedarse donde empezaron.",
    trust1:
      "Path To Mexico funciona como guía y conector confiable para ayudarte a encontrar las personas, lugares y próximos pasos adecuados en Playa del Carmen.",
    trust2:
      "Para temas legales, migratorios, fiscales e inmobiliarios, conectamos a los clientes con profesionales locales calificados.",
    trust3: "Promesa simple: opciones más claras, mejores conexiones y una llegada más tranquila a México.",

    stats: [
      ["100+", "Conversaciones"],
      ["Playa", "Enfoque Local"],
      ["24/7", "Guía"],
      ["Real", "Conexiones"]
    ],

    whoTitle: "Hecho Para Personas Listas Para Una Vida Diferente",
    whoText:
      "Ya vengas de Canadá, Estados Unidos u otro lugar, Path To Mexico te ayuda a entender tus opciones y conectar con las personas correctas en el terreno.",
    tags: ["Canadienses", "Americanos", "Nómadas Digitales", "Jubilados", "Inversionistas", "Familias", "Trabajadores Remotos", "Buscadores De Libertad"],

    faqLabel: "Preguntas Comunes",
    faqTitle: "Antes De Mudarte",
    faqs: [
      ["¿Solo ayudan a canadienses?", "No. Principalmente apoyamos a canadienses y estadounidenses, pero podemos ayudar a personas de cualquier lugar."],
      ["¿Venden bienes raíces directamente?", "Conectamos a las personas con profesionales locales confiables. Para contratos y transacciones, los clientes trabajan con expertos calificados."],
      ["¿Pueden ayudar con residencia?", "Sí. Podemos ayudarte a entender el camino general y conectarte con profesionales adecuados."],
      ["¿Es solo para jubilados?", "No. Apoyamos jubilados, inversionistas, trabajadores remotos, nómadas digitales, familias y personas buscando otro estilo de vida."]
    ],

    contactTitle: "Cuéntanos Qué Estás Buscando",
    contactText:
      "Envía algunos detalles y te ayudaremos a entender el mejor camino hacia reubicación, estilo de vida, bienes raíces y oportunidad en Playa del Carmen.",
    formSuccess: "Gracias — tu consulta fue enviada. Te contactaremos pronto.",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Riviera Maya • México"
  }
};

function LeadForm({ t }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  if (state.succeeded) {
    return (
      <div className="rounded-none border border-white/10 bg-white p-8 text-center text-black shadow-xl">
        <h3 className="mb-4 text-3xl font-semibold tracking-tight">Message Sent</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-3xl gap-5 text-left">
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="name" placeholder="Full Name" required />
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="email" name="email" placeholder="Email Address" required />
      <ValidationError field="email" errors={state.errors} />
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="country" placeholder="Current Country" />
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="timeline" placeholder="Ideal Timeline" />
      <textarea className="min-h-36 border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" name="message" placeholder="What do you need help with?" required />
      <ValidationError field="message" errors={state.errors} />

      <button disabled={state.submitting} className="border border-white bg-white px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-transparent hover:text-white disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

function ImagePanel({ src, label, sublabel }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden sm:min-h-[500px] md:min-h-[620px]">
      <img
        src={src}
        alt={label}
        onError={(event) => {
          event.currentTarget.src = "/hero.jpg";
        }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.28em] text-white/45">
        <p>{label}</p>
        <p>{sublabel}</p>
      </div>
    </div>
  );
}

function FounderStory({ t }) {
  return (
    <section id="story" className="bg-[#0b0b0a] px-6 py-20 text-white md:px-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mx-auto grid max-w-6xl gap-12 border-t border-white/10 pt-12 md:grid-cols-[0.85fr_1.15fr]"
      >
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.founderLabel}</p>
          <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.founderTitle}
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-white/55 sm:text-xl">
            {t.founderIntro}
          </p>

          <div className="mt-10 max-w-sm md:sticky md:top-28">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="/kalen.jpg"
                alt="Kalen Enns, founder of Path To Mexico"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 border border-white/10 bg-white/5 p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Built From Lived Experience
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Path To Mexico was created from actually making the move, learning the process, and building real connections on the ground.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-white/60">
          {t.founderParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="border-l border-white/15 pl-6 text-white/80">
            {t.founderQuestions.map((question) => (
              <p key={question}>{question}</p>
            ))}
          </div>

          <p>{t.founderClosing}</p>
          <p>{t.founderClosing2}</p>

          <p className="pt-4 text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
            {t.founderQuote}
          </p>

          <p>{t.founderFinal}</p>

          <p className="pt-6 text-white/45">
            {t.founderSignature}
            <br />
            {t.founderRole}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Testimonials({ t }) {
  return (
    <section className="bg-[#080807] px-6 py-20 text-white md:px-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl border-t border-white/10 pt-12"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
          {t.testimonialsLabel}
        </p>

        <h2 className="mb-14 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">
          {t.testimonialsTitle1}
          <br />
          {t.testimonialsTitle2}
        </h2>

        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {t.testimonials.map(([quote, name]) => (
            <div key={quote} className="bg-[#080807] p-8 transition hover:bg-[#11110f]">
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                “{quote}”
              </p>

              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                {name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block border border-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-white hover:text-black"
          >
            Share Your Experience
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function WorkWithMe({ t }) {
  return (
    <section id="work" className="bg-[#f4f0e8] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
          {t.workLabel}
        </p>

        <h2 className="mb-7 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">
          {t.workTitle1}
          <br />
          {t.workTitle2}
        </h2>

        <p className="mb-14 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
          {t.workText}
        </p>

        <div className="grid gap-px bg-zinc-300 md:grid-cols-3">
          {t.workOffers.map(([title, price, text, bestFor, cta]) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              className="flex min-h-[500px] flex-col justify-between bg-[#f4f0e8] p-7 transition hover:bg-white"
            >
              <div>
                <h3 className="mb-3 text-3xl font-light tracking-[-0.04em]">
                  {title}
                </h3>

                <p className="mb-6 text-sm uppercase tracking-[0.25em] text-zinc-500">
                  {price}
                </p>

                <p className="mb-7 leading-relaxed text-zinc-600">
                  {text}
                </p>

                <div className="border-t border-zinc-300 pt-6">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    {t.bestFor}
                  </p>

                  <p className="leading-relaxed text-zinc-600">
                    {bestFor}
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="mt-9 inline-block border border-zinc-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white"
              >
                {cta}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function HomePage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  const navLinks = ["#home", "#story", "#signal", "#relocation", "#work", "/guides", "#process", "#trust", "#faq", "#contact"];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080807] text-zinc-100 scroll-smooth">
      <section id="home" className="relative min-h-[100svh] overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Cinematic hidden sanctuary in the Riviera Maya"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-black/72"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-[#080807]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),transparent_65%)]"></div>
        </div>

        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-md md:px-10">
          <a href="#home" className="max-w-[210px] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 transition hover:opacity-70 sm:max-w-none sm:text-xs sm:tracking-[0.45em]">
            Path To Mexico
          </a>

          <div className="hidden gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40 lg:flex">
            {t.nav.map((item, index) => (
              <a key={item} className="transition hover:text-white" href={navLinks[index]}>
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="shrink-0 border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:bg-white hover:text-black sm:px-4 sm:text-xs">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </nav>

        <div className="relative z-10 flex min-h-[100svh] items-center px-5 pb-16 pt-28 md:px-16">
          <motion.div initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: "easeOut" }} className="max-w-6xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-xs sm:tracking-[0.55em]">{t.heroLocation}</p>
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:text-xs sm:tracking-[0.45em]">{t.heroSignal}</p>

            <h1 className="max-w-full break-words text-[2.75rem] font-medium uppercase leading-[0.92] tracking-[-0.055em] sm:text-[4rem] md:text-[8rem] lg:text-[11rem]">
              {t.heroTitle}
            </h1>

            <div className="mt-8 h-px w-24 bg-white/30 sm:w-32"></div>

            <p className="mt-10 max-w-4xl text-2xl font-light leading-tight tracking-[-0.04em] text-white sm:text-3xl md:text-6xl">
              {t.heroHook1}
              <br />
              {t.heroHook2}
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
              {t.heroSubtext}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#signal" className="border border-white bg-white px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-transparent hover:text-white">
                {t.explore}
              </a>
              <a href="#contact" className="border border-white/30 px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black">
                {t.start}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FounderStory t={t} />

      <Testimonials t={t} />

      <section className="bg-[#080807] px-6 py-20 text-white md:px-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-10 border-t border-white/10 pt-12 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{t.manifestoLabel}</p>
          <div>
            <h2 className="mb-7 max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] sm:text-4xl md:text-7xl">{t.manifestoTitle}</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-white/55 sm:text-xl">{t.manifestoText}</p>
          </div>
        </motion.div>
      </section>

      <section id="signal" className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-20 md:py-32">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-7 text-xs uppercase tracking-[0.38em] text-white/35">{t.signalLabel}</p>

          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <h2 className="max-w-5xl text-4xl font-light leading-[0.98] tracking-[-0.05em] sm:text-5xl md:text-8xl">{t.signalTitle}</h2>

            <div className="border-l border-white/10 pl-6 sm:pl-8">
              <p className="mb-8 text-lg leading-relaxed text-white/55 sm:text-xl">{t.signalText}</p>

              <div className="grid gap-px bg-white/10">
                {t.signalPoints.map((point) => (
                  <div key={point} className="bg-black px-5 py-5 text-xs uppercase tracking-[0.22em] text-white/55">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid bg-[#0d0c0a] text-white md:grid-cols-2">
        <ImagePanel src="/sanctuary.jpg" label="Hidden Sanctuary" sublabel="Another Rhythm" />

        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex items-center px-6 py-20 md:px-20 md:py-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/35">{t.atmosphereLabel}</p>
            <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.atmosphereTitle}</h2>
            <p className="text-lg leading-relaxed text-white/55 sm:text-xl">{t.atmosphereText}</p>
          </div>
        </motion.div>
      </section>

      <section id="relocation" className="bg-[#f4f0e8] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.servicesLabel}</p>
          <h2 className="mb-6 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.servicesTitle}</h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.servicesText}</p>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-3">
            {t.services.map(([title, text]) => (
              <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#f4f0e8] p-7 transition hover:bg-white">
                <h3 className="mb-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="leading-relaxed text-zinc-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <WorkWithMe t={t} />

      <section className="grid bg-[#e8e0d3] text-zinc-950 md:grid-cols-2">
        <ImagePanel src="/lifestyle.jpg" label="Riviera Maya Living" sublabel="A Softer Landing" />

        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex items-center px-6 py-20 md:px-20 md:py-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.lifestyleLabel}</p>
            <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.lifestyleTitle}</h2>
            <p className="mb-7 text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.lifestyleText}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.lifestyleLine}</p>
          </div>
        </motion.div>
      </section>

      <section id="process" className="bg-[#080807] px-6 py-20 text-white md:px-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.processLabel}</p>
          <h2 className="mb-12 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.processTitle}</h2>

          <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map(([number, title, text]) => (
              <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#080807] p-7 transition hover:bg-white hover:text-black">
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] opacity-40">{number}</p>
                <h3 className="mb-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="leading-relaxed opacity-60">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="trust" className="bg-[#f4f0e8] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.trustLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.trustTitle}</h2>
          </div>

          <div className="space-y-7 text-lg leading-relaxed text-zinc-600">
            <p>{t.trust1}</p>
            <p>{t.trust2}</p>
            <p className="border border-zinc-300 bg-white/50 p-7 text-zinc-700">{t.trust3}</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-black px-6 py-20 text-white md:px-20">
        <div className="mx-auto grid max-w-6xl gap-px bg-white/15 text-center sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map(([big, small]) => (
            <div key={small} className="bg-black p-8">
              <h3 className="text-5xl font-light tracking-[-0.06em]">{big}</h3>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/45">{small}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f0e8] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.whoTitle}</h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.whoText}</p>

          <div className="flex flex-wrap gap-3">
            {t.tags.map((item) => (
              <span key={item} className="border border-zinc-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600 transition duration-300 hover:bg-black hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#e8e0d3] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.faqLabel}</p>
          <h2 className="mb-12 text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.faqTitle}</h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-2">
            {t.faqs.map(([question, answer]) => (
              <div key={question} className="bg-[#e8e0d3] p-7 transition hover:bg-white">
                <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">{question}</h3>
                <p className="leading-relaxed text-zinc-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="free-guide" className="bg-[#f4f0e8] px-6 py-20 text-zinc-950 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-zinc-300 pt-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Free Relocation Guide
            </p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
              10 things to know before moving to Playa del Carmen.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            <p>
              Get a simple starter guide covering cost of living, residency questions,
              renting, healthcare, banking, neighborhoods, and the common mistakes people make before moving.
            </p>

            <p>
              This is built for people still exploring Mexico and wanting a clearer first step before booking a call.
            </p>

            <a
              href="#contact"
              className="inline-block border border-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition duration-300 hover:bg-zinc-950 hover:text-white"
            >
              Request The Free Guide
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">Begin</p>
          <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.contactTitle}</h2>
          <p className="mb-8 text-lg leading-relaxed text-white/60 sm:text-xl">{t.contactText}</p>

          <div className="mb-8 border border-white/10 bg-white/5 p-6 text-left">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">
              Testimonials Welcome
            </p>
            <p className="text-white/60">
              If Path To Mexico has helped you in any way, feel free to share your experience below.
              Every testimonial is reviewed personally before being published.
            </p>
          </div>

          <LeadForm t={t} />

          <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="mt-10 inline-block text-white/60 underline">
            Prefer WhatsApp? Message us directly.
          </a>
        </div>
      </section>

      <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black shadow-2xl transition duration-300 hover:scale-110">
        💬
      </a>

      <footer className="bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">PATH TO MEXICO</p>
        <p className="mt-6 text-zinc-600">[ CIELO NUEVO ]</p>
        <p className="mt-6 italic text-zinc-400">{t.footerLine}</p>
        <p className="mt-6 text-zinc-600">{t.footer}</p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-700">
          Not everyone is meant to stay where they started.
        </p>
      </footer>
    </main>
  );
}

export default HomePage;