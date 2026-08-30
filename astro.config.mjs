// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const peopleDataDirectory = new URL('./src/data/people/', import.meta.url);
const peopleSidebarItems = readdirSync(peopleDataDirectory)
	.filter((filename) => filename.endsWith('.json'))
	.map((filename) => JSON.parse(readFileSync(new URL(filename, peopleDataDirectory), 'utf8')))
	.sort((a, b) => a.directoryOrder - b.directoryOrder || a.name.en.localeCompare(b.name.en))
	.map((person) => ({
		label: person.name.zhCn,
		translations: { en: person.name.en },
		slug: `people/${person.reportSlug}`,
	}));

// https://astro.build/config
export default defineConfig({
	site: 'https://smallyunet.github.io',
	base: '/crypto-founder-wiki',
	integrations: [
		sitemap(),
		starlight({
			title: 'Crypto Founder Wiki',
			description: 'Evidence-based dossiers on blockchain founders, family backgrounds, and paths to wealth.',
			favicon: '/favicon.svg',
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/smallyunet/crypto-founder-wiki',
				},
			],
			head: [
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'Crypto Founder Wiki' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0f766e' } },
			],
			sidebar: [
				{
					label: '人物档案',
					translations: { en: 'People' },
					items: peopleSidebarItems,
				},
				{
					label: '网络与收录',
					translations: { en: 'Networks & coverage' },
					items: [
						{ autogenerate: { directory: 'networks' } },
						{ autogenerate: { directory: 'rankings' } },
					],
				},
				{
					label: '关于',
					translations: { en: 'About' },
					items: [
						{ label: '研究方法', translations: { en: 'Methodology' }, slug: 'methodology' },
						{ label: '编辑规范', translations: { en: 'Editorial policy' }, slug: 'editorial-policy' },
						{ label: '图片来源与许可', translations: { en: 'Image credits' }, slug: 'image-credits' },
					],
				},
			],
		}),
	],
});
