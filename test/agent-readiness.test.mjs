// @ts-check
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { prefersMarkdown, parseAccept } from '../src/utilities/accept-negotiation.mjs';
import { buildNotFoundMarkdown, NOT_FOUND_MARKDOWN, RECOVERY_LINKS } from '../src/utilities/markdown-404.mjs';

/** @param {string} p */
const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
/** @param {string} p */
const readRoot = (p) => readFileSync(root(p), 'utf8');

/**
 * Nodo del grafo JSON-LD. Solo se declaran los campos que verifican los tests.
 * @typedef {{
 *   '@type'?: string,
 *   '@id'?: string,
 *   name?: string,
 *   legalName?: string,
 *   alternateName?: string | string[],
 *   sameAs?: string[],
 *   contactPoint?: { '@type'?: string, email?: string, telephone?: string, contactType?: string },
 *   address?: { '@type'?: string, addressCountry?: string, addressLocality?: string },
 *   publisher?: { '@id'?: string },
 * }} JsonLdNode
 */

/**
 * Subconjunto de vercel.json que se verifica.
 * @typedef {object} VercelConfig
 * @property {{ source: string, headers: { key: string, value: string }[] }[]} [headers]
 * @property {{ source: string, destination: string, permanent?: boolean }[]} [redirects]
 * @property {{ source: string, destination: string }[]} [rewrites]
 */

/**
 * Normaliza un valor JSON-LD que puede ser escalar o lista.
 * @param {string | string[] | undefined} value
 * @returns {string[]}
 */
