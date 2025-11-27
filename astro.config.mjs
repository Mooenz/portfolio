// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import critters from 'astro-critters';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	// site: 'https://Mooenz.github.io',
	// base: '/portfolio/',
	site: 'https://mooenz.me',
	base: '/',
	integrations: [critters(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssCodeSplit: true,
		},
	},
});
