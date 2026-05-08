"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  triggerStart?: string;
}

export function SplitText({
  children,
  className = "",
  tag: Tag = "span",
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  triggerOnScroll = true,
  triggerStart = "top 85%",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, y: 20 });

      const tween = gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: triggerOnScroll
          ? {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions: "play none none none",
            }
          : undefined,
      });

      if (!triggerOnScroll) {
        tween.play();
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, delay, duration, stagger, triggerOnScroll, triggerStart]);

  // Split text into characters, preserving spaces
  const characters = children.split("").map((char, index) => (
    <span
      key={index}
      className="split-char inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Tag ref={containerRef as any} className={`inline-block ${className}`}>
      {characters}
    </Tag>
  );
}
