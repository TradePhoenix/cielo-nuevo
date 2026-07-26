// Destination image integrity — added after a DEST-003 release review flagged
// Cozumel's hero as "not displaying." Root cause: no real photography exists
// yet for any of the 14 new destinations (by design — see
// DEST-003-PHOTOGRAPHY-ASSET-MANIFEST.md), so they intentionally render
// DestinationImageFallback.js instead of an <img>. That audit also confirmed
// the original 11's real image references are all still valid. This test
// makes both facts permanent and automatic, so a future regression — a
// renamed/moved file, a case-mismatch that works on a case-insensitive local
// filesystem but 404s on Vercel's case-sensitive one, or a half-added
// heroImages entry — fails CI instead of only being caught by eyeballing a
// preview.
import fs from "fs";
import path from "path";
import { CITY_PROFILES } from "../../../decisionEngine/data/cityProfiles";
import { CITY_DETAILS } from "./cityDetails";

const PUBLIC_DIR = path.join(__dirname, "../../../../public");

function fileExistsExactCase(relativePath) {
  const fullPath = path.join(PUBLIC_DIR, relativePath);
  const dir = path.dirname(fullPath);
  const base = path.basename(fullPath);
  if (!fs.existsSync(dir)) return false;
  // Case-sensitive check even on a case-insensitive filesystem (macOS) —
  // fs.readdirSync returns real on-disk casing, so comparing against that
  // (not just fs.existsSync, which some filesystems resolve case-insensitively)
  // catches a mismatch that would 404 on Vercel's case-sensitive filesystem.
  return fs.readdirSync(dir).includes(base);
}

describe("Every destination has a details record", () => {
  CITY_PROFILES.forEach(({ id, name }) => {
    test(`${name} (${id})`, () => {
      expect(CITY_DETAILS[id]).toBeDefined();
    });
  });
});

describe("Destinations with real photography: every referenced file exists, exact case, non-empty", () => {
  const withRealPhoto = CITY_PROFILES.filter(({ id }) => {
    const details = CITY_DETAILS[id];
    return Boolean(details?.heroImages || details?.heroImage);
  });

  withRealPhoto.forEach(({ id, name }) => {
    const details = CITY_DETAILS[id];

    if (details.heroImage) {
      // Legacy single-image shape (pre-CX-007).
      test(`${name} (${id}) — legacy heroImage file exists`, () => {
        expect(fileExistsExactCase(details.heroImage)).toBe(true);
      });
      return;
    }

    const crops = {
      "desktop.webp": details.heroImages.desktop?.webp,
      "desktop.jpg": details.heroImages.desktop?.jpg,
      "mobile.webp": details.heroImages.mobile?.webp,
      "mobile.jpg": details.heroImages.mobile?.jpg,
    };

    Object.entries(crops).forEach(([cropName, cropPath]) => {
      test(`${name} (${id}) — ${cropName} exists and is non-empty`, () => {
        expect(typeof cropPath).toBe("string");
        expect(fileExistsExactCase(cropPath)).toBe(true);
        const stat = fs.statSync(path.join(PUBLIC_DIR, cropPath));
        expect(stat.size).toBeGreaterThan(1024); // catch zero-byte/corrupt files
      });
    });
  });
});

describe("Destinations without real photography intentionally have no image reference at all", () => {
  const withoutRealPhoto = CITY_PROFILES.filter(({ id }) => {
    const details = CITY_DETAILS[id];
    return !details?.heroImages && !details?.heroImage;
  });

  withoutRealPhoto.forEach(({ id, name }) => {
    test(`${name} (${id}) — no partial/broken image reference`, () => {
      const details = CITY_DETAILS[id];
      expect(details.heroImages).toBeUndefined();
      expect(details.heroImage).toBeUndefined();
    });
  });

  test("this list is exactly DEST-003's 14 new destinations (no regression among the original 11)", () => {
    const original11 = new Set([
      "playa-del-carmen", "tulum", "riviera-maya", "merida", "progreso",
      "chicxulub-puerto", "telchac-puerto", "celestun", "sisal",
      "dzilam-de-bravo", "santa-elena",
    ]);
    const anyOriginalMissingPhoto = withoutRealPhoto.some(({ id }) => original11.has(id));
    expect(anyOriginalMissingPhoto).toBe(false);
    expect(withoutRealPhoto.length).toBe(14);
  });
});
