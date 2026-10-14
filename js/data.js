/* =========================================================
   〈物語〉 GUIDE — all content lives here.
   Edit this file to update adaptation status, orders, etc.
   ========================================================= */

/* ---------- Anime entries ---------- */
// mal: MyAnimeList anime id. q: search fallback used by the MAL loader if the id ever changes.
// mins: total runtime in minutes (approximate).
window.ANIME = {
  bake:      { title: "Bakemonogatari", jp: "化物語", year: 2009, eps: 15, mins: 360, kind: "TV", mal: 5081,  q: "Bakemonogatari", color: "#e60012",
               arcs: ["Hitagi Crab", "Mayoi Snail", "Suruga Monkey", "Nadeko Snake", "Tsubasa Cat"], kanji: "化", units: ["crab", "snail", "monkey", "snake", "cat"] },
  nise:      { title: "Nisemonogatari", jp: "偽物語", year: 2012, eps: 11, mins: 264, kind: "TV", mal: 11597, q: "Nisemonogatari", color: "#f2b705",
               arcs: ["Karen Bee", "Tsukihi Phoenix"], kanji: "偽", units: ["bee", "phoenix"] },
  nekokuro:  { title: "Nekomonogatari (Black)", jp: "猫物語 (黒)", year: 2012, eps: 4, mins: 96, kind: "TV", mal: 15689, q: "Nekomonogatari Kuro", color: "#1a1a1a",
               arcs: ["Tsubasa Family"], kanji: "黒", units: ["family"] },
  nekoshiro: { title: "Nekomonogatari (White)", jp: "猫物語 (白)", year: 2013, eps: 5, mins: 120, kind: "TV · Second Season", mal: 17074, q: "Monogatari Series: Second Season", color: "#d9d4c7",
               arcs: ["Tsubasa Tiger"], kanji: "白", units: ["tiger"] },
  kabuki:    { title: "Kabukimonogatari", jp: "傾物語", year: 2013, eps: 4, mins: 96, kind: "TV · Second Season", mal: 17074, q: "Monogatari Series: Second Season", color: "#3a7d44",
               arcs: ["Mayoi Jiangshi"], kanji: "傾", units: ["jiangshi"] },
  otori:     { title: "Otorimonogatari", jp: "囮物語", year: 2013, eps: 4, mins: 96, kind: "TV · Second Season", mal: 17074, q: "Monogatari Series: Second Season", color: "#e86fa0",
               arcs: ["Nadeko Medusa"], kanji: "囮", units: ["medusa"] },
  oni:       { title: "Onimonogatari", jp: "鬼物語", year: 2013, eps: 4, mins: 96, kind: "TV · Second Season", mal: 17074, q: "Monogatari Series: Second Season", color: "#5b3fa6",
               arcs: ["Shinobu Time"], kanji: "鬼", units: ["time"] },
  koi:       { title: "Koimonogatari", jp: "恋物語", year: 2013, eps: 6, mins: 144, kind: "TV · Second Season", mal: 17074, q: "Monogatari Series: Second Season", color: "#2b2b2b",
               arcs: ["Hitagi End"], kanji: "恋", units: ["end"] },
  hana:      { title: "Hanamonogatari", jp: "花物語", year: 2014, eps: 5, mins: 120, kind: "TV", mal: 21855, q: "Hanamonogatari", color: "#2f6fb5",
               arcs: ["Suruga Devil"], kanji: "花", units: ["devil"] },
  tsuki:     { title: "Tsukimonogatari", jp: "憑物語", year: 2014, eps: 4, mins: 96, kind: "TV", mal: 28025, q: "Tsukimonogatari", color: "#8fb8de",
               arcs: ["Yotsugi Doll"], kanji: "憑", units: ["doll"] },
  owari:     { title: "Owarimonogatari", jp: "終物語", year: 2015, eps: 13, mins: 312, kind: "TV", mal: 31181, q: "Owarimonogatari", color: "#111111",
               arcs: ["Ōgi Formula", "Sodachi Riddle", "Sodachi Lost", "Shinobu Mail"], kanji: "終", units: ["formula", "riddle", "lost", "mail"] },
  kizu1:     { title: "Kizumonogatari I: Tekketsu", jp: "傷物語 I 鉄血篇", year: 2016, eps: 1, mins: 64, kind: "Film", mal: 9260, q: "Kizumonogatari I: Tekketsu-hen", color: "#8c0f12",
               arcs: ["Koyomi Vamp (part 1)"], kanji: "鉄", units: ["vamp1"] },
  koyomi:    { title: "Koyomimonogatari", jp: "暦物語", year: 2016, eps: 12, mins: 150, kind: "Web shorts", mal: 32268, q: "Koyomimonogatari", color: "#c9a227",
               arcs: ["Twelve Koyomi shorts, Stone → Dead"], kanji: "暦", units: ["k01", "k02", "k03", "k04", "k05", "k06", "k07", "k08", "k09", "k10", "k11", "k12"] },
  kizu2:     { title: "Kizumonogatari II: Nekketsu", jp: "傷物語 II 熱血篇", year: 2016, eps: 1, mins: 69, kind: "Film", mal: 31757, q: "Kizumonogatari II: Nekketsu-hen", color: "#b3191e",
               arcs: ["Koyomi Vamp (part 2)"], kanji: "熱", units: ["vamp2"] },
  kizu3:     { title: "Kizumonogatari III: Reiketsu", jp: "傷物語 III 冷血篇", year: 2017, eps: 1, mins: 83, kind: "Film", mal: 31758, q: "Kizumonogatari III: Reiketsu-hen", color: "#5a0a0c",
               arcs: ["Koyomi Vamp (part 3)"], kanji: "冷", units: ["vamp3"] },
  owari2:    { title: "Owarimonogatari 2nd Season", jp: "終物語 下", year: 2017, eps: 7, mins: 168, kind: "TV", mal: 35247, q: "Owarimonogatari 2nd Season", color: "#3d3d3d",
               arcs: ["Mayoi Hell", "Hitagi Rendezvous", "Ōgi Dark"], kanji: "下", units: ["hell", "rendezvous", "dark"] },
  zoku:      { title: "Zoku Owarimonogatari", jp: "続・終物語", year: 2018, eps: 6, mins: 144, kind: "Film / TV", mal: 36999, q: "Zoku Owarimonogatari", color: "#7aa6c2",
               arcs: ["Koyomi Reverse"], kanji: "続", units: ["reverse"] },
  oms:       { title: "Off & Monster Season", jp: "オフ＆モンスターシーズン", year: 2024, eps: 14, mins: 336, kind: "Streaming", mal: null, q: "Monogatari Series: Off & Monster Season", color: "#f7f3e9",
               arcs: ["Tsukihi Undo", "Nadeko Draw", "The Beautiful Princess", "Acerola Bon Appétit", "Shinobu Mustard"], kanji: "怪", units: ["undo", "draw", "princess", "acerola", "mustard"] },
  ogre:      { title: "Wazamonogatari: Karen Ogre", jp: "業物語 かれんオウガ", year: 2026, eps: null, mins: 0, kind: "Upcoming · Winter", mal: null, q: "Monogatari Series: Off & Monster Season (Shin Episode)", color: "#c2410c",
               arcs: ["Karen Ogre"], kanji: "業", upcoming: true, units: ["ogre"] },
};

