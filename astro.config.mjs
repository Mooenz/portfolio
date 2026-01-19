// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import critters from 'astro-critters';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
	// site: 'https://Mooenz.github.io',
	// base: '/portfolio/',
	site: 'https://mooenz.me',
	base: '/',
	output: 'static',
	adapter: vercel({}),
	integrations: [critters(), sitemap()],
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
