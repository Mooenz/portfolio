import { config, collection, fields, singleton } from '@keystatic/core';
// Ruta relativa: este archivo lo carga también Keystatic, fuera del alias `@/`.
import { TECH_BADGES, TECH_BADGE_KEYS } from './src/constants/tech-badges';

/**
 * Esquema del CMS. Keystatic solo lee y escribe archivos YAML en `src/content/`
 * (y sus imágenes en `src/assets/images/`); el sitio los consume con las
 * colecciones de Astro definidas en `src/content.config.ts`, que validan el
 * mismo esquema en cada build.
 *
 * En desarrollo se edita en disco (`local`); en producción, Keystatic Cloud
 * autentica al editor y guarda cada cambio como commit en GitHub, lo que
 * dispara un nuevo deploy en Vercel.
 */
export default config({
	storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
	cloud: {
		project: 'porfolio/portfolio',
	},
	ui: {
		brand: { name: 'Mooenz' },
		navigation: {
			Portafolio: ['personal', 'experience', 'projects'],
		},
	},
	singletons: {
		personal: singleton({
			label: 'Datos personales',
			path: 'src/content/personal/',
			format: { data: 'yaml' },
			schema: {
				name: fields.text({ label: 'Nombre completo', validation: { isRequired: true } }),
				role: fields.text({ label: 'Rol', validation: { isRequired: true } }),
				headline: fields.text({
					label: 'Especialidad',
					description: 'Una línea. Se publica en /llms.txt y /index.md.',
					validation: { isRequired: true },
				}),
				expertise: fields.text({ label: 'Presentación', multiline: true, validation: { isRequired: true } }),
				avatar: fields.image({
					label: 'Foto de perfil',
					directory: 'src/assets/images/personal',
					publicPath: '../../assets/images/personal/',
					validation: { isRequired: true },
				}),
				email: fields.text({ label: 'Correo', validation: { isRequired: true } }),
				phone: fields.text({
					label: 'Teléfono',
					description: 'Con indicativo, p. ej. +57 302 271 6706. El formato para enlaces tel: se calcula solo.',
					validation: { isRequired: true },
				}),
				github: fields.url({ label: 'GitHub', validation: { isRequired: true } }),
				linkedIn: fields.url({ label: 'LinkedIn', validation: { isRequired: true } }),
				languages: fields.array(
					fields.object({
						name: fields.text({ label: 'Idioma', validation: { isRequired: true } }),
						level: fields.text({ label: 'Nivel', validation: { isRequired: true } }),
					}),
					{ label: 'Idiomas', itemLabel: (props) => `${props.fields.name.value} — ${props.fields.level.value}` },
				),
				education: fields.object(
					{
						degree: fields.text({ label: 'Título', validation: { isRequired: true } }),
						institution: fields.text({ label: 'Institución', validation: { isRequired: true } }),
						location: fields.text({ label: 'Ubicación', validation: { isRequired: true } }),
						period: fields.text({ label: 'Periodo de estudios', validation: { isRequired: true } }),
						graduated: fields.text({ label: 'Año de grado', validation: { isRequired: true } }),
					},
					{ label: 'Formación' },
				),
			},
		}),
		experience: singleton({
			label: 'Experiencia laboral',
			path: 'src/content/experience/',
			format: { data: 'yaml' },
			schema: {
				items: fields.array(
					fields.object({
						position: fields.text({ label: 'Cargo', validation: { isRequired: true } }),
						company: fields.text({ label: 'Empresa', validation: { isRequired: true } }),
						period: fields.text({ label: 'Periodo', description: 'p. ej. Julio 2022 - Octubre 2025', validation: { isRequired: true } }),
						location: fields.text({ label: 'Modalidad y ubicación', validation: { isRequired: true } }),
						description: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
						stack: fields.array(fields.text({ label: 'Tecnología' }), {
							label: 'Stack',
							description: 'No se muestra en la página; se publica en /llms.txt y /index.md para ATS y agentes.',
							itemLabel: (props) => props.value,
						}),
					}),
					{
						label: 'Puestos',
						description: 'El primero de la lista se resalta como el puesto actual. Arrastra para reordenar.',
						itemLabel: (props) => `${props.fields.position.value} — ${props.fields.company.value}`,
					},
				),
			},
		}),
	},
	collections: {
		projects: collection({
			label: 'Proyectos destacados',
			path: 'src/content/projects/*',
			slugField: 'name',
			format: { data: 'yaml' },
			columns: ['order', 'published'],
			schema: {
				name: fields.slug({ name: { label: 'Nombre', validation: { isRequired: true } } }),
				published: fields.checkbox({ label: 'Publicado', description: 'Desmárcalo para ocultarlo del sitio sin borrarlo.', defaultValue: true }),
				order: fields.integer({ label: 'Orden', description: 'Menor aparece primero.', defaultValue: 100, validation: { isRequired: true } }),
				description: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
				image: fields.image({
					label: 'Captura',
					directory: 'src/assets/images/projects',
					publicPath: '../../assets/images/projects/',
					validation: { isRequired: true },
				}),
				badges: fields.array(
					fields.select({
						label: 'Tecnología',
						options: TECH_BADGE_KEYS.map((key) => ({ label: TECH_BADGES[key].label, value: key })),
						defaultValue: 'react',
					}),
					{
						label: 'Insignias',
						description: 'Tecnologías con icono visibles en la tarjeta, en este orden.',
						itemLabel: (props) => TECH_BADGES[props.value].label,
					},
				),
				stack: fields.array(fields.text({ label: 'Tecnología' }), {
					label: 'Stack completo',
					description: 'Incluye las que no tienen icono (Stripe, PostgreSQL…). Se publica en /llms.txt, /index.md y el JSON-LD.',
					itemLabel: (props) => props.value,
				}),
				demo: fields.url({ label: 'URL de la demo', validation: { isRequired: true } }),
				repository: fields.url({ label: 'Repositorio', description: 'Déjalo vacío si es privado: un enlace roto devuelve 404 al reclutador.' }),
			},
		}),
	},
});
