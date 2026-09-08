import type { ImageMetadata } from 'astro';

//Import images
import imgIngeSoftNet from '@/assets/images/web-ingeSoftNet.webp';
import imgPatioLaBoca from '@/assets/images/carta-patio-la-boca.webp';
import imgWorldRanks from '@/assets/images/worldranks.webp';
import imgRockPaperScissors from '@/assets/images/rock-paper-scissors.webp';
import imgPoesiaMestiza from '@/assets/images/store-poesiaMestiza.webp';
import imgTaskBoard from '@/assets/images/task-board.webp';
import imgMultiStepForm from '@/assets/images/multiStepForm.webp';
import imgGrizzly from '@/assets/images/store-grizzly.webp';

interface Project {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	/**
	 * Tecnologías con insignia visible. Solo las que tienen icono en el mapa de
	 * `Project.astro`: una insignia sin icono cae en el de JavaScript y miente.
	 */
	readonly technologies: { name: string; icon: string; styles: string }[];
	/**
	 * Stack completo del proyecto, tal y como consta en `CV.md` / `public/cv.yaml`.
	 * Es lo que se publica en `/llms.txt`, `/index.md` y las `keywords` del
	 * JSON-LD, donde un ATS o un agente busca la coincidencia literal con las
	 * tecnologías de una vacante (Wompi, Stripe, PostgreSQL, Express… no tienen
	 * icono, pero sí tienen que aparecer).
	 */
	readonly stack: string[];
	readonly repository: string;
	readonly demo: string;
	readonly image: ImageMetadata;
}

