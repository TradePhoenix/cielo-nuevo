import React, { useState } from "react";
import {
  SOP_DOCS,
  KALEN_DECISIONS,
  NEXT_ACTION_RULE,
  DELIVERY_BOUNDARY,
} from "./data/deliverySops";

// Internal Client Delivery section of /developer-dashboard. Procedures
// only — no client records, no PII, no credentials. Styling follows the
// dashboard's established language (white cards, zinc borders, eyebrow
// labels); no new design system.

export default function OperationsSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="mt-20" data-testid="operations-section">
      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Operating System</p>
      <h2 className="mt-2 text-3xl font-light">Client Delivery</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">{DELIVERY_BOUNDARY}</p>
      <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-zinc-950">{NEXT_ACTION_RULE}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="sop-cards">
        {SOP_DOCS.map((sop) => (
          <button
            key={sop.id}
            type="button"
            onClick={() => setOpenId(openId === sop.id ? null : sop.id)}
            aria-expanded={openId === sop.id}
            className={`border bg-white p-5 text-left transition hover:border-zinc-950 ${
              openId === sop.id ? "border-zinc-950" : "border-zinc-300"
            }`}
          >
            <div className="text-base font-medium">{sop.title}</div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{sop.summary}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              {openId === sop.id ? "Close" : "Open SOP"}
            </p>
          </button>
        ))}
      </div>

      {SOP_DOCS.filter((sop) => sop.id === openId).map((sop) => (
        <article key={sop.id} className="mt-6 border border-zinc-950 bg-white p-6 md:p-8" data-testid="sop-detail">
          <h3 className="text-2xl font-light">{sop.title}</h3>
          <div className="mt-6 grid gap-8">
            {sop.sections.map((section) => (
              <div key={section.heading}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">{section.heading}</p>
                <ul className="grid gap-2">
                  {section.items.map((item, index) => (
                    <li
                      key={index}
                      className={`border-l-2 pl-4 text-sm leading-relaxed ${
                        item.includes("BUSINESS DECISION REQUIRED")
                          ? "border-[#d8a15f] text-zinc-950"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      ))}

      <div className="mt-12" data-testid="kalen-decisions">
        <h3 className="text-xl font-light">
          Kalen Decisions Required
          <span className="ml-3 text-sm text-zinc-500">{KALEN_DECISIONS.length} open business policies</span>
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {KALEN_DECISIONS.map((d) => (
            <div key={d.decision} className="border border-[#d8a15f]/60 bg-white p-5">
              <div className="text-base font-medium">{d.decision}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{d.why}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-950">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Recommended · </span>
                {d.recommendedDefault}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                <span className="uppercase tracking-[0.15em]">Tradeoff · </span>
                {d.risk}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
