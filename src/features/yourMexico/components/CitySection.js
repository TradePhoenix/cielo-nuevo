import CinematicReveal from "../../../components/CinematicReveal";

// Shared eyebrow/heading/spacing rhythm for every City Detail story section.
// Keeps section markup declarative in each section component while
// guaranteeing consistent typography as more sections are added.
//
// CX-003: wraps its content in CinematicReveal — since this one component
// is reused by ~10 City Detail sub-components (WhyThisFeelsLikeYou,
// TuesdayInYourLife, HonestTruth, LifestyleSnapshot, WhatLifeCosts,
// WhereYoudLive, ProsAndTradeoffs, PlanEntryCTA, KeepExploring, TrustMoment,
// and CityDetailPage's own "Compare Your Matches" section), this single
// change extends the cinematic reveal language across the whole City
// Detail story arc without touching any of those files individually.
export default function CitySection({ eyebrow, title, children }) {
  return (
    <section className="mt-16 sm:mt-20">
      <CinematicReveal>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-light leading-tight tracking-[-0.02em] sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </CinematicReveal>
    </section>
  );
}
