import type { APIRoute } from 'astro';
import { buildLlmsContent } from '@/utilities/build-llms-content';

export const prerender = true;

export const GET: APIRoute = async () => {
	return new Response(await buildLlmsContent(), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
