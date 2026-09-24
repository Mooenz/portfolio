import type { APIRoute } from 'astro';
import { buildHomepageMarkdown } from '@/utilities/build-markdown-content';

export const prerender = true;

export const GET: APIRoute = async () => {
	return new Response(await buildHomepageMarkdown(), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			Vary: 'Accept, Accept-Encoding',
		},
	});
};
