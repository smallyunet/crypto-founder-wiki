/**
 * Content collection order is unspecified. Prefer the newest data date, then
 * retrieval time; the stable ID breaks ties without mutating the collection.
 * @template {{ id: string, data: { kind: string, asOf: Date, retrievedAt?: Date } }} T
 * @param {T[]} snapshots
 * @param {string} kind
 * @returns {T | undefined}
 */
export function selectLatestSnapshot(snapshots, kind) {
	return snapshots.filter((entry) => entry.data.kind === kind).sort((a, b) =>
		b.data.asOf.getTime() - a.data.asOf.getTime()
		|| (b.data.retrievedAt?.getTime() ?? 0) - (a.data.retrievedAt?.getTime() ?? 0)
		|| a.id.localeCompare(b.id, 'en')
	)[0];
}
