# Testing

## Goals and scope
Before any release, the main journey (set preferences, negotiate, see a pick) and the watchlist, calendar and microphone fallbacks must work on mobile and desktop. Features are F-01 to F-08 in PRD.md. Security checks come from SECURITY.md.

## Test layers
- Unit: Preference parsing, scoring and negotiation (needs extraction from `index.html` first; see CODE_STYLE.md).
- Integration: Not applicable (no API or database).
- End-to-end: Critical journeys in a real browser (Proposal: Playwright).
- Manual: UI, accessibility, voice input, and the Vercel deployment.

## Acceptance test matrix
| Feature/risk | Scenario | Expected result | Layer | Status |
| --- | --- | --- | --- | --- |
| F-01 | Select a genre chip for one person | Matches update for that person | E2E/Manual | Not run |
| F-01 | Type nonsense text | No crash; text is ignored | Unit | Not run |
| F-03 | Tap "Negotiate family consensus" with all four set | A top title and a percentage appear with a log | E2E | Not run |
| F-03 | Negotiate with nothing set | Treated as "anything"; still returns a pick | E2E | Not run |
| F-04 | Enter "already seen Shrek" for one person | That title scores 0 for that person | Unit | Not run |
| F-02 | Mic in a supported browser | Transcript fills the field | Manual | Not run |
| F-02 | Mic denied or unsupported | No crash; typing still works | Manual | Not run |
| F-06 | Save a title and reload | Still on the watchlist | E2E | Not run |
| F-06 | Storage blocked | Page works; list not persisted | Manual | Not run |
| F-06 | Pick from an empty watchlist | Message "Add a movie or series first" | E2E | Not run |
| F-07 | Tap "Add to Google Calendar" | New tab with prefilled title and runtime | Manual | Not run |
| Security | Enter `<img src=x onerror=alert(1)>` in text boxes | Shown as text; no script runs | Manual | Not run |
| Offline/CDN | Block three.js or fonts | Page remains usable | Manual | Not run |
| Accessibility | Keyboard-only walkthrough; mobile 360 px width | All actions reachable; layout intact | Manual | Not run |

## Fixtures and environments
- Synthetic test users and data: the built-in demo family ("Fill demo family").
- External services: Real Google Calendar link and speech API are manual-only.
- Reset/isolation: Clear site data between runs.

## Verified commands
- Unit/integration: Not configured
- End-to-end: Not configured
- Build/type check: `pnpm build` exists as a script; not run for this document

## Release criteria
Every "Must" feature scenario above passes, the XSS probe is safe, and no unresolved failures remain. Owner: Unresolved.

## Results
No tests have been executed. All statuses above are Not run.
