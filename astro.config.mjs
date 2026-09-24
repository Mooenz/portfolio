// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

const NOINDEX_PATHS = ['/contact', '/privacy'];
// Panel de Keystatic: rutas bajo demanda, nunca en el sitemap.
const ADMIN_PREFIXES = ['/keystatic', '/api/keystatic'];

export default defineConfig({
	// site: 'https://Mooenz.github.io',
	// base: '/portfolio/',
	site: 'https://www.mooenz.me',
	base: '/',
	// El sitio sigue siendo estático: solo las rutas que inyecta Keystatic
	// (`/keystatic` y `/api/keystatic`) se ejecutan bajo demanda en Vercel.
	output: 'static',
	adapter: vercel(),
	integrations: [
		// React solo lo usa la interfaz de Keystatic; las páginas públicas no hidratan componentes.
		react(),
		keystatic(),
		// Las páginas marcadas con noindex no deben anunciarse en el sitemap.
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname.replace(/\/+$/, '');
				return !NOINDEX_PATHS.includes(pathname) && !ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
			},
			// Cada página se declara canónica sin barra final (ver PageLayout). El
			// sitemap debe anunciar esa misma URL: si publica `/about/` mientras el
			// canonical dice `/about`, Search Console registra el par como duplicado.
			serialize: (item) => {
				const url = new URL(item.url);
				if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
				return { ...item, url: url.href };
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssCodeSplit: true,
			// Asegura que CSS se cargue antes que JS
			modulePreload: {
				polyfill: true,
			},
			rollupOptions: {
				output: {
					// CSS siempre se carga primero al estar en el head
					assetFileNames: 'assets/css/[name]-[hash][extname]',
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
				},
			},
		},
	},
});
