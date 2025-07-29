import { useEffect, useRef } from 'react';

interface LightningBolt {
  x: number;
  y: number;
  height: number;
  speed: number;
  width: number;
  opacity: number;
  segments: { x: number; y: number }[];
  exploded: boolean;
  explosionRadius: number;
  explosionOpacity: number;
}

const LightningBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightningBolts = useRef<LightningBolt[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createLightningBolt = (): LightningBolt => {
      const segments = [];
      const startX = Math.random() * canvas.width;
      let currentX = startX;
      let currentY = 0;
      
      // Create zigzag pattern
      for (let i = 0; i < 20; i++) {
        segments.push({ x: currentX, y: currentY });
        currentY += canvas.height / 20;
        currentX += (Math.random() - 0.5) * 30;
      }

      return {
        x: startX,
        y: 0,
        height: canvas.height,
        speed: 2 + Math.random() * 3,
        width: 2 + Math.random() * 3,
        opacity: 0.7 + Math.random() * 0.3,
        segments,
        exploded: false,
        explosionRadius: 0,
        explosionOpacity: 1
      };
    };

    const drawLightning = (bolt: LightningBolt) => {
      ctx.strokeStyle = `rgba(135, 84, 255, ${bolt.opacity})`;
      ctx.lineWidth = bolt.width;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
      
      for (let i = 1; i < bolt.segments.length; i++) {
        if (bolt.segments[i].y <= bolt.y) {
          ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
        }
      }
      
      ctx.stroke();
    };

    const drawExplosion = (bolt: LightningBolt) => {
      if (!bolt.exploded) return;
      
      const gradient = ctx.createRadialGradient(
        bolt.segments[bolt.segments.length - 1].x,
        canvas.height,
        0,
        bolt.segments[bolt.segments.length - 1].x,
        canvas.height,
        bolt.explosionRadius
      );
      
      gradient.addColorStop(0, `rgba(135, 84, 255, ${bolt.explosionOpacity})`);
      gradient.addColorStop(0.5, `rgba(229, 215, 196, ${bolt.explosionOpacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(135, 84, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        bolt.segments[bolt.segments.length - 1].x,
        canvas.height,
        bolt.explosionRadius,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Add sparks
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const sparkLength = bolt.explosionRadius * 0.3;
        const startX = bolt.segments[bolt.segments.length - 1].x + Math.cos(angle) * bolt.explosionRadius * 0.5;
        const startY = canvas.height + Math.sin(angle) * bolt.explosionRadius * 0.5;
        const endX = startX + Math.cos(angle) * sparkLength;
        const endY = startY + Math.sin(angle) * sparkLength;
        
        ctx.strokeStyle = `rgba(229, 215, 196, ${bolt.explosionOpacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new lightning bolts randomly
      if (Math.random() < 0.02 && lightningBolts.current.length < 5) {
        lightningBolts.current.push(createLightningBolt());
      }

      // Update and draw lightning bolts
      lightningBolts.current = lightningBolts.current.filter(bolt => {
        if (!bolt.exploded) {
          bolt.y += bolt.speed;
          
          // Check if lightning reached bottom
          if (bolt.y >= canvas.height) {
            bolt.exploded = true;
            bolt.y = canvas.height;
          }
        } else {
          // Animate explosion
          bolt.explosionRadius += 3;
          bolt.explosionOpacity -= 0.02;
          
          // Remove bolt when explosion is done
          if (bolt.explosionOpacity <= 0) {
            return false;
          }
        }

        drawLightning(bolt);
        drawExplosion(bolt);
        
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default LightningBackground;