/** Orden y contenido alineados con la sección «Proyectos» del CV. */
const projects: Project[] = [
	{
		id: 0,
		name: 'Tienda online GRIZZLY Chanclas',
		description:
			'Desarrollé la tienda ecommerce DTC de GRIZZLY, marca colombiana de chanclas premium fabricadas en Ibagué, con catálogo por colecciones, checkout de invitado sin registro y seguimiento por token, pagos con Wompi y contraentrega por WhatsApp, reserva de stock con expiración automática, cotización y guías de envío nacional, correos transaccionales y panel interno de gestión de pedidos, utilizando Next.js, React, TypeScript, Supabase y Tailwind CSS sobre una arquitectura server-first con RLS, Server Actions y máquina de estados en base de datos.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Supabase', icon: 'supabase', styles: 'text-supabase-ink bg-supabase/10 dark:text-supabase dark:bg-supabase/10' },
			{ name: 'Next.js', icon: 'next', styles: 'text-text bg-text/10 dark:text-text-dark dark:bg-text-dark/10' },
			{ name: 'Vercel', icon: 'vercel', styles: 'text-vercel bg-vercel/10 dark:text-vercel-dark dark:bg-vercel-dark/10' },
		],
		stack: ['Next.js (App Router)', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Wompi', 'Vercel'],
		repository: '',
		demo: 'https://www.grizzlycol.com/',
		image: imgGrizzly,
	},
	{
		id: 1,
		name: 'Tienda online Poesía Mestiza Coffee',
		description:
			'Desarrollé la tienda ecommerce DTC de Poesía Mestiza Coffee, marca de café colombiano de especialidad en Canadá, con catálogo multirregional, checkout con Stripe, cuentas de cliente, suscripciones recurrentes, journal y soporte multilingüe (EN/ES/FR), utilizando Next.js, React, TypeScript, Supabase, Medusa y Tailwind CSS para una experiencia moderna, trazable y orientada a conversión.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Supabase', icon: 'supabase', styles: 'text-supabase-ink bg-supabase/10 dark:text-supabase dark:bg-supabase/10' },
			{ name: 'Next.js', icon: 'next', styles: 'text-text bg-text/10 dark:text-text-dark dark:bg-text-dark/10' },
			{ name: 'Medusa', icon: 'medusa', styles: 'text-text bg-text/10 dark:text-text-dark dark:bg-text-dark/10' },
			{ name: 'Vercel', icon: 'vercel', styles: 'text-vercel bg-vercel/10 dark:text-vercel-dark dark:bg-vercel-dark/10' },
		],
		stack: ['Next.js', 'React', 'TypeScript', 'Medusa', 'Supabase', 'Stripe', 'Tailwind CSS', 'Vercel'],
		repository: '',
		demo: 'https://www.poesiamestizacoffee.ca/',
		image: imgPoesiaMestiza,
	},
	{
		id: 2,
		name: 'Plataforma web bilingüe de Patio La Boca Restaurant',
		description:
			'Aplicación web SSR para la carta digital (es/en) de Patio La Boca Restaurant, construida con Astro y TypeScript. Incluye navegación por categorías dinámicas desde Supabase, animaciones con GSAP, modo oscuro, panel administrativo con autenticación, CRUD de secciones/platos y carga segura de imágenes para mantener el menú actualizado en producción.',
		technologies: [
			{ name: 'Astro', icon: 'astro', styles: 'text-astro-ink bg-astro/10 dark:text-astro-dark dark:bg-astro/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Supabase', icon: 'supabase', styles: 'text-supabase-ink bg-supabase/10 dark:text-supabase dark:bg-supabase/10' },
			{ name: 'GSAP', icon: 'gsap', styles: 'text-gsap-ink bg-gsap/10 dark:text-gsap dark:bg-gsap/10' },
			{ name: 'Vercel', icon: 'vercel', styles: 'text-vercel bg-vercel/10 dark:text-vercel-dark dark:bg-vercel-dark/10' },
		],
		stack: ['Astro (SSR)', 'TypeScript', 'Tailwind CSS', 'Supabase', 'GSAP', 'Vercel'],
		// El repositorio es privado: enlazarlo devolvería un 404 al reclutador.
		repository: '',
		demo: 'https://patio-la-boca.vercel.app/',
		image: imgPatioLaBoca,
	},
	{
		id: 3,
		name: 'Página web de IngeSoftNet',
		description: 'Desarrollé la web corporativa de IngeSoftNet, que ofrece servicios de instalación, mantenimiento, soporte y venta de licencias del software SysCafé, utilizando Astro, Tailwind CSS y JavaScript, con diseño responsive orientado a convertir visitantes en solicitudes de licencia.',
		technologies: [
			{ name: 'JavaScript', icon: 'javascript', styles: 'text-javascript-ink bg-javascript/10 dark:text-javascript-dark dark:bg-javascript-dark/10' },
			{ name: 'Astro', icon: 'astro', styles: 'text-astro-ink bg-astro/10 dark:text-astro-dark dark:bg-astro/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
		],
		stack: ['Astro', 'Tailwind CSS', 'JavaScript'],
		// El repositorio es privado: enlazarlo devolvería un 404 al reclutador.
		repository: '',
		demo: 'https://ingesoftnet.com/',
		image: imgIngeSoftNet,
	},
	{
		id: 4,
		name: 'Task Board',
		description: 'Desarrollé una aplicación fullstack de gestión de tareas inspirada en el challenge de devChallenges, con tablero editable y CRUD completo de tareas (crear, actualizar estado/contenido y eliminar). El frontend usa React con TanStack Query y Zustand, y el backend expone una API REST en Express con validación Zod y sesión anónima mediante cookie HTTP-only.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zustand', icon: 'zustand', styles: 'text-zustand-ink bg-zustand/10 dark:text-zustand dark:bg-zustand/10' },
			{ name: 'Zod', icon: 'zod', styles: 'text-zod-ink bg-zod/10 dark:text-zod dark:bg-zod/10' },
		],
		stack: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Node.js', 'Express', 'Zod', 'Tailwind CSS'],
		repository: 'https://github.com/Mooenz/task-board',
		demo: 'https://mooenz.github.io/task-board',
		image: imgTaskBoard,
	},
	{
		id: 5,
		name: 'WorldRanks | Country Page',
		description: 'Desarrollé WorldRanks, una aplicación web para explorar información de países del mundo, con filtros por texto, región y estado, ordenamiento de resultados y vista de detalle con países vecinos, usando React, TypeScript, Tailwind CSS y Zustand.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zustand', icon: 'zustand', styles: 'text-zustand-ink bg-zustand/10 dark:text-zustand dark:bg-zustand/10' },
		],
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
		repository: 'https://github.com/Mooenz/react-countries-page',
		demo: 'https://mooenz.github.io/react-countries-page/',
		image: imgWorldRanks,
	},
	{
		id: 6,
		name: 'Rock Paper Scissors Game',
		description: 'Desarrollé un juego interactivo de Piedra, Papel, Tijeras con modos de juego clásico y bonus (incluyendo Lagartija y Spock). La aplicación mantiene el estado de puntuación en localStorage y cuenta con un diseño totalmente responsive.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zustand', icon: 'zustand', styles: 'text-zustand-ink bg-zustand/10 dark:text-zustand dark:bg-zustand/10' },
		],
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
		repository: 'https://github.com/Mooenz/rock-paper-scissors',
		demo: 'https://mooenz.github.io/rock-paper-scissors/',
		image: imgRockPaperScissors,
	},
	{
		id: 7,
		name: 'Multi-step Form',
		description: 'Formulario de suscripción en cuatro pasos con validación, selección de plan, complementos y resumen final. Implementado con React, TypeScript, Vite, Tailwind CSS y Zod para una experiencia responsive en escritorio y móvil.',
		technologies: [
			{ name: 'React', icon: 'react', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
			{ name: 'TypeScript', icon: 'typescript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
			{ name: 'Tailwind CSS', icon: 'tailwind', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
			{ name: 'Zod', icon: 'zod', styles: 'text-zod-ink bg-zod/10 dark:text-zod dark:bg-zod/10' },
		],
		stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zod'],
		repository: 'https://github.com/Mooenz/multi-step-form',
		demo: 'https://mooenz.github.io/multi-step-form/',
		image: imgMultiStepForm,
	},
];

export default projects;
