// My Mexico Plan — short, natural-sentence phrasings of each Blueprint
// archetype (see blueprint/data/copy.js ARCHETYPES), used to build the
// plan's opening line: "You told us this is about ___." Kept here, in My
// Mexico Plan's own data layer, rather than added to Blueprint's copy
// file — this phrasing is specific to how the Plan opens, not a Blueprint
// concern, and Blueprint's own content stays untouched.

export const ANCHOR_PHRASES = {
  retiree: "starting your next chapter",
  remote: "building a life your work can travel with",
  family: "the life your family gets to live",
  entrepreneur: "relocating your ambition, not just your address",
  freshStart: "a different rhythm of life",
};

export const DEFAULT_ANCHOR_PHRASE = ANCHOR_PHRASES.freshStart;
