import { useEffect } from "react";
import { breadcrumbSchema, getBreadcrumbs, getSeoPage, SITE_URL } from "@/data/seo";
import { useLocale } from "@/i18n/useTranslations";
import { getServicePage } from "@/data/services";
import { englishArticleCopy } from "@/i18n/blogCopy";

const englishCaseSeo: Record<string, { title: string; description: string }> = {
	"/projetos/aero": { title: "Aero — Product design for project management SaaS", description: "An independent product design case study covering a keyboard-first project management product, its interface, and design system." },
	"/projetos/fits-you": { title: "Fits You Studio — Website design and development", description: "Website design, UX/UI, development, and launch for a cross-training and Pilates studio in Campinas, Brazil." },
	"/projetos/ratoeira-hub": { title: "Ratoeira Hub — Website design for an adtech ecosystem", description: "A website design case study connecting server-side tracking, fraud protection, and landing pages in one product ecosystem." },
	"/projetos/pogne": { title: "Pogne × Ratoeira Ads — Conversion landing page", description: "A partnership landing page case study focused on offer clarity, message hierarchy, UX/UI, and funnel structure." },
};

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
	const locale = useLocale();
	useEffect(() => {
		const page = getSeoPage(pathname);
		let title = page.title;
		let description = page.description;
		if (locale === "en") {
			const service = getServicePage(pathname, locale);
			const articleSlug = pathname.startsWith("/blog/") ? pathname.slice("/blog/".length) : "";
			const articleCopy = englishArticleCopy[articleSlug];
			if (pathname === "/") {
				title = "Lucas Coelho — Digital Designer & Web Developer";
				description = "I design, build, and launch websites and digital products. Explore selected work in website design, landing pages, UX/UI, and design systems.";
			} else if (service) {
				title = service.title;
				description = service.description;
			} else if (pathname === "/blog") {
				title = "Writing on design, products, and code | Lucas Coelho";
				description = "Notes on process, interface decisions, and lessons from real digital projects.";
			} else if (pathname === "/politica-de-privacidade") {
				title = "Privacy Policy | Lucas Coelho";
				description = "Learn what information this portfolio may process, how it is used, and how to exercise your privacy rights under Brazil’s LGPD.";
			} else if (englishCaseSeo[pathname]) {
				({ title, description } = englishCaseSeo[pathname]);
			} else if (articleCopy) {
				title = `${articleCopy.title} | Lucas Coelho`;
				description = articleCopy.summary;
			}
		}
		const canonicalPath = locale === "en" ? `/en${page.path === "/" ? "/" : `${page.path}/`}` : page.path === "/" ? "/" : `${page.path}/`;
		const canonicalUrl = `${SITE_URL}${canonicalPath}`;
		const imageUrl = `${SITE_URL}${page.image}`;

		document.title = title;
		document.documentElement.lang = locale;

		setMeta('meta[name="description"]', "name", "description", description);
		setMeta('meta[name="author"]', "name", "author", "Lucas Coelho");
		setMeta('meta[property="og:type"]', "property", "og:type", page.ogType);
		setMeta('meta[property="og:locale"]', "property", "og:locale", locale === "en" ? "en_US" : "pt_BR");
		setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Lucas Coelho");
		setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
		setMeta('meta[property="og:title"]', "property", "og:title", title);
		setMeta('meta[property="og:description"]', "property", "og:description", description);
		setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
		setMeta('meta[property="og:image:width"]', "property", "og:image:width", String(page.imageWidth));
		setMeta('meta[property="og:image:height"]', "property", "og:image:height", String(page.imageHeight));
		setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", page.imageAlt);
		setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
		setMeta('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
		setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
		setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
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

		const normalizedPath = pathname.replace(/\/+$/, "") || "/";
		const breadcrumbs = getBreadcrumbs(pathname, locale);
		let breadcrumbData = document.head.querySelector<HTMLScriptElement>(
			"#seo-breadcrumb-structured-data"
		);
		if (breadcrumbs.length > 0 && page.path === normalizedPath) {
			if (!breadcrumbData) {
				breadcrumbData = document.createElement("script");
				breadcrumbData.id = "seo-breadcrumb-structured-data";
				breadcrumbData.type = "application/ld+json";
				document.head.appendChild(breadcrumbData);
			}
			breadcrumbData.textContent = JSON.stringify(
				breadcrumbSchema(breadcrumbs, page.path)
			).replace(/</g, "\\u003c");
		} else {
			breadcrumbData?.remove();
		}
	}, [locale, pathname]);

	return null;
}
