export interface Project {
	id: string;
	name: string;
	subtitle: string;
	type: string;
	year: string;
	url: string;
	caseUrl?: string;
	image: string;
	description: string;
}

export const projects: Project[] = [
	{
		id: "aero",
		name: "Aero Project Manager",
		subtitle: "Branding — UI — Art Direction",
		type: "Dashboard / SaaS",
		year: "2025",
		url: "https://aeroprojectmanager.netlify.app/dashboard",
		caseUrl: "/projetos/aero",
		image: "/lovable-uploads/aero-project-cover.webp",
		description:
			"Concepção de marca, direção visual e interface para uma plataforma de gestão de projetos.",
	},
	{
		id: "fitsyou",
		name: "Fits You Studio",
		subtitle: "Web Design — UX/UI",
		type: "Website / Cross Training & Pilates",
		year: "2024",
		url: "https://fitsyou.com.br",
		caseUrl: "/projetos/fits-you",
		image: "/lovable-uploads/fitsyou.webp",
		description:
			"Site institucional criado para apresentar o estúdio, suas modalidades de cross training e Pilates, estrutura, horários e formas de contato.",
	},
	{
		id: "pogne",
		name: "Pogne · Ratoeira Ads",
		subtitle: "Landing Page — Funnel",
		type: "High-ticket / Marketing",
		year: "2024",
		url: "https://pogne.ratoeiraadsoficial.com.br",
		caseUrl: "/projetos/pogne",
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
		caseUrl: "/projetos/ratoeira-hub",
		image: "/lovable-uploads/ratoeirahub.webp",
		description:
			"Site institucional para apresentar um ecossistema de tracking server-side, proteção antifraude e landing pages para anunciantes.",
	},
];
