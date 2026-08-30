import personal from '@/constants/personal-info';
import experience from '@/constants/experience';
import projects from '@/constants/projects';
import seo, { SITE_URL, SITE_DOMAIN, BRAND } from '@/constants/seo';

/**
 * Bloque reutilizable de "cuándo contactar" (when-to-use). Se incluye tanto en
 * `/llms.txt` como en la representación Markdown de la home (`/index.md`) para
 * que un agente sepa para qué trabajos es el indicado este perfil y cómo
 * iniciar el contacto.
 */
export function buildWhenToUseSection(): string {
	return `## Cuándo contactar (when to use)

Contacta a ${personal.name} (Mooenz) cuando necesites:

- Desarrollo de aplicaciones web frontend o fullstack con Astro, React, Next.js y TypeScript.
- Tiendas online DTC / ecommerce a medida: catálogo, checkout, pagos, correos transaccionales y panel de gestión (Next.js + Supabase o Medusa).
- Sitios corporativos rápidos y accesibles, con SEO técnico y buenas métricas de Core Web Vitals.
- Integración de backend con Supabase/PostgreSQL: autenticación, CRUD, RLS y despliegue en Vercel.
- Auditoría o mejora de un sitio existente: rendimiento, accesibilidad (WCAG) y optimización para buscadores y motores de IA (GEO).

No es el perfil indicado para: apps móviles nativas, infraestructura DevOps a gran escala, ciencia de datos o diseño de identidad de marca desde cero.

Cómo contactar: escribe a ${personal.email} o mediante LinkedIn (${personal.linkedIn}). Respuesta habitual en 1-2 días hábiles. Zona horaria: America/Bogota (UTC-5). Idiomas: español e inglés.`;
}

/**
 * Representación Markdown de la página principal, servida en `/index.md` y vía
 * negociación de contenido (`Accept: text/markdown`) sobre `/`.
 */
export function buildHomepageMarkdown(): string {
	const experienceSection = experience
		.map(({ position, company, period, description }) => `### ${position} — ${company}\n\n_${period}_\n\n${description}`)
		.join('\n\n');

	const projectsSection = projects
		.map((project) => {
			const stack = project.technologies.map(({ name }) => name).join(', ');
			const repo = project.repository ? `\n  - Repositorio: ${project.repository}` : '';
			return `### ${project.name}\n\n${project.description}\n\n- Demo: ${project.demo}\n- Stack: ${stack}${repo}`;
		})
		.join('\n\n');

	return `# ${personal.name} — ${personal.role}

> ${seo.description}

- **Marca:** ${BRAND.name} (también «${BRAND.fullName}»)
- **Sitio web:** ${SITE_URL}/ (${SITE_DOMAIN})
- **Correo:** ${personal.email}
- **GitHub:** ${personal.github}
- **LinkedIn:** ${personal.linkedIn}
- **Ubicación:** ${BRAND.locality}, ${BRAND.region}, ${BRAND.country} (${BRAND.timezone}, UTC-5)
- **Disponibilidad:** disponible para trabajar (freelance)

## Sobre mí

${personal.expertise}

Este sitio es un portafolio de una sola página construido con Astro. Reúne mi presentación profesional, mi experiencia laboral y una selección de proyectos con enlaces a sus demos y repositorios.

${buildWhenToUseSection()}

## Experiencia laboral

${experienceSection}

## Proyectos

${projectsSection}

## Páginas de referencia

- [Sobre mí](${SITE_URL}/about)
- [Contacto](${SITE_URL}/contact)
- [Privacidad](${SITE_URL}/privacy)
- [Resumen para LLMs](${SITE_URL}/llms.txt)
- [CV en YAML](${SITE_URL}/cv.yaml)
- [CV en PDF](${SITE_URL}/documents/Cv-José-M-Montaño.pdf)
`;
}
