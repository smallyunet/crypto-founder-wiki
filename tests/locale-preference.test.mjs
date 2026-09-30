import assert from 'node:assert/strict';
import test from 'node:test';
import { isSiteLocale, localizedPathname } from '../src/utils/locale-preference.mjs';

const base = '/crypto-founder-wiki/';

test('localized pathname swaps the locale and keeps the rest of the path', () => {
	assert.equal(
		localizedPathname('/crypto-founder-wiki/en/people/vitalik-buterin/', base, 'zh-cn'),
		'/crypto-founder-wiki/zh-cn/people/vitalik-buterin/',
	);
	assert.equal(
		localizedPathname('/crypto-founder-wiki/zh-cn/', base, 'en'),
		'/crypto-founder-wiki/en/',
	);
	assert.equal(
		localizedPathname('/crypto-founder-wiki/404/', base, 'zh-cn'),
		'/crypto-founder-wiki/zh-cn/',
	);
});

test('locale check only accepts site locales', () => {
	assert.equal(isSiteLocale('en'), true);
	assert.equal(isSiteLocale('zh-cn'), true);
	assert.equal(isSiteLocale('fr'), false);
	assert.equal(isSiteLocale(null), false);
});
