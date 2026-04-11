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

Colors are derived from the **actual print paper**: the blue comes from the Chronicle's print masthead, the gold from its callout bars. All grays are warm (brown-tinted), never cold blue-gray.

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F8F4EE` | Main page background (warm cream/newsprint) |
| `--foreground` | `#2C2521` | Primary text (warm near-black ink) |
| `--paper-aged` | `#F0EAE0` | Slightly darker cream for secondary surfaces, empty image placeholders |
| `--paper-shadow` | `#E4DCD0` | Deeper cream for depth |
| `--accent` | `#1B4F6E` | Deep blue (from print masthead) — category labels, buttons, links, interactive elements |
| `--accent-hover` | `#133A52` | Darker blue for hover states |
| `--accent-gold` | `#C89B1E` | Gold (from print callout bars) — highlight bars, active tabs, CTAs, accent underlines |
| `--accent-gold-hover` | `#A67F0F` | Darker gold for hover states |
| `--accent-gold-light` | `rgba(200,155,30,0.12)` | Subtle gold background tint for callout boxes, icon circles, hover states |
| `--text-primary` | `#2C2521` | Headlines, primary body text |
| `--text-secondary` | `#5C524A` | Bylines, dates, supporting text, body paragraphs |
| `--text-tertiary` | `#8A7E74` | Tertiary text, muted labels, metadata |
| `--text-muted` | `#B0A498` | Placeholder text, disabled states |
| `--rule` | `#D2C4B4` | Column rules, dividers, borders |
| `--rule-light` | `#E4DCD0` | Lighter borders for subtle separation |
| `--rule-dark` | `#B0A498` | Heavier rules, scrollbar thumbs |
| `--footer-bg` | `#2C2521` | Footer background (warm dark, same as foreground) |
| `--footer-text` | `#F8F4EE` | Footer text (cream, same as background) |

The masthead and nav bar use `bg-white` because the logo has a white background. The `html` element is also white so overscroll matches the masthead.

### Color Usage Rules

- **Blue (`--accent`)** is the primary interactive color: buttons, links, category labels, nav hover states, subscribe CTA, article number accents, form submit buttons
- **Gold (`--accent-gold`)** is the emphasis/highlight color: accent bars under headings, active tab indicators, above-the-fold rule, subscribe button (gold on blue), ornamental details, footer top bar
- **Gold-light (`--accent-gold-light`)** is the subtle highlight: icon circle backgrounds, dropdown hover states, FollowUsBox hover, form success states
- Never use cold Tailwind grays (`gray-100`, `gray-500`, etc.) — always use the warm theme tokens (`text-tertiary`, `rule`, `paper-aged`, etc.)

### Typography (Google Fonts, loaded in `layout.tsx`)

| Font | Role | Tailwind Class |
|------|------|----------------|
| **Playfair Display** | Headlines, page titles, accents, tagline, drop caps, pull quotes | `font-playfair` |
| **Lora** | Body text, article content, excerpts | `font-lora` (also aliased as `font-merriweather`) |
| **Libre Franklin** | Navigation, buttons, labels, bylines, UI text, metadata | `font-libre-franklin` (also aliased as `font-raleway`) |

Legacy aliases exist: `font-merriweather` resolves to Lora, `font-raleway` resolves to Libre Franklin. These are for backwards compatibility — **prefer the real names in new code**.

### Typography Utility Classes

| Class | Purpose |
|-------|---------|
| `.font-headline` | Playfair 28px bold for headlines |
| `.font-subheading` | Libre Franklin 15px for supporting text |
| `.font-paragraph` | Lora 16px for body copy |
| `.font-tagline` | Playfair 17px italic for the masthead tagline |
| `.font-date` | Libre Franklin 12px for dates/timestamps |
| `.font-nav` | Libre Franklin 12px bold uppercase for navigation |
| `.font-button` | Libre Franklin 12px bold uppercase for buttons |
| `.font-byline` | Libre Franklin 14px bold **small-caps** for author names |
| `.font-section-label` | Libre Franklin 11px bold uppercase in accent blue for category labels |
| `.font-ad-label` | Libre Franklin 11px uppercase muted for ad placeholders |

### Newspaper Texture & Details

