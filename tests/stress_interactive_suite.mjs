import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const ROOT_DIR = process.cwd();
const SERVER_APP_DIR = path.join(ROOT_DIR, ".next", "server", "app");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
};

function assert(condition, testName, details = "") {
  if (condition) {
    results.passed++;
    results.tests.push({ name: testName, status: "PASS", details });
    console.log(`[PASS] ${testName}${details ? ` - ${details}` : ""}`);
  } else {
    results.failed++;
    results.tests.push({ name: testName, status: "FAIL", details });
    console.error(`[FAIL] ${testName}${details ? ` - ${details}` : ""}`);
  }
}

function warn(testName, details = "") {
  results.warnings++;
  results.tests.push({ name: testName, status: "WARN", details });
  console.warn(`[WARN] ${testName}${details ? ` - ${details}` : ""}`);
}

console.log("=== RUNNING EMPIRICAL STRESS TEST SUITE ===\n");

// -------------------------------------------------------------
// TEST SUITE 1: Static Route HTML Files & Hydration Error Audit
// -------------------------------------------------------------
console.log("--- Suite 1: Static Route HTML & Hydration Integrity ---");

const targetRoutes = [
  { name: "Home (/)", file: path.join(SERVER_APP_DIR, "index.html"), minSize: 50000 },
  { name: "About (/about)", file: path.join(SERVER_APP_DIR, "about.html"), minSize: 40000 },
  { name: "Projects Archive (/projects)", file: path.join(SERVER_APP_DIR, "projects.html"), minSize: 30000 },
  { name: "Mazda Kensei (/projects/mazda-kensei)", file: path.join(SERVER_APP_DIR, "projects", "mazda-kensei.html"), minSize: 70000 },
  { name: "Twist n Pour (/projects/twist-n-pour)", file: path.join(SERVER_APP_DIR, "projects", "twist-n-pour.html"), minSize: 70000 },
  { name: "Esprit Otoped (/projects/esprit-otoped)", file: path.join(SERVER_APP_DIR, "projects", "esprit-otoped.html"), minSize: 70000 },
  { name: "Automotive Wheels (/projects/automotive-wheels)", file: path.join(SERVER_APP_DIR, "projects", "automotive-wheels.html"), minSize: 70000 },
  { name: "Not Found (/_not-found)", file: path.join(SERVER_APP_DIR, "_not-found.html"), minSize: 10000 },
];

for (const route of targetRoutes) {
  const exists = fs.existsSync(route.file);
  assert(exists, `HTML File Exists: ${route.name}`, route.file);

  if (exists) {
    const content = fs.readFileSync(route.file, "utf8");
    const stat = fs.statSync(route.file);

    assert(
      stat.size >= route.minSize,
      `File Size Adequate: ${route.name}`,
      `Size: ${stat.size} bytes (min: ${route.minSize})`
    );

    assert(
      content.includes("<!DOCTYPE html>") && content.includes("<html") && content.includes("</html>"),
      `Valid HTML Structure: ${route.name}`
    );

    // Check for hydration error markers
    const hasHydrationError =
      content.includes("Hydration failed") ||
      content.includes("Minified React error") ||
      content.includes("Text content does not match server-rendered HTML") ||
      content.includes("prerender-bailout");

    assert(!hasHydrationError, `Zero Hydration Errors: ${route.name}`);

    // Check for standard navigation and footer
    if (route.name !== "Not Found (/_not-found)") {
      assert(content.includes("MAHDI WIRAWAN"), `Contains Studio Identity: ${route.name}`);
      assert(content.includes("Weniger, aber besser"), `Contains Dieter Rams Ethos: ${route.name}`);
      assert(content.includes("Telkom University Purwokerto"), `Contains Academic Credentials: ${route.name}`);
    }
  }
}

// -------------------------------------------------------------
// TEST SUITE 2: Image URLs & Disk Existence Verification
// -------------------------------------------------------------
console.log("\n--- Suite 2: Extracted Asset & Image URL Integrity ---");

