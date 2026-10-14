/* 〈物語〉 GUIDE — Best Girl* rankings: tier list, top 5, bracket, post images, screenshot mode.
   Everyone is unlocked here on purpose: the spoiler shield doesn't apply to rankings. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lightBg = (hex) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150; };
  const C = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
  const IDS = CHARACTERS.map((c) => c.id);
  const short = (id) => C[id].short || C[id].name.split(" ")[0];
  const photo = (id) => window.MAL?.data?.characters?.[id]?.img || "";
  const tf = (id) => (lightBg(C[id].color) ? "#0b0b0b" : "#f4f1ea");
  const flash = (frames) => window.GUIDE?.flash?.(frames);
  const SITE = (location.host + location.pathname).replace(/index\.html$/, "").replace(/\/$/, "") || "monogatari guide";

  /* ---------- state (its own storage key; saved whole, so no setting can drop another) ---------- */
  const RKEY = "mono-rank-v1";
  const blank = () => ({ tab: "tier", tiers: Object.fromEntries(TIERS.map((t) => [t.id, []])), top: [], br: { size: 16, entrants: [], picks: [] } });
  const rs = blank();
  (function load() {
    let v = null;
    try { v = JSON.parse(localStorage.getItem(RKEY) || "null"); } catch {}
    if (!v || typeof v !== "object") return;
    const seen = new Set();
    const clean = (arr, max = 99) => (Array.isArray(arr) ? arr : []).filter((id) => C[id] && !seen.has(id) && seen.add(id)).slice(0, max);
    if (["tier", "top", "bracket"].includes(v.tab)) rs.tab = v.tab;
    TIERS.forEach((t) => (rs.tiers[t.id] = clean(v.tiers?.[t.id])));
    seen.clear(); rs.top = clean(v.top, 5);
    const b = v.br || {};
    rs.br.size = b.size === 8 ? 8 : 16;
    seen.clear(); const ent = clean(b.entrants);
    if (ent.length === rs.br.size) {
      rs.br.entrants = ent;
      // keep only picks that are valid winners of their match
      const picks = Array.isArray(b.picks) ? b.picks : [];
      let list = ent.slice(), pi = 0; const ok = [];
      outer: while (list.length > 1) {
        const next = [];
        for (let i = 0; i < list.length; i += 2) {
          const w = picks[pi++];
          if (w !== list[i] && w !== list[i + 1]) break outer;
          ok.push(w); next.push(w);
        }
        list = next;
      }
      rs.br.picks = ok;
    }
  })();
  const save = () => { try { localStorage.setItem(RKEY, JSON.stringify(rs)); } catch {} };

  let sel = null;          // selected chip in the tier list (tap-to-place)
  let brPicking = null;    // entrants being chosen in "pick your own" bracket setup

  /* ---------- small renderers ---------- */
  const imgTag = (id) => (photo(id) ? `<img src="${esc(photo(id))}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : "");
  const chip = (id, cls = "") => `<button class="rchip ${cls} ${sel === id ? "sel" : ""}" data-id="${id}" draggable="true" style="--c:${C[id].color};--tf:${tf(id)}" aria-label="${esc(C[id].name)}">
      <span class="rt">${C[id].k}</span>${imgTag(id)}<span class="rn">${esc(short(id))}</span></button>`;
  const bigCard = (id, extra = "") => `<span class="rbig" style="--c:${C[id].color};--tf:${tf(id)}"><span class="rt">${C[id].k}</span>${imgTag(id)}${extra}</span>`;

  function toast(id) {
    const r = RANK_REACTIONS[id]; if (!r) return;
    const t = $("#rankToast");
    t.innerHTML = `<span class="stamp">${r.stamp}</span><div><b>${r.title}</b><p>${esc(r.line)}</p></div>`;
    t.hidden = false; t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 4500);
    flash([{ t: r.stamp, bg: "#0b0b0b", fg: "#e60012", s: r.title, ms: 650 }]);
  }

  /* ---------- tier list ---------- */
  const placed = () => new Set(TIERS.flatMap((t) => rs.tiers[t.id]));
  function renderTier() {
    const inTier = placed();
    const pool = IDS.filter((id) => !inTier.has(id));
    return `<div class="tier-board">${TIERS.map((t) => `
        <div class="trow">
          <button class="tlab" data-tier="${t.id}" style="--tc:${t.color};--tt:${lightBg(t.color) ? "#0b0b0b" : "#f4f1ea"}" aria-label="Place in ${esc(t.label)}"><b>${t.kanji}</b><small>${esc(t.label)}</small></button>
          <div class="tdrop" data-tier="${t.id}">${rs.tiers[t.id].map((id) => chip(id)).join("") || `<span class="tempty">${sel ? "Tap here to place " + esc(short(sel)) : "Empty"}</span>`}</div>
        </div>`).join("")}
      </div>
      <p class="tfoot">*Gender is not a factor.</p>
      <div class="pool">
        <div class="pool-head"><b>Unranked</b><span>Anyone left here won't appear in your post. Rank as many or as few as you like.</span></div>
        <div class="tdrop" data-tier="pool">${pool.map((id) => chip(id)).join("") || `<span class="tempty">Everyone's ranked. Bold.</span>`}</div>
      </div>`;
  }
  function moveTo(id, tier, beforeId) {
    TIERS.forEach((t) => (rs.tiers[t.id] = rs.tiers[t.id].filter((x) => x !== id)));
    if (tier !== "pool") {
      const arr = rs.tiers[tier];
      const i = beforeId ? arr.indexOf(beforeId) : -1;
      i >= 0 ? arr.splice(i, 0, id) : arr.push(id);
      if (tier === "god") toast(id);
    }
    sel = null; save(); render();
  }

  /* ---------- best girl top 5 ---------- */
  function renderTop() {
    const slots = [0, 1, 2, 3, 4].map((i) => {
      const id = rs.top[i];
      return `<div class="tslot ${i === 0 ? "first" : ""} ${id ? "full" : ""}">
        <span class="tnum">${String(i + 1).padStart(2, "0")}</span>
        ${id ? `<button class="tslot-card" data-remove="${id}" aria-label="Remove ${esc(C[id].name)}">${bigCard(id)}<span class="tname">${esc(short(id))}</span></button>
               ${i ? `<button class="tup" data-up="${i}" aria-label="Move up">▲</button>` : ""}` : `<span class="tslot-empty">${i === 0 ? "Your Best Girl*" : "Tap a name below"}</span>`}
      </div>`;
    }).join("");
    return `<div class="top5">${slots}</div>
      <p class="tfoot">Tap a character to add them in order. Tap a filled slot to remove it, ▲ to move it up. *Gender is not a factor.</p>
      <div class="pick-grid">${IDS.map((id) => { const n = rs.top.indexOf(id); return chip(id, n >= 0 ? "in" : "").replace('<span class="rn">', n >= 0 ? `<span class="rbadge">${n + 1}</span><span class="rn">` : '<span class="rn">'); }).join("")}</div>`;
  }

  /* ---------- bracket ---------- */
  const ROUND_NAME = { 16: "Round of 16", 8: "Quarterfinals", 4: "Semifinals", 2: "Final" };
  const ROUND_SHORT = { 16: "R16", 8: "QF", 4: "SF", 2: "Final" };
  function rounds() {
    const { entrants, picks } = rs.br;
    const out = []; let list = entrants.slice(), pi = 0;
    while (list.length > 1) {
      const ms = [];
      for (let i = 0; i < list.length; i += 2) ms.push({ a: list[i], b: list[i + 1], w: picks[pi++] || null, size: list.length });
      out.push(ms);
      if (ms.some((m) => !m.w)) break;
      list = ms.map((m) => m.w);
    }
    return out;
  }
  const champion = () => { const r = rounds(); const last = r[r.length - 1]; return r.length && last.length === 1 && last[0].w ? last[0].w : null; };
  function renderBracket() {
    const b = rs.br;
    if (brPicking) {
      return `<div class="br-setup"><h3>Pick your ${b.size}</h3><p class="tfoot">${brPicking.length} of ${b.size} chosen. Tap to add or remove; they're seeded in the order you pick.</p>
        <div class="pick-grid">${IDS.map((id) => chip(id, brPicking.includes(id) ? "in" : "")).join("")}</div>
        <div class="rank-actions"><button class="btn" data-br="startpicked" ${brPicking.length === b.size ? "" : "disabled"}>Start bracket</button><button class="btn ghost" data-br="cancelpick">Back</button></div></div>`;
    }
    if (!b.entrants.length) {
      return `<div class="br-setup">
        <h3>Monogatari Madness</h3>
        <p class="tfoot">Two characters at a time. Tap who wins until one is left standing.</p>
        <div class="seg" role="group" aria-label="Bracket size">${[8, 16].map((n) => `<button data-br="size" data-n="${n}" aria-pressed="${b.size === n}">${n} characters</button>`).join("")}</div>
        <div class="br-modes">
          <button class="br-mode" data-br="classic"><b>Classic matchups</b><span>Hitagi vs Kaiki in round one, and other grudges.</span></button>
          <button class="br-mode" data-br="random"><b>Random draw</b><span>${b.size} names pulled from the whole roster.</span></button>
          <button class="br-mode" data-br="pick"><b>Pick your own</b><span>Choose all ${b.size} yourself.</span></button>
        </div></div>`;
    }
    const champ = champion();
    const R = rounds();
    if (!champ) {
      const ms = R[R.length - 1];
      const m = ms.find((x) => !x.w);
      const done = b.picks.length, total = b.size - 1;
      return `<div class="br-match">
        <div class="br-meta"><b>${ROUND_NAME[m.size]}</b><span>Match ${done + 1} of ${total}</span></div>
        <div class="br-vs">
          <button class="br-pick" data-pick="${m.a}">${bigCard(m.a)}<span class="tname">${esc(short(m.a))}</span></button>
          <span class="vs">VS</span>
          <button class="br-pick" data-pick="${m.b}">${bigCard(m.b)}<span class="tname">${esc(short(m.b))}</span></button>
        </div>
        <div class="rank-actions"><button class="btn ghost" data-br="undo" ${done ? "" : "disabled"}>Undo</button><button class="btn ghost" data-br="restart">New bracket</button></div>
      </div>`;
    }
    const final = R[R.length - 1][0];
    const runner = final.a === champ ? final.b : final.a;
    return `<div class="br-done">
        <div class="br-champ">${bigCard(champ)}<div><span class="lbl">優勝 · CHAMPION</span><h3>${esc(C[champ].name)}</h3><p>Beat ${esc(short(runner))} in the final.</p></div></div>
        <div class="br-tree">${R.map((ms) => `<div class="br-col"><b>${ROUND_NAME[ms[0].size]}</b>${ms.map((m) => `<div class="br-m"><span class="${m.w === m.a ? "w" : ""}">${esc(short(m.a))}</span><span class="${m.w === m.b ? "w" : ""}">${esc(short(m.b))}</span></div>`).join("")}</div>`).join("")}</div>
        <div class="rank-actions"><button class="btn ghost" data-br="undo">Undo last pick</button><button class="btn ghost" data-br="restart">New bracket</button></div>
      </div>`;
  }
  function brAction(a, el) {
    const b = rs.br;
    if (a === "size") { b.size = +el.dataset.n; }
    else if (a === "classic") { b.entrants = (b.size === 16 ? BRACKET_CLASSIC : BRACKET_CLASSIC8).slice(); b.picks = []; }
    else if (a === "random") { const pool = IDS.slice(); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; } b.entrants = pool.slice(0, b.size); b.picks = []; }
    else if (a === "pick") { brPicking = []; }
    else if (a === "cancelpick") { brPicking = null; }
    else if (a === "startpicked") { if (brPicking.length !== b.size) return; b.entrants = brPicking.slice(); b.picks = []; brPicking = null; }
    else if (a === "undo") { b.picks.pop(); }
    else if (a === "restart") { b.entrants = []; b.picks = []; }
    save(); render();
  }

  /* ---------- main render ---------- */
  const TABS = [["tier", "階級", "Tier List"], ["top", "一番", "Best Girl Top 5"], ["bracket", "勝負", "Bracket"]];
  function hasContent(mode = rs.tab) {
    if (mode === "tier") return placed().size > 0;
    if (mode === "top") return rs.top.length > 0;
    return !!champion();
  }
  function render() {
    $("#rankTabs").innerHTML = TABS.map(([k, jp, en]) => `<button data-tab="${k}" aria-pressed="${rs.tab === k}"><span>${jp}</span>${en}</button>`).join("");
    const body = rs.tab === "tier" ? renderTier() : rs.tab === "top" ? renderTop() : renderBracket();
    const ready = hasContent();
    const why = rs.tab === "tier" ? "Rank at least one character first." : rs.tab === "top" ? "Pick at least your #1 first." : "Finish the bracket to post your champion.";
    $("#rankBody").innerHTML = body;
    $("#rankShare").innerHTML = `
      <div class="share-how">
        <b>Post it</b>
        <span><strong>Screenshot mode</strong> opens a full-screen card sized for TikTok. Take a screenshot and it keeps the character photos.</span>
        <span><strong>Save image</strong> makes a file to post. It uses MyAnimeList photos when allowed, and name tiles when not.</span>
      </div>
      <div class="rank-actions">
        <button class="btn shot-btn" data-act="shot" ${ready ? "" : "disabled"}>📸 Screenshot mode</button>
        <button class="btn ghost" data-act="image" ${ready ? "" : "disabled"}>⬇ Save image</button>
        <button class="btn ghost" data-act="reset">Reset ${rs.tab === "tier" ? "tier list" : rs.tab === "top" ? "top 5" : "bracket"}</button>
      </div>
      ${ready ? "" : `<p class="tfoot">${why}</p>`}
      ${sel ? `<div class="sel-hint">Placing <b>${esc(short(sel))}</b>: tap a tier, or tap them again to cancel.</div>` : ""}`;
  }

  /* ---------- events ---------- */
  $("#rankTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-tab]"); if (!b) return; rs.tab = b.dataset.tab; sel = null; brPicking = null; save(); render(); });
  $("#rankBody").addEventListener("click", (e) => {
    const t = e.target;
    if (rs.tab === "tier") {
      const c = t.closest(".rchip");
      if (c) { const id = c.dataset.id; sel = sel === id ? null : id; render(); return; }
      const target = t.closest("[data-tier]");
      if (target && sel) moveTo(sel, target.dataset.tier);
      return;
    }
    if (rs.tab === "top") {
      const up = t.closest("[data-up]");
      if (up) { const i = +up.dataset.up; [rs.top[i - 1], rs.top[i]] = [rs.top[i], rs.top[i - 1]]; if (i === 1) toast(rs.top[0]); save(); render(); return; }
      const rm = t.closest("[data-remove]");
      if (rm) { rs.top = rs.top.filter((x) => x !== rm.dataset.remove); save(); render(); return; }
      const c = t.closest(".rchip");
      if (c) {
        const id = c.dataset.id;
        if (rs.top.includes(id)) rs.top = rs.top.filter((x) => x !== id);
        else if (rs.top.length < 5) { rs.top.push(id); if (rs.top.length === 1) toast(id); }
        save(); render();
      }
      return;
    }
    const pk = t.closest("[data-pick]");
    if (pk) { rs.br.picks.push(pk.dataset.pick); save(); render(); const ch = champion(); if (ch) toast(ch); return; }
    const ba = t.closest("[data-br]");
    if (ba && !ba.disabled) { brAction(ba.dataset.br, ba); return; }
    const c = t.closest(".rchip");
    if (c && brPicking) {
      const id = c.dataset.id;
      if (brPicking.includes(id)) brPicking = brPicking.filter((x) => x !== id);
      else if (brPicking.length < rs.br.size) brPicking.push(id);
      render();
    }
  });
  // desktop drag and drop for the tier list
  $("#rankBody").addEventListener("dragstart", (e) => { const c = e.target.closest(".rchip"); if (!c || rs.tab !== "tier") return e.preventDefault(); e.dataTransfer.setData("text/plain", c.dataset.id); e.dataTransfer.effectAllowed = "move"; });
  $("#rankBody").addEventListener("dragover", (e) => { if (rs.tab === "tier" && e.target.closest("[data-tier]")) { e.preventDefault(); e.target.closest("[data-tier]").classList.add("over"); } });
  $("#rankBody").addEventListener("dragleave", (e) => { e.target.closest?.("[data-tier]")?.classList.remove("over"); });
  $("#rankBody").addEventListener("drop", (e) => {
    const zone = e.target.closest("[data-tier]"); if (!zone || rs.tab !== "tier") return;
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain"); if (!C[id]) return;
    const before = e.target.closest(".rchip")?.dataset.id;
    moveTo(id, zone.dataset.tier, before !== id ? before : null);
  });
  $("#rankShare").addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
    const a = b.dataset.act;
    if (a === "shot") openShot();
    else if (a === "image") makeImage();
    else if (a === "reset") {
      if (rs.tab === "tier") TIERS.forEach((t) => (rs.tiers[t.id] = []));
      else if (rs.tab === "top") rs.top = [];
      else { rs.br.entrants = []; rs.br.picks = []; brPicking = null; }
      sel = null; save(); render();
    }
  });

  /* =========================================================
     POST LAYOUT — one 1080×1920 layout, drawn two ways:
     canvas (Save image) and DOM (Screenshot mode).
     ========================================================= */
  const W = 1080, H = 1920;
  const RED = "#e60012", INK = "#0b0b0b", PAPER = "#f4f1ea", GREY = "#8a8580";
  const MINCHO = '"Shippori Mincho B1", "Noto Serif CJK JP", "Hiragino Mincho ProN", serif';
  const GOTHIC = '"Zen Kaku Gothic New", "Noto Sans CJK JP", "Hiragino Sans", system-ui, sans-serif';
  const rect = (x, y, w, h, fill) => ({ t: "rect", x, y, w, h, fill });
  const text = (x, y, s, str, o = {}) => ({ t: "text", x, y, s, text: str, f: o.f || "mincho", wt: o.wt || 800, c: o.c || PAPER, a: o.a || "left", max: o.max || 0, ls: o.ls || 0 });
  const port = (x, y, w, h, id, o = {}) => ({ t: "port", x, y, w, h, id, rank: o.rank || "", name: o.name !== false });

  function frame(tag, footnote) {
    const b = [rect(0, 0, W, H, INK), text(1100, 1180, 900, "物", { c: "rgba(230,0,18,0.16)", a: "right" })];
    b.push(rect(60, 64, Math.min(960, 40 + tag.length * 30), 60, RED), text(80, 106, 32, tag, { f: "gothic", wt: 700, ls: 4 }));
    b.push(rect(60, 1790, 960, 4, RED));
    if (footnote) b.push(text(60, 1760, 24, "*Gender is not a factor.", { f: "gothic", wt: 400, c: GREY }));
    b.push(text(60, 1860, 30, "MAKE YOURS →", { f: "gothic", wt: 700, ls: 4 }));
    b.push(text(1020, 1860, 30, SITE, { f: "gothic", wt: 700, c: RED, a: "right", max: 640 }));
    return b;
  }

  function layoutTier() {
    const b = frame("〈物語〉 TIER LIST", true);
    const god = rs.tiers.god[0];
    b.push(text(60, 238, 92, god ? `Best Girl*: ${short(god)}.` : "My tier list.", { max: 960 }));
    const top = 300, avail = 1430, labW = 170, gap = 10;
    const areaX = 60 + labW + 14, areaW = 1020 - areaX;
    const tiers = TIERS.map((t) => ({ ...t, ids: rs.tiers[t.id] }));
    let s = 150, rowsOf;
    for (const cand of [200, 184, 170, 150, 132, 116, 102, 90, 80, 70, 62, 54]) {
      const per = Math.max(1, Math.floor((areaW + 8) / (cand + 8)));
      const h = Math.round(cand * 1.28);
      rowsOf = (n) => Math.max(1, Math.ceil(n / per));
      const total = tiers.reduce((t, x) => t + rowsOf(x.ids.length) * (h + 8) - 8, 0) + gap * (tiers.length - 1);
      s = cand; if (total <= avail) break;
    }
    const per = Math.max(1, Math.floor((areaW + 8) / (s + 8))), ph = Math.round(s * 1.28);
    let y = top;
    tiers.forEach((t) => {
      const rows = rowsOf(t.ids.length);
      const rh = rows * (ph + 8) - 8;
      b.push(rect(60, y, labW, rh, t.color));
      const fg = lightBg(t.color) ? INK : PAPER;
      b.push(text(60 + labW / 2, y + rh / 2 + 22, Math.min(84, rh * 0.6), t.kanji, { c: fg, a: "center" }));
      b.push(text(60 + labW / 2, y + rh / 2 + 22 + Math.min(40, rh * 0.28), Math.min(22, rh * 0.16), t.label.toUpperCase(), { f: "gothic", wt: 700, c: fg, a: "center", max: labW - 12 }));
      b.push(rect(areaX, y, areaW, rh, "#151515"));
      t.ids.forEach((id, i) => b.push(port(areaX + (i % per) * (s + 8), y + Math.floor(i / per) * (ph + 8), s, ph, id)));
      y += rh + gap;
    });
    return b;
  }

  function layoutTop() {
    const b = frame("〈物語〉 BEST GIRL*", true);
    const [one, ...rest] = rs.top;
    b.push(text(60, 210, 32, "MY BEST GIRL* IS", { f: "gothic", wt: 700, c: GREY, ls: 6 }));
    b.push(port(60, 240, 560, 700, one, { name: false, rank: "01" }));
    b.push(text(860, 600, 330, C[one].k, { c: RED, a: "center" }));
    b.push(text(860, 700, 28, C[one].odd.toUpperCase(), { f: "gothic", wt: 700, c: GREY, a: "center", max: 360, ls: 3 }));
    b.push(text(60, 1060, 110, short(one) + ".", { max: 960 }));
    if (rest.length) {
      b.push(text(60, 1150, 30, "THE REST OF MY TOP 5", { f: "gothic", wt: 700, c: GREY, ls: 6 }));
      rest.forEach((id, i) => b.push(port(60 + i * 245, 1180, 225, 290, id, { rank: String(i + 2).padStart(2, "0") })));
    }
    if (RANK_REACTIONS[one]) b.push(text(60, 1560, 34, RANK_REACTIONS[one].line, { f: "gothic", wt: 400, c: PAPER, max: 960 }));
    return b;
  }

  function layoutBracket() {
    const champ = champion();
    const R = rounds();
    const b = frame("〈物語〉 MONOGATARI MADNESS", false);
    b.push(text(60, 210, 32, `CHAMPION OF ${rs.br.size}`, { f: "gothic", wt: 700, c: GREY, ls: 6 }));
    b.push(port(60, 240, 560, 700, champ, { name: false }));
    b.push(text(860, 520, 210, "優", { c: RED, a: "center" }));
    b.push(text(860, 740, 210, "勝", { c: RED, a: "center" }));
    b.push(text(60, 1060, 110, short(champ) + ".", { max: 960 }));
    const beat = R.map((ms) => { const m = ms.find((x) => x.a === champ || x.b === champ); return { id: m.a === champ ? m.b : m.a, size: m.size }; });
    const final = beat[beat.length - 1];
    b.push(text(60, 1120, 36, `Beat ${short(final.id)} in the final.`, { f: "gothic", wt: 700, c: PAPER, max: 960 }));
    b.push(text(60, 1200, 30, "ROAD TO THE CROWN", { f: "gothic", wt: 700, c: GREY, ls: 6 }));
    beat.forEach((x, i) => {
      b.push(port(60 + i * 245, 1230, 225, 290, x.id));
      b.push(text(60 + i * 245 + 112, 1570, 26, ROUND_SHORT[x.size].toUpperCase(), { f: "gothic", wt: 700, c: RED, a: "center", ls: 3 }));
    });
    return b;
  }
  const layout = (mode = rs.tab) => (mode === "tier" ? layoutTier() : mode === "top" ? layoutTop() : layoutBracket());

  /* ---------- canvas renderer ---------- */
  function drawPortrait(ctx, p, img) {
    const c = C[p.id];
    ctx.fillStyle = c.color; ctx.fillRect(p.x, p.y, p.w, p.h);
    const strip = p.name ? Math.max(22, Math.round(p.w * 0.17)) : 0;
    if (img) {
      const r = Math.max(p.w / img.width, p.h / img.height);
      const sw = p.w / r, sh = p.h / r;
      ctx.drawImage(img, (img.width - sw) / 2, 0, sw, sh, p.x, p.y, p.w, p.h);
    } else {
      ctx.fillStyle = tf(p.id); ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `800 ${Math.round(p.w * 0.56)}px ${MINCHO}`;
      ctx.fillText(c.k, p.x + p.w / 2, p.y + (p.h - strip) / 2 + p.w * 0.02);
      ctx.textBaseline = "alphabetic";
    }
    if (strip) {
      ctx.fillStyle = "rgba(11,11,11,0.86)"; ctx.fillRect(p.x, p.y + p.h - strip, p.w, strip);
      ctx.fillStyle = PAPER; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.round(strip * 0.56)}px ${GOTHIC}`;
      ctx.fillText(short(p.id), p.x + p.w / 2, p.y + p.h - strip / 2, p.w - 6);
      ctx.textBaseline = "alphabetic";
    }
    if (p.rank) {
      const bs = Math.round(p.w * 0.2);
      ctx.fillStyle = INK; ctx.fillRect(p.x, p.y, bs * 1.5, bs * 1.1);
      ctx.fillStyle = PAPER; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `800 ${Math.round(bs * 0.8)}px ${MINCHO}`;
      ctx.fillText(p.rank, p.x + bs * 0.75, p.y + bs * 0.58);
      ctx.textBaseline = "alphabetic";
    }
  }
  function draw(ctx, boxes, imgs) {
    for (const b of boxes) {
      if (b.t === "rect") { ctx.fillStyle = b.fill; ctx.fillRect(b.x, b.y, b.w, b.h); }
      else if (b.t === "text") {
        ctx.fillStyle = b.c; ctx.textAlign = b.a;
        ctx.font = `${b.wt} ${b.s}px ${b.f === "gothic" ? GOTHIC : MINCHO}`;
        if ("letterSpacing" in ctx) ctx.letterSpacing = b.ls ? `${b.ls}px` : "0px";
        b.max ? ctx.fillText(b.text, b.x, b.y, b.max) : ctx.fillText(b.text, b.x, b.y);
        if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
      } else if (b.t === "port") drawPortrait(ctx, b, imgs[b.id]);
    }
  }
  const loadImg = (url) => new Promise((res) => {
    if (!url) return res(null);
    const im = new Image();
    im.crossOrigin = "anonymous"; // only succeeds if the host allows it; otherwise we use name tiles
    im.referrerPolicy = "no-referrer";
    const timer = setTimeout(() => res(null), 8000);
    im.onload = () => { clearTimeout(timer); res(im); };
    im.onerror = () => { clearTimeout(timer); res(null); };
    im.src = url;
  });
  const toBlob = (cv) => new Promise((res, rej) => { try { cv.toBlob((b) => (b ? res(b) : rej(new Error("empty"))), "image/png"); } catch (e) { rej(e); } });

  async function renderImage() {
    const boxes = layout();
    try { await Promise.all([document.fonts.load(`800 80px "Shippori Mincho B1"`), document.fonts.load(`700 30px "Zen Kaku Gothic New"`)]); } catch {}
    const ids = [...new Set(boxes.filter((b) => b.t === "port").map((b) => b.id))];
    const withUrl = ids.filter((id) => photo(id));
    const imgs = {};
    (await Promise.all(withUrl.map((id) => loadImg(photo(id))))).forEach((im, i) => { if (im) imgs[withUrl[i]] = im; });
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    draw(ctx, boxes, imgs);
    let blob, tiles = withUrl.length > 0 && Object.keys(imgs).length < withUrl.length;
    try { blob = await toBlob(cv); }
    catch { // canvas was "tainted" by a photo: redraw with name tiles only
      ctx.clearRect(0, 0, W, H); draw(ctx, boxes, {}); blob = await toBlob(cv); tiles = true;
    }
    return { blob, tiles, anyPhotos: withUrl.length > 0 };
  }

  const caption = () => {
    const tags = "#monogatari #bakemonogatari #monogatariseries #bestgirl";
    if (rs.tab === "tier") { const g = rs.tiers.god[0]; return `My Monogatari tier list.${g ? ` Best Girl*: ${short(g)}.` : ""} *Gender is not a factor. Make yours: ${SITE} ${tags}`; }
    if (rs.tab === "top") return `My Monogatari Best Girl* is ${short(rs.top[0])}. Top 5: ${rs.top.map(short).join(", ")}. Make yours: ${SITE} ${tags}`;
    return `${short(champion())} won my Monogatari Madness bracket. Make yours: ${SITE} ${tags}`;
  };

  /* ---------- Save image modal ---------- */
  const modal = $("#postModal");
  let objUrl = null;
  async function makeImage() {
    modal.hidden = false; document.body.classList.add("modal-open");
    modal.innerHTML = `<div class="pm-box"><p class="pm-wait">Making your image…</p></div>`;
    let res;
    try { res = await renderImage(); } catch (e) { modal.innerHTML = `<div class="pm-box"><p>Couldn't make the image. Try Screenshot mode instead.</p><div class="rank-actions"><button class="btn" data-pm="shot">📸 Screenshot mode</button><button class="btn ghost" data-pm="close">Close</button></div></div>`; return; }
    if (objUrl) URL.revokeObjectURL(objUrl);
    objUrl = URL.createObjectURL(res.blob);
    const name = `monogatari-${rs.tab === "top" ? "best-girl" : rs.tab}.png`;
    const file = new File([res.blob], name, { type: "image/png" });
    const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
    modal._file = file;
    modal.innerHTML = `<div class="pm-box" role="dialog" aria-label="Your post image">
      <img class="pm-img" src="${objUrl}" alt="Your post image">
      <div class="pm-side">
        ${res.tiles ? `<div class="pm-note"><b>MyAnimeList didn't allow its photos in a saved image</b>, so this version uses name tiles. <strong>Want the faces? Use Screenshot mode and take a screenshot.</strong></div>`
          : res.anyPhotos ? `<div class="pm-note ok">Photos included.</div>` : ""}
        <div class="rank-actions col">
          ${canShare ? `<button class="btn" data-pm="share">Share to TikTok / Instagram…</button>` : ""}
          <a class="btn ${canShare ? "ghost" : ""}" href="${objUrl}" download="${name}">⬇ Download image</a>
          <button class="btn ghost" data-pm="copy">Copy caption</button>
          <button class="btn ghost" data-pm="shot">📸 Screenshot mode instead</button>
          <button class="btn ghost" data-pm="close">Close</button>
        </div>
        <p class="pm-cap">${esc(caption())}</p>
      </div></div>`;
  }
  function closeModal() { modal.hidden = true; modal.innerHTML = ""; document.body.classList.remove("modal-open"); }
  modal.addEventListener("click", async (e) => {
    if (e.target === modal) return closeModal();
    const b = e.target.closest("[data-pm]"); if (!b) return;
    const a = b.dataset.pm;
    if (a === "close") closeModal();
    else if (a === "shot") { closeModal(); openShot(); }
    else if (a === "copy") navigator.clipboard?.writeText(caption()).then(() => (b.textContent = "Caption copied"), () => (b.textContent = "Couldn't copy"));
    else if (a === "share") { try { await navigator.share({ files: [modal._file], text: caption() }); } catch {} }
  });

  /* ---------- Screenshot mode (DOM render keeps MAL photos) ---------- */
  const shot = $("#shotMode");
  let countdown = null;
  function domBoxes(boxes) {
    return boxes.map((b) => {
      if (b.t === "rect") return `<div style="position:absolute;left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;background:${b.fill}"></div>`;
      if (b.t === "text") {
        const pos = b.a === "left" ? `left:${b.x}px` : b.a === "right" ? `right:${W - b.x}px` : `left:${b.x}px;transform:translateX(-50%)`;
        const fit = b.max ? `max-width:${b.max}px;overflow:hidden;text-overflow:ellipsis;` : "";
        return `<div class="pt" style="${pos};top:${b.y - b.s * 0.86}px;${fit}font:${b.wt} ${b.s}px/${b.s}px ${(b.f === "gothic" ? GOTHIC : MINCHO).replace(/"/g, "'")};color:${b.c};letter-spacing:${b.ls}px">${esc(b.text)}</div>`;
      }
      const c = C[b.id], strip = b.name ? Math.max(22, Math.round(b.w * 0.17)) : 0, bs = Math.round(b.w * 0.2);
      return `<div class="pp" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;background:${c.color}">
        <span class="ppk" style="font-size:${Math.round(b.w * 0.56)}px;color:${tf(b.id)};bottom:${strip}px">${c.k}</span>
        ${photo(b.id) ? `<img src="${esc(photo(b.id))}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}
        ${strip ? `<span class="pps" style="height:${strip}px;font-size:${Math.round(strip * 0.56)}px;line-height:${strip}px">${esc(short(b.id))}</span>` : ""}
        ${b.rank ? `<span class="ppr" style="width:${bs * 1.5}px;height:${bs * 1.1}px;font-size:${Math.round(bs * 0.8)}px;line-height:${bs * 1.1}px">${b.rank}</span>` : ""}
      </div>`;
    }).join("");
  }
  function fitShot() {
    const post = shot.querySelector(".post"); if (!post) return;
    const k = Math.min(innerWidth / W, innerHeight / H);
    post.style.transform = `translate(-50%, -50%) scale(${k})`;
  }
  function showControls() {
    shot.classList.remove("clean");
    clearInterval(countdown);
    let n = 3;
    const el = shot.querySelector(".sb-count");
    if (el) el.textContent = n;
    countdown = setInterval(() => {
      n--; if (el) el.textContent = Math.max(n, 0);
      if (n <= 0) { clearInterval(countdown); shot.classList.add("clean"); }
    }, 1000);
  }
  function openShot() {
    shot.innerHTML = `
      <div class="post">${domBoxes(layout())}</div>
      <div class="shot-banner" role="status">
        <b>📸 Take a screenshot now</b>
        <span>This banner hides in <i class="sb-count">3</i>, so your screenshot is clean. Tap anywhere to bring it back.</span>
        <small>iPhone: side button + volume up · Android: power + volume down · Mac: ⇧⌘4 · Windows: Win + Shift + S</small>
      </div>
      <button class="shot-close" aria-label="Close screenshot mode">✕ Close</button>`;
    shot.hidden = false; document.body.classList.add("modal-open");
    fitShot(); showControls();
    shot.querySelector(".shot-close").focus({ preventScroll: true });
  }
  function closeShot() { clearInterval(countdown); shot.hidden = true; shot.innerHTML = ""; document.body.classList.remove("modal-open"); }
  shot.addEventListener("click", (e) => { if (e.target.closest(".shot-close")) return closeShot(); showControls(); });
  addEventListener("resize", fitShot);
  addEventListener("keydown", (e) => { if (e.key !== "Escape") return; if (!shot.hidden) closeShot(); else if (!modal.hidden) closeModal(); });

  // photos arrive asynchronously from MAL: refresh the panel once they land
  let refresh = null;
  window.MAL?.on((type) => { if (type !== "character") return; clearTimeout(refresh); refresh = setTimeout(render, 150); });
  window.RANK = { layout, render, state: rs, renderImage }; // handy for debugging

  render();
})();
