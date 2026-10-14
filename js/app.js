/* 〈物語〉 GUIDE — app logic */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const A = window.ANIME;
  const lightBg = (hex) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150; };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- progress model ----------
     Progress is stored as the set of arc "tokens" you've watched (e.g. "crab", "k05", "n-off"),
     not as a slider position. Every order is a list of "units" (an anime entry, a calendar arc,
     or a novel stage), and each unit expands to its tokens. This keeps progress intact when you
     switch between orders that slice the story differently. */
  const CAL = Object.fromEntries(CALENDAR.map((c) => [c.id, c]));
  const STAGES = Object.fromEntries(NOVEL_STAGES.map((s) => [s.id, s]));
  const TOKEN_KEY = {};
  Object.entries(A).forEach(([k, a]) => a.units.forEach((t) => (TOKEN_KEY[t] ??= k)));
  const ALL_TOKENS = new Set([...Object.keys(TOKEN_KEY), ...Object.keys(STAGES)]);

  const units = (order = state.order) => {
    const o = ORDERS[order];
    const main = o.calendar ? CALENDAR.map((c) => c.id) : o.list.filter((k) => !A[k].upcoming);
    return [...main, ...NOVEL_STAGES.map((s) => s.id)];
  };
  const mainUnits = (order = state.order) => units(order).filter((u) => !STAGES[u]);
  const expand = (u) => (CAL[u] ? CAL[u].tok : A[u] ? A[u].units : [u]);
  const unitMins = (u) => (CAL[u] ? CAL[u].mins : A[u] ? A[u].mins : 0);
  const unitLabel = (u) => (CAL[u] ? CAL[u].arc : A[u] ? A[u].title : STAGES[u]?.label || u);
  const tokenTitle = (t) => (STAGES[t] ? STAGES[t].label : A[TOKEN_KEY[t]]?.title || t);

  /* ---------- state + storage ---------- */
  const SKEY = "mono-guide-state-v2";
  const OLD_SKEY = "mono-guide-state-v1";
  const readKey = (k) => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v && typeof v === "object" ? v : null; } catch { return null; } };
  const clampEpd = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(40, Math.max(1, n)) : 3; };

  const state = { order: "first", watched: new Set(), flash: !reduced, epd: 3, vol: 1 };
  (function load() {
    let saved = readKey(SKEY);
    if (!saved) {
      // one-time migration from the old position-based save
      const old = readKey(OLD_SKEY);
      if (old) {
        const order = ORDERS[old.order] && !ORDERS[old.order].calendar ? old.order : "first";
        const pos = Number.isInteger(old.pos) ? old.pos : 0;
        saved = { order, watched: units(order).slice(0, Math.max(0, pos)).flatMap(expand), flash: old.flash, epd: old.epd };
      }
    }
    if (!saved) return;
    if (ORDERS[saved.order]) state.order = saved.order;
    if (Array.isArray(saved.watched)) state.watched = new Set(saved.watched.filter((t) => ALL_TOKENS.has(t)));
    if (typeof saved.flash === "boolean") state.flash = saved.flash;
    state.epd = clampEpd(saved.epd);
  })();
  // Every setting is written from `state` in one place, so saving one never drops another.
  const save = () => { try { localStorage.setItem(SKEY, JSON.stringify({ order: state.order, watched: [...state.watched], flash: state.flash, epd: state.epd })); } catch {} };
  save();

  const isDone = (u) => expand(u).every((t) => state.watched.has(t));
  const prefixLen = (order = state.order) => { const us = units(order); let n = 0; while (n < us.length && isDone(us[n])) n++; return n; };
  const unlocked = (ids) => [].concat(ids).some((t) => state.watched.has(t));
  function setPrefix(n) {
    const us = units();
    n = Math.max(0, Math.min(us.length, n));
    state.watched = new Set(us.slice(0, n).flatMap(expand));
    save(); renderAll(false);
  }
  // clicking an entry marks everything up to it; clicking the last watched one steps back
  const toggleUnit = (u) => { const idx = units().indexOf(u) + 1; if (idx > 0) setPrefix(prefixLen() === idx ? idx - 1 : idx); };

  const censor = (text, title = "Spoiler. Click to peek.") => `<span class="censor" title="${esc(title)}" tabindex="0">${text}</span>`;
  const gate = (text, ids) => unlocked(ids) ? esc(text) : censor(esc(text));
  const gateList = (arr, ids) => unlocked(ids) ? arr.map(esc).join(", ") : censor(arr.map(esc).join(", "));

  /* ---------- images ---------- */
  function imgTag(kind, key, alt) {
    const d = kind === "anime" ? MAL.data.anime[key] : MAL.data.characters[key];
    return d?.img ? `<img src="${esc(d.img)}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : "";
  }
  MAL.on((type, key, val) => {
    const sel = type === "anime" ? `[data-anime="${key}"]` : `[data-char="${key}"]`;
    document.querySelectorAll(sel).forEach((el) => {
      if (el.querySelector("img") || !val?.img) return;
      el.insertAdjacentHTML("beforeend", `<img src="${esc(val.img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`);
    });
    if (type === "character") renderWeb();
  });

  /* ---------- flash frames ---------- */
  const flashEl = $("#flash");
  let flashing = false;
  function flash(frames, force) {
    if ((!state.flash && !force) || flashing) return;
    flashing = true;
    let i = 0;
    const step = () => {
      if (i >= frames.length) { flashEl.classList.remove("on"); flashing = false; return; }
      const f = frames[i++];
      flashEl.style.background = f.bg; flashEl.style.color = f.fg;
      $(".t", flashEl).textContent = f.t; $(".s", flashEl).textContent = f.s || "";
      flashEl.classList.add("on");
      setTimeout(step, f.ms || 360); // ≤ 3 changes per second
    };
    step();
  }
  flashEl.addEventListener("click", () => { flashEl.classList.remove("on"); });
  window.GUIDE = { flash }; // shared with rank.js

  const toggle = $("#flashToggle");
  const syncToggle = () => { toggle.setAttribute("aria-pressed", state.flash); toggle.textContent = state.flash ? "FLASH ON" : "FLASH OFF"; };
  toggle.addEventListener("click", () => { state.flash = !state.flash; save(); syncToggle(); });
  syncToggle();

  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting || seen.has(e.target)) return;
      seen.add(e.target);
      const [ep, en, kj] = (e.target.dataset.flash || "").split("|");
      flash([
        { t: ep, bg: "#0b0b0b", fg: "#f4f1ea" },
        { t: en, bg: "#e60012", fg: "#f4f1ea", s: "MONOGATARI · GUIDE" },
        { t: kj, bg: "#f4f1ea", fg: "#0b0b0b" },
      ]);
    });
  }, { threshold: 0.55 });
  document.querySelectorAll("[data-flash]").forEach((el) => io.observe(el));

  /* ---------- hero stats ---------- */
  function renderHero() {
    const all = SEASONS.flatMap((s) => s.vols.flatMap((v) => v.stories));
    const animated = all.filter((s) => s[1] === "anime").length;
    const watchable = Object.values(A).filter((a) => !a.upcoming);
    const hours = Math.round(watchable.reduce((t, a) => t + a.mins, 0) / 60);
    $("#heroStats").innerHTML = `
      <div><b>31</b><small>Novels in Japan</small></div>
      <div><b>${animated}/${all.length}</b><small>Stories animated</small></div>
      <div><b>~${hours}h</b><small>Of anime</small></div>`;
  }

  /* ---------- 1. order ---------- */
  function renderOrderTabs() {
    $("#orderTabs").innerHTML = Object.entries(ORDERS).map(([k, o]) =>
      `<button data-order="${k}" aria-pressed="${k === state.order}"><span>${o.jp}</span>${o.label}</button>`).join("");
    $("#orderNote").textContent = ORDERS[state.order].note;
  }
  $("#orderTabs").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || b.dataset.order === state.order) return;
    const next = b.dataset.order;
    state.order = next; save(); // progress is stored as arcs, so nothing else changes
    flash([{ t: ORDERS[next].jp, bg: "#e60012", fg: "#f4f1ea", s: ORDERS[next].label.toUpperCase() + " ORDER", ms: 340 }]);
    renderAll(true);
  });

  function cardHTML(k, i) {
    const a = A[k]; const done = !a.upcoming && isDone(k);
    const metaBits = [a.year, a.kind, a.eps ? (a.eps === 1 ? `${a.mins} min` : `${a.eps} eps`) : "TBA"];
    const arcsOpen = a.upcoming ? unlocked(["n-off"]) : done;
    return `<button class="ocard ${done ? "watched" : ""} ${a.upcoming ? "upcoming" : ""}" data-key="${k}" ${a.upcoming ? 'aria-disabled="true"' : ""}>
      <div class="cover" style="--c:${a.color};--tf:${lightBg(a.color) ? "#0b0b0b" : "#f4f1ea"}" data-anime="${k}">
        <div class="tile"><span>${a.kanji}</span></div>${imgTag("anime", k, a.title + " cover")}
        <div class="num">${String(i + 1).padStart(2, "0")}</div>
      </div>
      <h3>${esc(a.title)}</h3>
      <div class="meta">${a.jp} · ${metaBits.join(" · ")}</div>
      <div class="arcs">${arcsOpen ? esc(a.arcs.join(" / ")) : censor(esc(a.arcs.join(" / ")))}</div>
      <div class="mark-hint">${a.upcoming ? "ANNOUNCED · NOT YET AIRED" : done && prefixLen() === units().indexOf(k) + 1 ? "CLICK TO UNMARK" : "MARK WATCHED UP TO HERE"}</div>
    </button>`;
  }

  function renderOrder(animate) {
    const grid = $("#orderGrid");
    const calView = $("#calendarView");
    const isCal = !!ORDERS[state.order].calendar;
    grid.hidden = isCal; calView.hidden = !isCal;
    if (isCal) { grid.innerHTML = ""; renderCalendar(); return; }
    calView.innerHTML = "";
    const before = {};
    if (animate && !reduced) grid.querySelectorAll(".ocard").forEach((c) => (before[c.dataset.key] = c.getBoundingClientRect()));
    grid.innerHTML = ORDERS[state.order].list.map(cardHTML).join("");
    if (animate && !reduced) {
      grid.querySelectorAll(".ocard").forEach((c) => {
        const b = before[c.dataset.key]; if (!b) return;
        const a = c.getBoundingClientRect();
        c.style.transition = "none";
        c.style.transform = `translate(${b.left - a.left}px, ${b.top - a.top}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = ""; c.style.transform = ""; }));
      });
    }
  }
  $("#orderGrid").addEventListener("click", (e) => {
    if (e.target.closest(".censor")) return;
    const c = e.target.closest(".ocard"); if (!c || A[c.dataset.key].upcoming) return;
    toggleUnit(c.dataset.key);
  });

  function renderMeter() {
    const list = mainUnits();
    const total = list.reduce((t, u) => t + unitMins(u), 0);
    const left = list.filter((u) => !isDone(u)).reduce((t, u) => t + unitMins(u), 0);
    const per = state.epd;
    const days = Math.ceil(left / (per * 24)); // ~24 minutes per episode
    const done = new Date(Date.now() + days * 864e5);
    $("#meter").innerHTML = `
      <div><b>${list.length}</b><small>Entries in this order</small></div>
      <div><b>${Math.round(total / 60)}h</b><small>Total runtime</small></div>
      <div><b>${Math.round(left / 60)}h</b><small>Left for you</small></div>
      <div><label><input id="epd" type="number" min="1" max="40" value="${per}"><small style="display:block">Episodes per day</small></label></div>
      <div><b>${left === 0 ? "Done" : done.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</b><small>${left === 0 ? "Now read the books" : `You'd finish in ${days} day${days === 1 ? "" : "s"}`}</small></div>`;
  }
  $("#meter").addEventListener("change", (e) => {
    if (e.target.id !== "epd") return;
    state.epd = clampEpd(e.target.value); save();
    renderMeter(); $("#epd").focus();
  });

  /* ---------- 1b. calendar order ---------- */
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const MON = MONTHS.map((m) => m.slice(0, 3));
  const MONTH_JP = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  const YEAR_LABEL = { 1: "Year One · Araragi's third year", 2: "Year Two · graduation and after" };
  const CAL_SPAN = [[1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [2, 1], [2, 2], [2, 3], [2, 4]];
  const oddColor = Object.fromEntries(ODDITIES.map((o) => [o.arc, o.color]));
  const calColor = (c) => c.color || oddColor[c.arc] || A[c.key].color;
  const dayNum = (y, m, d) => Date.UTC(CAL_YEARS[y], m - 1, d) / 864e5;
  function dateLabel(c) {
    if (c.after) return "After graduation";
    if (c.approx) return "≈ " + c.approx[2];
    const [, m1, d1] = c.s, e = c.e;
    if (!e) return `${MON[m1 - 1]} ${d1}`;
    return e[1] === m1 ? `${MON[m1 - 1]} ${d1}–${e[2]}` : `${MON[m1 - 1]} ${d1} – ${MON[e[1] - 1]} ${e[2]}`;
  }
  const covers = (c, y, m, d) => {
    if (!c.s) return false;
    const n = dayNum(y, m, d), e = c.e || c.s;
    return n >= dayNum(...c.s) && n <= dayNum(...e);
  };

  function calRow(c) {
    const n = CALENDAR.indexOf(c) + 1;
    const done = isDone(c.id);
    const open = unlocked(c.tok);
    const last = done && prefixLen() === units().indexOf(c.id) + 1;
    return `<li><button class="cal-row ${done ? "done" : ""}" data-unit="${c.id}" title="${last ? "Click to unmark" : "Mark watched up to here"}">
      <span class="cn" style="--sw:${calColor(c)}">${String(n).padStart(2, "0")}</span>
      <span class="cd">${dateLabel(c)}</span>
      <span class="ct"><b>${open ? esc(c.arc) : censor(esc(c.arc))}</b><small>${esc(c.where)}</small>${c.note && open ? `<em>${esc(c.note)}</em>` : ""}</span>
    </button></li>`;
  }

  function laneBlock(id, y, m) {
    const L = CAL_LANES[id];
    const items = CALENDAR.filter((c) => c.lane === id);
    const [d0, d1] = L.days;
    const cols = d1 - d0 + 1;
    const head = Array.from({ length: cols }, (_, i) => {
      const wd = new Date(Date.UTC(CAL_YEARS[y], m - 1, d0 + i)).getUTCDay();
      return `<span class="lh">${d0 + i}<small>${"日月火水木金土"[wd]}</small></span>`;
    }).join("");
    const rows = items.map((c, i) => {
      const a = Math.max(c.s[2], d0) - d0 + 2, b = Math.min((c.e || c.s)[2], d1) - d0 + 3;
      const col = calColor(c);
      return `<span class="ll" style="grid-row:${i + 2}">${String(CALENDAR.indexOf(c) + 1).padStart(2, "0")} ${unlocked(c.tok) ? esc(c.arc) : censor(esc(c.arc))}</span>
        <span class="lb ${isDone(c.id) ? "done" : ""}" style="grid-row:${i + 2};grid-column:${a} / ${b};--lc:${col};--lt:${lightBg(col) ? "#0b0b0b" : "#f4f1ea"}">${dateLabel(c)}</span>`;
    }).join("");
    return `<div class="lanes">
      <div class="lanes-head"><span class="lj">${L.jp}</span><b>${esc(L.title)}</b></div>
      <p>${esc(L.text)}</p>
      <div class="lane-grid" style="--cols:${cols}"><span></span>${head}${rows}</div>
    </div>`;
  }

  function monthCard(y, m) {
    const Y = CAL_YEARS[y];
    const first = new Date(Date.UTC(Y, m - 1, 1)).getUTCDay();
    const len = new Date(Date.UTC(Y, m, 0)).getUTCDate();
    const exact = CALENDAR.filter((c) => c.s);
    let cells = "日月火水木金土".split("").map((d, i) => `<span class="wd ${i === 0 ? "sun" : ""}">${d}</span>`).join("");
    cells += "<span></span>".repeat(first);
    for (let d = 1; d <= len; d++) {
      const on = exact.filter((c) => covers(c, y, m, d));
      if (!on.length) { cells += `<span class="d">${d}</span>`; continue; }
      const cols = on.map(calColor);
      const bg = cols.length === 1 ? cols[0]
        : `linear-gradient(135deg, ${cols.map((c, i) => `${c} ${(i / cols.length) * 100}% ${((i + 1) / cols.length) * 100}%`).join(", ")})`;
      const title = on.map((c) => (unlocked(c.tok) ? c.arc : "Spoiler")).join(" + ");
      const all = on.every((c) => isDone(c.id));
      cells += `<span class="d on ${on.length > 1 ? "multi" : ""} ${all ? "done" : ""}" style="background:${bg};color:${lightBg(cols[0]) ? "#0b0b0b" : "#f4f1ea"}" title="${esc(title)}">${d}</span>`;
    }
    const rows = CALENDAR.filter((c) => (c.s && c.s[0] === y && c.s[1] === m) || (c.approx && c.approx[0] === y && c.approx[1] === m));
    const lane = Object.keys(CAL_LANES).find((id) => { const c = CALENDAR.find((x) => x.lane === id); return c && c.s[0] === y && c.s[1] === m; });
    return `<article class="cal-month ${lane ? "has-lanes" : ""}">
      <header><span class="mk">${MONTH_JP[m - 1]}</span><div><b>${MONTHS[m - 1]}</b><small>${y === 1 ? "Year One" : "Year Two"}</small></div></header>
      <div class="cal-grid" aria-hidden="true">${cells}</div>
      ${lane ? laneBlock(lane, y, m) : ""}
      ${rows.length ? `<ol class="cal-list">${rows.map(calRow).join("")}</ol>` : `<p class="cal-quiet">Nothing on screen this month.</p>`}
    </article>`;
  }

  function renderCalendar() {
    let html = `<div class="cal-legend">
      <span><i class="lg-on"></i>Colored day = an arc happens</span>
      <span><i class="lg-multi"></i>Striped = arcs overlap</span>
      <span><b>≈</b> Month known, exact day isn't</span>
      <span><b>済</b> Watched</span>
    </div>
    <p class="cal-note">Weekdays are laid out so Mother's Day lands on May 14, as it does in the story. Click any arc to mark everything up to it as watched.</p>`;
    let yr = 0;
    CAL_SPAN.forEach(([y, m]) => {
      if (y !== yr) { if (yr) html += `</div>`; yr = y; html += `<h3 class="cal-year"><span>${y === 1 ? "一年目" : "二年目"}</span>${YEAR_LABEL[y]}</h3><div class="cal-months">`; }
      html += monthCard(y, m);
    });
    html += `</div>`;
    const after = CALENDAR.filter((c) => c.after);
    html += `<h3 class="cal-year"><span>卒業後</span>After graduation · undated</h3>
      <article class="cal-month cal-after"><p class="cal-quiet">Off &amp; Monster Season isn't pinned to calendar dates. Most of it takes place after graduation, with two stories set 600 years in the past. Listed in the order it aired.</p>
      <ol class="cal-list">${after.map(calRow).join("")}</ol></article>`;
    $("#calendarView").innerHTML = html;
  }
  $("#calendarView").addEventListener("click", (e) => {
    if (e.target.closest(".censor")) return;
    const r = e.target.closest(".cal-row"); if (r) toggleUnit(r.dataset.unit);
  });

  /* ---------- 2. macro map ---------- */
  const segClass = { anime: "seg-anime", next: "seg-next", novel: "seg-novel" };
  function renderMap() {
    const all = SEASONS.flatMap((s) => s.vols.flatMap((v) => v.stories));
    const c = (st) => all.filter((s) => s[1] === st).length;
    $("#mapStats").innerHTML = `
      <div><b>${all.length}</b><small>Stories in 31 volumes</small></div>
      <div><b>${c("anime")}</b><small>Animated</small></div>
      <div><b>${c("next")}</b><small>Announced</small></div>
      <div><b>${c("novel")}</b><small>Novel only</small></div>
      <div><b>18/31</b><small>Volumes in English</small></div>`;
    $("#mapCols").innerHTML = SEASONS.map((s) => `
      <div class="season-col" style="--sc:${s.color === "#111111" ? "#f4f1ea" : s.color}">
        <div class="season-head"><b>${s.name}${s.ongoing ? '<span class="tag">ONGOING</span>' : ""}</b><small>${s.jp} · ${s.en ? "EN + JP" : "JP ONLY"}</small></div>
        <div class="spines">${s.vols.map((v) => `
          <button class="spine" data-vol="${v.n}" aria-expanded="${v.n === state.vol}" aria-label="Volume ${v.n}: ${esc(v.title)}">
            <span class="vn">${v.n}</span>
            <span class="vt">${v.jp}</span>
            ${s.en ? '<span class="en">EN</span>' : ""}
            <span class="segs">${v.stories.map((st) => `<i class="${segClass[st[1]]}"></i>`).join("")}</span>
          </button>`).join("")}
        </div>
      </div>`).join("");
    renderVol();
  }
  function renderVol() {
    const s = SEASONS.find((x) => x.vols.some((v) => v.n === state.vol));
    const v = s.vols.find((x) => x.n === state.vol);
    const where = (st) => st[1] === "anime" ? `IN ${esc(A[st[2]].title.toUpperCase())}` : st[1] === "next" ? "ANIME ANNOUNCED · WINTER" : "NOVEL ONLY";
    const unlock = (st) => [st[3] || st[2]];
    const d = $("#volDetail");
    d.style.setProperty("--sc", s.color === "#111111" ? "#f4f1ea" : s.color);
    d.innerHTML = `
      <h3>${v.n}. ${esc(v.title)} <span class="jp">${v.jp}</span></h3>
      <div class="timeline-note">${s.name} · Japan, ${v.year} · ${s.en ? "Official English translation available" : "Japanese only, no official English release"}</div>
      <ul>${v.stories.map((st) => `<li><i class="${segClass[st[1]]}"></i>${gate(st[0], unlock(st))}<span class="where">${where(st)}</span></li>`).join("")}</ul>`;
  }
  $("#mapCols").addEventListener("click", (e) => {
    const b = e.target.closest(".spine"); if (!b) return;
    state.vol = +b.dataset.vol;
    document.querySelectorAll(".spine").forEach((x) => x.setAttribute("aria-expanded", x === b));
    renderVol();
  });

  /* ---------- 3. oddities ---------- */
  function renderOdd() {
    $("#oddGrid").innerHTML = ODDITIES.map((o) => {
      const open = unlocked([o.tok]);
      return `<article class="odd ${open ? "" : "locked"}" style="--oc:${o.color};--oinv:${lightBg(o.color) ? "#0b0b0b" : "#f4f1ea"}">
        <div class="k">${open ? o.kanji : "未"}</div>
        <h3>${gate(o.arc, [o.tok])}</h3>
        <div class="o">${open ? `${esc(o.oddity)} · ${o.jpOdd}` : `Unlocks with ${esc(A[o.entry].title)}`}</div>
        <p>${open ? esc(o.hook) : "Sealed until you get there."}</p>
      </article>`;
    }).join("");
  }

  /* ---------- 4. characters ---------- */
  function renderRoster() {
    $("#roster").innerHTML = CHARACTERS.map((c) => {
      const met = unlocked(c.meet);
      return `<button class="char ${met ? "" : "unmet"}" data-id="${c.id}" aria-label="${met ? esc(c.name) : "Unknown character"}">
        <div class="portrait" style="--c:${c.color};--tf:${lightBg(c.color) ? "#0b0b0b" : "#f4f1ea"}" data-char="${c.id}">
          <div class="tile"><span style="font-size:64px">${met ? esc(c.k || c.name[0]) : "?"}</span></div>${imgTag("character", c.id, c.name)}
        </div>
        <h3>${met ? esc(c.name) : "???"}</h3>
        <div class="odd-line">${met ? gate(c.odd, c.oddUnlock) : "Not met yet · " + esc(tokenTitle(c.meet[0]))}</div>
        <p>${met ? esc(c.blurb) : ""}</p>
      </button>`;
    }).join("");
  }

  let hotNode = null;
  function renderWeb() {
    const svg = $("#web");
    const W = 900, H = 640, cx = W / 2, cy = H / 2;
    const WEB = CHARACTERS.filter((c) => c.web !== false);
    const others = WEB.filter((c) => c.id !== "koyomi");
    const pos = { koyomi: [cx, cy] };
    others.forEach((c, i) => {
      const ang = (i / others.length) * Math.PI * 2 - Math.PI / 2;
      pos[c.id] = [cx + Math.cos(ang) * 255 * 1.25, cy + Math.sin(ang) * 255];
    });
    const met = new Set(WEB.filter((c) => unlocked(c.meet)).map((c) => c.id));
    const edges = EDGES.filter(([a, b, , u]) => met.has(a) && met.has(b) && unlocked(u));
    const R = 30;
    let out = `<defs>${WEB.map((c) => `<clipPath id="clip-${c.id}"><circle cx="${pos[c.id][0]}" cy="${pos[c.id][1]}" r="${R}"/></clipPath>`).join("")}</defs>`;
    let hotI = 0;
    out += edges.map(([a, b, label]) => {
      const hot = hotNode && (a === hotNode || b === hotNode);
      const [x1, y1] = pos[a], [x2, y2] = pos[b];
      // stagger labels between 50% and 74% of the way from the hovered face toward the other one, so labels fan out
      const [hx, hy, ox, oy] = a === hotNode ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
      const t = hot ? (hotI++ % 2 ? 0.74 : 0.5) : 0;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${hot ? "hot" : ""}"/>` +
        (hot ? `<text class="edge-label" x="${hx + (ox - hx) * t}" y="${hy + (oy - hy) * t - 6}">${esc(label)}</text>` : "");
    }).join("");
    out += WEB.map((c) => {
      const [x, y] = pos[c.id]; const m = met.has(c.id);
      const img = MAL.data.characters[c.id]?.img;
      return `<g class="node ${m ? "" : "unmet"} ${hotNode === c.id ? "hot" : ""}" data-id="${c.id}" tabindex="${m ? 0 : -1}">
        <circle cx="${x}" cy="${y}" r="${R}" fill="${m ? c.color : "#1c1c1c"}"/>
        ${m && img ? `<image href="${esc(img)}" x="${x - R}" y="${y - R * 1.2}" width="${R * 2}" height="${R * 3}" preserveAspectRatio="xMidYMin slice" clip-path="url(#clip-${c.id})"/>` : ""}
        ${m ? "" : `<text x="${x}" y="${y + 5}" style="font-size:18px">?</text>`}
        <circle class="ring" cx="${x}" cy="${y}" r="${R}"/>
        <text x="${x}" y="${y + R + 18}">${m ? esc(c.name.split(" ")[0]) : "???"}</text>
      </g>`;
    }).join("");
    out += `<text x="16" y="${H - 16}" style="fill:#8a8580;font-size:12px">${edges.length} of ${EDGES.length} threads revealed</text>`;
    svg.innerHTML = out;
  }
  const web = $("#web");
  const setHot = (id) => { if (hotNode !== id) { hotNode = id; renderWeb(); } };
  web.addEventListener("mouseover", (e) => { const n = e.target.closest(".node:not(.unmet)"); setHot(n ? n.dataset.id : null); });
  web.addEventListener("mouseleave", () => setHot(null));
  web.addEventListener("click", (e) => { const n = e.target.closest(".node:not(.unmet)"); setHot(n && n.dataset.id !== hotNode ? n.dataset.id : null); });
  web.addEventListener("focusin", (e) => { const n = e.target.closest(".node"); if (n) setHot(n.dataset.id); });

  /* ---------- 5. after the anime ---------- */
  function renderAfter() {
    const w = state.watched;
    const animeList = mainUnits();
    const seenN = animeList.filter(isDone).length;
    const nextK = animeList.find((u) => !isDone(u));
    const nextLabel = nextK ? (CAL[nextK] ? `${CAL[nextK].arc} (${CAL[nextK].where})` : unitLabel(nextK)) : "";
    const novelOnly = (sid) => SEASONS.find((s) => s.id === sid).vols.flatMap((v) => v.stories.filter((st) => st[1] === "novel").map((st) => st[0]));

    let you;
    if (w.size === 0) you = `Haven't started? In this order you'd start with <b>${esc(unitLabel(animeList[0]))}</b>. Then set your progress in the bar below as you go.`;
    else if (nextK) you = `You've watched <b>${seenN} of ${animeList.length}</b> entries in ${ORDERS[state.order].label.toLowerCase()} order. Next up: <b>${esc(nextLabel)}</b>.`;
    else if (!w.has("n-off")) you = `You've seen <b>all the anime</b> that exists. From here, the story continues in the novels.`;
    else you = `You're past the anime and into the books. ${w.has("n-family") ? "You're fully caught up. Torimonogatari (Sept 2026) is the newest." : "Keep going."}`;
    $("#youAre").innerHTML = you;

    const allAnime = !nextK;
    const cards = [
      { step: "STEP 01", title: "Finish the anime", lang: "STREAMING", now: !allAnime,
        body: `Through Off &amp; Monster Season (2024). ${nextK ? `You're on <b>${esc(nextLabel)}</b>.` : "Done!"}` },
      { step: "STEP 02", title: "Karen Ogre", lang: "ANIME · WINTER", now: allAnime && !w.has("n-off"),
        body: "The next anime arc, from Wazamonogatari, is announced for winter. Karen goes on a mountain retreat to push herself further." },
      { step: "STEP 03", title: "Off Season novels", lang: "JAPANESE ONLY", now: allAnime && !w.has("n-off"),
        body: `Start with Orokamonogatari. Novel-only stories: ${gateList(novelOnly("off"), ["n-off"])}.` },
      { step: "STEP 04", title: "Monster Season", lang: "JAPANESE ONLY", now: w.has("n-off") && !w.has("n-monster"),
        body: `Araragi in college. The anime adapted Shinobumonogatari only; begin at Yoimonogatari. Novel-only: ${gateList(novelOnly("monster"), ["n-monster"])}.` },
      { step: "STEP 05", title: "Family Season", lang: "JAPANESE ONLY · ONGOING", now: w.has("n-monster") && !w.has("n-family"),
        body: `Ikusamonogatari (2023), Tsugimonogatari (2025), Torimonogatari (2026). Stories: ${gateList(novelOnly("family"), ["n-family"])}.` },
      { step: "OR", title: "Read the main story", lang: "ENGLISH AVAILABLE", now: false,
        body: "Volumes 1–18, Bakemonogatari through Zoku Owarimonogatari, are officially in English. The anime adapts them faithfully, but the prose has jokes and inner monologue the screen can't hold." },
    ];
    $("#exit").innerHTML = cards.map((c) => `<div class="exit-card ${c.now ? "now" : ""}"><div class="step">${c.step}${c.now ? " · YOU ARE HERE" : ""}</div><h3>${c.title}</h3><p>${c.body}</p><span class="lang">${c.lang}</span></div>`).join("");
  }

  /* ---------- 6. quiz ---------- */
  let qi = 0, score = {};
  function renderQuiz() {
    const box = $("#quizBox");
    if (qi < QUIZ.length) {
      const q = QUIZ[qi];
      box.innerHTML = `<div class="quiz-head"><span>QUESTION ${qi + 1} / ${QUIZ.length}</span><span>診断</span></div>
        <div class="quiz-body"><h3>${esc(q.q)}</h3><div class="answers">${q.a.map((a, i) => `<button data-a="${i}">${esc(a[0])}</button>`).join("")}</div></div>`;
    } else {
      const top = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      const r = QUIZ_RESULTS[top];
      box.innerHTML = `<div class="quiz-head"><span>RESULT</span><span>診断結果</span></div>
        <div class="quiz-body result"><div class="k">${r.kanji}</div><div>
          <h3>You are ${esc(r.arc)}.</h3><p>${esc(r.text)}</p>
          <button class="btn" data-share>Copy result</button><button class="btn ghost" data-retry>Retake</button>
        </div></div>`;
      flash([{ t: r.kanji, bg: "#0b0b0b", fg: "#e60012", s: r.arc.toUpperCase(), ms: 600 }]);
    }
  }
  $("#quizBox").addEventListener("click", (e) => {
    const a = e.target.closest("[data-a]");
    if (a) { Object.entries(QUIZ[qi].a[+a.dataset.a][1]).forEach(([k, v]) => (score[k] = (score[k] || 0) + v)); qi++; renderQuiz(); return; }
    if (e.target.closest("[data-retry]")) { qi = 0; score = {}; renderQuiz(); return; }
    const s = e.target.closest("[data-share]");
    if (s) {
      const top = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      const text = `I'm ${QUIZ_RESULTS[top].arc} (${QUIZ_RESULTS[top].kanji}). Which Monogatari oddity are you? ${location.href.split("#")[0]}#quiz`;
      navigator.clipboard?.writeText(text).then(() => (s.textContent = "Copied"), () => (s.textContent = "Couldn't copy"));
    }
  });

  /* ---------- 7. FAQ + Ōgi ---------- */
  function renderFAQ() {
    $("#faqList").innerHTML = FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  }
  function renderOugi() {
    $("#ougiList").innerHTML = OUGI.map((o) => `<li>${unlocked(o.unlock) ? esc(o.q) : `${censor(esc(o.q), "Unlocks with " + tokenTitle(o.unlock[0]))} <small style="font-family:var(--gothic);color:#6b665e">· after ${esc(tokenTitle(o.unlock[0]))}</small>`}</li>`).join("");
  }

  /* ---------- footer: Shinobu's donuts ---------- */
  const SHINOBU = ["Kakaka!", "Mister Donut, and be quick about it.", "A Golden Chocolate, if you please.", "Is that all? Watch more.", "Hmph. Adequate."];
  let donutClicks = 0;
  function renderDonuts() {
    const list = mainUnits();
    const ate = list.map(isDone);
    const eaten = ate.filter(Boolean).length;
    $("#donuts").innerHTML = list.map((u, i) => `<button class="donut ${ate[i] ? "eaten" : ""}" aria-label="Donut ${i + 1}${ate[i] ? ", eaten" : ""}"></button>`).join("");
    const says = $("#shinobuSays");
    if (eaten === list.length) says.textContent = "Kakaka! Every last one. Now go read the books.";
    else if (says.dataset.full) says.textContent = "";
    says.dataset.full = eaten === list.length ? "1" : "";
  }
  $("#donuts").addEventListener("click", (e) => {
    if (!e.target.closest(".donut")) return;
    $("#shinobuSays").textContent = SHINOBU[donutClicks++ % SHINOBU.length];
    if (donutClicks === 7) flash([{ t: "忍", bg: "#f2c94c", fg: "#0b0b0b", s: "KAKAKA", ms: 600 }], true);
  });

  /* ---------- spoiler bar ---------- */
  const range = $("#spoilRange");
  function renderSpoil() {
    const us = units();
    const n = prefixLen();
    // arcs marked beyond the slider point (e.g. watched in a different order's sequence)
    const extra = us.slice(n).filter((u) => expand(u).some((t) => state.watched.has(t))).length;
    range.max = us.length; range.value = n;
    const label = n === 0 ? (extra ? "Nothing in this order's sequence yet" : "Nothing yet. Everything is sealed.") : (CAL[us[n - 1]] ? `${CAL[us[n - 1]].arc} · ${dateLabel(CAL[us[n - 1]])}` : unitLabel(us[n - 1]));
    $("#spoilNow").innerHTML = esc(label) + (extra ? ` <small class="spoil-extra">+ ${extra} more marked out of sequence</small>` : "");
    $("#spoilMinus").disabled = n === 0; $("#spoilPlus").disabled = n === us.length;
  }
  range.addEventListener("input", () => setPrefix(+range.value));
  $("#spoilMinus").addEventListener("click", () => setPrefix(prefixLen() - 1));
  $("#spoilPlus").addEventListener("click", () => setPrefix(prefixLen() + 1));

  /* peek at a censored title */
  document.addEventListener("click", (e) => { const c = e.target.closest(".censor"); if (c) { e.stopPropagation(); c.classList.toggle("peek"); } }, true);
  document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("censor")) { e.preventDefault(); e.target.classList.toggle("peek"); } });

  /* easter egg: type "araragi" */
  let typed = "";
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    typed = (typed + e.key.toLowerCase()).slice(-7);
    if (typed === "araragi") flash([
      { t: "Arararagi-san?", bg: "#e8a33d", fg: "#0b0b0b", ms: 900 },
      { t: "失礼、噛みました", bg: "#0b0b0b", fg: "#f4f1ea", s: "SORRY, I STUTTERED", ms: 1100 },
    ], true);
  });

  /* ---------- render ---------- */
  function renderAll(animate) {
    renderOrderTabs(); renderOrder(animate); renderMeter(); renderMap(); renderOdd();
    renderRoster(); renderWeb(); renderAfter(); renderOugi(); renderDonuts(); renderSpoil();
  }
  renderHero(); renderFAQ(); renderQuiz(); renderAll(false);
  MAL.init();

  /* intro title cards, once per visit */
  const introSeen = (() => { try { return !!sessionStorage.getItem("mono-intro"); } catch { return true; } })();
  if (state.flash && !introSeen) {
    try { sessionStorage.setItem("mono-intro", "1"); } catch {}
    flash([
      { t: "〈物語〉", bg: "#0b0b0b", fg: "#f4f1ea", ms: 520 },
      { t: "WATCH", bg: "#e60012", fg: "#f4f1ea", s: "見る", ms: 380 },
      { t: "READ", bg: "#f4f1ea", fg: "#0b0b0b", s: "読む", ms: 380 },
    ]);
  }
})();
