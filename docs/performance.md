# YanForge — Performance Engineering Spec

**PF v1.0 · Google Performance Engineer layer.** Extends strategy §15.1 (budgets), EA §9 (strategy), MO §6 (motion contract). This is the mechanics: how every millisecond is spent, and how regressions become build failures.

**Target: Lighthouse 100 across all four categories** — *as the lab gate, not the goal.* Lighthouse is emulated hardware and a cold cache; the contract that matters is **field p75**: LCP < 1.8s, INP < 200ms, CLS < 0.1 on Moto-G-class Android over 4G, including inside Instagram's WebView. Both are enforced (§12). The deepest principle: this site is fast because of what it *doesn't do* — performance here is subtraction, and every section below defends a subtraction already made or adds a mechanism, never a heroic workaround.

---

## 1. The critical path — the first 1.8 seconds, spent deliberately

The ideal waterfall for a cold mobile visit:

```
0ms      GET /            → static HTML from CDN edge (TTFB target <200ms; no server compute exists)
~200ms   HTML arrives     → parser finds, in <head>: preload font · preload hero poster ·
                            one stylesheet · deferred module scripts
~250ms   CSS applied      → FCP: full hero text paints in metrics-matched fallback font
~500ms   Poster + font    → LCP candidate rendered; font swaps invisibly (§2)
<800ms   LCP              → lab; field p75 budget 1.8s
idle     Hydration        → below-fold reveals arm; motion chunk fetches
3s/interaction            → GA4 injects (the only third party)
```

Everything below exists to protect this waterfall.

**LCP element discipline:** the LCP element is pinned by design — mobile: the hero poster; desktop: the H1. Both paths are fully optimized (poster: preload + `fetchpriority=high` + AVIF; H1: font strategy §2) so layout changes can't silently swap in an unoptimized LCP. The LCP element is asserted in CI (Lighthouse audit) — if a refactor changes it, the build says so.

---

## 2. Fonts — zero CLS, zero FOIT, one file

- **One file:** Inter Variable, `woff2`, subset to Latin + punctuation + tabular numerals (~40KB). Mono is the system stack (DS ruling — 0 bytes). Arabic (Phase 2) is a separate subset loaded only on `/ar/*`.
- **`preload`** in the static HTML head — the font race starts at HTML parse, not at CSS parse (saves a full discovery round-trip).
- **`font-display: optional` + metrics-matched fallback:** the fallback (system sans) is tuned with `size-adjust`/`ascent-override`/`descent-override` to Inter's metrics — when Inter arrives, glyphs swap **without any line reflowing**. Result: text paints at FCP in the fallback, zero layout shift on swap, and on a very slow connection the page simply ships the fallback (`optional` means the font never blocks or flashes). This is the entire font-CLS class of bugs deleted by configuration.
- Font cached immutable (§5) — repeat visits render Inter from disk at FCP.

## 3. Images — the byte budget lives here

Mechanics per EA §9b, with the budgets attached:

- **Formats:** AVIF primary, WebP fallback, JPEG last resort — built at compile time (no runtime image service to fail or bill).
- **Hero poster ≤ 60KB AVIF** (it shares the critical path with the font); photography ≤ 120KB each; **total first-load page weight ≤ 500KB mobile.**
- **`srcset` widths {360, 640, 960, 1440} with `sizes` derived from the PD grid** — a 5-column evidence slot on desktop never downloads the 12-column image; a 360px phone never downloads more than ~2× its slot.
- **Explicit `width`/`height` (or aspect-ratio) on every image** — the browser reserves the box before bytes arrive: the largest CLS class, deleted.
- Above-fold: poster only, `fetchpriority=high`. Everything else: `loading="lazy" decoding="async"`; lazy margin tuned so images land ~1 viewport early (invisible to the user, invisible to LCP).
- **Placeholders:** solid token-color boxes (canvas/graphite) — no blur-up JS, no LQIP pipeline; the DS aesthetic makes flat placeholders look intentional.
- SVG diagrams: SVGO-compressed, inlined when animated (line draws need DOM access), external+cached when static.

## 4. Compression — decided at build, not at request

