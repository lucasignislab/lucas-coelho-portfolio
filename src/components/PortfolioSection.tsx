
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: "website-ignis-lab",
    title: "AERO – Planejamento na Velocidade do Pensamento",
    description: "Como projetei e desenvolvi um ecossistema de gestão de projetos keyboard-first focado em eliminar a fricção entre a ideia e a execução.",
    category: "Product Design",
    image: "/lovable-uploads/aero-project-cover.png",
    liveUrl: "https://aeroprojectmanager.netlify.app"
  },
  {
    id: "sistema-automacao-crm",
    title: "Landing Page - Dra Dai Xavier",
    description: "Landing Page estratégica e elegante desenvolvida para a Dra. Dai Xavier, focada em converter visitantes em pacientes.",
    category: "Web Design",
    image: "/lovable-uploads/dai-xavier-cover.png",
    liveUrl: "https://daixavier.netlify.app"
  },
  {
    id: "saas-content-planner",
    title: "SaaS Content Planner",
    description: "Design de interface e experiência do usuário para um SaaS Content Planner",
    category: "UX/UI Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
  },
  {
    id: "chatbot-inteligente",
    title: "Chatbot Inteligente",
    description: "Desenvolvimento de chatbot com IA para atendimento automatizado 24/7",
    category: "IA & Chatbots",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop"
  },

  {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    description: "Interface de dashboard para análise de dados e métricas de performance",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  }
];

const PortfolioSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const mainProject = projects.find(p => p.id === 'website-ignis-lab');
  const otherProjects = projects.filter(p =>
    p.id === 'sistema-automacao-crm' || p.id === 'saas-content-planner'
  );

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
    <section ref={sectionRef} id="portfolio" className="section-padding" style={{ backgroundColor: '#18181b' }}>
      <div className="container-custom">
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
          PORTFÓLIO DE TRABALHOS
        </h2>

        <p className={`text-center text-brand-tertiary text-lg mb-12 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
          }`}>
          Conheça alguns dos projetos que desenvolvi, sempre buscando inovação e resultados excepcionais
        </p>

        {/* Featured Project */}
        <div className={`flex justify-center mb-16 ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'
          }`}>
          {mainProject && (
            <div
              key={mainProject.id}
              className={`group relative glass-card hover-lift transition-all duration-300 rounded-2xl shadow-2xl border border-white/20 max-w-4xl w-full ${isVisible ? 'animate-scale-in animation-delay-600' : 'opacity-0'
                }`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              <div className="relative overflow-hidden rounded-2xl h-[400px] md:h-[500px]">
                <img
                  src={mainProject.image}
                  alt={mainProject.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 border border-white/30 rounded-xl shadow-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Link
                      to={`/portfolio/aero-case-study`}
                      className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                    >
                      <Eye className="w-5 h-5 text-brand-dark" />
                    </Link>
                    {mainProject.liveUrl ? (
                      <a
                        href={mainProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                      >
                        <ExternalLink className="w-5 h-5 text-brand-dark" />
                      </a>
                    ) : (
                      <button className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md">
                        <ExternalLink className="w-5 h-5 text-brand-dark" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-sm font-medium mb-3">
                  {mainProject.category}
                </span>
                <h3 className="font-poppins font-bold text-2xl md:text-3xl text-brand-tertiary mb-3">
                  {mainProject.title}
                </h3>
                <p className="text-brand-secondary text-base md:text-lg leading-relaxed">
                  {mainProject.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative glass-card hover-lift transition-all duration-300 rounded-2xl shadow-xl border border-white/10 ${isVisible ? `animate-scale-in animation-delay-${(index + 4) * 200}` : 'opacity-0'
                }`}
            >
              <div className="relative overflow-hidden rounded-t-2xl h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                    >
                      <Eye className="w-5 h-5 text-brand-dark" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                      >
                        <ExternalLink className="w-5 h-5 text-brand-dark" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-2">
                  {project.title}
                </h3>
                <p className="text-brand-secondary text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
