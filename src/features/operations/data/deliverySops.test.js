// Guardrail tests for the Client Delivery Operating System (launch fix #5).
import { SOP_DOCS, KALEN_DECISIONS, NEXT_ACTION_RULE, DELIVERY_BOUNDARY } from "./deliverySops";
import { CRM_STAGES } from "../../crm/data/crmConstants";
import { FIT_CALL_PRICE, ROADMAP_PRICE } from "../../../data/trustContent";

const ALL_TEXT = JSON.stringify(SOP_DOCS) + JSON.stringify(KALEN_DECISIONS);
const byId = (id) => SOP_DOCS.find((s) => s.id === id);
const sopText = (id) => JSON.stringify(byId(id));

test("all eight required SOPs exist", () => {
  const ids = SOP_DOCS.map((s) => s.id);
  expect(ids).toEqual([
    "fit-call",
    "roadmap",
    "guided-landing",
    "communication",
    "partner-coordination",
    "escalation",
    "completion-aftercare",
    "testimonials",
  ]);
  SOP_DOCS.forEach((sop) => {
    expect(sop.title).toBeTruthy();
    expect(sop.sections.length).toBeGreaterThan(0);
    sop.sections.forEach((section) => expect(section.items.length).toBeGreaterThan(0));
  });
});

test("the Fit Call SOP covers prep, structure, notes, close, and follow-up at the verified 60-minute duration", () => {
  const headings = byId("fit-call").sections.map((s) => s.heading).join(" ");
  for (const part of ["Pre-Call", "Call Structure", "Notes", "Close", "Follow-Up"]) {
    expect(headings).toContain(part);
  }
  expect(sopText("fit-call")).toContain("60 minutes");
});

test("the Roadmap SOP covers qualification through delivery and never invents turnaround/revision policy", () => {
  const headings = byId("roadmap").sections.map((s) => s.heading).join(" ");
  for (const part of ["Qualification", "Intake", "Research", "Roadmap Structure", "Quality Control", "Delivery"]) {
    expect(headings).toContain(part);
  }
  const delivery = JSON.stringify(byId("roadmap").sections.find((s) => s.heading.includes("Delivery")));
  expect(delivery).toContain("Turnaround target: BUSINESS DECISION REQUIRED");
  expect(delivery).toContain("Revision policy: BUSINESS DECISION REQUIRED");
});

test("the Guided Landing SOP never carries a dollar amount", () => {
  expect(sopText("guided-landing")).not.toMatch(/\$\s?\d/);
  expect(sopText("guided-landing")).toContain("no fixed Guided Landing price");
});

test("service prices referenced anywhere match the canonical constants", () => {
  expect(FIT_CALL_PRICE).toBe("$99 USD");
  expect(ROADMAP_PRICE).toBe("$499 USD");
  // SOP titles carry the only dollar figures, and only the approved ones.
  const amounts = ALL_TEXT.match(/\$\s?\d[\d,]*/g) || [];
  amounts.forEach((amount) => expect(["$99", "$499"]).toContain(amount.replace(/\s/, "")));
});

test("no invented legal, medical, tax, or outcome guarantees", () => {
  expect(ALL_TEXT).not.toMatch(/guarantee[ds]? (residency|approval|visa|outcome|result)/i);
  // 24/7 may only ever appear as a prohibition ("never promise 24/7 …"),
  // never as an offered commitment.
  const dayNightMentions = ALL_TEXT.match(/[^"]*24\/7[^"]*/g) || [];
  expect(dayNightMentions.length).toBeGreaterThan(0);
  dayNightMentions.forEach((mention) => expect(mention).toMatch(/never promise|no-24\/7|assume 24\/7/i));
  expect(ALL_TEXT).toContain("not an emergency service");
  expect(DELIVERY_BOUNDARY).toContain("not an immigration law firm");
});

test("client-facing workflows enforce next-action discipline", () => {
  expect(NEXT_ACTION_RULE).toContain("NEXT ACTION");
  for (const id of ["fit-call", "roadmap", "guided-landing", "completion-aftercare"]) {
    expect(sopText(id)).toContain("NEXT ACTION");
  }
});

test("SOP stage references align with the live CRM vocabulary", () => {
  const stageLabels = CRM_STAGES.map((s) => s.label);
  for (const referenced of ["Fit Call Completed", "Roadmap Purchased", "Follow-Up / Nurture", "Closed / Not Now"]) {
    expect(stageLabels).toContain(referenced);
  }
});

test("no client PII or credentials are hardcoded", () => {
  expect(ALL_TEXT).not.toMatch(/@(gmail|hotmail|yahoo|outlook)\./i);
  expect(ALL_TEXT).not.toMatch(/\+\d{2,3}\s?\d{3}/);
  expect(ALL_TEXT).not.toMatch(/sk-[A-Za-z0-9]/);
});

test("every Kalen decision has the full decision framework", () => {
  expect(KALEN_DECISIONS.length).toBeGreaterThanOrEqual(8);
  KALEN_DECISIONS.forEach((d) => {
    expect(d.decision).toBeTruthy();
    expect(d.why).toBeTruthy();
    expect(d.recommendedDefault).toBeTruthy();
    expect(d.risk).toBeTruthy();
  });
});

test("testimonial process preserves the settled Roni and Devon decisions", () => {
  const text = sopText("testimonials");
  expect(text).toContain("Roni Bridger");
  expect(text).toContain("Devon O'Tool");
  expect(text).not.toContain("O'Toole");
});
