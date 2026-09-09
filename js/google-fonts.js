/* Google Fonts (OFL / Apache 2.0). Japanese families + a few Latin display faces. */
var GOOGLE_FONT_GROUPS = [["sans","ゴシック"],["round","丸ゴシック"],["serif","明朝"],["hand","手書き"],["display","見出し"],["mono","等幅"],["latin","欧文"]];
var GOOGLE_FONTS = [{"family":"Noto Sans JP","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700,800,900]},{"family":"Noto Serif JP","category":"serif","group":"serif","weights":[200,300,400,500,600,700,800,900]},{"family":"M PLUS Rounded 1c","category":"sans-serif","group":"round","weights":[100,300,400,500,700,800,900]},{"family":"M PLUS 1p","category":"sans-serif","group":"sans","weights":[100,300,400,500,700,800,900]},{"family":"Zen Kaku Gothic New","category":"sans-serif","group":"sans","weights":[300,400,500,700,900]},{"family":"Zen Maru Gothic","category":"sans-serif","group":"round","weights":[300,400,500,700,900]},{"family":"LINE Seed JP","category":"sans-serif","group":"sans","weights":[100,400,700,800]},{"family":"Shippori Mincho","category":"serif","group":"serif","weights":[400,500,600,700,800]},{"family":"BIZ UDPGothic","category":"sans-serif","group":"sans","weights":[400,700]},{"family":"Sawarabi Mincho","category":"serif","group":"serif","weights":[400]},{"family":"Sawarabi Gothic","category":"sans-serif","group":"sans","weights":[400]},{"family":"Kosugi Maru","category":"sans-serif","group":"round","weights":[400]},{"family":"Zen Old Mincho","category":"serif","group":"serif","weights":[400,500,600,700,900]},{"family":"Dela Gothic One","category":"display","group":"display","weights":[400]},{"family":"M PLUS 1","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700,800,900]},{"family":"M PLUS U","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700,800,900]},{"family":"Zen Kaku Gothic Antique","category":"sans-serif","group":"sans","weights":[300,400,500,700,900]},{"family":"Shippori Mincho B1","category":"serif","group":"serif","weights":[400,500,600,700,800]},{"family":"Kaisei Decol","category":"serif","group":"serif","weights":[400,500,700]},{"family":"Hachi Maru Pop","category":"handwriting","group":"hand","weights":[400]},{"family":"Potta One","category":"display","group":"display","weights":[400]},{"family":"IBM Plex Sans JP","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700]},{"family":"Yuji Mai","category":"serif","group":"serif","weights":[400]},{"family":"M PLUS 2","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700,800,900]},{"family":"Hina Mincho","category":"serif","group":"serif","weights":[400]},{"family":"Kiwi Maru","category":"serif","group":"round","weights":[300,400,500]},{"family":"BIZ UDGothic","category":"sans-serif","group":"sans","weights":[400,700]},{"family":"Murecho","category":"sans-serif","group":"sans","weights":[100,200,300,400,500,600,700,800,900]},{"family":"Kosugi","category":"sans-serif","group":"sans","weights":[400]},{"family":"BIZ UDPMincho","category":"serif","group":"serif","weights":[400,700]},{"family":"DotGothic16","category":"sans-serif","group":"sans","weights":[400]},{"family":"Monomaniac One","category":"sans-serif","group":"sans","weights":[400]},{"family":"Mochiy Pop One","category":"sans-serif","group":"round","weights":[400]},{"family":"Klee One","category":"handwriting","group":"hand","weights":[400,600]},{"family":"Rampart One","category":"display","group":"display","weights":[400]},{"family":"Yusei Magic","category":"sans-serif","group":"sans","weights":[400]},{"family":"Yuji Syuku","category":"serif","group":"serif","weights":[400]},{"family":"RocknRoll One","category":"sans-serif","group":"sans","weights":[400]},{"family":"Zen Kurenaido","category":"sans-serif","group":"sans","weights":[400]},{"family":"Zen Antique","category":"serif","group":"serif","weights":[400]},{"family":"Kaisei Opti","category":"serif","group":"serif","weights":[400,500,700]},{"family":"Cherry Bomb One","category":"display","group":"display","weights":[400]},{"family":"Zen Antique Soft","category":"serif","group":"serif","weights":[400]},{"family":"Train One","category":"display","group":"display","weights":[400]},{"family":"Shippori Antique","category":"sans-serif","group":"sans","weights":[400]},{"family":"Darumadrop One","category":"display","group":"round","weights":[400]},{"family":"Aoboshi One","category":"serif","group":"serif","weights":[400]},{"family":"Kaisei Tokumin","category":"serif","group":"serif","weights":[400,500,700,800]},{"family":"Reggae One","category":"display","group":"display","weights":[400]},{"family":"Mochiy Pop P One","category":"sans-serif","group":"round","weights":[400]},{"family":"BIZ UDMincho","category":"serif","group":"serif","weights":[400,700]},{"family":"M PLUS 1 Code","category":"monospace","group":"mono","weights":[100,200,300,400,500,600,700]},{"family":"Yomogi","category":"handwriting","group":"hand","weights":[400]},{"family":"Stick","category":"sans-serif","group":"sans","weights":[400]},{"family":"Kapakana","category":"handwriting","group":"hand","weights":[300,400]},{"family":"Kaisei HarunoUmi","category":"serif","group":"serif","weights":[400,500,700]},{"family":"Shippori Antique B1","category":"sans-serif","group":"sans","weights":[400]},{"family":"Yuji Boku","category":"serif","group":"serif","weights":[400]},{"family":"New Tegomin","category":"serif","group":"serif","weights":[400]},{"family":"WDXL Lubrifont JP N","category":"sans-serif","group":"sans","weights":[400]},{"family":"Shizuru","category":"display","group":"display","weights":[400]},{"family":"Tsukimi Rounded","category":"sans-serif","group":"round","weights":[300,400,500,600,700]},{"family":"Slackside One","category":"handwriting","group":"hand","weights":[400]},{"family":"Rock 3D","category":"display","group":"display","weights":[400]},{"family":"Palette Mosaic","category":"display","group":"display","weights":[400]},{"family":"Chokokutai","category":"display","group":"display","weights":[400]},{"family":"Yuji Hentaigana Akari","category":"handwriting","group":"hand","weights":[400]},{"family":"Yuji Hentaigana Akebono","category":"handwriting","group":"hand","weights":[400]},{"family":"Bangers","category":"display","group":"latin","weights":[400]},{"family":"Fredoka","category":"sans-serif","group":"latin","weights":[400,500,600,700]},{"family":"Pacifico","category":"handwriting","group":"latin","weights":[400]},{"family":"Press Start 2P","category":"display","group":"latin","weights":[400]},{"family":"Nunito","category":"sans-serif","group":"latin","weights":[400,700]}];
function googleFontName(value) {
  if (!value) return "Noto Sans JP";
  return String(value).split(",")[0].replace(/['"]/g, "").trim();
}
function googleFontFallback(group) {
  return ({ sans: "sans-serif", round: "sans-serif", serif: "serif", hand: "cursive", display: "sans-serif", mono: "monospace", latin: "cursive" })[group] || "sans-serif";
}
function findGoogleFont(value) {
  const name = googleFontName(value);
  return GOOGLE_FONTS.find(function (f) { return f.family === name; }) || null;
}
function googleFontCssFamily(fontOrValue) {
  const font = typeof fontOrValue === "string" ? findGoogleFont(fontOrValue) : fontOrValue;
  if (!font) return "Noto Sans JP, sans-serif";
  return font.family + ", " + googleFontFallback(font.group);
}
function googleFontQuery(fontOrValue) {
  const font = typeof fontOrValue === "string" ? findGoogleFont(fontOrValue) : fontOrValue;
  if (!font) return "Noto+Sans+JP:wght@400;700";
  const ws = font.weights && font.weights.length ? font.weights.slice() : [400];
  const pick = [];
  if (ws.indexOf(400) >= 0) pick.push(400); else pick.push(ws[0]);
  if (ws.indexOf(700) >= 0 && pick.indexOf(700) < 0) pick.push(700);
  else if (ws.indexOf(500) >= 0 && pick.indexOf(500) < 0) pick.push(500);
  return font.family.replace(/ /g, "+") + ":wght@" + pick.join(";");
}
var _googleFontsLoaded = Object.create(null);
function loadGoogleFont(value) {
  const font = findGoogleFont(value) || findGoogleFont("Noto Sans JP");
  if (!font || _googleFontsLoaded[font.family]) return font;
  _googleFontsLoaded[font.family] = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=" + googleFontQuery(font) + "&display=swap";
  document.head.appendChild(link);
  return font;
}
function whenGoogleFontReady(value, cb) {
  const font = loadGoogleFont(value);
  const fam = font ? font.family : "Noto Sans JP";
  if (!document.fonts || !document.fonts.load) { if (cb) cb(); return; }
  document.fonts.load('28px "' + fam + '"').then(function () { if (cb) cb(); }).catch(function () { if (cb) cb(); });
}
function fillGoogleFontSelect(sel) {
  if (!sel) return;
  sel.innerHTML = "";
  GOOGLE_FONT_GROUPS.forEach(function (pair) {
    const group = pair[0], label = pair[1];
    const fonts = GOOGLE_FONTS.filter(function (f) { return f.group === group; });
    if (!fonts.length) return;
    const og = document.createElement("optgroup");
    og.label = label;
    fonts.forEach(function (f) {
      const opt = document.createElement("option");
      opt.value = googleFontCssFamily(f);
      opt.textContent = f.family;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
}
