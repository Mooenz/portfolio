// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const NOINDEX_PATHS = ['/contact', '/privacy'];

export default defineConfig({
	// site: 'https://Mooenz.github.io',
	// base: '/portfolio/',
	site: 'https://www.mooenz.me',
	base: '/',
	output: 'static',
	// Las páginas marcadas con noindex no deben anunciarse en el sitemap.
	integrations: [
		sitemap({
			filter: (page) => !NOINDEX_PATHS.some((path) => new URL(page).pathname.replace(/\/+$/, '') === path),
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
