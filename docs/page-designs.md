# YanForge — Page Design Specifications

**PD v1.0 · Lead Product Designer layer.** Sits on top of the Forge design system (tokens, components, states), the IA (structure, flows), and the copy deck (strings). This document specifies **layout**: how components occupy space on every page, at every breakpoint, and why. **No code, no pixel-pushing** — grid positions, tokens, and reasoning.

**Reading note:** presented desktop-first per brief (design intent is clearest at full width); the build remains mobile-first per DS §10 — the mobile column is the floor everything must collapse into, not an afterthought.

**Brief-to-canon map** (the requested sections exist under these canonical names):

| Brief section | Canonical home |
|---|---|
| Hero | Home §1 |
| Problems | Home §2 (problem + calculator) |
| Solutions | Home §3 beat 1 ("the shift") |
| Growth Engine | Home §3 (The System dark band) |
| Automation | Home §3 beat 3 (engine in motion) + /system §4 |
| Testimonials | Proof slots — **gated**, testimonial card DS §8.3 |
| Case Studies | /results + case cards — **gated** per IA §11 |
| FAQ | Home §9 + per-page FAQs |
| Contact | /growth-audit (the conversion hub) |
| Footer | Global template element |

---

## 1. The global layout language

Seven systems govern every page; per-page specs below only state deviations.

### 1.1 Layout DNA — the 7/5 split
The signature composition: on the 12-column grid, **argument text occupies columns 1–7, evidence occupies columns 8–12** (7/5). Text left, proof right — the eye reads the claim, then lands on the demonstration. This orientation is **held constant down the page** (no L-R-L-R zigzag; alternation forces the eye to re-find its anchor every section and reads as template filler). The monotony risk is handled by *density pulsing* (§1.7), not mirroring.

Exactly **two centered moments** per page are permitted — composition breaks that mark narrative peaks. On Home: the shift (scattered→forged) and the final CTA. A centered block after 6 left-anchored sections lands like a held breath.

### 1.2 Spacing — proximity is grammar
- Section padding `space.128` top/bottom desktop (heroes `space.160`), `space.96` tablet, `space.64` mobile.
- Within a section: overline→headline `space.12` · headline→lead `space.24` · lead→evidence `space.48` · evidence→section CTA `space.48`.
- The rule beneath the numbers: **space between blocks ≥ 2× space within blocks.** Whitespace does the grouping so borders don't have to; hairlines appear only where space alone is ambiguous (tables, accordions).
- Card grids: gap `space.24` within a row, `space.48` between conceptual groups.

