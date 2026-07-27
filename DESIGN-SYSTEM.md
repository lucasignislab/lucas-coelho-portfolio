# Lucas Coelho — Design System

> Documentação viva do design system do portfólio editorial `lucas-coelho-portfolio`.
> Inspiração direta do estilo **Scalzo / Tonal Studios**: serif gigante, justificação editorial, mono como metadado e motion controlado por GSAP.

---

## 1. Filosofia

| Princípio | Descrição |
| --- | --- |
| **Editorial first** | Tipografia conduz a hierarquia; o grid é simples, o ritmo é denso. |
| **Dark by default** | Tema escuro permanente. Nada de toggle de tema. |
| **Tons quentes sobre preto** | Paleta terrosa (ember / blush / bone) sobre `ink` e `smoke`. |
| **Motion com intenção** | Cada animação existe para guiar o olhar. Nada decorativo. |
| **Char-by-char** | Headlines são desmontadas e remontadas por GSAP — nada de fade genérico. |
| **Mono como metadado** | Labels, datas, tipos e tags usam `JetBrains Mono` em uppercase tracking amplo. |

---

## 2. Stack

| Camada | Ferramenta |
| --- | --- |
| Build | Vite + TypeScript |
| Estilo | Tailwind CSS + `@layer` components em `src/index.css` |
| Animações | GSAP + ScrollTrigger + Lenis (smooth scroll) |
| UI util | `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` |
| Efeitos 3D | `vanilla-tilt` |
| Page transition | `@barba/core` (preparado no `package.json`) |
| Ícones | `lucide-react` |
| Helpers | `@/lib/utils` (`cn`), `@/lib/animations` |

> O projeto `portfolio-next/` (irmão) usa o **mesmo DNA visual** mas com tokens CSS variables + Tailwind v4 — ver seção 10.

---

## 3. Tokens de Design

### 3.1 Cores

Tokens semânticos definidos em `tailwind.config.ts → theme.extend.colors`.

#### Paleta principal

| Token | Hex | HSL equivalente | Uso |
| --- | --- | --- | --- |
| `ink` | `#212121` | `hsl(0, 0%, 13%)` | Background principal, texto de botão claro |
| `smoke` | `#1A1717` | `hsl(0, 6%, 10%)` | Background secundário, scrollbar, image-reveal |
| `bone` | `#F4F1ED` | `hsl(34, 25%, 94%)` | Texto padrão, CTA primary fill |
| `ash` | `#827F7E` | `hsl(15, 2%, 50%)` | Eyebrows, tags, scrollbar hover |
| `ember` | `#E28868` | `hsl(15, 68%, 65%)` | Seleção de texto, hover de CTA, accent |

#### Utilitários

| Token | Hex | HSL equivalente | Uso |
| --- | --- | --- | --- |
| `white` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Texto puro (raro) |
| `black` | `#000000` | `hsl(0, 0%, 0%)` | Contraste máximo |
| `blush` | `#F2C8CC` | `hsl(345, 62%, 87%)` | Reservado para destaques suaves |

#### Bordas e overlays

| Token | Valor | Uso |
| --- | --- | --- |
| `border-faint` | `rgba(130, 127, 126, 0.1)` | Divisores de seção (`.divider`) |
| `border-ghost` | `rgba(130, 127, 126, 0.4)` | Botão ghost `.btn-ghost` |
| `noise-opacity` | `0.3` com `mix-blend-mode: overlay` | `.image-reveal::before` |

#### Backgrounds compostos

| Classe | Definição |
| --- | --- |
| `bg-gradient-radial` | Gradiente radial utilitário (declarado em `tailwind.config.ts`) |
| `bg-grain` | Textura de ruído base |

### 3.2 Tipografia

Fontes carregadas no `<head>` do `index.html` e expostas como utilitários Tailwind.

| Família | Utilitário CSS | Fallback | Uso |
| --- | --- | --- | --- |
| `Instrument Serif` | `font-display` | `Georgia, serif` | Headlines, títulos serif gigantes, itálico editorial |
| `Inter` | `font-sans` | `system-ui, -apple-system, sans-serif` | Corpo de texto, parágrafos, botões |
| `JetBrains Mono` | `font-mono` | `ui-monospace, monospace` | Eyebrows, tags, metadados, data/hora local |

#### Tamanhos

| Token | Valor | Uso |
| --- | --- | --- |
| `text-mega` | `clamp(4rem, 14vw, 16rem)` | Números / palavras gigantes decorativas |
| `text-huge` | `clamp(2.5rem, 8vw, 8rem)` | Headlines principais de seção |

