import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

interface TiltOptions {
	max?: number;
	speed?: number;
	perspective?: number;
	scale?: number;
	reverse?: boolean;
	glare?: boolean;
	"max-glare"?: number;
}

/**
 * Wrapper React para VanillaTilt. Anexa o efeito 3D tilt ao elemento.
 */
export function useTilt<T extends HTMLElement = HTMLElement>(options: TiltOptions = {}) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		VanillaTilt.init(el, {
			max: 8,
			speed: 600,
			perspective: 1000,
			scale: 1.02,
			...options,
		});
		return () => {
			// @ts-expect-error vanillaTilt adiciona destroy
			el?.vanillaTilt?.destroy?.();
		};
	}, [options]);

	return ref;
}
