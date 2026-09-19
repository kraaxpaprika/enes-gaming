/* ==================================================================
   Progress tracking: scores, play time, accuracy, streaks, badges.
   Everything is stored in the browser (localStorage) on this device.
   ================================================================== */
(function () {
  var BASE_KEY = "eg_stats_v1";          // the old single-profile key
  var LEGACY_PLAYER = "ortak";           // where that old data now lives
  var HEARTBEAT_MS = 5000;   // how often play time is written down
  var MAX_HISTORY = 60;      // how many finished games we remember

  var GAMES = {
    word: { name: "Word Safari", emoji: "🦁", href: "word-safari.html" },
    flag: { name: "Flag Hunt", emoji: "🚩", href: "flag-hunt.html" },
    map:  { name: "Map Explorer", emoji: "🌍", href: "map-explorer.html" },
    turkey: { name: "Türkiye Explorer", emoji: "🗺️", href: "turkey-provinces.html" },
    math: { name: "Matematik", emoji: "➕", href: "matematik.html" },
    kelime: { name: "Kelime Tamamlama", emoji: "🔤", href: "kelime.html" },
    proje: { name: "Proje Çocuk", emoji: "🌟", href: "proje-cocuk.html" },
    futbol: { name: "Futbol Kulüpleri", emoji: "⚽", href: "futbol.html" }
  };

  var SCHEMA = 2;   // bump this when the shape of the saved JSON changes

  /* ---------- which player's file we are reading and writing ---------- */
  var playerId = "";
  try { playerId = localStorage.getItem("eg_player") || ""; } catch (e) { playerId = ""; }

  function keyFor(id) { return BASE_KEY + "__" + (id || "ortak"); }
  function KEY() { return keyFor(playerId); }

  /* The very first version of the site kept one shared file. Move it to its
     own "ortak" player so nothing is lost when profiles were introduced. */
  (function moveLegacyFile() {
    try {
      var old = localStorage.getItem(BASE_KEY);
      if (!old) return;
      if (!localStorage.getItem(keyFor(LEGACY_PLAYER))) {
        localStorage.setItem(keyFor(LEGACY_PLAYER), old);
      }
      localStorage.removeItem(BASE_KEY);
    } catch (e) { /* blocked */ }
  })();

  function blank() {
    return { v: SCHEMA, player: playerId, games: {}, history: [], days: {}, firstPlay: null };
  }

  /* Bring an older saved file up to the current shape. */
  function migrate(d) {
    if (!d.v) d.v = 1;                  // v0 files had the same fields, just no version
    if (d.v === 1) { d.v = 2; }         // v2 only changed where the file is stored
    // future migrations go here:
    // if (d.v === 2) { ...; d.v = 3; }
    return d;
  }

  function load(id) {
    try {
      var raw = localStorage.getItem(id ? keyFor(id) : KEY());
      var d = raw ? JSON.parse(raw) : blank();
      if (!d.games) d.games = {};
      if (!d.history) d.history = [];
      if (!d.days) d.days = {};
      return migrate(d);
    } catch (e) { return blank(); }
  }

  function save(d) {
    try { localStorage.setItem(KEY(), JSON.stringify(d)); } catch (e) { /* full or blocked */ }
  }

  function gameRow(d, key) {
    if (!d.games[key]) {
      d.games[key] = { plays: 0, best: 0, totalScore: 0, correct: 0, wrong: 0, timeMs: 0, lastPlayed: null };
    }
    return d.games[key];
  }

  function today() { return new Date().toISOString().slice(0, 10); }

  /* ---------- live session ---------- */
  var session = null; // { key, startedAt, lastTick, correct, wrong }

  function flushTime() {
    if (!session) return;
    var now = Date.now();
    var delta = now - session.lastTick;
    session.lastTick = now;
    if (delta <= 0 || delta > 60000) return; // tab was asleep - do not count it
    var d = load();
    gameRow(d, session.key).timeMs += delta;
    d.days[today()] = (d.days[today()] || 0) + delta;
    if (!d.firstPlay) d.firstPlay = today();
    save(d);
  }

  var timer = null;

  var Stats = {
    GAMES: GAMES,

    /* point every read and write at one player's file */
    usePlayer: function (id) { if (id && id !== playerId) { playerId = id; } },
    player: function () { return playerId; },

    /* every player who has a saved file, plus the ones set up in config.
       This is what the grown-up dashboard uses: who played, how long, when. */
    everyone: function () {
      var cfgPlayers = ((window.GAME_CONFIG || {}).players || []).slice();
      var known = {};
      cfgPlayers.forEach(function (p) { known[p.id] = true; });

      /* files that exist but are not in the config any more (e.g. "ortak") */
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(BASE_KEY + "__") === 0) {
            var id = k.slice((BASE_KEY + "__").length);
            if (!known[id]) {
              known[id] = true;
              cfgPlayers.push({ id: id, name: id === LEGACY_PLAYER ? "Eski kayıt" : id, emoji: "👤" });
            }
          }
        }
      } catch (e) { /* blocked */ }

      return cfgPlayers.map(function (p) {
        var d = load(p.id);
        var timeMs = 0, plays = 0, points = 0, correct = 0, wrong = 0;
        Object.keys(d.games).forEach(function (k) {
          var g = d.games[k];
          timeMs += g.timeMs; plays += g.plays; points += g.totalScore;
          correct += g.correct; wrong += g.wrong;
        });
        var last = null;
        Object.keys(d.games).forEach(function (k) {
          var lp = d.games[k].lastPlayed;
          if (lp && (!last || lp > last)) last = lp;
        });
        return {
          id: p.id, name: p.name, emoji: p.emoji,
          timeMs: timeMs, plays: plays, points: points,
          accuracy: (correct + wrong) ? Math.round(correct / (correct + wrong) * 100) : 0,
          lastPlayed: last,
          days: d.days || {},
          games: d.games || {}
        };
      }).sort(function (a, b) { return b.timeMs - a.timeMs; });
    },

    /* call once when a game screen opens */
    beginSession: function (key) {
      session = { key: key, startedAt: Date.now(), lastTick: Date.now(), correct: 0, wrong: 0 };
      if (timer) clearInterval(timer);
      timer = setInterval(flushTime, HEARTBEAT_MS);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) { flushTime(); }
        else if (session) { session.lastTick = Date.now(); }
      });
      window.addEventListener("pagehide", flushTime);
      window.addEventListener("beforeunload", flushTime);
    },

    /* call on every answer */
    answer: function (isCorrect) {
      if (!session) return;
      if (isCorrect) session.correct++; else session.wrong++;
    },

    /* call when a round of 10 questions is finished */
    finishRound: function (key, score, questions) {
      flushTime();
      var d = load();
      var g = gameRow(d, key);
      var c = session ? session.correct : 0;
      var w = session ? session.wrong : 0;

      g.plays++;
      g.totalScore += score;
      g.correct += c;
      g.wrong += w;
      g.lastPlayed = new Date().toISOString();
      var isBest = score > g.best;
      if (isBest) g.best = score;

      d.history.unshift({
        game: key,
        score: score,
        questions: questions,
        correct: c,
        at: new Date().toISOString()
      });
      d.history = d.history.slice(0, MAX_HISTORY);
      if (!d.firstPlay) d.firstPlay = today();
      save(d);

      if (session) { session.correct = 0; session.wrong = 0; }
      return isBest;
    },

    all: function () { return load(); },

    reset: function () { try { localStorage.removeItem(KEY()); } catch (e) {} },

    /* replace everything with a downloaded backup file */
    importJSON: function (text) {
      try {
        var d = JSON.parse(text);
        if (!d || typeof d !== "object" || !d.games || !Array.isArray(d.history)) return false;
        save(migrate(d));
        return true;
      } catch (e) { return false; }
    },

    /* ---------- derived numbers ---------- */
    totals: function () {
      var d = load(), t = { plays: 0, timeMs: 0, correct: 0, wrong: 0, points: 0 };
      Object.keys(d.games).forEach(function (k) {
        var g = d.games[k];
        t.plays += g.plays; t.timeMs += g.timeMs;
        t.correct += g.correct; t.wrong += g.wrong; t.points += g.totalScore;
      });
      t.accuracy = (t.correct + t.wrong) ? Math.round(t.correct / (t.correct + t.wrong) * 100) : 0;
      return t;
    },

    /* last N days of play time, oldest first */
    lastDays: function (n) {
      var d = load(), out = [];
      for (var i = n - 1; i >= 0; i--) {
        var day = new Date();
        day.setDate(day.getDate() - i);
        var iso = day.toISOString().slice(0, 10);
        out.push({ iso: iso, label: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day.getDay()], ms: d.days[iso] || 0 });
      }
      return out;
    },

    /* how many days in a row he has played, counting back from today */
    streak: function () {
      var d = load(), n = 0, day = new Date();
      // allow the streak to still be alive if today has not started yet
      if (!d.days[day.toISOString().slice(0, 10)]) day.setDate(day.getDate() - 1);
      while (d.days[day.toISOString().slice(0, 10)]) { n++; day.setDate(day.getDate() - 1); }
      return n;
    },

    badges: function () {
      var d = load(), t = Stats.totals(), s = Stats.streak();
      var mins = t.timeMs / 60000;
      var list = [
        { emoji: "🌱", name: "First Steps", desc: "Finish your first game", done: t.plays >= 1 },
        { emoji: "🔟", name: "Ten Rounds", desc: "Finish 10 games", done: t.plays >= 10 },
        { emoji: "🎯", name: "Sharp Shooter", desc: "Reach 80% accuracy (min. 30 answers)", done: t.accuracy >= 80 && (t.correct + t.wrong) >= 30 },
        { emoji: "💯", name: "Perfect Round", desc: "Score 100 in any game", done: d.history.some(function (h) { return h.score >= 100; }) },
        { emoji: "⏱️", name: "Half Hour Hero", desc: "Play for 30 minutes in total", done: mins >= 30 },
        { emoji: "🔥", name: "3 Day Streak", desc: "Play 3 days in a row", done: s >= 3 },
        { emoji: "🗺️", name: "World Traveller", desc: "Try every game at least once", done: Object.keys(GAMES).every(function (k) { return d.games[k] && d.games[k].plays > 0; }) },
        { emoji: "🏆", name: "Champion", desc: "Collect 1000 points in total", done: t.points >= 1000 }
      ];
      return list;
    },

    /* ---------- formatting ---------- */
    fmtTime: function (ms) {
      var s = Math.round(ms / 1000);
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      if (h) return h + "h " + m + "m";
      if (m) return m + "m " + sec + "s";
      return sec + "s";
    },

    fmtDate: function (iso) {
      var d = new Date(iso);
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + " " +
             d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    }
  };

  window.EGStats = Stats;
})();