Tamanhos padrão do Tailwind são usados para o restante (`text-sm`, `text-base`, `text-lg`, etc.).

#### Letter-spacing

| Token | Valor | Uso |
| --- | --- | --- |
| `tracking-tightest` | `-0.06em` | Headlines condensados |
| `tracking-ultratight` | `-0.04em` | Display `.display` (line-height `0.85`) |

#### Pesos / line-heights de referência

| Componente | line-height |
| --- | --- |
| `.display` | `0.85` (apertado, editorial) |
| `.text-block` | `1.4` |
| `body` | default Inter |

#### Tratamento de descendentes (split text)

Para que letras como `g`, `p`, `y` não sejam cortadas pelo `overflow:hidden` durante a animação char-by-char, aplica-se:

```css
.split-char,
.split-word {
  display: inline-block;
  overflow: hidden;
  line-height: inherit;
  padding-bottom: 0.22em;
  margin-bottom: -0.22em;
  will-change: transform, opacity;
}
```

> O `padding-bottom` empurra a área visível para baixo; o `margin-bottom: -0.22em` compensa exatamente, mantendo o `line-height` visual intacto.

### 3.3 Espaçamento

| Breakpoint | `.section` padding |
| --- | --- |
| base | `6rem 1.5rem` |
| `≥ 768px` | `8rem 3rem` |
| `≥ 1024px` | `8rem 5rem` |

Gaps mais usados nos componentes:

| Valor | Onde |
| --- | --- |
| `gap-3` (0.75rem) | Header (logo ↔ nav) |
| `gap-4` (1rem) | Footer socials |
| `gap-6` (1.5rem) | Selected work cards |

Container do Tailwind:

```ts
container: {
  center: true,
  padding: '2rem',
  screens: { '2xl': '1400px' },
}
```

### 3.4 Radius

| Forma | Uso |
| --- | --- |
| `rounded-full` (`9999px`) | `.btn-primary`, `.btn-ghost` (pílulas) |
| `rounded-sm` / `rounded-md` | Cards de projeto |
| sem radius | `Header`, `Footer`, divisores |

### 3.5 Sombras

O design system **não utiliza `box-shadow`** tradicional. Profundidade é construída com:

- Bordas sutis (`border: 1px solid rgba(ash, 0.1–0.4)`).
- Camada de ruído sobre imagens (`.image-reveal::before`).
- `mix-blend-mode: difference` no cursor e no header.

### 3.6 Animações CSS

Declaradas em `tailwind.config.ts`.

| Keyframe | Definição |
| --- | --- |
| `fade-up` | `0% { opacity: 0; transform: translateY(40px); } → 100% { opacity: 1; transform: translateY(0); }` |
| `marquee` | `translateX(0) → translateX(-50%)` (loop contínuo) |
| `pulse-slow` | `opacity 1 → 0.4 → 1` em 4s |

| Animação Tailwind | Duração / easing |
| --- | --- |
| `animate-fade-up` | `0.8s cubic-bezier(0.23, 1, 0.32, 1) both` |
| `animate-marquee` | `40s linear infinite` |
| `animate-pulse-slow` | `4s cubic-bezier(0.4, 0, 0.6, 1) infinite` |

#### Utilitários CSS

| Classe | Comportamento |
| --- | --- |
| `.hover-lift` | `transition: transform 0.5s ease-out; :hover { translateY(-4px) }` |
| `.text-balance` | `text-wrap: balance;` |

---

## 4. Componentes base (`@layer components`)

Todas as classes utilitárias vivem em [src/index.css](src/index.css).

### 4.1 `.section`

```css
.section { padding: 6rem 1.5rem; }
@media (min-width: 768px)  { .section { padding: 8rem 3rem; } }
@media (min-width: 1024px) { .section { padding: 8rem 5rem; } }
```

Aplicada em **toda seção** (`Hero`, `About`, `SelectedWork`, `Skills`, `Footer`).

### 4.2 `.display`

Serif gigante, line-height `0.85`, color `bone`, tracking `-0.04em`.

```html
<h1 class="display text-huge">Lucas Coelho</h1>
```

### 4.3 `.eyebrow`

Label mono acima de títulos e seções.

```html
<span class="eyebrow">(01) — Sobre</span>
```

| Propriedade | Valor |
| --- | --- |
| `font-family` | JetBrains Mono |
| `font-size` | `0.75rem` |
| `text-transform` | `uppercase` |
| `letter-spacing` | `0.25em` |
| `color` | `ash` |

### 4.4 `.tag`