- **Brotli level 11 precompressed at build** for all text assets (HTML/CSS/JS/SVG/json), gzip fallback alongside. Runtime compression is a CPU tax and usually caps at Brotli 4–5; precompression is free at serve time and ~15% smaller.
- HTML minified (whitespace, comments) — prerendered pages are read by machines and parsers, not humans.
- CSS: Tailwind's purge produces one stylesheet; ruling: **single external stylesheet, preloaded, no critical-CSS extraction** — projected ≤ 20KB gz sitewide, and one cached file beats the complexity and cache-fragmentation of per-route critical inlining. Revisit only if the file breaches 25KB gz (CI-watched).

## 5. Caching — immutable or instant, nothing between

| Asset | Policy | Why |
|---|---|---|
| Hashed JS/CSS/fonts/images | `immutable, max-age=1yr` | Content-addressed names make revalidation meaningless |
| HTML | `max-age=0, must-revalidate` + CDN edge cache with deploy invalidation | Users get new deploys instantly; CDN still absorbs the traffic |
| `llms.txt`, sitemap, robots | 1h | Freshness without churn |

**No service worker in Phase 1** — ruling. A marketing site with weekly-at-most revisit patterns gains nothing from SW caching that HTTP caching doesn't give, and inherits the entire class of stale-deploy/update-loop bugs. Revisit only if an offline or app-like requirement appears.

## 6. JavaScript — tree shaking, splitting, and the 150KB line

**The honest ledger (gz, landing path):** React 18 + React Router 7 runtime ≈ 80–90KB · app shell + home sections ≈ 25–35KB · Framer Motion via `LazyMotion` critical slice ≈ 5KB · web-vitals beacon ≈ 2KB → **≈ 115–130KB against the 150KB budget.** Tight and fine — and CI-enforced per chunk (§12) so it stays fine. (Preact was considered for ~30KB savings and **rejected**: ecosystem/testing risk against a budget we already meet.)

- **Tree shaking:** ESM-only dependencies; `sideEffects` audited; no barrel-file imports (the EA import-boundary lint incidentally kills the classic barrel-bloat trap); icons are inline SVG components, never icon-pack barrels; Radix ships only the three vendored primitives.
- **Code splitting map:**
  - Route chunks (RR7 default) — visitors pay only for the page they read.
  - **`motion` chunk** (domAnimation features + set-piece choreography): fetched after LCP, at idle (MO §6).
  - **Lenis**: dynamic import, desktop pointer-fine only — phones never download it.
  - **Calendar embed**: injected on `/growth-audit` interaction intent (rail card focus/tap) — the heaviest third-party asset loads only for users actively converting.
  - **GA4**: injected at first interaction or 3s idle, whichever first; `preconnect` to its origin fired just before injection (a preconnect at t=0 for a t=3s resource wastes a socket).
- **Hydration strategy:** prerendered HTML hydrates as one RR7 app, but the pressure is structurally low because **every conversion action works before hydration**: wa.me links, tel links, and route navigation are plain anchors; the sticky bar's links are anchors. A user who taps "WhatsApp us" at 400ms converts with zero JS executed — progressive enhancement as conversion insurance, not ideology. Below-fold interactive sections (calculator, map, player) mount their behavior lazily on visibility — markup is present from prerender (SEO/AEO unaffected), listeners attach when approached.

## 7. Preload & prefetch — spend idle bandwidth on the next click

- **Preload (critical, exactly two):** the font and the hero poster. Preloading more demotes both.
- **Prefetch (speculative):** RR7 link prefetch on **hover intent (65ms) desktop / viewport-entry mobile** for the likely-next routes only — industry pages (from home tiles) and `/growth-audit` (from any CTA). Prefetch = HTML + route chunk, images excluded. **Disabled entirely under `save-data` or 2g/3g effective connection** — respecting the data plan of a salon manager on prepaid is both decency and INP hygiene.
- No `preconnect` at t=0 to anything: the landing path has no third-party origins. That absence *is* the optimization.

## 8. CLS — a class-by-class deletion list

