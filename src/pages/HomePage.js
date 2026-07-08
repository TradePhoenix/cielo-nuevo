import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const content = {
  en: {
    nav: ["Home", "Relocation", "Services", "Guides", "About", "FAQ", "Contact"],
    heroLocation: "Riviera Maya • Mexico",
    heroSignal: "[ CIELO NUEVO ]",
    heroTitle: "Move to Mexico with confidence.",
    heroSubtext:
      "Path To Mexico helps people explore relocation, lifestyle, residency direction, trusted local connections, and the real possibility of building a new life in Mexico.",
    start: "Book A Mexico Fit Call",
    explore: "Explore Relocation Support",

    servicesLabel: "Relocation Support",
    servicesTitle: "Practical guidance for moving to Mexico without guessing your way through it.",
    servicesText:
      "From early research to trusted introductions, Path To Mexico helps you understand your options and make clearer decisions before you move.",
    services: [
      ["Relocation Support", "Step-by-step support for understanding your move, priorities, timeline, and next best decisions."],
      ["Residency Direction", "Guidance on the general residency path and introductions to qualified professionals when needed."],
      ["Housing Connections", "Support understanding areas, rentals, real estate options, and trusted local contacts."],
      ["Lifestyle Planning", "Clear insight into cost of living, healthcare, banking, transportation, pets, and daily life."],
      ["Trusted Local Network", "Introductions to local professionals across relocation, legal, real estate, insurance, and services."],
      ["Guided Landing", "More personalized support for people who want help before, during, and after arrival."]
    ],

    workLabel: "Work With Me",
    workTitle1: "Moving countries is a big decision.",
    workTitle2: "You do not have to figure it out alone.",
    workText:
      "Whether you are just exploring the possibility or preparing to make the move, Path To Mexico provides clear guidance, trusted introductions, and real-world insight from someone already living the path.",
    workOffers: [
      [
        "Mexico Fit Call",
        "$99 USD",
        "A private one-on-one conversation designed to answer your questions, provide honest insight, and help you understand what moving to Mexico could realistically look like for you.",
        "Perfect for people still exploring costs, residency options, neighborhoods, lifestyle questions, and next steps.",
        "Book Mexico Fit Call",
        "/mexico-fit-call"
      ],
      [
        "Relocation Roadmap",
        "Starting at $499 USD",
        "A personalized relocation strategy built around your goals, timeline, budget, lifestyle preferences, and long-term vision for life in Mexico.",
        "Ideal for individuals, couples, families, retirees, entrepreneurs, and remote workers who want a clear roadmap before making major decisions.",
        "Apply For Roadmap",
        "#contact"
      ],
      [
        "Guided Landing",
        "Custom Quote",
        "Private concierge-style relocation support for people who want hands-on guidance, trusted introductions, and ongoing assistance throughout the process.",
        "Best for families, professionals, investors, business owners, and anyone seeking a highly personalized relocation experience.",
        "Schedule A Conversation",
        "#contact"
      ]
    ],
    bestFor: "Best For",

    guideLabel: "Free Relocation Guide",
    guideTitle: "10 things to know before moving to Playa del Carmen.",
    guideText:
      "Get a simple starter guide covering cost of living, residency questions, renting, healthcare, banking, neighborhoods, and common mistakes people make before moving.",
    guideCta: "Request The Free Guide",

    processLabel: "How It Works",
    processTitle: "From first conversation to feeling more prepared.",
    process: [
      ["01", "Talk", "We start with your goals, budget, timeline, and what kind of life you want in Mexico."],
      ["02", "Plan", "We map your best relocation path, including neighborhoods, rentals, residency questions, and priorities."],
      ["03", "Connect", "We point you toward trusted local professionals, agents, and service providers when needed."],
      ["04", "Settle", "You move forward with more clarity, fewer surprises, and people already on the ground."]
    ],

    testimonialsLabel: "Testimonials",
    testimonialsTitle1: "Trusted guidance.",
    testimonialsTitle2: "Real conversations.",
    testimonials: [
      [
        "We had been talking about moving to Mexico for years, but the amount of information online felt overwhelming. Path To Mexico helped us think through things we had not even considered, from neighborhoods and healthcare to what day-to-day life might actually feel like. More than anything, it gave us confidence and a clearer sense of direction.",
        "Sarah & Michael — Vancouver, Canada"
      ],
      [
        "I was not looking for someone to sell me anything. I just wanted honest answers from someone who had actually lived the experience. Path To Mexico provided clarity and helped me slow down and make better decisions. It felt more like talking to a trusted friend than dealing with a company.",
        "David — Calgary, Alberta"
      ],
      [
        "Moving countries can feel intimidating. Having someone who understood both the practical and emotional sides of relocation made the entire process feel much less overwhelming. I left our conversations feeling excited instead of anxious.",
        "Amanda — Seattle, Washington"
      ]
    ],

    founderLabel: "Founder Story",
    founderTitle: "Built from lived experience, not theory.",
    founderIntro:
      "Path To Mexico was created by Kalen Enns after leaving Canada and rebuilding life in Mexico.",
    founderParagraphs: [
      "I never planned on building a relocation business. I simply made a decision that changed my own life.",
      "After spending most of my life in Canada, I reached a point where I wanted something different: more freedom, more sunshine, more connection, and more time actually living.",
      "So I packed up what I could, left British Columbia behind, and moved to Mexico.",
      "It was not as simple or glamorous as social media makes it look. There were questions about residency, banking, healthcare, housing, paperwork, and figuring out who could actually be trusted.",
      "Some things were easier than I expected. Others were much harder. But somewhere along the way, life started to feel different.",
      "Mexico did not solve everything. No place can do that. But it gave me perspective and reminded me there is not only one way to live.",
      "That is what eventually led to Path To Mexico: not a corporate relocation company, but a trusted guide built from real experience."
    ],
    founderQuote:
      "Some people come to Mexico for a vacation. Others come here looking for a life that feels more like their own.",
    founderSignature: "— Kalen Enns",
    founderRole: "Founder, Path To Mexico",

    networkLabel: "Trusted Local Network",
    networkTitle: "Trusted people matter.",
    networkText:
      "Path To Mexico connects clients with selected professionals and local resources to create a smoother transition and a more confident landing.",
    network: [
      "Realtors",
      "Residency Facilitators",
      "Lawyers",
      "Insurance Brokers",
      "Doctors",
      "Property Managers",
      "Contractors",
      "Accountants",
      "Movers"
    ],

    trustLabel: "Trust & Clarity",
    trustTitle: "Clearer options, better introductions, and fewer expensive mistakes.",
    trustPoints: [
      "Canadian founder living in Mexico",
      "Riviera Maya local knowledge",
      "Trusted professional network",
      "Personal one-on-one support"
    ],

    whoTitle: "Built for people ready for a different life.",
    whoText:
      "Whether you are coming from Canada, the United States, or somewhere else, Path To Mexico helps you understand your options and connect with the right people on the ground.",
    tags: ["Canadians", "Americans", "Remote Professionals", "Retirees", "Investors", "Families", "Remote Workers", "Entrepreneurs"],

    faqLabel: "Common Questions",
    faqTitle: "Before you make the move.",
    faqs: [
      ["Do you only help Canadians?", "No. We mainly support Canadians and Americans, but we can help people from anywhere explore relocation to Mexico."],
      ["Do you sell real estate directly?", "No. We provide guidance and introductions to trusted local professionals. Real estate transactions are handled by qualified experts."],
      ["Can you help with residency?", "Yes. We can help you understand the general path and connect you with qualified professionals for immigration and paperwork."],
      ["Is this only for retirees?", "No. We support retirees, investors, remote workers, digital nomads, families, entrepreneurs, and people looking for a different lifestyle."]
    ],

    contactLabel: "Start Here",
    contactTitle: "Start Your Path To Mexico",
    contactText:
      "Send a few details about your timeline, goals, and questions. We’ll help you understand the clearest next step toward relocation, residency, lifestyle, real estate, or trusted local support in Mexico.",
    formSuccess: "Thanks — your inquiry was sent. We’ll be in touch soon.",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • Mexico"
  },

  es: {
    nav: ["Inicio", "Reubicación", "Servicios", "Guías", "Historia", "FAQ", "Contacto"],
    heroLocation: "Riviera Maya • México",
    heroSignal: "[ CIELO NUEVO ]",
    heroTitle: "Múdate a México con más claridad.",
    heroSubtext:
      "Path To Mexico ayuda a personas a explorar reubicación, estilo de vida, orientación de residencia, conexiones locales confiables y la posibilidad real de construir una nueva vida en México.",
    start: "Reservar Llamada",
    explore: "Explorar Reubicación",

    servicesLabel: "Apoyo De Reubicación",
    servicesTitle: "Guía práctica para mudarte a México sin adivinar cada paso.",
    servicesText:
      "Desde la investigación inicial hasta conexiones confiables, Path To Mexico te ayuda a entender tus opciones y tomar mejores decisiones antes de mudarte.",
    services: [
      ["Apoyo De Reubicación", "Apoyo paso a paso para entender tu mudanza, prioridades, tiempos y próximas decisiones."],
      ["Orientación De Residencia", "Guía general sobre el camino de residencia y conexiones con profesionales calificados cuando sea necesario."],
      ["Conexiones De Vivienda", "Apoyo para entender zonas, rentas, opciones inmobiliarias y contactos locales confiables."],
      ["Planeación De Estilo De Vida", "Claridad sobre costo de vida, salud, bancos, transporte, mascotas y vida diaria."],
      ["Red Local Confiable", "Introducciones a profesionales locales en reubicación, legal, bienes raíces, seguros y servicios."],
      ["Llegada Guiada", "Apoyo más personalizado para quienes quieren ayuda antes, durante y después de llegar."]
    ],

    workLabel: "Trabaja Conmigo",
    workTitle1: "Mudarse de país es una gran decisión.",
    workTitle2: "No tienes que resolverlo todo solo.",
    workText:
      "Ya sea que estés explorando la posibilidad o preparándote para mudarte, Path To Mexico ofrece guía clara, conexiones confiables y perspectiva real de alguien que ya vive el camino.",
    workOffers: [
      [
        "Llamada México Fit",
        "$99 USD",
        "Una conversación privada uno a uno para responder tus preguntas, darte perspectiva honesta y ayudarte a entender cómo podría verse una mudanza a México para ti.",
        "Perfecto para personas que están explorando costos, opciones de residencia, zonas, estilo de vida y próximos pasos.",
        "Reservar Llamada",
        "/mexico-fit-call"
      ],
      [
        "Roadmap De Reubicación",
        "Desde $499 USD",
        "Una estrategia personalizada construida alrededor de tus metas, tiempos, presupuesto, preferencias de vida y visión a largo plazo en México.",
        "Ideal para individuos, parejas, familias, jubilados, emprendedores y trabajadores remotos que quieren un plan claro.",
        "Aplicar Al Roadmap",
        "#contact"
      ],
      [
        "Llegada Guiada",
        "Cotización Personalizada",
        "Apoyo privado estilo concierge para quienes quieren guía práctica, conexiones confiables y acompañamiento durante el proceso.",
        "Ideal para familias, profesionales, inversionistas, dueños de negocios y personas que buscan una experiencia personalizada.",
        "Agendar Conversación",
        "#contact"
      ]
    ],
    bestFor: "Ideal Para",

    guideLabel: "Guía Gratis",
    guideTitle: "10 cosas que debes saber antes de mudarte a Playa del Carmen.",
    guideText:
      "Recibe una guía simple sobre costo de vida, residencia, rentas, salud, bancos, zonas y errores comunes antes de mudarte.",
    guideCta: "Solicitar La Guía Gratis",

    processLabel: "Cómo Funciona",
    processTitle: "De la primera conversación a sentirte más preparado.",
    process: [
      ["01", "Hablar", "Empezamos con tus metas, presupuesto, tiempos y el tipo de vida que quieres en México."],
      ["02", "Planear", "Mapeamos tu camino de reubicación: zonas, rentas, residencia y prioridades."],
      ["03", "Conectar", "Te orientamos hacia profesionales, agentes y proveedores confiables cuando sea necesario."],
      ["04", "Establecerte", "Avanzas con más claridad, menos sorpresas y personas listas para ayudarte."]
    ],

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

    founderLabel: "Historia Del Fundador",
    founderTitle: "Construido desde experiencia real, no teoría.",
    founderIntro:
      "Path To Mexico fue creado por Kalen Enns después de dejar Canadá y reconstruir su vida en México.",
    founderParagraphs: [
      "Nunca planeé construir un negocio de reubicación. Simplemente tomé una decisión que cambió mi propia vida.",
      "Después de pasar la mayor parte de mi vida en Canadá, llegué a un punto donde quería algo diferente: más libertad, más sol, más conexión y más tiempo viviendo de verdad.",
      "Así que empaqué lo que pude, dejé British Columbia atrás y me mudé a México.",
      "No fue tan simple ni glamuroso como parece en redes sociales. Había preguntas sobre residencia, bancos, salud, vivienda, documentos y cómo encontrar personas confiables.",
      "Algunas cosas fueron más fáciles de lo esperado. Otras fueron más difíciles. Pero en algún punto, la vida empezó a sentirse diferente.",
      "México no resolvió todo. Ningún lugar puede hacer eso. Pero me dio perspectiva y me recordó que no existe una sola forma de vivir.",
      "Eso fue lo que llevó a Path To Mexico: no como una empresa corporativa de reubicación, sino como una guía confiable construida desde experiencia real."
    ],
    founderQuote:
      "Algunas personas vienen a México de vacaciones. Otras vienen buscando una vida que se sienta más propia.",
    founderSignature: "— Kalen Enns",
    founderRole: "Fundador, Path To Mexico",

    networkLabel: "Red Local Confiable",
    networkTitle: "Las personas confiables importan.",
    networkText:
      "Path To Mexico conecta clientes con profesionales seleccionados y recursos locales para crear una transición más tranquila y una llegada con más confianza.",
    network: [
      "Agentes Inmobiliarios",
      "Facilitadores De Residencia",
      "Abogados",
      "Seguros",
      "Doctores",
      "Administradores De Propiedad",
      "Contratistas",
      "Contadores",
      "Mudanzas"
    ],

    trustLabel: "Confianza & Claridad",
    trustTitle: "Opciones más claras, mejores conexiones y menos errores costosos.",
    trustPoints: [
      "Fundador canadiense viviendo en México",
      "Conocimiento local de Riviera Maya",
      "Red profesional confiable",
      "Apoyo personal uno a uno"
    ],

    whoTitle: "Hecho para personas listas para una vida diferente.",
    whoText:
      "Ya vengas de Canadá, Estados Unidos u otro lugar, Path To Mexico te ayuda a entender tus opciones y conectar con las personas correctas en el terreno.",
    tags: ["Canadienses", "Americanos", "Profesionales Remotos", "Jubilados", "Inversionistas", "Familias", "Trabajadores Remotos", "Emprendedores"],

    faqLabel: "Preguntas Comunes",
    faqTitle: "Antes de mudarte.",
    faqs: [
      ["¿Solo ayudan a canadienses?", "No. Principalmente apoyamos a canadienses y estadounidenses, pero también podemos ayudar a personas de otros países."],
      ["¿Venden bienes raíces directamente?", "No. Ofrecemos guía e introducciones a profesionales locales confiables. Las transacciones se manejan con expertos calificados."],
      ["¿Pueden ayudar con residencia?", "Sí. Podemos ayudarte a entender el camino general y conectarte con profesionales calificados."],
      ["¿Es solo para jubilados?", "No. Apoyamos jubilados, inversionistas, trabajadores remotos, nómadas digitales, familias, emprendedores y personas buscando otro estilo de vida."]
    ],

    contactLabel: "Empieza Aquí",
    contactTitle: "Empieza Tu Camino A México",
    contactText:
      "Envía algunos detalles sobre tus tiempos, metas y preguntas. Te ayudaremos a entender el próximo paso más claro hacia reubicación, residencia, estilo de vida, bienes raíces o apoyo local confiable en México.",
    formSuccess: "Gracias — tu consulta fue enviada. Te contactaremos pronto.",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • México"
  }
};

