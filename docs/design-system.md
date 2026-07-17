# YanForge Design System — "Forge"

**DS v1.0 · Companion to strategy spec v1.1 and IA v1.0.** This document governs visual and interactive components; the strategy spec governs brand direction; the IA governs structure. **No code here** — tokens, anatomy, states and rules; implementation maps 1:1 from these tables.

**The Apple lesson applied:** a design system's quality is measured by how little of it there is and how strictly it's obeyed. Forge has few parts. Each part exists once, works in both themes, all states, both languages, and every component must be reusable by construction — a one-off is a bug.

---

## 0. Principles

1. **Tokens are law.** No raw hex, px, or ms in any design or build. If a value isn't a token, it doesn't ship.
2. **Two themes, one system.** Every component defines light ("Clarity") and dark ("Engine Room") appearance. Dark is *editorial* — applied to section bands by the page, never chosen by the user. There is no dark-mode toggle.
3. **Calm surfaces, molten moments.** Neutrals do 90% of the work. Molten appears only at the highest-intent elements (§2.4). If a screen feels flat, the fix is hierarchy and space — never more color.
4. **States are the component.** A component without hover/focus/active/disabled/loading/RTL/reduced-motion definitions is not done (§13 Definition of Done).
5. **Performance is a design property.** Shadows, blurs and motion have budgets (§5, §6, §8). A beautiful component that janks in an Instagram WebView is a broken component.

---

## 1. Typography

**Families**

| Token | Family | Use |
|---|---|---|
| `font.sans` | Inter Variable | Everything: display through captions |
| `font.mono` | System mono stack (SF Mono / ui-monospace / Segoe UI Mono) | Overlines, data labels, module tags, step numerals |
| `font.arabic` | IBM Plex Sans Arabic | Phase-2 AR mirror (paired now; §12 RTL) |

**Scale** (fluid between breakpoints; desktop targets shown)

| Token | Size / line-height | Weight | Tracking | Usage rules |
|---|---|---|---|---|
| `type.display` | 64–88 / 1.02–1.06 | 640–680 | −1.5% | H1 only, one per page |
| `type.h1` | 48–56 / 1.08 | 640 | −1% | Page titles on subpages |
| `type.h2` | 36–40 / 1.12 | 620 | −0.5% | Section headlines |
| `type.h3` | 24–28 / 1.2 | 600 | 0 | Sub-sections, card titles |
| `type.body-l` | 20 / 1.55 | 400–450 | 0 | Hero subs, section leads |
| `type.body` | 17 / 1.6 | 400 | 0 | Default reading text — **the floor for running text** |
| `type.small` | 14 / 1.45 | 450 | 0 | Captions, microcopy, legal **only** — never paragraphs |
| `type.mono-label` | 12–13 / 1.3 | 500 | +4%, uppercase | Overlines, system tags, table numerals |

**Rules**
- Max line length 68ch (`type.body`), 60ch (`type.body-l`). Headlines wrap at natural phrase breaks — no orphan single words (manual break control in content).
- Numerals: tabular figures in tables, stat tiles and the calculator; proportional elsewhere.
- Weight is hierarchy's first tool, size second, color third. Never bold entire paragraphs.
- Arabic: same scale, line-height +10%, tracking 0 (never negative-track Arabic), and layouts must survive +30% string length (§13).

---

## 2. Color

### 2.1 Neutrals (both themes' skeleton)

| Token | Hex | Role |
|---|---|---|
| `color.ink` | `#0B0C0E` | Text on light; Engine Room base surface |
| `color.graphite` | `#16181D` | Elevated dark surface (cards in dark bands) |
| `color.steel` | `#3A3F47` | **Borders & dividers on dark only — never text** (DS correction: fails text contrast at 1.8:1) |
| `color.slate` | `#5B626C` | Secondary text on light (5.9:1 ✓) |
| `color.mist` | `#E7E8EA` | Borders & dividers on light |
| `color.offwhite` | `#FAFAF8` | Primary light canvas; primary text on dark (≈19:1 ✓) |
| `color.white` | `#FFFFFF` | Elevated light surfaces (cards, inputs) |
| `color.inverse-secondary` | `#A9AFB8` | **New token:** secondary text on dark (8.6:1 ✓) — replaces Steel's former text role |

