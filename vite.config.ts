import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import {
	breadcrumbSchema,
	getBreadcrumbs,
	seoPages,
	SITE_URL,
	type SeoPage,
} from "./src/data/seo";
import { englishArticleCopy } from "./src/i18n/blogCopy";
import { getServicePages } from "./src/data/services";
import { localizePath } from "./src/i18n/locale";

const englishCaseSeo: Record<string, { title: string; description: string }> = {
	"/projetos/aero": { title: "Aero — Product design for project management SaaS", description: "An independent product design case study covering a keyboard-first project management product, its interface, and design system." },
	"/projetos/fits-you": { title: "Fits You Studio — Website design and development", description: "Website design, UX/UI, development, and launch for a cross-training and Pilates studio in Campinas, Brazil." },
	"/projetos/ratoeira-hub": { title: "Ratoeira Hub — Website design for an adtech ecosystem", description: "A website design case study connecting server-side tracking, fraud protection, and landing pages in one product ecosystem." },
	"/projetos/pogne": { title: "Pogne × Ratoeira Ads — Conversion landing page", description: "A partnership landing page case study focused on offer clarity, message hierarchy, UX/UI, and funnel structure." },
};

function getEnglishSeoPage(page: SeoPage): SeoPage {
	const contentPath = page.path.replace(/^\/en/, "").replace(/\/$/, "") || "/";
	const articleSlug = contentPath.startsWith("/blog/") ? contentPath.slice("/blog/".length) : "";
	const article = englishArticleCopy[articleSlug];
	const service = getServicePages("en").find(item => item.path === contentPath);
	let title = page.title;
	let description = page.description;
	let schema = { ...page.schema };

	if (contentPath === "/") {
		title = "Lucas Coelho — Digital Designer & Web Developer";
		description = "I design, build, and launch websites and digital products. Explore selected work in website design, landing pages, UX/UI, and design systems.";
	} else if (contentPath === "/blog") {
		title = "Writing on design, products, and code | Lucas Coelho";
		description = "Notes on process, interface decisions, and lessons from real digital projects.";
		schema = { ...schema, name: "Blog — Lucas Coelho", description, inLanguage: "en" };
	} else if (contentPath === "/politica-de-privacidade") {
		title = "Privacy Policy | Lucas Coelho";
		description = "Learn what information this portfolio may process, how it is used, and how to exercise your privacy rights under Brazil’s LGPD.";
	} else if (contentPath === "/criacao-de-sites-campinas") {
		title = "Website Design and Development in Campinas | Lucas Coelho";
		description = "Custom website design, development, and launch in Campinas, Brazil. Business websites, landing pages, and sales pages built for clarity, speed, and enquiries.";
		const serviceSchema = (schema["@graph"] as Record<string, unknown>[] | undefined)?.[0];
		if (serviceSchema) {
			schema = {
				"@context": "https://schema.org",
				...serviceSchema,
				name: title,
				description,
				url: `${SITE_URL}/en/criacao-de-sites-campinas/`,
				inLanguage: "en",
			};
		}
	} else if (service) {
		title = service.title;
		description = service.description;
		schema = { ...schema, name: service.label, description, url: `${SITE_URL}/en${contentPath}/`, inLanguage: "en" };
	} else if (englishCaseSeo[contentPath]) {
		({ title, description } = englishCaseSeo[contentPath]);
		schema = { ...schema, name: title, description, url: `${SITE_URL}/en${contentPath}/`, inLanguage: "en" };
	} else if (article) {
		title = `${article.title} | Lucas Coelho`;
		description = article.summary;
		schema = {
			...schema,
			headline: article.title,
			description,
			url: `${SITE_URL}/en${contentPath}/`,
			mainEntityOfPage: `${SITE_URL}/en${contentPath}/`,
			inLanguage: "en",
			keywords: undefined,
		};
	}

	return {
		...page,
		path: localizePath(contentPath, "en").replace(/\/$/, "") || "/en",
		title,
		description,
		schema,
	};
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function renderSeoHead(page: SeoPage) {
	const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : `${page.path}/`}`;
	const isEnglish = page.path === "/en" || page.path.startsWith("/en/");
	const languagePath = isEnglish ? page.path.replace(/^\/en(?=\/|$)/, "") || "/" : page.path;
	const portugueseUrl = `${SITE_URL}${languagePath === "/" ? "/" : `${languagePath}/`}`;
	const englishPath = localizePath(languagePath, "en");
	const englishUrl = `${SITE_URL}${englishPath}`;
	const imageUrl = `${SITE_URL}${page.image}`;
	const jsonLd = JSON.stringify(page.schema).replace(/</g, "\\u003c");
	const breadcrumbs = getBreadcrumbs(page.path.replace(/^\/en(?=\/|$)/, "") || "/", isEnglish ? "en" : "pt-BR");
	const breadcrumbJsonLd = breadcrumbs.length
		? `<script id="seo-breadcrumb-structured-data" type="application/ld+json">${JSON.stringify(
				breadcrumbSchema(breadcrumbs, page.path)
			).replace(/</g, "\\u003c")}</script>`
		: "";

	return `<!-- SEO_HEAD_START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="author" content="Lucas Coelho" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="pt-BR" href="${portugueseUrl}" />
    <link rel="alternate" hreflang="en" href="${englishUrl}" />
    <link rel="alternate" hreflang="x-default" href="${portugueseUrl}" />
    <meta property="og:type" content="${page.ogType}" />
    <meta property="og:locale" content="${isEnglish ? "en_US" : "pt_BR"}" />
    <meta property="og:site_name" content="Lucas Coelho" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="${page.imageWidth}" />
    <meta property="og:image:height" content="${page.imageHeight}" />
    <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}" />
    <script id="seo-structured-data" type="application/ld+json">${jsonLd}</script>
    ${breadcrumbJsonLd}
    <!-- SEO_HEAD_END -->`;
}

function staticSeoPages() {
	return {
		name: "static-seo-pages",
		async closeBundle() {
			const distDirectory = path.resolve(__dirname, "dist");
			const rootHtml = await readFile(
				path.join(distDirectory, "index.html"),
				"utf8"
			);
			const seoBlock = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
			const rootDiv = '<div id="root"></div>';

			// Pré-render SSR: gera um bundle server-side e renderiza cada rota
			// para injetar o markup dentro de <div id="root">. Se falhar, cai
			// para o comportamento anterior (somente head SEO).
			let renderBody: ((routePath: string) => string) | null = null;
			const ssrOutDir = path.resolve(__dirname, "dist-ssr");
			try {
				const { build } = await import("vite");
				await build({
					configFile: false,
					root: __dirname,
					logLevel: "silent",
					plugins: [react()],
					ssr: { noExternal: ["gsap"] },
					resolve: {
						alias: { "@": path.resolve(__dirname, "./src") },
					},
					build: {
						ssr: "src/entry-server.tsx",
						outDir: ssrOutDir,
						emptyOutDir: true,
					},
				});
				const serverEntry = await import(
					pathToFileURL(path.join(ssrOutDir, "entry-server.js")).href
				);
				if (typeof serverEntry.render === "function") {
					renderBody = serverEntry.render as (routePath: string) => string;
				}
			} catch (error) {
				console.warn(
					"[static-seo-pages] SSR prerender falhou; gerando páginas apenas com head SEO.",
					error
				);
			}

			const pages = [
				...Object.values(seoPages),
				...Object.values(seoPages).map(getEnglishSeoPage),
			];
			for (const page of pages) {
				let html = rootHtml.replace(seoBlock, renderSeoHead(page));
				html = html.replace(
					/<html\s+lang="[^"]*"/,
					`<html lang="${page.path.startsWith("/en") ? "en" : "pt-BR"}"`
				);
				if (renderBody) {
					try {
						const bodyHtml = renderBody(page.path);
						html = html.replace(rootDiv, `<div id="root">${bodyHtml}</div>`);
					} catch (error) {
						console.warn(
							`[static-seo-pages] SSR falhou para ${page.path}; mantendo #root vazio.`,
							error
						);
					}
				}
				const outputDirectory =
					page.path === "/"
						? distDirectory
						: path.join(distDirectory, page.path.slice(1));
				await mkdir(outputDirectory, { recursive: true });
				await writeFile(path.join(outputDirectory, "index.html"), html);
			}

			await rm(ssrOutDir, { recursive: true, force: true });
		},
	};
}

export default defineConfig(() => ({
	server: {
		host: "::",
		port: 8080,
	},
	plugins: [react(), staticSeoPages()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
}));
