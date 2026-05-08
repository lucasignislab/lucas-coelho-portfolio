# Análise de UI/Design System — shader.se

Fonte analisada: `https://www.shader.se/` (home) e stylesheet principal compilado.

## 1) Key Visual

- Direção visual premium-tech com forte foco em contraste alto (base escura + tipografia clara).
- Estética editorial + laboratório criativo: tom institucional, mas com linguagem experimental em 3D/AI.
- Hero orientado a statement de posicionamento ("Creative Development Studio...") com narrativa de autoridade.
- Portfolio como prova social central, apresentado em formato de carrossel com ênfase em movimento/descoberta.
- Sensação geral: minimalismo estrutural com riqueza de mídia (vídeo/3D), priorizando impacto e credibilidade.

## 2) Lógica de Cor

- Estrutura cromática majoritariamente monocromática: preto/cinza profundo + off-white quente.
- Token base detectado no CSS:
  - `--background: #0a0a0a` (modo dark por preferência do sistema).
  - `--foreground: #fcf9f3`.
  - fallback claro em root: `--background: #fff`.
- Uso recorrente de branco com opacidade para camadas e estados:
  - `#ffffff1a` (10%), `#fff3` (20%), `#ffffff80` (50%), `#ffffffb3` (70%), `#ffffffe6` (90%).
- Cor de destaque secundária para estados técnicos/a11y/debug:
  - azul (`#3b82f6`, `#60a5fa`, `#93c5fd`) e vermelho (`#ef4444` com alpha) em bordas/realces.
- Princípio: cor não é decorativa; ela organiza contraste, legibilidade e estados de interação.

## 3) Ritmo de Layout

- Organização vertical clara em blocos longos: Hero -> Selected Work -> manifesto/serviços -> contato.
- Alternância de momentos:
  - bloco de impacto (headline curta),
  - bloco de exploração (carrossel/projetos),
  - blocos densos de narrativa (parágrafos institucionais),
  - fechamento transacional (CTA e contato).
- Grid e espaçamento seguem escala utilitária (Tailwind), com paddings consistentes (`p-4`, `px-4`, `py-2`) e breakpoints padrão.
- Ritmo de leitura pensado para scroll: seções com títulos objetivos e texto em blocos mais longos para reforçar posicionamento.
- Camadas fixas/absolutas e z-index altos sugerem sobreposição controlada para elementos de navegação/experiência.

## 4) Componentes (macro e UI)

- Navegação principal simples (`Home`, `Selected Work`) e orientação por scroll.
- Hero textual com headline de alta prioridade sem ruído visual excessivo.
- Carrossel de projetos (anterior/próximo + CTA "View project").
- CTA primário de negócio: `Book a Call Today`.
- Blocos de contato estruturados por tipo:
  - geral (`hello@shader.se`),
  - redes sociais,
  - novo negócio (contato do CEO),
  - endereço físico.
- Footer institucional com link de acessibilidade (sinal de maturidade de produto).
- Padrões de suporte a acessibilidade visíveis no CSS:
  - skip link (`a11y-skip-to-content`),
  - foco destacado,
  - contraste forte em elementos interativos.

## 5) Tokens (extraídos/inferidos)

### 5.1 Cor

- `--background`: `#fff` (base), dark mode `#0a0a0a`.
- `--foreground`: `#fcf9f3`.
- Semânticos utilitários observados:
  - `text-white`, `text-white/40`, `text-white/50`, `text-white/70`, `text-white/90`.
  - `bg-black`, `bg-black/50`, `bg-black/90`, `bg-white/10`.
  - `border-white/10`, `border-white/20`.

### 5.2 Tipografia

- Família de destaque detectada: `STIX Two Text` (com fallback definido).
- Token de fonte custom: `--font-stix`.
- Fonte padrão de sistema permanece disponível para UI utilitária (`ui-sans-serif`, `system-ui`, etc).

### 5.3 Espaçamento e dimensionamento

- Escala utilitária de spacing em múltiplos de 4px/8px (ex.: `gap-2`, `p-4`, `px-3`, `py-1.5`).
- Larguras utilitárias fixas para elementos de controle (`w-[60px]`, `w-[120px]`, `w-[140px]`, `w-[360px]`).
- Tokens de viewport customizados:
  - `--vh`, `--vw`, `--page-height`, `--page-width`.

### 5.4 Efeitos visuais

- Uso de `backdrop-blur` e overlays translúcidos para camadas.
- Estados de hover discretos via alpha (`hover:bg-white/5`, `hover:bg-white/20`).
- Pipeline de filtros disponível (blur, grayscale, invert), sugerindo suporte a transições visuais ricas.

### 5.5 Responsividade

- Breakpoints padrão de Tailwind identificados: `640`, `768`, `1024`, `1280`, `1536`.
- Containers e escalas utilitárias indicam abordagem mobile-first.

## 6) Hierarquia Tipográfica (inferência prática)

Como o CSS está compilado e utilitário, a hierarquia abaixo é inferida pela estrutura de conteúdo e padrões observados:

- Nível 1 (Display/Hero):
  - headline institucional de posicionamento.
  - função: comunicar proposta de valor em uma frase.
- Nível 2 (Section Titles):
  - `Selected Work`, `Contact`.
  - função: ancorar o scroll em macro-seções.
- Nível 3 (Card/Project Titles):
  - nome de projeto + subtítulo de categoria (ex.: showroom, configurator, website).
  - função: escaneabilidade de portfólio.
- Nível 4 (Body Copy):
  - parágrafos longos de narrativa comercial e técnica.
  - função: aprofundar confiança e contexto.
- Nível 5 (Meta/Utility):
  - links utilitários, labels de contato, itens de navegação.
  - função: suporte e ação rápida.

## 7) Leitura Sintética (direção de design)

- Sistema visual orientado a marca: menos "UI app", mais "experiência editorial interativa".
- Tokens simples e robustos, com foco em contraste e legibilidade para mídia rica.
- Arquitetura de conteúdo voltada à conversão B2B: prova de capacidade (work) + CTA comercial direto.
- Base técnica preparada para experiências com movimento, sobreposição e storytelling em 3D.
