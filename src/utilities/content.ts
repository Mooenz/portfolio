import { getCollection, getEntry } from 'astro:content';
import { TECH_BADGES } from '@/constants/tech-badges';

/**
 * Punto único de acceso al contenido editable. Las páginas no llaman a
 * `getCollection` directamente: aquí se resuelven los singletons, el filtro de
 * publicados, el orden y los campos derivados, para que todas las salidas
 * (HTML, JSON-LD, /llms.txt, /index.md) muestren exactamente lo mismo.
 */

/** Los singletons de Keystatic se guardan como `index.yaml`: su única entrada. */
function assertSingleton<T>(entry: T | undefined, collection: string): T {
	if (!entry) throw new Error(`Falta src/content/${collection}/index.yaml`);
	return entry;
}

export async function getPersonal() {
	const { data } = assertSingleton(await getEntry('personal', 'index'), 'personal');
	return {
		...data,
		/** Teléfono en formato E.164 para `tel:` y JSON-LD, derivado del visible. */
		phoneE164: data.phone.replace(/[^\d+]/g, ''),
	};
}

export async function getExperience() {
	return assertSingleton(await getEntry('experience', 'index'), 'experience').data.items;
}

export async function getPublishedProjects() {
	const entries = await getCollection('projects', ({ data }) => data.published);
	return entries
		.sort((a, b) => a.data.order - b.data.order)
		.map(({ id, data }) => ({
			...data,
			slug: id,
			repository: data.repository ?? '',
			technologies: data.badges.map((icon) => ({ icon, name: TECH_BADGES[icon].label, styles: TECH_BADGES[icon].styles })),
		}));
}

export type Personal = Awaited<ReturnType<typeof getPersonal>>;
export type Experience = Awaited<ReturnType<typeof getExperience>>;
export type PublishedProject = Awaited<ReturnType<typeof getPublishedProjects>>[number];
