interface SkillGroup {
	readonly label: string;
	readonly details: string;
}

const skills: SkillGroup[] = [
	{
		label: 'Lenguajes',
		details: 'JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL',
	},
	{
		label: 'Frontend',
		details: 'React, Next.js (App Router, Server Components, Server Actions), Astro, Tailwind CSS, Bootstrap, Zustand, Context API, TanStack Query, GSAP, diseño responsive, componentes reutilizables',
	},
	{
		label: 'Backend y datos',
		details: 'Node.js, Express, Supabase, PostgreSQL, Medusa, APIs REST, Zod, Row Level Security (RLS), autenticación y autorización',
	},
	{
		label: 'Ecommerce y pagos',
		details: 'Stripe, Wompi, checkout, gestión de inventario, cotización de envíos, correos transaccionales, internacionalización (i18n)',
	},
	{
		label: 'Rendimiento y SEO',
		details: 'Google PageSpeed, Core Web Vitals, LCP, CLS, SEO técnico, CSS crítico, carga diferida, minificación, imágenes responsivas, code splitting, SSR/SSG/ISR',
	},
	{
		label: 'Accesibilidad',
		details: 'auditorías de accesibilidad, HTML semántico, jerarquía de encabezados, textos alternativos',
	},
	{
		label: 'Herramientas',
		details: 'Git, GitHub, Vercel, Lighthouse, Chrome DevTools, Figma, Jira',
	},
	{
		label: 'Metodologías',
		details: 'Scrum, dailies, Jira, trabajo remoto y colaboración asíncrona, análisis de requerimientos',
	},
];

export default skills;
