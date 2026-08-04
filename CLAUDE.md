# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/informational site for DOST START (a Philippine DOST-SEI scholar organization). Next.js 15 App Router + React 19 + Tailwind v4 + TypeScript, content backed by Contentful. Deployed on Vercel.

## Commands

```bash
npm run dev      # next dev --turbopack
npm run build    # next build (also the only real typecheck — no separate tsc script)
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite and no test runner configured.

Contentful maintenance scripts (run via `tsx`, need `CONTENTFUL_MANAGEMENT_TOKEN`):

```bash
npm run contentful:migrate-models   # create/update content types in the space
npm run contentful:migrate-data     # push local src/lib data into Contentful
npm run contentful:migrate          # both, in order
npm run contentful:create-departments  # copy one term's departments into another term
npm run contentful:import-officers  # bulk-import officers from a CSV
```

`import-officers-csv.ts` reads a **hardcoded** CSV filename (`CSV_FILE_PATH` near the top of the file) from `scripts/contentful/` and imports into the term named by `TERM_NAME` just below it, downloading headshots from Google Drive links. Change those constants to point at a different CSV/term. See [scripts/contentful/README.md](scripts/contentful/README.md) for the expected columns and the full content-model reference.

Departments are per-term, so a new term starts with none and the officer import only *looks them up* — it skips any department it can't find. Seed them first with `create-departments.ts`, which clones every `department` entry from `SOURCE_TERM_NAME` to `TARGET_TERM_NAME` (constants, or `--from`/`--to`), preserving all fields and changing only the entry ID (`dept-{slug}-{termSuffix}`, e.g. `dept-executive-leadership-2627`) and the `term` link. It creates the target term if missing, skips departments already present there, and supports `--dry-run`.

## Environment

`.env` / `.env.local` keys (see [.env.example](.env.example)):
- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` — required for CMS content; without them the site silently falls back to local static data
- `CONTENTFUL_PREVIEW_TOKEN`, `CONTENTFUL_ENVIRONMENT`, `CONTENTFUL_MANAGEMENT_TOKEN`
- `REVALIDATE_SECRET_TOKEN` — required in production for `/api/revalidate` (not in `.env.example`)
- `WEBSITE_DOMAIN_URL` — used as `metadataBase` and in every page's canonical/OG URLs; wrong value breaks SEO metadata
- `EMAIL_USER`, `EMAIL_PASS`, `COMMS_EMAIL`, `CRRD_EMAIL` — Gmail nodemailer transport for the contact form

## Architecture

### Data layer: Contentful with local fallback

The key abstraction is [src/lib/data.ts](src/lib/data.ts) — **pages should import from here, never from `src/lib/contentful/*` or `src/lib/events|officers/*` directly.** Every function tries Contentful first, catches, and falls back to the checked-in static data in [src/lib/events/](src/lib/events/) and [src/lib/officers/2024-2025/](src/lib/officers/2024-2025/). That fallback data is legacy content that still ships in the bundle; leave it in place unless deliberately retiring it.

Three layers, in order:
1. [src/lib/contentful/client.ts](src/lib/contentful/client.ts) — clients (delivery + preview), `CACHE_TAGS`, and `getAssetUrl`/`getThumbnailUrl`/`getCoverImageUrl`/`getProfileImageUrl` helpers that append Contentful Images API params. Always route asset URLs through these rather than using raw asset URLs.
2. [src/lib/contentful/events.ts](src/lib/contentful/events.ts), [officers.ts](src/lib/contentful/officers.ts) — fetch + transform Contentful entries into the local `Event` / `Officer` shapes in [src/types/](src/types/). Wrapped in both React `cache()` (per-request) and `unstable_cache()` (cross-request, tagged).
3. [src/lib/data.ts](src/lib/data.ts) — the unified fallback-aware API used by pages.

### Caching and revalidation

- `CACHE_REVALIDATE_SECONDS` is `3600` in production and `false` in development, so dev always hits Contentful live.
- Content pages set `export const revalidate = 3600` (ISR).
- [src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts) is the Contentful webhook target: it maps the published content type to `CACHE_TAGS` and calls `revalidateTag`. Auth is the `x-revalidate-token` header (or `?token=` on GET). When adding a new cached Contentful query, add its tag to `CACHE_TAGS` **and** to the switch in this route, or edits in Contentful won't appear until the hour is up.

### Content model shape (why officers code looks the way it does)

Officers are not directly attached to departments. A `departmentOfficer` join entry links `officer` → `department` and carries the presentation data: `order`, `section` (`special` | `regular` | `subDepartment`), and `subDepartmentName`/`subDepartmentDescription`. `buildDepartments()` in [src/lib/contentful/officers.ts](src/lib/contentful/officers.ts) fans these join entries out into `specialOfficers` / `officers` / `subDepartment[]`. Sorting is `order` first, then `roleType` (chief → deputy → committee → member). Per-link `order` overrides the officer-level `order`.

`term` (e.g. `"2024-2025"`) is the top-level partition for both events and officers.

### Routing

- `/officers` redirects to `/officers/{latestTerm}/{firstDepartment}` via `getDefaultOfficerPath()`.
- `/officers/[...slug]` expects exactly `[year, department]` — anything else 404s; an unknown department redirects to the term's first department. `generateStaticParams` enumerates every year×department pair.
- `/events/[slug]` is prerendered from `getAllEventSlugs()`.
- Events are bucketed into current/upcoming/past by [src/lib/events/utils.ts](src/lib/events/utils.ts) `getCategorizedEvents()` — "current" means a multi-date event straddling today; comparisons are date-only (midnight-normalized).

### Components and styling

- shadcn/ui (new-york style) in [src/components/ui/](src/components/ui/), configured by [components.json](components.json), which also registers the `@react-bits` and `@aceternity` registries — several components (ChromaGrid, GooeyNav, Masonry, ProfileCard, tracing-beam, comet-card, …) are vendored from those and are heavy client-side/animated. Feature components live in `src/components/{home,events,officers,about,contact}/`.
- Tailwind v4 with CSS-first config: all design tokens live in `@theme inline` / `:root` in [src/app/globals.css](src/app/globals.css). There is no `tailwind.config.*`. The `.dark` token block is currently commented out, but components still carry `dark:` variants.
- Fonts come from [src/lib/fonts.ts](src/lib/fonts.ts) and are exposed as `font-sans` (Plus Jakarta), `font-mono`, `font-montserrat`, `font-orbitron`.
- Project-specific utility classes: `.start-border-radius` (18px) and `.start-dropshadow`.
- Pages are Server Components by default; interactive pages split into a `page.tsx` (metadata + data) plus a `*Client.tsx`.

### Other notes

- Any new remote image host must be added to `images.remotePatterns` in [next.config.ts](next.config.ts) or `next/image` will throw at runtime.
- The contact form posts through the `"use server"` action in [src/lib/serverFunctions.ts](src/lib/serverFunctions.ts), routing to `COMMS_EMAIL` or `CRRD_EMAIL` depending on `isPartner`.
- The Contentful transform functions use `any` with a file-level `eslint-disable` for `no-explicit-any`, since Contentful's generic `Entry<T>` typing is awkward here; match that local convention rather than fighting it.
