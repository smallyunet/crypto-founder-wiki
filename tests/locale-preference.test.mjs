import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { createLocaleEntryScript, isSiteLocale, localePreferenceKey, localizedPathname } from '../src/utils/locale-preference.mjs';

const origin = 'https://smallyunet.github.io';

function visit(pathname, { saved = undefined, referrer = '' } = {}) {
	const storage = {};
	if (saved !== undefined) storage[localePreferenceKey] = saved;
	const location = {
		pathname,
		search: '',
		hash: '',
		origin,
		replace(url) { this.replaced = url; },
	};
	const context = vm.createContext({
		URL,
		location,
		document: { referrer },
		localStorage: {
			getItem: (key) => (Object.hasOwn(storage, key) ? storage[key] : null),
			setItem: (key, value) => { storage[key] = value; },
		},
	});
	vm.runInContext(createLocaleEntryScript('/crypto-founder-wiki/'), context);
	return { replaced: location.replaced ?? null, saved: storage[localePreferenceKey] ?? null };
}

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

test('site entry opens the saved locale, including an English address', () => {
	assert.equal(visit('/crypto-founder-wiki/').replaced, '/crypto-founder-wiki/en/');
	assert.equal(visit('/crypto-founder-wiki/', { saved: 'zh-cn' }).replaced, '/crypto-founder-wiki/zh-cn/');
	assert.equal(
		visit('/crypto-founder-wiki/en/', { saved: 'zh-cn' }).replaced,
		'/crypto-founder-wiki/zh-cn/',
	);
	assert.equal(
		visit('/crypto-founder-wiki/en/people/vitalik-buterin/', { saved: 'zh-cn' }).replaced,
		'/crypto-founder-wiki/zh-cn/people/vitalik-buterin/',
	);
	assert.equal(visit('/crypto-founder-wiki/', { saved: '../evil' }).replaced, '/crypto-founder-wiki/en/');
});

test('an in-site language switch is kept and remembered', () => {
	const switched = visit('/crypto-founder-wiki/en/', {
		saved: 'zh-cn',
		referrer: `${origin}/crypto-founder-wiki/zh-cn/`,
	});
	assert.equal(switched.replaced, null);
	assert.equal(switched.saved, 'en');

	const viewed = visit('/crypto-founder-wiki/zh-cn/people/vitalik-buterin/');
	assert.equal(viewed.replaced, null);
	assert.equal(viewed.saved, 'zh-cn');
});
