import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const base = '/crypto-founder-wiki';
const errors = [];

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await walk(path));
		else if (entry.name.endsWith('.html')) files.push(path);
	}
	return files;
}

async function exists(url) {
	try { await access(url); return true; } catch { return false; }
}

for (const required of ['index.html', 'zh-cn/index.html', 'en/index.html']) {
	if (!await exists(new URL(required, dist))) errors.push(`missing required route: ${required}`);
}

for (const htmlPath of await walk(dist.pathname)) {
	const html = await readFile(htmlPath, 'utf8');
	if (html.includes(`${base}${base}`)) errors.push(`${htmlPath}: duplicated base path`);
	for (const match of html.matchAll(/href="([^"#?]+)(?:[?#][^"]*)?"/g)) {
		const href = match[1];
		if (!href.startsWith(`${base}/`)) continue;
		const relative = href.slice(base.length + 1);
		const target = extname(relative)
			? new URL(relative, dist)
			: new URL(`${relative.replace(/\/$/, '')}/index.html`, dist);
		if (!await exists(target)) errors.push(`${htmlPath}: broken internal link ${href}`);
	}
}

if (errors.length > 0) {
	console.error([...new Set(errors)].map((error) => `- ${error}`).join('\n'));
	process.exit(1);
}

console.log('Validated generated routes and base-path links.');
