import { CRM_STAGES } from "../data/crmConstants";
import { createLead } from "./leadModel";
import {
  classifyAttention,
  crmMetrics,
  filterLeads,
  isActiveLead,
  needsAttention,
  sortLeadsForTable,
  stageSummary,
  totalPipelineValue,
} from "./pipeline";

const TODAY = "2026-08-16";
const NOW = new Date("2026-08-16T12:00:00Z");

function lead(overrides = {}) {
  return createLead(
    { name: "Test Lead", email: "t@example.com", source: "manual", ...overrides },
    NOW
  );
}

describe("stages", () => {
  it("has exactly the nine launch pipeline stages, closed last", () => {
    expect(CRM_STAGES.map((s) => s.id)).toEqual([
      "new-lead", "contacted", "fit-call-booked", "fit-call-completed",
      "roadmap-offered", "roadmap-purchased", "active-client", "follow-up", "closed",
    ]);
    expect(CRM_STAGES.filter((s) => s.kind === "closed").map((s) => s.id)).toEqual(["closed"]);
  });

  it("every stage is representable on a lead and classified active/closed correctly", () => {
    CRM_STAGES.forEach((stage) => {
      const l = lead({ stage: stage.id });
      expect(l.stage).toBe(stage.id);
      expect(isActiveLead(l)).toBe(stage.kind === "active");
    });
  });
});

describe("attention classification", () => {
  it("flags overdue, today, missing, and scheduled", () => {
    expect(classifyAttention(lead({ nextAction: "Call", nextActionDate: "2026-08-10" }), TODAY)).toBe("overdue");
    expect(classifyAttention(lead({ nextAction: "Call", nextActionDate: TODAY }), TODAY)).toBe("today");
    expect(classifyAttention(lead({}), TODAY)).toBe("missing");
    expect(classifyAttention(lead({ nextAction: "Call" }), TODAY)).toBe("missing");
    expect(classifyAttention(lead({ nextAction: "Call", nextActionDate: "2026-09-01" }), TODAY)).toBe("scheduled");
  });

  it("closed leads never demand attention", () => {
    expect(classifyAttention(lead({ stage: "closed" }), TODAY)).toBeNull();
    expect(needsAttention([lead({ stage: "closed" })], TODAY)).toHaveLength(0);
  });

  it("orders needs-attention overdue (oldest first), then today, then missing", () => {
    const list = needsAttention(
      [
        lead({ name: "M", nextAction: "" }),
        lead({ name: "T", nextAction: "x", nextActionDate: TODAY }),
        lead({ name: "O2", nextAction: "x", nextActionDate: "2026-08-12" }),
        lead({ name: "O1", nextAction: "x", nextActionDate: "2026-08-01" }),
      ],
      TODAY
    );
    expect(list.map(({ lead: l }) => l.name)).toEqual(["O1", "O2", "T", "M"]);
  });
});

describe("pipeline value and metrics", () => {
  const book = [
    lead({ name: "A", stage: "new-lead", serviceInterest: "fit-call" }), // 99 derived
    lead({ name: "B", stage: "fit-call-booked", estimatedValue: 499 }),
    lead({ name: "C", stage: "roadmap-offered", estimatedValue: 499, nextAction: "x", nextActionDate: "2026-08-01" }),
    lead({ name: "D", stage: "active-client", estimatedValue: 2000, nextAction: "x", nextActionDate: TODAY }),
    lead({ name: "E", stage: "closed", estimatedValue: 499 }),
  ];

  it("derives value only from an explicitly selected service, never invents it", () => {
    expect(lead({ serviceInterest: "fit-call" }).estimatedValue).toBe(99);
    expect(lead({ serviceInterest: "guided-landing" }).estimatedValue).toBeNull();
    expect(lead({}).estimatedValue).toBeNull();
  });

  it("excludes closed leads from pipeline value", () => {
    expect(totalPipelineValue(book)).toBe(99 + 499 + 499 + 2000);
  });

  it("summarizes every stage with counts and values", () => {
    const summary = stageSummary(book);
    expect(summary).toHaveLength(9);
    expect(summary.find((s) => s.stage.id === "closed")).toMatchObject({ count: 1, value: 499 });
    expect(summary.find((s) => s.stage.id === "new-lead")).toMatchObject({ count: 1, value: 99 });
  });

  it("computes top-line metrics", () => {
    const m = crmMetrics(book, TODAY);
    expect(m).toMatchObject({
      activeLeads: 4,
      newLeads: 1,
      fitCallsBooked: 1,
      roadmapsOffered: 1,
      activeClients: 1,
      overdue: 1,
      dueToday: 1,
      missingNextAction: 2, // A and B have no next action
      pipelineValue: 3097,
    });
  });

  it("filters by stage, source, attention, and activity", () => {
    expect(filterLeads(book, { stage: "closed", activity: "all" }, TODAY)).toHaveLength(1);
    expect(filterLeads(book, { activity: "closed" }, TODAY).map((l) => l.name)).toEqual(["E"]);
    expect(filterLeads(book, { activity: "active" }, TODAY)).toHaveLength(4);
    expect(filterLeads(book, { attention: "overdue" }, TODAY).map((l) => l.name)).toEqual(["C"]);
    expect(filterLeads(book, { attention: "missing" }, TODAY)).toHaveLength(2);
    expect(filterLeads(book, { source: "blueprint" }, TODAY)).toHaveLength(0);
  });

  it("sorts the table most-urgent first with closed leads last", () => {
    const names = sortLeadsForTable(book, TODAY).map((l) => l.name);
    expect(names[0]).toBe("C"); // overdue date sorts first
    expect(names[1]).toBe("D"); // today
    expect(names[names.length - 1]).toBe("E"); // closed last
  });
});
