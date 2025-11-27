import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

// Registrar plugins una sola vez
gsap.registerPlugin(ScrollTrigger, SplitText);

// ============================================
// 1. Animación de letras con efecto slide
// ============================================
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

// ============================================
// 2. Fade in de secciones con scroll
// ============================================
export function fadeInSections(sectionSelector: string, elementSelector: string): void {
	const sections = document.querySelectorAll(sectionSelector);

	sections.forEach((section) => {
		if (!section) return;

		const elements = gsap.utils.toArray(section.querySelectorAll(elementSelector)) as HTMLElement[];

		if (!elements.length) return;

		gsap.from(elements, {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power2.out',
			stagger: 0.3,
			scrollTrigger: {
				trigger: elements[0],
				start: 'top 80%',
			},
		});
	});
}

// ============================================
// 3. Scroll items con entrada desde abajo
// ============================================
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
				ease: 'none',
				scrollTrigger: {
					trigger: el,
					start: 'top 100%',
					end: 'top 80%',
					scrub: true,
					markers: false,
				},
			}
		);
	});
}

// ============================================
// 4. Efecto 3D en botones
// ============================================
export function init3DButton(buttonSelector: string): (() => void) | undefined {
	const button = document.querySelector<HTMLButtonElement>(buttonSelector);

	if (!button) {
		console.warn(`No se encontró el botón con el selector: ${buttonSelector}`);
		return;
	}

	// Configurar el botón para 3D
	gsap.set(button, {
		transformStyle: 'preserve-3d',
		transformPerspective: 800,
	});

	const handleMouseMove = (e: MouseEvent): void => {
		const rect = button.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const width = rect.width;
		const height = rect.height;

		// Normalizar posición (0 a 1)
		const normalX = x / width;
		const normalY = y / height;

		// Calcular rotación basada en la posición del mouse
		let rotateY = 0;
		let rotateX = 0;
		let shadowX = 0;
		let shadowY = 0;

		// Dividir el botón en 9 zonas (3x3 grid)
		const zoneX = Math.floor(normalX * 3);
		const zoneY = Math.floor(normalY * 3);

		// Zona superior (Y = 0) - Inclinar hacia adelante
		if (zoneY === 0) {
			rotateX = 20;
			shadowY = -3;

			if (zoneX === 0) {
				rotateY = -15;
				shadowX = -2;
			} else if (zoneX === 2) {
				rotateY = 15;
				shadowX = 2;
			}
		}
		// Zona inferior (Y = 2) - Inclinar hacia atrás
		else if (zoneY === 2) {
			rotateX = -20;
			shadowY = 3;

			if (zoneX === 0) {
				rotateY = -15;
				shadowX = -2;
			} else if (zoneX === 2) {
				rotateY = 15;
				shadowX = 2;
			}
		}
		// Zona media
		else {
			rotateX = 0;
			if (zoneX === 0) {
				rotateY = -15;
				shadowX = -2;
			} else if (zoneX === 2) {
				rotateY = 15;
				shadowX = 2;
			}
		}

		// Animar con GSAP
		gsap.to(button, {
			rotateX: rotateX,
			rotateY: rotateY,
			duration: 0.4,
			ease: 'power2.out',
		});
	};

	const handleMouseLeave = (): void => {
		gsap.to(button, {
			rotateX: 0,
			rotateY: 0,
			x: 0,
			duration: 0.4,
			ease: 'power2.out',
		});
	};

	const handleMouseDown = (): void => {
		gsap.to(button, {
			scale: 0.95,
			duration: 0.1,
			ease: 'power2.out',
		});
	};

	const handleMouseUp = (): void => {
		gsap.to(button, {
			scale: 1,
			duration: 0.2,
			ease: 'elastic.out(1, 0.3)',
		});
	};

	// Agregar event listeners
	button.addEventListener('mousemove', handleMouseMove);
	button.addEventListener('mouseleave', handleMouseLeave);
	button.addEventListener('mousedown', handleMouseDown);
	button.addEventListener('mouseup', handleMouseUp);

	// Función de limpieza
	return () => {
		button.removeEventListener('mousemove', handleMouseMove);
		button.removeEventListener('mouseleave', handleMouseLeave);
		button.removeEventListener('mousedown', handleMouseDown);
		button.removeEventListener('mouseup', handleMouseUp);
	};
}

// ============================================
// 5. Función para inicializar todas las animaciones
// ============================================
export function initAllAnimations(): void {
	// Ejemplo de cómo inicializar todo
	// Ajusta los selectores según tu HTML
	// animateLetters('.hero-title');
	// fadeInSections('section', '.fade-element');
	// scrollItems('.project-card');
	// init3DButton('.cta-button');
}

// Exportar gsap y plugins por si necesitas usarlos directamente
export { gsap, ScrollTrigger, SplitText };
