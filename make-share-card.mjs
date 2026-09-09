/**
 * Builds public/share-card.png, the image link previews use.
 *
 * The site had no og tags at all, so a shared URL rendered as bare text on
 * LinkedIn and WhatsApp. This is a single-page app with no prerendering, so a
 * crawler only ever sees index.html — one card serves the whole site rather
 * than one per article.
 *
 * Text is rendered through sharp's Pango text input with the real Newsreader
 * file rather than a system serif, so the card matches the site's face. The
 * font is fetched on first run and cached beside this script.
 *
 * Run with `node make-share-card.mjs`.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const W = 1200;
const H = 630;
const FONT_DIR = ".fonts";
const FONT = path.join(FONT_DIR, "Newsreader.ttf");
const FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf";

if (!fs.existsSync(FONT)) {
  fs.mkdirSync(FONT_DIR, { recursive: true });
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Could not fetch Newsreader: ${res.status}`);
  fs.writeFileSync(FONT, Buffer.from(await res.arrayBuffer()));
  console.log(`fetched ${FONT}`);
}

// The brand mark, traced from the artwork — same paths the site renders.
const MARK = [
  "M 0.19,-50 L 7.98,-35.21 L 9.53,-33.66 L 11.48,-33.66 L 19.65,-38.72 L 17.32,-30.16 L 14.2,-13.42 L 15.37,-12.26 L 16.93,-12.65 L 27.82,-24.32 L 29.38,-18.87 L 30.93,-17.7 L 33.66,-17.7 L 44.16,-20.43 L 40.27,-5.64 L 42.22,-3.7 L 45.72,-2.14 L 39.49,3.31 L 32.88,7.2 L 23.54,10.7 L 10.7,13.81 L -4.09,18.48 L -13.81,22.37 L -26.26,28.99 L -23.15,20.82 L -23.15,17.32 L -24.71,15.37 L -45.72,-2.53 L -41.83,-3.7 L -39.88,-5.25 L -39.88,-7.98 L -43.39,-20.43 L -30.93,-17.32 L -29.77,-17.7 L -28.21,-20.04 L -27.43,-24.71 L -16.54,-13.04 L -14.59,-12.65 L -13.81,-13.42 L -13.81,-16.15 L -16.93,-32.1 L -18.87,-38.72 L -13.04,-34.82 L -10.7,-33.66 L -9.14,-33.66 L -7.2,-35.6 L -0.19,-49.61 Z",
  "M 38.33,7.2 L 35.6,10.31 L 30.16,14.2 L 11.87,21.98 L 2.53,26.65 L -5.25,31.71 L -13.81,39.88 L -20.43,50 L -36.38,50 L -36.38,49.22 L -30.93,41.83 L -24.71,35.6 L -19.65,31.71 L -13.04,27.43 L -4.47,23.15 L 11.48,17.32 L 28.6,12.26 L 37.94,7.59 Z",
  "M 30.54,15.76 L 27.04,19.26 L 12.26,30.93 L 6.81,36.77 L 3.7,43.77 L 3.7,50 L -9.92,50 L -6.03,40.66 L -2.14,35.6 L 8.37,27.43 L 30.16,16.15 Z",
];

const rules = Array.from({ length: 11 }, (_, i) => {
  const x = 100 * (i + 1);
  return `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(245,244,242,0.05)" stroke-width="1"/>`;
}).join("");

const ground = Buffer.from(`<svg width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0c0e11"/>
  ${rules}
  <g transform="translate(96,120) scale(0.86)" fill="#c9a54e">
    ${MARK.map((d) => `<path d="${d}"/>`).join("")}
  </g>
  <line x1="96" y1="292" x2="240" y2="292" stroke="#c9a54e" stroke-width="3"/>
  <line x1="0" y1="${H - 6}" x2="${W}" y2="${H - 6}" stroke="#c9a54e" stroke-width="12"/>
</svg>`);

/**
 * One Pango text layer, rendered with the real Newsreader file.
 *
 * dpi is pinned to 72 so a point equals a pixel and the sizes below read as
 * the pixel heights they actually are — at the default dpi the same numbers
 * render nearly three times larger and the layers overlap.
 */
const layer = (markup, width) =>
  sharp({
    text: { text: markup, font: "Newsreader", fontfile: FONT, rgba: true, width, dpi: 72 },
  }).png().toBuffer();

const [wordmark, sub, credential] = await Promise.all([
  layer(`<span foreground="#f5f4f2" size="92pt">Endless Pathways</span>`, 1010),
  layer(
    `<span foreground="#c9a54e" size="19pt" letter_spacing="7000">IMMIGRATION SERVICES</span>`,
    1010,
  ),
  layer(
    `<span foreground="#9a938a" size="21pt">Regulated Canadian Immigration Consultant · RCIC R1053912</span>`,
    1010,
  ),
]);

await sharp(ground)
  .composite([
    { input: wordmark, left: 92, top: 322 },
    { input: sub, left: 96, top: 452 },
    { input: credential, left: 96, top: 520 },
  ])
  .png()
  .toFile("public/share-card.png");

const kb = (fs.statSync("public/share-card.png").size / 1024).toFixed(0);
console.log(`public/share-card.png  ${W}x${H}  ${kb}KB`);
