import { readFile, readdir } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const roots = ['src/content/docs/', 'src/data/research/', 'src/data/rankings/'];
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
const hardFailures = [];
const warnings = [];
let cursor = 0;

async function check(url) {
	try {
		const response = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			signal: AbortSignal.timeout(15_000),
			headers: { 'user-agent': 'crypto-founder-wiki-link-check/1.0' },
		});
		if (response.status === 404 || response.status === 410) hardFailures.push(`${response.status} ${url}`);
		else if (response.status >= 400 && ![401, 403, 405, 418, 429].includes(response.status)) warnings.push(`${response.status} ${url}`);
	} catch (error) {
		warnings.push(`${error.name ?? 'Error'} ${url}`);
	}
}

async function worker() {
	while (cursor < queue.length) {
		const url = queue[cursor++];
		await check(url);
	}
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (hardFailures.length) {
	console.error(hardFailures.map((failure) => `dead link: ${failure}`).join('\n'));
	process.exit(1);
}
console.log(`Checked ${queue.length} unique external links; ${warnings.length} transient or access-controlled result(s), no confirmed 404/410.`);