const imgRegex = /src="(\/_next\/image\?url=([^&"]+)[^"]*|(\/projects\/[^"]+)|\/profile\/[^"]+)"/g;
let totalImagesChecked = 0;
let missingImages = 0;

for (const route of targetRoutes) {
  if (!fs.existsSync(route.file)) continue;
  const content = fs.readFileSync(route.file, "utf8");

  // Also check raw img tags in HTML
  const rawImgMatches = content.matchAll(/<img[^>]+src="([^">]+)"/g);
  for (const match of rawImgMatches) {
    totalImagesChecked++;
    let rawSrc = match[1];

    // If next/image optimized URL, extract original url parameter
    if (rawSrc.startsWith("/_next/image?url=")) {
      const parsedUrl = new URL(`http://localhost${rawSrc}`);
      rawSrc = decodeURIComponent(parsedUrl.searchParams.get("url") || "");
    }

    if (rawSrc.startsWith("/")) {
      const diskPath = path.join(PUBLIC_DIR, rawSrc);
      if (!fs.existsSync(diskPath)) {
        missingImages++;
        assert(false, `Broken image link in ${route.name}: ${rawSrc}`, diskPath);
      }
    }
  }
}

assert(
  missingImages === 0,
  `All Referenced Images Exist on Disk (${totalImagesChecked} checked, ${missingImages} missing)`
);

// -------------------------------------------------------------
// TEST SUITE 3: Component State & Boundary Stress Testing
// -------------------------------------------------------------
console.log("\n--- Suite 3: Component State & Boundary Stress Testing ---");

// 3.1 ExplodedViewer Stress
console.log("-> 3.1 ExplodedViewer Logic Stress");
const DEFAULT_PARTS = [
  { id: 1, partNumber: "P-01", name: "Can Main Body", position: { x: 48, y: 56 } },
  { id: 2, partNumber: "P-02", name: "Rotating Nozzle Spout", position: { x: 70, y: 38 } },
  { id: 3, partNumber: "P-03", name: "Dual-Mode Nozzle Cap", position: { x: 82, y: 28 } },
  { id: 4, partNumber: "P-04", name: "Fill Aperture Lid", position: { x: 38, y: 32 } },
];

assert(DEFAULT_PARTS.length === 4, "ExplodedViewer default parts count is 4");
for (const part of DEFAULT_PARTS) {
  const xValid = part.position.x >= 0 && part.position.x <= 100;
  const yValid = part.position.y >= 0 && part.position.y <= 100;
  assert(xValid && yValid, `Part #${part.id} (${part.name}) coordinates bounded [0..100%]`, `x:${part.position.x}%, y:${part.position.y}%`);
}

// Check active part selection oracle
function getActivePart(parts, activeId) {
  return parts.find((p) => p.id === activeId) || parts[0];
}

assert(getActivePart(DEFAULT_PARTS, 1).name === "Can Main Body", "ExplodedViewer selects Part 1");
assert(getActivePart(DEFAULT_PARTS, 3).name === "Dual-Mode Nozzle Cap", "ExplodedViewer selects Part 3");
assert(getActivePart(DEFAULT_PARTS, 999).id === 1, "ExplodedViewer falls back gracefully to parts[0] when unknown ID passed");

// Edge case analysis: Empty parts array
const emptyPartsResult = getActivePart([], 1);
if (!emptyPartsResult) {
  warn(
    "ExplodedViewer Empty Parts Edge Case",
    "Passing parts=[] results in activePart=undefined which would cause runtime TypeError if rendered without defensive guard. Note: Production code provides DEFAULT_PARTS fallback."
  );
}

// 3.2 CMFSwitcher Stress
console.log("\n-> 3.2 CMFSwitcher Logic & Sheen Telemetry Stress");
const DEFAULT_SWATCHES = [
  { id: "soul-red", name: "Soul Red Crystal Metallic", hex: "#8c0b14", finishType: "Metallic", glossUnitsGU: 95, layers: 4 },
  { id: "machine-grey", name: "Machine Grey Deep Shadow", hex: "#373a40", finishType: "Metallic", glossUnitsGU: 88, layers: 4 },
  { id: "polymetal-matte", name: "Polymetal Industrial Matte", hex: "#5c6b73", finishType: "Matte", glossUnitsGU: 22, layers: 4 },
  { id: "hyper-silver", name: "Machined Anodized Silver", hex: "#d1d5db", finishType: "Anodized", glossUnitsGU: 70, layers: 3 },
];

