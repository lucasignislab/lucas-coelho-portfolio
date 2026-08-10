import { renderToString } from "react-dom/server";
import App, { type CaseComponents } from "./App";
import { AeroCaseStudy } from "./components/AeroCaseStudy";
import { FitsYouCaseStudy } from "./components/FitsYouCaseStudy";
import { RatoeiraHubCaseStudy } from "./components/RatoeiraHubCaseStudy";
import { PogneCaseStudy } from "./components/PogneCaseStudy";

// No SSR usamos imports eager: renderToString (React 18) renderiza apenas
// o fallback de <Suspense> para componentes lazy.
const ssrCases: CaseComponents = {
	Aero: AeroCaseStudy,
	FitsYou: FitsYouCaseStudy,
	RatoeiraHub: RatoeiraHubCaseStudy,
	Pogne: PogneCaseStudy,
};

export function render(path: string) {
	return renderToString(<App path={path} cases={ssrCases} />);
}
