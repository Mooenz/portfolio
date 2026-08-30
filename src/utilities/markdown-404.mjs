/**
 * Cuerpo Markdown que se sirve en respuestas 404 cuando un agente pide
 * `Accept: text/markdown`. Es corto a propósito: da el estado real (404) y una
 * lista de destinos válidos para que el agente se recupere sin adivinar rutas.
 *
 * Se mantiene como `.mjs` sin tipos porque lo importa el middleware edge
 * (`/middleware.ts`) y los tests de Node.
 */

const SITE_URL = 'https://www.mooenz.me';

/** Rutas canónicas del sitio, en el orden en que conviene ofrecerlas a un agente. */
export const RECOVERY_LINKS = [
	{ path: '/', label: 'portada: presentación, experiencia y proyectos' },
	{ path: '/index.md', label: 'portada en Markdown (text/markdown)' },
	{ path: '/llms.txt', label: 'resumen del sitio para agentes de IA' },
	{ path: '/sitemap-index.xml', label: 'mapa del sitio' },
	{ path: '/about', label: 'sobre mí: trayectoria y forma de trabajo' },
	{ path: '/contact', label: 'contacto: cómo y cuándo escribir' },
	{ path: '/privacy', label: 'política de privacidad' },
	{ path: '/cv.yaml', label: 'CV en datos estructurados' },
];

/**
 * @param {string} [requestedPath] Ruta que provocó el 404, para citarla en el cuerpo.
 * @returns {string}
 */
export function buildNotFoundMarkdown(requestedPath) {
	const target = typeof requestedPath === 'string' && requestedPath ? `\`${requestedPath}\`` : 'La ruta solicitada';
	const list = RECOVERY_LINKS.map(({ path, label }) => `- [${path}](${SITE_URL}${path}) — ${label}`).join('\n');

	return `# 404 — Página no encontrada

${target} no existe en mooenz.me. Este es el portafolio de José Manuel Montaño Saenz (Mooenz), desarrollador frontend.

Este sitio es un portafolio de una sola página; estos son los destinos válidos.

## Dónde continuar

${list}
`;
}

/** Cuerpo por defecto (sin ruta concreta). */
export const NOT_FOUND_MARKDOWN = buildNotFoundMarkdown();
