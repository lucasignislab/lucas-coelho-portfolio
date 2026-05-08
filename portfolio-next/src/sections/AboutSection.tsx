"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline with mask reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".mask-line");
        lines.forEach((line, i) => {
          gsap.fromTo(
            line,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              delay: i * 0.15,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Body paragraphs with fade + blur
      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll("p");
        gsap.fromTo(
          paras,
          { opacity: 0, y: 50, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image parallax
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { y: 100, scale: 0.95 },
          {
            y: -50,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Stats counter
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const stats = [
    { value: "10+", label: t("stats_years") },
    { value: "50+", label: t("stats_projects") },
    { value: "30+", label: t("stats_clients") },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden bg-void"
    >
      {/* Background number */}
      <div className="absolute top-32 right-[-5%] text-[30vw] font-bold text-parchment/[0.015] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]">
        01
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-20">
          <span className="text-sm text-ember tracking-[0.25em] uppercase font-medium">{t("subtitle")}</span>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate/30 to-transparent" />
        </div>

        {/* Massive headline with mask reveal */}
        <div ref={headlineRef} className="mb-24 md:mb-32">
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-parchment leading-[1.05] tracking-tight max-w-6xl">
            <span className="mask-line block">Transformando</span>
            <span className="mask-line block">ideias em</span>
            <span className="mask-line block text-ember">experiências</span>
            <span className="mask-line block text-ember">digitais.</span>
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Body text */}
          <div ref={bodyRef} className="space-y-8 lg:pt-12">
            <p className="text-xl md:text-2xl text-slate/80 leading-relaxed">
              {t("p1")}
            </p>
            <p className="text-xl md:text-2xl text-slate/80 leading-relaxed">
              {t("p2")}
            </p>
            <p className="text-xl md:text-2xl text-terracotta leading-relaxed">
              {t("p3")}
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-slate/10">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <div className="text-4xl md:text-5xl font-bold text-parchment font-[family-name:var(--font-sora)]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-slate/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image with parallax */}
          <div ref={imageContainerRef} className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate/10 to-terracotta/5 border border-slate/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ember/10 to-terracotta/10 border border-ember/15 flex items-center justify-center">
                  <span className="text-5xl font-bold text-parchment/20 font-[family-name:var(--font-sora)]">LC</span>
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-ember/20" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-ember/20" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-ember/5 border border-ember/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
