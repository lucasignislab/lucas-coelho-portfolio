"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "aero",
    title: "AERO",
    subtitle: "Product Design",
    description: "Sistema de gestão de projetos keyboard-first.",
    year: "2025",
  },
  {
    id: "dai-xavier",
    title: "Dra. Dai Xavier",
    subtitle: "Web Design",
    description: "Landing page premium para clínica de harmonização facial.",
    year: "2025",
  },
  {
    id: "nova-era",
    title: "Nova Era Transportes",
    subtitle: "Web Design",
    description: "Website institucional para empresa de logística.",
    year: "2025",
  },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll(".project-row");

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const row = e.currentTarget;
    const title = row.querySelector(".project-title");
    if (!title) return;
    
    const rect = row.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    
    gsap.to(title, {
      x: (x - 0.5) * 20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const title = e.currentTarget.querySelector(".project-title");
    if (!title) return;
    
    gsap.to(title, {
      x: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-40 right-[-10%] text-[30vw] font-bold text-parchment/[0.012] leading-none select-none pointer-events-none font-[family-name:var(--font-sora)]">
        03
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-sm text-ember tracking-[0.25em] uppercase font-medium">{t("title")}</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate/30 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-parchment leading-[1.05] tracking-tight">
              Projetos<br />
              <span className="text-ember">Selecionados</span>
            </h2>
            <p className="text-lg text-slate/60 max-w-sm md:text-right">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Projects list */}
        <div>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}` as any}
              className="project-row group block"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-cursor-hover
            >
              <div className="relative py-10 md:py-16 border-t border-slate/10 transition-all duration-700 hover:pl-4 md:hover:pl-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Number */}
                  <span className="text-sm text-slate/30 font-mono w-8">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title - massive */}
                  <h3 className="project-title text-4xl md:text-6xl lg:text-7xl font-bold text-parchment font-[family-name:var(--font-sora)] group-hover:text-ember transition-colors duration-500 flex-1">
                    {project.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-sm text-slate/40 uppercase tracking-wider hidden md:block">{project.subtitle}</span>
                    <span className="text-sm text-slate/30">{project.year}</span>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate/15 flex items-center justify-center group-hover:border-ember/40 group-hover:bg-ember/5 transition-all duration-700">
                      <ArrowUpRight size={20} className="text-slate/40 group-hover:text-ember transition-colors duration-500" />
                    </div>
                  </div>
                </div>

                {/* Description - appears on hover */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-700 ease-out mt-0 group-hover:mt-4">
                  <p className="text-slate/50 md:pl-16 max-w-xl">
                    {project.description}
                  </p>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-ember to-ember/50 group-hover:w-full transition-all duration-1000 ease-out" />
              </div>
            </Link>
          ))}
          
          <div className="border-t border-slate/10" />
        </div>
      </div>
    </section>
  );
}
