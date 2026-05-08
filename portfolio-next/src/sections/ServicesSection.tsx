"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Search, Layers, Globe, Component } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons = [Search, Layers, Globe, Component];
const serviceKeys = ["uxresearch", "uidesign", "webdesign", "designsystems"] as const;

export function ServicesSection() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".service-item");

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-40 left-[-10%] text-[30vw] font-bold text-parchment/[0.012] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]">
        04
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-sm text-ember tracking-[0.25em] uppercase font-medium">{t("subtitle")}</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate/30 to-transparent" />
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-parchment leading-[1.05] tracking-tight">
            O que eu<br />
            <span className="text-ember">faço</span>
          </h2>
        </div>

        {/* Services */}
        <div className="space-y-0">
          {serviceKeys.map((key, index) => {
            const Icon = icons[index];
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={key}
                className="service-item group relative py-10 md:py-14 border-t border-slate/10 transition-all duration-700 hover:pl-4 md:hover:pl-8"
                style={{ perspective: "1000px" }}
                data-cursor-hover
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Number */}
                  <span className="text-5xl md:text-7xl font-bold text-parchment/[0.05] font-[family-name:var(--font-sora)] group-hover:text-parchment/[0.12] transition-colors duration-700 w-20 md:w-28 flex-shrink-0">
                    {num}
                  </span>

                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-ember/5 border border-ember/10 group-hover:bg-ember/10 group-hover:border-ember/30 transition-all duration-500">
                    <Icon size={24} className="text-ember/70 group-hover:text-ember transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-parchment font-[family-name:var(--font-sora)] group-hover:text-ember transition-colors duration-500 mb-2">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-slate/60 group-hover:text-slate/80 transition-colors duration-500 max-w-lg">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="w-12 h-12 rounded-full border border-slate/10 flex items-center justify-center group-hover:border-ember/30 transition-all duration-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate/30 group-hover:text-ember transition-colors duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform">
                      <path d="M1 15L15 1M15 1H3M15 1V13" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-ember to-transparent group-hover:w-full transition-all duration-1000 ease-out" />
              </div>
            );
          })}
          <div className="border-t border-slate/10" />
        </div>
      </div>
    </section>
  );
}
