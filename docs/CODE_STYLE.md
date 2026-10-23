# Code Style

## Languages and conventions
- Language/version: TypeScript 5.7.3 for the Next.js wrapper; vanilla JavaScript and CSS inside `public/index.html`. Node version: Unresolved (Proposal: current LTS that supports Next.js 16).
- Naming: Wrapper files use Next.js conventions (`layout.tsx`, `page.tsx`, kebab-case for new component files). The big page uses short names (for example `P` for people, `W` for the watchlist set) which should not be copied into new code.
- Formatting/linting: Not configured (no ESLint, Prettier or Biome in `package.json`).
- Type safety: `strict` is on in `tsconfig.json`. Path alias `@/*` maps to the project root.

## Organization
- Directory responsibilities: see the structure in ARCHITECTURE.md.
- Shared components/utilities: `lib/utils.ts` exports `cn()` (clsx plus tailwind-merge). New shadcn components belong in `components/ui` (see `components.json`).
- Business logic placement: Preference parsing and scoring currently live inside `public/index.html` (`parse`, `sat`, `negotiate`). Proposal: extract them to `lib/` as pure, testable functions before adding features.
- Import/dependency boundaries: Do not import `public/index.html` code into React; treat it as a standalone page.

## Coding rules
- Keep functions focused; follow established repository patterns.
- Validate external inputs at the trust boundary (typed and spoken text).
- Handle loading, empty, error and success states explicitly.
- Avoid silent failures and undocumented magic values (the scoring weights 0.7 and 0.3 should be named constants if moved).
- Reuse existing components before introducing new abstractions.
- Prefer `textContent` over `innerHTML` for any user-provided text.

## Errors and logging
- Error shape: No standard. Proposal: user-facing toast for recoverable errors, console warning for developer detail.
- Logging levels and redaction: Follow SECURITY.md; do not log voice transcripts.

## Dependencies
- New packages: Ask the owner before adding any.
- Versioning/lockfile practice: pnpm with a committed `pnpm-lock.yaml`. Keep `package.json` and the lockfile in sync or Vercel installs will fail.

## Review checklist
- Implementation matches the feature acceptance criteria in PRD.md.
- Type and build checks use the commands below.
- No credentials or unrelated files in the diff.
- Tests cover meaningful changed behavior.

## Verified commands
- Install: `pnpm install` (defined by the project; not run in this documentation task)
- Dev server: `pnpm dev`; Build: `pnpm build`; Start: `pnpm start` (scripts exist in `package.json`)
- Format: Not configured
- Lint: Not configured
- Type check: Not configured as a script (Proposal: add `"typecheck": "tsc --noEmit"`)
Never invent commands or claim checks passed without running them.
