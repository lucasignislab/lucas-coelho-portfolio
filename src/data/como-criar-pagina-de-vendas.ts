import type { Article } from "./blog";

const media = "/blog/como-criar-pagina-de-vendas";

export const comoCriarPaginaDeVendas: Article = {
	slug: "como-criar-pagina-de-vendas",
	title: "Como criar uma página de vendas que converte: guia completo em 2026",
	seoTitle: "Como criar página de vendas que converte: passo a passo | Lucas Coelho",
	excerpt:
		"Aprenda como criar página de vendas do zero: anatomia completa, copywriting, ferramentas, erros comuns e preços reais em R$, do rascunho à publicação.",
	date: "2026-10-30",
	tags: ["Página de vendas", "Criação de sites", "Conversão", "Copywriting", "Pequenos negócios"],
	coverImage: `${media}/capa.svg`,
	coverImageAlt:
		"Capa do artigo como criar uma página de vendas com os quatro pilares copy, prova, oferta e CTA sobre fundo escuro",
	ogDescription:
		"Aprenda como criar página de vendas do zero: anatomia completa, copywriting, ferramentas, erros comuns e preços reais em reais, do rascunho à publicação.",
	blocks: [
		{
			type: "paragraph",
			content: [
				"Para saber como criar página de vendas que converte, siga cinco etapas nesta ordem: pesquise a dor do público ouvindo clientes reais, escreva a copy seguindo a anatomia headline, problema, solução, prova, oferta e chamada para ação, desenhe uma página longa e sem menu de navegação, monte em uma ferramenta rápida de carregar e publique com domínio próprio, medindo a taxa de conversão desde o primeiro dia. Uma página profissional no Brasil custa entre R$ 2.500 e R$ 12.000, ou entre R$ 50 e R$ 300 por mês se você montar sozinho com ferramentas prontas.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Essa é a resposta curta. O restante deste guia é a resposta longa: cada seção da página explicada em detalhe, o passo a passo que eu uso nos projetos dos meus clientes aqui em Campinas, os erros que vejo se repetirem em quase toda página que não vende, os preços reais de cada caminho (fazer sozinho, contratar freelancer ou agência) e uma comparação honesta das ferramentas disponíveis em 2026. Se você quer criar um site de vendas para um curso, uma consultoria, um produto digital ou um serviço de ticket alto, este artigo foi escrito para você.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Antes de qualquer técnica, um aviso de quem trabalha com isso todo dia: página de vendas não é um problema de design bonito. É um problema de argumentação. Eu ganho a vida desenhando interface e digo sem hesitar que, numa página de vendas, o texto vale mais que o layout. Uma página feia com a argumentação certa vende; uma página linda com texto genérico vira cartão de visita caro. Tudo o que vem a seguir parte desse princípio.",
			],
		},
		{ type: "divider" },
		{ type: "heading", level: 2, text: "O que é uma página de vendas\n(e o que ela não é)" },
		{
			type: "paragraph",
			content: [
				"Página de vendas é uma página longa, sem menu de navegação, construída com um único objetivo: convencer o visitante a tomar uma decisão de compra sobre uma oferta específica. Ela existe para vender um curso, uma mentoria, um produto digital, uma consultoria ou um serviço de alto valor. Tudo nela, da primeira frase ao último botão, trabalha para essa única decisão. Se um elemento não ajuda a vender, ele sai da página.",
			],
		},
		{
			type: "paragraph",
			content: [
				"A confusão mais comum é com a landing page. Toda página de vendas é uma landing page, mas nem toda landing page é uma página de vendas. Landing page é qualquer página de destino com um objetivo único: capturar um e-mail, agendar uma reunião, divulgar um evento. A landing page de vendas é a versão mais longa e mais trabalhada desse formato, porque pede ao visitante algo muito maior do que um cadastro: pede o dinheiro dele. Por isso ela precisa de argumentação completa, prova social organizada e quebra de objeções, enquanto uma landing de captura resolve com três parágrafos e um formulário.",
			],
		},
		{
			type: "paragraph",
			content: [
				"A segunda confusão é com o site institucional. O site institucional apresenta a empresa: quem somos, o que fazemos, nossos serviços, nosso contato. Ele tem menu, tem várias páginas e serve a visitantes em momentos diferentes da decisão. A página de vendas faz o oposto: remove todas as saídas. Sem menu, sem link para o blog, sem botão de “conheça a empresa”. Parece radical, e é. Cada link que leva para fora da página é uma porta por onde a venda escapa. Se você quer entender melhor o que pertence a cada formato, meu artigo sobre ",
				{ text: "o que colocar em um site institucional", href: "/blog/o-que-colocar-site-institucional/" },
				" mostra o outro lado dessa divisão.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Quando a página de vendas é a escolha certa? Regra prática que uso com clientes: quando existe uma oferta única, com preço definido, para um público que chega por anúncio, e-mail ou indicação direta. Uma clínica de estética que vende um protocolo de tratamento fechado, um infoprodutor lançando um curso, um consultor vendendo um pacote de dez sessões: todos esses casos pedem página de vendas. Quando o objetivo é relacionamento de longo prazo, portfólio ou presença institucional, o site completo faz mais sentido, e aí a conversa é outra.",
			],
		},
		{ type: "heading", level: 2, text: "A anatomia completa de uma página que converte" },
		{
			type: "paragraph",
			content: [
				"Existe uma ordem que funciona, e ela não foi inventada por mim nem por guru de marketing: ela espelha a sequência natural de dúvidas de quem está decidindo uma compra. O visitante entra querendo saber “é para mim?”, depois “funciona?”, depois “funciona para gente como eu?”, depois “quanto custa?”, depois “e se eu me arrepender?”. Uma página bem construída responde essas perguntas exatamente nessa ordem. Trocar a ordem é pedir ao visitante um esforço que ele não vai fazer.",
			],
		},
		{
			type: "image",
			src: `${media}/anatomia-pagina-de-vendas.svg`,
			alt: "Diagrama da anatomia de uma página de vendas com seis seções numeradas: headline e promessa, problema e agitação, solução e mecanismo, prova social, oferta com bônus e garantia, FAQ e CTA final",
			caption:
				"As seis seções de uma página de vendas, na ordem em que respondem as dúvidas de quem decide uma compra.",
		},
		{ type: "heading", level: 3, text: "1. Headline: a frase que decide se a página existe" },
		{
			type: "paragraph",
			content: [
				"A headline é a primeira frase da página e a mais importante de todas, por uma margem que assusta. Se ela falha, nada do que vem depois é lido. Uma boa headline de página de vendas faz duas coisas ao mesmo tempo: nomeia o resultado que o visitante quer e dá um indício de como ele chega lá. “Aprenda a tocar violão em 90 dias, mesmo começando do zero” vence “Curso de violão online” em qualquer teste, porque a primeira fala de resultado e a segunda fala de produto.",
			],
		},
		{
			type: "paragraph",
			content: [
				"O erro mais comum que vejo é a headline enigmática, aquela que tenta ser esperta e acaba não dizendo nada. Frases como “Transforme sua jornada” ou “O próximo nível do seu negócio” parecem fortes numa reunião e são invisíveis para quem chega de um anúncio às 23h no celular. Pesquisas de usabilidade do ",
				{ text: "Nielsen Norman Group", href: "https://www.nngroup.com/articles/how-users-read-on-the-web/" },
				" mostram há décadas que as pessoas não leem páginas na web: elas escaneiam. A headline precisa sobreviver ao escaneio, e isso significa especificidade: número, prazo, público, resultado.",
			],
		},
		{ type: "heading", level: 3, text: "2. Problema: provar que você entende a dor" },
		{
			type: "paragraph",
			content: [
				"Logo depois da headline, a página precisa descrever o problema do visitante com mais precisão do que ele mesmo conseguiria. Essa seção parece contraintuitiva para quem está começando: por que gastar trezentas palavras falando da dor em vez de falar da solução? Porque a confiança nasce aqui. Quando o visitante lê a descrição do problema e pensa “é exatamente isso que eu vivo”, ele concede ao autor da página o direito de apresentar a solução. Sem esse momento, a oferta que vem depois soa como vendedor de porta.",
			],
		},
		{
			type: "paragraph",
			content: [
				"A fonte desse texto não é a sua cabeça: é a boca do cliente. Nas pesquisas que faço antes de escrever uma página, eu caço as frases exatas que os clientes usam, em comentários, avaliações, áudios de WhatsApp, grupos e reclamações. Quando uma página para um nutricionista saiu convertendo bem, o motivo foi simples: a seção de problema usava frases literais que as pacientes diziam no consultório, inclusive as que davam vergonha de admitir. Copywriting para página de vendas começa por ouvir, não por escrever.",
			],
		},
		{ type: "heading", level: 3, text: "3. Solução e mecanismo: como funciona, sem milagre" },
		{
			type: "paragraph",
			content: [
				"Só depois da dor vem a solução. Aqui a página apresenta o produto, mas o ponto que separa copy amadora de profissional é o mecanismo: a explicação de como o produto produz o resultado prometido. “Um método em 5 passos, com aulas de 15 minutos e correção individual de exercícios” é um mecanismo. “Uma metodologia exclusiva e transformadora” é fumaça. O visitante de 2026 já foi enganado por promessa vazia uma dezena de vezes, e ele farejou a diferença antes de você terminar a frase.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Um recurso que funciona muito bem nessa seção é o antes e depois descrito em cena, não em adjetivo. Em vez de dizer que o cliente vai “ganhar produtividade”, descreva a terça-feira dele depois da compra: o relatório que levava três horas saindo em vinte minutos, o estoque que fecha sem sobra no fim do mês, o aluno que toca a primeira música inteira na frente da família. Cena concreta faz o visitante se projetar no resultado, e projeção é o combustível do desejo. Quando escrevo essa parte, volto às entrevistas da pesquisa e procuro as cenas que os próprios clientes descreveram, porque a cena inventada por marketeiro sai sempre um palmo acima da realidade, e o leitor percebe.",
			],
		},
		{ type: "heading", level: 3, text: "4. Prova social: outros decidiram antes" },
		{
			type: "paragraph",
			content: [
				"Prova social é a seção que mais pesa na decisão depois da oferta, e a mais maltratada. Depoimento bom tem nome, contexto e resultado específico: “Fechei meus três primeiros clientes em seis semanas” vale dez vezes mais que “Adorei, recomendo”. Prints de WhatsApp, vídeos curtos de clientes, números de alunos ou de atendimentos, logos de empresas atendidas: tudo vale, desde que seja real e verificável. Depoimento inventado, além de antiético, é crime no Brasil pelo Código de Defesa do Consumidor, e o visitante percebe quando a prova cheira a encomenda.",
			],
		},
		{
			type: "paragraph",
			content: [
				"A organização da prova também importa. Eu distribuo os depoimentos ao longo da página em vez de empilhar todos num bloco só: um depoimento curto logo após a primeira promessa, um bloco maior depois da explicação do mecanismo, um caso detalhado ao lado da oferta. Assim, cada vez que o visitante encontra uma afirmação forte, encontra logo em seguida alguém confirmando que aquilo é verdade. Se você tem poucos depoimentos, prefira três bons, com história e número, a quinze frases de uma linha. E peça autorização por escrito para usar nome e foto: além de correto, essa conversa costuma render depoimentos melhores, porque o cliente capricha quando sabe que vai assinar.",
			],
		},
		{ type: "heading", level: 3, text: "5. Oferta: preço, bônus e garantia" },
		{
			type: "paragraph",
			content: [
				"A oferta é onde a maioria das páginas caseiras desmorona, porque o dono do negócio tem pudor de vender. A seção de oferta precisa de três elementos claros: o que exatamente está incluso, quanto custa e o que acontece se der errado. Preço escondido não cria desejo; cria desconfiança. Garantia explícita, como 7 ou 14 dias de reembolso incondicional, remove o último argumento do visitante contra si mesmo. Bônus funcionam quando complementam o produto principal; quando parecem desespero (“mais 27 bônus avaliados em R$ 4.997”), destroem a credibilidade que a página passou vinte blocos construindo.",
			],
		},
		{ type: "heading", level: 3, text: "6. FAQ e CTA: a última rodada de objeções" },
		{
			type: "paragraph",
			content: [
				"O FAQ no fim da página não é burocracia: é a máquina de quebrar as últimas objeções. As perguntas certas saem das conversas de vendas reais: “funciona para iniciantes?”, “por quanto tempo tenho acesso?”, “e se eu não gostar?”, “aceita boleto?”. Cada resposta termina apontando de volta para o botão. E o botão, aliás, aparece várias vezes ao longo da página, sempre com texto de ação concreta: “Quero garantir minha vaga” converte melhor que “Enviar”. Esse padrão de estrutura existe em variações na maioria das páginas de alta conversão documentadas por plataformas como a ",
				{ text: "Unbounce", href: "https://unbounce.com/conversion-rate-optimization/what-is-a-sales-page/" },
				", que analisa milhares de landing pages por ano.",
			],
		},
		{
			type: "quote",
			text: "Página de vendas não é um folheto bonito. É uma conversa de vendas gravada, onde cada seção responde a pergunta que o cliente faria em seguida.",
			cite: "O que eu repito para todo cliente antes de abrir o Figma",
		},
		{ type: "divider" },
		{ type: "heading", level: 2, text: "Como criar página de vendas: passo a passo" },
		{
			type: "paragraph",
			content: [
				"Este é o processo que eu sigo nos projetos que aceito, enxugado em cinco etapas. Dá para executar sozinho com dedicação, e é exatamente o processo que um profissional sério vai seguir se você contratar um. O tempo total varia de duas a seis semanas dependendo de quanto material você já tem pronto e da velocidade das suas decisões.",
			],
		},
		{ type: "heading", level: 3, text: "Etapa 1: pesquisa (3 a 7 dias)" },
		{
			type: "paragraph",
			content: [
				"Antes de escrever qualquer linha, levante três coisas: as frases exatas que os clientes usam para descrever o problema, as objeções que aparecem em toda conversa de venda e o que os concorrentes estão prometendo. Entreviste de cinco a dez clientes ou ex-clientes, nem que seja por áudio de WhatsApp. Vasculhe avaliações no Google, comentários em redes sociais e grupos do seu nicho. Anote tudo literalmente, sem traduzir para linguagem de marketing: a frase crua do cliente é ouro de copy.",
			],
		},
		{
			type: "paragraph",
			content: [
				"No fim dessa etapa, você deve conseguir preencher três frases sem hesitar: meu cliente ideal está sofrendo com tal coisa, já tentou tal coisa e falhou, e deseja tal resultado. Se qualquer uma dessas frases sair genérica, a pesquisa ainda não acabou. Eu já vi projeto inteiro destravar quando o dono do negócio parou de descrever o produto e começou a repetir o que ouviu nas entrevistas. A página se escreve quase sozinha quando a pesquisa é boa, e nenhuma ferramenta de inteligência artificial substitui esse passo, porque a IA também não conhece os seus clientes.",
			],
		},
		{ type: "heading", level: 3, text: "Etapa 2: a copy (5 a 10 dias)" },
		{
			type: "paragraph",
			content: [
				"Com a pesquisa na mão, escreva a página inteira em texto puro, sem pensar em design. Eu uso um documento sem formatação nenhuma, porque a tentação de “já ir arrumando” mata a argumentação. Siga a anatomia da seção anterior: headline, problema, solução com mecanismo, prova social, oferta, FAQ e chamadas para ação espalhadas. A estrutura clássica que organiza esse fluxo é o AIDA, atenção, interesse, desejo e ação, e ela continua útil quase um século depois justamente porque descreve a ordem natural de uma decisão.",
			],
		},
		{
			type: "image",
			src: `${media}/fluxo-aida.svg`,
			alt: "Diagrama do fluxo AIDA aplicado a páginas de vendas: atenção na headline, interesse no problema, desejo na solução com prova e oferta, ação no CTA",
			caption:
				"O fluxo AIDA aplicado à página de vendas: um mapa para não pular nenhuma etapa da decisão de compra.",
		},
		{
			type: "paragraph",
			content: [
				"Algumas regras de copy que eu trato como inegociáveis. Escreva para uma pessoa só, não para “público”: use “você” o tempo todo. Prefira frases curtas e verbos ativos. Troque adjetivos por fatos: em vez de “atendimento excelente”, escreva “resposta em até duas horas em dias úteis”. Cada afirmação forte precisa de prova em seguida, ou vira bravata. E corte sem dó: a primeira versão de qualquer copy boa nasce trinta por cento maior do que deveria, e a edição é onde ela fica boa de verdade. Se quiser se aprofundar, os relatórios de conversão da ",
				{ text: "HubSpot", href: "https://blog.hubspot.com/marketing/landing-page-best-practices" },
				" têm boas sínteses de boas práticas de texto e estrutura em páginas de conversão.",
			],
		},
		{ type: "heading", level: 3, text: "Etapa 3: o design (3 a 7 dias)" },
		{
			type: "paragraph",
			content: [
				"Design de página de vendas tem uma missão humilde: não atrapalhar a leitura. Hierarquia clara entre títulos e texto, parágrafos curtos com bastante respiro, botões grandes com cor de contraste, e a página inteira pensada primeiro para celular, porque em nichos de consumo o tráfego mobile passa de 70% em praticamente todos os projetos que acompanho. Fotos reais do produto, do autor ou dos clientes valem ouro; banco de imagem genérico grita falsidade numa página que vive de confiança.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Duas regras técnicas que eu não abro mão. Primeira: velocidade. Cada segundo extra de carregamento derruba a conversão, e página de vendas que recebe tráfego pago não pode se dar ao luxo de pesar. Segunda: nenhum elemento que distraia da ação. Menu, barra lateral, pop-up de newsletter, link de rede social no topo: tudo isso é porta de saída. A página tem um botão, e o design inteiro aponta para ele.",
			],
		},
		{ type: "heading", level: 3, text: "Etapa 4: montagem e ferramenta (2 a 5 dias)" },
		{
			type: "paragraph",
			content: [
				"A montagem depende do caminho escolhido, que detalho na seção de ferramentas mais adiante. O que importa aqui é o checklist técnico mínimo, que vale para qualquer ferramenta: certificado SSL ativo, página medindo menos de 2 MB de peso total, título e descrição configurados para buscadores, pixel e analytics instalados antes de qualquer anúncio, formulário ou botão de checkout testado de ponta a ponta, e a página aberta em pelo menos três celulares diferentes antes de publicar. Eu sei que testar em três aparelhos parece exagero até o dia em que você descobre que o botão de compra sumia num iPhone antigo.",
			],
		},
		{ type: "heading", level: 3, text: "Etapa 5: publicação e medição (contínua)" },
		{
			type: "paragraph",
			content: [
				"Publicar não é o fim; é o começo da única fase que importa. Nos primeiros trinta dias, meça três números: quantas pessoas chegam, quantas clicam no botão principal e quantas compram. A razão entre o primeiro e o último número é a sua taxa de conversão, e ela é a bússola de tudo. Página que vende para um público frio de anúncio converte tipicamente entre 1% e 3% no checkout; audiência quente, de lista de e-mail ou indicação, pode passar de 10%. Trate essas faixas como referência de mercado, não como promessa: o seu número depende de oferta, preço e público.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Com os números na mão, melhore uma coisa por vez. Trocar a headline e o botão na mesma semana te impede de saber o que funcionou. A rotina saudável é: uma hipótese, uma mudança, uma ou duas semanas de medição, decisão. Páginas boas não nascem prontas; nascem publicadas e vão ficando boas com dados. É por isso que eu desconfio de qualquer projeto que promete a página perfeita na entrega: perfeição em conversão é processo, não evento.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Uma última recomendação de quem já viu muita página morrer por esquecimento: coloque na agenda uma revisão mensal de quinze minutos. Abra os números, releia a página como se fosse um visitante cético, teste o botão de compra de verdade, inclusive fazendo uma compra teste quando o checkout permite. Formulário quebrado, link de pagamento expirado e preço desatualizado são mortes silenciosas: ninguém avisa, a página simplesmente para de vender e você demora semanas para notar. A página de vendas é um vendedor que trabalha 24 horas, e vendedor que trabalha 24 horas merece uma conferida por mês.",
			],
		},
		{ type: "divider" },
		{ type: "heading", level: 2, text: "Os erros mais comuns (que eu vejo em toda auditoria)" },
		{
			type: "paragraph",
			content: [
				"Depois de anos revisando páginas que não vendem, posso afirmar que os erros se repetem com uma regularidade quase entediante. Não são erros de gosto; são erros de estrutura. Se a sua página existe e não converte, aposte que pelo menos três destes itens estão presentes:",
			],
		},
		{
			type: "list",
			items: [
				"Headline genérica que fala do produto em vez do resultado: “Curso de confeitaria” em vez de “Faça bolos que vendem a R$ 120, começando da cozinha da sua casa”.",
				"Menu de navegação e links externos no topo, oferecendo saídas antes da primeira argumentação.",
				"Texto escrito sobre a empresa (“nós somos referência”) em vez de sobre o visitante (“você vai conseguir”).",
				"Prova social falsa ou vaga: depoimentos sem nome, sem foto e sem resultado, que qualquer concorrente poderia exibir.",
				"Preço escondido ou empurrado para um “entre em contato”, num produto que deveria ter valor fechado na página.",
				"Dezenove bônus inflados com valores fictícios somados, um truque que o público aprendeu a farejar lá por 2020.",
				"Página pesada que leva 6 segundos para abrir no 4G, drenando o dinheiro do anúncio antes da primeira frase ser lida.",
				"Um único botão no final da página, obrigando quem se convenceu na metade a rolar dez telas para comprar.",
				"Nenhuma medição instalada: o dono não sabe dizer quantas pessoas chegaram nem quantas clicaram, e “otimiza” no palpite.",
				"Copy escrita de cabeça, sem uma única frase vinda de cliente real, o que produz texto que parece certo e não toca ninguém.",
			],
		},
		{
			type: "paragraph",
			content: [
				"O fio que costura esses erros é sempre o mesmo: a página foi pensada de dentro para fora, a partir do que o dono queria dizer, em vez de fora para dentro, a partir do que o visitante precisava ouvir. Quase nenhum desses problemas exige talento especial para corrigir; exigem apenas a humildade de tratar a página como uma conversa com um cético, e não como um monólogo sobre o próprio negócio.",
			],
		},
		{ type: "heading", level: 2, text: "Quanto custa uma página de vendas em 2026" },
		{
			type: "paragraph",
			content: [
				"Quanto custa uma página de vendas depende de quem executa e de quanto do trabalho pesado (pesquisa e copy) entra no escopo. As faixas que vejo no mercado brasileiro em 2026, entre os orçamentos que faço, os colegas com quem converso e as propostas que meus clientes me mostram: fazendo sozinho com ferramentas prontas, de R$ 50 a R$ 300 por mês mais o seu tempo; com freelancer, de R$ 2.500 a R$ 8.000 por projeto; com agência, de R$ 8.000 a R$ 25.000. Detalho cada cenário abaixo.",
			],
		},
		{ type: "heading", level: 3, text: "Fazer sozinho: R$ 50 a R$ 300 por mês, mais 40 a 80 horas suas" },
		{
			type: "paragraph",
			content: [
				"O caminho do faça você mesmo é legítimo e, para validar uma oferta pela primeira vez, muitas vezes é o mais sensato. Os custos diretos são baixos: domínio próprio por R$ 40 por ano no registro.br, mais a assinatura da ferramenta. O custo real mora no tempo. Entre aprender a ferramenta, pesquisar, escrever a copy, montar, testar e publicar, uma primeira página de vendas consome de 40 a 80 horas de quem nunca fez isso. Se a sua hora vale R$ 60, o custo embutido é de R$ 2.400 a R$ 4.800, o que explica por que tanta gente começa sozinha e termina contratando.",
			],
		},
		{ type: "heading", level: 3, text: "Freelancer: R$ 2.500 a R$ 8.000 por projeto" },
		{
			type: "paragraph",
			content: [
				"Com um freelancer experiente, a faixa de R$ 2.500 a R$ 8.000 compra pesquisa, copy, design sob medida, montagem, integração com checkout e configuração de medição, em prazo de duas a seis semanas. No piso ficam os projetos em que você entrega a copy pronta ou participa intensamente da escrita; no teto, os que incluem pesquisa com clientes, copy do zero e variações para teste. É o formato em que eu trabalho e, para a maioria dos pequenos negócios, o ponto de equilíbrio entre investimento e resultado. Detalho faixas de preço de todos os tipos de site no meu artigo sobre ",
				{ text: "quanto custa criar um site", href: "/blog/quanto-custa-criar-um-site/" },
				", que compara esse formato com landing pages simples, sites institucionais e lojas virtuais.",
			],
		},
		{ type: "heading", level: 3, text: "Agência: R$ 8.000 a R$ 25.000 por projeto" },
		{
			type: "paragraph",
			content: [
				"Agência faz sentido quando a página vem acompanhada de estratégia de lançamento, produção de vídeo, gestão de tráfego e campanha integrada. Para a página isolada, o valor cobre uma estrutura que você talvez não use: estrategista, redator, designer, gerente de conta. Não é desperdício quando o escopo é grande; é overhead quando você só precisa de uma página boa vendendo um produto de R$ 297. A pergunta certa antes de contratar agência para página de vendas é: o que vem junto além da página?",
			],
		},
		{
			type: "paragraph",
			content: [
				"Uma conta que ajuda a decidir quanto investir: multiplique o preço do seu produto pela conversão esperada e pelo tráfego planejado. Se você vai vender um curso de R$ 497 para mil visitantes de anúncio por mês, a diferença entre converter 1% e 2% é de dez vendas, ou seja, R$ 4.970 por mês. Nesse cenário, uma página profissional de R$ 6.000 se paga em cinco semanas. Se o produto custa R$ 47 e o tráfego é pequeno, a mesma página demoraria anos para se pagar, e o caminho sensato é começar mais enxuto. O investimento certo é proporcional ao que a página precisa devolver.",
			],
		},
		{ type: "heading", level: 2, text: "Ferramentas comparadas: onde montar a página" },
		{
			type: "paragraph",
			content: [
				"A escolha da ferramenta importa menos do que a copy e a oferta, mas importa. Minha comparação honesta das opções que mais aparecem nos projetos que chegam até mim, com preços aproximados de 2026 sujeitos a variação de plano e câmbio:",
			],
		},
		{
			type: "list",
			items: [
				"WordPress com Elementor ou similar: a partir de R$ 30 por mês somando hospedagem e plugin. Flexível e barato, mas exige manutenção e costuma ficar pesado nas mãos de quem não cuida da performance.",
				"Wix e Squarespace: R$ 50 a R$ 150 por mês. Mais fáceis de aprender, decentes para começar, com limitações de velocidade e de SEO técnico que aparecem quando a operação cresce.",
				"Plataformas de produto digital (Hotmart, Kiwify e afins): páginas de venda embutidas sem mensalidade, cobrando taxa por venda. Ótimas para começar do zero; limitadas em design e em controle do funil.",
				"Desenvolvimento sob medida (como eu trabalho): custo de projeto, página leve carregando em menos de 1 segundo, controle total de SEO e medição. Exige profissional, mas é o formato que mais devolve em conversão e em ranqueamento no Google.",
				"Ferramentas de IA para gerar página: baratas e rápidas na primeira versão, mas entregam texto genérico e estrutura comum a milhares de outras páginas. Vejo a IA como aceleradora para quem já sabe o que está fazendo, não como substituta da pesquisa e da copy.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Se o orçamento está apertado, minha ordem de recomendação é: comece na plataforma do seu produto digital ou num builder simples, valide a oferta com tráfego pequeno, e migre para uma página profissional quando as primeiras vendas provarem que a oferta funciona. Errar a ferramenta é barato de corrigir; errar a oferta não tem ferramenta que salve.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Um ponto que quase ninguém menciona nessa discussão: a ferramenta certa também depende de quem vai mexer na página depois de publicada. Se você mesmo vai trocar preço, depoimento e bônus todo mês, um builder que você domina vale mais que uma página sob medida que exige um profissional para cada vírgula. Nas páginas que entrego, eu combino as duas coisas: código leve e rápido por baixo, com os pontos de edição frequente documentados e combinados com o cliente, para que ele não fique refém de mim nem de uma ferramenta. Página de vendas é organismo vivo, e o plano de manutenção deveria nascer junto com o projeto, não depois da primeira dor de cabeça.",
			],
		},
		{ type: "heading", level: 2, text: "Quando vale a pena contratar um profissional" },
		{
			type: "paragraph",
			content: [
				"Nem todo mundo precisa me contratar, e eu prefiro dizer isso de cara, porque cliente que fecha comigo sabendo o que está comprando é cliente que fica. Vale fazer sozinho quando: o produto ainda não foi validado, o orçamento total é menor que R$ 1.000, você gosta de escrever e tem quarenta horas para investir. Nesses casos, siga o passo a passo deste artigo e vá em frente; a pior página publicada vence a melhor página que ficou na gaveta.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Vale contratar quando: você vai investir em tráfego pago (cada real de anúncio multiplica o custo de uma página ruim), o ticket do produto passa de R$ 500, você já tentou sozinho e a página não converte, ou simplesmente sua hora vale mais que a diferença de preço. Um caso que ilustra bem: uma mentora de Campinas veio até mim depois de oito meses com uma página caseira que vendia duas unidades por mês; refizemos pesquisa, copy e estrutura, e a página nova vendeu onze no primeiro mês com o mesmo tráfego. O produto não mudou; a conversa com o visitante mudou.",
			],
		},
		{
			type: "paragraph",
			content: [
				"O que você deve exigir de qualquer profissional de página de vendas, eu incluso: processo de pesquisa antes da escrita, copy entregue para sua aprovação antes do design, prazo e escopo fechados por escrito, configuração de medição incluída na entrega e pelo menos uma rodada de ajustes depois dos primeiros dados reais. Quem pula a pesquisa e vai direto para o layout está vendendo decoração com preço de estratégia.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Se quiser ver como isso se materializa num projeto de produto digital, o ",
				{ text: "case do Ratoeira Hub", href: "/projetos/ratoeira-hub/" },
				" mostra como projetei páginas e fluxos de conversão para um público que vive de anúncio e mede tudo em centavos por clique. E o ",
				{ text: "case do Aero", href: "/projetos/aero/" },
				" mostra o padrão de cuidado de interface que levo para qualquer tela, inclusive páginas de venda.",
			],
		},
		{ type: "divider" },
		{ type: "heading", level: 2, text: "Perguntas frequentes sobre como criar página de vendas" },
		{ type: "heading", level: 3, text: "Quanto custa uma página de vendas no Brasil?" },
		{
			type: "paragraph",
			content: [
				"Em 2026, fazer sozinho custa de R$ 50 a R$ 300 por mês em ferramentas, mais de 40 a 80 horas do seu tempo. Com freelancer, o projeto fica entre R$ 2.500 e R$ 8.000. Com agência, entre R$ 8.000 e R$ 25.000, geralmente com estratégia e campanha junto. Some R$ 40 por ano de domínio em qualquer cenário.",
			],
		},
		{ type: "heading", level: 3, text: "Quanto tempo demora para criar uma página de vendas?" },
		{
			type: "paragraph",
			content: [
				"Sozinho, conte com 3 a 6 semanas de trabalho distribuído, porque pesquisa e copy consomem mais tempo que a montagem. Com profissional, o prazo típico é de 2 a 6 semanas, dependendo de quanto material você entrega pronto e da velocidade das suas aprovações. Promessa de página completa em dois dias corta a pesquisa, que é a etapa que faz vender.",
			],
		},
		{ type: "heading", level: 3, text: "Preciso de domínio próprio para minha página de vendas?" },
		{
			type: "paragraph",
			content: [
				"Recomendo fortemente que sim. Um domínio .com.br custa R$ 40 por ano no registro.br e transmite confiança que nenhum subdomínio gratuito transmite, além de ser seu para sempre. Registrar é simples e leva dez minutos. Regra de ouro: o domínio fica em conta sua, com seu e-mail e seu documento, mesmo quando outra pessoa constrói a página.",
			],
		},
		{ type: "heading", level: 3, text: "Qual a diferença entre página de vendas e landing page?" },
		{
			type: "paragraph",
			content: [
				"Landing page é qualquer página de destino com um objetivo único, como capturar um e-mail ou agendar uma reunião. Página de vendas é a versão longa desse formato, feita para convencer uma compra: traz argumentação completa, prova social, oferta detalhada, garantia e quebra de objeções. Toda página de vendas é uma landing page; nem toda landing page vende.",
			],
		},
		{ type: "heading", level: 3, text: "Consigo criar uma página de vendas sozinho, sem saber programar?" },
		{
			type: "paragraph",
			content: [
				"Consegue, usando plataformas de produto digital como Hotmart e Kiwify ou builders como Wix e WordPress com editor visual. O desafio real não é técnico: é escrever uma copy que convença, e isso exige pesquisa com clientes e edição impiedosa. Reserve de 40 a 80 horas para a primeira página e use o passo a passo deste artigo como roteiro.",
			],
		},
		{ type: "heading", level: 3, text: "Uma página de vendas aparece no Google?" },
		{
			type: "paragraph",
			content: [
				"Aparece, mas com ressalvas. Páginas de venda pura costumam ter conteúdo curto e poucos links internos, o que limita o potencial de ranqueamento. O caminho que funciona é combinar a página de vendas com conteúdo de blog que atrai busca, como este artigo, e apontar esse tráfego para a oferta. SEO técnico bem feito na página, com título, descrição e velocidade, continua sendo obrigatório.",
			],
		},
		{ type: "divider" },
		{ type: "heading", level: 2, text: "Conclusão: a página é a conversa, não o folheto" },
		{
			type: "paragraph",
			content: [
				"Aprender como criar página de vendas é aprender a conduzir uma conversa de venda gravada: pesquisar o que o cliente diz, responder as dúvidas na ordem em que elas aparecem, provar cada afirmação e pedir a ação sem pudor. A anatomia que mostrei aqui, headline, problema, solução, prova, oferta, FAQ e CTA, não é fórmula mágica; é o mapa de uma decisão de compra. Preencha esse mapa com as frases reais dos seus clientes e você já está à frente de noventa por cento das páginas que existem por aí.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Comece pequeno e publique. Uma primeira página imperfeita, medindo tudo desde o dia um, ensina mais que três meses de planejamento. E quando a operação crescer, quando o tráfego pago entrar na conta ou o ticket subir, invista na versão profissional: a diferença entre 1% e 2% de conversão paga o projeto várias vezes ao ano.",
			],
		},
		{
			type: "paragraph",
			content: [
				"Se você quer uma página de vendas construída assim, com pesquisa, copy e design sob medida, meu serviço de ",
				{ text: "criação de sites em Campinas", href: "/criacao-de-sites-campinas/" },
				" inclui páginas de venda do zero, com escopo fechado, prazo definido e a medição configurada antes da entrega. Me chama pelo WhatsApp pelo link dessa página ou pela ",
				{ text: "página inicial", href: "/" },
				": traga sua oferta em duas frases e eu devolvo com um diagnóstico honesto, inclusive se a resposta honesta for que você ainda não precisa de mim.",
			],
		},
	],
};