const asArray = (value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

/**
 * Extrae el grafo JSON-LD de una página. Si el bloque no usa `@graph`, el
 * propio objeto raíz se trata como único nodo.
 * @param {string} html
 * @returns {JsonLdNode[]}
 */
const jsonLdGraph = (html) => {
	const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
	assert.ok(raw, 'La página debe emitir datos estructurados JSON-LD');
	/** @type {JsonLdNode & { '@graph'?: JsonLdNode[] }} */
	const data = JSON.parse(raw[1]);
	return data['@graph'] ?? [data];
};

/**
 * Verificación de la preparación del sitio para agentes de IA.
 *
 * Los tests corren sobre la salida de `astro build` (carpeta `dist/`). Ejecuta
 * `pnpm test`, que construye el sitio antes de lanzar el runner.
 */

// Con el adapter de Vercel, los archivos estáticos se generan en `dist/client/`.
const distRoot = existsSync(root('dist/client')) ? 'dist/client' : 'dist';
/** @param {string} p */
const dist = (p) => fileURLToPath(new URL(`../${distRoot}/${p}`, import.meta.url));
/** @param {string} p */
const read = (p) => readFileSync(dist(p), 'utf8');
/** @param {string} html */
const visibleText = (html) =>
	html
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/<script[\s\S]*?<\/script>/g, ' ')
		.replace(/<style[\s\S]*?<\/style>/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

test('dist/ existe (se ejecutó astro build)', () => {
	assert.ok(existsSync(dist('index.html')), 'Falta dist/index.html; ejecuta "pnpm test" (incluye el build).');
});

test('404: cuerpo con enlaces de recuperación para agentes', () => {
	const html = read('404.html');
	assert.match(html, /404/);
	for (const href of ['/llms.txt', '/index.md', '/sitemap-index.xml', '/about', '/contact', '/privacy', '/cv.yaml']) {
		assert.ok(html.includes(`href="${href}"`), `El 404 debe enlazar a ${href}`);
	}
	assert.ok(visibleText(html).length >= 300, 'El 404 debe incluir texto de orientación');
});

// `/about` se indexa: es el ancla de confianza que Google busca por su cuenta
// para resolver la entidad detrás de la marca. `/contact` y `/privacy` quedan
// fuera del índice, pero conservan `follow` para no cortar el rastreo.
const TRUST_ANCHORS = {
	about: 'index,follow',
	contact: 'noindex,follow',
	privacy: 'noindex,follow',
};

for (const [page, robots] of Object.entries(TRUST_ANCHORS)) {
	test(`trust anchor: /${page} existe con >=500 caracteres y un H1`, () => {
		const html = read(`${page}/index.html`);
		assert.match(html, /<h1[\s>]/, `/${page} debe tener un <h1>`);
		const len = visibleText(html).length;
		assert.ok(len >= 500, `/${page} tiene ${len} caracteres visibles, se esperan >= 500`);
	});

	test(`trust anchor: /${page} tiene canonical propio y robots "${robots}"`, () => {
		const html = read(`${page}/index.html`);
		assert.ok(
			html.includes(`<link rel="canonical" href="https://www.mooenz.me/${page}">`),
			`/${page} debe declararse canónica de sí misma, no de la home`,
		);
		assert.ok(
			html.includes(`<meta name="robots" content="${robots}">`),
			`/${page} debe declarar robots "${robots}"`,
		);
	});
}

/** @param {string} html */
const graphTypes = (html) => jsonLdGraph(html).map((node) => node['@type']);

test('JSON-LD: las entidades se repiten, los nodos de la portada no', () => {
	const home = graphTypes(read('index.html'));
	for (const type of ['Person', 'Organization', 'WebSite', 'ProfilePage', 'BreadcrumbList', 'ItemList']) {
		assert.ok(home.includes(type), `La portada debe declarar ${type}`);
	}

	// `/about` reafirma las mismas entidades (Google las fusiona por `@id`), pero
	// no puede declarar el breadcrumb ni la lista de proyectos de la portada.
	const about = graphTypes(read('about/index.html'));
	for (const type of ['Person', 'Organization', 'WebSite', 'ProfilePage']) {
		assert.ok(about.includes(type), `/about debe reafirmar la entidad ${type}`);
	}
	for (const type of ['BreadcrumbList', 'ItemList']) {
		assert.ok(!about.includes(type), `/about no debe declarar ${type}: describe la portada`);
	}
});

test('llms.txt: incluye sección "cuándo usar" con casos de uso y contacto', () => {
	const txt = read('llms.txt');
	assert.match(txt, /##\s+Cuándo contactar/i, 'Falta la sección "Cuándo contactar (when to use)"');
	assert.match(txt, /Cómo contactar:/i, 'Debe explicar cómo debe contactar un agente');
	assert.ok(txt.includes(NAP.email), 'Debe exponer un correo de contacto');
	assert.match(txt, /Astro, React, Next\.js y TypeScript/i, 'Debe nombrar casos de uso concretos');
	assert.ok(txt.includes('https://www.mooenz.me/about'), 'Debe enlazar las páginas de referencia');
});

test('index.md: representación Markdown de la portada', () => {
	const md = read('index.md');
	assert.ok(md.startsWith('# '), 'index.md debe empezar por un encabezado H1');
	assert.ok(md.length > 800, 'index.md debe tener contenido sustancial');
	assert.match(md, /##\s+Proyectos/);
	assert.match(md, /##\s+Cuándo contactar/i);
	assert.match(md, /##\s+Experiencia laboral/);
});

test('home: contenido sin JavaScript con jerarquía de encabezados', () => {
	const html = read('index.html');
	const h1 = html.match(/<h1[\s>]/g) ?? [];
	const h2 = html.match(/<h2[\s>]/g) ?? [];
	const h3 = html.match(/<h3[\s>]/g) ?? [];
	assert.equal(h1.length, 1, 'Debe haber exactamente un H1');
	assert.ok(h2.length >= 3, 'Debe haber varios H2 (intro + experiencia + proyectos)');
	assert.ok(h3.length >= 3, 'Debe haber H3 anidados (estructura de 3 niveles, no plana)');
	assert.match(html, /<h2[^>]*class="sr-only"[^>]*>Sobre /, 'La intro debe tener su propio encabezado de sección');
	assert.ok(visibleText(html).length >= 500, 'Debe haber >= 500 caracteres de texto en el HTML plano');
	assert.match(html, /<link rel="alternate" type="text\/markdown" href="\/index\.md"/, 'Debe anunciar la variante Markdown');
});

test('home: JSON-LD con Organization completo (contactPoint + address)', () => {
	const html = read('index.html');
	const graph = jsonLdGraph(html);
	const org = graph.find((n) => n['@type'] === 'Organization');
	assert.ok(org, 'Falta el nodo Organization');
	assert.ok(org.contactPoint, 'Organization debe incluir contactPoint');
	assert.equal(org.contactPoint['@type'], 'ContactPoint');
	assert.ok(org.contactPoint.email || org.contactPoint.telephone, 'contactPoint necesita email o teléfono');
	assert.ok(org.contactPoint.contactType, 'contactPoint necesita contactType');
	assert.ok(org.address, 'Organization debe incluir address');
	assert.equal(org.address['@type'], 'PostalAddress');
	assert.ok(org.address.addressCountry, 'address necesita addressCountry');
});

test('home: perfiles sameAs consistentes para descubrimiento de marca', () => {
	const html = read('index.html');
	const graph = jsonLdGraph(html);
	const withSameAs = graph.filter(
		/** @returns {n is JsonLdNode & { sameAs: string[] }} */ (n) => Array.isArray(n.sameAs),
	);
	assert.ok(withSameAs.length >= 2, 'Person y Organization deben declarar sameAs');
	for (const node of withSameAs) {
		for (const url of node.sameAs) {
			assert.match(url, /^https:\/\//, `sameAs debe usar https: ${url}`);
		}
		assert.ok(
			node.sameAs.includes('https://github.com/Mooenz'),
			'sameAs debe usar la URL canónica de GitHub (github.com/Mooenz)',
		);
	}
	assert.ok(!html.includes('https://github.com/mooenz"'), 'No debe quedar la variante en minúsculas de GitHub');

	const website = graph.find((n) => n['@type'] === 'WebSite');
	const alt = asArray(website?.alternateName);
	assert.ok(alt.includes('Mooenz'), 'WebSite debe declarar "Mooenz" como alternateName');
});

test('home: la marca "Mooenz" aparece en title y contenido servido', () => {
	const html = read('index.html');
	assert.match(html, /<title>[^<]*Mooenz[^<]*<\/title>/, 'El <title> de la portada debe incluir la marca "Mooenz"');
	assert.match(html, /Sobre[^<]*Mooenz/, 'El contenido HTML de la portada debe nombrar la marca "Mooenz"');
});

// --- Descubribilidad de marca: NAP consistente y nombres de entidad ---------

const NAP = {
	brand: 'Mooenz',
	brandLong: 'Mooenz Portfolio',
	legalName: 'José Manuel Montaño Saenz',
	location: 'Ibagué, Tolima, Colombia',
	email: 'joss92821@hotmail.com',
	domain: 'www.mooenz.me',
};

// El footer es deliberadamente mínimo: marca + año, sin autor ni bloque <address>.
// El NAP completo (nombre legal, ubicación, correo, dominio) vive en el JSON-LD y
// en llms.txt/index.md, que es donde lo leen buscadores y agentes; repetirlo en
// cada pie de página no añadía señal y ensuciaba el diseño. Lo que sí se verifica
// aquí es que la marca y el año aparezcan igual en las cinco páginas.
/** @param {string} html */
const footerBlock = (html) => (html.match(/<footer[\s\S]*?<\/footer>/) ?? [null])[0];
const footerLine = `${NAP.brand} © ${new Date().getFullYear()}, todos los derechos reservados.`;

for (const page of ['index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html', '404.html']) {
	test(`marca: ${page} cierra con un footer que nombra a "${NAP.brand}"`, () => {
		const block = footerBlock(read(page));
		assert.ok(block, `${page} debe incluir un <footer>`);
		assert.ok(visibleText(block).includes(footerLine), `El footer de ${page} debe decir "${footerLine}" (marca consistente)`);
	});
}

test('marca: nombres de entidad JSON-LD coherentes con la búsqueda "Mooenz Portfolio"', () => {
	const html = read('index.html');
	const graph = jsonLdGraph(html);

	const org = graph.find((n) => n['@type'] === 'Organization');
	assert.ok(org, 'Falta el nodo Organization');
	assert.equal(org.name, NAP.brand, 'Organization.name debe ser la marca corta "Mooenz"');
	assert.ok(asArray(org.alternateName).includes(NAP.brandLong), 'Organization.alternateName debe incluir "Mooenz Portfolio"');
	assert.equal(org.legalName, NAP.legalName, 'Organization.legalName debe ser el nombre real');
	assert.equal(org.address?.addressLocality, 'Ibagué', 'Organization.address debe coincidir con el NAP visible');

	const website = graph.find((n) => n['@type'] === 'WebSite');
	assert.ok(website, 'Falta el nodo WebSite');
	assert.equal(website.name, NAP.brandLong, 'WebSite.name debe ser "Mooenz Portfolio" (frase exacta de búsqueda)');
	assert.ok(asArray(website.alternateName).includes(NAP.brand), 'WebSite.alternateName debe incluir "Mooenz"');
	assert.equal(website.publisher?.['@id'], 'https://www.mooenz.me/#organization', 'WebSite.publisher debe apuntar a la Organization');

	const person = graph.find((n) => n['@type'] === 'Person');
	assert.ok(person, 'Falta el nodo Person');
	assert.ok(asArray(person.alternateName).includes(NAP.brand), 'Person.alternateName debe incluir "Mooenz"');

	assert.match(html, /<meta property="og:site_name" content="Mooenz Portfolio">/, 'og:site_name debe ser "Mooenz Portfolio"');
});

for (const file of ['llms.txt', 'index.md']) {
	test(`marca: ${file} declara la marca y el dominio canónico`, () => {
		const txt = read(file);
		assert.ok(txt.includes(NAP.brandLong), `${file} debe nombrar "Mooenz Portfolio"`);
		assert.match(txt, /\*\*Marca:\*\*\s*Mooenz/, `${file} debe declarar explícitamente la marca`);
		assert.ok(txt.includes(NAP.location), `${file} debe indicar la ubicación (${NAP.location})`);
		assert.ok(txt.includes(NAP.domain), `${file} debe citar el dominio canónico ${NAP.domain}`);
	});
}

test('home: las secciones sin JS están asociadas a su encabezado (estructura no plana)', () => {
	const html = read('index.html');
	for (const id of ['about-heading', 'experience-heading', 'projects-heading']) {
		assert.ok(
			html.includes(`aria-labelledby="${id}"`) && new RegExp(`<h[1-6][^>]*id="${id}"`).test(html),
			`Debe existir una <section aria-labelledby="${id}"> con su encabezado correspondiente`,
		);
	}
});

test('sitemap: anuncia las páginas indexables con su URL canónica', () => {
	const xml = read('sitemap-0.xml');
	assert.ok(xml.includes('<loc>https://www.mooenz.me/</loc>'), 'El sitemap debe incluir la home');

	for (const [page, robots] of Object.entries(TRUST_ANCHORS)) {
		const announced = xml.includes(`<loc>https://www.mooenz.me/${page}</loc>`);
		if (robots.startsWith('noindex')) {
			assert.ok(!xml.includes(`https://www.mooenz.me/${page}`), `El sitemap no debe anunciar /${page}: es noindex`);
		} else {
			assert.ok(announced, `El sitemap debe anunciar /${page}: es indexable`);
		}
	}

	// La URL del sitemap debe coincidir con el canonical, que va sin barra final.
	assert.ok(
		!/<loc>https:\/\/www\.mooenz\.me\/[^<]+\/<\/loc>/.test(xml),
		'Ninguna URL del sitemap (salvo la home) debe llevar barra final: rompería el canonical',
	);
});

test('vercel.json: cabeceras, indexación y redirecciones de rutas heredadas', () => {
	/** @type {VercelConfig} */
	const cfg = JSON.parse(readRoot('vercel.json'));
	const headers = cfg.headers ?? [];

	/** @param {string} source */
	const hasVaryAccept = (source) => {
		const entry = headers.find((h) => h.source === source);
		assert.ok(entry, `Falta la entrada de headers para ${source}`);
		const vary = entry.headers.find((h) => h.key.toLowerCase() === 'vary');
		assert.ok(vary && /\bAccept\b/i.test(vary.value), `${source} debe enviar "Vary: Accept"`);
	};
	hasVaryAccept('/');
	hasVaryAccept('/index.md');

	const mdEntry = headers.find((h) => h.source === '/index.md');
	assert.ok(mdEntry, 'Falta la entrada de headers para /index.md');
	const ct = mdEntry.headers.find((h) => h.key.toLowerCase() === 'content-type');
	assert.ok(ct && /text\/markdown/.test(ct.value), '/index.md debe servirse como text/markdown');

	// Los archivos legibles por máquina no deben competir en el índice de Google:
	// `/index.md` es la misma portada que `/`, `/llms.txt` la duplica en resumen
	// y `/cv.yaml` son datos en crudo. La directiva va acotada a `googlebot:` a
	// propósito: un `noindex` sin ámbito lo leería cualquier rastreador que
	// respete la cabecera, incluidos los de los motores de IA, que son justo el
	// público de estos archivos.
	for (const source of ['/index.md', '/llms.txt', '/cv.yaml']) {
		const entry = headers.find((h) => h.source === source);
		assert.ok(entry, `Falta la entrada de headers para ${source}`);
		const robots = entry.headers.find((h) => h.key.toLowerCase() === 'x-robots-tag');
		assert.ok(robots, `${source} debe enviar X-Robots-Tag`);
		assert.match(
			robots.value,
			/^googlebot:\s*noindex/i,
			`${source} debe acotar el noindex a Googlebot, no aplicarlo a todo rastreador`,
		);
	}

	// Rutas que existieron en builds anteriores: deben redirigir con 301 en vez
	// de acumular 404 en el informe de cobertura de Search Console.
	for (const [source, destination] of [
		['/site.webmanifest', '/images/site.webmanifest'],
		['/images/favicon.ico', '/favicon.ico'],
	]) {
		const redirect = (cfg.redirects ?? []).find((r) => r.source === source);
		assert.ok(redirect, `Falta la redirección para ${source}`);
		assert.equal(redirect.destination, destination, `${source} debe apuntar a ${destination}`);
		assert.equal(redirect.permanent, true, `${source} debe redirigir con 301`);
	}

	// La negociación en `/` la hace el middleware edge, no un rewrite estático
	// (los rewrites de vercel.json no se evalúan cuando `/` resuelve a index.html).
	assert.ok(
		!(cfg.rewrites ?? []).some((r) => r.source === '/'),
		'No debe quedar un rewrite estático inerte para "/"',
	);
});

test('middleware.ts: negociación de Markdown en la misma URL para "/"', () => {
	assert.ok(existsSync(root('middleware.ts')), 'Debe existir middleware.ts en la raíz del proyecto');
	const src = readRoot('middleware.ts');
	assert.match(src, /from '@vercel\/functions'/, 'Debe usar los helpers de @vercel/functions');
	assert.match(src, /rewrite\(new URL\('\/index\.md'/, 'Debe reescribir "/" a /index.md');
	assert.match(src, /prefersMarkdown/, 'Debe decidir según la cabecera Accept');
	assert.match(src, /status:\s*404/, 'Debe responder 404 con cuerpo Markdown en rutas inexistentes');
	assert.match(src, /export const config/, 'Debe declarar un matcher para acotar su alcance');

	/** @type {{ dependencies?: Record<string, string>, devDependencies?: Record<string, string> }} */
	const pkg = JSON.parse(readRoot('package.json'));
	const deps = { ...pkg.dependencies, ...pkg.devDependencies };
	assert.ok(deps['@vercel/functions'], '@vercel/functions debe estar declarado como dependencia');
});

test('accept-negotiation: prefersMarkdown respeta la especificidad y los q-values', () => {
	// Agente que pide Markdown explícitamente.
	assert.equal(prefersMarkdown('text/markdown'), true);
	assert.equal(prefersMarkdown('text/markdown, text/html'), true);
	assert.equal(prefersMarkdown('text/html, text/markdown'), true);
	assert.equal(prefersMarkdown('text/x-markdown'), true);
	assert.equal(prefersMarkdown('text/markdown;q=0.9, text/html;q=0.8'), true);

	// Navegadores y crawlers normales: NO deben recibir Markdown.
	assert.equal(prefersMarkdown('*/*'), false);
	assert.equal(prefersMarkdown(''), false);
	assert.equal(prefersMarkdown(null), false);
	assert.equal(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'), false);
	assert.equal(prefersMarkdown('text/*'), false);

	// El cliente prefiere HTML de forma explícita.
	assert.equal(prefersMarkdown('text/markdown;q=0.5, text/html;q=1.0'), false);
	assert.equal(prefersMarkdown('text/html, text/markdown;q=0.1'), false);

	// El parser no revienta con entradas raras.
	assert.deepEqual(parseAccept('  '), []);
	assert.equal(parseAccept('text/markdown;q=abc')[0].q, 1);
});

test('markdown-404: cuerpo corto con enlaces de recuperación', () => {
	assert.ok(NOT_FOUND_MARKDOWN.startsWith('# '), 'Debe empezar por un encabezado H1 Markdown');
	assert.match(NOT_FOUND_MARKDOWN, /404/);
	assert.ok(RECOVERY_LINKS.length >= 6, 'Debe ofrecer varios destinos de recuperación');
	for (const path of ['/', '/index.md', '/llms.txt', '/sitemap-index.xml', '/about', '/contact', '/privacy']) {
		assert.ok(
			NOT_FOUND_MARKDOWN.includes(`(https://www.mooenz.me${path})`),
			`El 404 Markdown debe enlazar a ${path}`,
		);
	}
	// Corto: una pantalla, no un documento largo.
	assert.ok(NOT_FOUND_MARKDOWN.length < 1200, 'El cuerpo debe ser breve');

	const withPath = buildNotFoundMarkdown('/ruta/inexistente');
	assert.match(withPath, /`\/ruta\/inexistente`/, 'Debe citar la ruta solicitada cuando se conoce');
});
