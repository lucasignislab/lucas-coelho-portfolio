import { renderToString } from "react-dom/server";
import App, { type BlogComponents, type CaseComponents } from "./App";
import { AeroCaseStudy } from "./components/AeroCaseStudy";
import { FitsYouCaseStudy } from "./components/FitsYouCaseStudy";
import { RatoeiraHubCaseStudy } from "./components/RatoeiraHubCaseStudy";
import { PogneCaseStudy } from "./components/PogneCaseStudy";
import { BlogIndex } from "./components/BlogIndex";
import { BlogArticle } from "./components/BlogArticle";

// No SSR usamos imports eager: renderToString (React 18) renderiza apenas
// o fallback de <Suspense> para componentes lazy.
const ssrCases: CaseComponents = {
	Aero: AeroCaseStudy,
	FitsYou: FitsYouCaseStudy,
	RatoeiraHub: RatoeiraHubCaseStudy,
	Pogne: PogneCaseStudy,
};

const ssrBlog: BlogComponents = {
	Index: BlogIndex,
	Article: BlogArticle,
};

export function render(path: string) {
	return renderToString(<App path={path} cases={ssrCases} blog={ssrBlog} />);
}
