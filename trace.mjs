import sharp from "sharp";
import fs from "node:fs/promises";

const N = 512; // trace resolution
// The source already carries an alpha channel, so the artwork's own
// transparency is the mask — no thresholding against a background needed.
const { data, info } = await sharp("design/logo-source.png")
  .resize(N, N, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width, H = info.height, CH = info.channels;
const ink = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) ink[i] = data[i * CH + (CH - 1)] > 128 ? 1 : 0;

// Connected components (4-way), so the leaf and each ribbon come out separately.
const label = new Int32Array(W * H).fill(0);
let next = 0;
const comps = [];
for (let i = 0; i < W * H; i++) {
  if (!ink[i] || label[i]) continue;
  next++;
  const stack = [i];
  label[i] = next;
  let count = 0;
  while (stack.length) {
    const p = stack.pop();
    count++;
    const x = p % W, y = (p / W) | 0;
    const nb = [];
    if (x > 0) nb.push(p - 1);
    if (x < W - 1) nb.push(p + 1);
    if (y > 0) nb.push(p - W);
    if (y < H - 1) nb.push(p + W);
    for (const q of nb) if (ink[q] && !label[q]) { label[q] = next; stack.push(q); }
  }
  comps.push({ id: next, count });
}
comps.sort((a, b) => b.count - a.count);
console.log("components:", comps.slice(0, 6).map(c => `${c.id}:${c.count}px`).join(" "));

// Moore boundary tracing. The backtrack pixel has to be carried explicitly —
// without it the walk turns straight back on itself after one step.
const DIRS = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]; // CW from E

const traceOne = (id) => {
  const is = (x, y) => x >= 0 && y >= 0 && x < W && y < H && label[y * W + x] === id;

  let start = -1;
  for (let i = 0; i < W * H; i++) if (label[i] === id) { start = i; break; }
  if (start < 0) return [];
  const sx = start % W, sy = (start / W) | 0;

  const pts = [[sx, sy]];
  let px = sx, py = sy;
  // Scanning order guarantees the pixel to the west is background.
  let back = 4;

  for (let step = 0; step < 400000; step++) {
    let found = -1;
    for (let k = 1; k <= 8; k++) {
      const d = (back + k) % 8;
      const nx = px + DIRS[d][0], ny = py + DIRS[d][1];
      if (is(nx, ny)) { found = d; break; }
    }
    if (found < 0) break; // isolated pixel

    const nx = px + DIRS[found][0], ny = py + DIRS[found][1];
    // New backtrack is the neighbour we examined immediately before this one.
    back = (found + 4 + 1) % 8;
    px = nx; py = ny;

    if (px === sx && py === sy) break;
    pts.push([px, py]);
  }
  return pts;
};

// Ramer-Douglas-Peucker.
const rdp = (pts, eps) => {
  if (pts.length < 3) return pts;
  let idx = 0, max = 0;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay;
  const norm = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / norm;
    if (d > max) { max = d; idx = i; }
  }
  if (max > eps) {
    return [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)];
  }
  return [pts[0], pts[pts.length - 1]];
};

// Normalise into a -50..50 box centred on the mark's bounding box.
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let i = 0; i < W * H; i++) {
  if (!ink[i]) continue;
  const x = i % W, y = (i / W) | 0;
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
}
const span = Math.max(maxX - minX, maxY - minY);
const cxm = (minX + maxX) / 2, cym = (minY + maxY) / 2;
const map = ([x, y]) => [
  +(((x - cxm) / span) * 100).toFixed(2),
  +(((y - cym) / span) * 100).toFixed(2),
];

const paths = [];
for (const c of comps.filter(c => c.count > 400).slice(0, 4)) {
  const simp = rdp(traceOne(c.id), 1.1).map(map);
  paths.push("M " + simp.map(p => p.join(",")).join(" L ") + " Z");
  console.log(`component ${c.id}: ${simp.length} points`);
}

await fs.writeFile("traced-paths.json", JSON.stringify(paths, null, 2));
console.log("total path chars:", paths.join("").length);
