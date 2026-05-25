# Tesora website review rubric

Apply this every push. Designed as a long-form checklist — run through it before opening a PR, and re-run after every commit that touches user-facing surface.

The fast automated half is enforced by `bun run check:voice`. The human-judgment half is the rest of this doc. Both must pass.

---

## 0. Source-of-truth attribution

Items marked **[PB]** come from Philo Bishay (Chief Product Officer, former chief actuary). They are non-negotiable for actuarial credibility. Items marked **[VR]** come from Vivek Rao (CEO).

---

## 1. Voice rubric (text changes)

### Banned punctuation
- [ ] **[PB]** No em dashes (`—`) or en dashes (`–`) anywhere in user-facing copy. Use periods, commas, parens, or restructure. The only acceptable exception is inside HTML comments that never render.
- [ ] **[PB]** Greeting format in any outbound-shaped copy: `<FirstName>,` — no "Hi" / no "Dear".

### Banned phrases (zero tolerance)
The following words and phrases are banned on every page. Reasons in parentheses.
- [ ] `alumnus`, `alumna` — say `alum` instead. **[PB]**
- [ ] `ecosystem` (unless quoting an outside source verbatim). **[PB]**
- [ ] `small world` (overused warm-thread fabrication). **[PB]**
- [ ] `secret sauce` (call-feedback tell; no marketing cliche). **[PB]**
- [ ] `caught my eye` (warm-thread fabrication). **[PB]**
- [ ] `real respect for that`, `hell of a thing`, `kind of trajectory is hard-earned` (over-familiar). **[PB]**
- [ ] `would love to grab coffee, CEO to CEO`. **[PB]**
- [ ] `finance-world`, `actuarial-world` (hyphenated). **[PB]**

### Banned content
- [ ] **[PB]** Capital modeling, cat testing, XOL, cession, PML are OUT. The Workbench covers loss modeling, GLMs, reserving, market research, rating deployment, audit. Nothing else.
- [ ] **[PB]** No hedging. No "in development", "next release", "coming soon", "SOA/IFoA later". Ship it or cut the line.
- [ ] **[PB]** No fabricated warm threads ("your name came up", "I came across your profile") in any quote, testimonial, or pseudo-outbound copy.

### Mandatory framing
- [ ] **[PB]** **The actuary owns every decision.** Agents help, the actuary decides. Any copy that suggests AI is the decision-maker fails review.
- [ ] **[PB]** **Citations or it didn't happen.** Any new "AI does X" claim must mention citations or audit trail.
- [ ] **[PB]** **Author + reviewer + approver as separate identities.** Don't say "SOX-compliant" generically; specify the enforcement (three-person separation of duties).
- [ ] **[PB]** **One credibility line at most per page.** Don't pile on Y Combinator + Foundation Capital + Stanford + Kumo in the same paragraph.
- [ ] **[VR]** **Pain-then-fix in headers and decks.** Lead with the problem the actuary feels; then the differentiator.
- [ ] **[VR]** **Short and specific.** "Six layers, one audit trail" beats "Multiple layers of robust auditing capability."

