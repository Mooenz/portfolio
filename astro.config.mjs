// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const NOINDEX_PATHS = ['/about', '/contact', '/privacy'];

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
