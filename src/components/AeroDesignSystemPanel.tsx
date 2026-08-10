import { useState } from "react";

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
				<span>Aero · Product Case Study</span>
				<span>/07</span>
			</div>

			<header className="aero-ds-heading">
				<div>
					<p>Design system</p>
					<h2 id="aero-design-system-title">
						Cor como sinal,
						<br />
						não decoração.
					</h2>
				</div>
				<p>
					O sistema expandido fecha em 18 tokens de cor, 7 níveis
					tipográficos, 8 passos de espaçamento e 9 componentes. A cor
					aparece quando comunica estado, hierarquia ou ação — e cada
					token nomeia um papel, não uma aparência.
				</p>
			</header>

			<div
				className="aero-ds-token-groups"
				aria-label="Tokens de cor do Aero"
			>
				{colorGroups.map(group => (
					<section
						key={group.title}
						className="aero-ds-token-group"
						aria-label={group.title}
					>
						<div className="aero-ds-section-label">
							<span>{group.title}</span>
							<span>{group.subtitle}</span>
						</div>
						<div className="aero-ds-token-grid">
							{group.tokens.map(token => (
								<button
									key={token.className}
									type="button"
									className="aero-ds-token-card"
									onClick={() => void copyToken(token.hex)}
									aria-label={`Copiar token ${token.className}, ${token.hex}`}
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
										{copiedToken === token.hex ? "Copiado" : token.hex}
									</strong>
									<small>{token.role}</small>
								</button>
							))}
						</div>
					</section>
				))}
			</div>

			<div className="aero-ds-showcase">
				<section className="aero-ds-type" aria-labelledby="aero-type-title">
					<div className="aero-ds-section-label">
						<span id="aero-type-title">Tipografia</span>
						<span>7 níveis · hierarquia funcional</span>
					</div>
					<div className="aero-ds-type-sample">
						<span aria-hidden="true">Aa</span>
						<div>
							<strong>Inter</strong>
							<p>Títulos, conteúdo e controles</p>
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
						<span id="aero-components-title">Componentes</span>
						<span>9 componentes · estados observáveis</span>
					</div>

					<div className="aero-ds-state-tabs" aria-label="Estado do componente">
						{componentStates.map(state => (
							<button
								key={state}
								type="button"
								aria-pressed={componentState === state}
								onClick={() => setComponentState(state)}
							>
								{state}
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
							Criar tarefa <span>⌘ ↵</span>
						</button>
						<label>
							<span className="sr-only">Buscar projetos</span>
							<input
								type="search"
								placeholder="Buscar projetos..."
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
					<span>Contraste do texto principal</span>
				</div>
				<ul>
					<li>Focus rings visíveis</li>
					<li>Navegação por teclado</li>
					<li>Hierarquia sem depender apenas de cor</li>
				</ul>
				<a
					className="aero-ds-docs-link"
					href="https://aeroprojectmanager.netlify.app/design-system"
					target="_blank"
					rel="noopener noreferrer"
				>
					Documentação viva do design system ↗
				</a>
			</footer>
		</section>
	);
}
