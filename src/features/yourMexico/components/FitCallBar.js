import { Link } from "react-router-dom";
import { FIT_CALL_PRICE } from "../../../data/trustContent";

// The one CTA reused across every Your Mexico (and now My Mexico Plan)
// screen — quiet and constant rather than a pop-up, per the product's
// "never more than one screen away" principle. Personalizes its headline
// to a city when one is in view; `message` lets a caller override the
// headline entirely for a different context (e.g. "refine this plan")
// without duplicating the rest of the component. The price is stated
// plainly here too, so it's never a surprise by the time someone reaches
// the Fit Call page itself.
export default function FitCallBar({ cityName, message }) {
  const headline =
    message ||
    (cityName
      ? `Talk through what life in ${cityName} could look like.`
      : "Talk through what your next chapter in Mexico could look like.");

  return (
    <div className="mt-16 border border-zinc-200 bg-white p-8 text-center sm:p-12">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Ready When You Are</p>
      <h3 className="mx-auto mt-4 max-w-lg text-2xl font-light leading-snug tracking-[-0.02em] sm:text-3xl">
        {headline}
      </h3>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-600">
        A Mexico Fit Call is where this gets specific — your city choice, a realistic budget,
        the residency path that fits you, and what to do first.
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">{FIT_CALL_PRICE} &middot; One Private Call</p>
      <Link
        to="/mexico-fit-call"
        className="group mt-8 inline-flex items-center gap-2 whitespace-nowrap bg-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 sm:px-9 sm:tracking-[0.22em]"
      >
        <span className="sm:hidden">Book My Fit Call</span>
        <span className="hidden sm:inline">Book My Mexico Fit Call</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
