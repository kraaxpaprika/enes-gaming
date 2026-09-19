# Enes & Fatih Mert Gaming 🎮

A learning site for a 7-year-old: English vocabulary and world geography.
Pure static HTML/CSS/JS — no build step, no framework, no server.

## Games

| Game | What it teaches |
|---|---|
| 🦁 **Word Safari** | English vocabulary — picture → word, spoken out loud |
| 🚩 **Flag Hunt** | Flags, countries and capital cities |
| 🌍 **Map Explorer** | Continents and countries on a real world map |
| 🇹🇷 **Türkiye Explorer** | All 81 provinces on a real map of Türkiye |
| ➕ **Matematik** (TR) | Addition and subtraction, 1/2/3-digit levels — Turkish interface |
| 🔤 **Kelime Tamamlama** (TR) | Fill the missing letters of a Turkish word by drag & drop |
| 🌟 **Proje Çocuk** (TR) | A one-file endless runner: run, jump, collect — a gentle satire of over-scheduled childhood |
| ⚽ **Futbol Kulüpleri** (TR) | Guess the football club from its crest — Süper Lig, Premier League, Serie A, La Liga |
| 📊 **My Progress** | Scores, play time, streaks, badges, history, and the per-player table |

## Players

The start page asks **"Kim oynuyor?"** and the child picks a profile. The list
lives in `players` in [`assets/js/config.js`](assets/js/config.js):

```js
players: [
  { id: "enes",  name: "Enes",       emoji: "🦁" },
  { id: "fatih", name: "Fatih Mert", emoji: "🐯" },
  { id: "yegen", name: "Yeğenim",    emoji: "🐣" }
]
```

Every profile gets its own progress file, so scores and play time never mix. The chosen profile
is remembered on the device; the chip in the header switches it. **My Progress** opens with a
*Tüm oyuncular / All players* table — who played, total time, time today, games and accuracy —
which is the "who played how much" view.

## Progress data

There is no server and no database — progress is a **JSON document per player in the browser's
localStorage** (key `eg_stats_v1__<playerId>`, e.g. `eg_stats_v1__enes`), on that device only.
The old single-profile file (`eg_stats_v1`) is moved to `eg_stats_v1__ortak` automatically the
first time the new version runs, and shows up as *Eski kayıt* in the table.

```jsonc
{
  "v": 2,                       // schema version, used by migrate() in stats.js
  "player": "enes",
  "games": {                    // one row per game
    "word": { "plays": 4, "best": 90, "totalScore": 250,
              "correct": 31, "wrong": 9, "timeMs": 412000,
              "lastPlayed": "2026-09-07T12:57:01.244Z" }
  },
  "history": [                  // last 60 finished rounds
    { "game": "word", "score": 90, "questions": 10, "correct": 9, "at": "2026-09-07T12:57:01.244Z" }
  ],
  "days": { "2026-09-07": 412000 },   // play time per day, in milliseconds
  "firstPlay": "2026-09-07"
}
```

Play time is measured with a 5-second heartbeat and stops counting while the tab is hidden, so
"time played" reflects real playing, not an open tab.

The **My Progress** page can download this JSON as a backup file and load it back on another
device. When the shape of the data changes later, bump `SCHEMA` in
[`assets/js/stats.js`](assets/js/stats.js) and add a step to `migrate()` — old saved files keep
working.

If a real account system with cross-device sync is ever wanted, this is the layer to replace:
every game only talks to `EGStats`.

## Maps

Real boundaries, no hand-drawn shapes. The data lives in `assets/geo/` and is rebuilt with:

```bash
python tools/build_geo.py
```

| File | Source | License |
|---|---|---|
| `assets/geo/world.json` | [Natural Earth](https://github.com/nvkelso/natural-earth-vector) 1:110m admin-0 countries | public domain |
| `assets/geo/turkey.json` | [tr-geojson](https://github.com/cihadturhan/tr-geojson) — 81 provinces | see repo |

The script keeps only the fields the games need and rounds coordinates, which brings the world
map down to ~150 KB and Türkiye to ~100 KB. [`assets/js/geo.js`](assets/js/geo.js) projects the
GeoJSON (Mercator for the world, equirectangular for Türkiye) and draws it as SVG paths — no
mapping library.

## Add new content

Words and countries live in [`assets/js/data.js`](assets/js/data.js):

```js
window.WORDS.push({ emoji: "🐍", word: "snake", topic: "Animals" });
window.COUNTRIES.push({ code: "ie", name: "Ireland", capital: "Dublin", continent: "Europe" });
window.FOOTBALL.push({ name: "Eintracht Frankfurt", league: "Serie A",
                       logo: "https://thumb.wikimedia.org/..." });

// Turkish words for Kelime Tamamlama - always UPPERCASE
window.TR_WORDS.push({ emoji: "🐍", word: "YILAN", topic: "Hayvanlar" });
```

Maths questions are generated, not listed: see `makeQuestion()` in
[`matematik.html`](matematik.html). Multiplication and division are the natural next step there
— add an option to the first chooser and a branch in `makeQuestion()`.

**Proje Çocuk** ([`proje-cocuk.html`](proje-cocuk.html)) is fully self-contained — canvas, Web
Audio chiptune, no assets. Everything content-shaped lives in two arrays at the top of its
script: `STAGES` (one entry per age band, with its own colours, background props, collectibles
and obstacles) and `TOASTS` (the project-management one-liners). Adding an age, an activity or a
joke means adding a line there; the engine itself does not change. Two collectible kinds carry
the design: `proj` items sit right in the running lane, `joy` items drift higher as the child
gets older. Append `?fast=10` to the URL to run a whole childhood in ~20 seconds while testing.

Flag pictures come from `flagcdn.com` using the two-letter country code. Football crests come from
Wikimedia/Wikipedia thumbnails — the `logo` field in `FOOTBALL` is the image URL.

## Mascot

[`assets/img/mascot.svg`](assets/img/mascot.svg) is a cartoon character drawn for the site.
A real photo can be dropped in as `assets/img/avatar.jpg` — the small header avatar then uses it,
and falls back to the mascot if the file is missing.

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. (Opening the files directly with `file://` will not work —
the map data is fetched with `fetch()`.)

## Publish on GitHub Pages

```bash
gh repo create enes-fatih-mert-gaming --private --source . --push
```

Then repo → **Settings → Pages** → Deploy from a branch → `main` → `/ (root)`.

Note: GitHub Pages on a **private** repository requires a paid plan; on the free plan a private
repo can only be published as a public site. If the repo must stay private and free, run the site
locally or host it somewhere else.
