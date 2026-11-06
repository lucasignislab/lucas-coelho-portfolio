import { useState } from "react";
import { useLocale } from "@/i18n/useTranslations";

interface ColorToken {
	className: string;
	hex: string;
	role: string;
}

interface ColorGroup {
	title: string;
	subtitle: string;
	tokens: readonly ColorToken[];
}

const colorGroups: readonly ColorGroup[] = [
	{
		title: "Marca e Estrutura",
		subtitle: "7 tokens · superfícies e ação",
		tokens: [
			{
				className: "bg-primary",
				hex: "#24262F",
				role: "Fundo principal da aplicação (Body)",
			},
			{
				className: "bg-primary-10",
				hex: "#1D1F26",
				role: "Painéis (Sidebar), cards primários",
			},
			{
				className: "bg-primary-20",
				hex: "#17181D",
				role: "Inputs, dropdowns",
			},
			{
				className: "bg-primary-30",
				hex: "#101115",
				role: "Sombras profundas, bordas sutis",
			},
			{
				className: "bg-brand",
				hex: "#388CFA",
				role: "Ação principal (links, botões primários)",
			},
			{
				className: "bg-background",
				hex: "#0E1015",
				role: "Fundo alternativo profundo",
			},
			{
				className: "bg-card",
				hex: "#1A1C23",
				role: "Superfícies elevadas",
			},
		],
	},
	{
		title: "Texto e Conteúdo — Neutral",
		subtitle: "5 tokens · hierarquia de leitura",
		tokens: [
			{
				className: "text-neutral",
				hex: "#FFFFFF",
				role: "Títulos, texto de alto contraste",
			},
			{
				className: "text-neutral-10",
				hex: "#F5F5F5",
				role: "Texto do corpo principal",
			},
			{
				className: "text-neutral-20",
				hex: "#D4D4D4",
				role: "Legendas, descrições secundárias",
			},
			{
				className: "text-neutral-30",
				hex: "#A3A3A3",
				role: "Placeholders, ícones inativos",
			},
			{
				className: "text-neutral-40",
				hex: "#737373",
				role: "Bordas desabilitadas",
			},
		],
	},
	{
		title: "Feedback e Status",
		subtitle: "5 tokens · estados semânticos",
		tokens: [
			{
				className: "bg-success",
				hex: "#18821C",
				role: "Concluído, seguro, positivo",
			},
			{
				className: "bg-warning",
				hex: "#A35A01",
				role: "Atenção, pendente, cuidado",
			},
			{
				className: "bg-danger",
				hex: "#911756",
				role: "Erro, falha, ação destrutiva",
			},
			{
				className: "bg-info",
				hex: "#008E8E",
				role: "Informativo, neutro",
			},
			{
				className: "bg-accent",
				hex: "#535C91",
				role: "Destaque secundário, badges, tags",
			},
		],
	},
] as const;

const componentStates = ["Default", "Hover", "Focus", "Disabled"] as const;

