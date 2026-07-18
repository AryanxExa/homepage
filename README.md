# YanForge

**Growth, engineered.**

YanForge engineers intelligent growth systems for UAE service businesses — salons, med spas, dental clinics, gyms and premium service brands. We connect website, booking, CRM, AI, WhatsApp automation, analytics and operations into **one connected operating system** so every lead is captured, every client returns, and every dirham is tracked.

## This repository

The home of the YanForge brand and marketing website.

- **[Product Strategy & Website Specification](docs/strategy-and-website-spec.md)** — the source of truth for brand, positioning, UX, visual identity, motion, page-by-page spec, conversion strategy, and technical architecture.
- **[Information Architecture & UX Architecture](docs/information-architecture.md)** — every page and section, navigation (desktop + mobile), user flows, conversion funnels, internal linking, CTA hierarchy, footer structure, and phase gates. Governs structure; the strategy spec governs brand and visual direction.
- **[Homepage Copy Deck](docs/copy/homepage.md)** — production copy for every homepage section, string-by-string, with the psychological mechanism annotated per section. Canonical source for copy; placeholders marked pending founder inputs (spec §19).
- **[Design System — "Forge"](docs/design-system.md)** — tokens (color, type, spacing, radius, elevation, motion), every component with anatomy/variants/states, dark-band theming, glassmorphism and animation rules, responsive and accessibility standards, and governance. Governs visual & interactive definition.
- **[Page Design Specifications](docs/page-designs.md)** — composition layer: every page laid out on the grid (desktop → tablet → mobile), the seven global layout systems (spacing grammar, hierarchy, typography-in-layout, color deployment, imagery classes, layout DNA, visual rhythm), transformation rules per breakpoint, and a pre-ship walkthrough test.
- **[Motion Design Bible](docs/motion-design.md)** — the complete motion catalog and rulings: purpose doctrine, stack rulings (Framer Motion primary, Lenis desktop-only, GSAP not admitted), physics language (durations, easings, named springs), hero load timeline, every interaction specified with trigger/values/reduced-motion fallback, performance contract and degradation ladder, motion QA.
- **[Micro-Interactions — the Response Layer](docs/micro-interactions.md)** — the sub-perceptual detail beneath the Motion Bible: ≤50ms acknowledgment rule, direct-manipulation gesture physics, interruptibility, validation timing, success morphs, hysteresis thresholds, and the on-device "feel pass" QA.
- **[Engineering Architecture](docs/engineering-architecture.md)** — the build contract: stack rulings with admission scopes (React Router v7 framework mode on Vite, pre-rendered static routes), folder structure and import boundaries, component hierarchy, hooks and contexts, reusable patterns (content schemas, gates, CTA registry), naming, performance/SEO/accessibility enforcement, animation architecture, and CI quality gates.
- **[AI Search Optimization](docs/ai-search-optimization.md)** — the answer-engine layer: per-engine sourcing map and crawler policy, the conversational query space, full JSON-LD schema plan, answer-block and facts-block content patterns, entity/Knowledge-Graph strategy, gated case-study structuring, llms.txt, freshness and provenance rules, agentic-search watch items, and AI-channel measurement.
- **[Performance Engineering Spec](docs/performance.md)** — Lighthouse 100 as the lab gate, field p75 as the contract: the critical-path waterfall, font/image/caching/compression mechanics, the JavaScript byte ledger and splitting map, pre-hydration conversion guarantee, class-by-class CLS deletion, INP discipline, GPU/layer budgets, and CI enforcement with field telemetry.

## Status

**Built.** The full launch-scope site is implemented per the documentation stack: 13 pre-rendered static routes (React Router v7 framework mode on Vite, `ssr:false` + prerender), Tailwind v4 theme locked to the Forge tokens, Framer Motion behind a single import boundary with lazy-loaded features, and phase gates in `app/config/gates.ts`. Landing JS ≈ 134KB gz against the 150KB budget; typecheck clean.

Pending founder inputs (spec §19) are typed nullable config in `app/config/site.ts` — WhatsApp number, address, pricing anchors, founder facts — with honest fallbacks rendered until they land.

## Getting started

```
npm install
npm run dev        # local dev
npm run build      # static output in build/client
npm run typecheck  # strict TS
```

Deploy `build/client` to any static host; configure the `/contact → /growth-audit` 301 and headers at the host layer (performance spec §11).
