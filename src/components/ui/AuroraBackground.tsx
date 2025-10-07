import React, { useEffect, useState } from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
  colors = ['#5D26C1', '#a17fe0', '#59C173', '#5D26C1']
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden bg-black/5">
        {colors.map((color, index) => (
          <div
            key={index}
            className="absolute opacity-70 blur-3xl rounded-full"
            style={{
              backgroundColor: color,
              width: '60%',
              height: '60%',
              left: `${(mousePosition.x / window.innerWidth) * 100 - 20 + index * 10}%`,
              top: `${(mousePosition.y / window.innerHeight) * 100 - 20 + index * 5}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease-out',
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default AuroraBackground;