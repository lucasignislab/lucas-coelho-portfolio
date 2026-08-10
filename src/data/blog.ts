/**
 * Blog — modelo de conteúdo (dependency-free, sem MDX).
 *
 * COMO ADICIONAR UM NOVO ARTIGO
 * -----------------------------
 * 1. Crie a pasta `public/blog/<slug>/` e coloque as imagens do artigo lá
 *    (a capa pode viver em `public/blog/<slug>/` ou reutilizar um asset
 *    existente de `public/`). Vídeos self-hosted (mp4/webm) também vão nessa
 *    pasta; para YouTube basta a URL pública (watch ou embed) no bloco.
 * 2. Adicione um novo objeto em `articles` abaixo, seguindo o tipo `Article`.
 *    - `slug` vira a rota `/blog/<slug>/`.
 *    - `date` em ISO (`AAAA-MM-DD`); a exibição em pt-BR é automática.
 *    - `readingTime` é calculado automaticamente (~200 palavras/min).
 *    - Blocos disponíveis:
 *        { type: "heading", level: 2|3, text }
 *        { type: "paragraph", content: [...] }  // strings ou { text, href }
 *        { type: "image", src, alt, caption? }
 *        { type: "video", kind: "youtube", src, title, caption? }
 *        { type: "video", kind: "file", src, caption? }  // mp4/webm local
 *        { type: "quote", text, cite? }
 *        { type: "list", items: string[] }
 *        { type: "divider" }
 * 3. O SEO (título, descrição, OG, JSON-LD BlogPosting, sitemap estático e
 *    pré-render SSR) é gerado automaticamente a partir dos dados do artigo
 *    — basta adicionar a URL com barra final em `public/sitemap.xml`.
 */

export type InlineSegment = string | { text: string; href: string };

export type ArticleBlock =
	| { type: "heading"; level: 2 | 3; text: string }
	| { type: "paragraph"; content: InlineSegment[] }
	| { type: "image"; src: string; alt: string; caption?: string }
	| { type: "video"; kind: "youtube"; src: string; title: string; caption?: string }
	| { type: "video"; kind: "file"; src: string; caption?: string }
	| { type: "quote"; text: string; cite?: string }
	| { type: "list"; items: string[] }
	| { type: "divider" };

export interface Article {
	slug: string;
	title: string;
	excerpt: string;
	/** Data ISO (AAAA-MM-DD). */
	date: string;
	tags: string[];
	coverImage: string;
	coverImageAlt: string;
	/** Descrição para meta description / og:description. */
	ogDescription: string;
	blocks: ArticleBlock[];
}

const WORDS_PER_MINUTE = 200;

function blockText(block: ArticleBlock): string {
	switch (block.type) {
		case "heading":
			return block.text;
		case "paragraph":
			return block.content
				.map(segment => (typeof segment === "string" ? segment : segment.text))
				.join(" ");
		case "quote":
			return block.text;
		case "list":
			return block.items.join(" ");
		case "image":
			return block.caption ?? "";
		case "video":
			return block.caption ?? "";
		default:
			return "";
	}
}

/** Tempo de leitura em minutos, calculado a partir dos blocos de texto. */
export function getReadingTime(article: Article): number {
	const words = article.blocks
		.map(blockText)
		.join(" ")
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: "UTC",
});