### 2.2 Molten (the signature — rationed)

| Token | Value | Role |
|---|---|---|
| `color.ember` | `#FF6A2B` | Gradient start; P0 fills; sparks |
| `color.gold` | `#FFB020` | Gradient end |
| `gradient.molten` | ember → gold, 135° | P0 buttons, signature connective moments |
| `color.copper` | `#C7621E` | Decorative accents, large display numerals on light |
| `color.copper-text` | `#A8500F` | Text links & focus ring on light (5.3:1 ✓) — the only copper permitted at text sizes |

### 2.3 Current (data & liveness)

| Token | Value | Role |
|---|---|---|
| `color.teal` | `#2BD4C4` | Data viz, live indicators — **dark bands only** (10.3:1 on ink ✓; 1.8:1 on light ✗) |
| `color.teal-deep` | `≈#0E7C72` | Teal's light-theme equivalent, verified ≥4.5:1 at build |

### 2.4 The rationing law

Molten may appear on: P0 buttons · the focus ring · active states in the system map · connective sparks in the signature moment · one stat/numeral per viewport. **Nothing else.** The test: strip all molten from a screen — the layout must still work. Molten is emphasis, never structure.

### 2.5 Semantic

| Intent | Fill (icons/badges) | Text-on-light variant |
|---|---|---|
| Success | `#1FA971` | `success.text ≈ #0E6B47` |
| Warning | `#E0A011` | `warning.text ≈ #7A5600` |
| Error | `#E5484D` | `error.text ≈ #C22F35` |

Rule: base semantic colors are fills paired with Ink or Off-white labels; the darkened `-text` variants are the only ones used *as* text on light. All verified ≥4.5:1 with automated checks at build (§13).

### 2.6 Contrast matrix (the pairs that ship)

| Pair | Ratio | Verdict |
|---|---|---|
| Ink on Off-white | ≈19:1 | Body ✓ |
| Slate on Off-white | ≈5.9:1 | Secondary text ✓ |
| Off-white on Ink | ≈19:1 | Dark-band body ✓ |
| Inverse-secondary on Ink | ≈8.6:1 | Dark-band secondary ✓ |
| **Ink on gradient.molten** | ≥6.7:1 (worst point) | **Button label — the only permitted P0 label** |
| White on Ember | ≈2.9:1 | ✗ Banned |
| Copper-text on Off-white | ≈5.3:1 | Links, focus ✓ |
| Teal on Ink | ≈10.3:1 | Dark data ✓ |
| Steel as text, anywhere | ≤1.8:1 | ✗ Banned (borders only) |

---

## 3. Spacing, Grid, Breakpoints

**Spacing scale** (8pt system; token = `space.N` where N is px): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.
Component-internal spacing uses 4–32; layout gaps 24–64; section padding 96–160 (desktop) / 64–96 (mobile). Nothing off-scale, ever.

**Grid**

| Breakpoint token | Min width | Columns | Gutter | Margin |
|---|---|---|---|---|
| `bp.base` | 0 (design floor 360) | 4 | 16 | 20 |
| `bp.sm` | 480 | 4 | 16 | 24 |
| `bp.md` | 768 | 8 | 24 | 32 |
| `bp.lg` | 1024 | 12 | 24 | 48 |
| `bp.xl` | 1280 | 12 | 32 | auto (container) |

Container: `container.max = 1240`, centered. Reading measures override grid width (§1 line-length rules). One layout system — no ad-hoc columns.

**Section rhythm:** every section = one idea framed by `space.96`–`space.160` vertical. Adjacent sections in the same theme share a divider (`mist`/`steel` hairline) or spacing, never both.

---

## 4. Shape & Borders

| Token | Value | Use |
|---|---|---|
| `radius.s` | 8 | Inputs, chips, badges |
| `radius.m` | 12 | Buttons, small cards |
| `radius.l` | 16 | Cards, panels, sheets |
| `radius.pill` | 999 | Chips/pills, avatar, WhatsApp float |
| `border.hairline` | 1px `mist` (light) / `steel` (dark) | Default card & divider treatment |

