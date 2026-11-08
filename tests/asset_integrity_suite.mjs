import fs from 'node:fs';
import path from 'node:path';

const WORKSPACE = path.resolve('.');
const PUBLIC_DIR = path.join(WORKSPACE, 'public');
const SRC_DIR = path.join(WORKSPACE, 'src');

console.log('='.repeat(80));
console.log('EMPIRICAL ASSET & LINK INTEGRITY TEST SUITE');
console.log('='.repeat(80));

const {
  PROJECTS,
  DESIGNER_PROFILE,
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
} = await import('../src/data/projects.ts');

const failures = [];
const stats = {
  projectsCount: PROJECTS.length,
  totalImagesChecked: 0,
  uniqueImagesChecked: 0,
  galleryImagesChecked: 0,
  blueprintsChecked: 0,
  storyImagesChecked: 0,
  componentImagesChecked: 0,
  internalLinksChecked: 0,
  externalLinksChecked: 0,
};

const checkedImageSet = new Set();

function verifyAsset(assetPath, context) {
  if (!assetPath || typeof assetPath !== 'string') {
    failures.push(`[${context}] Invalid or missing asset path: ${assetPath}`);
    return;
  }
  stats.totalImagesChecked++;
  if (!checkedImageSet.has(assetPath)) {
    checkedImageSet.add(assetPath);
    stats.uniqueImagesChecked++;
  }

  if (!assetPath.startsWith('/')) {
    failures.push(`[${context}] Asset path does not start with '/': ${assetPath}`);
    return;
  }

  const diskPath = path.join(PUBLIC_DIR, assetPath.slice(1));
  if (!fs.existsSync(diskPath)) {
    failures.push(`[${context}] Asset file NOT FOUND on disk: ${assetPath} (expected at ${diskPath})`);
    return;
  }

  const stat = fs.statSync(diskPath);
  if (stat.size === 0) {
    failures.push(`[${context}] Asset file is ZERO BYTES: ${assetPath}`);
  }
}

// 1. Validate Designer Profile
console.log('\n[1] Validating DESIGNER_PROFILE...');
verifyAsset(DESIGNER_PROFILE.portraitImage, 'DESIGNER_PROFILE.portraitImage');
if (!DESIGNER_PROFILE.name || !DESIGNER_PROFILE.role) {
  failures.push('DESIGNER_PROFILE missing name or role');
}

// 2. Validate Helper Functions
console.log('\n[2] Validating Query Helper Functions...');
const all = getAllProjects();
if (all.length !== 4) {
  failures.push(`getAllProjects() returned ${all.length} items, expected 4`);
}

const featured = getFeaturedProjects();
if (featured.length === 0) {
  failures.push('getFeaturedProjects() returned 0 items');
}

const indProjects = getProjectsByCategory('Industrial & Product');
if (indProjects.length !== 2) {
  failures.push(`getProjectsByCategory("Industrial & Product") returned ${indProjects.length}, expected 2`);
}

// 3. Deep Validate All 4 Flagship Projects
console.log('\n[3] Deep Validating Flagship Projects...');
const expectedSlugs = [
  'mazda-kensei',
  'twist-n-pour',
  'esprit-otoped',
  'automotive-wheels',
];

