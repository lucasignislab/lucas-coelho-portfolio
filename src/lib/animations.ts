import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Divide o conteúdo textual de um elemento em chars/words
 * usando a estrutura Wrap/Inner com clip seguro para descendentes.
 *
 * Por que padding-bottom + margin-bottom -0.22em no `inner`:
 *   - line-height editorial é 0.85-0.95 (bem apertado).
 *   - Sem o padding, o overflow:hidden do `inner` come os descendentes
 *     de letras como 'g', 'p', 'q', 'y' (causa dos bugs grotescos
 *     de texto cortado).
 *   - O padding empurra a area visivel para baixo e o margin negativo
 *     compensa exatamente o mesmo valor, mantendo o line-height visual.
 *   - O `wrap` nao tem overflow:hidden para o `inner` poder crescer
 *     verticalmente sem cortar os descendentes.
 *
 * Estrutura final por token:
 *   <el> (parent, sem mexer no display)
 *     <wrap>  (display:inline-block, line-height:inherit)
 *       <inner .split-char|.split-word|ft-char> (display:inline-block, overflow:hidden,
 *                                                line-height:inherit, padding-bottom:0.22em,
 *                                                margin-bottom:-0.22em)
 *         TEXT
 *       </inner>
 *     </wrap>
 *   </el>
 */
export function splitChars(
	el: HTMLElement,
	options: { className?: string; mode?: "chars" | "words" } = {}
): HTMLElement[] {
	const { className = "split-char", mode = "chars" } = options;
	const text = el.textContent ?? "";
	const tokens: string[] =
		mode === "words"
			? text.split(/(\s+)/) // mantém espaços
			: Array.from(text);

	el.innerHTML = "";

	const created: HTMLElement[] = [];
	tokens.forEach((token) => {
		if (mode === "words" && /^\s+$/.test(token)) {
			el.appendChild(document.createTextNode(token));
			return;
		}

		const wrap = document.createElement("span");
		wrap.style.display = "inline-block";
		wrap.style.lineHeight = "inherit";

		const inner = document.createElement("span");
		inner.className = className;
		inner.style.display = "inline-block";
		inner.style.overflow = "hidden";
		inner.style.lineHeight = "inherit";
		inner.style.paddingBottom = "0.22em";
		inner.style.marginBottom = "-0.22em";
		inner.style.willChange = "transform, opacity";
		inner.textContent =
			mode === "words" ? token : token === " " ? "\u00A0" : token;

		wrap.appendChild(inner);
		el.appendChild(wrap);
		created.push(inner);
	});

	return created;
}

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
 * Reveal char-by-char ao entrar no viewport (com ScrollTrigger)
 */
export function revealCharsOnScroll(
	chars: HTMLElement[] | NodeListOf<HTMLElement>,
	options: { stagger?: number; duration?: number; delay?: number; start?: string } = {}
) {
	const arr = Array.from(chars);
	if (!arr.length) return;
	const { stagger = 0.025, duration = 1, delay = 0, start = "top 85%" } = options;

	gsap.fromTo(
		arr,
		{ yPercent: 100, opacity: 0 },
		{
			yPercent: 0,
			opacity: 1,
			duration,
			stagger,
			delay,
			ease: "power4.out",
			scrollTrigger: {
				trigger: arr[0]?.closest("h2, h1, p") ?? arr[0],
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
