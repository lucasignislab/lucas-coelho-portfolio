import { useEffect } from "react";
import { formatArticleDate, getReadingTime, getSortedArticles } from "@/data/blog";

/**
 * Índice do blog (/blog) — página editorial autônoma no mesmo DNA do
 * PrivacyPolicy/AeroCaseStudy: header próprio, serif gigante e cards
 * inspirados no SelectedWork (image-reveal, hover, metadados mono).
 */
export function BlogIndex() {
	const sorted = getSortedArticles();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);

	return (
		<div className="blog-page">
			<header className="blog-header">
				<a href="/" className="blog-brand" aria-label="Voltar ao portfólio">
					<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
					<span>Lucas Coelho</span>
				</a>
				<nav className="blog-nav" aria-label="Navegação do blog">
					<a href="/#work">Projetos</a>
					<a href="/blog" aria-current="page" className="is-active">
						Blog
					</a>
					<a href="/#contact">Contato</a>
				</nav>
			</header>

			<main className="blog-main">
				<section className="blog-hero" aria-labelledby="blog-title">
					<p className="eyebrow">Escritos sobre design, produto e código</p>
					<h1 id="blog-title">Blog</h1>
					<p className="blog-lead">
						Notas de processo, decisões de interface e aprendizados reais de
						projetos digitais — sem fórmulas mágicas.
					</p>
				</section>

				{sorted.length === 0 ? (
					<section className="blog-empty">
						<p>
							Nenhum artigo publicado ainda. Volte em breve — o primeiro texto
							já está na mesa.
						</p>
					</section>
				) : (
					<section className="blog-list" aria-label="Artigos publicados">
						{sorted.map((article, index) => (
							<article key={article.slug} className="blog-card group">
								<a
									href={`/blog/${article.slug}/`}
									data-cursor-hover
									aria-label={`Ler artigo: ${article.title}`}
									className="blog-card-link"
								>
									<div className="blog-card-media image-reveal">
										<img
											src={article.coverImage}
											alt={article.coverImageAlt}
											width="1024"
											height="576"
											loading={index === 0 ? "eager" : "lazy"}
											className="transition-transform duration-700 ease-out group-hover:scale-105"
										/>
										<span className="blog-card-index" aria-hidden="true">
											/{String(index + 1).padStart(2, "0")}
										</span>
									</div>
									<div className="blog-card-info">
										<div className="blog-card-meta">
											<span>{formatArticleDate(article.date)}</span>
											<span>{getReadingTime(article)} min de leitura</span>
										</div>
										<h2>{article.title}</h2>
										<p>{article.excerpt}</p>
										<ul className="blog-card-tags" aria-label="Tags">
											{article.tags.map(tag => (
												<li key={tag}>{tag}</li>
											))}
										</ul>
										<span className="blog-card-action">
											Ler artigo
											<span aria-hidden="true"> →</span>
										</span>
									</div>
								</a>
							</article>
						))}
					</section>
				)}
			</main>

			<footer className="blog-footer">
				<span>Lucas Coelho · Digital Designer</span>
				<a href="/">← Voltar ao portfólio</a>
			</footer>
		</div>
	);
}
