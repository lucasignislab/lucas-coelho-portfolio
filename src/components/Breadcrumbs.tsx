import type { BreadcrumbItem } from "@/data/seo";

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
	if (items.length === 0) return null;

	return (
		<nav aria-label="Caminho de navegação" className={`site-breadcrumbs ${className}`}>
			<ol>
				{items.map((item, index) => {
					const isCurrent = index === items.length - 1;
					return (
						<li key={item.name}>
							{index > 0 && <span aria-hidden="true">/</span>}
							{isCurrent ? (
								<span aria-current="page">{item.name}</span>
							) : (
								<a href={item.href}>{item.name}</a>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
