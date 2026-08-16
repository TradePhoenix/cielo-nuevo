import React from "react";
import {
  getCountdownDisplay,
  getMilestoneStates,
  LAUNCH_TIME_ZONE,
} from "./launchCountdown";
import {
  AUDIT_DATE,
  FINDING_COUNTS,
  GATES,
  getOverallReadiness,
  NEXT_CRITICAL_ACTION,
} from "./launchScorecard";

// Internal-only launch section for /developer-dashboard. This route is not
// linked publicly but IS reachable without auth — keep lead PII out of it.

const STATUS_STYLES = {
  BLOCKED: "border-red-800/40 bg-red-50 text-red-800",
  "AT RISK": "border-amber-700/40 bg-amber-50 text-amber-800",
  "ON TRACK": "border-zinc-400 bg-zinc-100 text-zinc-700",
  READY: "border-emerald-700/40 bg-emerald-50 text-emerald-800",
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-block border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] ${
        STATUS_STYLES[status] || STATUS_STYLES["ON TRACK"]
      }`}
    >
      {status}
    </span>
  );
}

export default function LaunchCommandCenter() {
  const countdown = getCountdownDisplay();
  const milestones = getMilestoneStates();
  const overall = getOverallReadiness();

  return (
    <div className="mt-20">
      {/* Countdown panel */}
      <section className="bg-zinc-950 p-8 text-[#f6f1e8] md:p-14">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Path To Mexico · Official Launch
        </p>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-light tracking-[-0.03em] md:text-6xl">
              October 1, 2026
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Countdown in {LAUNCH_TIME_ZONE} local time
            </p>
          </div>

          <div className="md:text-right">
            {countdown.mode === "countdown" ? (
              <>
                <div className="text-7xl font-light leading-none md:text-8xl">
                  {countdown.label}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
                  Days Remaining
                </p>
              </>
            ) : (
              <div className="text-5xl font-light tracking-[0.1em] md:text-6xl">
                {countdown.label}
              </div>
            )}
          </div>
        </div>

        {/* Overall readiness */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <div className="flex items-end justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              Overall Launch Readiness
            </p>
            <span className="text-4xl font-light md:text-5xl">{overall}%</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-zinc-800">
            <div
              className="h-full bg-[#f6f1e8]"
              style={{ width: `${overall}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Evidence-based audit of {AUDIT_DATE} · {FINDING_COUNTS.p0} P0 ·{" "}
            {FINDING_COUNTS.p1} P1 · {FINDING_COUNTS.p2} P2 ·{" "}
            {FINDING_COUNTS.p3} P3 findings open
          </p>
        </div>

        {/* Milestones */}
        <div className="mt-10 grid grid-cols-2 gap-px bg-zinc-800 sm:grid-cols-4 lg:grid-cols-7">
          {milestones.map((m) => (
            <div
              key={m.title}
              className={`bg-zinc-950 p-4 ${
                m.state === "past" ? "opacity-40" : ""
              } ${m.state === "current" ? "bg-zinc-900" : ""}`}
            >
              <div className="text-sm font-medium tracking-[0.1em]">
                {m.title}
                {m.state === "current" && (
                  <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Now
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next critical action */}
      <section className="border border-zinc-950 bg-white p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Next Critical Action
          </p>
          <StatusPill status="BLOCKED" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            {NEXT_CRITICAL_ACTION.severity} · {NEXT_CRITICAL_ACTION.gate} ·
            Owner: {NEXT_CRITICAL_ACTION.owner}
          </span>
        </div>
        <p className="mt-5 max-w-4xl text-xl font-light leading-relaxed text-zinc-950">
          {NEXT_CRITICAL_ACTION.action}
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-600">
          {NEXT_CRITICAL_ACTION.why}
        </p>
      </section>

      {/* Launch gates */}
      <section className="mt-14">
        <h2 className="mb-6 text-3xl font-light">Launch Gates</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GATES.map((gate) => (
            <div
              key={gate.id}
              className="flex flex-col border border-zinc-300 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-medium">{gate.name}</div>
                <span className="text-2xl font-light">{gate.score}%</span>
              </div>

              <div className="mt-3 h-1 w-full bg-zinc-200">
                <div
                  className="h-full bg-zinc-950"
                  style={{ width: `${gate.score}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <StatusPill status={gate.status} />
                <span className="text-xs text-zinc-500">
                  {gate.blockers === 0
                    ? "No P0 blockers"
                    : `${gate.blockers} P0 blocker${
                        gate.blockers > 1 ? "s" : ""
                      }`}
                  {" · "}needs {gate.required}%
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                {gate.nextAction}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
