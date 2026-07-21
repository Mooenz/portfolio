export const SITE_URL = 'https://www.mooenz.me';

interface seo {
	readonly title: string;
	readonly description: string;
	readonly canonical: string;
	readonly fbAppId: string;
	readonly og: {
		readonly url: string;
		readonly locale: string;
		readonly type: string;
		readonly image: string;
		readonly imageAlt: string;
	};
}

const seo = {
	title: 'Desarrollador Frontend | José Manuel Montaño Saenz',
	description:
		'Portafolio de José Manuel Montaño Saenz, Desarrollador Frontend con más de 3 años de experiencia en la creación de sitios web modernos, rápidos y accesibles.',
	canonical: `${SITE_URL}/`,
	// App ID de Meta for Developers: https://developers.facebook.com/apps/
	fbAppId: '2135374490721492',
	og: {
		url: `${SITE_URL}/`,
		type: 'website',
		locale: 'es_CO',
		image: `${SITE_URL}/images/og-image.webp`,
		imageAlt: 'José Manuel Montaño Saenz — Desarrollador Frontend',
	},
};

export default seo;