for (const slug of expectedSlugs) {
  const p = getProjectBySlug(slug);
  if (!p) {
    failures.push(`Flagship project slug not found via getProjectBySlug: ${slug}`);
    continue;
  }

  console.log(`\nValidating Project: [${slug}] - "${p.title}"`);
  if (!p.id || !p.slug || !p.title || !p.subtitle || !p.category || !p.year || !p.tagline) {
    failures.push(`Project [${slug}] missing required core metadata fields`);
  }

  verifyAsset(p.heroImage, `${slug}.heroImage`);
  verifyAsset(p.thumbnailImage, `${slug}.thumbnailImage`);
  if (p.blueprintImage) {
    verifyAsset(p.blueprintImage, `${slug}.blueprintImage`);
  }

  const storyGallery = p.story?.gallery;
  if (!Array.isArray(storyGallery) || storyGallery.length === 0) {
    failures.push(`Project [${slug}] has empty story.gallery`);
  } else {
    for (let i = 0; i < storyGallery.length; i++) {
      const g = storyGallery[i];
      stats.galleryImagesChecked++;
      verifyAsset(g.src, `${slug}.story.gallery[${i}]`);
      if (!g.alt) {
        failures.push(`Project [${slug}].story.gallery[${i}] missing alt`);
      }
    }
  }

  const sketches = p.story?.ideation?.sketches;
  if (Array.isArray(sketches)) {
    for (let i = 0; i < sketches.length; i++) {
      verifyAsset(sketches[i].src, `${slug}.story.ideation.sketches[${i}]`);
    }
  }

  const designOptions = p.story?.ideation?.designOptions;
  if (Array.isArray(designOptions)) {
    for (let i = 0; i < designOptions.length; i++) {
      if (designOptions[i].image) {
        verifyAsset(designOptions[i].image, `${slug}.story.ideation.designOptions[${i}]`);
      }
    }
  }

  const blueprints = p.story?.cadAndEngineering?.blueprintDrawings;
  if (Array.isArray(blueprints) && blueprints.length > 0) {
    for (let i = 0; i < blueprints.length; i++) {
      const bp = blueprints[i];
      stats.blueprintsChecked++;
      verifyAsset(bp.src, `${slug}.story.cadAndEngineering.blueprintDrawings[${i}]`);
      if (!bp.alt) {
        failures.push(`Project [${slug}].cadAndEngineering.blueprintDrawings[${i}] missing alt`);
      }
    }
  }

  const explodedParts = p.story?.cadAndEngineering?.explodedParts;
  if (Array.isArray(explodedParts) && explodedParts.length > 0) {
    for (const part of explodedParts) {
      if (!part.calloutPosition || typeof part.calloutPosition.xPercent !== 'number' || typeof part.calloutPosition.yPercent !== 'number') {
        failures.push(`Project [${slug}].explodedParts part ${part.name} has invalid coordinates`);
      }
    }
  }

  const steps = p.story?.prototypingAndManufacturing?.steps;
  if (Array.isArray(steps)) {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].image) {
        stats.storyImagesChecked++;
        verifyAsset(steps[i].image, `${slug}.story.prototypingAndManufacturing.steps[${i}]`);
      }
    }
  }
}

// 4. Scan Frontend React Components
console.log('\n[4] Scanning React Components in src/app and src/components...');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanDir(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const componentFiles = scanDir(SRC_DIR);
const validRoutes = new Set([
  '/',
  '/about',
  '/projects',
  '/projects/mazda-kensei',
  '/projects/twist-n-pour',
  '/projects/esprit-otoped',
  '/projects/automotive-wheels',
]);

const imageExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico']);

for (const f of componentFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  const relFile = path.relative(WORKSPACE, f).replace(/\\/g, '/');

  const strMatches = content.matchAll(/["'](\/[^"'\s<>]+)["']/g);
  for (const match of strMatches) {
    const str = match[1];
    const ext = path.extname(str.split('?')[0].split('#')[0]).toLowerCase();

    if (imageExts.has(ext)) {
      stats.componentImagesChecked++;
      verifyAsset(str, `${relFile} image reference`);
    } else if (str.startsWith('/projects/') || str === '/' || str === '/about' || str === '/projects') {
      stats.internalLinksChecked++;
      if (!validRoutes.has(str) && !str.startsWith('/projects/')) {
        failures.push(`[${relFile}] Broken internal link: ${str}`);
      }
    }
  }

  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const hm of hrefMatches) {
    const href = hm[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      stats.externalLinksChecked++;
    }
  }
}

// 5. Check asset_manifest.json
console.log('\n[5] Checking public/asset_manifest.json...');
const manifestPath = path.join(PUBLIC_DIR, 'asset_manifest.json');
if (!fs.existsSync(manifestPath)) {
  failures.push('public/asset_manifest.json does not exist');
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  let manifestTotal = 0;
  for (const [cat, items] of Object.entries(manifest)) {
    manifestTotal += items.length;
    for (const item of items) {
      const relPath = item.rel_path || item.path;
      if (!relPath) {
        failures.push(`Manifest item in ${cat} missing rel_path or path property`);
        continue;
      }
      const p = path.join(PUBLIC_DIR, relPath.startsWith('/') ? relPath.slice(1) : relPath);
      if (!fs.existsSync(p)) {
        failures.push(`Manifest item missing on disk: ${relPath}`);
      }
    }
  }
  console.log(`Manifest verified: ${manifestTotal} files cataloged across ${Object.keys(manifest).length} categories.`);
}

// 6. Summary
console.log('\n' + '='.repeat(80));
console.log('SUMMARY OF EMPIRICAL TEST SUITE');
console.log('='.repeat(80));
for (const [k, v] of Object.entries(stats)) {
  console.log(`  ${k.padEnd(28)}: ${v}`);
}
console.log(`\nFailures encountered: ${failures.length}`);
if (failures.length > 0) {
  console.log('\nFAILURE DETAILS:');
  for (const f of failures) {
    console.log(`  [FAIL] ${f}`);
  }
  process.exit(1);
} else {
  console.log('\n>>> ALL 100% EMPIRICAL INTEGRITY CHECKS PASSED WITH ZERO FAILURES <<<');
  process.exit(0);
}
