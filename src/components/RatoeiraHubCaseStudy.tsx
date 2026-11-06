import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";
import { CaseQuickRead } from "@/components/CaseQuickRead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";
import { localizePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useTranslations";

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
	const locale = useLocale();
	const en = locale === "en";
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
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
				<a href={localizePath("/#work", locale)}><span aria-hidden>←</span> {en ? "Back to projects" : "Voltar aos projetos"}</a>
				<span>{en ? "Case study / 03" : "Estudo de caso / 03"}</span>
			</header>
			<Breadcrumbs items={getBreadcrumbs("/projetos/ratoeira-hub", locale)} className="hub-case-breadcrumbs" />

			<main>
				<section className="hub-case-hero">
					<div className="hub-case-hero-copy">
						<div className="hub-reveal-mask">
						<p className="hub-case-eyebrow hub-hero-reveal">{en ? "Website design · Adtech · 2024" : "Case de Web Design · Adtech · 2024"}</p>
						</div>
						<h1>
							<span className="hub-reveal-mask"><strong className="hub-hero-reveal">Ratoeira</strong></span>
							<span className="hub-reveal-mask"><em className="hub-hero-reveal">{en ? "Hub · Website for Adtech" : "Hub · Web Design para Adtech"}</em></span>
						</h1>
						<p>{en ? "The Ratoeira Hub website explains an adtech ecosystem spanning server-side tracking, fraud protection, and landing pages. The experience connects each product to advertisers’ and affiliates’ workflows, presents integrations, and relates the technology to practical tasks instead of treating each module as a standalone solution." : <>
							O site institucional do Ratoeira Hub explica um ecossistema de adtech
							composto por tracking server-side, proteção antifraude e landing pages.
							A experiência conecta cada produto à rotina de anunciantes e afiliados,
							apresenta integrações e aproxima tecnologias de tarefas concretas sem
							tratar os módulos como soluções isoladas.
						</>}</p>
					</div>

					<div className="hub-hero-visual">
						<img
							src="/lovable-uploads/ratoeirahub.webp"
							alt={en ? "Ratoeira Hub website interface" : "Interface do site Ratoeira Hub"}
							width="2832"
							height="1408"
						/>
						<div className="hub-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
					</div>

					<dl className="hub-case-facts">
						<div><dt>{en ? "Project" : "Projeto"}</dt><dd>{en ? "Business website" : "Site institucional"}</dd></div>
						<div><dt>{en ? "Role" : "Papel"}</dt><dd>{en ? "Design · UX/UI · Development · Launch" : "Design · UX/UI · Desenvolvimento · Publicação"}</dd></div>
						<div><dt>{en ? "Industry" : "Segmento"}</dt><dd>{en ? "Adtech · Martech · Performance marketing" : "Adtech · Martech · Performance"}</dd></div>
						<div><dt>{en ? "Scope" : "Escopo"}</dt><dd>{en ? "Ecosystem · Products · Integrations" : "Ecossistema · Produtos · Integrações"}</dd></div>
					</dl>

					<div className="hub-case-actions">
						<a href="https://hub.ratoeiraadsoficial.com.br" target="_blank" rel="noopener noreferrer" className="hub-primary-button">
							{en ? "View live website" : "Explorar site ao vivo"} <span aria-hidden>↗</span>
						</a>
						<a href="#hub-summary" className="hub-secondary-button">{en ? "Project overview" : "Ver resumo"} <span aria-hidden>↓</span></a>
					</div>
				</section>

				<CaseQuickRead
					id="hub-summary"
					locale={locale}
					intro={en ? "A digital narrative that makes products, integrations, and performance technology easier to understand as one ecosystem." : "Uma narrativa digital criada para transformar produtos, integrações e tecnologias de performance em um ecossistema legível."}
					items={[
						{
							label: en ? "Challenge" : "Desafio",
							value: en ? "Explain tracking, fraud protection, and landing pages without presenting them as disconnected products." : "Explicar tracking, proteção contra fraude e landing pages sem apresentar as soluções como produtos desconectados.",
						},
						{
							label: en ? "Key decision" : "Decisão central",
							value:
								en ? "Organize the story around a shared operational journey while making each module’s role clear." : "Organizar a comunicação como uma jornada operacional comum, mantendo clara a função específica de cada módulo.",
						},
						{
							label: en ? "Deliverable and evidence" : "Entrega e evidência",
							value:
								en ? "Published website featuring three products, a dashboard demonstration, and more than 70 integrations presented on the site. This case does not include acquisition or conversion metrics." : "Site publicado com três produtos, demonstração do dashboard e mais de 70 integrações comunicadas. O case não inclui métricas de aquisição ou conversão.",
						},
						{
							label: en ? "Project scope" : "Escopo declarado",
							value:
								en ? "Website design, UX/UI, and content structure for an adtech and martech operation." : "Web design, UX/UI e estrutura de conteúdo para uma operação de adtech e martech.",
						},
					]}
				/>

				<section id="hub-case-content" className="hub-case-context hub-scroll-section">
					<div className="hub-section-index hub-section-reveal">01 / {en ? "Context" : "Contexto"}</div>
					<div>
						<h2 className="hub-section-reveal">{en ? "How do you connect products without blurring their roles?" : "Como conectar produtos sem apagar suas funções?"}</h2>
						<p className="hub-section-reveal">{en ? "The brand brings together server-side tracking, protection against fraudulent clicks, and landing page creation. The design opportunity was to present these as parts of one operation without obscuring each product’s specific purpose." : <>
							A marca reúne tracking server-side, proteção contra cliques fraudulentos
							e criação de landing pages. A oportunidade de design foi apresentar essas
							frentes como partes de uma mesma operação, sem apagar a função específica
							de cada produto.
						</>}</p>
					</div>
				</section>

				<section className="hub-ecosystem hub-scroll-section" aria-labelledby="hub-ecosystem-title">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">02 / {en ? "Ecosystem" : "Ecossistema"}</div>
						<h2 id="hub-ecosystem-title" className="hub-section-reveal">{en ? "Which products make up the Ratoeira Hub ecosystem?" : "Quais produtos formam o ecossistema Ratoeira Hub?"}</h2>
						<p className="hub-section-reveal">{en ? "Each module addresses a different step while sharing the same promise of operational clarity." : "Cada módulo resolve uma etapa diferente, mas compartilha a mesma promessa de clareza operacional."}</p>
					</div>

					<div className="hub-ecosystem-grid">
						<span className="hub-ecosystem-line" aria-hidden="true" />
						{ecosystem.map(product => (
							<article className="hub-ecosystem-card" key={product.name}>
								<div className="hub-product-top"><span>{product.index}</span><i aria-hidden /></div>
								<img src={product.image} alt="" width="360" height="360" loading="lazy" />
								<h3>{product.name}</h3>
				<p>{en ? ({ "Ratoeira Ads": "Campaign tracking and analysis for advertisers who need reliable data.", "Ratoeira Pages": "Create and manage pages connected to media and conversion strategy.", "Ratoeira Hub": "Real-time server-side tracking, protection against fraudulent clicks, and landing pages for Google Ads and Meta Ads." }[product.name] ?? product.description) : product.description}</p>
								<strong>{product.label}</strong>
							</article>
						))}
					</div>
				</section>

				<section className="hub-tracking hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">03 / {en ? "Product" : "Produto"}</div>
						<h2 className="hub-section-reveal">{en ? "How can a website explain server-side tracking?" : "Como mostrar o funcionamento do tracking server-side?"}</h2>
						<p className="hub-section-reveal">{en ? "The visual demonstration makes an abstract technology more tangible through familiar concepts: pages, visitors, devices, and events." : "A demonstração visual aproxima uma tecnologia abstrata de situações reconhecíveis: páginas, visitantes, dispositivos e eventos."}</p>
					</div>

					<figure className="hub-dashboard hub-section-reveal">
						<div className="hub-browser-bar"><span /><span /><span /><em>Ratoeira Ads / Overview</em></div>
						<img src="/cases/ratoeira-hub/tracking-dashboard.webp" alt="Dashboard de rastreamento com páginas, visitantes, dispositivos e eventos" width="1800" height="1099" loading="lazy" />
						<figcaption><span>{en ? "Raw data" : "Dado bruto"}</span><i aria-hidden>→</i><strong>{en ? "Operational context" : "Contexto operacional"}</strong></figcaption>
					</figure>
				</section>

				<section className="hub-integrations hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">04 / {en ? "Integrations" : "Integrações"}</div>
						<h2 className="hub-section-reveal">{en ? "How do integrations fit into the workflow?" : "Como as integrações entram no fluxo de trabalho?"}</h2>
						<p className="hub-section-reveal">{en ? "The website presents media-platform integrations and communicates compatibility with more than 70 services." : "O site apresenta integrações com plataformas de mídia e comunica compatibilidade com mais de 70 serviços."}</p>
					</div>

					<div className="hub-integration-grid">
						{integrations.map(integration => (
							<div className="hub-integration-card hub-section-reveal" key={integration.name}>
								<img src={integration.image} alt="" width="180" height="180" loading="lazy" />
								<span>{integration.name}</span>
								<i aria-hidden>Connected</i>
							</div>
						))}
						<div className="hub-integration-more hub-section-reveal"><strong>70+</strong><span>{en ? "Platforms listed on the website" : "Plataformas comunicadas no site"}</span></div>
					</div>
				</section>

				<section className="hub-design-system hub-scroll-section">
					<div className="hub-section-heading">
						<div className="hub-section-index hub-section-reveal">05 / {en ? "Visual system" : "Sistema visual"}</div>
						<h2 className="hub-section-reveal">{en ? "How do you translate technology into a visual language?" : "Como traduzir tecnologia em uma linguagem visual?"}</h2>
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
							<div><button type="button">{en ? "Get started" : "Começar agora"} <b>→</b></button><span><i /> {en ? "Operating system" : "Sistema operacional"}</span></div>
						</div>
					</div>
				</section>

				<section className="hub-case-closing hub-scroll-section">
					<p className="hub-case-eyebrow hub-section-reveal">{en ? "Next step" : "Próximo passo"}</p>
					<h2 className="hub-section-reveal">{en ? "Could your products tell one connected story?" : "Seu ecossistema também precisa parecer uma única história?"}</h2>
					<p className="hub-section-reveal">{en ? <>I can help organize products, audiences, and messaging into a coherent digital experience. See my work on <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">websites and landing pages</a>.</> : <>Posso ajudar a organizar produtos, públicos e mensagens em uma experiência digital coerente. Veja meu trabalho com <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">sites e landing pages</a>.</>}</p>
					<div className="hub-case-actions hub-section-reveal">
						<a href={`mailto:${contactEmail}?subject=${encodeURIComponent(en ? "Let’s discuss a digital project" : "Quero conversar sobre um projeto digital")}`} className="hub-primary-button">{en ? "Discuss a project" : "Conversar sobre um projeto"} <span aria-hidden>→</span></a>
						<a href={localizePath("/#work", locale)} className="hub-secondary-button">{en ? "View other projects" : "Ver outros projetos"}</a>
					</div>
				</section>
			</main>

			<footer className="hub-case-footer"><span>Lucas Coelho · Digital Designer</span><span>Ratoeira Hub / 2024</span></footer>
		</div>
	);
}
