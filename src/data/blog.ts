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
	{
		slug: "tracking-server-side-afiliados",
		title: "Tracking server-side para afiliados: as vendas que o pixel esconde de você (e como recuperá-las)",
		excerpt:
			"O pixel perde de 25% a 40% das suas conversões e o algoritmo otimiza em cima de dado errado. O guia definitivo de tracking server-side para afiliados: por que o pixel morreu, como funciona o envio duplo para a Conversions API, dado enriquecido, antifraude com bloqueio de IP e a arquitetura real do Ratoeira Hub, produto que projetei.",
		date: "2026-08-13",
		tags: ["Tracking", "Tráfego Pago", "Afiliados", "Conversões"],
		coverImage: "/blog/tracking-server-side-afiliados/dashboard-tracking-conversoes.webp",
		coverImageAlt:
			"Dashboard de tracking do Ratoeira Hub mostrando páginas, visitantes, dispositivos e eventos rastreados server-side",
		ogDescription:
			"Tracking server-side para afiliados, sem enrolação: por que o pixel perde 25–40% das conversões, como o envio duplo para a Conversions API e o dado enriquecido recuperam vendas invisíveis, e como a arquitetura do Ratoeira Hub resolve isso na prática.",
		blocks: [
			{
				type: "paragraph",
				content: [
					"Você fez a venda. O checkout aprovou, a comissão caiu na plataforma de afiliados, o dinheiro existe. Mas quando você abre o gerenciador do Google Ads ou do Meta Ads, aquela venda simplesmente não está lá. Para o algoritmo, o clique que você pagou virou nada: um visitante que entrou e sumiu. E amanhã o algoritmo, que aprende com o que vê, vai tomar decisões de lance e de público com base nessa mentira. Multiplica isso por dezenas de vendas por semana e você tem o retrato da maioria das operações de afiliado hoje: um negócio que lucra apesar dos dados, não por causa deles.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O número é mais feio do que a intuição sugere. Entre bloqueadores de anúncio, restrições de navegador, o App Tracking Transparency da Apple e os redirecionamentos de checkout que quebram a sessão, o pixel tradicional perde entre 25% e 40% das conversões de uma operação típica de afiliados. Não é exagero de vendedor de ferramenta; é a faixa que aparece de novo e de novo quando se compara o que a plataforma de afiliação registra com o que o gerenciador de anúncios enxerga. Um quarto a quase metade das suas vendas é invisível para quem decide onde seu orçamento vai parar amanhã.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Eu conheci esse problema de perto projetando o ",
					{ text: "Ratoeira Hub", href: "/projetos/ratoeira-hub/" },
					", uma plataforma de tracking server-side, antifraude e landing pages para afiliados e anunciantes de tráfego pago. Eu cuidei da experiência do produto e do site, e para isso passei meses mergulhado no dia a dia de quem vive de rodar campanha no Google Ads, Meta Ads, Taboola e NewsBreak. Este artigo é o guia que eu daria para qualquer afiliado que ainda roda só com pixel: por que o pixel morreu, o que é tracking server-side de verdade (sem jargão), como o envio duplo e o dado enriquecido recuperam conversões perdidas, como funciona a anatomia de um clique rastreado do anúncio à comissão, por que o antifraude se paga sozinho e como tudo isso foi arquitetado num produto real que hoje atende mais de 2.600 anunciantes.",
				],
			},
			{ type: "heading", level: 2, text: "Por que o pixel morreu para afiliados" },
			{
				type: "paragraph",
				content: [
					"O pixel não morreu de uma vez. Ele foi enforcado devagar, por quatro mãos diferentes, e a maioria dos afiliados só percebeu quando o CPA começou a subir sem explicação. Vale entender cada uma delas, porque cada uma exige uma resposta diferente, e nenhuma delas tem volta. Quem espera “o pixel voltar ao normal” está esperando algo que não vai acontecer: a direção do mercado inteiro é menos rastreamento no navegador, não mais.",
				],
			},
			{ type: "heading", level: 3, text: "iOS e o App Tracking Transparency" },
			{
				type: "paragraph",
				content: [
					"Quando a Apple lançou o App Tracking Transparency, em 2021, a pergunta “permitir que este app rastreie sua atividade?” virou o botão mais caro da história da publicidade digital. A esmagadora maioria dos usuários de iPhone diz não, e com razão. O efeito prático para quem anuncia no Meta Ads é brutal: uma fatia enorme do público mais valioso do leilão, donos de iPhone, simplesmente deixou de reportar conversões pelo caminho tradicional. A venda continua acontecendo; o Facebook só não fica sabendo. E o algoritmo de entrega, que otimiza para conversões, passa a otimizar para um retrato distorcido do público, empurrando seu anúncio para quem o sistema consegue medir, não para quem realmente compra.",
				],
			},
			{ type: "heading", level: 3, text: "Ad blockers e a morte dos cookies de terceiros" },
			{
				type: "paragraph",
				content: [
					"Bloqueadores de anúncio não bloqueiam só banner: eles bloqueiam o script do pixel. Uma parcela relevante dos seus visitantes carrega sua página inteira sem que o navegador execute uma linha sequer do código de rastreamento do Google ou do Meta. Para essas pessoas, o pixel é literalmente inexistente, e qualquer conversão que elas gerem nasce invisível. Some a isso a morte anunciada dos cookies de terceiros, primeiro no Safari e no Firefox, depois no Chrome com o Privacy Sandbox, e o mecanismo que o pixel usava para lembrar quem clicou no quê desaparece debaixo dele. O pixel dependia de um contrato entre navegadores que os navegadores resolveram rasgar.",
				],
			},
			{ type: "heading", level: 3, text: "ITP: o Safari encurtando a memória" },
			{
				type: "paragraph",
				content: [
					"O Intelligent Tracking Prevention da Apple merece parágrafo próprio porque ele ataca até quem acha que está protegido. O ITP limita a vida útil de cookies de primeira parte criados via JavaScript a algo entre 24 horas e 7 dias, dependendo do cenário. Tradução: o usuário clica no seu anúncio numa segunda-feira, volta na semana seguinte direto pelo link salvo e compra. Para você, é a mesma pessoa, a mesma jornada, a mesma campanha. Para o Safari, é um estranho. A atribuição morre no caminho e sua campanha perde o crédito de uma venda que ela gerou. Num mercado onde o ciclo de decisão do comprador frequentemente passa de uma semana, isso não é exceção; é rotina.",
				],
			},
			{ type: "heading", level: 3, text: "O redirecionamento de checkout que quebra a sessão" },
			{
				type: "paragraph",
				content: [
					"Esse é o assassino específico do afiliado brasileiro, e o menos discutido. A jornada típica de uma venda de afiliado não acontece num site só: o usuário sai do anúncio, cai na sua página, clica no botão de oferta, é jogado para o checkout da Hotmart, Kiwify, Eduzz ou similar, paga, e só então a conversão existe. Cada um desses saltos é uma chance de o rastreamento morrer. O clique nasceu com parâmetros na URL; em algum redirect no meio do caminho, os parâmetros se perdem, ou o domínio muda e o cookie de primeira parte não acompanha, ou o checkout roda num ambiente onde seu script nem pode existir. A sessão quebra, e a conversão vira órfã: a plataforma de afiliação sabe que vendeu, mas não consegue devolver essa informação ao Google ou ao Meta. É por isso que tracking para afiliados é um problema mais difícil do que tracking para e-commerce próprio: o afiliado não controla o checkout, e é justamente lá que a venda acontece.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Junte as quatro forças e a conclusão é inevitável. Não é que o pixel esteja mal configurado na sua conta; é que o ambiente em que ele foi inventado deixou de existir. Continuar rodando operação de tráfego pago dependendo só dele, em 2026, é medir febre com termômetro quebrado: o número aparece, mas não significa o que você pensa que significa.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Quem duvida do tamanho do rombo pode fazer o teste mais barato do mundo, que eu recomendo a qualquer afiliado antes de discutir ferramenta: abra a plataforma de afiliação, some as vendas aprovadas dos últimos trinta dias vindas de tráfego pago, e compare com as conversões que o Google Ads e o Meta Ads registraram no mesmo período para as mesmas campanhas. A diferença entre os dois números é o seu buraco de atribuição. Em operação de e-commerce próprio, essa diferença costuma ser pequena. Em operação de afiliado com checkout externo, ela assusta. Eu vi essa comparação feita dezenas de vezes durante o projeto do Ratoeira Hub, e a reação era sempre a mesma: primeiro incredulidade, depois aquela conta mental silenciosa de quanto dinheiro já tinha sido otimizado em cima de um terço da verdade.",
				],
			},
			{ type: "heading", level: 2, text: "O que é tracking server-side de verdade (sem jargão)" },
			{
				type: "paragraph",
				content: [
					"Tire o nome assustador e a ideia cabe numa frase: em vez de o navegador do visitante contar a conversão para o Google e para o Meta, o seu servidor conta. No modelo antigo, o pixel é um script morando no browser do usuário, sujeito a tudo o que vimos na seção anterior: bloqueador, ITP, cookie morto, sessão quebrada. No modelo server-side, o seu servidor é quem conversa com o servidor da plataforma de anúncio, de máquina para máquina, através da Conversions API. Nenhum bloqueador de anúncio do mundo bloqueia uma requisição que sai do seu servidor, porque ela nem passa pelo navegador do visitante.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O fluxo fica assim. O usuário clica no anúncio e chega à sua página com os identificadores de clique na URL: o gclid do Google, o fbclid do Meta, mais seus parâmetros de campanha. Seu servidor registra esse clique com todos esses dados. O usuário navega, clica na oferta, vai para o checkout e compra. A plataforma de afiliação confirma a venda, e o seu servidor, que guardou o vínculo entre aquele clique e aquele visitante, dispara o evento de conversão direto para a Conversions API do Google Ads e do Meta Ads, carregando os identificadores originais. A plataforma de anúncio recebe a conversão, casa com o clique que ela mesma registrou no leilão, e o círculo se fecha: o algoritmo aprende que aquele anúncio, aquele público e aquele criativo geraram venda de verdade.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O que muda na prática é a natureza do dado. Client-side, a conversão é um boato que o navegador conta quando consegue, se consegue. Server-side, a conversão é um registro que sai de uma máquina que você controla, com prova de origem. É a diferença entre depender da memória de uma testemunha distraída e ter câmera de segurança. E tem um detalhe que afiliado entende na hora: como o envio não depende do navegador do comprador, o redirect do checkout deixa de ser um problema mortal. A venda confirmada na plataforma volta ao seu servidor por integração, não por sorte de o cookie ter sobrevivido ao passeio.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/plataforma-anuncios-ratoeira.webp",
				alt: "Plataforma de anúncios integrada ao tracking server-side do Ratoeira Hub, conectando cliques de campanhas a conversões confirmadas",
				caption:
					"O tracking server-side conecta o clique do anúncio à conversão confirmada, sem depender do navegador do visitante.",
			},
			{
				type: "paragraph",
				content: [
					"Uma correção importante ao senso comum: tracking server-side não é “tracking sem consentimento” nem um truque para furar privacidade. Os dados pessoais que trafegam, como e-mail e telefone, vão hasheados, e a base legal continua sendo a mesma de qualquer operação de mídia. O que muda é a arquitetura, não a ética. O que o server-side recupera não é a capacidade de espionar ninguém; é a capacidade de medir o que você já pagou para medir.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Vale derrubar outra confusão comum: tracking server-side não é sinônimo de “instalar o Google Tag Manager server-side”. O GTM em servidor é uma das formas de fazer isso, útil para e-commerces com time de desenvolvimento, mas pressupõe que você controla o site inteiro de ponta a ponta, incluindo o checkout, o que simplesmente não é o mundo do afiliado. O afiliado precisa de uma camada de rastreamento que nasça no clique do anúncio, atravesse páginas que ele controla e checkouts que ele não controla, e devolva a conversão para várias plataformas de anúncio ao mesmo tempo. É um desenho de produto diferente, e foi exatamente esse desenho que estruturou o Ratoeira Hub.",
				],
			},
			{ type: "heading", level: 2, text: "Envio duplo e dado enriquecido: onde as conversões perdidas voltam" },
			{
				type: "paragraph",
				content: [
					"A implementação madura de tracking server-side não joga o pixel fora; ela o coloca para trabalhar em dupla. É o chamado envio duplo: o evento de conversão sai pelo navegador (pixel) e pela Conversions API (servidor) simultaneamente, com um identificador de evento único que permite à plataforma deduplicar. Se o pixel disparou, ótimo, o servidor confirma. Se o pixel morreu bloqueado, o servidor entrega sozinho. Você deixa de depender de um único mensageiro frágil e passa a ter redundância real, o tipo de redundância que qualquer engenheiro exigiria de um sistema que movimenta dinheiro.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A segunda peça é o dado enriquecido de primeira parte. Quando o evento sai pelo servidor, ele pode carregar informações que o comprador forneceu no checkout, como e-mail e telefone, devidamente hasheados antes de saírem da sua infraestrutura. Por que isso importa tanto? Porque a plataforma de anúncio precisa casar a conversão que você envia com o clique que ela registrou. O gclid e o fbclid são o casamento perfeito, mas nem toda conversão chega com eles intactos. E-mail e telefone hasheados funcionam como testemunhas: aumentam a taxa de correspondência entre venda e clique, mesmo em cenários onde o identificador direto se perdeu. É aqui que mora a recuperação prática das conversões perdidas: anunciantes que migram para essa arquitetura recuperam, em média, de 25% a 40% das conversões que antes eram invisíveis. O número do início do artigo não era só diagnóstico; é também o tamanho do que se recupera.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/integracao-meta-ads.webp",
				alt: "Integração do Ratoeira Hub com o Meta Ads, enviando conversões server-side com envio duplo e dados enriquecidos para a Conversions API",
				caption:
					"Meta Ads integrado via Conversions API: o mesmo evento sai pelo navegador e pelo servidor, com e-mail e telefone hasheados.",
			},
			{
				type: "paragraph",
				content: [
					"O efeito downstream é onde o dinheiro aparece, e ele não é intuitivo de primeira. Smart Bidding, Advantage+ e todos os sistemas de otimização automática são, no fundo, máquinas de aprender com exemplos. Quando você esconde 30% dos exemplos positivos, a máquina aprende errado: conclui que certos públicos não convertem, que certos criativos não funcionam, e remaneja orçamento para o que consegue enxergar, não para o que performa. Devolva o sinal completo e a mesma máquina, com o mesmo orçamento, passa a otimizar em cima da realidade. O resultado típico é CPA caindo e ROAS subindo sem você ter trocado um único criativo, porque a campanha finalmente está sendo julgada pelo que ela realmente gera. É por isso que eu digo que tracking server-side não é ferramenta de medição; é ferramenta de performance. A medição é o meio; a performance é o fim.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Um cuidado que separa implementação boa de relatório bonito: janelas de atribuição e carimbo de tempo. A conversão precisa chegar à plataforma dentro da janela em que ela ainda pode ser creditada ao clique, e com o horário correto do evento, não o horário em que o seu servidor processou a fila. Parece preciosismo, mas uma venda atribuída ao dia errado distorce a leitura de performance por dia de semana, e conversão que chega tarde demais simplesmente não entra na conta do Smart Bidding. Setup sério de tracking server-side trata relógio, fuso e ordem dos eventos com o mesmo respeito que trata o payload.",
				],
			},
			{
				type: "quote",
				text: "O algoritmo não otimiza para o que vende. Ele otimiza para o que ele consegue ver vendendo. Tracking é decidir o que o algoritmo enxerga.",
			},
			{ type: "heading", level: 2, text: "A anatomia de um clique rastreado" },
			{
				type: "paragraph",
				content: [
					"Para entender por que tracking para afiliados dá tanto trabalho, ajuda dissecar um único clique do nascimento à comissão. Tudo começa na impressão: o usuário vê seu anúncio no Google, no Instagram, numa rede nativa como Taboola ou NewsBreak, e clica. Nesse instante, a plataforma de anúncio gruda na URL o identificador dela: gclid no Google, fbclid no Meta. Esses códigos são a identidade do clique dentro do leilão; sem eles, a conversão futura não tem como provar parentesco.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Por cima disso entra a sua camada de rastreamento, os parâmetros que você mesmo define. Os clássicos da UTMs continuam fazendo o trabalho de sempre: utm_medium dizendo qual a rede ou o modelo de mídia, utm_campaign nomeando a campanha, utm_content identificando o criativo ou a variação, utm_term carregando a palavra-chave ou o público. E aí entram os parâmetros que todo rastreador de afiliado sério usa, como src e sck, que amarram o clique à sua estrutura interna de funis, páginas e ofertas. Enquanto o gclid fala com o Google, o src e o sck falam com você: são eles que respondem, meses depois, qual combinação exata de campanha, criativo e página gerou aquela comissão específica.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O ponto crítico é a travessia. Esses parâmetros precisam sobreviver a cada salto da jornada: anúncio para a sua página, sua página para a página de oferta, oferta para o checkout, checkout para a confirmação. É uma corrida de revezamento em que o bastão é a URL. No modelo client-side, cada salto é uma chance de derrubar o bastão, e o checkout de plataforma de afiliação é o trecho mais traiçoeiro. No modelo server-side, o bastão fica guardado no seu servidor desde o primeiro salto: o clique chegou, os parâmetros foram registrados, e a partir daí a conversão será resgatada pelo vínculo servidor a servidor, não pela sobrevivência heroica de um cookie. Quando a plataforma de afiliação confirma a venda, o evento volta carregando o src, o sck, as UTMs e o click ID originais. O afiliado vê a comissão; o Google e o Meta veem a conversão; você vê a verdade inteira num painel só.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/integracao-taboola.webp",
				alt: "Integração de tracking server-side do Ratoeira Hub com Taboola, rastreando parâmetros de clique de redes nativas até a conversão",
				caption:
					"Redes nativas como Taboola e NewsBreak entram na mesma anatomia: parâmetros no clique, vínculo no servidor, conversão atribuída.",
			},
			{
				type: "paragraph",
				content: [
					"Um detalhe operacional que separa amador de profissional: disciplina de nomenclatura. Parâmetro rastreado com nome inconsistente é pior que parâmetro ausente, porque gera relatório que parece informação e é ruído. Campanha que hoje se chama uma coisa e amanhã outra, criativo marcado no utm_content em metade dos anúncios: cada descuido desses vira uma linha inclassificável no relatório e uma decisão de otimização tomada no escuro. A anatomia do clique só funciona inteira quando a taxonomia é tratada com o mesmo rigor que o orçamento.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E tem a questão dos múltiplos toques, que afiliado costuma ignorar até escalar. A mesma pessoa pode clicar no seu anúncio do Google na terça, ver um criativo no Meta na quinta e comprar pelo link que salvou no sábado. Qual clique merece a conversão? Sem um registro central no seu servidor, cada plataforma puxa a venda para si e você soma três conversões para uma comissão só. Com o clique registrado no servidor desde o primeiro salto, a jornada vira uma linha única e legível: você escolhe o modelo de atribuição em vez de aceitar o que cada gerenciador inventa sozinho.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Antifraude: o clique que você paga e nunca deveria ter existido" },
			{
				type: "paragraph",
				content: [
					"Até aqui falei das conversões que você fez e não vê. Tem o problema espelhado, igualmente caro: os cliques que você paga e nunca deveriam ter existido. Tráfego pago atrai parasitas por natureza. Concorrente clicando no seu anúncio para queimar sua verba, bot varrendo rede de display, tráfego inválido de fonte duvidosa, fazenda de cliques inflando métrica: tudo isso consome orçamento real e gera zero chance de venda. E o pior é que polui o dado duas vezes, porque esses cliques falsos também entram na conta do algoritmo como sinal de baixa qualidade.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A resposta que o Ratoeira Hub dá a isso é direta: bloqueio automático de IP, exclusivo para Google Ads. A lógica é simples de explicar e poderosa na prática. Você define um limite de cliques por IP. A partir dali, o sistema vigia: se o mesmo endereço estoura o limite, o padrão é de abuso, não de interesse, e aquele IP é bloqueado antes de continuar consumindo seu orçamento. O concorrente que clicava dez vezes por dia no seu anúncio descobre que o anúncio sumiu para ele. O bot que martelava sua campanha encontra parede. O tráfego inválido deixa de ser um vazamento silencioso e vira um endereço bloqueado numa lista.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/integracao-google-ads.webp",
				alt: "Integração do Ratoeira Hub com Google Ads, com bloqueio automático de IPs fraudulentos por limite de cliques definido pelo anunciante",
				caption:
					"No Google Ads, o bloqueio automático de IP corta concorrentes, bots e tráfego inválido antes que consumam o orçamento.",
			},
			{
				type: "paragraph",
				content: [
					"Eu costumo apresentar o antifraude como o recurso que paga a ferramenta. A conta é honesta: se uma fração do seu orçamento diário evapora em cliques que nunca poderiam converter, bloquear essa fração devolve dinheiro todo dia, sem depender de otimização nenhuma. Tracking server-side melhora o algoritmo ao longo de semanas; antifraude devolve orçamento na mesma tarde. Para afiliado rodando nichos competitivos, onde a sabotagem de concorrente é rotina e não hipótese, essa proteção deixa de ser luxo e vira higiene, como trocar a senha do gerenciador.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E há um ganho escondido que quase ninguém menciona: dado limpo melhora tudo o que vem depois. Quando bot e clique fraudulento saem do funil, as taxas de conversão que você analisa passam a descrever humanos de verdade. O teste A/B de página fica confiável, a leitura de criativo fica confiável, o relatório de dispositivo e localização fica confiável. Fraude não rouba só dinheiro; rouba certeza. Bloqueá-la devolve as duas coisas.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Os sinais de fraude são mais fáceis de ler do que parece, quando você tem o clique registrado: rajadas de cliques do mesmo IP ou da mesma faixa de rede em minutos, horários que não combinam com o público do nicho, dispositivos e versões de navegador estranhamente repetidos, regiões geográficas fora da segmentação que mesmo assim geram clique. Cada um desses padrões é invisível no gerenciador de anúncios, que mostra agregados, e evidente num rastreador que guarda o clique individual. É a mesma infraestrutura do tracking server-side trabalhando duas vezes: uma para recuperar conversões, outra para defender o orçamento.",
				],
			},
			{ type: "heading", level: 2, text: "A arquitetura do Ratoeira Hub na prática" },
			{
				type: "paragraph",
				content: [
					"Tudo o que descrevi até aqui poderia ser montado em cima de uma prateleira de ferramentas separadas: um rastreador, um serviço de Conversions API, um antifraude, um construtor de páginas, um painel de relatórios. A decisão de produto do Ratoeira Hub, e o desafio de design que me coube, foi juntar isso num ecossistema só: tracking server-side, antifraude e landing pages integradas desde o primeiro clique. A tese é que cada fronteira entre ferramentas é um lugar onde o dado morre, então a arquitetura certa é a que não tem fronteiras no meio do funil.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A peça mais interessante dessa tese é o Ratoeira Pages, o construtor de páginas do ecossistema. As chamadas Flash Pages carregam em menos de um segundo, o que em tráfego pago não é capricho: cada fração de segundo de carregamento é uma fatia de cliques pagos que abandona antes de ver a oferta. O construtor vem com templates e com IA para acelerar a produção, mas a decisão de arquitetura que importa para este artigo é outra: a página nasce com o tracking integrado. Não é uma página bonita onde você instala um rastreador depois; é uma página que já nasce sabendo registrar clique, parâmetro e evento do jeito que o servidor espera. O primeiro clique já entra rastreado, com src, sck e UTMs no lugar certo, sem gambiarra.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/icone-ratoeira-pages.webp",
				alt: "Ícone do Ratoeira Pages, o construtor de landing pages Flash do Ratoeira Hub, com carregamento abaixo de um segundo e tracking integrado",
				caption:
					"Ratoeira Pages: landing pages com menos de 1 segundo de carregamento e tracking integrado desde o primeiro clique.",
			},
			{
				type: "paragraph",
				content: [
					"Do lado do design, a pergunta que guiou o dashboard foi: o que um afiliado precisa saber nos primeiros dez segundos de olhar a tela? A resposta virou a estrutura do painel: páginas, visitantes, dispositivos e eventos. Páginas, porque a operação vive de saber qual página segura clique e qual sangra. Visitantes, porque volume e qualidade de tráfego são a matéria-prima. Dispositivos, porque a diferença entre mobile e desktop muda lance, criativo e expectativa de conversão. E eventos, porque é ali que o rastreamento prova seu valor: cada evento registrado é uma peça da jornada que o pixel teria perdido. A meta era um painel que respondesse “estou vendo tudo?” num relance, e a métrica de sucesso do ecossistema hoje é essa: praticamente 100% das conversões rastreadas, contra os 25–40% de perda do modelo antigo.",
				],
			},
			{
				type: "image",
				src: "/blog/tracking-server-side-afiliados/dashboard-tracking-conversoes.webp",
				alt: "Dashboard do Ratoeira Hub exibindo métricas de páginas, visitantes, dispositivos e eventos de conversão rastreados server-side",
				caption:
					"O dashboard que projetei: páginas, visitantes, dispositivos e eventos respondendo “estou vendo tudo?” em dez segundos.",
			},
			{
				type: "paragraph",
				content: [
					"Os números do ecossistema dão a escala da coisa: mais de 2.600 anunciantes usando a plataforma e mais de US$ 81 milhões rastreados. Projetar produto para esse público me ensinou uma coisa que carrego para todo projeto: usuário de tráfego pago não quer dashboard bonito, quer resposta rápida com número confiável. Toda decisão de interface, da densidade da tabela ao destaque do evento de conversão, foi tomada a favor da velocidade de leitura. Se quiser ver como isso se materializou, o ",
					{ text: "case completo do Ratoeira Hub", href: "/projetos/ratoeira-hub/" },
					" está no meu portfólio, com as telas e as decisões de experiência por trás delas.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Uma decisão de design desse projeto que vale contar: resistimos à tentação de transformar o dashboard numa cabine de avião com quarenta gráficos. A tentação era real, porque dado é o que não falta numa plataforma de tracking. Mas cada métrica a mais na tela inicial é atenção roubada da pergunta que importa, e usuário de tráfego pago trabalha com uma mão no orçamento e outra no gerenciador de anúncios. O que sobrou na superfície foi o essencial com camadas: o resumo imediato em cima, o detalhe a um clique de distância, e nenhum número sem contexto de comparação. Produto de dados bom não é o que mostra mais; é o que deixa a próxima decisão óbvia.",
				],
			},
			{ type: "heading", level: 2, text: "Checklist: sinais de que sua operação está perdendo conversões" },
			{
				type: "paragraph",
				content: [
					"Nem toda operação precisa de um auditor para descobrir que está sangrando dado. Estes sinais aparecem no dia a dia de qualquer gerenciador, e cada um deles aponta para o mesmo diagnóstico: o pixel está contando uma história menor que a real. Se você marcar três ou mais, suas conversões perdidas não são hipótese; são linha do orçamento.",
				],
			},
			{
				type: "list",
				items: [
					"As vendas na plataforma de afiliação são consistentemente maiores que as conversões no Google Ads e no Meta Ads, e a diferença passa de 15%.",
					"Campanhas que convertiam bem pioram “do nada”, sem mudança de criativo, página ou público — sintoma clássico de algoritmo otimizando com dado mutilado.",
					"Boa parte do seu tráfego é iOS e suas conversões reportadas no Meta despencaram nos últimos anos sem explicação de mercado.",
					"Você não consegue dizer, hoje, qual criativo gerou uma comissão específica que caiu na semana passada.",
					"Seu funil depende de checkout externo (Hotmart, Kiwify, Eduzz) e você nunca verificou se os parâmetros do clique sobrevivem até lá.",
					"O CPA calculado no gerenciador não fecha com o CPA real calculado no caixa, e a divergência cresce conforme a operação escala.",
					"Picos de cliques sem nenhuma venda, em horários ou regiões estranhos, sugerindo bot ou sabotagem de concorrente sem bloqueio de IP.",
					"Você toma decisão de pausar ou escalar campanha olhando só o que o gerenciador mostra, sem cruzar com a plataforma de afiliação.",
				],
			},
			{ type: "heading", level: 2, text: "Erros comuns ao implementar tracking por conta própria" },
			{
				type: "paragraph",
				content: [
					"Depois de meses vendo anunciantes migrarem para o Ratoeira Hub vindos de setups caseiros, aprendi que os erros se repetem com uma regularidade impressionante. Quase ninguém erra por incompetência; erra porque tracking server-side tem uma cara enganosamente simples. “É só mandar um evento para a API” é a frase que antecede três semanas de dor de cabeça. Estes são os erros que eu mais vi:",
				],
			},
			{
				type: "list",
				items: [
					"Enviar o evento pelo servidor e manter o pixel sem deduplicação. Resultado: cada venda vira duas conversões, o gerenciador comemora números fantasiosos e o Smart Bidding aprende com dado inflado. O identificador único de evento não é detalhe; é o que separa redundância de duplicidade.",
					"Enviar conversão sem dado enriquecido. Evento server-side pelado, sem e-mail e telefone hasheados, casa menos vendas com cliques e joga fora metade do benefício. A taxa de correspondência é onde a recuperação de conversões acontece.",
					"Perder os parâmetros no primeiro redirect. O clique chega com gclid, src, sck e UTMs; um redirect mal configurado no meio do funil apaga tudo, e o servidor fica sem o vínculo que justificava sua existência.",
					"Testar com conversão real e poluir a conta. Setup de tracking se testa com evento de teste, janela de depuração e ambiente separado, não com venda de verdade que depois precisa ser caçada e corrigida.",
					"Esquecer a janela de atribuição e o fuso. Conversão enviada tarde demais ou com carimbo de hora errado cai fora da janela ou embaralha o relatório. Relógio de servidor não é preciosismo.",
					"Tratar tracking como projeto com fim. Plataforma muda API, navegador muda regra, checkout muda fluxo. Setup caseiro sem dono morre em meses, e morre em silêncio: a operação só descobre quando o número não fecha.",
					"Medir tudo e não agir em nada. Painel bonito com trinta métricas e nenhuma rotina de decisão é museu de dado. Tracking bom é o que termina numa ação de otimização por semana.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O fio condutor desses erros é sempre o mesmo: tracking parece um problema de instalação e é um problema de operação. Instalar é o dia um; manter o vínculo entre clique e venda vivo, limpo e deduplicado, todo dia, em quatro plataformas de anúncio e três de checkout, é o resto da vida. É exatamente por isso que o mercado de afiliados migrou de scripts caseiros para plataformas dedicadas: o custo da ferramenta é menor que o custo de descobrir, três meses depois, que o setup caseiro estava contando metade das vendas.",
				],
			},
			{ type: "heading", level: 2, text: "O que eu faria em uma operação de afiliado hoje" },
			{
				type: "paragraph",
				content: [
					"Se eu montasse uma operação de afiliado do zero hoje, a sequência seria clara e eu não negociaria a ordem. Primeiro: tracking server-side com envio duplo desde o dia um, antes do primeiro real investido. Não depois que a operação “provar que funciona”, porque é justamente na fase de prova que o algoritmo está aprendendo, e eu quero que ele aprenda com a realidade completa. Cada dia rodando só com pixel é um dia treinando a máquina com dados mutilados, e desfazer aprendizado errado custa mais caro que nunca tê-lo feito.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Segundo: eu trataria a taxonomia de parâmetros como parte da campanha, não como burocracia posterior. Antes de subir qualquer anúncio, definiria a convenção de utm_medium, utm_campaign, utm_content, utm_term, src e sck, e nenhum anúncio subiria fora dela. Afiliado que escala sem taxonomia vira refém do próprio sucesso: com dez campanhas dá para lembrar de cabeça; com cem, o improviso vira relatório ilegível e decisão no escuro.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Terceiro: antifraude ligado antes de escalar. No Google Ads, configuraria o limite de cliques por IP no primeiro dia de verba séria. Eu vi nichos em que a sabotagem de concorrente era tão rotineira que os anunciantes tratavam clique fraudulento como custo fixo, como quem aceita chuva. Não é. É vazamento com endereço conhecido, e endereço conhecido se bloqueia. E quarto: usaria landing page com tracking integrado em vez de página genérica com script pendurado, porque cada emenda entre ferramentas é um ponto onde o dado morre sem avisar. Foi essa filosofia que guiei no produto, e é a que eu aplicaria na minha própria operação: o funil mais curto entre o clique e o registro vence.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tem um quinto ponto, mais de postura que de configuração: eu mediria a saúde do tracking como se mede a saúde das campanhas. Uma vez por semana, cruzar vendas da plataforma com conversões do gerenciador. Se a diferença começar a abrir, algo quebrou, e quanto antes eu souber, menos o algoritmo aprende errado. Tracking não é infraestrutura invisível que roda sozinha; é um instrumento de bordo, e instrumento de bordo se consulta.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E eu não tentaria construir nada disso na unha. Já projetei produto nesse mercado e sei o tamanho do problema: cada plataforma de anúncio tem sua API, seus formatos de evento, suas regras de deduplicação e seu ritmo de mudança; cada plataforma de afiliação tem seu jeito de notificar venda; cada checkout tem seus redirects. Manter essa malha viva, sozinho, enquanto se opera campanha, página e criativo, é ter dois empregos. A pergunta certa não é “consigo fazer?”, porque provavelmente você consegue; é “quero que esse seja o meu segundo emprego pelos próximos anos?”. A minha resposta, depois de ver o que acontece por dentro de uma plataforma dedicada, é não.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Conclusão: o pixel mostra uma operação menor que a sua" },
			{
				type: "paragraph",
				content: [
					"A história inteira cabe numa frase: entre 25% e 40% das suas conversões acontecem num lugar que o pixel não alcança, e tudo o que depende dessa visão, do lance automático ao público de remarketing, herda a cegueira. Tracking server-side com envio duplo e dado enriquecido não é sofisticação de operação grande; é o piso mínimo de quem quer que o Google e o Meta enxerguem a operação que realmente existe. A pergunta deixou de ser “vale a pena rastrear direito?” e virou “quanto custa continuar rastreando errado?”.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Se eu pudesse deixar uma ordem de prioridade para quem chegou até aqui, seria esta: primeiro meça o buraco, cruzando plataforma de afiliação com gerenciador; depois tape o buraco com envio duplo e dado enriquecido; em seguida defenda o orçamento com antifraude; e só então otimize criativo e página, agora sobre dados que descrevem a realidade. A maioria das operações faz exatamente o contrário, otimizando criativo em cima de um terço do sinal e tratando tracking como assunto técnico para depois. Depois, nesse mercado, costuma ser tarde: quem enxerga mais compra mídia melhor, e quem compra mídia melhor leva o leilão.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Se você quer ver como essa arquitetura vira produto de verdade, o caminho é o ",
					{ text: "case do Ratoeira Hub", href: "/projetos/ratoeira-hub/" },
					" aqui no portfólio: o dashboard de páginas, visitantes, dispositivos e eventos, as Flash Pages, o antifraude com bloqueio de IP e as decisões de design por trás de tudo. E se a sua operação está perdendo conversões para o pixel hoje, conheça o ",
					{ text: "Ratoeira Hub", href: "https://ratoeiraadsoficial.com.br" },
					" em funcionamento: tracking, antifraude e páginas integrados desde o primeiro clique, com praticamente 100% das conversões rastreadas. Para conversar sobre design de produto para dados e performance, me acha pela ",
					{ text: "página inicial", href: "/" },
					". Operação que enxerga as próprias vendas sempre vence a que adivinha.",
				],
			},
		],
	},
	{
		slug: "sacred-modernism-design-system",
		title: "Sacred Modernism: como traduzi tradição ancestral em um design system",
		excerpt:
			"Como projetar um design system para um terreiro de umbanda sem cair no clichê nem no frio corporativo: o Sacred Modernism do Orixá Design System — 77 tokens de cor derivados em OKLCH, 20 roles semânticos, tipografia Cormorant Garamond + Inter, Dark Glassmorphism com Efeito Vela, governança por status e acessibilidade AAA.",
		date: "2026-08-13",
		tags: ["Design System", "Identidade Visual", "UX/UI", "Tokens"],
		coverImage: "/blog/sacred-modernism-design-system/documentacao-viva-orixa.png",
		coverImageAlt:
			"Topo da documentação viva do Orixá Design System, com o conceito Sacred Modernism, selo v0.2 e os números do sistema",
		ogDescription:
			"Sacred Modernism na prática: como traduzir tradição ancestral em design tokens — 77 tokens de cor em OKLCH, 20 roles semânticos, Cormorant Garamond + Inter, Dark Glassmorphism com Efeito Vela e uma documentação viva que não finge estar pronta.",
		blocks: [
			{
				type: "paragraph",
				content: [
					"Todo designer conhece o brief que cabe numa página: público-alvo, tom de voz, concorrentes, entregáveis. E todo designer já recebeu aquele outro tipo de brief, o que não cabe em página nenhuma. O meu chegou mais ou menos assim: precisamos de um site para a T. U. Senhora do Rosário, um terreiro de umbanda. Tem que ser bonito, tem que ser sério, tem que parecer a gente. Parecer a gente, nesse contexto, carrega séculos. Carrega uma religião brasileira, genuinamente nossa, que foi perseguida, estigmatizada e representada de forma torta pela cultura dominante durante a maior parte da sua história. Carrega comunidade, acolhimento, ancestralidade. Como é que isso vira paleta de cor?",
				],
			},
			{
				type: "paragraph",
				content: [
					"Eu sabia o que não fazer. Não fazer o site institucional cinza-azulado que qualquer gerador de template entrega em dez minutos, porque ele apagaria exatamente o que precisava ser comunicado. E não fazer a caricatura oposta: textura de palha, dourado em tudo, símbolo religioso decorando canto de tela, aquele visual de folder turístico que reduz uma tradição viva a cenografia. Entre a frieza corporativa e o kitsch tem um território estreito, e era ali que o design precisava morar. O problema é que território estreito não se navega no feeling; se navega com sistema.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tem uma assimetria nesse tipo de projeto que só percebi trabalhando nele: o mercado de design digital sabe muito bem como fazer site para fintech, para SaaS, para e-commerce, porque existem milhares de referências, de templates, de estudos de caso. Para um terreiro de umbanda, não existe referência nenhuma, ou melhor, as referências que existem são majoritariamente ruins, feitas sem orçamento, sem cuidado e frequentemente sem consultar a comunidade. O vazio de referência é ao mesmo tempo a dificuldade e a oportunidade: dificuldade porque não havia trilha batida, oportunidade porque qualquer trabalho sério ali já eleva o padrão do que existe. Eu decidi tratar o projeto com o mesmo rigor que trataria um produto de tecnologia, porque é isso que a comunidade merece, e rigor, no meu ofício, significa design system.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Foi assim que nasceu o Orixá Design System, o sistema de design que estou construindo para o site do terreiro, e o conceito estético que o governa, batizado de Sacred Modernism. Este artigo não é um tutorial de design tokens — para isso eu já escrevi o ",
					{ text: "guia de como estruturei um design system do zero", href: "/blog/design-system-do-zero/" },
					", que segue valendo como leitura complementar. Este aqui é sobre outra coisa, mais rara de se ver discutida: como identidade, cultura e espiritualidade viram decisões concretas de token. Como “acolhimento ancestral” virou um hex específico, por que a documentação declara publicamente o que ainda não está decidido, e o que esse projeto me ensinou sobre desenhar com significado.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Antes de entrar no sistema, um aviso de método: este não é um artigo sobre umbanda, tema que pertence à comunidade e não a mim. É um artigo sobre design, sobre o que acontece com o nosso ofício quando o cliente não é uma empresa e o produto não é um produto, mas a casa digital de uma comunidade de fé. As escolhas técnicas que vou descrever são as mesmas de qualquer design system sério. O que muda é o peso de cada uma delas, e é desse peso que eu quero falar.",
				],
			},
			{
				type: "image",
				src: "/blog/sacred-modernism-design-system/documentacao-viva-orixa.png",
				alt: "Cabeçalho da página de documentação viva do Orixá Design System, apresentando o conceito Sacred Modernism, o selo v0.2 e os números do sistema",
				caption:
					"A Documentação Viva (v0.2) do Orixá Design System, renderizada com os próprios tokens do projeto.",
			},
			{ type: "heading", level: 2, text: "O que é Sacred Modernism" },
			{
				type: "paragraph",
				content: [
					"Sacred Modernism é o nome que dei para a união de dois mundos que normalmente não se conversam em design digital: de um lado, materiais rústicos e o acolhimento ancestral; do outro, o minimalismo contemporâneo. Não é uma mistura dos dois, é uma tensão controlada entre eles. O rústico traz terra, fibra, papel, calor; o moderno traz precisão, contraste, espaço em branco, tipografia limpa. Se o rústico domina, vira artesanato desorganizado. Se o moderno domina, vira clínica. O sistema inteiro existe para segurar essa tensão no ponto certo, tela após tela, sem depender do meu bom gosto no dia.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Na documentação, o conceito se apoia em dois pilares explícitos, e eu aprendi com o Aero que pilar de sistema tem que virar decisão concreta ou vira frase de parede. Aqui, cada pilar é um conjunto de tokens.",
				],
			},
			{ type: "heading", level: 3, text: "Pilar um: o contraste tipográfico" },
			{
				type: "paragraph",
				content: [
					"O primeiro pilar é a tipografia de exibição serifada em alto contraste com uma geométrica de leitura. Os títulos falam em Cormorant Garamond, uma serifada de eixo humanista, traço fino e elegância antiga, o tipo de letra que parece impressa em papel bom. O corpo, os botões e a interface falam em Inter, geométrica, neutra, desenhada para tela. As duas famílias estão marcadas como APROVADAS no sistema, e a regra é rígida: Cormorant nunca desce para texto funcional, Inter nunca sobe para título de exibição. O sagrado e o utilitário têm vozes diferentes, e confundir as vozes é o primeiro passo para o kitsch. No total, a tipografia fecha em 4 pesos, 11 tamanhos de 12px a 80px, line-heights e letter-spacings próprios, e 7 composições tipográficas prontas, do Display de 80px em heading regular até o small semibold, cada uma com papel definido.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Escolher a serifada foi a decisão mais longa do sistema inteiro. Uma serifada errada estraga tudo de duas maneiras opostas: se pende para o acadêmico, vira tese de doutorado; se pende para o ornamental, vira convite de casamento. A Cormorant Garamond ficou porque equilibra dignidade e silêncio: ela tem presença sem cerimônia, parece antiga sem parecer fantasiada de antiga. E a dupla com a Inter resolve o problema que toda identidade com alma enfrenta na web: como ter voz própria sem sacrificar a leitura funcional. Cada família faz o trabalho para o qual nasceu, e o contraste entre as duas, em vez de competição, é o próprio pilar do conceito.",
				],
			},
			{ type: "heading", level: 3, text: "Pilar dois: Dark Glassmorphism e o Efeito Vela" },
			{
				type: "paragraph",
				content: [
					"O segundo pilar é o que eu chamo de Dark Glassmorphism: painéis escuros translúcidos com bordas ultra finas que se iluminam ao passar do mouse, um efeito batizado no sistema de Efeito Vela. A referência é literal e afetiva: uma vela acesa num ambiente escuro não ilumina o ambiente inteiro, ilumina o que está perto dela, com uma borda de luz quente. O mouse do visitante é a vela; onde ele passa, o painel responde com um brilho discreto. É um tom intimista de solenidade espiritual, e funciona porque é interação, não decoração: o visitante descobre o efeito usando o site, do mesmo jeito que se descobre um espaço sagrado caminhando por ele.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Glassmorphism, diga-se de passagem, é um recurso com má reputação merecida: na maioria dos sites é um blur decorativo que sacrifica legibilidade e performance para fingir sofisticação. A versão escura do Orixá se defende disso de três formas. Primeiro, a translucidez é contida: os painéis são escuros o bastante para que o texto pertença sempre a um par aprovado na matriz de contraste. Segundo, o efeito tem papel narrativo, não ornamental: ele existe para simular a vela, e se essa história não fizesse sentido, o efeito não existiria. Terceiro, a borda iluminada responde ao mouse e ao foco de teclado, então o gesto visual também serve de affordance. Efeito que conta uma história, passa na acessibilidade e ajuda a navegação deixou de ser efeito; virou componente.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Tecnicamente, o Efeito Vela nasce dos tokens: os painéis usam as superfícies escuras derivadas da família Warm Neutral, as bordas finas puxam os tons de Ancestral Gold em opacidade baixa, e o movimento obedece à escala de duração do sistema. Nada ali é estilo solto. Quando um efeito desses é feito fora do sistema, ele vira truque visual aplicado numa tela e esquecido nas outras; dentro do sistema, ele vira linguagem. Sacred Modernism, no fim, é isso: duas decisões de contraste, tipográfica e atmosférica, repetidas com disciplina até virarem identidade.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Vale contar de onde veio o nome, porque nomear o conceito foi uma decisão de projeto, não um capricho. Enquanto o conceito não tinha nome, cada conversa sobre direção visual descambava para gosto pessoal: eu gosto, eu não gosto, será que não é escuro demais, será que não é simples demais. No dia em que Sacred Modernism passou a existir como termo, as conversas mudaram de objeto: a pergunta deixou de ser “você gosta?” e virou “isso está servindo ao conceito?”. O nome funciona como um princípio de design portátil, que qualquer pessoa envolvida no projeto consegue carregar na cabeça e aplicar a uma tela nova sem me consultar. Conceito sem nome é opinião; conceito nomeado é ferramenta de alinhamento.",
				],
			},
			{ type: "heading", level: 2, text: "Tradução, não decoração" },
			{
				type: "paragraph",
				content: [
					"A pergunta que eu me fiz no início do projeto foi a pergunta errada: “quais cores combinam com umbanda?”. Pergunta errada porque trata cultura como paleta de inspiração, e paleta de inspiração é como nasce a caricatura. A pergunta certa era outra: quais materiais, luzes e atmosferas constituem a experiência real daquele espaço e daquela tradição, e como eles se traduzem em fundamentos de cor que sustentam uma interface? Tradução preserva estrutura e sentido; decoração copia superfície. Eu queria tradução.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O resultado são as quatro famílias de fundação aprovadas do sistema, cada uma ancorada numa referência concreta. A Terracotta, com âncora no grade 600, #8B3A2A, é a família principal da marca: terra queimada, barro, o chão do terreiro, o calor do tijolo. É ela que carrega os CTAs primários, os estados ativos e o papel de PRIMARY·BRAND do sistema. A Ancestral Gold, âncora 500, #C9A227, é o dourado ancestral: o metal dos objetos rituais, o brilho da vela, usado como ACCENT·HIGHLIGHT para realces, ícones rituais e gradientes, sempre com parcimônia, porque brilho que está em todo lugar não ilumina nada. A Parchment, âncora 050, #FAF5EC, é o papel envelhecido, a superfície clara onde o conteúdo descansa, fundo de páginas e cards no papel de SURFACE·LIGHT. E a Warm Neutral, âncora 900, #2A2318, é a tinta: o marrom quase preto do texto, das divisórias, das molduras e do próprio glassmorphism escuro, no papel NEUTRAL·INK.",
				],
			},
			{
				type: "image",
				src: "/blog/sacred-modernism-design-system/familias-de-cor-foundation.png",
				alt: "Escalas de cor das famílias Terracotta e Ancestral Gold do Orixá Design System, cada uma com 11 grades do 050 ao 950 e a âncora marcada",
				caption:
					"Terracotta e Ancestral Gold: as famílias de marca, cada uma com 11 grades derivados matematicamente em OKLCH a partir da âncora.",
			},
			{
				type: "paragraph",
				content: [
					"Repare que nenhuma dessas cores foi escolhida “porque é bonita”. Cada uma responde a uma pergunta de identidade: de que material é feita a memória desse lugar? E repare também o que a tradução ganhou ao virar sistema: a Terracotta não é um hex solto, é uma escala de 11 grades, do 050 ao 950, derivada matematicamente em OKLCH a partir da âncora, o que me dá terracota para fundo sutil, para hover, para texto sobre claro, para borda ativa, tudo harmonicamente parente. A cultura virou fundação, e a fundação virou ferramenta de trabalho. Esse é o caminho inteiro: sentido primeiro, matemática depois, e a matemática a serviço do sentido.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Junto das quatro aprovadas vivem três famílias funcionais ainda marcadas como PROVISÓRIAS: Ember, âncora 600 #A33A2B, para erro e perigo; Sun, âncora 500 #C58A16, para aviso; e River, âncora 600 #2F6473, para informação. Elas fazem o trabalho de estado que toda interface precisa, mas ainda estão em validação de design, e o sistema diz isso abertamente, o que me leva à seção de governança mais adiante.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O processo de derivação merece um parágrafo, porque é nele que a tradução vira engenharia. Cada família tem uma âncora, o grade que concentra a referência cultural, e os outros dez grades são calculados em OKLCH a partir dela, mantendo o matiz e ajustando luminosidade e croma de forma perceptualmente uniforme. Isso resolve dois problemas de uma vez. O primeiro é estético: os tons claros e escuros de cada família parecem parentes legítimos da âncora, não aproximações achadas no olho. O segundo é prático: quando a interface pede “um parchment um pouco mais escuro para o hover do card”, a resposta é um grade que já existe, já tem nome e já foi calculado, não um hex novo inventado na hora. A matemática não substitui a sensibilidade; ela conserva a sensibilidade que foi colocada na âncora e a espalha, sem distorção, pelos onze degraus.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E tem o cuidado com o que ficou de fora. Em nenhum momento o sistema usa símbolo religioso como ornamento, fotografia de gira como textura ou qualquer elemento da prática como recurso gráfico gratuito. A identidade entra pela estrutura, pela matéria, pela luz e pela atmosfera, nunca pelo repertório iconográfico. Essa foi uma decisão consciente e conversada: representar uma tradição não é colar seus símbolos numa interface, é construir um ambiente digital que esteja à altura dela. A diferença entre homenagem e apropriação decorativa está exatamente aí, e um design system, quando bem feito, torna essa diferença reproduzível por qualquer pessoa que mantenha o site no futuro.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "A arquitetura em três camadas" },
			{
				type: "paragraph",
				content: [
					"Com a identidade traduzida em famílias de cor, veio a decisão estrutural que considero a mais importante do sistema: a separação em três camadas, fundação, semântica e componente, com uma regra de trânsito rígida entre elas. É a mesma lição que aprendi no ",
					{ text: "Aero", href: "/projetos/aero/" },
					", levada a um nível de formalidade maior, porque aqui o sistema precisava ser auditável por outras pessoas no futuro, não só por mim. No Aero, a disciplina era pessoal: eu conhecia os nomes, eu mantinha o contrato. Aqui o contrato precisa sobreviver à minha ausência, então ele foi escrito para estranhos: cada camada com seu arquivo fonte, cada referência explícita, cada regra de consumo declarada onde qualquer desenvolvedor novo encontra.",
				],
			},
			{ type: "heading", level: 3, text: "Camada um: foundation" },
			{
				type: "paragraph",
				content: [
					"A camada de fundação são os 77 tokens de cor brutos: 7 famílias vezes 11 grades, do 050 ao 950, cada grade derivado matematicamente em OKLCH a partir da âncora da família, expostos como variáveis CSS --color-<família>-{grade} e versionados no arquivo design-system/foundation/color.json. OKLCH não é vaidade técnica: derivar grades em espaço perceptual significa que o salto do 400 para o 500 parece o mesmo salto em todas as famílias, o que mantém as sete escalas harmonicamente alinhadas entre si. A fundação não sabe para que serve. Ela é a matéria-prima, como tubos de tinta: terracota existe, dourado existe, e nenhum dos dois sabe se vai virar botão ou texto.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Um detalhe de processo que fez diferença: as âncoras não foram escolhidas num seletor de cor, foram escolhidas em contexto. Eu testava cada candidata nas superfícies reais do site, no painel escuro do glassmorphism, no papel claro do parchment, ao lado da Cormorant em tamanho de Display, porque cor de marca não existe em abstrato, existe sobre fundo, ao lado de texto, sob luz de tela. A Terracotta #8B3A2A passou por várias irmãs mais saturadas e mais terrosas até encontrar o ponto em que funcionava como botão primário, como foco ativo e como assinatura de marca sem gritar em nenhum dos três papéis. A âncora certa é a que aguenta todos os empregos que a família vai ter, e isso só se descobre empregando-a.",
				],
			},
			{ type: "heading", level: 3, text: "Camada dois: roles semânticos" },
			{
				type: "paragraph",
				content: [
					"A camada semântica é onde o significado acontece, e é a grande diferença deste sistema para o do Aero: aqui são 20 roles semânticos, versionados em design-system/semantic/color.light.json, e a regra é absoluta: componentes consomem apenas roles, nunca tokens de fundação diretamente. Um botão não conhece #8B3A2A; ele conhece action.primary.default. O role, por sua vez, referencia a fundação, algo como {color.base.parchment.050}. Os 20 roles se organizam em Background (canvas, subtle, inverse, brand), Surface, Text, Icon, Border (o focus usa ancestral-gold.600) e uma família generosa de Action, com 14 tokens cobrindo primary e secondary cruzados com default, hover, active e disabled. Tudo com variantes LIGHT e DARK.",
				],
			},
			{
				type: "image",
				src: "/blog/sacred-modernism-design-system/color-roles-semanticos.png",
				alt: "Seção de roles semânticos de cor do Orixá Design System: grupos Background, Surface, Text, Icon, Border e Action com seus tokens e referências às famílias de fundação",
				caption:
					"Os 20 roles semânticos: componentes só conhecem papéis; os papéis é que referenciam as famílias de fundação.",
			},
			{
				type: "paragraph",
				content: [
					"Por que tanta cerimônia? Porque é essa camada que torna a identidade revisável. Se um dia a comunidade decidir que a Terracotta deve ser um pouco mais profunda, eu ajusto a âncora, a matemática OKLCH redistribui os 11 grades, os roles continuam apontando para os mesmos lugares e a interface inteira muda coerentemente, sem eu tocar em um único componente. A identidade visual vira um dado que pode evoluir, não uma tatuagem espalhada por centenas de arquivos. Num projeto comunitário, que vai sobreviver a mim e à minha disponibilidade, essa revisabilidade não é elegância; é dever de casa.",
				],
			},
			{ type: "heading", level: 3, text: "Camada três: tokens de componente" },
			{
				type: "paragraph",
				content: [
					"A terceira camada desce ao detalhe do componente. O botão, por exemplo, declara button.radius apontando para {radius.200}, 8px, e border-width thin de 1px. O button.primary amarra seus estados: fundo #8B3A2A no default, #7F3627 no hover, #5E2317 no active, texto em parchment. O secondary é o dourado outlined, borda #C9A227. Quando cada estado de cada componente tem token nomeado, ninguém no futuro precisa adivinhar qual era o hover certo, e ninguém inventa um terceiro tom de terracota “só nessa tela”. As três camadas juntas formam um funil: a cultura entra em cima, vira fundação; a fundação vira papel; o papel vira pixel. E o pixel, chegando lá embaixo, ainda carrega a cultura do topo, porque cada camada só referencia a anterior.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A mesma lógica de camadas governa movimento e profundidade. A escala de duração tem seis passos com nomes de intenção: instant (0ms), fast (150ms), moderate (250ms), slow (500ms, aprovada para o fade do hero), deliberate (700ms, aprovada) e ambient (1200ms), todos na mesma curva cubic-bezier(0.2, 0, 0, 1). Nomear durações por intenção muda a conversa: ninguém mais pergunta “quantos milissegundos?”, pergunta-se “esse momento é rápido ou deliberado?”, e uma transição deliberada num site desses tem significado, é o ritmo de quem não tem pressa porque o que está ali merece permanência. As sombras seguem a mesma filosofia, cinco tokens do none ao high mais o shadow.focus dourado, comunicando profundidade sem depender de bordas, para que a borda ultra fina do glassmorphism continue sendo um gesto deliberado e não o padrão de tudo.",
				],
			},
			{ type: "heading", level: 2, text: "Status como governança: APROVADA e PROVISÓRIA" },
			{
				type: "paragraph",
				content: [
					"Design system adora fingir que está pronto. A página de documentação mostra a paleta fechada, os componentes polidos, e ninguém imagina que metade foi decidida na semana anterior e a outra metade está por decidir. Eu escolhi o caminho oposto no Orixá: cada token e cada família carrega um status explícito, APROVADA ou PROVISÓRIA, e o provisório significa exatamente o que diz, aguardando validação de design. As quatro famílias de identidade estão aprovadas. As três funcionais, Ember, Sun e River, estão provisórias. Na tipografia, as famílias estão aprovadas. Na motion, a escala inteira, de instant (0ms) a ambient (1200ms), passando por fast (150ms), moderate (250ms), slow (500ms) e deliberate (700ms), tudo em cubic-bezier(0.2, 0, 0, 1), tem status declarado item a item.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Isso não é excesso de zelo; é honestidade como parte do sistema. Um design system é, antes de tudo, um documento de decisões, e um documento de decisões que esconde as indecisões mente para quem o usa. O status provisório protege o futuro: ele diz à próxima pessoa que tocar no projeto “esta cor de erro funciona, mas ainda não recebeu o selo de validação, então trate-a como hipótese”. Num projeto comunitário, feito entre uma gira e outra, com validação dependendo de conversa com pessoas que têm prioridades mais importantes que revisar tokens, essa clareza é a diferença entre um sistema que envelhece e um que apodrece. Documentar o que não está decidido é tão trabalho de design quanto decidir.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Aprendi isso da forma mais barata possível, que é aprendendo com o erro dos outros: a maioria dos design systems que vejo abandonados não morreu por má qualidade técnica, morreu porque a documentação prometia um acabado que o sistema não tinha, e a primeira pessoa que confiou na promessa quebrou a cara. Quando o documento mente, cada usuário novo do sistema precisa redescobrir sozinho onde estão as armadilhas, e depois de dois ou três sustos ninguém mais confia no mapa. O status APROVADA/PROVISÓRIA é a vacina contra isso: ele preserva a coisa mais frágil que um sistema possui, que é a confiança de quem o usa de que a documentação diz a verdade.",
				],
			},
			{
				type: "quote",
				text: "Um design system não é um catálogo do que foi decidido. É um mapa honesto do que está decidido, do que está em validação e do que ainda precisa de conversa.",
			},
			{ type: "heading", level: 2, text: "Acessibilidade como respeito" },
			{
				type: "paragraph",
				content: [
					"Tem um aspecto deste projeto que eu trato como central e raramente vejo tratado assim: a comunidade de um terreiro não é o público médio dos Dribbbles da vida. É uma comunidade intergeracional, com pessoas mais velhas, com variados níveis de familiaridade digital, acessando o site para saber horário de gira, ler sobre a história da casa, encontrar a área do filho. Um site bonito que essa comunidade não consegue ler é um fracasso de design com boa apresentação. Acessibilidade, aqui, não é conformidade técnica; é a forma concreta que o respeito toma na interface.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Por isso o sistema tem uma Matriz de Contraste própria: os pares texto × fundo são validados contra a WCAG 2.1, com AA exigindo no mínimo 4.5:1 e AAA, 7:1, e somente pares aprovados em AA ou AAA vão para produção. O exemplo de cabeceira: text.primary sobre canvas fecha em 18.10:1, nível AAA, folga enorme. A matriz transforma acessibilidade de auditoria posterior em propriedade de construção: quem usa os roles aprovados herda contraste válido sem precisar saber que a WCAG existe.",
				],
			},
			{
				type: "paragraph",
				content: [
					"A matriz também resolveu um dilema estético que parecia sem saída. O Sacred Modernism pede atmosfera escura e intimista, e atmosfera escura é onde o contraste costuma morrer: texto cinza médio sobre fundo grafite, elegante no monitor calibrado do designer, ilegível no celular de tela gasta sob luz do dia. Com a matriz, o intimismo ganhou piso: os painéis podem ser tão escuros quanto o conceito pedir, desde que o texto sobre eles pertença a um par aprovado. O que seria uma negociação infinita entre “bonito” e “legível” virou regra de trânsito, e regra de trânsito todo mundo respeita sem ressentimento, porque vale para todos.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O mesmo cuidado aparece nos detalhes menores. O anel de foco do sistema é dourado: shadow.focus, um glow de 0 0 0 3px em #C9A22766, visível sobre qualquer superfície, escura ou clara. Quem navega por teclado, e muita gente mais velha navega, nunca se perde tentando adivinhar onde está o foco. As sombras, aliás, são um conjunto curto de 5 tokens, de none a high mais esse focus, e cumprem uma função do Sacred Modernism: comunicar profundidade sem depender de bordas, deixando as bordas ultra finas para o que é deliberado, como os painéis de vidro. Acessibilidade e estética não brigaram em nenhuma dessas decisões; saíram da mesma conversa.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E tem a tipografia, que nesse público é decisão de acessibilidade tanto quanto de estética. A Inter foi escolhida para o corpo exatamente porque aguenta tamanhos de leitura confortáveis com clareza em telas comuns, e a escala de 11 tamanhos permite que o texto corrido nunca desça abaixo do legível para economizar layout. A Cormorant Garamond, apesar da elegância de traço fino, aparece sempre em tamanhos grandes de exibição, onde o contraste de hastes não compromete a leitura, e nunca em texto funcional. As sete composições tipográficas prontas existem para que ninguém precise improvisar essa combinação tela a tela: quem monta uma página escolhe a composição pelo papel, e a dupla de famílias, os tamanhos, os pesos e os espaçamentos vêm junto, já testados.",
				],
			},
			{ type: "divider" },
			{ type: "heading", level: 2, text: "Documentação viva, versão 0.2" },
			{
				type: "paragraph",
				content: [
					"A ",
					{ text: "documentação do Orixá Design System", href: "https://nossasenhoradorosario.netlify.app/design-system" },
					" segue o mesmo princípio que apliquei no Aero: ela vive dentro do produto, é pública, e é renderizada com os próprios tokens --color-* que documenta. O selo no topo diz DOCUMENTAÇÃO VIVA · V0.2, e o v0.2 é sincero: não é a versão final, é a versão atual, e os números que ela mostra são os números reais do sistema hoje, 4 famílias aprovadas, 3 a 4 funcionais provisórias, 77 tokens de cor, 20 roles semânticos. Se um token muda no JSON, a página muda junto, porque ela é feita da matéria que descreve.",
				],
			},
			{
				type: "image",
				src: "/blog/sacred-modernism-design-system/tipografia-cormorant-inter.png",
				alt: "Seção de tipografia do Orixá Design System: Cormorant Garamond para títulos e Inter para texto e botões, com pesos, tamanhos e composições tipográficas",
				caption:
					"Tipografia no sistema: Cormorant Garamond na exibição, Inter na função, 11 tamanhos e 7 composições prontas.",
			},
			{
				type: "paragraph",
				content: [
					"O showcase de componentes é a parte que mais diverte quem visita: os botões aparecem em todos os estados, normal, hover, active, disabled e carregando, e cada variação vem com um botão de copiar snippet em React ou Tailwind. Isso muda o perfil de quem usa a documentação: não é mais só um catálogo para olhar, é uma bancada de trabalho para copiar e colar decisões prontas. Para um projeto que pode ser mantido por voluntários no futuro, reduzir a distância entre “ver como é” e “usar do jeito certo” é a melhor proteção contra a degradação do sistema.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Manter a documentação dentro do site tem ainda um efeito que eu não planejei: ela virou vitrine do cuidado. Qualquer visitante, designer ou não, consegue abrir a página e ver que por trás daquele site existe um sistema nomeado, versionado, com status e regras. Para uma comunidade que está construindo sua presença digital, isso comunica seriedade de uma forma que nenhum texto institucional comunica. A documentação deixou de ser bastidor e virou parte da fachada, e eu acho que deveria ser assim em muito mais projetos: o cuidado que não se mostra tende a não ser valorizado, e o que não é valorizado é a primeira coisa cortada quando aperta o tempo.",
				],
			},
			{
				type: "image",
				src: "/blog/sacred-modernism-design-system/showcase-estados-botoes.png",
				alt: "Showcase de botões do Orixá Design System com estados normal, hover, active, desabilitado e carregando, e opção de copiar snippet em React ou Tailwind",
				caption:
					"Botões no showcase: todos os estados visíveis, com snippet React/Tailwind pronto para copiar.",
			},
			{ type: "heading", level: 2, text: "O que esse projeto me ensinou sobre design systems" },
			{
				type: "paragraph",
				content: [
					"O Aero me ensinou a construir sistema para mim: critério, economia de decisão, velocidade. O Orixá me ensinou a construir sistema para o outro, e isso mudou minha cabeça em pelo menos três pontos. O primeiro: design system também é um ato de representação. Cada token do Orixá carrega a responsabilidade de representar uma comunidade real diante do mundo digital, uma comunidade que historicamente foi representada pelos outros, e mal. Isso elevou o padrão de exigência de cada escolha. Um hover meio sem graça num SaaS meu é detalhe; uma cor errada aqui é desrespeito.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Essa responsabilidade tem um lado prático que me pegou desprevenido: ela alonga a vida das decisões. Num produto meu, uma escolha ruim é minha, eu a corrijo na semana seguinte e ninguém fica sabendo. Aqui, cada decisão vai ser vista por pessoas para quem aquele espaço digital é a porta de entrada da sua fé, e potencialmente por pessoas que nunca pisaram num terreiro e vão formar sua primeira imagem ali. Saber disso não paralisou o processo, pelo contrário: deu critério. Quando duas opções pareciam equivalentes, a pergunta “qual delas representa melhor?” desempatava quase sempre. Representação não é um freio na velocidade; é um norte quando o gosto não decide.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O segundo: identidade forte exige mais sistema, não menos. A intuição diz que projeto com alma pede liberdade, que regra mata expressão. Minha experiência foi o contrário. Foi justamente porque a identidade era rica e delicada que ela precisou de 77 tokens, 20 roles e uma matriz de contraste: sem essa armadura, a identidade dependeria da memória e do gosto de quem tocasse no site em cada dia, e se degradaria em meses. O sistema não congela a identidade; ele a protege do tempo e das boas intenções.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O terceiro: a frase que está na escala tipográfica da documentação, “A Umbanda é brasileira e genuinamente nossa”, virou para mim um teste de qualidade. Quando travo numa decisão, pergunto se ela honra essa frase. Um template genérico não honra. Uma caricatura folclórica não honra. Um sistema cuidadoso, acessível, tecnicamente sério e esteticamente vivo, que trata o site de um terreiro com o mesmo rigor que o mercado reserva a fintechs, honra. Design, no limite, é sobre quem recebe o nosso melhor trabalho. Esse projeto me lembrou que essa escolha também é uma decisão de design, talvez a primeira de todas.",
				],
			},
			{
				type: "paragraph",
				content: [
					"E tem um quarto aprendizado, mais prático: trabalhar com e para uma comunidade muda o ritmo do projeto, e o sistema precisa absorver isso. Decisões que num produto comercial saem numa call de quarenta minutos aqui esperam o momento certo de conversa, e está tudo bem. O que não pode acontecer é o projeto sangrar enquanto espera. Por isso a combinação de status provisório, roles semânticos e documentação viva funciona tão bem nesse contexto: ela permite que o site evolua com o que já está validado, deixe visível o que aguarda conversa, e nunca trave esperando aprovação de detalhe. O sistema virou a memória do projeto, e projetos comunitários, mais do que quaisquer outros, precisam de memória externa às pessoas, porque as pessoas têm a vida inteira acontecendo ao redor do site.",
				],
			},
			{ type: "heading", level: 2, text: "Checklist: sinais de que seu design system tem identidade de verdade" },
			{
				type: "paragraph",
				content: [
					"Para fechar a parte prática: os sinais que eu procuro hoje para saber se um design system tem identidade de verdade, ou se é só uma biblioteca bonita que poderia pertencer a qualquer produto do mundo. O teste é mais simples do que parece: se você trocasse todos os tokens pelos de outro produto e ninguém percebesse, o sistema nunca teve identidade. Identidade de verdade é aquela que desce até a camada mais baixa da pilha e ainda é reconhecível lá:",
				],
			},
			{
				type: "list",
				items: [
					"Cada cor da fundação responde a uma pergunta de identidade, não de gosto: você consegue dizer de onde ela veio e por que ela existe.",
					"Os tokens têm nomes de papel, não de aparência, e os componentes consomem apenas a camada semântica.",
					"A identidade sobrevive a uma mudança: ajustar uma âncora propaga coerência, em vez de exigir caça ao hex.",
					"O sistema declara o que não está decidido, com status ou equivalente, em vez de fingir completude.",
					"Acessibilidade é propriedade de construção (contraste validado por par, foco visível por token), não auditoria depois do pronto.",
					"A documentação é viva e usa o próprio sistema, então ela não consegue mentir sobre o estado atual.",
					"Alguém de fora consegue reconhecer o produto olhando só os tokens: a identidade chegou até a camada mais baixa.",
					"As decisões difíceis têm justificativa escrita que uma pessoa nova no projeto consegue ler e entender sem você na sala.",
				],
			},
			{ type: "heading", level: 2, text: "Conclusão" },
			{
				type: "paragraph",
				content: [
					"Sacred Modernism começou como uma resposta a um brief impossível e virou uma convicção de método: tradição e minimalismo não se reconciliam no meio-termo aguado, se reconciliam num sistema que dá a cada um dos dois um lugar exato. A terracota tem seu lugar, o vidro escuro tem o seu, a Cormorant tem o seu, e a regra que os separa é o que impede tanto a frieza quanto o folclore. Tradução exige mais disciplina que decoração, e é justamente por isso que ela dura.",
				],
			},
			{
				type: "paragraph",
				content: [
					"Se esse projeto me deixou uma frase para levar aos próximos, é esta: todo design system é sobre alguma coisa, mesmo quando finge que não. O do Aero era sobre foco e velocidade de trabalho. O do Orixá é sobre dignidade, memória e pertencimento. Os dois usam OKLCH, roles semânticos e documentação viva, mas a técnica é só o veículo; a carga é diferente, e é a carga que dá sentido ao veículo. Quando alguém me pergunta por que tanto cuidado com um site de terreiro, a resposta honesta é curta: porque todo projeto merece esse cuidado, e alguns projetos apenas tornam impossível fingir que não.",
				],
			},
			{
				type: "paragraph",
				content: [
					"O Orixá Design System está em v0.2, com status provisório espalhado por várias seções, e isso não me constrange nem um pouco: um sistema honesto em construção vale mais que um sistema perfeito de mentira. Os próximos passos já têm endereço: validar as três famílias funcionais, fechar as composições restantes e deixar o DARK tão auditado quanto o LIGHT. Se quiser ver tudo isso ao vivo, a ",
					{ text: "Documentação Viva do Orixá Design System", href: "https://nossasenhoradorosario.netlify.app/design-system" },
					" está aberta, com os 77 tokens, os 20 roles, a matriz de contraste e o showcase de componentes renderizados com as próprias cores que documentam. E o ",
					{ text: "site da T. U. Senhora do Rosário", href: "https://nossasenhoradorosario.netlify.app" },
					" mostra o sistema onde ele realmente importa: nas páginas que a comunidade usa, do Início ao Sobre Nós, das Giras aos Eventos, do Blog à Área do Filho. Se você quer comparar com um sistema de outra natureza, o ",
					{ text: "case do Aero", href: "/projetos/aero/" },
					" mostra a mesma disciplina aplicada a um SaaS de produtividade. E se o seu projeto, comunitário ou não, precisa traduzir identidade em sistema, me chama pela ",
					{ text: "página inicial", href: "/" },
					". É o tipo de conversa que eu mais gosto de ter.",
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
