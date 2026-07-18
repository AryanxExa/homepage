# YanForge Micro-Interactions — the Response Layer

**MI v1.0 · Refines Motion Bible (MO v1.0) — never contradicts it.** The Motion Bible governs what visibly moves. This document governs what *responds*: the sub-perceptual layer of acknowledgment, gesture, and state detail where perceived quality actually lives. A site feels alive not because things animate, but because **everything the user touches answers instantly, and nothing they didn't touch stirs.**

---

## 1. The five response principles (the Apple lesson, applied)

1. **Acknowledge before you animate.** Every interactive element shows a state change within **≤50ms** of input — a tint, a border, a scale tick — even if its full animation takes longer. Latency in acknowledgment is the difference between "premium" and "broken"; users forgive slow completion, never slow response.
2. **Direct manipulation.** Where a gesture moves a thing, the thing tracks the finger **1:1** (menu sheet, calendar sheet). Animation takes over only on release. Content the user is holding never lags behind the hand.
3. **Interruptible always.** New input cancels or redirects any running animation mid-flight — springs retarget from current position, never restart from zero. A user who taps during a transition is obeyed, not queued.
4. **States, not decoration.** A micro-interaction communicates a fact (pressed, focused, valid, selected, arriving). If it communicates nothing, it's deleted — this is MO doctrine 1 at the microscopic scale.
5. **Stillness is the baseline.** At rest, the page is *completely* still (MO QA #6). Against total stillness, a 2px lift reads as an event. This contrast is the entire budget of "alive" — spend it nowhere else.

---

## 2. The catalog

### 2.1 Navigation
- **Hover intent:** link hover states apply after a 40ms intent delay — skimming the cursor across the bar doesn't strobe five links. Once intent is established, subsequent siblings respond at 0ms (the "warm bar" behavior; intent is proven once per visit to the bar).
- **Active-page underline continuity:** navigating between pages, the underline doesn't blink off/on — it fades out with the old page and draws in on the new (route transition owns it). The nav reads as one persistent object, not a re-rendered strip.
- **Logo:** press-state only (scale 0.98 snap). No hover flourish — the mark is a fact.
- **Condensed-state hysteresis:** the bar condenses at scrollY > 64 but re-expands only at scrollY < 32 — the 32px dead zone prevents jitter at the boundary. Threshold behaviors everywhere use hysteresis; oscillation is the cheapest way to feel broken.

### 2.2 Buttons & the CTA
- **Press acknowledgment:** ≤50ms scale tick (1→0.98) on pointer-down/touch-down, before any other consequence. Release inside: action + `spring.snap` return. **Drag-off cancels** (touch slides off the target → state reverts, no action) — the OS-native contract, honored on web.
- **The P0 heat detail:** on hover, the molten gradient warms (8° toward gold) — but on *press*, it deepens 4° toward ember. Hover = invitation; press = commitment. Two temperatures, one metaphor, sub-conscious.
- **Post-action quiet:** after a CTA completes (form sent, WhatsApp opened), the button does not return to its inviting hover state under the still-hovering cursor — it rests at neutral. Re-invitation after completion nags.
- **Keyboard parity:** Space/Enter produce the identical press choreography. Keyboard users get the same physics, not a silent jump.

### 2.3 Cards & industry cards
- **Whole-card response:** the entire card is the target (DS §8.3); hover lifts card + nudges the arrow glyph 4px inline-end *as one object* — never two competing animations. The arrow returning on mouse-leave lags the card by 40ms: the card settles first, the detail follows — objects with mass settle outside-in.
- **Touch pressed-state:** on touch there is no hover; cards show a 120ms pressed tint (2% ink) on touch-down so tapping a card *feels held*, and drag-off cancels. Tap highlight is custom (the tint), never the browser's default flash.
- **Industry cards specifically:** the five tiles respond identically — **no featured-tile hover bias.** Equal physics = honest routing (the self-segmentation moment must not feel steered). Selection feedback happens on the *destination* page (its hero confirms the choice), not via a departing flourish.

### 2.4 Forms & input focus
- **Focus:** ring + border transition 0ms in, 120ms out — focus arrives instantly, releases gently. `focus-visible` only for keyboard; pointer focus shows the border shift without the ring (double-signaling a click the user just made is noise).
- **Label & caret:** the field's label does not float, shrink, or dance (labels are always-above, DS §8.4). The caret color matches `copper-text` — a two-second detail users never name but register as intentional.
- **Live formatting, tel field:** UAE numbers space themselves as typed (`05x xxx xxxx`), cursor position preserved through reformatting. Auto-advancing focus is banned — the user moves; we never move them.
- **Validation timing:** validate on **blur**, never on keystroke (being corrected while typing is being interrupted). After a field has erred once, it re-validates on **input** — so the error clears the instant it's fixed, without waiting for blur. Punish late, forgive immediately.
- **Calculator inputs:** stepper buttons repeat on hold (300ms delay, then 80ms interval, accelerating after 10 steps). The result re-counts only on settled input (250ms debounce) — numbers that thrash while typing feel slot-machine, not engineering.

### 2.5 Success states
- **In-place morph:** submit button's label crossfades to a drawn check (SVG stroke, 200ms) *inside the button*, then the confirmation copy arrives below `spring.settle`. The button never disappears mid-trust — the thing you pressed confirms, then the page elaborates.
- **Calculator result:** first result gets the one-time `spring.settle` scale (MO §5.15); the WhatsApp report CTA fades in 120ms *after* the count-up completes — the offer arrives once the number has landed, never during.
- **`/booked` page:** the confirmation check draws once (400ms) on arrival — the single largest feedback moment on the site, earned by the single largest user commitment.

### 2.6 Loading
- Restated from MO §4.5 with the micro-detail: any wait under **400ms shows nothing** — flashing a spinner for 200ms creates the *impression* of slowness. Between 400ms–2s: inline spinner. Beyond 2s (calendar embed cold load): spinner + one line of honest copy ("Loading the calendar…"). Never a skeleton, never a progress bar on marketing pages.
- Spinners rotate at constant velocity, `ease.linear` — eased spinners look like they're struggling.

### 2.7 Errors
- **No shake, no red flood** (MO §5.20). The micro-sequence: border transitions to error color (120ms) → message fades in below (120ms, 40ms later) → the field's label gains the error color *only while focused* (guides the fix without shouting across the form).
- **Summary-to-field:** tapping an error in the submit summary scrolls to the field (native smooth) and focuses it — focus arriving *after* scroll settles (150ms), so the ring doesn't streak across the viewport.
- Error states never animate on re-render — an error that re-announces itself on every keystroke is scolding.

### 2.8 The Growth Engine (system map)
- **Node acknowledgment:** touch/hover scales the node 1.04 `spring.snap` ≤50ms; selection commits on release. Connection lines brighten *outward from the selected node* (staggered 30ms per line) — causality flows from the user's touch, the map answers *from where they touched it*.
- **Panel continuity:** switching modules, the panel content crossfades but the panel *surface* persists — the machine's housing stays, its display changes. The panel never scales or slides as a whole (that would read as a new object; it's one instrument).
- **Mobile accordion variant:** opening a module gently scrolls it to the top third of the viewport (native smooth) — self-locating content, the reader never hunts for what they just opened.
- **Journey rail steps:** on touch, tapping a step pauses/resumes the vignette — direct control over the demonstration, no visible player chrome.