/* ---------- Watch orders ---------- */
window.ORDERS = {
  first: {
    label: "First-timer", jp: "初見",
    note: "Release order, but with the Kizumonogatari trilogy watched back-to-back. You get Bakemonogatari's mystery first and the origin story once you're hooked. (The 2024 recut, Koyomi Vamp, can stand in for the trilogy.)",
    list: ["bake","nise","nekokuro","nekoshiro","kabuki","otori","oni","koi","hana","tsuki","owari","kizu1","kizu2","kizu3","koyomi","owari2","zoku","oms","ogre"],
  },
  release: {
    label: "Release", jp: "放送順",
    note: "Exactly how Japan watched it. Note that Hanamonogatari was pulled out of the Second Season broadcast and aired on its own the following summer.",
    list: ["bake","nise","nekokuro","nekoshiro","kabuki","otori","oni","koi","hana","tsuki","owari","kizu1","koyomi","kizu2","kizu3","owari2","zoku","oms","ogre"],
  },
  chrono: {
    label: "Chronological", jp: "時系列",
    note: "Season-by-season approximation of the in-story order. Several seasons jump around internally, so for the exact day-by-day route, open the Calendar tab. A rewatch route, not a first watch.",
    list: ["kizu1","kizu2","kizu3","nekokuro","bake","nise","kabuki","oni","nekoshiro","otori","koi","tsuki","owari","koyomi","owari2","zoku","hana","oms","ogre"],
  },
  novel: {
    label: "Novel", jp: "刊行順",
    note: "The order Nisio Isin published the books. Kizumonogatari comes second here, the way readers first met it.",
    list: ["bake","kizu1","kizu2","kizu3","nise","nekokuro","nekoshiro","kabuki","hana","otori","oni","koi","tsuki","koyomi","owari","owari2","zoku","oms","ogre"],
  },
  calendar: {
    label: "Calendar", jp: "暦順", calendar: true,
    note: "Every arc, episode by episode, on Araragi's own calendar, from spring break of his third year to the April after graduation. Dates are the fan-reconstructed timeline (the novels rarely give them outright). Made for rewatchers: big reveals land out of order.",
  },
};

/* ---------- Calendar order: day by day on Araragi's calendar ----------
   Dates follow the fan-reconstructed timeline (Monogatari Wiki "Story Timeline"); the novels rarely
   state calendar dates outright, so they are derived from in-story clues (e.g. Mother's Day = May 14).
   y: 1 = Araragi's third year of high school, 2 = the year after.
   s / e: [year, month, day] start / end.  approx: [year, month, "label"] when only the month is known.
   lane: entries sharing a lane id happen at the same time (shown as parallel tracks).
   key: the ANIME entry this comes from.  color: optional override for the calendar swatch.  tok: arc tokens it unlocks.  mins: runtime. */
