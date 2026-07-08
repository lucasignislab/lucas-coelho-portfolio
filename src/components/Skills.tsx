import { useEffect, useRef } from "react";
import { useSplitText } from "@/hooks/use-split-text";
import { revealChars, revealOnScroll } from "@/lib/animations";
import { skills } from "@/data/site";

/**
 * Skills — texto serif gigante com em-dashes separando skills.
 * DNA scalzo: "UI/UX — Mobile & Web Design — Branding ..."
 */
export function Skills() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const textRef = useSplitText<HTMLSpanElement>({ mode: "words" });

	useEffect(() => {
		revealOnScroll(textRef.current, { y: 30, duration: 1 });
	}, []);

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="section flex flex-col gap-12"
		>
			<p className="eyebrow">Skills ►</p>

			<h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-bone leading-[1.2] text-balance max-w-7xl">
				<span ref={textRef} className="font-display italic text-bone/85">
					{skills.join(" — ")}
				</span>
			</h2>
		</section>
	);
}
