import { useEffect, useRef } from "react";
import { revealOnScroll, parallaxImage } from "@/lib/animations";

/**
 * Sobre — bloco editorial com largura de leitura controlada:
 *  - Eyebrow "Sobre ►"
 *  - Dois parágrafos alinhados à esquerda, sem hifenização
 *  - Portrait com parallax on scroll
 */
export function About() {
	const textRef = useRef<HTMLDivElement | null>(null);
	const imageContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		revealOnScroll(textRef.current, { y: 30, duration: 1 });
		if (imageContainerRef.current) {
			parallaxImage(imageContainerRef.current, { strength: 0.05 });
		}
	}, []);

	return (
		<section id="about" className="section flex flex-col gap-12">
			{/* Eyebrow */}
			<p className="eyebrow">Sobre ►</p>

			<div ref={textRef} className="about-copy">
				<p>
					Desde 2017, ajudo empresas e marcas a transformar ideias complexas
					em experiências digitais claras e memoráveis.
				</p>
				<p>
					Aproximo estratégia, identidade e interface para criar trabalhos que
					comunicam valor e facilitam a próxima decisão.
				</p>
			</div>

			{/* Portrait com parallax on scroll */}
			<div
				ref={imageContainerRef}
				className="image-reveal mt-12 w-full md:w-1/2 aspect-[3/4] rounded-sm overflow-hidden"
			>
				<img
					src="/lovable-uploads/eu2.webp"
					alt="Retrato de Lucas Coelho, designer digital"
					width="1024"
					height="1024"
					className="w-full h-full object-cover scale-110"
					loading="lazy"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).style.display = "none";
					}}
				/>
			</div>
		</section>
	);
}
