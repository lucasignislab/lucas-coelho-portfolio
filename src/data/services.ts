export interface ServicePageData {
	id: string;
	path: string;
	label: string;
	title: string;
	description: string;
	headline: string;
	intro: string;
	scope: { title: string; description: string }[];
	process: { title: string; description: string }[];
	projectIds: string[];
	questions: { question: string; answer: string }[];
	article?: { title: string; href: string };
}

export const servicePages: ServicePageData[] = [
	{
		id: "identidade-direcao-digital",
		path: "/servicos/identidade-direcao-digital",
		label: "Identidade e direção digital",
		title: "Identidade visual e direção digital | Lucas Coelho",
		description:
			"Identidade visual e direção digital para marcas que precisam comunicar seu valor com clareza em sites, produtos e experiências digitais.",
		headline: "Uma identidade que faz sentido antes mesmo da primeira tela.",
		intro:
			"Em Campinas e para projetos remotos, aproximo estratégia, linguagem visual e experiência digital para construir uma presença coerente com o negócio. O trabalho parte do contexto e das pessoas que a marca precisa alcançar, e transforma esse entendimento em decisões visuais e digitais consistentes.",
		scope: [
			{
				title: "Direção estratégica",
				description:
					"Organização do contexto, da mensagem e das prioridades para definir o que a marca precisa comunicar e qual percepção deseja construir.",
			},
			{
				title: "Identidade visual",
				description:
					"Definição de linguagem visual, tipografia, cores e elementos gráficos que expressem a personalidade da marca com consistência.",
			},
			{
				title: "Aplicação digital",
				description:
					"Tradução da direção visual para interfaces e pontos de contato digitais, preservando clareza, reconhecimento e continuidade.",
			},
			{
				title: "Orientação de uso",
				description:
					"Registro dos princípios e decisões essenciais para que a identidade possa evoluir sem perder sua intenção original.",
			},
		],
		process: [
			{
				title: "Entender o contexto",
				description:
					"Alinhamos objetivos, público, referências e restrições antes de escolher uma direção visual.",
			},
			{
				title: "Definir a direção",
				description:
					"Exploramos caminhos de linguagem e organizamos a mensagem para que forma e intenção avancem juntas.",
			},
			{
				title: "Aplicar e documentar",
				description:
					"Levamos as decisões aos pontos de contato previstos e registramos orientações adequadas ao escopo combinado.",
			},
		],
		projectIds: ["aero"],
		questions: [
			{
				question: "Esse trabalho inclui a criação de uma marca do zero?",
				answer:
					"Pode incluir uma identidade nova ou a evolução de uma marca existente. O escopo é definido depois de entender o momento e as necessidades do negócio.",
			},
			{
				question: "A identidade também pode ser aplicada em um site?",
				answer:
					"Sim. A direção digital pode seguir para um site ou produto, desde que essa aplicação faça parte do escopo combinado.",
			},
		],
	},
	{
		id: "sites-landing-pages",
		path: "/servicos/sites-landing-pages",
		label: "Sites e landing pages",
		title: "Web design para sites e landing pages | Lucas Coelho",
		description:
			"Criação de sites institucionais e landing pages com estrutura, conteúdo e interface pensados para apresentar sua oferta com clareza.",
		headline: "Sites que organizam a mensagem e deixam o próximo passo claro.",
		intro:
			"Desenvolvo a estrutura e a experiência visual de sites institucionais e landing pages para negócios que precisam explicar melhor o que oferecem. O projeto considera conteúdo, navegação, leitura em diferentes telas e o caminho que a pessoa percorre até entrar em contato ou conhecer uma oferta.",
		scope: [
			{
				title: "Estrutura e conteúdo",
				description:
					"Organização de páginas, hierarquia de informação e chamadas para que cada conteúdo ajude a explicar a oferta.",
			},
			{
				title: "Web design responsivo",
				description:
					"Desenho de interfaces para desktop e celular, com atenção à leitura, navegação e consistência visual.",
			},
			{
				title: "Landing pages",
				description:
					"Páginas focadas em uma oferta ou campanha, com narrativa organizada e um caminho de ação fácil de entender.",
			},
			{
				title: "Preparação para implementação",
				description:
					"Especificações e estados necessários para levar a interface à implementação, conforme a tecnologia e o escopo do projeto.",
			},
		],
		process: [
			{
				title: "Mapear a necessidade",
				description:
					"Definimos quem precisa encontrar o site, quais dúvidas precisa resolver e qual ação deve ficar evidente.",
			},
			{
				title: "Estruturar a experiência",
				description:
					"Organizamos páginas e conteúdo antes de aprofundar o visual, para que cada seção tenha uma função clara.",
			},
			{
				title: "Desenhar e preparar",
				description:
					"Refinamos a interface nos tamanhos de tela relevantes e alinhamos os materiais para a etapa de implementação.",
			},
		],
		projectIds: ["fitsyou", "hub", "pogne"],
		article: {
			title: "O que colocar em um site institucional?",
			href: "/blog/o-que-colocar-site-institucional/",
		},
		questions: [
			{
				question: "Qual é a diferença entre um site institucional e uma landing page?",
				answer:
					"O site institucional apresenta uma empresa, seus serviços e diferentes caminhos de navegação. A landing page concentra a comunicação em uma oferta ou campanha específica.",
			},
			{
				question: "O trabalho inclui desenvolvimento do site?",
				answer:
					"A implementação pode fazer parte do projeto ou ser conduzida por outra pessoa. Isso é definido conforme as necessidades, a tecnologia e o escopo acordado.",
			},
		],
	},
	{
		id: "produtos-interfaces",
		path: "/servicos/produtos-interfaces",
		label: "Produtos e interfaces",
		title: "Product design e UX/UI para produtos digitais | Lucas Coelho",
		description:
			"Product design e UX/UI para produtos digitais: arquitetura de informação, fluxos, protótipos e interfaces conectados às necessidades do produto.",
		headline: "Interfaces melhores começam com decisões melhores.",
		intro:
			"Trabalho com produtos digitais desde a organização dos problemas até a definição das interfaces. A arquitetura, os fluxos e os componentes ajudam a tornar as tarefas compreensíveis para quem usa e viáveis para quem mantém o produto.",
		scope: [
			{
				title: "Arquitetura de informação",
				description:
					"Organização de conteúdo, áreas e navegação para ajudar cada pessoa a entender onde está e o que pode fazer.",
			},
			{
				title: "Fluxos e protótipos",
				description:
					"Mapeamento de tarefas e prototipação das interações principais para avaliar a experiência antes da implementação.",
			},
			{
				title: "UX/UI design",
				description:
					"Desenho de interfaces e estados para diferentes situações de uso, considerando legibilidade, feedback e consistência.",
			},
			{
				title: "Alinhamento com desenvolvimento",
				description:
					"Especificação de componentes e comportamentos para apoiar a implementação e a evolução do produto digital.",
			},
		],
		process: [
			{
				title: "Investigar o problema",
				description:
					"Reunimos contexto do produto, necessidades das pessoas, restrições técnicas e objetivos do time.",
			},
			{
				title: "Desenhar os caminhos",
				description:
					"Organizamos arquitetura e fluxos, explorando alternativas antes de consolidar as interfaces.",
			},
			{
				title: "Refinar para construir",
				description:
					"Ajustamos hierarquia, componentes e estados e preparamos as decisões para a implementação.",
			},
		],
		projectIds: ["aero"],
		questions: [
			{
				question: "Você trabalha em produtos que já estão no ar?",
				answer:
					"Sim. O escopo pode partir de uma funcionalidade, de uma jornada específica ou de uma revisão de interface em um produto existente.",
			},
			{
				question: "O projeto inclui pesquisa com usuários?",
				answer:
					"As atividades de pesquisa dependem das perguntas do projeto, do acesso às pessoas usuárias e do tempo disponível. O plano é combinado antes do início.",
			},
		],
	},
	{
		id: "design-systems",
		path: "/servicos/design-systems",
		label: "Design systems",
		title: "Design systems para produtos digitais | Lucas Coelho",
		description:
			"Criação e evolução de design systems com fundamentos visuais, componentes, estados e documentação conectados ao produto digital.",
		headline: "Um sistema visual que ajuda o produto a crescer com consistência.",
		intro:
			"Um design system conecta decisões visuais e componentes a situações reais de uso. Organizo fundamentos, padrões e documentação para que design e desenvolvimento compartilhem uma referência útil no trabalho cotidiano e na evolução do produto.",
		scope: [
			{
				title: "Fundamentos visuais",
				description:
					"Definição de princípios, cores, tipografia, espaçamentos e tokens que dão base às interfaces do produto.",
			},
			{
				title: "Componentes e estados",
				description:
					"Organização de componentes reutilizáveis com variações e estados necessários às interfaces existentes.",
			},
			{
				title: "Padrões de interface",
				description:
					"Registro de combinações e comportamentos recorrentes para reduzir decisões repetidas e manter coerência entre telas.",
			},
			{
				title: "Documentação viva",
				description:
					"Documentação ligada aos componentes e às decisões do produto, preparada para ser consultada e atualizada pelo time.",
			},
		],
		process: [
			{
				title: "Mapear o produto",
				description:
					"Identificamos padrões existentes, inconsistências, necessidades do time e os componentes de maior uso.",
			},
			{
				title: "Construir a base",
				description:
					"Definimos fundamentos e componentes prioritários, documentando as regras que orientam seu uso.",
			},
			{
				title: "Aplicar e evoluir",
				description:
					"Validamos o sistema em interfaces reais e ajustamos a documentação conforme o produto avança.",
			},
		],
		projectIds: ["aero"],
		article: {
			title: "Como construir um design system do zero",
			href: "/blog/design-system-do-zero/",
		},
		questions: [
			{
				question: "Um design system precisa começar completo?",
				answer:
					"Não. Ele pode começar pelos padrões mais recorrentes e crescer conforme as necessidades do produto e do time ficam mais claras.",
			},
			{
				question: "O design system também inclui código?",
				answer:
					"A entrega pode incluir especificação visual, documentação ou componentes implementados. A participação de design e desenvolvimento é definida no escopo.",
			},
		],
	},
];

export const services = servicePages.map(({ label, path }) => ({ label, path }));

export function getServicePage(pathname: string) {
	return servicePages.find(page => page.path === pathname);
}
