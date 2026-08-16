import { renderHook, act } from "@testing-library/react";
import { useCrmStore, CRM_STORAGE_KEY } from "./useCrmStore";
import { validateNewLead, applyLeadUpdate, createLead } from "../logic/leadModel";

beforeEach(() => {
  window.localStorage.clear();
});

test("the store starts EMPTY — no seed, mock, or fixture records ever ship", () => {
  const { result } = renderHook(() => useCrmStore());
  expect(result.current.leads).toEqual([]);
  const persisted = JSON.parse(window.localStorage.getItem(CRM_STORAGE_KEY));
  expect(persisted.leads).toEqual([]);
});

test("lead creation requires name + one contact method + source, nothing more", () => {
  expect(validateNewLead({ name: "A", email: "a@b.c", source: "manual" })).toEqual([]);
  expect(validateNewLead({ name: "A", phone: "+1 555", source: "whatsapp" })).toEqual([]);
  expect(validateNewLead({ name: "", email: "a@b.c", source: "manual" })).not.toEqual([]);
  expect(validateNewLead({ name: "A", source: "manual" })).not.toEqual([]);
  expect(validateNewLead({ name: "A", email: "a@b.c" })).not.toEqual([]);
});

test("added leads persist across a remount (reload)", () => {
  const first = renderHook(() => useCrmStore());
  act(() => {
    first.result.current.addLead({ name: "Maria Perez", phone: "+52 999", source: "whatsapp" });
  });
  first.unmount();

  const second = renderHook(() => useCrmStore());
  expect(second.result.current.leads).toHaveLength(1);
  expect(second.result.current.leads[0]).toMatchObject({
    name: "Maria Perez",
    source: "whatsapp",
    stage: "new-lead",
  });
});

test("editing moves stages, sets next actions, and bumps updatedAt", () => {
  const { result } = renderHook(() => useCrmStore());
  let id;
  act(() => {
    id = result.current.addLead({ name: "Lee", email: "l@e.e", source: "blueprint" }).id;
  });
  act(() => {
    result.current.updateLead(id, {
      stage: "fit-call-booked",
      nextAction: "Prep call notes",
      nextActionDate: "2026-08-20",
      lastContact: "2026-08-16",
    });
  });
  const lead = result.current.leads[0];
  expect(lead.stage).toBe("fit-call-booked");
  expect(lead.nextAction).toBe("Prep call notes");
  expect(lead.nextActionDate).toBe("2026-08-20");
  expect(lead.updatedAt >= lead.createdAt).toBe(true);
});

test("an unknown stage id is rejected rather than stored", () => {
  const base = createLead({ name: "X", email: "x@x.x", source: "manual" });
  expect(applyLeadUpdate(base, { stage: "not-a-stage" }).stage).toBe("new-lead");
});

test("picking a service fills an empty estimate but never overwrites a typed one", () => {
  const base = createLead({ name: "X", email: "x@x.x", source: "manual" });
  expect(applyLeadUpdate(base, { serviceInterest: "roadmap" }).estimatedValue).toBe(499);
  const priced = createLead({ name: "Y", email: "y@y.y", source: "manual", estimatedValue: 1200 });
  expect(applyLeadUpdate(priced, { serviceInterest: "fit-call" }).estimatedValue).toBe(1200);
});

test("Blueprint leads carry surfaced qualification fields, not a blob", () => {
  const { result } = renderHook(() => useCrmStore());
  act(() => {
    result.current.addLead({
      name: "Blueprint Person",
      email: "bp@example.com",
      source: "blueprint",
      language: "es",
      destination: "Playa del Carmen",
      timeline: "6 months",
      serviceInterest: "fit-call",
      blueprintCompleted: true,
      readinessScore: 82,
    });
  });
  expect(result.current.leads[0]).toMatchObject({
    source: "blueprint",
    language: "es",
    destination: "Playa del Carmen",
    blueprintCompleted: true,
    readinessScore: 82,
    estimatedValue: 99,
  });
});

test("export/import round-trips the book of leads and rejects garbage", () => {
  const first = renderHook(() => useCrmStore());
  act(() => {
    first.result.current.addLead({ name: "Backup Me", email: "b@u.p", source: "referral" });
  });
  const backup = first.result.current.exportJson();
  first.unmount();
  window.localStorage.clear();

  const second = renderHook(() => useCrmStore());
  expect(second.result.current.leads).toEqual([]);
  let error;
  act(() => {
    error = second.result.current.importJson(backup);
  });
  expect(error).toBeNull();
  expect(second.result.current.leads[0].name).toBe("Backup Me");

  let bad;
  act(() => {
    bad = second.result.current.importJson("{\"leads\": \"nope\"}");
  });
  expect(typeof bad).toBe("string");
  expect(second.result.current.leads).toHaveLength(1);
});

test("removing a lead deletes it permanently", () => {
  const { result } = renderHook(() => useCrmStore());
  let id;
  act(() => {
    id = result.current.addLead({ name: "Temp", email: "t@t.t", source: "manual" }).id;
  });
  act(() => result.current.removeLead(id));
  expect(result.current.leads).toEqual([]);
});
