
import { useEffect, useRef, useState } from 'react';
import { Monitor, Zap, Palette, TrendingUp, Code, Users } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: any;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Web Design & UX/UI",
    icon: Monitor,
    skills: ["Figma", "Adobe XD", "WordPress (Elementor)", "Web Design Responsivo", "Wireframes", "Prototipagem", "Design System", "UI Design", "UX Research"],
    color: "from-brand-accent to-brand-secondary"
  },
  {
    title: "Automação & IA",
    icon: Zap,
    skills: ["n8n", "Make (antigo Integromat)", "Desenvolvimento de Chatbots", "Inteligência Artificial", "Gestão de Automação", "Otimização de Processos"],
    color: "from-brand-dark to-brand-accent"
  },
  {
    title: "Design Gráfico & Motion",
    icon: Palette,
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Adobe Premiere Pro", "Motion Design", "Edição de Vídeos"],
    color: "from-brand-secondary to-brand-dark"
  },
  {
    title: "Marketing Digital",
    icon: TrendingUp,
    skills: ["SEO (Otimização para Mecanismos de Busca)", "Marketing de Conteúdo", "Marketing de Mídias Sociais", "Analytics"],
    color: "from-brand-accent to-brand-tertiary"
  },
  {
    title: "Desenvolvimento Front-end",
    icon: Code,
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Node.js", "Vite"],
    color: "from-brand-dark to-brand-secondary"
  },
  {
    title: "Metodologias",
    icon: Users,
    skills: ["Gestão Ágil Scrum", "Design Thinking", "Lean UX"],
    color: "from-brand-secondary to-brand-accent"
  }
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
    
    // Calculate angle for the conic gradient
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(e.clientY - rect.top - centerY, e.clientX - rect.left - centerX) * (180 / Math.PI);
    card.style.setProperty('--angle', `${angle}deg`);
  };

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-brand-black">
      <div className="container-custom">
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-16 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          HABILIDADES TÉCNICAS E FERRAMENTAS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <div
                key={index}
                className={`glass-card glow-border p-6 hover-lift ${
                  isVisible ? 'animate-scale-in animation-delay-' + (index * 200) : 'opacity-0'
                }`}
                onMouseMove={handleMouseMove}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-brand-dark to-brand-accent flex items-center justify-center mb-6 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white drop-shadow-md" />
                </div>

                <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-4">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
