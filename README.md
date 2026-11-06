# skillry.dev homepage — REA study clone

**This is a research recreation, not Skillry.** It is not affiliated with, endorsed by, or a substitute for [skillry.dev](https://skillry.dev/). Please use the original site to browse, install, sign in, or purchase Skills.

Homepage-only static replay built from a REA `capture_browser_scenario` evidence bundle (DOM + compiled CSS + fonts + logos). See [METHOD-REA.md](METHOD-REA.md) for the evidence list and how this differs from a static scrape.

Preview (GitHub Pages): https://davidliu12-code.github.io/skillry-dev-rea-clone/

## Hotlinked origin resources

These were not fully present as captured bodies, so the page loads them from the live site and is marked here on purpose:

- `https://skillry.dev/hero-skill-logos/skill-logo-{14,15,28}.webp`
- `https://skillry.dev/skills/<slug>/media/preview-1.webp?...` (card previews)
- `https://skillry.dev/assets/<file>` for SVG marks missing from the capture
- `https://media.skillry.dev/...` (studio photos, testimonial avatars, promo art)
- In-page links into the catalog, pricing, docs, and legal routes

## Local preview

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

Project Pages are served from this repository root (`index.html`). The `404.html` page exists because this clone does not reproduce the original multi-route app.
