var TEMPLATES = [
  { kind: "bg-sky", name: "青空", group: "bg" },
  { kind: "bg-sunset", name: "夕焼け", group: "bg" },
  { kind: "bg-school", name: "学校", group: "bg" },
  { kind: "bg-room", name: "室内", group: "bg" },
  { kind: "bg-space", name: "宇宙", group: "bg" },
  { kind: "bg-cyber", name: "サイバー", group: "bg" },
  { kind: "bg-dot", name: "ドット絵", group: "bg" },
  { kind: "bg-park", name: "公園", group: "bg" },
  { kind: "bg-stage", name: "ステージ", group: "bg" },
  { kind: "bg-night", name: "夜の街", group: "bg" },
  { kind: "face-joy", name: "喜び顔", group: "char" },
  { kind: "face-angry", name: "怒り顔", group: "char" },
  { kind: "face-sad", name: "悲しみ顔", group: "char" },
  { kind: "face-surprise", name: "驚き顔", group: "char" },
  { kind: "face-cool", name: "クール顔", group: "char" },
  { kind: "char-robot", name: "ロボット", group: "char" },
  { kind: "char-monster", name: "モンスター", group: "char" },
  { kind: "char-cat", name: "ネコ", group: "char" },
  { kind: "deco-tail", name: "しっぽ", group: "char" },
  { kind: "deco-spark", name: "キラキラ", group: "char" }
];

