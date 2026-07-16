import { contactEmail, navItems } from "@/data/site";

/**
 * Header posicionado no topo e integrado ao fluxo de rolagem:
 *  - Esquerda: "— Lucas Coelho" baseline
 *  - Direita: navegação + botão de contato
 *  (Logo/ícone removido a pedido do usuário)
 */
export function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between mix-blend-difference pointer-events-none">
			{/* Left: baseline */}
			<a
				href="#top"
				className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-bone pointer-events-auto"
			>
				— Lucas Coelho
			</a>

			{/* Right: nav */}
			<nav className="flex items-center gap-6 md:gap-10 pointer-events-auto">
				<ul className="hidden md:flex items-center gap-8">
					{navItems.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="font-mono text-xs uppercase tracking-[0.2em] text-bone link-underline"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<a
					href={`mailto:${contactEmail}`}
					className="magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bone/40 text-bone font-mono text-xs uppercase tracking-[0.2em] hover:border-ember hover:text-ember transition-colors duration-500"
				>
					<span className="hidden md:inline">Vamos conversar</span>
					<span className="md:hidden">Contato</span>
				</a>
			</nav>
		</header>
	);
}
