
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
    color: "from-brand-blue to-brand-cyan"
  },
  {
    title: "Automação & IA",
    icon: Zap,
    skills: ["n8n", "Make (antigo Integromat)", "Desenvolvimento de Chatbots", "Inteligência Artificial", "Gestão de Automação", "Otimização de Processos"],
    color: "from-brand-purple to-brand-indigo"
  },
  {
    title: "Design Gráfico & Motion",
    icon: Palette,
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Adobe Premiere Pro", "Motion Design", "Edição de Vídeos"],
    color: "from-brand-indigo to-brand-blue"
  },
  {
    title: "Marketing Digital",
    icon: TrendingUp,
    skills: ["SEO (Otimização para Mecanismos de Busca)", "Marketing de Conteúdo", "Marketing de Mídias Sociais", "Analytics"],
    color: "from-brand-cyan to-brand-purple"
  },
  {
    title: "Desenvolvimento Front-end",
    icon: Code,
    skills: ["HTML", "CSS", "JavaScript"],
    color: "from-brand-blue to-brand-purple"
  },
  {
    title: "Metodologias",
    icon: Users,
    skills: ["Gestão Ágil Scrum", "Design Thinking", "Lean UX"],
    color: "from-brand-purple to-brand-cyan"
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

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className={`font-space font-bold text-4xl md:text-5xl text-center text-gradient mb-16 ${
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
                className={`bg-white rounded-xl shadow-lg p-6 hover-lift border border-gray-100 ${
                  isVisible ? 'animate-scale-in animation-delay-' + (index * 200) : 'opacity-0'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-space font-bold text-xl text-gray-800 mb-4">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
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
