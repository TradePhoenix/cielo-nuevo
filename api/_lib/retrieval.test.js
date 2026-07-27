import { retrieveRelevantRecords } from "./retrieval.js";
import { getKnowledgeRecords } from "./knowledge/index.js";

describe("knowledge index", () => {
  test("assembles a non-trivial set of records across every category", () => {
    const records = getKnowledgeRecords();
    const categories = new Set(records.map((r) => r.category));
    expect(records.length).toBeGreaterThan(50);
    for (const expected of ["destination", "faq", "services", "fitcall", "planning-tool", "guide-summary", "roadmap"]) {
      expect(categories.has(expected)).toBe(true);
    }
  });

  test("every record has an id, a route, and at least English content", () => {
    for (const record of getKnowledgeRecords()) {
      expect(typeof record.id).toBe("string");
      expect(record.id.length).toBeGreaterThan(0);
      expect(typeof record.route).toBe("string");
      expect(typeof record.content?.en).toBe("string");
      expect(record.content.en.length).toBeGreaterThan(0);
    }
  });
});

describe("retrieveRelevantRecords", () => {
  test("finds Mérida when asked about Mérida", () => {
    const results = retrieveRelevantRecords({ message: "What is it like living in Merida?" });
    expect(results.some((r) => r.id === "destination-merida")).toBe(true);
  });

  test("finds the FAQ record for a residency question in Spanish", () => {
    const results = retrieveRelevantRecords({ message: "¿Pueden ayudar con la residencia temporal o permanente?" });
    expect(results.some((r) => r.category === "faq")).toBe(true);
  });

  test("finds the Mexico Fit Call record for a booking question", () => {
    const results = retrieveRelevantRecords({ message: "How do I book a Mexico Fit Call?" });
    expect(results.some((r) => r.id === "fit-call-what-it-is" || r.id === "service-tier-fit-call")).toBe(true);
  });

  test("returns nothing for a message with no overlap with the knowledge base", () => {
    const results = retrieveRelevantRecords({ message: "zzz qqq xyzzy plugh" });
    expect(results).toEqual([]);
  });

  test("respects maxResults", () => {
    const results = retrieveRelevantRecords({ message: "Mexico destination beach quiet family budget guide", maxResults: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });
});
