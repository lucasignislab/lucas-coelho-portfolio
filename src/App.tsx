import { Component, type ErrorInfo, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { SelectedWork } from "@/components/SelectedWork";
import { Footer } from "@/components/Footer";
import { AeroCaseStudy } from "@/components/AeroCaseStudy";
import { FitsYouCaseStudy } from "@/components/FitsYouCaseStudy";
import { RatoeiraHubCaseStudy } from "@/components/RatoeiraHubCaseStudy";

gsap.registerPlugin(ScrollTrigger);

/**
 * Error boundary — se qualquer componente filho quebrar,
 * mostra um fallback em vez de uma pagina branca.
 */
class ErrorBoundary extends Component<
	{ children: ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: { children: ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}
	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("[App ErrorBoundary]", error, info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center p-8 text-center">
					<div>
						<p className="eyebrow mb-4">Erro ao carregar</p>
						<h1 className="font-display text-4xl text-bone mb-4">
							Algo deu errado
						</h1>
						<p className="text-ash text-sm max-w-md mb-6">
							{this.state.error?.message || "Erro desconhecido. Tente recarregar a pagina."}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="btn-primary"
						>
							Recarregar
						</button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

function App() {
	const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

	if (pathname === "/projetos/aero") {
		return (
			<ErrorBoundary>
				<AeroCaseStudy />
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/fits-you") {
		return (
			<ErrorBoundary>
				<FitsYouCaseStudy />
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/ratoeira-hub") {
		return (
			<ErrorBoundary>
				<RatoeiraHubCaseStudy />
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<Cursor />
			<SmoothScroll>
				<Header />
				<main>
					<Hero />
					<div className="divider" />
					<About />
					<div className="divider" />
					<Skills />
					<div className="divider" />
					<SelectedWork />
					<div className="divider" />
					<Footer />
				</main>
			</SmoothScroll>
		</ErrorBoundary>
	);
}

export default App;
