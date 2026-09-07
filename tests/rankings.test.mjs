import test from 'node:test';
import assert from 'node:assert/strict';
import { selectLatestSnapshot } from '../src/utils/rankings.mjs';

const entry = (id, asOf, retrievedAt, kind = 'market-cap') => ({
	id, data: { kind, asOf: new Date(asOf), ...(retrievedAt ? { retrievedAt: new Date(retrievedAt) } : {}) },
});

test('newest data date wins regardless of input order, other kinds, or retrieval time', () => {
	const old = entry('old', '2026-08-30', '2026-09-02');
	const latest = entry('latest', '2026-08-31', '2026-08-31');
	const editorial = entry('editorial', '2026-09-03', undefined, 'editorial-seed');
	const entries = [old, editorial, latest];
	assert.equal(selectLatestSnapshot(entries, 'market-cap'), latest);
	assert.equal(selectLatestSnapshot([...entries].reverse(), 'market-cap'), latest);
	assert.deepEqual(entries, [old, editorial, latest]);
});

test('same-date revisions prefer retrieval time, then stable ID', () => {
	const first = entry('a', '2026-08-31');
	const second = entry('b', '2026-08-31', '2026-08-31T12:00:00Z');
	const third = entry('c', '2026-08-31', '2026-08-31T12:00:00Z');
	assert.equal(selectLatestSnapshot([third, first, second], 'market-cap'), second);
	assert.equal(selectLatestSnapshot([first], 'tvl'), undefined);
	assert.equal(selectLatestSnapshot([], 'market-cap'), undefined);
});
