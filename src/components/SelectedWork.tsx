import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/projects";

/**
 * Selected Work — gallery grid editorial (Scalzo-inspired):
 *  - Header: "Selected" (italic serif) + "WORK" (bold sans, ultratight)
 *    no mesmo tamanho do titulo da Hero (clamp 2.75rem–7.5rem)
 *  - 2-column grid of large project cards
 *  - Each card: image (top, rounded) + project info (bottom)
 *    - Row 1: "PROJECT /0X" (left) | categories (right)
 *    - Row 2: project name (left) | arrow (right)
 */
export function SelectedWork() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!sectionRef.current) return;
		const cards = sectionRef.current.querySelectorAll(".project-card");
		gsap.fromTo(
			cards,
			{ y: 80, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1.1,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
					toggleActions: "play none none none",
				},
			}
		);
	}, []);

	return (
		<section ref={sectionRef} id="work" className="section relative">
			{/* Header */}
			<div className="mb-16 md:mb-24 overflow-visible">
				<h2 className="leading-[1.05] text-bone overflow-visible">
					<span className="block font-display italic font-light text-[clamp(2.75rem,8.5vw,7.5rem)]">
						Selected
					</span>
					<span className="block font-sans not-italic font-medium tracking-ultratight text-[clamp(2.75rem,8.5vw,7.5rem)] mt-2 md:mt-4 text-bone/95">
						WORK
					</span>
				</h2>
			</div>

			{/* Projects grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24">
				{projects.map((p, i) => (
					<a
						key={p.id}
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						data-cursor-hover
						className="project-card group block"
					>
						{/* Image */}
						<div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-smoke mb-6 flex items-center justify-center">
							<img
								src={p.image}
								alt={p.name}
								className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
								loading="lazy"
							/>
						</div>

						{/* Project info */}
						<div className="border-t border-bone/15 pt-5">
							<div className="flex items-baseline justify-between gap-4 mb-3">
								<span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
									Project /{String(i + 1).padStart(2, "0")}
								</span>
								<span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash text-right">
									{p.subtitle}
								</span>
							</div>
							<div className="flex items-center justify-between gap-4">
								<h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-ultratight text-bone group-hover:text-ember transition-colors duration-500 min-w-0">
									{p.name}
								</h3>
								<span className="font-display text-2xl md:text-3xl text-ember/70 transition-transform duration-500 group-hover:translate-x-2 flex-shrink-0">
									→
								</span>
							</div>
						</div>
					</a>
				))}
			</div>
		</section>
	);
}
