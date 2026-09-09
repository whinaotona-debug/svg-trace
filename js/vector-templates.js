/* Vector costume templates. Each frame is editable SVG geometry (no bitmaps). */
(function (global) {
  function hash(n) { return Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rot(rad) {
    const c = Math.cos(rad), s = Math.sin(rad);
    return [c, s, -s, c, 0, 0];
  }
  function mul(a, b) {
    return [a[0]*b[0]+a[2]*b[1], a[1]*b[0]+a[3]*b[1], a[0]*b[2]+a[2]*b[3], a[1]*b[2]+a[3]*b[3], a[0]*b[4]+a[2]*b[5]+a[4], a[1]*b[4]+a[3]*b[5]+a[5]];
  }
  function tr(x, y) { return [1, 0, 0, 1, x, y]; }
  function ident() { return [1, 0, 0, 1, 0, 0]; }
  function starD(cx, cy, outer, inner, spikes) {
    const pts = [];
    const n = spikes * 2;
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + i * Math.PI / spikes;
      const r = i % 2 ? inner : outer;
      pts.push((cx + Math.cos(ang) * r).toFixed(2) + " " + (cy + Math.sin(ang) * r).toFixed(2));
    }
    return "M" + pts.join("L") + "Z";
  }
  function ell(cx, cy, rx, ry, fill, extra) {
    extra = extra || {};
    return {
      t: "ellipse", cx: cx, cy: cy, rx: Math.max(0.6, rx), ry: Math.max(0.6, ry),
      fill: fill, f2: extra.f2 || "#ffffff", fs: extra.fs || "solid",
      stroke: extra.stroke || "none", sw: extra.sw || 0, matrix: extra.matrix || ident()
    };
  }
  function path(d, fill, extra) {
    extra = extra || {};
    return {
      t: "path", d: d, fill: fill, f2: extra.f2 || "#ffffff", fs: extra.fs || "solid",
      stroke: extra.stroke || "none", sw: extra.sw || 0, rule: extra.rule || "nonzero",
      matrix: extra.matrix || ident()
    };
  }
  function group(children, matrix) {
    return { t: "group", children: children, matrix: matrix || ident() };
  }

  function explode(t, cx, cy, m) {
    const p = clamp(t, 0, 1);
    const kids = [];
    const ring = Math.max(3, p * m * 0.48);
    const fade = 1 - p;
    kids.push(ell(cx, cy, ring, ring, "none", {
      stroke: p < 0.7 ? "#ffe08a" : "#d8c48a",
      sw: Math.max(1.2, 9 * fade + 1)
    }));
    const fireT = p < 0.55 ? p / 0.55 : 1 - (p - 0.55) / 0.45;
    const R = m * (0.08 + 0.34 * fireT);
    if (fireT > 0.04) {
      kids.push(ell(cx, cy, R, R, "#c43a12", { fs: "radial", f2: "#ffef9a" }));
      kids.push(ell(cx, cy, R * 0.62, R * 0.62, "#ff7a1a", { fs: "radial", f2: "#fff6c8" }));
      kids.push(ell(cx, cy, R * 0.28, R * 0.28, "#fff4b0"));
    }
    const sparks = [];
    for (let i = 0; i < 16; i++) {
      const a = hash(i) * Math.PI * 2;
      const dist = (0.15 + hash(i + 3) * 0.7) * p * m * 0.5;
      const pr = Math.max(1.2, (1 - p) * (4 + hash(i + 7) * 8));
      sparks.push(ell(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, pr, pr, i % 3 ? "#ff9a3c" : "#ffef8a"));
    }
    kids.push(group(sparks));
    if (p > 0.4) {
      const s = (p - 0.4) / 0.6;
      const smoke = [];
      for (let i = 0; i < 7; i++) {
        const a = i / 7 * Math.PI * 2 + s;
        smoke.push(ell(
          cx + Math.cos(a) * R * 1.35,
          cy + Math.sin(a) * R * 1.05 - s * m * 0.12,
          16 + s * 18, 11 + s * 13,
          s < 0.7 ? "#8a8a96" : "#b8b8c0"
        ));
      }
      kids.push(group(smoke));
    }
    return kids;
  }

  function magic(t, cx, cy, m) {
    const p = clamp(t, 0, 1);
    const spin = p * Math.PI * 2;
    const kids = [];
    kids.push(ell(cx, cy, m * 0.42, m * 0.42, "#5a2ad0", { fs: "soft", f2: "#c8ffff" }));
    for (let k = 1; k <= 3; k++) {
      const rr = m * (0.12 + k * 0.08 + Math.sin(p * Math.PI * 2 + k) * 0.02);
      kids.push(ell(cx, cy, rr, rr, "none", { stroke: k === 1 ? "#b4ffff" : "#7ad7ff", sw: 3 }));
    }
    const stars = [];
    for (let i = 0; i < 10; i++) {
      const a = spin + i / 10 * Math.PI * 2;
      const rr = m * 0.28;
      const sx = cx + Math.cos(a) * rr, sy = cy + Math.sin(a) * rr;
      stars.push(path(starD(sx, sy, 9, 3.6, 4), "#fffbe8", { stroke: "#ffe08a", sw: 0.8 }));
    }
    kids.push(group(stars));
    kids.push(path(starD(cx, cy, m * 0.08, m * 0.035, 4), "#ffffff"));
    return kids;
  }

  function slash(t, cx, cy, m) {
    const p = clamp(t, 0, 1);
    const a0 = -0.9 + p * 2.4;
    const hw = m * 0.42, hh = m * 0.1;
    const d = "M" + (-hw) + " " + (-hh * 0.35) +
      "Q0 " + (-m * 0.16) + " " + hw + " " + (hh * 0.4) +
      "L" + hw + " " + (hh * 0.95) +
      "Q0 " + (-m * 0.05) + " " + (-hw) + " " + (hh * 0.4) + "Z";
    const blade = path(d, "#ffffff", { fs: "linear", f2: "#7adcff", stroke: "#c8f0ff", sw: 1.2, matrix: mul(tr(cx, cy), rot(a0)) });
    const kids = [blade];
    if (p > 0.28 && p < 0.88) {
      kids.push(path(starD(cx + m * 0.16, cy - m * 0.08, 18, 8, 8), "#ffe08a"));
      kids.push(path(starD(cx - m * 0.12, cy + m * 0.1, 12, 5, 8), "#fff6c8"));
    }
    return kids;
  }

  function fire(t, cx, cy, m) {
    const p = clamp(t, 0, 1);
    const flick = 0.85 + hash(Math.floor(p * 40)) * 0.25;
    const ox = Math.sin(p * Math.PI * 2) * m * 0.04;
    const kids = [];
    for (let i = 4; i >= 0; i--) {
      const back = i / 4;
      const R = m * (0.1 + 0.16 * (1 - back)) * flick;
      const yy = cy + back * m * 0.12 - p * 8;
      const fill = i > 2 ? "#c42810" : i > 0 ? "#ff8a1a" : "#fff3b0";
      kids.push(ell(cx + ox, yy, R * 0.72, R, fill, { fs: "radial", f2: "#fffde0" }));
    }
    kids.push(ell(cx - m * 0.18 + p * m * 0.08, cy + m * 0.12, m * 0.08, m * 0.05, "#ff5014"));
    return kids;
  }

  const BUILDERS = { explode: explode, magic: magic, slash: slash, fire: fire };

  global.VECTOR_TEMPLATES = [
    { id: "explode", name: "爆発", frames: 8, blurb: "8コマが costume1〜8 に入ります" },
    { id: "magic", name: "魔法オーラ", frames: 8, blurb: "8コマが costume1〜8 に入ります" },
    { id: "slash", name: "斬撃ヒット", frames: 6, blurb: "6コマが costume1〜6 に入ります" },
    { id: "fire", name: "炎・火の玉", frames: 8, blurb: "8コマが costume1〜8 に入ります" }
  ];

  global.buildVectorTemplateFrames = function (id, frames, cx, cy, size) {
    const fn = BUILDERS[id] || explode;
    const list = [];
    const n = Math.max(1, frames | 0);
    for (let i = 0; i < n; i++) {
      const t = n > 1 ? i / (n - 1) : 0;
      list.push(fn(t, cx, cy, size));
    }
    return list;
  };
})(window);
