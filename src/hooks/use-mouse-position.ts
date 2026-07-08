import { useEffect, useRef } from "react";

/**
 * Rastreia a posição do mouse usando lerp (linear interpolation)
 * para movimento suave. Retorna refs com x/y em pixels.
 */
export function useMousePosition() {
	const position = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			position.current.x = e.clientX;
			position.current.y = e.clientY;
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	return position;
}
