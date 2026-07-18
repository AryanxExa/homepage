# YanForge — AI Search Optimization (AEO/GEO)

**AI v1.0 · Answer-engine & generative-search layer.** Extends EA §10 (SEO) for a world where the "search result" is a sentence in ChatGPT, Gemini, Claude, Perplexity, Copilot, DeepSeek, or a Google AI Overview. The goal shifts from *ranking* to **being the extractable, citable, unambiguous answer** when a UAE owner asks an assistant: *"how do I stop no-shows at my clinic?"* or *"who sets up WhatsApp booking systems in Dubai?"*

**The founding advantage:** EA §2's full pre-rendering is the single biggest AEO decision already made — most AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) execute little or no JavaScript. A Vite SPA would have been invisible to half these engines. Everything below builds on HTML they can actually read.

**The founding constraint:** the no-fabrication rule extends to structured data. No `AggregateRating` without real reviews, no invented `Review` markup, no schema claims a human page doesn't make. Engines profile domains for markup honesty the way buyers profile agencies — one caught lie taxes every future claim.

---

## 1. How each engine finds us (and what that changes)

| Engine | Primary source | Practical actions |
|---|---|---|
| **Google (AI Overviews / Gemini)** | Google index + Knowledge Graph + **Google Business Profile** | Search Console registration · GBP is a first-class asset (§6) · schema per §3 · E-E-A-T signals (§5) |
| **ChatGPT (search/browse)** | **Bing index** + own crawler (GPTBot/OAI-SearchBot) | **Bing Webmaster Tools registration is not optional** — an overlooked lever most UAE competitors miss · allow GPTBot (§7) |
| **Microsoft Copilot** | Bing index | Same Bing path; LocalBusiness completeness drives its local answers |
| **Claude** | Search partners + ClaudeBot | Allow ClaudeBot; clean extractable HTML (§4) |
| **Perplexity** | Own index (PerplexityBot), citation-forward | Freshness signals (§8), structured pages with quotable blocks — Perplexity *shows* sources, so being citable = being visible |
| **Gemini** | Google stack | Inherits all Google work |
| **DeepSeek & future engines** | Training corpora + emerging crawlers | The generic hygiene (§4, §7) is the only durable play — write for extraction, allow crawl, keep facts consistent |

**Ruling — crawler policy: allow all major AI crawlers.** Blocking is a publisher's defensive move; we are a business that *wants* to be the answer. `robots.txt` explicitly permits GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Amazonbot, Applebot-Extended. Gated/noindex routes stay excluded for all agents equally.

---

## 2. The query space we optimize for

AI queries are conversational and problem-first, not keyword-first. The canonical set (each mapped to the page that must contain its extractable answer):

| Owner asks an assistant… | Answering page + block |
|---|---|
| "How do I reduce no-shows at my salon/clinic in Dubai?" | Vertical page pain-mirror + answer block (§4.2) |
| "Best way to automate WhatsApp bookings in the UAE?" | Home §H3 / /system WhatsApp module |
| "Who builds booking systems for med spas in Dubai?" | /industries/med-spas answer block |
| "Is automated WhatsApp messaging allowed in the UAE?" | FAQ — already written for this (copy deck §10) |
| "What does a growth system for a service business cost?" | /pricing anchors + payback block |
| "YanForge review / is YanForge legit?" | /about facts block (§4.3) + real proof as it accrues |
| "Fresha vs a full growth system?" | /pricing comparison + /system integration strip |
| "How much do no-shows cost a salon?" | Calculator section's explanatory copy (the *methodology* is the quotable part) |

Phase-2 insights articles each own one conversational query outright (IA §5.10) — the topic-cluster layer that compounds this table.

---

## 3. Schema / JSON-LD plan (supersedes and extends EA §10 list)

All emitted at build into static HTML (EA §2), all mirroring only claims the visible page makes.

