export const localePreferenceKey = 'crypto-founder-wiki-locale';
export const siteLocales = ['en', 'zh-cn'];
export const defaultLocale = 'en';

export function isSiteLocale(value) {
	return siteLocales.includes(value);
}

export function createLocaleEntryScript(baseUrl) {
	const base = String(baseUrl || '').replace(/\/$/, '');
	return `(function () {
	var key = ${JSON.stringify(localePreferenceKey)};
	var locales = ${JSON.stringify([...siteLocales])};
	var fallback = ${JSON.stringify(defaultLocale)};
	var base = ${JSON.stringify(base)};
	function read() {
		try { return localStorage.getItem(key); } catch (error) { return null; }
	}
	function write(locale) {
		try { localStorage.setItem(key, locale); } catch (error) {}
	}
	var path = location.pathname;
	var rest = path.indexOf(base) === 0 ? path.slice(base.length) : path;
	if (!rest || rest.charAt(0) !== '/') rest = '/' + (rest || '');
	var segments = rest.split('/');
	var current = locales.indexOf(segments[1]) === -1 ? '' : segments[1];
	var saved = read();
	if (locales.indexOf(saved) === -1) saved = '';
	if (!current) {
		if (segments.filter(Boolean).length === 0) {
			location.replace(base + '/' + (saved || fallback) + '/' + location.search + location.hash);
		}
		return;
	}
	var fresh = !document.referrer;
	if (document.referrer) {
		try {
			var url = new URL(document.referrer);
			var refPath = url.pathname;
			if (refPath.charAt(refPath.length - 1) === '/') refPath = refPath.slice(0, -1);
			fresh = url.origin !== location.origin || refPath === base || refPath === '';
		} catch (error) {
			fresh = true;
		}
	}
	if (saved && saved !== current && fresh) {
		segments[1] = saved;
		var next = base + segments.join('/');
		if (next.charAt(next.length - 1) !== '/') next += '/';
		location.replace(next + location.search + location.hash);
		return;
	}
	write(current);
})();`;
}

export function localizedPathname(pathname, baseUrl, locale, localeCodes = siteLocales) {
	const base = baseUrl.replace(/\/$/, '');
	const rest = base && (pathname === base || pathname.startsWith(`${base}/`))
		? pathname.slice(base.length)
		: pathname;
	const segments = rest.split('/');
	const leaf = segments.filter(Boolean).at(-1);
	if (leaf === '404' || leaf === '404.html') return `${base}/${locale}/`;
	if (segments[1] && localeCodes.includes(segments[1])) segments[1] = locale;
	else segments.splice(1, 0, locale);
	return `${base}${segments.join('/')}`;
}
