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
		name: 'Página web IngeSoftNet',
		description: 'Desarrollé la web de IngeSoftNet que ofrece servicios de instalación, mantenimiento, soporte y venta de licencias del software SysCafé, utilizando Astro, Tailwind CSS y Javascript para crear una experiencia de usuario moderna y receptiva.',
		technologies: [
			{ name: 'Astro', icon: 'astro', styles: 'text-astro bg-astro/10' },
			{ name: 'JavaScript', icon: 'javascript', styles: 'text-javascript bg-javascript/20' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss bg-tailwindcss/20' },
		],
		repository: 'https://github.com/Mooenz/IngeSoftNet',
		demo: 'https://ingesoftnet.com/',
		image: imgIngeSoftNet,
	},
	{
		id: 1,
		name: 'Patio La Boca Restaurant - Carta Digital',
		description: 'Carta digital bilingüe (es/en) para Patio La Boca Restaurant, creada con Astro, Tailwind CSS y TypeScript, con animaciones GSAP y datos estructurados por categorías para un menú interactivo y responsivo.',
		technologies: [
			{ name: 'Astro', icon: 'astro', styles: 'text-astro bg-astro/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript bg-typescript/15' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss bg-tailwindcss/20' },
		],
		repository: 'https://github.com/Mooenz/Patio-la-Boca-Restaurant',
		demo: 'https://patio-la-boca.vercel.app/',
		image: imgPatioLaBoca,
	},
];

export default projects;
