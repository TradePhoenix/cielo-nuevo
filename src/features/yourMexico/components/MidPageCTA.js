import { Link } from "react-router-dom";

// A lightweight, single-line exit for visitors already convinced partway
// through a City Detail page — lets them act before Keep Exploring/Compare
// present more options, without stacking a second full FitCallBar card on
// an already-long page.
export default function MidPageCTA({ cityName }) {
  return (
    <div className="mt-16 border-t border-zinc-300 pt-8 text-center">
      <p className="text-base leading-relaxed text-zinc-600">
        Already feel good about {cityName}?{" "}
        <Link
          to="/mexico-fit-call"
          className="font-semibold text-zinc-950 underline decoration-zinc-400 underline-offset-4 transition hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Book Your Mexico Fit Call
        </Link>{" "}
        — or keep exploring below.
      </p>
    </div>
  );
}