Rules: radius never mixes within one component; nested radii step down one token (card `l` → inner media `m`). No sharp corners, no full-round cards.

---

## 5. Elevation, Shadows & Glass

**Philosophy:** light theme elevates with soft shadow; dark theme elevates with border + subtle inner light. Never both systems on one element.

| Token | Definition | Use |
|---|---|---|
| `elevation.0` | none | Flat content on canvas |
| `elevation.1` | Light: y2 blur8 @ 6% ink · Dark: hairline steel border | Resting cards, inputs |
| `elevation.2` | Light: y8 blur24 @ 8% ink · Dark: border + 4% off-white inner glow | Hover lift, dropdown/menu, sticky bar |
| `elevation.3` | Light: y16 blur48 @ 10% ink · Dark: border + 6% glow | Sheets, modals |

**Budget:** max two shadowed elements overlapping; never animate shadow blur (animate transform, swap elevation token at midpoint).

**Glassmorphism rules (strict — glass is functional, not aesthetic):**
1. Glass is permitted on exactly two elements: the **navigation bar** (scrolled state: blur 12–16, 78% `offwhite` light / 78% `graphite` dark, hairline bottom border) and **sheet/modal scrims** (blur 8, 40% ink).
2. **Banned** on content cards, hero surfaces, buttons, or any scrolling region — large blurred areas are a GPU tax the Instagram-WebView budget can't pay.
3. Mandatory solid fallback (96% opacity surface) where backdrop blur is unsupported or when reduced-transparency preferences are set.
4. Never more than **one** backdrop-blur element in the viewport; never animate blur radius.
5. Text on glass must pass contrast against the *worst-case* underlying content, not the average — which is why glass carries a tint at ≥78% opacity.

---

## 6. Iconography

