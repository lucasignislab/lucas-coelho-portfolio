import { useEffect } from "react";
import { getSeoPage, SITE_URL } from "@/data/seo";

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
	let element = document.head.querySelector<HTMLMetaElement>(selector);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}
	element.content = content;
}

export function Seo({ pathname }: { pathname: string }) {
	useEffect(() => {
		const page = getSeoPage(pathname);
		const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
		const imageUrl = `${SITE_URL}${page.image}`;

		document.title = page.title;
		document.documentElement.lang = "pt-BR";

		setMeta('meta[name="description"]', "name", "description", page.description);
		setMeta('meta[name="author"]', "name", "author", "Lucas Coelho");
		setMeta('meta[property="og:type"]', "property", "og:type", page.ogType);
		setMeta('meta[property="og:locale"]', "property", "og:locale", "pt_BR");
		setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Lucas Coelho");
		setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
		setMeta('meta[property="og:title"]', "property", "og:title", page.title);
		setMeta('meta[property="og:description"]', "property", "og:description", page.description);
		setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
		setMeta('meta[property="og:image:width"]', "property", "og:image:width", String(page.imageWidth));
		setMeta('meta[property="og:image:height"]', "property", "og:image:height", String(page.imageHeight));
		setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", page.imageAlt);
		setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
		setMeta('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
		setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
		setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
		setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
		setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", page.imageAlt);

		let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!canonical) {
			canonical = document.createElement("link");
			canonical.rel = "canonical";
			document.head.appendChild(canonical);
		}
		canonical.href = canonicalUrl;

		let structuredData = document.head.querySelector<HTMLScriptElement>("#seo-structured-data");
		if (!structuredData) {
			structuredData = document.createElement("script");
			structuredData.id = "seo-structured-data";
			structuredData.type = "application/ld+json";
			document.head.appendChild(structuredData);
		}
		structuredData.textContent = JSON.stringify(page.schema).replace(/</g, "\\u003c");
	}, [pathname]);

	return null;
}