### 1.3 Hierarchy — one voice per altitude
Every section = exactly one of each: mono overline (the section's *category*), one headline (the *claim*), optional one lead (the *explanation*), then evidence (the *demonstration*). Never two claims per viewport. Hierarchy tools in DS-mandated order: weight → size → color. The squint test governs: blurred to 10%, every section must still show one dominant element, and it must be the claim or the evidence — never chrome.

### 1.4 Typography in layout
Left-aligned rag-right everywhere; centered text only at the two centered moments, and never more than 3 lines centered. Headline measure ≤14 words / lead ≤ 60ch / body ≤ 68ch — enforced by column width, not manual breaks (display headlines cap at cols 1–8 even when the text block is 1–7 + margin). Mono overlines always +4% tracked, uppercase, `slate`/`inverse-secondary` — they are *labels*, quiet by design; if an overline draws the eye, it's wrong.

### 1.5 Color deployment — the molten budget
Pages are off-white by default. Dark bands are listed per page — never more than two per page (strategy v1.1). **Molten budget is counted per page** in each spec: the sum of gradient-filled elements a visitor can see across the full scroll. If a page's count exceeds its section count, molten has become structure — redesign. Copper numerals (one per viewport max), teal only inside dark bands, semantic colors only inside components.

### 1.6 Imagery — three classes, no fourth
1. **Product truth** (dominant): the demo thread player, module UI panels, dashboard fragments — always inside device/panel frames (`radius.l`), never floating raw screenshots. In dark bands, framed on `graphite`.
2. **Environment photography** (sparse, About + industry heroes only): real UAE interiors — a chair, a reception desk, a phone on a counter — warm grade, natural light, shot wide enough to breathe, never people pointing at screens. Every photo must pass: *"could a competitor caption this with their logo?"* If yes, too generic — reshoot.
3. **System diagrams** (dark bands): SVG node-and-line visuals in `steel`/`teal`/molten sparks.
Stock, illustration-pack 3D, and decorative abstracts are banned. When no honest image exists, the section runs on type and space — an empty slot never gets filled with a lie.

### 1.7 Visual rhythm — the density pulse
The page breathes: **airy → dense → airy**. Airy sections (hero, shift, final CTA) run huge type with a single focus; dense sections (modules, tiles, FAQ) run grids at higher information pressure. Rhythm devices, in order of strength: theme change (light↔dark, max 2 dark bands) → density change → centered moment → hairline. Two same-density sections never sit adjacent; if the content forces it, a stat strip or connector note (DS badges) is inserted as a rest beat. Scroll cadence target: a new *idea* every 1.5–2 viewports — never a new idea mid-viewport.

---

## 2. Home `/` — full specification

Theme sequence: light → light → **dark** → light ×6 → **dark bookend**. Molten budget: 8 (nav CTA, hero P0, calc CTA, map active-state, proof CTA, tier numeral + tier P0, final P0) across 10 sections ✓.

### §H1 Hero *(light, `space.160`)*
**Desktop:** text cols 1–6; demo player cols 8–12, top-aligned with headline cap-height. Overline → display H1 (2 lines max) → lead → CTA row (P0 + ghost, `space.16` gap) → trust chips row `space.32` below. Player runs auto-once; caption ("*Booked at 9:47pm…*") in `type.small` slate directly under the device — the caption belongs to the *image*, not the text column, so the eye pairs them.

```
|  1  2  3  4  5  6  |  7  |  8  9  10 11 12 |
|  OVERLINE          |     |  ┌───────────┐  |
|  DISPLAY H1        |     |  │  demo     │  |
|  lead …            |     |  │  thread   │  |
|  [P0]  [ghost]     |     |  │  player   │  |
|  chips ◦ ◦ ◦       |     |  └───────────┘  |
|                    |     |   caption       |
```

**Tablet (8-col):** text cols 1–8, player below cols 2–7 — the promise is read *before* the proof appears; never squeeze both side-by-side under 1024.
**Mobile:** single column: overline → H1 (40–44px fluid) → lead → P0 (full-width) → ghost (text-style) → player → caption → chips (horizontal scroll, edge-fade). CTA above the player: on a 360px screen the ask must be visible without scroll.

### §H2 Problems + calculator *(light, `space.128`)*
Two beats, one section. **Story beat:** measure-width prose (cols 1–7) — deliberately *unillustrated*; the 9:47pm story runs as pure type at `type.body-l`, because an image would compete with the movie in the reader's head. Leak list follows as 4 hairline-separated rows (not cards — cards would make pains feel packaged; rows feel like a ledger). **Calculator beat**, `space.64` below: a single elevated card (`elevation.1`) spanning cols 3–10 — the section's only surface, so it reads as *the tool* — inputs left (3 stacked fields), result stat-tile right, molten CTA under result. Copper numeral = this viewport's one permitted display number.
**Tablet:** calculator card cols 1–8; inputs above result. **Mobile:** story full-width; calculator card edge-to-edge (margins `space.20`), inputs → result → CTA stacked; result tile sticky-ish emphasis via scale, not position.

### §H3 The Growth Engine *(THE dark band — Ink canvas, `space.128`, extra `space.64` entry padding to let the theme change land before content starts)*
Three beats inside one band:
- **Shift (centered moment #1):** overline + H2 + sub centered, cols 3–10. Above the text, the SVG convergence: scattered fragments (from §H2's visual periphery) pulling into the ordered system diagram, molten sparks on the connective lines. This is the emotional crest — nothing else in the viewport.
- **Modules:** system map cols 1–5 (7 nodes, teal connections), active module panel cols 6–12 on `graphite` (`radius.l`, product UI + outcome line). Map is the *index*, panel is the *content* — index-left mirrors how the eye uses a ToC.
- **Automation (engine in motion):** horizontal journey rail across cols 1–12 — five mono-labeled steps with caption cards beneath; the running vignette animates left→right (logical-start→end for RTL). Steps connected by a drawn line; the rail is the band's exhale after the dense map.
**Tablet:** map above panel, both full-width; journey rail becomes 2×3 grid with drawn connections. **Mobile:** map linearizes to the DS §8.8 accordion (no pinch-diagrams); journey becomes a vertical timeline, line drawn top→down, captions right of the line.

### §H4 Proof *(light again — the theme snap back to off-white IS the "back to reality" cue, `space.128`)*
Launch mode: demo player (reused component, user-triggered) cols 1–6; the honest-part candor block cols 8–12 as plain type on canvas — **deliberately not a card.** Packaging honesty in a decorated container would undercut it; it runs as a letter, hairline-topped, with the founding-partner terms as an indented list. Proof mode (post-gate): stat tiles row (3-up) → case cards (2-up) → testimonial cards (2-up, photo left 1/3). Testimonial photos: real faces, `radius.m`, never cropped circles (circles miniaturize faces; this audience reads faces for trust).
**Mobile:** player → candor letter → CTA, single column; candor never truncated behind "read more" — cutting the honesty section is cutting the strategy.

### §H5 Industries *(light, dense beat, `space.128`)*
Five tiles + hub line: grid 3+2 (row 1: med spas, salons, dental; row 2: gyms, premium, centered under gaps — the 2-row asymmetry signals "categories," not "features"). Tiles are equal-height base cards; pain headline `type.h3`, mono vertical overline. Hub line full-width below at `type.body`, text-link CTA.
**Tablet:** 2+2+1. **Mobile:** vertical stack, full cards (not a carousel — carousels hide 80% of options and this is a *routing* moment; scrolling five cards costs nothing).

### §H6 Why + Process *(light, `space.128`)*
Pillars: 3-up card row (equal height, icon 32 + title + 3 lines). `space.64` below: the process stepper cols 1–12, five nodes on the drawn line, captions beneath each node, `type.small`-plus. The stepper line is molten (permitted connective moment) — the only warm element in this viewport.
**Tablet:** pillars 3-up holds (cards narrow gracefully); stepper horizontal holds at 8 cols. **Mobile:** pillars stack; stepper rotates vertical (DS §8.7), captions right of line, thumb-scrollable as one continuous strand.

### §H7 Pricing anchor *(light, `space.128`)*
Three tier cards 4-4-4, Growth center with badge + `elevation.2` at rest (the only resting-elevated card on the page = the default choice, stated structurally). "From AED" numerals in copper tabular figures. Payback line full-width beneath in `type.body-l` — set as prose, not inside any card: it's the owner's thought, not our claim. Risk-reversal line + P0.
**Tablet:** 3-up holds narrow; if content wraps badly, Growth first at full width, Starter/Scale 2-up beneath. **Mobile:** stack ordered Growth → Starter → Scale (anchor-first ordering beats price-ascending for decision quality); cards full-bleed-minus-margins.

### §H8 About snapshot *(light, warm, `space.96` — deliberately the shortest section)*
Photo cols 1–4 (environment class, founder in real workspace, `radius.l`), text cols 6–12: H2 + 3 lines + caption-under-photo + text link. The compressed height is intentional: a fast human beat between two commercial sections, not a biography.
**Mobile:** photo above text, photo height capped at 56vw.

### §H9 FAQ *(light, dense, `space.128`)*
Accordion cols 3–10 (centered column, but left-aligned text — narrowed measure signals "reference material," distinct from argument sections). All rows closed by default; hairlines; generous 20px question size.
**Mobile:** full-width minus margins.

### §H10 Final CTA *(dark bookend — compact, `space.96`, centered moment #2)*
Ink band, H2 + sub + dual-rail P0 + promise chip + closer line, all centered cols 3–10. Single molten spark traces the band's top hairline on enter (DS-permitted). Short by design: half the hero's height — a bookend, not a second hero.
**Mobile:** stacked, P0s full-width, WhatsApp rail first.

### Footer *(Ink continues from §H10 — footer lives inside the dark bookend visually, hairline-separated)*
Per IA §10: 4 columns desktop (brand/legitimacy widest, cols 1–4) · tablet 2×2 · mobile single column collapsing legitimacy-first. Utility bar full-width base.

---

## 3. Subpages

Shared template DNA: subpage heroes are **half-height** (`space.96` padding, H1 scale not display — Home makes the promise; subpages keep it), breadcrumb-less at depth 1, context line under H1 for Flow-D standalone comprehension. Every subpage ends with the standard CTA band (compact §H10 variant, light or dark per page).

### 3.1 `/system` — theme: light with **one** dark band (modules+journey)
Hero (7/5: claim left, static system diagram right) → principle section (prose, cols 1–7, unillustrated — same "let them think" logic as the 9:47 story) → **dark band:** 7 module walkthroughs as alternating-free 7/5 rows (text 1–6, UI panel 7–12, orientation held), `space.96` between modules — this page's *rhythm* is a steady piston: claim/panel, claim/panel → integration strip (light): logo row of connectable tools on hairline cards, `radius.s`, grayscale logos (color logos would out-shout our palette) → data & control (7/5, dashboard fragment right) → FAQ (narrow column) → CTA band.
**Tablet/mobile:** module rows stack text-then-panel; the piston rhythm survives as vertical alternation of type and image.

### 3.2 `/industries` hub — light throughout, no dark band
Half-hero → 5 selector cards in a single 3+2 grid (same as §H5 but cards grow: +outcome line +mini "week one" line) → shared-outcomes strip: 4 stat-shaped tiles (no invented numbers pre-gate — outcome *statements* in the tile format) → WhatsApp qualifier row → CTA band. This page is deliberately shallow: it's a router, and routers must be faster than the pages they route to.

### 3.3 Industry template (×5) — light, one dark band (the vertical's system)
Half-hero with **environment photo** right 5 cols (the one place industry photography lives: *their* room, *their* chair) → pain mirror: 4 ledger rows in vertical vocabulary → tuned calculator (same card as §H2, defaults per IA deltas) → **dark band:** the system re-narrated for the vertical + flagship automation as a 5-step journey rail with vertical-specific captions → proof slot (gated: demo + candor variant; post-gate: the vertical's case card) → week-one snapshot (3-step mini-stepper) → vertical FAQ → CTA band with industry pre-fill.
Rhythm note: this template is Home compressed — same pulse, 70% length, photo where Home had the demo player (the vertical page's "evidence" is *recognition*, not simulation).

### 3.4 `/process` — light throughout (deliberately the calmest page on the site; theme itself communicates "nothing scary here")
Half-hero → the 5 steps as **full-width horizontal bands**, each `space.96` tall: number in oversized mono (copper, cols 1–2), step content cols 3–8 (what we do / what you do / what you get as 3 micro-columns), duration chip right. Steps separated by the drawn connective line running *through* the section stack — one continuous thread top to bottom, the page's spine → week-one reality (prose + day strip) → ongoing operation (2-col: we/you) → "what the audit looks like" (bridge, 7/5 with calendar UI fragment) → FAQ → CTA band.
**Mobile:** number shrinks to inline chip; three micro-columns stack; the spine line survives as left rail — on this page the line *is* the argument (continuity = safety).

### 3.5 `/pricing` — light throughout
Half-hero (honesty lead) → tier cards (as §H7 but expanded inclusion lists; equal-height enforcement matters most here — ragged pricing cards read as hidden differences) → payback calculator embed (§H2 card reused, result reframed) → always-included strip (4 chips) → comparison table (DS §8.10: we vs hiring vs DIY-SaaS vs agency; our column NOT pre-highlighted — the honest table wins by content; highlighting our column is the car-dealer move this page exists to avoid) → terms & risk reversal (prose, letter-style like the candor block) → FAQ → CTA band.
**Mobile:** comparison restructures to stacked per-alternative cards, ours last (recency, not first-position pushiness).

### 3.6 `/about` — light, warmest grade
Hero: photo-led inversion — **the one page where imagery leads:** environment portrait cols 1–5, H2 + thesis right (evidence-first because the page's claim IS the person) → story: single measure column, `type.body-l`, generous `space.32` paragraph gaps — read like an essay, no pull-quotes (pull-quotes are for skimming; this page rewards the 90 seconds) → how-we-work: 3 behavior cards → founding-partner block (letter-style, shared component with §H4) → local grounding: map-adjacent strip with address/phone in large type (legitimacy as *display type*, not footer-print) → warm CTA band (WhatsApp-first).

### 3.7 `/growth-audit` + `/booked` — light, chrome-suppressed (IA §4)
The most conservative layout on the site — novelty tax is paid everywhere else; here, zero: centered single column cols 4–9 throughout. Header (H1 + promise chip) → rail chooser: two equal cards side-by-side (WhatsApp | calendar), **equal visual weight** — the chooser must read as "which door," not "main door + fallback"; mobile: WhatsApp card first, stacked → beneath the chosen rail: 4-field form or calendar embed → what-happens-next: 3-step mini-rail → candor block (compact) → proof strip → mini-FAQ. No dark band, no display type beyond H1, nothing animates except field feedback.
`/booked`: confirmation H2 → timeline (3 nodes) → vCard + WhatsApp opener buttons (the only two buttons) → prepare list → while-you-wait links as text row. Total height under 2 viewports — completion pages that scroll forever feel like upsells.

### 3.8 `/demo` *(Phase 1.5)* — **the exception page: dark throughout** (the only all-dark page; it IS the engine room, and arriving from a WhatsApp share it must read as "the machine itself")
Player centered cols 4–9 near-full viewport → live-line instructions as oversized mono (`text DEMO to +971…` set at h3-scale — the instruction is the headline) → annotated beats (5 rows) → CTA band (light — the exit back to the site's world).

### 3.9 `/results` + case detail *(gated)*
Index: half-hero → filter chip row → case cards 2-up (generous, `space.32` gap — scarcity of cases early means 2-up at large scale, not 3-up with gaps showing) → method note (letter-style) → CTA.
Case detail: snapshot header with headline metric in display-scale copper tabular (the one page where a giant number leads — it's earned, it's real) → problem prose → modules involved (chip row) → before/after table → attributed quote with photo → vertical bridge link → CTA band.

### 3.10 `404` — light, centered, one viewport
H2 + the copy-deck line + three text links + WhatsApp button. Warmth over cleverness in layout: no illustration hunt, just fast exits.

---

## 4. Tablet & mobile — the transformation rules (consolidated)

| Pattern | Desktop | Tablet (768–1023) | Mobile (<768) |
|---|---|---|---|
| 7/5 argument/evidence | side-by-side | text full-width, evidence below | stacked, CTA before heavy media in hero only |
| Card rows | 3-up | 2-up (odd card full-width first) | stack — carousels banned for routing content |
| System map | map + panel | map above panel | accordion (DS §8.8) |
| Journey/stepper | horizontal rail | 2×3 or horizontal-hold | vertical timeline, line at left |
| Comparison tables | table | table (scroll-in-container) | stacked labeled cards |
| Footer | 4-col | 2×2 | single column, legitimacy first |
| Section padding | 128/160 | 96 | 64 |
| Centered moments | cols 3–10 | cols 2–7 | full-width, text left-aligned if >3 lines |
| Two-rail chooser | side-by-side equal | side-by-side | stacked, WhatsApp first |

Universal mobile laws: nothing horizontal-scrolls except chip rows and in-container tables (both edge-faded) · the first viewport of every page contains a P0 or the sticky bar has appeared · type floor and tap targets per DS · dark bands keep full section padding (compressing dark bands makes them read as banners, not places).

---

## 5. Design QA — the walkthrough test

Before any page ships, walk it at 100% zoom desktop, then 360px, answering:
1. Squint: one dominant element per viewport? Is it claim or evidence?
2. Count molten: within budget? Strip it mentally — does layout still work?
3. Read only headlines top to bottom: do they tell the whole argument alone? (They must — that's the skimming owner's actual path.)
4. Find the two centered moments: do they land at narrative peaks?
5. Any two adjacent sections at same density? Insert rest beat.
6. Cover the images: does every section still make its claim? Cover the text: does the evidence still demonstrate?
7. Time the scroll at reading pace: new idea every 1.5–2 viewports?

---

*End of PD v1.0. Precedence: strategy (brand) → IA (structure) → DS (components) → **this document (composition)** → build. Figma translation note: frames at 1440/834/390, grid per DS §3, every layout above maps to auto-layout with DS tokens — no detached instances.*
