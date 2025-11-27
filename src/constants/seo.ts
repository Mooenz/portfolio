interface seo {
	readonly title: string;
	readonly description: string;
	readonly keywords: string;
	readonly canonical: string;
	readonly og: {
		readonly url: string;
		readonly locale: string;
		readonly type: string;
		readonly image: string;
	};
}

const seo = {
	title: 'Desarrollador Frontend | Jose Manuel Montaño Saenz',
	description: 'Portafolio de Jose Manuel Montaño Saenz, Desarrollador Frontend con más de 3 años de experiencia en la creación de sitios web modernos, rápidos y accesibles.',
	keywords: 'Desarrollador Frontend, Portafolio, Jose Manuel Montaño Saenz, Desarrollo web, HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS, Astro',
	canonical: 'https://www.mooenz.me/',
	og: {
		url: 'https://www.mooenz.me/',
		type: 'website',
		locale: 'es_CO',
		image: 'https://www.mooenz.me/images/og-image.jpg',
	},
};

export default seo;
