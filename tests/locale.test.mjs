import assert from "node:assert/strict";
import test from "node:test";
import { localizePath, resolveLocalePath } from "../src/i18n/locale.ts";

test("resolveLocalePath strips only the English route prefix", () => {
	assert.deepEqual(resolveLocalePath("/en/projects/fits-you/"), {
		locale: "en",
		pathname: "/projects/fits-you",
	});
	assert.deepEqual(resolveLocalePath("/en"), { locale: "en", pathname: "/" });
	assert.deepEqual(resolveLocalePath("/enough"), {
		locale: "pt-BR",
		pathname: "/enough",
	});
});

test("localizePath preserves suffixes and leaves external links unchanged", () => {
	assert.equal(localizePath("/blog/article/?ref=home#top", "en"), "/en/blog/article/?ref=home#top");
	assert.equal(localizePath("/en/blog/article/", "pt-BR"), "/blog/article/");
	assert.equal(localizePath("/", "en"), "/en/");
	assert.equal(localizePath("https://example.com", "en"), "https://example.com");
});