### Orphan-line rule
- [ ] **[VR]** No 1–2 word orphan lines in headlines or body copy. `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs is globally set; if a section still orphans, tighten copy or widen max-width.

---

## 2. Terminology (hard requirements)

- [ ] **[PB]** **The Tesora Workbench** = the conversational surface the actuary uses (chat next to Excel).
- [ ] **[PB]** **The Tesora Harness** = the framework underneath that orchestrates agents and enforces citations, audit log, separation of duties.
- [ ] **[PB]** Use "Workbench" in nav and entry points (`/`, header). Use "Harness" when explaining the framework underneath.
- [ ] **[PB]** Never use "agents" as a brand-level label. It's an implementation detail of the Harness.
- [ ] The named agents are: **Ingestion Agent**, **Insight Agent**, **Rating Agent**, **Audit Agent** (initial caps, "Agent" suffix). Lowercase "agent" or alternate names fail review.
- [ ] **[PB]** Frontier AI for Actuaries (initial caps on "Actuaries" — it's a positioning line, not sentence case).

---

## 3. Design rubric (visual changes)

- [ ] **Border-radius 5px everywhere.** Only exceptions: pills (`999px`), full circles (`rounded-full`), tokens via `var()`.
- [ ] **No gradients.** Solid fills only. `color-mix()` for tints is fine.
- [ ] **Accent: `--color-oxblood` (#B400FE).** Restrained.
- [ ] **Background tokens:** `--bg` (bone), `--bg-panel` (now `#FFFFFF`). Alternate section backgrounds.
- [ ] **Card surfaces:** white (#FFFFFF). The previous beige-grey card tint is retired site-wide.
- [ ] **Borders:** `1px solid var(--rule)` unless an intentional accent border.
- [ ] **Video heroes:** once per page in `CinematicHero`. No additional autoplay video below.
- [ ] **Filled-purple "Demo →" CTA** is the only filled button. Other CTAs are outlined pills.
- [ ] **Anti-references** (do not let these creep in): Duck Creek's cosmic orb hero, Earnix-style stat blocks ("Compete. Differentiate. Grow."), abstract animated illustrations, purple gradients.

---

## 4. Page-fit rubric (layout)

- [ ] **At 100% browser zoom on a 900px-tall viewport, every named section fits the visible area.** Audit each new section.
- [ ] **Graphics fit within their grid column.** No horizontal overflow.
- [ ] **Mobile (375px):** every section is readable. No horizontal scroll (unless scroll is the affordance, e.g., a scroll-stack).
- [ ] **LayeredStack bullets:** every card shows all bullets without cropping at the bottom edge.

---

## 5. Animation rubric

- [ ] **Motion clarifies, doesn't decorate.** Every animation has a job.
- [ ] **Reveal on enter** uses `IntersectionObserver`, not scroll listeners.
- [ ] **Reduced-motion users get the final state immediately.** Test with `@media (prefers-reduced-motion: reduce)`.
- [ ] **No animation longer than 700ms.** Stagger across 1–1.5s max.

---

## 6. SEO / content surface

- [ ] **Every page has a canonical, a unique title, and a unique meta description.**
- [ ] **llms.txt is updated** whenever a top-level page is added, removed, or renamed.
- [ ] **OG image and Twitter card metadata** present in `<Layout>`.
- [ ] **Internal link graph:** every page links to at least 3 sibling pages.

---

## 7. Push checklist (procedural)

1. `bun run build` passes.
2. `bunx tsc --noEmit` (current `scripts/` errors are pre-existing).
3. `bun run check:voice` returns no violations (or only known-allowlisted hits).
4. Preview server verification of every page touched.
5. Commit with conventional prefix: `design:`, `copy:`, `feat:`, `fix:`, `site:`.
6. Push to a feature branch, never master.
7. Open PR with test plan; merge after self-review.

---

## Page inventory (live)

| Route | Purpose | Hero video | Graphics |
| --- | --- | --- | --- |
| `/` | Frontier AI for Actuaries entry | `hero-loop.mp4` | Workbench pill |
| `/agents` | The Tesora Workbench | `agents-loop.mp4` | HarnessDiagram, Lifecycle + LifecycleReport |
| `/agents/insight` | Insight Agent | `research-loop.mp4` | HarnessDiagram |
| `/agents/rating` | Rating Agent | `rating-loop.mp4` | HarnessDiagram |
| `/agents/market-research` | Stage deep-dive | (none) | LifecycleReport |
| `/agents/loss-modeling` | Stage deep-dive | (none) | LifecycleReport |
| `/agents/rating-deployment` | Stage deep-dive | (none) | LifecycleReport |
| `/agents/reserving` | Stage deep-dive | (none) | LifecycleReport |
| `/admitted` | Admitted carriers | `research-loop.mp4` | LayeredStack |
| `/non-admitted` | Non-admitted (E&S) | `customers-loop.mp4` | LayeredStack |
| `/customers` | Customers index | (none) | none |
| `/media` | Notes, announcements (Substack auto-feed), investors, prior research | `research-loop.mp4` | Notes rail |
| `/notes/[slug]` | On-domain Substack post mirror | (none) | prose article |
| `/careers` | Careers — two role cards + YC board on apply | `careers-loop.mp4` | YC waas-job-board |
| `/security` | Security + Trust Center | `security-loop.mp4` | Trust Center card |

`/news` has been retired and folded into `/media`.

---

## Graphics inventory

The visual systems we own and must keep current:

1. **CinematicHero** — title + deck + CTAs over a looping video.
2. **HarnessDiagram** — orchestrator-over-fleet.
3. **Lifecycle + LifecycleReport** — stage panels with a report-card on the right.
4. **LayeredStack** — sticky scroll-stack of layered cards on /admitted, /non-admitted.
5. **Header capsule + dropdowns** — recheck "Workbench" label every push.
6. **Footer** — investor logos, site nav, made-in-USA badge.
7. **Trust Center card** — `/security` only.
8. **Notes rail + /notes/[slug] prose** — `/media` and per-post pages, fed by Substack RSS at build time.

### Dead code (candidates for deletion)

- `AgentDef.astro`
- `AgentStack.astro`
- `BackgroundsStrip.astro`
- `ControlPlane.astro`
- `StackBuilder.astro`
- `Tabs.astro`
- `TesoraStack.astro`
- `VideoBand.astro`
- `HorizontalStack.astro` (after the LayeredStack swap)

Sweep these in a follow-up cleanup PR.
