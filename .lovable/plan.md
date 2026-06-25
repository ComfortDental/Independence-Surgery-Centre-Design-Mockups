
# v5 — "The Door That Opens"

A new route at `/v5` built from scratch. Same message as v1–v4 (a surgery center in Independence, MO that accepts Medicaid patients other places turn away, opening Q4 2026), but reframed as a slow, cinematic editorial experience. Not a landing page — a short film you scroll through.

## Creative direction

**Concept:** *"Twelve doors closed. One opens."* The page is paced like a documentary: a quiet cold open, a personal indictment, a reveal of the place itself, the people, the promise, and a single decisive CTA.

**Aesthetic:** Editorial / cinematic. Deep ink black (#0B0B0C) and bone white (#F4F1EA) as the spine, with a single restrained accent — surgical amber (#D9A441) used once per section, never as decoration. Wide letter-spaced eyebrow micro-type, oversized serif display (Fraunces or GT Sectra-feel via Fraunces variable), neutral grotesque body (Geist or Inter Tight). No gradients. No glassmorphism. No card stacks. Lots of black. Lots of silence.

**Pacing principle:** every section earns its scroll. Generous vertical rhythm (min 12rem section padding on desktop). One idea per screen.

## Narrative arc (sections)

```text
0  COLD OPEN          Black screen, single line fades in: "Twelve. That's the average."
1  HERO               Full-bleed building photo, slow Ken-Burns zoom. Eyebrow:
                      "OPENING Q4 2026 · INDEPENDENCE, MO". Display H1 (3 lines,
                      line-by-line clip-path reveal):
                          "A surgery center
                           for the patients
                           everyone else sent home."
                      Single ghost CTA: "Refer a patient ↓"
2  THE PROBLEM        Horizontal counter section. A giant "12" that animates 0→12
                      on enter. Subline: "private oral surgeons in greater Kansas
                      City accept Medicaid." Underneath, three short stat lines
                      revealed in sequence.
3  WHY THIS EXISTS    Two-column editorial: left = pull quote in serif italic
                      ("We didn't build this to be different. We built it because
                      someone had to."). Right = three short paragraphs, narrow
                      measure, drop-cap on first.
4  THE PLACE          Full-bleed parallax photograph of the building (no overlay
                      text on the image). Below it, a thin metadata strip:
                      "19921 E Jackson Dr · 4 ORs · Owner-operated · No PE".
5  WHAT WE DO         Two large editorial tiles, side-by-side on desktop,
                      stacked on mobile. Oral & Maxillofacial / Pediatric Dental.
                      Each tile: number index (01/02), specialty name in serif,
                      one-sentence promise, hover = subtle image reveal.
6  THE PEOPLE         Doctor roster as a horizontal scroll-snapping row on
                      desktop, vertical stack on mobile. Portrait + name in
                      serif + one-line credential. No bios — restraint.
7  THE PROMISE        Dark section. Single centered statement, large serif:
                      "If you've been turned away, we will see you." A diagonal
                      reveal (clip-path) wipes in on scroll.
8  REFER              Minimal form on bone background. Provider / Family toggle.
                      Four fields. One button. Urgency line above:
                      "Building our referral network now. Doors open Q4 2026."
9  FOOTER             Address, phone, email. Hairline rules. Nothing else.
```

## Interaction & motion system

- **Smooth scroll spine** — Lenis-style smoothing via CSS `scroll-behavior` + a single rAF-driven progress var `--scroll` on `:root` so any section can react.
- **Reveal grammar** — one IntersectionObserver utility with three variants: `data-reveal="rise"` (translateY 24px + opacity), `data-reveal="clip"` (clip-path inset reveal, used once per section max), `data-reveal="count"` (number tween).
- **Cursor** — default; pointer only on interactive. No custom cursor (taste over gimmick).
- **Hover** — links use a 2-line slide (current label slides up, duplicate slides in from below). Buttons get a 1px underline that draws left→right in 280ms.
- **Hero image** — slow 12s Ken-Burns scale 1 → 1.06. Subtle, never distracting.
- **Sticky section labels** — small left-rail eyebrow ("02 / THE PROBLEM") that sticks while its section is in view, fades between sections.
- **Type entrances** — display headlines split into lines (not letters — letter-by-letter is overdone) and clip-path reveal with 60ms stagger.
- **No** parallax on text, no marquees, no auto-playing video, no scroll-jacking, no progress bars on the side (v2 already explored that).

## Layout & responsive

- Desktop: 12-col implicit grid, `clamp()` everywhere, max content width 1280px with editorial sections that bleed full width.
- Tablet: collapses to 8-col feel, horizontal doctor row becomes 2-up grid.
- Mobile: single column, headline shrinks from `clamp(3.5rem, 8vw, 7rem)` to fit, section padding drops to 6rem, sticky left-rail eyebrow moves to top of section.
- Nav: minimal top bar, links right-aligned, hamburger under 720px with a full-screen overlay menu (fade + 8px blur on the page behind).

## Copy refinements (vs v1–v4)

- Hero: *"A surgery center for the patients everyone else sent home."* (more emotional than v4's direct address, less defensive)
- Eyebrow stays factual: opening date + city.
- Problem section leads with the number, not the explanation.
- Promise section is one sentence, not a paragraph.
- Form urgency line: *"Building our referral network now. Doors open Q4 2026."*
- Footer is address + contact only — no nav repeat, no social.

## Technical plan

- New file `src/routes/v5.tsx` (route `/v5`), self-contained — does not touch v1–v4.
- Append a scoped `.v5 { … }` block at the end of `src/styles.css` for v5-only tokens, type scale, reveal keyframes, and the left-rail sticky eyebrow. No changes to existing v1–v4 styles.
- Load Fraunces (display) and Geist (body) via `<link>` in `src/routes/__root.tsx` head (Tailwind v4 rule: no remote `@import` in styles.css).
- Reuse existing photo assets: `building-front-v2.png`, `building-side-v2.png`, `building-entry.png`, `building-signage.png`, `isc-logo.png`, `isc-logo-white.png`. No new images required.
- One small hook in-file: `useReveal` (IntersectionObserver) and `useCountUp` for the "12". No new dependencies.
- Form is presentational (matches v1–v4 — no backend wiring requested).
- SEO: route `head()` with v5-specific title, description, og:title, og:description, og:image pointing to the hero building photo.

## Out of scope (explicit)

- No changes to `/`, `/v2`, `/v3`, `/v4`.
- No backend, no Lovable Cloud enablement, no form submission handler.
- No new image generation — using existing assets.
- No new npm dependencies.

## Acceptance check

After build, I'll Playwright-screenshot `/v5` at 1440 and 390 widths, verify: hero reveals line-by-line, "12" counts up on scroll, sticky left-rail eyebrow tracks sections, dark "promise" section diagonal-wipes in, form focus ring renders, mobile nav overlay works.
