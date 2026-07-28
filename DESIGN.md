---
name: "Lucas Coelho — Ateliê Editorial Digital"
description: "Um portfólio autoral que combina expressão editorial, calor humano e precisão técnica."
colors:
  ember: "#E28868"
  ink: "#212121"
  bone: "#F4F1ED"
  ash: "#827F7E"
  smoke: "#1A1717"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.2em"
rounded:
  none: "0"
  subtle: "0.125rem"
  compact: "0.35rem"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
  section-mobile: "6rem"
  section-desktop: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0"
---

# Design System: Lucas Coelho

## Overview

**Creative North Star: "Ateliê Editorial Digital"**

O portfólio se comporta como um ateliê contemporâneo: expressivo na composição, cuidadoso nos detalhes e tecnicamente preciso. A atmosfera é editorial, calorosa, precisa e cinematográfica. Tipografia em grande escala cria presença autoral; legendas monoespaçadas, grades e ritmos consistentes revelam método e domínio técnico.

A interface principal oferece uma moldura reconhecível sem competir com o trabalho apresentado. Ela permanece escura, quente e contida, reservando expressão mais intensa para tipografia, imagens e movimento. Os componentes são refinados e responsivos: discretos em repouso, mas claros e vivos quando a pessoa interage.

Os cases podem assumir as cores, formas e atmosferas próprias de cada projeto. Eles preservam do portfólio a clareza estrutural, a acessibilidade e a qualidade do movimento, não a paleta global.

**Key Characteristics:**

- Contraste quente entre superfícies escuras e texto marfim.
- Tipografia editorial expressiva combinada com linguagem técnica monoespaçada.
- Espaço generoso, hierarquia ampla e composição assimétrica controlada.
- Coral usado com parcimônia para foco, seleção e resposta.
- Movimento suave, intencional e sempre compatível com movimento reduzido.
- Liberdade visual para os cases dentro de uma estrutura de leitura coerente.

## Colors

A paleta principal combina neutros quentes de baixo brilho com um único acento coral, produzindo contraste elegante sem frieza digital.

### Primary

- **Cobre Suave:** acento de interação usado em foco, hover, seleção e pequenos sinais de energia. Sua raridade preserva seu poder de orientação.

### Neutral

- **Carvão Editorial:** plano de fundo principal e base visual do portfólio.
- **Marfim de Papel:** texto principal, botões de alto contraste e elementos que precisam liderar a leitura.
- **Cinza de Oficina:** texto secundário, metadados, legendas e informações de suporte.
- **Sombra Quente:** superfície profunda para carregamento, mídia e pequenas separações tonais.

### Named Rules

**The Cobre de Precisão Rule.** O Cobre Suave indica ação, foco ou resposta; nunca preenche grandes áreas da interface principal.

**The Warm Neutral Rule.** Fundos, textos e divisores permanecem em neutros quentes. Cinzas azulados não pertencem à identidade principal.

**The Case Autonomy Rule.** Paletas específicas dos cases permanecem confinadas às suas páginas e não substituem os tokens globais do portfólio.

## Typography

**Display Font:** Instrument Serif (com Georgia e serif como fallback)
**Body Font:** Inter (com system-ui e sans-serif como fallback)
**Label/Mono Font:** JetBrains Mono (com ui-monospace e monospace como fallback)

**Character:** Instrument Serif traz autoria e ritmo editorial; Inter sustenta clareza e utilidade; JetBrains Mono introduz precisão técnica. A força do sistema está no contraste entre essas três vozes, não no excesso de pesos ou efeitos.

### Hierarchy

- **Display** (regular, escala fluida, line-height 0.85): nomes, declarações e títulos de grande impacto; pode usar itálico para calor e contraste.
- **Headline** (medium ou semibold, escala fluida, line-height entre 0.95 e 1.2): títulos de seção e chamadas estruturais.
- **Title** (regular ou medium, line-height próximo de 1): títulos de projetos, princípios e agrupamentos.
- **Body** (regular, line-height entre 1.35 e 1.7): explicações e narrativas; blocos longos ficam entre aproximadamente 44 e 65 caracteres por linha.
- **Label** (regular ou medium, 0.625rem–0.75rem, tracking 0.16em–0.25em, caixa alta): navegação, metadados, índices e eyebrows.

### Named Rules

**The Three Voices Rule.** Serif expressa autoria, sans comunica e mono orienta. Não misture as funções sem uma razão clara.

**The Tight Display Rule.** Títulos grandes usam entrelinha e tracking compactos, mas nunca podem cortar descendentes ou comprometer a leitura.

## Layout

A página usa seções de largura total com respiro vertical generoso. O padding horizontal progride de 1.5rem no mobile para 3rem em telas médias e 5rem em telas grandes; o ritmo vertical principal progride de 6rem para 8rem.

Composições maiores usam grades de até 12 colunas, alternando blocos largos, alinhamentos deslocados e grandes áreas vazias. Textos editoriais mantêm largura de leitura controlada. Projetos usam imagens amplas e informação organizada por metadados, título, descrição e ação.

