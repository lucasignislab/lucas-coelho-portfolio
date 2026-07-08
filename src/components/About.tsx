import { useEffect, useRef } from "react";
import { revealOnScroll, parallaxImage } from "@/lib/animations";

/**
 * About — DNA scalzo:
 *  - Eyebrow "About ►"
 *  - Texto justificado uppercase (NAO split! senao quebra o text-align: justify)
 *  - Portrait com parallax on scroll
 *
 *  Por que nao usamos useSplitText aqui: a classe `.text-block` aplica
 *  text-align: justify + hyphens + uppercase, que precisa de fluxo de texto
 *  continuo. Splitar por chars/words cria atomos inline-block que o
 *  algoritmo de justify trata como palavras separadas, destruindo o layout.
 *  Usamos um fade-up do elemento inteiro, que casa com a estetica editorial.
 */
export function About() {
	const textRef = useRef<HTMLParagraphElement | null>(null);
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
			<p className="eyebrow">About ►</p>

			{/* Big justified text — paragrafo continuo, sem split */}
			<p
				ref={textRef}
				className="text-block text-xl md:text-2xl lg:text-3xl leading-[1.4] text-bone/90 max-w-7xl"
			>
				Apaixonado por arte & design, ajudo empresas e marcas ao redor do
				mundo a criar soluções digitais únicas e memoráveis. Mantenho as
				<br />
				coisas simples, criando experiências limpas e emocionantes.
			</p>

			{/* Portrait com parallax on scroll */}
			<div
				ref={imageContainerRef}
				className="image-reveal mt-12 w-full md:w-1/2 aspect-[3/4] rounded-sm overflow-hidden"
			>
				<img
					src="/lovable-uploads/eu2.png"
					alt="Lucas Coelho"
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
