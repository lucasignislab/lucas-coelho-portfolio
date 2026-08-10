import { useEffect } from "react";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

let lastSentPath: string | null = null;

function sendPageview() {
	if (typeof window === "undefined") return;
	if (typeof window.gtag !== "function") return;
	const path = window.location.pathname + window.location.search;
	// O gtag('config') do snippet já envia o page_view inicial; só
	// reenviamos quando o caminho realmente muda (navegação SPA).
	if (lastSentPath === null) {
		lastSentPath = path;
		return;
	}
	if (path === lastSentPath) return;
	lastSentPath = path;
	window.gtag("event", "page_view", {
		page_path: path,
		page_title: document.title,
	});
}

/**
 * Dispara page_view no GA4 (injetado externamente via Netlify snippet).
 * Como a navegação usa full page loads + pushState ocasional, escuta
 * mudanças de pathname, popstate e pushState. Não faz nada se gtag
 * não existir.
 */
export function useGtagPageview(pathname: string) {
	useEffect(() => {
		sendPageview();

		const originalPushState = window.history.pushState;
		window.history.pushState = function pushState(...args) {
			const result = originalPushState.apply(this, args);
			sendPageview();
			return result;
		};
		window.addEventListener("popstate", sendPageview);

		return () => {
			window.history.pushState = originalPushState;
			window.removeEventListener("popstate", sendPageview);
		};
	}, [pathname]);
}
