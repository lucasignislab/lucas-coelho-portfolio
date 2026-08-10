import { useEffect, useState, type ReactNode } from "react";
import {
	formatArticleDate,
	getArticle,
	getReadingTime,
	getSortedArticles,
	type ArticleBlock,
	type InlineSegment,
} from "@/data/blog";
import { contactEmail } from "@/data/site";

function renderInline(content: InlineSegment[]): ReactNode {
	return content.map((segment, index) => {
		if (typeof segment === "string") return segment;
		const isExternal = /^https?:\/\//.test(segment.href);
		return (
			<a
				key={index}
				href={segment.href}
				className="link-underline"
				{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			>
				{segment.text}
			</a>
		);
	});
}

function extractYouTubeId(src: string): string | null {
	const match = src.match(
		/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
	);
	return match ? match[1] : null;
}

/**
 * YouTube "lite": no SSR e no primeiro paint renderiza apenas o pôster
 * (hqdefault) com botão de play; o iframe só é injetado após o clique.
 */
function YouTubeEmbed({ src, title }: { src: string; title: string }) {
	const [activated, setActivated] = useState(false);
	const videoId = extractYouTubeId(src);

	if (!videoId) {
		return (
			<p className="blog-video-fallback">
				Vídeo indisponível no momento.{" "}
				<a href={src} target="_blank" rel="noopener noreferrer" className="link-underline">
					Assistir no YouTube ↗
				</a>
			</p>
		);
	}

	if (activated) {
		return (
			<div className="blog-video-frame">
				<iframe
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
					title={title}
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	return (
		<button
			type="button"
			className="blog-video-poster"
			onClick={() => setActivated(true)}
			aria-label={`Reproduzir vídeo: ${title}`}
			data-cursor-hover
		>
			<img
				src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
				alt=""
				width="480"
				height="360"
				loading="lazy"
			/>
			<span className="blog-video-play" aria-hidden="true">
				<i>▶</i>
			</span>
		</button>
	);
}

function renderBlock(block: ArticleBlock, index: number): ReactNode {
	switch (block.type) {
		case "heading":
			return block.level === 2 ? (
				<h2 key={index}>{block.text}</h2>
			) : (
				<h3 key={index}>{block.text}</h3>
			);
		case "paragraph":
			return <p key={index}>{renderInline(block.content)}</p>;
		case "image":
			return (
				<figure key={index} className="blog-figure">
					<div className="image-reveal">
						<img src={block.src} alt={block.alt} loading="lazy" />
					</div>
					{block.caption && <figcaption>{block.caption}</figcaption>}
				</figure>
			);
		case "video":
			return (
				<figure key={index} className="blog-figure">
					{block.kind === "youtube" ? (
						<YouTubeEmbed src={block.src} title={block.title} />
					) : (
						<div className="blog-video-frame">
							<video controls preload="metadata" playsInline src={block.src} />
						</div>
					)}
					{block.caption && <figcaption>{block.caption}</figcaption>}
				</figure>
			);
		case "quote":
			return (
				<blockquote key={index} className="blog-quote">
					<p>“{block.text}”</p>
					{block.cite && <cite>— {block.cite}</cite>}
				</blockquote>
			);
		case "list":
			return (
				<ul key={index} className="blog-body-list">
					{block.items.map(item => (
						<li key={item}>{item}</li>
					))}
				</ul>
			);
		case "divider":
			return <hr key={index} className="blog-divider" aria-hidden="true" />;
		default:
			return null;
	}
}

export function BlogArticle({ slug }: { slug: string }) {
	const article = getArticle(slug);
	const sorted = getSortedArticles();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, [slug]);

	if (!article) {
		return (
			<div className="blog-page">
				<header className="blog-header">
					<a href="/" className="blog-brand" aria-label="Voltar ao portfólio">
						<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
						<span>Lucas Coelho</span>
					</a>
					<nav className="blog-nav" aria-label="Navegação do blog">
						<a href="/blog">Blog</a>
					</nav>
				</header>
				<main className="blog-main blog-notfound">
					<p className="eyebrow">Artigo não encontrado</p>
					<h1>Este texto ainda não existe.</h1>
					<p>
						O endereço pode ter mudado ou o artigo nunca foi publicado. Que tal
						ver o que já está no ar?
					</p>
					<a href="/blog/" className="btn-primary">
						Voltar ao blog
					</a>
				</main>
			</div>
		);
	}

	const currentIndex = sorted.findIndex(item => item.slug === article.slug);
	const previous = sorted[currentIndex + 1];
	const next = sorted[currentIndex - 1];

	return (
		<div className="blog-page">
			<header className="blog-header">
				<a href="/" className="blog-brand" aria-label="Voltar ao portfólio">
					<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
					<span>Lucas Coelho</span>
				</a>
				<nav className="blog-nav" aria-label="Navegação do blog">
					<a href="/blog">← Voltar ao blog</a>
				</nav>
			</header>

			<main className="blog-main">
				<article className="blog-article">
					<header className="blog-article-hero">
						<p className="eyebrow">{article.tags[0]}</p>
						<h1>{article.title}</h1>
						<p className="blog-article-meta">
							<span>{formatArticleDate(article.date)}</span>
							<span aria-hidden="true"> · </span>
							<span>{getReadingTime(article)} min de leitura</span>
							<span aria-hidden="true"> · </span>
							<span>Lucas Coelho</span>
						</p>
						<ul className="blog-card-tags" aria-label="Tags">
							{article.tags.map(tag => (
								<li key={tag}>{tag}</li>
							))}
						</ul>
					</header>

					<figure className="blog-article-cover">
						<div className="image-reveal">
							<img
								src={article.coverImage}
								alt={article.coverImageAlt}
								width="1024"
								height="576"
							/>
						</div>
					</figure>

					<div className="blog-article-body">
						{article.blocks.map((block, index) => renderBlock(block, index))}
					</div>

					<footer className="blog-article-footer">
						<div className="blog-article-cta">
							<p className="eyebrow">Próximo passo</p>
							<h2>Tem um produto que precisa de um sistema assim?</h2>
							<p>
								Posso ajudar a estruturar princípios, tokens e componentes — e
								acompanhar a implementação até o produto respirar sozinho.
							</p>
							<div className="blog-article-cta-actions">
								<a
									href={`mailto:${contactEmail}?subject=Quero conversar sobre um design system`}
									className="btn-primary"
								>
									Conversar sobre um projeto <span aria-hidden="true">→</span>
								</a>
								<a href="/projetos/aero/" className="btn-ghost">
									Ver o case do Aero
								</a>
							</div>
						</div>

						<nav className="blog-article-pager" aria-label="Mais artigos">
							{previous ? (
								<a href={`/blog/${previous.slug}/`} className="link-underline">
									← {previous.title}
								</a>
							) : (
								<span />
							)}
							{next ? (
								<a href={`/blog/${next.slug}/`} className="link-underline">
									{next.title} →
								</a>
							) : (
								<a href="/blog/" className="link-underline">
									Voltar ao blog →
								</a>
							)}
						</nav>
					</footer>
				</article>
			</main>

			<footer className="blog-footer">
				<span>Lucas Coelho · Digital Designer</span>
				<a href="/blog/">← Voltar ao blog</a>
			</footer>
		</div>
	);
}