Variante mais "densa" do eyebrow.

```html
<span class="tag">2024 — Dashboard / SaaS</span>
```

| Propriedade | Valor |
| --- | --- |
| `letter-spacing` | `0.15em` |
| `color` | `ash` |

### 4.5 `.text-block` / `.text-justify-uppercase`

Texto de parágrafo editorial: justificado, hyphenation, indent de 4ch.

```css
text-align: justify;
text-indent: 4ch;
text-transform: uppercase;
hyphens: auto;
line-height: 1.4;
```

### 4.6 `.split-char` / `.split-word`

Spans internos usados pelo `splitChars` (lib `animations.ts`) e pelo hook `useSplitText`.

Estrutura final por token:

```html
<el>                            <!-- parent, sem overflow -->
  <wrap style="display:inline-block; line-height:inherit">
    <inner class="split-char">  <!-- overflow:hidden, padding-bottom:0.22em -->
      T
    </inner>
  </wrap>
  …
</el>
```

### 4.7 `.magnetic`

Wrapper para elementos que devem "puxar" o cursor (`makeMagnetic` da lib).

```css
.magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-out;
}
```

### 4.8 `.link-underline`

Sublinhado animado da direita para a esquerda, reverso no hover.

```css
.link-underline::after {
  position: absolute; left: 0; bottom: -4px;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease-out;
}
.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### 4.9 `.btn-primary`

CTA sólido (pílula).

| Estado | Visual |
| --- | --- |
| default | `bg-bone`, `text-ink` |
| hover | `bg-ember` |

```html
<a class="btn-primary">
  Vamos conversar
  <span aria-hidden>↗</span>
</a>
```

### 4.10 `.btn-ghost`

CTA outline.

| Estado | Visual |
| --- | --- |
| default | borda `rgba(ash, 0.4)`, texto `bone` |
| hover | borda `ember`, texto `ember` |

### 4.11 `.image-reveal`

Container para imagens com overlay de ruído fractal SVG inline.

```css
.image-reveal {
  position: relative;
  overflow: hidden;
  background-color: #1A1717;
}
.image-reveal::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,…fractalNoise…");
  opacity: 0.3;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### 4.12 `.divider`

Linha horizontal de 1px em `rgba(ash, 0.1)`.

### 4.13 `.loading-screen`

Tela cheia com z-index `10000` e fundo `ink`.

---

## 5. Padrões de composição

### 5.1 Seção editorial

```html
<section class="section">
  <span class="eyebrow">(01) — Sobre</span>
  <h2 class="display text-huge text-balance">
    Designer focado em produto
  </h2>
  <p class="text-block max-w-3xl">
    Texto justificado…
  </p>
</section>
```

### 5.2 Headline com split-char

```tsx
const ref = useSplitText<HTMLHeadingElement>({ mode: "chars" });

useEffect(() => {
  if (!ref.current) return;
  const chars = ref.current.querySelectorAll<HTMLElement>(".split-char");
  revealCharsOnScroll(chars, { stagger: 0.02 });
}, []);
```

### 5.3 Card de projeto

```html
<article class="group">
  <div class="image-reveal rounded-md overflow-hidden">
    <img src={project.image} class="transition-transform duration-700 group-hover:scale-105" />
  </div>
  <div class="mt-6 border-t border-ash/10 pt-4">
    <h3 class="display text-3xl italic">{project.name}</h3>
    <p class="tag mt-1">{project.type} — {project.year}</p>
  </div>
</article>
```

### 5.4 Link com sublinhado

```html
<a href={url} class="link-underline">{label}</a>
```

### 5.5 Botão magnético

```tsx
const ref = useRef<HTMLButtonElement>(null);
useEffect(() => makeMagnetic(ref.current, 0.3), []);
return <button ref={ref} class="btn-primary">CTA</button>;
```

---

## 6. Animações & Interações (`src/lib/animations.ts`)

Helpers GSAP exportados. **GSAP + ScrollTrigger são registrados no topo do módulo.**

