interface PersonalInfo {
	readonly name: string;
	readonly role: string;
	readonly email: string;
	readonly phone: string;
	readonly phoneE164: string;
	readonly expertise: string;
	readonly github: string;
	readonly linkedIn: string;
	readonly languages: { name: string; level: string }[];
	readonly education: {
		degree: string;
		institution: string;
		location: string;
		period: string;
		graduated: string;
	};
}

const personal: PersonalInfo = {
	name: 'José Manuel Montaño Saenz',
	role: 'Desarrollador Frontend',
	email: 'joss92821@hotmail.com',
	phone: '+57 302 271 3706',
	phoneE164: '+573022713706',
	expertise:
		'Desarrollador Frontend con más de 5 años de experiencia (desde enero de 2021) construyendo sitios y aplicaciones web con React, Next.js, TypeScript y Astro. He lanzado tiendas a producción con catálogo, checkout, pasarelas de pago y paneles internos de gestión, apoyándome en Supabase y PostgreSQL. Ingeniero de sistemas, con foco en rendimiento, SEO técnico y accesibilidad.',
	github: 'https://github.com/Mooenz',
	linkedIn: 'https://www.linkedin.com/in/mooenz/',
	languages: [
		{ name: 'Español', level: 'Nativo' },
		{ name: 'Inglés', level: 'A2 — lectura de documentación técnica' },
	],
	education: {
		degree: 'Ingeniería de sistemas',
		institution: 'Universidad Cooperativa de Colombia',
		location: 'Ibagué, Tolima, Colombia',
		period: '2010 – 2014',
		graduated: '2017',
	},
};

export default personal;
