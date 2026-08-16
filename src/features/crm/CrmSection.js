import React, { useMemo, useRef, useState } from "react";
import { CRM_STAGES, CRM_SOURCES, CRM_SERVICES, stageLabel, sourceLabel } from "./data/crmConstants";
import { localDateISO, validateNewLead } from "./logic/leadModel";
import {
  classifyAttention,
  crmMetrics,
  filterLeads,
  needsAttention,
  sortLeadsForTable,
  stageSummary,
} from "./logic/pipeline";
import { useCrmStore } from "./state/useCrmStore";

// Internal CRM area of /developer-dashboard. Styling follows the page's
// established language: white cards, zinc borders, eyebrow labels, light
// headings, no new design system.

const INPUT = "w-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-950";
const LABEL = "block text-[10px] uppercase tracking-[0.2em] text-zinc-500";
const BTN_DARK = "bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#d8a15f] disabled:opacity-50";
const BTN_LIGHT = "border border-zinc-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white";

const ATTENTION_STYLES = {
  overdue: "border-red-800/40 bg-red-50 text-red-800",
  today: "border-amber-700/40 bg-amber-50 text-amber-800",
  missing: "border-zinc-400 bg-zinc-100 text-zinc-700",
};
const ATTENTION_LABELS = { overdue: "Overdue", today: "Due Today", missing: "No Next Action" };

function money(value) {
  return typeof value === "number" && value > 0 ? `$${value.toLocaleString("en-US")}` : "—";
}

function AttentionPill({ kind }) {
  if (!kind || kind === "scheduled") return null;
  return (
    <span className={`inline-block border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${ATTENTION_STYLES[kind]}`}>
      {ATTENTION_LABELS[kind]}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}

function NewLeadForm({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "manual" });
  const [errors, setErrors] = useState([]);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const problems = validateNewLead(form);
    setErrors(problems);
    if (problems.length) return;
    onCreate(form);
    setForm({ name: "", email: "", phone: "", source: "manual" });
    setOpen(false);
  };

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={BTN_DARK} data-testid="crm-add-lead">
        + Add Lead
      </button>
    );
  }
  return (
    <form onSubmit={submit} className="grid w-full gap-3 border border-zinc-300 bg-white p-5 sm:grid-cols-2 lg:grid-cols-5" data-testid="crm-new-lead-form">
      <Field label="Name *"><input className={INPUT} value={form.name} onChange={set("name")} name="crm-name" /></Field>
      <Field label="Email"><input className={INPUT} value={form.email} onChange={set("email")} name="crm-email" /></Field>
      <Field label="Phone / WhatsApp"><input className={INPUT} value={form.phone} onChange={set("phone")} name="crm-phone" /></Field>
      <Field label="Source *">
        <select className={INPUT} value={form.source} onChange={set("source")} name="crm-source">
          {CRM_SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </Field>
      <div className="flex items-end gap-2">
        <button type="submit" className={BTN_DARK}>Create</button>
        <button type="button" onClick={() => setOpen(false)} className={BTN_LIGHT}>Cancel</button>
      </div>
      {errors.length > 0 && (
        <p role="alert" className="text-sm text-red-800 sm:col-span-2 lg:col-span-5">{errors.join(" ")}</p>
      )}
    </form>
  );
}

