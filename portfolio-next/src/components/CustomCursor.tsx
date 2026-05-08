"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const animate = () => {
      // Smooth follow for outer cursor
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      
      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      rafId = requestAnimationFrame(animate);
    };

    // Detect hover on interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Observe DOM changes for new interactive elements
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });
    handleElementHover();

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer glow cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100
          ${isVisible ? "opacity-100" : "opacity-0"}
          ${isHovering ? "scale-150" : "scale-100"}
        `}
        style={{
          background: "radial-gradient(circle, rgba(232,92,45,0.15) 0%, transparent 70%)",
          border: "1px solid rgba(232,92,45,0.3)",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-all duration-150
          ${isVisible ? "opacity-100" : "opacity-0"}
          ${isHovering ? "scale-0" : "scale-100"}
        `}
        style={{
          background: "#E85C2D",
          willChange: "transform",
        }}
      />
      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
