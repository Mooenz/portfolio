import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Con `reduce` no se crea la instancia: el scroll queda nativo y los
// consumidores deben contemplar `lenis === null`.
export const lenis: Lenis | null = prefersReducedMotion
	? null
	: new Lenis({
			// Lenis gestiona los enlaces internos (#seccion) con su propio easing.
			anchors: true,
			// El bucle lo conduce el ticker de GSAP (ver abajo).
			autoRaf: false,
		});

if (lenis) {
	// Cada frame de Lenis notifica a ScrollTrigger para que los `scrub`
	// lean la posición interpolada y no la nativa.
	lenis.on('scroll', ScrollTrigger.update);

	// Un único requestAnimationFrame: el de GSAP. `ticker` entrega segundos
	// y Lenis espera milisegundos.
	gsap.ticker.add((time) => lenis.raf(time * 1000));

	// Sin esto GSAP "salta" tras una pestaña inactiva y desincroniza el scroll.
	gsap.ticker.lagSmoothing(0);
}
