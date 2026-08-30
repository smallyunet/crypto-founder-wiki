# Crypto Founder Wiki

An evidence-led, multilingual-ready archive of crypto founders and other consequential industry figures.

**Live site:** <https://smallyunet.github.io/crypto-founder-wiki/>

## What is included

- Long-form Markdown dossiers with visible evidence boundaries.
- Structured people, network, and dated-ranking collections validated at build time.
- Simplified Chinese and English editions with build-time coverage checks.
- Static search, responsive navigation, dark mode, sitemap, and GitHub Pages deployment.

The first three source dossiers cover Changpeng Zhao, Justin Sun, and Chandler Guo. Chandler Guo is explicitly classified as an industry figure rather than a network founder.

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
npm install
npm run dev
npm run verify
```

The production site is generated into `dist/`. Pushes to `main` are deployed through GitHub Actions.

## Image licensing

Portraits and network artwork are stored for publication with this wiki, but
their copyrights and reuse terms remain with their respective creators. See the
published [image credits](https://smallyunet.github.io/crypto-founder-wiki/en/image-credits/)
for source links, attribution, licenses, and modification notes. In particular,
the Chandler Guo panel photograph is licensed for non-commercial reuse only.

## Editorial status

The initial reports were imported from supplied research documents. An imported report is not represented as independently fact-checked by this repository. See the published methodology and editorial policy before contributing claims about living people or their relatives.
