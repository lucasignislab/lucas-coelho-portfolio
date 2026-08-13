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
