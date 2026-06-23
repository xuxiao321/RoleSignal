# RoleSignal Data Workflow

This folder is the legal seed-data workspace for RoleSignal.

## Recommended initial sources

1. Official company job postings with published salary ranges.
2. Public government datasets such as BLS OEWS and DOL OFLC disclosure data.
3. User-submitted reports from contributors describing their own compensation and work experience.
4. Manual interview notes summarized into structured fields.

Do not copy review text, salary tables, or page structure from competing salary sites. Store facts, source URLs, observation dates, and confidence scores.

## Main seed file

Edit `data/role-seeds.csv` to update the role pages shown in the app. Then run:

```bash
npm run data:build
```

The script regenerates `src/lib/roleData.ts`.

Use `data/benefit-signals.json` to attach benefits mentioned by official postings to each role slug. These are coverage signals only: they show what the posting discloses, not whether employees rate the benefits highly.

## Useful templates

- `data/templates/official-job-postings.csv`: official company posting intake.
- `data/templates/user-reports.csv`: anonymous user report intake.
- `data/templates/open-data-sources.csv`: public/open data source registry.

## Confidence rules

- Publish exact-looking ranges only when the source is official, licensed, or aggregated from enough user reports.
- Mark small samples as low confidence.
- Avoid showing single-user data points directly.
- Keep `sourceUrl` and `observedAt` for every official or public data point.

## Multi-source merge model

RoleSignal should treat every role profile as a bundle of field-level evidence, not as one flat record from one website.

Recommended source ownership:

- Official job posting: listed/base salary, location, remote policy, benefits text, posting title, sometimes company-specific level.
- Public wage data: occupation/location baseline and base salary sanity checks.
- Verified user reports: actual total compensation, equity/bonus, WLB, weekly hours, on-call cadence, promotion speed.
- Structured interviews: qualitative watchouts and team-level details, marked as lower confidence until repeated.

The generated app data includes an `evidence` array for each role. It tells the UI whether a field is `Available`, `Partial`, `Inferred`, `Needs data`, or `Needs user reports`.

The generated app data also includes a `decisionGaps` array. These are the role-specific questions that the official posting does not answer, such as full TC, WLB, weekly hours, on-call cadence, company ladder level, and promotion speed. This is the bridge from posting-backed seed data to employee-reported role intelligence.

Do not fill WLB, hours, on-call, or promotion speed from official postings unless the posting explicitly says so. Use `Needs data` until user reports or interviews exist.