### 2.9 The demo thread player
- **Run acknowledgment:** the trigger acknowledges ≤50ms, the first bubble arrives within 300ms — the machine's *first* reply must feel instant (it's the product's whole claim), subsequent bubbles at reading pace.
- Tapping the thread mid-run completes it instantly (interruptibility: impatience is a command, not a problem).

### 2.10 Cursor
- Native cursor everywhere (MO §5.11 ruling stands). The micro-layer: correct cursor *semantics* — `pointer` only on true interactive targets, `text` over selectable copy, `default` over cards' non-interactive padding is avoided by making the whole card a target. Selection color: molten at 25% — even highlighting text answers in the brand's voice.

### 2.11 Footer
- Link hover: underline draw 120ms (P2 standard). The **+971 number and address** are one-tap actions (tel: and maps) with the pressed tint — the legitimacy block isn't just readable, it's *usable*, which is itself a legitimacy signal.
- The WhatsApp row in the footer carries the same pressed physics as the float — one WhatsApp feel everywhere.

### 2.12 Mobile gestures
- **Sheet drag-to-dismiss:** menu and calendar sheets track the finger 1:1 downward; release past 30% height *or* velocity > 500px/s dismisses (`motion.standard`), otherwise `spring.settle` return. Upward drag past rest gives 0.3× resistance — the sheet has weight and a top.
- **Scrim tap:** always dismisses. Esc parity on keyboard.
- **No swipe-navigation, no pull-to-refresh theater, no long-press menus** — web gestures beyond drag-on-sheets create discoverability debt with zero conversion return.
- **Chip rows / in-container tables:** native momentum scroll with edge-fade; the fade *itself* is the affordance (never arrows-on-mobile).
- **Accordion over-scroll:** opening the last FAQ item near page bottom scrolls just enough to reveal the answer — content self-locates (same rule as 2.8).
- **Tap target forgiveness:** touch targets extend ≥4px beyond visual bounds where layout allows (DS 44px floor is the visual minimum; the *hit area* is more generous than it looks — the site feels "easy to hit" without looking inflated).

---

## 3. QA — the feel pass

Run after MO QA, on-device:
1. Tap everything with a stopwatch mind: does anything acknowledge slower than "instantly"? (>50ms = defect.)
2. Slide your finger off every button mid-press: everything must cancel cleanly.
3. Interrupt every animation (tap during, scroll during, navigate during): nothing may queue, block, or restart from zero.
4. Type a wrong number in the form, fix it: did the error clear the moment it became right?
5. Open the menu sheet slowly by drag: does it track the finger exactly? Flick it: does velocity win over distance?
6. Leave the page alone for 60 seconds: is it perfectly still?
7. The Apple test: use the whole page for two minutes, then ask what animated. **The correct answer is "nothing, but it felt great."** If a specific animation is memorable, it was probably too loud.

---

*End of MI v1.0. Precedence: MO (physics & rulings) → **this document (response detail)** → build. Conflicts resolve to MO; refinements here that prove out may be promoted into MO by PR.*