| Função | Descrição | Padrão |
| --- | --- | --- |
| `splitChars(el, { mode })` | Quebra texto em `chars`/`words`, retorna `HTMLElement[]` | `chars` |
| `revealChars(container, opts)` | GSAP `fromTo` em `.split-char` com `yPercent 100→0` | stagger `0.02`, duration `0.8`, ease `power4.out` |
| `revealWords(container, opts)` | Mesmo que `revealChars` mas em `.split-word` | stagger `0.04`, ease `power3.out` |
| `revealOnScroll(el, opts)` | Fade-up genérico com ScrollTrigger | start `top 80%`, ease `power3.out` |
| `revealStagger(container, selector, opts)` | Stagger de múltiplos filhos no scroll | stagger `0.1` |
| `revealCharsOnScroll(chars, opts)` | Reveal char-by-char no scroll | stagger `0.025`, ease `power4.out` |
| `parallaxImage(container, { strength })` | Parallax vertical em `<img>` com scrub | strength `0.1` |
| `makeMagnetic(el, strength)` | Atrai elemento ao cursor (GSAP) | strength `0.3`, ease `elastic.out(1, 0.5)` no leave |
| `refreshScrollTrigger()` | `ScrollTrigger.refresh()` para re-layouts | — |

### Easing house-style

| Easing | Quando |
| --- | --- |
| `power4.out` | Reveal de headlines (snappy final) |
| `power3.out` | Reveal de blocos, stagger de cards |
| `elastic.out(1, 0.5)` | Botões magnéticos voltando ao centro |
| `cubic-bezier(0.23, 1, 0.32, 1)` | Animações CSS `fade-up` |
| `none` | Parallax com scrub |

### Hooks auxiliares

| Hook | Arquivo | Função |
| --- | --- | --- |
| `useSplitText` | [src/hooks/use-split-text.ts](src/hooks/use-split-text.ts) | Versão React de `splitChars`, retorna `ref` |
| `useTilt` | [src/hooks/use-tilt.ts](src/hooks/use-tilt.ts) | Wrapper de `vanilla-tilt` (max `8`, scale `1.02`) |
| `useLoading` | [src/hooks/use-loading.ts](src/hooks/use-loading.ts) | Controla ciclo do `Loading.tsx` |
| `useMousePosition` | [src/hooks/use-mouse-position.ts](src/hooks/use-mouse-position.ts) | Coordenadas para cursor custom |
| `useLocalTime` | [src/hooks/use-local-time.ts](src/hooks/use-local-time.ts) | Relógio do footer |

---

## 7. Componentes principais

### 7.1 `Header`

- Fixed top, flex entre baseline (logo mono) e nav.
- `font-mono`, `text-bone`, `mix-blend-difference` no container.
- `pointer-events-none` no wrapper, `pointer-events-auto` nos itens clicáveis.
- Logo magnético (`makeMagnetic`).

### 7.2 `Hero`

- `min-h-screen`, eyebrow + bio justificada + título `display` em duas linhas.
- Socials centralizados com `link-underline`.
- Anima: `revealChars` no eyebrow, `gsap.fromTo` no título, `revealStagger` nos socials.

### 7.3 `About`

- Eyebrow + parágrafo largo justificado.
- Portrait com `.image-reveal` + `parallaxImage`.

### 7.4 `SelectedWork`

- Grid `lg:grid-cols-2`.
- Cards com `.image-reveal`, hover scale no `<img>`, bloco de info com borda superior.

### 7.5 `Skills`

- Eyebrow + headline `display` com `text-balance`.
- Lista de skills em uma única linha separadas por ` — `.

### 7.6 `Footer`

- Headline serif gigante (`splitChars` + `revealCharsOnScroll`).
- Localização, CTA magnético (`useTilt`), local time (`useLocalTime`), socials, copyright.

### 7.7 `Cursor`

- SVG triangular com `mix-blend-difference`.
- `pointer-events-none`.
- Detecta `a, button, [data-cursor-hover], input, textarea, label` para escalar.
- **Desativado** em `pointer: coarse` (mobile).

### 7.8 `Loading`

- Tela cheia com fundo `ink`, z-index `10000`.
- Progresso nas duas laterais, slide-up GSAP ou fallback CSS.

### 7.9 `SmoothScroll`

- Inicializa `Lenis` e sincroniza com `gsap.ticker`.
- Aplica classes `.lenis`, `.lenis-smooth`, `.lenis-stopped`.

---

## 8. Helpers (`src/lib/utils.ts`)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Uso padrão para merge de classes Tailwind sem conflito:

```tsx
<div className={cn("base-class", isActive && "active-class", className)} />
```

---

## 9. Dados (`src/data/`)

### 9.1 `site.ts`

| Constante | Tipo | Conteúdo |
| --- | --- | --- |
| `skills` | `string[]` | `UX/UI`, `Web Design`, `Product Design`, `Figma`, `Design Systems` |
| `socials` | `{ name, url }[]` | LinkedIn, Behance, GitHub |
| `navItems` | `{ label, href }[]` | Work, Sobre, Skills, Contato |

