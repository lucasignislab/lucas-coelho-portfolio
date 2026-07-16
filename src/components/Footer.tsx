import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocalTime } from "@/hooks/use-local-time";
import { useTilt } from "@/hooks/use-tilt";
import { contactEmail, socials } from "@/data/site";
import { revealCharsOnScroll, splitChars } from "@/lib/animations";

function ContactForm() {
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
		"idle"
	);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("sending");

		const form = event.currentTarget;
		const formData = new FormData(form);
		const body = new URLSearchParams();
		formData.forEach((value, key) => body.append(key, String(value)));

		try {
			const response = await fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: body.toString(),
			});

			if (!response.ok) throw new Error("Não foi possível enviar a mensagem.");
			form.reset();
			setStatus("success");
		} catch {
			setStatus("error");
		}
	}

	return (
		<form
			name="contato"
			method="POST"
			data-netlify="true"
			netlify-honeypot="bot-field"
			onSubmit={handleSubmit}
			className="contact-form"
		>
			<input type="hidden" name="form-name" value="contato" />
			<p className="hidden">
				<label>
					Não preencha este campo: <input name="bot-field" />
				</label>
			</p>

			<div className="contact-field">
				<label htmlFor="name">Nome</label>
				<input id="name" name="name" type="text" autoComplete="name" required />
			</div>

			<div className="contact-field">
				<label htmlFor="email">E-mail</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
				/>
			</div>

			<div className="contact-field">
				<label htmlFor="company">Empresa</label>
				<input
					id="company"
					name="company"
					type="text"
					autoComplete="organization"
				/>
			</div>

			<div className="contact-field">
				<label htmlFor="projectType">Tipo de projeto</label>
				<select id="projectType" name="projectType" defaultValue="" required>
					<option value="" disabled>
						Selecione uma opção
					</option>
					<option>Site institucional</option>
					<option>Landing page</option>
					<option>Produto digital / UX/UI</option>
					<option>Identidade e direção digital</option>
					<option>Outro</option>
				</select>
			</div>

			<div className="contact-field">
				<label htmlFor="budget">Faixa de investimento</label>
				<select id="budget" name="budget" defaultValue="">
					<option value="">Prefiro conversar primeiro</option>
					<option>Até R$ 5 mil</option>
					<option>R$ 5 mil – R$ 10 mil</option>
					<option>R$ 10 mil – R$ 20 mil</option>
					<option>Acima de R$ 20 mil</option>
				</select>
			</div>

			<div className="contact-field contact-field-full">
				<label htmlFor="message">Conte um pouco sobre o projeto</label>
				<textarea id="message" name="message" rows={5} required />
			</div>

			<div className="contact-form-footer">
				<p className="text-sm leading-relaxed text-ash">
					Normalmente respondo em até dois dias úteis.
				</p>
				<button
					type="submit"
					className="btn-primary"
					disabled={status === "sending"}
				>
					{status === "sending" ? "Enviando…" : "Enviar mensagem"}
				</button>
			</div>

			<p className="contact-status" aria-live="polite">
				{status === "success" &&
					"Mensagem enviada. Obrigado — entrarei em contato em breve."}
				{status === "error" && (
					<>
						Não foi possível enviar agora. Escreva para{" "}
						<a className="link-underline" href={`mailto:${contactEmail}`}>
							{contactEmail}
						</a>
						.
					</>
				)}
			</p>
		</form>
	);
}

/**
 * Footer scalzo:
 *  - Headline: "Vamos criar algo incrível juntos" (italic serif massivo)
 *  - Location
 *  - Formulário Netlify + alternativa por e-mail
 *  - Local time (live)
 *  - Socials + monograma + copyright (logo/ícone removido)
 *
 * Defesas contra o "bug grotesco de texto cortado":
 *  1. O split usa `splitChars`, que aplica o truque do
 *     `padding-bottom + margin-bottom -0.22em` no `inner` para que
 *     o `overflow:hidden` NAO corte os descendentes ('g','p','q','y','j').
 *  2. O h2 tem line-height folgado (1.15) + padding-bottom (0.4em)
 *     para acomodar fontes serif com descendentes altos.
 *  3. `overflow-visible` em h2 + footer para nenhum pai cortar nada.
 *  4. Por seguranca, o split roda dentro do useEffect com setTimeout
 *     duplo para garantir que o DOM ja foi medido.
 */
export function Footer() {
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useTilt<HTMLAnchorElement>({ max: 8, speed: 400, scale: 1.03 });
	const time = useLocalTime();

	useEffect(() => {
		const el = titleRef.current;
		if (!el) return;

		// Splita em chars com clip seguro para descendentes.
		const chars = splitChars(el, { className: "ft-char", mode: "chars" });

		// Reveal on scroll (stagger suave, scalzo-style).
		revealCharsOnScroll(chars, {
			stagger: 0.025,
			duration: 1,
		});
	}, []);

	return (
		<footer
			id="contact"
			className="section flex flex-col gap-12 md:gap-20"
			style={{ overflow: "visible" }}
		>
			{/* Title — line-height e pb generosos para descendentes */}
			<h2
				ref={titleRef}
				className="font-display italic font-light text-bone text-balance max-w-[90rem]"
				style={{
					lineHeight: 1.15,
					fontSize: "clamp(2rem, 5vw, 4rem)",
					paddingBottom: "0.4em",
					overflow: "visible",
				}}
			>
				Vamos criar algo incrível juntos.
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
				<div className="lg:col-span-4 flex flex-col gap-8">
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">
						Baseado no Brasil — trabalhando remotamente com clientes de
						qualquer lugar
					</p>

					<a
						ref={ctaRef}
						href={`mailto:${contactEmail}`}
						data-cursor-hover
						className="group inline-flex items-center gap-3 text-xl md:text-2xl font-display text-bone hover:text-ember transition-colors duration-500 will-change-transform"
					>
						<span className="font-display italic">→</span>
						<span className="link-underline">Prefere e-mail?</span>
					</a>
				</div>
				<div className="lg:col-span-8">
					<ContactForm />
				</div>
			</div>

			{/* Local time */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-bone/10">
				<div className="flex items-baseline gap-3 font-mono text-sm uppercase tracking-[0.2em] text-ash">
					<span>Hora local ►</span>
					<span className="text-bone font-medium text-2xl tracking-tight font-display">
						{time.h}
						<span className="animate-pulse-slow">:</span>
						{time.m}{" "}
						<span className="text-ash text-sm ml-1">{time.ampm}</span>
					</span>
				</div>

				{/* Socials */}
				<ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
					{socials.map((s) => (
						<li key={s.name}>
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								data-cursor-hover
								className="font-mono text-xs uppercase tracking-[0.2em] text-bone link-underline"
							>
								{s.name}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Bottom: monograma + copyright (sem logo) */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-bone/10">
				<span className="font-mono text-xs uppercase tracking-[0.2em] text-bone">
					LC
				</span>

				<p className="font-mono text-xs uppercase tracking-[0.2em] text-ash text-right">
					<span className="block">© {new Date().getFullYear()} Lucas Coelho.</span>
					<span className="block">Feito com amor por mim.</span>
				</p>
			</div>
		</footer>
	);
}
