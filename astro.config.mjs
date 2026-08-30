// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://smallyunet.github.io',
	base: '/crypto-founder-wiki',
	integrations: [
		sitemap(),
		starlight({
			title: 'Crypto Founder Wiki',
			description: '区块链人物、家世背景与财富形成路径的证据型研究档案。',
			favicon: '/favicon.svg',
			defaultLocale: 'zh-cn',
			locales: {
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
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
					items: [{ autogenerate: { directory: 'people' } }],
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
					],
				},
			],
		}),
	],
});
