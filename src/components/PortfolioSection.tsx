
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
}

const projects: Project[] = [
  {
    id: "landing-page-ecommerce",
    title: "Website - Agência Ignis Lab",
    description: "Desenvolvimento de um site moderno e altamente otimizado para uma agência especializada em web design e automações. O processo incluiu pesquisa detalhada de usuário, análise competitiva, construção de wireframes, design visual impactante e a implementação técnica, garantindo uma presença digital que atrai e converte.",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    id: "sistema-automacao-crm",
    title: "Sistema de Automação CRM",
    description: "Implementação de automação completa para gestão de leads e relacionamento com clientes",
    category: "Automação",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    id: "app-mobile-ui-ux",
    title: "App Mobile UI/UX",
    description: "Design de interface e experiência do usuário para aplicativo de finanças pessoais",
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

  const mainProject = projects.find(p => p.id === 'landing-page-ecommerce');
  const otherProjects = projects.filter(p => p.id !== 'landing-page-ecommerce');

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
    <section ref={sectionRef} id="portfolio" className="section-padding bg-brand-dark">
      <div className="container-custom">
        <h2 className={`font-poppins font-bold text-4xl md:text-5xl text-center bg-gradient-to-r from-brand-accent via-brand-tertiary to-brand-secondary bg-clip-text text-transparent mb-8 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          PORTFÓLIO DE TRABALHOS
        </h2>

        <p className={`text-center text-brand-tertiary text-lg mb-12 max-w-2xl mx-auto ${
          isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
        }`}>
          Conheça alguns dos projetos que desenvolvi, sempre buscando inovação e resultados excepcionais
        </p>

        {/* Projects Grid */}
        <div className={`grid md:grid-cols-3 md:grid-rows-2 gap-8 mb-12 ${
          isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'
        }`}>
          {mainProject && (
            <div
              key={mainProject.id}
              className={`group relative glass-card hover-lift transition-all duration-300 rounded-2xl shadow-2xl border border-white/20 md:col-span-2 md:row-span-2 ${
                isVisible ? 'animate-scale-in animation-delay-600' : 'opacity-0'
              }`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              <div className="relative overflow-hidden rounded-2xl h-[80%]">
                <img
                  src={mainProject.image}
                  alt={mainProject.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 border border-white/30 rounded-xl shadow-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Link
                      to={`/portfolio/${mainProject.id}`}
                      className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                    >
                      <Eye className="w-5 h-5 text-brand-dark" />
                    </Link>
                    <button className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md">
                      <ExternalLink className="w-5 h-5 text-brand-dark" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-sm font-medium mb-3">
                  {mainProject.category}
                </span>
                <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-2">
                  {mainProject.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {mainProject.description}
                </p>
              </div>
            </div>
          )}
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative glass-card hover-lift transition-all duration-300 rounded-2xl shadow-2xl border border-white/20 ${
                isVisible ? 'animate-scale-in animation-delay-' + ((index + 1) * 100 + 600) : 'opacity-0'
              }`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 border border-white/30 rounded-xl shadow-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md"
                    >
                      <Eye className="w-5 h-5 text-brand-dark" />
                    </Link>
                    <button className="p-2 bg-brand-tertiary rounded-full hover:bg-brand-tertiary/80 transition-colors duration-200 shadow-md">
                      <ExternalLink className="w-5 h-5 text-brand-dark" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-secondary text-white rounded-full text-sm font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="font-poppins font-bold text-xl text-brand-tertiary mb-2">
                  {project.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
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
