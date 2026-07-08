import { useEffect, useRef } from "react";

type SplitMode = "chars" | "words" | "lines";

interface SplitTextOptions {
	mode?: SplitMode;
	className?: string;
}

/**
 * Hook que divide o conteúdo textual de um elemento em
 * spans (.split-char ou .split-word) para animações char-by-char.
 *
 * Substitui o uso de Splitting.js vanilla para integração React.
 *
 * Estrutura final por token:
 *   <el> (parent, no overflow:hidden, only display:inline-block)
 *     <wrap>  (display:inline-block, line-height:inherit) <-- sem clip
 *       <inner .split-char|.split-word> (display:inline-block, overflow:hidden,
 *                                       line-height:inherit, padding-bottom:0.22em,
 *                                       margin-bottom:-0.22em)
 *         TEXT
 *       </inner>
 *     </wrap>
 *   </el>
 *
 * Por que padding-bottom + margin-bottom -0.22em no `inner`:
 *   - line-height do .display e 0.85 (editorial bem apertado).
 *   - Sem o padding, o overflow:hidden do `inner` come os descendentes
 *     de letras como 'g', 'p', 'y'.
 *   - O padding empurra a area visivel para baixo e o margin negativo
 *     compensa exatamente o mesmo valor, mantendo o line-height visual.
 *   - O `wrap` nao tem overflow:hidden para o `inner` poder crescer
 *     verticalmente sem cortar os descendentes.
 */
export function useSplitText<T extends HTMLElement = HTMLElement>(
	options: SplitTextOptions = {}
) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const mode: SplitMode = options.mode ?? "chars";
		const className = options.className ?? (mode === "words" ? "split-word" : "split-char");

		// Pega o texto direto (sem HTML) e quebra por char/word
		const text = el.textContent ?? "";
		const tokens: string[] =
			mode === "words"
				? text.split(/(\s+)/) // mantém espaços
				: Array.from(text);

		el.innerHTML = "";
		el.style.display = "inline-block";
		// Sem overflow:hidden aqui: o pai nao deve cortar descendentes.
		// O clip so ocorre no `inner` (abaixo), onde a animacao translateY
		// acontece — precisa dele para esconder o offset inicial.

		tokens.forEach((token) => {
			if (mode === "words" && /^\s+$/.test(token)) {
				el.appendChild(document.createTextNode(token));
				return;
			}

			const wrap = document.createElement("span");
			wrap.style.display = "inline-block";
			wrap.style.lineHeight = "inherit";
			// Sem overflow:hidden no wrap — deixa o inner crescer
			// verticalmente para acomodar descendentes.

			const inner = document.createElement("span");
			inner.className = className;
			inner.style.display = "inline-block";
			inner.style.overflow = "hidden";
			inner.style.lineHeight = "inherit";
			// Padding-bottom + margin-bottom negativo: espaco para
			// descendentes ('g', 'p', 'y') dentro do clip do inner,
			// sem alterar o line-height visual do titulo.
			inner.style.paddingBottom = "0.22em";
			inner.style.marginBottom = "-0.22em";
			inner.style.willChange = "transform, opacity";
			inner.textContent =
				mode === "words" ? token : token === " " ? "\u00A0" : token;

			wrap.appendChild(inner);
			el.appendChild(wrap);
		});
	}, [options.mode, options.className]);

	return ref;
}
