export const supportedLocales = ["pt-BR", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export function resolveLocalePath(pathname: string): {
	locale: Locale;
	pathname: string;
} {
	const normalizedPath = pathname.replace(/\/+$/, "") || "/";

	if (normalizedPath === "/en" || normalizedPath.startsWith("/en/")) {
		const contentPath = normalizedPath.slice(3) || "/";
		return { locale: "en", pathname: contentPath };
	}

	return { locale: "pt-BR", pathname: normalizedPath };
}

export function localizePath(href: string, locale: Locale): string {
	if (!href.startsWith("/") || href.startsWith("//")) return href;

	const suffixIndex = href.search(/[?#]/);
	const rawPath = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
	const suffix = suffixIndex === -1 ? "" : href.slice(suffixIndex);
	const hadTrailingSlash = rawPath.length > 1 && rawPath.endsWith("/");
	const { pathname } = resolveLocalePath(rawPath);
	const localizedPath = locale === "en"
		? pathname === "/" ? "/en/" : `/en${pathname}${hadTrailingSlash ? "/" : ""}`
		: pathname === "/" ? "/" : `${pathname}${hadTrailingSlash ? "/" : ""}`;

	return `${localizedPath}${suffix}`;
}