| Schema | Where | Key fields & rules |
|---|---|---|
| `ProfessionalService` (subtype of LocalBusiness) | Site-wide | name, alternateName ("YanForge"), description (the canonical one-liner, §5), url, telephone (+971), address (real street address), geo, openingHours (the 9am–9pm GST reply window — truthful), priceRange ("From AED X,XXX/month" once anchors land), areaServed (UAE, Dubai, Abu Dhabi, Sharjah), sameAs (§6), knowsAbout (§5 entity list), logo, image |
| `WebSite` | Site-wide | name + url (no SearchAction — we have no site search) |
| `Service` | Each vertical page + /system modules | serviceType per vertical ("Growth system for medical spas"), provider → Organization, areaServed, description = the vertical's answer block verbatim |
| `FAQPage` | Home FAQ + every per-page FAQ | Only questions actually rendered on that page; answers ≤ 300 chars where possible (extraction-length) |
| `Person` | /about | Founder: name, jobTitle, worksFor, sameAs (LinkedIn), image — the E-E-A-T anchor |
| `BreadcrumbList` | Depth-2 pages | Per IA §2 |
| `Offer` | /pricing tiers | name, priceSpecification with "from" semantics, priceCurrency AED — **only when real anchors publish** |
| `Review` / `AggregateRating` | **Gated** with /results | Only verifiable, attributed reviews; wired to the same `gates.ts` flag (EA §4) so schema and page gate together |
| `Article` + `author` | Phase-2 insights | datePublished + dateModified always |
| `HowTo` | **Not used.** | The 5-step process is an engagement description, not user instructions — HowTo markup here would be semantic spam. |

Implementation home: `lib/seo.ts` builders (EA), fed from content modules — schema drifts from copy only if the build is broken.

---

## 4. AI readability — writing HTML for machine quotation

### 4.1 Semantic structure (extends DS §11 semantics)
- Question-shaped `h2`/`h3` wherever the section genuinely answers one (FAQ, vertical pains, pricing) — assistants match questions to headings before prose.
- Every page's first body paragraph is **self-contained**: names YanForge, the category, the audience, the geography. Flow-D standalone rule (IA §6) turns out to be an AEO rule too — an extracted paragraph must survive without the page around it.
- Lists and tables for anything enumerable (already the DS way) — engines extract structured claims from `<table>`/`<ul>` far more reliably than from prose.
- Stable anchor ids (IA §2) → assistants deep-link citations; `<time>` elements on anything dated.
- No meaning locked in images (DS: demo thread is live text) — the entire product demonstration is machine-readable dialogue, which is rare and valuable: **an AI can quote our demo.**

### 4.2 The answer block pattern (new content rule)
Every vertical page and /system open with a 40–70 word **direct answer** under the first h2: plain-language, self-contained, question-mirroring ("Salons in the UAE cut no-shows by moving reminders, deposits and rebooking onto WhatsApp — automatically. YanForge builds and runs that system…"). Depth follows for humans; the block exists for extraction. Copy decks gain this as a required section slot (feeds back to copy governance).

### 4.3 The facts block (/about + footer, machine-quotable identity)
A plainly-worded, consistently-repeated fact set: legal name · what YanForge is (canonical one-liner) · founded [year] · based in [city], UAE · serves salons, med spas, dental clinics, gyms, premium services · contact +971 · founder name. Stated once as prose on /about, mirrored in Organization schema and the footer legitimacy block. **Word-for-word consistency across all three** — entity resolution rewards repetition, and paraphrase creates doubt.

### 4.4 Terminology discipline (voice rule, now machine-critical)
One canonical term per concept, everywhere: *Growth Audit* (never "discovery call"), *growth operating system* (the category), *founding partners*, module names as in DS. Synonym drift splits the entity graph; the copy QA checklist gains a terminology sweep.

---

## 5. Entity optimization & Knowledge Graph

- **Canonical description** (the string repeated verbatim in schema, GBP, directories, social bios): *"YanForge engineers growth systems for UAE service businesses — connecting website, booking, CRM, AI and WhatsApp into one system that fills calendars and keeps clients coming back."*
- **`knowsAbout` entity list** (links YanForge to established graph entities): WhatsApp Business API · appointment scheduling · CRM · no-show reduction · customer retention · Dubai · United Arab Emirates · beauty salons · medical spas · dental clinics · fitness centres.
- **sameAs constellation:** Google Business Profile · LinkedIn company page · Instagram · (Phase 2: UAE directories with exact-match NAP). Every profile carries the canonical description and identical NAP — citation consistency is the local Knowledge Graph's spine.
- **Founder as entity:** Person schema + LinkedIn + authored insights articles (Phase 2) — E-E-A-T flows through people; an agency with no visible human is a weak node.
- **Wikidata: not yet.** Ruling: pursue only after genuine third-party coverage exists; premature self-created entries are graph spam and get pruned. Revisit at 5+ independent citations.
- **Google Business Profile is a product surface, not a checkbox:** category (marketing/software — evaluate against real query behavior), the canonical description, real photos (imagery class 2), review generation from real clients (we literally sell review automation — our own GBP must demonstrate it), Q&A seeded with the FAQ's top four.

