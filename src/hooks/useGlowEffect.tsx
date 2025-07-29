import { useEffect, useRef, useState } from 'react';

interface GlowEffectOptions {
  glowColor?: string;
  glowSize?: number;
  intensity?: number;
}

export const useGlowEffect = (options: GlowEffectOptions = {}) => {
  const {
    glowColor = 'rgba(135, 84, 255, 0.6)',
    glowSize = 200,
    intensity = 0.3
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty('--glow-x', `${x}px`);
      element.style.setProperty('--glow-y', `${y}px`);
      element.style.setProperty('--glow-color', glowColor);
      element.style.setProperty('--glow-size', `${glowSize}px`);
      element.style.setProperty('--glow-intensity', intensity.toString());
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glowColor, glowSize, intensity, isHovered]);

  return {
    ref: elementRef,
    className: 'glow-container'
  };
};