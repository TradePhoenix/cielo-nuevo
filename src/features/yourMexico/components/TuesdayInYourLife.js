import CitySection from "./CitySection";

// Deliberately an ordinary weekday, not a highlight reel — the goal is a
// visitor picturing routine life here, not a vacation.
export default function TuesdayInYourLife({ city }) {
  const beats = city.tuesdayInYourLife;
  if (!beats || beats.length === 0) return null;

  return (
    <CitySection eyebrow="A Tuesday In Your New Life" title={`An ordinary day in ${city.name}`}>
      <div className="grid gap-8 sm:grid-cols-3">
        {beats.map((beat) => (
          <div key={beat.time}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{beat.time}</p>
            <p className="mt-3 text-base leading-relaxed text-zinc-700">{beat.vignette}</p>
          </div>
        ))}
      </div>
    </CitySection>
  );
}
