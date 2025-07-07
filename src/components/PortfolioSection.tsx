
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Landing Page E-commerce",
    description: "Design e desenvolvimento de landing page de alta conversão para e-commerce de moda",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    title: "Sistema de Automação CRM",
    description: "Implementação de automação completa para gestão de leads e relacionamento com clientes",
    category: "Automação",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    title: "App Mobile UI/UX",
    description: "Design de interface e experiência do usuário para aplicativo de finanças pessoais",
    category: "UX/UI Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
  },
  {
    title: "Chatbot Inteligente",
    description: "Desenvolvimento de chatbot com IA para atendimento automatizado 24/7",
    category: "IA & Chatbots",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop"
  },
  {
    title: "Identidade Visual Corporativa",
    description: "Criação completa de identidade visual para startup de tecnologia",
    category: "Design Gráfico",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop"
  },
  {
    title: "Dashboard Analytics",
    description: "Interface de dashboard para análise de dados e métricas de performance",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  }
];

const PortfolioSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <section ref={sectionRef} id="portfolio" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className={`font-space font-bold text-4xl md:text-5xl text-center text-gradient mb-8 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          PORTFÓLIO DE TRABALHOS
        </h2>

        <p className={`text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto ${
          isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
        }`}>
          Conheça alguns dos projetos que desenvolvi, sempre buscando inovação e resultados excepcionais
        </p>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${
          isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'
        }`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover-lift ${
                isVisible ? 'animate-scale-in animation-delay-' + (index * 100 + 600) : 'opacity-0'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <ExternalLink className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="font-space font-bold text-xl text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Behance CTA */}
        <div className={`text-center ${
          isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'
        }`}>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-purple hover:to-brand-blue font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glow-effect"
          >
            <a
              href="https://www.behance.net/lucascoelho30"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <span>Ver Mais no Behance</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
