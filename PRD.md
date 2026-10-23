# Product Requirements Document

> Source: the working prototype in `public/index.html` and https://v0-family-screensync.vercel.app. Items marked **Proposal** or **Unresolved** are not confirmed decisions.

## Project context
- Product: Family ScreenSync AI ("ScreenSync")
- Owner: Unresolved (the site's crew section lists Mahi Gupta as Team Leader, Product & Vision; confirm)
- Status: Draft (hackathon prototype)
- Problem: Families lose time arguing over what to watch because each person has different genre, length and subtitle preferences.
- Target users: Households choosing one movie or series together, shown in the demo as Mom, Dad, Rayden and Melani.
- Desired outcome: One agreed family pick, quickly, with no long argument. Tagline on the site: "Family movie night, minus the 40-minute argument."

## MVP scope
- Must ship (already in the prototype):
  - Per-person preference input (mood chips, free text, microphone).
  - An "Alexa+" style agent that scores every title for all four voices and picks one consensus title.
  - A browsable movie and series library with a "Surprise me" option.
  - A family watchlist stored on the device, with a "pick from watchlist" action.
  - Add the chosen title to Google Calendar as movie night.
  - Crew (creators) section and a contact link.
- Explicitly excluded: Real Alexa+ integration, real streaming-service availability data, accounts and sync across devices, payments, and live recommendation APIs. The site describes itself as "a simulated living-room dashboard".
- Constraints: Static front end, no backend, runs in a modern browser; needs internet for fonts, three.js and poster images.

## User journeys
1. **Negotiate a family pick.** A family member opens the site, goes to Agent Room, sets each person's preferences (chips, typed phrase such as "comedy under 2 hours", or voice), taps "Negotiate family consensus", and sees the winning title with a match percentage. Failure/recovery: if nothing is set, the agent treats each voice as "anything" and still returns a pick; if voice input is unsupported, type instead.
2. **Fill the demo.** A visitor taps "Fill demo family" to load sample preferences for all four people, then negotiates.
3. **Browse and save.** A visitor opens the Library, opens a title for details, taps the heart to save it, and finds it under Watchlist. Recovery: if browser storage is blocked, saving silently does nothing and the list resets on reload.
4. **Pick from the watchlist.** A visitor taps the watchlist pick button and the agent chooses the best saved title. Recovery: with an empty watchlist the agent shows "Add a movie or series first".
5. **Book movie night.** After a pick, the visitor taps "Add to Google Calendar", which opens a prefilled Google Calendar event.
6. **Contact the team.** A visitor taps the email link in Contact.

## Feature specifications
| ID | User need | Behavior | Acceptance criteria | Priority |
| --- | --- | --- | --- | --- |
| F-01 | As a family member, I set what I want | Genre chips, "Under 2 hrs", "No subtitles", "Nothing slow", and a free-text box per person | Given a person's chips are selected, when I view Agent Room, then that person's matches update and show what was understood | Must |
| F-02 | As a family member, I speak my request | Mic button uses the browser speech API and fills the person's text | Given a supported browser and mic permission, when I speak, then the transcript is applied; otherwise no crash and typing still works | Should |
| F-03 | As a family, we want one pick | Agent scores all titles per person, combines the scores, and returns the top title | Given preferences are set, when I tap Negotiate, then a top title and match percentage appear with a visible reasoning log | Must |
| F-04 | As a family, we exclude what we've seen | Phrases like "already seen Shrek" remove that title for that person | Given "already seen X" is entered, when negotiating, then X scores 0 for that person | Should |
| F-05 | As a family, we browse the catalogue | Library of posters with detail view and "Surprise me" | Given I open Library, when I tap a poster, then details and each person's fit are shown | Must |
| F-06 | As a family, we save titles | Heart toggles watchlist; stored locally; watchlist pick action | Given I save a title, when I reload on the same device, then it is still listed | Should |
| F-07 | As a family, we schedule movie night | Opens a Google Calendar event template for the pick | Given a pick exists, when I tap the calendar button, then a new tab opens with the title and runtime filled | Should |
| F-08 | As a visitor, I learn who built it | Crew section with seven members and roles; contact email link | Given I open Creators/Contact, then names, roles and the email link display | Could |

## Success measures
- Metric: Time from opening Agent Room to a family pick. Measurement method: Unresolved. Target: Unresolved (Proposal: under 60 seconds with the demo).
- Accessibility/performance requirements: Unresolved. See TESTING.md for the checks to run; the prototype currently has few ARIA labels and no measured performance budget.

## Open decisions
- Who owns the product decisions and the GitHub repo? Needed before: next release.
- Will the project stay a simulated demo or connect to a real catalogue/assistant? Needed before: any backend work.
- Should watchlists sync across devices? Needed before: adding accounts.
- Is the catalogue content (titles, posters) licensed for public use? Needed before: any public launch.

## Definition of ready
Scope, journeys and acceptance criteria above are approved by the owner, and the unresolved decisions that block the next milestone are answered.