window.CALENDAR = [
  { id: "c-vamp",     arc: "Koyomi Vamp",       key: "kizu1",     tok: ["vamp1","vamp2","vamp3"], mins: 216, s: [1,3,25], e: [1,4,7],  where: "Kizumonogatari I–III (films), or the 2024 Koyomi Vamp recut", note: "Spring break" },
  { id: "c-k01",      arc: "Koyomi Stone",      key: "koyomi",    tok: ["k01"], mins: 12.5, s: [1,4,11], e: [1,4,12], where: "Koyomimonogatari, ep 1" },
  { id: "c-family",   arc: "Tsubasa Family",    key: "nekokuro",  tok: ["family"], mins: 96, s: [1,4,29], e: [1,5,7], where: "Nekomonogatari (Black), eps 1–4", note: "Golden Week" },
  { id: "c-crab",     arc: "Hitagi Crab",       key: "bake",      tok: ["crab"], mins: 48, s: [1,5,8], where: "Bakemonogatari, eps 1–2" },
  { id: "c-k02",      arc: "Koyomi Flower",     key: "koyomi",    tok: ["k02"], mins: 12.5, s: [1,5,9], e: [1,5,10], where: "Koyomimonogatari, ep 2" },
  { id: "c-snail",    arc: "Mayoi Snail",       key: "bake",      tok: ["snail"], mins: 72, s: [1,5,14], where: "Bakemonogatari, eps 3–5", note: "Mother's Day" },
  { id: "c-monkey",   arc: "Suruga Monkey",     key: "bake",      tok: ["monkey"], mins: 72, s: [1,5,23], e: [1,5,27], where: "Bakemonogatari, eps 6–8" },
  { id: "c-snake",    arc: "Nadeko Snake",      key: "bake",      tok: ["snake"], mins: 48, s: [1,6,11], e: [1,6,12], where: "Bakemonogatari, eps 9–10" },
  { id: "c-cat",      arc: "Tsubasa Cat",       key: "bake",      tok: ["cat"], mins: 120, s: [1,6,13], e: [1,6,16], where: "Bakemonogatari, eps 11–15" },
  { id: "c-k03",      arc: "Koyomi Sand",       key: "koyomi",    tok: ["k03"], mins: 12.5, approx: [1,6,"June"], where: "Koyomimonogatari, ep 3" },
  { id: "c-k04",      arc: "Koyomi Water",      key: "koyomi",    tok: ["k04"], mins: 12.5, approx: [1,7,"July"], where: "Koyomimonogatari, ep 4" },
  { id: "c-bee",      arc: "Karen Bee",         key: "nise",      tok: ["bee"], mins: 168, s: [1,7,29], e: [1,7,30], where: "Nisemonogatari, eps 1–7" },
  { id: "c-k05",      arc: "Koyomi Wind",       key: "koyomi",    tok: ["k05"], mins: 12.5, approx: [1,8,"August"], where: "Koyomimonogatari, ep 5" },
  { id: "c-phoenix",  arc: "Tsukihi Phoenix",   key: "nise",      tok: ["phoenix"], mins: 96, s: [1,8,14], where: "Nisemonogatari, eps 8–11" },
  { id: "c-jiangshi", arc: "Mayoi Jiangshi",    key: "kabuki",    tok: ["jiangshi"], mins: 96, s: [1,8,20], e: [1,8,21], lane: "aug", where: "Second Season · Kabukimonogatari, parts 1–4", note: "Includes a trip 11 years into the past" },
  { id: "c-time",     arc: "Shinobu Time",      key: "oni",       tok: ["time"], mins: 96, s: [1,8,21], e: [1,8,23], lane: "aug", where: "Second Season · Onimonogatari, parts 1–4" },
  { id: "c-mail", color: "#b08d57",     arc: "Shinobu Mail",      key: "owari",     tok: ["mail"], mins: 144, s: [1,8,23], e: [1,8,24], lane: "aug", where: "Owarimonogatari, eps 8–13" },
  { id: "c-tiger",    arc: "Tsubasa Tiger",     key: "nekoshiro", tok: ["tiger"], mins: 120, s: [1,8,21], e: [1,8,25], lane: "aug", where: "Second Season · Nekomonogatari (White), parts 1–5", note: "Narrated by Hanekawa" },
  { id: "c-k06",      arc: "Koyomi Tree",       key: "koyomi",    tok: ["k06"], mins: 12.5, approx: [1,9,"Late September"], where: "Koyomimonogatari, ep 6" },
  { id: "c-k07",      arc: "Koyomi Tea",        key: "koyomi",    tok: ["k07"], mins: 12.5, approx: [1,10,"A weekday in October"], where: "Koyomimonogatari, ep 7" },
  { id: "c-formula",  arc: "Ōgi Formula",       key: "owari",     tok: ["formula"], mins: 48, s: [1,10,23], where: "Owarimonogatari, eps 1–2" },
  { id: "c-riddle", color: "#6b7280",   arc: "Sodachi Riddle",    key: "owari",     tok: ["riddle"], mins: 48, s: [1,10,24], where: "Owarimonogatari, eps 3–4" },
  { id: "c-lost", color: "#9ca3af",     arc: "Sodachi Lost",      key: "owari",     tok: ["lost"], mins: 72, s: [1,10,25], where: "Owarimonogatari, eps 5–7" },
  { id: "c-medusa",   arc: "Nadeko Medusa",     key: "otori",     tok: ["medusa"], mins: 96, s: [1,10,31], e: [1,11,2], where: "Second Season · Otorimonogatari, parts 1–4", note: "Halloween" },
  { id: "c-k08",      arc: "Koyomi Mountain",   key: "koyomi",    tok: ["k08"], mins: 12.5, s: [1,11,1], where: "Koyomimonogatari, ep 8", note: "Happens in the middle of Nadeko Medusa" },
  { id: "c-k09",      arc: "Koyomi Torus",      key: "koyomi",    tok: ["k09"], mins: 12.5, approx: [1,12,"December"], where: "Koyomimonogatari, ep 9" },
  { id: "c-end",      arc: "Hitagi End",        key: "koi",       tok: ["end"], mins: 144, s: [2,1,1], e: [2,2,1], where: "Second Season · Koimonogatari, parts 1–6", note: "New Year's Day" },
  { id: "c-k10",      arc: "Koyomi Seed",       key: "koyomi",    tok: ["k10"], mins: 12.5, approx: [2,1,"Mid-January"], where: "Koyomimonogatari, ep 10", note: "Happens during Hitagi End" },
  { id: "c-doll",     arc: "Yotsugi Doll",      key: "tsuki",     tok: ["doll"], mins: 96, s: [2,2,13], e: [2,2,14], where: "Tsukimonogatari, eps 1–4" },
  { id: "c-k11",      arc: "Koyomi Nothing",    key: "koyomi",    tok: ["k11"], mins: 12.5, approx: [2,2,"Late February"], where: "Koyomimonogatari, ep 11" },
  { id: "c-k12",      arc: "Koyomi Dead",       key: "koyomi",    tok: ["k12"], mins: 12.5, s: [2,3,13], where: "Koyomimonogatari, ep 12" },
  { id: "c-hell", color: "#e8a33d",     arc: "Mayoi Hell",        key: "owari2",    tok: ["hell"], mins: 24, s: [2,3,13], where: "Owarimonogatari 2nd Season, ep 1", note: "Same day, right after Koyomi Dead" },
  { id: "c-rendezvous", color: "#7b2d8e", arc: "Hitagi Rendezvous", key: "owari2",  tok: ["rendezvous"], mins: 24, s: [2,3,14], where: "Owarimonogatari 2nd Season, ep 2" },
  { id: "c-dark", color: "#f4f1ea",     arc: "Ōgi Dark",          key: "owari2",    tok: ["dark"], mins: 120, s: [2,3,14], e: [2,3,15], where: "Owarimonogatari 2nd Season, eps 3–7" },
  { id: "c-reverse",  arc: "Koyomi Reverse",    key: "zoku",      tok: ["reverse"], mins: 144, s: [2,3,15], e: [2,3,18], where: "Zoku Owarimonogatari (film, or 6 TV parts)" },
  { id: "c-devil",    arc: "Suruga Devil",      key: "hana",      tok: ["devil"], mins: 120, s: [2,4,9], e: [2,4,21], where: "Hanamonogatari, eps 1–5", note: "Narrated by Kanbaru" },
  /* after graduation: undated */
  { id: "c-undo", color: "#ff7a1a",     arc: "Tsukihi Undo",      key: "oms", tok: ["undo"], mins: 24, after: true, where: "Off & Monster Season, ep 1" },
  { id: "c-draw", color: "#e86fa0",     arc: "Nadeko Draw",       key: "oms", tok: ["draw"], mins: 120, after: true, where: "Off & Monster Season, eps 2–6" },
  { id: "c-princess", color: "#8c0f12", arc: "The Beautiful Princess", key: "oms", tok: ["princess"], mins: 20, after: true, where: "Off & Monster Season, special (\"ep 6.5\")", note: "A fairy tale set 600 years earlier" },
  { id: "c-acerola", color: "#b3191e",  arc: "Acerola Bon Appétit", key: "oms", tok: ["acerola"], mins: 48, after: true, where: "Off & Monster Season, eps 7–8", note: "Set 600 years earlier" },
  { id: "c-mustard", color: "#f2c94c",  arc: "Shinobu Mustard",   key: "oms", tok: ["mustard"], mins: 144, after: true, where: "Off & Monster Season, eps 9–14", note: "Araragi in college" },
];
window.CAL_LANES = {
  aug: {
    title: "Late August: four arcs at once",
    jp: "同時進行",
    text: "These four arcs overlap. While Araragi is off in Kabukimonogatari and Onimonogatari, Hanekawa is living through Tsubasa Tiger across the same days, and Shinobu Mail lands in the middle. They're numbered in the most common fan sequence, but they all happen together.",
    days: [20, 25],
  },
};
/* Calendar years used only to lay out weekdays: in 2006 Mother's Day falls on May 14, matching the story. */
window.CAL_YEARS = { 1: 2006, 2: 2007 };

