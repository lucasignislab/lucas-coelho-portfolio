import { useEffect, useRef } from "react";
import { useSplitText } from "@/hooks/use-split-text";
import { revealOnScroll } from "@/lib/animations";
import { services } from "@/data/services";

/**
 * Serviços: texto serif grande com separadores entre as ofertas.
 */
export function Skills() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const textRef = useSplitText<HTMLSpanElement>({ mode: "words" });

	useEffect(() => {
		revealOnScroll(textRef.current, { y: 30, duration: 1 });
	}, [textRef]);

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="section flex flex-col gap-12"
		>
			<p className="eyebrow">Serviços ►</p>

			<h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-bone leading-[1.2] text-balance max-w-7xl">
				Quais serviços posso oferecer?
			</h2>
			<p
				ref={textRef}
				className="font-display italic text-3xl md:text-5xl lg:text-6xl text-bone/85 leading-[1.2] text-balance max-w-7xl"
			>
				{services.map((service, index) => (
					<span key={service.path}>
						{index > 0 && " · "}
						<a href={service.path} className="link-underline">
							{service.label}
						</a>
					</span>
				))}
			</p>
			<p className="max-w-2xl text-bone/80 text-lg leading-relaxed">
				Do primeiro direcionamento visual à entrega da interface, cada projeto
				é pensado para unir personalidade, clareza e resultado.
			</p>
			<p className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70">
				📍 Atendimento em Campinas e região:{" "}
				<a href="/criacao-de-sites-campinas/" className="text-bone link-underline">
					criação de sites em Campinas
				</a>
			</p>
		</section>
	);
}
