/* ==================================================================
   Shared helpers: login guard, avatar, sounds, scores, small utils.
   ================================================================== */
(function () {
  var CFG = window.GAME_CONFIG || {};
  var SESSION_KEY = "eg_logged_in";

  /* ---------- login ---------- */
  var Auth = {
    check: function (typed) {
      var expected = "";
      try { expected = atob(CFG.passwordHash || ""); } catch (e) { expected = ""; }
      return typed.trim().toLowerCase() === expected.toLowerCase();
    },
    login: function () { sessionStorage.setItem(SESSION_KEY, "yes"); },
    logout: function () { sessionStorage.removeItem(SESSION_KEY); location.href = "index.html"; },
    isLoggedIn: function () { return sessionStorage.getItem(SESSION_KEY) === "yes"; },
    // Call at the top of every page that needs a password.
    guard: function () {
      if (!Auth.isLoggedIn()) { location.replace("index.html"); }
    }
  };

  /* ---------- sound (no audio files needed) ---------- */
  var actx = null;
  function tone(freq, start, dur, type) {
    if (!actx) return;
    var osc = actx.createOscillator();
    var gain = actx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, actx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.25, actx.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + start + dur);
    osc.connect(gain).connect(actx.destination);
    osc.start(actx.currentTime + start);
    osc.stop(actx.currentTime + start + dur + 0.02);
  }

  var Sound = {
    init: function () {
      if (actx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) actx = new AC();
    },
    good: function () { Sound.init(); tone(660, 0, 0.12); tone(880, 0.1, 0.18); },
    bad: function () { Sound.init(); tone(220, 0, 0.22, "square"); },
    win: function () { Sound.init(); [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.2); }); }
  };

  /* ---------- speak an English word ---------- */
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.85;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ---------- best scores in localStorage ---------- */
  var Scores = {
    key: function (game) { return "eg_best_" + game; },
    get: function (game) { return parseInt(localStorage.getItem(Scores.key(game)) || "0", 10); },
    save: function (game, score) {
      if (score > Scores.get(game)) { localStorage.setItem(Scores.key(game), String(score)); return true; }
      return false;
    }
  };

  /* ---------- utils ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickSome(arr, n, exclude) {
    return shuffle(arr.filter(function (x) { return x !== exclude; })).slice(0, n);
  }

  /* ---------- header ---------- */
  function buildTopbar(title, subtitle, backHref) {
    var bar = document.querySelector(".topbar");
    if (!bar) return;
    var img = '<img class="avatar" src="' + (CFG.avatar || "") + '" alt="' + (CFG.playerName || "Player") +
      '" onerror="this.outerHTML=\'<div class=&quot;avatar&quot;>' + (CFG.avatarFallback || "🙂") + '</div>\'">';
    bar.innerHTML =
      img +
      '<h1>' + title + '<small>' + subtitle + '</small></h1>' +
      (backHref ? '<a class="btn ghost" href="' + backHref + '">← Back</a>' : "") +
      '<button class="btn red" id="logoutBtn">Log out</button>';
    var lo = document.getElementById("logoutBtn");
    if (lo) lo.addEventListener("click", Auth.logout);
  }

  window.EG = {
    cfg: CFG,
    Auth: Auth,
    Sound: Sound,
    Scores: Scores,
    speak: speak,
    shuffle: shuffle,
    pickSome: pickSome,
    buildTopbar: buildTopbar
  };
})();
