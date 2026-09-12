# Enes & Fatih Mert Gaming 🎮

A password-protected learning site for a 7-year-old: English vocabulary and world geography.
Pure static HTML/CSS/JS — no build step, no framework, no server.

## Games

| Game | What it teaches |
|---|---|
| 🦁 **Word Safari** | English vocabulary — picture → word, spoken out loud |
| 🚩 **Flag Hunt** | Flags, countries and capital cities |
| 🌍 **Map Explorer** | Continents and countries on a real world map |
| 🇹🇷 **Türkiye Explorer** | All 81 provinces on a real map of Türkiye |
| 📊 **My Progress** | Scores, play time, streaks, badges, history |

## Log in

Password: **`1031`**

To change it, open the browser console and run `btoa("newpassword")`, then paste the result into
`passwordHash` in [`assets/js/config.js`](assets/js/config.js).

> This is a friendly gate, not real security. Everything runs in the browser, so anyone who reads
> the page source can find the password. Do not put anything private on the site.

## Progress data

There is no server and no database — progress is a single **JSON document in the browser's
localStorage** (key `eg_stats_v1`), on that device only:

```jsonc
{
  "v": 1,                       // schema version, used by migrate() in stats.js
  "player": "Enes & Fatih Mert",
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
```

Flag pictures come from `flagcdn.com` using the two-letter country code.

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
