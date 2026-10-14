# 〈物語〉 Watch & Read Guide

A spoiler-safe, Shaft-styled public guide to the Monogatari Series: every watch order, all 31 novels, and exactly what has been animated.

## What's on the page

| Section | What it does |
|---|---|
| **第一話 The Order** | First-timer / Release / Chronological / Novel orders, plus a **Calendar** order: every arc, episode by episode, on Araragi's day-by-day calendar (month pages, colored days, late-August arcs shown as parallel tracks). Click an entry to mark everything up to it watched. Runtime meter + "episodes per day → finish date". |
| **第二話 The Macro Map** | All 31 Japanese volumes as book spines, story by story: animated, announced, or novel-only, with EN/JP availability. |
| **第三話 Oddities** | Every major arc and its oddity, sealed until you reach it. Hover shifts to the arc's color. |
| **第四話 The Cast** | MAL portraits with the Shaft head tilt. Unmet characters are silhouettes; the relationship web fills in with progress. |
| **第五話 After the Anime** | Exit ramp into Off / Monster / Family Season, with "you are here." |
| **第六話 Which Oddity Are You?** | Five-question quiz with a copyable result. |
| **第七話 Best Girl\*** | Tier list (tap or drag; unranked characters stay out of the post), Best Girl top 5, and a 8/16-character bracket. No spoiler locks here. Kaiki and Meme get reactions. **Save image** makes a 1080×1920 post (MAL photos if the browser allows, name tiles if not); **Screenshot mode** shows a full-screen card with photos and tells people to screenshot it. |
| **第八話 Questions** | Hanekawa's FAQ and Ōgi's (gated) question corner. |
| **Spoiler Shield** | Fixed bottom slider. Everything past your point is censored (click a 未 bar to peek). Progress is saved per arc, so switching orders never loses or leaks anything. |
| Extras | Flash-frame title cards (toggle in the top bar; off by default for reduced-motion users), Shinobu's donut counter, Hachikuji 404 page, and type `araragi` anywhere. |

## Files

```
index.html            page shell
404.html              Hachikuji's 404 (GitHub Pages serves it automatically)
css/style.css         all styling
js/data.js            ALL content: orders, volumes, stories, characters, quiz, FAQ
js/mal.js             MyAnimeList image loader
js/app.js             interactivity
js/rank.js            Best Girl* rankings, post images, screenshot mode
data/mal.json         prebuilt MAL image URLs (generated)
scripts/fetch-mal.mjs builds data/mal.json from the Jikan API
.github/workflows/refresh-mal.yml   refreshes data/mal.json monthly
```

## Images from MyAnimeList

Covers and portraits come from MyAnimeList through the [Jikan API](https://jikan.moe).

- **Recommended:** run `node scripts/fetch-mal.mjs` once (Node 18+, no installs) and commit `data/mal.json`. Visitors then load images straight from MAL's CDN without touching Jikan. The included GitHub Action re-runs it on the 1st of each month, or on demand from the **Actions** tab.
- **Fallback:** if `data/mal.json` is empty, the page fetches from Jikan in the visitor's browser (throttled, cached for 7 days). Anything that fails shows a kanji title tile instead.

## Deploy on GitHub Pages

1. Create a new repo (e.g. `monogatari-guide`) and push these files to `main`.
2. **Settings → Pages →** Source: *Deploy from a branch*, Branch: `main` / root.
3. **Settings → Actions → General →** Workflow permissions: *Read and write* (so the monthly refresh can commit).
4. Run the **Refresh MAL images** workflow once from the Actions tab.
5. Live at `https://<username>.github.io/monogatari-guide/`.

## Updating when new stuff comes out

Everything lives in `js/data.js`:
- A story gets animated → change its status from `"novel"`/`"next"` to `"anime"` and point it at the anime entry.
- New anime season → add it to `ANIME` and to each list in `ORDERS`.
- New novel → add a volume to its season in `SEASONS`.
- Newly animated arcs also need a `CALENDAR` entry (date, episodes, arc token) so the Calendar order stays complete.

Adaptation status is current as of October 2026 (Karen Ogre announced for winter; Torimonogatari published September 2026).

---
Unofficial fan guide. Monogatari Series © NISIOISIN / Kodansha; anime © Aniplex / SHAFT. Images via MyAnimeList.