/** "2026-08-10" → "10 de agosto de 2026" */
export function formatArticleDate(isoDate: string): string {
	return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export const articles: Article[] = [
	{
		slug: "design-system-do-zero",
		title: "Como estruturei um design system do zero (e o que faria diferente)",
		excerpt:
			"Guia completo e honesto de como criei um design system do zero para o Aero: 18 tokens de cor, 7 níveis tipográficos, 8 passos de espaçamento, 9 componentes, uma documentação viva dentro do produto, erros que cometi e um checklist prático para começar o seu.",
		date: "2026-08-10",
		tags: ["Design System", "Product Design", "Front-end", "UX/UI"],
		coverImage: "/lovable-uploads/aero-project-cover.webp",
		coverImageAlt:
			"Interface do Aero, produto de gestão de projetos com tema escuro, usada como base do design system",
		ogDescription:
			"Como criar um design system do zero, na prática: o guia completo do sistema do Aero — 18 tokens de cor, 7 níveis tipográficos, 9 componentes, documentação viva dentro do produto, erros comuns e o que eu faria diferente.",
		blocks: [
			{
				type: "paragraph",
				content: [
					"A maioria dos design systems morre antes de completar seis meses. Não morre por falta de talento nem por falta de ferramenta; morre porque nasceu grande demais para o produto que deveria servir. A equipe (ou a pessoa) passa três semanas desenhando a biblioteca perfeita de botões, e quando finalmente volta para o produto, percebe que a interface real precisa de outra coisa. A biblioteca vira museu: bonita, organizada e inútil.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Eu sabia disso quando comecei o ",
					{ text: "Aero", href: "/projetos/aero/" },
					", meu produto autoral de gestão de projetos. Eu mesmo projetei e programei tudo, do primeiro wireframe ao deploy, com React, TypeScript e Tailwind. E mesmo assim, ou talvez justamente por isso, decidi que precisava de um design system de verdade. Não um UI kit de Figma, não um arquivo de estilos solto: um sistema que tomasse decisões por mim enquanto eu construía o produto sozinho, aqui de Campinas, nas madrugadas em que ninguém revisaria meu trabalho no dia seguinte.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Este artigo é o guia que eu gostaria de ter lido antes de começar. Vou abrir o processo inteiro: o que separa um design system de um style guide, por que um projeto solo precisa de um sistema tanto quanto um time grande, como os princípios do Aero viraram tokens e os tokens viraram código, como escolhi os componentes, o que documentei (e o que não documentei), os erros que cometi no caminho e o que eu faria diferente se começasse hoje. Para dar uma ideia do tamanho real da coisa: hoje o sistema tem 18 tokens de cor, 7 níveis tipográficos, 8 passos de espaçamento e 9 componentes de interface, tudo publicado numa página de documentação viva dentro do próprio produto. Se você quer aprender como criar um design system sem cair nas armadilhas que quase me derrubaram, é por aqui.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/interface-aero-geral.png",
				alt: "Visão geral da interface do Aero, SaaS de gestão de projetos com tema escuro e foco em teclado, construído sobre o design system descrito no artigo",
				caption:
					"A interface do Aero: cada pixel desta tela sai do mesmo conjunto de tokens e componentes.",
			},
			{ type: "heading", level: 2, text: "O que é um design system de verdade" },
			{
				type: "paragraph",
				content: [
					"Antes de qualquer tutorial, vale alinhar o vocabulário, porque o mercado mistura tudo. Um style guide é um documento de aparência: logo aqui, cor primária ali, tipografia assim. Um UI kit é uma biblioteca de desenhos prontos, geralmente no Figma: botões, cards e inputs para copiar e colar. Um design system é outra categoria de coisa. É o conjunto de princípios, tokens, componentes e regras de uso que governa como um produto toma decisões visuais e de interação. O style guide descreve como o produto se parece; o design system define como o produto decide.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Minha opinião, depois de construir um sozinho: se o seu “design system” não muda a forma como você trabalha numa terça-feira qualquer, ele é decoração. O teste é simples. Quando surge uma tela nova, você abre a biblioteca e a tela se monta quase sozinha, com as dúvidas resolvidas antes de virarem dúvidas? Ou você abre o Figma e começa a inventar cinza novo? Um sistema de verdade responde perguntas. Um sistema de mentira gera perguntas e chama isso de flexibilidade.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tem outra diferença que quase ninguém menciona: um design system existe nos dois lados da fronteira entre design e código. Se o token existe no Figma mas não existe no CSS, ele não existe. Se o componente existe no React mas ninguém sabe quando usá-lo, ele não existe. O sistema é o que sobrevive à travessia. No Aero, essa regra virou literal: nenhuma cor, espaçamento ou componente entra na interface se não tiver nome e lugar nos dois mundos.",
				],
			},
			{
				type: "list",
				items: [
					"Style guide: documento de aparência. Responde “como parece?”.",
					"UI kit: coleção de desenhos. Responde “onde copio isso?”.",
					"Design system: princípios + tokens + componentes + regras de uso, vivos no design e no código. Responde “como decidimos?”.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Vale dizer que nenhuma das três coisas é inimiga das outras. Um UI kit bem feito economiza tempo de desenho, e um style guide resolve marca. O problema é chamar qualquer uma delas de design system e esperar que ela faça o trabalho que não foi feita para fazer. Já vi projeto com quinhentos componentes no Figma e nenhuma regra de uso: o resultado era uma interface diferente a cada sprint, porque copiar desenho pronto não transfere critério. Critério é a parte invisível do sistema, e é justamente a parte que não cabe num arquivo de componentes.",
				],
			},
			{ type: "heading", level: 2, text: "O contexto do Aero: por que um sistema para um projeto solo" },
			{
				type: "paragraph",
				content: [
					"A objeção óbvia: design system é coisa de time grande, de empresa com dez designers e uma squad de design ops. Para um produto solo, seria burocracia. Eu pensava parecido, até contar quantas microescolhas repetidas eu fazia por dia. Qual cinza de fundo neste card? 12 ou 16 pixels de respiro? Esse botão é primário ou secundário? Cada pergunta dessas custa entre trinta segundos e dois minutos. Some vinte por dia e você queimou quase uma hora decidindo o que já tinha decidido semana passada, provavelmente de um jeito diferente.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Num projeto solo, o design system não existe para alinhar pessoas; existe para alinhar você com você mesmo. O Lucas de março não conversa com o Lucas de junho, e o de junho esqueceu por que o de março escolheu aquele azul. O sistema é a memória dessa conversa. É também a única forma de manter consistência quando você é designer, desenvolvedor, QA e suporte ao mesmo tempo: a consistência não pode depender de atenção, porque atenção é o recurso mais escasso de quem trabalha sozinho.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E tem o ganho de velocidade, que foi o que mais me surpreendeu. Depois que os tokens e os componentes-base ficaram prontos, telas novas passaram a nascer em horas, não em dias. Não porque eu digitava mais rápido, mas porque as decisões estavam pré-tomadas. O trabalho virou composição: escolher blocos conhecidos e resolver apenas o que era genuinamente novo naquela tela. Um design system, nesse contexto, é uma máquina de economizar decisão. Cada token definido é uma microescolha que você nunca mais precisa refazer.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tem ainda um efeito colateral que eu não previa: qualidade constante no piloto automático. Todo mundo tem dia ruim, dia com pressa, dia de cansaço. Sem sistema, o dia ruim vira tela ruim, e a tela ruim fica lá para sempre, azedando o conjunto. Com o sistema, até a tela feita às pressas sai no padrão, porque o padrão é o caminho mais curto. O design system não eleva o teto do produto; ele levanta o piso. E para um produto que eu mantenho sozinho, o piso é o que garante que o Aero de hoje não envergonhe o Aero de ontem.",
				],
			},
			{ type: "heading", level: 2, text: "Princípios antes de pixels" },
			{
				type: "paragraph",
				content: [
					"A tentação de todo mundo que começa um design system é abrir o Figma e sair desenhando botão. Eu resisti por uma razão egoísta: sem critérios, eu ia redesenhar esses botões quatro vezes. Então, antes de qualquer pixel, escrevi três princípios. Eles não são pôster motivacional; são filtros. Toda decisão do sistema, do tom de cinza ao comportamento de um atalho de teclado, passa por pelo menos um deles.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/principios-do-aero.png",
				alt: "Os três princípios de design do Aero: fricção zero, densidade útil e keyboard-first, definidos antes de qualquer decisão visual",
				caption:
					"Os três princípios do Aero, escritos antes de qualquer pixel. Eles filtram todas as decisões do sistema.",
			},
			{ type: "heading", level: 3, text: "Fricção zero" },
			{
				type: "paragraph",
				content: [
					"Gestão de projeto já é cheia de atrito por natureza; a ferramenta não pode adicionar mais. Fricção zero significa que criar, mover e concluir uma tarefa precisa ser mais rápido do que pensar em como fazer isso. Na prática, esse princípio matou modais (quase tudo vira drawer lateral), exigiu feedback visual imediato para qualquer ação e criou a regra de que nenhuma operação comum pode exigir mais de dois cliques ou um atalho. Quando uma tela nova ameaça quebrar essa regra, a tela é que muda, não a regra.",
				],
			},
			{ type: "heading", level: 3, text: "Densidade útil" },
			{
				type: "paragraph",
				content: [
					"Ferramenta de trabalho não é pôster. Uma tela de projeto precisa mostrar muita informação sem virar bagunça. Densidade útil é o equilíbrio entre caber bastante coisa na tela e continuar legível: tipografia compacta mas confortável, espaçamentos curtos mas consistentes, hierarquia feita por peso e cor em vez de tamanho gigante. Esse princípio respondeu perguntas concretas de tokens: quantos tons de cinza são demais (cinco, e olhe lá), qual o line-height mínimo aceitável, quando uma lista vira tabela. Densidade útil não é apertar tudo; é não desperdiçar pixel nem atenção.",
				],
			},
			{ type: "heading", level: 3, text: "Keyboard-first" },
			{
				type: "paragraph",
				content: [
					"O Aero nasceu da minha frustração de tirar a mão do teclado cinquenta vezes por hora para arrastar cartões com o mouse. Keyboard-first virou princípio de sistema, não feature: todo componente interativo precisa ser operável por teclado, todo atalho precisa ser descobrível, e o foco visível é cidadão de primeira classe no design, não um contorno azul padrão do navegador que a gente apaga com outline: none. Esse princípio, sozinho, moldou mais tokens e componentes do que qualquer preferência estética minha. Foi ele, por exemplo, que decidiu a existência do command menu antes mesmo de eu desenhar a primeira tela.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O pulo do gato é que princípio bom gera token. “Keyboard-first” virou um anel de foco com token próprio, usado em tudo. “Densidade útil” virou uma escala de espaçamento curta. “Fricção zero” virou regra de que estados de loading e sucesso têm tempos máximos de resposta visual. Quando o princípio não vira decisão concreta, ele é frase de parede.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Um detalhe de método: eu testo princípio com pergunta real. Sempre que travo numa decisão, pergunto em voz alta o que cada princípio diria. Se nenhum dos três tem opinião sobre o assunto, o princípio está mal escrito ou a decisão é trivial e eu deveria parar de enrolar. Essa checagem, que leva dez segundos, me poupou de horas de tentativa e erro e de várias “soluções criativas” que na verdade eram só inconsistências com boa apresentação.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Design tokens na prática" },
			{
				type: "paragraph",
				content: [
					"Tokens são as menores decisões do sistema: cor, tipografia, espaçamento, raio, elevação. A parte que ninguém conta é que o difícil não é escolher valores bonitos; é escolher poucos valores e dar nomes que envelheçam bem. No Aero, cada token tem nome de intenção, não de aparência. Não existe “cinza-700”: existe superfície de fundo, superfície elevada, texto secundário. Isso parece detalhe pedante até o dia em que você precisa escurecer o tema inteiro e descobre que “cinza-700” está usado em trezentos lugares com três significados diferentes.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/tokens-e-superficies.png",
				alt: "Paleta de cores e componentes do design system do Aero: superfícies escuras #101115 e #24262F, azul de ação #388CFA, magenta destrutivo #911756 e cores de estado",
				caption:
					"Tokens do Aero: superfícies em camadas e cores nomeadas pela intenção, não pela aparência.",
			},
			{ type: "heading", level: 3, text: "Cor como sinal, não decoração" },
			{
				type: "paragraph",
				content: [
					"A paleta do Aero é escura por decisão de produto, não por moda: ferramenta de foco longo, usada de noite, precisa cansar pouco os olhos. Hoje ela fecha em 18 tokens de cor, organizados em três grupos semânticos. O primeiro, “Marca e Estrutura”, tem 7 tokens e governa as superfícies e a ação: primary (#24262F) no corpo da aplicação, primary-10 (#1D1F26) em painéis e sidebar, primary-20 (#17181D) em inputs e dropdowns, primary-30 (#101115) em sombras profundas e bordas sutis, brand (#388CFA) como cor de ação, background (#0E1015) no fundo mais profundo e card (#1A1C23) nas superfícies elevadas. Repare nos nomes: nenhum deles descreve aparência, todos descrevem papel. O segundo grupo, “Texto e Conteúdo — Neutral”, tem 5 tokens que cuidam só da hierarquia de leitura: neutral (#FFFFFF) para títulos e texto de alto contraste, neutral-10 (#F5F5F5) para o texto do corpo principal, neutral-20 (#D4D4D4) para legendas e descrições secundárias, neutral-30 (#A3A3A3) para placeholders e ícones inativos, e neutral-40 (#737373) para bordas desabilitadas. O terceiro grupo, “Feedback e Status”, fecha com 5 tokens semânticos: success (#18821C) para o que está concluído e seguro, warning (#A35A01) para atenção e pendências, danger (#911756) para erro e ação destrutiva, info (#008E8E) para o que é informativo e neutro, e accent (#535C91) para destaques secundários, badges e tags.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/cores-neutral-feedback.png",
				alt: "Tokens de cor dos grupos Texto e Conteúdo e Feedback e Status do design system do Aero: cinco neutros de hierarquia de leitura e cinco cores semânticas de estado, com hex e papel de cada um",
				caption:
					"Os grupos Neutral e Feedback na Documentação Viva: cinco tons de leitura e cinco cores de estado, cada um com hex e papel definidos.",
			},
			{
				type: "paragraph",
				content: [
					"A regra de ouro que sai dessa organização é curta: componentes consomem tokens, nunca valores arbitrários. Quando alguma tela parece pedir um fundo novo, a pergunta certa é “qual camada semântica é essa?”, e não “qual hex fica bonito?”. Se a resposta não existe, o caminho não é escrever um bg-[#123456] qualquer; é propor um token novo, que só entra se nomear um significado que ainda falta.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/paleta-de-cores.png",
				alt: "Grade de tokens de cor do design system do Aero na página de documentação viva: 18 tokens organizados em Marca e Estrutura, Texto e Conteúdo e feedback",
				caption:
					"Os 18 tokens de cor na Documentação Viva do Aero, agrupados por papel semântico.",
			},
			{
				type: "paragraph",
				content: [
					"Cor com saturação, no Aero, é sempre sinal. O azul #388CFA é a única cor de ação: links, botões primários, seleção, foco. Se algo é azul, é clicável ou está em foco; se não é clicável, não é azul. O magenta #911756 (com variantes para hover e fundos sutis) é reservado para ações destrutivas, então excluir um projeto nunca parece igual a salvar um projeto. Os demais status seguem a mesma lógica de reserva de significado: o verde success (#18821C) confirma conclusão, o âmbar warning (#A35A01) pede atenção, o teal info (#008E8E) informa sem urgência e o accent (#535C91) marca destaques secundários como badges e tags. O resultado é uma interface que se lê sozinha: a cor carrega significado antes de você processar o texto.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A disciplina aqui é subtrativa. Cada cor nova dilui o significado das existentes, então a barreira de entrada é alta: para entrar na paleta, uma cor precisa nomear um significado que ainda não existe e provar que vai aparecer em mais de um fluxo. Em meses de produto, essa regra barrou várias tentações minhas de “dar uma variada”.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Contraste também foi decidido no nível do token, não tela a tela. Texto principal, texto secundário e texto desabilitado têm valores fixos e testados contra as três profundidades de superfície, então qualquer combinação permitida pelo sistema passa em contraste por construção. Isso muda o jogo de acessibilidade: em vez de auditar telas depois de prontas, a acessibilidade vira propriedade herdada. Quem usa os tokens certos herda o contraste certo, sem precisar lembrar que ele existe.",
				],
			},
			{ type: "heading", level: 3, text: "Tipografia funcional" },
			{
				type: "paragraph",
				content: [
					"Inter cuida de toda a interface, da label do botão ao título da página, porque foi desenhada para tela e aguenta bem tamanhos pequenos, que é onde a densidade útil mora. Os pesos vão de 300 a 700, mas a escala em uso é de 7 níveis tipográficos, cada um com papel: Display H1 (36px, peso 700) para momentos raros de destaque, H1 (30px, 600), H2 (24px, 600), H3 (20px, 600), Body (16px, 400) como texto padrão, Small (14px) para informação secundária e Tiny/Label (12px, 500, uppercase) para metadados e rótulos de status, como o “EM PROGRESSO” das colunas do quadro. JetBrains Mono entra apenas em contextos técnicos: atalhos de teclado, identificadores, números que precisam alinhar.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/escala-tipografica.png",
				alt: "Escala tipográfica do design system do Aero com os 7 níveis, de Display H1 36px a Tiny Label 12px uppercase em Inter",
				caption:
					"Os 7 níveis tipográficos, cada um com tamanho, peso e papel definidos.",
			},
			{
				type: "paragraph",
				content: [
					"Metadados, como datas, tags e labels de status, usam uppercase com tracking aberto em tamanho pequeno. É um truque velho, mas resolve dois problemas de uma vez: separa visualmente a informação secundária do conteúdo principal e permite tamanhos menores sem perder legibilidade. E apesar de a Inter oferecer cinco pesos, cada nível da escala trava um peso só: ninguém escolhe entre medium e semibold tela a tela, porque essa decisão já foi tomada na definição do nível. Itálico ficou de fora pelo mesmo motivo, uma variação a menos para decidir em cada tela.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Line-height e medida de linha também entraram como tokens, o que me poupou de um clássico de interfaces densas: texto técnico esmagado e bloco de leitura longa esticado demais. Texto de interface usa entrelinha justa, porque vive em doses curtas; texto de leitura, como descrições de projeto e este artigo, usa entrelinha generosa e largura de coluna limitada. Parece óbvio escrito assim, mas sem token esses dois contextos vivem vazando um para dentro do outro, e o resultado é aquela sensação de interface apertada que ninguém sabe explicar.",
				],
			},
			{ type: "heading", level: 3, text: "Espaçamento, raio e elevação" },
			{
				type: "paragraph",
				content: [
					"Espaçamento em base de 4px, sem exceções heroicas. A escala final fechou em 8 passos, de 2px a 64px, e na prática a imensa maioria da interface vive nos valores do meio. Essa pobreza deliberada é o que faz telas montadas em meses diferentes parecerem irmãs. Raio de borda segue a mesma filosofia: 5 níveis, de sm a 2xl, do canto discreto de um input ao arredondado generoso de um card, com pílula completa (rounded-full) reservada ao que nasceu redondo, como badges e avatares. Bordas têm padrão explícito: border-primary-30 como estado neutro, e border-brand ou neutral-40 quando o elemento está ativo ou em foco.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Elevação, num tema escuro, quase não é sombra: é superfície mais clara sobre superfície mais escura. O card (#1A1C23) flutua sobre o background (#0E1015) por contraste de valor, não por box-shadow decorativa. As sombras existem, numa escala de sm a xl, mas reforçam apenas o que flutua de verdade: dropdowns, popovers, modais e a command palette. Na mesma família de detalhes entram os ícones, todos do Lucide React, traço outline de 2px, tamanhos de 16, 20 ou 24px, herdando currentColor para nunca brigar com o token de texto ao redor. E três efeitos especiais fecham a camada: o .aurora-bg, um gradiente animado usado com parcimônia em fundos de destaque; o .focus-ring, um outline de 2px na cor brand aplicado via focus-visible; e uma scrollbar customizada de 8px que combina com o tema em vez de gritar o cinza padrão do sistema operacional.",
				],
			},
			{ type: "heading", level: 2, text: "Tokens no código: do Figma ao Tailwind" },
			{
				type: "paragraph",
				content: [
					"Token que vive só no Figma apodrece. No Aero, a fonte única da verdade é o código: os 18 tokens de cor são CSS variables declaradas no :root do app/globals.css, e o Tailwind os consome via @theme inline, que expõe as variáveis como utilitários sem duplicar valores. No dia a dia eu escrevo classes como bg-card, bg-primary-10, text-neutral-30, border-primary-30, e nunca um valor hexadecimal. Se um dia o azul de ação mudar, muda num lugar só e a interface inteira acompanha, porque o utilitário aponta para a variável, não para o hex.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A separação entre valores brutos e papéis semânticos foi a decisão mais importante dessa camada. Componentes nunca tocam hex diretamente; eles conhecem primary, card, brand, neutral-30, danger. Isso cria um amortecedor: posso retocar o valor de qualquer variável sem revisar componente por componente, porque eles só conhecem papéis. E como o produto nasceu dark-first, um tema claro (se vier) será uma remapeação das mesmas variáveis no :root, não um projeto novo.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Na prática, o fluxo ficou assim: defino ou ajusto o token no arquivo de tema, o Tailwind expõe a classe semântica, e o Figma recebe a atualização na biblioteca de estilos com o mesmo nome. O nome é o contrato entre os dois mundos; enquanto o nome bate, design e código não divergem. Não usei pipeline de tokens nem sincronização automática entre Figma e código (volto a isso na seção de ferramentas): para uma pessoa, disciplina de nomenclatura resolve o que a ferramenta resolveria para um time.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Um exemplo concreto do amortecedor em ação: em certo momento, achei a superfície dos cards clara demais em relação ao fundo, e o contraste entre cartões e página parecia fraco em monitores piores. A correção foi ajustar uma única variável no :root. Cards, drawers e painéis elevados escureceram juntos, sem eu abrir um único componente. Se esses componentes usassem valores brutos, eu estaria caçando hex por dezenas de arquivos. É nesse tipo de manutenção invisível que o investimento em tokens se paga.",
				],
			},
			{ type: "heading", level: 2, text: "Componentes: de botão a padrões" },
			{
				type: "paragraph",
				content: [
					"Com os tokens de pé, a camada de componentes teve uma regra rígida: componente novo só nasce quando o padrão se repete três vezes. Antes disso, o código fica duplicado de propósito. Parece heresia para quem aprendeu DRY cedo, mas abstração prematura é como design systems incham: você cria um componente “flexível” para um padrão que só existia na sua imaginação, e ele vira peso morto com props que ninguém usa. Na terceira repetição, o padrão já mostrou suas variações reais, e aí a abstração sai certa.",
				],
			},
			{ type: "heading", level: 3, text: "Estados observáveis, sempre" },
			{
				type: "paragraph",
				content: [
					"Todo componente interativo do Aero nasce com seus estados desenhados e implementados junto: default, hover, focus, disabled e loading. Não é fase dois; é parte da definição de pronto. O botão mostra o que acontece ao passar o mouse, ao receber foco de teclado (com o anel de foco do princípio keyboard-first), ao ficar indisponível e ao estar processando. Inputs idem, incluindo estado de erro com mensagem. Essa disciplina eliminou uma categoria inteira de bugs visuais: o “esqueci desse estado” que só aparece quando um usuário tropeça nele.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O inventário final fechou em 9 componentes de interface, todos nascidos em components/ui/ com variantes declaradas via cva, a biblioteca que transforma combinações de variantes em classes com tipagem. O botão é o melhor exemplo: 6 variantes (default, secondary, outline, ghost, destructive e link) cruzadas com 3 tamanhos (h-9, h-10 e h-11), e estado desabilitado implementado do jeito mais honesto possível, opacity-50 combinado com pointer-events-none. Como as variantes são declaradas num objeto fechado, a combinação que não existe não compila.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/showcase-botoes.png",
				alt: "Showcase de botões do design system do Aero: 6 variantes, 3 tamanhos e estados de hover, foco e desabilitado na página de documentação viva",
				caption:
					"Botões na Documentação Viva: 6 variantes × 3 tamanhos, com todos os estados visíveis.",
			},
			{ type: "heading", level: 3, text: "O command menu como componente-âncora" },
			{
				type: "paragraph",
				content: [
					"Todo design system tem um componente que, se estiver certo, legitima o resto. No Aero é o command menu: uma paleta de comandos aberta por atalho, que lista ações, projetos e navegação com busca instantânea. Ele concentra tudo o que o sistema prega: é keyboard-first por definição, usa os tokens de superfície e foco, tem estados de vazio e loading desenhados, e prova que a densidade útil funciona, porque mostra muita opção em pouco espaço sem sufocar. Foi o componente mais difícil e o que mais rendeu: depois dele, menus, popovers e listas de busca saíram quase de graça, herdando o comportamento.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/command-menu-teclado.png",
				alt: "Command menu do Aero aberto por atalho de teclado, com busca instantânea de ações e projetos, sobre o tema escuro do design system",
				caption:
					"O command menu: o componente-âncora do sistema. Se ele está certo, o resto do sistema se legitima.",
			},
			{ type: "heading", level: 3, text: "Drawer, badges e o resto" },
			{
				type: "paragraph",
				content: [
					"O drawer lateral é onde a edição acontece: clicou numa tarefa, o drawer abre com todos os detalhes, sem tirar você do contexto do quadro. Foi a resposta direta do princípio fricção zero ao impulso de abrir modal central para tudo. Os badges de status são pílulas rounded-full com text-xs em font-semibold, mapeados diretamente aos tokens de feedback, então “em andamento” e “concluído” se distinguem por cor e texto, nunca só por cor, porque acessibilidade também é consistência. Os inputs têm placeholder em neutral-30 e estados de erro, desabilitado e ícone à esquerda. Checkbox, avatar (com fallback de iniciais quando não há foto), tooltip e skeleton completam o conjunto. O skeleton, aliás, é um dos meus favoritos: ele preserva o layout durante o carregamento, então a tela não pula quando o conteúdo chega, uma vitória pequena e silenciosa do princípio fricção zero.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/outros-componentes.png",
				alt: "Componentes checkbox, avatar com iniciais, tooltip e skeleton de carregamento do design system do Aero na documentação viva",
				caption:
					"Checkbox, avatar, tooltip e skeleton: os discretos que seguram a consistência no dia a dia.",
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/drawer-edicao.png",
				alt: "Drawer lateral de edição de tarefa do Aero, com campos, badges de status coloridos e ações, seguindo os padrões do design system",
				caption:
					"O drawer de edição: detalhes completos sem sair do contexto. Modal central quase não existe no Aero.",
			},
			{
				type: "paragraph",
				content: [
					"TypeScript ajuda a manter essa coleção pequena confiável: as props de cada componente são contratos curtos e explícitos, e variantes são union types fechados, então a variante “mais ou menos primária” simplesmente não compila. O Tailwind, por sua vez, mantém a implementação colada nos tokens, porque estilizar fora da escala dá trabalho, e preguiça bem direcionada é uma ótima ferramenta de governança.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Vale registrar o que não virou componente: o quadro de tarefas, o cabeçalho de projeto e a barra lateral são composições, não componentes de biblioteca. Cada um aparece uma única vez no produto, então abstraí-los só criaria uma camada de props para configurar algo que não varia. Componente de biblioteca é para o que se repete; o resto é tela, montada com os blocos pequenos. Confundir essas duas coisas é como nascem aqueles componentes de 800 linhas com vinte props opcionais que todo mundo tem medo de mexer.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Documentação: o mínimo que documenta (e onde ela mora)" },
			{
				type: "paragraph",
				content: [
					"Documentação de design system tem uma taxa de mortalidade altíssima porque costuma nascer enciclopédica e longe do produto. PDF de brand book, página de Figma arquivada, wiki que ninguém abre: tudo isso apodrece na velocidade em que o código muda. Minha resposta, na versão atual do sistema, foi levar a documentação para dentro do próprio produto. O Aero tem hoje uma página pública de design system, a ",
					{ text: "Documentação Viva", href: "https://aeroprojectmanager.netlify.app/design-system" },
					", que lista os 18 tokens de cor, os 7 níveis tipográficos, os 8 passos de espaçamento e os 9 componentes, tudo renderizado com os próprios tokens --color-* que a interface usa. A regra ali é explícita: tudo aqui é fonte da verdade.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O nome não é enfeite. Uma página viva dentro do produto vence um documento estático por uma razão estrutural: ela não consegue mentir. Se eu mudar o valor de um token no :root, a página muda junto, porque ela é feita dos mesmos componentes e das mesmas variáveis que documenta. Um PDF mostra o sistema como ele era no dia da exportação; a Documentação Viva mostra o sistema como ele é agora. E tem o efeito colateral de provar o sistema por uso: a própria página é um teste de fumaça permanente dos tokens e componentes.",
				],
			},
			{
				type: "image",
				src: "/blog/design-system-do-zero/documentacao-viva-topo.png",
				alt: "Topo da página Documentação Viva do design system do Aero, com o selo v1.0 e o resumo de 18 tokens de cor, 7 níveis tipográficos, 8 passos de espaçamento e 9 componentes",
				caption:
					"A Documentação Viva (v1.0) dentro do Aero: os números do sistema na abertura da página.",
			},
			{
				type: "paragraph",
				content: [
					"Ao lado da página vive o DESIGN_SYSTEM.md, o documento que registra as decisões em prosa, organizado nas seções §1 a §7, dos fundamentos à governança. A divisão de trabalho ficou assim: a página mostra, o arquivo explica. O aprendizado real do case continua valendo: documentar antes de construir reduz decisões contraditórias, porque escrever “este badge é para status de fluxo, não para categorias” antes de implementar me obriga a decidir o significado uma vez só. Mas agora a documentação curta tem um endereço público e um irmão renderizado que não deixa ela envelhecer em silêncio.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A governança que segura isso tudo cabe em quatro regras. Primeira: cor nova entra primeiro como variável CSS, nunca direto num componente. Segunda: valores arbitrários estão proibidos, então um bg-[#123456] solto no código é sinal de que falta um token, não de que faltou criatividade. Terceira: componente novo nasce em components/ui/, com variantes declaradas via cva. Quarta, e talvez a mais importante: todo componente novo é obrigado a aparecer na página de design system. Essa última fecha o ciclo, porque torna impossível criar componente fantasma. Se não está documentado na Documentação Viva, não existe.",
				],
			},
			{
				type: "quote",
				text: "Um design system não é uma biblioteca de componentes. É um acordo sobre quais decisões já foram tomadas, para que você possa gastar energia nas que ainda não foram.",
			},
			{ type: "heading", level: 2, text: "Ferramentas e workflow" },
			{
				type: "paragraph",
				content: [
					"O workflow é deliberadamente sem glamour: Figma para explorar e registrar, código como fonte da verdade. Não há sincronização automática entre os dois; há nomes iguais e a disciplina de atualizar um quando o outro muda. Para um time, isso seria frágil. Para uma pessoa, funciona porque o gargalo de comunicação sou eu comigo, e o custo de manter os dois lados alinhados é menor do que o custo de configurar e manter uma pipeline de tokens.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Pelo mesmo motivo, cortei ferramentas que seriam óbvias num time: nada de Storybook, nada de Tokens Studio, nada de pipeline de publicação de tokens. O Storybook resolveria um problema que eu resolvi de outro jeito: a Documentação Viva dentro do produto cumpre o papel de catálogo navegável dos componentes, com a vantagem de usar os mesmos tokens e o mesmo build da aplicação real. O Tokens Studio resolveria sincronização, que eu resolvo com nomenclatura e com as CSS variables no :root. Ferramenta boa é a que resolve um problema que você tem hoje, não a que resolve o problema que você teria se fosse uma empresa de duzentas pessoas. Escolher o que não usar é metade do trabalho de escolher ferramentas.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A ordem de trabalho também importou. Meu ciclo padrão ficou: problema real no produto, exploração no Figma, decisão registrada na documentação curta, token ou componente no código, tela final usando o que nasceu. Repare que o sistema sempre nasce puxado pelo produto, nunca o contrário. Nas semanas em que inverti essa ordem e trabalhei “no sistema” por esporte, produzi coisas bonitas que o produto não pediu e provavelmente nunca usaria. Design system sem demanda real é hobby com nome corporativo.",
				],
			},
			{ type: "heading", level: 2, text: "Erros comuns que eu vejo (e cometi)" },
			{
				type: "paragraph",
				content: [
					"Olhando para o meu processo e para os sistemas que vejo por aí, os mesmos erros se repetem com uma regularidade quase cômica. Nenhum deles é erro de execução; são todos erros de escopo e de ordem. O padrão por trás de todos é o mesmo: construir para o produto que você imagina ter, e não para o que está na sua frente pedindo atenção.",
				],
			},
			{
				type: "list",
				items: [
					"Começar pelos componentes. Botão é a parte fácil; sem princípios e tokens antes, cada componente vira uma ilha com critérios próprios. Eu desenhei botões na primeira semana e joguei tudo fora na terceira.",
					"Tokens demais. Escala de cinza com quinze degraus parece capricho e é covardia: você está transferindo a decisão de qual cinza usar para cada tela, para sempre. Poucos tokens com papéis claros vencem muitos tokens ambíguos.",
					"Sistema grande demais para o produto. Se o produto tem cinco fluxos, o sistema não precisa de quarenta componentes. Tamanho de sistema deve seguir tamanho de produto, com folga pequena para crescer.",
					"Cor decorativa. Cada cor bonita sem significado destrói um pouco do valor semântico da paleta. A tentação é constante; o preço aparece meses depois, quando ninguém mais sabe o que o roxo quer dizer.",
					"Documentação que ninguém lê. Se documentar dá mais trabalho do que usar o sistema, o formato está errado. Curto, perto do código, escrito antes de construir.",
					"Variantes por precaução. Todo componente especulativo que criei “caso precise” virou peso morto. A regra das três repetições existe para matar esse impulso.",
				],
			},
			{ type: "heading", level: 2, text: "O que eu faria diferente" },
			{
				type: "paragraph",
				content: [
					"Se eu começasse o sistema do Aero hoje, sabendo o que sei, três mudanças sairiam na frente. Primeiro: nomearia os tokens semânticos desde o dia um. Comecei com nomes de aparência nos primeiros componentes e migrei para nomes de intenção no meio do caminho; a refatoração não foi trágica, mas foi uma semana que eu poderia ter passado construindo produto. A lição é que o custo de nomear certo é baixo no início e cresce a cada componente que nasce com o nome errado.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Segundo: desenharia os estados de erro, vazio e carregamento antes dos estados ideais. O design feliz é fácil; o difícil é o que acontece quando a busca não retorna nada, quando a lista está vazia no primeiro uso, quando a rede cai no meio do salvamento. Eu projetei esses estados reagindo a problemas reais, um por um, e cada um exigiu retrabalho de tela. Se tivesse começado por eles, os estados ideais teriam saído quase de graça, porque o estado vazio de uma lista bem pensada já define metade do layout.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Terceiro: trataria o anel de foco e os padrões de teclado como tokens e componentes de primeira classe desde o início, e não como consequência do princípio keyboard-first aplicado depois. O foco visível do Aero ficou ótimo, mas passou por duas iterações de estilo porque nasceu como detalhe e não como token com nome e regra. Hoje ele finalmente tem esse status: virou o utilitário .focus-ring, outline de 2px na cor brand, aplicado via focus-visible em tudo que recebe foco. Numa interface que se orgulha de ser operada por teclado, o indicador de foco é tão identidade quanto o azul de ação, e merecia ter nascido assim.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tem um quarto item, menos técnico e mais de postura: eu mediria o sistema desde o começo. Nada sofisticado, apenas anotar de onde vêm as demandas novas e quanto tempo levo para montar uma tela típica. Hoje eu afirmo que o sistema acelerou o produto porque sinto que acelerou, e sensação é péssima conselheira. Com números simples, eu saberia antes quais partes do sistema pagam o próprio custo e quais são vaidade minha vestida de rigor.",
				],
			},
			{ type: "heading", level: 2, text: "Checklist para começar seu design system hoje" },
			{
				type: "paragraph",
				content: [
					"Uma pergunta que me fazem com frequência: quanto tempo leva? No meu caso, a base útil (princípios, tokens e os primeiros componentes) saiu em cerca de três semanas de trabalho distribuído, sempre puxada por telas reais do produto. Para fechar a parte prática, o caminho que eu recomendaria a qualquer pessoa (sozinha ou em time pequeno) que quer saber como criar um design system sem afogar o produto nele. Cada item cabe numa semana de trabalho ou menos:",
				],
			},
			{
				type: "list",
				items: [
					"Escreva de 2 a 4 princípios que respondam perguntas reais do seu produto. Se um princípio não vira decisão concreta, corte.",
					"Defina os tokens de cor com nomes de intenção: uma base neutra curta, uma cor de ação, uma cor destrutiva e cores de estado. Nada decorativo.",
					"Fixe uma escala tipográfica curta com até duas famílias e três pesos, e uma escala de espaçamento em múltiplos de 4px.",
					"Leve os tokens para o código como fonte única da verdade (CSS variables, config do Tailwind), com a camada semântica separada dos primitivos.",
					"Construa componentes só quando um padrão se repetir três vezes. Antes disso, duplique sem culpa.",
					"Desenhe e implemente todos os estados observáveis junto com o componente: hover, focus, disabled, loading, erro e vazio.",
					"Documente antes de construir: nome, quando usar, quando não usar e dois do/don'ts curtos por componente.",
					"Escolha um componente-âncora, o mais exigente do seu produto, e use-o para validar todo o sistema.",
					"Revise o sistema a cada ciclo do produto. Um sistema pequeno e vivo vale mais que um grande e abandonado.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Conclusão" },
			{
				type: "paragraph",
				content: [
					"Um design system não é um projeto com data de entrega; é o hábito de tomar cada decisão visual uma vez só e guardar a resposta onde ela possa ser reutilizada. O do Aero continua evoluindo junto com o produto, e essa é a métrica que importa: quantas decisões ele economiza por semana, não quantos componentes ele lista. Se o seu sistema está te deixando mais rápido e a interface mais consistente, ele está funcionando, mesmo que caiba numa página de documentação.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Se eu pudesse resumir tudo em uma frase para o Lucas do passado, seria esta: comece pequeno, nomeie com intenção e deixe o produto puxar o sistema. A ordem inversa, sistema grande esperando produto, é o caminho certo para o museu de bibliotecas abandonadas. O seu sistema não precisa impressionar ninguém no Dribbble; precisa estar lá, firme, numa terça-feira qualquer, respondendo as perguntas antes de você fazê-las.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Se quiser ver como tudo isso aparece na interface, o ",
					{ text: "case completo do Aero", href: "/projetos/aero/" },
					" mostra o sistema aplicado em fluxos reais, do command menu ao drawer de edição. E se quiser inspecionar o sistema peça por peça, a ",
					{ text: "Documentação Viva do design system", href: "https://aeroprojectmanager.netlify.app/design-system" },
					" está aberta, com os 18 tokens de cor, os 7 níveis tipográficos e os 9 componentes renderizados ao vivo. Se você está estruturando o design system do seu produto e quer trocar uma ideia, me chama pela ",
					{ text: "página inicial do portfólio", href: "/" },
					". Esse é dos meus assuntos favoritos, e eu sempre tenho tempo para falar de tokens bem nomeados.",
				],
			},
		],
	},
];

/** Busca um artigo pelo slug (sem barras). */
export function getArticle(slug: string): Article | undefined {
	const normalized = slug.replace(/^\/+|\/+$/g, "");
	return articles.find(article => article.slug === normalized);
}

/** Artigos ordenados do mais recente para o mais antigo. */
export function getSortedArticles(): Article[] {
	return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}
