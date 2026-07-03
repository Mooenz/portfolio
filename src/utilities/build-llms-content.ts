import personal from '@/constants/personal-info';
import experience from '@/constants/experience';
import projects from '@/constants/projects';
import seo from '@/constants/seo';

import { SITE_URL } from '@/constants/seo.ts';

export function buildLlmsContent(): string {
	const techStack = [
		...new Set(projects.flatMap((project) => project.technologies.map(({ name }) => name))),
	].join(', ');

	const experienceSection = experience
		.map(
			({ position, company, period, description }) =>
				`**${position} — ${company}** (${period})\n\n${description}`
		)
		.join('\n\n');

	const projectsSection = projects
		.map((project) => {
			const stack = project.technologies.map(({ name }) => name).join(', ');
			const repo = project.repository ? ` [Repositorio en GitHub](${project.repository})` : '';
			return `- [${project.name}](${project.demo}): ${project.description} Construido con ${stack}.${repo}`;
		})
		.join('\n');

	return `# Portfolio de ${personal.name}

> ${seo.description} Disponible para trabajar. Ubicado en Colombia.

## Sobre el autor

- **Nombre:** ${personal.name}
- **Rol:** ${personal.role}
- **Correo:** ${personal.email}
- **Sitio web:** ${SITE_URL}
- **GitHub:** ${personal.github}
- **LinkedIn:** ${personal.linkedIn}

El sitio web es un portafolio de una sola página construido con Astro. Muestra información personal, experiencia laboral y proyectos destacados. Incluye modo oscuro/claro, animaciones y diseño responsivo.

## Stack tecnológico

El proyecto está construido con las siguientes tecnologías:

- **Framework principal:** Astro
- **Lenguajes:** TypeScript y JavaScript
- **UI/Estilos:** Tailwind CSS v4
- **Librerías y plataforma:** React, Next.js, Medusa, Supabase, Zustand, GSAP y Vercel
- **Gestor de paquetes:** pnpm

Tecnologías usadas en proyectos: ${techStack}.

## Experiencia laboral

${experienceSection}

## Habilidades técnicas

- **Lenguajes:** HTML, CSS, JavaScript, TypeScript
- **Frameworks y librerías:** Astro, React, Next.js, Tailwind CSS, GSAP, Medusa, Zustand
- **Backend y base de datos:** Supabase, PostgreSQL
- **Herramientas y despliegue:** Git, GitHub, Lighthouse, Figma, Illustrator, Vercel
- **Buenas prácticas:** SEO técnico, Responsive Design, optimización de performance y accesibilidad

## Proyectos

${projectsSection}

## Optional

- [Repositorio del portafolio en GitHub](https://github.com/Mooenz/portfolio): Código fuente completo del sitio de portafolio.
- [CV en formato YAML](${SITE_URL}/cv.yaml): Datos estructurados del currículum en formato legible por máquinas.
`;
}
