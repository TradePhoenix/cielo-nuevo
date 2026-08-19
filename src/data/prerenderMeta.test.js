import { readFileSync } from "fs";
import { join } from "path";
import { WEDDINGS_CONTENT } from "../features/weddings/data/copy";

// SEO-engine release guards. Deliberately data/file-based (no component
// rendering, no importing the .mjs script) so it never touches
// react-router-dom or Node-only APIs at module scope — the same
// constraint as translationCoverage.test.js / weddings copy.test.js.
//
// CRA Jest runs with cwd at the project root, so scripts/ is reachable
// via process.cwd() even though it sits outside Jest's src/ roots.
const scriptSource = readFileSync(join(process.cwd(), "scripts", "prerender-meta.mjs"), "utf-8");
const seoComponentSource = readFileSync(join(process.cwd(), "src", "components", "SEO.js"), "utf-8");

describe("prerender-meta route registry", () => {
  it("covers the weddings routes", () => {
    expect(scriptSource).toContain('path: "/weddings"');
    expect(scriptSource).toContain('path: "/weddings/inquire"');
  });

  it("sources weddings metadata from the weddings copy module (single source of truth)", () => {
    // The registry must extract from copy.js — never hardcode wedding
    // strings — so positioning changes (like the jungle-Tulum model)
    // flow into prerendered HTML automatically.
    expect(scriptSource).toContain("src/features/weddings/data/copy.js");
    expect(scriptSource).not.toContain("Sacred Unions"); // no hardcoded title text
  });

  it("never registers private/internal routes", () => {
    for (const banned of ["developer-dashboard", "partner-network/admin", "/dashboard", "concept/"]) {
      expect(scriptSource).not.toContain(`path: "${banned}`);
      expect(scriptSource).not.toContain(`path: "/${banned}`);
    }
  });

  it("contains no localhost or non-production URLs", () => {
    expect(scriptSource).not.toMatch(/localhost|127\.0\.0\.1|http:\/\//);
  });

  it("fails loudly rather than shipping bad metadata", () => {
    // assertFound is the loud-failure contract: extraction misses abort
    // the build instead of silently emitting stale or empty tags.
    expect(scriptSource).toContain("assertFound");
    expect(scriptSource).toContain("process.exit(1)");
  });
});

describe("canonical domain", () => {
  it("keeps the established non-www production domain in client-side SEO", () => {
    expect(seoComponentSource).toContain('const SITE_URL = "https://pathtomexico.com"');
    expect(seoComponentSource).not.toMatch(/localhost/);
  });
});

describe("weddings prerender metadata (extracted the way the script extracts it)", () => {
  // Mirror extractField()'s first-occurrence regex so this test proves the
  // strings the build will actually emit, not just what copy.js exports.
  const copySource = readFileSync(
    join(process.cwd(), "src", "features", "weddings", "data", "copy.js"),
    "utf-8"
  );
  const extract = (field) => {
    const match = copySource.match(new RegExp(`${field}:\\s*\\n?\\s*"([^"]+)"`));
    return match && match[1];
  };

  it("emits the jungle-Tulum title and description for /weddings", () => {
    expect(extract("seoTitle")).toBe(WEDDINGS_CONTENT.en.seoTitle);
    expect(extract("seoTitle")).toContain("Maya Weddings in Tulum");
    expect(extract("seoDescription")).toContain("private jungle setting in Tulum");
  });

  it("emits inquiry-specific metadata for /weddings/inquire", () => {
    expect(extract("inquirySeoTitle")).toBe(WEDDINGS_CONTENT.en.inquirySeoTitle);
    expect(extract("inquirySeoTitle")).toContain("Tulum");
  });

  it("emits no retired multi-venue metadata", () => {
    for (const field of ["seoTitle", "seoDescription", "inquirySeoTitle", "inquirySeoDescription"]) {
      const value = extract(field).toLowerCase();
      for (const banned of ["ballroom", "beach", "cenote", "hacienda", "villa"]) {
        expect(value).not.toContain(banned);
      }
    }
  });
});
