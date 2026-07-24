import CinematicReveal from "../../../components/CinematicReveal";

// CX-008 — the Atlas's cinematic opening moment. Text-forward by design
// (matches ComparePage.js's own established eyebrow/serif-headline/
// supporting-paragraph intro pattern) rather than a new full-bleed photo
// hero — CityHero.js already owns that treatment per-destination; the
// Atlas's job is to orient, not to repeat it.
export default function AtlasIntro({ eyebrow, title, intro }) {
  return (
    <CinematicReveal>
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{intro}</p>
    </CinematicReveal>
  );
}
