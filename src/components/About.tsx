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
	const detailsRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		revealOnScroll(textRef.current, { y: 30, duration: 1 });
		revealOnScroll(detailsRef.current, { y: 30, duration: 1, delay: 0.15 });
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

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-12 items-stretch">
				{/* Portrait com parallax on scroll */}
				<div
					ref={imageContainerRef}
					className="image-reveal lg:col-span-6 aspect-[4/5] rounded-sm overflow-hidden"
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

				<div
					ref={detailsRef}
					className="lg:col-span-6 flex flex-col justify-between border-t border-bone/15 pt-8"
				>
					<div className="max-w-2xl">
						<p className="eyebrow mb-8">Minha abordagem ►</p>
						<h3 className="font-display italic text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone text-balance">
							Meu trabalho começa antes da interface.
						</h3>
						<p className="mt-6 text-base md:text-lg leading-relaxed text-bone/70 max-w-xl">
							Entendo o negócio, organizo a mensagem e traduzo tudo em uma
							experiência digital clara, distinta e pronta para evoluir.
						</p>
					</div>

					<ol className="about-principles">
						<li>
							<span>01</span>
							<div>
								<h4>Estratégia</h4>
								<p>
									O que precisa ser comunicado e qual decisão queremos
									facilitar.
								</p>
							</div>
						</li>
						<li>
							<span>02</span>
							<div>
								<h4>Identidade</h4>
								<p>
									Uma linguagem visual que reconhece a personalidade de cada
									marca.
								</p>
							</div>
						</li>
						<li>
							<span>03</span>
							<div>
								<h4>Interface</h4>
								<p>
									Experiências simples, consistentes e preparadas para a
									implementação.
								</p>
							</div>
						</li>
					</ol>

					<a
						href="#contact"
						className="mt-10 inline-flex self-start items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-bone link-underline"
					>
						Conversar sobre um projeto <span aria-hidden>→</span>
					</a>
				</div>
			</div>
		</section>
	);
}
