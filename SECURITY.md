# Security

> This document is not a compliance statement. It records what the prototype does today and what should be reviewed.

## Assets and trust boundaries
- Protected data: Very little. The watchlist (title IDs) in `localStorage`, and the contact email address shown on the page. No accounts, passwords or payment data.
- Trusted/untrusted inputs: Typed and spoken preference text (untrusted, user-provided), browser speech results, content loaded from external hosts (fonts, three.js, poster images).
- Threats relevant to this product: XSS if typed text is inserted as HTML; tampering with third-party scripts or images; privacy concerns from microphone use; scraping of the contact email.

## Authentication and authorization
- Identity provider/session policy: None; the site is public and anonymous.
- Roles and permissions: None.
- Ownership/tenant checks: Not applicable.
- Recovery and revocation: Not applicable.

## Secrets and configuration
- Secret names only: None required. No environment variables are used by the app.
- Storage and rotation: Not applicable. Do not commit `.env*` files (already in `.gitignore`).
- Client exposure: Everything in `public/index.html` is public.

## Input and output handling
- Validation: Preference text is parsed with keyword and number patterns. Saved IDs are parsed defensively.
- Injection/XSS protections: **Review needed.** The page builds much of its UI with template strings and `innerHTML`. Confirm that typed text (for example the per-person text box and the terminal log) is escaped or set via `textContent` before inserting. Not yet verified.
- Upload restrictions: None; the app has no uploads.
- Rate limits/abuse handling: None; no server endpoints exist.

## Privacy
- Data collected and purpose: The app itself sends nothing to a server. The browser's speech recognition may send audio to the browser vendor when the mic is used; the user must grant permission. Third-party hosts (Google Fonts, cdnjs, Unsplash) can see visitor IP addresses.
- Retention, deletion, access: Watchlist lives in the visitor's browser until they clear site data.
- Logging redaction: No logging implemented. If analytics is enabled (Vercel Analytics is installed but not wired to the static page), record that in this file.

## Dependencies and deployment
- Dependency review/update policy: Unresolved. `pnpm-lock.yaml` pins versions; the page also loads three.js r128 from a CDN without a subresource integrity hash (Proposal: add `integrity` and `crossorigin`, or self-host).
- Environment separation: Development and production only.
- Security-sensitive change review: Owner Unresolved.

## Verification
See TESTING.md: XSS probe strings in the text boxes, mic-denied behavior, storage-blocked behavior, and a check that no secrets are in the repo. Residual risks: third-party hosts, unreviewed `innerHTML` use, and exposed contact email. Owners: Unresolved.
