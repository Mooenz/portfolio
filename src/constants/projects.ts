import type { ImageMetadata } from 'astro';

//Import images
import imgIngeSoftNet from '@/assets/images/web-ingeSoftNet.webp';
import imgPatioLaBoca from '@/assets/images/carta-patio-la-boca.webp';
import imgWorldRanks from '@/assets/images/worldranks.webp';
import imgRockPaperScissors from '@/assets/images/rock-paper-scissors.webp';
import imgPoesiaMestiza from '@/assets/images/store-poesiaMestiza.webp';
import imgTaskBoard from '@/assets/images/task-board.webp';

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
		name: 'Tienda online Poesía Mestiza Coffee',
		description: 'Desarrollé la tienda ecommerce DTC de Poesía Mestiza Coffee, marca de café colombiano de especialidad en Canadá, con catálogo multirregional, checkout con Stripe, cuentas de cliente, suscripciones, journal y soporte multilingüe (EN/ES/FR), utilizando Next.js, React, TypeScript, Medusa y Tailwind CSS para una experiencia moderna, trazable y orientada a conversión.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-white bg-typescript dark:text-typescript dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Next.js', icon: 'next', styles: 'text-white bg-text dark:text-white dark:bg-white/10' },
			{ name: 'Medusa', icon: 'medusa', styles: 'text-white bg-text dark:text-white dark:bg-white/10' },
		],
		repository: '',
		demo: 'https://www.poesiamestizacoffee.ca/',
		image: imgPoesiaMestiza,
	},
	{
		id: 12,
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
			{ name: 'Vercel', icon: 'vercel', styles: 'text-white bg-vercel dark:text-white dark:bg-white/10' },
		],
		// repository: 'https://github.com/Mooenz/Patio-la-Boca-Restaurant',
		repository: '',
		demo: 'https://patio-la-boca.vercel.app/',
		image: imgPatioLaBoca,
	},
	{
		id: 2,
		name: 'WorldRanks | Country Page',
		description: 'Desarrollé WorldRanks, una aplicación web para explorar información de países del mundo, con filtros por texto, región y estado, ordenamiento de resultados y vista de detalle con países vecinos, usando React, TypeScript, Tailwind CSS y Zustand.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-dark bg-react dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'bg-typescript text-white dark:text-typescript dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zustand', icon: 'zustand', styles: 'text-white bg-zustand dark:text-zustand dark:bg-zustand/10' },
		],
		repository: 'https://github.com/Mooenz/react-countries-page',
		demo: 'https://mooenz.github.io/react-countries-page/',
		image: imgWorldRanks,
	},
	{
		id: 3,
		name: 'Rock Paper Scissors Game',
		description: 'Desarrollé un juego interactivo de Piedra, Papel, Tijeras con modos de juego clásico y bonus (incluyendo Lagartija y Spock). La aplicación mantiene el estado de puntuación en localStorage y cuenta con un diseño totalmente responsive.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-dark bg-react dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'bg-typescript text-white dark:text-typescript dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zustand', icon: 'zustand', styles: 'text-white bg-zustand dark:text-zustand dark:bg-zustand/10' },
		],
		repository: 'https://github.com/Mooenz/rock-paper-scissors',
		demo: 'https://mooenz.github.io/rock-paper-scissors/',
		image: imgRockPaperScissors,
	},
	{
		id: 4,
		name: "Task Board",
		description: "Desarrollé una aplicación fullstack de gestión de tareas inspirada en el challenge de devChallenges, con tablero editable y CRUD completo de tareas (crear, actualizar estado/contenido y eliminar). El frontend usa React con TanStack Query y Zustand, y el backend expone una API REST en Express con validación Zod y sesión anónima mediante cookie HTTP-only.",
		technologies: [
			{
				name: "React",
				icon: "react",
				styles: "text-dark bg-react dark:text-react dark:bg-react/10"
			},
			{
				name: "TypeScript",
				icon: "typescript",
				styles: "bg-typescript text-white dark:text-typescript dark:bg-typescript/10"
			},
			{
				name: "Tailwind CSS",
				icon: "tailwind",
				styles: "text-white bg-tailwindcss dark:text-tailwindcss dark:bg-tailwindcss/10"
			},
			{
				name: "Zustand",
				icon: "zustand",
				styles: "text-white bg-zustand dark:text-zustand dark:bg-zustand/10"
			}
		],
		repository: "https://github.com/Mooenz/task-board",
		demo: "",
		image: imgTaskBoard
	}
];

export default projects;
