# Database

## Storage model
- Database/provider: None. The app has no database.
- Ownership model: Single device; each browser keeps its own data.
- Data classification: Public catalogue data plus a non-sensitive list of saved title IDs.

## Entities
| Entity | Purpose | Owner | Retention |
| --- | --- | --- | --- |
| Catalogue titles | About 100 hard-coded movie/series/music entries (a base list plus 60 generated ones) with genres, runtime, rating, year, platform label and match value | System (inside `index.html`) | Changes only by editing the file |
| Watchlist | Titles the visitor saved | The visitor's browser | Until the visitor clears site data |
| Preferences (people) | Mom, Dad, Rayden, Melani genre chips, limits and text | Page memory only | Lost on reload |

## Schema
- `localStorage["ssW"]`: JSON array of numeric title IDs, for example `[3, 17, 42]`. Read at load; if parsing fails it falls back to an empty list. Written whenever the watchlist changes.
- Title object (in code): `id, t (title), type, gn (genres), gs (genre list), rts, rt (minutes), rating, year, plat, match, img, sub (has subtitles), slow`.
- **Proposal (only if a backend is ever added):** `profiles(id, owner_id, name)`, `preferences(id, profile_id, genres, max_minutes, no_subtitles, nothing_slow)`, `watchlist_items(user_id, title_id, created_at)`, `titles(...)`. Approve or replace before implementation.

## Relationships
- Watchlist IDs point to catalogue title IDs by number. Nothing enforces this; an ID that no longer exists is ignored when the list is drawn.
- Delete/update behavior: removing a title from the file silently drops it from existing watchlists.

## Access rules
- Anyone with the page can read the catalogue. The watchlist is readable only by scripts on the same origin in that browser.
- There are no users, so no ownership or tenant checks exist.

## Queries and indexes
- Key query: filter catalogue by person's preferences, score, sort. All in memory, so no indexes needed at this size.

## Migrations and seed data
- Migration tool: None. Seed data is the in-file catalogue.
- Rollback/backups/restore check: Not applicable; the watchlist is not backed up.

## Data validation
- `ssW` is parsed in a try/catch with an empty-list fallback.
- Typed preference text is parsed by keyword and number patterns; unknown text is ignored.
