interface LogoProps {
	className?: string;
	ariaLabel?: string;
}

/**
 * Logo SVG institucional — triangulo isosceles estilizado.
 * Reutilizado no Header (com tilt), Footer e Loading.
 * Cor herdada via `currentColor` (Tailwind: text-*).
 */
export function Logo({ className = "text-bone", ariaLabel = "Lucas Coelho" }: LogoProps) {
	return (
		<svg
			width="29"
			height="32"
			viewBox="0 0 29 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			role="img"
			aria-label={ariaLabel}
		>
			<path d="M1.59633 28.6667L0 32L18.6239 22.9333L21.6835 16L1.59633 28.6667Z" fill="currentColor" />
			<path d="M1.72936 28.1333L5.58716 25.7333L18.0917 8L14.5 0L1.72936 28.1333Z" fill="currentColor" />
			<path d="M22.0826 16.1333L19.0229 23.0667L22.6147 28.2667L29 32L22.0826 16.1333Z" fill="currentColor" />
			<path d="M14.5 32L22.6147 28.6667L28.2018 32H14.5Z" fill="currentColor" />
		</svg>
	);
}