/* Novel-only progress stages, appended after the anime in every order */
window.NOVEL_STAGES = [
  { id: "n-off",     label: "Read Off Season (novel-only stories)" },
  { id: "n-monster", label: "Read Monster Season" },
  { id: "n-family",  label: "Read Family Season" },
];

/* ---------- The macro map: all 31 Japanese volumes ----------
   status per story: "anime" (adapted), "next" (announced), "novel" (novel-only)
   [title, status, where (anime key or novel stage), arc token that reveals the title] */
window.SEASONS = [
  { id: "first",   name: "First Season",   jp: "ファーストシーズン", color: "#e60012", en: true,
    vols: [
      { n: 1,  title: "Bakemonogatari (上)", jp: "化物語 上", year: 2006, stories: [["Hitagi Crab","anime","bake","crab"],["Mayoi Snail","anime","bake","snail"],["Suruga Monkey","anime","bake","monkey"]] },
      { n: 2,  title: "Bakemonogatari (下)", jp: "化物語 下", year: 2006, stories: [["Nadeko Snake","anime","bake","snake"],["Tsubasa Cat","anime","bake","cat"]] },
      { n: 3,  title: "Kizumonogatari", jp: "傷物語", year: 2008, stories: [["Koyomi Vamp","anime","kizu1","vamp1"]] },
      { n: 4,  title: "Nisemonogatari (上)", jp: "偽物語 上", year: 2008, stories: [["Karen Bee","anime","nise","bee"]] },
      { n: 5,  title: "Nisemonogatari (下)", jp: "偽物語 下", year: 2009, stories: [["Tsukihi Phoenix","anime","nise","phoenix"]] },
      { n: 6,  title: "Nekomonogatari (Black)", jp: "猫物語 黒", year: 2010, stories: [["Tsubasa Family","anime","nekokuro","family"]] },
    ]},
  { id: "second",  name: "Second Season",  jp: "セカンドシーズン", color: "#2f6fb5", en: true,
    vols: [
      { n: 7,  title: "Nekomonogatari (White)", jp: "猫物語 白", year: 2010, stories: [["Tsubasa Tiger","anime","nekoshiro","tiger"]] },
      { n: 8,  title: "Kabukimonogatari", jp: "傾物語", year: 2010, stories: [["Mayoi Jiangshi","anime","kabuki","jiangshi"]] },
      { n: 9,  title: "Hanamonogatari", jp: "花物語", year: 2011, stories: [["Suruga Devil","anime","hana","devil"]] },
      { n: 10, title: "Otorimonogatari", jp: "囮物語", year: 2011, stories: [["Nadeko Medusa","anime","otori","medusa"]] },
      { n: 11, title: "Onimonogatari", jp: "鬼物語", year: 2011, stories: [["Shinobu Time","anime","oni","time"]] },
      { n: 12, title: "Koimonogatari", jp: "恋物語", year: 2011, stories: [["Hitagi End","anime","koi","end"]] },
    ]},
  { id: "final",   name: "Final Season",   jp: "ファイナルシーズン", color: "#111111", en: true,
    vols: [
      { n: 13, title: "Tsukimonogatari", jp: "憑物語", year: 2012, stories: [["Yotsugi Doll","anime","tsuki","doll"]] },
      { n: 14, title: "Koyomimonogatari", jp: "暦物語", year: 2013, stories: [["Koyomi Stone → Koyomi Dead (12 shorts)","anime","koyomi","k01"]] },
      { n: 15, title: "Owarimonogatari (上)", jp: "終物語 上", year: 2013, stories: [["Ōgi Formula","anime","owari","formula"],["Sodachi Riddle","anime","owari","riddle"],["Sodachi Lost","anime","owari","lost"]] },
      { n: 16, title: "Owarimonogatari (中)", jp: "終物語 中", year: 2014, stories: [["Shinobu Mail","anime","owari","mail"]] },
      { n: 17, title: "Owarimonogatari (下)", jp: "終物語 下", year: 2014, stories: [["Mayoi Hell","anime","owari2","hell"],["Hitagi Rendezvous","anime","owari2","rendezvous"],["Ōgi Dark","anime","owari2","dark"]] },
      { n: 18, title: "Zoku Owarimonogatari", jp: "続・終物語", year: 2014, stories: [["Koyomi Reverse","anime","zoku","reverse"]] },
    ]},
  { id: "off",     name: "Off Season",     jp: "オフシーズン", color: "#c2410c", en: false,
    vols: [
      { n: 19, title: "Orokamonogatari", jp: "愚物語", year: 2015, stories: [["Sodachi Fiasco","novel","n-off"],["Suruga Bonehead","novel","n-off"],["Tsukihi Undo","anime","oms","undo"]] },
      { n: 20, title: "Wazamonogatari", jp: "業物語", year: 2016, stories: [["The Beautiful Princess (fairy tale)","novel","n-off"],["Acerola Bon Appétit","anime","oms","acerola"],["Karen Ogre","next","n-off","n-off"],["Tsubasa Sleeping","novel","n-off"]] },
      { n: 21, title: "Nademonogatari", jp: "撫物語", year: 2016, stories: [["Nadeko Draw","anime","oms","draw"]] },
      { n: 22, title: "Musubimonogatari", jp: "結物語", year: 2017, stories: [["Zenka Mermaid","novel","n-off"],["Nozomi Golem","novel","n-off"],["Mitome Wolf","novel","n-off"],["Tsuzura Human","novel","n-off"]] },
    ]},
  { id: "monster", name: "Monster Season", jp: "モンスターシーズン", color: "#5b3fa6", en: false,
    vols: [
      { n: 23, title: "Shinobumonogatari", jp: "忍物語", year: 2017, stories: [["Shinobu Mustard","anime","oms","mustard"]] },
      { n: 24, title: "Yoimonogatari", jp: "宵物語", year: 2018, stories: [["Mayoi Snail","novel","n-monster"],["Mayoi Snake","novel","n-monster"]] },
      { n: 25, title: "Amarimonogatari", jp: "余物語", year: 2019, stories: [["Yotsugi Buddy","novel","n-monster"],["Yotsugi Shadow","novel","n-monster"]] },
      { n: 26, title: "Ōgimonogatari", jp: "扇物語", year: 2020, stories: [["Ōgi Light","novel","n-monster"],["Ōgi Fright","novel","n-monster"]] },
      { n: 27, title: "Shinomonogatari (上)", jp: "死物語 上", year: 2021, stories: [["Shinobu Suicide","novel","n-monster"]] },
      { n: 28, title: "Shinomonogatari (下)", jp: "死物語 下", year: 2021, stories: [["Nadeko Around","novel","n-monster"]] },
    ]},
  { id: "family",  name: "Family Season",  jp: "ファミリーシーズン", color: "#3a7d44", en: false, ongoing: true,
    vols: [
      { n: 29, title: "Ikusamonogatari", jp: "戦物語", year: 2023, stories: [["Hitagi Honeymoon","novel","n-family"]] },
      { n: 30, title: "Tsugimonogatari", jp: "接物語", year: 2025, stories: [["Yotsugi Frank","novel","n-family"]] },
      { n: 31, title: "Torimonogatari", jp: "鳥物語", year: 2026, stories: [["Yotsugi Rebake","novel","n-family"]] },
    ]},
];

