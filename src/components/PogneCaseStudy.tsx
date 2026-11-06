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

const messageSteps = [
	{
		index: "01",
		label: "Pertencimento",
		title: "Uma oferta que começa pela exclusividade.",
		text: "A abertura identifica imediatamente para quem a parceria foi criada: alunos do Método PNG.",
	},
	{
		index: "02",
		label: "Promessa",
		title: "Entrar no Google Ads com mais segurança.",
		text: "A mensagem principal traduz o produto em um benefício fácil de reconhecer antes de explicar a tecnologia.",
	},
	{
		index: "03",
		label: "Mecanismo",
		title: "Blindagem desde o dia zero.",
		text: "A proteção do orçamento e o rastreamento de vendas dão substância à promessa central da campanha.",
	},
	{
		index: "04",
		label: "Ação",
		title: "Um único próximo passo.",
		text: "O CTA reduz a decisão a uma ação direta e permanece visualmente dominante em toda a experiência.",
	},
];

export function PogneCaseStudy() {
	const locale = useLocale();
	const en = locale === "en";
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useLayoutEffect(() => {
		const root = pageRef.current;
		if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			gsap.timeline({ defaults: { ease: "power4.out" } })
				.from(".pogne-case-header", { opacity: 0, y: -18, duration: 0.6 })
				.from(".pogne-hero-line", { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.07 }, "-=0.2")
				.from(".pogne-hero-intro, .pogne-case-facts > div, .pogne-case-actions > a", { opacity: 0, y: 25, duration: 0.65, stagger: 0.05 }, "-=0.45")
				.from(".pogne-hero-visual", { opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1 }, 0.35);

			gsap.utils.toArray<HTMLElement>(".pogne-scroll-section").forEach(section => {
				gsap.from(section.querySelectorAll(".pogne-reveal"), {
					scrollTrigger: { trigger: section, start: "top 80%", once: true },
					opacity: 0,
					y: 48,
					duration: 0.8,
					stagger: 0.07,
					ease: "power3.out",
				});
			});

			gsap.from(".pogne-message-card", {
				scrollTrigger: { trigger: ".pogne-message-grid", start: "top 82%", once: true },
				opacity: 0,
				y: 60,
				rotate: 1.5,
				duration: 0.75,
				stagger: 0.08,
				ease: "power3.out",
			});
		}, root);

		return () => context.revert();
	}, []);

	return (
		<div ref={pageRef} className="pogne-case">
			<header className="pogne-case-header">
				<a href={localizePath("/#work", locale)}><span aria-hidden>←</span> {en ? "Back to projects" : "Voltar aos projetos"}</a>
				<span>{en ? "Case study / 04" : "Estudo de caso / 04"}</span>
			</header>
			<Breadcrumbs items={getBreadcrumbs("/projetos/pogne", locale)} className="pogne-case-breadcrumbs" />

			<main>
				<section className="pogne-case-hero">
					<div className="pogne-case-hero-copy">
						<p className="pogne-case-eyebrow">{en ? "Conversion landing page · 2024" : "Case de Landing Page de Conversão · 2024"}</p>
						<h1>
							<span className="pogne-reveal-mask"><strong className="pogne-hero-line">Pogne</strong></span>
							<span className="pogne-reveal-mask"><em className="pogne-hero-line">{en ? "× RA Ads · Conversion landing page" : "× RA Ads · Landing Page de Conversão"}</em></span>
						</h1>
						<p className="pogne-hero-intro">{en ? "The Pogne × Ratoeira Ads landing page introduces a partnership offer to Método PNG students. It explains access to budget protection and sales tracking, connects both brands, and guides visitors toward the primary action. This case covers website design, UX/UI, and funnel structure; campaign conversion data was not available." : <>
							A landing page Pogne e Ratoeira Ads apresenta uma oferta de parceria a alunos do Método PNG. A narrativa explica o acesso à proteção de orçamento e ao rastreamento de vendas, conecta as duas marcas e conduz à ação principal. O case mostra decisões de web design, UX/UI e organização do funil, sem dados de conversão da campanha.
						</>}</p>
					</div>

					<div className="pogne-hero-visual">
						<img src="/lovable-uploads/pogne.webp" alt={en ? "Pogne × Ratoeira Ads landing page hero" : "Hero da landing page Pogne e Ratoeira Ads"} width="2048" height="1024" />
						<div className="pogne-hero-signal" aria-hidden="true"><span>{en ? "Exclusive offer" : "Oferta exclusiva"}</span><strong>→</strong></div>
					</div>

					<dl className="pogne-case-facts">
						<div><dt>{en ? "Project" : "Projeto"}</dt><dd>{en ? "Partnership landing page" : "Landing page de parceria"}</dd></div>
						<div><dt>{en ? "Role" : "Papel"}</dt><dd>{en ? "Website design · UX/UI · Funnel" : "Web Design · UX/UI · Funil"}</dd></div>
						<div><dt>{en ? "Audience" : "Público"}</dt><dd>{en ? "Método PNG students" : "Alunos do Método PNG"}</dd></div>
						<div><dt>{en ? "Objective" : "Objetivo"}</dt><dd>{en ? "Present the offer and guide visitors to the CTA" : "Apresentar oferta e conduzir ao CTA"}</dd></div>
					</dl>

					<div className="pogne-case-actions">
						<a href="https://pogne.ratoeiraadsoficial.com.br" target="_blank" rel="noopener noreferrer" className="pogne-primary-button">{en ? "View live website" : "Explorar site ao vivo"} <span aria-hidden>↗</span></a>
						<a href="#pogne-summary" className="pogne-secondary-button">{en ? "Project overview" : "Ver resumo"} <span aria-hidden>↓</span></a>
					</div>
				</section>

				<CaseQuickRead
					id="pogne-summary"
					locale={locale}
					intro={en ? "A partnership landing page that turns a technical offer into a clear sequence: audience, promise, mechanism, and action." : "Uma landing page de parceria que traduz uma oferta técnica em uma sequência direta de pertencimento, promessa, mecanismo e ação."}
					items={[
						{
							label: en ? "Challenge" : "Desafio",
							value:
								en ? "Bring two brands together and explain budget protection and tracking without turning the page into technical documentation." : "Unir duas marcas e explicar proteção de orçamento e rastreamento sem transformar a página em documentação técnica.",
						},
						{
							label: en ? "Key decision" : "Decisão central",
							value:
								en ? "Introduce the audience and promise first, then explain the mechanism, so the CTA follows naturally from the story." : "Apresentar primeiro o público e a promessa, depois o mecanismo, deixando o CTA como consequência da leitura.",
						},
						{
							label: en ? "Deliverable and evidence" : "Entrega e evidência",
							value:
								en ? "Published landing page with an exclusive offer, sequenced argument, and primary CTA. Campaign conversion data was not available for this case." : "Landing page publicada com oferta exclusiva, argumento sequencial e CTA principal. O case não tem dados de conversão da campanha.",
						},
						{
							label: en ? "Project scope" : "Escopo declarado",
							value:
								en ? "Website design, UX/UI, and funnel structure for a partnership aimed at Método PNG students." : "Web design, UX/UI e organização do funil para uma parceria voltada aos alunos do Método PNG.",
						},
					]}
				/>

				<section id="pogne-case-content" className="pogne-context pogne-scroll-section">
					<div className="pogne-section-index pogne-reveal">01 / {en ? "Context" : "Contexto"}</div>
					<div>
						<h2 className="pogne-reveal">{en ? "How do you bring two brands together in one clear offer?" : "Como integrar duas marcas em uma oferta clara?"}</h2>
						<p className="pogne-reveal">{en ? "Ratoeira Ads and Michael Pogne partnered to give Método PNG students access to budget protection and sales tracking. The page frames the collaboration as one offer instead of two competing stories." : "A Ratoeira Ads e Michael Pogne se uniram para oferecer aos alunos do Método PNG acesso a uma ferramenta de proteção de orçamento e rastreamento de vendas. A página organiza essa colaboração como uma oferta única, em vez de duas narrativas concorrentes."}</p>
					</div>
				</section>

				<section className="pogne-message pogne-scroll-section" aria-labelledby="pogne-message-title">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">02 / {en ? "Message architecture" : "Arquitetura da mensagem"}</div>
						<h2 id="pogne-message-title" className="pogne-reveal">{en ? "Which questions should a landing page answer?" : "Quais perguntas uma landing page deve responder?"}</h2>
						<p className="pogne-reveal">{en ? "Before detailing features, the experience establishes the audience, promise, and mechanism—then asks visitors to decide." : "Antes de detalhar funcionalidades, a experiência estabelece público, promessa e mecanismo — e só então pede uma decisão."}</p>
					</div>
					<div className="pogne-message-grid">
						{messageSteps.map(step => (
							<article className="pogne-message-card" key={step.index}>
								<div><span>{step.index}</span><i>{en ? ({ Pertencimento: "Audience", Promessa: "Promise", Mecanismo: "Mechanism", Ação: "Action" }[step.label] ?? step.label) : step.label}</i></div>
								<h3>{en ? ({ "Uma oferta que começa pela exclusividade.": "An offer that starts with exclusivity.", "Entrar no Google Ads com mais segurança.": "Run Google Ads with greater confidence.", "Blindagem desde o dia zero.": "Protection from day one.", "Um único próximo passo.": "One clear next step." }[step.title] ?? step.title) : step.title}</h3>
								<p>{en ? ({ "A abertura identifica imediatamente para quem a parceria foi criada: alunos do Método PNG.": "The opening immediately identifies who the partnership is for: Método PNG students.", "A mensagem principal traduz o produto em um benefício fácil de reconhecer antes de explicar a tecnologia.": "The main message turns the product into a recognizable benefit before explaining the technology.", "A proteção do orçamento e o rastreamento de vendas dão substância à promessa central da campanha.": "Budget protection and sales tracking give the campaign’s central promise substance.", "O CTA reduz a decisão a uma ação direta e permanece visualmente dominante em toda a experiência.": "The CTA makes the decision direct and remains visually prominent throughout the experience." }[step.text] ?? step.text) : step.text}</p>
								<strong aria-hidden>↗</strong>
							</article>
						))}
					</div>
				</section>

				<section className="pogne-funnel pogne-scroll-section">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">03 / {en ? "Visual funnel" : "Funil visual"}</div>
						<h2 className="pogne-reveal">{en ? "How can hierarchy guide visitors without pressuring them?" : "Como organizar a hierarquia sem pressionar a conversão?"}</h2>
						<p className="pogne-reveal">{en ? "Contrast, scale, and repetition guide the reading flow. Visitors first understand the partnership’s value, then encounter the CTA as a natural next step." : "Contraste, escala e repetição orientam a leitura. O visitante entende primeiro o valor da parceria e encontra o CTA como consequência natural do conteúdo."}</p>
					</div>
					<div className="pogne-funnel-board pogne-reveal">
						<div className="pogne-funnel-copy">
							<span>{en ? "For students only" : "Exclusivo para alunos"}</span>
							<strong>{en ? "AUDIENCE" : "CONTEXTO"}</strong>
							<i aria-hidden>↓</i>
							<strong>{en ? "PROMISE" : "PROMESSA"}</strong>
							<i aria-hidden>↓</i>
							<strong>{en ? "PROOF" : "PROVA"}</strong>
							<i aria-hidden>↓</i>
							<button type="button">{en ? "CLAIM MY SPOT" : "QUERO MINHA VAGA"} <b>→</b></button>
						</div>
						<div className="pogne-funnel-screen">
							<div className="pogne-browser-bar"><span /><span /><span /><em>pogne.ratoeiraadsoficial.com.br</em></div>
							<img src="/lovable-uploads/pogne.webp" alt={en ? "Campaign interface showing the offer and call to action" : "Interface da campanha mostrando a promessa e chamada para ação"} width="2048" height="1024" loading="lazy" />
						</div>
					</div>
				</section>

				<section className="pogne-system pogne-scroll-section">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">04 / {en ? "Visual system" : "Sistema visual"}</div>
						<h2 className="pogne-reveal">{en ? "How does the visual system use yellow?" : "Como o sistema visual usa o amarelo?"}</h2>
					</div>
					<div className="pogne-system-grid">
						<div className="pogne-type-specimen pogne-reveal"><span>Display / Sans</span><strong>{en ? "PROTECTED" : "BLINDAGEM"}</strong><em>{en ? "from day one." : "desde o dia zero."}</em><p>{en ? "Large scale, bold weight, and italic contrast create a reading rhythm that balances authority and speed." : "Escala ampla, peso alto e itálico criam uma leitura que alterna autoridade e velocidade."}</p></div>
						<div className="pogne-color-specimen pogne-reveal">
							<div className="pogne-yellow"><span>Signal</span><strong>#F5B800</strong></div>
							<div className="pogne-ink"><span>Ink</span><strong>#0B0B0D</strong></div>
							<div className="pogne-paper"><span>Paper</span><strong>#F4F2F2</strong></div>
						</div>
					</div>
				</section>

				<section className="pogne-closing pogne-scroll-section">
					<p className="pogne-case-eyebrow pogne-reveal">{en ? "Next step" : "Próximo passo"}</p>
					<h2 className="pogne-reveal">{en ? "Does your offer need to be understood before it can be sold?" : "Sua oferta também precisa ser entendida antes de ser vendida?"}</h2>
					<p className="pogne-reveal">{en ? <>I can turn positioning, product, and sales messaging into a clear digital experience. Explore my work on <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">landing pages</a>.</> : <>Posso transformar posicionamento, produto e argumento comercial em uma experiência digital clara. Conheça meu trabalho com <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">landing pages</a>.</>}</p>
					<div className="pogne-case-actions pogne-reveal">
						<a href={`mailto:${contactEmail}?subject=${encodeURIComponent(en ? "Let’s discuss a landing page" : "Quero conversar sobre uma landing page")}`} className="pogne-primary-button">{en ? "Discuss a project" : "Conversar sobre um projeto"} <span aria-hidden>→</span></a>
						<a href={localizePath("/#work", locale)} className="pogne-secondary-button">{en ? "View other projects" : "Ver outros projetos"}</a>
					</div>
				</section>
			</main>

			<footer className="pogne-case-footer"><span>Lucas Coelho · Digital Designer</span><span>Pogne × Ratoeira Ads / 2024</span></footer>
		</div>
	);
}
