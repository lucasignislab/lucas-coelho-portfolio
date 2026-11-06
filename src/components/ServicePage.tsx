import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getServicePage, getServicePages } from "@/data/services";
import { projects } from "@/data/projects";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";
import { useLocale, useTranslations } from "@/i18n/useTranslations";
import { localizePath } from "@/i18n/locale";
import {
	revealOnScroll,
	revealWords,
	splitChars,
} from "@/lib/animations";

export function ServicePage({ pathname }: { pathname: string }) {
	const locale = useLocale();
	const t = useTranslations();
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
	}, [pathname]);

	const service = getServicePage(pathname, locale);
	if (!service) return null;
	const otherServices = getServicePages(locale).filter(page => page.id !== service.id);

	const relatedProjects = service.projectIds
		.map(id => projects.find(project => project.id === id))
		.filter((project): project is (typeof projects)[number] => Boolean(project));

	return (
		<main ref={mainRef} className="min-h-screen bg-ink text-bone">
			<header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
				<a
					href={localizePath("/", locale)}
					className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.18em] text-bone link-underline"
				>
					Lucas Coelho
				</a>
				<nav aria-label={t.pageNavigation} className="flex gap-6">
					<a
						href={localizePath("/#work", locale)}
						className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-bone link-underline"
					>
						{t.projects}
					</a>
					<a
						href={localizePath("/#contact-project", locale)}
						className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-bone link-underline"
					>
						{t.contact}
					</a>
				</nav>
			</header>

			<Breadcrumbs
			items={getBreadcrumbs(service.path, locale)}
				className="px-6 pt-8 font-mono text-xs uppercase tracking-[0.15em] text-bone/70 md:px-12 lg:px-20"
			/>

			<section className="section grid min-h-[72vh] grid-cols-1 items-end gap-12 lg:grid-cols-12">
				<div className="lg:col-span-8">
					<h1 ref={headlineRef} className="max-w-5xl text-balance font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98]">
						{service.headline}
					</h1>
					<p ref={introRef} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/80 md:text-xl">
						{service.intro}
					</p>
					<div ref={ctaRef} className="mt-9 flex flex-wrap gap-3">
						<a href={localizePath("/#contact-project", locale)} className="btn-primary">
							{t.serviceDiscuss} <span aria-hidden="true">↗</span>
						</a>
						<a href="#trabalho" className="btn-ghost">
							{t.serviceRelatedProjects}
						</a>
					</div>
					{service.id === "sites-landing-pages" && locale === "pt-BR" && (
						<p className="mt-8 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-bone/70">
							📍 Atendo Campinas e região:{" "}
							<a href="/criacao-de-sites-campinas/" className="text-bone link-underline">
								veja a página de criação de sites em Campinas
							</a>
						</p>
					)}
				</div>
				<p ref={noteRef} className="max-w-xs border-t border-bone/20 pt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-bone/70 lg:col-span-3 lg:col-start-10">
					{t.heroLocation} <span aria-hidden="true">·</span> {t.credibilityRemote}
				</p>
			</section>

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="escopo-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="escopo-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						{t.serviceScopeTitle} {service.label}?
					</h2>
					<ul className="grid gap-x-12 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
						{service.scope.map(item => (
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
						{t.serviceProcessTitle}
					</h2>
					<ol className="lg:col-span-7 lg:col-start-6">
						{service.process.map(step => (
							<li key={step.title} className="grid gap-3 border-t border-bone/20 py-5 md:grid-cols-5 md:gap-8">
								<h3 className="text-lg font-medium md:col-span-2">{step.title}</h3>
								<p className="leading-relaxed text-bone/70 md:col-span-3">{step.description}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section id="trabalho" data-reveal className="section border-t border-bone/10" aria-labelledby="trabalho-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<div className="lg:col-span-4">
						<h2 id="trabalho-title" className="font-display text-4xl leading-tight md:text-5xl">
							{t.serviceProjectsTitle} {service.label}?
						</h2>
						<p className="mt-5 max-w-sm leading-relaxed text-bone/70">
							{t.serviceProjectsDescription}
						</p>
					</div>
					<div className="lg:col-span-7 lg:col-start-6">
						{relatedProjects.map(project => (
							<a
								key={project.id}
								href={project.caseUrl ? localizePath(project.caseUrl, locale) : project.url}
								className="group grid gap-5 border-t border-bone/20 py-5 md:grid-cols-[minmax(0,1fr)_2fr] md:items-center"
							>
								<img
									src={project.image}
									alt={`${t.projectLabel} ${project.name}`}
									width="1024"
									height="576"
									loading="lazy"
									className="aspect-[16/9] w-full rounded-sm object-cover"
								/>
								<div>
								<p className="font-mono text-xs uppercase tracking-[0.15em] text-bone/70">
									{project.year} <span aria-hidden="true">·</span> {locale === "en" ? ({ fitsyou: t.projectFitsType, hub: t.projectHubType, pogne: t.projectPogneType, aero: t.projectAeroType }[project.id] ?? project.type) : project.type}
									</p>
									<h3 className="mt-2 font-display text-3xl group-hover:text-ember">{project.name}</h3>
									<p className="mt-2 leading-relaxed text-bone/70">{locale === "en" ? ({ fitsyou: t.projectFitsDescription, hub: t.projectHubDescription, pogne: t.projectPogneDescription, aero: t.projectAeroDescription }[project.id] ?? project.description) : project.description}</p>
								<span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-bone link-underline">
										{t.projectVisit} <span aria-hidden="true">↗</span>
									</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{service.article && (
				<section data-reveal className="section border-t border-bone/10" aria-label="Leitura relacionada">
						<a href={localizePath(service.article.href, locale)} className="group flex flex-col justify-between gap-6 border-b border-bone/20 pb-6 md:flex-row md:items-end">
						<div>
							<p className="font-mono text-xs uppercase tracking-[0.15em] text-bone/70">{t.relatedReading}</p>
							<h2 className="mt-3 font-display text-3xl md:text-4xl">{t.serviceReadingTitle} {service.label}?</h2>
							<p className="mt-3 text-bone/70">{service.article.title}</p>
						</div>
						<span className="font-mono text-xs uppercase tracking-[0.12em] text-bone link-underline">{t.readArticle} <span aria-hidden="true">↗</span></span>
					</a>
				</section>
			)}

			<section data-reveal className="section border-t border-bone/10" aria-labelledby="duvidas-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="duvidas-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						{t.serviceQuestionsTitle} {service.label}?
					</h2>
					<div className="lg:col-span-7 lg:col-start-6">
						{service.questions.map(item => (
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
							{t.serviceClosingTitle}
						</h2>
						<p className="mt-5 max-w-2xl leading-relaxed text-bone/70">
							{t.serviceClosingDescription}
						</p>
					</div>
					<a href={localizePath("/#contact-project", locale)} className="btn-primary md:col-span-4 md:justify-self-end">
						{t.contactCta} <span aria-hidden="true">↗</span>
					</a>
				</div>
			</section>

			<footer className="flex flex-col gap-5 border-t border-bone/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
				<nav aria-label={t.otherServices}>
					<ul className="flex flex-wrap gap-x-6 gap-y-3">
						{otherServices.map(page => (
							<li key={page.id}>
									<a href={localizePath(page.path, locale)} className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">{page.label}</a>
							</li>
						))}
						{locale === "pt-BR" && <li><a href="/criacao-de-sites-campinas/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">{t.campinasSites}</a></li>}
					</ul>
				</nav>
				<a href={localizePath("/", locale)} className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">Lucas Coelho © {new Date().getFullYear()}</a>
			</footer>
		</main>
	);
}
