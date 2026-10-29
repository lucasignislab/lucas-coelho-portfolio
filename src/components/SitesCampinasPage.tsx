import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	revealOnScroll,
	revealWords,
	splitChars,
} from "@/lib/animations";
import { getBreadcrumbs } from "@/data/seo";
import { sitesCampinasFaq } from "@/data/sites-campinas";
import { contactEmail, whatsappUrl } from "@/data/site";

const PAGE_PATH = "/criacao-de-sites-campinas";

const services = [
	{
		title: "Sites institucionais",
		description:
			"Sites completos para apresentar sua empresa, serviços e diferenciais, com estrutura pensada para convencer e conduzir o visitante ao contato.",
	},
	{
		title: "Landing pages",
		description:
			"Páginas focadas em uma oferta ou campanha, com narrativa direta e um caminho claro até a ação: pedir orçamento, agendar ou comprar.",
	},
	{
		title: "Portfólios",
		description:
			"Sites para profissionais e estúdios que precisam mostrar seu trabalho com o mesmo cuidado que colocam nele.",
	},
	{
		title: "Páginas de vendas",
		description:
			"Páginas focadas em conversão para produtos e serviços, com copy e design trabalhando juntos do primeiro scroll ao botão de compra.",
	},
];

const benefits = [
	{
		title: "Credibilidade imediata",
		description:
			"Um site profissional transmite confiança antes da primeira conversa. É a diferença entre parecer amador e parecer a escolha certa.",
	},
	{
		title: "Aparecer no Google",
		description:
			"Site rápido, bem estruturado e otimizado para busca: quando alguém procurar pelo que você faz em Campinas, você tem chance real de aparecer.",
	},
	{
		title: "Cliente direto no WhatsApp",
		description:
			"Cada página leva o visitante a uma ação, e a ação mais natural do brasileiro é chamar no WhatsApp. O caminho é curto e sem fricção.",
	},
	{
		title: "Velocidade de verdade",
		description:
			"Sites com código sob medida, sem WordPress e sem plugins pesados. Carregam rápido no celular, que é onde seu cliente está.",
	},
];

const steps = [
	{
		title: "Conversa",
		description:
			"Você conta sobre o negócio, o público e o que espera do site. Sem compromisso e sem jargão técnico.",
	},
	{
		title: "Proposta",
		description:
			"Envio uma proposta clara, com escopo, prazo e investimento fechados. Você sabe exatamente o que está contratando.",
	},
	{
		title: "Design e desenvolvimento",
		description:
			"Crio o design, desenvolvo o site com código sob medida e mostro o andamento em cada etapa, com espaço para ajustes.",
	},
	{
		title: "Entrega e site no ar",
		description:
			"Publicação, configuração de domínio e hospedagem e orientações finais. Seu site no ar, pronto para receber clientes.",
	},
];

const proofProjects = [
	{
		name: "Fits You Studio",
		description:
			"Site institucional para um studio de cross training e Pilates em Barão Geraldo, Campinas.",
		href: "/projetos/fits-you/",
	},
	{
		name: "Hub Ratoeira",
		description:
			"Site institucional e landing pages para um ecossistema de tracking server-side e proteção antifraude.",
		href: "/projetos/ratoeira-hub/",
	},
	{
		name: "Pogne · Ratoeira Ads",
		description:
			"Landing page de campanha para Google Ads, com narrativa direta e foco total em conversão.",
		href: "/projetos/pogne/",
	},
	{
		name: "Aero Project Manager",
		description:
			"Product design e interface de um SaaS de gestão de projetos, do design system à implementação.",
		href: "/projetos/aero/",
	},
];

