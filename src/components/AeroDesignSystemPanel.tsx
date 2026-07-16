import { useState } from "react";

const colorTokens = [
	{
		name: "Background",
		hex: "#101115",
		usage: "Canvas principal",
		tone: "dark",
	},
	{
		name: "Surface",
		hex: "#24262F",
		usage: "Cards e painéis",
		tone: "surface",
	},
	{
		name: "Action",
		hex: "#388CFA",
		usage: "Ações e foco",
		tone: "blue",
	},
	{
		name: "Destructive",
		hex: "#911756",
		usage: "Ações críticas",
		tone: "red",
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
					Uma base neutra reduz competição visual. A cor aparece quando
					comunica estado, hierarquia ou ação.
				</p>
			</header>

			<div className="aero-ds-palette" aria-label="Tokens de cor do Aero">
				{colorTokens.map(token => (
					<button
						key={token.hex}
						type="button"
						className={`aero-ds-swatch aero-ds-${token.tone}`}
						onClick={() => void copyToken(token.hex)}
						aria-label={`Copiar cor ${token.name}, ${token.hex}`}
					>
						<span>{token.name}</span>
						<strong>{copiedToken === token.hex ? "Copiado" : token.hex}</strong>
						<small>{token.usage}</small>
						<i aria-hidden="true">+</i>
					</button>
				))}
			</div>

			<div className="aero-ds-showcase">
				<section className="aero-ds-type" aria-labelledby="aero-type-title">
					<div className="aero-ds-section-label">
						<span id="aero-type-title">Tipografia</span>
						<span>Hierarquia funcional</span>
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
						<span>Estados observáveis</span>
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
			</footer>
		</section>
	);
}
