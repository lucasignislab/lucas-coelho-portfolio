import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/projects";

export function SelectedWork() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!sectionRef.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			gsap.from(".work-heading > *", {
				opacity: 0,
				y: 45,
				duration: 0.9,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".work-heading",
					start: "top 82%",
					once: true,
				},
			});

			gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
				const image = card.querySelector("img");
				const direction = index % 2 === 0 ? -45 : 45;

				gsap.fromTo(
					card,
					{ y: 90, x: direction, opacity: 0 },
					{
						y: 0,
						x: 0,
						opacity: 1,
						duration: 1.05,
						ease: "power3.out",
						scrollTrigger: {
							trigger: card,
							start: "top 86%",
							once: true,
						},
					}
				);

				if (image) {
					gsap.fromTo(
						image,
						{ scale: 1.13 },
						{
							scale: 1,
							duration: 1.4,
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 86%",
								once: true,
							},
						}
					);
				}
			});
		}, sectionRef);

		return () => context.revert();
	}, []);

	return (
		<section ref={sectionRef} id="work" className="section work-section">
			<div className="work-heading">
				<div>
					<p className="work-kicker">
						<span>Selected work</span>
						<span>{String(projects.length).padStart(2, "0")} projetos</span>
					</p>
					<h2>
						<span>Projetos</span>
						<strong>selecionados</strong>
					</h2>
				</div>
				<p className="work-intro">
					Uma seleção de produtos digitais em que estratégia, identidade e
					interface trabalham juntas para tornar decisões mais simples.
				</p>
			</div>

			<div className="projects-editorial">
				{projects.map((p, i) => {
					const href = p.caseUrl ?? p.url;
					const isInternal = Boolean(p.caseUrl);

					return (
						<article
							key={p.id}
							className={`project-card project-card-${i + 1} group`}
						>
							<a
								href={href}
								target={isInternal ? undefined : "_blank"}
								rel={isInternal ? undefined : "noopener noreferrer"}
								data-cursor-hover
								aria-label={`${isInternal ? "Ler case" : "Visitar"} ${p.name}${
									isInternal ? "" : " (abre em uma nova aba)"
								}`}
								className="project-link"
							>
								<div
									className={`project-media ${
										p.id === "aero"
											? "project-media-landscape"
											: "project-media-wide"
									}`}
								>
									<img
										src={p.image}
										alt={p.name}
										width="1024"
										height="576"
										className="project-image"
										loading="lazy"
									/>
									<span className="project-shade" aria-hidden="true" />
									<span className="project-index" aria-hidden="true">
										/{String(i + 1).padStart(2, "0")}
									</span>
									<span className="project-open" aria-hidden="true">
										{isInternal ? "→" : "↗"}
									</span>
								</div>

								<div className="project-info">
									<div className="project-meta">
										<span>{p.year}</span>
										<span>{p.type}</span>
									</div>

									<div className="project-title-row">
										<h3>{p.name}</h3>
										<span>{p.subtitle}</span>
									</div>

									<p className="project-description">
										{p.description}
									</p>

									<span className="project-action">
										{isInternal ? "Ler case completo" : "Visitar projeto"}
										<i aria-hidden />
									</span>
								</div>
							</a>
						</article>
					);
				})}
			</div>
		</section>
	);
}
