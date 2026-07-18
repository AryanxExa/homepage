# YanForge Motion Design Bible

**MO v1.0 · Motion Design Director layer.** Governs every moving pixel. Sits on DS §7 (tokens) and strategy §9 (principles); this document is the complete catalog and the rulings. **No code** — every entry specifies trigger, properties, values, physics, and fallback; implementation maps directly.

---

## 1. Doctrine

Every animation must belong to exactly one of four purposes:

| Purpose | Definition | Examples |
|---|---|---|
| **Demonstrate** | Shows the product working or the system connecting | Demo thread, convergence, journey rail |
| **Orient** | Explains where content came from or went | Section entrances, accordion, sheet, route change |
| **Feedback** | Confirms the user's action registered | Button press, input focus, form states |
| **Reward** | A small, earned moment of craft after user intent | Calculator count-up, stepper line draw |

**If a proposed animation fits none: it does not exist.** "It looks premium" is not a purpose — premium is the *result* of restraint, timing quality, and physical consistency, not of quantity. Corollaries:

1. Nothing moves before the user can read the headline (LCP is sacred).
2. Nothing moves that the user didn't cause, except the hero demo (plays once) and scroll-triggered entrances (caused by scrolling).
3. Nothing loops, pulses, or begs. An element that keeps moving to attract attention is advertising to a captive audience — the trust cost exceeds any click it earns. (This bans CTA pulses and WhatsApp-float throbbing explicitly.)
4. Motion is one system: same physics vocabulary everywhere. A spring in the hero and a linear fade in the footer is two products.

---

## 2. The Stack — rulings

| Tool | Ruling | Rationale |
|---|---|---|
| **Framer Motion** | **Primary and only animation library.** Entrances, gestures, layout transitions, scroll triggers, springs. | One physics system, one API, tree-shakeable within the 150KB landing budget (strategy §15.1). |
| **Lenis** | **Admitted, desktop-only** (pointer-fine + no reduced-motion + not WebView). Touch devices keep native scrolling, always. | ~4KB; smooth scroll makes the editorial rhythm legible on desktop. On touch it fights the OS scroll physics users' thumbs know — and in-app WebViews (our #1 entry) punish hijacked scroll with jank and broken momentum. Native scroll is not a fallback; on mobile it *is* the design. |
| **GSAP** | **Not admitted.** Standing admission process: a set-piece that demonstrably cannot be built with Framer Motion + SVG/CSS (e.g., future scrubbed timeline >5 coordinated elements) may petition — named animation, purpose class, KB cost, and proof of Framer insufficiency. Until a petition passes, zero GSAP bytes ship. | "Only if absolutely necessary" — nothing in this catalog is beyond Framer Motion + native SVG line-draw. A second animation runtime is 30–60KB of physics we already have. |
| **Native CSS** | Micro-interactions (hover, focus, underline) run on CSS transitions — no JS wake-ups for 120ms feedback. | Cheapest frames are the ones no library renders. |

---

## 3. The Physics Language

### 3.1 Duration scale (DS tokens, restated with roles)

| Token | ms | Role |
|---|---|---|
| `motion.fast` | 120 | Feedback: hover, press, focus tint |
| `motion.standard` | 200 | Orient: accordion, menu, crossfade, route change |
| `motion.entrance` | 320 | Orient: section/card reveals (240 on mobile) |
| `motion.setpiece` | 560 | Demonstrate/Reward: convergence, line draws, sheet |
| `motion.narrative` | 800–1200 | Reward: count-ups; Demonstrate: thread pacing envelope |

**Delay law:** delays exist only inside choreography (stagger, timeline offsets). A lone element never waits — perceived latency is the one motion sin users consciously notice. Max choreographed delay before *anything* responds to a trigger: 80ms.

**Stagger:** `stagger.unit` 40–80ms · max 6 staggered items, 7th+ arrive together · staggers run start→end in reading direction (auto-flips RTL).

### 3.2 Easing (editorial motion — entrances, reveals, exits)

| Token | Curve | Use |
|---|---|---|
| `ease.enter` | cubic-bezier(0.22, 1, 0.36, 1) | Everything arriving — fast start, long confident settle |
| `ease.interact` | cubic-bezier(0.4, 0, 0.2, 1) | Hover/press/exit — symmetric, businesslike |
| `ease.linear` | linear | Only inside SVG line-draw progress and count-up value interpolation |

### 3.3 Springs (physical motion — things the user "touches")

