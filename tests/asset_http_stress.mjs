import { spawn } from "node:child_process";
import http from "node:http";

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

function fetchAsset(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          size: buffer.length,
        });
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("=== EMPIRICAL HTTP ASSET & LINK INTEGRITY TEST ===");
  console.log(`Spawning Next.js server on port ${PORT}...`);

  const serverProc = spawn("npx", ["next", "start", "-p", String(PORT)], {
    shell: true,
    stdio: "pipe",
  });

  serverProc.stdout.on("data", (data) => {
    const text = data.toString();
    if (text.includes("Ready") || text.includes("started server")) {
      console.log(`[Next.js Server stdout]: ${text.trim()}`);
    }
  });

  serverProc.stderr.on("data", (data) => {
    console.error(`[Next.js Server stderr]: ${data.toString().trim()}`);
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    try {
      const res = await fetchAsset("/");
      if (res.statusCode === 200) {
        ready = true;
        console.log(`Server responded with 200 OK after ${(i + 1) * 0.5}s.`);
        break;
      }
    } catch {
      // waiting
    }
  }

  if (!ready) {
    serverProc.kill();
    console.error("FAIL: Server failed to start within 15 seconds.");
    process.exit(1);
  }

  const { PROJECTS, DESIGNER_PROFILE } = await import("../src/data/projects.ts");

  const assetsToTest = [
    // 4 CAD Blueprints (target 4963x3509 px)
    { path: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png", expectedStatus: 200, minSize: 400000, desc: "Blueprint Sheet 1 (Gambar Tampak)" },
    { path: "/projects/twist-n-pour/blueprints/blueprint-sheet-2-gambar-potongan.png", expectedStatus: 200, minSize: 400000, desc: "Blueprint Sheet 2 (Gambar Potongan)" },
    { path: "/projects/twist-n-pour/blueprints/blueprint-sheet-3-gambar-detail.png", expectedStatus: 200, minSize: 400000, desc: "Blueprint Sheet 3 (Gambar Detail)" },
    { path: "/projects/twist-n-pour/blueprints/blueprint-sheet-4-exploded-view.png", expectedStatus: 200, minSize: 400000, desc: "Blueprint Sheet 4 (Exploded View)" },

    // Profile Portrait
    { path: DESIGNER_PROFILE.portraitImage, expectedStatus: 200, minSize: 50000, desc: "Mahdi Portrait Image" },
  ];

  // Dynamically add all hero & thumbnail images for all projects
  for (const p of PROJECTS) {
    assetsToTest.push({
      path: p.heroImage,
      expectedStatus: 200,
      minSize: 50000,
      desc: `Flagship [${p.slug}] Hero Image: ${p.heroImage}`
    });
    assetsToTest.push({
      path: p.thumbnailImage,
      expectedStatus: 200,
      minSize: 50000,
      desc: `Flagship [${p.slug}] Thumbnail Image: ${p.thumbnailImage}`
    });
  }

  // Negative / 404 tests:
  assetsToTest.push(
    { path: "/projects/twist-n-pour/blueprints/non-existent-blueprint.png", expectedStatus: 404, minSize: 0, desc: "Non-existent blueprint (404 expected)" },
    { path: "/projects/mazda-kensei/p7_13.jp2", expectedStatus: 404, minSize: 0, desc: "Deleted JP2 legacy file (404 expected, 0 .jp2 remaining)" },
    { path: "/projects/esprit-otoped/p11_1.jp2", expectedStatus: 404, minSize: 0, desc: "Deleted JP2 legacy file (404 expected, 0 .jp2 remaining)" }
  );

  let passed = 0;
  let failed = 0;

  for (const asset of assetsToTest) {
    try {
      const res = await fetchAsset(asset.path);
      const isStatusMatch = res.statusCode === asset.expectedStatus;
      const isSizeOk = asset.expectedStatus === 200 ? res.size >= asset.minSize : true;

      if (isStatusMatch && isSizeOk) {
        passed++;
        console.log(`[PASS] ${asset.desc} -> HTTP ${res.statusCode}, Content-Length: ${res.size} bytes (Type: ${res.headers["content-type"]})`);
      } else {
        failed++;
        console.error(`[FAIL] ${asset.desc} -> HTTP ${res.statusCode} (expected ${asset.expectedStatus}), Size: ${res.size} bytes (expected >= ${asset.minSize})`);
      }
    } catch (err) {
      failed++;
      console.error(`[FAIL] ${asset.desc} -> Fetch error: ${err.message}`);
    }
  }

  console.log("\nShutting down server...");
  serverProc.kill();
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", serverProc.pid, "/f", "/t"]);
  }

  console.log("\n==========================================");
  console.log(`HTTP ASSET TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("==========================================\n");

  process.exit(failed > 0 ? 1 : 0);
}

run();
