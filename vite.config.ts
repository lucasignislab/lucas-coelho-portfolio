import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { seoPages, SITE_URL, type SeoPage } from "./src/data/seo";

function escapeHtml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function renderSeoHead(page: SeoPage) {
	const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
	const imageUrl = `${SITE_URL}${page.image}`;
	const jsonLd = JSON.stringify(page.schema).replace(/</g, "\\u003c");

	return `<!-- SEO_HEAD_START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="author" content="Lucas Coelho" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${page.ogType}" />
    <meta property="og:locale" content="pt_BR" />
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

			for (const page of Object.values(seoPages)) {
				const html = rootHtml.replace(seoBlock, renderSeoHead(page));
				const outputDirectory =
					page.path === "/"
						? distDirectory
						: path.join(distDirectory, page.path.slice(1));
				await mkdir(outputDirectory, { recursive: true });
				await writeFile(path.join(outputDirectory, "index.html"), html);
			}
		},
	};
}

export default defineConfig(({ mode }) => ({
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