export function AeroDesignSystemPanel() {
	const en = useLocale() === "en";
	const [copiedToken, setCopiedToken] = useState<string | null>(null);
	const [componentState, setComponentState] =
		useState<(typeof componentStates)[number]>("Default");

	async function copyToken(hex: string) {
		try {
			await navigator.clipboard.writeText(hex);
			setCopiedToken(hex);
			window.setTimeout(() => setCopiedToken(null), 1400);
		} catch {
			setCopiedToken(null);
		}
	}

	return (
		<section
			className="aero-design-system-panel aero-gallery-item"
			aria-labelledby="aero-design-system-title"
		>
			<div className="aero-ds-grid" aria-hidden="true" />
			<div className="aero-interactive-meta">
				<span>{en ? "Aero · Product case study" : "Aero · Estudo de caso de produto"}</span>
				<span>/07</span>
			</div>

			<header className="aero-ds-heading">
				<div>
					<p>Design system</p>
					<h2 id="aero-design-system-title">
						{en ? "How does color work in Aero’s design system?" : "Como a cor funciona no design system do Aero?"}
					</h2>
				</div>
				<p>{en ? "The expanded system includes 18 color tokens, 7 type levels, 8 spacing steps, and 9 components. Color appears when it communicates state, hierarchy, or action—each token names a role, not just an appearance." : <>
					O sistema expandido fecha em 18 tokens de cor, 7 níveis
					tipográficos, 8 passos de espaçamento e 9 componentes. A cor
					aparece quando comunica estado, hierarquia ou ação — e cada
					token nomeia um papel, não uma aparência.
				</>}</p>
			</header>

			<div
				className="aero-ds-token-groups"
				aria-label={en ? "Aero color tokens" : "Tokens de cor do Aero"}
			>
				{colorGroups.map(group => (
					<section
						key={group.title}
						className="aero-ds-token-group"
						aria-label={group.title}
					>
						<div className="aero-ds-section-label">
							<span>{en ? ({ "Marca e Estrutura": "Brand and structure", "Texto e Conteúdo — Neutral": "Text and content — Neutral", "Feedback e Status": "Feedback and status" }[group.title] ?? group.title) : group.title}</span>
							<span>{en ? ({ "7 tokens · superfícies e ação": "7 tokens · surfaces and action", "5 tokens · hierarquia de leitura": "5 tokens · reading hierarchy", "5 tokens · estados semânticos": "5 tokens · semantic states" }[group.subtitle] ?? group.subtitle) : group.subtitle}</span>
						</div>
						<div className="aero-ds-token-grid">
							{group.tokens.map(token => (
								<button
									key={token.className}
									type="button"
									className="aero-ds-token-card"
									onClick={() => void copyToken(token.hex)}
									aria-label={`${en ? "Copy token" : "Copiar token"} ${token.className}, ${token.hex}`}
								>
									<i
										className="aero-ds-token-chip"
										style={{ backgroundColor: token.hex }}
										aria-hidden="true"
									/>
									<span className="aero-ds-token-class">
										{token.className}
									</span>
									<strong>
						{copiedToken === token.hex ? en ? "Copied" : "Copiado" : token.hex}
									</strong>
						<small>{en ? ({ "Fundo principal da aplicação (Body)": "Primary application background (body)", "Painéis (Sidebar), cards primários": "Panels (sidebar), primary cards", "Inputs, dropdowns": "Inputs and dropdowns", "Sombras profundas, bordas sutis": "Deep shadows and subtle borders", "Ação principal (links, botões primários)": "Primary action (links and buttons)", "Fundo alternativo profundo": "Deep alternative background", "Superfícies elevadas": "Elevated surfaces", "Títulos, texto de alto contraste": "Headings and high-contrast text", "Texto do corpo principal": "Primary body text", "Legendas, descrições secundárias": "Captions and secondary descriptions", "Placeholders, ícones inativos": "Placeholders and inactive icons", "Bordas desabilitadas": "Disabled borders", "Concluído, seguro, positivo": "Complete, safe, positive", "Atenção, pendente, cuidado": "Attention, pending, caution", "Erro, falha, ação destrutiva": "Error, failure, destructive action", "Informativo, neutro": "Informative, neutral", "Destaque secundário, badges, tags": "Secondary highlight, badges, tags" }[token.role] ?? token.role) : token.role}</small>
								</button>
							))}
						</div>
					</section>
				))}
			</div>

			<div className="aero-ds-showcase">
				<section className="aero-ds-type" aria-labelledby="aero-type-title">
					<div className="aero-ds-section-label">
						<span id="aero-type-title">{en ? "Typography" : "Tipografia"}</span>
						<span>{en ? "7 levels · functional hierarchy" : "7 níveis · hierarquia funcional"}</span>
					</div>
					<div className="aero-ds-type-sample">
						<span aria-hidden="true">Aa</span>
						<div>
							<strong>Inter</strong>
							<p>{en ? "Headings, content, and controls" : "Títulos, conteúdo e controles"}</p>
						</div>
					</div>
					<div className="aero-ds-mono-sample">
						<span>JETBRAINS MONO / METADATA / STATUS</span>
						<span>12PX · UPPERCASE · TRACKING</span>
					</div>
				</section>

				<section
					className="aero-ds-components"
					aria-labelledby="aero-components-title"
				>
					<div className="aero-ds-section-label">
						<span id="aero-components-title">{en ? "Components" : "Componentes"}</span>
						<span>{en ? "9 components · observable states" : "9 componentes · estados observáveis"}</span>
					</div>

					<div className="aero-ds-state-tabs" aria-label={en ? "Component state" : "Estado do componente"}>
						{componentStates.map(state => (
							<button
								key={state}
								type="button"
								aria-pressed={componentState === state}
								onClick={() => setComponentState(state)}
							>
								{en ? state : ({ Default: "Padrão", Hover: "Hover", Focus: "Foco", Disabled: "Desabilitado" }[state])}
							</button>
						))}
					</div>

					<div
						className={`aero-ds-component-preview is-${componentState.toLowerCase()}`}
					>
						<div className="aero-ds-status-row">
							<span className="aero-ds-status progress">
								<i />
								In progress
							</span>
							<span className="aero-ds-status done">
								<i />
								Done
							</span>
						</div>
						<button type="button" disabled={componentState === "Disabled"}>
							{en ? "Create task" : "Criar tarefa"} <span>⌘ ↵</span>
						</button>
						<label>
							<span className="sr-only">{en ? "Search projects" : "Buscar projetos"}</span>
							<input
								type="search"
								placeholder={en ? "Search projects..." : "Buscar projetos..."}
								disabled={componentState === "Disabled"}
							/>
							<kbd>⌘ K</kbd>
						</label>
					</div>
				</section>
			</div>

			<footer className="aero-ds-footer">
				<div>
					<strong>13,6:1</strong>
					<span>{en ? "Primary text contrast" : "Contraste do texto principal"}</span>
				</div>
				<ul>
					<li>{en ? "Visible focus rings" : "Focus rings visíveis"}</li>
					<li>{en ? "Keyboard navigation" : "Navegação por teclado"}</li>
					<li>{en ? "Hierarchy that doesn’t rely on color alone" : "Hierarquia sem depender apenas de cor"}</li>
				</ul>
				<a
					className="aero-ds-docs-link"
					href="https://aeroprojectmanager.netlify.app/design-system"
					target="_blank"
					rel="noopener noreferrer"
				>
					{en ? "Live design system documentation" : "Documentação viva do design system"} ↗
				</a>
			</footer>
		</section>
	);
}