/* ---------- Oddity / arc index ---------- */
window.ODDITIES = [
  { arc: "Hitagi Crab", tok: "crab",    kanji: "蟹", oddity: "Heavy Stone Crab", jpOdd: "おもし蟹",   entry: "bake",      color: "#e60012", hook: "The class ghost weighs almost nothing. Literally." },
  { arc: "Mayoi Snail", tok: "snail",    kanji: "蝸", oddity: "Lost Cow",         jpOdd: "迷い牛",     entry: "bake",      color: "#e8a33d", hook: "Mother's Day, a park bench, and a girl who can't find her way." },
  { arc: "Suruga Monkey", tok: "monkey",  kanji: "猿", oddity: "Rainy Devil",      jpOdd: "レイニー・デヴィル", entry: "bake", color: "#4b6b8a", hook: "A wish, made with a borrowed hand." },
  { arc: "Nadeko Snake", tok: "snake",   kanji: "蛇", oddity: "Jagirinawa",       jpOdd: "蛇切縄",     entry: "bake",      color: "#e86fa0", hook: "A mountain shrine and a girl hiding under her bangs." },
  { arc: "Tsubasa Cat", tok: "cat",    kanji: "猫", oddity: "Sawari Neko",      jpOdd: "障り猫",     entry: "bake",      color: "#bcbcbc", hook: "The perfect class president has a Golden Week she won't remember." },
  { arc: "Koyomi Vamp", tok: "vamp1",    kanji: "血", oddity: "Vampire",          jpOdd: "吸血鬼",     entry: "kizu1",     color: "#8c0f12", hook: "Spring break. Something legendary is bleeding under a streetlight." },
  { arc: "Karen Bee", tok: "bee",      kanji: "蜂", oddity: "Enclosing Fire Bee", jpOdd: "囲い火蜂", entry: "nise",      color: "#f2b705", hook: "Teenage justice runs a fever, and a man in black is selling something." },
  { arc: "Tsukihi Phoenix", tok: "phoenix",kanji: "鳥", oddity: "Shide Bird",       jpOdd: "しでの鳥",   entry: "nise",      color: "#ff7a1a", hook: "The youngest sister, and what she has always been." },
  { arc: "Tsubasa Family", tok: "family", kanji: "家", oddity: "Black Hanekawa",   jpOdd: "ブラック羽川", entry: "nekokuro", color: "#9ca3af", hook: "Golden Week, from the inside." },
  { arc: "Tsubasa Tiger", tok: "tiger",  kanji: "虎", oddity: "Kako",             jpOdd: "苛虎",       entry: "nekoshiro", color: "#d9d4c7", hook: "Hanekawa narrates. Something is burning." },
  { arc: "Mayoi Jiangshi", tok: "jiangshi", kanji: "僵", oddity: "Jiangshi",         jpOdd: "キョンシー",  entry: "kabuki",    color: "#3a7d44", hook: "Summer homework, a trip back in time, and a ruined world." },
  { arc: "Nadeko Medusa", tok: "medusa",  kanji: "髪", oddity: "Medusa",           jpOdd: "メドゥーサ",  entry: "otori",     color: "#ff4fa3", hook: "The shyest girl in the series, cornered." },
  { arc: "Shinobu Time", tok: "time",   kanji: "闇", oddity: "Darkness",         jpOdd: "くらやみ",   entry: "oni",       color: "#5b3fa6", hook: "Shinobu finally tells her own story." },
  { arc: "Hitagi End", tok: "end",     kanji: "嘘", oddity: "A Liar",           jpOdd: "詐欺師",     entry: "koi",       color: "#8a8580", hook: "Narrated by someone you should not trust." },
  { arc: "Suruga Devil", tok: "devil",   kanji: "悪", oddity: "Devil",            jpOdd: "レイニー・デヴィル", entry: "hana", color: "#2f6fb5", hook: "Kanbaru's last year, and her left arm's last wish." },
  { arc: "Yotsugi Doll", tok: "doll",   kanji: "鏡", oddity: "Shikigami",        jpOdd: "式神",       entry: "tsuki",     color: "#8fb8de", hook: "Araragi stops showing up in mirrors." },
  { arc: "Ōgi Formula", tok: "formula",    kanji: "扇", oddity: "A Locked Classroom", jpOdd: "教室",         entry: "owari",     color: "#cfcac0", hook: "A classroom with no way out, and a new transfer student." },
  { arc: "Koyomi Reverse", tok: "reverse", kanji: "反", oddity: "Mirror World",     jpOdd: "鏡の国",     entry: "zoku",      color: "#7aa6c2", hook: "A world where everyone is a little bit flipped." },
];

