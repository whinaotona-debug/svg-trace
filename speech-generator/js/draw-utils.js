function uid() { return "o" + Math.random().toString(36).slice(2, 9); }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function hash(n) { return Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1; }

function roundRectPath(x, y, w, h, r) {
  const p = new Path2D();
  if (!(r > 0)) { p.rect(x, y, w, h); return p; }
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  p.moveTo(x + r, y);
  p.arcTo(x + w, y, x + w, y + h, r);
  p.arcTo(x + w, y + h, x, y + h, r);
  p.arcTo(x, y + h, x, y, r);
  p.arcTo(x, y, x + w, y, r);
  p.closePath();
  return p;
}
function ellipsePath(x, y, w, h) {
  const p = new Path2D();
  p.ellipse(x + w / 2, y + h / 2, Math.max(0.5, Math.abs(w / 2)), Math.max(0.5, Math.abs(h / 2)), 0, 0, Math.PI * 2);
  return p;
}
function addTail(p, x, y, w, h, side) {
  const by = y + h;
  if (side === "left") {
    p.moveTo(x + w * 0.28, by - 2);
    p.lineTo(x + w * 0.08, by + h * 0.22);
    p.lineTo(x + w * 0.42, by - 2);
  } else {
    p.moveTo(x + w * 0.58, by - 2);
    p.lineTo(x + w * 0.92, by + h * 0.22);
    p.lineTo(x + w * 0.72, by - 2);
  }
  p.closePath();
  return p;
}
function heartPath(x, y, w, h) {
  const p = new Path2D();
  p.moveTo(x + w / 2, y + h * 0.32);
  p.bezierCurveTo(x + w * 0.15, y - h * 0.08, x - w * 0.08, y + h * 0.38, x + w / 2, y + h);
  p.bezierCurveTo(x + w * 1.08, y + h * 0.38, x + w * 0.85, y - h * 0.08, x + w / 2, y + h * 0.32);
  p.closePath();
  return p;
}
function starPath(x, y, w, h, spikes, inner) {
  const p = new Path2D();
  const cx = x + w / 2, cy = y + h / 2, n = spikes || 5;
  const ri = inner || 0.45;
  for (let i = 0; i < n * 2; i++) {
    const t = -Math.PI / 2 + i * Math.PI / n;
    const r = i % 2 ? ri : 1;
    const px = cx + Math.cos(t) * (w / 2) * r;
    const py = cy + Math.sin(t) * (h / 2) * r;
    if (i === 0) p.moveTo(px, py); else p.lineTo(px, py);
  }
  p.closePath();
  return p;
}
function diamondPath(x, y, w, h) {
  const p = new Path2D();
  p.moveTo(x + w / 2, y);
  p.lineTo(x + w, y + h / 2);
  p.lineTo(x + w / 2, y + h);
  p.lineTo(x, y + h / 2);
  p.closePath();
  return p;
}
function arrowPath(x, y, w, h) {
  const p = new Path2D();
  p.moveTo(x, y + h * 0.32);
  p.lineTo(x + w * 0.58, y + h * 0.32);
  p.lineTo(x + w * 0.58, y);
  p.lineTo(x + w, y + h / 2);
  p.lineTo(x + w * 0.58, y + h);
  p.lineTo(x + w * 0.58, y + h * 0.68);
  p.lineTo(x, y + h * 0.68);
  p.closePath();
  return p;
}
function paintPath(c, obj, path) {
  if (obj.fill && obj.fill !== "none") {
    c.fillStyle = obj.fill;
    c.fill(path);
  }
  if (obj.strokeWidth > 0 && obj.stroke && obj.stroke !== "none") {
    c.strokeStyle = obj.stroke;
    c.lineWidth = obj.strokeWidth;
    c.lineJoin = "round";
    c.lineCap = "round";
    c.stroke(path);
  }
}
function wrapText(c, text, maxW) {
  const lines = [];
  String(text || "").split("\n").forEach((para) => {
    let line = "";
    for (const ch of para) {
      const next = line + ch;
      if (c.measureText(next).width > maxW && line) { lines.push(line); line = ch; }
      else line = next;
    }
    lines.push(line);
  });
  return lines;
}
function drawText(c, obj) {
  const size = obj.fontSize || 28;
  c.font = "700 " + size + "px " + obj.fontFamily;
  c.textBaseline = "top";
  const lines = wrapText(c, obj.text, obj.w);
  const ow = obj.outlineWidth || 0;
  lines.forEach((line, i) => {
    const tx = obj.x, ty = obj.y + i * size * 1.25;
    if (ow > 0 && obj.outline && obj.outline !== "none") {
      c.lineJoin = "round"; c.miterLimit = 2;
      c.strokeStyle = obj.outline; c.lineWidth = ow * 2;
      c.strokeText(line, tx, ty);
    }
    c.fillStyle = obj.fill || "#111";
    c.fillText(line, tx, ty);
  });
}
function checker(c, x, y, w, h, s) {
  c.fillStyle = "#fff"; c.fillRect(x, y, w, h);
  c.fillStyle = "#eceff4";
  for (let yy = 0; yy < h; yy += s) for (let xx = 0; xx < w; xx += s) {
    if (((xx / s) + (yy / s)) % 2 === 0) c.fillRect(x + xx, y + yy, s, s);
  }
}
function wheelDelta(e) {
  let dx = e.deltaX, dy = e.deltaY;
  if (e.deltaMode === 1) { dx *= 16; dy *= 16; }
  if (e.deltaMode === 2) { dx *= 32; dy *= 32; }
  return { dx, dy };
}
