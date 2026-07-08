export interface Project {
	id: string;
	name: string;
	subtitle: string;
	type: string;
	year: string;
	url: string;
	image: string;
}

export const projects: Project[] = [
	{
		id: "aero",
		name: "Aero Project Manager",
		subtitle: "Branding — UI — Art Direction",
		type: "Dashboard / SaaS",
		year: "2024",
		url: "https://aeroprojectmanager.netlify.app/dashboard",
		image: "/lovable-uploads/aero-project-cover.png",
	},
	{
		id: "nova-era",
		name: "Nova Era Transportes",
		subtitle: "Web Design — SEO",
		type: "Institucional / Logistics",
		year: "2024",
		url: "https://novaeratransportesvinhedo.com.br",
		image: "/lovable-uploads/nova-era-cover.png",
	},
	{
		id: "fitsyou",
		name: "Fits You Studio",
		subtitle: "Web Design — Conversion",
		type: "Landing Page / Fitness",
		year: "2024",
		url: "https://fitsyou.com.br",
		image: "/lovable-uploads/fitsyou.png",
	},
	{
		id: "pogne",
		name: "Pogne · Ratoeira Ads",
		subtitle: "Landing Page — Funnel",
		type: "High-ticket / Marketing",
		year: "2024",
		url: "https://pogne.ratoeiraadsoficial.com.br",
		image: "/lovable-uploads/pogne.png",
	},
	{
		id: "hub",
		name: "Hub Ratoeira",
		subtitle: "Web Design — Member Area",
		type: "Portal / Education",
		year: "2024",
		url: "https://hub.ratoeiraadsoficial.com.br",
		image: "/lovable-uploads/7707975d-161a-42b0-a77c-0f974ab20166.png",
	},
];
