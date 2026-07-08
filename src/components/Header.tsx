import { useTilt } from "@/hooks/use-tilt";
import { navItems } from "@/data/site";
import { Logo } from "@/components/Logo";

/**
 * Header fixo scalzo-style:
 *  - Esquerda: "— Lucas Coelho" baseline
 *  - Centro: Logo SVG (triângulo isóscele) com VanillaTilt
 *  - Direita: nav items + botão magnético "Email me"
 */
export function Header() {
	const logoRef = useTilt<HTMLAnchorElement>({ max: 12, speed: 400, scale: 1.05 });

	return (
		<header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between mix-blend-difference pointer-events-none">
			{/* Left: baseline */}
			<a
				href="#top"
				className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-bone pointer-events-auto"
			>
				— Lucas Coelho
			</a>

			{/* Center: Logo */}
			<a
				ref={logoRef}
				href="#top"
				aria-label="Topo"
				className="pointer-events-auto absolute left-1/2 -translate-x-1/2 will-change-transform"
			>
				<Logo ariaLabel="Topo" />
			</a>

			{/* Right: nav */}
			<nav className="flex items-center gap-6 md:gap-10 pointer-events-auto">
				<ul className="hidden md:flex items-center gap-8">
					{navItems.map((item) => {
						// "Work" ganha o sobrescrito de anos de experiencia
						// (2017 -> 2026 = 09), scalzo-style.
						const isWork = item.href === "#work";
						return (
							<li key={item.href}>
								<a
									href={item.href}
									className="font-mono text-xs uppercase tracking-[0.2em] text-bone link-underline"
								>
									{item.label}
									{isWork && (
										<sup className="ml-0.5 text-[0.6em] font-normal opacity-80">
											09
										</sup>
									)}
								</a>
							</li>
						);
					})}
				</ul>

				<a
					href="mailto:lucascoelho.cps@gmail.com"
					className="magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bone/40 text-bone font-mono text-xs uppercase tracking-[0.2em] hover:border-ember hover:text-ember transition-colors duration-500"
				>
					Email me
				</a>
			</nav>
		</header>
	);
}
