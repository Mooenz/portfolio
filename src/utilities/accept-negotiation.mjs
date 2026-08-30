// Negociación de contenido para "Accept: text/markdown" (ver acceptmarkdown.com).
//
// Se escribe como .mjs sin tipos porque lo consume tanto el middleware de
// enrutamiento de Vercel (/middleware.ts, entorno edge) como los tests de
// Node, sin pasar por el compilador de Astro.
//
// Reglas (RFC 9110 sec. 12.5.1):
//  - Sólo se sirve Markdown si el cliente nombra explícitamente "text/markdown"
//    (o "text/x-markdown") en Accept. Un comodín general ("* / *") o "text/ *"
//    NO cuentan como preferencia de Markdown: así un navegador o un crawler
//    normal siguen recibiendo HTML.
//  - Se respeta el q-value: si el cliente puntúa "text/html" por encima de
//    "text/markdown", gana HTML. En caso de empate gana Markdown, porque el
//    cliente se molestó en pedirlo de forma explícita.

/** @typedef {{ type: string, subtype: string, q: number }} MediaRange */

/**
 * Parsea una cabecera Accept en rangos de medios ordenables.
 * @param {string | null | undefined} header
 * @returns {MediaRange[]}
 */
export function parseAccept(header) {
	if (!header || typeof header !== 'string') return [];

	return header
		.split(',')
		.map((part) => {
			const [rawType, ...params] = part.trim().split(';');
			const token = rawType.trim().toLowerCase();
			if (!token) return null;

			const slash = token.indexOf('/');
			const type = slash === -1 ? token : token.slice(0, slash);
			const subtype = slash === -1 ? '*' : token.slice(slash + 1);

			let q = 1;
			for (const param of params) {
				const [key, value] = param.split('=');
				if (key && key.trim().toLowerCase() === 'q') {
					const parsed = Number.parseFloat((value ?? '').trim());
					q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 1;
				}
			}

			return type ? { type, subtype, q } : null;
		})
		.filter((range) => range !== null);
}

/**
 * q-value efectivo para un tipo de medio concreto según los rangos declarados.
 * "matchWildcards" controla si "type/ *" y el comodín general cuentan como
 * coincidencia.
 * @param {MediaRange[]} ranges
 * @param {string} type
 * @param {string} subtype
 * @param {{ matchWildcards?: boolean }} [options]
 * @returns {number}
 */
export function qualityFor(ranges, type, subtype, options = {}) {
	const { matchWildcards = true } = options;
	let best = -1;

	for (const range of ranges) {
		const exact = range.type === type && range.subtype === subtype;
		const subWildcard = matchWildcards && range.type === type && range.subtype === '*';
		const fullWildcard = matchWildcards && range.type === '*' && range.subtype === '*';

		if (exact || subWildcard || fullWildcard) {
			if (range.q > best) best = range.q;
		}
	}

	return best === -1 ? 0 : best;
}

/**
 * Decide si debe servirse la variante Markdown para esta cabecera Accept.
 * @param {string | null | undefined} acceptHeader
 * @returns {boolean}
 */
export function prefersMarkdown(acceptHeader) {
	const ranges = parseAccept(acceptHeader);
	if (ranges.length === 0) return false;

	// Markdown sólo si se nombra de forma explícita (sin comodines).
	const markdownQ = Math.max(
		qualityFor(ranges, 'text', 'markdown', { matchWildcards: false }),
		qualityFor(ranges, 'text', 'x-markdown', { matchWildcards: false }),
	);
	if (markdownQ <= 0) return false;

	// HTML sí puede satisfacerse con comodines.
	const htmlQ = qualityFor(ranges, 'text', 'html', { matchWildcards: true });

	return markdownQ >= htmlQ;
}
