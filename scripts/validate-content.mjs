import { access, readFile, readdir } from 'node:fs/promises';

const root = new URL('..', import.meta.url);

async function loadDirectory(relativePath) {
	const directory = new URL(relativePath, root);
	const files = (await readdir(directory)).filter((name) => name.endsWith('.json'));
	return new Map(await Promise.all(files.map(async (name) => {
		const id = name.replace(/\.json$/, '');
		const data = JSON.parse(await readFile(new URL(name, directory), 'utf8'));
		return [id, data];
	})));
}

const people = await loadDirectory('src/data/people/');
const networks = await loadDirectory('src/data/networks/');
const rankings = await loadDirectory('src/data/rankings/');
const errors = [];

const sensitiveTerms = [
	{ label: 'Chinese sensitive-event term', pattern: /六(?:四|[·・]四)/u },
	{ label: 'English sensitive-event term', pattern: /\bJune\s+(?:Fourth|4(?:th)?)\b/iu },
	{ label: 'Tiananmen reference', pattern: /\bTiananmen\b/iu },
];

const docsDirectory = new URL('src/content/docs/', root);
const docFiles = (await readdir(docsDirectory, { recursive: true }))
	.filter((name) => /\.(?:md|mdx)$/.test(name));

for (const name of docFiles) {
	const content = await readFile(new URL(name, docsDirectory), 'utf8');
	for (const { label, pattern } of sensitiveTerms) {
		if (pattern.test(content)) {
			errors.push(`${name}: ${label} must be partially masked before publication`);
		}
	}
}

for (const [personId, person] of people) {
	for (const networkId of person.networkIds) {
		if (!networks.has(networkId)) errors.push(`${personId}: unknown network ${networkId}`);
	}
	for (const locale of ['zh-cn', 'en']) {
		const reportPath = new URL(`src/content/docs/${locale}/people/${person.reportSlug}.md`, root);
		try { await access(reportPath); } catch { errors.push(`${personId}: missing ${locale} report ${person.reportSlug}.md`); }
	}
}

for (const [networkId, network] of networks) {
	for (const locale of ['zh-cn', 'en']) {
		const networkPath = new URL(`src/content/docs/${locale}/networks/${networkId}.md`, root);
		try { await access(networkPath); } catch { errors.push(`${networkId}: missing ${locale} network page`); }
	}
	for (const personId of [...network.founderIds, ...network.featuredPeopleIds]) {
		if (!people.has(personId)) errors.push(`${networkId}: unknown person ${personId}`);
	}
}

for (const [snapshotId, snapshot] of rankings) {
	const positions = new Set();
	for (const entry of snapshot.entries) {
		if (positions.has(entry.position)) errors.push(`${snapshotId}: duplicate position ${entry.position}`);
		positions.add(entry.position);
		if (!networks.has(entry.networkId)) errors.push(`${snapshotId}: unknown network ${entry.networkId}`);
		for (const personId of entry.personIds) {
			if (!people.has(personId)) errors.push(`${snapshotId}: unknown person ${personId}`);
		}
	}
}

if (errors.length > 0) {
	console.error(errors.map((error) => `- ${error}`).join('\n'));
	process.exit(1);
}

console.log(`Validated ${people.size} people, ${networks.size} networks, and ${rankings.size} ranking snapshot.`);
