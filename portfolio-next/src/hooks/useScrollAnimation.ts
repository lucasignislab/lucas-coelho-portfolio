"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  animation?: gsap.TweenVars;
  stagger?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;

    const {
      start = "top 85%",
      end = "bottom 20%",
      scrub = false,
      pin = false,
      toggleActions = "play none none none",
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      stagger = 0.1,
    } = options;

    const ctx = gsap.context(() => {
      const children = el.querySelectorAll("[data-animate]");
      const targets = children.length > 0 ? children : el;

      gsap.fromTo(
        targets,
        from,
        {
          ...to,
          stagger: children.length > 1 ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            pin,
            toggleActions,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, options]);

  return ref;
}

// Helper for simple fade-up animations
export function useFadeUp<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, delay]);

  return ref;
}
