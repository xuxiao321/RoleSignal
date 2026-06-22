# RoleSignal MVP

RoleSignal is a Next.js MVP for structured company-role decision intelligence. It turns scattered signals such as compensation, WLB, benefits, on-call, hours, promotion speed, and confidence into searchable role pages.

The seed data in this prototype is demo data only. It is designed to validate the product structure before connecting real sources or user submissions.

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Files

- `src/app/page.tsx`: SEO metadata and the main role explorer entry.
- `src/components/RoleExplorer.tsx`: searchable MVP workspace, comparison table, and contribution modal.
- `src/app/roles/[slug]/page.tsx`: server-rendered role detail pages for SEO.
- `src/lib/roleData.ts`: typed demo dataset that can later move to Postgres or another data store.
- `src/app/sitemap.ts` and `src/app/robots.ts`: crawlable SEO surfaces.

## Product Notes

- The homepage is the working product surface, not a marketing landing page.
- Individual role pages are statically generated from the seed dataset.
- User contributions currently save to local UI state; the next production step is wiring the form to an API route and database.
- Real aggregation from third-party sites should store source links, derived structured summaries, timestamps, and confidence scores rather than copying third-party content.

## SEO Direction

- Use `/roles/[slug]` for long-tail pages such as `Google L5 SWE Mountain View`.
- Add future routes for `/companies/[company]`, `/roles/[role]`, `/locations/[location]`, and comparison pages.
- Expand JSON-LD once real collection methodology, update cadence, and source provenance are available.
