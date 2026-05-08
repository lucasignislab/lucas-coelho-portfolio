"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 80, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          fields,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-40 right-[-10%] text-[30vw] font-bold text-parchment/[0.012] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]">
        05
      </div>

      {/* Gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Headline */}
          <div>
            <div className="flex items-center gap-6 mb-10">
              <span className="text-sm text-ember tracking-[0.25em] uppercase font-medium">Contato</span>
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate/30 to-transparent" />
            </div>

            <h2
              ref={headlineRef}
              className="font-[family-name:var(--font-sora)] text-5xl md:text-7xl lg:text-8xl font-bold text-parchment leading-[1.05] tracking-tight mb-10"
            >
              Vamos<br />
              <span className="text-ember">conversar?</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate/60 leading-relaxed mb-12 max-w-md">
              {t("description")}
            </p>

            {/* Email CTA */}
            <a
              href="mailto:lucascoelho.cps@gmail.com"
              className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-bold text-parchment hover:text-ember transition-colors duration-500"
              data-cursor-hover
            >
              <span className="border-b-2 border-slate/20 group-hover:border-ember/50 transition-colors duration-500 pb-1">
                lucascoelho.cps@gmail.com
              </span>
              <ArrowUpRight size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Right - Form */}
          <div className="lg:pt-24">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="form-field">
                <label className="block text-xs text-slate/50 mb-3 uppercase tracking-[0.2em]">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-slate/15 text-parchment text-xl placeholder:text-slate/20 focus:border-ember focus:outline-none transition-colors duration-500"
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-field">
                <label className="block text-xs text-slate/50 mb-3 uppercase tracking-[0.2em]">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-slate/15 text-parchment text-xl placeholder:text-slate/20 focus:border-ember focus:outline-none transition-colors duration-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-field">
                <label className="block text-xs text-slate/50 mb-3 uppercase tracking-[0.2em]">
                  {t("form.message")}
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-slate/15 text-parchment text-xl placeholder:text-slate/20 focus:border-ember focus:outline-none transition-colors duration-500 resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>

              <div className="form-field pt-6">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-ember text-parchment font-semibold text-lg rounded-full hover:bg-ember/90 transition-all duration-500 disabled:opacity-70"
                  data-cursor-hover
                >
                  {isSubmitted ? (
                    <>
                      <Check size={20} />
                      {t("form.success")}
                    </>
                  ) : (
                    <>
                      <span>{t("form.submit")}</span>
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
