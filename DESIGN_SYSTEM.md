# Design System

> Values below are read from `public/index.html`. Anything labelled Proposal needs approval.

## Design direction
- Brand attributes: Cinematic, playful, living-room warm. (Proposal: confirm these three.)
- Supported devices: Mobile and desktop web. The CSS has breakpoints at 700, 760, 820 and 1000 px, plus separate hover and touch rules.
- References: Unresolved.

## UI tokens
| Token | Value | Usage |
| --- | --- | --- |
| color.background | `#f3e6d8` (`--bg`, light cream) | Main canvas; sections change `data-bg` as you scroll |
| color.text | `#1c1620` (`--fg`) | Primary copy |
| color.primary | `#e0476a` (`--acc`, pink-red) | Accent, cursor, ink-reveal text |
| color.surface.dark | `#0A0C10` (`--obs`) | Dark sections such as the crew section |
| color.surface.glass | `rgba(22,25,34,.78)` (`--glass`) | Overlays and panels |
| color.accent.crew | `#F59E0B` | Accent in the crew section |
| color.person | Mom `#d93f66` on `#f9d2dc`; Dad `#c96a06` on `#fbe6bd`; Rayden `#0e9468` on `#cdeedb`; Melani `#a0522d` on `#e7dcc9` | Per-person identity in Agent Room |
| color.fit | Good `#10B981`, partial `#F59E0B`, poor `#ef6a5a`, off `#7d8696` | Match bars and scores |
| font.body | Poppins, weights 300 to 800, system-ui fallback | All text |
| space.pad | `clamp(16px, 3.2vw, 46px)` (`--pad`) | Page gutters |

## Layout rules
- Single scrolling page with sections `home`, `library`, `watchlist`, `agent`, `creators`, `contact`, driven by a fixed top nav and a scroll progress bar.
- Background and accent colors animate between sections.
- Mobile behavior: layouts adapt at the breakpoints listed above; the custom cursor is only used where hover is available.

## Components
- Top nav: brand "Family ScreenSync AI" plus six links.
- Loader: "LOADING REELS" counter with a Skip button.
- Movie poster cards with a detail modal (`#mv`), heart/watchlist toggle and match percentage.
- Mood chips (genre, "Under 2 hrs", "No subtitles", "Nothing slow") and a text field with a mic button per person.
- Agent terminal: a log that prints the negotiation steps, then a result card.
- Flip-card "crew" deck, marquee strips, toast messages.
- Chat bubble ("Alexa+ chat") with scripted lines.
- Full per-state definitions (hover, focus, disabled, loading, error): Unresolved; the prototype defines hover and some active states only.

## Accessibility
- Present today: reduced-motion handling for some transitions, `aria-label` on the mic buttons, hover vs touch rules.
- Gaps to review: very few ARIA attributes, one `alt` attribute in the file, a hidden native cursor on hover devices, contrast of text on animated backgrounds, and keyboard access to posters and chips. Verification method: Unresolved (Proposal: Lighthouse plus manual keyboard pass).

## Screen states
- Loading: loader with counter and Skip.
- Empty: watchlist shows "Nothing saved yet. Open any poster and tap ♡ Watchlist."
- No preferences set: the agent shows "Nothing set yet" and treats each voice as "anything".
- Populated: poster grid, result card, watchlist grid.
- Error: no dedicated error screens; speech failure returns silently.

## Approval
Design owner: Unresolved (site credits UI/UX and motion to Aditya Kumar Singh; confirm). Source of truth: `public/index.html` (no separate design file known).
