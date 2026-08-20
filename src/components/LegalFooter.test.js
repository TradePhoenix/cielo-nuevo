import { readFileSync } from "fs";
import { join } from "path";
import { isLegalFooterHidden } from "./LegalFooter";

// Route-level guards are file-based (same constraint as prerenderMeta.test.js).
const appSource = readFileSync(join(process.cwd(), "src", "App.js"), "utf-8");
const vercelConfig = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf-8"));
const sitemap = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf-8");
const robots = readFileSync(join(process.cwd(), "public", "robots.txt"), "utf-8");

describe("legal reachability (LAUNCH-W1)", () => {
  it("renders the legal strip on public routes and hides it on internal ones", () => {
    for (const p of ["/", "/guides", "/my-mexico-blueprint", "/privacy-policy", "/weddings/inquire", "/nope"]) {
      expect(isLegalFooterHidden(p)).toBe(false);
    }
    for (const p of ["/developer-dashboard", "/partner-network/admin", "/dashboard", "/dashboard/documents"]) {
      expect(isLegalFooterHidden(p)).toBe(true);
    }
  });

  it("mounts LegalFooter at the app root and aliases /privacy and /terms", () => {
    expect(appSource).toContain("<LegalFooter />");
    expect(appSource).toContain('path="/privacy" element={<Navigate to="/privacy-policy" replace />}');
    expect(appSource).toContain('path="/terms" element={<Navigate to="/terms-of-service" replace />}');
  });

  it("issues permanent redirects for the aliases and noindex headers for internal surfaces", () => {
    expect(vercelConfig.redirects).toEqual(
      expect.arrayContaining([
        { source: "/privacy", destination: "/privacy-policy", permanent: true },
        { source: "/terms", destination: "/terms-of-service", permanent: true },
      ])
    );
    const robotsHeader = vercelConfig.headers.find((h) => h.source.includes("developer-dashboard"));
    expect(robotsHeader.headers).toEqual([{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
  });

  it("keeps the sitemap and robots on the canonical www host with the canonical legal routes", () => {
    expect(sitemap).not.toMatch(/https:\/\/pathtomexico\.com\//);
    expect(sitemap).toContain("https://www.pathtomexico.com/privacy-policy");
    expect(sitemap).toContain("https://www.pathtomexico.com/terms-of-service");
    expect(sitemap).not.toMatch(/developer-dashboard|partner-network\/admin|\/dashboard/);
    expect(robots).toContain("Sitemap: https://www.pathtomexico.com/sitemap.xml");
  });
});
