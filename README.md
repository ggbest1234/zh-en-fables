# Chinese Fables, English Wisdom

A bilingual web edition of 20 Chinese fables paired with their English idiomatic counterparts.

**Stack:** Astro 4 · TypeScript · Glassmorphism · View Transitions
**Content source:** `chinese-fables-english-wisdom.docx` (extracted to `src/data/chapters.json`)

## Design language

- **Dark canvas** (`#07080b`) with subtle gradient mesh + faint grid
- **Dual accent** — 朱砂 vermilion (`#e84c3d`) for Chinese, 冷青 cyan-teal (`#5dcfc7`) for English
- **Glassmorphism** throughout (cards, nav, hero, refrain block)
- **Type:** Inter (UI) · Ma Shan Zheng (中文标题) · Noto Serif SC (中文正文) · JetBrains Mono
- **Motion:** mouse-tracked card glow, staggered reveal-on-scroll, view transitions between chapters
- **Honors `prefers-reduced-motion`**

## Local development

```bash
npm install
npm run dev          # http://127.0.0.1:4322
npm run build        # static output in ./dist
npm run preview
```

## Edit content

All chapter data lives in `src/data/chapters.json` — derived from the original `.docx` via `fable/_extract_all.py`.

Schema per chapter:

```ts
{
  num: number,
  titleEn: string,
  titleZh: string,
  slug: string,             // e.g. "01-gilding-the-lily"
  sections: {
    'Story': string,
    'Moral': string,
    'English Equivalent': string,
    'Cross-Cultural Reflection': string,
    'Notes': string,        // will be parsed into [N] items automatically
  }
}
```

To re-extract from the source `.docx`:

```bash
py fable/_extract_all.py
cp fable/_chapters.json src/data/chapters.json
```

## Deploy to Cloudflare Pages

1. Push repo to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION=20`
4. `wrangler.toml` is pre-configured.

CLI alternative:

```bash
npm run build
npx wrangler pages deploy dist --project-name=zh-en-fables
```

## Structure

```
src/
  components/
    ChapterCard.astro     # glass card with dual-accent variants
    Nav.astro
    Footer.astro
  data/
    chapters.json         # 20 chapters, 5 sections each
  layouts/
    Base.astro            # fonts, ClientRouter, reveal observer
  pages/
    index.astro           # home: hero, featured, 20-card grid
    chapter/[slug].astro  # detail page, 5 sections + refrain + notes + prev/next
  styles/
    global.css            # tokens, glass system, components, animations
public/
  favicon.svg
wrangler.toml
README.md
```

## Adding a chapter

1. Add a new entry to `src/data/chapters.json` following the schema above.
2. Slug must be unique and start with `NN-` where `NN` is the chapter number (zero-padded).
3. Re-deploy — the home grid and detail page pick it up automatically.
