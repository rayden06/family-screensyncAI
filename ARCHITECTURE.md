# Architecture

## System purpose
ScreenSync is a client-side demo that turns several people's preferences into one movie or series pick. All logic runs in the browser. There is no backend today.

## Stack decisions
| Layer | Selected technology | Reason | Constraints |
| --- | --- | --- | --- |
| Frontend | Single static page `public/index.html` (vanilla JS and CSS) | Original prototype built as one file | No component structure; edits are in one large file |
| 3D / visuals | three.js r128 from cdnjs | Animated backdrop | Needs internet; pinned old version |
| Fonts | Poppins via Google Fonts | Brand typeface | Needs internet; fallback is system-ui |
| Wrapper | Next.js 16.4.0, React 19, Tailwind 4, shadcn config | Repo structure for deployment | `app/page.tsx` is only a redirect; the real page is rewritten from `/` to `/index.html` in `next.config.mjs` |
| Backend/API | None | Not needed for the demo | No server-side data |
| Database | None; browser `localStorage` only | Saves the watchlist | Per-device, can be cleared |
| Authentication | None | Public demo | No user identity |
| Hosting | Vercel | Already deployed at v0-family-screensync.vercel.app | Production config beyond defaults: Unresolved |

## System boundaries
- Client owns: everything, including preference parsing, scoring, rendering, watchlist storage and the Google Calendar link.
- Server owns: serving static files only.
- External services own: Google Fonts, cdnjs (three.js), Unsplash (poster images), Google Calendar (event creation), the browser's speech recognition service, and the user's email app (contact link). If any fail, the page still loads but looks or behaves reduced.
- Out of scope: real Alexa+ or streaming APIs, accounts, server storage.

## Request and data flow
1. The visitor opens `/`; Next.js rewrites it to `/index.html`.
2. The page loads fonts, three.js and poster images from external hosts.
3. Preferences come from chips, text or voice and are parsed into genres, a maximum runtime, a no-subtitles flag, a "nothing slow" flag and a seen list.
4. Each title gets a score per person; the combined score weights the average at 70% and the lowest person's score at 30%. Titles are sorted by that score, then by a built-in match value.
5. The top title is rendered with a reasoning log. "Add to Google Calendar" opens a prefilled event link. Saved titles are written to `localStorage` under `ssW`.

## Interfaces
- API contract: None.
- Events/jobs: None.
- Outbound links: `calendar.google.com/calendar/render?action=TEMPLATE...` and `mailto:` contact link.

## Project structure
```text
app/            Next.js layout, redirect page, globals.css
components/     Empty (shadcn components would go here)
lib/            utils.ts (class name helper)
public/         index.html  <- the actual ScreenSync UI
docs/           These eight documents
AGENTS.md       Instructions for coding assistants
```

## Operations
- Environments: local (`pnpm dev`) and Vercel production. Staging: Not configured.
- Deployment and rollback: Vercel Git integration (Proposal: use Vercel's instant rollback). Monitoring: `@vercel/analytics` is installed and added to `app/layout.tsx`, but the layout does not wrap the rewritten static page, so visits are not recorded (Unresolved).
- Scale limits: static hosting; no known limits.

## Decisions and unknowns
- Confirmed: static page plus Next.js wrapper on Vercel.
- Proposal: migrate the single file into React components under `components/` only if the project grows.
- Unknown: whether any backend or real data source will be added.
