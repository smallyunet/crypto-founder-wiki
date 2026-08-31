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
		directoryOrder: z.number().int().positive(),
		summary: localeText,
		networkIds: z.array(z.string()),
		reportSlug: z.string(),
		imageKind: z.enum(['portrait', 'representative']).default('portrait'),
		imageAlt: localeText.optional(),
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
		retrievedAt: z.coerce.date().optional(),
		kind: z.enum(['editorial-seed', 'market-cap', 'tvl', 'activity']),
		provider: z.string(),
		sourceUrl: z.url().optional(),
		description: localeText,
		entries: z.array(z.object({
			position: z.number().int().positive(),
			networkId: z.string(),
			personIds: z.array(z.string()),
			coverageStatus: z.enum(['published', 'planned']),
			value: z.number().nonnegative().optional(),
			unit: z.enum(['usd']).optional(),
		})),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/data/research' }),
	schema: z.object({
		personId: z.string(),
		capitalPath: z.array(localeText).min(3),
		assetBoundaries: z.array(z.object({
			category: localeText,
			finding: localeText,
			status: z.enum(['confirmed', 'inferred', 'unknown']),
		})).min(3),
		keyClaims: z.array(z.object({
			claim: localeText,
			finding: localeText,
			evidenceGrade: z.enum(['A', 'B', 'C', 'D', 'Unknown']),
			sourceType: localeText,
			sourceUrl: z.url().optional(),
		})).min(3),
		openQuestions: z.array(localeText).min(2),
		revision: z.object({
			version: z.string(),
			lastReviewedAt: z.coerce.date(),
			summary: localeText,
		}),
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
				sourceAccessedAt: z.coerce.date().optional(),
			}),
		}),
	}),
	people,
	networks,
	rankings,
	research,
};