### 9.2 `projects.ts`

```ts
export interface Project {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  year: string;
  url: string;
  image: string;
}
```

Cinco projetos cadastrados: `aero`, `nova-era`, `fitsyou`, `pogne`, `hub`.

---

## 10. Versão Next.js (`portfolio-next/`)

Projeto irmão com **mesmo DNA visual**, infra diferente.

### 10.1 Stack

- Next.js App Router + i18n (`messages/{pt,en,es,de}.json`).
- Tailwind v4 com `@theme inline` + `@custom-variant dark`.
- Animações: GSAP + Framer Motion + Lenis (`tw-animate-css`).

### 10.2 Brand colors

| Token | Hex | HSL |
| --- | --- | --- |
| `void` | `#191E23` | `hsl(209, 5%, 12%)` |
| `slate` | `#5A838F` | `hsl(193, 23%, 46%)` |
| `parchment` | `#F0EDDC` | `hsl(50, 40%, 90%)` |
| `terracotta` | `#C6A498` | `hsl(16, 29%, 69%)` |
| `ember` | `#E85C2D` | `hsl(15, 80%, 54%)` |

### 10.3 Radius scale

```css
--radius-sm … --radius-4xl
--radius: 0.625rem
```

### 10.4 Componentes paralelos

| Componente | Função |
| --- | --- |
| `src/components/ui/button.tsx` | Variantes `default / outline / secondary / ghost / destructive / link`, sizes `xs / sm / default / lg / icon*` |
| `src/components/MagneticButton.tsx` | CTA magnético reutilizável |
| `src/components/NoiseOverlay.tsx` | Overlay de ruído global |
| `src/components/FluidBackground.tsx` | Background fluido animado |
| `src/components/providers/SmoothScrollProvider.tsx` | Wrapper de Lenis |

---

## 11. Guidelines de uso

### 11.1 Faça

- Use `font-display` para títulos, `font-sans` para corpo, `font-mono` para metadados.
- Aplique `.eyebrow` antes de qualquer headline de seção.
- Quebre headlines com `useSplitText` (modo `chars` para títulos curtos, `words` para longos).
- Use `.btn-primary` como CTA principal e `.btn-ghost` como secundário.
- Cubra imagens com `.image-reveal` para o tratamento de ruído.
- Use `cn()` para merge de classes, nunca concatenar strings com espaços.

### 11.2 Não faça

- ❌ Não usar `box-shadow` — profundidade vem de bordas, ruído e blend modes.
- ❌ Não usar fontes fora das três famílias definidas.
- ❌ Não aplicar `text-center` em parágrafos editoriais — eles são justificados.
- ❌ Não criar variantes de botão fora do par `primary` / `ghost`.
- ❌ Não usar animações decorativas — todo movimento deve guiar leitura ou hierarquia.
- ❌ Não criar toggles de tema — o projeto é dark permanente.
- ❌ Não cortar `overflow:hidden` no `wrap` do split text — descendentes somem.

### 11.3 Acessibilidade

- `prefers-reduced-motion` deve ser respeitado (animações GSAP devem checar).
- Cursor custom é desativado em `pointer: coarse`.
- `::selection` com contraste invertido (`ember` sobre `ink`).
- `aria-label` em ícones e CTAs sem texto visível.
- Foco visível preservado (não removido de botões/links).

---

## 12. Estrutura de arquivos

```
src/
├── components/
│   ├── About.tsx
│   ├── Cursor.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Loading.tsx
│   ├── SelectedWork.tsx
│   ├── Skills.tsx
│   └── SmoothScroll.tsx
├── data/
│   ├── projects.ts
│   └── site.ts
├── hooks/
│   ├── use-loading.ts
│   ├── use-local-time.ts
│   ├── use-mouse-position.ts
│   ├── use-split-text.ts
│   └── use-tilt.ts
├── lib/
│   ├── animations.ts        # helpers GSAP
│   └── utils.ts             # cn()
├── pages/                   # rotas/páginas adicionais
├── App.tsx
├── index.css                # design system CSS (este doc)
└── main.tsx
```

---

## 13. Referências

- [tailwind.config.ts](tailwind.config.ts)
- [src/index.css](src/index.css)
- [src/lib/animations.ts](src/lib/animations.ts)
- [src/hooks/use-split-text.ts](src/hooks/use-split-text.ts)
- [src/hooks/use-tilt.ts](src/hooks/use-tilt.ts)
- [components.json](components.json)
- [package.json](package.json)
- `portfolio-next/src/app/globals.css` — design system paralelo (Next.js)