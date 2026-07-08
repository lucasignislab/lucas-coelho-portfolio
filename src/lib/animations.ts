import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal por char (split text) — DNA scalzo
 * Cada char/word sobe e aparece com stagger
 */
export function revealChars(
	container: HTMLElement | null,
	options: { stagger?: number; duration?: number; y?: number; delay?: number } = {}
) {
	if (!container) return;
	const { stagger = 0.02, duration = 0.8, y = 40, delay = 0 } = options;
	const chars = container.querySelectorAll<HTMLElement>(".split-char");
	if (!chars.length) return;

	gsap.fromTo(
		chars,
		{ yPercent: 100, opacity: 0 },
		{
			yPercent: 0,
			opacity: 1,
			duration,
			stagger,
			delay,
			ease: "power4.out",
		}
	);
}

/**
 * Reveal por palavra (split text) — alternativa ao char
 */
export function revealWords(
	container: HTMLElement | null,
	options: { stagger?: number; duration?: number; y?: number; delay?: number } = {}
) {
	if (!container) return;
	const { stagger = 0.04, duration = 1, y = 30, delay = 0 } = options;
	const words = container.querySelectorAll<HTMLElement>(".split-word");
	if (!words.length) return;

	gsap.fromTo(
		words,
		{ y, opacity: 0 },
		{ y: 0, opacity: 1, duration, stagger, delay, ease: "power3.out" }
	);
}

/**
 * Reveal on scroll (section fade-up)
 */
export function revealOnScroll(
	element: HTMLElement | null,
	options: { y?: number; duration?: number; delay?: number; start?: string } = {}
) {
	if (!element) return;
	const { y = 60, duration = 1, delay = 0, start = "top 80%" } = options;

	gsap.fromTo(
		element,
		{ y, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration,
			delay,
			ease: "power3.out",
			scrollTrigger: {
				trigger: element,
				start,
				toggleActions: "play none none none",
			},
		}
	);
}

/**
 * Reveal stagger de múltiplos elementos ao scroll
 */
export function revealStagger(
	container: HTMLElement | null,
	selector: string,
	options: { y?: number; stagger?: number; duration?: number; start?: string } = {}
) {
	if (!container) return;
	const { y = 40, stagger = 0.1, duration = 0.8, start = "top 80%" } = options;
	const items = container.querySelectorAll<HTMLElement>(selector);
	if (!items.length) return;

	gsap.fromTo(
		items,
		{ y, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration,
			stagger,
			ease: "power3.out",
			scrollTrigger: {
				trigger: container,
				start,
				toggleActions: "play none none none",
			},
		}
	);
}

/**
 * Parallax em imagem
 */
export function parallaxImage(
	container: HTMLElement | null,
	options: { strength?: number } = {}
) {
	if (!container) return;
	const { strength = 0.1 } = options;
	const img = container.querySelector("img");
	if (!img) return;

	gsap.fromTo(
		img,
		{ y: -30 * strength * 10, scale: 1.1 },
		{
			y: 30 * strength * 10,
			scale: 1.1,
			ease: "none",
			scrollTrigger: {
				trigger: container,
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			},
		}
	);
}

/**
 * Magnetic button — atrai o cursor
 */
export function makeMagnetic(
	el: HTMLElement | null,
	strength: number = 0.3
) {
	if (!el) return () => {};

	const onMove = (e: MouseEvent) => {
		const rect = el.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
	};
	const onLeave = () => {
		gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
	};

	el.addEventListener("mousemove", onMove);
	el.addEventListener("mouseleave", onLeave);

	return () => {
		el.removeEventListener("mousemove", onMove);
		el.removeEventListener("mouseleave", onLeave);
	};
}

/**
 * Refresh ScrollTrigger (usar após mudanças de layout)
 */
export function refreshScrollTrigger() {
	ScrollTrigger.refresh();
}