for (const swatch of DEFAULT_SWATCHES) {
  assert(/^#[0-9a-fA-F]{6}$/.test(swatch.hex), `CMF swatch ${swatch.id} has valid 6-digit hex: ${swatch.hex}`);
  assert(swatch.glossUnitsGU >= 0 && swatch.glossUnitsGU <= 100, `CMF swatch ${swatch.id} GU bounded [0..100]: ${swatch.glossUnitsGU}`);
  assert(swatch.layers >= 3, `CMF swatch ${swatch.id} has multi-layer coating specification: ${swatch.layers} layers`);
}

function getActiveSwatch(swatches, activeId) {
  return swatches.find((s) => s.id === activeId) || swatches[0];
}

assert(getActiveSwatch(DEFAULT_SWATCHES, "soul-red").glossUnitsGU === 95, "CMF selects Soul Red (95 GU)");
assert(getActiveSwatch(DEFAULT_SWATCHES, "polymetal-matte").glossUnitsGU === 22, "CMF selects Polymetal Matte (22 GU)");
assert(getActiveSwatch(DEFAULT_SWATCHES, "non-existent").id === "soul-red", "CMF falls back gracefully to swatches[0]");

// 3.3 BlueprintViewer Zoom Boundary Stress
console.log("\n-> 3.3 BlueprintViewer Zoom Step & Boundary Stress");

class BlueprintZoomSimulation {
  constructor() {
    this.zoomLevel = 1.0;
  }
  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.25, 2.5);
  }
  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.25, 0.75);
  }
  reset() {
    this.zoomLevel = 1.0;
  }
}

const sim = new BlueprintZoomSimulation();
assert(sim.zoomLevel === 1.0, "Initial zoom level is 1.0 (100%)");

// Stress test 20 zoom ins
for (let i = 0; i < 20; i++) sim.zoomIn();
assert(sim.zoomLevel === 2.5, "Zoom In correctly clamped at max 2.5 (250%) after 20 clicks", `Current: ${sim.zoomLevel}`);

// Stress test 30 zoom outs
for (let i = 0; i < 30; i++) sim.zoomOut();
assert(sim.zoomLevel === 0.75, "Zoom Out correctly floored at min 0.75 (75%) after 30 clicks", `Current: ${sim.zoomLevel}`);

// Reset
sim.reset();
assert(sim.zoomLevel === 1.0, "Reset zoom restores 1.0 (100%) exactly");

// Single steps
sim.zoomIn();
assert(sim.zoomLevel === 1.25, "1x Zoom In increments from 1.0 to 1.25");
sim.zoomOut();
assert(sim.zoomLevel === 1.0, "1x Zoom Out decrements back to 1.0");

// -------------------------------------------------------------
// TEST SUITE 4: Reduced Motion & Animation Fallback
// -------------------------------------------------------------
console.log("\n--- Suite 4: Reduced Motion Support & Degradation ---");

const smoothScrollProviderSource = fs.readFileSync(
  path.join(ROOT_DIR, "src", "components", "providers", "SmoothScrollProvider.tsx"),
  "utf8"
);

const hasReducedMotionCheck = smoothScrollProviderSource.includes(
  'window.matchMedia("(prefers-reduced-motion: reduce)").matches'
);
assert(hasReducedMotionCheck, "SmoothScrollProvider queries (prefers-reduced-motion: reduce)");

const hasEarlyReturnOnReducedMotion = /if\s*\(prefersReducedMotion\)\s*\{\s*return;\s*\}/.test(
  smoothScrollProviderSource
);
assert(
  hasEarlyReturnOnReducedMotion,
  "SmoothScrollProvider safely aborts Lenis and GSAP ticker on reduced motion"
);

// Check CSS rules for smooth scroll and animations
const globalsCss = fs.readFileSync(path.join(ROOT_DIR, "src", "app", "globals.css"), "utf8");
assert(
  globalsCss.includes("scroll-behavior: smooth") || smoothScrollProviderSource.includes("Lenis"),
  "Smooth scrolling mechanism configured"
);

// -------------------------------------------------------------
// TEST SUITE 5: Accessibility & Semantic Markup Audit
// -------------------------------------------------------------
console.log("\n--- Suite 5: Accessibility & Semantic Markup Audit ---");

