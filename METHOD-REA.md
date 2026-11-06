# How this clone was made (REA path)

This repository is a **homepage-level study clone** of [skillry.dev](https://skillry.dev/). It is **not** the official Skillry product, not a 1:1 recreation of the full catalog (the live site advertises on the order of tens of thousands of routes), and it does not implement authentication, checkout, or Skill installation.

Evidence ID: `ev_18b21c7510a94258edc599b24acfabae504985786afeeb3ae2559409c399523d`

Operation: `capture_browser_scenario` (Playwright / Chromium 156, controlled replay, ~7940ms, 384 retained network events)

Source artifacts (local evidence dir, not committed in full): `/workspace/skillry-rea/`

## Evidence that actually built the page

| Artifact | What it contributed |
| --- | --- |
| `final-dom.html` (~1.1MB) | Post-hydration serialized homepage DOM: layout classes, section order, card markup, FAQ `<details>`, footer, promo banner. The published `index.html` is this snapshot with scripts stripped and URLs rewritten. |
| `final.png` | Visual check of the hero (promo bar, nav, wordmark, icon grid, CTAs, “Works with” row). |
| `assets/styles-C2oHS5g0.css` | Captured compiled Tailwind bundle (`url`: `https://skillry.dev/assets/styles-C2oHS5g0.css`). Font `url()` paths rewritten so the three Bricolage files resolve next to the CSS. `--tw-*` utility count in findings: ~2882. |
| `assets/bricolage-{400,600,700}.woff2` | Captured local font files (original paths `/fonts/bricolage-*.woff2`). |
| `assets/logo.png`, `logo-dark.png`, `favicon.svg` | Nav / theme-aware wordmark. |
| `assets/skill-logo-*.webp` | Hero icon grid (26 of 29 frames captured; 14 / 15 / 28 hotlinked from the origin). |
| Agent mark SVGs (`claudecode-color-*.svg`, `codex-color-*.svg`, `cursor-*.svg`, `grok-*.svg`, …) | “Works with” row and per-card compatibility icons that were present in the network body dump. |
| `assets/en-CliqJ_gb.json` | i18n strings used to confirm section copy (hero, studio, FAQ, pricing labels) against the DOM. Not executed at runtime. |
| `a11y.json` / accessibility tree | Structured inventory of 80 visible skill cards (8 × Featured, Free, and each Trending / Top-rated category), testimonials, and pricing figures. |
| `FINDINGS.md` / `network-index.json` | Stack signals and URL map. |

Pricing figures read from the captured a11y tree (promo snapshot, 50% off): Monthly **$9.99** (was $19.9) / month, Yearly **$79** (was $158) / year, Founding Lifetime **$169** (was $249) one-time. The countdown on the live clone is recomputed from the captured deadline copy: “Ends November 30, 2026 at 11:59 PM Pacific Time.”

## Observed stack (from captured network bodies, not guessed)

- Vite + React SPA (`createRoot`, `__vite` markers in the main bundle)
- Tailwind utility CSS (the captured `styles-C2oHS5g0.css`)
- Signals for Base UI / cmdk / vaul / sonner in JS+CSS
- TanStack mentions in the bundle; no `wouter`; no `framer-motion` package name
- Fonts: local Bricolage Grotesque woff2 (400 / 600 / 700)
- Media: `media.skillry.dev` (Cloudflare image resizing) and some `cdn.sanity.io` marks
- Auth probe: `GET /api/auth/get-session` (body captured as unauthenticated)
- Analytics noise that was **not** replayed here: Cloudflare beacon, GTM, Ahrefs, promotekit, vibecafe

The original app JS (`main-BVpXm-Ai.js` and friends) was captured but **intentionally not shipped**. This clone is a static replay of the rendered homepage, not a redistribution of the Skillry client.

## What “REA” changed versus a static scrape + hand-coded page

A first-paint HTML scrape of this site would mostly see a Vite shell. The catalog grids, card titles, install counts, testimonials, pricing amounts, and FAQ answers are filled in after React hydrates and after XHR/fetch to CMS / app APIs.

REA’s `capture_browser_scenario` waits through that load, then exports:

1. **The hydrated DOM**, so section structure and Tailwind class names can be reused instead of restyled from a screenshot.
2. **Network response bodies**, so the exact hashed CSS, local fonts, and hero/logo binaries can be copied rather than re-derived.
3. **An accessibility tree**, so card data can be listed as structured evidence (name, category, install count, agent marks) instead of OCR.
4. **A screenshot** for visual regression against the replay.

That is the opposite of “save page / copy computed styles / invent a new component tree.” The other study clone (static scan + hand reconstruction) rebuilds look-and-feel in fresh markup; this one **replays captured markup + captured CSS** and only adds a thin overlay (disclaimer banner, URL rewriting, countdown, carousel scroll, theme toggle, and redirects of Sign in / Subscribe to the original site).

## URL policy

- Captured static files are served locally from `assets/`.
- Missing hero frames `skill-logo-14/15/28.webp` and any `/assets/*` SVG that was not in the body dump are hotlinked to `https://skillry.dev/...`.
- Skill card preview images (`/skills/<slug>/media/preview-1.webp?...`) and catalog / docs / legal routes are hotlinked to the original origin.
- Studio step images and testimonial avatars stay on `https://media.skillry.dev/...` (those bodies were not all saved locally).
- Subscribe / Sign in / Connect / Search controls are not implemented locally; clicks go to skillry.dev. There is no checkout, no session API, and no exploit or auth bypass.

## Not restored

- The rest of the Skillry router (skill detail, directory filters, learn/docs, MCP setup flows, auth, checkout).
- Nav mega-menus (Categories, AI videos, Resources) and the in-page search palette (they are buttons without the original client JS).
- Request-a-Skill dialog and language picker.
- Original analytics / promo-kit / Cloudflare beacon (stripped on purpose).
- Pixel-perfect motion that lived only in JS (some carousels still scroll via native `overflow-x-auto` plus a “Next” listener).