---

## 6. Case studies as answer fuel (gated, structured for extraction)

When /results opens (IA gate), each case follows a fixed extractable template: **[Business type] in [area]** · problem in one sentence with a number · what was deployed (module list) · outcome with number + timeframe + `<time>` dates · attributed quote. Consistent structure across cases lets engines aggregate ("YanForge case studies report 30–45% no-show reduction…") — aggregation only works over uniformity. `Review` markup rides the same gate. Until then, the **founding-partner candor block is itself quotable** — "an agency that refuses to invent numbers" is a differentiated sentence for an assistant to relay, and engines increasingly weight verifiable-honesty signals.

---

## 7. Crawl & discovery infrastructure

- `robots.txt` per §1 ruling; sitemap.xml (gated-aware, EA §10); Search Console + **Bing Webmaster Tools** registered at launch; IndexNow pinged on deploys (Bing/Copilot freshness for free).
- **`llms.txt`** (emerging convention, low cost, on-thesis): a root markdown file — canonical description, facts block, page directory with one-line summaries, pointer to key answer blocks. `llms-full.txt` concatenates the answer blocks + FAQ. Maintained from content modules at build (no manual drift). If the convention dies, we've lost an afternoon; if it becomes the norm, we were early.
- WhatsApp link previews (already EA §10) double as AI-ingestion surface — assistants increasingly read OG data.

---

## 8. Freshness, provenance & trust signals

- `dateModified` in schema wherever true; visible "updated" dates on insights and /results only (marketing pages don't wear timestamps).
- Claims carry provenance in-copy where they exist ("across our founding partners, measured monthly") — assistants prefer attributable statements and increasingly quote the attribution.
- Consistent authorship on articles (founder byline + Person schema).
- **What we never do:** fake freshness (rotating dates), schema not mirrored by visible content, AI-generated thin pages to farm the query table in §2 — each is detectable, and generative engines are *better* at detecting content spam than blue-links search ever was. The honest site is, structurally, the optimized site.

---

## 9. Future AI search (watch items, not work items)

1. **Agentic booking:** assistants will act, not just answer — "book me a growth audit with YanForge." Our rails are already agent-friendly (a wa.me link and a standard calendar embed both work for an agent driving a browser). Watch: schema.org actions / emerging agent-booking protocols; when one stabilizes, expose the audit as a machine-invokable action. Owning the *bookable* answer beats owning the citation.
2. **Assistant-mediated comparison:** "compare YanForge to X" — our honest comparison table (pricing page) is the pre-positioned answer; keep it genuinely honest so assistants relay it intact.
3. **Voice/AR local queries** ("who can fix my salon's booking mess?") resolve through the same LocalBusiness + GBP spine — no separate work.
4. **Provenance standards** (content signing, C2PA-style for text): adopt early if they emerge; a no-fabrication brand should be first in line to cryptographically stand behind its claims.

---

## 10. Measurement

- Referrer segmentation for AI surfaces (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com) as a named channel in analytics (extends spec §16 dashboards).
- The audit intake + WhatsApp qualification adds one answer option to "how did you find us": *"an AI assistant recommended you"* — the ground truth no referrer header provides.
- Quarterly assistant audit: run the §2 query table against the six engines, log whether YanForge appears, is cited, or is quoted correctly; wrong-fact findings become content-module fixes (the facts block usually).
- KPI unchanged: audits booked. AI visibility is a channel feeding stage 1 of the IA funnel, measured by what reaches stage 7.

---

*End of AI v1.0. Precedence: extends EA §10; content requirements (answer blocks, facts block, terminology sweep) feed back into the copy decks' QA checklists. The strategy that wins here was set in v1.1 without knowing it: pre-rendered HTML, refusal to fabricate, one canonical vocabulary, and answers written in the owner's language are exactly what generative engines reward.*
