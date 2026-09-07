# Enes Gaming 🎮

A small, password-protected learning site for a 7-year-old: English vocabulary and world geography.
Pure static HTML/CSS/JS — no build step, no dependencies.

## Games

| Game | What it teaches |
|---|---|
| 🦁 **Word Safari** | English vocabulary — picture → word, with spoken pronunciation |
| 🚩 **Flag Hunt** | Countries, flags and capital cities |
| 🌍 **Map Explorer** | Continents — click the right one on a world map |

## Log in

Default password: **`enes123`**

To change it, open the browser console and run `btoa("newpassword")`, then paste the result into
`passwordHash` in [`assets/js/config.js`](assets/js/config.js).

> Note: this is a friendly gate, not real security. Everything is client-side, so anyone who
> reads the page source can find the password. Do not put anything private on the site.

## Add his photo

Save a picture as `assets/img/avatar.jpg`. If the file is missing, an emoji is shown instead.

## Add new content

Everything lives in [`assets/js/data.js`](assets/js/data.js):

```js
window.WORDS.push({ emoji: "🐍", word: "snake", topic: "Animals" });
window.COUNTRIES.push({ code: "ie", name: "Ireland", capital: "Dublin", continent: "Europe" });
```

Flag images come from `flagcdn.com` using the two-letter country code.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main` (or `master`), folder `/ (root)`.
4. The site appears at `https://<username>.github.io/<repo>/` after a minute.
