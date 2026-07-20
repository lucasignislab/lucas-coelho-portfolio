import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const ecosystem = [
	{
		index: "01",
		name: "Ratoeira Ads",
		description:
			"Rastreamento e leitura de campanhas para anunciantes que precisam operar com dados reais.",
		image: "/cases/ratoeira-hub/ads-icon.webp",
		label: "Track · attribute · optimize",
	},
	{
		index: "02",
		name: "Ratoeira Pages",
		description:
			"Criação e gestão de páginas conectadas à estratégia de mídia e conversão.",
		image: "/cases/ratoeira-hub/pages-icon.webp",
		label: "Create · publish · measure",
	},
	{
		index: "03",
		name: "Ratoeira Hub",
		description:
			"Tracking server-side, proteção contra cliques fraudulentos e landing pages para Google Ads e Meta Ads, em tempo real.",
		image: "/cases/ratoeira-hub/hub-icon.webp",
		label: "Track · protect · convert",
	},
];

const integrations = [
	{ name: "Google Ads", image: "/cases/ratoeira-hub/google-ads.webp" },
	{ name: "Meta Ads", image: "/cases/ratoeira-hub/meta-ads.webp" },
	{ name: "Taboola", image: "/cases/ratoeira-hub/taboola.webp" },
	{ name: "NewsBreak", image: "/cases/ratoeira-hub/newsbreak.webp" },
];