/* ---------- Characters ----------
   mal: name as MyAnimeList lists it (Last, First), used to find the portrait.
   meet: any of these arc tokens reveals the character. odd: oddity, revealed with oddUnlock. */
window.CHARACTERS = [
  { id: "koyomi",  name: "Koyomi Araragi",     mal: "Araragi, Koyomi",     meet: ["crab","vamp1"], odd: "Vampire (mostly ex-)", oddUnlock: ["crab","vamp1"],
    blurb: "Third-year, narrator, and a boy who cannot stop helping people. A little bit of a vampire.", color: "#e60012" },
  { id: "hitagi",  name: "Hitagi Senjōgahara", mal: "Senjougahara, Hitagi", meet: ["crab"], odd: "Heavy Stone Crab", oddUnlock: ["crab"],
    blurb: "The sickly girl at the back of class. Carries stationery like a weapon, and uses it like one.", color: "#7b2d8e" },
  { id: "tsubasa", name: "Tsubasa Hanekawa",   mal: "Hanekawa, Tsubasa",   meet: ["crab","vamp1"], odd: "Sawari Neko", oddUnlock: ["cat","family"],
    blurb: "Class president among class presidents. She doesn't know everything, only what she knows.", color: "#d9d4c7" },
  { id: "mayoi",   name: "Mayoi Hachikuji",    mal: "Hachikuji, Mayoi",    meet: ["snail"], odd: "Lost Cow", oddUnlock: ["snail"],
    blurb: "A fifth-grader with an enormous backpack who has been lost for a while. Will bite. Will misname you.", color: "#e8a33d" },
  { id: "suruga",  name: "Suruga Kanbaru",     mal: "Kanbaru, Suruga",     meet: ["monkey"], odd: "Rainy Devil", oddUnlock: ["monkey"],
    blurb: "Basketball star, Hitagi's junior, keeps her left arm wrapped. Very loud, very forward.", color: "#4b6b8a" },
  { id: "nadeko",  name: "Nadeko Sengoku",     mal: "Sengoku, Nadeko",     meet: ["snake"], odd: "Jagirinawa", oddUnlock: ["snake"],
    blurb: "A shy middle schooler, friend of Araragi's sisters, who hides behind her bangs and her hat.", color: "#e86fa0" },
  { id: "shinobu", name: "Shinobu Oshino",     mal: "Oshino, Shinobu",     meet: ["crab","vamp1"], odd: "Vampire", oddUnlock: ["crab","vamp1"],
    blurb: "A blonde girl who lives in an abandoned cram school and won't speak a word. Loves donuts.", color: "#f2c94c" },
  { id: "meme",    name: "Meme Oshino",        mal: "Oshino, Meme",        meet: ["crab","vamp1"], odd: "Specialist", oddUnlock: ["crab","vamp1"],
    blurb: "Aloha shirt, no fixed address, expert in oddities. He'll help, but you save yourself.", color: "#3a7d44" },
  { id: "karen",   name: "Karen Araragi",      mal: "Araragi, Karen",      meet: ["bee"], odd: "Enclosing Fire Bee", oddUnlock: ["bee"],
    blurb: "Elder little sister, martial artist, one half of the Fire Sisters of Justice.", color: "#f2b705" },
  { id: "tsukihi", name: "Tsukihi Araragi",    mal: "Araragi, Tsukihi",    meet: ["bee"], odd: "Shide Bird", oddUnlock: ["phoenix"],
    blurb: "Younger little sister, the brains of the Fire Sisters, changes hairstyles by the scene.", color: "#ff7a1a" },
  { id: "kaiki",   name: "Deishū Kaiki",       mal: "Kaiki, Deishuu",      meet: ["bee"], odd: "Con man", oddUnlock: ["bee"],
    blurb: "Dressed for a funeral, every day. Says he's a fake. Believes in money.", color: "#2b2b2b" },
  { id: "yotsugi", name: "Yotsugi Ononoki",    mal: "Ononoki, Yotsugi",    meet: ["phoenix"], odd: "Shikigami", oddUnlock: ["doll"],
    blurb: "Expressionless, monotone, makes a peace sign. Hits extremely hard.", color: "#8fb8de" },
  { id: "kagenui", name: "Yozuru Kagenui",     mal: "Kagenui, Yozuru",     meet: ["phoenix"], odd: "Specialist", oddUnlock: ["phoenix"],
    blurb: "A specialist in immortal oddities who refuses to walk on the ground.", color: "#c2410c" },
  { id: "rouka",   name: "Rōka Numachi",       mal: "Numachi, Rouka",      meet: ["devil"], odd: "Collector", oddUnlock: ["devil"],
    blurb: "Kanbaru's old court rival, back in town and taking on other people's misfortunes.", color: "#2f6fb5" },
  { id: "ougi",    name: "Ōgi Oshino",         mal: "Oshino, Ougi",        meet: ["formula"], odd: "???", oddUnlock: ["dark"],
    blurb: "A transfer student who smiles too much and insists that you know nothing.", color: "#111111" },
  { id: "sodachi", name: "Sodachi Oikura",     mal: "Oikura, Sodachi",     meet: ["riddle"], odd: "None", oddUnlock: ["riddle"],
    blurb: "A former classmate who hates Araragi with total, mathematical certainty.", color: "#6b7280" },
  { id: "gaen",    name: "Izuko Gaen",         mal: "Gaen, Izuko",         meet: ["mail"], odd: "Knows everything", oddUnlock: ["mail"],
    blurb: "The specialist's specialist. She knows everything, and she'll tell you so.", color: "#a16207" },
];

