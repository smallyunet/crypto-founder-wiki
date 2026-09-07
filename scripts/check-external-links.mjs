import { classifyStatus } from './lib/link-status.mjs';
import { appendFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const roots = ['src/content/docs/', 'src/data/'];
const urls = new Set();

for (const relativeRoot of roots) {
	const directory = new URL(relativeRoot, root);
	for (const name of await readdir(directory, { recursive: true })) {
		if (!/\.(?:md|mdx|json)$/.test(name)) continue;
		const content = await readFile(new URL(name, directory), 'utf8');
		const patterns = name.endsWith('.json')
			? [/"(https?:\/\/[^"\s]+)"/g]
			: [/\]\((https?:\/\/(?:[^()\s]|\([^()\s]*\))+?)\)/g, /(?:href|src)="(https?:\/\/[^"\s]+)"/g, /<(https?:\/\/[^>\s]+)>/g];
		for (const pattern of patterns) {
			for (const match of content.matchAll(pattern)) urls.add(match[1]);
		}
	}
}

const queue = [...urls].sort();
const results = [];
let cursor = 0;

async function check(url) {
	try {
		const response = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			signal: AbortSignal.timeout(15_000),
			headers: { 'user-agent': 'crypto-founder-wiki-link-check/1.0' },
		});
		const outcome = classifyStatus(response.status);
		results.push({ url, finalUrl: response.url, status: response.status, outcome });
		// Cleanup failure must not add a second result for the same URL.
		await response.body?.cancel().catch(() => {});
	} catch (error) {
		results.push({ url, outcome: 'warning', error: error.name ?? 'Error' });
	}
}

async function worker() {
	while (cursor < queue.length) {
		const url = queue[cursor++];
		await check(url);
	}
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

results.sort((a, b) => a.url.localeCompare(b.url));
const hardFailures = results.filter((result) => result.outcome === 'dead');
const warnings = results.filter((result) => result.outcome === 'warning');
const summary = `Checked ${queue.length} unique external links: ${results.length - hardFailures.length - warnings.length} reachable, ${hardFailures.length} HTTP 404/410, ${warnings.length} access or network warnings.`;
await mkdir(new URL('reports/', root), { recursive: true });
await writeFile(new URL('reports/external-links.json', root), JSON.stringify({
	checkedAt: new Date().toISOString(), summary, results,
}, null, 2) + '\n');
for (const result of [...hardFailures, ...warnings]) {
	console.warn(`${result.outcome}: ${result.status ?? result.error} ${result.url}`);
}
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
	await appendFile(process.env.GITHUB_STEP_SUMMARY, `## External link check\n\n${summary}\n\nDownload the external-links artifact for individual URLs. Warnings are unverified, not successful checks.\n`);
}
if (hardFailures.length || (process.argv.includes('--strict') && warnings.length)) process.exitCode = 1;
