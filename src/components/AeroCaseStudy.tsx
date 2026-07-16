import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";
import { AeroHeroScene } from "@/components/AeroHeroScene";
import { AeroInteractivePanel } from "@/components/AeroInteractivePanel";
import { AeroDesignSystemPanel } from "@/components/AeroDesignSystemPanel";

gsap.registerPlugin(ScrollTrigger);

const panels = [
	{
		src: "/cases/aero/01-abertura.png",
		alt: "Abertura do case Aero com resumo, papel, duração e imagem do produto.",
	},
	{
		src: "/cases/aero/02-desafio.png",
		alt: "O desafio do Aero: muitos cliques, troca de contexto e excesso visual.",
	},
	{
		src: "/cases/aero/03-principios.png",
		alt: "Princípios do produto: fricção zero, densidade útil e keyboard-first.",
	},
	{
		src: "/cases/aero/04-publicos.png",
		alt: "Necessidades de builders e product managers consideradas no Aero.",
	},
	{
		src: "/cases/aero/05-command-menu.png",
		alt: "Command Menu criado para acessar ações e destinos rapidamente.",
	},
	{
		src: "/cases/aero/06-drawer.png",
		alt: "Drawer lateral que preserva o contexto do quadro durante a edição.",
	},
	{
		src: "/cases/aero/07-design-system.png",
		alt: "Sistema visual do Aero com superfícies escuras e cores semânticas.",
	},
	{
		src: "/cases/aero/08-implementacao.png",
		alt: "Stack de implementação e recursos de acessibilidade do Aero.",
	},
	{
		src: "/cases/aero/09-aprendizados.png",
		alt: "Aprendizados do projeto autoral Aero.",
	},
	{
		src: "/cases/aero/10-encerramento.png",
		alt: "Encerramento do case Aero e endereço do produto publicado.",
	},
];

const interactivePanels = {
	1: "challenge",
	2: "principles",
	3: "audiences",
	8: "learnings",
} as const;

