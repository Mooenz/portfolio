import type { ImageMetadata } from 'astro';

//Import images
import imgIngeSoftNet from '@/assets/images/web-ingeSoftNet.webp';
import imgPatioLaBoca from '@/assets/images/carta-patio-la-boca.webp';

interface Project {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	readonly technologies: { name: string; icon: string; styles: string }[];
	readonly repository: string;
	readonly demo: string;
	readonly image: ImageMetadata;
}

const projects: Project[] = [
	{
		id: 0,
		name: 'Página web de IngeSoftNet',
		description: 'Desarrollé la web de IngeSoftNet que ofrece servicios de instalación, mantenimiento, soporte y venta de licencias del software SysCafé, utilizando Astro, Tailwind CSS y Javascript para crear una experiencia de usuario moderna y receptiva.',
		technologies: [
			{ name: 'JavaScript', icon: 'javascript', styles: 'text-dark bg-javascript dark:text-javascript-dark dark:bg-javascript-dark/10' },
			{ name: 'Astro', icon: 'astro', styles: 'bg-astro text-white dark:text-astro dark:bg-astro/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10' },
		],
		repository: '',
		demo: 'https://ingesoftnet.com/',
		image: imgIngeSoftNet,
	},
	{
		id: 1,
		name: 'Plataforma web bilingüe de Patio La Boca Restaurant',
		description: 'Aplicación web SSR para la carta digital (es/en) de Patio La Boca Restaurant, construida con Astro y TypeScript. Incluye navegación por categorías dinámicas desde Supabase, animaciones con GSAP, modo oscuro, panel administrativo con autenticación, CRUD de secciones/platos y carga segura de imágenes para mantener el menú actualizado en producción.',
		technologies: [
			{ name: 'Astro', icon: 'astro', styles: 'bg-astro text-white dark:text-astro dark:bg-astro/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'bg-typescript text-white dark:text-typescript dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Supabase', icon: 'supabase', styles: 'bg-supabase text-white dark:text-supabase dark:bg-supabase/10' },
			{ name: 'GSAP', icon: 'gsap', styles: 'bg-gsap text-dark dark:text-gsap dark:bg-gsap/10' },
			{ name: 'Vercel', icon: 'vercel', styles: 'text-white bg-vercel dark:text-white dark:bg-vercel/20' },
		],
		repository: 'https://github.com/Mooenz/Patio-la-Boca-Restaurant',
		demo: 'https://patio-la-boca.vercel.app/',
		image: imgPatioLaBoca,
	},
];

export default projects;
