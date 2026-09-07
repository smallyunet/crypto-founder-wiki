import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyStatus } from '../scripts/lib/link-status.mjs';

test('only successful HTTP responses count as reachable', () => {
	for (const status of [200, 204, 206]) assert.equal(classifyStatus(status), 'ok');
	for (const status of [404, 410]) assert.equal(classifyStatus(status), 'dead');
	for (const status of [301, 401, 403, 405, 418, 429, 500, 503]) {
		assert.equal(classifyStatus(status), 'warning');
	}
});