export function RatoeiraHubCaseStudy() {
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

		document.title = "Ratoeira Hub — Web Design Case Study | Lucas Coelho";
		if (description) {
			description.content =
				"Case de web design e UX/UI para o ecossistema Ratoeira Hub: tracking server-side, proteção contra cliques fraudulentos e landing pages.";
		}
		if (canonical) {
			canonical.href = "https://lucascoelhoux.site/projetos/ratoeira-hub";
		}

		return () => {
			document.title = previousTitle;
			if (description && previousDescription) {
				description.content = previousDescription;
			}
			if (canonical && previousCanonical) canonical.href = previousCanonical;
		};
	}, []);

	useLayoutEffect(() => {
		const root = pageRef.current;
		if (!root) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			const opening = gsap.timeline({ defaults: { ease: "power4.out" } });
			opening
				.from(".hub-case-header", { opacity: 0, y: -20, duration: 0.65 })
				.from(
					".hub-hero-reveal",
					{ yPercent: 115, opacity: 0, duration: 1, stagger: 0.08 },
					"-=0.25"
				)
				.from(
					".hub-case-hero-copy > p, .hub-case-facts > div, .hub-case-actions > a",
					{ y: 28, opacity: 0, duration: 0.65, stagger: 0.06 },
					"-=0.55"
				)
				.from(
					".hub-hero-visual",
					{ opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.1 },
					0.35
				);

			gsap.utils.toArray<HTMLElement>(".hub-scroll-section").forEach(section => {
				gsap.from(section.querySelectorAll(".hub-section-reveal"), {
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						once: true,
					},
					opacity: 0,
					y: 55,
					duration: 0.85,
					stagger: 0.08,
					ease: "power3.out",
				});
			});

			gsap.from(".hub-ecosystem-card", {
				scrollTrigger: {
					trigger: ".hub-ecosystem-grid",
					start: "top 82%",
					once: true,
				},
				opacity: 0,
				y: 60,
				scale: 0.96,
				duration: 0.75,
				stagger: 0.1,
				ease: "power3.out",
			});
		}, root);

		return () => context.revert();
	}, []);

	return (
		<div ref={pageRef} className="hub-case">
			<header className="hub-case-header">
				<a href="/#work"><span aria-hidden>←</span> Voltar aos projetos</a>
				<span>Case study / 03</span>
			</header>

			<main>
				<section className="hub-case-hero">
					<div className="hub-case-hero-copy">
						<div className="hub-reveal-mask">
							<p className="hub-case-eyebrow hub-hero-reveal">Web Design · UX/UI · 2024</p>
						</div>
						<h1>
							<span className="hub-reveal-mask"><strong className="hub-hero-reveal">Ratoeira</strong></span>
							<span className="hub-reveal-mask"><em className="hub-hero-reveal">Hub</em></span>
						</h1>
						<p>
							Um site institucional desenhado para transformar diferentes produtos,
							públicos e tecnologias em uma única narrativa de ecossistema.
						</p>
					</div>

					<div className="hub-hero-visual">
						<img
							src="/lovable-uploads/ratoeirahub.webp"
							alt="Interface do site Ratoeira Hub"
							width="2832"
							height="1408"
						/>
						<div className="hub-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
					</div>

					<dl className="hub-case-facts">
						<div><dt>Projeto</dt><dd>Site institucional</dd></div>
						<div><dt>Papel</dt><dd>Web Design · UX/UI · Estrutura de conteúdo</dd></div>
						<div><dt>Segmento</dt><dd>Adtech · Martech · Performance</dd></div>
						<div><dt>Escopo</dt><dd>Ecossistema · Produtos · Integrações</dd></div>
					</dl>

					<div className="hub-case-actions">
						<a href="https://hub.ratoeiraadsoficial.com.br" target="_blank" rel="noopener noreferrer" className="hub-primary-button">
							Explorar site ao vivo <span aria-hidden>↗</span>
						</a>
						<a href="#hub-case-content" className="hub-secondary-button">Ler o case <span aria-hidden>↓</span></a>
					</div>
				</section>

				<section id="hub-case-content" className="hub-case-context hub-scroll-section">
					<div className="hub-section-index hub-section-reveal">01 / Contexto</div>
					<div>
						<h2 className="hub-section-reveal">Quando os produtos se conectam, a comunicação também precisa se conectar.</h2>
						<p className="hub-section-reveal">
							A marca reúne tracking server-side, proteção contra cliques fraudulentos
							e criação de landing pages. A oportunidade de design foi apresentar essas
							frentes como partes de uma mesma operação, sem apagar a função específica
							de cada produto.
						</p>
					</div>
				</section>

				<section className="hub-ecosystem hub-scroll-section" aria-labelledby="hub-ecosystem-title">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">02 / Ecossistema</div>
						<h2 id="hub-ecosystem-title" className="hub-section-reveal">Três produtos. Uma jornada conectada.</h2>
						<p className="hub-section-reveal">Cada módulo resolve uma etapa diferente, mas compartilha a mesma promessa de clareza operacional.</p>
					</div>

					<div className="hub-ecosystem-grid">
						<span className="hub-ecosystem-line" aria-hidden="true" />
						{ecosystem.map(product => (
							<article className="hub-ecosystem-card" key={product.name}>
								<div className="hub-product-top"><span>{product.index}</span><i aria-hidden /></div>
								<img src={product.image} alt="" width="360" height="360" loading="lazy" />
								<h3>{product.name}</h3>
								<p>{product.description}</p>
								<strong>{product.label}</strong>
							</article>
						))}
					</div>
				</section>

				<section className="hub-tracking hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">03 / Produto</div>
						<h2 className="hub-section-reveal">Transformar rastreamento em algo que pode ser lido.</h2>
						<p className="hub-section-reveal">A demonstração visual aproxima uma tecnologia abstrata de situações reconhecíveis: páginas, visitantes, dispositivos e eventos.</p>
					</div>

					<figure className="hub-dashboard hub-section-reveal">
						<div className="hub-browser-bar"><span /><span /><span /><em>Ratoeira Ads / Overview</em></div>
						<img src="/cases/ratoeira-hub/tracking-dashboard.webp" alt="Dashboard de rastreamento com páginas, visitantes, dispositivos e eventos" width="1800" height="1099" loading="lazy" />
						<figcaption><span>Dado bruto</span><i aria-hidden>→</i><strong>Contexto operacional</strong></figcaption>
					</figure>
				</section>

				<section className="hub-integrations hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">04 / Integrações</div>
						<h2 className="hub-section-reveal">O ecossistema começa onde o trabalho já acontece.</h2>
						<p className="hub-section-reveal">O site apresenta integrações com plataformas de mídia e comunica compatibilidade com mais de 70 serviços.</p>
					</div>

					<div className="hub-integration-grid">
						{integrations.map(integration => (
							<div className="hub-integration-card hub-section-reveal" key={integration.name}>
								<img src={integration.image} alt="" width="180" height="180" loading="lazy" />
								<span>{integration.name}</span>
								<i aria-hidden>Connected</i>
							</div>
						))}
						<div className="hub-integration-more hub-section-reveal"><strong>70+</strong><span>Plataformas comunicadas no site</span></div>
					</div>
				</section>

				<section className="hub-design-system hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">05 / Sistema visual</div>
						<h2 className="hub-section-reveal">Sinal, contraste e densidade tecnológica.</h2>
					</div>

					<div className="hub-system-grid">
						<div className="hub-system-palette hub-section-reveal">
							<div className="hub-token-black"><span>Canvas</span><strong>#050505</strong></div>
							<div className="hub-token-surface"><span>Surface</span><strong>#161616</strong></div>
							<div className="hub-token-yellow"><span>Signal</span><strong>#FFB800</strong></div>
						</div>
						<div className="hub-system-type hub-section-reveal">
							<span>Interface / Inter</span>
							<strong>DATA</strong>
							<em>becomes direction.</em>
							<div><button type="button">Começar agora <b>→</b></button><span><i /> Sistema operacional</span></div>
						</div>
					</div>
				</section>

				<section className="hub-case-closing hub-scroll-section">
					<p className="hub-case-eyebrow hub-section-reveal">Próximo passo</p>
					<h2 className="hub-section-reveal">Seu ecossistema também precisa parecer uma única história?</h2>
					<p className="hub-section-reveal">Posso ajudar a organizar produtos, públicos e mensagens em uma experiência digital coerente.</p>
					<div className="hub-case-actions hub-section-reveal">
						<a href={`mailto:${contactEmail}?subject=Quero conversar sobre um projeto digital`} className="hub-primary-button">Conversar sobre um projeto <span aria-hidden>→</span></a>
						<a href="/#work" className="hub-secondary-button">Ver outros projetos</a>
					</div>
				</section>
			</main>

			<footer className="hub-case-footer"><span>Lucas Coelho · Digital Designer</span><span>Ratoeira Hub / 2024</span></footer>
		</div>
	);
}
