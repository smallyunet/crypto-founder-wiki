import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const localeText = z.object({ zhCn: z.string(), en: z.string() });

const people = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/data/people' }),
	schema: z.object({
		name: localeText,
		aliases: z.array(z.string()).default([]),
		profileType: z.enum(['founder', 'industry-figure']),
		summary: localeText,
		networkIds: z.array(z.string()),
		reportSlug: z.string(),
		coverageStatus: z.enum(['reviewed', 'needs-review']),
		lastReviewedAt: z.coerce.date(),
	}),
});

const networks = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/data/networks' }),
	schema: z.object({
		name: localeText,
		summary: localeText,
		founderStatus: z.enum(['identified', 'pseudonymous', 'organization-led']),
		founderIds: z.array(z.string()).default([]),
		featuredPeopleIds: z.array(z.string()).default([]),
	}),
});

const rankings = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/data/rankings' }),
	schema: z.object({
		asOf: z.coerce.date(),
		kind: z.enum(['editorial-seed', 'market-cap', 'tvl', 'activity']),
		provider: z.string(),
		description: localeText,
		entries: z.array(z.object({
			position: z.number().int().positive(),
			networkId: z.string(),
			personIds: z.array(z.string()),
			coverageStatus: z.enum(['published', 'planned']),
		})),
	}),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				pageType: z.enum(['home', 'person', 'network', 'ranking', 'methodology', 'policy']).optional(),
				entityId: z.string().optional(),
				profileType: z.enum(['founder', 'industry-figure']).optional(),
				networkIds: z.array(z.string()).optional(),
				researchStatus: z.enum(['reviewed', 'needs-review']).optional(),
				investigatedAt: z.coerce.date().optional(),
				lastReviewedAt: z.coerce.date().optional(),
			}),
		}),
	}),
	people,
	networks,
	rankings,
};
