interface seo {
	readonly title: string;
	readonly description: string;
	readonly canonical: string;
	readonly og: {
		readonly url: string;
		readonly locale: string;
		readonly type: string;
		readonly image: string;
	};
}

const seo = {
	title: 'Desarrollador Frontend | José Manuel Montaño Saenz',
	description: 'Portafolio de José Manuel Montaño Saenz, Desarrollador Frontend con más de 3 años de experiencia en la creación de sitios web modernos, rápidos y accesibles.',
	canonical: 'https://www.mooenz.me/',
	og: {
		url: 'https://www.mooenz.me/',
		type: 'website',
		locale: 'es_CO',
		image: 'https://www.mooenz.me/images/og-image.webp',
	},
};

export default seo;
