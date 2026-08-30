import type { APIRoute } from 'astro';
import { buildHomepageMarkdown } from '@/utilities/build-markdown-content';

export const prerender = true;

/**
 * Representación Markdown de la página principal.
 *
 * Se sirve de dos formas:
 *  - Directamente en `/index.md` (enlazada con `<link rel="alternate" type="text/markdown">`).
 *  - Vía negociación de contenido: `vercel.json` reescribe `/` a `/index.md`
 *    cuando la petición incluye `Accept: text/markdown` (ver acceptmarkdown.com).
 *
 * La cabecera `Vary: Accept` evita que un CDN sirva la variante HTML cacheada a
 * un agente que pide Markdown (o viceversa).
 */
export const GET: APIRoute = () => {
	return new Response(buildHomepageMarkdown(), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			Vary: 'Accept, Accept-Encoding',
		},
	});
};
