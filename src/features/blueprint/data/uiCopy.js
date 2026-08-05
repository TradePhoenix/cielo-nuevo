// My Mexico Blueprint — interface chrome copy (buttons, labels, progress,
// section eyebrows). Separate from questions.js/copy.js, which carry the
// actual questionnaire/results *data* — this is just UI text, gathered in
// one place since it's shared across ~9 small components rather than
// duplicating a `content = { en, es }` object in each of them.
export const BLUEPRINT_UI = {
  en: {
    backLink: "Path To Mexico",
    intro: {
      eyebrow: "My Mexico Blueprint",
      title: "Find your path to a life in Mexico.",
      text: "Every year, thousands of people dream about moving to Mexico. Most never do. This blueprint helps you see what your move could actually look like — where you fit, what it may cost, and what to do next.",
      cta: "Start Your Blueprint",
      questionsCount: (n) => `${n} Quick Questions · About 3 Minutes`,
      privacy: "Your answers stay on this device while you work — nothing is sent until you choose to save your Blueprint at the end.",
    },
    question: {
      back: "Back",
      next: "Next",
      finish: "Finish",
      progress: (current, total) => `Question ${current} of ${total}`,
      multiCount: (selected, max) => `${selected} of ${max} selected`,
      multiFree: (selected) => (selected === 1 ? `1 selected` : `${selected} selected`),
    },
    loading: {
      messages: [
        "We've been considering what matters most to you.",
        "Your answers point toward a particular rhythm of life.",
        "We think we've found a strong place to begin.",
      ],
      srStatus: "Preparing your Mexico Blueprint results.",
      skip: "Show My Results",
    },
    discovery: {
      eyebrow: "A Strong Place To Begin",
      planCta: (name) => `See Your Plan For ${name}`,
      guideCta: "Read The Guide",
    },
    summary: {
      eyebrow: "Your Blueprint",
      readinessLabel: "Readiness Score",
      archetypeLabel: "Your Archetype",
      srReadiness: (score) => `Readiness score: ${score} out of 100`,
    },
    cityMatch: {
      eyebrow: "Also Worth A Look",
      title: "Other Places That Could Fit",
      guideCta: "Read The Guide →",
    },
    roadmap: {
      nextStepLabel: "Your Recommended Next Step",
      bookCall: "Book The Call",
      planLabel: "Your Plan",
      title: "Your 90-Day Roadmap",
      phases: [
        { range: "Days 1–30", label: "Get Clear" },
        { range: "Days 31–60", label: "Get Moving" },
        { range: "Days 61–90", label: "Make It Real" },
      ],
    },
    cta: {
      startHere: "Start Here",
      readinessWord: "Readiness",
      nextChapter: "See What Your Next Chapter Could Look Like",
    },
    focus: {
      eyebrow: "Built Around Your Questions",
      title: "What you said you're still weighing",
      builtFromEyebrow: "Your blueprint was built from",
    },
    leadCapture: {
      eyebrow: "Your Blueprint Is Ready",
      title: "One last step before we reveal it.",
      text: "Tell us who it's for. Submitting saves your personalized Blueprint, reveals it right away, and lets Path To Mexico send you relocation guidance that actually fits your answers.",
      firstName: "First Name",
      email: "Email Address",
      consentPrefix:
        "I agree that Path To Mexico may store these details and email me relevant relocation guidance. No spam, unsubscribe anytime. See the ",
      consentLinkLabel: "Privacy Policy",
      consentSuffix: ".",
      submit: "Reveal My Blueprint",
      submitting: "Saving Your Blueprint...",
      error: "Something went wrong sending your details. Your answers are safe on this device — please try again.",
      back: "Back To My Answers",
    },
    retake: "Retake The Blueprint",
  },
  es: {
    backLink: "Path To Mexico",
    intro: {
      eyebrow: "My Mexico Blueprint",
      title: "Encuentra tu camino hacia una vida en México.",
      text: "Cada año, miles de personas sueñan con mudarse a México. La mayoría nunca lo hace. Este blueprint te ayuda a ver cómo podría verse realmente tu mudanza — dónde encajas, cuánto podría costar y qué hacer después.",
      cta: "Empieza Tu Blueprint",
      questionsCount: (n) => `${n} Preguntas Rápidas · Alrededor De 3 Minutos`,
      privacy: "Tus respuestas se quedan en este dispositivo mientras avanzas — nada se envía hasta que decidas guardar tu Blueprint al final.",
    },
    question: {
      back: "Atrás",
      next: "Siguiente",
      finish: "Terminar",
      progress: (current, total) => `Pregunta ${current} de ${total}`,
      multiCount: (selected, max) => `${selected} de ${max} seleccionadas`,
      multiFree: (selected) => (selected === 1 ? `1 seleccionada` : `${selected} seleccionadas`),
    },
    loading: {
      messages: [
        "Hemos estado considerando lo que más te importa.",
        "Tus respuestas apuntan hacia un ritmo de vida particular.",
        "Creemos haber encontrado un buen lugar para empezar.",
      ],
      srStatus: "Preparando los resultados de tu Mexico Blueprint.",
      skip: "Mostrar Mis Resultados",
    },
    discovery: {
      eyebrow: "Un Buen Lugar Para Empezar",
      planCta: (name) => `Ver Tu Plan Para ${name}`,
      guideCta: "Leer La Guía",
    },
    summary: {
      eyebrow: "Tu Blueprint",
      readinessLabel: "Puntaje De Preparación",
      archetypeLabel: "Tu Arquetipo",
      srReadiness: (score) => `Puntaje de preparación: ${score} de 100`,
    },
    cityMatch: {
      eyebrow: "También Vale La Pena Ver",
      title: "Otros Lugares Que Podrían Encajar",
      guideCta: "Leer La Guía →",
    },
    roadmap: {
      nextStepLabel: "Tu Próximo Paso Recomendado",
      bookCall: "Reservar La Llamada",
      planLabel: "Tu Plan",
      title: "Tu Hoja De Ruta De 90 Días",
      phases: [
        { range: "Días 1–30", label: "Ten Claridad" },
        { range: "Días 31–60", label: "Ponte En Marcha" },
        { range: "Días 61–90", label: "Hazlo Realidad" },
      ],
    },
    cta: {
      startHere: "Empieza Aquí",
      readinessWord: "Preparación",
      nextChapter: "Mira Cómo Podría Verse Tu Próximo Capítulo",
    },
    focus: {
      eyebrow: "Construido Alrededor De Tus Preguntas",
      title: "Lo que dijiste que aún estás sopesando",
      builtFromEyebrow: "Tu blueprint se construyó a partir de",
    },
    leadCapture: {
      eyebrow: "Tu Blueprint Está Listo",
      title: "Un último paso antes de revelarlo.",
      text: "Cuéntanos para quién es. Al enviar, guardas tu Blueprint personalizado, lo revelas de inmediato y permites que Path To Mexico te envíe orientación de reubicación que realmente encaje con tus respuestas.",
      firstName: "Nombre",
      email: "Correo Electrónico",
      consentPrefix:
        "Acepto que Path To Mexico guarde estos datos y me envíe por correo orientación relevante de reubicación. Sin spam, cancela cuando quieras. Consulta la ",
      consentLinkLabel: "Política De Privacidad",
      consentSuffix: ".",
      submit: "Revelar Mi Blueprint",
      submitting: "Guardando Tu Blueprint...",
      error: "Algo salió mal al enviar tus datos. Tus respuestas están seguras en este dispositivo — inténtalo de nuevo.",
      back: "Volver A Mis Respuestas",
    },
    retake: "Retomar El Blueprint",
  },
};
