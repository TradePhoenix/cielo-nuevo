// CX-008 — Living Destination Atlas: focused coverage for the pure
// filtering/grouping logic. Deliberately router-free (no react-router-dom
// import, directly or transitively) — this project's Jest environment
// can't currently resolve that package (a pre-existing, unrelated gap; see
// ENG-023's own test files for the same constraint), so YourMexicoPage.js
// itself can't be rendered here. atlasGroups.js has no such dependency, so
// every behavior that actually lives in this file — not just JSX wiring —
// is fully covered.

import { CITY_PROFILES } from "../../../decisionEngine/data/cityProfiles";
import { getAllCities } from "../logic/cityLookup";
import {
  REGION_GROUPS,
  LIFESTYLE_FILTERS,
  getRegionIdForCity,
  getRegionGroup,
  filterAtlasCities,
  prioritizeAtlasCities,
} from "./atlasGroups";

describe("REGION_GROUPS covers every real destination exactly once", () => {
  test("every CITY_PROFILES id has a region, no duplicates, no invented ids", () => {
    const allIds = CITY_PROFILES.map((c) => c.id);
    const groupedIds = REGION_GROUPS.flatMap((group) => group.cityIds);

    expect(groupedIds.length).toBe(allIds.length);
    expect(new Set(groupedIds).size).toBe(groupedIds.length); // no duplicates across groups
    expect([...groupedIds].sort()).toEqual([...allIds].sort()); // exact same set, nothing invented

    allIds.forEach((id) => {
      expect(getRegionIdForCity(id)).not.toBeNull();
    });
  });

  test("getRegionIdForCity returns null for an unknown id rather than throwing", () => {
    expect(getRegionIdForCity("not-a-real-city")).toBeNull();
  });

  test("getRegionGroup resolves a real region id and returns null for an invalid one", () => {
    expect(getRegionGroup("caribbean-coast")).not.toBeNull();
    expect(getRegionGroup("nonexistent")).toBeNull();
  });
});

describe("LIFESTYLE_FILTERS map to real, existing city tags only", () => {
  test("every filter's tag is used by at least one real city profile", () => {
    LIFESTYLE_FILTERS.forEach((filter) => {
      const usedByAtLeastOneCity = CITY_PROFILES.some((city) => city.tags.includes(filter.tag));
      expect(usedByAtLeastOneCity).toBe(true);
    });
  });
});

describe("filterAtlasCities — region + lifestyle combine predictably", () => {
  const allCities = getAllCities();

  test("no filters (all destinations state) returns every destination", () => {
    const result = filterAtlasCities(allCities, { regionId: "all", lifestyleIds: [] });
    expect(result.length).toBe(allCities.length);
  });

  test("a region filter returns only that region's cities", () => {
    const result = filterAtlasCities(allCities, { regionId: "caribbean-coast", lifestyleIds: [] });
    expect(result.map((c) => c.id).sort()).toEqual(["playa-del-carmen", "riviera-maya", "tulum"].sort());
  });

  test("a single lifestyle filter returns only cities carrying that tag", () => {
    const result = filterAtlasCities(allCities, { regionId: "all", lifestyleIds: ["heritage"] });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((city) => expect(city.tags).toContain("heritage"));
  });

  test("multiple lifestyle filters combine with AND, not OR", () => {
    const beachOnly = filterAtlasCities(allCities, { regionId: "all", lifestyleIds: ["beach"] });
    const beachAndUrban = filterAtlasCities(allCities, { regionId: "all", lifestyleIds: ["beach", "urban"] });
    expect(beachAndUrban.length).toBeLessThanOrEqual(beachOnly.length);
    beachAndUrban.forEach((city) => {
      expect(city.tags).toContain("beach");
      expect(city.tags).toContain("urban");
    });
  });

  test("region + lifestyle combine together (both must match)", () => {
    const result = filterAtlasCities(allCities, { regionId: "inland-culture", lifestyleIds: ["heritage"] });
    result.forEach((city) => {
      expect(["merida", "santa-elena"]).toContain(city.id);
      expect(city.tags).toContain("heritage");
    });
  });

  test("an impossible combination safely returns an empty array, never throws", () => {
    // Santa Elena/Mérida (inland-culture) never carry "beach".
    expect(() =>
      filterAtlasCities(allCities, { regionId: "inland-culture", lifestyleIds: ["beach"] })
    ).not.toThrow();
    const result = filterAtlasCities(allCities, { regionId: "inland-culture", lifestyleIds: ["beach"] });
    expect(result).toEqual([]);
  });

  test("resetting to {regionId: 'all', lifestyleIds: []} is equivalent to no filtering at all", () => {
    const filtered = filterAtlasCities(allCities, { regionId: "yucatan-gulf-coast", lifestyleIds: ["quiet"] });
    expect(filtered.length).toBeLessThan(allCities.length);

    const reset = filterAtlasCities(allCities, { regionId: "all", lifestyleIds: [] });
    expect(reset.length).toBe(allCities.length);
  });

  test("handles missing/undefined options without throwing", () => {
    expect(() => filterAtlasCities(allCities)).not.toThrow();
    expect(filterAtlasCities(allCities).length).toBe(allCities.length);
  });
});

describe("prioritizeAtlasCities — Blueprint-aware ordering without re-scoring", () => {
  const allCities = getAllCities();

  test("matched cities move to the front in their given (already-ranked) order", () => {
    const matchedIds = ["sisal", "tulum"];
    const result = prioritizeAtlasCities(allCities, matchedIds);
    expect(result[0].id).toBe("sisal");
    expect(result[1].id).toBe("tulum");
  });

  test("every city is still present exactly once — nothing dropped, nothing duplicated", () => {
    const matchedIds = ["celestun", "merida", "playa-del-carmen"];
    const result = prioritizeAtlasCities(allCities, matchedIds);
    expect(result.length).toBe(allCities.length);
    expect(new Set(result.map((c) => c.id)).size).toBe(allCities.length);
  });

  test("no matches (visitor without completed Blueprint) returns the original order unchanged", () => {
    const result = prioritizeAtlasCities(allCities, []);
    expect(result.map((c) => c.id)).toEqual(allCities.map((c) => c.id));
  });
});

describe("all 11 destinations are reachable through the Atlas's own data path", () => {
  test("getAllCities() × REGION_GROUPS × LIFESTYLE_FILTERS never lose a destination", () => {
    const allCities = getAllCities();
    expect(allCities.length).toBe(11);
    allCities.forEach((city) => {
      const inSomeRegion = REGION_GROUPS.some((group) => group.cityIds.includes(city.id));
      expect(inSomeRegion).toBe(true);
    });
  });
});