export function AeroCaseStudy() {
	const caseRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		const previousTitle = document.title;
		const description = document.querySelector<HTMLMetaElement>(
			'meta[name="description"]'
		);
		const canonical =
			document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		const previousDescription = description?.content;
		const previousCanonical = canonical?.href;

		document.title = "Aero — Product Design Case Study | Lucas Coelho";
		if (description) {
			description.content =
				"Case autoral e solo de product design: estratégia, UX/UI, prototipação e desenvolvimento do Aero, um SaaS de gestão de projetos keyboard-first.";
		}
		if (canonical) {
			canonical.href = "https://lucascoelhoux.site/projetos/aero";
		}

		return () => {
			document.title = previousTitle;
			if (description && previousDescription) {
				description.content = previousDescription;
			}
			if (canonical && previousCanonical) {
				canonical.href = previousCanonical;
			}
		};
	}, []);

	useLayoutEffect(() => {
		const root = caseRef.current;
		if (!root) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		if (reducedMotion) return;

		const context = gsap.context(() => {
			const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
			opening
				.from(".aero-case-header", { opacity: 0, y: -24, duration: 0.7 })
				.from(
					".aero-hero-reveal",
					{ opacity: 0, yPercent: 110, duration: 1, stagger: 0.09 },
					"-=0.35"
				)
				.from(
					".aero-case-lead",
					{ opacity: 0, y: 28, duration: 0.8 },
					"-=0.55"
				)
				.from(
					".aero-case-facts > div",
					{ opacity: 0, y: 20, duration: 0.55, stagger: 0.07 },
					"-=0.4"
				)
				.from(
					".aero-case-actions > a",
					{ opacity: 0, y: 18, duration: 0.55, stagger: 0.08 },
					"-=0.35"
				)
				.from(
					".aero-3d-scene",
					{ opacity: 0, scale: 0.88, rotateY: -12, duration: 1.25 },
					0.25
				);

			gsap.from(".aero-case-intro > *", {
				scrollTrigger: {
					trigger: ".aero-case-intro",
					start: "top 78%",
					once: true,
				},
				opacity: 0,
				y: 55,
				duration: 0.85,
				stagger: 0.12,
				ease: "power3.out",
			});

			gsap.utils.toArray<HTMLElement>(".aero-gallery-item").forEach(
				(panel, index) => {
					gsap.fromTo(
						panel,
						{
							opacity: 0,
							y: 95,
							scale: 0.955,
							rotateX: index % 2 === 0 ? 3.5 : -3.5,
						},
						{
							scrollTrigger: {
								trigger: panel,
								start: "top 88%",
								end: "top 42%",
								scrub: 0.8,
							},
							opacity: 1,
							y: 0,
							scale: 1,
							rotateX: 0,
							ease: "none",
						}
					);

					const image = panel.querySelector("img");
					if (image) {
						gsap.to(image, {
							scrollTrigger: {
								trigger: panel,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
							yPercent: index % 2 === 0 ? 2.5 : -2.5,
							ease: "none",
						});
					}
				}
			);

			gsap.utils
				.toArray<HTMLElement>(".aero-interactive-panel")
				.forEach(panel => {
					gsap.from(panel.querySelectorAll(".aero-micro-card"), {
						scrollTrigger: {
							trigger: panel,
							start: "top 72%",
							once: true,
						},
						opacity: 0,
						y: 42,
						scale: 0.96,
						duration: 0.7,
						stagger: 0.1,
						ease: "power3.out",
					});
				});

			gsap.from(".aero-case-closing > *", {
				scrollTrigger: {
					trigger: ".aero-case-closing",
					start: "top 78%",
					once: true,
				},
				opacity: 0,
				y: 48,
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
			});
		}, root);

		return () => context.revert();
	}, []);

	return (
		<div ref={caseRef} className="aero-case">
			<header className="aero-case-header">
				<a href="/#work" className="aero-case-back">
					<span aria-hidden>←</span> Voltar aos projetos
				</a>
				<span className="aero-case-index">Case study / 01</span>
			</header>

			<main>
				<section className="aero-case-hero">
					<div className="aero-case-hero-grid">
						<div className="aero-case-hero-copy">
							<div className="aero-reveal-mask">
								<p className="aero-case-eyebrow aero-hero-reveal">
									Projeto autoral e solo · 2025
								</p>
							</div>
							<h1>
								<span className="aero-reveal-mask">
									<strong className="aero-hero-reveal">Aero</strong>
								</span>
								<span className="aero-reveal-mask">
									<em className="aero-hero-reveal">
										Project Management SaaS
									</em>
								</span>
							</h1>
							<p className="aero-case-lead">
								Um estudo retrospectivo sobre a criação de um ecossistema de
								gestão de projetos keyboard-first, desenhado para reduzir a
								fricção entre ideia, documentação e execução.
							</p>
						</div>
						<AeroHeroScene />
					</div>

					<dl className="aero-case-facts">
						<div>
							<dt>Papel</dt>
							<dd>Estratégia · UX/UI · Prototipação · Front-end</dd>
						</div>
						<div>
							<dt>Duração</dt>
							<dd>2–3 meses</dd>
						</div>
						<div>
							<dt>Natureza</dt>
							<dd>Projeto autoral para uso próprio</dd>
						</div>
						<div>
							<dt>Stack</dt>
							<dd>React · TypeScript · Tailwind · Tiptap</dd>
						</div>
					</dl>

					<div className="aero-case-actions">
						<a
							href="https://aeroprojectmanager.netlify.app/dashboard"
							target="_blank"
							rel="noopener noreferrer"
							className="aero-case-primary"
						>
							Explorar produto ao vivo <span aria-hidden>↗</span>
						</a>
						<a href="#case" className="aero-case-secondary">
							Ler o case <span aria-hidden>↓</span>
						</a>
					</div>
					<div className="aero-case-scroll" aria-hidden="true">
						<span>Scroll to explore</span>
						<i />
					</div>
				</section>

				<section id="case" className="aero-case-intro" aria-labelledby="case-title">
					<p>Retrospective product case study</p>
					<h2 id="case-title">
						Decisões reais reconstruídas a partir do produto funcional.
					</h2>
					<p>
						Este case não apresenta uma pesquisa formal que não aconteceu.
						Ele organiza retrospectivamente as hipóteses, decisões de
						interface, sistema visual e aprendizados que orientaram a
						construção do Aero.
					</p>
				</section>

				<section className="aero-case-gallery" aria-label="Painéis do case Aero">
					{panels.map((panel, index) => {
						const interactiveKind =
							interactivePanels[index as keyof typeof interactivePanels];

						if (index === 6) {
							return <AeroDesignSystemPanel key={panel.src} />;
						}

						if (interactiveKind) {
							return (
								<AeroInteractivePanel
									key={panel.src}
									kind={interactiveKind}
								/>
							);
						}

						return (
							<figure key={panel.src} className="aero-gallery-item">
								<span className="aero-panel-number" aria-hidden="true">
									{String(index + 1).padStart(2, "0")}
								</span>
								<img
									src={panel.src}
									alt={panel.alt}
									width="1400"
									height="940"
									loading={index === 0 ? "eager" : "lazy"}
								/>
							</figure>
						);
					})}
				</section>

				<section className="aero-case-closing">
					<p className="aero-case-eyebrow">Próximo passo</p>
					<h2>Tem um produto complexo que precisa parecer simples?</h2>
					<p>
						Posso ajudar a organizar a estratégia, transformar fluxos em uma
						interface clara e acompanhar a implementação.
					</p>
					<div className="aero-case-actions">
						<a
							href={`mailto:${contactEmail}?subject=Quero conversar sobre um projeto digital`}
							className="aero-case-primary"
						>
							Conversar sobre um projeto <span aria-hidden>→</span>
						</a>
						<a href="/#work" className="aero-case-secondary">
							Ver outros projetos
						</a>
					</div>
				</section>
			</main>

			<footer className="aero-case-footer">
				<span>Lucas Coelho · Digital Designer</span>
				<span>Case study / 2025</span>
			</footer>
		</div>
	);
}