/* Relationship web edges: [a, b, label, unlock(any of)] */
window.EDGES = [
  ["koyomi","hitagi","girlfriend",["crab"]],
  ["koyomi","tsubasa","the friend he owes everything",["crab","vamp1"]],
  ["koyomi","shinobu","bound by blood",["crab","vamp1"]],
  ["koyomi","mayoi","bickering best buds",["snail"]],
  ["koyomi","nadeko","sisters' childhood friend",["snake"]],
  ["koyomi","meme","his specialist",["crab","vamp1"]],
  ["meme","shinobu","keeps her in the cram school",["crab"]],
  ["hitagi","suruga","middle-school senior & junior",["monkey"]],
  ["koyomi","karen","little sister",["bee"]],
  ["koyomi","tsukihi","little sister",["bee"]],
  ["karen","tsukihi","Fire Sisters",["bee"]],
  ["hitagi","kaiki","the con man from her past",["bee"]],
  ["kagenui","yotsugi","partners",["phoenix"]],
  ["tsukihi","yotsugi","under her watch",["doll"]],
  ["kaiki","nadeko","the job",["end"]],
  ["suruga","rouka","old rivals",["devil"]],
  ["koyomi","sodachi","old classmate",["riddle"]],
  ["suruga","ougi","Kanbaru's junior",["formula"]],
  ["koyomi","ougi","???",["dark"]],
  ["gaen","meme","same college club",["dark"]],
  ["gaen","kaiki","same college club",["dark"]],
  ["gaen","kagenui","same college club",["dark"]],
  ["nadeko","yotsugi","a new duo",["draw"]],
];

