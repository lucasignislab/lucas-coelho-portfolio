import { useEffect, useRef, useState } from "react";

/**
 * Cursor customizado em forma de triangulo isosceles.
 * DNA do scalzodesign.be — pequeno, com mix-blend-difference e lerp suave.
 * Esconde em dispositivos touch.
 *
 * Erro-safe: se algo falhar (matchMedia, refs, etc), o componente
 * simplesmente nao renderiza o cursor, sem quebrar a app.
 */
export function Cursor() {
	const cursorRef = useRef<HTMLDivElement | null>(null);
	const [hidden, setHidden] = useState(true);
	const [hover, setHover] = useState(false);

	useEffect(() => {
		try {
			// Esconde em touch ou se matchMedia nao existir
			if (typeof window === "undefined" || !window.matchMedia) return;
			if (window.matchMedia("(pointer: coarse)").matches) return;

			setHidden(false);
			const el = cursorRef.current;
			if (!el) return;

			let mouseX = window.innerWidth / 2;
			let mouseY = window.innerHeight / 2;
			let curX = mouseX;
			let curY = mouseY;
			let raf = 0;

			const onMove = (e: MouseEvent) => {
				mouseX = e.clientX;
				mouseY = e.clientY;
			};
			const onOver = (e: MouseEvent) => {
				try {
					const target = e.target as HTMLElement;
					if (
						target?.closest("a, button, [data-cursor-hover], input, textarea, label")
					) {
						setHover(true);
					} else {
						setHover(false);
					}
				} catch {
					/* noop */
				}
			};
			const onLeave = () => setHidden(true);
			const onEnter = () => setHidden(false);

			const tick = () => {
				curX += (mouseX - curX) * 0.18;
				curY += (mouseY - curY) * 0.18;
				el.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%) scale(${
					hover ? 2 : 1
				})`;
				raf = requestAnimationFrame(tick);
			};

			window.addEventListener("mousemove", onMove, { passive: true });
			window.addEventListener("mouseover", onOver, { passive: true });
			document.documentElement.addEventListener("mouseleave", onLeave);
			document.documentElement.addEventListener("mouseenter", onEnter);
			raf = requestAnimationFrame(tick);

			return () => {
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("mouseover", onOver);
				document.documentElement.removeEventListener("mouseleave", onLeave);
				document.documentElement.removeEventListener("mouseenter", onEnter);
				cancelAnimationFrame(raf);
			};
		} catch (err) {
			// Silencioso: se algo falhar, cursor simplesmente nao aparece
			console.warn("[Cursor] init failed:", err);
			return undefined;
		}
		// hover intencionalmente fora das deps — NAO queremos re-init quando hover muda
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (hidden) return null;

	return (
		<div
			ref={cursorRef}
			aria-hidden
			className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference will-change-transform"
			style={{ transform: "translate(-50%, -50%)" }}
		>
			<svg
				width="14"
				height="16"
				viewBox="0 0 14 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-bone"
			>
				<path d="M1 0L13 8L1 16L1 0Z" fill="currentColor" />
			</svg>
		</div>
	);
}
