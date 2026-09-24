/**
 * Catálogo cerrado de insignias de tecnología.
 *
 * El CMS solo guarda la clave (`react`, `astro`…); el nombre visible y las
 * clases de color viven aquí, en código. Así quien edita contenido no puede
 * romper el diseño con clases de Tailwind, y cada clave tiene garantizado un
 * icono en `Project.astro`. Una tecnología sin icono va al campo `stack`.
 */
export const TECH_BADGES = {
	react: { label: 'React', styles: 'text-react-ink bg-react/10 dark:text-react dark:bg-react/10' },
	next: { label: 'Next.js', styles: 'text-text bg-text/10 dark:text-text-dark dark:bg-text-dark/10' },
	astro: { label: 'Astro', styles: 'text-astro-ink bg-astro/10 dark:text-astro-dark dark:bg-astro/10' },
	typescript: { label: 'TypeScript', styles: 'text-typescript-ink bg-typescript/10 dark:text-typescript-dark dark:bg-typescript/10' },
	javascript: { label: 'JavaScript', styles: 'text-javascript-ink bg-javascript/10 dark:text-javascript-dark dark:bg-javascript-dark/10' },
	tailwind: { label: 'Tailwind CSS', styles: 'text-tailwindcss-ink bg-tailwindcss/10 dark:text-tailwindcss dark:bg-tailwindcss/10' },
	supabase: { label: 'Supabase', styles: 'text-supabase-ink bg-supabase/10 dark:text-supabase dark:bg-supabase/10' },
	medusa: { label: 'Medusa', styles: 'text-text bg-text/10 dark:text-text-dark dark:bg-text-dark/10' },
	vercel: { label: 'Vercel', styles: 'text-vercel bg-vercel/10 dark:text-vercel-dark dark:bg-vercel-dark/10' },
	gsap: { label: 'GSAP', styles: 'text-gsap-ink bg-gsap/10 dark:text-gsap dark:bg-gsap/10' },
	zustand: { label: 'Zustand', styles: 'text-zustand-ink bg-zustand/10 dark:text-zustand dark:bg-zustand/10' },
	zod: { label: 'Zod', styles: 'text-zod-ink bg-zod/10 dark:text-zod dark:bg-zod/10' },
} as const;

export type TechBadgeKey = keyof typeof TECH_BADGES;

export const TECH_BADGE_KEYS = Object.keys(TECH_BADGES) as [TechBadgeKey, ...TechBadgeKey[]];
