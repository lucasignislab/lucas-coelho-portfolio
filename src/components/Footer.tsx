import { useEffect, useRef } from "react";
import { useLocalTime } from "@/hooks/use-local-time";
import { useTilt } from "@/hooks/use-tilt";
import { socials } from "@/data/site";
import { revealCharsOnScroll, splitChars } from "@/lib/animations";

/**
 * Footer scalzo:
 *  - Headline: "Vamos criar algo incrivel juntos" (italic serif massivo)
 *  - Location
 *  - Email CTA magnetico
 *  - Local time (live)
 *  - Socials + monograma + copyright (logo/ícone removido)
 *
 * Defesas contra o "bug grotesco de texto cortado":
 *  1. O split usa `splitChars`, que aplica o truque do
 *     `padding-bottom + margin-bottom -0.22em` no `inner` para que
 *     o `overflow:hidden` NAO corte os descendentes ('g','p','q','y','j').
 *  2. O h2 tem line-height folgado (1.15) + padding-bottom (0.4em)
 *     para acomodar fontes serif com descendentes altos.
 *  3. `overflow-visible` em h2 + footer para nenhum pai cortar nada.
 *  4. Por seguranca, o split roda dentro do useEffect com setTimeout
 *     duplo para garantir que o DOM ja foi medido.
 */
export function Footer() {
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useTilt<HTMLAnchorElement>({ max: 8, speed: 400, scale: 1.03 });
	const time = useLocalTime();

	useEffect(() => {
		const el = titleRef.current;
		if (!el) return;

		// Splita em chars com clip seguro para descendentes.
		const chars = splitChars(el, { className: "ft-char", mode: "chars" });

		// Reveal on scroll (stagger suave, scalzo-style).
		revealCharsOnScroll(chars, {
			stagger: 0.025,
			duration: 1,
		});
	}, []);

	return (
		<footer
			id="contact"
			className="section flex flex-col gap-12 md:gap-20"
			style={{ overflow: "visible" }}
		>
			{/* Title — line-height e pb generosos para descendentes */}
			<h2
				ref={titleRef}
				className="font-display italic font-light text-bone text-balance max-w-[90rem]"
				style={{
					lineHeight: 1.15, fontSize: 'clamp(2rem, 5vw, 4rem)',
					paddingBottom: "0.4em",
					overflow: "visible",
				}}
			>
				Vamos criar algo incrivel juntos.
			</h2>

			{/* Location + Email CTA */}
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
				<p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">
					Baseado no Brasil — trabalhando remoto no mundo todo
				</p>

				<a
					ref={ctaRef}
					href="mailto:lucascoelho.cps@gmail.com"
					data-cursor-hover
					className="group inline-flex items-center gap-3 text-2xl md:text-4xl font-display text-bone hover:text-ember transition-colors duration-500 will-change-transform"
				>
					<span className="font-display italic">→</span>
					<span className="link-underline">Envie um e-mail</span>
				</a>
			</div>

			{/* Local time */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-bone/10">
				<div className="flex items-baseline gap-3 font-mono text-sm uppercase tracking-[0.2em] text-ash">
					<span>local time ►</span>
					<span className="text-bone font-medium text-2xl tracking-tight font-display">
						{time.h}
						<span className="animate-pulse-slow">:</span>
						{time.m}{" "}
						<span className="text-ash text-sm ml-1">{time.ampm}</span>
					</span>
				</div>

				{/* Socials */}
				<ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
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

			{/* Bottom: monograma + copyright (sem logo) */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-bone/10">
				<span className="font-mono text-xs uppercase tracking-[0.2em] text-bone">
					LC
				</span>

				<p className="font-mono text-xs uppercase tracking-[0.2em] text-ash text-right">
					<span className="block">© {new Date().getFullYear()} Lucas Coelho.</span>
					<span className="block">Feito com amor por mim.</span>
				</p>
			</div>
		</footer>
	);
}