/* ---------- Quiz: Which oddity are you? ---------- */
window.QUIZ = [
  { q: "Someone asks you for help with something you can't fix.", a: [
      ["You help anyway, at your own expense.", { vamp: 2, bee: 1 }],
      ["You tell them plainly that they'll have to save themselves.", { crab: 2 }],
      ["You quietly do it, perfectly, and never mention it.", { cat: 2 }],
      ["You get lost on the way there.", { snail: 2 }] ] },
  { q: "Your ideal Saturday:", a: [
      ["Training until your legs give out.", { monkey: 2, bee: 1 }],
      ["Drawing alone in your room. Do not knock.", { snake: 2 }],
      ["Reading every book in the library, in order.", { cat: 2 }],
      ["Wandering a neighborhood you've never walked.", { snail: 2, phoenix: 1 }] ] },
  { q: "Pick an object.", a: [
      ["A stapler.", { crab: 2 }],
      ["A giant backpack.", { snail: 2 }],
      ["A bandaged left arm.", { monkey: 2 }],
      ["A box of donuts.", { vamp: 2 }] ] },
  { q: "The thing you're most afraid people will see:", a: [
      ["How much you actually want.", { monkey: 2, snake: 1 }],
      ["That you've already been hurt.", { crab: 2 }],
      ["Your darker half.", { cat: 2 }],
      ["That you'd come back no matter what.", { phoenix: 2, vamp: 1 }] ] },
  { q: "In a group project you are…", a: [
      ["The one who decides what's right.", { bee: 2 }],
      ["The one everyone underestimates.", { snake: 2, phoenix: 1 }],
      ["The one who carries it all.", { cat: 1, vamp: 2 }],
      ["The one cracking jokes in the margins.", { snail: 2 }] ] },
];
window.QUIZ_RESULTS = {
  crab:    { arc: "Hitagi Crab",     kanji: "蟹", text: "You've set something heavy down and decided not to pick it back up. Sharp exterior, honest underneath. You'd rather be blunt than be lied to." },
  snail:   { arc: "Mayoi Snail",     kanji: "蝸", text: "Playful, quick, and always somewhere slightly off the map. You make strangers feel like old friends, and you misremember their names on purpose." },
  monkey:  { arc: "Suruga Monkey",   kanji: "猿", text: "Fast, bold, and driven by wants you'd never say out loud. Careful what you wish for. You already know the rest." },
  snake:   { arc: "Nadeko Snake",    kanji: "蛇", text: "Quiet, underestimated, and harboring a whole inner world. When you finally say what you want, it will be enormous." },
  cat:     { arc: "Tsubasa Cat",     kanji: "猫", text: "Capable, composed, and carrying more than anyone knows. You don't know everything. Just what you know." },
  bee:     { arc: "Karen Bee",       kanji: "蜂", text: "You run hot on justice. You'll fight for anyone, sometimes before you know who's right. Fever optional." },
  phoenix: { arc: "Tsukihi Phoenix", kanji: "鳥", text: "Resilient to a fault. Whatever happens, you come back, a little changed, and rarely the way anyone expected." },
  vamp:    { arc: "Koyomi Vamp",     kanji: "血", text: "You'd give anything to help, including pieces of yourself. Generous, reckless, and very bad at accepting thanks." },
};

/* ---------- Hanekawa FAQ ---------- */
window.FAQ = [
  ["Where do I start?", "Bakemonogatari. Every route in this guide begins there except the Chronological and Calendar orders, which are rewatch routes."],
  ["Do I have to watch Kizumonogatari before Nisemonogatari?", "No. Bakemonogatari drops hints about spring break on purpose. Watching the films after Bake or Nise is the most popular choice; watching them first trades mystery for clarity."],
  ["Can I skip Koyomimonogatari?", "You can, but don't. The twelve shorts are light, and a couple of them set up things that matter in Owarimonogatari."],
  ["Is the anime finished?", "The main story is fully animated through Zoku Owarimonogatari. Everything after it, Off, Monster, and Family Season, is partially animated or novel-only, and the next anime arc, Karen Ogre, is announced for winter."],
  ["Can I read the books in English?", "Officially, through Zoku Owarimonogatari (the end of the main story). Off Season onward has no official English release yet."],
  ["What's the deal with the flashing text?", "That's Shaft's signature style, frames of text that flicker by too fast to read. Pause and read them; they're often jokes. On this page, you can turn them off in the top bar."],
];

/* ---------- Ōgi's corner (gated) ---------- */
window.OUGI = [
  { unlock: ["formula"], q: "Why does a transfer student keep turning up wherever Araragi has a doubt?" },
  { unlock: ["formula"], q: "Count the people who have ever actually seen Ōgi and someone else in the same room." },
  { unlock: ["dark"], q: "\"I don't know anything. You're the one who knows.\" Who is the line really for?" },
  { unlock: ["reverse"], q: "Zoku Owarimonogatari flips everyone. Who stays exactly the same?" },
  { unlock: ["n-monster"], q: "Ōgimonogatari puts her name on the cover. What changes when she's the subject instead of the question?" },
];
