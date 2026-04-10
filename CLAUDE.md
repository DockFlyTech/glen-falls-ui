# Glen Falls Chronicle — Design & Development Guide

## What This Is

A newspaper website for the Glen Falls Chronicle, a real print newspaper in Glens Falls, NY. Built with Next.js 16 + React 19 + Tailwind CSS 4, pulling content from a WordPress REST API.

## The Vibe

This site should feel like **picking up your local paper at the diner on a Saturday morning**. The audience is small-town families and middle-aged community members who genuinely buy and love the print edition. The website is a digital tribute to the print paper, not a replacement for it.

**Core design pillars:**
- **Warm** — Never cold, sterile, or techy. Cream backgrounds, warm ink tones, brown-tinted grays.
- **Simple** — Clean layouts, clear hierarchy, no clutter. Let the content breathe.
- **Quirky** — The content carries the quirkiness, not the code. We support it with playful transitions and tasteful print-inspired details.
- **Professional** — NY Times-level information hierarchy and editorial typography. Credible, not amateur.

**Influences:** The New Yorker (warmth, editorial character, literary typography) and the NY Times (authority, layout discipline, information hierarchy). The overall feel should land closer to "I'm home" than "this is serious news."

## Design System

### Color Palette (defined in `globals.css :root`)

All colors are warm. Never use cold blue-grays or pure black/white in content areas.

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F8F4EE` | Main page background (warm cream/newsprint) |
| `--foreground` | `#2C2521` | Primary text (warm near-black ink) |
| `--paper-aged` | `#F0EAE0` | Slightly darker cream for secondary surfaces |
| `--accent` | `#1B4F6E` | Deep blue (from print masthead), category labels, buttons, links |
| `--accent-gold` | `#C89B1E` | Gold (from print callout bars), highlight bars, active tabs, CTAs |
| `--accent-gold-light` | `rgba(200,155,30,0.12)` | Subtle gold background tint for callout boxes |
| `--text-secondary` | `#5C524A` | Bylines, dates, supporting text |
| `--text-tertiary` | `#8A7E74` | Tertiary text, muted labels |
| `--rule` | `#D2C4B4` | Column rules, dividers, borders |

The masthead and nav bar use `bg-white` because the logo has a white background. The `html` element is also white so overscroll matches the masthead.

### Typography (Google Fonts, loaded in `layout.tsx`)

| Font | Role | Tailwind Class |
|------|------|----------------|
| **Playfair Display** | Headlines, accents, tagline, drop caps, pull quotes | `font-playfair` |
| **Lora** | Body text, article content | `font-lora` (also aliased as `font-merriweather`) |
| **Libre Franklin** | Navigation, buttons, labels, bylines, UI text | `font-libre-franklin` (also aliased as `font-raleway`) |

Legacy aliases exist: `font-merriweather` resolves to Lora, `font-raleway` resolves to Libre Franklin. These are for backwards compatibility — prefer the real names in new code.

Bylines use `font-variant: small-caps` with the `.font-byline` class.

### Newspaper Texture & Details

- **Paper grain**: SVG `feTurbulence` noise overlay on `body::before` at 12% opacity with `mix-blend-mode: multiply`. This gives the page a physical newsprint feel.
- **Masthead rules**: Thin/thick decorative horizontal rules frame the logo area (classic broadsheet style).
- **Column rules**: `lg:border-l lg:border-rule lg:pl-10` on sidebars creates vertical dividers between content columns.
- **Ornamental dividers**: Diamond ornaments (`&#9670;`) centered on thin rules separate articles in lists. Two patterns: `.ornament-divider` (inline between items) and `.article-ornament-separator` (CSS pseudo-element bottom border).
- **Drop caps**: `.drop-cap` class for article lead paragraphs (Playfair Display, 3.8em float-left first letter).
- **Pull quotes**: `.pull-quote` class — large italic Playfair with thick top rule.
- **Justified text**: `.prose-justified` adds `text-align: justify` with `hyphens: auto` for article body content.
- **Dateline**: The masthead shows the date in small caps with a bullet separator and "Glens Falls, New York" — classic newspaper dateline format.

### Layout Patterns

- **Two-column layout**: `flex flex-col lg:flex-row gap-10` with `lg:w-2/3` main and `lg:w-1/3` sidebar. Sidebar gets a column rule on desktop.
- **Masthead + sticky nav**: The masthead scrolls away naturally. Only the nav bar (`sticky top-0`) persists. No JS scroll listeners — this avoids flicker bugs.
- **Max width**: `max-w-[1400px] mx-auto px-4` is the standard content container.

### Animation & Transitions

Keep animations **playful but tasteful**. Available utilities:
- `.animate-fade-up` / `.stagger-children` — entrance animations
- `.hover-lift` — subtle upward float with shadow on hover
- `.hover-zoom` — gentle image scale on hover
- `.link-grow-underline` — underline that grows in from the left
- `.accent-link` — warm underlined link with gold accent

Use CSS custom timing: `--transition-fast` (0.2s), `--transition-smooth` (0.35s), `--transition-slow` (0.6s).

## Things to Avoid

- **Cold colors**: No blue-grays, no pure `#000000` or `#ffffff` in content areas. Everything should feel warm.
- **Generic AI aesthetics**: No Inter, Roboto, purple gradients, cookie-cutter component libraries. This should feel hand-crafted.
- **Dark mode**: Newspapers don't have dark mode. The newsprint cream is the identity.
- **Techy/startup vibes**: No glassmorphism, no neon accents, no pill-shaped everything. This is a small-town paper.
- **Over-engineering the nav**: The masthead scrolls away, the nav sticks. Don't add JS scroll detection for show/hide — it causes reflow flicker.
- **Replacing the print paper**: The site pushes people *toward* the print edition. Subscribe CTAs should emphasize the physical paper.
- **Off-brand colors**: The Chronicle's identity colors are blue and gold, pulled from the actual print paper's masthead and callout bars. Don't introduce red, purple, or other accent colors that have no connection to the brand. Use `--accent` (blue) for primary interactive elements and `--accent-gold` for emphasis/highlights.

## Content & Sections

Content comes from WordPress REST API (`NEXT_PUBLIC_WP_BASE_URL`). Current sections:
- Home, Articles (by category), About, Contact, Find the Chronicle, Obituaries (external)
- **Planned**: Opinion/Editorial section, Classifieds/Local Business directory

## Tech Notes

- Next.js App Router (`src/app/`)
- Tailwind v4 configured via `@theme inline` in `globals.css` (no tailwind.config file)
- WordPress REST API for all content (posts, pages, media, categories, tags)
- Heroicons + Lucide React for icons
- No dark mode, no CSS Modules, no styled-components
