import { useEffect } from "react";
import { formatArticleDate, getReadingTime, getSortedArticles } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";
import { localizePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useTranslations";
import { englishArticles } from "@/data/blog.en";

/**
 * Índice do blog (/blog) — página editorial autônoma no mesmo DNA do
 * PrivacyPolicy/AeroCaseStudy: header próprio, serif gigante e cards
 * inspirados no SelectedWork (image-reveal, hover, metadados mono).
 */
export function BlogIndex() {
	const locale = useLocale();
	const en = locale === "en";
	const sorted = getSortedArticles();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);

	return (
		<div className="blog-page">
			<header className="blog-header">
				<a href={localizePath("/", locale)} className="blog-brand" aria-label={en ? "Back to portfolio" : "Voltar ao portfólio"}>
					<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
					<span>Lucas Coelho</span>
				</a>
				<nav className="blog-nav" aria-label={en ? "Blog navigation" : "Navegação do blog"}>
					<a href={localizePath("/#work", locale)}>{en ? "Projects" : "Projetos"}</a>
					<a href={localizePath("/blog", locale)} aria-current="page" className="is-active">
						Blog
					</a>
					<a href={localizePath("/#contact", locale)}>{en ? "Contact" : "Contato"}</a>
				</nav>
			</header>

			<main className="blog-main">
				<Breadcrumbs items={getBreadcrumbs("/blog", locale)} className="blog-breadcrumbs" />
				<section className="blog-hero" aria-labelledby="blog-title">
					<p className="eyebrow">{en ? "Writing on design, products, and code" : "Escritos sobre design, produto e código"}</p>
					<h1 id="blog-title">Blog</h1>
					<p className="blog-lead">
						{en ? "Notes on process, interface decisions, and lessons from real digital projects—without magic formulas." : "Notas de processo, decisões de interface e aprendizados reais de projetos digitais — sem fórmulas mágicas."}
					</p>
				</section>

				{sorted.length === 0 ? (
					<section className="blog-empty">
						<p>
							{en ? "No articles yet. Check back soon—the first one is in progress." : "Nenhum artigo publicado ainda. Volte em breve — o primeiro texto já está na mesa."}
						</p>
					</section>
				) : (
					<section className="blog-list" aria-label={en ? "Published articles" : "Artigos publicados"}>
						{sorted.map((article, index) => {
							const displayArticle = en ? englishArticles[article.slug] ?? article : article;
							return <article
								key={article.slug}
								className={`blog-card group${index === 0 ? " is-featured" : ""}`}
							>
								<a
									href={localizePath(`/blog/${article.slug}/`, locale)}
									data-cursor-hover
									aria-label={`${en ? "Read article:" : "Ler artigo:"} ${displayArticle.title}`}
									className="blog-card-link"
								>
									<div className="blog-card-media image-reveal">
										<img
											src={article.coverImage}
											alt={displayArticle.coverImageAlt}
											width="1024"
											height="576"
											loading={index === 0 ? "eager" : "lazy"}
											className="transition-transform duration-700 ease-out group-hover:scale-105"
										/>
										<span className="blog-card-index" aria-hidden="true">
											/{String(index + 1).padStart(2, "0")}
										</span>
										{index === 0 && (
											<span className="blog-card-featured-label">{en ? "Latest" : "Mais recente"}</span>
										)}
									</div>
									<div className="blog-card-info">
										<div className="blog-card-meta">
										<span>{formatArticleDate(article.date, locale)}</span>
										<span>{getReadingTime(displayArticle)} {en ? "min read" : "min de leitura"}</span>
										</div>
									<h2>{displayArticle.title}</h2>
									<p>{displayArticle.excerpt}</p>
										<ul className="blog-card-tags" aria-label="Tags">
											{displayArticle.tags.map(tag => (
												<li key={tag}>{tag}</li>
											))}
										</ul>
										<span className="blog-card-action">
										{en ? "Read article" : "Ler artigo"}
											<span aria-hidden="true"> →</span>
										</span>
									</div>
								</a>
							</article>;
						})}
					</section>
				)}
			</main>

			<footer className="blog-footer">
				<span>Lucas Coelho · Digital Designer</span>
			<a href={localizePath("/", locale)}>← {en ? "Back to portfolio" : "Voltar ao portfólio"}</a>
			</footer>
		</div>
	);
}
