import { useEffect } from "react";
import { contactEmail } from "@/data/site";

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

export function AeroCaseStudy() {
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

	return (
		<div className="aero-case">
			<header className="aero-case-header">
				<a href="/#work" className="aero-case-back">
					<span aria-hidden>←</span> Voltar aos projetos
				</a>
				<span className="aero-case-index">Case study / 01</span>
			</header>

			<main>
				<section className="aero-case-hero">
					<p className="aero-case-eyebrow">Projeto autoral e solo · 2025</p>
					<h1>
						Aero
						<span>Project Management SaaS</span>
					</h1>
					<p className="aero-case-lead">
						Um estudo retrospectivo sobre a criação de um ecossistema de
						gestão de projetos keyboard-first, desenhado para reduzir a
						fricção entre ideia, documentação e execução.
					</p>

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
					{panels.map((panel, index) => (
						<figure key={panel.src}>
							<img
								src={panel.src}
								alt={panel.alt}
								width="1400"
								height="940"
								loading={index === 0 ? "eager" : "lazy"}
							/>
						</figure>
					))}
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
