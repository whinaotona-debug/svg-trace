var SHAPES = [
  { kind: "bubble-round", name: "丸型吹き出し" },
  { kind: "bubble-roundrect", name: "角丸吹き出し" },
  { kind: "bubble-cloud", name: "思考吹き出し" },
  { kind: "bubble-spike", name: "強調吹き出し" },
  { kind: "frame-rect", name: "四角枠" },
  { kind: "frame-round", name: "角丸四角枠" },
  { kind: "novel", name: "ノベル窓" },
  { kind: "speed", name: "集中線" },
  { kind: "heart", name: "ハート" },
  { kind: "star", name: "星" },
  { kind: "diamond", name: "ダイヤ" },
  { kind: "arrow", name: "矢印" }
];

function shapePath(kind, x, y, w, h) {
  if (kind === "bubble-round") {
    const p = ellipsePath(x, y, w, h * 0.78);
    addTail(p, x, y, w, h * 0.78, "left");
    return p;
  }
  if (kind === "bubble-roundrect") {
    const p = roundRectPath(x, y, w, h * 0.76, Math.min(w, h) * 0.18);
    addTail(p, x, y, w, h * 0.76, "right");
    return p;
  }
  if (kind === "bubble-cloud") {
    const p = new Path2D();
    const bumps = [
      [0.22, 0.48, 0.22, 0.28], [0.48, 0.38, 0.28, 0.32], [0.75, 0.46, 0.22, 0.26],
      [0.38, 0.62, 0.26, 0.22], [0.62, 0.64, 0.24, 0.2]
    ];
    bumps.forEach(function (b) {
      p.ellipse(x + w * b[0], y + h * b[1] * 0.78, Math.max(2, w * b[2]), Math.max(2, h * b[3]), 0, 0, Math.PI * 2);
    });
    [[0.22, 0.86, 0.07], [0.14, 0.96, 0.045], [0.07, 1.04, 0.03]].forEach(function (b) {
      p.ellipse(x + w * b[0], y + h * b[1], Math.max(2, w * b[2]), Math.max(2, h * b[2] * 0.9), 0, 0, Math.PI * 2);
    });
    return p;
  }
  if (kind === "bubble-spike") {
    const p = starPath(x, y - h * 0.02, w, h * 0.82, 16, 0.72);
    addTail(p, x, y, w, h * 0.78, "left");
    return p;
  }
  if (kind === "frame-rect") return roundRectPath(x, y, w, h, 0);
  if (kind === "frame-round") return roundRectPath(x, y, w, h, Math.min(w, h) * 0.16);
  if (kind === "novel") return roundRectPath(x, y, w, h, 10);
  if (kind === "heart") return heartPath(x, y, w, h);
  if (kind === "star") return starPath(x, y, w, h, 5, 0.42);
  if (kind === "diamond") return diamondPath(x, y, w, h);
  if (kind === "arrow") return arrowPath(x, y, w, h);
  return roundRectPath(x, y, w, h, 8);
}
function drawSpeed(c, obj) {
  const x = obj.x, y = obj.y, w = obj.w, h = obj.h;
  const cx = x + w / 2, cy = y + h / 2, r = Math.hypot(w, h) / 2;
  c.save();
  c.beginPath();
  c.rect(x, y, w, h);
  c.clip();
  c.strokeStyle = obj.stroke === "none" ? "#111" : obj.stroke;
  c.lineWidth = Math.max(1, obj.strokeWidth || 2);
  c.lineCap = "round";
  for (let i = 0; i < 56; i++) {
    const a = (i / 56) * Math.PI * 2;
    const jig = ((i * 13) % 9) / 9;
    const inner = r * (0.12 + jig * 0.18);
    c.beginPath();
    c.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
    c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    c.stroke();
  }
  c.restore();
}
function drawNovel(c, obj) {
  paintPath(c, obj, roundRectPath(obj.x, obj.y, obj.w, obj.h, 12));
  c.fillStyle = obj.stroke === "none" ? "#4c97ff" : obj.stroke;
  c.fill(roundRectPath(obj.x + 12, obj.y - 14, 88, 22, 6));
  c.fillStyle = "#fff";
  c.font = '700 11px "Noto Sans JP", sans-serif';
  c.textBaseline = "middle";
  c.fillText("なまえ", obj.x + 24, obj.y - 3);
}
function drawShapeThumb(c, kind) {
  c.save();
  c.scale(192 / 144, 96 / 72);
  const dummy = { kind: kind, x: 18, y: 10, w: 108, h: 50, fill: "#fff", stroke: "#222", strokeWidth: 3 };
  if (kind === "speed") {
    dummy.x = 8; dummy.y = 8; dummy.w = 128; dummy.h = 56; dummy.stroke = "#333"; dummy.strokeWidth = 1.5;
    drawSpeed(c, dummy);
  } else if (kind === "novel") {
    dummy.y = 22; dummy.h = 36; dummy.fill = "#fff8e8";
    drawNovel(c, dummy);
  } else if (kind === "heart" || kind === "star" || kind === "diamond") {
    dummy.fill = "#ff6b9a"; dummy.x = 42; dummy.y = 8; dummy.w = 60; dummy.h = 56;
    paintPath(c, dummy, shapePath(kind, dummy.x, dummy.y, dummy.w, dummy.h));
  } else {
    paintPath(c, dummy, shapePath(kind, dummy.x, dummy.y, dummy.w, dummy.h));
  }
  c.restore();
}
