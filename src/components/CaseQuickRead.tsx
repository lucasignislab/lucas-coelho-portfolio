type QuickReadItem = {
	label: string;
	value: string;
};

type CaseQuickReadProps = {
	id: string;
	intro: string;
	items: QuickReadItem[];
	locale?: "pt-BR" | "en";
};

export function CaseQuickRead({ id, intro, items, locale = "pt-BR" }: CaseQuickReadProps) {
	return (
		<section className="case-quick-read" aria-labelledby={`${id}-title`}>
			<div className="case-quick-read-heading">
				<p>{locale === "en" ? "At a glance" : "Leitura executiva"}</p>
				<div>
					<h2 id={`${id}-title`}>{locale === "en" ? "Project overview" : "O que resume este projeto?"}</h2>
					<p>{intro}</p>
				</div>
			</div>

			<dl className="case-quick-read-grid">
				{items.map(item => (
					<div key={item.label}>
						<dt>{item.label}</dt>
						<dd>{item.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
