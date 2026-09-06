/**
 * Rebuilds the article photography as web-sized WebP.
 *
 * The originals are straight camera/stock exports — blog8.png is 6572x4381 and
 * blog4.png is 5.3MB — while the largest slot on the site is 832px wide. The
 * cost is not only download: a 6572x4381 image is ~115MB of raw bitmap once the
 * browser decodes it, which is what made the featured image stall or paint
 * blank on the article pages.
 *
 * Each source produces two widths so cards do not pay for the full-bleed size:
 *   blogN.webp     - 1600w, for the featured slot on retina
 *   blogN-sm.webp  - 800w,  for grid cards and related links
 *
 * Originals move to design/photography so nothing is lost and the served
 * bundle stops carrying them. Run with `node optimize-images.mjs`.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC = "public";
const ARCHIVE = "design/photography";
const WIDTHS = [
  { suffix: "", width: 1600, quality: 80 },
  { suffix: "-sm", width: 800, quality: 78 },
];

fs.mkdirSync(ARCHIVE, { recursive: true });

const sources = fs
  .readdirSync(PUBLIC)
  .filter((f) => /^blog\d+\.png$/i.test(f))
  .sort();

let before = 0;
let after = 0;

for (const file of sources) {
  const src = path.join(PUBLIC, file);
  const base = path.basename(file, path.extname(file));
  const meta = await sharp(src).metadata();
  before += fs.statSync(src).size;

  for (const { suffix, width, quality } of WIDTHS) {
    const out = path.join(PUBLIC, `${base}${suffix}.webp`);
    await sharp(src)
      // Never upscale: two of the sources are already under 1600px wide.
      .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    after += fs.statSync(out).size;
    console.log(`${out}  ${Math.min(width, meta.width)}w  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  }

  fs.renameSync(src, path.join(ARCHIVE, file));
}

const mb = (b) => (b / 1048576).toFixed(2);
console.log(`\n${sources.length} images: ${mb(before)}MB -> ${mb(after)}MB`);
