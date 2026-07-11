import CitySection from "./CitySection";
import { FOUNDER, TESTIMONIALS } from "../../../data/trustContent";

// A real founder quote and a real client testimonial, reused verbatim from
// the homepage — the audit found these already existed and already worked,
// but went silent everywhere a visitor was actually deciding. This is the
// fix: the same trust signal, carried into Your Mexico.
export default function TrustMoment() {
  const testimonial = TESTIMONIALS[0];

  return (
    <CitySection eyebrow="From Path To Mexico" title="You're not figuring this out alone">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border border-zinc-200 bg-white p-6">
          <img
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover"
          />
          <p className="mt-4 text-lg leading-relaxed text-zinc-700">"{FOUNDER.quote}"</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {FOUNDER.name} &middot; {FOUNDER.role}
          </p>
        </div>

        <div className="border border-zinc-200 bg-white p-6">
          <p className="text-lg leading-relaxed text-zinc-700">"{testimonial.quote}"</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{testimonial.name}</p>
        </div>
      </div>
    </CitySection>
  );
}
