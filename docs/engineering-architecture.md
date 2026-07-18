# YanForge — Engineering Architecture

**EA v1.0 · Staff Frontend Engineer layer.** The build contract: how the documentation stack (strategy → IA → copy → DS → composition → MO → MI) becomes a codebase. **No implementation** — structure, rulings, contracts, and conventions. Supersedes strategy spec §17's framework choice (noted there).

---

## 1. Stack — rulings and admission scopes

The stack as briefed, each tool admitted with a defined scope. Tools do not creep beyond their scope without a PR amending this document.

| Tool | Ruling | Scope & constraints |
|---|---|---|
| **React 18 + TypeScript** | Core. Strict mode, `strict: true`, no `any` (lint-enforced). | Everything. |
| **Vite** | Build tool via **React Router v7 framework mode** (see §2 — the one correction). | Dev server, build, code splitting. |
| **React Router v7** | Routing **and rendering framework** (framework mode, not library mode). | Routes per IA §1.1; `prerender` all public routes to static HTML. |
| **TailwindCSS** | Styling, **theme locked to DS tokens** — the Tailwind theme *is* `tokens` (§8). Raw hex/px/ms in class names is a lint error. | All styling; no CSS-in-JS. |
| **Framer Motion** | Per MO §2 — the only animation library. Loaded via `LazyMotion` (domAnimation) to keep the bundle inside budget. | MO catalog only. |
| **Lenis** | Per MO §2 — desktop pointer-fine only, destroyed elsewhere. | One lifecycle hook (§5). |
| **shadcn/ui** | Admitted as **vendored source primitives** (Radix under the hood) for exactly: Dialog, Accordion, Form scaffolding. Restyled to DS tokens on install; never used as a visual system. | DS §8.12 still wins: **native `<select>`** ships, not shadcn Select. Components we don't need are never installed. |
| **TanStack Query** | **Narrow admission:** form submission mutations + any Phase-2 remote content. A prerendered marketing site has almost no server state — Query is not a data layer here, it's a mutation manager. | No queries on the landing path. |
| **React Hook Form + Zod** | Audit form + calculator validation. Zod schemas are shared: same schema validates the form client-side and the submission endpoint. | Also validates **content modules at build time** (§7 — the quiet win). |

**Not admitted** (pre-answered): Redux/Zustand/Jotai (no global client state exists — §6) · GSAP (MO §2) · CSS-in-JS runtimes · component libraries beyond the three shadcn primitives · analytics SDKs beyond the single GA4 loader (strategy §15).

---

## 2. Rendering strategy — the correction that protects the KPI

**Ruling:** React Router v7 **framework mode with full pre-rendering**. Every public route builds to static HTML + assets; hydration happens after content is visible.

**Why not SPA-mode Vite:** the industry pages are the SEO ranking assets (IA §9.3) and the #1 entry environment is Instagram's WebView on mid-tier Android with LCP < 1.8s (strategy §15.1). Client-rendered HTML forfeits both. Why not Next.js (spec §17's original choice): the briefed stack is fully capable of static output through React Router v7, with a simpler mental model and no server runtime to operate — this site needs *static pages + one form endpoint*, not SSR. The form/report endpoint deploys as a single serverless function; everything else is CDN.

**Consequences:**
- `/contact → /growth-audit` 301 and trailing-slash rules live in host config, not client code.
- Meta/OG/JSON-LD render at build into the HTML (§10) — no client-side SEO.
- The demo player's poster, hero text, and CTAs are in the static HTML; motion hydrates after LCP (MO §6).
- Gated routes (IA §11) simply **don't build** until their gate flag flips — an ungated build cannot ship an empty Results page by accident.

---

## 3. Folder structure

