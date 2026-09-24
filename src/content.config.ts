import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECH_BADGE_KEYS } from '@/constants/tech-badges';

/**
 * Capa de lectura del contenido editable desde Keystatic.
 *
 * Keystatic escribe los YAML de `src/content/`; Astro los carga y los valida
 * con estos esquemas en cada build. Deben reflejar `keystatic.config.ts`: si un
 * archivo editado no cumple el esquema, el build falla en lugar de publicar un
 * dato roto.
 *
 * Los singletons (`personal`, `experience`) son colecciones de una sola entrada
 * (`index.yaml`); se leen con los helpers de `@/utilities/content`.
 */

const personal = defineCollection({
	loader: glob({ pattern: 'index.yaml', base: './src/content/personal' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			role: z.string(),
			headline: z.string(),
			expertise: z.string(),
			avatar: image(),
			email: z.email(),
			phone: z.string(),
			github: z.url(),
			linkedIn: z.url(),
			languages: z.array(z.object({ name: z.string(), level: z.string() })),
			education: z.object({
				degree: z.string(),
				institution: z.string(),
				location: z.string(),
				period: z.string(),
				graduated: z.coerce.string(),
			}),
		}),
});

const experience = defineCollection({
	loader: glob({ pattern: 'index.yaml', base: './src/content/experience' }),
	schema: z.object({
		items: z.array(
			z.object({
				position: z.string(),
				company: z.string(),
				period: z.string(),
				location: z.string(),
				description: z.string(),
				stack: z.array(z.string()).default([]),
			}),
		),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			published: z.boolean().default(true),
			order: z.number().int(),
			description: z.string(),
			image: image(),
			badges: z.array(z.enum(TECH_BADGE_KEYS)).default([]),
			stack: z.array(z.string()).default([]),
			demo: z.url(),
			repository: z.url().optional(),
		}),
});

export const collections = { personal, experience, projects };
