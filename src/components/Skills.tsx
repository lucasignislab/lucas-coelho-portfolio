import { useEffect, useRef } from "react";
import { useSplitText } from "@/hooks/use-split-text";
import { revealOnScroll } from "@/lib/animations";
import { services } from "@/data/site";

/**
 * Serviços — texto serif grande com em-dashes separando as ofertas.
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
				<span ref={textRef} className="font-display italic text-bone/85">
					{services.join(" — ")}
				</span>
			</h2>
			<p className="max-w-2xl text-bone/80 text-lg leading-relaxed">
				Do primeiro direcionamento visual à entrega da interface, cada projeto
				é pensado para unir personalidade, clareza e resultado.
			</p>
		</section>
	);
}
