import assert from "node:assert/strict";
import test from "node:test";
import { englishArticles } from "../src/data/blog.en.ts";

const expectedSlugs = [
	"como-criar-pagina-de-vendas",
	"quanto-custa-criar-um-site",
	"o-que-colocar-site-institucional",
	"feedback-vago-criterio-decisao",
	"design-system-do-zero",
	"tracking-server-side-afiliados",
	"sacred-modernism-design-system",
];

test("every published blog article has a complete English version", () => {
	assert.deepEqual(Object.keys(englishArticles).sort(), [...expectedSlugs].sort());

	for (const slug of expectedSlugs) {
		const article = englishArticles[slug];
		assert.ok(article.title.trim(), `${slug} is missing its English title`);
		assert.ok(article.excerpt.trim(), `${slug} is missing its English excerpt`);
		assert.ok(article.blocks.length > 0, `${slug} is missing its English body`);
		assert.ok(article.blocks.every(block => block.type), `${slug} has an invalid content block`);
	}
});