function LeadDetail({ lead, todayISO, onUpdate, onRemove, onClose }) {
  const set = (key, transform) => (e) =>
    onUpdate(lead.id, { [key]: transform ? transform(e.target.value) : e.target.value });

  return (
    <div className="border border-zinc-950 bg-white p-6" data-testid="crm-lead-detail">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h4 className="text-2xl font-light">{lead.name}</h4>
          <AttentionPill kind={classifyAttention(lead, todayISO)} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={BTN_LIGHT}
            onClick={() => onUpdate(lead.id, { lastContact: todayISO })}
            data-testid="crm-mark-contacted"
          >
            Contacted Today
          </button>
          <button type="button" className={BTN_LIGHT} onClick={onClose}>Close</button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Stage">
          <select className={INPUT} value={lead.stage} onChange={set("stage")} data-testid="crm-detail-stage">
            {CRM_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Service Interest">
          <select className={INPUT} value={lead.serviceInterest} onChange={set("serviceInterest")}>
            {CRM_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Estimated Value (USD)">
          <input
            type="number" min="0" className={INPUT}
            value={lead.estimatedValue ?? ""}
            onChange={set("estimatedValue", (v) => (v === "" ? null : Number(v)))}
            data-testid="crm-detail-value"
          />
        </Field>
        <Field label="Source">
          <select className={INPUT} value={lead.source} onChange={set("source")}>
            {CRM_SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Email"><input className={INPUT} value={lead.email} onChange={set("email")} /></Field>
        <Field label="Phone / WhatsApp"><input className={INPUT} value={lead.phone} onChange={set("phone")} /></Field>
        <Field label="Desired Destination"><input className={INPUT} value={lead.destination} onChange={set("destination")} /></Field>
        <Field label="Timeline"><input className={INPUT} value={lead.timeline} onChange={set("timeline")} /></Field>
        <Field label="Last Contact"><input type="date" className={INPUT} value={lead.lastContact} onChange={set("lastContact")} /></Field>
        <Field label="Next Action">
          <input className={INPUT} value={lead.nextAction} onChange={set("nextAction")} placeholder="e.g. Send Fit Call link" data-testid="crm-detail-next-action" />
        </Field>
        <Field label="Next Action Date">
          <input type="date" className={INPUT} value={lead.nextActionDate} onChange={set("nextActionDate")} data-testid="crm-detail-next-date" />
        </Field>
        <Field label="Fit Call Date"><input type="date" className={INPUT} value={lead.fitCallDate} onChange={set("fitCallDate")} /></Field>
      </div>

      <div className="mt-4">
        <Field label="Notes">
          <textarea className={`${INPUT} min-h-20`} value={lead.notes} onChange={set("notes")} />
        </Field>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          {sourceLabel(lead.source)} · created {String(lead.createdAt).slice(0, 10)} · updated {String(lead.updatedAt).slice(0, 10)}
          {lead.blueprintCompleted ? ` · Blueprint completed${lead.readinessScore != null ? ` (${lead.readinessScore}/100)` : ""}` : ""}
        </p>
        <button
          type="button"
          className="text-xs uppercase tracking-[0.15em] text-red-800 underline underline-offset-4 hover:text-red-900"
          onClick={() => {
            if (window.confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) {
              onRemove(lead.id);
              onClose();
            }
          }}
        >
          Delete Lead
        </button>
      </div>
    </div>
  );
}

export default function CrmSection() {
  const { leads, addLead, updateLead, removeLead, exportJson, importJson } = useCrmStore();
  const todayISO = localDateISO();
  const [selectedId, setSelectedId] = useState(null);
  const [filters, setFilters] = useState({ stage: "all", source: "all", attention: "all", activity: "active" });
  const [importError, setImportError] = useState(null);
  const fileRef = useRef(null);

  const metrics = useMemo(() => crmMetrics(leads, todayISO), [leads, todayISO]);
  const summary = useMemo(() => stageSummary(leads), [leads]);
  const attention = useMemo(() => needsAttention(leads, todayISO), [leads, todayISO]);
  const visible = useMemo(
    () => sortLeadsForTable(filterLeads(leads, filters, todayISO), todayISO),
    [leads, filters, todayISO]
  );
  const selected = leads.find((lead) => lead.id === selectedId) || null;

  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ptm-crm-backup-${todayISO}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImportError(importJson(await file.text()));
  };

  const metricTiles = [
    ["Active Leads", metrics.activeLeads],
    ["New Leads", metrics.newLeads],
    ["Fit Calls Booked", metrics.fitCallsBooked],
    ["Roadmaps Offered", metrics.roadmapsOffered],
    ["Active Clients", metrics.activeClients],
    ["Overdue Follow-Ups", metrics.overdue],
    ["Pipeline Value", money(metrics.pipelineValue)],
  ];

  return (
    <section className="mt-20" data-testid="crm-section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Lead Pipeline</p>
          <h2 className="mt-2 text-3xl font-light">CRM</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <NewLeadForm onCreate={(input) => setSelectedId(addLead(input).id)} />
          <button type="button" onClick={download} className={BTN_LIGHT}>Export Backup</button>
          <button type="button" onClick={() => fileRef.current?.click()} className={BTN_LIGHT}>Import</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onImportFile} />
        </div>
      </div>
      {importError && <p role="alert" className="mt-3 text-sm text-red-800">{importError}</p>}
      <p className="mt-3 max-w-3xl text-xs leading-relaxed text-zinc-500">
        Leads are stored in this browser only — nothing here is publicly readable, and clearing
        browser data clears the CRM. Export a backup regularly until server-side storage (behind
        auth) ships.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-2 gap-px border border-zinc-300 bg-zinc-300 sm:grid-cols-4 lg:grid-cols-7" data-testid="crm-metrics">
        {metricTiles.map(([label, value]) => (
          <div key={label} className="bg-white p-4">
            <div className="text-2xl font-light">{value}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Needs attention */}
      <div className="mt-10">
        <h3 className="mb-4 text-xl font-light">
          Needs Attention
          <span className="ml-3 text-sm text-zinc-500">
            {metrics.overdue} overdue · {metrics.dueToday} today · {metrics.missingNextAction} without a next action
          </span>
        </h3>
        {attention.length === 0 ? (
          <p className="border border-zinc-300 bg-white p-5 text-sm text-zinc-600" data-testid="crm-attention-empty">
            Every active lead has a scheduled next action. Nothing is overdue.
          </p>
        ) : (
          <div className="grid gap-2" data-testid="crm-attention-list">
            {attention.map(({ lead, attention: kind }) => (
              <button
                key={lead.id}
                type="button"
                onClick={() => setSelectedId(lead.id)}
                className="flex flex-wrap items-center justify-between gap-3 border border-zinc-300 bg-white p-4 text-left transition hover:border-zinc-950"
              >
                <span className="flex items-center gap-3">
                  <AttentionPill kind={kind} />
                  <span className="font-medium">{lead.name}</span>
                  <span className="text-sm text-zinc-500">{stageLabel(lead.stage)}</span>
                </span>
                <span className="text-sm text-zinc-600">
                  {lead.nextAction ? `${lead.nextAction} · ${lead.nextActionDate || "no date"}` : "Set a next action"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pipeline summary */}
      <div className="mt-10">
        <h3 className="mb-4 text-xl font-light">Pipeline</h3>
        <div className="grid grid-cols-2 gap-px border border-zinc-300 bg-zinc-300 sm:grid-cols-3 lg:grid-cols-9" data-testid="crm-pipeline-summary">
          {summary.map(({ stage, count, value }) => (
            <div key={stage.id} className="bg-white p-3">
              <div className="text-xl font-light">{count}</div>
              <div className="mt-1 text-[10px] uppercase leading-tight tracking-[0.12em] text-zinc-500">{stage.label}</div>
              <div className="mt-1 text-xs text-zinc-600">{money(value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + table */}
      <div className="mt-10">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <h3 className="text-xl font-light">Leads</h3>
          <select className={INPUT + " w-auto"} value={filters.activity} onChange={setFilter("activity")} data-testid="crm-filter-activity">
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </select>
          <select className={INPUT + " w-auto"} value={filters.stage} onChange={setFilter("stage")} data-testid="crm-filter-stage">
            <option value="all">All Stages</option>
            {CRM_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <select className={INPUT + " w-auto"} value={filters.source} onChange={setFilter("source")} data-testid="crm-filter-source">
            <option value="all">All Sources</option>
            {CRM_SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <select className={INPUT + " w-auto"} value={filters.attention} onChange={setFilter("attention")} data-testid="crm-filter-attention">
            <option value="all">Any Urgency</option>
            <option value="overdue">Overdue</option>
            <option value="today">Due Today</option>
            <option value="missing">No Next Action</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="border border-zinc-300 bg-white p-5 text-sm text-zinc-600" data-testid="crm-table-empty">
            No leads match. Add your first lead with “+ Add Lead”.
          </p>
        ) : (
          <div className="overflow-x-auto border border-zinc-300 bg-white">
            <table className="w-full min-w-[56rem] text-left text-sm" data-testid="crm-lead-table">
              <thead>
                <tr className="border-b border-zinc-300 text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                  {["Name", "Stage", "Source", "Destination", "Timeline", "Next Action", "Date", "Value"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedId(lead.id)}
                    className={`cursor-pointer border-b border-zinc-200 last:border-b-0 hover:bg-[#f6f1e8] ${selectedId === lead.id ? "bg-[#f6f1e8]" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {lead.name} <AttentionPill kind={classifyAttention(lead, todayISO)} />
                    </td>
                    <td className="px-4 py-3">{stageLabel(lead.stage)}</td>
                    <td className="px-4 py-3">{sourceLabel(lead.source)}</td>
                    <td className="px-4 py-3">{lead.destination || "—"}</td>
                    <td className="px-4 py-3">{lead.timeline || "—"}</td>
                    <td className="px-4 py-3">{lead.nextAction || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.nextActionDate || "—"}</td>
                    <td className="px-4 py-3">{money(lead.estimatedValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-6">
          <LeadDetail
            lead={selected}
            todayISO={todayISO}
            onUpdate={updateLead}
            onRemove={removeLead}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </section>
  );
}