```
src/
  app/                    root.tsx, routes.ts, entry, providers (§6)
  routes/                 one module per IA route: _index, system,
                          industries._index, industries.$vertical,
                          process, pricing, about, growth-audit,
                          growth-audit.booked, demo, $404
  components/
    ui/                   vendored shadcn primitives, tokenized (3 only)
    forge/                DS components 1:1 with design-system.md §8:
                          button, cta, chip, card variants, accordion,
                          stepper, system-map, thread-player, sticky-bar,
                          nav, footer, calculator, section
    sections/             composition units 1:1 with page-designs.md:
                          home/hero, home/problem, home/growth-engine, …
                          industries/pain-mirror, shared/cta-band, …
    motion/               Reveal, Stagger, CountUp, LineDraw, Crossfade —
                          the ONLY files that import framer-motion (§12)
  content/                typed content modules mirroring the copy decks:
                          home.ts, industries/{med-spas,…}.ts, faq.ts,
                          cta-registry.ts, pricing.ts  (Zod-validated §7)
  config/                 site.ts (urls, org data), gates.ts (IA §11 flags),
                          industries.ts (per-vertical deltas), events.ts
                          (typed analytics registry = spec §16 + IA §12)
  hooks/                  §5 inventory
  lib/                    wa.ts (wa.me builder + prefill attribution),
                          seo.ts (meta/JSON-LD builders), analytics.ts,
                          format.ts (AED, tel), motion-tier.ts
  styles/                 tokens.css (DS §2–§7 as CSS custom properties),
                          tailwind theme maps to tokens — single source
```

**Laws:** `routes/` composes `sections/`; `sections/` compose `forge/`; `forge/` composes `ui/` + primitives. Imports only flow downward (lint-enforced boundaries). **No strings in components** — all copy comes from `content/` modules, which mirror the copy decks file-for-file, so a copy change is a content-module PR that never touches a component.

---

## 4. Component hierarchy

```
Route (routes/…)                    ← data: content module + config; renders sections in PD order
  └─ Section (sections/…)           ← owns composition: grid placement, rhythm, theme band
       └─ Forge components (forge/) ← DS §8 anatomy/states, theme-aware, dumb
            └─ ui/ + Radix          ← behavior primitives only
```

