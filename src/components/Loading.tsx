import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/hooks/use-loading";
import { Logo } from "@/components/Logo";

/**
 * Tela de loading com progresso 0-100% + logo SVG.
 * DNA do scalzodesign.be.
 *
 * Fallbacks de seguranca:
 *  - Safety timeout no useLoading garante que isLoading vira false
 *  - CSS transition faz o slide-up mesmo se GSAP falhar
 *  - Apos slide, seta display:none e libera o scroll
 */
export function Loading() {
	const { isLoading, progress } = useLoading(1800);
	const screenRef = useRef<HTMLDivElement | null>(null);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		if (!isLoading && screenRef.current && !hidden) {
			const el = screenRef.current;
			try {
				gsap.to(el, {
					yPercent: -100,
					duration: 1,
					ease: "power4.inOut",
					onComplete: () => {
						el.style.display = "none";
						setHidden(true);
						document.body.style.overflow = "";
					},
				});
			} catch (err) {
				// Fallback CSS caso GSAP falhe em algum edge case
				console.warn("[Loading] gsap fallback:", err);
				el.style.transition = "transform 1s cubic-bezier(0.7, 0, 0.3, 1)";
				el.style.transform = "translateY(-100%)";
				setTimeout(() => {
					el.style.display = "none";
					setHidden(true);
					document.body.style.overflow = "";
				}, 1100);
			}
		}
	}, [isLoading, hidden]);

	// Trava scroll enquanto loading
	useEffect(() => {
		if (isLoading) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isLoading]);

	if (hidden) return null;

	return (
		<div
			ref={screenRef}
			className="loading-screen flex items-center justify-between px-8 md:px-16"
			style={{ backgroundColor: "#212121" }}
		>
			{/* Left: % */}
			<p className="font-mono text-sm uppercase tracking-[0.2em] text-bone">
				<span>{String(progress).padStart(2, "0")}</span>%
			</p>

			{/* Center: Logo */}
			<Logo />

			{/* Right: % */}
			<p className="font-mono text-sm uppercase tracking-[0.2em] text-bone">
				<span>{String(progress).padStart(2, "0")}</span>%
			</p>
		</div>
	);
}
