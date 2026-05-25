# Tesora website review rubric

Apply this every push. Designed as a long-form checklist — run through it before opening a PR, and re-run after every commit that touches user-facing surface.

---

## 1. Voice rubric (text changes)

- [ ] **No em dashes (`—`) or en dashes (`–`).** Use periods, commas, parens, or restructure. The only acceptable exception is inside HTML comments that never render.
- [ ] **No hedging.** No "in development", "next release", "coming soon", "SOA/IFoA later". Either we ship it or we cut the line.
- [ ] **Pain-then-fix in headers and decks.** Lead with the problem the actuary feels; then the differentiator.
- [ ] **Short and specific.** "Six layers, one audit trail" beats "Multiple layers of robust auditing capability."
- [ ] **Capital modeling, cat testing, XOL, cession, PML are OUT.** The agent covers loss modeling, GLMs, reserving, market research. Nothing else.
- [ ] **Citations or it didn't happen.** Any new "AI does X" claim must mention citations / audit trail unless it's explicitly meta-content.
- [ ] **The actuary owns every decision.** Agents help, the actuary decides.
- [ ] **Author + reviewer + approver as separate identities.** Don't say "SOX-compliant" generically; specify the enforcement.
- [ ] **One credibility line at most per page.** Don't pile on Y Combinator + Foundation Capital + Stanford + Kumo in the same paragraph.

## 2. Terminology

- [ ] **The Tesora Workbench** = the conversational surface the actuary uses (chat next to Excel).
- [ ] **The Tesora Harness** = the framework underneath that orchestrates agents and enforces citations, audit log, separation of duties.
- [ ] Use "Workbench" in nav and entry points (`/`, header). Use "Harness" when explaining the framework underneath.
- [ ] Never use "agents" as a brand-level label. It's an implementation detail of the Harness.
- [ ] On the homepage pill, the sub line is always: "How the agents work, audited end to end." (Do not introduce Workbench/Harness terminology in the pill sub.)

## 3. Design rubric (visual changes)

- [ ] **Border-radius 5px everywhere.** Only exceptions: pills (`999px`), full circles (`rounded-full`), tokens via `var()`.
- [ ] **No gradients.** Solid fills only. `color-mix()` for tints is fine.
- [ ] **Accent: `--color-oxblood` (#B400FE).** Restrained.
- [ ] **Background tokens:** `--bg` (bone), `--bg-panel` (stone). Alternate section backgrounds.
- [ ] **Card surfaces:** white (#FFFFFF) only when the section background is `--bg-panel` (need contrast).
- [ ] **Borders:** `1px solid var(--rule)` unless an intentional accent border.
- [ ] **Video heroes:** once per page in `CinematicHero`. No additional autoplay video below.
- [ ] **Filled-purple "Demo →" CTA** is the only filled button. Other CTAs are outlined pills.

## 4. Page-fit rubric (layout)

- [ ] **At 100% browser zoom on a 900px-tall viewport, every named section fits the visible area.** Audit each new section.
- [ ] **Graphics fit within their grid column.** No horizontal overflow.
- [ ] **Mobile (375px):** every section is readable. No horizontal scroll (unless scroll is the affordance, e.g., a scroll-stack).

## 5. Animation rubric

- [ ] **Motion clarifies, doesn't decorate.** Every animation has a job: showing flow, signalling state, drawing the eye to the active layer.
- [ ] **Reveal on enter** uses `IntersectionObserver`, not scroll listeners.
- [ ] **Reduced-motion users get the final state immediately.** Test with `@media (prefers-reduced-motion: reduce)`.
- [ ] **No animation longer than 700ms.** Stagger across 1-1.5s max.

## 6. Push checklist (procedural)

1. `bun run build` passes.
2. `bunx tsc --noEmit` (current `scripts/` errors are pre-existing).
3. Preview server verification of every page touched:
   - `preview_eval` DOM inspection of new copy.
   - 100%-zoom screenshot of new sections.
4. `grep '—\|–'` returns only HTML-comment hits.
5. `grep -i 'capital model\|cat test\|PML\|XOL'` returns nothing.
6. Commit with conventional prefix: `design:`, `copy:`, `feat:`, `fix:`.
7. Push to a feature branch, never master.
8. Report the PR link.

---

## Page inventory

15 generated pages today.

| Route | Purpose | Hero video | Graphics |
| --- | --- | --- | --- |
| `/` | Frontier AI for Actuaries entry | `hero-loop.mp4` | Workbench pill |
| `/agents` | The Tesora Workbench (kept at `/agents` URL) | `agents-loop.mp4` | **HarnessDiagram**, **Lifecycle + LifecycleReport** |
| `/agents/insight` | Insight Agent | `research-loop.mp4` | **HarnessDiagram** |
| `/agents/rating` | Rating Agent | `rating-loop.mp4` | **HarnessDiagram** |
| `/agents/market-research` | Stage deep-dive | (none) | **LifecycleReport** |
| `/agents/loss-modeling` | Stage deep-dive | (none) | **LifecycleReport** |
| `/agents/rating-deployment` | Stage deep-dive | (none) | **LifecycleReport** |
| `/agents/reserving` | Stage deep-dive | (none) | **LifecycleReport** |
| `/admitted` | Admitted carriers | `research-loop.mp4` | **LayeredStack** (replacing HorizontalStack) |
| `/non-admitted` | Non-admitted (E&S) | `customers-loop.mp4` | **LayeredStack** (replacing HorizontalStack) |
| `/customers` | Customers index | (none) | none |
| `/media` | Media + contrarian thesis | `research-loop.mp4` | none |
| `/news` | News | (none) | `NewsItem` cards |
| `/careers` | Careers | (none) | none |
| `/security` | Security | (none) | none |

## Graphics inventory

The visual systems we own and must keep current:

1. **CinematicHero** — title + deck + CTAs over a looping video. Most pages. Test for voice + readability.
2. **HarnessDiagram** — orchestrator-over-fleet. `/agents`, `/agents/insight`, `/agents/rating`.
3. **Lifecycle + LifecycleReport** — stage panels with a report-card on the right. `/agents` + `/agents/[stage]`. Fits at 100% zoom.
4. **LayeredStack** — sticky vertical scroll-stack of layered cards. `/admitted`, `/non-admitted`. (Replaces `HorizontalStack`.)
5. **NewsItem** — news cards. `/news`.
6. **Header capsule + dropdowns** — nav. Recheck "Workbench" label on every push.
7. **Footer** — investor logos, site nav, made-in-USA badge.

### Dead code (candidates for deletion)

The following components exist but no page imports them today:

- `AgentDef.astro`
- `AgentStack.astro`
- `BackgroundsStrip.astro`
- `ControlPlane.astro`
- `StackBuilder.astro`
- `Tabs.astro`
- `TesoraStack.astro`
- `VideoBand.astro`
- `HorizontalStack.astro` (after the LayeredStack swap)

Track these for removal in a follow-up sweep.
