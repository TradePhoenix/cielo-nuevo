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

export const PROLOGUE = {
  id: "the-decision",
  title: "The Decision",
  framing:
    "You've already done the hardest part — you looked at your own life honestly and decided to find out if this was real. Everything below is just logistics now.",
};

export const CHAPTERS = [
  {
    id: "getting-ready",
    title: "Getting Ready",
    phaseLabel: "Early Research",
    days: { start: 0, end: 30 },
    framing:
      "This chapter is about research, not action — get your bearings before you commit money or dates. Nothing here is urgent, but everything here makes the rest of the plan easier.",
    closingLine: "You've stopped wondering and started preparing. That shift matters more than any single task on this list.",
  },
  {
    id: "making-it-real",
    title: "Making It Real",
    phaseLabel: "Getting Serious",
    days: { start: 31, end: 60 },
    framing:
      "The abstract starts turning into logistics — banking, a housing shortlist, a real budget instead of a guess. This is where “maybe” quietly becomes “when.”",
    closingLine: "Your plan has a shape now. From here, it's mostly execution.",
  },
  {
    id: "the-countdown",
    title: "The Countdown",
    phaseLabel: "Making Moves",
    days: { start: 61, end: 90 },
    framing:
      "This is the part that feels the most real — and often the most nerve-wracking. That's normal. Booking flights and finalizing a lease makes it official in a way research never does.",
    closingLine: "You've made it through the hardest part of deciding. What's left is logistics.",
  },
  {
    id: "the-move",
    title: "The Move",
    phaseLabel: "The Move",
    days: { start: 91, end: 180 },
    framing:
      "Arrival, temporary housing, and the adjustment period the Honest Truth already warned you about — now it's not a warning, it's just what this month looks like.",
    closingLine: "The version of you that used to just talk about this doesn't exist anymore. You're living it.",
  },
  {
    id: "becoming-local",
    title: "Becoming Local",
    phaseLabel: "Becoming Local",
    days: { start: 181, end: 365 },
    framing:
      "Community, routine, and residency — if that's part of your plan — settle in. The Tuesday you once had to imagine is starting to just be your Tuesday.",
    closingLine: "A year ago this was a question. Now it's just your life.",
  },
];
