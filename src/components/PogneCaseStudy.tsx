import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";

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
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		const previousTitle = document.title;
		const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
		const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		const previousDescription = description?.content;
		const previousCanonical = canonical?.href;

		document.title = "Pogne × Ratoeira Ads — Conversion Design Case | Lucas Coelho";
		if (description) {
			description.content =
				"Case de web design e conversion design para a parceria entre Método PNG e Ratoeira Ads.";
		}
		if (canonical) canonical.href = "https://lucascoelhoux.site/projetos/pogne";

		return () => {
			document.title = previousTitle;
			if (description && previousDescription) description.content = previousDescription;
			if (canonical && previousCanonical) canonical.href = previousCanonical;
		};
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
				<a href="/#work"><span aria-hidden>←</span> Voltar aos projetos</a>
				<span>Case study / 04</span>
			</header>

			<main>
				<section className="pogne-case-hero">
					<div className="pogne-case-hero-copy">
						<p className="pogne-case-eyebrow">Landing page · Conversion design · 2024</p>
						<h1>
							<span className="pogne-reveal-mask"><strong className="pogne-hero-line">Pogne</strong></span>
							<span className="pogne-reveal-mask"><em className="pogne-hero-line">× RA Ads</em></span>
						</h1>
						<p className="pogne-hero-intro">
							Uma landing page de parceria desenhada para transformar uma oferta técnica em uma história direta sobre segurança, acesso e ação.
						</p>
					</div>

					<div className="pogne-hero-visual">
						<img src="/lovable-uploads/pogne.webp" alt="Hero da landing page Pogne e Ratoeira Ads" width="2048" height="1024" />
						<div className="pogne-hero-signal" aria-hidden="true"><span>Oferta exclusiva</span><strong>→</strong></div>
					</div>

					<dl className="pogne-case-facts">
						<div><dt>Projeto</dt><dd>Landing page de parceria</dd></div>
						<div><dt>Papel</dt><dd>Web Design · UX/UI · Funil</dd></div>
						<div><dt>Público</dt><dd>Alunos do Método PNG</dd></div>
						<div><dt>Objetivo</dt><dd>Apresentar oferta e conduzir ao CTA</dd></div>
					</dl>

					<div className="pogne-case-actions">
						<a href="https://pogne.ratoeiraadsoficial.com.br" target="_blank" rel="noopener noreferrer" className="pogne-primary-button">Explorar site ao vivo <span aria-hidden>↗</span></a>
						<a href="#pogne-case-content" className="pogne-secondary-button">Ler o case <span aria-hidden>↓</span></a>
					</div>
				</section>

				<section id="pogne-case-content" className="pogne-context pogne-scroll-section">
					<div className="pogne-section-index pogne-reveal">01 / Contexto</div>
					<div>
						<h2 className="pogne-reveal">Duas marcas, uma proposta que precisava parecer indivisível.</h2>
						<p className="pogne-reveal">A Ratoeira Ads e Michael Pogne se uniram para oferecer aos alunos do Método PNG acesso a uma ferramenta de proteção de orçamento e rastreamento de vendas. A página organiza essa colaboração como uma oferta única, em vez de duas narrativas concorrentes.</p>
					</div>
				</section>

				<section className="pogne-message pogne-scroll-section" aria-labelledby="pogne-message-title">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">02 / Arquitetura da mensagem</div>
						<h2 id="pogne-message-title" className="pogne-reveal">Uma página que responde às perguntas na ordem certa.</h2>
						<p className="pogne-reveal">Antes de detalhar funcionalidades, a experiência estabelece público, promessa e mecanismo — e só então pede uma decisão.</p>
					</div>
					<div className="pogne-message-grid">
						{messageSteps.map(step => (
							<article className="pogne-message-card" key={step.index}>
								<div><span>{step.index}</span><i>{step.label}</i></div>
								<h3>{step.title}</h3>
								<p>{step.text}</p>
								<strong aria-hidden>↗</strong>
							</article>
						))}
					</div>
				</section>

				<section className="pogne-funnel pogne-scroll-section">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">03 / Funil visual</div>
						<h2 className="pogne-reveal">Hierarquia para reduzir esforço, não para aumentar pressão.</h2>
						<p className="pogne-reveal">Contraste, escala e repetição orientam a leitura. O visitante entende primeiro o valor da parceria e encontra o CTA como consequência natural do conteúdo.</p>
					</div>
					<div className="pogne-funnel-board pogne-reveal">
						<div className="pogne-funnel-copy">
							<span>Exclusivo para alunos</span>
							<strong>CONTEXTO</strong>
							<i aria-hidden>↓</i>
							<strong>PROMESSA</strong>
							<i aria-hidden>↓</i>
							<strong>PROVA</strong>
							<i aria-hidden>↓</i>
							<button type="button">QUERO MINHA VAGA <b>→</b></button>
						</div>
						<div className="pogne-funnel-screen">
							<div className="pogne-browser-bar"><span /><span /><span /><em>pogne.ratoeiraadsoficial.com.br</em></div>
							<img src="/lovable-uploads/pogne.webp" alt="Interface da campanha mostrando a promessa e chamada para ação" width="2048" height="1024" loading="lazy" />
						</div>
					</div>
				</section>

				<section className="pogne-system pogne-scroll-section">
					<div className="pogne-section-heading">
						<div className="pogne-section-index pogne-reveal">04 / Sistema visual</div>
						<h2 className="pogne-reveal">O amarelo funciona como sinal, não como decoração.</h2>
					</div>
					<div className="pogne-system-grid">
						<div className="pogne-type-specimen pogne-reveal"><span>Display / Sans</span><strong>BLINDAGEM</strong><em>desde o dia zero.</em><p>Escala ampla, peso alto e itálico criam uma leitura que alterna autoridade e velocidade.</p></div>
						<div className="pogne-color-specimen pogne-reveal">
							<div className="pogne-yellow"><span>Signal</span><strong>#F5B800</strong></div>
							<div className="pogne-ink"><span>Ink</span><strong>#0B0B0D</strong></div>
							<div className="pogne-paper"><span>Paper</span><strong>#F4F2F2</strong></div>
						</div>
					</div>
				</section>

				<section className="pogne-closing pogne-scroll-section">
					<p className="pogne-case-eyebrow pogne-reveal">Próximo passo</p>
					<h2 className="pogne-reveal">Sua oferta também precisa ser entendida antes de ser vendida?</h2>
					<p className="pogne-reveal">Posso transformar posicionamento, produto e argumento comercial em uma experiência digital clara e convincente.</p>
					<div className="pogne-case-actions pogne-reveal">
						<a href={`mailto:${contactEmail}?subject=Quero conversar sobre uma landing page`} className="pogne-primary-button">Conversar sobre um projeto <span aria-hidden>→</span></a>
						<a href="/#work" className="pogne-secondary-button">Ver outros projetos</a>
					</div>
				</section>
			</main>

			<footer className="pogne-case-footer"><span>Lucas Coelho · Digital Designer</span><span>Pogne × Ratoeira Ads / 2024</span></footer>
		</div>
	);
}
