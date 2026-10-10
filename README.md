# NSoC — Winter Edition Landing Page

Redesign of the [Nexus Spring of Code](https://www.nsoc.in) home page with a Winter Edition theme.

**Live:** https://&lt;your-app&gt;.vercel.app <!-- TODO after first deploy -->
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · GSAP · Zustand · Bun

![CI](https://github.com/<you>/<repo>/actions/workflows/ci.yml/badge.svg) <!-- TODO -->

<!-- TODO screenshots: desktop light, desktop dark, mobile light, mobile dark -->
<!-- TODO Lighthouse screenshot + securityheaders.com grade -->

## Run locally

```bash
bun install
bun dev          # http://localhost:3000
```

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `bun run lint`      | ESLint 9                             |
| `bun run typecheck` | Next route types + `tsc --noEmit`    |
| `bun run build`     | Production build                     |
| `bun run format`    | Prettier (+ Tailwind class sorting)  |
| `bun commit`        | Commitizen — Conventional Commits    |

## Highlights

- Canvas snowfall (40 flakes on mobile, 120 on desktop) with a persisted on/off toggle; pauses in background tabs and is off with reduced motion
- Aurora glow, frosted-glass cards, icicle dividers and an ice "sweep" on primary buttons, in polished dark **and** light themes
- Scroll-driven GSAP stat counters and timeline line draw; live timeline status (Completed / Now / Upcoming) computed from today's date
- Fully responsive, no horizontal scroll at 360 px, 44 px+ tap targets
- Security headers (CSP, HSTS, frame, referrer, permissions) and a contact form validated on client **and** server

## Stack usage

| Library               | Where it's used                                                           |
| --------------------- | ------------------------------------------------------------------------- |
| Motion                | Section reveals and staggered cards (`components/motion/fade-in`, `stagger`) |
| GSAP + ScrollTrigger  | Stat count-up (`motion/count-up`), timeline line draw (`sections/timeline-track`) |
| canvas-confetti       | Snow burst on "Join now!" and on contact form success (`lib/confetti`)   |
| tw-animate-css        | Hero entrance, sheet and accordion transitions                            |
| Zustand               | Snow toggle (persisted), mobile nav state (`store/ui-store`)             |
| Axios                 | Contact form client (`lib/axios`)                                         |
| React Hook Form + Zod | Contact form; one schema shared by client and API route (`lib/validations/contact`) |
| Sonner                | Form success / error toasts                                               |
| next-themes           | Dark / light / system theme                                               |
| shadcn/ui (Base UI)   | Button, Sheet, Tabs, Input, Textarea, Label, Tooltip                      |
| Lucide React          | All icons                                                                 |
| ESLint 9 + Commitizen | `bun run lint`, `bun commit`                                              |

## Architecture

```
src/
├─ app/            layout, page, API route (contact), OG image, icons, 404
├─ components/
│  ├─ layout/      navbar, mobile nav (Sheet), footer, logo
│  ├─ sections/    one file per page section (dumb renderers)
│  ├─ winter/      snowfall, aurora, frost card, icicle divider, snow toggle
│  ├─ motion/      Motion / GSAP wrappers
│  └─ ui/          shadcn/ui generated components
├─ data/           ALL page content, copied from nsoc.in
├─ lib/            gsap, confetti, axios, zod schema, utils
├─ store/          Zustand UI store
└─ types/          shared content types
```

Server Components by default; only animated or stateful pieces are client islands. The page is prerendered as static HTML (Next.js Cache Components), and the snowfall canvas is code-split and loaded client-only.

## Design decisions

- **Palette from the logo.** The NSoC Winter logo is ice blue and white, so glacier blue is the primary colour. A warm "ember" orange is reserved for the one action that matters (Join now) and the top prize, like a lantern in the snow.
- **Two moods.** Light mode is a bright snow-white morning; dark mode is a polar night with green/violet aurora.
- **Motion with restraint.** Content is readable before JavaScript loads; animations only enhance it. Everything respects `prefers-reduced-motion`, which turns off snow, counters, marquee and transforms.
- **Accessibility.** Semantic landmarks, skip link, visible focus rings, labelled icon buttons, 4.5:1 text contrast in both themes (including gradient text).

## Contact form

Validated with the same Zod schema in the browser and in `POST /api/contact`. The API also checks content type, body size (10 KB), a honeypot field and a per-IP rate limit (3 per 10 minutes, in memory — production would use a shared store such as Redis).

No email service is connected. After validation the visitor gets a pre-filled email to connect.nsoc@gmail.com to send from their own mail app.

## Data source

All content is sourced from the nsoc.in home page (captured 2026-10-10). Nothing is invented; see `src/data/*`.
