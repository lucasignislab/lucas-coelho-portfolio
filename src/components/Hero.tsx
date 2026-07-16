import { useEffect, useRef } from "react";
import { useSplitText } from "@/hooks/use-split-text";
import { gsap } from "gsap";
import { revealChars, revealOnScroll, revealStagger } from "@/lib/animations";
import { credibilityItems, socials } from "@/data/site";

/**
 * Hero / Intro — DNA scalzodesign.be (rebuilt to match reference):
 *  - Topo esquerda  : disponibilidade + localização
 *  - Topo direita   : paragrafo justificado uppercase mono
 *  - Inferior       : Title com animacao simples (sem split-text:
 *                     o split-text cortava os descendentes do 'g'/'p'/'y'
 *                     mesmo com padding, por isso o titulo agora anima
 *                     linha-a-linha direto)
 *  - Rodape         : CTAs, sinais de confiança e redes profissionais
 */
export function Hero() {
	const baseline1 = useSplitText<HTMLSpanElement>({ mode: "chars" });
	const baseline2 = useSplitText<HTMLSpanElement>({ mode: "chars" });
	const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
	const titleLine2Ref = useRef<HTMLSpanElement | null>(null);
	const leadRef = useRef<HTMLParagraphElement | null>(null);
	const socialsRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		// Eyebrows animam por char (linhas curtas — stagger e o charme)
		setTimeout(() => {
			revealChars(baseline1.current, { stagger: 0.02, duration: 0.7 });
			revealChars(baseline2.current, { stagger: 0.02, duration: 0.7, delay: 0.1 });
		}, 100);

		// Lead: fade-up do paragrafo inteiro (nao split!).
		revealOnScroll(leadRef.current, { y: 30, duration: 0.9, delay: 0.3 });

		// Title — animacao simples (sem split) para evitar cortar
		// os descendentes do 'g'/'p'/'y' que a abordagem split-text
		// sofria por causa do overflow:hidden + line-height apertado.
		if (titleLine1Ref.current) {
			gsap.fromTo(
				titleLine1Ref.current,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
			);
		}
		if (titleLine2Ref.current) {
			gsap.fromTo(
				titleLine2Ref.current,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1, delay: 0.45, ease: "power3.out" }
			);
		}

		// Socials
		if (socialsRef.current) {
			revealStagger(socialsRef.current, "li", { y: 20, stagger: 0.1, duration: 0.7 });
		}
	}, [baseline1, baseline2]);

	return (
		<section id="top" className="section min-h-screen flex flex-col pt-32 md:pt-40 overflow-visible">
			{/* Top row: eyebrow (left) + bio paragraph (right) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start">
				<div className="lg:col-span-4 flex flex-col gap-2">
					<span ref={baseline1} className="eyebrow">
						Disponível para projetos
					</span>
					<span ref={baseline2} className="eyebrow">
						Campinas, Brasil
					</span>
				</div>
				<p
					ref={leadRef}
					className="lg:col-span-5 lg:col-start-8 font-mono text-[11px] md:text-xs leading-[1.6] text-bone/80 uppercase tracking-[0.05em] text-justify hyphens-auto indent-0"
				>
					Crio marcas e experiências digitais que tornam negócios mais claros,
					desejáveis e preparados para converter.
				</p>
			</div>

			{/* Title — pushed to bottom of available space */}
			<div className="flex-1 flex flex-col justify-end overflow-visible">
				<h1 className="text-[clamp(2.75rem,8.5vw,7.5rem)] text-bone mt-12 md:mt-16 leading-[1.05] overflow-visible">
					<span
						ref={titleLine1Ref}
						className="block font-display italic font-light"
					>
						Lucas Coelho
					</span>
					<span
						ref={titleLine2Ref}
						className="block font-sans not-italic font-medium tracking-ultratight mt-2 md:mt-4 text-bone/95"
					>
						Designer Digital
					</span>
				</h1>
			</div>

			<div className="mt-12 md:mt-16 flex flex-col gap-10">
				<div className="flex flex-wrap gap-3">
					<a href="#work" className="btn-primary">
						Ver projetos <span aria-hidden>↓</span>
					</a>
					<a href="#contact" className="btn-ghost">
						Conversar sobre um projeto
					</a>
				</div>

				<dl className="credibility-grid">
					{credibilityItems.map((item) => (
						<div key={item.value} className="credibility-item">
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					))}
				</dl>

				<ul
					ref={socialsRef}
					className="flex flex-wrap items-center gap-x-10 md:gap-x-16 gap-y-3"
					aria-label="Redes profissionais"
				>
					{socials.map((s) => (
						<li key={s.name}>
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								data-cursor-hover
								className="font-mono text-xs uppercase tracking-[0.2em] text-bone link-underline"
							>
								{s.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
