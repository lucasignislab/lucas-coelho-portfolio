import { getServicePage, servicePages } from "@/data/services";
import { projects } from "@/data/projects";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";

export function ServicePage({ pathname }: { pathname: string }) {
	const service = getServicePage(pathname);
	if (!service) return null;

	const relatedProjects = service.projectIds
		.map(id => projects.find(project => project.id === id))
		.filter((project): project is (typeof projects)[number] => Boolean(project));

	return (
		<main className="min-h-screen bg-ink text-bone">
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
						href="/#contact-project"
						className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-bone link-underline"
					>
						Contato
					</a>
				</nav>
			</header>

			<Breadcrumbs
				items={getBreadcrumbs(service.path)}
				className="px-6 pt-8 font-mono text-xs uppercase tracking-[0.15em] text-bone/70 md:px-12 lg:px-20"
			/>

			<section className="section grid min-h-[72vh] grid-cols-1 items-end gap-12 lg:grid-cols-12">
				<div className="lg:col-span-8">
					<h1 className="max-w-5xl text-balance font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98]">
						{service.headline}
					</h1>
					<p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/80 md:text-xl">
						{service.intro}
					</p>
					<div className="mt-9 flex flex-wrap gap-3">
						<a href="/#contact-project" className="btn-primary">
							Conversar sobre este serviço <span aria-hidden="true">↗</span>
						</a>
						<a href="#trabalho" className="btn-ghost">
							Ver projetos relacionados
						</a>
					</div>
				</div>
				<p className="max-w-xs border-t border-bone/20 pt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-bone/70 lg:col-span-3 lg:col-start-10">
					Campinas, Brasil <span aria-hidden="true">·</span> projetos remotos
				</p>
			</section>

			<section className="section border-t border-bone/10" aria-labelledby="escopo-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="escopo-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						O que este trabalho pode reunir
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

			<section className="section border-t border-bone/10" aria-labelledby="processo-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="processo-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						Da primeira conversa à entrega
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

			<section id="trabalho" className="section border-t border-bone/10" aria-labelledby="trabalho-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<div className="lg:col-span-4">
						<h2 id="trabalho-title" className="font-display text-4xl leading-tight md:text-5xl">
							Trabalho relacionado
						</h2>
						<p className="mt-5 max-w-sm leading-relaxed text-bone/70">
							Projetos em que estratégia, identidade e interface se conectam a necessidades reais.
						</p>
					</div>
					<div className="lg:col-span-7 lg:col-start-6">
						{relatedProjects.map(project => (
							<a
								key={project.id}
								href={project.caseUrl ?? project.url}
								className="group grid gap-5 border-t border-bone/20 py-5 md:grid-cols-[minmax(0,1fr)_2fr] md:items-center"
							>
								<img
									src={project.image}
									alt={`Projeto ${project.name}`}
									width="1024"
									height="576"
									loading="lazy"
									className="aspect-[16/9] w-full rounded-sm object-cover"
								/>
								<div>
								<p className="font-mono text-xs uppercase tracking-[0.15em] text-bone/70">
										{project.year} <span aria-hidden="true">·</span> {project.type}
									</p>
									<h3 className="mt-2 font-display text-3xl group-hover:text-ember">{project.name}</h3>
									<p className="mt-2 leading-relaxed text-bone/70">{project.description}</p>
								<span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-bone link-underline">
										Ver projeto <span aria-hidden="true">↗</span>
									</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{service.article && (
				<section className="section border-t border-bone/10" aria-label="Leitura relacionada">
					<a href={service.article.href} className="group flex flex-col justify-between gap-6 border-b border-bone/20 pb-6 md:flex-row md:items-end">
						<div>
							<p className="font-mono text-xs uppercase tracking-[0.15em] text-bone/70">Leitura relacionada</p>
							<h2 className="mt-3 font-display text-3xl md:text-4xl">{service.article.title}</h2>
						</div>
						<span className="font-mono text-xs uppercase tracking-[0.12em] text-bone link-underline">Ler artigo <span aria-hidden="true">↗</span></span>
					</a>
				</section>
			)}

			<section className="section border-t border-bone/10" aria-labelledby="duvidas-title">
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 id="duvidas-title" className="font-display text-4xl leading-tight md:text-5xl lg:col-span-4">
						Dúvidas comuns
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

			<section className="section border-t border-bone/10">
				<div className="grid gap-8 md:grid-cols-12 md:items-end">
					<div className="md:col-span-8">
						<h2 className="max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
							Vamos entender o que seu projeto precisa.
						</h2>
						<p className="mt-5 max-w-2xl leading-relaxed text-bone/70">
							Conte um pouco sobre o momento do negócio e o desafio que quer resolver. A primeira conversa ajuda a definir o escopo adequado.
						</p>
					</div>
					<a href="/#contact-project" className="btn-primary md:col-span-4 md:justify-self-end">
						Iniciar uma conversa <span aria-hidden="true">↗</span>
					</a>
				</div>
			</section>

			<footer className="flex flex-col gap-5 border-t border-bone/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
				<nav aria-label="Outros serviços">
					<ul className="flex flex-wrap gap-x-6 gap-y-3">
						{servicePages.filter(page => page.id !== service.id).map(page => (
							<li key={page.id}>
									<a href={page.path} className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">{page.label}</a>
							</li>
						))}
					</ul>
				</nav>
				<a href="/" className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70 link-underline">Lucas Coelho © {new Date().getFullYear()}</a>
			</footer>
		</main>
	);
}
