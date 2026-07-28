type QuickReadItem = {
	label: string;
	value: string;
};

type CaseQuickReadProps = {
	id: string;
	intro: string;
	items: QuickReadItem[];
};

export function CaseQuickRead({ id, intro, items }: CaseQuickReadProps) {
	return (
		<section className="case-quick-read" aria-labelledby={`${id}-title`}>
			<div className="case-quick-read-heading">
				<p>Leitura executiva</p>
				<div>
					<h2 id={`${id}-title`}>Resumo em 60 segundos</h2>
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
