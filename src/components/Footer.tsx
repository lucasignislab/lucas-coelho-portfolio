import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocalTime } from "@/hooks/use-local-time";
import { useTilt } from "@/hooks/use-tilt";
import { socials } from "@/data/site";

/**
 * Footer scalzo:
 *  - Headline: "Vamos criar algo incrivel juntos" (italic serif massivo)
 *  - Location
 *  - Email CTA magnetico
 *  - Local time (live)
 *  - Socials + monograma + copyright (logo/ícone removido)
 */

export function Footer() {
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useTilt<HTMLAnchorElement>({ max: 8, speed: 400, scale: 1.03 });
	const time = useLocalTime();

	useEffect(() => {
		if (!titleRef.current) return;
		const chars = titleRef.current.querySelectorAll<HTMLElement>(".ft-char");
		if (!chars.length) {
			const text = titleRef.current.textContent ?? "";
			titleRef.current.innerHTML = "";
			text.split("").forEach((c) => {
				const wrap = document.createElement("span");
				wrap.style.display = "inline-block";
				wrap.style.overflow = "hidden";
				wrap.style.lineHeight = "inherit";

				const inner = document.createElement("span");
				inner.className = "ft-char";
				inner.style.display = "inline-block";
				inner.style.willChange = "transform, opacity";
				inner.textContent = c === " " ? "\u00A0" : c;

				wrap.appendChild(inner);
				titleRef.current!.appendChild(wrap);
			});
		}
		const updated = titleRef.current.querySelectorAll<HTMLElement>(".ft-char");
		gsap.fromTo(
			updated,
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 1,
				duration: 1,
				stagger: 0.025,
				ease: "power4.out",
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			}
		);
	}, []);

	return (
		<footer id="contact" className="section flex flex-col gap-12 md:gap-20">
			{/* Title */}
			<h2
				ref={titleRef}
				className="font-display italic font-light text-huge text-bone leading-[0.95] text-balance max-w-7xl"
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
