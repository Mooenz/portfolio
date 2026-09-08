import personal from '@/constants/personal-info';
import experience from '@/constants/experience';
import projects from '@/constants/projects';
import skills from '@/constants/skills';
import seo, { SITE_URL, SITE_DOMAIN, BRAND } from '@/constants/seo';
import { buildWhenToUseSection, languagesLine } from '@/utilities/build-markdown-content';

export function buildLlmsContent(): string {
	// El agregado se queda con el nombre base de cada tecnología: sin esto,
	// «Next.js (App Router)» y «Next.js» cuentan como dos entradas distintas.
	const techStack = [...new Set(projects.flatMap((project) => project.stack.map((tech) => tech.replace(/\s*\(.*\)$/, ''))))].sort().join(', ');

	const experienceSection = experience
		.map(({ position, company, period, description, location, stack }) => `**${position} — ${company}** (${period} · ${location})\n\nStack: ${stack.join(', ')}.\n\n${description}`)
		.join('\n\n');

	const projectsSection = projects
		.map((project) => {
			const repo = project.repository ? ` [Repositorio en GitHub](${project.repository})` : '';
			return `- [${project.name}](${project.demo}): ${project.description} Construido con ${project.stack.join(', ')}.${repo}`;
		})
		.join('\n');

	const skillsSection = skills.map(({ label, details }) => `- **${label}:** ${details}`).join('\n');

	const { degree, institution, location, period, graduated } = personal.education;

	return `# ${BRAND.fullName} — Portfolio de ${personal.name}

> ${seo.description} Disponible para trabajar. Ubicado en ${BRAND.locality}, ${BRAND.region}, ${BRAND.country}.

## Sobre el autor

- **Nombre:** ${personal.name}
- **Marca:** ${BRAND.name} (también «${BRAND.fullName}»)
- **Rol:** ${personal.role}
- **Especialidad:** ${personal.headline}
- **Correo:** ${personal.email}
- **Teléfono:** ${personal.phone}
- **Sitio web:** ${SITE_URL} (${SITE_DOMAIN})
- **GitHub:** ${personal.github}
- **LinkedIn:** ${personal.linkedIn}
- **Ubicación:** ${BRAND.locality}, ${BRAND.region}, ${BRAND.country}
- **Modalidad:** remota, con clientes en Colombia y Canadá
- **Idiomas:** ${languagesLine}

${personal.expertise}

El sitio web es un portafolio de una sola página construido con Astro. Muestra información personal, experiencia laboral y proyectos destacados. Incluye modo oscuro/claro, animaciones y diseño responsivo.

${buildWhenToUseSection()}

## Stack tecnológico del sitio

Este portafolio está construido con las siguientes tecnologías:

- **Framework principal:** Astro
- **Lenguajes:** TypeScript y JavaScript
- **UI/Estilos:** Tailwind CSS v4
- **Animación:** GSAP
- **Despliegue:** Vercel
- **Gestor de paquetes:** pnpm

Tecnologías usadas en los proyectos listados abajo: ${techStack}.

## Experiencia laboral

${experienceSection}

## Habilidades técnicas

${skillsSection}

## Proyectos

${projectsSection}

## Educación

- **${degree} — ${institution}** (${period} · ${location}). Título de Ingeniero de sistemas (${graduated}).

## Páginas de referencia

- [Sobre mí](${SITE_URL}/about): Trayectoria, forma de trabajo y stack principal.
- [Contacto](${SITE_URL}/contact): Cómo y cuándo escribir, tiempos de respuesta e idiomas.
- [Privacidad](${SITE_URL}/privacy): Qué datos recopila el sitio y cómo se tratan.
- [Versión Markdown de la home](${SITE_URL}/index.md): Mismo contenido de la portada en \`text/markdown\` (también vía \`Accept: text/markdown\` sobre \`/\`).

## Optional

- [Repositorio del portafolio en GitHub](https://github.com/Mooenz/portfolio): Código fuente completo del sitio de portafolio.
- [CV en formato YAML](${SITE_URL}/cv.yaml): Datos estructurados del currículum en formato legible por máquinas.
- [CV en PDF](${SITE_URL}/documents/Cv-José-M-Montaño.pdf): Versión imprimible del currículum.
`;
}