function drawFace(c, kind, x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2, r = Math.min(w, h) * 0.38;
  c.fillStyle = kind === "char-cat" ? "#ffb347" : "#ffe08a";
  c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
  c.strokeStyle = "#222"; c.lineWidth = 3; c.stroke();
  if (kind === "char-cat") {
    c.fillStyle = "#ffb347";
    c.beginPath(); c.moveTo(cx - r * 0.7, cy - r * 0.2); c.lineTo(cx - r * 0.85, cy - r * 1.05); c.lineTo(cx - r * 0.15, cy - r * 0.7); c.fill();
    c.beginPath(); c.moveTo(cx + r * 0.7, cy - r * 0.2); c.lineTo(cx + r * 0.85, cy - r * 1.05); c.lineTo(cx + r * 0.15, cy - r * 0.7); c.fill();
  }
  c.fillStyle = "#222";
  const eyeY = cy - r * 0.12;
  if (kind === "face-joy") {
    c.lineWidth = 3; c.beginPath(); c.arc(cx - r * 0.28, eyeY, 6, Math.PI, 0); c.stroke();
    c.beginPath(); c.arc(cx + r * 0.28, eyeY, 6, Math.PI, 0); c.stroke();
    c.beginPath(); c.arc(cx, cy + r * 0.18, r * 0.28, 0.15, Math.PI - 0.15); c.stroke();
  } else if (kind === "face-angry") {
    c.beginPath(); c.arc(cx - r * 0.28, eyeY + 2, 4, 0, Math.PI * 2); c.arc(cx + r * 0.28, eyeY + 2, 4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.moveTo(cx - r * 0.48, eyeY - 8); c.lineTo(cx - r * 0.12, eyeY - 2); c.moveTo(cx + r * 0.48, eyeY - 8); c.lineTo(cx + r * 0.12, eyeY - 2); c.stroke();
    c.beginPath(); c.moveTo(cx - r * 0.18, cy + r * 0.28); c.lineTo(cx + r * 0.18, cy + r * 0.22); c.stroke();
  } else if (kind === "face-sad") {
    c.beginPath(); c.arc(cx - r * 0.28, eyeY, 4, 0, Math.PI * 2); c.arc(cx + r * 0.28, eyeY, 4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(cx, cy + r * 0.38, r * 0.22, Math.PI + 0.2, -0.2); c.stroke();
  } else if (kind === "face-surprise") {
    c.beginPath(); c.arc(cx - r * 0.28, eyeY, 6, 0, Math.PI * 2); c.arc(cx + r * 0.28, eyeY, 6, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(cx, cy + r * 0.28, r * 0.18, 0, Math.PI * 2); c.stroke();
  } else {
    c.fillRect(cx - r * 0.38, eyeY - 2, 14, 3); c.fillRect(cx + r * 0.18, eyeY - 2, 14, 3);
    c.beginPath(); c.moveTo(cx - r * 0.16, cy + r * 0.28); c.lineTo(cx + r * 0.16, cy + r * 0.28); c.stroke();
    if (kind === "char-cat") {
      c.beginPath();
      c.moveTo(cx, cy); c.lineTo(cx - r * 0.9, cy - 4); c.moveTo(cx, cy); c.lineTo(cx - r * 0.9, cy + 6);
      c.moveTo(cx, cy); c.lineTo(cx + r * 0.9, cy - 4); c.moveTo(cx, cy); c.lineTo(cx + r * 0.9, cy + 6);
      c.stroke();
    }
  }
}
function drawTemplate(c, kind, x, y, w, h) {
  c.save();
  c.beginPath();
  c.rect(x, y, w, h);
  c.clip();
  const g = function (a, b) {
    const gr = c.createLinearGradient(x, y, x, y + h);
    gr.addColorStop(0, a); gr.addColorStop(1, b); return gr;
  };
  if (kind === "bg-sky") {
    c.fillStyle = g("#7ecbff", "#d6f0ff"); c.fillRect(x, y, w, h);
    c.fillStyle = "rgba(255,255,255,.9)";
    [[0.2, 0.22], [0.55, 0.18], [0.78, 0.3]].forEach(function (p) {
      c.beginPath(); c.ellipse(x + w * p[0], y + h * p[1], w * 0.14, h * 0.06, 0, 0, Math.PI * 2); c.fill();
    });
  } else if (kind === "bg-sunset") {
    c.fillStyle = g("#ffb347", "#ff5e7e"); c.fillRect(x, y, w, h);
    c.fillStyle = "#ffe08a";
    c.beginPath(); c.arc(x + w * 0.72, y + h * 0.28, Math.min(w, h) * 0.12, 0, Math.PI * 2); c.fill();
  } else if (kind === "bg-school") {
    c.fillStyle = "#3d8b5a"; c.fillRect(x, y, w, h * 0.72);
    c.fillStyle = "#8b5a2b"; c.fillRect(x, y, 10, h); c.fillRect(x + w - 10, y, 10, h); c.fillRect(x, y, w, 10);
    c.fillStyle = "#e6d3a3"; c.fillRect(x, y + h * 0.72, w, h * 0.28);
    c.strokeStyle = "rgba(255,255,255,.25)"; c.lineWidth = 2;
    for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(x + 18, y + h * 0.12 * i + 8); c.lineTo(x + w - 18, y + h * 0.12 * i + 8); c.stroke(); }
  } else if (kind === "bg-room") {
    c.fillStyle = "#f3e6d0"; c.fillRect(x, y, w, h);
    c.fillStyle = "#8ec8ff"; c.fillRect(x + w * 0.55, y + h * 0.12, w * 0.32, h * 0.38);
    c.strokeStyle = "#c9b79a"; c.lineWidth = 4;
    c.strokeRect(x + w * 0.55, y + h * 0.12, w * 0.32, h * 0.38);
    c.fillStyle = "#d7b48a"; c.fillRect(x, y + h * 0.7, w, h * 0.3);
  } else if (kind === "bg-space") {
    c.fillStyle = g("#070b2a", "#1b0b3b"); c.fillRect(x, y, w, h);
    c.fillStyle = "#fff";
    for (let i = 0; i < 40; i++) {
      const px = x + hash(i + 2) * w, py = y + hash(i + 9) * h, r = 0.6 + hash(i) * 1.6;
      c.beginPath(); c.arc(px, py, r, 0, Math.PI * 2); c.fill();
    }
    c.fillStyle = "#7aa7ff";
    c.beginPath(); c.arc(x + w * 0.22, y + h * 0.28, Math.min(w, h) * 0.08, 0, Math.PI * 2); c.fill();
  } else if (kind === "bg-cyber") {
    c.fillStyle = "#061016"; c.fillRect(x, y, w, h);
    c.strokeStyle = "#23e1c3"; c.lineWidth = 1;
    c.beginPath();
    for (let i = 0; i <= 8; i++) {
      c.moveTo(x, y + h * 0.35 + i * 10);
      c.lineTo(x + w, y + h * 0.35 + i * 10);
    }
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      c.moveTo(x + w * t, y + h * 0.35);
      c.lineTo(x + w * (0.5 + (t - 0.5) * 1.8), y + h);
    }
    c.stroke();
  } else if (kind === "bg-dot") {
    c.fillStyle = "#1d2b3a"; c.fillRect(x, y, w, h);
    const s = Math.max(6, w / 24);
    for (let yy = y; yy < y + h; yy += s) for (let xx = x; xx < x + w; xx += s) {
      c.fillStyle = ((xx + yy) / s) % 2 < 1 ? "#ff6b9a" : "#ffe066";
      c.fillRect(xx, yy, s - 1, s - 1);
    }
  } else if (kind === "bg-park") {
    c.fillStyle = g("#9ad9ff", "#e8f7ff"); c.fillRect(x, y, w, h);
    c.fillStyle = "#f7d15a";
    c.beginPath(); c.arc(x + w * 0.8, y + h * 0.18, Math.min(w, h) * 0.1, 0, Math.PI * 2); c.fill();
    c.fillStyle = "#6fbf63";
    c.beginPath(); c.ellipse(x + w * 0.3, y + h, w * 0.55, h * 0.45, 0, Math.PI, 0); c.fill();
    c.beginPath(); c.ellipse(x + w * 0.75, y + h, w * 0.5, h * 0.38, 0, Math.PI, 0); c.fill();
  } else if (kind === "bg-stage") {
    c.fillStyle = "#1a1020"; c.fillRect(x, y, w, h);
    c.fillStyle = "#8b1e2d"; c.fillRect(x, y, w * 0.12, h); c.fillRect(x + w * 0.88, y, w * 0.12, h);
    const lg = c.createRadialGradient(x + w / 2, y, 10, x + w / 2, y + h * 0.2, h);
    lg.addColorStop(0, "rgba(255,240,170,.55)"); lg.addColorStop(1, "rgba(255,240,170,0)");
    c.fillStyle = lg; c.fillRect(x, y, w, h);
  } else if (kind === "bg-night") {
    c.fillStyle = g("#1a1440", "#4b2a6a"); c.fillRect(x, y, w, h);
    [0.1, 0.28, 0.5, 0.68, 0.85].forEach(function (px, i) {
      const bw = w * (0.12 + hash(i) * 0.08), bh = h * (0.28 + hash(i + 3) * 0.35);
      c.fillStyle = "#0e1028";
      c.fillRect(x + w * px, y + h - bh, bw, bh);
      c.fillStyle = "#ffe08a";
      for (let k = 0; k < 6; k++) c.fillRect(x + w * px + 4, y + h - bh + 6 + k * 10, 4, 4);
    });
  } else if (kind.indexOf("face-") === 0 || kind === "char-cat") {
    drawFace(c, kind, x, y, w, h);
  } else if (kind === "char-robot") {
    c.fillStyle = "#9aa7b8";
    c.fill(roundRectPath(x + w * 0.2, y + h * 0.22, w * 0.6, h * 0.58, 8));
    c.fillStyle = "#4c97ff";
    c.fillRect(x + w * 0.28, y + h * 0.34, w * 0.44, h * 0.16);
    c.strokeStyle = "#575e75"; c.lineWidth = 3;
    c.beginPath(); c.moveTo(x + w / 2, y + h * 0.22); c.lineTo(x + w / 2, y + h * 0.1); c.stroke();
    c.fillStyle = "#ffbf00"; c.beginPath(); c.arc(x + w / 2, y + h * 0.08, 5, 0, Math.PI * 2); c.fill();
  } else if (kind === "char-monster") {
    c.fillStyle = "#7ed957";
    c.beginPath(); c.ellipse(x + w / 2, y + h * 0.55, w * 0.32, h * 0.32, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.moveTo(x + w * 0.32, y + h * 0.32); c.lineTo(x + w * 0.28, y + h * 0.08); c.lineTo(x + w * 0.44, y + h * 0.28); c.fill();
    c.beginPath(); c.moveTo(x + w * 0.68, y + h * 0.32); c.lineTo(x + w * 0.72, y + h * 0.08); c.lineTo(x + w * 0.56, y + h * 0.28); c.fill();
    c.fillStyle = "#111"; c.beginPath(); c.arc(x + w * 0.4, y + h * 0.5, 4, 0, Math.PI * 2); c.arc(x + w * 0.6, y + h * 0.5, 4, 0, Math.PI * 2); c.fill();
    c.fillStyle = "#fff"; c.fillRect(x + w * 0.42, y + h * 0.62, 6, 8); c.fillRect(x + w * 0.52, y + h * 0.62, 6, 8);
  } else if (kind === "deco-tail") {
    c.fillStyle = "#fff"; c.strokeStyle = "#222"; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(x + w * 0.2, y + h * 0.2);
    c.lineTo(x + w * 0.5, y + h * 0.85);
    c.lineTo(x + w * 0.8, y + h * 0.2);
    c.closePath(); c.fill(); c.stroke();
  } else if (kind === "deco-spark") {
    c.fillStyle = "#ffd84d";
    c.fill(starPath(x + w * 0.15, y + h * 0.1, w * 0.5, h * 0.5, 4, 0.35));
    c.fill(starPath(x + w * 0.5, y + h * 0.42, w * 0.35, h * 0.35, 4, 0.35));
  }
  c.restore();
}
function drawObject(c, obj) {
  if (obj.type === "shape") {
    if (obj.kind === "speed") drawSpeed(c, obj);
    else if (obj.kind === "novel") drawNovel(c, obj);
    else paintPath(c, obj, shapePath(obj.kind, obj.x, obj.y, obj.w, obj.h));
  } else if (obj.type === "text") {
    drawText(c, obj);
  } else if (obj.type === "template") {
    drawTemplate(c, obj.kind, obj.x, obj.y, obj.w, obj.h);
  }
}
