export interface Project {
	id: string;
	name: string;
	subtitle: string;
	type: string;
	year: string;
	url: string;
	image: string;
	description: string;
}

export const projects: Project[] = [
	{
		id: "aero",
		name: "Aero Project Manager",
		subtitle: "Branding — UI — Art Direction",
		type: "Dashboard / SaaS",
		year: "2024",
		url: "https://aeroprojectmanager.netlify.app/dashboard",
		image: "/lovable-uploads/aero-project-cover.webp",
		description:
			"Concepção de marca, direção visual e interface para uma plataforma de gestão de projetos.",
	},
	{
		id: "nova-era",
		name: "Nova Era Transportes",
		subtitle: "Web Design — SEO",
		type: "Institucional / Logistics",
		year: "2024",
		url: "https://novaeratransportesvinhedo.com.br",
		image: "/lovable-uploads/nova-era-cover.webp",
		description:
			"Site institucional criado para apresentar os serviços da transportadora com clareza e fortalecer sua presença nas buscas.",
	},
	{
		id: "fitsyou",
		name: "Fits You Studio",
		subtitle: "Web Design — Conversion",
		type: "Landing Page / Fitness",
		year: "2024",
		url: "https://fitsyou.com.br",
		image: "/lovable-uploads/fitsyou.webp",
		description:
			"Landing page para comunicar a proposta do estúdio e conduzir potenciais clientes até a próxima ação.",
	},
	{
		id: "pogne",
		name: "Pogne · Ratoeira Ads",
		subtitle: "Landing Page — Funnel",
		type: "High-ticket / Marketing",
		year: "2024",
		url: "https://pogne.ratoeiraadsoficial.com.br",
		image: "/lovable-uploads/pogne.webp",
		description:
			"Experiência de campanha para organizar uma oferta de alto valor em uma narrativa direta e orientada à conversão.",
	},
	{
		id: "hub",
		name: "Hub Ratoeira",
		subtitle: "Web Design — UX/UI",
		type: "Institucional / Adtech",
		year: "2024",
		url: "https://hub.ratoeiraadsoficial.com.br",
		image: "/lovable-uploads/ratoeirahub.webp",
		description:
			"Site institucional criado para apresentar o ecossistema Ratoeira Hub — soluções de rastreamento, criação de páginas e atendimento com IA para anunciantes e empresas.",
	},
];