| Shift class | Deletion mechanism |
|---|---|
| Font swap | Metrics-matched `optional` fallback (§2) |
| Media loading | Explicit dimensions everywhere (§3) |
| Embeds | Calendar container height-reserved before injection (EA §4.5) |
| Late banners | None exist — no cookie theater, no promo bars (policy, not restraint) |
| Animation | Transform/opacity only (MO law); entrances animate within reserved boxes |
| Dynamic numbers | Tabular numerals — count-ups occupy final width from frame 0 |
| Sticky bar | `position: fixed` overlay — enters the viewport, never the layout |
| Route change | Scroll restoration + fixed-height nav |

Target: measured CLS ≈ 0. The budget (0.1) is headroom, not allowance.

## 9. INP — keeping every interaction under 200ms

- **Main-thread discipline:** no task > 50ms (long-task CI check); hydration is the largest task and is split by route + lazy section mounting (§6).
- **Input handlers do nothing heavy:** handlers set state/refs; visual work happens in the next frame (motion primitives are transform-only, MI's ≤50ms acknowledgment is a CSS state, not JS work).
- **Scroll costs nothing:** no scroll state in React (once-only reveal refs, MO §12); IntersectionObservers pooled and passive; Lenis absent on touch; scroll-linked effects desktop-only by tier.
- **Calculator:** result recompute debounced 250ms (MI §2.4); math is pure and microseconds anyway — the debounce protects the count-up animation, not the CPU.
- **Layout thrash:** batched reads/writes inside motion primitives; no `getBoundingClientRect` in render paths; hysteresis states (MI) prevent threshold-flapping re-renders.

## 10. Animation performance & GPU

- **Compositor-only:** every cataloged animation is `transform`/`opacity` (MO §3.4) — the main thread is not invited to 60fps.
- **`will-change` discipline:** applied at animation start, removed at rest (MO §6). Standing promoted layers are memory the WebView will reclaim by killing the tab.
- **Layer budget: ≤ 4 concurrently animating layers per viewport** — the stagger cap (6 items, 40–80ms) means items complete and de-promote in waves; a card grid never holds 12 live layers.
- **The one backdrop-filter** (nav glass, DS §5) is the page's single expensive layer; it never coexists with a running set-piece in the same frame (nav is at rest while sections animate — verified in the register-test recording).
- **No animated `filter`/blur/shadow** anywhere (DS/MO law) — the paint-storm class, deleted.
- WebView verification: the MO degradation ladder's *lite* tier is the performance floor, manually verified per release on a physical low-end Android inside Instagram (§12).

## 11. FCP, TTFB and the serving layer

- Static files on a CDN with UAE/GCC edge presence — TTFB is a geography problem once compute is removed; target < 200ms in-region.
- HTML ≤ 30KB gz per page (prerendered but lean — JSON-LD and inlined SVG are the watch items, CI-tracked).
- Zero render-blocking JS (`type=module` defer semantics); one render-blocking stylesheet (§4, deliberately small); FCP = HTML + CSS + fallback text ≈ first paint at ~250ms lab.
- 301s (`/contact`) at edge config — a client-side redirect is a full wasted page load.

## 12. Enforcement — budgets as CI, plus the field truth

**CI gates (every PR):**
- Lighthouse CI, throttled Moto-G emulation, all four categories: **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100** — score regression fails the build; LCP-element assertion included.
- `size-limit` per chunk: critical JS ≤ 150KB gz (alarm at 135) · CSS ≤ 25KB gz · HTML ≤ 30KB gz · hero poster ≤ 60KB.
- Precompression presence check; image-dimension lint; long-task check in Playwright smoke runs.

**Field truth (the real contract):**
- `web-vitals` (~2KB, the one admitted perf dependency) beacons LCP/INP/CLS to GA4, segmented by the dimensions that matter: **in-app WebView vs browser**, device class, connection, route. Dashboards read p75, not means.
- CrUX quarterly review once traffic qualifies.
- Per-release manual pass: physical low-end Android, Instagram in-app browser, 4G — scroll the homepage, run the calculator, tap WhatsApp. Ten minutes that no lab replaces.

**The standing rule:** any new dependency, third-party tag, font, or effect enters through this document's budgets first (EA docs-precedence). "It's only 20KB" is how 150 becomes 400 — the budget line is the answer to every such sentence.

---

*End of PF v1.0. Nothing here is heroic; it is the compound interest of upstream subtraction — no WebGL, no widget SDKs, no second font, no service worker, no runtime compute — enforced by machines so it survives success.*
