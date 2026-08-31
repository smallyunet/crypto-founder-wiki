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
const research = await loadDirectory('src/data/research/');
const errors = [];

const sensitiveTerms = [
	{ label: 'Chinese sensitive-event term', pattern: /六(?:四|[·・]四)/u },
	{ label: 'English sensitive-event term', pattern: /\bJune\s+(?:Fourth|4(?:th)?)\b/iu },
	{ label: 'Tiananmen reference', pattern: /\bTiananmen\b/iu },
];

const docsDirectory = new URL('src/content/docs/', root);
const docFiles = (await readdir(docsDirectory, { recursive: true }))
	.filter((name) => /\.(?:md|mdx)$/.test(name));

const directoryOrders = new Map();

for (const name of docFiles) {
	const content = await readFile(new URL(name, docsDirectory), 'utf8');
	for (const { label, pattern } of sensitiveTerms) {
		if (pattern.test(content)) {
			errors.push(`${name}: ${label} must be partially masked before publication`);
		}
	}
}

for (const [personId, person] of people) {
	if (!Number.isInteger(person.directoryOrder) || person.directoryOrder <= 0) {
		errors.push(`${personId}: directoryOrder must be a positive integer`);
	} else if (directoryOrders.has(person.directoryOrder)) {
		errors.push(`${personId}: directoryOrder ${person.directoryOrder} is already used by ${directoryOrders.get(person.directoryOrder)}`);
	} else {
		directoryOrders.set(person.directoryOrder, personId);
	}
	for (const networkId of person.networkIds) {
		if (!networks.has(networkId)) errors.push(`${personId}: unknown network ${networkId}`);
	}
	for (const locale of ['zh-cn', 'en']) {
		const reportPath = new URL(`src/content/docs/${locale}/people/${person.reportSlug}.mdx`, root);
		try {
			await access(reportPath);
			const report = await readFile(reportPath, 'utf8');
			const status = report.match(/^researchStatus:\s*([^\s]+)\s*$/m)?.[1];
			if (status !== person.coverageStatus) {
				errors.push(`${personId}: ${locale} researchStatus ${status ?? 'missing'} does not match people record ${person.coverageStatus}`);
			}
			if (!report.includes(`<ResearchSummary personId="${personId}" locale="${locale}" />`)) {
				errors.push(`${personId}: ${locale} report is missing its standardized ResearchSummary`);
			}
			if (!/^sourceAccessedAt:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(report)) {
				errors.push(`${personId}: ${locale} report is missing sourceAccessedAt`);
			}
		} catch {
			errors.push(`${personId}: missing ${locale} report ${person.reportSlug}.mdx`);
		}
	}
	const researchRecord = research.get(personId);
	if (!researchRecord) {
		errors.push(`${personId}: missing standardized research record`);
	} else if (researchRecord.personId !== personId) {
		errors.push(`${personId}: research record personId is ${researchRecord.personId}`);
	}
}

for (const [researchId, record] of research) {
	if (!people.has(record.personId)) errors.push(`${researchId}: unknown research person ${record.personId}`);
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
	if (snapshot.kind !== 'editorial-seed') {
		if (!snapshot.retrievedAt) errors.push(`${snapshotId}: formal snapshot is missing retrievedAt`);
		if (!snapshot.sourceUrl) errors.push(`${snapshotId}: formal snapshot is missing sourceUrl`);
	}
	const positions = new Set();
	for (const entry of snapshot.entries) {
		if (positions.has(entry.position)) errors.push(`${snapshotId}: duplicate position ${entry.position}`);
		positions.add(entry.position);
		if (!networks.has(entry.networkId)) errors.push(`${snapshotId}: unknown network ${entry.networkId}`);
		if (snapshot.kind !== 'editorial-seed' && (!Number.isFinite(entry.value) || !entry.unit)) {
			errors.push(`${snapshotId}: position ${entry.position} is missing value or unit`);
		}
		for (const personId of entry.personIds) {
			if (!people.has(personId)) errors.push(`${snapshotId}: unknown person ${personId}`);
		}
	}
}

if (errors.length > 0) {
	console.error(errors.map((error) => `- ${error}`).join('\n'));
	process.exit(1);
}

console.log(`Validated ${people.size} people, ${networks.size} networks, ${research.size} research records, and ${rankings.size} ranking snapshot.`);
