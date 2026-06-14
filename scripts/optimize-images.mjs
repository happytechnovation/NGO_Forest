/**
 * One-off compression pass over the large downloaded resource images so the
 * site loads faster. Resizes to a sensible max width and re-encodes at a
 * quality that's visually lossless for web use. Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/** [relativePath, maxWidth, quality] */
const TARGETS = [
  ['public/resources/gallery/forest-1.webp', 900, 72],
  ['public/resources/gallery/forest-2.webp', 900, 72],
  ['public/resources/gallery/forest-3.webp', 900, 72],
  ['public/resources/gallery/forest-4.webp', 900, 72],
  ['public/resources/gallery/hero-forest.webp', 900, 72],
  ['public/resources/projects/retired-officers-assoc.webp', 1000, 72],
];

for (const [rel, width, quality] of TARGETS) {
  const file = resolve(ROOT, rel);
  const before = (await stat(file)).size;
  const img = sharp(file).resize({ width, withoutEnlargement: true });
  const buffer = rel.endsWith('.webp')
    ? await img.webp({ quality }).toBuffer()
    : await img.jpeg({ quality, mozjpeg: true }).toBuffer();

  if (buffer.length < before) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        await writeFile(file, buffer);
        break;
      } catch (err) {
        if (attempt === 5) throw err;
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    console.log(`  ok   ${rel}  ${(before / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB`);
  } else {
    console.log(`  skip ${rel}  already optimal (${(before / 1024).toFixed(0)}KB)`);
  }
}