Three named presets; no ad-hoc spring values, ever:

| Preset | Stiffness / damping / mass | Character | Use |
|---|---|---|---|
| `spring.snap` | 500 / 32 / 1 | Immediate, no overshoot | Button press-release, toggle, chip selection |
| `spring.settle` | 300 / 26 / 1 | One soft settle, ≤2% overshoot | Card lift return, sheet arrival, panel swap |
| `spring.drift` | 170 / 22 / 1 | Slow, weighty | Hero device idle depth (§5.10), sticky-bar reveal |

**Ease vs. spring rule:** *editorial* content (text, sections, images) uses eases — it's being presented. *Interactive* objects (buttons, cards, sheets) use springs — they're being handled. This split is what makes the site feel engineered: documents glide, machinery responds.

### 3.4 Property law

- Animatable: `transform` (translate/scale/rotate) and `opacity`. Nothing else on the main scroll path.
- **Scale ranges:** entrances 0.98→1 (never from 0.8 — large scale-ins read as advertising); press 1→0.98; card hover lift −2px translateY, no scale (scaling cards blurs text mid-transition).
- **Translate ranges:** entrance rise 24px desktop / 12px mobile; slide-in 8px for crossfades. Anything >32px of unearned travel is theater.
- Banned: animated `filter`/blur, animated shadows (swap elevation token at midpoint of the transform instead), animated colors on text (background-position gradient shift is permitted on molten fills), width/height animation except measured accordion, `layout` animations on text blocks (reflow = comprehension damage).
- Opacity floor for entrances: 0 → 1 is permitted only alongside transform; pure fades are reserved for crossfades (`motion.standard`) — a lone fade-in is the weakest possible statement and usually means the element had no reason to animate.

---

## 4. Global Choreography

### 4.1 Hero load timeline (Home — the only page-load choreography on the site)

The page renders instantly (poster-first, strategy §15.1); this timeline layers *on top of* already-legible content — it re-introduces, never delays.

| Offset | Element | Animation |
|---|---|---|
| 0ms | Nav, hero text, poster | **Already visible** — no entrance; LCP owns frame zero |
| 0ms | Overline → H1 → lead → CTAs → chips | Sequential 60ms stagger: opacity 0.4→1 + rise 8px, `ease.enter` 320ms *(a whisper-pass over visible content — "settling into place," not appearing)* |
| 400ms | Demo device | Poster crossfades to live thread canvas, `motion.standard` |
| 700ms | Thread message 1 | Bubble: rise 12px + scale 0.98→1, `spring.settle` |
| +900ms each | Messages 2–5 | Same physics, reading-pace intervals (`motion.narrative` envelope) |
| last +400ms | Caption ("*Booked at 9:47pm…*") | Fade + 8px rise — the punchline arrives after the proof |

Reduced motion: everything at final state, thread complete, caption visible. Replay control appears after first run; the sequence never auto-repeats.

### 4.2 Section reveal (sitewide standard)

