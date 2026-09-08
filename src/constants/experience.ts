interface Experience {
	readonly id: number;
	readonly position: string;
	readonly description: string;
	readonly period: string;
	readonly company: string;
	/** Modalidad y ubicación del puesto, tal y como consta en el CV. */
	readonly location: string;
	/**
	 * Stack del puesto. No se pinta en la barra lateral (el diseño muestra solo
	 * prosa), pero sí en `/llms.txt` y `/index.md`, que es donde un ATS o un
	 * agente busca la correspondencia literal con las tecnologías de una vacante.
	 */
	readonly stack: string[];
}

/**
 * Experiencia laboral. Fuente: `CV.md` / `public/cv.yaml`.
 *
 * Se listan únicamente los puestos de desarrollo. El puesto administrativo
 * anterior (Comdata · AUDISERVICIOS, 2018-2020) vive en el CV, que es donde
 * explica la cronología completa sin desviar el foco del portafolio.
 */
const experience: Experience[] = [
	{
		id: 0,
		position: 'Desarrollador Frontend',
		description:
			'Desarrollo de tiendas ecommerce y sitios corporativos para clientes en Colombia y Canadá, como desarrollador único: análisis de requerimientos, frontend, integración de backend como servicio y puesta en producción. He lanzado 4 proyectos de cliente, integrando pasarelas de pago según el mercado (Wompi en Colombia, Stripe en Canadá), cotización de envíos y correos transaccionales, y modelando datos y control de acceso sobre Supabase y PostgreSQL con Row Level Security, autenticación y Server Actions validadas. Cada cliente queda con autonomía sobre su contenido mediante paneles administrativos e interfaces multilingües (ES/EN/FR).',
		period: 'Octubre 2025 - Presente',
		company: 'Freelance',
		location: 'Remoto · Clientes en Colombia y Canadá',
		stack: ['Next.js', 'React', 'TypeScript', 'Astro', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Stripe', 'Wompi', 'Medusa', 'Vercel'],
	},
	{
		id: 1,
		position: 'Desarrollador Web',
		description:
			'Desarrollo y mantenimiento de sitios web corporativos y sistemas internos para los clientes de la agencia, con responsabilidad sobre el análisis de requerimientos, la maquetación responsive, el rendimiento, la accesibilidad y el SEO técnico de cada entrega. Entregué y mantuve 12 sitios corporativos y 2 sistemas internos en 3 años, alcanzando puntajes de 90+ en los cuatro indicadores de Google PageSpeed mediante carga diferida, CSS crítico, minificación e imágenes responsivas. Implementé animaciones con GSAP y AOS.js, validación de formularios con jQuery Validator y reCAPTCHA, y coordiné las entregas bajo Scrum con gestión en Jira.',
		period: 'Julio 2022 - Octubre 2025',
		company: 'Estrategia Segura',
		location: 'Ibagué, Colombia',
		stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'jQuery', 'Bootstrap', 'Kendo UI', 'GSAP', 'AOS.js', 'Isotope', 'jQuery Validator', 'reCAPTCHA'],
	},
	{
		id: 2,
		position: 'Desarrollador Frontend',
		description:
			'Desarrollo del sitio web corporativo de un cliente directo, con React como base del frontend y despliegue del build estático en hosting compartido. Puse en producción el sitio de AUDISERVICIOS S.A.S como desarrollador único: 7 páginas en React y Tailwind CSS —inicio, nosotros, personal, preguntas frecuentes, contacto, política de datos y quejas y apelaciones— con formulario de contacto.',
		period: 'Enero 2021 - Julio 2022',
		company: 'Freelance',
		location: 'Ibagué, Colombia',
		stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Hostinger'],
	},
];

export default experience;
