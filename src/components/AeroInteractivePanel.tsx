import type { PointerEvent as ReactPointerEvent } from "react";

type PanelKind = "challenge" | "principles" | "audiences" | "learnings";

type Card = {
	number?: string;
	badge?: string;
	icon?: "plus" | "equal" | "keyboard";
	title: string;
	body: string;
	tag?: string;
	accent: "blue" | "violet" | "green";
};

type Panel = {
	page: string;
	kicker?: string;
	title: string;
	description?: string;
	cards: Card[];
	footerLabel?: string;
	footerText?: string;
};

const panelContent: Record<PanelKind, Panel> = {
	challenge: {
		page: "02",
		kicker: "Aero · Product Case Study",
		title: "O desafio",
		description:
			"Ferramentas de gestão poderosas também podem se tornar lentas, inchadas e difíceis de atravessar.",
		cards: [
			{
				number: "01",
				title: "Muitos cliques",
				body: "Ações simples exigiam caminhos longos.",
				accent: "blue",
			},
			{
				number: "02",
				title: "Troca de contexto",
				body: "Alternar entre mouse, teclado e páginas quebra o fluxo.",
				accent: "blue",
			},
			{
				number: "03",
				title: "Excesso visual",
				body: "Interface demais compete com o trabalho real.",
				accent: "blue",
			},
		],
		footerLabel: "Pergunta de design",
		footerText: "Como fazer a interface desaparecer durante a execução?",
	},
	principles: {
		page: "03",
		title: "Três princípios para reduzir fricção",
		description:
			"A direção do produto foi construída como um conjunto de hipóteses que poderiam ser testadas na interface funcional.",
		cards: [
			{
				icon: "plus",
				title: "Fricção zero",
				body: "Registrar uma ideia deve ser quase instantâneo.",
				tag: "Ideia → registro",
				accent: "blue",
			},
			{
				icon: "equal",
				title: "Densidade útil",
				body: "Mais contexto por tela, sem ruído decorativo.",
				tag: "Informação > ornamento",
				accent: "violet",
			},
			{
				icon: "keyboard",
				title: "Keyboard-first",
				body: "Atalhos e comandos tornam o mouse uma escolha.",
				tag: "Comando → ação",
				accent: "green",
			},
		],
	},
	audiences: {
		page: "04",
		kicker: "Aero · Product Case Study",
		title: "Necessidades que orientaram o produto",
		description:
			"Não são personas de pesquisa formal. São hipóteses de uso derivadas dos fluxos que o produto precisava suportar.",
		cards: [
			{
				badge: "Builders",
				title: "Velocidade sem interrupção",
				body: "Criar, buscar e navegar sem tirar as mãos do teclado.",
				tag: "Atalhos · resposta · foco",
				accent: "blue",
			},
			{
				badge: "Product Managers",
				title: "Detalhe sem perder contexto",
				body: "Abrir especificações sem abandonar a visão do sprint e dos gargalos.",
				tag: "Contexto · documentação · visão",
				accent: "violet",
			},
		],
	},
	learnings: {
		page: "09",
		title: "O que este projeto ensinou",
		cards: [
			{
				number: "01",
				title: "Documentar antes de construir",
				body: "Definir o que o produto deveria fazer reduziu decisões contraditórias durante a implementação.",
				accent: "blue",
			},
			{
				number: "02",
				title: "A simplicidade tem bastidores",
				body: "Interações que parecem óbvias exigem estados, eventos e feedbacks cuidadosamente coordenados.",
				accent: "violet",
			},
		],
		footerLabel: "Próximo passo",
		footerText:
			"Validar os fluxos com usuários reais e medir tempo de execução.",
	},
};

function updateCardTilt(event: ReactPointerEvent<HTMLElement>) {
	if (event.pointerType === "touch") return;
	const card = event.currentTarget;
	const bounds = card.getBoundingClientRect();
	const x = (event.clientX - bounds.left) / bounds.width;
	const y = (event.clientY - bounds.top) / bounds.height;

	card.style.setProperty("--card-rx", `${(0.5 - y) * 7}deg`);
	card.style.setProperty("--card-ry", `${(x - 0.5) * 9}deg`);
	card.style.setProperty("--card-mx", `${x * 100}%`);
	card.style.setProperty("--card-my", `${y * 100}%`);
}

function resetCardTilt(event: ReactPointerEvent<HTMLElement>) {
	const card = event.currentTarget;
	card.style.setProperty("--card-rx", "0deg");
	card.style.setProperty("--card-ry", "0deg");
	card.style.setProperty("--card-mx", "50%");
	card.style.setProperty("--card-my", "50%");
}

function CardIcon({ icon }: { icon: Card["icon"] }) {
	if (!icon) return null;

	return (
		<span className={`aero-micro-icon aero-micro-icon-${icon}`} aria-hidden="true">
			{icon === "plus" && <><i /><i /></>}
			{icon === "equal" && <><i /><i /></>}
			{icon === "keyboard" && <i />}
		</span>
	);
}

export function AeroInteractivePanel({ kind }: { kind: PanelKind }) {
	const panel = panelContent[kind];

	return (
		<section
			className={`aero-interactive-panel aero-gallery-item aero-panel-${kind}`}
			aria-labelledby={`aero-panel-${kind}-title`}
		>
			<div className="aero-interactive-orbit" aria-hidden="true" />
			<div className="aero-interactive-meta">
				{panel.kicker ? <span>{panel.kicker}</span> : <span />}
				<span>/{panel.page}</span>
			</div>

			<header className="aero-interactive-heading">
				<h2 id={`aero-panel-${kind}-title`}>{panel.title}</h2>
				{panel.description && <p>{panel.description}</p>}
			</header>

			<div
				className={`aero-interactive-cards aero-interactive-cards-${panel.cards.length}`}
			>
				{panel.cards.map(card => (
					<article
						key={card.title}
						className={`aero-micro-card aero-accent-${card.accent}`}
						onPointerMove={updateCardTilt}
						onPointerLeave={resetCardTilt}
					>
						<span className="aero-card-glow" aria-hidden="true" />
						<div className="aero-card-topline">
							{card.number && (
								<span className="aero-card-number">{card.number}</span>
							)}
							{card.badge && (
								<span className="aero-card-badge">{card.badge}</span>
							)}
							<CardIcon icon={card.icon} />
							<span className="aero-card-pulse" aria-hidden="true" />
						</div>
						<h3>{card.title}</h3>
						<p>{card.body}</p>
						{card.tag && <strong>{card.tag}</strong>}
						<span className="aero-card-corner" aria-hidden="true" />
					</article>
				))}
			</div>

			{panel.footerText && (
				<footer className="aero-interactive-footer">
					<span>{panel.footerLabel}</span>
					<strong>{panel.footerText}</strong>
				</footer>
			)}
		</section>
	);
}
