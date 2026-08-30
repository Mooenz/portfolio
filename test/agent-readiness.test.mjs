import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Verificación de la preparación del sitio para agentes de IA.
 *
 * Los tests corren sobre la salida de `astro build` (carpeta `dist/`). Ejecuta
 * `pnpm test`, que construye el sitio antes de lanzar el runner.
 */

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));
const read = (p) => readFileSync(dist(p), 'utf8');
const visibleText = (html) =>
	html
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

for (const page of ['about', 'contact', 'privacy']) {
	test(`trust anchor: /${page} existe con >=500 caracteres y un H1`, () => {
		const html = read(`${page}/index.html`);
		assert.match(html, /<h1[\s>]/, `/${page} debe tener un <h1>`);
		const len = visibleText(html).length;
		assert.ok(len >= 500, `/${page} tiene ${len} caracteres visibles, se esperan >= 500`);
	});

	test(`trust anchor: /${page} tiene canonical propio e is index,follow`, () => {
		const html = read(`${page}/index.html`);
		assert.ok(
			html.includes(`<link rel="canonical" href="https://www.mooenz.me/${page}">`),
			`/${page} debe declararse canónica de sí misma, no de la home`,
		);
		assert.match(html, /<meta name="robots" content="index,follow">/, `/${page} debe ser indexable`);
	});
}

test('llms.txt: incluye sección "cuándo usar" con casos de uso y contacto', () => {
	const txt = read('llms.txt');
	assert.match(txt, /##\s+Cuándo contactar/i, 'Falta la sección "Cuándo contactar (when to use)"');
	assert.match(txt, /Cómo contactar:/i, 'Debe explicar cómo debe contactar un agente');
	assert.ok(txt.includes('joss92821@hotmail.com'), 'Debe exponer un correo de contacto');
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
	assert.equal(h1.length, 1, 'Debe haber exactamente un H1');
	assert.ok(h2.length >= 2, 'Debe haber varios H2 (estructura no plana)');
	assert.ok(visibleText(html).length >= 500, 'Debe haber >= 500 caracteres de texto en el HTML plano');
	assert.match(html, /<link rel="alternate" type="text\/markdown" href="\/index\.md"/, 'Debe anunciar la variante Markdown');
});

test('home: JSON-LD con Organization completo (contactPoint + address)', () => {
	const html = read('index.html');
	const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
	assert.ok(m, 'Falta el bloque JSON-LD');
	const data = JSON.parse(m[1]);
	const graph = data['@graph'] ?? [data];
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

test('sitemap incluye las páginas de confianza', () => {
	const xml = read('sitemap-0.xml');
	for (const p of ['about', 'contact', 'privacy']) {
		assert.ok(xml.includes(`https://www.mooenz.me/${p}`), `El sitemap debe incluir /${p}`);
	}
});

test('vercel.json: negociación de contenido Markdown + Vary: Accept', () => {
	const cfg = JSON.parse(readFileSync(fileURLToPath(new URL('../vercel.json', import.meta.url)), 'utf8'));

	const rewrite = (cfg.rewrites ?? []).find((r) => r.destination === '/index.md');
	assert.ok(rewrite, 'Debe existir un rewrite a /index.md');
	assert.equal(rewrite.source, '/');
	const cond = (rewrite.has ?? []).find((h) => h.type === 'header' && h.key.toLowerCase() === 'accept');
	assert.ok(cond, 'El rewrite debe condicionarse a la cabecera Accept');
	assert.match(cond.value, /text\/markdown/, 'La condición debe buscar text/markdown');

	const hasVaryAccept = (source) => {
		const entry = (cfg.headers ?? []).find((h) => h.source === source);
		assert.ok(entry, `Falta la entrada de headers para ${source}`);
		const vary = entry.headers.find((h) => h.key.toLowerCase() === 'vary');
		assert.ok(vary && /\bAccept\b/i.test(vary.value), `${source} debe enviar "Vary: Accept"`);
	};
	hasVaryAccept('/');
	hasVaryAccept('/index.md');

	const mdEntry = cfg.headers.find((h) => h.source === '/index.md');
	const ct = mdEntry.headers.find((h) => h.key.toLowerCase() === 'content-type');
	assert.ok(ct && /text\/markdown/.test(ct.value), '/index.md debe servirse como text/markdown');
});