Trigger: IntersectionObserver, `rootMargin` −15% (fires just before the section's natural reading position — content is ready when the eye arrives, never animating *while* being read). Once per page life; scrolling up re-reveals nothing.
Spec: opacity 0→1 + rise 24px (12 mobile), `ease.enter`, `motion.entrance`; children (cards, rows) stagger 60ms, max 6. Overline and headline arrive as one unit — splitting claim from category is hierarchy vandalism.

### 4.3 Scroll animations — linked vs. triggered

- **Scroll-triggered** (fire once, then autonomous): all section reveals, line draws, count-ups. The default.
- **Scroll-linked** (progress maps to scroll position): **exactly two** on the whole site, both desktop-only, both transform-only: ① hero device idle depth (§5.10), ② dark-band diagram drift (§5.10). Scroll-linked motion on touch is banned — thumb-scroll velocity makes linked motion feel broken.
- Set-pieces:
  - **The convergence** (Home §H3): scroll-triggered, not scrubbed. Fragment cluster tightens (translate, 560ms, `ease.enter`) → SVG connective lines draw (linear, 560ms, 80ms stagger per line) → molten spark tracers run each drawn line once (400ms, linear) → node pulse ×1 (`spring.settle`). Total ≤1.6s, runs while the user reads the centered headline. Reduced motion / mobile-lite: completed diagram fades in as one image (`motion.entrance`).
  - **Journey rail / flagship automations:** each step's caption + panel crossfades in sequence when the rail enters; step-connector draws between them (linear 400ms). On mobile (vertical timeline) the spine draws top→down once, steps reveal on individual intersection.
  - **Stepper line** (/process spine): draws per-viewport-segment as the user scrolls through the page — the one place a draw is chunked, because the line's continuity *is* the page's argument. Chunks are triggered (not scrubbed) per section.
  - **Count-ups:** calculator result and (post-gate) stat tiles: 800–1200ms, linear value + `ease.enter` opacity, tabular numerals (zero layout shift), fire once. The calculator re-counts on every recalculation (it's feedback there, not reward — 400ms on recalc).

### 4.4 Page transitions

Route change: outgoing 120ms opacity→0.6, incoming 200ms opacity + 8px rise, `ease.interact`. No wipes, no shared-element theatrics, no transition >200ms — navigation is a promise of speed. Scroll restoration per IA §2 always wins over any transition. Anchor scrolls (`#demo` etc.): Lenis-eased 600ms desktop; native smooth mobile.

### 4.5 Loading states

- Marketing pages: **no skeletons, no spinners, ever** — poster-first rendering means there is nothing to wait for. A skeleton on a marketing page is an apology.
- Form submit: button label crossfades to inline spinner (`motion.standard`), width locked; success swaps in-place check + message (`spring.settle`).
- Calendar embed: reserved-height container, hairline placeholder, content fades in when ready — layout never jumps (CLS 0).

---

## 5. The Interaction Catalog

Each entry: trigger → animation → physics → reduced-motion (RM).

**5.1 Buttons (P0 molten)** · Hover: gradient background-position shifts 8° toward gold + lift −2px, CSS 120ms `ease.interact`; Press: scale 0.98 `spring.snap`, lift removed; Release: `spring.snap` return; Focus: ring appears **instantly** (0ms — focus is accessibility, never choreography); Loading: per §4.5. RM: color shift only, no lift.
**5.2 Buttons (ghost/P1)** · Hover: border brightens + fill tints 4%, 120ms. Press/focus as P0. No lift — hierarchy expressed in physics: only the primary rises.
**5.3 Text links (P2)** · Underline draws left→right 120ms CSS (logical direction, flips RTL). RM: underline appears.
**5.4 Cards (linked)** · Hover: lift −2px + elevation token swap at 60ms midpoint, 120ms; arrow glyph nudges 4px inline-end. Press: lift cancels. RM: elevation swap only. Non-linked cards do not react to hover — dead surfaces must not flirt.
**5.5 Accordion** · Open: height (measured) + content fade, `motion.standard`, `ease.interact`; chevron rotates 180° same clock. One physics for open and close (asymmetric accordions feel broken). RM: instant.
**5.6 Mobile menu sheet** · In: translateY 100%→0, `spring.settle`; scrim fade `motion.standard`; items stagger 40ms ×6. Out: `motion.standard` ease — exits are always faster and plainer than entrances (leaving should feel lighter than arriving). RM: instant swap.
**5.7 Sticky CTA bar** · Reveal at scroll-intent threshold: translateY 100%→0 `spring.drift` (arrives like machinery, not a popup); hides on input focus 120ms. Never re-animates on subsequent shows within a page life. RM: instant.
**5.8 System map** · Node select: panel crossfade + 8px slide `motion.standard`; connection lines to selected node brighten (teal) 200ms; deselected dim to 40%. Node hover: scale 1.04 `spring.snap`. RM: instant states.
**5.9 Demo thread player (proof section)** · User-triggered "Run": messages per §4.1 physics at 900ms intervals; mono status captions swap 120ms each beat; Replay resets instantly (0ms — resets are utilitarian). RM: full thread + captions static, Run becomes "Show steps" revealing beats as a list.
**5.10 Parallax — the restricted allowance** · Two instances, desktop + pointer-fine only, both `spring.drift`-smoothed, transform-only: ① hero device translates 0–6px against scroll (depth cue anchoring the 7/5 split), ② dark-band system diagram drifts 0–8px. **Nothing else moves against scroll.** Multi-layer scenic parallax is banned: it decorates instead of demonstrates, and it taxes the exact devices our buyers hold. RM/touch: off.
**5.11 Cursor — ruling: native only.** No custom cursor, no trailing elements, no cursor-following glows (spark trail already killed, strategy §21). A replaced cursor makes 40+ business users *aware of their hand* — friction at the exact layer that must be invisible. The cursor communicates via OS states (pointer/text/default) and the *targets* respond instead.
**5.12 Magnetic effects — ruling: banned.** Magnetism moves the target while the user aims at it. On conversion-critical elements that is measurably hostile (Fitts' law working against the click); on decorative elements it's award-bait with no purpose class. This site's precision *is* the brand — targets hold still.
**5.13 Image transitions** · Poster→live: crossfade `motion.standard`. Photography: fade-in only on intersection — **no Ken Burns drift** (moving photos of real places read as stock even when they aren't). Module UI panel swap: crossfade + 8px inline-start slide. Case-study before/after (post-gate): 200ms crossfade on toggle, no slider theatrics.
**5.14 Text reveal** · Display headlines (hero, centered moments only): per-**line** masked rise, 90ms line stagger, `ease.enter` — the text is real DOM, mask is visual only. **Per-character and per-word splitting is banned** sitewide: it destroys screen-reader output, invites CLS, and reads as agency showreel — the exact register we refuse. All other headlines and all body text: arrive with their section, whole. Mono overlines: no reveal effect ever (labels don't perform).
**5.15 Calculator** · Input focus: border + ring per DS. Result: count-up per §4.3; result tile scale 0.98→1 `spring.settle` on first result only. Recalc: 400ms re-count, no scale (feedback, not fanfare).
**5.16 Promise chip / badges** · Static. They are facts; facts don't move.
**5.17 WhatsApp float (desktop)** · Hover: lift + tooltip fade 120ms. **No idle animation** (doctrine 3).
**5.18 Nav** · Scrolled-state glass + hairline: 200ms crossfade driven by scroll position (binary state, eased — not scroll-linked). Active-page underline: draws 120ms on route settle. Condense: height 72→60 `ease.interact` 200ms.
**5.19 Modals/dialogs (calendar)** · In: scale 0.98→1 + fade `spring.settle`, scrim `motion.standard`; out faster (§5.6 exit law). RM: instant.
**5.20 Form validation** · Error: message fades in + field border 120ms; **no shake** — shaking a field scolds the user; errors inform, never perform. Success: in-place check `spring.settle`.

---

## 6. Performance Contract

- 60fps floor on Moto G-class; every catalog entry is transform/opacity compositor work.
- `will-change` applied only during animation, released after — standing `will-change` layers eat WebView memory.
- IntersectionObservers: pooled, passive; all reveal state drops after firing (once-only means the JS can forget).
- Motion code is split: below-fold choreography (convergence, journey, count-ups) loads after LCP; hero timeline ships in the critical bundle *only* because it operates on already-rendered content.
- WebView/save-data degradation ladder: full (desktop) → standard (mobile: shorter distances/durations, no scroll-linked) → lite (in-app WebView or `save-data`: entrances become 200ms fades, set-pieces render completed) → static (`prefers-reduced-motion`: everything at final state, feedback-only motion retained at 0–120ms).
- Lenis: desktop pointer-fine only (§2); destroyed, not paused, everywhere else.

---

## 7. Reduced Motion Doctrine

`prefers-reduced-motion` is a design input, not an exception path. Rules: every Demonstrate/Reward animation has a **completed-state** rendering (thread finished, diagram connected, numbers at value); every Orient animation becomes an instant state change; Feedback animations ≤120ms are retained (feedback is function). The RM experience is reviewed as its own design — it must feel *finished*, never broken or lesser.

---

## 8. Governance & QA

**Adding an animation** requires: purpose class (§1) · catalog entry (trigger/physics/RM/degradation rung) · token-only values · this document updated **before** merge. The reviewer's default is no (DS restraint clause applies to motion doubly).

**Motion QA walkthrough (per page, pre-ship):**
1. Load with network throttled: is anything invisible that should be readable? (Fail = doctrine 1 violation.)
2. Scroll at reading pace, then at flick speed: do reveals ever animate *while* being read? Do flicked sections arrive completed?
3. Tab through: does focus ever wait for choreography? (Must be 0ms.)
4. RM on: does every page feel finished?
5. In-app browser on mid-tier Android: lite rung engaged, 60fps held?
6. Count moving elements in any single second of idle: the answer must be 0.
7. The register test: screen-record 10 seconds and watch muted — does it read as *engineering demonstrating itself* or as *an agency performing*? Only the first ships.

---

*End of MO v1.0. Precedence: strategy (what motion means) → DS §7 (tokens) → **this document (the catalog and rulings)** → build. GSAP admission petitions amend §2 by PR.*
