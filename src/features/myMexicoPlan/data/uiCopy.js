// My Mexico Plan — interface chrome copy (section headers, labels,
// descriptions) shared across its ~10 workspace components. Separate from
// chapters.js/taskBank.js/partnerCategories.js, which carry the actual
// plan *data* (already resolved to plain strings per-language by
// buildPlan.js/buildReadinessAssessment.js/etc. before it ever reaches
// these components) — this file is just UI text.
export const PLAN_UI = {
  en: {
    nowNextLater: { now: "Now", comingUp: "Coming Up", later: "Later" },
    adaptiveChecklist: {
      label: "Adaptive Relocation Checklist",
      title: "Ranked for your situation, not just the calendar.",
      description: (
        <>
          This re-orders your plan's own tasks by relevance to your specific answers — timeline,
          household, budget clarity, residency familiarity, and readiness. It's general planning
          guidance, not legal, tax, financial, or medical advice. Tasks marked{" "}
          <span className="font-semibold text-zinc-950">"Needs a professional"</span> should be
          confirmed with a qualified professional before you act.
        </>
      ),
      nextHighestPriority: (n) => `Your Next ${n} Highest-Priority Actions`,
      doNow: "Do Now",
      doNext: "Do Next",
      laterMore: (n) => `Later · ${n} more tasks`,
    },
    relocationTimeline: {
      label: "Relocation Timeline",
      title: (cityName) => `Your ${cityName} plan, in sequence.`,
      blueprintSays: (label) => (
        <>
          Your Blueprint says <span className="font-semibold text-zinc-950">{label.toLowerCase()}</span> —
          the periods below reflect that.
        </>
      ),
      currentFocus: "Your Current Focus",
      dependsOnDate: "Depends On A Confirmed Move Date",
      nothingYet: "Nothing here yet based on your own answers — that's expected, not a gap.",
    },
    readinessAssessment: {
      label: "Move Readiness Assessment",
      title: "Exactly where you stand, and why.",
      description: "A deterministic breakdown of your readiness score — no AI, no guessing. Everything below comes directly from your own 6 Blueprint answers.",
      overallReadiness: "Overall Readiness",
      archetype: "Archetype",
      breakdown: "Your Readiness Breakdown",
      points: "points",
      primaryStrengths: "Primary Strengths",
      noStrengths: "No single answer stands out yet — that's normal early on.",
      strengthSuffix: "— clear and decisive.",
      biggestGaps: "Biggest Readiness Gaps",
      noGaps: "Nothing stands out as a gap — your answers are consistently clear.",
      opportunities: "Top Opportunities To Improve",
      readGuide: "Read The Guide",
      confidenceFactors: "Confidence Factors",
      validatePersonally: "Validate Personally",
      highestImpact: "Next Actions With The Greatest Impact",
    },
    conciergeWorkspace: {
      label: "Concierge Workspace",
      title: "Your relocation, divided honestly.",
    },
    costPlanner: {
      label: "Cost Planner",
      title: (cityName) => `A planning range for life in ${cityName}.`,
      description: "These are planning ranges, not exact prices or guarantees. Actual costs vary by exact location, season, exchange rates, household, and lifestyle — use this as a starting point to plan around, not a quote.",
      estimatedTotal: "Estimated Monthly Total",
      needsVerification: "Needs personal verification",
      majorCostDrivers: "Major Cost Drivers",
      assumptions: "Assumptions Used",
      verifyPersonally: "Verify Personally",
      goDeeper: "Go Deeper",
    },
    decisionBrief: {
      label: "Your Mexico Decision Brief",
      title: "Where things stand, at a glance.",
      readiness: "Readiness",
      topMatch: "Leading City Match",
      priorities: "Your Strongest Priorities",
      considerations: "Worth A Closer Look",
      nextActionsCount: (n) => `Your Next ${n} Highest-Priority Actions`,
    },
    cityComparison: {
      label: "City Comparison Workspace",
      title: "Why each match, side by side.",
      description: (count) => `Your top ${count} city match${count > 1 ? "es" : ""}, ranked by your own Blueprint answers — not a guarantee, just where your answers point today.`,
      currentTopMatch: "Current Top Match",
      match: "Match",
      strongestSignals: "Strongest Match Signals",
      strengths: "Strengths",
      tradeoffs: "Trade-offs",
      readGuide: "Read The Guide",
      costPaceDetails: "Cost, Pace & Practical Details",
      verifyPersonally: "Verify Personally",
    },
    trustedPartnerWorkspace: {
      label: "Trusted Partner & Connector Workspace",
      title: (cityName) => `Who you'll likely need for ${cityName}.`,
      canIntroduce: "Path To Mexico Can Help Introduce",
      handleDirectly: "You Handle This Directly",
      readGuide: "Read The Guide",
    },
  },
  es: {
    nowNextLater: { now: "Ahora", comingUp: "Próximamente", later: "Más Adelante" },
    adaptiveChecklist: {
      label: "Lista De Verificación Adaptativa De Reubicación",
      title: "Ordenada según tu situación, no solo el calendario.",
      description: (
        <>
          Esto reordena las propias tareas de tu plan según su relevancia para tus respuestas
          específicas — cronograma, hogar, claridad de presupuesto, familiaridad con la residencia
          y preparación. Es orientación general de planeación, no asesoría legal, fiscal,
          financiera o médica. Las tareas marcadas{" "}
          <span className="font-semibold text-zinc-950">"Necesita un profesional"</span> deben
          confirmarse con un profesional calificado antes de actuar.
        </>
      ),
      nextHighestPriority: (n) => `Tus Próximas ${n} Acciones De Mayor Prioridad`,
      doNow: "Hacer Ahora",
      doNext: "Hacer Después",
      laterMore: (n) => `Más Adelante · ${n} tareas más`,
    },
    relocationTimeline: {
      label: "Cronograma De Reubicación",
      title: (cityName) => `Tu plan para ${cityName}, en secuencia.`,
      blueprintSays: (label) => (
        <>
          Tu Blueprint dice <span className="font-semibold text-zinc-950">{label.toLowerCase()}</span> —
          los periodos de abajo reflejan eso.
        </>
      ),
      currentFocus: "Tu Enfoque Actual",
      dependsOnDate: "Depende De Una Fecha De Mudanza Confirmada",
      nothingYet: "Todavía no hay nada aquí según tus propias respuestas — eso es lo esperado, no una carencia.",
    },
    readinessAssessment: {
      label: "Evaluación De Preparación Para Mudarte",
      title: "Exactamente dónde estás, y por qué.",
      description: "Un desglose determinista de tu puntaje de preparación — sin IA, sin adivinar. Todo lo de abajo viene directamente de tus propias 6 respuestas del Blueprint.",
      overallReadiness: "Preparación General",
      archetype: "Arquetipo",
      breakdown: "Tu Desglose De Preparación",
      points: "puntos",
      primaryStrengths: "Fortalezas Principales",
      noStrengths: "Ninguna respuesta individual destaca todavía — eso es normal en esta etapa.",
      strengthSuffix: "— clara y decisiva.",
      biggestGaps: "Mayores Brechas De Preparación",
      noGaps: "Nada destaca como una brecha — tus respuestas son consistentemente claras.",
      opportunities: "Principales Oportunidades De Mejora",
      readGuide: "Leer La Guía",
      confidenceFactors: "Factores De Confianza",
      validatePersonally: "Validar Personalmente",
      highestImpact: "Próximas Acciones Con El Mayor Impacto",
    },
    conciergeWorkspace: {
      label: "Espacio De Concierge",
      title: "Tu reubicación, dividida honestamente.",
    },
    costPlanner: {
      label: "Planificador De Costos",
      title: (cityName) => `Un rango de planeación para vivir en ${cityName}.`,
      description: "Estos son rangos de planeación, no precios exactos ni garantías. Los costos reales varían según la ubicación exacta, la temporada, el tipo de cambio, el hogar y el estilo de vida — úsalo como punto de partida para planear, no como una cotización.",
      estimatedTotal: "Total Mensual Estimado",
      needsVerification: "Requiere verificación personal",
      majorCostDrivers: "Principales Factores De Costo",
      assumptions: "Supuestos Utilizados",
      verifyPersonally: "Verificar Personalmente",
      goDeeper: "Profundizar",
    },
    decisionBrief: {
      label: "Tu Resumen De Decisión De México",
      title: "Dónde estás parado, de un vistazo.",
      readiness: "Preparación",
      topMatch: "Ciudad Con Mayor Coincidencia",
      priorities: "Tus Prioridades Más Fuertes",
      considerations: "Vale La Pena Revisar Más De Cerca",
      nextActionsCount: (n) => `Tus Próximas ${n} Acciones De Mayor Prioridad`,
    },
    cityComparison: {
      label: "Espacio De Comparación De Ciudades",
      title: "Por qué cada coincidencia, lado a lado.",
      description: (count) => `Tus ${count} mejores coincidencias de ciudad, ordenadas según tus propias respuestas del Blueprint — no es una garantía, solo hacia dónde apuntan tus respuestas hoy.`,
      currentTopMatch: "Mejor Coincidencia Actual",
      match: "Coincidencia",
      strongestSignals: "Señales De Coincidencia Más Fuertes",
      strengths: "Fortalezas",
      tradeoffs: "Contras",
      readGuide: "Leer La Guía",
      costPaceDetails: "Costo, Ritmo Y Detalles Prácticos",
      verifyPersonally: "Verificar Personalmente",
    },
    trustedPartnerWorkspace: {
      label: "Espacio De Socios Y Conexiones De Confianza",
      title: (cityName) => `A quién probablemente necesitarás para ${cityName}.`,
      canIntroduce: "Path To Mexico Puede Ayudar A Conectarte",
      handleDirectly: "Tú Lo Manejas Directamente",
      readGuide: "Leer La Guía",
    },
  },
};
