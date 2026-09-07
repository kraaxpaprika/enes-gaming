/* ==================================================================
   Shared helpers: login guard, header, mascot, sounds, confetti.
   ================================================================== */
(function () {
  var CFG = window.GAME_CONFIG || {};
  var SESSION_KEY = "eg_logged_in";

  /* ---------- login ---------- */
  var Auth = {
    check: function (typed) {
      var expected = "";
      try { expected = atob(CFG.passwordHash || ""); } catch (e) { expected = ""; }
      return String(typed).trim().toLowerCase() === expected.toLowerCase();
    },
    login: function () { sessionStorage.setItem(SESSION_KEY, "yes"); },
    logout: function () { sessionStorage.removeItem(SESSION_KEY); location.href = "index.html"; },
    isLoggedIn: function () { return sessionStorage.getItem(SESSION_KEY) === "yes"; },
    guard: function () { if (!Auth.isLoggedIn()) location.replace("index.html"); }
  };

  /* ---------- sound (generated, no audio files) ---------- */
  var actx = null;
  function tone(freq, start, dur, type) {
    if (!actx) return;
    var osc = actx.createOscillator(), gain = actx.createGain();
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
      if (actx) { if (actx.state === "suspended") actx.resume(); return; }
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) actx = new AC();
    },
    good: function () { Sound.init(); tone(660, 0, 0.12); tone(880, 0.1, 0.18); },
    bad: function () { Sound.init(); tone(220, 0, 0.22, "square"); },
    win: function () { Sound.init(); [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.22); }); }
  };

  /* ---------- speech ---------- */
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ---------- best score shortcut (kept for compatibility) ---------- */
  var Scores = {
    get: function (game) { var g = window.EGStats && EGStats.all().games[game]; return g ? g.best : 0; }
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
    var img = document.createElement("img");
    img.className = "avatar";
    img.src = CFG.avatar || CFG.mascot;
    img.alt = CFG.playerName || "Player";
    img.addEventListener("error", function () { img.src = CFG.mascot; img.style.objectPosition = "50% 20%"; });

    var h = document.createElement("h1");
    h.innerHTML = title + "<small>" + subtitle + "</small>";

    bar.innerHTML = "";
    bar.appendChild(img);
    bar.appendChild(h);

    if (backHref) {
      var a = document.createElement("a");
      a.className = "btn ghost"; a.href = backHref; a.textContent = "← Back";
      bar.appendChild(a);
    }
    var out = document.createElement("button");
    out.className = "btn red"; out.textContent = "Log out";
    out.addEventListener("click", Auth.logout);
    bar.appendChild(out);
  }

  /* ---------- mascot reactions ---------- */
  var LINES = {
    good: ["Nice one!", "You got it! 🎉", "Super!", "Well done!", "Brilliant!", "Keep going!"],
    bad: ["Almost!", "Try again!", "No worries 💪", "Next one is yours!"],
    idle: ["Let's learn!", "Ready?", "You can do it!"]
  };

  function react(mood, customText) {
    var m = document.getElementById("mascot");
    var s = document.getElementById("speech");
    if (m) {
      m.classList.remove("cheer", "sad");
      void m.offsetWidth; // restart the animation
      if (mood === "good") m.classList.add("cheer");
      if (mood === "bad") m.classList.add("sad");
    }
    if (s) {
      var pool = LINES[mood] || LINES.idle;
      s.textContent = customText || pool[Math.floor(Math.random() * pool.length)];
    }
  }

  /* ---------- confetti ---------- */
  function confetti(count) {
    var cv = document.getElementById("confetti");
    if (!cv) { cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv); }
    var ctx = cv.getContext("2d");
    cv.width = window.innerWidth; cv.height = window.innerHeight;

    var colors = ["#e30a17", "#ffc531", "#22b573", "#2f6fe4", "#7b5cf0", "#ff8a3d"];
    var bits = [];
    for (var i = 0; i < (count || 90); i++) {
      bits.push({
        x: Math.random() * cv.width,
        y: -20 - Math.random() * cv.height * 0.5,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 10,
        vy: 2 + Math.random() * 3.5,
        vx: -1.4 + Math.random() * 2.8,
        rot: Math.random() * Math.PI,
        vr: -0.12 + Math.random() * 0.24,
        c: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    var frames = 0;
    (function draw() {
      frames++;
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(function (b) {
        b.x += b.vx; b.y += b.vy; b.rot += b.vr;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.c;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
      });
      if (frames < 220) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  /* ---------- live timer for the HUD ---------- */
  function startTimer(elId) {
    var el = document.getElementById(elId);
    if (!el) return function () {};
    var t0 = Date.now();
    var iv = setInterval(function () {
      var s = Math.floor((Date.now() - t0) / 1000);
      el.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    }, 1000);
    return function stop() { clearInterval(iv); return Date.now() - t0; };
  }

  window.EG = {
    cfg: CFG, Auth: Auth, Sound: Sound, Scores: Scores,
    speak: speak, shuffle: shuffle, pickSome: pickSome,
    buildTopbar: buildTopbar, react: react, confetti: confetti, startTimer: startTimer
  };
})();