export function SitesCampinasPage() {
	const mainRef = useRef<HTMLElement | null>(null);
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const introRef = useRef<HTMLParagraphElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const noteRef = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		// Hero: entrada no mount — título com split por palavras,
		// depois subtítulo e CTAs em fade-up encadeado.
		const headline = headlineRef.current;
		if (headline) {
			splitChars(headline, { mode: "words", className: "split-word" });
			revealWords(headline, { stagger: 0.04, duration: 1, delay: 0.15 });
		}
		if (introRef.current) {
			gsap.fromTo(
				introRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.9, delay: 0.45, ease: "power3.out" }
			);
		}
		if (ctaRef.current) {
			gsap.fromTo(
				ctaRef.current,
				{ y: 24, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" }
			);
		}
		if (noteRef.current) {
			gsap.fromTo(
				noteRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, delay: 0.7, ease: "power3.out" }
			);
		}

		// Seções abaixo do fold: reveal simples ao scroll.
		mainRef.current
			?.querySelectorAll<HTMLElement>("[data-reveal]")
			.forEach(el => revealOnScroll(el, { y: 40, duration: 0.9 }));
	}, []);

	return (
		<main ref={mainRef} className="min-h-screen bg-ink text-bone">
			<header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
				<a
					href="/"
					className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.18em] text-bone link-underline"
				>
					Lucas Coelho
				</a>
				<nav aria-label="Navegação da página" className="flex gap-6">
					<a
						href="/#work"
						className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-bone link-underline"
					>
						Projetos
					</a>
					<a
						href="/blog/"
						className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-bone link-underline"
					>
						Blog
					</a>
				</nav>
			</header>

			<Breadcrumbs
				items={getBreadcrumbs(PAGE_PATH)}
				className="px-6 pt-8 font-mono text-xs uppercase tracking-[0.15em] text-bone/70 md:px-12 lg:px-20"
			/>

			<section className="section grid min-h-[72vh] grid-cols-1 items-end gap-12 lg:grid-cols-12">
				<div className="lg:col-span-9">
					<p className="eyebrow mb-6">Web designer · Campinas, SP</p>
					<h1 ref={headlineRef} className="max-w-5xl text-balance font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.02]">
						Criação de sites em Campinas que transforma visitantes em clientes.
					</h1>
					<p ref={introRef} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/80 md:text-xl">
						Sou Lucas Coelho, web designer em Campinas. Crio sites profissionais
						e landing pages com código sob medida: rápidos, otimizados para
						aparecer no Google e pensados para gerar contato, orçamento e venda.
					</p>
					<div ref={ctaRef} className="mt-9 flex flex-wrap gap-3">
						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-primary"
						>
							Pedir orçamento no WhatsApp <span aria-hidden="true">↗</span>
						</a>
						<a href="/#work" className="btn-ghost">
							Ver projetos
						</a>
					</div>
				</div>
				<p ref={noteRef} className="max-w-xs border-t border-bone/20 pt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-bone/70 lg:col-span-3 lg:col-start-10">
					Atendimento presencial em Campinas e remoto para todo o Brasil
				</p>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="servicos-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="servicos-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						O que eu crio
					</h2>
					<ul className="grid gap-x-12 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
						{services.map(item => (
							<li key={item.title} className="border-t border-bone/20 py-5">
								<h3 className="text-lg font-medium">{item.title}</h3>
								<p className="mt-3 max-w-prose leading-relaxed text-bone/70">
									{item.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="por-que-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<div className="lg:col-span-4">
						<h2 id="por-que-title" className="font-display text-4xl leading-tight md:text-5xl">
							Por que investir em um site profissional?
						</h2>
						<p className="mt-5 max-w-sm leading-relaxed text-bone/70">
							Seu concorrente está a uma busca no Google de distância. Um site
							bem feito é o que faz o cliente escolher você.
						</p>
					</div>
					<ul className="grid gap-x-12 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
						{benefits.map(item => (
							<li key={item.title} className="border-t border-bone/20 py-5">
								<h3 className="text-lg font-medium">{item.title}</h3>
								<p className="mt-3 max-w-prose leading-relaxed text-bone/70">
									{item.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="processo-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="processo-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						Como funciona
					</h2>
					<ol className="lg:col-span-7 lg:col-start-6">
						{steps.map((step, index) => (
							<li key={step.title} className="grid gap-3 border-t border-bone/20 py-5 md:grid-cols-5 md:gap-8">
								<h3 className="text-lg font-medium md:col-span-2">
									<span className="mr-3 font-mono text-xs text-ember">
										{String(index + 1).padStart(2, "0")}
									</span>
									{step.title}
								</h3>
								<p className="leading-relaxed text-bone/70 md:col-span-3">{step.description}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="projetos-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<div className="lg:col-span-4">
						<h2 id="projetos-title" className="font-display text-4xl leading-tight md:text-5xl">
							Sites reais, entregues e no ar
						</h2>
						<p className="mt-5 max-w-sm leading-relaxed text-bone/70">
							Alguns sites e landing pages que criei, e também o que escrevo
							sobre o processo no{" "}
							<a href="/blog/" className="text-bone link-underline">
								blog
							</a>
							.
						</p>
					</div>
					<div className="lg:col-span-7 lg:col-start-6">
						{proofProjects.map(project => (
							<a
								key={project.name}
								href={project.href}
								className="group block border-t border-bone/20 py-5"
							>
								<h3 className="font-display text-3xl group-hover:text-ember">{project.name}</h3>
								<p className="mt-2 leading-relaxed text-bone/70">{project.description}</p>
								<span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-bone link-underline">
									Ver projeto <span aria-hidden="true">↗</span>
								</span>
							</a>
						))}
					</div>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="campinas-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="campinas-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						Web designer em Campinas e região metropolitana
					</h2>
					<div className="max-w-prose space-y-5 leading-relaxed text-bone/70 lg:col-span-7 lg:col-start-6">
						<p>
							Vivo e trabalho em Campinas, e conheço de perto a realidade de
							quem tem um negócio na cidade: clínicas, studios, escritórios,
							restaurantes e prestadores de serviço que dependem de ser
							encontrados e de transmitir confiança.
						</p>
						<p>
							Atendo presencialmente em Campinas e em toda a região
							metropolitana (Valinhos, Vinhedo, Paulínia, Hortolândia e Sumaré)
							e remotamente em qualquer lugar do Brasil. Na prática, o
							processo é o mesmo: conversa direta, proposta clara e um site
							entregue no prazo, sem intermediários.
						</p>
					</div>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="faq-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="faq-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						Perguntas frequentes
					</h2>
					<div className="lg:col-span-7 lg:col-start-6">
						{sitesCampinasFaq.map(item => (
							<details key={item.question} className="border-t border-bone/20 py-5">
								<summary className="cursor-pointer text-lg font-medium marker:text-ember">{item.question}</summary>
								<p className="mt-4 max-w-prose leading-relaxed text-bone/70">{item.answer}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section data-reveal className="section border-t border-bone/10">
				<div className="grid gap-8 md:grid-cols-12 md:items-end">
					<div className="md:col-span-8">
						<h2 className="max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
							Pronto para colocar
						<br />
						seu negócio no ar?
						</h2>
						<p className="mt-5 max-w-2xl leading-relaxed text-bone/70">
							Me conte sobre o seu negócio e receba uma proposta sem
							compromisso.
						</p>
						<p className="mt-4 max-w-2xl leading-relaxed text-bone/70">
							Prefere e-mail? Escreva para{" "}
							<a href={`mailto:${contactEmail}`} className="text-bone link-underline">
								{contactEmail}
							</a>
							.
						</p>
					</div>
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-primary md:col-span-4 md:justify-self-end"
					>
						Chamar no WhatsApp <span aria-hidden="true">↗</span>
					</a>
				</div>
			</section>

			<footer className="flex flex-col gap-5 border-t border-bone/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
				<nav aria-label="Serviços" className="flex flex-wrap gap-x-6 gap-y-3">
					<a href="/servicos/sites-landing-pages/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">
						Sites e landing pages
					</a>
					<a href="/servicos/identidade-direcao-digital/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">
						Identidade e direção digital
					</a>
					<a href="/blog/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">
						Blog
					</a>
				</nav>
				<a href="/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">
					Lucas Coelho © {new Date().getFullYear()}
				</a>
			</footer>
		</main>
	);
}
