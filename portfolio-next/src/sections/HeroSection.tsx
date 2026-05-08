"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FluidBackground } from "@/components/FluidBackground";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Decorative elements first
      if (decorRef.current) {
        tl.fromTo(
          decorRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }

      // Title characters
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".hero-char");
        tl.fromTo(
          chars,
          { opacity: 0, y: 120, rotateX: -80, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.04,
            ease: "power4.out",
          },
          "-=1"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "-=0.6"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Parallax effect on scroll — hero moves slower than scroll
      if (containerRef.current) {
        // Entire hero content moves at 30% speed
        gsap.to(contentRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Hero fades out as user scrolls past
        gsap.to(containerRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Background decorative element moves opposite
        gsap.to(decorRef.current, {
          y: 80,
          rotation: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = t("greeting");
  const titleChars = title.split("").map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Fluid WebGL Background */}
      <FluidBackground />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/30 to-void pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-void/50 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full opacity-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="w-full h-full rounded-full border border-ember/10 animate-pulse" />
        <div className="absolute inset-4 rounded-full border border-terracotta/5" />
      </div>

      {/* Large background text */}
      <div className="absolute bottom-[15%] left-[-5%] text-[25vw] font-bold text-parchment/[0.015] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]" style={{ zIndex: 1 }}>
        LC
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative px-4 md:px-8 lg:px-16" style={{ zIndex: 10 }}>
        <div className="max-w-[90vw]">
          {/* Role tag with line */}
          <div className="mb-10 flex items-center gap-6">
            <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
            <span className="text-sm md:text-base text-ember tracking-[0.25em] uppercase font-medium">
              {t("role")}
            </span>
          </div>

          {/* Massive title with 3D perspective */}
          <h1
            ref={titleRef}
            className="font-[family-name:var(--font-sora)] text-[18vw] md:text-[14vw] lg:text-[11vw] font-bold text-parchment leading-[0.85] tracking-tighter"
            style={{ perspective: "1200px" }}
          >
            {titleChars}
          </h1>

          {/* Description */}
          <p
            ref={subtitleRef}
            className="mt-12 md:mt-16 text-lg md:text-xl lg:text-2xl text-slate/80 max-w-xl leading-relaxed opacity-0"
          >
            {t("description")}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 opacity-0">
            <a
              href="#portfolio"
              className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden rounded-full border border-parchment/15 text-parchment font-medium text-lg hover:border-ember/50 transition-all duration-700"
              data-cursor-hover
            >
              <span className="relative z-10">{t("cta_portfolio")}</span>
              <span className="relative z-10 flex items-center justify-center w-3 h-3 rounded-full bg-ember group-hover:scale-[3] transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-ember/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </a>

            <a
              href="#contact"
              className="text-slate hover:text-parchment transition-colors duration-300 text-lg underline underline-offset-8 decoration-slate/20 hover:decoration-ember/50"
              data-cursor-hover
            >
              {t("cta_contact")}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ zIndex: 10 }}>
        <span className="text-[10px] text-slate/40 tracking-[0.4em] uppercase">
          {t("scroll")}
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-slate/40 to-transparent animate-pulse" />
      </div>

      {/* Side text */}
      <div className="absolute bottom-20 right-8 md:right-12 hidden lg:block" style={{ zIndex: 10 }}>
        <span className="text-[10px] text-slate/30 tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
