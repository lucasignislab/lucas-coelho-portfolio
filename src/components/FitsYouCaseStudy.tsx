import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactEmail } from "@/data/site";
import { CaseQuickRead } from "@/components/CaseQuickRead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";
import { localizePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useTranslations";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
	{
		name: "Cross Training",
		label: "Força · potência · condicionamento",
		image: "/cases/fitsyou/functional.webp",
		className: "fits-discipline-cross",
	},
	{
		name: "Pilates",
		label: "Controle · postura · flexibilidade",
		image: "/cases/fitsyou/pilates.webp",
		className: "fits-discipline-pilates",
	},
	{
		name: "Yoga & Recovery",
		label: "Respiração · equilíbrio · bem-estar",
		image: "/cases/fitsyou/yoga.webp",
		className: "fits-discipline-yoga",
	},
];

const contentRoutes = [
	"O Studio",
	"Modalidades",
	"Massoterapia",
	"Professores",
	"Horários",
	"Localização",
	"Contato",
];

const marqueeWords = [
	"Strength",
	"Control",
	"Mobility",
	"Community",
	"Strength",
	"Control",
];

export function FitsYouCaseStudy() {
	const locale = useLocale();
	const en = locale === "en";
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useLayoutEffect(() => {
		const root = pageRef.current;
		if (!root) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const context = gsap.context(() => {
			const opening = gsap.timeline({ defaults: { ease: "power4.out" } });
			opening
				.from(".fits-case-header", { opacity: 0, y: -20, duration: 0.65 })
				.from(
					".fits-hero-reveal",
					{ yPercent: 115, opacity: 0, duration: 1, stagger: 0.08 },
					"-=0.25"
				)
				.from(
					".fits-case-hero-copy > p, .fits-case-facts > div, .fits-case-actions > a",
					{ y: 25, opacity: 0, duration: 0.65, stagger: 0.06 },
					"-=0.55"
				)
				.from(
					".fits-hero-visual",
					{ opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.15 },
					0.3
				);

			gsap.utils
				.toArray<HTMLElement>(".fits-scroll-section")
				.forEach(section => {
					gsap.from(section.querySelectorAll(".fits-section-reveal"), {
						scrollTrigger: {
							trigger: section,
							start: "top 78%",
							once: true,
						},
						opacity: 0,
						y: 55,
						duration: 0.85,
						stagger: 0.09,
						ease: "power3.out",
					});
				});

			gsap.utils
				.toArray<HTMLElement>(".fits-discipline-card")
				.forEach((card, index) => {
					gsap.from(card, {
						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							once: true,
						},
						opacity: 0,
						y: 70,
						rotate: index % 2 === 0 ? -2 : 2,
						duration: 0.8,
						ease: "power3.out",
					});
				});

		}, root);

		return () => context.revert();
	}, []);

	return (
		<div ref={pageRef} className="fits-case">
			<header className="fits-case-header">
					<a href={localizePath("/#work", locale)}>
						<span aria-hidden>←</span> {en ? "Back to projects" : "Voltar aos projetos"}
				</a>
					<span>{en ? "Case study / 02" : "Estudo de caso / 02"}</span>
			</header>
			<Breadcrumbs items={getBreadcrumbs("/projetos/fits-you", locale)} className="fits-case-breadcrumbs" />

			<main>
				<section className="fits-case-hero">
					<div className="fits-case-hero-grid">
						<div className="fits-case-hero-copy">
							<div className="fits-reveal-mask">
								<p className="fits-case-eyebrow fits-hero-reveal">
									{en ? "Website design · UX/UI · 2024" : "Case de Web Design · UX/UI · 2024"}
								</p>
							</div>
							<h1>
								<span className="fits-reveal-mask">
									<strong className="fits-hero-reveal">Fits You</strong>
								</span>
								<span className="fits-reveal-mask">
									<em className="fits-hero-reveal">
										{en ? "A website for cross-training and Pilates" : "Web design para cross training e Pilates"}
									</em>
								</span>
							</h1>
							<p>
							{en ? "The Fits You Studio website, based in Barão Geraldo, Campinas, brings together cross-training and Pilates without reducing the brand to intensity or wellness. Its structure organizes classes, location, schedules, and contact details so visitors can understand the studio and find useful information before visiting." : <>O site institucional do Fits You Studio, em Barão Geraldo,
								Campinas, apresenta modalidades de cross training e Pilates sem
								reduzir a marca a intensidade ou bem-estar. A estrutura organiza
								modalidades, localização, horários e contato para que visitantes
								entendam o espaço e encontrem informações úteis antes da visita.</>}
							</p>
						</div>

						<div className="fits-hero-visual">
							<img
								src="/lovable-uploads/fitsyou.webp"
								alt={en ? "Fits You Studio website interface" : "Interface do site Fits You Studio"}
								width="2868"
								height="1314"
							/>
							<div className="fits-hero-stamp" aria-hidden="true">
								<span>Barão Geraldo</span>
								<strong>Campinas</strong>
							</div>
						</div>
					</div>

					<dl className="fits-case-facts">
						<div>
						<dt>{en ? "Project" : "Projeto"}</dt>
						<dd>{en ? "Business website" : "Site institucional"}</dd>
						</div>
						<div>
						<dt>{en ? "Role" : "Papel"}</dt>
						<dd>{en ? "Design · UX/UI · Development · Launch" : "Design · UX/UI · Desenvolvimento · Publicação"}</dd>
						</div>
						<div>
						<dt>{en ? "Industry" : "Segmento"}</dt>
						<dd>{en ? "Cross-training · Pilates · Wellness" : "Cross training · Pilates · Bem-estar"}</dd>
						</div>
						<div>
						<dt>{en ? "Location" : "Local"}</dt>
							<dd>Barão Geraldo · Campinas, Brazil</dd>
						</div>
					</dl>

					<div className="fits-case-actions">
						<a
							href="https://fitsyou.com.br"
							target="_blank"
							rel="noopener noreferrer"
							className="fits-primary-button"
						>
							{en ? "View live website" : "Explorar site ao vivo"} <span aria-hidden>↗</span>
						</a>
						<a href="#fits-summary" className="fits-secondary-button">
							{en ? "Project overview" : "Ver resumo"} <span aria-hidden>↓</span>
						</a>
					</div>
				</section>

				<CaseQuickRead
					id="fits-summary"
					locale={locale}
					intro={en ? "A business website that brings together practices of different intensities without fragmenting the studio’s identity." : "Uma experiência institucional que organiza modalidades de intensidades diferentes sem fragmentar a percepção do studio."}
					items={[
						{
							label: en ? "Challenge" : "Desafio",
							value: en ? "Bring cross-training, Pilates, and recovery together under one brand while preserving the character of each practice." : "Apresentar cross training, Pilates e recuperação sob uma única marca, preservando a personalidade de cada prática.",
						},
						{
							label: en ? "Key decision" : "Decisão central",
							value:
								en ? "Build a shared content architecture and distinguish each practice through pace, imagery, and messaging." : "Construir uma arquitetura de conteúdo comum e diferenciar as modalidades por ritmo, imagem e mensagem.",
						},
						{
							label: en ? "Deliverable and evidence" : "Entrega e evidência",
							value:
								en ? "Published website with class information, team, schedules, location, and contact details. The figures shown belong to the studio and do not measure design-project outcomes." : "Site publicado com modalidades, equipe, horários, localização e contato. Os indicadores exibidos pertencem ao studio e não medem resultados do projeto de design.",
						},
						{
							label: en ? "Project scope" : "Escopo declarado",
							value:
								en ? "Website design, UX/UI, and content structure for a local studio in Barão Geraldo, Campinas, Brazil." : "Web design, UX/UI e estrutura de conteúdo para um studio local em Barão Geraldo, Campinas.",
						},
					]}
				/>

				<div className="fits-marquee" aria-hidden="true">
					<div className="fits-marquee-track">
						{[0, 1].map(group => (
							<div className="fits-marquee-group" key={group}>
								{marqueeWords.map((word, index) => (
									<span className="fits-marquee-item" key={`${word}-${index}`}>
										<strong>{word}</strong>
										<i />
									</span>
								))}
							</div>
						))}
					</div>
				</div>

				<section
					id="fits-case-content"
					className="fits-case-challenge fits-scroll-section"
				>
					<div className="fits-section-index fits-section-reveal">01 / {en ? "Context" : "Contexto"}</div>
					<div>
						<h2 className="fits-section-reveal">
							{en ? "Why did Fits You need a unified digital experience?" : "Por que o Fits You precisava de uma experiência única?"}
						</h2>
						<p className="fits-section-reveal">
							{en ? "Fits You brings together high-intensity training, body-control practices, and recovery services. The communication challenge was to organize that breadth without fragmenting the studio’s identity." : <>
							O Fits You reúne treinos de alta intensidade, práticas de
							controle corporal e serviços de recuperação. O desafio de
							comunicação era organizar essa amplitude sem fragmentar a
							percepção do studio.
							</>}
						</p>
					</div>
				</section>

				<section
					className="fits-disciplines fits-scroll-section"
					aria-labelledby="fits-disciplines-title"
				>
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							02 / {en ? "Classes" : "Modalidades"}
						</div>
						<h2 id="fits-disciplines-title" className="fits-section-reveal">
							{en ? "How do you communicate practices with different intensities?" : "Como comunicar modalidades com intensidades diferentes?"}
						</h2>
					</div>

					<div className="fits-discipline-grid">
						{disciplines.map((discipline, index) => (
							<article
								key={discipline.name}
								className={`fits-discipline-card ${discipline.className}`}
							>
								<img
									src={discipline.image}
									alt=""
									width={index === 1 ? "640" : "1600"}
									height={index === 1 ? "640" : "1067"}
									loading="lazy"
								/>
								<span className="fits-discipline-overlay" aria-hidden="true" />
								<span className="fits-discipline-number">0{index + 1}</span>
								<div>
									<h3>{discipline.name}</h3>
									<p>{en ? ({ "Força · potência · condicionamento": "Strength · power · conditioning", "Controle · postura · flexibilidade": "Control · posture · flexibility", "Respiração · equilíbrio · bem-estar": "Breath · balance · wellbeing" }[discipline.label] ?? discipline.label) : discipline.label}</p>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="fits-architecture fits-scroll-section">
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							03 / {en ? "Architecture" : "Arquitetura"}
						</div>
						<h2 className="fits-section-reveal">
							{en ? "How does the information architecture help visitors choose?" : "Como a arquitetura ajuda cada pessoa a escolher?"}
						</h2>
						<p className="fits-section-reveal">
							{en ? "Navigation gives key content its own place, helping visitors find classes, instructors, schedules, and location without forcing everything into one long page." : <>
							A navegação distribui o conteúdo em rotas específicas, ajudando
							cada visitante a encontrar modalidades, profissionais, horários
							e localização sem transformar tudo em uma página única.
							</>}
						</p>
					</div>

					<div className="fits-route-map fits-section-reveal">
						<div className="fits-route-browser">
							<div className="fits-route-browser-top">
								<span /><span /><span /><em>fitsyou.com.br</em>
							</div>
							<div className="fits-route-browser-content">
								<img
									src="/cases/fitsyou/logo.webp"
									alt={en ? "Fits You logo" : "Logo Fits You"}
									width="700"
									height="678"
									loading="lazy"
								/>
								<div>
									<span>{en ? "Choose your path" : "Escolha seu caminho"}</span>
									<strong>{en ? "Your training. Your pace." : "Seu treino. Seu ritmo."}</strong>
								</div>
							</div>
						</div>

						<ol>
							{contentRoutes.map((route, index) => (
								<li key={route}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<strong>{en ? ({ "O Studio": "The studio", Modalidades: "Classes", Massoterapia: "Massage therapy", Professores: "Instructors", Horários: "Schedules", Localização: "Location", Contato: "Contact" }[route] ?? route) : route}</strong>
									<i aria-hidden>→</i>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="fits-visual-system fits-scroll-section">
					<div className="fits-section-heading">
						<div className="fits-section-index fits-section-reveal">
							04 / {en ? "Visual system" : "Sistema visual"}
						</div>
						<h2 className="fits-section-reveal">
							{en ? "How does the visual system balance contrast and movement?" : "Como o sistema visual equilibra contraste e movimento?"}
						</h2>
					</div>

					<div className="fits-system-grid">
						<div className="fits-system-type fits-section-reveal">
							<span>Display / Geist</span>
							<strong>MOVE</strong>
							<em>WITH PURPOSE</em>
							<p>
								{en ? "Direct typography, generous scale, and concise messaging create rhythm without competing with the content." : <>
								Tipografia direta, escala ampla e mensagens curtas constroem
								ritmo sem competir com o conteúdo.
								</>}
							</p>
						</div>
						<div className="fits-system-colors fits-section-reveal">
							<div className="fits-color-black">
								<span>Background</span><strong>#121212</strong>
							</div>
							<div className="fits-color-white">
								<span>Foreground</span><strong>#F5F5F7</strong>
							</div>
							<div className="fits-color-red">
								<span>Primary</span><strong>#FF3B3B</strong>
							</div>
						</div>
					</div>
				</section>

				<section className="fits-proof fits-scroll-section">
					<div className="fits-section-index fits-section-reveal">
						05 / {en ? "Proof and contact" : "Prova e contato"}
					</div>
					<div className="fits-proof-layout">
						<div className="fits-proof-copy">
							<h2 className="fits-section-reveal">
								{en ? "What information helps someone plan a visit?" : "Quais informações ajudam a pessoa a visitar o estúdio?"}
							</h2>
							<p className="fits-section-reveal">
								{en ? "The website surfaces information shared by the studio and provides direct access to schedules, pricing, location, and WhatsApp. These figures belong to Fits You’s own content—they are not design-performance metrics." : <>
								O site destaca as provas apresentadas pela marca e oferece
								acesso direto a horários, preços, localização e WhatsApp.
								Esses dados pertencem ao conteúdo institucional do Fits You —
								não são métricas atribuídas ao design.
								</>}
							</p>
						</div>

						<div className="fits-proof-numbers">
							<div className="fits-section-reveal">
								<strong>+10</strong><span>{en ? "Years of experience" : "Anos de experiência"}</span>
							</div>
							<div className="fits-section-reveal">
								<strong>+500</strong><span>{en ? "Active members" : "Alunos ativos"}</span>
							</div>
							<div className="fits-section-reveal">
								<strong>5.0</strong><span>{en ? "Rating shown on the website" : "Nota apresentada no site"}</span>
							</div>
						</div>
					</div>
				</section>

				<section className="fits-case-closing fits-scroll-section">
					<p className="fits-case-eyebrow fits-section-reveal">{en ? "Next project" : "Próximo projeto"}</p>
					<h2 className="fits-section-reveal">
						{en ? "Could your brand turn a broad offer into a clearer experience?" : "Sua marca também precisa transformar variedade em clareza?"}
					</h2>
					<p className="fits-section-reveal">
						{en ? <>I can help organize content, shape a distinctive visual direction, and turn it into a coherent digital experience. See my work on <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">business websites and landing pages</a>.</> : <>
						Posso ajudar a organizar conteúdo, construir uma direção visual
						própria e transformar tudo em uma experiência digital coerente.
								Veja também meu trabalho com <a href={localizePath("/servicos/sites-landing-pages", locale)} className="link-underline">sites institucionais e landing pages</a>.
								</>}
					</p>
					<div className="fits-case-actions fits-section-reveal">
						<a
							href={`mailto:${contactEmail}?subject=${encodeURIComponent(en ? "Let’s discuss a digital project" : "Quero conversar sobre um projeto digital")}`}
							className="fits-primary-button"
						>
							{en ? "Discuss a project" : "Conversar sobre um projeto"} <span aria-hidden>→</span>
						</a>
						<a href={localizePath("/#work", locale)} className="fits-secondary-button">
							{en ? "View other projects" : "Ver outros projetos"}
						</a>
					</div>
				</section>
			</main>

			<footer className="fits-case-footer">
								<span>Lucas Coelho · Digital Designer</span>
				<span>Fits You / 2024</span>
			</footer>
		</div>
	);
}
