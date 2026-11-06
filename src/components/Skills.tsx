import { useEffect, useRef } from "react";
import { useSplitText } from "@/hooks/use-split-text";
import { revealOnScroll } from "@/lib/animations";
import { getServices } from "@/data/services";
import { localizePath } from "@/i18n/locale";
import { useLocale, useTranslations } from "@/i18n/useTranslations";

/**
 * Serviços: texto serif grande com separadores entre as ofertas.
 */
export function Skills() {
	const locale = useLocale();
	const t = useTranslations();
	const services = getServices(locale);
	const sectionRef = useRef<HTMLElement | null>(null);
	const textRef = useSplitText<HTMLSpanElement>({ mode: "words" });

	useEffect(() => {
		revealOnScroll(textRef.current, { y: 30, duration: 1 });
	}, [textRef]);

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="section flex flex-col gap-12"
		>
			<p className="eyebrow">{t.servicesEyebrow}</p>

			<h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-bone leading-[1.2] text-balance max-w-7xl">
				{t.servicesHeadline}
			</h2>
			<p
				ref={textRef}
				className="font-display italic text-3xl md:text-5xl lg:text-6xl text-bone/85 leading-[1.2] text-balance max-w-7xl"
			>
				{services.map((service, index) => (
					<span key={service.path}>
						{index > 0 && " · "}
						<a href={localizePath(service.path, locale)} className="link-underline">
							{service.label}
						</a>
					</span>
				))}
			</p>
			<p className="max-w-2xl text-bone/80 text-lg leading-relaxed">
				{t.servicesDescription}
			</p>
			{locale === "pt-BR" && <p className="font-mono text-xs uppercase tracking-[0.12em] text-bone/70">
				📍 {t.localServiceIntro}{" "}
				<a href={localizePath("/criacao-de-sites-campinas/", locale)} className="text-bone link-underline">
					{t.campinasSites}
				</a>
			</p>}
		</section>
	);
}
