export const SITE_URL = 'https://www.mooenz.me';

/** Dominio canónico sin protocolo, para mostrarlo en texto visible. */
export const SITE_DOMAIN = 'www.mooenz.me';

/**
 * Identidad de marca y NAP (Name, Address, Phone) canónicos.
 *
 * Fuente única para que el nombre de marca, la ubicación y el contacto sean
 * idénticos en el HTML visible (footer), en los datos estructurados (JSON-LD)
 * y en las variantes legibles por máquina (`/llms.txt`, `/index.md`). La
 * consistencia del NAP es lo que permite que una búsqueda limpia de la marca
 * ("Mooenz" / "Mooenz Portfolio") resuelva a este dominio.
 */
export const BRAND = {
	/** Nombre de marca corto y distintivo. */
	name: 'Mooenz',
	/** Nombre de marca largo, tal y como aparece en `og:site_name`. */
	fullName: 'Mooenz Portfolio',
	/** Persona tras la marca. */
	legalName: 'José Manuel Montaño Saenz',
	locality: 'Ibagué',
	region: 'Tolima',
	country: 'Colombia',
	countryCode: 'CO',
	timezone: 'America/Bogota',
} as const;

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
	title: 'Desarrollador Frontend | José Manuel Montaño Saenz (Mooenz)',
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