- **Sections are the unit of composition** (PD doc): each accepts `content` + `theme` props and knows its own 7/5 placement and breakpoint transforms. Sections never fetch, never own copy, never know the page they're on.
- **Theme bands:** a `<ThemeBand theme="engine">` wrapper sets the DS §9 token remap via context + data-attribute; every forge component styles from tokens, so dark bands are containment, not prop-drilling.
- **Gating:** `<Gated flag="results">` reads `config/gates.ts` — the IA phase-gate table as code. Flipping a boolean swaps nav slot, footer entries and route prerender list together (one source, per IA's slot-swap rule).
- **CTA discipline:** a single `<Cta id="cta.hero.wa">` component resolves copy, rail, placement metadata and analytics event from `content/cta-registry.ts` — the IA §8.3 registry as the only way to render a CTA. An inline hand-written CTA button is a review rejection.

---

## 5. Hooks inventory (complete for Phase 1)

| Hook | Contract |
|---|---|
| `useMotionTier()` | Resolves MO §6 ladder (full/standard/lite/static) from pointer type, WebView UA heuristics, `save-data`, `prefers-reduced-motion`. Read by all `motion/` primitives; components never query media directly. |
| `useLenis()` | Mounts Lenis only when tier === full; owns destroy on unmount/route change. The only Lenis import. |
| `useScrollIntent(threshold)` | Sticky-bar reveal (IA §4) with hysteresis (MI §2.1). |
| `useHysteresis(on, off)` | Generic two-threshold state — nav condense, scroll intent. |
| `useCountUp(value, opts)` | MO §4.3 count-ups; respects tier; tabular-safe. |
| `useCalculator()` | Pure leak math (Zod-validated inputs, AED formatting); no I/O — unit-testable in isolation. |
| `useWaLink(placement)` | Builds wa.me deep link with page-context prefill + fires `whatsapp_click` (IA §7.4, §16.4). The only place wa.me URLs are constructed. |
| `useAnalytics()` | Typed emitter over `config/events.ts` — an event not in the registry is a type error (spec §16 becomes compile-time law). |
| `useAutoAdvanceThread(script)` | Demo player sequencing per MO §4.1/MI §2.9, incl. tap-to-complete. |
| `useFocusOnRouteChange()` | A11y: moves focus to the new page's h1 (§11). |

No hook fetches data. No hook owns copy.

---

## 6. State management & contexts

**Ruling: there is no global application state.** The site's state decomposes entirely into:

1. **Build-time content** (content modules — static, typed).
2. **URL state** (route, anchors, filter params on /results).
3. **Local component state** (accordion open, calculator inputs, form fields via RHF).
4. **Three narrow contexts** — `MotionTierProvider` (§5), `ThemeBandProvider` (§4), `AnalyticsProvider` (consent + emitter). Each holds a value, not a store.
5. **Mutation state** (TanStack Query: audit form submit, leak-report submit — retry, dedupe, offline-friendly error surfaces).

Anything proposed beyond these five buckets is a design smell escalated to review, not a reason to add a store.

---

## 7. Reusable patterns

- **Content-schema pattern:** every `content/` module exports data validated by a Zod schema at build. The copy deck's structural rules become enforceable: a testimonial without all four attribution fields (DS §8.3), a CTA id not in the registry, a metric tile with a non-numeric value — **build failures, not review catches.** This is the no-fabrication rule as CI.
- **Section pattern:** `Section` (forge) owns rhythm tokens: theme, padding scale, one-idea slots (overline/headline/lead/evidence) — PD §1.2/§1.3 as component API. A section with two headlines doesn't typecheck.
- **Reveal pattern:** `motion/Reveal` + `motion/Stagger` implement MO §4.2 once; sections declare intent (`<Reveal>`), never physics values.
- **Gate pattern** (§4) and **CTA pattern** (§4).
- **Vertical-delta pattern:** industry pages are one route module + `config/industries.ts` deltas (IA §5.3 table as data) — five pages, zero duplicated structure.

---

## 8. Naming conventions

Files kebab-case, exports PascalCase (`thread-player.tsx` → `ThreadPlayer`) · hooks `use-*.ts` · content modules match IA slugs exactly (frozen identifiers, IA §2) · analytics events snake_case matching spec §16 verbatim · Tailwind theme keys are DS token names (`bg-canvas`, `text-slate`, `text-inverse-secondary`, `rounded-l`, `duration-entrance`) so class names read as the design system · test files co-located `*.test.ts` · branch/commit conventions: conventional commits, docs-precedence rule (§13).

---

## 9. Performance strategy

Budgets are CI gates, not aspirations (strategy §15.1): **LCP < 1.8s / INP < 200ms / CLS < 0.1 on Moto-G-class 4G, landing JS ≤ 150KB gz.**

- **Static HTML first:** prerendered routes; hero text/poster/CTAs in HTML; zero data fetching on the landing path.
- **Bundle discipline:** route-level splitting (RR7 default) + a deferred `motion` chunk loaded post-LCP (MO §6); `LazyMotion` keeps Framer's core ≤ ~5KB on critical path; Lenis desktop-only dynamic import; shadcn primitives tree-shaken (three components, vendored).
- **Fonts:** one variable font (Inter), subset (latin + AED symbol), `preload` + `font-display: optional` on first paint (system fallback metrics-matched — zero CLS, zero FOIT).
- **Third-party:** GA4 only, injected after first interaction or 3s idle, consent-aware. WhatsApp is a link (strategy §17).
- **Images:** §9b. **Caching:** immutable hashed assets, HTML short-cache.
- **The degradation ladder is architecture:** `useMotionTier` gates every non-critical effect, so the WebView path is a *smaller program*, not a slower one.

### 9b. Image optimization
Build-time pipeline (vite-imagetools or equivalent): AVIF + WebP + fallback, width sets {360, 640, 960, 1440} with `sizes` derived from the PD grid (a 5-col evidence slot never downloads a 12-col image) · hero poster: preloaded, priority, dimensions inline (CLS 0) · below-fold `loading="lazy" decoding="async"` · photography color-graded at export, not at runtime (no CSS filters) · SVG diagrams inlined and compressed · **no runtime image service** — everything is resolved at build.

---

## 10. SEO

- Per-route meta from `lib/seo.ts` builders reading content modules: title pattern (IA §2), description, canonical, OG/Twitter (static OG images per page from a build template).
- **JSON-LD:** `LocalBusiness` (site-wide: name, +971, address, geo, hours — the footer legitimacy block, machine-readable) · `FAQPage` on FAQ sections · `Service` per industry page · `BreadcrumbList` at depth 2.
- `sitemap.xml` generated at build from the route manifest **minus gated routes**; robots per IA §2 (`/growth-audit/booked`, 404 noindex).
- Redirects (301 `/contact`) and headers at host layer.
- Prerendered HTML means crawlers and link-preview bots (WhatsApp link unfurling matters here — audit links get shared in threads) see complete pages.

---

## 11. Accessibility (engineering enforcement of DS §11)

- **CI:** eslint-plugin-jsx-a11y (error level) + axe-core against every prerendered route + **the DS §2.6 contrast matrix as a unit test over `tokens.css`** — a token drift that breaks a ratio fails the build.
- **Route changes:** focus moves to the new `h1` (`useFocusOnRouteChange`), scroll restoration per IA §2, page `<title>` announced.
- **Primitives:** Radix (via the three shadcn components) supplies dialog/accordion semantics; stepper is a real `<ol>`; system map implements the tabs pattern (DS §8.8); native select (DS §8.12).
- Skip link first in tab order; landmark structure per template; `MotionTier` implements reduced-motion as a first-class rendering path (MO §7), not a CSS afterthought.

---

## 12. Animation architecture

- **Single import boundary:** only `components/motion/` imports framer-motion. Sections declare *intent* (`Reveal`, `Stagger`, `CountUp`, `LineDraw`, `Crossfade`, `ThreadPlayer`); physics values live in `styles/tokens` + MO-derived preset objects. Result: MO/MI amendments are single-file changes, and the register test (MO QA §7) audits one directory.
- **Tier resolution** (§5 `useMotionTier`) is the runtime embodiment of MO §6's ladder; static tier renders completed states (MO §7) via the same components (props, not forks).
- **Once-only registry:** reveals record fired state per navigation so scroll-up never re-animates (MO §4.2) — held in a ref map, not state (no re-renders from scrolling).
- **Interruptibility contract** (MI §1.3): all motion primitives expose cancel/complete on interaction; `useAutoAdvanceThread` completes on tap.

---

## 13. Code quality & governance

- **TypeScript strict**, no `any`/`@ts-ignore` (lint error); exhaustive switches on unions (gates, tiers, variants).
- **CI pipeline:** typecheck → lint (incl. import-boundary + a11y + no-raw-token rules) → unit (calculator, wa builder, seo builders, content schemas) → axe on prerendered HTML → Lighthouse CI with §9 budgets → build with gates applied.
- **Testing philosophy:** heavy unit coverage on the pure core (calculator math, schemas, builders); Playwright smoke for the two conversion paths (WhatsApp link fires event + correct prefill; form → booked) — the flows that pay rent get E2E, decorative surface does not.
- **Review checklist = the QA sections that already exist:** DS §13 definition-of-done, PD §5 walkthrough, MO §8, MI §3 — engineering review links to them rather than restating them.
- **Docs precedence** (the standing rule): strategy → IA → copy → DS → PD → MO → MI → **EA** → code. A conflict discovered in code produces a doc PR first, then the code change. Undocumented divergence is the only unforgivable review failure.

---

*End of EA v1.0. The build can start from this document without a single open architectural question. First implementation milestone (when authorized): repo scaffold + tokens.css + forge/button + Section/ThemeBand + Home hero static — the vertical slice that proves the whole chain.*
