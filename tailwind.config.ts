import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Brand palette — lucascoelhoux-site (warm dark with coral accent)
				ink: '#212121',          // base background
				ember: '#E28868',        // primary accent
				ash: '#827F7E',          // secondary text
				bone: '#F4F1ED',         // light contrast (primary text on dark)
				smoke: '#1A1717',        // deep background

				// Scalzo-inspired utility colors
				white: '#FFFFFF',
				black: '#000000',
				'blush': '#F2C8CC',      // subtle accent
			},
			fontFamily: {
				display: ['"Fraunces"', 'Georgia', 'serif'],
				sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			letterSpacing: {
				tightest: '-0.06em',
				ultratight: '-0.04em',
			},
			fontSize: {
				'mega': 'clamp(4rem, 14vw, 16rem)',
				'huge': 'clamp(2.5rem, 8vw, 8rem)',
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.4' },
				},
			},
			animation: {
				'fade-up': 'fade-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
				'marquee': 'marquee 40s linear infinite',
				'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
			},
		},
	},
	plugins: [],
} satisfies Config;
