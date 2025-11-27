interface Experience {
	readonly id: number;
	readonly position: string;
	readonly description: string;
	readonly period: string;
	readonly company: string;
}

const experience: Experience[] = [
	{
		id: 1,
		position: 'Desarrollador web',
		description: 'Maquetador de sitios web en HTML, CSS y JS, mediante la coordinación con el diseñador del sitio. También, hice uso de herramientas basadas en jquery. Maquetación de emails.',
		period: 'Julio 2022 - Octubre 2025',
		company: 'Estrategia Segura',
	},
	// 	{
	// 	id: 2,
	// 	position: 'Desarrollador web',
	// 	description: 'Maquetador de sitios web en HTML, CSS y JS,  mediante la coordinación con el diseñador del sitio. Tambien, se hace uso de herramientas basadas en jquery. Maquetación de emails.',
	// 	period: 'Julio 2022 - Octubre 2025',
	// 	company: 'Estrategia Segura',
	// },
];

export default experience;