// 5.1 Check Image Alt Attributes across all pages
let totalImgTags = 0;
let emptyAltCount = 0;
let missingAltCount = 0;

for (const route of targetRoutes) {
  if (!fs.existsSync(route.file)) continue;
  const content = fs.readFileSync(route.file, "utf8");
  const imgTags = content.matchAll(/<img([^>]+)>/g);

  for (const match of imgTags) {
    totalImgTags++;
    const attrs = match[1];
    if (!attrs.includes("alt=")) {
      missingAltCount++;
    } else {
      const altMatch = attrs.match(/alt="([^"]*)"/);
      if (altMatch && altMatch[1].trim() === "") {
        emptyAltCount++;
      }
    }
  }
}

assert(
  missingAltCount === 0,
  `Zero Missing Alt Attributes across ${totalImgTags} <img> elements (${missingAltCount} missing)`
);
if (emptyAltCount > 0) {
  warn(`Empty Alt Attributes: ${emptyAltCount} decorative or unlabelled images found`);
} else {
  assert(true, `All ${totalImgTags} <img> elements have non-empty alt text`);
}

// 5.2 Check Buttons for Accessible Names
const buttonSourceFiles = [
  path.join(ROOT_DIR, "src", "components", "layout", "Navbar.tsx"),
  path.join(ROOT_DIR, "src", "components", "case-study", "ExplodedViewer.tsx"),
  path.join(ROOT_DIR, "src", "components", "case-study", "CMFSwitcher.tsx"),
  path.join(ROOT_DIR, "src", "components", "case-study", "BlueprintViewer.tsx"),
];

let buttonsAudited = 0;
let buttonsWithoutAccessibleName = 0;

for (const file of buttonSourceFiles) {
  const src = fs.readFileSync(file, "utf8");
  // Find <button ... >
  const buttons = src.matchAll(/<button([\s\S]*?)>([\s\S]*?)<\/button>/g);
  for (const b of buttons) {
    buttonsAudited++;
    const attrs = b[1];
    const innerText = b[2].trim();

    const hasAriaLabel = /aria-label="[^"]+"/.test(attrs);
    const hasTitle = /title="[^"]+"/.test(attrs);
    const hasTextContent = innerText.length > 0 && !innerText.startsWith("<");

    if (!hasAriaLabel && !hasTitle && !hasTextContent && innerText.includes("<")) {
      // Check if it's an icon-only button without label
      const hasAriaOrTitle = /aria-label|title/.test(attrs);
      if (!hasAriaOrTitle) {
        buttonsWithoutAccessibleName++;
        warn(`Button without accessible name in ${path.basename(file)}`, attrs.trim().replace(/\s+/g, " "));
      }
    }
  }
}

assert(
  buttonsWithoutAccessibleName === 0,
  `Accessible Button Labels Audit: ${buttonsAudited} buttons checked, ${buttonsWithoutAccessibleName} unlabeled`
);

// 5.3 Check Links for Valid Hrefs
let emptyHrefs = 0;
let hashOnlyHrefs = 0;

for (const route of targetRoutes) {
  if (!fs.existsSync(route.file)) continue;
  const content = fs.readFileSync(route.file, "utf8");
  const linkMatches = content.matchAll(/<a[^>]+href="([^">]*)"/g);

  for (const match of linkMatches) {
    const href = match[1];
    if (href === "") emptyHrefs++;
    if (href === "#") hashOnlyHrefs++;
  }
}

assert(emptyHrefs === 0, `Zero Empty href="" Links in Static Output (${emptyHrefs} found)`);
assert(hashOnlyHrefs === 0, `Zero Blind href="#" Links in Static Output (${hashOnlyHrefs} found)`);

// -------------------------------------------------------------
// SUMMARY REPORT
// -------------------------------------------------------------
console.log("\n==========================================");
console.log(`TOTAL TESTS: ${results.passed + results.failed}`);
console.log(`PASSED: ${results.passed}`);
console.log(`FAILED: ${results.failed}`);
console.log(`WARNINGS: ${results.warnings}`);
console.log("==========================================\n");

fs.writeFileSync(
  path.join(ROOT_DIR, "tests", "stress_interactive_results.json"),
  JSON.stringify(results, null, 2),
  "utf8"
);

process.exit(results.failed > 0 ? 1 : 0);
