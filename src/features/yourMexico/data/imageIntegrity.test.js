// Destination image integrity — added after a DEST-003 release review flagged
// Cozumel's hero as "not displaying" (root cause at the time: no photography
// of any kind existed yet for the 14 new destinations, so they intentionally
// rendered DestinationImageFallback.js instead of an <img>).
//
// A corrected DEST-003 image pack has since been installed: all 14 new
// destinations now carry a single 1600x900 `heroImage` (the codebase's
// existing legacy single-image shape) pointing at temporary AI-created
// editorial concept imagery — not verified photographs of the real place.
// Each of those 14 entries also carries `imageStatus: "illustrative"`, the
// one centralized field IllustrativeImageBadge.js keys off of to render its
// "Illustrative image" / "Imagen ilustrativa" disclosure. Replacing an
// illustrative image with real photography later is a two-step, no-other-code
// change: swap the `heroImage` path and delete that city's `imageStatus`
// field — the badge stops rendering automatically.
//
// This test makes all of the above permanent and automatic, so a future
// regression — a renamed/moved file, a case-mismatch that works on a
// case-insensitive local filesystem but 404s on Vercel's case-sensitive one,
// an illustrative image missing its disclosure flag, or real photography left
// incorrectly flagged as illustrative — fails CI instead of only being caught
// by eyeballing a preview.
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

describe("Every destination's image asset: file exists, exact case, non-empty", () => {
  const withAnyImage = CITY_PROFILES.filter(({ id }) => {
    const details = CITY_DETAILS[id];
    return Boolean(details?.heroImages || details?.heroImage);
  });

  withAnyImage.forEach(({ id, name }) => {
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

describe("Every destination now has some image reference — no partial/broken entries", () => {
  const withoutAnyImage = CITY_PROFILES.filter(({ id }) => {
    const details = CITY_DETAILS[id];
    return !details?.heroImages && !details?.heroImage;
  });

  test("no destination is missing both heroImages and heroImage", () => {
    expect(withoutAnyImage.length).toBe(0);
  });

  test("the destination system contains exactly 25 approved destinations", () => {
    expect(CITY_PROFILES.length).toBe(25);
  });

  test("Motul is not present anywhere in the destination system", () => {
    const motulPresent = CITY_PROFILES.some(({ id, name }) => id === "motul" || /motul/i.test(name));
    expect(motulPresent).toBe(false);
    expect(CITY_DETAILS.motul).toBeUndefined();
  });
});

describe("Illustrative (AI-generated, temporary) images are correctly flagged and scoped", () => {
  const illustrativeSlugs = [
    "akumal", "bacalar", "cancun", "chelem", "chuburna-puerto", "cozumel",
    "el-cuyo", "izamal", "mahahual", "puerto-morelos", "rio-lagartos",
    "tekax", "tizimin", "valladolid",
  ];
  const original11 = [
    "playa-del-carmen", "tulum", "riviera-maya", "merida", "progreso",
    "chicxulub-puerto", "telchac-puerto", "celestun", "sisal",
    "dzilam-de-bravo", "santa-elena",
  ];

  illustrativeSlugs.forEach((id) => {
    test(`${id} is flagged imageStatus: "illustrative" and uses the legacy single-image shape`, () => {
      const details = CITY_DETAILS[id];
      expect(details.imageStatus).toBe("illustrative");
      expect(typeof details.heroImage).toBe("string");
      expect(details.heroImages).toBeUndefined();
    });
  });

  test("exactly 14 destinations are flagged illustrative — no more, no fewer", () => {
    const flagged = CITY_PROFILES.filter(({ id }) => CITY_DETAILS[id]?.imageStatus === "illustrative");
    expect(flagged.length).toBe(14);
    expect(flagged.map(({ id }) => id).sort()).toEqual([...illustrativeSlugs].sort());
  });

  original11.forEach((id) => {
    test(`${id} (original 11, real photography) is never flagged illustrative`, () => {
      expect(CITY_DETAILS[id].imageStatus).toBeUndefined();
    });
  });
});