function LeadForm({ t }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  if (state.succeeded) {
    return (
      <div className="border border-zinc-200 bg-white p-8 text-center text-zinc-950 shadow-sm">
        <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">Message Sent</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-3xl gap-5 text-left">
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="name" placeholder="Full Name" required />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="email" name="email" placeholder="Email Address" required />
      <ValidationError field="email" errors={state.errors} />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="country" placeholder="Current Country" />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="timeline" placeholder="Ideal Timeline" />
      <textarea className="min-h-36 border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" name="message" placeholder="What do you need help with?" required />
      <ValidationError field="message" errors={state.errors} />

      <button disabled={state.submitting} className="bg-zinc-950 px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-zinc-800 disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Relocation Inquiry"}
      </button>
    </form>
  );
}

function SectionHeader({ label, title, text, light = false }) {
  return (
    <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
      <p className={`mb-6 text-xs uppercase tracking-[0.35em] ${light ? "text-white/40" : "text-zinc-500"}`}>
        {label}
      </p>
      <h2 className={`max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl ${light ? "text-white" : "text-zinc-950"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl ${light ? "text-white/60" : "text-zinc-600"}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}

function HomePage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  const navLinks = ["#home", "#relocation", "#services", "/guides", "#about", "#faq", "#contact"];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f1e8] text-zinc-950 scroll-smooth">
      <section id="home" className="relative min-h-[100svh] overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src="/hero.jpg" alt="Riviera Maya relocation lifestyle" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-[#f6f1e8]"></div>
        </div>

        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/15 bg-black/35 px-4 py-4 backdrop-blur-md md:px-10">
          <a href="#home" className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-xs">
            Path To Mexico
          </a>

          <div className="hidden gap-8 text-[10px] uppercase tracking-[0.25em] text-white/65 lg:flex">
            {t.nav.map((item, index) => (
              <a key={item} className="transition hover:text-white" href={navLinks[index]}>
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </nav>

        <div className="relative z-10 flex min-h-[100svh] items-center px-5 pb-20 pt-28 md:px-16">
          <motion.div initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-5xl">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/60">{t.heroLocation}</p>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/55">{t.heroSignal}</p>

            <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-9xl">
              {t.heroTitle}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {t.heroSubtext}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/mexico-fit-call" className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white">
                {t.start}
              </a>
              <a href="#relocation" className="border border-white/40 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950">
                {t.explore}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="relocation" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.servicesLabel} title={t.servicesTitle} text={t.servicesText} />
      </section>

      <section id="services" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.services.map(([title, text]) => (
            <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#efe7d8] p-8 transition hover:bg-white">
              <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">{title}</h3>
              <p className="leading-relaxed text-zinc-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="work" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.workLabel} title={`${t.workTitle1} ${t.workTitle2}`} text={t.workText} />

        <div className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.workOffers.map(([title, price, text, bestFor, cta, href]) => (
            <motion.div key={title} whileHover={{ y: -6 }} className="flex min-h-[500px] flex-col justify-between bg-white p-7 transition hover:bg-[#f6f1e8]">
              <div>
                <h3 className="mb-3 text-3xl font-light tracking-[-0.04em]">{title}</h3>
                <p className="mb-6 text-sm uppercase tracking-[0.25em] text-zinc-500">{price}</p>
                <p className="mb-7 leading-relaxed text-zinc-600">{text}</p>

                <div className="border-t border-zinc-300 pt-6">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">{t.bestFor}</p>
                  <p className="leading-relaxed text-zinc-600">{bestFor}</p>
                </div>
              </div>

              <a href={href} className="mt-9 inline-block border border-zinc-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white">
                {cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="free-guide" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-zinc-300 pt-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.guideLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.guideTitle}</h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            <p>{t.guideText}</p>
            <a href="/free-guide" className="inline-block border border-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white">
              {t.guideCta}
            </a>
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#0b0b0a] px-6 py-20 text-white md:px-20 md:py-28">
        <SectionHeader label={t.processLabel} title={t.processTitle} light />

        <div className="mx-auto mt-14 grid max-w-6xl gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.map(([number, title, text]) => (
            <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#0b0b0a] p-7 transition hover:bg-white hover:text-zinc-950">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] opacity-40">{number}</p>
              <h3 className="mb-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="leading-relaxed opacity-65">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.testimonialsLabel} title={`${t.testimonialsTitle1} ${t.testimonialsTitle2}`} />

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {t.testimonials.map(([quote, name]) => (
            <div key={quote} className="border border-zinc-200 bg-white/70 p-8 shadow-sm transition hover:bg-white">
              <p className="mb-8 text-lg leading-relaxed text-zinc-700">“{quote}”</p>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 border-t border-zinc-300 pt-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.founderLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.founderTitle}</h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.founderIntro}</p>

            <div className="mt-10 max-w-sm overflow-hidden border border-zinc-200 bg-white p-3 shadow-sm">
              <img src="/kalen.jpg" alt="Kalen Enns, founder of Path To Mexico" className="aspect-[4/5] h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            {t.founderParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <p className="pt-4 text-3xl font-light leading-tight tracking-[-0.04em] text-zinc-950 md:text-5xl">
              {t.founderQuote}
            </p>

            <p className="pt-6 text-zinc-500">
              {t.founderSignature}
              <br />
              {t.founderRole}
            </p>
          </div>
        </div>
      </section>

      <section id="network" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.networkLabel} title={t.networkTitle} text={t.networkText} />

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3">
          {t.network.map((item) => (
            <div key={item} className="border border-zinc-200 bg-white p-8 text-lg text-zinc-700 transition hover:bg-[#f6f1e8]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="trust" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.trustLabel} title={t.trustTitle} />

        <div className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustPoints.map((point) => (
            <div key={point} className="bg-[#efe7d8] p-8 text-lg text-zinc-700 transition hover:bg-white">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.whoTitle}</h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.whoText}</p>

          <div className="flex flex-wrap gap-3">
            {t.tags.map((item) => (
              <span key={item} className="border border-zinc-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.faqLabel} title={t.faqTitle} />

        <div className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-2">
          {t.faqs.map(([question, answer]) => (
            <div key={question} className="bg-white p-7 transition hover:bg-[#f6f1e8]">
              <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">{question}</h3>
              <p className="leading-relaxed text-zinc-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#0b0b0a] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.contactLabel}</p>
          <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.contactTitle}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">{t.contactText}</p>

          <LeadForm t={t} />

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20love%20to%20learn%20more%20about%20moving%20to%20Mexico."
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Prefer WhatsApp? Message Directly
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20love%20to%20learn%20more%20about%20moving%20to%20Mexico."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-2xl text-white shadow-2xl transition hover:scale-110"
      >
        💬
      </a>

      <section id="disclaimer" className="bg-[#f6f1e8] px-6 py-12 text-zinc-950 md:px-20">
        <div className="mx-auto max-w-6xl border-t border-zinc-300 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">Important Note</p>
          <p className="max-w-4xl text-sm leading-relaxed text-zinc-600">
            Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.
          </p>
        </div>
      </section>

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