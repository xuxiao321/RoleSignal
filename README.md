# RoleSignal MVP

RoleSignal is a Next.js MVP for role decision intelligence. It compares what official job postings disclose, what they leave out, and what employees report about compensation, WLB, weekly hours, on-call, benefits, promotion speed, and offer quality.

The current seed data comes from official job postings with public salary ranges. Each profile now surfaces `Decision Gaps` so users can see which facts still need recruiter answers or employee reports.

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Files

- `src/app/page.tsx`: SEO metadata and the main role explorer entry.
- `src/components/RoleExplorer.tsx`: searchable MVP workspace, comparison table, and contribution modal.
- `src/app/roles/[slug]/page.tsx`: server-rendered role detail pages for SEO.
- `data/role-seeds.csv`: editable seed data for the current role pages.
- `scripts/build-role-data.mjs`: converts the seed CSV into TypeScript data.
- `src/lib/roleData.ts`: generated typed role dataset used by the app.
- `src/app/sitemap.ts` and `src/app/robots.ts`: crawlable SEO surfaces.

## Seed Data Workflow

Edit the CSV file:

```bash
data/role-seeds.csv
```

Then regenerate the app data:

```bash
npm run data:build
```

The data build script supports three level concepts:

- `companyLevel`: the company-specific ladder value, such as Google `L5`, Meta `E5`, Amazon `L6`, Microsoft `63`, or `Not disclosed`.
- `seniorityBand`: the normalized RoleSignal band, such as `Senior`, `Staff`, `Principal`, or `Unspecified`.
- `level`: the raw posting-level text from the official job posting, such as `Senior`, `Staff`, or `IC4-IC5`.

If a posting does not disclose a company-specific level, the script keeps `companyLevel` as `Not disclosed` and infers `seniorityBand` from the title and posting-level text.

Each generated role includes field-level evidence and computed decision gaps. The UI shows whether compensation, company level, seniority, benefits, WLB, and on-call are backed by an official posting, inferred by RoleSignal, or still waiting for employee reports.

Run the app:

```bash
npm run dev
```

Templates for legal data collection live in `data/templates/`:

- `official-job-postings.csv`: use official company career pages or ATS-hosted postings with pay ranges.
- `user-reports.csv`: collect user-submitted reports from contributors describing their own experience.
- `open-data-sources.csv`: track public datasets such as BLS OEWS and DOL OFLC disclosure data.

## Product Notes

- The homepage is the working product surface, not a marketing landing page.
- Individual role pages are statically generated from the seed dataset.
- User contributions currently save to local UI state; the next production step is wiring the employee report form to an API route and database.
- The main product loop is: official posting facts -> decision gaps -> employee reports -> higher confidence role profile.
- Real aggregation should store source links, derived structured facts, timestamps, and confidence scores rather than copying third-party content.

## SEO Direction

- Use `/roles/[slug]` for long-tail pages such as `Google L5 SWE Mountain View`.
- Add future routes for `/companies/[company]`, `/roles/[role]`, `/locations/[location]`, and comparison pages.
- Expand JSON-LD once real collection methodology, update cadence, and source provenance are available.
