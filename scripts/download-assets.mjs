/**
 * Downloads all source assets from the live treelands.in WordPress site
 * into public/resources, with clean kebab-case names. Run: npm run download-assets
 *
 * Safe to re-run; existing files are overwritten. Failures are reported but
 * do not stop the batch (some originals may have moved/changed over time).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'public', 'resources');

/** [remoteUrl, localRelativePath] */
const ASSETS = [
  // Brand
  ['https://treelands.in/wp-content/uploads/2022/08/Group-1.png', 'brand/logo.png'],

  // Team photos
  ['https://treelands.in/wp-content/uploads/2022/09/K-N-Murthy.png', 'team/k-n-murthy.png'],
  ['https://treelands.in/wp-content/uploads/2022/09/Krishna-D-788x1024.jpg', 'team/krishna-d-udapudi.jpg'],
  ['https://treelands.in/wp-content/uploads/2022/09/G-V-Reddy.png', 'team/g-v-reddy.png'],
  ['https://treelands.in/wp-content/uploads/2022/09/D-A-Venkatesh.png', 'team/d-a-venkatesh.png'],

  // About images
  ['https://treelands.in/wp-content/uploads/2022/09/areas-1024x768-1.jpg', 'about/areas-of-work.jpg'],
  ['https://treelands.in/wp-content/uploads/2022/09/value-1024x768.jpg', 'about/values.jpg'],
  ['https://treelands.in/wp-content/uploads/2022/09/commitment-1024x768-1.jpg', 'about/commitment.jpg'],

  // Project / story images
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-100.webp', 'projects/medicinal-mysuru.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-103.webp', 'projects/medicinal-shivamogga.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Project-for-Karnataka-State-Retired-Forest-Officers-Association.webp', 'projects/retired-officers-assoc.webp'],
  // NOTE: the original "Medara-Scheduled-Tribe" asset is a scanned MOA document, not a
  // photo — we use a hand-picked bamboo-livelihoods.jpg instead (not auto-downloaded).

  // Blog / story thumbnails
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-71.png', 'stories/case-studies.png'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-68.png', 'stories/training-volunteers.png'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-49.png', 'stories/forest-reports.png'],

  // Misc gallery candidates
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-16.webp', 'gallery/hero-forest.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-36.webp', 'gallery/forest-1.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-50.webp', 'gallery/forest-2.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-52.webp', 'gallery/forest-3.webp'],
  ['https://treelands.in/wp-content/uploads/2024/05/Rectangle-54.webp', 'gallery/forest-4.webp'],
];

async function download([url, rel]) {
  const dest = resolve(OUT, rel);
  await mkdir(dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`  ok   ${rel}  (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.warn(`  FAIL ${rel}  <- ${url}\n       ${err.message}`);
    return false;
  }
}

console.log(`Downloading ${ASSETS.length} assets -> public/resources\n`);
let ok = 0;
for (const a of ASSETS) {
  // sequential to be gentle on the source server
  // eslint-disable-next-line no-await-in-loop
  if (await download(a)) ok += 1;
}
console.log(`\nDone. ${ok}/${ASSETS.length} downloaded. ${ASSETS.length - ok} failed.`);
