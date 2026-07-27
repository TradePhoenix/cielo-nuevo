// My Mexico Plan — the six narrative chapters the whole plan is organized
// around, instead of a flat, category-sorted checklist.
//
// `days` is the structural backbone used to compute which chapter is
// "Now" for a given visitor. `phaseLabel` is the label actually shown for
// visitors whose Blueprint timeline answer was "exploring" — someone
// eighteen months out doesn't think in day-30 terms, and showing them one
// would manufacture false urgency. Urgent/asap visitors see `title` with
// literal day ranges instead; see ChapterTracker.js and ChapterSection.js.
//
// `closingLine` is the quiet, non-gamified acknowledgment shown once a
// chapter is behind the visitor — reward through a sentence, not a badge.
//
// "The Decision" is deliberately not part of CHAPTERS: reaching the plan
// at all means the decision already happened, so it can never be "Now" —
// it's rendered once, statically, as a prologue above the plan itself
// (see PROLOGUE below and MyMexicoPlanPage.js).
//
// PTM Spanish-parity pass: `title`, `phaseLabel`, `framing`, `closingLine`
// became `{ en, es }` — `id`/`days` are stable, language-independent
// identifiers used by matching/sorting logic and stay plain.

export const PROLOGUE = {
  id: "the-decision",
  title: { en: "The Decision", es: "La Decisión" },
  framing: {
    en: "You've already done the hardest part — you looked at your own life honestly and decided to find out if this was real. Everything below is just logistics now.",
    es: "Ya hiciste la parte más difícil — miraste tu propia vida con honestidad y decidiste averiguar si esto era real. Todo lo demás de aquí en adelante es solo logística.",
  },
};

export const CHAPTERS = [
  {
    id: "getting-ready",
    title: { en: "Getting Ready", es: "Preparándote" },
    phaseLabel: { en: "Early Research", es: "Investigación Inicial" },
    days: { start: 0, end: 30 },
    framing: {
      en: "This chapter is about research, not action — get your bearings before you commit money or dates. Nothing here is urgent, but everything here makes the rest of the plan easier.",
      es: "Este capítulo se trata de investigar, no de actuar — orienta antes de comprometer dinero o fechas. Nada aquí es urgente, pero todo aquí facilita el resto del plan.",
    },
    closingLine: {
      en: "You've stopped wondering and started preparing. That shift matters more than any single task on this list.",
      es: "Dejaste de preguntarte y empezaste a prepararte. Ese cambio importa más que cualquier tarea individual de esta lista.",
    },
  },
  {
    id: "making-it-real",
    title: { en: "Making It Real", es: "Haciéndolo Real" },
    phaseLabel: { en: "Getting Serious", es: "Poniéndose Serio" },
    days: { start: 31, end: 60 },
    framing: {
      en: "The abstract starts turning into logistics — banking, a housing shortlist, a real budget instead of a guess. This is where “maybe” quietly becomes “when.”",
      es: "Lo abstracto empieza a convertirse en logística — banca, una preselección de vivienda, un presupuesto real en vez de una suposición. Aquí es donde el “tal vez” se convierte silenciosamente en “cuándo”.",
    },
    closingLine: {
      en: "Your plan has a shape now. From here, it's mostly execution.",
      es: "Tu plan ya tiene forma. De aquí en adelante, es principalmente ejecución.",
    },
  },
  {
    id: "the-countdown",
    title: { en: "The Countdown", es: "La Cuenta Regresiva" },
    phaseLabel: { en: "Making Moves", es: "Dando Pasos" },
    days: { start: 61, end: 90 },
    framing: {
      en: "This is the part that feels the most real — and often the most nerve-wracking. That's normal. Booking flights and finalizing a lease makes it official in a way research never does.",
      es: "Esta es la parte que se siente más real — y a menudo la más nerviosa. Eso es normal. Reservar vuelos y finalizar un contrato de renta lo hace oficial de una forma que la investigación nunca logra.",
    },
    closingLine: {
      en: "You've made it through the hardest part of deciding. What's left is logistics.",
      es: "Ya pasaste la parte más difícil de decidir. Lo que queda es logística.",
    },
  },
  {
    id: "the-move",
    title: { en: "The Move", es: "La Mudanza" },
    phaseLabel: { en: "The Move", es: "La Mudanza" },
    days: { start: 91, end: 180 },
    framing: {
      en: "Arrival, temporary housing, and the adjustment period the Honest Truth already warned you about — now it's not a warning, it's just what this month looks like.",
      es: "La llegada, la vivienda temporal y el periodo de adaptación del que ya te advirtió la Verdad Honesta — ahora ya no es una advertencia, es simplemente cómo se ve este mes.",
    },
    closingLine: {
      en: "The version of you that used to just talk about this doesn't exist anymore. You're living it.",
      es: "La versión de ti que solo hablaba de esto ya no existe. Ahora lo estás viviendo.",
    },
  },
  {
    id: "becoming-local",
    title: { en: "Becoming Local", es: "Volviéndote Local" },
    phaseLabel: { en: "Becoming Local", es: "Volviéndote Local" },
    days: { start: 181, end: 365 },
    framing: {
      en: "Community, routine, and residency — if that's part of your plan — settle in. The Tuesday you once had to imagine is starting to just be your Tuesday.",
      es: "La comunidad, la rutina y la residencia — si forma parte de tu plan — se asientan. El martes que antes tenías que imaginar está empezando a ser simplemente tu martes.",
    },
    closingLine: {
      en: "A year ago this was a question. Now it's just your life.",
      es: "Hace un año esto era una pregunta. Ahora es simplemente tu vida.",
    },
  },
];
