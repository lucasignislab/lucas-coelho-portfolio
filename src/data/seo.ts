export const SITE_URL = "https://lucascoelhoux.site";

export interface SeoPage {
	path: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	imageWidth: number;
	imageHeight: number;
	ogType: "website" | "article";
	schema: Record<string, unknown>;
}

const person = {
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: "Lucas Coelho",
	url: `${SITE_URL}/`,
	jobTitle: "Designer Digital",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Campinas",
		addressRegion: "SP",
		addressCountry: "BR",
	},
	sameAs: [
		"https://www.linkedin.com/in/lucascoelhodesigner/",
		"https://www.behance.net/lucascoelho30",
		"https://github.com/lucasignislab",
	],
	knowsAbout: [
		"Design digital",
		"Web design",
		"UX/UI design",
		"Product design",
		"Design systems",
		"Identidade visual",
	],
};

const caseSchema = (
	name: string,
	description: string,
	path: string,
	image: string,
	year: string,
	keywords: string[]
) => ({
	"@context": "https://schema.org",
	"@type": "CreativeWork",
	name,
	description,
	url: `${SITE_URL}${path}`,
	image: `${SITE_URL}${image}`,
	dateCreated: year,
	inLanguage: "pt-BR",
	keywords,
	creator: person,
	isPartOf: {
		"@type": "WebSite",
		name: "Portfólio de Lucas Coelho",
		url: `${SITE_URL}/`,
	},
});

export const seoPages: Record<string, SeoPage> = {
	"/": {
		path: "/",
		title: "Lucas Coelho — Designer Digital em Campinas",
		description:
			"Designer digital em Campinas. Crio marcas, sites, produtos e experiências digitais que unem estratégia, clareza visual e conversão.",
		image: "/og-card.png",
		imageAlt: "Lucas Coelho — Designer Digital em Campinas",
		imageWidth: 1200,
		imageHeight: 630,
		ogType: "website",
		schema: {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "ProfilePage",
					"@id": `${SITE_URL}/#profile`,
					url: `${SITE_URL}/`,
					name: "Lucas Coelho — Designer Digital em Campinas",
					description:
						"Portfólio de Lucas Coelho, designer digital especializado em marcas, sites, produtos digitais e design systems.",
					inLanguage: "pt-BR",
					mainEntity: { "@id": `${SITE_URL}/#person` },
				},
				person,
			],
		},
	},
	"/projetos/aero": {
		path: "/projetos/aero",
		title: "Aero — Case de Product Design | Lucas Coelho",
		description:
			"Case autoral de product design do Aero: estratégia, UX/UI, prototipação e desenvolvimento de um SaaS de gestão de projetos keyboard-first.",
		image: "/lovable-uploads/aero-project-cover.webp",
		imageAlt: "Interface do Aero Project Manager",
		imageWidth: 1024,
		imageHeight: 576,
		ogType: "article",
		schema: caseSchema(
			"Aero — Case de Product Design",
			"Case autoral de product design do Aero, um SaaS de gestão de projetos keyboard-first.",
			"/projetos/aero",
			"/lovable-uploads/aero-project-cover.webp",
			"2025",
			["Product design", "UX/UI", "SaaS", "Design system"]
		),
	},
	"/projetos/fits-you": {
		path: "/projetos/fits-you",
		title: "Fits You — Case de Web Design e UX/UI | Lucas Coelho",
		description:
			"Case de web design e UX/UI do Fits You, site institucional para um studio de cross training e Pilates em Barão Geraldo, Campinas.",
		image: "/lovable-uploads/fitsyou.webp",
		imageAlt: "Interface do site Fits You Studio",
		imageWidth: 2868,
		imageHeight: 1314,
		ogType: "article",
		schema: caseSchema(
			"Fits You — Case de Web Design e UX/UI",
			"Site institucional para um studio de cross training e Pilates em Barão Geraldo, Campinas.",
			"/projetos/fits-you",
			"/lovable-uploads/fitsyou.webp",
			"2024",
			["Web design", "UX/UI", "Site institucional", "Campinas"]
		),
	},
	"/projetos/ratoeira-hub": {
		path: "/projetos/ratoeira-hub",
		title: "Ratoeira Hub — Case de Web Design | Lucas Coelho",
		description:
			"Case de web design e UX/UI para o Ratoeira Hub: tracking server-side, proteção contra cliques fraudulentos e landing pages.",
		image: "/lovable-uploads/ratoeirahub.webp",
		imageAlt: "Interface do site Ratoeira Hub",
		imageWidth: 2832,
		imageHeight: 1408,
		ogType: "article",
		schema: caseSchema(
			"Ratoeira Hub — Case de Web Design",
			"Web design e UX/UI para um ecossistema de tracking server-side, proteção antifraude e landing pages.",
			"/projetos/ratoeira-hub",
			"/lovable-uploads/ratoeirahub.webp",
			"2024",
			["Web design", "UX/UI", "Adtech", "Site institucional"]
		),
	},
	"/projetos/pogne": {
		path: "/projetos/pogne",
		title: "Pogne × Ratoeira Ads — Case de Conversion Design",
		description:
			"Case de web design e conversion design da campanha entre Método PNG e Ratoeira Ads, com narrativa direta e foco em conversão.",
		image: "/lovable-uploads/pogne.webp",
		imageAlt: "Landing page da campanha Pogne e Ratoeira Ads",
		imageWidth: 2838,
		imageHeight: 1410,
		ogType: "article",
		schema: caseSchema(
			"Pogne × Ratoeira Ads — Case de Conversion Design",
			"Landing page de campanha com narrativa direta e foco em conversão para a parceria entre Método PNG e Ratoeira Ads.",
			"/projetos/pogne",
			"/lovable-uploads/pogne.webp",
			"2024",
			["Conversion design", "Landing page", "Web design", "UX/UI"]
		),
	},
};

export function getSeoPage(pathname: string): SeoPage {
	const normalizedPath = pathname.replace(/\/+$/, "") || "/";
	return seoPages[normalizedPath] ?? seoPages["/"];
}
