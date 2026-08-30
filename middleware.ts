import { next, rewrite } from '@vercel/functions';
import { prefersMarkdown } from './src/utilities/accept-negotiation.mjs';
import { buildNotFoundMarkdown } from './src/utilities/markdown-404.mjs';

/**
 * Routing Middleware de Vercel (entorno edge).
 *
 * Resuelve dos cosas que la configuración estática de `vercel.json` no puede,
 * porque los `rewrites` sólo se evalúan cuando NINGÚN archivo del sistema de
 * ficheros coincide (y `/` siempre resuelve a `index.html`):
 *
 *  1. Negociación de contenido en la misma URL (acceptmarkdown.com): una
 *     petición a `/` con `Accept: text/markdown` recibe `/index.md` sin
 *     redirección y sin cambiar la URL.
 *  2. 404 recuperables para agentes: una petición a una ruta inexistente con
 *     `Accept: text/markdown` recibe un cuerpo Markdown (con estado 404 real)
 *     que enumera los destinos válidos del sitio.
 *
 * El middleware SÓLO se desvía de `next()` cuando el cliente pide Markdown de
 * forma explícita. El tráfico normal (navegadores y crawlers que aceptan
 * cualquier tipo) pasa intacto.
 */

export const config = {
	// Excluye assets estáticos y cualquier ruta con extensión: el middleware
	// sólo necesita ver `/`, las páginas HTML y rutas "limpias" inexistentes.
	matcher: ['/((?!_astro/|assets/|fonts/|images/|documents/|.*\\.).*)'],
};

/** Páginas HTML reales sin variante Markdown propia: se sirven tal cual. */
const KNOWN_PAGES = new Set(['/about', '/contact', '/privacy']);

export default function middleware(request: Request): Response {
	try {
		if (!prefersMarkdown(request.headers.get('accept'))) return next();

		const { pathname } = new URL(request.url);
		const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

		if (path === '/' || path === '') {
			return rewrite(new URL('/index.md', request.url));
		}

		if (KNOWN_PAGES.has(path)) return next();

		return new Response(buildNotFoundMarkdown(path), {
			status: 404,
			headers: {
				'content-type': 'text/markdown; charset=utf-8',
				vary: 'Accept, Accept-Encoding',
			},
		});
	} catch {
		// Ante cualquier fallo, no bloquear la petición.
		return next();
	}
}