- **Paper grain**: SVG `feTurbulence` noise overlay on `body::before` at 12% opacity with `mix-blend-mode: multiply`. Gives the page a physical newsprint feel.
- **Warm image filter**: All article images get `sepia(0.08) saturate(0.9) brightness(0.98)` so photos feel like they belong on newsprint. Filter lifts on hover to reveal full color.
- **Masthead rules**: Thin/thick decorative horizontal rules frame the logo area (classic broadsheet style). Masthead scrolls away naturally — only the nav bar sticks.
- **Column rules**: `lg:border-l lg:border-rule lg:pl-10` on sidebars creates vertical dividers between content columns. Also used in the footer between the three columns.
- **Ornamental dividers**: Diamond ornaments (`&#9670;`) centered on thin rules separate articles in lists. Two patterns: `.ornament-divider` (inline between items) and `.article-ornament-separator` (CSS pseudo-element bottom border).
- **Above-the-fold rule**: Gold accent bar flanked by thin rules after the featured article on the homepage.
- **Drop caps**: `.drop-cap` class on article body — Playfair Display, 3.8em float-left first letter.
- **Pull quotes**: `.pull-quote` class — large italic Playfair with thick top rule.
- **Justified text**: `.prose-justified` adds `text-align: justify` with `hyphens: auto` for article body content.
- **Dateline**: Masthead shows the date in all-small-caps with bullet separator and "Glens Falls, New York".
- **End-of-article ornament**: Gold diamond flanked by short rules at the bottom of article content.
- **Gold accent bars**: 3px gold bars appear under page titles (About, Contact, Find Us, category pages, article pages) as a consistent heading treatment.

### Layout Patterns

- **Two-column layout**: `flex flex-col lg:flex-row gap-10` with `lg:w-2/3` main and `lg:w-1/3` sidebar. Sidebar gets a column rule on desktop. Used on homepage, article pages, about, contact, find-us.
- **Masthead + sticky nav**: The masthead is a regular `<div>` that scrolls away. The `<nav>` below it has `sticky top-0`. No JS scroll listeners — this avoids reflow flicker bugs.
- **Max width**: `max-w-[1400px] mx-auto px-4` is the standard content container.
- **Articles dropdown**: The ARTICLES nav item has a CSS hover dropdown listing category links. Uses `invisible group-hover:visible` with opacity transition. Gold accent bar at top of dropdown.
- **Footer**: Three-column grid with column rules (`lg:border-l lg:border-white/10`). Gold accent bar at top. Warm dark background matching `--footer-bg`.

### Animation & Transitions

Keep animations **playful but tasteful**. Available utilities:
- `.animate-fade-up` / `.stagger-children` — entrance animations (applied to homepage columns)
- `.hover-lift` — subtle upward float with shadow on hover
- `.hover-zoom` — gentle image scale on hover (applied to featured article image, square image posts)
- `.link-grow-underline` — underline that grows in from the left
- `.accent-link` — warm underlined link with gold accent decoration

Use CSS custom timing: `--transition-fast` (0.2s), `--transition-smooth` (0.35s), `--transition-slow` (0.6s).

## Things to Avoid

- **Cold grays**: Never use Tailwind's default `gray-*` classes (`bg-gray-100`, `text-gray-500`, `border-gray-200`). Always use warm theme tokens (`paper-aged`, `text-tertiary`, `rule`, etc.).
- **Off-brand colors**: The Chronicle's identity colors are blue and gold, pulled from the actual print paper. Don't introduce red, purple, green, or other accent colors. Use `--accent` (blue) for primary interactive elements and `--accent-gold` for emphasis/highlights.
- **Generic AI aesthetics**: No Inter, Roboto, purple gradients, cookie-cutter component libraries. This should feel hand-crafted.
- **Dark mode**: Newspapers don't have dark mode. The newsprint cream is the identity.
- **Techy/startup vibes**: No glassmorphism, no neon accents, no pill-shaped everything, no `rounded-lg` on everything. This is a small-town paper.
- **Over-engineering the nav**: The masthead scrolls away, the nav sticks. Don't add JS scroll detection for show/hide — it causes reflow flicker.
- **Replacing the print paper**: The site pushes people *toward* the print edition. Subscribe CTAs should emphasize the physical paper.
- **Pure black/white in content areas**: Use `--foreground` instead of `#000000`, use `--background` or `--paper-aged` instead of `#ffffff` (except masthead/nav which must be white for the logo).

## Content & Sections

Content comes from WordPress REST API (`NEXT_PUBLIC_WP_BASE_URL`). Current sections:
- Home, Articles (by category: front-page, business, recreation, technology, music), About, Contact, Find the Chronicle, Obituaries (external link to legacy.com)
- **Planned**: Opinion/Editorial section, Classifieds/Local Business directory

### Page Title Pattern
All interior pages follow the same heading pattern:
```
<h1 className="text-5xl font-playfair font-bold mb-4 tracking-tight">Page Title</h1>
<div className="w-20 h-[3px] bg-accent-gold mb-10" />
```

## Tech Notes

- Next.js App Router (`src/app/`)
- Tailwind v4 configured via `@theme inline` in `globals.css` (no tailwind.config file)
- WordPress REST API for all content (posts, pages, media, categories, tags)
- Heroicons + Lucide React for icons
- No dark mode, no CSS Modules, no styled-components
- Font aliases: `--font-merriweather` maps to Lora, `--font-raleway` maps to Libre Franklin (for backwards compatibility)
