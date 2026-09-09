(function () {
  const view = document.getElementById("view");
  const stageWrap = document.querySelector(".stage-wrap");
  const ctx = view.getContext("2d");
  const state = {
    w: 480, h: 360, zoom: 1, panX: 40, panY: 40,
    objects: [], selected: null, drag: null, applying: false, space: false
  };

  function selected() { return state.objects.find(function (o) { return o.id === state.selected; }) || null; }
  function handles(o) {
    return [
      { k: "nw", x: o.x, y: o.y }, { k: "n", x: o.x + o.w / 2, y: o.y }, { k: "ne", x: o.x + o.w, y: o.y },
      { k: "e", x: o.x + o.w, y: o.y + o.h / 2 }, { k: "se", x: o.x + o.w, y: o.y + o.h },
      { k: "s", x: o.x + o.w / 2, y: o.y + o.h }, { k: "sw", x: o.x, y: o.y + o.h }, { k: "w", x: o.x, y: o.y + o.h / 2 }
    ];
  }
  function toWorld(e) {
    const r = view.getBoundingClientRect();
    return {
      x: (e.clientX - r.left - state.panX) / state.zoom,
      y: (e.clientY - r.top - state.panY) / state.zoom
    };
  }
  function hitHandle(o, p) {
    const s = 10 / state.zoom;
    return handles(o).find(function (h) { return Math.abs(p.x - h.x) <= s && Math.abs(p.y - h.y) <= s; });
  }
  function hitObject(p) {
    for (let i = state.objects.length - 1; i >= 0; i--) {
      const o = state.objects[i];
      if (p.x >= o.x && p.x <= o.x + o.w && p.y >= o.y && p.y <= o.y + o.h) return o;
    }
    return null;
  }
  function overStage(e) {
    const r = stageWrap.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }
  function resizeView() {
    const wrap = stageWrap.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    view.width = Math.max(1, wrap.width * dpr);
    view.height = Math.max(1, wrap.height * dpr);
    view.style.width = wrap.width + "px";
    view.style.height = wrap.height + "px";
    draw();
  }
  function draw() {
    const wrap = stageWrap.getBoundingClientRect();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, view.width, view.height);
    const dpr = view.width / Math.max(1, wrap.width);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#c8d4de";
    ctx.fillRect(0, 0, wrap.width, wrap.height);
    ctx.save();
    ctx.translate(state.panX, state.panY);
    ctx.scale(state.zoom, state.zoom);
    checker(ctx, 0, 0, state.w, state.h, 16);
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, state.w, state.h); ctx.clip();
    state.objects.forEach(function (o) { drawObject(ctx, o); });
    ctx.restore();
    ctx.strokeStyle = "#4c97ff"; ctx.lineWidth = 1.5 / state.zoom;
    ctx.strokeRect(0, 0, state.w, state.h);
    const sel = selected();
    if (sel) {
      ctx.strokeStyle = "#4c97ff";
      ctx.setLineDash([6 / state.zoom, 4 / state.zoom]);
      ctx.strokeRect(sel.x, sel.y, sel.w, sel.h);
      ctx.setLineDash([]);
      const hs = 8 / state.zoom;
      handles(sel).forEach(function (h) {
        ctx.fillStyle = "#fff"; ctx.strokeStyle = "#4c97ff";
        ctx.fillRect(h.x - hs / 2, h.y - hs / 2, hs, hs);
        ctx.strokeRect(h.x - hs / 2, h.y - hs / 2, hs, hs);
      });
    }
    ctx.restore();
    document.getElementById("zoom-label").textContent = Math.round(state.zoom * 100) + "%";
  }
  function centerView() {
    const r = stageWrap.getBoundingClientRect();
    const z = Math.min((r.width - 48) / state.w, (r.height - 48) / state.h, 1.4);
    state.zoom = clamp(z, 0.3, 2);
    state.panX = (r.width - state.w * state.zoom) / 2;
    state.panY = (r.height - state.h * state.zoom) / 2;
  }
  function setZoomAt(next, mx, my) {
    const wx = (mx - state.panX) / state.zoom, wy = (my - state.panY) / state.zoom;
    state.zoom = clamp(next, 0.2, 8);
    state.panX = mx - wx * state.zoom;
    state.panY = my - wy * state.zoom;
    draw();
  }
  function applyWheel(e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl) {
      e.preventDefault();
      e.stopPropagation();
      const r = stageWrap.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      let dy = wheelDelta(e).dy;
      dy = Math.max(-50, Math.min(50, dy));
      setZoomAt(state.zoom * Math.exp(-dy * 0.004), mx, my);
      return true;
    }
    if (!overStage(e)) return false;
    e.preventDefault();
    e.stopPropagation();
    const d = wheelDelta(e);
    if (e.shiftKey) {
      state.panX -= (d.dx || d.dy);
      draw();
    } else {
      state.panX -= d.dx;
      state.panY -= d.dy;
      draw();
    }
    return true;
  }
  function addShape(kind) {
    const obj = {
      id: uid(), type: "shape", kind: kind,
      x: state.w * 0.22, y: state.h * 0.2, w: 220, h: 130,
      fill: kind === "speed" ? "none" : "#ffffff",
      stroke: "#222222", strokeWidth: kind === "speed" ? 2 : 4
    };
    if (kind === "novel") { obj.x = 16; obj.y = state.h - 92; obj.w = state.w - 32; obj.h = 76; obj.fill = "#fff8e8"; }
    if (kind === "heart" || kind === "star" || kind === "diamond") { obj.w = 140; obj.h = 140; obj.fill = "#ff6b9a"; }
    if (kind === "arrow") { obj.w = 180; obj.h = 80; obj.fill = "#ffbf00"; }
    if (kind === "speed") { obj.x = 0; obj.y = 0; obj.w = state.w; obj.h = state.h; obj.stroke = "#111111"; }
    state.objects.push(obj); state.selected = obj.id; syncProps(); draw();
  }
  function addText() {
    const obj = {
      id: uid(), type: "text",
      x: state.w * 0.28, y: state.h * 0.32, w: 200, h: 80,
      text: "セリフを入力", fontFamily: googleFontCssFamily("Noto Sans JP"), fontSize: 28,
      fill: "#222222", outline: "#ffffff", outlineWidth: 4
    };
    state.objects.push(obj); state.selected = obj.id; syncProps(); draw();
  }
  function addTemplate(kind, group) {
    const obj = { id: uid(), type: "template", kind: kind, x: 0, y: 0, w: 96, h: 96, fill: "none", stroke: "none", strokeWidth: 0 };
    if (group === "bg") { obj.w = state.w; obj.h = state.h; state.objects.unshift(obj); }
    else { obj.x = state.w / 2 - 48; obj.y = state.h / 2 - 70; state.objects.push(obj); }
    state.selected = obj.id; syncProps(); draw();
  }
  function syncProps() {
    const o = selected();
    const box = document.getElementById("props-box");
    const empty = document.getElementById("props-empty");
    const tf = document.getElementById("text-fields");
    const sf = document.getElementById("shape-fields");
    if (!o) { box.hidden = true; empty.hidden = false; return; }
    empty.hidden = true; box.hidden = false;
    state.applying = true;
    tf.hidden = o.type !== "text";
    sf.hidden = o.type === "template";
    if (o.type === "text") {
      document.getElementById("p-text").value = o.text;
      document.getElementById("p-font").value = o.fontFamily;
      document.getElementById("p-font-size").value = o.fontSize;
      document.getElementById("p-fill").value = o.fill;
      document.getElementById("p-fill-hex").value = o.fill;
      document.getElementById("p-outline").value = o.outline;
      document.getElementById("p-outline-hex").value = o.outline;
      document.getElementById("p-outline-w").value = o.outlineWidth;
    } else if (o.type === "shape") {
      const noFill = o.fill === "none";
      const noStroke = o.stroke === "none";
      document.getElementById("p-nofill").checked = noFill;
      document.getElementById("p-nostroke").checked = noStroke;
      document.getElementById("p-sfill").value = noFill ? "#ffffff" : o.fill;
      document.getElementById("p-sfill-hex").value = noFill ? "none" : o.fill;
      document.getElementById("p-sstroke").value = noStroke ? "#222222" : o.stroke;
      document.getElementById("p-sstroke-hex").value = noStroke ? "none" : o.stroke;
      document.getElementById("p-sw").value = o.strokeWidth;
    }
    state.applying = false;
  }
  function applyProps() {
    if (state.applying) return;
    const o = selected();
    if (!o) return;
    if (o.type === "text") {
      o.text = document.getElementById("p-text").value;
      o.fontFamily = document.getElementById("p-font").value;
      o.fontSize = Number(document.getElementById("p-font-size").value) || 28;
      whenGoogleFontReady(o.fontFamily, draw);
      o.fill = document.getElementById("p-fill").value;
      o.outline = document.getElementById("p-outline").value;
      o.outlineWidth = Number(document.getElementById("p-outline-w").value) || 0;
      document.getElementById("p-fill-hex").value = o.fill;
      document.getElementById("p-outline-hex").value = o.outline;
    } else if (o.type === "shape") {
      o.fill = document.getElementById("p-nofill").checked ? "none" : document.getElementById("p-sfill").value;
      o.stroke = document.getElementById("p-nostroke").checked ? "none" : document.getElementById("p-sstroke").value;
      o.strokeWidth = Number(document.getElementById("p-sw").value) || 0;
      document.getElementById("p-sfill-hex").value = o.fill;
      document.getElementById("p-sstroke-hex").value = o.stroke;
    }
    draw();
  }
  function thumbButton(label, drawThumb, onClick) {
    const b = document.createElement("button");
    b.className = "tile"; b.type = "button";
    const c = document.createElement("canvas"); c.width = 192; c.height = 96;
    try { drawThumb(c.getContext("2d")); } catch (err) { console.warn(label, err); }
    const cap = document.createElement("span"); cap.textContent = label;
    b.append(c, cap);
    b.addEventListener("click", onClick);
    return b;
  }
  function fillLibrary() {
    const shapeGrid = document.getElementById("shape-grid");
    const bgGrid = document.getElementById("bg-grid");
    const charGrid = document.getElementById("char-grid");
    SHAPES.forEach(function (s) {
      shapeGrid.append(thumbButton(s.name, function (c) {
        c.clearRect(0, 0, 192, 96);
        drawShapeThumb(c, s.kind);
      }, function () { addShape(s.kind); }));
    });
    TEMPLATES.forEach(function (t) {
      const grid = t.group === "bg" ? bgGrid : charGrid;
      grid.append(thumbButton(t.name, function (c) {
        c.clearRect(0, 0, 192, 96);
        drawTemplate(c, t.kind, 0, 0, 192, 96);
      }, function () { addTemplate(t.kind, t.group); }));
    });
  }

  const fontSel = document.getElementById("p-font");
  fillGoogleFontSelect(fontSel);
  _googleFontsLoaded["Noto Sans JP"] = true;
  fillLibrary();
  document.getElementById("btn-add-text").addEventListener("click", addText);
  ["p-text", "p-font", "p-font-size", "p-fill", "p-outline", "p-outline-w", "p-sfill", "p-sstroke", "p-sw", "p-nofill", "p-nostroke"].forEach(function (id) {
    const el = document.getElementById(id);
    el.addEventListener("input", applyProps);
    el.addEventListener("change", applyProps);
  });
  document.getElementById("p-fill-hex").addEventListener("change", function (e) {
    const o = selected(); if (!o || o.type !== "text") return;
    o.fill = e.target.value; document.getElementById("p-fill").value = e.target.value; draw();
  });
  document.getElementById("p-outline-hex").addEventListener("change", function (e) {
    const o = selected(); if (!o || o.type !== "text") return;
    o.outline = e.target.value; document.getElementById("p-outline").value = e.target.value; draw();
  });
  document.getElementById("p-sfill-hex").addEventListener("change", function (e) {
    const o = selected(); if (!o || o.type !== "shape") return;
    if (e.target.value === "none") { o.fill = "none"; document.getElementById("p-nofill").checked = true; }
    else { o.fill = e.target.value; document.getElementById("p-sfill").value = e.target.value; document.getElementById("p-nofill").checked = false; }
    draw();
  });
  document.getElementById("p-sstroke-hex").addEventListener("change", function (e) {
    const o = selected(); if (!o || o.type !== "shape") return;
    if (e.target.value === "none") { o.stroke = "none"; document.getElementById("p-nostroke").checked = true; }
    else { o.stroke = e.target.value; document.getElementById("p-sstroke").value = e.target.value; document.getElementById("p-nostroke").checked = false; }
    draw();
  });
  document.getElementById("btn-del").addEventListener("click", function () {
    if (!state.selected) return;
    state.objects = state.objects.filter(function (o) { return o.id !== state.selected; });
    state.selected = null; syncProps(); draw();
  });
  document.getElementById("btn-dup").addEventListener("click", function () {
    const o = selected(); if (!o) return;
    const n = Object.assign({}, o, { id: uid(), x: o.x + 16, y: o.y + 16 });
    state.objects.push(n); state.selected = n.id; syncProps(); draw();
  });
  document.getElementById("btn-front").addEventListener("click", function () {
    const o = selected(); if (!o) return;
    state.objects = state.objects.filter(function (x) { return x.id !== o.id; }).concat(o); draw();
  });
  document.getElementById("btn-back").addEventListener("click", function () {
    const o = selected(); if (!o) return;
    state.objects = [o].concat(state.objects.filter(function (x) { return x.id !== o.id; })); draw();
  });
  document.getElementById("canvas-size").addEventListener("change", function (e) {
    const parts = e.target.value.split("x");
    state.w = Number(parts[0]); state.h = Number(parts[1]); centerView(); draw();
  });
  document.getElementById("btn-reset-view").addEventListener("click", function () { centerView(); draw(); });
  document.getElementById("btn-zoom-in").addEventListener("click", function () {
    const r = stageWrap.getBoundingClientRect();
    setZoomAt(state.zoom * 1.2, r.width / 2, r.height / 2);
  });
  document.getElementById("btn-zoom-out").addEventListener("click", function () {
    const r = stageWrap.getBoundingClientRect();
    setZoomAt(state.zoom / 1.2, r.width / 2, r.height / 2);
  });
  document.getElementById("btn-png").addEventListener("click", function () {
    const out = document.createElement("canvas");
    out.width = state.w; out.height = state.h;
    const octx = out.getContext("2d");
    state.objects.forEach(function (o) { drawObject(octx, o); });
    out.toBlob(function (blob) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "serif.png";
      a.click();
      URL.revokeObjectURL(a.href);
    });
  });

  window.addEventListener("wheel", function (e) { applyWheel(e); }, { passive: false, capture: true });
  stageWrap.addEventListener("wheel", function (e) { applyWheel(e); }, { passive: false });
  view.addEventListener("wheel", function (e) { applyWheel(e); }, { passive: false });

  view.addEventListener("pointerdown", function (e) {
    view.setPointerCapture(e.pointerId);
    if (e.button === 1 || state.space) {
      state.drag = { mode: "pan", x: e.clientX, y: e.clientY, panX: state.panX, panY: state.panY };
      return;
    }
    const p = toWorld(e);
    const sel = selected();
    if (sel) {
      const h = hitHandle(sel, p);
      if (h) { state.drag = { mode: "resize", key: h.k, start: p, box: { x: sel.x, y: sel.y, w: sel.w, h: sel.h } }; return; }
    }
    const hit = hitObject(p);
    state.selected = hit ? hit.id : null;
    syncProps();
    if (hit) state.drag = { mode: "move", start: p, ox: hit.x, oy: hit.y };
    draw();
  });
  view.addEventListener("pointermove", function (e) {
    if (!state.drag) return;
    if (state.drag.mode === "pan") {
      state.panX = state.drag.panX + (e.clientX - state.drag.x);
      state.panY = state.drag.panY + (e.clientY - state.drag.y);
      draw();
      return;
    }
    const p = toWorld(e);
    const o = selected();
    if (!o) return;
    if (state.drag.mode === "move") {
      o.x = state.drag.ox + (p.x - state.drag.start.x);
      o.y = state.drag.oy + (p.y - state.drag.start.y);
    } else {
      const b = state.drag.box, k = state.drag.key;
      let x = b.x, y = b.y, w = b.w, h = b.h;
      if (k.indexOf("e") >= 0) w = Math.max(24, b.w + (p.x - state.drag.start.x));
      if (k.indexOf("s") >= 0) h = Math.max(24, b.h + (p.y - state.drag.start.y));
      if (k.indexOf("w") >= 0) { const dx = p.x - state.drag.start.x; x = b.x + dx; w = Math.max(24, b.w - dx); }
      if (k.indexOf("n") >= 0) { const dy = p.y - state.drag.start.y; y = b.y + dy; h = Math.max(24, b.h - dy); }
      o.x = x; o.y = y; o.w = w; o.h = h;
    }
    draw();
  });
  view.addEventListener("pointerup", function () { state.drag = null; });

  window.addEventListener("keydown", function (e) {
    const tag = document.activeElement && document.activeElement.tagName;
    const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    if (e.code === "Space" && !typing) { state.space = true; e.preventDefault(); }
    if (typing) return;
    if (e.key === "Delete" || e.key === "Backspace") document.getElementById("btn-del").click();
    if (e.key === "+" || e.key === "=") document.getElementById("btn-zoom-in").click();
    if (e.key === "-" || e.key === "_") document.getElementById("btn-zoom-out").click();
  });
  window.addEventListener("keyup", function (e) { if (e.code === "Space") state.space = false; });
  window.addEventListener("resize", resizeView);

  centerView();
  addShape("bubble-roundrect");
  addText();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  resizeView();
})();
