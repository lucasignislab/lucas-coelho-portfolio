import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
	{
		name: "Cross Training",
		label: "Força · potência · condicionamento",
		image: "/cases/fitsyou/functional.webp",
		className: "fits-discipline-cross",
	},
	{
		name: "Pilates",
		label: "Controle · postura · flexibilidade",
		image: "/cases/fitsyou/pilates.webp",
		className: "fits-discipline-pilates",
	},
	{
		name: "Yoga & Recovery",
		label: "Respiração · equilíbrio · bem-estar",
		image: "/cases/fitsyou/yoga.webp",
		className: "fits-discipline-yoga",
	},
];

const contentRoutes = [
	"O Studio",
	"Modalidades",
	"Massoterapia",
	"Professores",
	"Horários",
	"Localização",
	"Contato",
];

const marqueeWords = [
	"Strength",
	"Control",
	"Mobility",
	"Community",
	"Strength",
	"Control",
];

export function FitsYouCaseStudy() {
	const pageRef = useRef<HTMLDivElement>(null);

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

		document.title = "Fits You — Web Design Case Study | Lucas Coelho";
		if (description) {
			description.content =
				"Case de web design e UX/UI do Fits You, site institucional para um studio de cross training e Pilates em Barão Geraldo, Campinas.";
		}
		if (canonical) {
			canonical.href = "https://lucascoelhoux.site/projetos/fits-you";
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
		const root = pageRef.current;
		if (!root) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			const opening = gsap.timeline({ defaults: { ease: "power4.out" } });
			opening
				.from(".fits-case-header", { opacity: 0, y: -20, duration: 0.65 })
				.from(
					".fits-hero-reveal",
					{ yPercent: 115, opacity: 0, duration: 1, stagger: 0.08 },
					"-=0.25"
				)
				.from(
					".fits-case-hero-copy > p, .fits-case-facts > div, .fits-case-actions > a",
					{ y: 25, opacity: 0, duration: 0.65, stagger: 0.06 },
					"-=0.55"
				)
				.from(
					".fits-hero-visual",
					{ opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.15 },
					0.3
				);

			gsap.utils
				.toArray<HTMLElement>(".fits-scroll-section")
				.forEach(section => {
					gsap.from(section.querySelectorAll(".fits-section-reveal"), {
						scrollTrigger: {
							trigger: section,
							start: "top 78%",
							once: true,
						},
						opacity: 0,
						y: 55,
						duration: 0.85,
						stagger: 0.09,
						ease: "power3.out",
					});
				});

			gsap.utils
				.toArray<HTMLElement>(".fits-discipline-card")
				.forEach((card, index) => {
					gsap.from(card, {
						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							once: true,
						},
						opacity: 0,
						y: 70,
						rotate: index % 2 === 0 ? -2 : 2,
						duration: 0.8,
						ease: "power3.out",
					});
				});

		}, root);

		return () => context.revert();
	}, []);

	return (
		<div ref={pageRef} className="fits-case">
			<header className="fits-case-header">
				<a href="/#work">
					<span aria-hidden>←</span> Voltar aos projetos
				</a>
				<span>Case study / 02</span>
			</header>

			<main>
				<section className="fits-case-hero">
					<div className="fits-case-hero-grid">
						<div className="fits-case-hero-copy">
							<div className="fits-reveal-mask">
								<p className="fits-case-eyebrow fits-hero-reveal">
									Web Design · UX/UI · 2024
								</p>
							</div>
							<h1>
								<span className="fits-reveal-mask">
									<strong className="fits-hero-reveal">Fits You</strong>
								</span>
								<span className="fits-reveal-mask">
									<em className="fits-hero-reveal">
										Performance encontra cuidado.
									</em>
								</span>
							</h1>
							<p>
								Um site institucional para apresentar um studio de cross
								training e Pilates sem reduzir sua identidade a apenas
								intensidade ou bem-estar.
							</p>
						</div>

						<div className="fits-hero-visual">
							<img
								src="/lovable-uploads/fitsyou.webp"
								alt="Interface do site Fits You Studio"
								width="2868"
								height="1314"
							/>
							<div className="fits-hero-stamp" aria-hidden="true">
								<span>Barão Geraldo</span>
								<strong>Campinas</strong>
							</div>
						</div>
					</div>

					<dl className="fits-case-facts">
						<div>
							<dt>Projeto</dt>
							<dd>Site institucional</dd>
						</div>
						<div>
							<dt>Papel</dt>
							<dd>Web Design · UX/UI · Estrutura de conteúdo</dd>
						</div>
						<div>
							<dt>Segmento</dt>
							<dd>Cross training · Pilates · Bem-estar</dd>
						</div>
						<div>
							<dt>Local</dt>
							<dd>Barão Geraldo · Campinas</dd>
						</div>
					</dl>

					<div className="fits-case-actions">
						<a
							href="https://fitsyou.com.br"
							target="_blank"
							rel="noopener noreferrer"
							className="fits-primary-button"
						>
							Explorar site ao vivo <span aria-hidden>↗</span>
						</a>
						<a href="#fits-case-content" className="fits-secondary-button">
							Ler o case <span aria-hidden>↓</span>
						</a>
					</div>
				</section>

				<div className="fits-marquee" aria-hidden="true">
					<div className="fits-marquee-track">
						{[0, 1].map(group => (
							<div className="fits-marquee-group" key={group}>
								{marqueeWords.map((word, index) => (
									<span className="fits-marquee-item" key={`${word}-${index}`}>
										<strong>{word}</strong>
										<i />
									</span>
								))}
							</div>
						))}
					</div>
				</div>

				<section
					id="fits-case-content"
					className="fits-case-challenge fits-scroll-section"
				>
					<div className="fits-section-index fits-section-reveal">01 / Contexto</div>
					<div>
						<h2 className="fits-section-reveal">
							Uma marca com diferentes ritmos precisava de uma experiência
							única.
						</h2>
						<p className="fits-section-reveal">
							O Fits You reúne treinos de alta intensidade, práticas de
							controle corporal e serviços de recuperação. O desafio de
							comunicação era organizar essa amplitude sem fragmentar a
							percepção do studio.
						</p>
					</div>
				</section>

				<section
					className="fits-disciplines fits-scroll-section"
					aria-labelledby="fits-disciplines-title"
				>
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							02 / Modalidades
						</div>
						<h2 id="fits-disciplines-title" className="fits-section-reveal">
							Intensidade não é uma linguagem única.
						</h2>
					</div>

					<div className="fits-discipline-grid">
						{disciplines.map((discipline, index) => (
							<article
								key={discipline.name}
								className={`fits-discipline-card ${discipline.className}`}
							>
								<img
									src={discipline.image}
									alt=""
									width={index === 1 ? "640" : "1600"}
									height={index === 1 ? "640" : "1067"}
									loading="lazy"
								/>
								<span className="fits-discipline-overlay" aria-hidden="true" />
								<span className="fits-discipline-number">0{index + 1}</span>
								<div>
									<h3>{discipline.name}</h3>
									<p>{discipline.label}</p>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="fits-architecture fits-scroll-section">
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							03 / Arquitetura
						</div>
						<h2 className="fits-section-reveal">
							Explorar primeiro. Decidir no próprio ritmo.
						</h2>
						<p className="fits-section-reveal">
							A navegação distribui o conteúdo em rotas específicas, ajudando
							cada visitante a encontrar modalidades, profissionais, horários
							e localização sem transformar tudo em uma página única.
						</p>
					</div>

					<div className="fits-route-map fits-section-reveal">
						<div className="fits-route-browser">
							<div className="fits-route-browser-top">
								<span /><span /><span /><em>fitsyou.com.br</em>
							</div>
							<div className="fits-route-browser-content">
								<img
									src="/cases/fitsyou/logo.webp"
									alt="Logo Fits You"
									width="700"
									height="678"
									loading="lazy"
								/>
								<div>
									<span>Escolha seu caminho</span>
									<strong>Seu treino. Seu ritmo.</strong>
								</div>
							</div>
						</div>

						<ol>
							{contentRoutes.map((route, index) => (
								<li key={route}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<strong>{route}</strong>
									<i aria-hidden>→</i>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="fits-visual-system fits-scroll-section">
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							04 / Sistema visual
						</div>
						<h2 className="fits-section-reveal">
							Alto contraste para uma marca em movimento.
						</h2>
					</div>

					<div className="fits-system-grid">
						<div className="fits-system-type fits-section-reveal">
							<span>Display / Geist</span>
							<strong>MOVE</strong>
							<em>WITH PURPOSE</em>
							<p>
								Tipografia direta, escala ampla e mensagens curtas constroem
								ritmo sem competir com o conteúdo.
							</p>
						</div>
						<div className="fits-system-colors fits-section-reveal">
							<div className="fits-color-black">
								<span>Background</span><strong>#121212</strong>
							</div>
							<div className="fits-color-white">
								<span>Foreground</span><strong>#F5F5F7</strong>
							</div>
							<div className="fits-color-red">
								<span>Primary</span><strong>#FF3B3B</strong>
							</div>
						</div>
					</div>
				</section>

				<section className="fits-proof fits-scroll-section">
					<div className="fits-section-index fits-section-reveal">
						05 / Prova e contato
					</div>
					<div className="fits-proof-layout">
						<div className="fits-proof-copy">
							<h2 className="fits-section-reveal">
								Informação prática fecha a distância entre interesse e visita.
							</h2>
							<p className="fits-section-reveal">
								O site destaca as provas apresentadas pela marca e oferece
								acesso direto a horários, preços, localização e WhatsApp.
								Esses dados pertencem ao conteúdo institucional do Fits You —
								não são métricas atribuídas ao design.
							</p>
						</div>

						<div className="fits-proof-numbers">
							<div className="fits-section-reveal">
								<strong>+10</strong><span>Anos de experiência</span>
							</div>
							<div className="fits-section-reveal">
								<strong>+500</strong><span>Alunos ativos</span>
							</div>
							<div className="fits-section-reveal">
								<strong>5.0</strong><span>Nota apresentada no site</span>
							</div>
						</div>
					</div>
				</section>

				<section className="fits-case-closing fits-scroll-section">
					<p className="fits-case-eyebrow fits-section-reveal">Próximo projeto</p>
					<h2 className="fits-section-reveal">
						Sua marca também precisa transformar variedade em clareza?
					</h2>
					<p className="fits-section-reveal">
						Posso ajudar a organizar conteúdo, construir uma direção visual
						própria e transformar tudo em uma experiência digital coerente.
					</p>
					<div className="fits-case-actions fits-section-reveal">
						<a
							href={`mailto:${contactEmail}?subject=Quero conversar sobre um projeto digital`}
							className="fits-primary-button"
						>
							Conversar sobre um projeto <span aria-hidden>→</span>
						</a>
						<a href="/#work" className="fits-secondary-button">
							Ver outros projetos
						</a>
					</div>
				</section>
			</main>

			<footer className="fits-case-footer">
				<span>Lucas Coelho · Digital Designer</span>
				<span>Fits You / 2024</span>
			</footer>
		</div>
	);
}
