export const localePreferenceKey = 'crypto-founder-wiki-locale';
export const siteLocales = ['en', 'zh-cn'];
export const defaultLocale = 'en';

export function isSiteLocale(value) {
	return siteLocales.includes(value);
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