- Custom line set on a 24px grid, **1.5px stroke**, rounded terminals, consistent 2px inner radius. Seeded from an open stroke library, restyled to these rules — never mixed raw.
- Sizes: 16 (inline), 20 (buttons/inputs), 24 (default), 32 (module glyphs). Stroke does not scale down at 16 (redraw, don't shrink).
- Color: inherits text color; molten only when the element itself is a permitted molten moment (§2.4).
- Filled icons banned, with one exception: the **WhatsApp brand glyph**, reproduced per brand guidelines, on `pill` chrome.
- Every icon pairs with text or an `aria-label`. Icon-only interactive elements: WhatsApp float and menu trigger only — both labeled.

---

## 7. Motion

Inherits strategy spec §9 (no WebGL; every animation demonstrates product, connection, or feedback).

**Tokens**

| Token | Value | Use |
|---|---|---|
| `motion.fast` | 120ms | Hover, press, toggles |
| `motion.standard` | 200ms | Accordion, menu, input feedback |
| `motion.entrance` | 320ms | Card/section reveals |
| `motion.setpiece` | 560ms | Signature SVG convergence, sheet open |
| `ease.enter` | cubic-bezier(0.22, 1, 0.36, 1) | Entrances, reveals |
| `ease.interact` | cubic-bezier(0.4, 0, 0.2, 1) | Hover/press/exit |
| `stagger.unit` | 40–80ms | List/grid reveals, max 6 staggered items |

**Component standards:** count-ups 800–1200ms ease-out, once per view · demo thread messages enter at reading pace (≈900ms apart), never faster than comprehension · stepper line draws at `motion.setpiece` · hover lift = translateY(−2) + elevation token swap.

**Laws:** transform/opacity only · nothing animates on first paint before LCP · scroll-triggered animation fires once (no re-trigger on scroll-up) · `prefers-reduced-motion` renders every animated meaning as its completed static state — checked per component in §13.

---

## 8. Components

Each entry: **Anatomy · Variants · States · Behavior · A11y.** All components are dual-theme, RTL-ready (logical properties), and content-resilient by definition.

### 8.1 Buttons

**Anatomy:** label (+ optional 20px leading icon), `radius.m`, min-height 52 (mobile) / 44 (desktop), padding `space.16`–`space.24` horizontal, full tap target ≥44×44.

| Variant | Fill / border | Label | Use |
|---|---|---|---|
| **P0 Molten** | `gradient.molten` | **Ink** (never white — §2.6) | The ask; one per viewport (IA §8) |
| **P0 WhatsApp** | WhatsApp brand green | White (per brand contrast) + glyph | WhatsApp rail only |
| **P1 Ghost** | transparent, 1.5px border (`ink` on light / `offwhite` on dark) | matches border | The forward path |
| **P2 Text link** | none | `copper-text`, underline on hover | In-body links |

**States:** rest · hover (gradient shifts 8° toward gold + lift −2px, `motion.fast`) · active (scale 0.98, lift removed) · focus-visible (2px `copper-text` ring, 2px offset — both themes) · loading (label → inline spinner, width locked — no layout jump). **Disabled: banned for P0/P1 on marketing pages** — a CTA that can't be clicked is a broken promise; forms validate on submit instead of disabling.

### 8.2 Badges & Chips

| Component | Shape | Content rules |
|---|---|---|
| **Response-promise chip** | `radius.pill`, hairline border, 20px clock icon | The SLA string verbatim; sits within `space.12` of every P0 |
| **Tier badge** ("Most complete…") | `radius.s`, mist fill / graphite on dark | Factual descriptors only — never "popular"/"best" without data |
| **`SIMULATION` tag** | `radius.s`, mono-label, slate/inverse-secondary | Mandatory on every demo thread instance (copy deck §2) |
| **Status dot** | 8px, semantic colors | Always paired with a text label — never color alone |

### 8.3 Cards

**Base card:** `white`/`graphite` surface, `radius.l`, `elevation.1`, padding `space.24`–`space.32`, hairline border. Hover (linked cards only): `elevation.2` + lift. The **entire card is the link** — one `<a>`, no competing targets inside.

| Variant | Distinct anatomy | Notes |
|---|---|---|
| **Industry tile** | mono overline (vertical name) · pain headline · one-line answer · P2 arrow link | Headline is `type.h3`; equal heights per row |
| **Pricing card** | tier mono label · descriptor · "from AED" anchor (`type.h2`, tabular) · inclusion list · P0 | Anchor numeral is the one permitted molten numeral (§2.4); tiers never collapse into a comparison table on mobile — they stack |
| **Case card** *(gated)* | vertical tag · headline metric · one-line problem→result · arrow | Metric uses tabular numerals; no metric, no card (IA §11) |
| **Stat tile** | numeral (`type.display`-scaled, tabular) + caption | Count-up per §7; renders static value under reduced motion |
| **Testimonial card** *(gated)* | quote (`type.body-l`) · name · business type · area · photo | All four attribution fields or the card doesn't ship |
| **Module panel** | mono module tag · panel line · outcome line · product UI slot | Lives inside the system map (§8.8) |

### 8.4 Inputs & Forms

**Text/tel input:** 52px height, `radius.s`, `white` surface + hairline (light) / `graphite` + steel border (dark), label **always visible above** (never placeholder-as-label), placeholder = example content in slate.
**States:** rest · focus (border → `copper-text`, ring as buttons) · error (border `error`, message below in `error.text`, icon + text — never color alone) · success (subtle check, no green flood).
**Select:** **native OS select, all breakpoints, Phase 1.** Custom listboxes are a WebView reliability risk with zero conversion upside. Styled trigger, native picker.
**Calculator inputs:** stepper-assisted numeric fields (44px steppers), unit suffix ("AED", "per week") inside the field in slate; result renders in a stat-tile.
**Form rules:** one column, always · 4 fields maximum (IA §5.8) · labels in owner vocabulary · consent microcopy (`type.small`) under the submit, linking `/legal/privacy` · errors summarized at top on submit with anchor links, field-level messages persist · autocomplete attributes on every field (name, tel) — typing on a phone is friction we can delete.

### 8.5 Navigation (top bar)

**Anatomy:** wordmark · 5 links · P0 (`cta.nav`) · WhatsApp affordance. Height 72 → 60 condensed.
**States:** top-of-page (transparent, no border) · scrolled (glass per §5, hairline bottom) · current page (`aria-current` + 2px molten underline offset 6px).
**Mobile:** wordmark · WhatsApp icon · labeled "Menu" trigger → full-height sheet (`elevation.3`, `motion.setpiece`, focus-trapped, Esc/scrim closes) with the IA §4 stack: links → industries accordion → P0 pinned in thumb zone → promise chip → WhatsApp row.
**Sticky mobile bar:** two-rail (WhatsApp P0 + Book P1), `elevation.2`, safe-area padded; reveal per IA §4 (scroll-intent, hides on input focus, suppressed on conversion pages). Slides up at `motion.standard`; **no entrance animation on first reveal** under reduced motion.

### 8.6 Accordion (FAQ, industries-in-sheet)

Row = full-width button: question (`type.h3` scale-down 20px) + chevron (rotates 180°, `motion.standard`). Answer region animates open at `motion.standard` (reduced motion: instant). Hairline separators; multiple rows may open; chevron + spacing signal state — never color alone. ARIA: button + `aria-expanded` + region pattern. Deep-linkable: `#faq` anchors open the targeted row.

### 8.7 Process Stepper

Mono step numerals (`01`–`05`) on a connective line; horizontal ≥`bp.lg`, vertical below. The line draws in once (`motion.setpiece`); molten is permitted on the line (signature connective moment, §2.4). Semantically an ordered list — the visual is decoration over `<ol>`, invisible to screen readers.

### 8.8 System Map + Module Panels

Desktop: seven nodes around a center; selecting a node opens its panel adjacent; connections highlight (teal on dark). Keyboard: nodes are a tab sequence, arrow keys move between, Enter opens — implemented on the tabs pattern (map = tablist, panels = tabpanels). Mobile: the map linearizes into a **vertical accordion of module panels** — no miniature diagram pinching. Reduced motion: connections shown highlighted statically on selection.

### 8.9 Demo Thread Player

Anatomy: phone-proportioned frame (`radius.l`), thread canvas, mono status captions below (`ENQUIRY RECEIVED` → … per copy deck §5a), `SIMULATION` badge always visible, Run/Replay control (ghost). Messages enter per §7 pacing with poster-first loading (the completed thread is the LCP-safe poster; interaction rewinds and plays). Reduced motion: completed thread + captions listed statically. The player is **one component** reused in hero (auto-play once, muted status line) and proof section (user-triggered) — configuration, not duplication.

### 8.10 Tables

Used for: pricing comparison (`/pricing` §5), case before/after numbers. Header row mono-label; numerals tabular, right-aligned; hairline row separators; row hover tint (2% ink / 4% off-white). Mobile: comparison tables restructure into stacked labeled cards; numeric tables scroll inside their own container with edge-fade affordance — **the page never scrolls horizontally.** Every table has a caption; column headers are real `<th>`.

### 8.11 Modals & Sheets

**Policy first:** no marketing modals, ever — no exit-intent, no newsletter interrupts, no cookie theater beyond legal necessity. Modals exist for exactly two jobs: the **booking calendar** (mobile: bottom sheet; desktop: centered `elevation.3` dialog, max-width 560) and **demo player expansion** (mobile). Anatomy: title, close (44px), content, single action zone. Behavior: focus trap, Esc + scrim close, scroll lock, focus returns to invoker, glass scrim per §5. One modal at a time; a modal never opens a modal.

### 8.12 Dropdowns & Menus

Navigation dropdowns are **banned** (IA §3). The only floating menu is the desktop select alternative if native proves insufficient post-launch (listbox pattern, `elevation.2`, max-height 5.5 items then internal scroll). Until data demands it: native selects only.

### 8.13 Inline feedback (toast policy)

No toasts on marketing pages — confirmation happens **in place** (form → success state in situ, calculator → result tile) or on `/growth-audit/booked`. Toasts are an app pattern; this site confirms where the user is looking.

---

## 9. Dark Mode (Engine Room bands)

- Applied per **section band**, set by the page — components consume the theme context; none may hard-code theme.
- Token remapping: canvas `offwhite→ink` · surface `white→graphite` · text `ink→offwhite` · secondary `slate→inverse-secondary` · border `mist→steel` · link/focus `copper-text→gold` (gold on ink ≈10:1 ✓) · data accents gain teal.
- Molten P0s are identical in both themes (gradient + Ink label passes on both).
- Band transitions are structural (background change at section boundary), not animated wipes (killed in v1.1).
- Imagery/product-UI slots need dark-band variants or a neutral frame — never a white screenshot floating raw on ink.

---

## 10. Responsive Rules

1. Mobile-first: every component is designed at 360px before `bp.lg`.
2. Type scales fluidly between breakpoints (clamp-based ramp defined per token); spacing steps down one token below `bp.md` (e.g. section 96→64).
3. Touch targets ≥44×44 with ≥8px separation (WCAG 2.5.8); hover-revealed content is banned — hover only *enhances* what's already visible.
4. Thumb-zone rule: on mobile, the terminal action of any flow sits in the lower half of the viewport (sheet CTAs pinned bottom).
5. Component reflow is **defined, not improvised**: map→accordion (§8.8), comparison table→cards (§8.10), stepper horizontal→vertical (§8.7), footer columns collapse legitimacy-first (IA §10).
6. Wide content scrolls inside its container, never the page (§8.10).
7. Test matrix: 360/390/768/1024/1280 × light/dark bands × EN/AR-stress × Instagram-WebView (perf budget: strategy §15.1).

---

## 11. Accessibility Standard (WCAG 2.2 AA, enforced per component)

- **Contrast:** all pairs per §2.6 matrix; automated checks in CI against tokens (no manual eyeballing).
- **Keyboard:** everything operable; visible focus (§8.1 ring spec) never suppressed; skip-link first; focus order follows visual order; traps only in modal/sheet with Esc exit.
- **Semantics:** landmarks per template; one `h1`; heading levels never skip; decorative motion/SVG `aria-hidden`; the stepper, map, accordion, and tables use the ARIA patterns named in their entries.
- **Motion:** `prefers-reduced-motion` = completed-state rendering everywhere; no autoplaying motion longer than 5s without pause (hero demo plays once, then rests with Replay).
- **Zoom & reflow:** 200% zoom and 320px-equivalent reflow without loss; no text in images (demo thread is live text, which also keeps it translatable).
- **Forms:** programmatic label association, error identification in text, `autocomplete` attributes, no timeout on form completion.
- **Targets:** ≥44px, spacing per §10.3.
- **Language:** `lang` per page; mixed-language strings (AED numerals) marked where pronunciation matters.

---

## 12. RTL Readiness (built now, used in Phase 2)

All spacing/alignment via logical properties (start/end, never left/right) · iconography mirrors except brand glyphs, clocks and phone icons · chevrons/arrows flip with reading direction · numerals remain Western Arabic (UAE business convention) with tabular alignment intact · the demo thread mirrors bubble alignment · type rules per §1 Arabic notes. A component that fails RTL flip review is not done.

---

## 13. Governance

**Definition of Done — every component, no exceptions:**
1. Both themes · all states (rest/hover/active/focus/error/loading where applicable) · reduced-motion variant · RTL flip · 360px reflow.
2. Content stress-tested: longest real string (copy deck), +30% (Arabic headroom), and empty/gated state (IA §11 — layouts must not depend on gated content).
3. Contrast pairs verified against §2.6; tap targets verified; ARIA pattern named in spec.
4. Performance reviewed: no banned effects (§5 glass rules, §7 laws), no new dependency.
5. Named, tokened, and documented in this file **before** first use.

**Restraint rule (the Apple clause):** proposing a new component requires demonstrating that no existing component + tokens can do the job. The reviewer's default answer is no.

**Versioning:** this document is versioned with the repo; token changes are minor versions, component API changes are major; the changelog lives in commit history against this file.

**Precedence:** strategy spec (brand/voice) → IA (structure/behavior placement) → **this document (visual & interactive definition)** → implementation. Conflicts resolve upward, and produce an edit, not a workaround.

---

*End of Forge DS v1.0. Corrections this system feeds back upstream: Steel demoted from "secondary text on dark" to borders-only (contrast failure) with new `color.inverse-secondary` token; teal restricted to dark bands with `teal-deep` light variant; semantic colors split into fill + `-text` variants. Strategy spec §7.2 updated to match.*
