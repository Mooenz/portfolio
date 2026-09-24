import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

// Registrar plugins una sola vez
gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateLetters(selector: string): void {
	const elements = document.querySelectorAll(selector);

	if (!elements.length) {
		console.warn(`No se encontró el elemento con selector: ${selector}`);
		return;
	}

	// Usar SplitText para dividir en letras
	const split = new SplitText(elements, {
		type: 'words, chars',
	});

	const chars = split.chars;

	// Modificar cada char para agregar la letra reemplazo debajo
	chars.forEach((charEl) => {
		const wrapper = document.createElement('span');
		wrapper.className = 'char-wrapper';

		const clone = charEl.cloneNode(true) as HTMLElement;
		clone.classList.add('char-next');
		clone.style.top = '100%';

		charEl.classList.add('char');

		wrapper.appendChild(charEl.cloneNode(true));
		wrapper.appendChild(clone);

		charEl.replaceWith(wrapper);
	});

	// Animación GSAP con delays aleatorios
	elements.forEach((el) => {
		const wrappers = el.querySelectorAll('.char-wrapper');
		wrappers.forEach((wrapper) => {
			const char = wrapper.querySelector('.char') as HTMLElement;
			const charNext = wrapper.querySelector('.char-next') as HTMLElement;

			gsap
				.timeline({ delay: Math.random() * 1.5 })
				.to(char, {
					y: '-100%',
					duration: 0.6,
					ease: 'power3.inOut',
				})
				.to(
					charNext,
					{
						y: '-100%',
						duration: 0.6,
						ease: 'power3.inOut',
					},
					'-=0.45'
				);
		});
	});
}

export function scrollItems(item: string): void {
	// Convertimos la lista a un array de elementos con tipado correcto
	const items = gsap.utils.toArray(item) as HTMLElement[];

	items.forEach((el: HTMLElement) => {
		gsap.fromTo(
			el,
			{
				scale: 0.9,
				opacity: 0.5,
			},
			{
				scale: 1,
				opacity: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 95%',
					end: 'top 65%',
					scrub: 1,
					markers: false,
				},
			}
		);
	});
}
