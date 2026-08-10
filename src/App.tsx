import {
	Component,
	lazy,
	Suspense,
	type ComponentType,
	type ErrorInfo,
	type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Cursor } from "@/components/Cursor";
import { Seo } from "@/components/Seo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { SelectedWork } from "@/components/SelectedWork";
import { Footer } from "@/components/Footer";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { useGtagPageview } from "@/hooks/useGtagPageview";

const lazyBlog: BlogComponents = {
	Index: lazy(() =>
		import("@/components/BlogIndex").then(module => ({
			default: module.BlogIndex,
		}))
	),
	Article: lazy(() =>
		import("@/components/BlogArticle").then(module => ({
			default: module.BlogArticle,
		}))
	),
};

export interface BlogComponents {
	Index: ComponentType;
	Article: ComponentType<{ slug: string }>;
}

export interface CaseComponents {
	Aero: ComponentType;
	FitsYou: ComponentType;
	RatoeiraHub: ComponentType;
	Pogne: ComponentType;
}

const lazyCases: CaseComponents = {
	Aero: lazy(() =>
		import("@/components/AeroCaseStudy").then(module => ({
			default: module.AeroCaseStudy,
		}))
	),
	FitsYou: lazy(() =>
		import("@/components/FitsYouCaseStudy").then(module => ({
			default: module.FitsYouCaseStudy,
		}))
	),
	RatoeiraHub: lazy(() =>
		import("@/components/RatoeiraHubCaseStudy").then(module => ({
			default: module.RatoeiraHubCaseStudy,
		}))
	),
	Pogne: lazy(() =>
		import("@/components/PogneCaseStudy").then(module => ({
			default: module.PogneCaseStudy,
		}))
	),
};

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

interface AppProps {
	/** Caminho forçado (SSR). No cliente, usa window.location. */
	path?: string;
	/** Componentes de case eager (SSR). No cliente, usa React.lazy. */
	cases?: CaseComponents;
	/** Componentes do blog eager (SSR). No cliente, usa React.lazy. */
	blog?: BlogComponents;
}

function App({ path, cases, blog }: AppProps) {
	const pathname = (
		path ?? (typeof window !== "undefined" ? window.location.pathname : "/")
	).replace(/\/+$/, "") || "/";
	const Cases = cases ?? lazyCases;
	const Blog = blog ?? lazyBlog;

	useGtagPageview(pathname);

	if (pathname === "/blog") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Blog.Index />
				</Suspense>
			</ErrorBoundary>
		);
	}

	if (pathname.startsWith("/blog/")) {
		const slug = pathname.slice("/blog/".length);
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Blog.Article slug={slug} />
				</Suspense>
			</ErrorBoundary>
		);
	}

	if (pathname === "/politica-de-privacidade") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Cursor />
				<PrivacyPolicy />
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/aero") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Cases.Aero />
				</Suspense>
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/fits-you") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Cases.FitsYou />
				</Suspense>
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/ratoeira-hub") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Cases.RatoeiraHub />
				</Suspense>
			</ErrorBoundary>
		);
	}

	if (pathname === "/projetos/pogne") {
		return (
			<ErrorBoundary>
				<Seo pathname={pathname} />
				<Suspense fallback={null}>
					<Cases.Pogne />
				</Suspense>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<Seo pathname={pathname} />
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
