import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { REVENUE_LEADS_FORMSPREE_ID } from "../../../data/revenueConfig";
import { trackEvent } from "../../../utils/trackEvent";

export default function ResultsCTA({ cta, readinessScore, archetypeTitle }) {
  const [formState, handleSubmit] = useForm(REVENUE_LEADS_FORMSPREE_ID);

  useEffect(() => {
    trackEvent("blueprint_results_viewed", { readinessScore, archetypeTitle });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formState.succeeded) {
      trackEvent("blueprint_lead_captured", { readinessScore, archetypeTitle });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.succeeded]);

  return (
    <div className="bg-[#0b0b0a] p-10 text-center text-white sm:p-16">
      <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
        Start Here
      </p>
      <h3 className="mx-auto max-w-2xl text-3xl font-light leading-tight tracking-[-0.04em] sm:text-5xl">
        {cta.headline}
      </h3>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
        {cta.subtext}
      </p>

      {typeof readinessScore === "number" && archetypeTitle && (
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-[0.2em] text-white/40">
          {readinessScore}/100 Readiness &middot; {archetypeTitle}
        </p>
      )}

      <Link
        to="/mexico-fit-call"
        onClick={() => trackEvent("blueprint_cta_clicked", { destination: "mexico-fit-call" })}
        className="group mt-10 inline-flex items-center gap-2 bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        {cta.buttonLabel}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Link
        to="/pricing"
        onClick={() => trackEvent("blueprint_cta_clicked", { destination: "pricing" })}
        className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-white/70 underline underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        See Pricing &amp; Book Instantly
      </Link>

      <Link
        to="/your-mexico"
        onClick={() => trackEvent("blueprint_cta_clicked", { destination: "your-mexico" })}
        className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
      >
        See What Your Next Chapter Could Look Like
      </Link>

      <div className="mx-auto mt-12 max-w-md border-t border-white/15 pt-10 text-left">
        {formState.succeeded ? (
          <p className="text-center text-sm leading-relaxed text-white/70">
            Thanks — we've got your results. Someone from Path To Mexico will follow up personally.
          </p>
        ) : (
          <>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40">
              Want A Personal Follow-Up?
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
              Leave your email and we'll reach out with next steps based on your results.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
              <input type="hidden" name="_subject" value="Blueprint Results Follow-Up Request" />
              <input type="hidden" name="readinessScore" value={readinessScore ?? ""} />
              <input type="hidden" name="archetype" value={archetypeTitle ?? ""} />
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full border border-white/20 bg-white px-5 py-3 text-sm text-zinc-950 outline-none transition focus:border-white"
                />
                <ValidationError field="firstName" errors={formState.errors} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full border border-white/20 bg-white px-5 py-3 text-sm text-zinc-950 outline-none transition focus:border-white"
                />
                <ValidationError field="email" errors={formState.errors} />
              </div>
              <button
                type="submit"
                disabled={formState.submitting}
                className="bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] disabled:opacity-60"
              >
                {formState.submitting ? "Sending..." : "Send My Follow-Up Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
