// My Mexico Plan — short, natural-sentence phrasings of each Blueprint
// archetype (see blueprint/data/copy.js ARCHETYPES), used to build the
// plan's opening line: "You told us this is about ___." Kept here, in My
// Mexico Plan's own data layer, rather than added to Blueprint's copy
// file — this phrasing is specific to how the Plan opens, not a Blueprint
// concern, and Blueprint's own content stays untouched.
//
// PTM Spanish-parity pass: values became `{ en, es }`.

export const ANCHOR_PHRASES = {
  retiree: { en: "starting your next chapter", es: "empezar tu próximo capítulo" },
  remote: { en: "building a life your work can travel with", es: "construir una vida que tu trabajo pueda acompañar" },
  family: { en: "the life your family gets to live", es: "la vida que tu familia podrá vivir" },
  entrepreneur: { en: "relocating your ambition, not just your address", es: "reubicar tu ambición, no solo tu dirección" },
  freshStart: { en: "a different rhythm of life", es: "un ritmo de vida diferente" },
};

export const DEFAULT_ANCHOR_PHRASE = ANCHOR_PHRASES.freshStart;