No mobile, grades colapsam para uma coluna, formulários passam para fluxo vertical e ações importantes ocupam largura suficiente para toque confortável. A assimetria pode reduzir, mas a hierarquia e o espaço editorial permanecem.

**The Breathing Room Rule.** Espaço vazio é parte da composição; não compacte seções apenas para mostrar mais conteúdo acima da dobra.

**The Controlled Measure Rule.** Textos de leitura nunca se estendem por toda a tela, mesmo quando imagens e divisores usam a largura disponível.

## Elevation & Depth

O sistema é editorial plano. A interface principal quase não usa sombras: hierarquia surge de escala tipográfica, contraste tonal, divisores delicados, imagens e espaço. Profundidade mais evidente pertence a mídias, sobreposições e demonstrações dentro dos cases; não a contêineres genéricos.

Movimento adiciona uma camada temporal de profundidade. Reveals verticais, escalas sutis de imagem, parallax contido e respostas magnéticas devem usar easings suaves e respeitar `prefers-reduced-motion`.

### Named Rules

**The Flat Canvas Rule.** Superfícies globais ficam planas; sombra só aparece quando imagem, sobreposição ou estado precisa se separar fisicamente do plano.

**The Motion With Purpose Rule.** Animação revela hierarquia ou confirma interação. Nunca atrasa o acesso ao conteúdo.

## Shapes

A linguagem combina dois extremos: planos e campos quase sem raio, que preservam o rigor editorial, e controles totalmente arredondados, que tornam ações acolhedoras. Pequenos raios aparecem em imagens e símbolos; cartões globais não usam arredondamento volumoso por padrão.

Divisores de um pixel e baixa opacidade organizam conteúdo sem criar caixas pesadas. Imagens podem ser recortadas com raio sutil e receber textura de grão, desde que a obra continue sendo o foco.

**The Flat-or-Pill Rule.** Controles são planos ou completamente arredondados; evite raios médios genéricos sem função.

## Components

Os componentes são refinados e responsivos: discretos em repouso, expressivos na interação e sempre legíveis.

### Buttons

- **Shape:** cápsula completa no sistema global.
- **Primary:** fundo Marfim de Papel, texto Carvão Editorial e padding confortável; muda para Cobre Suave no hover.
- **Hover / Focus:** transições lentas e limpas; foco visível usa contorno em Cobre Suave com afastamento.
- **Ghost:** fundo transparente, borda neutral discreta e texto marfim; borda e texto assumem Cobre Suave no hover.

### Cards / Containers

- **Corner Style:** mídia com raio sutil; conteúdo editorial geralmente não é encaixotado.
- **Background:** o canvas global permanece em Carvão Editorial; Sombra Quente pode apoiar imagens.
- **Shadow Strategy:** plana por padrão; ver a regra de elevação.
- **Border:** divisores finos com baixa opacidade.
- **Internal Padding:** guiado pela escala de 1rem, 1.5rem e 3rem.

### Inputs / Fields

- **Style:** campos transparentes, sem caixa, definidos por uma linha inferior delicada.
- **Focus:** a linha inferior assume Cobre Suave; o contorno global continua disponível para teclado.
- **Error / Disabled:** mensagens são textuais e anunciadas; botões desabilitados reduzem opacidade sem perder legibilidade.

### Navigation

A navegação usa JetBrains Mono em caixa alta, tracking amplo e escala compacta. Links revelam um sublinhado animado no hover. O cabeçalho se integra ao conteúdo com `mix-blend-difference`; no mobile, links secundários cedem espaço ao contato principal.

### Project Presentation

Projetos são apresentados como peças editoriais: imagem dominante, índice, metadados compactos, título expressivo e uma ação discreta. O movimento de entrada alterna direção e escala para construir ritmo sem transformar a galeria em carrossel ou grade genérica.

## Do's and Don'ts

### Do:

- **Do** use Cobre Suave para foco, hover, seleção e sinais pontuais.
- **Do** preserve o contraste entre serif editorial, sans funcional e mono técnica.
- **Do** mantenha espaço vertical generoso e larguras de leitura controladas.
- **Do** permita que cada case expresse a identidade visual real do projeto.
- **Do** forneça estados de foco visíveis e equivalentes sem movimento.
- **Do** use imagens de projetos como principal fonte de variedade visual.

### Don't:

- **Don't** transforme o portfólio em uma grade de cartões SaaS uniformes.
- **Don't** use sombras em contêineres globais apenas para criar separação.
- **Don't** espalhe o Cobre Suave por grandes superfícies ou por elementos sem ação.
- **Don't** aplique a paleta global sobre cases que possuem identidade própria.
- **Don't** use animações decorativas que atrasem, ocultem ou prejudiquem a leitura.
- **Don't** invente novos raios, fontes ou cores quando os tokens existentes resolvem o problema.
