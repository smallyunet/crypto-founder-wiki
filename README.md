# Crypto Founder Wiki

An evidence-led, multilingual-ready archive of crypto founders and other consequential industry figures.

**Live site:** <https://smallyunet.github.io/crypto-founder-wiki/>

## What is included

- Long-form Markdown dossiers with visible evidence boundaries.
- Structured people, network, and dated-ranking collections validated at build time.
- Simplified Chinese and English editions with build-time coverage checks.
- Static search, responsive navigation, dark mode, sitemap, and GitHub Pages deployment.

The archive currently covers **18 people across 8 networks**, with 18 structured research records and full English and Simplified Chinese editions. Networks include Bitcoin, Ethereum, BNB Chain, Solana, TRON, Dogecoin, Litecoin, and Neo. Protocol founders and other industry figures are explicitly distinguished.

Research records capture capital formation, asset ownership boundaries, evidence-graded claims, unresolved questions, and revision dates. Ranking pages show the latest stored snapshot for each method, not live prices or personal wealth rankings.

## Project structure

```text
src/content/docs/<locale>/   Published articles and methodology
src/data/people/             Language-neutral person records
src/data/networks/           Network relationships
src/data/rankings/           Dated ranking or coverage snapshots
src/components/              Data-driven directory components
```

## Development

```bash
npm ci
npm run dev -- --background
npm run verify
```

Use Node.js 24 (the CI runtime). Manage the background server with `npm exec astro dev status`, `npm exec astro dev logs`, and `npm exec astro dev stop`.

`npm run verify` runs regression tests, Astro diagnostics, content consistency checks, the production build, and generated-route/internal-link validation. Output is written to `dist/`.

Pushes to `main` trigger GitHub Pages deployment. The deployment job installs locked dependencies and runs the full verification command before uploading that exact build. A failed verification blocks publication. The deployed `build-info.json` records the exact commit SHA and workflow run ID for production readback. The separate Check workflow also validates pull requests.

## Maintenance

- **Update a dossier:** edit both locale articles, the person record, and its research record together. Recheck the underlying sources before changing review/access dates or marking a dossier `reviewed`. Build checks validate structure and consistency; they do not establish that claims are true.
- **Add a person or network:** use a stable ID, maintain reciprocal relationships where applicable, add both locale pages and licensed artwork, and update the relevant coverage snapshot. Run `npm run verify` before publishing.
- **Add a ranking snapshot:** create a new dated JSON file in `src/data/rankings/`; preserve previous snapshots. Include the provider, source URL, retrieval time, method, values, and limitations. Selection prefers the newest `asOf`, then `retrievedAt`, then stable ID. Dates remain visible on the page.
- **Check external sources:** run `npm run check:links`. Inspect `reports/external-links.json` (generated, not committed). HTTP 404/410 responses fail the check; access restrictions, rate limits, server errors, and timeouts are reported as unverified warnings. `npm run check:links -- --strict` also fails on warnings. HTTP success alone does not validate source content.

The External link check workflow runs weekly on Monday at 03:17 UTC, on changes to its implementation, or manually through GitHub Actions. It saves a summary and a downloadable report for 30 days, including when dead links are found. External network availability is intentionally checked separately from the deployment gate.

Review unresolved questions and time-sensitive holdings, company roles, and regulatory claims periodically. Keep old review dates until an actual source audit is completed. The current market-cap dataset is a dated snapshot from 2026-08-31; adding new data requires a fresh source retrieval.

## Image licensing

Portraits and network artwork are stored for publication with this wiki, but
their copyrights and reuse terms remain with their respective creators. See the
published [image credits](https://smallyunet.github.io/crypto-founder-wiki/en/image-credits/)
for source links, attribution, licenses, and modification notes. In particular,
the Chandler Guo panel photograph is licensed for non-commercial reuse only.

## Editorial status

Every published dossier is marked `reviewed` only after a claim-by-claim source audit. Evidence limitations remain visible where public records cannot establish private family assets, beneficial ownership, or token holdings. See the published methodology and editorial policy before contributing claims about living people or their relatives.
