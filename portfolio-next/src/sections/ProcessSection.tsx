"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Search, Map, Palette, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons = [Search, Map, Palette, Rocket];
const steps = ["discovery", "strategy", "design", "delivery"] as const;

export function ProcessSection() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".process-item");
      
      items.forEach((item) => {
        const num = item.querySelector(".process-num");
        const content = item.querySelector(".process-content");
        
        gsap.fromTo(
          num,
          { opacity: 0, x: -80, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, x: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Line animation
      const line = sectionRef.current!.querySelector(".process-line-fill");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-40 left-[-10%] text-[30vw] font-bold text-parchment/[0.012] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]">
        02
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-sm text-ember tracking-[0.25em] uppercase font-medium">{t("subtitle")}</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate/30 to-transparent" />
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-parchment leading-[1.05] tracking-tight max-w-5xl">
            Como eu<br />
            <span className="text-ember">trabalho</span>
          </h2>
        </div>

        {/* Process items */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-slate/10 hidden md:block">
            <div className="process-line-fill absolute inset-0 bg-gradient-to-b from-ember/50 via-ember/30 to-transparent origin-top" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {steps.map((key, index) => {
              const Icon = icons[index];
              const num = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={key}
                  className="process-item relative grid md:grid-cols-12 gap-8 md:gap-12 items-start"
                >
                  {/* Number */}
                  <div className="process-num md:col-span-3 flex items-start gap-6 md:pl-16">
                    <span className="text-7xl md:text-9xl font-bold text-parchment/[0.06] font-[family-name:var(--font-sora)] leading-none">
                      {num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="process-content md:col-span-9">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-ember/10 border border-ember/20">
                        <Icon size={24} className="text-ember" />
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-parchment font-[family-name:var(--font-sora)]">
                        {t(`steps.${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl text-slate/70 leading-relaxed max-w-2xl">
                      {t(`steps.${key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
