interface Experience {
	readonly id: number;
	readonly position: string;
	readonly description: string;
	readonly period: string;
	readonly company: string;
}

const experience: Experience[] = [
	{
		id: 0,
		position: 'Fullstack developer',
		description: 'Desarrollador fullstack freelance especializado en aplicaciones web con Astro, React, TypeScript y Tailwind CSS. Integro backend con Supabase/PostgreSQL y despliego en Vercel, implementando autenticación, CRUD y optimización de rendimiento en producción.',
		period: 'Octubre 2025 - Presente',
		company: 'Freelance',
	},
	{
		id: 1,
		position: 'Desarrollador web',
		description: 'Desarrollo y maquetación de sitios web en HTML, CSS y JavaScript, con enfoque en rendimiento, mantenibilidad y compatibilidad entre navegadores. Implementación de funcionalidades dinámicas con JavaScript moderno (ES6+), optimización para SEO y dispositivos móviles, y mantenimiento de código existente. Trabajo colaborativo con equipos de diseño y desarrollo.',
		period: 'Julio 2022 - Octubre 2025',
		company: 'Estrategia Segura',
	},
];

export default experience;
