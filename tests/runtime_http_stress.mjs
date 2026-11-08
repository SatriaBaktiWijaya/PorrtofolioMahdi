import { spawn } from "node:child_process";
import http from "node:http";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;

function fetchStatus(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
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
  console.log("=== STARTING RUNTIME HTTP 404 & ROUTE STRESS TEST ===");
  console.log(`Spawning Next.js production server on port ${PORT}...`);

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

  // Wait for server to become responsive
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    try {
      const res = await fetchStatus("/");
      if (res.statusCode === 200) {
        ready = true;
        console.log(`Server responded with 200 OK after ${(i + 1) * 0.5}s.`);
        break;
      }
    } catch (e) {
      // not ready yet
    }
  }

  if (!ready) {
    serverProc.kill();
    console.error("FAIL: Server failed to start within 15 seconds.");
    process.exit(1);
  }

  const testCases = [
    { path: "/", expectedStatus: 200, name: "Home Route (/)" },
    { path: "/about", expectedStatus: 200, name: "About Route (/about)" },
    { path: "/projects", expectedStatus: 200, name: "Projects Archive (/projects)" },
    { path: "/projects/mazda-kensei", expectedStatus: 200, name: "Case Study: Mazda Kensei" },
    { path: "/projects/twist-n-pour", expectedStatus: 200, name: "Case Study: Twist n Pour" },
    { path: "/projects/esprit-otoped", expectedStatus: 200, name: "Case Study: Esprit Otoped" },
    { path: "/projects/automotive-wheels", expectedStatus: 200, name: "Case Study: Automotive Wheels" },
    // 404 tests:
    { path: "/projects/invalid-project", expectedStatus: 404, name: "Non-existent project slug (/projects/invalid-project)" },
    { path: "/projects/random-non-existent-xyz", expectedStatus: 404, name: "Non-existent slug (/projects/random-non-existent-xyz)" },
    { path: "/totally-random-page-404", expectedStatus: 404, name: "Non-existent root route (/totally-random-page-404)" },
    { path: "/projects/12345", expectedStatus: 404, name: "Numeric invalid project slug (/projects/12345)" },
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const res = await fetchStatus(tc.path);
      const isStatusMatch = res.statusCode === tc.expectedStatus;

      if (isStatusMatch) {
        passed++;
        console.log(`[PASS] ${tc.name} -> HTTP ${res.statusCode} (Expected: ${tc.expectedStatus})`);
      } else {
        failed++;
        console.error(`[FAIL] ${tc.name} -> HTTP ${res.statusCode} (Expected: ${tc.expectedStatus})`);
      }

      // Verify that 404 pages render a clean error page and not an internal 500 error or crash dump
      if (tc.expectedStatus === 404) {
        const isNotCrash = !res.body.includes("Internal Server Error") && !res.body.includes("ECONNRESET");
        if (isNotCrash) {
          console.log(`       [PASS] Clean 404 error page rendered without server panic.`);
        } else {
          failed++;
          console.error(`       [FAIL] 404 response contained server crash or internal error markers!`);
        }
      }
    } catch (err) {
      failed++;
      console.error(`[FAIL] ${tc.name} -> Request Error: ${err.message}`);
    }
  }

  // Gracefully terminate the server process
  console.log("\nShutting down Next.js test server...");
  serverProc.kill();
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", serverProc.pid, "/f", "/t"]);
  }

  console.log("\n==========================================");
  console.log(`HTTP RUNTIME TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("==========================================\n");

  process.exit(failed > 0 ? 1 : 0);
}

run();
